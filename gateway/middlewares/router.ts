import { Middleware, R } from "../../shared/deps.ts";
import {
  fileSystemConfig,
  infraConfig,
  userCenterConfig,
  webServerConfig,
} from "../../shared/config.ts";
import { logTraceId } from "./utils.ts";

const prefixMap = {
  [fileSystemConfig.apiPrefix]: fileSystemConfig.port,
  [infraConfig.apiPrefix]: infraConfig.port,
  [userCenterConfig.apiPrefix]: userCenterConfig.port,
  [webServerConfig.apiPrefix]: webServerConfig.port,
};

const router: Middleware = async (ctx, next) => {
  logTraceId("Router", ctx.state.traceId);
  const url = new URL(ctx.request.url);
  const prefix = `/${url.pathname.split("/").at(1) || ""}`;
  const port = prefixMap[prefix as keyof typeof prefixMap];
  if (port) {
    url.port = port;
    url.host = "localhost";
    ctx.response.body = url;
    // TODO Proxy request to url
  } else {
    next();
  }
};

export default router;
