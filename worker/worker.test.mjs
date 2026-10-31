// Run: node --test worker.test.mjs   (mocks global fetch; no network, no real key)
import test from "node:test";
import assert from "node:assert/strict";
import worker, { buildRequest } from "./worker.js";

const ORIGIN = "https://jj.github.io";
const env = { GEMINI_API_KEY: "test-key", ALLOWED_ORIGIN: ORIGIN, GEMINI_MODEL: "gemini-3.8-flash" };
let ipN = 0;
const req = (body, { origin = ORIGIN, method = "POST", ip } = {}) =>
  new Request("https://chat.example.workers.dev/", {
    method, headers: { "Content-Type": "application/json", Origin: origin, "CF-Connecting-IP": ip || `10.0.0.${++ipN}` },
    body: method === "POST" ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined
  });
const realFetch = globalThis.fetch;
function mockFetch(impl) { const calls = []; globalThis.fetch = async (u, o) => { calls.push([u, o]); return impl(u, o); }; return calls; }
test.afterEach(() => { globalThis.fetch = realFetch; });

test("success: Gemini request format and reply", async () => {
  const calls = mockFetch(() => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: "**Answer:** 42" }] } }] }), { status: 200 }));
  const history = [{ role: "user", text: "hi" }, { role: "model", text: "hello" }];
  const res = await worker.fetch(req({ message: "What is 6 x 7?", history }), env);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.deepEqual(await res.json(), { reply: "**Answer:** 42" });
  assert.equal(calls.length, 1);
  const [url, opts] = calls[0];
  assert.equal(url, "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent");
  assert.equal(opts.method, "POST");
  assert.equal(opts.headers["x-goog-api-key"], "test-key");
  const body = JSON.parse(opts.body);
  assert.match(body.systemInstruction.parts[0].text, /RRB NTPC/);
  assert.deepEqual(body.contents, [
    { role: "user", parts: [{ text: "hi" }] }, { role: "model", parts: [{ text: "hello" }] },
    { role: "user", parts: [{ text: "What is 6 x 7?" }] }]);
});

test("history capped at 10 turns", () => {
  const h = Array.from({ length: 25 }, (_, i) => ({ role: i % 2 ? "model" : "user", text: "m" + i }));
  const { body } = buildRequest("q", h, "m");
  assert.equal(body.contents.length, 11);
  assert.equal(body.contents[0].parts[0].text, "m15");
});

test("language hint reaches the system prompt", () => {
  assert.match(buildRequest("q", [], "m", "hi").body.systemInstruction.parts[0].text, /reply in simple Hindi/);
  assert.match(buildRequest("q", [], "m", "en").body.systemInstruction.parts[0].text, /chosen English/);
  assert.doesNotMatch(buildRequest("q", [], "m", "xx").body.systemInstruction.parts[0].text, /has chosen/);
});

test("upstream error -> friendly 502", async () => {
  mockFetch(() => new Response("{\"error\":{}}", { status: 500 }));
  const res = await worker.fetch(req({ message: "hello" }), env);
  assert.equal(res.status, 502);
  assert.match((await res.json()).error, /could not answer/);
});

test("upstream quota 429 -> friendly busy message", async () => {
  mockFetch(() => new Response("{}", { status: 429 }));
  const res = await worker.fetch(req({ message: "hello" }), env);
  assert.equal(res.status, 503);
  assert.match((await res.json()).error, /busy/);
});

test("network failure -> friendly 502", async () => {
  mockFetch(() => { throw new Error("down"); });
  const res = await worker.fetch(req({ message: "hello" }), env);
  assert.equal(res.status, 502);
  assert.match((await res.json()).error, /could not be reached/);
});

test("empty input -> 400, no Gemini call", async () => {
  const calls = mockFetch(() => assert.fail("should not call"));
  const res = await worker.fetch(req({ message: "   " }), env);
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /type your doubt/);
  assert.equal(calls.length, 0);
});

test("too long input -> 413, no Gemini call", async () => {
  const calls = mockFetch(() => assert.fail("should not call"));
  const res = await worker.fetch(req({ message: "a".repeat(2001) }), env);
  assert.equal(res.status, 413);
  assert.match((await res.json()).error, /too long/);
  assert.equal(calls.length, 0);
});

test("bad JSON -> 400", async () => {
  const res = await worker.fetch(req("not json"), env);
  assert.equal(res.status, 400);
});

test("CORS: other origin blocked, preflight allowed", async () => {
  const bad = await worker.fetch(req({ message: "x" }, { origin: "https://evil.example" }), env);
  assert.equal(bad.status, 403);
  assert.equal(bad.headers.get("Access-Control-Allow-Origin"), null);
  const pre = await worker.fetch(req(null, { method: "OPTIONS" }), env);
  assert.equal(pre.status, 204);
  assert.equal(pre.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");
});

test("missing key -> 503", async () => {
  const res = await worker.fetch(req({ message: "hi" }), { ...env, GEMINI_API_KEY: "" });
  assert.equal(res.status, 503);
});

test("rate limit: binding says no -> 429", async () => {
  const res = await worker.fetch(req({ message: "hi" }), { ...env, RATE_LIMITER: { limit: async () => ({ success: false }) } });
  assert.equal(res.status, 429);
  assert.match((await res.json()).error, /wait a minute/);
});

test("rate limit: in-memory fallback blocks 11th request in a minute", async () => {
  mockFetch(() => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: "ok" }] } }] })));
  const codes = [];
  for (let i = 0; i < 11; i++) codes.push((await worker.fetch(req({ message: "hi" }, { ip: "9.9.9.9" }), env)).status);
  assert.deepEqual(codes.slice(0, 10), Array(10).fill(200));
  assert.equal(codes[10], 429);
});
