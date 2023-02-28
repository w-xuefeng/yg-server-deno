import { useMySQL } from "../../shared/database.ts";
import config from "../configs/const.ts";
import Position, { builtInPosition } from "../models/position.ts";
import Role, { builtInRole } from "../models/role.ts";
import User from "../models/user.ts";

export const models = [Position, Role, User];
export const db = useMySQL(config.database, models);

export async function syncDatabase() {
  await db.sync({ drop: true });
  await builtInRole();
  await builtInPosition();
}
