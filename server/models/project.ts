"use strict";
import { Model, Optional } from "sequelize";

// These are all the attributes in the Project model
interface ProjectAttributes {
  id: number;
  title: string;
  active: boolean;
  goal: number;
  funds: number;
  description: string;
  img_url: string;
  category: string;
}

export interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id"> {}
export interface ProjectOutput extends Required<ProjectAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Project
    extends Model<ProjectAttributes, ProjectCreationAttributes>
    implements ProjectAttributes
  {
    id!: number;
    title!: string;
    active!: boolean;
    goal!: number;
    funds!: number;
    description!: string;
    img_url!: string;
    category!: string;

    static associate(models: any) {
      //define association here
      Project.belongsToMany(models.User, {
        through: "ProjectBackings",
      });
      Project.belongsTo(models.User, {
        foreignKey: "CreatorId",
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      goal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      funds: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
