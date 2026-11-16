/**
 * /dashboard/games (migration 0268): the pure core in src/lib/games.
 * What is locked:
 *
 * - a row from the database is checked before the page shows it: subjects,
 *   mechanics, platform and evidence from the fixed lists, https sources only,
 *   evidence above "none" carries a source, and every exam fit names a real
 *   goal and subject, with exam slugs that exist and belong to that goal;
 * - the gate verdict is COMPUTED from the mechanics (never typed): a forbidden
 *   mechanic fails, a risky one is a caution, and the reasons say which;
 * - the loader's file is checked the same way, duplicate ids refused;
 * - the matrix puts each game in every (subject, goal) cell it fits, core
 *   first, and leaves a cell empty where nothing fits;
 * - the page filters by subject, goal, gate and evidence, ignoring an unknown
 *   filter value.
 */
import { describe, it, expect } from "vitest";
import { gateVerdict, parseGameRow, parseLoadFile, parseNoteRow, MECHANICS, SUBJECTS } from "@/lib/games/model";
import { buildMatrix, filterGames, parseFilters, sortGames, gateCounts } from "@/lib/games/view";

const row = (over: Record<string, unknown> = {}) => ({
  id: "game-alpha",
  name: "Alpha",
  url: "https://example.org/alpha",
  maker: "Maker",
  platform: "card_board",
  price: "Paid",
  audience: "8+",
  subjects: ["history"],
  how_it_plays: "Order the cards.",
  mechanics: ["ordering", "card_play"],
  evidence: "weak",
  evidence_note: "A note.",
  vendor_funded: false,
  scale: "",
  scale_as_of: null,
  borrow: "Something to borrow.",
  fits: [
    {
      goal: "government",
      subject: "history",
      strength: "core",
      why: "Fits for a reason.",
      exams: ["upsc-cse", "mpsc-state-services-prelims"],
    },
  ],
  sources: [{ label: "A source", url: "https://example.org/source" }],
  checked_on: "2026-11-16",
  updated_at: "2026-11-16T10:00:00Z",
  ...over,
});

describe("parseGameRow", () => {
  it("maps a database row to the page's shape", () => {
    const g = parseGameRow(row());
    expect(g.id).toBe("game-alpha");
    expect(g.howItPlays).toBe("Order the cards.");
    expect(g.fits[0].exams).toEqual(["upsc-cse", "mpsc-state-services-prelims"]);
    expect(g.checkedOn).toBe("2026-11-16");
    expect(g.gate.verdict).toBe("passes");
  });

  it("refuses a subject, mechanic, platform or evidence value outside the list", () => {
    expect(() => parseGameRow(row({ subjects: ["alchemy"] }))).toThrow(/subjects/);
    expect(() => parseGameRow(row({ mechanics: ["magic"] }))).toThrow(/mechanics/);
    expect(() => parseGameRow(row({ platform: "vr" }))).toThrow(/platform/);
    expect(() => parseGameRow(row({ evidence: "great" }))).toThrow(/evidence/);
  });

  it("refuses a game with no subject or no mechanic", () => {
    expect(() => parseGameRow(row({ subjects: [] }))).toThrow(/subjects/);
    expect(() => parseGameRow(row({ mechanics: [] }))).toThrow(/mechanics/);
  });

  it("refuses a non-https link", () => {
    expect(() => parseGameRow(row({ url: "http://example.org" }))).toThrow(/url/);
    expect(() => parseGameRow(row({ sources: [{ label: "x", url: "http://example.org" }] }))).toThrow(/url/);
  });

  it("refuses evidence above 'none' without a source", () => {
    expect(() => parseGameRow(row({ evidence: "some", sources: [] }))).toThrow(/source/);
    expect(parseGameRow(row({ evidence: "none", sources: [] })).evidence).toBe("none");
  });

  it("refuses a fit whose exam is not in the registry", () => {
    const fits = [{ goal: "government", subject: "history", strength: "core", why: "x", exams: ["upsc-mains"] }];
    expect(() => parseGameRow(row({ fits }))).toThrow(/upsc-mains/);
  });

  it("refuses a fit whose exam belongs to another goal", () => {
    const fits = [{ goal: "government", subject: "history", strength: "core", why: "x", exams: ["nda"] }];
    expect(() => parseGameRow(row({ fits }))).toThrow(/nda.*defence/);
  });

  it("refuses a fit with a goal, subject or strength outside the list", () => {
    const fit = { goal: "government", subject: "history", strength: "core", why: "x", exams: [] };
    expect(() => parseGameRow(row({ fits: [{ ...fit, goal: "sports" }] }))).toThrow(/goal/);
    expect(() => parseGameRow(row({ fits: [{ ...fit, subject: "alchemy" }] }))).toThrow(/subject/);
    expect(() => parseGameRow(row({ fits: [{ ...fit, strength: "perfect" }] }))).toThrow(/strength/);
  });

  it("refuses two fits on the same goal and subject", () => {
    const fit = { goal: "government", subject: "history", strength: "core", why: "x", exams: [] };
    expect(() => parseGameRow(row({ fits: [fit, { ...fit, strength: "good" }] }))).toThrow(/twice/);
  });
});

