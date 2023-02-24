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
  u<T extends string, V extends VType = 1>(path: T, version: V = 1 as V) {
    return `${this.prefix}/v${version}${path}` as PathType<
      P,
      T,
      V
    >;
  }
}
