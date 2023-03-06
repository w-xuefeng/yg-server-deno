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
    beforeRouterMiddlewares?: Middleware[];
    afterRouterMiddlewares?: Middleware[];
  },
) {
  return useBaseMiddlewares(
    new Application<T>(options?.options),
    ([] as Middleware[])
      .concat(options?.beforeRouterMiddlewares || [])
      .concat(options?.router || [])
      .concat(options?.afterRouterMiddlewares || [])
      .concat(notFound)
      .filter((e) => !!e),
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
