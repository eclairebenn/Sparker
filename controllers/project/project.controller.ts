//CRUD Functions - Data Access Layer
import db from "../../models";
import { Request, Response } from "express";

// export const create = async (payload: CreateProjectDTO): Promise<Project> => {
//   return mapper.toProject(await service.create(payload));
// };

export const findAll = async (req: Request, res: Response, next: any) => {
  try {
    const projects = await db.Project.findAll({
      include: {
        model: db.User,
      },
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json(error);
  }
};
