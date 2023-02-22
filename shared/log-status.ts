import * as colors from "https://deno.land/std@0.53.0/fmt/colors.ts";

export function serviceLaunched(
  launch: () => Promise<void>,
  service: string,
  port: string | number,
) {
  const serviceName = service.toUpperCase();
  const time = new Date().toLocaleString();
  try {
    launch();
  } catch (error) {
    console.log(
      `${colors.cyan(`[${serviceName}]`)}\t${
        colors.red("Service startup failed, error info as follow:")
      }\t\t${colors.gray(time)}`,
    );
    console.log(colors.gray(error));
    return;
  }

  console.log(
    `${colors.cyan(`[${serviceName}]`)}\t${
      colors.green(`Service started successfully at port ${port}`)
    }\t\t${colors.gray(time)}`,
  );
}
