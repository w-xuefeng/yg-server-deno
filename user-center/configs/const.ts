import { userCenterConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "uc",
  port: 9000,
  apiPrefix: "/uc" as const,
};

export default Object.assign(
  defaultConfig,
  userCenterConfig,
  {},
);
