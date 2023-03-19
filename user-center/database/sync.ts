import config from "../configs/const.ts";
import { dbSync } from "../../shared/utils.ts";
import { builtInPosition } from "../models/position.ts";
import { builtInRole } from "../models/role.ts";
import { db } from "./db.ts";

dbSync(config.serverName, async () => {
  await db.sync({ drop: true });
  await builtInRole();
  await builtInPosition();
});
