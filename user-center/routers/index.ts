import { Router } from "../../shared/deps.ts";
import { Path } from "../../shared/utils.ts";
import { welcome } from "../controllers/index.ts";
import { createUser } from "../controllers/user.ts";
import config from "../configs/const.ts";

const router = new Router();
const path = new Path(config.apiPrefix);

router.get(path.union("/"), welcome);
router.post(path.union("/create"), createUser);

export default router;
