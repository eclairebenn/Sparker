import { Router, Request, Response } from "express";
import * as userController from "../controllers/user.controller";
import db from "../models";
const User = db.User;

const userRouter = Router();

userRouter
  .get("/", userController.findAll)
  .get("/:id", userController.findById)
  .post("/", userController.create)
  .put("/:id", userController.update)
  .delete("/:id", userController.deleteById)
  .post("/login", userController.login)
  .post("/signup", userController.signup);

export default userRouter;
