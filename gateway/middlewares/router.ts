import { EHttpRsCode, Middleware, R } from "../../shared/deps.ts";
import {
  fileSystemConfig,
  infraConfig,
  userCenterConfig,
  webServerConfig,
} from "../../shared/config.ts";
import { logTraceId } from "./utils.ts";
import { type Context } from "../../shared/deps.ts";

const prefixMap = {
  [fileSystemConfig.apiPrefix]: fileSystemConfig.port,
  [infraConfig.apiPrefix]: infraConfig.port,
  [userCenterConfig.apiPrefix]: userCenterConfig.port,
  [webServerConfig.apiPrefix]: webServerConfig.port,
};

const proxyRouter = async (
  ctx: Context,
) => {
  const traceId = ctx.state.traceId;
  const url = ctx.state.target;
  const method = ctx.request.method;
  const headers = new Headers(ctx.request.headers);
  headers.set("trace-id", traceId);
  let body: BodyInit | null = null;
  if (ctx.request.hasBody) {
    const bodyWrapper = ctx.request.body();
    switch (bodyWrapper.type) {
      case "undefined":
        break;
      case "bytes":
        body = await bodyWrapper.value;
        break;
      case "form":
        body = await bodyWrapper.value;
        break;
      case "form-data":
        const originalformData = await bodyWrapper.value.read();
        const formDate = new FormData();
        Object.keys(originalformData.fields).forEach((k) => {
          formDate.append(k, originalformData.fields[k]);
        });
        originalformData.files?.forEach((e) => {
          if (e.content) {
            formDate.append(
              e.name,
              new Blob([e.content], { type: e.contentType }),
              e.filename,
            );
          }
        });
        body = formDate;
        break;
      case "json":
        body = JSON.stringify(await bodyWrapper.value);
        break;
      case "text":
        body = await bodyWrapper.value;
        break;

      default:
        break;
    }
  }
  return fetch(
    url,
    Object.assign(body ? { body } : {}, {
      headers,
      method,
    }),
  ).then((rs) => {
    const contentType = rs.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return rs.json();
    }
    if (contentType?.includes("application/octet-stream")) {
      return rs.blob();
    }
    if (contentType?.startsWith("text/")) {
      return rs.text();
    }
    return rs.json();
  }).then((rs) => {
    ctx.response.body = rs;
  }).catch((error) => {
    ctx.response.body = R.fail(
      EHttpRsCode.GATEWAY_EXCEPTION,
      error?.message || "system",
    );
  });
};

const router: Middleware = async (ctx, next) => {
  logTraceId("Router", ctx.state.traceId);
  const url = new URL(ctx.request.url);
  const prefix = `/${url.pathname.split("/").at(1) || ""}`;
  const port = prefixMap[prefix as keyof typeof prefixMap];
  if (port) {
    url.port = port;
    url.host = "localhost";
    ctx.state.target = url;
    return proxyRouter(ctx);
  } else {
    next();
  }
};

export default router;
