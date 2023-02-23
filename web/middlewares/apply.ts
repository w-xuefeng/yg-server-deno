import { Application, logger } from "../../shared/deps.ts";
import modifyHeader from "./modify-header.ts";

export default function useMiddlewares<T extends Application>(app: T) {
  app.use(modifyHeader)
    .use(logger.logger)
    .use(logger.responseTime);
  return app;
}
