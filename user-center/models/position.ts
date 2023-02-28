import { DenoDB } from "../../shared/deps.ts";
const { Model, DataTypes } = DenoDB;

export default class Position extends Model {
  static table = "position";
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "职位ID",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "职位名称",
    },
  };
}

export function builtInPosition() {
  Position.create([
    { id: 1, name: "站员" },
    { id: 2, name: "实习部长" },
    { id: 3, name: "实习副站长" },
    { id: 4, name: "实习站长" },
    { id: 5, name: "部长" },
    { id: 6, name: "副站长" },
    { id: 7, name: "站长" },
    { id: 8, name: "指导老师" },
  ]);
}
