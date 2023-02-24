import type { IAppState } from "../shared/types.ts";
import { createApp, launchFactory } from "../shared/app.ts";
import { serviceLaunched } from "../shared/log-status.ts";
import router from "./routers/index.ts";
import conf from "./configs/const.ts";

export default function bootstrap() {
  const state: IAppState = {
    serverName: conf.serverName,
  };
  const app = createApp<IAppState>({ state });
  app.use(router.routes());
  serviceLaunched(
    launchFactory(app, { port: conf.port }),
    conf.serverName,
    conf.port,
  );
}
