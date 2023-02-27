import { R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../../shared/middlewares/common.ts";
import { UCPath } from "../types.ts";

export const createUser: RouterMiddleware<UCPath<"/create">> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("createUser");
};
