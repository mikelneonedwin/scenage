/* eslint-disable no-console */
import { detectArgs } from "@/core/detect-args";
import { Path } from "@/core/path-type";
import { command, number, option } from "cmd-ts";
import { existsSync, mkdirSync, renameSync } from "node:fs";
import { join } from "node:path";
import { detect } from "./detect";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { path, ...pickedArgs } = detectArgs;

export const arrange = command({
  name: "arrange",
  description:
    "Scan and move all video/subtitle files to their respective folders.",
  args: {
    ...pickedArgs,
    output: option({
      type: Path,
      long: "output",
      short: "o",
      defaultValue: process.cwd,
    }),
    input: option({
      type: Path,
      long: "input",
      short: "i",
      defaultValue: process.cwd,
    }),
    padSize: option({
      type: number,
      long: "pad-size",
      short: "p",
      defaultValue: () => 2,
    }),
  },
  handler: ({ input, output, padSize, ...detectArgs }) => {
    const files = detect.handler({
      ...detectArgs,
      path: input,
    });
    let movedCount = 0;
    files.forEach((file) => {
      const _destinationFolderName =
        file.type === "movie" ? "Movies" : file.title;
      const destinationFolderPath = join(output, _destinationFolderName);
      mkdirSync(destinationFolderPath, {
        recursive: true,
      });
      let newFilePath: string;
      if (file.type === "movie") {
        newFilePath = join(
          destinationFolderPath,
          file.title + file.fileExtension,
        );
      } else {
        const seasonTag = `S${file.season.toString().padStart(padSize, "0")}`;
        const episodeTag = `E${file.episode.toString().padStart(padSize, "0")}`;
        const fileName = `${file.title} ${seasonTag}${episodeTag}${file.fileExtension}`;
        const seasonFolderPath = join(destinationFolderPath, seasonTag);
        mkdirSync(seasonFolderPath, {
          recursive: true,
        });
        newFilePath = join(seasonFolderPath, fileName);
      }
      // Avoid overwriting existing files
      if (existsSync(newFilePath)) {
        console.warn(`⚠️ Skipped: ${newFilePath} (already exists)`);
      } else {
        renameSync(file.filePath, newFilePath);
        movedCount++;
      }
    });
    console.log(`\n✅ Done!`);
    console.log(`📦 Total files arranged: ${movedCount}`);
    console.log(`📂 Output folder: ${output}`);
  },
});
