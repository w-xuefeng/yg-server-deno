import { EHttpRsCode, R, RouterMiddleware } from "../../shared/deps.ts";
import { json } from "../../shared/middlewares/common.ts";
import { UCPath } from "../types.ts";
import UserService, {
  IGetUserListOptions,
  ZGetUserListOptions,
} from "../services/user.ts";
import { calcPages, getPaginationQueries } from "../../shared/utils.ts";
import { validatorOptionsByZod } from "../../shared/zod.ts";

export const createUser: RouterMiddleware<UCPath<"/create">> = (ctx) => {
  json(ctx);
  ctx.response.body = R.ok("createUser");
};

export const list: RouterMiddleware<UCPath<"/user/list">> = async (ctx) => {
  json(ctx);
  const queries = getPaginationQueries<IGetUserListOptions>(ctx);
  const rs = validatorOptionsByZod(ZGetUserListOptions, queries);

  if (!rs.success) {
    ctx.response.body = R.fail(
      EHttpRsCode.MISSING_PARAMETER,
      rs.message,
    );
    return;
  }
  const data = await UserService.getUserList(queries);
  ctx.response.body = R.pageOk(
    data.list,
    queries.pageSize,
    queries.pageNumber,
    data.totalCount,
    calcPages(data.totalCount, queries.pageSize),
  );
};
