import { serviceLaunched } from "../shared/log-status.ts";

export default function gatewayBoot() {
  serviceLaunched(() => Promise.resolve(), "gw", 5000);
}
