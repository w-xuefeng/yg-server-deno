import { useMySQL } from "../../shared/database.ts";
import config from "../configs/const.ts";
import Role from "../models/role.ts";
import User from "../models/user.ts";

export const db = useMySQL(config.database);

export const linkModel = () => {
  db.link([Role, User]);
};
