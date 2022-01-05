"use strict";
import { Model } from "sequelize";

// These are all the attributes in the ProjectBacking model
interface ProjectBackingAttributes {
  id: number;
  ProjectId: number;
  UserId: string;
  amount: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectBacking
    extends Model<ProjectBackingAttributes>
    implements ProjectBackingAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    ProjectId!: number;
    UserId!: string;
    amount!: number;

    static associate(models: any) {
      // define association here
    }
  }
  ProjectBacking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProjectBacking",
    }
  );
  return ProjectBacking;
};
