"use strict";

import { Model, UUIDV4 } from "sequelize";
import crypto from "crypto";
export interface UserAddModel {
  email: string;
  password: string;
  name: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface UserViewModel {
  id: string;
  name: string;
  email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserModel, UserAddModel> implements UserModel {
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    salt!: string;

    static associate(models: any) {
      //define association here
      // User.belongsToMany(models.Project, {
      //   through: "ProjectBackings",
      // });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50],
        },
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  //Hash Password Before User Creation
  User.beforeCreate(async function (user: UserModel) {
    const salt = crypto.randomBytes(16).toString("hex");
    user.salt = salt;
    const hash = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    user.password = hash;
  });

  return User;
};
