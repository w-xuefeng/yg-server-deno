import { R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../middlewares/modify-header.ts";

export const welcome: RouterMiddleware<"/"> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("welcome");
};
