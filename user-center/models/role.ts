import { DataTypes, Model } from "../../shared/deps.ts";

export default class Role extends Model {
  static table = "role";
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
