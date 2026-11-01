// Entry point. All logic (prompt, limits, CORS) is in chat.js so tests can import its helpers.
import { handler } from "./chat.js";
export default handler;
