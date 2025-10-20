import { boolean, flag, number, option, positional } from "cmd-ts";
import {
  MIN_MOVIE_SIZE_MB,
  SUBTITLE_EXTENSIONS,
  VIDEO_EXTENSIONS,
} from "@/constants/index";
import { CsvList } from "./csv-list-type";
import { Path } from "./path-type";

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

  minMovieFileSizeMB: option({
    type: number,
    long: "min-size",
    short: "m",
    description: "Ignore video files smaller than this size (in megabytes)",
    defaultValue: () => MIN_MOVIE_SIZE_MB,
  }),

  videos: option({
    type: CsvList,
    long: "videos",
    description:
      "Comma-separated list of file extensions to treat as videos (e.g. mp4,mkv,avi)",
    defaultValue: () => VIDEO_EXTENSIONS,
  }),

  subs: option({
    type: CsvList,
    long: "subs",
    description:
      "Comma-separated list of file extensions to treat as subtitles (e.g. srt,ass,vtt)",
    defaultValue: () => SUBTITLE_EXTENSIONS,
  }),

  exclude: option({
    type: CsvList,
    long: "exclude",
    short: "x",
    description:
      "Comma-separated list of file extensions to exclude (e.g. tmp,part,zip)",
    defaultValue: () => [],
  }),
};
