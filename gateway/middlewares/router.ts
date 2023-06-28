import { type Middleware } from "../../shared/deps.ts";
import { type Context } from "../../shared/deps.ts";
import {
  fileSystemConfig,
  infraConfig,
  userCenterConfig,
  webServerConfig,
} from "../../shared/config.ts";
import { logTraceId } from "./utils.ts";
import {
  fetchService,
  prepareRequestURL,
} from "../utils.ts";

const prefixMap = {
  [fileSystemConfig.apiPrefix]: fileSystemConfig.port,
  [infraConfig.apiPrefix]: infraConfig.port,
  [userCenterConfig.apiPrefix]: userCenterConfig.port,
  [webServerConfig.apiPrefix]: webServerConfig.port,
};

const proxyRouter = (ctx: Context, url: string | URL) => {
  const traceId = ctx.state.traceId;
  const headers = new Headers(ctx.request.headers);
  headers.set("trace-id", traceId);
  const requestInit = new Request(
    url,
    Object.assign({}, ctx.request.originalRequest, { url, headers }),
  );
  return fetchService(ctx, url, requestInit);
};

const router: Middleware = (ctx, next) => {
  logTraceId("Router", ctx);
  const url = prepareRequestURL(ctx, prefixMap);
  if (url) {
    return proxyRouter(ctx, url);
  } else {
    next();
  }
};

export default router;
