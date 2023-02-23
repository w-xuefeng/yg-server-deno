import { gatewayConfig } from "../../shared/config.ts";

export const defaultConfig = {
  serverName: "gw",
  port: 5000,
};

export default Object.assign(
  defaultConfig,
  gatewayConfig,
  {},
);
