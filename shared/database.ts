import { DenoDB, ModelSchema } from "./deps.ts";

export function useMySQL(options: DenoDB.MySQLOptions, modals?: ModelSchema[]) {
  const connector = new DenoDB.MySQLConnector(options);
  const db = new DenoDB.Database(connector);
  return modals ? db.link(modals) : db;
}
