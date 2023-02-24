import { Router } from "../../shared/deps.ts";
import { welcome } from "../controllers/index.ts";

const router = new Router();

router.get("/", welcome);

export default router;
