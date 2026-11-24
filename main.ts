import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line of error copy, at most 200 characters.
// It names the real failure (the server crashed), tells the user what
// survived (their work, thanks to autosave) and what to do next (refresh).
const ENTRY =
  "Our server crashed right after your autosave \u2014 your work survived, only our dignity didn't. Refresh and carry on.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
// Written with no trailing newline, so the file is byte-identical on
// every run: the output is fully deterministic.
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
