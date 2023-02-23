import { fileSystemConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "fs",
  port: 7000,
};

export default Object.assign(
  defaultConfig,
  fileSystemConfig,
  {},
);
