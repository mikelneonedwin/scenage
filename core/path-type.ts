import { extendType, string } from "cmd-ts";
import { resolve } from "node:path";

/**
 * Cmd-ts type for resolving file system paths.
 */
export const Path = extendType(string, {
  // eslint-disable-next-line require-await
  async from(val: string) {
    return resolve(val);
  },
});
