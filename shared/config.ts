import { dotenv } from "./deps.ts";

const env = dotenv();
export const gatewayConfig = {
  port: env.PORT_GW,
  database: {
    host: env.DB_GW_HOST,
    database: env.DB_GW_DBNAME,
    username: env.DB_GW_USERNAME,
    password: env.DB_GW_PASSWORD,
    port: env.DB_GW_PORT,
  },
};
export const infraConfig = {
  port: env.PORT_INFRA,
};
export const fileSystemConfig = {
  port: env.PORT_FS,
  database: {
    host: env.DB_FS_HOST,
    database: env.DB_FS_DBNAME,
    username: env.DB_FS_USERNAME,
    password: env.DB_FS_PASSWORD,
    port: env.DB_FS_PORT,
  },
};
export const userCenterConfig = {
  port: env.PORT_UC,
  database: {
    host: env.DB_UC_HOST,
    database: env.DB_UC_DBNAME,
    username: env.DB_UC_USERNAME,
    password: env.DB_UC_PASSWORD,
    port: env.DB_UC_PORT,
  },
};
export const webServerConfig = {
  port: env.PORT_WEB,
  database: {
    host: env.DB_WEB_HOST,
    database: env.DB_WEB_DBNAME,
    username: env.DB_WEB_USERNAME,
    password: env.DB_WEB_PASSWORD,
    port: env.DB_WEB_PORT,
  },
};
