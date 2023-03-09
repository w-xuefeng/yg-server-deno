import { colors, type Context, format } from "../../shared/deps.ts";
import { sLog } from "../../shared/write-log.ts";

export function logTraceId(middlewareName: string, ctx: Context) {
  const pureMiddleware = `[Gateway ${middlewareName}]`;
  const pureMethod = ctx.request.method;
  const pureHref = ctx.request.url.href;
  const pureContent = `${("traceId:")} ${ctx.state.traceId}`;
  const pureTime = format(new Date(Date.now()), "MM-dd-yyyy HH:mm:ss.SSS");

  const middleware = colors.gray(pureMiddleware);
  const method = colors.blue(pureMethod);
  const href = pureHref;
  const content = `${colors.gray("traceId:")} ${
    colors.italic(ctx.state.traceId)
  }`;
  const time = colors.gray(pureTime);

  console.log(`${middleware} ${method} ${href} ${content} ${time}`);
  sLog(
    `${pureMiddleware} ${pureMethod} ${pureHref} ${pureContent} ${pureTime}`,
  );
}
