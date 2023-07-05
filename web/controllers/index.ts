import { R, RouterMiddleware } from "../../shared/deps.ts";
import { WebPath } from "../types.ts";

export const welcome: RouterMiddleware<WebPath<"/">> = (ctx) => {
  ctx.response.body = R.ok("welcome");
};
