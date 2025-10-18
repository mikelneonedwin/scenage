import { run, subcommands } from "cmd-ts";
import { detect } from "./commands/detect.js";

/**
 * Entry point for the CLI.
 *
 * Registers and runs all available subcommands.
 */
const app = subcommands({
  name: "scenage",
  description: "A utility for organizing and detecting media files.",
  cmds: { detect },
});

run(app, process.argv.slice(2));
