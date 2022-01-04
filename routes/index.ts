import { Router } from "express";
import projectRouter from "./project.routes";

const router = Router();

router.use("projects", projectRouter);

export default router;
