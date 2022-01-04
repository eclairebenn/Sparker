import * as projectDAL from "../dal/project.dal";

import { ProjectCreationAttributes, ProjectOutput } from "../models/project";

export const create = (
  payload: ProjectCreationAttributes
): Promise<ProjectOutput> => {
  return projectDAL.create(payload);
};

export const findAll = (): Promise<ProjectOutput[]> => {
  return projectDAL.findAll();
};
