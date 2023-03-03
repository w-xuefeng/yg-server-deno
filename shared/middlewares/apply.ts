import { Application, Middleware, State } from "../deps.ts";
import { modifyHeader } from "./common.ts";
import logger from "./logger.ts";

export default function useBaseMiddlewares<
  S extends State,
  T extends Application<S>,
>(
  app: T,
  middlewares: (Middleware | undefined)[] = [],
) {
  app.use(modifyHeader)
    .use(logger.logger)
    .use(logger.responseTime);

  middlewares.forEach((middleware) => {
    typeof middleware === "function" && app.use(middleware);
  });

  return app;
}
