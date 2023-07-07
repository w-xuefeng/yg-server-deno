import {
  Context,
  existsSync,
  IPaginationParams,
  OakHelpers,
  RouterContext,
} from "./deps.ts";
import { sLog } from "./write-log.ts";

export type VType = number;

export type PathType<
  P extends string,
  Path extends string,
  V extends VType = 1,
> = `${P}/v${V}${Path}`;

export class Path<P extends string> {
  prefix = "/";
  constructor(prefix: P) {
    this.prefix = prefix;
  }
  union<T extends string, V extends VType = 1>(path: T, version: V = 1 as V) {
    return `${this.prefix}/v${version}${path}` as PathType<
      P,
      T,
      V
    >;
  }
}

export class YGStorage {
  /**
   * localStorage
   */
  // deno-lint-ignore no-explicit-any
  public static getStorage<T = Record<string, any>>(
    key: string,
    storage: Storage = localStorage,
  ) {
    const ls = storage;
    if (!ls) {
      return undefined;
    }

    let v = ls.getItem(key);
    if (!v) {
      return undefined;
    }

    if (v.indexOf("obj-") === 0) {
      v = v.slice(4);
      return JSON.parse(v) as T;
    }

    if (v.indexOf("str-") === 0) {
      return v.slice(4);
    }

    return undefined;
  }

  public static setStorage(
    key: string,
    // deno-lint-ignore no-explicit-any
    value: any,
    storage: Storage = localStorage,
  ) {
    if ([2, 3].includes(arguments.length)) {
      let v = value;
      if (typeof v === "object") {
        v = JSON.stringify(v);
        v = "obj-" + v;
      } else {
        v = "str-" + v;
      }
      const ls = storage;
      if (ls) {
        ls.setItem(key, v);
      }
    }
  }

  public static removeStorage(key: string, storage: Storage = localStorage) {
    const ls = storage;
    if (ls && key) {
      ls.removeItem(key);
    }
  }

  public static clearStorage(storage: Storage = localStorage) {
    const ls = storage;
    if (ls) {
      ls.clear();
    }
  }

  /**
   * sessionStorage
   */
  // deno-lint-ignore no-explicit-any
  public static getSession<T = Record<string, any>>(key: string) {
    return this.getStorage<T>(key, sessionStorage);
  }

  // deno-lint-ignore no-explicit-any
  public static setSession(key: string, value: any) {
    this.setStorage(key, value, sessionStorage);
  }

  public static removeSession(key: string) {
    this.removeStorage(key, sessionStorage);
  }

  public static clearSession() {
    this.clearStorage(sessionStorage);
  }
}

export function dbLockChecker(serverName: string) {
  return existsSync(`.${serverName.toLocaleLowerCase()}.db.lock`);
}

export function dbLockContent(serverName: string) {
  return Deno.readTextFileSync(`.${serverName.toLocaleLowerCase()}.db.lock`);
}

export async function dbLock(serverName: string) {
  await Deno.writeTextFile(
    `.${serverName.toLocaleLowerCase()}.db.lock`,
    `Database has been synced at ${new Date().toLocaleString()}`,
    { create: true },
  );
}

export async function dbSync(
  serverName: string,
  doSyncFunction: () => Promise<void> | void,
) {
  if (dbLockChecker(serverName)) {
    const log = dbLockContent(serverName);
    console.log(log);
    sLog(log, serverName);
    return Deno.exit();
  }
  await doSyncFunction();
  await dbLock(serverName);
  const log = `Database synchronization succeeded at ${
    new Date().toLocaleString()
  }！`;
  console.log(log);
  sLog(log, serverName);
  Deno.exit();
}

export function calcPages(totalCount: number, pageSize: number) {
  if (totalCount === 0) {
    return 0;
  }
  if (totalCount <= pageSize) {
    return 1;
  }
  return Math.ceil(totalCount / pageSize);
}

export function mapPaginationQueries<T>(
  queries: Record<string, string | undefined | null>,
) {
  const nextQuery = structuredClone(queries) as T & IPaginationParams;
  if (queries.pageNumber) {
    nextQuery.pageNumber = Number(queries.pageNumber);
  }
  if (queries.pageSize) {
    nextQuery.pageSize = Number(queries.pageSize);
  }
  return nextQuery;
}

export function getPaginationQueries<T = Record<string, string>>(
  ctx: Context | RouterContext<string>,
  options?: {
    asMap?: boolean;
    mergeParams?: boolean;
  },
) {
  const queries = OakHelpers.getQuery(
    ctx,
    Object.assign({ mergeParams: true }, options),
  ) as unknown as Record<string, string> & T;
  return mapPaginationQueries<T>(queries);
}

// deno-lint-ignore no-explicit-any
export function filterEmptyField<T extends Record<string, any>>(
  // deno-lint-ignore no-explicit-any
  data?: Record<string, any>,
  deep = false,
  emptyArray = ["", void 0, null],
) {
  if (!data) {
    return {} as T;
  }
  return Object.keys(data).reduce((res, key) => {
    if (
      data[key] &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key]) &&
      deep
    ) {
      res[key as keyof T] = filterEmptyField(data[key]);
    } else if (!emptyArray.includes(data[key])) {
      res[key as keyof T] = data[key];
    }
    return res;
  }, {} as T);
}
