// Entry point. All logic (prompt, limits, CORS) is in chat.js so tests can import its helpers.
// VisitCounter is the Durable Object behind /visit (see visits.js).
import { handler } from "./chat.js";
export { VisitCounter } from "./visits.js";
export default handler;
