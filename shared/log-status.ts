import { colors, dotenv } from "./deps.ts";

export function logServiceStatus(
  service: string,
  color: "green" | "red",
  statusMsg: string,
) {
  const serviceName = service.toUpperCase();
  const time = new Date().toLocaleString();
  console.log(
    `${colors.cyan(`[${serviceName}]`)}\t${dotenv().DENO_MODE}\t${
      colors[color](statusMsg)
    }\t\t${colors.gray(time)}`,
  );
}

export async function serviceLaunched(
  launch: () => Promise<void>,
  service: string,
  port: string | number,
) {
  try {
    await launch();
    logServiceStatus(
      service,
      "green",
      `Service started successfully at port ${port}`,
    );
  } catch (error) {
    logServiceStatus(
      service,
      "red",
      `Service startup failed, error info as follow:`,
    );
    console.log(error);
  }
}