import { R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../../shared/middlewares/common.ts";

export const welcome: RouterMiddleware<"/"> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("user center");
};
