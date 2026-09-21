/**
 * A static import-graph walker for gate rules that name the files a script
 * READS. Pure: the filesystem is injected, so the spec runs on an in-memory
 * map and the real walk (tests/notes-lint-import-roots.test.ts) plugs in fs.
 *
 * Resolves what tsx resolves for this repo: relative specifiers, the `@/`
 * alias → `src/`, extension-less imports (.ts / .tsx / index.ts / index.tsx).
 * Bare specifiers (`node:fs`, packages) are not files of ours and are skipped.
 * `import type` and `export … from` count — a type-only import still names a
 * file whose change can break the importer.
 */
import { describe, it, expect } from "vitest";
import { collectImports } from "../scripts/lib/importGraph";

function memFs(files: Record<string, string>) {
  return (p: string) => (p in files ? files[p] : null);
}

describe("collectImports", () => {
  it("walks relative imports transitively and returns every reached file", () => {
    const read = memFs({
      "scripts/x.ts": `import { a } from "./lib/a";`,
      "scripts/lib/a.ts": `import { b } from "../../src/lib/b";`,
      "src/lib/b.ts": `export const b = 1;`,
    });
    expect([...collectImports("scripts/x.ts", read)].sort()).toEqual([
      "scripts/lib/a.ts",
      "src/lib/b.ts",
    ]);
  });

  it("resolves the @/ alias to src/", () => {
    const read = memFs({
      "scripts/x.ts": `import { c } from "@/lib/notes/chapters";`,
      "src/lib/notes/chapters.ts": ``,
    });
    expect([...collectImports("scripts/x.ts", read)]).toEqual(["src/lib/notes/chapters.ts"]);
  });

  it("tries .ts, .tsx, /index.ts and /index.tsx for an extension-less specifier", () => {
    const read = memFs({
      "src/a.ts": `import "./b"; import "./c"; import "./d"; import "./e";`,
      "src/b.ts": ``,
      "src/c.tsx": ``,
      "src/d/index.ts": ``,
      "src/e/index.tsx": ``,
    });
    expect([...collectImports("src/a.ts", read)].sort()).toEqual([
      "src/b.ts",
      "src/c.tsx",
      "src/d/index.ts",
      "src/e/index.tsx",
    ]);
  });

  it("counts `import type` and `export … from` re-exports", () => {
    const read = memFs({
      "src/a.ts": `import type { T } from "./types";\nexport { x } from "./x";\nexport * from "./y";`,
      "src/types.ts": ``,
      "src/x.ts": ``,
      "src/y.ts": ``,
    });
    expect([...collectImports("src/a.ts", read)].sort()).toEqual([
      "src/types.ts",
      "src/x.ts",
      "src/y.ts",
    ]);
  });

  it("handles multi-line import lists and single-quoted specifiers", () => {
    const read = memFs({
      "src/a.ts": `import {\n  one,\n  two,\n} from './b';\nimport { three } from "./c";`,
      "src/b.ts": ``,
      "src/c.ts": ``,
    });
    expect([...collectImports("src/a.ts", read)].sort()).toEqual(["src/b.ts", "src/c.ts"]);
  });

  it("skips bare specifiers — packages and node builtins are not our files", () => {
    const read = memFs({
      "src/a.ts": `import fs from "node:fs";\nimport { createClient } from "@supabase/supabase-js";\nimport "./b";`,
      "src/b.ts": ``,
    });
    expect([...collectImports("src/a.ts", read)]).toEqual(["src/b.ts"]);
  });

  it("does not loop on a cycle and visits each file once", () => {
    const read = memFs({
      "src/a.ts": `import "./b";`,
      "src/b.ts": `import "./a";`,
    });
    expect([...collectImports("src/a.ts", read)]).toEqual(["src/b.ts"]);
  });

  it("reports an unresolvable relative import rather than silently dropping it", () => {
    const read = memFs({ "src/a.ts": `import "./missing";` });
    expect(() => collectImports("src/a.ts", read)).toThrow(/src\/a\.ts.*\.\/missing/);
  });

  it("normalises `..` segments and does not escape the repo root", () => {
    const read = memFs({
      "scripts/deep/x.ts": `import "../../src/lib/b";`,
      "src/lib/b.ts": ``,
    });
    expect([...collectImports("scripts/deep/x.ts", read)]).toEqual(["src/lib/b.ts"]);
  });
});
