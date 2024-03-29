import { Context, EHttpRsCode, R } from "../deps.ts";

export async function modifyHeader(
  ctx: Context,
  next: () => Promise<unknown>,
) {
  ctx.response.headers.set("X-Powered-By", "Deno");
  await next();
}

export async function getRequestBody<T>(
  ctx: Context,
  next?: () => Promise<unknown>,
) {
  await next?.();
  if (!ctx.request.hasBody) {
    return {
      type: "error",
      value: null,
    };
  }
  try {
    const result = ctx.request.body();
    const body = await result.value as T;
    return {
      type: result.type,
      value: body,
    };
  } catch (error) {
    console.log("[GetRequestBody Error]", error);
    return {
      type: "error",
      value: null,
    };
  }
}

export async function json<T>(
  ctx: Context,
  body?: T,
  next?: () => Promise<unknown>,
) {
  ctx.response.headers.set("Content-Type", "application/json; charset=UTF-8");
  await next?.();
  if (body) {
    ctx.response.body = body;
  }
}

export async function notFound(
  ctx: Context,
  next?: () => Promise<unknown>,
) {
  await next?.();
  if (!ctx.response.writable) {
    return;
  }
  ctx.response.body = R.fail(
    EHttpRsCode.REQUEST_NOT_FOUND,
    `${ctx.request.method} ${ctx.request.url.pathname} not found`,
  );
}
