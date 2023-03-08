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

const fetchService = async (
  ctx: Context,
  url: string | URL,
  requestInit?: RequestInit,
) => {
  try {
    const rs = await fetch(url, requestInit);
    const body = new Uint8Array(await rs.arrayBuffer());
    rs.headers.forEach((v, k) => {
      ctx.response.headers.set(k, v);
    });
    ctx.response.body = body;
  } catch (error) {
    ctx.response.body = R.fail(
      EHttpRsCode.GATEWAY_EXCEPTION,
      error?.message || "system",
    );
  }
};

const prepareRequestBody = async (ctx: Context) => {
  if (!ctx.request.hasBody) {
    return null;
  }
  let body: BodyInit | null = null;
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
      body = await (async () => {
        const originalFormData = await bodyWrapper.value.read();
        const formData = new FormData();
        Object.keys(originalFormData.fields).forEach((k) => {
          formData.append(k, originalFormData.fields[k]);
        });
        originalFormData.files?.forEach((e) => {
          if (e.content) {
            formData.append(
              e.name,
              new Blob([e.content], { type: e.contentType }),
              e.filename,
            );
          }
        });
        return formData;
      })();
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

  return body;
};

const proxyRouter = async (
  ctx: Context,
) => {
  const traceId = ctx.state.traceId;
  const url = ctx.state.target;
  const method = ctx.request.method;
  const headers = new Headers(ctx.request.headers);
  headers.set("trace-id", traceId);
  const body = await prepareRequestBody(ctx);
  const requestInit: RequestInit = Object.assign(body ? { body } : {}, {
    headers,
    method,
    credentials: "include",
    mode: "cors",
  } as RequestInit);
  return fetchService(ctx, url, requestInit);
};

const router: Middleware = (ctx, next) => {
  logTraceId("Router", ctx);
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
