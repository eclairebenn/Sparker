//CRUD Functions - Data Access Layer
import db from "../models";
import { Request, Response } from "express";

export const findAll = async (req: Request, res: Response, next: any) => {
  try {
    const users = await db.User.findAll({
      include: {
        model: db.User,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findById = async (req: Request, res: Response, next: any) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const model = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const user = await db.User.create(model);
      console.log("user Created");
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const model = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const user = await db.User.update(model, {
        where: { id: req.params.id },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const user = await db.User.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
