import { colors, format } from "../../shared/deps.ts";

export function logTraceId(middlewareName: string, traceId: string) {
  const middleware = colors.gray(`[Gateway ${middlewareName}]`);
  const content = colors.gray(`traceId: ${colors.italic(traceId)}`);
  const time = colors.gray(
    format(new Date(Date.now()), "MM-dd-yyyy HH:mm:ss.SSS"),
  );
  console.log(`${middleware} ${content}\t\t${time}`);
}
