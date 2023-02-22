import { Application } from "./deps/oak.ts";
import { SERVER_PORT } from "./configs/const.ts";
import useMiddlewares from "./middlewares/mod.ts";
import router from "./routers/index.ts";

export default function bootstrap() {
  const app = useMiddlewares(new Application());
  app.use(router.routes());
  app.listen({ port: SERVER_PORT });
}
