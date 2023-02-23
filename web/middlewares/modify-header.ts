import { Context } from "../../shared/deps.ts";

export default function modifyHeader(
  ctx: Context,
  next: () => Promise<unknown>,
) {
  ctx.response.headers.set("X-Powered-By", "Deno");
  next();
}

export function json(
  ctx: Context,
  next?: () => Promise<unknown>,
) {
  ctx.response.headers.set("Content-Type", "application/json");
  next?.();
}
