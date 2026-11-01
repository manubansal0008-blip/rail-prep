// Run: npm test   (mocks fetch and KV; no network, no real key)
import test from "node:test";
import assert from "node:assert/strict";
import { handler, cleanMessages, buildGeminiBody, SYSTEM_PROMPT } from "../src/chat.js";

const SITE = "https://manubansal0008-blip.github.io";
const kv = () => { const m = new Map(); return { get: async (k) => m.get(k) ?? null, put: async (k, v) => { m.set(k, v); }, m }; };
const env = (x = {}) => ({ GEMINI_API_KEY: "test-key", RL: kv(), ...x });
const req = (body, origin = SITE, method = "POST", path = "/chat") => new Request("https://w.example" + path, {
  method, headers: { "Content-Type": "application/json", Origin: origin, "CF-Connecting-IP": "1.2.3.4" },
  body: method === "POST" ? JSON.stringify(body) : undefined });
const ok = () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: "**200 मीटर**" }] } }] }), { status: 200 });
const real = globalThis.fetch; let calls;
test.beforeEach(() => { calls = []; globalThis.fetch = async (u, o) => { calls.push([u, o]); return ok(); }; });
test.afterEach(() => { globalThis.fetch = real; });
const body = (t, lang = "hi") => ({ lang, messages: [{ role: "user", text: t }] });

