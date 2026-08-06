/**
 * Argument guard for the JEE pipeline's BATCH-level scripts.
 *
 * `validate-db.ts` and `cleanup-latex.ts` are documented as once-per-batch,
 * whole-exam steps (README step 5). Neither read argv, so both silently
 * SWALLOWED anything passed to them. During the 2026-08-06 Chemistry ingest
 * `validate-db.ts <paperId> --subject=Chemistry` was invoked ~20 times; every
 * run scanned the entire exam (10,634 rows, ~10 MB of JSON on the wire) and
 * reported a confident success, so the misuse went unnoticed for twenty runs
 * and cost ~200 MB of egress against a 5 GB monthly allowance.
 *
 * The fix that actually prevents recurrence is REFUSING what you don't
 * understand: an unknown flag or an unexpected positional must fail on run 1.
 */
import { describe, it, expect } from "vitest";
import { rejectUnknownArgs } from "../scripts/jee/config";

// argv as Node presents it: [node, script, ...args]
const argv = (...args: string[]) => ["node", "script.ts", ...args];

describe("rejectUnknownArgs", () => {
  describe("batch script that takes NOTHING but --apply (cleanup-latex)", () => {
    const spec = { allowPositional: false, allowedFlags: ["--apply"], usage: "cleanup-latex.ts [--apply]" };

    it("accepts no args at all", () => {
      expect(() => rejectUnknownArgs(argv(), spec)).not.toThrow();
    });

    it("accepts its one known flag", () => {
      expect(() => rejectUnknownArgs(argv("--apply"), spec)).not.toThrow();
    });

    it("REJECTS a positional paperId — the exact 2026-08-06 misuse", () => {
      expect(() => rejectUnknownArgs(argv("2023-jan24"), spec)).toThrow(/2023-jan24/);
    });

    it("REJECTS an unknown flag rather than ignoring it", () => {
      expect(() => rejectUnknownArgs(argv("--subject=Chemistry"), spec)).toThrow(/--subject/);
    });

    it("names the offending argument AND the usage, so run 1 is self-correcting", () => {
      expect(() => rejectUnknownArgs(argv("--sbuject=Chemistry"), spec)).toThrow(
        /--sbuject[\s\S]*cleanup-latex\.ts \[--apply\]/
      );
    });
  });

  describe("batch script with an OPTIONAL paper scope (validate-db)", () => {
    const spec = {
      allowPositional: true,
      allowedFlags: ["--subject"],
      usage: "validate-db.ts [paperId] [--subject=X]",
    };

    it("accepts no args (the documented whole-exam sweep)", () => {
      expect(() => rejectUnknownArgs(argv(), spec)).not.toThrow();
    });

    it("accepts a paperId, a flag, or both", () => {
      expect(() => rejectUnknownArgs(argv("2023-jan24"), spec)).not.toThrow();
      expect(() => rejectUnknownArgs(argv("--subject=Chemistry"), spec)).not.toThrow();
      expect(() => rejectUnknownArgs(argv("2023-jan24", "--subject=Chemistry"), spec)).not.toThrow();
    });

    it("still rejects an unknown flag", () => {
      expect(() => rejectUnknownArgs(argv("2023-jan24", "--apply"), spec)).toThrow(/--apply/);
    });

    it("rejects a SECOND positional — a typo'd flag missing its dashes", () => {
      expect(() => rejectUnknownArgs(argv("2023-jan24", "subject=Chemistry"), spec)).toThrow(
        /subject=Chemistry/
      );
    });
  });

  describe("flag matching is exact, not prefix", () => {
    const spec = { allowPositional: false, allowedFlags: ["--subject"], usage: "u" };

    it("accepts --subject=X (the value form)", () => {
      expect(() => rejectUnknownArgs(argv("--subject=Maths"), spec)).not.toThrow();
    });

    it("accepts a bare --subject", () => {
      expect(() => rejectUnknownArgs(argv("--subject"), spec)).not.toThrow();
    });

    it("REJECTS a flag that merely starts with a known one", () => {
      // `--subjects=` would otherwise slip through a naive startsWith check and
      // be silently ignored by parseSubjectArg, which matches "--subject=".
      expect(() => rejectUnknownArgs(argv("--subjects=Maths"), spec)).toThrow(/--subjects/);
    });
  });
});
