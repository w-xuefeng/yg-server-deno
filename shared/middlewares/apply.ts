import { Application, State } from "../deps.ts";
import { modifyHeader } from "./common.ts";
import logger from "./logger.ts";

export default function useBaseMiddlewares<S extends State, T extends Application<S>>(app: T) {
  app.use(modifyHeader)
    .use(logger.logger)
    .use(logger.responseTime);
  return app;
}
