// Rail Prep visitor counter (route /visit in chat.js). Counts live in one Durable Object (SQLite-backed, free plan),
// so the numbers are exact (KV is eventually consistent and has a low free write limit).
//
// GET  /visit -> 200 { total, today, date }               (no change)
// POST /visit -> 200 { total, today, date, counted }      (counts one visit)
// The site POSTs at most once per browser per India-time day (localStorage flag), so "today" ~ visitors today and
// "total" ~ sum of daily visitors since the counter started. One IP can add at most VISIT_IP_DAY visits a day
// (default 20, for shared Wi-Fi / mobile networks); beyond that POST still returns the numbers with counted:false.
// IPs are stored only as a SHA-256 hash and the per-IP keys are deleted after the day ends.

const IST_MS = 5.5 * 3600 * 1000;
export const istDay = (now = Date.now()) => new Date(now + IST_MS).toISOString().slice(0, 10);

async function hashIp(ip) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("rail-prep:" + ip));
  return [...new Uint8Array(b)].slice(0, 12).map((x) => x.toString(16).padStart(2, "0")).join("");
}

// Logic on a storage object with get/put/delete/list (DurableObjectStorage or a test fake).
export async function visit(storage, { count = false, ip = "local", limit = 20, now = Date.now() } = {}) {
  const date = istDay(now);
  let [total, today, day] = await Promise.all([storage.get("total"), storage.get("d:" + date), storage.get("day")]);
  total = total || 0; today = today || 0;
  if (day !== date) {
    // New India-time day: drop yesterday's per-IP keys (keeps storage tiny).
    const old = await storage.list({ prefix: "ip:" });
    const del = [...old.keys()].filter((k) => !k.startsWith("ip:" + date + ":"));
    for (let i = 0; i < del.length; i += 128) await storage.delete(del.slice(i, i + 128));
    await storage.put("day", date);
  }
  let counted = false;
  if (count) {
    const k = "ip:" + date + ":" + (await hashIp(ip));
    const n = (await storage.get(k)) || 0;
    if (n < limit) {
      total += 1; today += 1; counted = true;
      await storage.put({ total, ["d:" + date]: today, [k]: n + 1 });
    }
  }
  return { total, today, date, counted };
}

export class VisitCounter {
  constructor(ctx, env) { this.ctx = ctx; this.env = env; }
  async fetch(request) {
    const u = new URL(request.url);
    const n = +this.env.VISIT_IP_DAY;
    const out = await visit(this.ctx.storage, {
      count: request.method === "POST", ip: u.searchParams.get("ip") || "local", limit: Number.isFinite(n) && n > 0 ? n : 20 });
    return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
  }
}

// Called by the main handler for /visit (origin already checked). Returns { status, body }.
export async function handleVisit(request, env) {
  if (request.method !== "GET" && request.method !== "POST") return { status: 405, body: { error: "Method not allowed", code: "method" } };
  if (!env.VISITS) return { status: 503, body: { error: "Counter not set up", code: "nocounter" } };
  try {
    const ip = request.headers.get("CF-Connecting-IP") || "local";
    const stub = env.VISITS.get(env.VISITS.idFromName("site"));
    const r = await stub.fetch("https://visits/?ip=" + encodeURIComponent(ip), { method: request.method });
    const d = await r.json();
    const { total, today, date } = d;
    return { status: 200, body: request.method === "POST" ? { total, today, date, counted: !!d.counted } : { total, today, date } };
  } catch (e) {
    console.warn("visit counter error:", e && e.message);
    return { status: 503, body: { error: "Counter unavailable", code: "counter" } };
  }
}
