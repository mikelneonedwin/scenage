import { globSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Scans a directory for files matching specific extensions.
 *
 * Uses Node 22+ `fs.globSync()` for fast glob-based scanning.
 *
 * @param dir - The directory to scan.
 * @param extensions - List of extensions to include (without dots).
 * @param recursive - Whether to include subdirectories.
 * @param exclude - Optional list of extensions to exclude (without dots).
 * @returns Array of matched absolute file paths.
 */
export function scanDirectory(
  dir: string,
  extensions: string[],
  recursive: boolean,
  exclude: string[] = [],
): string[] {
  const includedExtensionsPattern = `*.{${extensions.join(",")}}`;
  const includePattern = recursive
    ? join(dir, `**`, includedExtensionsPattern)
    : join(dir, includedExtensionsPattern);

  const excludedExtensionsPattern = `*.{${exclude.join(",")}}`;
  const excludePattern = recursive
    ? join(dir, `**`, excludedExtensionsPattern)
    : join(dir, excludedExtensionsPattern);

  return globSync(includePattern, { exclude: [excludePattern] });
}

/**
 * Returns the size of a file in megabytes.
 *
 * @param filePath - Path to the file.
 */
export function getFileSizeMB(filePath: string): number {
  const stats = statSync(filePath);
  return stats.size / (1024 * 1024);
}

/**
 * Detects files under a directory, filtered by include/exclude extensions
 * and optional size constraints.
 *
 * @param path - Directory path to scan.
 * @param options - File detection options.
 */
export async function detectFiles(
  path: string,
  options: {
    recursive: boolean;
    minMovieSize?: number;
    videos?: string[];
    subs?: string[];
    exclude?: string[];
  },
) {
  const {
    recursive,
    minMovieSize,
    videos = [],
    subs = [],
    exclude = [],
  } = options;

  const videoFiles = scanDirectory(path, videos, recursive, exclude);
  const subtitleFiles = scanDirectory(path, subs, recursive, exclude);

  const filteredVideos = minMovieSize
    ? videoFiles.filter((file) => getFileSizeMB(file) >= minMovieSize)
    : videoFiles;

  return { videos: filteredVideos, subtitles: subtitleFiles };
}
