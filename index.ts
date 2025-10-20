import { run, subcommands } from "cmd-ts";
import { detect } from "./commands/detect.js";
import { arrange } from "./commands/arrange.js";
import { check } from "./commands/check.js";

/**
 * Entry point for the CLI.
 *
 * Registers and runs all available subcommands.
 */
const app = subcommands({
  name: "scenage",
  description: "A utility for organizing and detecting media files.",
  cmds: { detect, arrange, check },
});

run(app, process.argv.slice(2));
