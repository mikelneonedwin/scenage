/* eslint-disable no-console */
import {
  boolean,
  command,
  flag,
  number,
  option,
  optional,
  positional,
} from "cmd-ts";
import { CsvList } from "../core/csv-list-type.js";
import { detectFiles } from "../core/detect-files.js";
import { Path } from "../core/path-type.js";
import { SUBTITLE_EXTENSIONS, VIEDO_EXTENSIONS } from "../constants/index.js";

/**
 * CLI command: `detect`
 *
 * Scans a folder for video, subtitle, or general file types.
 * Supports recursive scanning, minimum file size filtering,
 * and excluding specific extensions.
 */
export const detect = command({
  name: "detect",
  description: "Scan a folder for video and subtitle files.",
  args: {
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

    minMovieSize: option({
      type: optional(number),
      long: "min-size",
      short: "ms",
      description: "Ignore video files smaller than this size (in MB)",
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

    pick: flag({
      type: boolean,
      long: "pick",
      short: "p",
      defaultValue: () => false,
      description:
        "Interactively pick which detected files to continue with (not implemented yet)",
    }),
  },

  handler: async (args) => {
    const { videos, subtitles } = await detectFiles(args.path, {
      recursive: args.recursive,
      minMovieSize: args.minMovieSize,
      videos: args.videos,
      subs: args.subs,
      exclude: args.exclude,
    });

    console.log(`📂 Scanned folder: ${args.path}`);
    console.log(`🎞 Found videos: ${videos.length}`);
    console.log(`💬 Found subtitles: ${subtitles.length}`);

    if (videos.length) {
      console.log("\nVideos:");
      videos.forEach((v) => console.log("  •", v));
    }

    if (subtitles.length) {
      console.log("\nSubtitles:");
      subtitles.forEach((s) => console.log("  •", s));
    }
  },
});
