import { z } from "../../shared/deps.ts";
import { filterEmptyField } from "../../shared/utils.ts";
import { ZPaginationParams } from "../../shared/zod.ts";
import User, { IUser } from "../models/user.ts";

export const ZGetUserListOptions = ZPaginationParams.extend({
  role: z.string().optional(),
  position: z.string().optional(),
  gender: z.string().optional(),
  college: z.string().optional(),
  major: z.string().optional(),
});

export type IGetUserListOptions = z.infer<typeof ZGetUserListOptions>;

export default class UserService {
  static async getUserList(options: IGetUserListOptions): Promise<{
    totalCount: number;
    list: IUser[];
  }> {
    const { pageSize, pageNumber, ...rest } = options;
    const offset = (pageNumber - 1) * pageNumber;
    const condition = filterEmptyField(rest);
    const list = (
      await User.where(condition)
        .offset(offset)
        .limit(pageSize)
        .all()
    ) as unknown as IUser[];
    const totalCount = await User.where(condition).count();
    return {
      totalCount,
      list,
    };
  }
}
