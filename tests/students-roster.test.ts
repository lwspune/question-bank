import { describe, it, expect } from "vitest";
import {
  filterRoster,
  sortRoster,
  summariseRoster,
  toRosterCsv,
  formatMobile,
  EXAM_UNSPECIFIED,
  type StudentRosterRow,
} from "@/lib/students/roster";

/** Minimal row builder — every field defaulted so a test names only what it exercises.
 *  The default email is derived from the id so fixtures stay DISTINCT: a shared
 *  default silently matched every search and made a filter look broken when it wasn't. */
function row(over: Partial<StudentRosterRow> = {}): StudentRosterRow {
  return {
    id: over.id ?? "u1",
    name: "Asha K",
    email: `${over.id ?? "u1"}@example.com`,
    provider: "Google",
    signedUp: "2026-06-01T10:00:00Z",
    lastSignIn: "2026-09-01T10:00:00Z",
    mobile: null,
    city: null,
    stage: null,
    targetExams: [],
    whatsappOptIn: false,
    mocksSubmitted: 0,
    mocksStarted: 0,
    avgPct: null,
    qsAnswered: 0,
    notesSubtopics: 0,
    notesSubjects: 0,
    notesMastered: 0,
    notesCheckpoints: 0,
    bookmarks: 0,
    lastActive: null,
    ...over,
  };
}

const NOW = new Date("2026-09-15T12:00:00Z");
const ALL = { exams: [], window: { kind: "all" }, dateField: "lastActive", search: "" } as const;