describe("gateVerdict", () => {
  it("passes a game with only allowed mechanics", () => {
    expect(gateVerdict(["ordering", "personal_best"])).toEqual({ verdict: "passes", reasons: [] });
  });

  it("fails a game with a forbidden mechanic and names it", () => {
    const g = gateVerdict(["speed_round", "leaderboard", "lives"]);
    expect(g.verdict).toBe("fails");
    expect(g.reasons).toEqual(["Leaderboard", "Lives"]);
  });

  it("is a caution for a risky mechanic, and fails beats caution", () => {
    expect(gateVerdict(["daily_streak"]).verdict).toBe("caution");
    expect(gateVerdict(["daily_streak", "random_rewards"])).toEqual({ verdict: "fails", reasons: ["Random rewards"] });
  });

  it("every mechanic has a gate class", () => {
    for (const m of MECHANICS) expect(["allowed", "caution", "forbidden"]).toContain(m.gate);
  });
});

describe("parseNoteRow", () => {
  it("keeps paragraphs, bullets and sources", () => {
    const n = parseNoteRow({ id: "research", title: "What research says", sort: 0, paragraphs: ["p"], bullets: ["b"], sources: [] });
    expect(n.bullets).toEqual(["b"]);
  });
});

describe("parseLoadFile", () => {
  it("checks every row and returns the table's columns", () => {
    const out = parseLoadFile({ games: [row()], notes: [] });
    expect(out.games[0].how_it_plays).toBe("Order the cards.");
    expect(out.games[0].fits[0].exams).toHaveLength(2);
  });

  it("refuses duplicate ids", () => {
    expect(() => parseLoadFile({ games: [row(), row()], notes: [] })).toThrow(/duplicate id game-alpha/);
    const n = { id: "research", title: "Note", paragraphs: [] };
    expect(() => parseLoadFile({ games: [], notes: [n, n] })).toThrow(/duplicate id research/);
  });

  it("names the bad row", () => {
    expect(() => parseLoadFile({ games: [row({ id: "bad-one", platform: "vr" })], notes: [] })).toThrow(/bad-one/);
  });
});

describe("view", () => {
  const games = [
    parseGameRow(row()),
    parseGameRow(
      row({
        id: "game-echo",
        name: "Echo",
        subjects: ["geography"],
        mechanics: ["map_tap", "speed_round"],
        evidence: "none",
        sources: [],
        fits: [
          { goal: "government", subject: "geography", strength: "core", why: "x", exams: [] },
          { goal: "defence", subject: "geography", strength: "good", why: "x", exams: ["nda"] },
        ],
      }),
    ),
    parseGameRow(
      row({
        id: "game-delta",
        name: "Delta",
        subjects: ["english"],
        mechanics: ["leaderboard", "lives", "daily_streak"],
        evidence: "some",
        fits: [{ goal: "government", subject: "english", strength: "stretch", why: "x", exams: [] }],
      }),
    ),
    parseGameRow(
      row({
        id: "game-charlie",
        name: "Charlie",
        subjects: ["maths"],
        mechanics: ["speed_round"],
        evidence: "none",
        sources: [],
        fits: [{ goal: "government", subject: "history", strength: "good", why: "x", exams: [] }],
      }),
    ),
  ];

  it("puts each game in every cell it fits, core first, and leaves gaps empty", () => {
    const m = buildMatrix(games);
    expect(m.rows.map((r) => r.subject)).toEqual(SUBJECTS.map((s) => s.id));
    const history = m.rows.find((r) => r.subject === "history")!;
    expect(history.cells.government.map((c) => c.id)).toEqual(["game-alpha", "game-charlie"]);
    expect(history.cells.government[0].strength).toBe("core");
    expect(m.rows.find((r) => r.subject === "geography")!.cells.defence.map((c) => c.id)).toEqual(["game-echo"]);
    expect(m.rows.find((r) => r.subject === "polity")!.cells.government).toEqual([]);
  });

  it("filters by subject, goal, gate and evidence", () => {
    expect(filterGames(games, { subject: "geography" }).map((g) => g.id)).toEqual(["game-echo"]);
    expect(filterGames(games, { goal: "defence" }).map((g) => g.id)).toEqual(["game-echo"]);
    expect(filterGames(games, { gate: "fails" }).map((g) => g.id)).toEqual(["game-delta"]);
    expect(filterGames(games, { evidence: "weak" }).map((g) => g.id)).toEqual(["game-alpha"]);
  });

  it("ignores an unknown filter value", () => {
    expect(parseFilters({ subject: "alchemy", goal: "defence", gate: ["passes", "fails"], evidence: "x" })).toEqual({
      goal: "defence",
      gate: "passes",
    });
  });

  it("sorts by evidence (strongest first), then name", () => {
    expect(sortGames(games).map((g) => g.id)).toEqual(["game-delta", "game-alpha", "game-charlie", "game-echo"]);
  });

  it("counts games by gate verdict", () => {
    expect(gateCounts(games)).toEqual({ passes: 3, caution: 0, fails: 1 });
  });
});
