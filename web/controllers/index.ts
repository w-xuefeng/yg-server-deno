import { R } from "../deps/kit.ts";
import { type RouterMiddleware } from "../deps/oak.ts";

export const welcome: RouterMiddleware<"/"> = (ctx) => {
  ctx.response.body = R.ok("welcome");
};
