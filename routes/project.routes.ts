import { Router, Request, Response } from "express";
import db from "../models";
import * as projectController from "../controllers/project/project.controller";
import { CreateProjectDTO } from "../dto/project.dto";

const projectRouter = Router();

projectRouter.get("/", projectController.findAll);

// projectRouter.post("/", async (req: Request, res: Response) => {
//   const payload: CreateProjectDTO = req.body;
//   const result = await projectController.create(payload);
//   return res.status(200).send(result);
// });

// projectRouter.get("/", (req, res) => {
//   db.Project.findAll({
//     include: {
//       model: db.User,
//     },
//   })
//     .then((result: object) => res.json(result))
//     .catch((err: object) => console.error(err));
// });

export default projectRouter;
