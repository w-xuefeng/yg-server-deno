import { R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../../shared/middlewares/common.ts";
import type { PathType, VType } from "../../shared/utils.ts";

type UCPath<P extends string, V extends VType = 1> = PathType<"/uc", P, V>;

export const createUser: RouterMiddleware<UCPath<"/create">> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("createUser");
};
