import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { newIds } from "../scripts/lib/privatizeNewRows";

describe("newIds", () => {
  it("returns only ids the snapshot did not hold", () => {
    expect(newIds(new Set(["a", "b"]), ["a", "b", "c", "d"])).toEqual(["c", "d"]);
  });
  it("returns nothing on a re-commit that inserted nothing", () => {
    expect(newIds(new Set(["a", "b"]), ["a", "b"])).toEqual([]);
  });
  it("returns every id on a first commit", () => {
    expect(newIds(new Set(), ["a", "b"])).toEqual(["a", "b"]);
  });
});

// The outage this guards: a commit script hiding every row of its source file,
// so a re-commit into a published paper withdraws it. Commit scripts must hide
// only what they insert (privatizeNewRows), or pass visibility into the insert.
describe("commit scripts never hide a whole source file", () => {
  const root = join(__dirname, "..", "scripts");
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/^commit\.ts$/.test(name)) files.push(p);
    }
  };
  walk(root);

  it("finds the commit scripts", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  // A statement that sets PRIVATE and is filtered by source_file hides the whole
  // file. Allowed only in a lane that refuses to run over PUBLIC rows unless told
  // to (--allow-unpublish), so a re-commit fails loudly instead of silently.
  const wholeFileHides = (src: string) =>
    src
      .replace(/\s+/g, " ")
      .split(";")
      .filter((stmt) => /\.update\(\{[^}]*visibility: "PRIVATE"/.test(stmt))
      .filter((stmt) => /\.eq\("source_file"/.test(stmt) && !/\.gte\("created_at"/.test(stmt));

  for (const f of files) {
    it(f.slice(root.length + 1), () => {
      const src = readFileSync(f, "utf8");
      if (src.includes("--allow-unpublish")) return;
      expect(wholeFileHides(src)).toEqual([]);
    });
  }
});
