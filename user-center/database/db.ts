import { useMySQL } from "../../shared/database.ts";
import config from "../configs/const.ts";

export const db = useMySQL(config.database);
