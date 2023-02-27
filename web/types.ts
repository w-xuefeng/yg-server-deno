import config from "./configs/const.ts";
import type { PathType, VType } from "../shared/utils.ts";

export type WebPath<P extends string, V extends VType = 1> = PathType<
  typeof config["apiPrefix"],
  P,
  V
>;
