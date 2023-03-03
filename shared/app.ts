import {
  Application,
  type ApplicationOptions,
  type ListenOptions,
  type Middleware,
  OakTypes,
  type State,
} from "./deps.ts";
import useBaseMiddlewares from "./middlewares/apply.ts";
import { notFound } from "./middlewares/common.ts";

export function createApp<T extends State>(
  options?: {
    options?: ApplicationOptions<T, OakTypes.ServerRequest>;
    router?: Middleware;
    middlewares?: Middleware[];
  },
) {
  return useBaseMiddlewares(
    new Application<T>(options?.options),
    [options?.router, notFound].concat(options?.middlewares),
  );
}

export function launchFactory<T extends State>(
  app: Application<T>,
  options?: ListenOptions,
) {
  return function () {
    return new Promise<void>((resolve, reject) => {
      app.addEventListener("listen", () => {
        resolve();
      });
      app.addEventListener("error", (e) => {
        reject(e.message);
      });
      app.listen(options).catch(reject);
    });
  };
}
