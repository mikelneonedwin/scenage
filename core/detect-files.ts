import { globSync, statSync } from "node:fs";
import { join } from "node:path";
import { parseFileName, type MediaEntry } from "./parse-file-name";

/**
 * Scans a directory for files matching specific extensions.
 */
export function scanDirectory(
  dir: string,
  extensions: string[],
  recursive: boolean,
  exclude: string[] = [],
): string[] {
  const includedPattern = recursive
    ? join(dir, `**`, `*.{${extensions.join(",")}}`)
    : join(dir, `*.{${extensions.join(",")}}`);

  const excludePattern =
    exclude.length > 0
      ? recursive
        ? join(dir, `**`, `*.{${exclude.join(",")}}`)
        : join(dir, `*.{${exclude.join(",")}}`)
      : "";

  return globSync(includedPattern, {
    exclude: excludePattern ? [excludePattern] : [],
  });
}

/**
 * Returns the size of a file in megabytes.
 */
export function getFileSizeMB(filePath: string): number {
  const stats = statSync(filePath);
  return stats.size / (1024 * 1024);
}

/**
 * Detects files under a directory and returns structured `MediaEntry` data.
 */
export function detectFiles(
  path: string,
  options: {
    recursive: boolean;
    minMovieSize?: number;
    videos?: string[];
    subs?: string[];
    exclude?: string[];
  },
): MediaEntry[] {
  const {
    recursive,
    minMovieSize,
    videos = [],
    subs = [],
    exclude = [],
  } = options;

  // Collect all files
  const allFiles = [
    ...scanDirectory(path, videos, recursive, exclude),
    ...scanDirectory(path, subs, recursive, exclude),
  ];

  // Filter videos by size if needed
  const filtered = minMovieSize
    ? allFiles.filter((file) => {
        const ext = file.split(".").pop()?.toLowerCase() ?? "";
        const isVideo = videos.includes(ext);
        return !isVideo || getFileSizeMB(file) >= minMovieSize;
      })
    : allFiles;

  // Parse into structured data
  return filtered.map((filePath) =>
    parseFileName(filePath, { videoExts: videos, subtitleExts: subs }),
  );
}
