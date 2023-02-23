import { serviceLaunched } from "../shared/log-status.ts";
import conf from "./configs/const.ts";

export default function ucBoot() {
  serviceLaunched(() => Promise.resolve(), conf.serverName, conf.port);
}
