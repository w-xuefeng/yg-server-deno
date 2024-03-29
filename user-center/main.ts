import type { IAppState } from "../shared/types.ts";
import { createApp, launchFactory } from "../shared/app.ts";
import { serviceLaunched } from "../shared/log-status.ts";
import router from "./routers/index.ts";
import conf from "./configs/const.ts";
import "./database/db.ts";

export default function ucBoot() {
  const state: IAppState = {
    serverName: conf.serverName,
  };
  const app = createApp<IAppState>({
    options: { state },
    router: router.routes(),
  });
  serviceLaunched(
    launchFactory(app, { port: conf.port }),
    conf.serverName,
    conf.port,
  );
}
