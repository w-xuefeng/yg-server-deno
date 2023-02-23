import { Application } from "./deps/oak.ts";
import { SERVER_PORT } from "./configs/const.ts";
import { serviceLaunched } from "../shared/log-status.ts";
import useMiddlewares from "./middlewares/apply.ts";
import router from "./routers/index.ts";

export default async function bootstrap() {
  const app = useMiddlewares(new Application());
  app.use(router.routes());

  const launch = () => {
    return new Promise<void>((resolve, reject) => {
      app.addEventListener("listen", () => {
        resolve();
      });
      app.addEventListener("error", (e) => {
        reject(e.message);
      });
      app.listen({ port: SERVER_PORT }).catch(reject);
    });
  };

  await serviceLaunched(
    launch,
    "web",
    SERVER_PORT,
  );
}
