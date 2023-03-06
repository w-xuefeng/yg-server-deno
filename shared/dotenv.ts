import { existsSync } from "https://deno.land/std@0.104.0/fs/exists.ts";

const args = Deno.args;
const modeArgsIndex = args.findIndex((arg) => arg === "--mode") + 1;
const mode = modeArgsIndex ? args[modeArgsIndex] : "dev";

/**
 * Variables defined on .env file or environment.
 */
export interface DotenvVariables {
  [name: string]: string;
}

const LINE_BREAK = /\r\n|\n|\r/;
const DECLARATION = /^\s*(\w+)\s*\=\s*(.*)?\s*$/;

/**
 * Parse the source of a `.env` file into an object with the variables.
 * @example
 * parse('NAME = "xxx"\nNICK=xxx');
 * //=> { NAME: 'xxx', NICK: 'xxx' }
 * @param source - Source of a `.env` file.
 */
export function parse(source: string): DotenvVariables {
  const lines = source.split(LINE_BREAK);

  return lines.reduce((vars: DotenvVariables, line: string) => {
    if (!DECLARATION.test(line)) {
      return vars;
    }

    const [, name, value] = DECLARATION.exec(line)!;

    if (!value) {
      vars[name] = "";
    } else if (/^".*"$/.test(value)) {
      vars[name] = value.replace(/^\"(.*)\"$/, "$1").replace(/\\n/g, "\n");
    } else {
      vars[name] = value;
    }

    return vars;
  }, {} as DotenvVariables);
}

const decoder = new TextDecoder("utf-8");

/**
 * Options to change dotenv's default behavior. Like change .env file path.
 */
export interface DotenvOptions {
  path?: string;
}

/**
 * Read `.env` file from project's root. Merge it's variables with environment
 * ones and return it.
 * @example
 * const env = dotenv();
 * db.connect(env.DB_USERNAME, env.DB_PASSWORD);
 */
export default function dotenv(
  { path = `.env.${mode}` }: DotenvOptions = {},
): DotenvVariables {
  let localPath = path;
  let vars = {};
  if (!path.endsWith(".local")) {
    localPath = `${path}.local`;
  }

  if (existsSync(localPath)) {
    vars = parse(decoder.decode(Deno.readFileSync(localPath)));
  } else if (existsSync(path)) {
    vars = parse(decoder.decode(Deno.readFileSync(path)));
  }

  return Object.assign(
    {
      DENO_MODE: mode,
    },
    Deno.env.toObject(),
    vars,
  );
}
