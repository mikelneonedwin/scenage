import { run, subcommands } from "cmd-ts";
import { detectCmd } from "./commands/detect";
import { arrangeCmd } from "./commands/arrange";
import { checkCmd } from "./commands/check";

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
