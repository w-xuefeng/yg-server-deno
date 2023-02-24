import {
  Application,
  OakTypes,
  type State,
  type ApplicationOptions,
  type ListenOptions,
} from "./deps.ts";
import useBaseMiddlewares from "./middlewares/apply.ts";

export function createApp<T extends State>(
  options: ApplicationOptions<T, OakTypes.ServerRequest>,
) {
  return useBaseMiddlewares(new Application<T>(options));
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
