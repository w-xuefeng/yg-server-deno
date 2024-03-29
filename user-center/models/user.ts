import { DenoDB } from "../../shared/deps.ts";
import Role from "./role.ts";
import Position from "./position.ts";
import { ITimestamp } from "../../shared/types.ts";
const { Model, DataTypes } = DenoDB;

export interface IUser extends ITimestamp {
  id: number;
  stuid: number;
  password: string;
  name: string;
  email: string;
  gender: number;
  birthday?: string;
  college?: string;
  major?: string;
  wxId?: string;
  qqId?: string;
  pushId?: string;
  role: number;
  position: number;
}

export default class User extends Model {
  static table = "user";
  static timestamps = true;
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
      unique: true,
      allowNull: false,
      comment: "学号/工号",
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
    gender: {
      type: DataTypes.INTEGER,
      comment: "性别",
    },
    birthday: {
      type: DataTypes.DATE,
      comment: "出生日期",
    },
    college: {
      type: DataTypes.STRING,
      comment: "学院",
    },
    major: {
      type: DataTypes.STRING,
      comment: "专业班级",
    },
    wxId: {
      type: DataTypes.STRING,
      comment: "微信小程序关联openid",
    },
    qqId: {
      type: DataTypes.STRING,
      comment: "QQ小程序关联openid",
    },
    pushId: {
      type: DataTypes.STRING,
      comment: "推送id",
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
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "职位",
      relationship: {
        kind: "single" as const,
        model: Position,
      },
    },
  };

  static defaults = {
    role: 1,
    position: 1,
  };

  static role() {
    return this.hasOne(Role);
  }

  static position() {
    return this.hasOne(Position);
  }
}
