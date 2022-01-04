import { Router, Request, Response } from "express";
import * as projectController from "../controllers/project/project.controller";
import { CreateProjectDTO } from "../dto/project.dto";

const projectRouter = Router();

projectRouter.get("/", async (req: Request, res: Response) => {
  const results = await projectController.findAll();
  return res.status(200).send(results);
});

projectRouter.post("/", async (req: Request, res: Response) => {
  const payload: CreateProjectDTO = req.body;
  const result = await projectController.create(payload);
  return res.status(200).send(result);
});

export default projectRouter;
