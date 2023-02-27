import { R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../../shared/middlewares/common.ts";
import { WebPath } from "../types.ts";

export const welcome: RouterMiddleware<WebPath<"/">> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("welcome");
};
