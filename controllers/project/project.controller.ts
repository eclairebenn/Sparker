//CRUD Functions - Data Access Layer

//create, findAll, findOne, findAllFiltered, update, delete
import * as service from "../../services/project.service";
import { CreateProjectDTO } from "../../dto/project.dto";
import { Project } from "../../interfaces/project.interface";
import * as mapper from "./mapper";

export const create = async (payload: CreateProjectDTO): Promise<Project> => {
  return mapper.toProject(await service.create(payload));
};

export const findAll = async (): Promise<Project[]> => {
  return (await service.findAll()).map(mapper.toProject);
};
