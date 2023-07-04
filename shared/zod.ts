import { z, ZodError, ZodRawShape } from "./deps.ts";

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
  Z extends z.ZodObject<ZodRawShape> = z.ZodObject<ZodRawShape>,
  T = Record<string, string>,
>(zodTypes: Z, options: T) {
  const rs = zodTypes.safeParse(options);
  let message = "";
  if (!rs.success) {
    message = getZodErrorFirstMessage(rs.error);
  }
  return Object.assign({ message }, rs);
}
