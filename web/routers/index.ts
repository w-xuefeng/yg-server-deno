import { welcome } from "../controllers/index.ts";
import { Router } from "../deps/oak.ts";

const router = new Router();

router.get("/", welcome);

export default router;
