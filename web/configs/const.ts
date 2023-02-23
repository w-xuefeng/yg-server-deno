import { webServerConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "web",
  port: 8000,
};

export default Object.assign(
  defaultConfig,
  webServerConfig,
  {},
);
