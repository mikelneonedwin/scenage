import { run, subcommands } from "cmd-ts";
import { detectCmd } from "./commands/detect.js";
import { arrangeCmd } from "./commands/arrange.js";
import { checkCmd } from "./commands/check.js";

/**
 * Entry point for the CLI.
 *
 * Registers and runs all available subcommands.
 */
const app = subcommands({
  name: "scenage",
  description: "A utility for organizing and detecting media files.",
  cmds: { detect: detectCmd, arrange: arrangeCmd, check: checkCmd },
});

run(app, process.argv.slice(2));
