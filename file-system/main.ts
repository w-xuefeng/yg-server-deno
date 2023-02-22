import { serviceLaunched } from "../shared/log-status.ts";

export default function fsBoot() {
  serviceLaunched(() => Promise.resolve(), "fs", 7000);
}
