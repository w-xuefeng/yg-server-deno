import { R, RouterMiddleware } from "../../shared/deps.ts";
import { UCPath } from "../types.ts";

export const welcome: RouterMiddleware<UCPath<"/">> = (ctx) => {
  ctx.response.body = R.ok("user center");
};
