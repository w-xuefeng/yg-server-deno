// deno-lint-ignore-file no-explicit-any
import { RouterContext, State } from "./deps.ts";

export type TRouterContext = RouterContext<any, any, any>;

export interface IAppState extends State {
  serverName: string;
}

export interface ITimestamp {
  createdAt: string;
  updatedAt: string;
}
