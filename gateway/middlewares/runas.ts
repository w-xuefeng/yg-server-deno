import type { Middleware } from "../../shared/deps.ts";
import { logTraceId } from "./utils.ts";

const runas: Middleware = async (ctx, next) => {
  logTraceId("RunAs", ctx.state.traceId);
  await next();
};

export default runas;