describe("filterRoster — exams", () => {
  it("matches a student whose target_exams CONTAINS the slug (multi-exam students appear under each)", () => {
    const rows = [
      row({ id: "a", targetExams: ["nda", "jee-mains"] }),
      row({ id: "b", targetExams: ["neet"] }),
    ];
    expect(filterRoster(rows, { ...ALL, exams: ["nda"] }, NOW).map((r) => r.id)).toEqual(["a"]);
    expect(filterRoster(rows, { ...ALL, exams: ["jee-mains"] }, NOW).map((r) => r.id)).toEqual(["a"]);
  });

  it("treats multiple selected exams as OR", () => {
    const rows = [
      row({ id: "a", targetExams: ["nda"] }),
      row({ id: "b", targetExams: ["neet"] }),
      row({ id: "c", targetExams: ["cds"] }),
    ];
    const got = filterRoster(rows, { ...ALL, exams: ["nda", "neet"] }, NOW);
    expect(got.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("surfaces students with NO target exam under the explicit 'unspecified' bucket", () => {
    // 59 live students have no target exam — they must be reachable, never silently dropped.
    const rows = [row({ id: "a", targetExams: ["nda"] }), row({ id: "b", targetExams: [] })];
    const got = filterRoster(rows, { ...ALL, exams: [EXAM_UNSPECIFIED] }, NOW);
    expect(got.map((r) => r.id)).toEqual(["b"]);
  });

  it("combines the unspecified bucket with real exams", () => {
    const rows = [
      row({ id: "a", targetExams: ["nda"] }),
      row({ id: "b", targetExams: [] }),
      row({ id: "c", targetExams: ["neet"] }),
    ];
    const got = filterRoster(rows, { ...ALL, exams: ["nda", EXAM_UNSPECIFIED] }, NOW);
    expect(got.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("an empty exam selection means no exam filter at all", () => {
    const rows = [row({ id: "a", targetExams: ["nda"] }), row({ id: "b", targetExams: [] })];
    expect(filterRoster(rows, ALL, NOW)).toHaveLength(2);
  });
});

describe("filterRoster — time window", () => {
  it("includes a row exactly on the window boundary and excludes one past it", () => {
    const rows = [
      row({ id: "on", lastActive: "2026-09-08T12:00:00Z" }), // exactly 7 days
      row({ id: "past", lastActive: "2026-09-08T11:59:59Z" }), // a second older
    ];
    const got = filterRoster(rows, { ...ALL, window: { kind: "days", days: 7 } }, NOW);
    expect(got.map((r) => r.id)).toEqual(["on"]);
  });

  it("excludes never-active students from a days window (a null date is not 'recent')", () => {
    const rows = [row({ id: "a", lastActive: "2026-09-14T12:00:00Z" }), row({ id: "b", lastActive: null })];
    const got = filterRoster(rows, { ...ALL, window: { kind: "days", days: 30 } }, NOW);
    expect(got.map((r) => r.id)).toEqual(["a"]);
  });

  it("the 'never' window selects exactly the students with no learning action", () => {
    const rows = [row({ id: "a", lastActive: "2026-09-14T12:00:00Z" }), row({ id: "b", lastActive: null })];
    const got = filterRoster(rows, { ...ALL, window: { kind: "never" } }, NOW);
    expect(got.map((r) => r.id)).toEqual(["b"]);
  });

  it("applies the window to signedUp when that field is selected", () => {
    const rows = [
      row({ id: "new", signedUp: "2026-09-10T00:00:00Z", lastActive: null }),
      row({ id: "old", signedUp: "2026-01-10T00:00:00Z", lastActive: "2026-09-15T00:00:00Z" }),
    ];
    const got = filterRoster(
      rows,
      { ...ALL, dateField: "signedUp", window: { kind: "days", days: 30 } },
      NOW
    );
    expect(got.map((r) => r.id)).toEqual(["new"]);
  });

  it("'never' against signedUp is empty — every account has a signup date", () => {
    const rows = [row({ id: "a" }), row({ id: "b" })];
    expect(filterRoster(rows, { ...ALL, dateField: "signedUp", window: { kind: "never" } }, NOW)).toEqual([]);
  });
});

describe("filterRoster — search", () => {
  it("matches name, email or mobile, case-insensitively", () => {
    const rows = [
      row({ id: "a", name: "Asha Kumar", email: "asha@x.com", mobile: "919876543210" }),
      row({ id: "b", name: "Bilal", email: "bilal@y.com", mobile: "919000000001" }),
    ];
    expect(filterRoster(rows, { ...ALL, search: "ASHA" }, NOW).map((r) => r.id)).toEqual(["a"]);
    expect(filterRoster(rows, { ...ALL, search: "y.com" }, NOW).map((r) => r.id)).toEqual(["b"]);
    expect(filterRoster(rows, { ...ALL, search: "9876543210" }, NOW).map((r) => r.id)).toEqual(["a"]);
  });

  it("ignores surrounding whitespace and an empty search matches everything", () => {
    const rows = [row({ id: "a", name: "Asha" }), row({ id: "b", name: "Bilal" })];
    expect(filterRoster(rows, { ...ALL, search: "  asha " }, NOW).map((r) => r.id)).toEqual(["a"]);
    expect(filterRoster(rows, { ...ALL, search: "   " }, NOW)).toHaveLength(2);
  });

  it("a student with no mobile does not crash the mobile search", () => {
    const rows = [row({ id: "a", mobile: null })];
    expect(filterRoster(rows, { ...ALL, search: "99" }, NOW)).toEqual([]);
  });
});

describe("filterRoster — combined", () => {
  it("applies exam, window and search together (AND)", () => {
    const rows = [
      row({ id: "hit", name: "Asha", targetExams: ["nda"], lastActive: "2026-09-14T00:00:00Z" }),
      row({ id: "wrongExam", name: "Asha", targetExams: ["neet"], lastActive: "2026-09-14T00:00:00Z" }),
      row({ id: "stale", name: "Asha", targetExams: ["nda"], lastActive: "2026-01-01T00:00:00Z" }),
      row({ id: "wrongName", name: "Bilal", targetExams: ["nda"], lastActive: "2026-09-14T00:00:00Z" }),
    ];
    const got = filterRoster(
      rows,
      { exams: ["nda"], window: { kind: "days", days: 30 }, dateField: "lastActive", search: "asha" },
      NOW
    );
    expect(got.map((r) => r.id)).toEqual(["hit"]);
  });
});

describe("sortRoster", () => {
  it("sorts numerically, both directions", () => {
    const rows = [
      row({ id: "a", mocksSubmitted: 5 }),
      row({ id: "b", mocksSubmitted: 30 }),
      row({ id: "c", mocksSubmitted: 12 }),
    ];
    expect(sortRoster(rows, "mocksSubmitted", "desc").map((r) => r.id)).toEqual(["b", "c", "a"]);
    expect(sortRoster(rows, "mocksSubmitted", "asc").map((r) => r.id)).toEqual(["a", "c", "b"]);
  });

  it("keeps NULL values last in BOTH directions", () => {
    // A student with no graded attempt must never top a descending score sort,
    // and must not crowd out real data at the top of an ascending one.
    const rows = [row({ id: "none", avgPct: null }), row({ id: "low", avgPct: 10 }), row({ id: "high", avgPct: 90 })];
    expect(sortRoster(rows, "avgPct", "desc").map((r) => r.id)).toEqual(["high", "low", "none"]);
    expect(sortRoster(rows, "avgPct", "asc").map((r) => r.id)).toEqual(["low", "high", "none"]);
  });

  it("keeps never-active students last when sorting by last active, both directions", () => {
    const rows = [
      row({ id: "never", lastActive: null }),
      row({ id: "old", lastActive: "2026-01-01T00:00:00Z" }),
      row({ id: "recent", lastActive: "2026-09-14T00:00:00Z" }),
    ];
    expect(sortRoster(rows, "lastActive", "desc").map((r) => r.id)).toEqual(["recent", "old", "never"]);
    expect(sortRoster(rows, "lastActive", "asc").map((r) => r.id)).toEqual(["old", "recent", "never"]);
  });

  it("sorts names case-insensitively", () => {
    const rows = [row({ id: "a", name: "zara" }), row({ id: "b", name: "Asha" })];
    expect(sortRoster(rows, "name", "asc").map((r) => r.id)).toEqual(["b", "a"]);
  });

  it("sorts dates chronologically, not lexically", () => {
    const rows = [
      row({ id: "a", signedUp: "2026-01-02T00:00:00Z" }),
      row({ id: "b", signedUp: "2025-12-31T00:00:00Z" }),
    ];
    expect(sortRoster(rows, "signedUp", "asc").map((r) => r.id)).toEqual(["b", "a"]);
  });

  it("is stable for equal keys (ties keep their incoming order)", () => {
    const rows = [
      row({ id: "a", mocksSubmitted: 3 }),
      row({ id: "b", mocksSubmitted: 3 }),
      row({ id: "c", mocksSubmitted: 3 }),
    ];
    expect(sortRoster(rows, "mocksSubmitted", "desc").map((r) => r.id)).toEqual(["a", "b", "c"]);
  });

  it("does not mutate the input array", () => {
    const rows = [row({ id: "a", mocksSubmitted: 1 }), row({ id: "b", mocksSubmitted: 9 })];
    sortRoster(rows, "mocksSubmitted", "desc");
    expect(rows.map((r) => r.id)).toEqual(["a", "b"]);
  });
});

describe("summariseRoster", () => {
  it("counts over the rows it is given, so the cards follow the filters", () => {
    const rows = [
      row({ id: "a", mobile: "919876543210", mocksSubmitted: 10, avgPct: 40, lastActive: "2026-09-14T00:00:00Z" }),
      row({ id: "b", mobile: null, mocksSubmitted: 2, avgPct: 20, lastActive: "2026-08-01T00:00:00Z" }),
      row({ id: "c", mobile: null, mocksSubmitted: 0, avgPct: null, lastActive: null }),
    ];
    const s = summariseRoster(rows, NOW);
    expect(s.students).toBe(3);
    expect(s.withMobile).toBe(1);
    expect(s.neverActive).toBe(1);
    expect(s.activeLast7).toBe(1);
    expect(s.totalMocksSubmitted).toBe(12);
    expect(s.avgPct).toBe(30); // mean of 40 and 20 — the ungraded student is excluded, not counted as 0
  });

  it("reports a null average when nobody has a graded attempt", () => {
    expect(summariseRoster([row({ avgPct: null })], NOW).avgPct).toBeNull();
  });

  it("handles an empty roster", () => {
    const s = summariseRoster([], NOW);
    expect(s).toMatchObject({ students: 0, withMobile: 0, neverActive: 0, activeLast7: 0, totalMocksSubmitted: 0, avgPct: null });
  });
});

describe("formatMobile", () => {
  it("renders a canonical 91XXXXXXXXXX for humans", () => {
    expect(formatMobile("919876543210")).toBe("+91 9876543210");
  });
  it("leaves other shapes alone and renders absence as a dash", () => {
    expect(formatMobile("12345")).toBe("12345");
    expect(formatMobile(null)).toBe("—");
  });
});

describe("toRosterCsv", () => {
  it("round-trips a mobile number as readable digits — the defect that motivated this page", () => {
    // The old hand-made export wrote a bare 12-digit number, which Excel silently
    // rounded to 9.19521E+11 and collapsed 6 distinct students onto one value.
    // A space makes the cell unambiguously TEXT to Excel, so the digits survive.
    const csv = toRosterCsv([row({ mobile: "919876543210" })]);
    expect(csv).toContain("9876543210");
    expect(csv).not.toMatch(/9\.\d+E\+\d+/i);
    const cell = csv.split("\n")[1].split(",").find((c) => c.includes("9876543210"))!;
    expect(cell).toBe('"91 9876543210"');
  });

  it("writes a header row naming every exported column", () => {
    const head = toRosterCsv([]).split("\n")[0];
    expect(head).toContain("mobile");
    expect(head).toContain("mocks_submitted");
    expect(head).toContain("avg_pct");
    expect(head).toContain("last_active");
    expect(head).toContain("target_exams");
  });

  it("escapes embedded quotes and commas rather than breaking the row", () => {
    const csv = toRosterCsv([row({ name: 'Asha "Ash", K', city: "Pune, MH" })]);
    expect(csv).toContain('"Asha ""Ash"", K"');
    expect(csv).toContain('"Pune, MH"');
    expect(csv.split("\n")).toHaveLength(2); // header + exactly one data row
  });

  it("neutralises a formula-injection attempt in a user-supplied field", () => {
    // name and city are user-supplied (OAuth profile / onboarding free text),
    // so a cell opening with = + - @ must not execute when the file is opened.
    const csv = toRosterCsv([row({ name: "=cmd|'/c calc'!A1", city: "@SUM(1+1)" })]);
    expect(csv).toContain("\"'=cmd");
    expect(csv).toContain("\"'@SUM");
  });

  it("renders absent values as empty cells, never as 0 or the string null", () => {
    const csv = toRosterCsv([row({ mobile: null, avgPct: null, lastActive: null, city: null })]);
    const cells = csv.split("\n")[1];
    expect(cells).not.toContain("null");
    expect(cells).not.toContain("undefined");
  });

  it("joins target exams on a separator that survives the CSV cell", () => {
    const csv = toRosterCsv([row({ targetExams: ["nda", "jee-mains"] })]);
    expect(csv).toContain('"nda|jee-mains"');
  });
});
