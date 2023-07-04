import { State } from "./deps.ts";

export interface IAppState extends State {
  serverName: string;
}

export interface ITimestamp {
  createdAt: string;
  updatedAt: string;
}
