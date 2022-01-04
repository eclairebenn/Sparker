import { Project } from "../../interfaces/project.interface";
import { ProjectOutput } from "../../models/project";

export const toProject = (project: ProjectOutput): Project => {
  return {
    id: project.id,
    title: project.title,
    active: project.active,
  };
};
