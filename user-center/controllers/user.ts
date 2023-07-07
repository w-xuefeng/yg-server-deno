import { EHttpRsCode, R, RouterMiddleware } from "../../shared/deps.ts";
import { UCPath } from "../types.ts";
import UserService, {
  IGetUserListOptions,
  ZGetUserListOptions,
} from "../services/user.ts";
import { calcPages } from "../../shared/utils.ts";
import { validatorPaginationQueriesByZod } from "../../shared/zod.ts";
import { json } from "../../shared/middlewares/common.ts";

export const create: RouterMiddleware<UCPath<"/user/create">> = (ctx) => {
  json(ctx, R.ok("createUser"));
};

export const list: RouterMiddleware<UCPath<"/user/list">> = async (ctx) => {
  const {
    success,
    message,
    queries,
  } = validatorPaginationQueriesByZod<IGetUserListOptions>(
    ZGetUserListOptions,
    ctx,
  );

  if (!success) {
    ctx.response.body = R.fail(
      EHttpRsCode.MISSING_PARAMETER,
      message,
    );
    return;
  }

  const data = await UserService.getUserList(queries);
  const body = R.pageOk(
    data.list,
    queries.pageSize,
    queries.pageNumber,
    data.totalCount,
    calcPages(data.totalCount, queries.pageSize),
  );
  json(ctx, body);
};
