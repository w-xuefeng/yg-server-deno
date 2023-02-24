import { Router } from "../../shared/deps.ts";
import { Path } from "../../shared/utils.ts";
import { welcome } from "../controllers/index.ts";
import { createUser } from "../controllers/user.ts";

const router = new Router();
const u = new Path("/uc").u;

router.get("/", welcome);
router.post(u("/create"), createUser);

export default router;
