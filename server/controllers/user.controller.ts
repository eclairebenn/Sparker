//CRUD Functions - Data Access Layer
import db from "../models";
import { Request, Response } from "express";
import crypto from "crypto";

export const findAll = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll({
      include: {
        model: db.Project,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findById = async (req: Request, res: Response) => {
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

export const signup = async (req: Request, res: Response) => {
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
      console.log(error);
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let message = "";
    const user = await db.User.findOne({ where: { email: req.body.email } });
    const hash = crypto
      .pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    if (hash === user.password) {
      return res.status(200).json(user);
    } else {
      message = "Incorrect Password";
    }

    res.status(401).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
