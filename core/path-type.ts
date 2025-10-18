import { extendType, string } from "cmd-ts";
import { resolve } from "node:path";

/**
 * Cmd-ts type for resolving file system paths.
 *
 * @remarks
 * Defaults to the current working directory if no path is provided.
 */
export const Path = extendType(string, {
  defaultValue: process.cwd,
  async from(val: string) {
    return resolve(val);
  },
});
