//CRUD Functions - Data Access Layer

//create, findAll, findOne, findAllFiltered, update, delete
import * as service from "../../services/project.service";
import { CreateProjectDTO } from "../../dto/project.dto";
import { Project } from "../../interfaces/project.interface";
import * as mapper from "./mapper";
import db from "../../models";
import { ProjectOutput } from "../../models/project";
import { Request, Response } from "express";
//const Project = db.Project;

export const create = async (payload: CreateProjectDTO): Promise<Project> => {
  return mapper.toProject(await service.create(payload));
};

// export const findAll = async (): Promise<Project[]> => {
//   return (await service.findAll()).map(mapper.toProject);
// };

// export const findAll = async (): Promise<ProjectOutput[]> => {
//   const projects = await db.Project.findAll({
//     include: {
//       model: db.User,
//     },
//   });
//   return projects;
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

// projectRouter.get("/", (req, res) => {
//   db.Project.findAll({
//     include: {
//       model: db.User,
//     },
//   })
//     .then((result: object) => res.json(result))
//     .catch((err: object) => console.error(err));
// });
