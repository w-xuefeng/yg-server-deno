import { serviceLaunched } from "../shared/log-status.ts";

export default async function ucBoot() {
  await serviceLaunched(() => Promise.resolve(), "uc", 9000);
}
