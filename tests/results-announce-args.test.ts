import { describe, it, expect } from "vitest";
import { parseAnnounceArgs } from "../scripts/results/announceArgs";

describe("parseAnnounceArgs: results:announce's flags", () => {
  const today = "2026-10-10";

  it("reads a full announcement, asking for 21 days by default", () => {
    expect(parseAnnounceArgs(["--exam=nda", "--sitting=NDA 2 2026", "--stage=ssb"], today)).toEqual({
      ok: true,
      value: { examSlug: "nda", sitting: "NDA 2 2026", stage: "ssb", announcedOn: "2026-10-10", askUntil: "2026-10-31", apply: false },
    });
  });

  it("takes a given date, window and --apply", () => {
    const r = parseAnnounceArgs(["--exam=cds", "--sitting=CDS 2 2026", "--stage=written", "--announced=2026-11-02", "--ask-days=7", "--apply"], today);
    expect(r).toMatchObject({ ok: true, value: { announcedOn: "2026-11-02", askUntil: "2026-11-09", apply: true } });
  });

  it("refuses an unknown exam, a missing sitting, a bad stage or a bad date", () => {
    expect(parseAnnounceArgs(["--exam=nope", "--sitting=X", "--stage=written"], today).ok).toBe(false);
    expect(parseAnnounceArgs(["--exam=nda", "--stage=written"], today).ok).toBe(false);
    expect(parseAnnounceArgs(["--exam=nda", "--sitting=X", "--stage=interview"], today).ok).toBe(false);
    expect(parseAnnounceArgs(["--exam=nda", "--sitting=X", "--stage=written", "--announced=10/10/2026"], today).ok).toBe(false);
  });
});