test("reply + Gemini request shape", async () => {
  const r = await handler.fetch(req(body("ट्रेन की लंबाई?")), env());
  assert.equal(r.status, 200); assert.equal(r.headers.get("Access-Control-Allow-Origin"), SITE);
  assert.equal((await r.json()).reply, "**200 मीटर**");
  assert.match(calls[0][0], /gemini-2\.5-flash:generateContent$/);
  assert.equal(calls[0][1].headers["x-goog-api-key"], "test-key");
  const b = JSON.parse(calls[0][1].body);
  assert.match(b.systemInstruction.parts[0].text, /RRB NTPC UG/);
  assert.equal(b.contents.at(-1).parts[0].text, "ट्रेन की लंबाई?");
});
test("history: last 8 turns, starts with user, caps lengths", () => {
  const h = Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? "model" : "user", text: "m" + i + "x".repeat(3000) }));
  const c = cleanMessages(h);
  assert.ok(c.length <= 8); assert.equal(c[0].role, "user");
  assert.ok(c.every((m) => m.text.length <= (m.role === "user" ? 800 : 2000)));
});
test("system prompt rules", () => {
  for (const re of [/LaTeX/, /2025/, /official RRB website/, /Never reveal/, /शॉर्टकट ट्रिक/, /simple, everyday Hindi/]) assert.match(SYSTEM_PROMPT, re);
  assert.match(buildGeminiBody([], "en").systemInstruction.parts[0].text, /chosen English/);
  assert.match(buildGeminiBody([], "hi", Date.UTC(2026, 10, 1, 20)).systemInstruction.parts[0].text, /Today's date in India is 2026-11-02/);
});
test("CORS: foreign origin 403, localhost allowed, preflight", async () => {
  assert.equal((await handler.fetch(req(body("x"), "https://evil.com"), env())).status, 403);
  assert.equal((await handler.fetch(req(body("x"), SITE + ".evil.com"), env())).status, 403);
  assert.equal((await handler.fetch(req(body("x"), "http://localhost:5173"), env())).status, 200);
  assert.equal((await handler.fetch(req(body("x"), "http://localhost:5173"), env({ ALLOW_LOCALHOST: "false" }))).status, 403);
  assert.equal((await handler.fetch(req(null, SITE, "OPTIONS"), env())).status, 204);
  assert.equal(calls.length, 1);
});
test("validation: too long, empty, wrong path", async () => {
  const r = await handler.fetch(req(body("क".repeat(801))), env()); assert.equal(r.status, 413); assert.match((await r.json()).error, /800/);
  assert.equal((await handler.fetch(req({ lang: "hi", messages: [] }), env())).status, 400);
  assert.equal((await handler.fetch(req(body("x"), SITE, "POST", "/"), env())).status, 404);
});
test("rate limits: hour, day, global; fail open without KV", async () => {
  const e = env({ RL_HOUR: "2" });
  for (let i = 0; i < 2; i++) assert.equal((await handler.fetch(req(body("q")), e)).status, 200);
  const r = await handler.fetch(req(body("q")), e); assert.equal(r.status, 429); assert.equal((await r.json()).code, "limit_hour");
  const d = await handler.fetch(req(body("q")), env({ RL_DAY: "0.5" })); // invalid -> default 60, so allowed
  assert.equal(d.status, 200);
  const e2 = env({ RL_DAY: "1" }); await handler.fetch(req(body("q")), e2);
  const d2 = await handler.fetch(req(body("q")), e2); assert.equal((await d2.json()).error, "आज की सीमा पूरी हो गई, कल फिर पूछें।");
  const e3 = env({ RL_GLOBAL: "1" }); await handler.fetch(req(body("q")), e3);
  assert.equal((await (await handler.fetch(req(body("q", "en")), e3)).json()).code, "limit_global");
  const nokv = await handler.fetch(req(body("q")), { GEMINI_API_KEY: "k" }); assert.equal(nokv.status, 200);
  const broken = await handler.fetch(req(body("q")), env({ RL: { get: async () => { throw new Error("x"); } } })); assert.equal(broken.status, 200);
});
test("upstream errors are friendly", async () => {
  let n = 0; globalThis.fetch = async () => (++n < 2 ? new Response("{}", { status: 503 }) : ok());
  assert.equal((await (await handler.fetch(req(body("q")), env())).json()).reply, "**200 मीटर**"); // retried once
  const seen = []; globalThis.fetch = async (u) => { seen.push(u); return new Response("{}", { status: 429 }); };
  assert.equal((await (await handler.fetch(req(body("q")), env({ GEMINI_FALLBACK_MODEL: "gemini-flash-lite-latest, gemini-3.5-flash-lite" }))).json()).code, "busy");
  assert.equal(seen.length, 3); assert.match(seen[1], /flash-lite-latest/); assert.match(seen[2], /3\.5-flash-lite/);
  globalThis.fetch = async () => new Response("{}", { status: 500 });
  assert.equal((await handler.fetch(req(body("q")), env())).status, 503);
  globalThis.fetch = async () => new Response("{}", { status: 400 });
  assert.equal((await (await handler.fetch(req(body("q")), env())).json()).code, "upstream");
  globalThis.fetch = async () => { throw new Error("down"); };
  assert.equal((await (await handler.fetch(req(body("q", "en")), env())).json()).error, "Could not get an answer right now. Please try again.");
  assert.equal((await handler.fetch(req(body("q")), { RL: kv() })).status, 503);
});

// ---- Links to Rail Prep pages ----
import { fixLinks, normalizeLink, ALLOWED_URLS, CATALOG_TEXT } from "../src/chat.js";
import { BASE, NOTES } from "../src/sitemap-catalog.js";
test("catalog: notes, practice and main pages are allowed; prompt lists them", () => {
  assert.equal(NOTES.length, 60);
  for (const u of ["", "mock.html", "practice.html", "papers.html", "notes.html", "news.html", "news/index.html", "notes/percentage.html",
    "notes/syllogism.html", "practice.html?topic=percentage"]) assert.ok(ALLOWED_URLS.has(BASE + u), u);
  assert.ok(!ALLOWED_URLS.has(BASE + "news/2026-11-01.html")); // daily pages: link news.html instead (no daily re-run)
  assert.match(CATALOG_TEXT, /notes\/percentage\.html \| Maths note: Percentage \/ प्रतिशत/);
  assert.match(buildGeminiBody([], "hi").systemInstruction.parts[0].text, /PAGE LIST[\s\S]*notes\/syllogism\.html/);
  assert.match(SYSTEM_PROMPT, /Never invent/);
});
test("normalizeLink: relative, http, trailing slash; rejects others", () => {
  assert.equal(normalizeLink("notes/percentage.html"), BASE + "notes/percentage.html");
  assert.equal(normalizeLink("./mock.html"), BASE + "mock.html");
  assert.equal(normalizeLink("/rail-prep/news.html"), BASE + "news.html");
  assert.equal(normalizeLink("http://manubansal0008-blip.github.io/rail-prep/papers.html"), BASE + "papers.html");
  assert.equal(normalizeLink("https://manubansal0008-blip.github.io/rail-prep"), BASE);
  assert.equal(normalizeLink("<" + BASE + "notes.html>"), BASE + "notes.html");
  for (const bad of [BASE + "notes/zzz.html", BASE + "notes/percentage.html#x", BASE + "practice.html?topic=zzz", "https://evil.com/",
    "javascript:alert(1)", "//evil.com/notes.html", "https://manubansal0008-blip.github.io.evil.com/rail-prep/", BASE + "notes/../x.html", ""])
    assert.equal(normalizeLink(bad), "", bad);
});
test("fixLinks: keeps catalog links, keeps only the text of others", () => {
  const good = `[प्रतिशत के नोट्स](${BASE}notes/percentage.html)`;
  assert.equal(fixLinks("और पढ़ें: " + good), "और पढ़ें: " + good);
  assert.equal(fixLinks("और पढ़ें: [सिलोजिज़्म](notes/syllogism.html)"), `और पढ़ें: [सिलोजिज़्म](${BASE}notes/syllogism.html)`);
  assert.equal(fixLinks("देखें [यहाँ](https://evil.com/x) और [नकली](" + BASE + "notes/fake.html)"), "देखें यहाँ और नकली");
  assert.equal(fixLinks("[click](javascript:alert(1))"), "click");
  assert.equal(fixLinks('[t](' + BASE + 'mock.html "title")'), `[t](${BASE}mock.html)`);
  assert.equal(fixLinks("आज की ख़बरें: " + BASE + "news.html."), "आज की ख़बरें: " + BASE + "news.html.");
  assert.equal(fixLinks("नकली: " + BASE + "fake.html ठीक"), "नकली: ठीक");
  assert.equal(fixLinks("https://other.site/a stays"), "https://other.site/a stays");
  assert.equal(fixLinks("1. a\n   - nested  item"), "1. a\n   - nested item"); // list indent kept
  assert.equal(fixLinks("**5** उत्तर"), "**5** उत्तर");
});
test("handler applies fixLinks to the model reply", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text:
    `**5**\n\nऔर पढ़ें: [नोट्स](${BASE}notes/percentage.html) · [बाहर](https://evil.com)` }] } }] }), { status: 200 });
  const r = await handler.fetch(req(body("25 का 20%?")), env());
  assert.equal((await r.json()).reply, `**5**\n\nऔर पढ़ें: [नोट्स](${BASE}notes/percentage.html) · बाहर`);
});
