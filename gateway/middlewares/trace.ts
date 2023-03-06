import type { Middleware } from "../../shared/deps.ts";
import { nanoid } from "../deps.ts";
import { logTraceId } from "./utils.ts";

const trace: Middleware = async (ctx, next) => {
  const traceId = ctx.request.headers.get("trace-id") || nanoid();
  ctx.state.traceId = traceId;
  logTraceId("Trace", traceId);
  await next();
};

export default trace;
