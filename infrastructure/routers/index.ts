import { Router } from "../../shared/deps.ts";
import { Path } from "../../shared/utils.ts";
import { sendEmail } from "../controllers/email.ts";
import config from "../configs/const.ts";

const router = new Router();
const path = new Path(config.apiPrefix);

router.post(path.union("/email/send"), sendEmail);

export default router;
