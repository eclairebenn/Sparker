import { Router, Request, Response } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

userRouter
  .get("/", userController.findAll)
  .get("/:id", userController.findById)
  .post("/", userController.create)
  .put("/:id", userController.update)
  .delete("/:id", userController.deleteById);

export default userRouter;
