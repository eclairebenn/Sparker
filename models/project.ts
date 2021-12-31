"use strict";
import { Model } from "sequelize";

// These are all the attributes in the Project model
interface ProjectAttributes {
  id: number;
  title: string;
  active: boolean;
  // funded: boolean;
  // goal: number;
  // funds: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    title!: string;
    active!: boolean;

    static associate(models: any) {
      // define association here
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
      active: {
        type: DataTypes.BOOLEAN,
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
