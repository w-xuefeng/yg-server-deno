import type { Middleware } from "../../shared/deps.ts";
import { logTraceId } from "./utils.ts";

const auth: Middleware = async (ctx, next) => {
  logTraceId("Auth", ctx.state.traceId);
  await next();
};

export default auth;
