import { R, RouterMiddleware } from "../../shared/deps.ts";

export const login: RouterMiddleware<"/"> = (ctx) => {
  ctx.response.body = R.ok("login");
};
