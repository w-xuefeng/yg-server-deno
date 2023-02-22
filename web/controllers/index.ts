import { R } from "../deps/kit.ts";
import { json } from "../middlewares/modify-header.ts";
import { type RouterMiddleware } from "../deps/oak.ts";

export const welcome: RouterMiddleware<"/"> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("welcome");
};
