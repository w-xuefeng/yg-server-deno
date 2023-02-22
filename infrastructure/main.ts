import { serviceLaunched } from "../shared/log-status.ts";

export default function infraBoot() {
  serviceLaunched(() => Promise.resolve(), "infra", 6000);
}
