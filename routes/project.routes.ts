import { Router, Request, Response } from "express";
import db from "../models";
import * as projectController from "../controllers/project/project.controller";

const projectRouter = Router();

projectRouter.get("/", projectController.findAll);

export default projectRouter;
