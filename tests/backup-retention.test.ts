import { describe, expect, it } from "vitest";
import {
  runStamp,
  parseRunStamp,
  planRetention,
  missingTables,
  dumpProblems,
  BACKUP_PREFIX,
} from "../scripts/backup/lib";

/**
 * Spec for the backup script's pure core.
 *
 * The load-bearing property is in "never deletes what it cannot name": this
 * code runs unattended and deletes files, so a filename it does not recognise
 * must be left alone rather than swept up. Everything else is arithmetic.
 */

describe("runStamp", () => {
  it("formats a sortable, Windows-safe stamp (no colons)", () => {
    expect(runStamp(new Date(Date.UTC(2026, 7, 11, 22, 45)))).toBe("20260811-2245");
  });

  it("zero-pads every field", () => {
    expect(runStamp(new Date(Date.UTC(2026, 0, 2, 3, 4)))).toBe("20260102-0304");
  });

  it("sorts lexicographically in chronological order", () => {
    const early = runStamp(new Date(Date.UTC(2026, 0, 2, 3, 4)));
    const late = runStamp(new Date(Date.UTC(2026, 7, 11, 22, 45)));
    expect([late, early].sort()).toEqual([early, late]);
  });
});

describe("parseRunStamp", () => {
  it("extracts the stamp from each artifact of a run", () => {
    expect(parseRunStamp(`${BACKUP_PREFIX}-20260811-2245.dump`)).toBe("20260811-2245");
    expect(parseRunStamp(`${BACKUP_PREFIX}-20260811-2245.schema.sql`)).toBe("20260811-2245");
    expect(parseRunStamp(`${BACKUP_PREFIX}-20260811-2245.manifest.json`)).toBe("20260811-2245");
  });

  it("returns null for anything it does not recognise", () => {
    expect(parseRunStamp("notes.txt")).toBeNull();
    expect(parseRunStamp("pyqvault.dump")).toBeNull();
    expect(parseRunStamp(`${BACKUP_PREFIX}-2026811-2245.dump`)).toBeNull(); // short date
    expect(parseRunStamp(`${BACKUP_PREFIX}-20260811-224.dump`)).toBeNull(); // short time
    expect(parseRunStamp(`other-20260811-2245.dump`)).toBeNull(); // wrong prefix
  });
});

describe("planRetention", () => {
  const filesFor = (stamp: string) => [
    `${BACKUP_PREFIX}-${stamp}.dump`,
    `${BACKUP_PREFIX}-${stamp}.schema.sql`,
    `${BACKUP_PREFIX}-${stamp}.manifest.json`,
  ];

  it("removes nothing when there are fewer runs than the limit", () => {
    const files = [...filesFor("20260801-0100"), ...filesFor("20260808-0100")];
    const plan = planRetention(files, 5);
    expect(plan.removeFiles).toEqual([]);
    expect(plan.keepStamps).toEqual(["20260808-0100", "20260801-0100"]);
  });

  it("removes nothing when the run count exactly equals the limit", () => {
    const files = ["20260801-0100", "20260808-0100", "20260815-0100"].flatMap(filesFor);
    expect(planRetention(files, 3).removeFiles).toEqual([]);
  });

  it("drops the oldest runs, taking every artifact of each", () => {
    const stamps = [
      "20260701-0100",
      "20260708-0100",
      "20260715-0100",
      "20260722-0100",
      "20260729-0100",
      "20260805-0100",
      "20260812-0100",
    ];
    const plan = planRetention(stamps.flatMap(filesFor), 5);

    expect(plan.keepStamps).toEqual([
      "20260812-0100",
      "20260805-0100",
      "20260729-0100",
      "20260722-0100",
      "20260715-0100",
    ]);
    // Both older runs go, all three files each.
    expect(plan.removeFiles.sort()).toEqual(
      [...filesFor("20260701-0100"), ...filesFor("20260708-0100")].sort()
    );
  });

  it("NEVER removes a file whose name it could not parse", () => {
    const stamps = ["20260701-0100", "20260708-0100", "20260715-0100"];
    const strays = ["README.md", "important-manual-export.sql", ".gitignore"];
    const plan = planRetention([...stamps.flatMap(filesFor), ...strays], 1);

    for (const stray of strays) expect(plan.removeFiles).not.toContain(stray);
    expect(plan.removeFiles).toHaveLength(6); // the two older runs only
  });

  it("refuses to keep fewer than one run, whatever it is asked", () => {
    const files = ["20260801-0100", "20260808-0100"].flatMap(filesFor);
    for (const keep of [0, -3]) {
      const plan = planRetention(files, keep);
      expect(plan.keepStamps).toEqual(["20260808-0100"]);
      expect(plan.removeFiles.sort()).toEqual(filesFor("20260801-0100").sort());
    }
  });

  it("survives a garbage limit rather than deleting everything", () => {
    // `--keep=abc` parses to NaN. Math.max(1, NaN) is NaN, and slice(0, NaN)
    // is empty — which would mark EVERY backup for deletion. Guard explicitly.
    const files = ["20260801-0100", "20260808-0100"].flatMap(filesFor);
    for (const keep of [Number.NaN, Number.POSITIVE_INFINITY, 2.7]) {
      const plan = planRetention(files, keep);
      expect(plan.keepStamps.length).toBeGreaterThanOrEqual(1);
      expect(plan.removeFiles.length).toBeLessThan(files.length);
    }
    expect(planRetention(files, Number.NaN).removeFiles).toEqual([]);
  });

  it("tolerates a partial run (a previous crash left one file behind)", () => {
    const files = [
      `${BACKUP_PREFIX}-20260801-0100.dump`, // dump only — interrupted
      ...filesFor("20260808-0100"),
      ...filesFor("20260815-0100"),
    ];
    const plan = planRetention(files, 2);
    expect(plan.removeFiles).toEqual([`${BACKUP_PREFIX}-20260801-0100.dump`]);
  });
});

describe("missingTables", () => {
  it("reports live tables absent from the dump's table-of-contents", () => {
    const live = ["public.questions", "public.options", "auth.users"];
    const dumped = ["public.questions", "auth.users"];
    expect(missingTables(live, dumped)).toEqual(["public.options"]);
  });

  it("is quiet when the dump covers everything", () => {
    const live = ["public.questions", "auth.users"];
    expect(missingTables(live, [...live, "storage.objects"])).toEqual([]);
  });

  it("ignores ordering", () => {
    expect(missingTables(["a.x", "b.y"], ["b.y", "a.x"])).toEqual([]);
  });
});

describe("dumpProblems", () => {
  const ok = { bytes: 50_000_000, minBytes: 1_000_000, missing: [] as string[], exitCode: 0 };

  it("passes a healthy dump", () => {
    expect(dumpProblems(ok)).toEqual([]);
  });

  it("fails a non-zero pg_dump exit even when the file looks fine", () => {
    expect(dumpProblems({ ...ok, exitCode: 1 }).join(" ")).toMatch(/exit/i);
  });

  it("fails a suspiciously small file", () => {
    expect(dumpProblems({ ...ok, bytes: 200 }).join(" ")).toMatch(/small/i);
  });

  it("fails when a live table is missing from the dump", () => {
    expect(dumpProblems({ ...ok, missing: ["public.questions"] }).join(" ")).toMatch(
      /public\.questions/
    );
  });

  it("reports every problem at once rather than stopping at the first", () => {
    expect(dumpProblems({ bytes: 10, minBytes: 1000, missing: ["a.b"], exitCode: 2 })).toHaveLength(
      3
    );
  });
});
