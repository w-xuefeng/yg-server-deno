import { useMySQL } from "../../shared/database.ts";
import config from "../configs/const.ts";
import Position, { builtInPosition } from "../models/position.ts";
import Role, { builtInRole } from "../models/role.ts";
import User from "../models/user.ts";

export const db = useMySQL(config.database);

export async function linkModel() {
  await db.link([Position, Role, User]).sync({ drop: true });
  await builtInRole();
  await builtInPosition();
}
