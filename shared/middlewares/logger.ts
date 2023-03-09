import { colors, type Context, format } from "../deps.ts";
import { type IAppState } from "../types.ts";
import { sLog } from "../write-log.ts";
const { cyan, green, red, yellow } = colors;

const X_RESPONSE_TIME = "X-Response-Time";
const User_Agent = "User-Agent";

const logger = async (
  ctx: Context<IAppState>,
  next: () => Promise<unknown>,
) => {
  await next();
  const { response, request } = ctx;
  const responseTime = response.headers.get(X_RESPONSE_TIME);
  const User = request.headers.get(User_Agent);
  const status: number = response.status;
  const serverName = (ctx.state.serverName || "Server").toLocaleUpperCase();

  const log_string = `[${
    format(new Date(Date.now()), "MM-dd-yyyy HH:mm:ss.SSS")
  }  ${serverName}::logger] ${request.ip} "${request.method} ${request.url.pathname}" ${
    String(status)
  } ${User} ${responseTime}`;

  status >= 500
    ? console.log(`${red(log_string)}`) // red
    : status >= 400
    ? console.log(`${yellow(log_string)}`) // yellow
    : status >= 300
    ? console.log(`${cyan(log_string)}`) // cyan
    : status >= 200
    ? console.log(`${green(log_string)}`) // green
    : console.log(`${red(log_string)}`);

  sLog(log_string);
};

/** Response time calculator that also adds response time header. */
const responseTime = async (
  { response }: Context,
  next: () => Promise<unknown>,
) => {
  const start = Date.now();
  await next();
  const ms: number = Date.now() - start;
  response.headers.set(X_RESPONSE_TIME, `${ms}ms`);
};

export default { logger, responseTime };
