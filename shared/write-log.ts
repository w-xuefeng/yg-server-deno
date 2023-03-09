import { existsSync } from "./deps.ts";
import { createPathSync, pathJoin } from "./file.ts";
import { env } from "./config.ts";

export function logToFile(content: string, rootPath: string) {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const az = (e: number) => e < 10 ? `0${e}` : e;
    const fileName = `${year}-${az(month)}-${az(day)}.log`;
    const logFile = pathJoin([rootPath, year], fileName);
    if (!existsSync(logFile)) {
      createPathSync("file", logFile);
    }
    Deno.writeTextFileSync(logFile, `${content}\n`, {
      append: true,
      create: true,
    });
  } catch {
    // ignore
  }
}

export function sLog(info: string, serverName = "") {
  const sn = serverName ? `[${serverName}] ` : "";
  logToFile(`${sn}${info}`, env.LOG_PATH);
}
