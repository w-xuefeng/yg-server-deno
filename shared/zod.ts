import {
  IPaginationParams,
  OakHelpers,
  z,
  ZodError,
  ZodRawShape,
} from "./deps.ts";
import { getRequestBody } from "./middlewares/common.ts";
import { TRouterContext } from "./types.ts";
import { mapPaginationQueries } from "./utils.ts";

export const ZPaginationParams = z.object({
  pageSize: z.number().gt(0),
  pageNumber: z.number().gt(0),
});

export function getZodErrorFirstMessage(zodError: ZodError): string {
  const msg = JSON.parse(zodError.message);
  if (Array.isArray(msg)) {
    const item = msg?.at(0) as { path: string[]; message: string };
    const path = item?.path?.join(".");
    const message = item?.message;
    return path && message ? `${path}: ${message}` : "";
  }
  return "";
}

export function validatorOptionsByZod<
  T = Record<string, string>,
  Z extends z.ZodObject<ZodRawShape> = z.ZodObject<ZodRawShape>,
>(zodTypes: Z, options: T) {
  const rs = zodTypes.safeParse(options);
  let message = "";
  if (!rs.success) {
    message = getZodErrorFirstMessage(rs.error);
  }
  return Object.assign({ message }, rs);
}

export async function validatorBodyByZod<
  T = Record<string, string>,
  Z extends z.ZodObject<ZodRawShape> = z.ZodObject<ZodRawShape>,
>(
  zodTypes: Z,
  ctx: TRouterContext,
  // deno-lint-ignore no-explicit-any
  mapFunction: (d: Record<string, any> | T | null | undefined) => T = (d) =>
    d as T,
) {
  const body = mapFunction((await getRequestBody<T>(ctx))?.value);
  return Object.assign({ body }, validatorOptionsByZod(zodTypes, body));
}

export function validatorQueriesByZod<
  // deno-lint-ignore no-explicit-any
  T = Record<string, any>,
  Z extends z.ZodObject<ZodRawShape> = z.ZodObject<ZodRawShape>,
>(
  zodTypes: Z,
  ctx: TRouterContext,
  mapFunction: (d: Record<string, string | undefined | null>) => T = (d) =>
    d as T,
) {
  const queries = mapFunction(OakHelpers.getQuery(ctx, { mergeParams: true }));
  return Object.assign({ queries }, validatorOptionsByZod(zodTypes, queries));
}

export function validatorPaginationQueriesByZod<
  // deno-lint-ignore no-explicit-any
  T extends (Record<string, any> & IPaginationParams),
  Z extends z.ZodObject<ZodRawShape> = z.ZodObject<ZodRawShape>,
>(
  zodTypes: Z,
  ctx: TRouterContext,
) {
  return validatorQueriesByZod<T, Z>(
    zodTypes,
    ctx,
    mapPaginationQueries,
  );
}
