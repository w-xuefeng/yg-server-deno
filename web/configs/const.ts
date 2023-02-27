import { webServerConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "web",
  port: 8000,
  apiPrefix: "/web" as const,
};

export default Object.assign(
  defaultConfig,
  webServerConfig,
  {},
);
