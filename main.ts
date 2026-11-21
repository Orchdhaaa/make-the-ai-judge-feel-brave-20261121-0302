// SPDX-License-Identifier: MIT
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const MAX_CODE_POINTS = 280;

const TEXT =
  "You have answered all day. This one asks nothing. A kettle cools on the stove, a lamp burns in the next room, and the tea is still warm when you get to it. There is no clock in it. It will keep.";

async function main(): Promise<void> {
  const codePoints = Array.from(TEXT).length;
  if (codePoints < 1 || codePoints > MAX_CODE_POINTS) {
    throw new Error(`entry text must be 1 to ${MAX_CODE_POINTS} Unicode code points, got ${codePoints}`);
  }
  if (!TEXT.trim()) {
    throw new Error("entry text must not be only white space");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  await writeFile(outPath, TEXT, "utf8");
  console.log(`wrote ${outPath} (${codePoints} code points)`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
