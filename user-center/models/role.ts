import { DenoDB } from "../../shared/deps.ts";
const { Model, DataTypes } = DenoDB;

export default class Role extends Model {
  static table = "role";
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "角色ID",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "角色名称",
    },
  };
}

export function builtInRole() {
  return Role.create([
    { id: 1, name: "普通用户" },
    { id: 2, name: "实习站员" },
    { id: 3, name: "正式站员" },
    { id: 4, name: "往届站员" },
    { id: 5, name: "管理员" },
    { id: 6, name: "超级管理员" },
  ]);
}
