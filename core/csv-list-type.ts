import type { Type } from "cmd-ts";

/**
 * Cmd-ts type that parses a comma-separated string into a list of trimmed strings.
 *
 * @example
 * "mp4,mkv,avi" → ["mp4", "mkv", "avi"]
 */
export const CsvList: Type<string, string[]> = {
  async from(value) {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  },
  displayName: "comma-separated list",
};
