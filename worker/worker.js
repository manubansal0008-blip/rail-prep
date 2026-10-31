// Rail Prep doubt chat: Cloudflare Worker that forwards a student's question to Google Gemini.
// Secret: GEMINI_API_KEY (wrangler secret put GEMINI_API_KEY). Vars: ALLOWED_ORIGIN, GEMINI_MODEL (wrangler.toml).
// Request:  POST { message: string, lang?: "en"|"hi", history?: [{ role: "user"|"model", text: string }] }
// Response: { reply: string } or { error: string } (always JSON, friendly message).
const MAX_INPUT = 2000;   // characters per message
const MAX_TURNS = 10;     // past messages forwarded to the model
const DEFAULT_MODEL = "gemini-3.8-flash"; // current free-tier Flash model (ai.google.dev pricing page, Oct 2026)

export const SYSTEM_PROMPT = [
  "You are a friendly tutor for Indian Railway recruitment exams (RRB NTPC and RRB Group D).",
  "Help with mathematics, reasoning, general science, general awareness, exam pattern and study planning.",
  "Answer concisely and step by step. For calculations, show each step briefly and give the final answer clearly.",
  "Reply in the student's language: if they write in Hindi (Devanagari or Hinglish), reply in simple Hindi; otherwise reply in English.",
  "If a question includes the official RRB answer, treat it as the official key; if you think the key may be wrong, say so politely and explain why.",
  "Be honest when you are unsure, and say that facts such as dates, vacancies and current affairs should be checked on the official RRB websites.",
  "Only discuss exam preparation and study topics. Politely decline anything else.",
  "Use plain text with simple markdown only (bold, numbered or bulleted lists). No tables, no HTML, no images."
].join(" ");

const LANG_HINT = {
  en: " The student has chosen English: reply in English.",
  hi: " The student has chosen Hindi: reply in simple Hindi (Devanagari script), keeping common technical terms in English where helpful."
};

const json = (obj, status, cors) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...cors } });

function corsHeaders(request, env) {
  const allowed = (env.ALLOWED_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
  const origin = request.headers.get("Origin") || "";
  if (!allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

// Fallback limiter (per Worker instance, best effort) used when the RATE_LIMITER binding is absent, e.g. in tests.
const hits = new Map();
function memoryLimit(key, limit = 10, windowMs = 60000) {
  const now = Date.now(), arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length <= limit;
}

export function buildRequest(message, history, model, lang) {
  const contents = [];
  for (const h of (Array.isArray(history) ? history : []).slice(-MAX_TURNS)) {
    if (!h || typeof h.text !== "string" || !h.text.trim()) continue;
    const role = h.role === "model" ? "model" : "user";
    contents.push({ role, parts: [{ text: h.text.slice(0, MAX_INPUT) }] });
  }
  contents.push({ role: "user", parts: [{ text: message }] });
  return {
    url: `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    body: {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT + (LANG_HINT[lang] || "") }] },
      contents,
      generationConfig: { maxOutputTokens: 1024 }
    }
  };
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (!cors) return json({ error: "This chat only works from the Rail Prep site." }, 403, {});
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "Use POST." }, 405, cors);

    const ip = request.headers.get("CF-Connecting-IP") || "anon";
    const ok = env.RATE_LIMITER ? (await env.RATE_LIMITER.limit({ key: ip })).success : memoryLimit(ip);
    if (!ok) return json({ error: "Too many questions in a short time. Please wait a minute and try again." }, 429, cors);

    let data;
    try { data = await request.json(); } catch { return json({ error: "Could not read your message. Please try again." }, 400, cors); }
    const message = typeof data?.message === "string" ? data.message.trim() : "";
    if (!message) return json({ error: "Please type your doubt first." }, 400, cors);
    if (message.length > MAX_INPUT) return json({ error: `Your message is too long. Please keep it under ${MAX_INPUT} characters.` }, 413, cors);
    if (!env.GEMINI_API_KEY) return json({ error: "Doubt chat is not configured yet. Please try again later." }, 503, cors);

    const { url, body } = buildRequest(message, data.history, env.GEMINI_MODEL || DEFAULT_MODEL, data.lang);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
        body: JSON.stringify(body)
      });
      if (res.status === 429) return json({ error: "The tutor is busy right now (free limit reached). Please try again in a little while." }, 503, cors);
      if (!res.ok) return json({ error: "The tutor could not answer right now. Please try again." }, 502, cors);
      const out = await res.json();
      const reply = (out?.candidates?.[0]?.content?.parts || []).map((p) => (p.thought ? "" : p.text || "")).join("").trim();
      if (!reply) return json({ error: "I couldn't answer that one. Please rephrase your doubt." }, 502, cors);
      return json({ reply }, 200, cors);
    } catch {
      return json({ error: "The tutor could not be reached. Please check your connection and try again." }, 502, cors);
    }
  }
};
