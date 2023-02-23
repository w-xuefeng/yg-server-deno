import { dotenv } from './deps.ts';

const env = dotenv();
export const gatewayConfig = {
  port: env.PORT_GW,
};
export const infraConfig = {
  port: env.PORT_INFRA,
};
export const fileSystemConfig = {
  port: env.PORT_FS,
};
export const userCenterConfig = {
  port: env.PORT_UC,
};
export const webServerConfig = {
  port: env.PORT_WEB,
};
