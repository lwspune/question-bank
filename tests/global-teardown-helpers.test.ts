import { describe, it, expect } from "vitest";
import {
  isTestOrgName,
  isTestTaxonomyName,
  hasRunIdToken,
  isTestAuthEmail,
  sweepUntilClean,
} from "./global-teardown-helpers";

describe("global-teardown helpers", () => {
  describe("isTestOrgName", () => {
    it("matches every real leaked test-org shape", () => {
      // These are the actual leaked org names observed in production.
      for (const name of [
        "Upload Flow Org e5c1a09d",
        "QPrinciple Org fc2df11b",
        "Storage Org A f168d219",
        "Storage Org B f168d219",
        "Reports Owner Org 193c1c5c",
        "Reports Reporter Org 193c1c5c",
        "EditSetOrg_3e39bcfa",
        "Edit Tags Org cea8ccd3",
        "UpDelete Org A da693ef2",
        "UpDelete Org B da693ef2",
        "Resolver Org fd90dd5f",
        "Upload Flow Org c8779c4c",
      ]) {
        expect(isTestOrgName(name), name).toBe(true);
      }
    });

    it("never matches the real org", () => {
      expect(isTestOrgName("LWS Pune")).toBe(false);
      expect(isTestOrgName("  LWS Pune  ")).toBe(false);
    });

    it("does not match plausible future real school orgs", () => {
      for (const name of [
        "Delhi Public School",
        "Army Public School Pune",
        "St. Xavier's Junior College",
        "Fergusson College",
      ]) {
        expect(isTestOrgName(name), name).toBe(false);
      }
    });
  });

  describe("isTestTaxonomyName", () => {
    it("matches test-created subjects/chapters", () => {
      for (const name of [
        "EditSetSubj_3e39bcfa",
        "EditSetChapter_3e39bcfa",
        "UD_DelSubject_da693ef2",
        "UD_DelChapter_da693ef2",
        "PYQB_Subject_a1b2c3d4",
      ]) {
        expect(isTestTaxonomyName(name), name).toBe(true);
      }
    });

    it("never matches canonical taxonomy", () => {
      for (const name of [
        "Mathematics",
        "Physics",
        "Optics (Ray)",
        "Chemical Thermodynamics",
        "Differentiation",
        "Chain Rule",
        "Statistics",
        "Superposition of Waves",
      ]) {
        expect(isTestTaxonomyName(name), name).toBe(false);
      }
    });
  });

  describe("isTestAuthEmail", () => {
    it("matches the @test.local fixtures, case/space-insensitively", () => {
      for (const email of [
        "edit-set-admin-3e39bcfa@test.local",
        "resolver-fd90dd5f@test.local",
        "storage-admin-a-f168d219@test.local",
        "  UP-DELETE-DA693EF2@TEST.LOCAL  ",
      ]) {
        expect(isTestAuthEmail(email), email).toBe(true);
      }
    });

    it("never matches a real address", () => {
      for (const email of [
        "connect.lwspune@gmail.com",
        "student@example.com",
        "teacher@school.edu",
        null,
        undefined,
        "",
      ]) {
        expect(isTestAuthEmail(email as string)).toBe(false);
      }
    });
  });

  describe("hasRunIdToken", () => {
    it("requires a standalone 8-hex token, not a mid-word coincidence", () => {
      expect(hasRunIdToken("abcdef12")).toBe(true); // exactly 8 hex, whole string
      expect(hasRunIdToken("Org deadbeef")).toBe(true);
      expect(hasRunIdToken("decaffeinated")).toBe(false); // 8 hex buried mid-word
      expect(hasRunIdToken("Affiliated College")).toBe(false);
      expect(hasRunIdToken("abc123")).toBe(false); // only 6 hex
    });
  });

  describe("sweepUntilClean (delete-visibility race resilience)", () => {
    const noSleep = async () => {};

    it("returns [] and never sweeps when the first check is already clean", async () => {
      let sweeps = 0;
      const result = await sweepUntilClean(
        async () => [],
        async () => {
          sweeps++;
        },
        { attempts: 3, delayMs: 1, sleep: noSleep }
      );
      expect(result).toEqual([]);
      expect(sweeps).toBe(0); // no re-sweep when clean
    });

    it("re-sweeps and clears when the leak is just an un-committed-yet delete (race)", async () => {
      // Survivor visible on the first check, gone after one more sweep.
      let checks = 0;
      let sweeps = 0;
      const result = await sweepUntilClean(
        async () => (checks++ === 0 ? ["orgs: Quiz Org df51f58f"] : []),
        async () => {
          sweeps++;
        },
        { attempts: 3, delayMs: 1, sleep: noSleep }
      );
      expect(result).toEqual([]); // cleared on retry → no throw upstream
      expect(sweeps).toBe(1); // one extra sweep was enough
    });

    it("returns the surviving problems after exhausting attempts on a REAL persistent leak", async () => {
      let sweeps = 0;
      const result = await sweepUntilClean(
        async () => ["orgs: Real Leak"],
        async () => {
          sweeps++;
        },
        { attempts: 3, delayMs: 1, sleep: noSleep }
      );
      expect(result).toEqual(["orgs: Real Leak"]); // persists → upstream throws
      expect(sweeps).toBe(3); // tried the full budget before giving up
    });

    it("sleeps between attempts via the injected sleep (no real delay in tests)", async () => {
      const delays: number[] = [];
      await sweepUntilClean(
        async () => ["x"],
        async () => {},
        { attempts: 2, delayMs: 750, sleep: async (ms) => void delays.push(ms) }
      );
      expect(delays).toEqual([750, 750]); // one sleep before each of the 2 retries
    });
  });
});
