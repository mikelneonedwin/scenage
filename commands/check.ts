import { detectArgs } from "@/core/detect-args";
import { command } from "cmd-ts";
import { detect } from "./detect";

type MovieRecord = {
  title: string;
  type: "movie";
  movie?: boolean;
  subtitle?: boolean;
};

type SeriesRecord = {
  title: string;
  type: "series";
  seasons: Record<
    number,
    {
      max: number;
      season: number;
      videos: number[];
      subtitles: number[];
    }
  >;
};

type EntryRecord = MovieRecord | SeriesRecord;

type Report = {
  title: string;
  items: string[];
};

export const check = command({
  name: "check",
  description: "List missing or unmatched episodes/subtitles.",
  args: detectArgs,
  handler: (args) => {
    const files = detect.handler(args);
    const entries = files.reduce(
      (entries, file) => {
        if (file.type == "movie") {
          const entry = (entries[file.title] ??= {
            title: file.title,
            type: file.type,
          } satisfies MovieRecord) as MovieRecord;
          entry.movie ||= file.isVideo;
          entry.subtitle ||= file.isSubtitle;
        } else {
          const entry = (entries[file.title] ??= {
            title: file.title,
            type: file.type,
            seasons: {},
          } satisfies SeriesRecord) as SeriesRecord;
          const season = (entry.seasons[file.season] ??= {
            max: file.episode,
            videos: [],
            subtitles: [],
            season: file.season,
          });
          season.max = Math.max(file.episode, season.max);
          const targetArray = file.isVideo ? season.videos : season.subtitles;
          targetArray.push(file.episode);
        }
        return entries;
      },
      {} as Record<string, EntryRecord>,
    );
    const reports = Object.values(entries).reduce(
      (reports, entry) => {
        if (entry.type == "movie" && !entry.movie) {
          const report = (reports["movies"] ??= {
            title: "Movies",
            items: [],
          });
          report.items.push(entry.title);
        }

        if (entry.type === "series") {
          // SECTION MISSING EPISODES, SUBTITLES
          Object.values(entry.seasons).forEach((season) => {
            const range = Array.from({ length: season.max }).map(
              (_, index) => index + 1,
            );
            const missingVideos = range
              .filter((value) => !season.videos.includes(value))
              .map((episode) => `Episode: S${season.season}E${episode}`);
            const missingSubtitles = season.subtitles.length
              ? range
                  .filter((value) => !season.subtitles.includes(value))
                  .map((episode) => `Subtitle: S${season.season}E${episode}`)
              : [];
            const missing = [...missingVideos, ...missingSubtitles];
            if (missing.length) {
              const report = (reports[entry.title] ??= {
                title: entry.title,
                items: [],
              });
              report.items.push(...missing);
            }
          });

          // SECTION MISSING SEASONS
          const allSeasons = Object.values(entry.seasons).map(
            (item) => item.season,
          );
          const missingSeasons = Array.from({
            length: Math.max(...allSeasons),
          })
            .map((_, index) => index + 1)
            .filter((v) => !allSeasons.includes(v))
            .map((season) => `Season: ${season}`);
          if (missingSeasons.length) {
            const report = (reports[entry.title] ??= {
              title: entry.title,
              items: [],
            });
            report.items.push(...missingSeasons);
          }
        }
        return reports;
      },
      {} as Record<string, Report>,
    );
    Object.values(reports).forEach((report) => {
      // eslint-disable-next-line no-console
      console.log(`\n${report.title}`);
      report.items.forEach((item) => {
        // eslint-disable-next-line no-console
        console.log(` `, item);
      });
    });
  },
});
