import { colors, type Context, format } from "../../shared/deps.ts";

export function logTraceId(middlewareName: string, ctx: Context) {
  const middleware = colors.gray(`[Gateway ${middlewareName}]`);
  const method = colors.blue(ctx.request.method);
  const href = ctx.request.url.href;
  const content = `${colors.gray("traceId:")} ${
    colors.italic(ctx.state.traceId)
  }`;
  const time = colors.gray(
    format(new Date(Date.now()), "MM-dd-yyyy HH:mm:ss.SSS"),
  );
  console.log(`${middleware} ${method} ${href} ${content} ${time}`);
}
