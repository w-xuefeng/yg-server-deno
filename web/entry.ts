import { Application } from "../shared/deps.ts";
import { launchFactory } from "../shared/app.ts";
import { serviceLaunched } from "../shared/log-status.ts";
import useMiddlewares from "./middlewares/apply.ts";
import router from "./routers/index.ts";
import conf from "./configs/const.ts";

export default async function bootstrap() {
  const app = useMiddlewares(new Application());
  app.use(router.routes());
  await serviceLaunched(
    launchFactory(app, { port: conf.port }),
    conf.serverName,
    conf.port,
  );
}
