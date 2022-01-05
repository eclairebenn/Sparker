import { Op } from "sequelize";
import db from "../models";
import { ProjectCreationAttributes, ProjectOutput } from "../models/project";

const Project = db.Project;

export const create = async (
  payload: ProjectCreationAttributes
): Promise<ProjectOutput> => {
  const project = await Project.create(payload);
  return project;
};

export const findAll = async (): Promise<ProjectOutput[]> => {
  const projects = await Project.findAll({
    include: {
      model: db.User,
    },
  });
  return projects;
};
