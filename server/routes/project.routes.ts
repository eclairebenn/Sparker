import { Router, Request, Response } from "express";
import db from "../models";
import * as projectController from "../controllers/project/project.controller";

const projectRouter = Router();

projectRouter
  .get("/", projectController.findAll)
  .get("/:id", projectController.findById)
  .post("/", projectController.create)
  .put("/:id", projectController.update)
  .delete("/:id", projectController.deleteById);

export default projectRouter;
