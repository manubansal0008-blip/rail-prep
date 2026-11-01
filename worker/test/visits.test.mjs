// Run: npm test  (fake Durable Object storage; no network)
import test from "node:test";
import assert from "node:assert/strict";
import { handler } from "../src/chat.js";
import { visit, VisitCounter, istDay } from "../src/visits.js";

const SITE = "https://manubansal0008-blip.github.io";
const store = () => { const m = new Map(); return { m,
  get: async (k) => m.get(k), put: async (k, v) => { if (typeof k === "object") for (const [a, b] of Object.entries(k)) m.set(a, b); else m.set(k, v); },
  delete: async (ks) => { for (const k of [].concat(ks)) m.delete(k); }, list: async ({ prefix }) => new Map([...m].filter(([k]) => k.startsWith(prefix))) }; };
const ns = (env = {}) => { const ctx = { storage: store() }; const obj = new VisitCounter(ctx, env);
  return { ctx, idFromName: (n) => n, get: () => ({ fetch: (u, o) => obj.fetch(new Request(u, o)) }) }; };
const req = (method, ip = "1.2.3.4", origin = SITE) => new Request("https://w.example/visit", { method, headers: { Origin: origin, "CF-Connecting-IP": ip } });

test("visit: counts, per-IP limit, new day resets today and clears IP keys", async () => {
  const s = store(), t0 = Date.UTC(2026, 10, 1, 4);
  assert.deepEqual(await visit(s, { now: t0 }), { total: 0, today: 0, date: "2026-11-01", counted: false });
  for (let i = 0; i < 3; i++) await visit(s, { count: true, ip: "a", limit: 2, now: t0 });
  await visit(s, { count: true, ip: "b", limit: 2, now: t0 });
  assert.deepEqual(await visit(s, { now: t0 }), { total: 3, today: 3, date: "2026-11-01", counted: false });
  const t1 = Date.UTC(2026, 10, 1, 19); // 00:30 IST on 2 Nov
  assert.equal(istDay(t1), "2026-11-02");
  const r = await visit(s, { count: true, ip: "a", limit: 2, now: t1 });
  assert.deepEqual(r, { total: 4, today: 1, date: "2026-11-02", counted: true });
  assert.equal([...s.m.keys()].filter((k) => k.startsWith("ip:2026-11-01")).length, 0);
  assert.ok(![...s.m.keys()].some((k) => k.includes("a") && k.startsWith("ip:") && k.endsWith(":a"))); // IP stored hashed
});
test("/visit route: GET reads, POST counts, CORS, errors", async () => {
  const env = { VISITS: ns({ VISIT_IP_DAY: "2" }), ALLOW_LOCALHOST: "false" };
  let r = await handler.fetch(req("GET"), env);
  assert.equal(r.status, 200); assert.equal(r.headers.get("Access-Control-Allow-Origin"), SITE);
  assert.deepEqual(Object.keys(await r.json()), ["total", "today", "date"]);
  r = await handler.fetch(req("POST"), env); const j = await r.json();
  assert.equal(j.total, 1); assert.equal(j.today, 1); assert.equal(j.counted, true);
  await handler.fetch(req("POST"), env); r = await handler.fetch(req("POST"), env);
  assert.equal((await r.json()).counted, false);
  assert.equal((await (await handler.fetch(req("POST", "5.6.7.8"), env)).json()).total, 3);
  assert.equal((await handler.fetch(req("GET", "1.1.1.1", "https://evil.com"), env)).status, 403);
  assert.equal((await handler.fetch(req("PUT"), env)).status, 405);
  assert.equal((await handler.fetch(req("GET"), { ALLOW_LOCALHOST: "false" })).status, 503);
  const pre = await handler.fetch(new Request("https://w.example/visit", { method: "OPTIONS", headers: { Origin: SITE } }), env);
  assert.match(pre.headers.get("Access-Control-Allow-Methods"), /GET/);
});
