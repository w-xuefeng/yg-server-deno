import { fileSystemConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "fs",
  port: 7000,
  apiPrefix: "/fgw" as const,
};

export default Object.assign(
  defaultConfig,
  fileSystemConfig,
  {},
);
