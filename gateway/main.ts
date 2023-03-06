import type { IAppState } from "../shared/types.ts";
import { createApp, launchFactory } from "../shared/app.ts";
import { serviceLaunched } from "../shared/log-status.ts";
import conf from "./configs/const.ts";
import auth from "./middlewares/authentication.ts";
import trace from "./middlewares/trace.ts";
import runas from "./middlewares/runas.ts";
import router from "./middlewares/router.ts";

export default function gatewayBoot() {
  const state: IAppState = {
    serverName: conf.serverName,
  };
  const app = createApp<IAppState>({
    options: { state },
    beforeRouterMiddlewares: [
      trace,
      auth,
      runas,
      router,
    ],
  });
  serviceLaunched(
    launchFactory(app, { port: conf.port }),
    conf.serverName,
    conf.port,
  );
}
