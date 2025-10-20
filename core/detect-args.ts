import { boolean, flag, number, option, optional, positional } from "cmd-ts";
import { SUBTITLE_EXTENSIONS, VIEDO_EXTENSIONS } from "../constants/index.js";
import { CsvList } from "../core/csv-list-type.js";
import { Path } from "../core/path-type.js";

export const detectArgs = {
  path: positional({
    type: Path,
    displayName: "path",
    description: "Source folder to scan (defaults to the current directory)",
  }),

  recursive: flag({
    type: boolean,
    long: "recursive",
    short: "r",
    description: "Include subfolders in the scan",
    defaultValue: () => false,
  }),

  minVideoFileSizeMB: option({
    type: optional(number),
    long: "min-size",
    short: "m",
    description: "Ignore video files smaller than this size (in megabytes)",
    defaultValue: () => 50,
  }),

  videos: option({
    type: optional(CsvList),
    long: "videos",
    description:
      "Comma-separated list of file extensions to treat as videos (e.g. mp4,mkv,avi)",
    defaultValue: () => VIEDO_EXTENSIONS,
  }),

  subs: option({
    type: optional(CsvList),
    long: "subs",
    description:
      "Comma-separated list of file extensions to treat as subtitles (e.g. srt,ass,vtt)",
    defaultValue: () => SUBTITLE_EXTENSIONS,
  }),

  exclude: option({
    type: optional(CsvList),
    long: "exclude",
    short: "x",
    description:
      "Comma-separated list of file extensions to exclude (e.g. tmp,part,zip)",
  }),
};
