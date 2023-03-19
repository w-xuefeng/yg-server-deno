import { useMySQL } from "../../shared/database.ts";
import config from "../configs/const.ts";
import Position from "../models/position.ts";
import Role from "../models/role.ts";
import User from "../models/user.ts";

export const models = [Position, Role, User];
export const db = useMySQL(config.database, models);
