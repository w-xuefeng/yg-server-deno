import { Application, type ListenOptions } from "./deps.ts";

export function launchFactory(app: Application, options?: ListenOptions) {
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
