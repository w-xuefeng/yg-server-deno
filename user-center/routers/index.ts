import { Router } from "../../shared/deps.ts";
import { Path } from "../../shared/utils.ts";
import { welcome } from "../controllers/index.ts";
import { createUser, list } from "../controllers/user.ts";
import config from "../configs/const.ts";

const router = new Router();
const path = new Path(config.apiPrefix);

router.get(path.union("/"), welcome);
router.get(path.union("/user/list"), list);
router.post(path.union("/create"), createUser);

export default router;
