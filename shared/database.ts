import { Database, MySQLConnector, MySQLOptions } from "./deps.ts";

export function useMySQL(options: MySQLOptions) {
  const connector = new MySQLConnector(options);
  const db = new Database(connector);
  return db;
}
