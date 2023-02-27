import { DenoDB } from "../../shared/deps.ts";
import Role from "./role.ts";
const { Model, DataTypes } = DenoDB;

export default class User extends Model {
  static table = "user";
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "用户ID",
    },
    stuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      comment: "学号",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "密码",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "姓名",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "邮箱",
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "角色",
      relationship: {
        kind: "single" as const,
        model: Role,
      },
    },
  };
}
