import { Router } from "../../shared/deps.ts";
import { Path } from "../../shared/utils.ts";
import { welcome } from "../controllers/index.ts";
import config from "../configs/const.ts";

const router = new Router();
const path = new Path(config.apiPrefix);

router.get(path.union("/"), welcome);

export default router;
