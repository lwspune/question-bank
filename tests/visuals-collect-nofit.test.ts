import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// collect-nofit.js turns agents' "does not fit" answers into committed noFit verdicts.
describe("collect-nofit", () => {
  const run = (rows: unknown[]) => {
    const dir = mkdtempSync(join(tmpdir(), "nofit-"));
    const input = join(dir, "fit.json");
    const out = join(dir, "out.json");
    writeFileSync(input, JSON.stringify(rows));
    execFileSync("node", ["scripts/visuals/tools/collect-nofit.js", out, `functionGraph:${input}`], { stdio: "pipe" });
    return JSON.parse(readFileSync(out, "utf8")).decided as { id: string; reason: string; situation?: string }[];
  };
  // Fresh ids, so no committed batch already decides them.
  const A = "00000000-0000-4000-8000-00000000a001";
  const B = "00000000-0000-4000-8000-00000000a002";

  it("keeps the fit checker's situation on each noFit, and leaves it out when there is none", () => {
    const out = run([
      { n: 1, id: A, fit: "no", note: "asks for k", situation: "findK" },
      { n: 2, id: B, skip: true, reason: "forms an equation from its roots" },
    ]);
    expect(out.find((d) => d.id === A)).toMatchObject({ reason: "functionGraph: asks for k", situation: "findK" });
    expect(out.find((d) => d.id === B)).not.toHaveProperty("situation");
  });

  it("drops a situation that is not one short camelCase word rather than committing it", () => {
    const out = run([{ n: 1, id: A, fit: "no", note: "x", situation: "find the value of k" }]);
    expect(out[0]).not.toHaveProperty("situation");
  });
});
