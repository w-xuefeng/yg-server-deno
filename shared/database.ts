import { DenoDB } from "./deps.ts";

export function useMySQL(options: DenoDB.MySQLOptions) {
  const connector = new DenoDB.MySQLConnector(options);
  const db = new DenoDB.Database(connector);
  return db;
}
