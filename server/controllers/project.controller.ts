//CRUD Functions - Data Access Layer
import db from "../models";
import { Request, Response } from "express";

export const findAll = async (req: Request, res: Response, next: any) => {
  const filter = req.query;
  try {
    const projects = await db.Project.findAll({
      include: {
        model: db.Category,
      },
      where: {
        filter,
      },
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findById = async (req: Request, res: Response, next: any) => {
  try {
    const project = await db.Project.findByPk(req.params.id);
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const model = {
      title: req.body.title,
      active: req.body.active,
    };

    try {
      const project = await db.Project.create(model);
      console.log("Project Created");
      return res.status(201).json(project);
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
      title: req.body.title,
      active: req.body.active,
    };

    try {
      const project = await db.Project.update(model, {
        where: { id: req.params.id },
      });
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const project = await db.Project.destroy({ where: { id: req.params.id } });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json(error);
  }
};
