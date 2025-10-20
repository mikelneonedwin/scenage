import { basename, extname } from "node:path";

export type FileExtension = `.${string}`;

export interface BaseEntry {
  title: string;
  isVideo: boolean;
  isSubtitle: boolean;
  filePath: string;
  fileExtension: FileExtension;
}

export interface MovieEntry extends BaseEntry {
  type: "movie";
}

export interface SeriesEntry extends BaseEntry {
  type: "series";
  season: number;
  episode: number;
}

export type MediaEntry = MovieEntry | SeriesEntry;

function capitalizeWords(text: string) {
  return text.replace(
    /\b\w+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
}

export function cleanUpTitle(raw: string): string {
  return capitalizeWords(
    raw
      .replace(/\b(480P|720P|1080P|English|French|Spanish)\b/gi, "")
      .replace(/[-_.()]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

/**
 * Parse a file path into a structured MediaEntry.
 */
export function parseFileName(
  filePath: string,
  opts: { videoExts: string[]; subtitleExts: string[] },
): MediaEntry {
  const ext = extname(filePath).toLowerCase() as FileExtension;
  const isSubtitle = opts.subtitleExts.includes(ext.replace(".", ""));
  const isVideo = opts.videoExts.includes(ext.replace(".", ""));

  const baseName = basename(filePath, ext);
  const clean = baseName.replace(/[_().]/g, " ");

  // Detect Series (S01E02)
  const seriesMatch = clean.match(/(.+?)[\s-]+[Ss](\d+)[Ee](\d+)/);
  if (seriesMatch) {
    const [, rawTitle, season, episode] = seriesMatch;
    const title = cleanUpTitle(rawTitle!);
    return {
      type: "series",
      title,
      season: Number(season),
      episode: Number(episode),
      isVideo,
      isSubtitle,
      filePath,
      fileExtension: ext,
    };
  }

  // Fallback: Movie
  const movieName = cleanUpTitle(
    clean.replace(
      /\b(480P|720P|1080P|English|French|Spanish|[Ss]\d+[Ee]\d+)\b/gi,
      "",
    ),
  );

  return {
    type: "movie",
    title: movieName,
    isVideo,
    isSubtitle,
    filePath,
    fileExtension: ext,
  };
}
