import { dotenv } from "./deps.ts";

export const env = dotenv();
export const gatewayConfig = {
  port: env.PORT_GW,
  database: {
    host: env.DB_GW_HOST,
    database: env.DB_GW_DBNAME,
    username: env.DB_GW_USERNAME,
    password: env.DB_GW_PASSWORD,
    port: Number(env.DB_GW_PORT),
    charset: "utf8mb4",
  },
};
export const infraConfig = {
  apiPrefix: "/infra" as const,
  port: env.PORT_INFRA,
};
export const fileSystemConfig = {
  apiPrefix: "/fgw" as const,
  port: env.PORT_FS,
  database: {
    host: env.DB_FS_HOST,
    database: env.DB_FS_DBNAME,
    username: env.DB_FS_USERNAME,
    password: env.DB_FS_PASSWORD,
    port: Number(env.DB_FS_PORT),
    charset: "utf8mb4",
  },
};
export const userCenterConfig = {
  apiPrefix: "/uc" as const,
  port: env.PORT_UC,
  database: {
    host: env.DB_UC_HOST,
    database: env.DB_UC_DBNAME,
    username: env.DB_UC_USERNAME,
    password: env.DB_UC_PASSWORD,
    port: Number(env.DB_UC_PORT),
    charset: "utf8mb4",
  },
};
export const webServerConfig = {
  apiPrefix: "/web" as const,
  port: env.PORT_WEB,
  database: {
    host: env.DB_WEB_HOST,
    database: env.DB_WEB_DBNAME,
    username: env.DB_WEB_USERNAME,
    password: env.DB_WEB_PASSWORD,
    port: Number(env.DB_WEB_PORT),
    charset: "utf8mb4",
  },
};
