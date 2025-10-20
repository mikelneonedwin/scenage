/* eslint-disable no-console */
import { command } from "cmd-ts";
import { detectArgs } from "@/core/detect-args.js";
import { detectFiles } from "@/core/detect-files.js";

/**
 * CLI command: `detect`
 *
 * Scans a folder for media files and outputs structured metadata.
 */
export const detectCmd = command({
  name: "detect",
  description: "Scan a folder for video and subtitle files and parse metadata.",
  args: detectArgs,

  handler: (args) => {
    const entries = detectFiles(args.path, {
      recursive: args.recursive,
      videos: args.videos,
      subs: args.subs,
      exclude: args.exclude,
      minVideoFileSizeMB: args.minMovieFileSizeMB,
    });
    console.log(`📂 Scanned folder: ${args.path}`);
    console.log(`🧩 Total detected files: ${entries.length}`);
    return entries;
  },
});
