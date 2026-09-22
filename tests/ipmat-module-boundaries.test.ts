// A CLI module in scripts/ipmat must never be imported for a value.
//
// WHY THIS EXISTS. Every CLI here ends in `main()` or `void main()` at module
// scope, so importing one RUNS IT. That happened twice in this pipeline, and
// both times it was invisible:
//
//   * `extract.ts` imported `paperFileName` from `fetch.ts`, so every extract
//     silently kicked off a whole 48-page fetch first.
//   * `attach-figures.ts` imported `sourceFileFor` from `commit.ts`, so running
//     the figure pass silently re-ran the entire PRIVATE load.
//
// Both were idempotent, so neither corrupted anything and neither announced
// itself — the only tell was `commit.ts`'s output appearing under a command
// nobody had asked to commit with. A third occurrence would not necessarily be
// so lucky: a CLI that is not idempotent, or one that takes `--apply` from
// `process.argv`, would act on the importer's flags.
//
// The rule: shared helpers live in a module with NO top-level side effect
// (config.ts, flight.ts, normalise.ts, taxonomy.ts, derive.ts, hash.ts). A CLI
// may import those; nothing may import a CLI.
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = join(__dirname, "..", "scripts", "ipmat");

/** Modules that run something when loaded. Each is a command, not a library. */
const CLI_MODULES = [
  "fetch.ts",
  "extract.ts",
  "build.ts",
  "commit.ts",
  "attach-figures.ts",
  "preflight.ts",
  "survey.ts",
  "verify-render.ts",
  "taxonomy-report.ts",
  "dump-derive.ts",
  "score-derive.ts",
  "verify-load.ts",
  "remap-taxonomy.ts",
];

/** Modules that are pure: importable, no top-level effect. */
const PURE_MODULES = ["config.ts", "flight.ts", "normalise.ts", "taxonomy.ts", "derive.ts", "hash.ts"];

function tsFiles(): string[] {
  return readdirSync(DIR).filter((f) => f.endsWith(".ts"));
}

function read(f: string): string {
  return readFileSync(join(DIR, f), "utf8");
}

/** Relative-import specifiers, excluding type-only imports. */
function valueImports(source: string): string[] {
  const out: string[] = [];
  // `import ... from "./x"` — skip `import type ...`, keep `import { type A, b }`
  // The clause may not contain a `;`, so it cannot span two import statements.
  // The first version used `[\s\S]*?`, which crossed newlines and matched
  // `import { existsSync } from "node:fs"` all the way to a LATER
  // `from "./build"` — reporting a type-only import as a value import.
  for (const m of source.matchAll(/^import\s+(?!type[\s{])([^;]*?)\s+from\s+["'](\.\/[^"']+)["']/gm)) {
    const clause = m[1];
    // A clause whose every named binding is `type X` imports no values.
    const named = clause.match(/\{([\s\S]*)\}/);
    if (named) {
      const bindings = named[1].split(",").map((s) => s.trim()).filter(Boolean);
      const hasValue = bindings.some((b) => !b.startsWith("type "));
      const hasDefaultOrNamespace = /^[A-Za-z_$][\w$]*\s*,|^\*\s+as/.test(clause.trim());
      if (!hasValue && !hasDefaultOrNamespace) continue;
    }
    out.push(m[2]);
  }
  return out;
}

describe("every listed module exists and is classified", () => {
  it("accounts for every .ts file in scripts/ipmat", () => {
    const known = new Set([...CLI_MODULES, ...PURE_MODULES]);
    const unknown = tsFiles().filter((f) => !known.has(f));
    // A new file must be classified deliberately — otherwise it escapes the rule
    // below simply by being new.
    expect(unknown).toEqual([]);
  });

  it("finds every module it claims to check", () => {
    const present = new Set(tsFiles());
    expect([...CLI_MODULES, ...PURE_MODULES].filter((f) => !present.has(f))).toEqual([]);
  });
});

describe("no module imports a CLI for a value", () => {
  it.each(tsFiles())("%s", (file) => {
    const imported = valueImports(read(file));
    const offenders = imported
      .map((spec) => spec.replace(/^\.\//, "") + (spec.endsWith(".ts") ? "" : ".ts"))
      .filter((target) => CLI_MODULES.includes(target));
    expect(offenders, `${file} imports a CLI module; move the helper into config.ts`).toEqual([]);
  });
});

describe("a CLI has a top-level call and a pure module does not", () => {
  const CALL = /^(?:void\s+)?main\(\);?\s*$/m;

  it.each(CLI_MODULES)("%s calls main() at module scope", (file) => {
    // If this fails the module is no longer a CLI and belongs in PURE_MODULES —
    // the lists must describe reality, or the rule above guards nothing.
    expect(CALL.test(read(file)), `${file} has no top-level main() call`).toBe(true);
  });

  it.each(PURE_MODULES)("%s has NO top-level call", (file) => {
    const src = read(file);
    expect(CALL.test(src), `${file} runs something on import`).toBe(false);
    expect(/^\s*(?:await\s+)?[a-zA-Z_$][\w$]*\(\);?\s*$/m.test(src), `${file} has a bare top-level call`).toBe(false);
  });
});
