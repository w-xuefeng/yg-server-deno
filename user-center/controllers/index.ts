import { R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../../shared/middlewares/common.ts";
import { UCPath } from "../types.ts";

export const welcome: RouterMiddleware<UCPath<"/">> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("user center");
};
