import { infraConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "infra",
  port: 6000,
  apiPrefix: "/infra" as const,
};

export default Object.assign(
  defaultConfig,
  infraConfig,
  {},
);
