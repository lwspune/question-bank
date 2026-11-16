/**
 * The learning-games catalogue (migration 0268): games that already exist
 * (card, map, quiz and simulation games) mapped to our exams and subjects, so
 * we can keep revisiting what is out there and borrow what fits.
 *
 * The CONTENT lives only in the database (the owner keeps it private; the repo
 * is public). What lives here is SHAPE: the fixed value lists, the gate rule,
 * and the zod schemas that check a database row before the page shows it and
 * the loader's file before it is written. Pure: no server imports.
 * Spec: tests/games-catalogue.test.ts.
 */
import { z } from "zod";
import { EXAM_REGISTRY, type ExamGoal } from "@/lib/exam/examContext";
import { EXAM_GOALS } from "@/lib/exam/examGoals";

export const SUBJECTS = [
  { id: "maths", label: "Maths" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "biology", label: "Biology" },
  { id: "history", label: "History" },
  { id: "geography", label: "Geography" },
  { id: "polity", label: "Polity" },
  { id: "economics", label: "Economics" },
  { id: "english", label: "English" },
  { id: "reasoning", label: "Reasoning" },
  { id: "general_knowledge", label: "General knowledge" },
  { id: "computer", label: "Computer" },
  { id: "regional_language", label: "Marathi / Hindi" },
  { id: "any", label: "Any subject" },
] as const;

export const PLATFORMS = [
  { id: "app", label: "App" },
  { id: "web", label: "Web" },
  { id: "card_board", label: "Card / board game" },
  { id: "console", label: "PC / console" },
  { id: "classroom", label: "Classroom tool" },
] as const;

export const EVIDENCE = [
  { id: "strong", label: "Strong", meaning: "A review of many studies, or a controlled trial" },
  { id: "some", label: "Some", meaning: "Small or short studies with a comparison group" },
  { id: "weak", label: "Weak", meaning: "Reports, surveys or one-group studies" },
  { id: "none", label: "None found", meaning: "No study found yet" },
] as const;

export const STRENGTHS = [
  { id: "core", label: "Core", meaning: "The game's skill is a question type this exam asks" },
  { id: "good", label: "Good", meaning: "Helps a real part of the paper" },
  { id: "stretch", label: "Stretch", meaning: "Related, but a step away from the exam" },
] as const;

/**
 * What a game is built from. `gate` is the engagement-engine verdict on each
 * (CLAUDE.md "Engagement engine"): `forbidden` mechanics fail a game outright,
 * `caution` ones need a second look for our burst-studying cohort.
 */
export const MECHANICS = [
  { id: "speed_round", label: "Speed round", gate: "allowed" },
  { id: "daily_puzzle", label: "Daily puzzle", gate: "allowed" },
  { id: "ordering", label: "Put in order", gate: "allowed" },
  { id: "matching", label: "Matching", gate: "allowed" },
  { id: "map_tap", label: "Map tap", gate: "allowed" },
  { id: "labelling", label: "Labelling", gate: "allowed" },
  { id: "predict_reveal", label: "Predict, then reveal", gate: "allowed" },
  { id: "simulation", label: "Simulation", gate: "allowed" },
  { id: "building", label: "Build / construct", gate: "allowed" },
  { id: "puzzle", label: "Puzzle", gate: "allowed" },
  { id: "quiz", label: "Quiz", gate: "allowed" },
  { id: "card_play", label: "Card play", gate: "allowed" },
  { id: "story_world", label: "Story / world", gate: "allowed" },
  { id: "team_play", label: "Team / co-op", gate: "allowed" },
  { id: "personal_best", label: "Personal best", gate: "allowed" },
  { id: "mastery_levels", label: "Levels opened by mastery", gate: "allowed" },
  { id: "adaptive", label: "Adaptive difficulty", gate: "allowed" },
  { id: "spaced_review", label: "Spaced review", gate: "allowed" },
  { id: "shareable_result", label: "Shareable result", gate: "allowed" },
  { id: "teacher_led", label: "Teacher-led live", gate: "allowed" },
  { id: "live_duel", label: "Live duel", gate: "caution" },
  { id: "daily_streak", label: "Daily streak", gate: "caution" },
  { id: "xp_points", label: "XP / points", gate: "caution" },
  { id: "badges", label: "Badges", gate: "caution" },
  { id: "power_ups", label: "Power-ups", gate: "caution" },
  { id: "leaderboard", label: "Leaderboard", gate: "forbidden" },
  { id: "rating", label: "Public rating", gate: "forbidden" },
  { id: "lives", label: "Lives", gate: "forbidden" },
  { id: "random_rewards", label: "Random rewards", gate: "forbidden" },
  { id: "streak_freeze", label: "Streak freeze", gate: "forbidden" },
] as const;

export const GATE_VERDICTS = [
  { id: "passes", label: "Passes our gate" },
  { id: "caution", label: "Caution" },
  { id: "fails", label: "Fails our gate" },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]["id"];
export type PlatformId = (typeof PLATFORMS)[number]["id"];
export type EvidenceId = (typeof EVIDENCE)[number]["id"];
export type StrengthId = (typeof STRENGTHS)[number]["id"];
export type MechanicId = (typeof MECHANICS)[number]["id"];
export type GateId = (typeof GATE_VERDICTS)[number]["id"];

export type Gate = { verdict: GateId; reasons: string[] };

/**
 * The gate verdict, computed from the mechanics, never typed: any forbidden
 * mechanic fails the game (reasons = the forbidden ones); otherwise any
 * caution mechanic makes it a caution (reasons = those); else it passes.
 */
export function gateVerdict(mechanics: readonly MechanicId[]): Gate {
  const of = (gate: string) => MECHANICS.filter((m) => m.gate === gate && mechanics.includes(m.id)).map((m) => m.label);
  const forbidden = of("forbidden");
  if (forbidden.length) return { verdict: "fails", reasons: forbidden };
  const caution = of("caution");
  if (caution.length) return { verdict: "caution", reasons: caution };
  return { verdict: "passes", reasons: [] };
}

const ids = <T extends readonly { id: string }[]>(list: T) => list.map((x) => x.id) as [T[number]["id"], ...T[number]["id"][]];

const subjectSchema = z.enum(ids(SUBJECTS));
const mechanicSchema = z.enum(ids(MECHANICS));
const goalSchema = z.custom<ExamGoal>(
  (v) => typeof v === "string" && EXAM_GOALS.includes(v as ExamGoal),
  { message: `goal must be one of ${EXAM_GOALS.join(", ")}` },
);
const httpsUrl = z.string().url().refine((u) => u.startsWith("https://"), { message: "url must be https" });

const sourceSchema = z.object({ label: z.string().min(1).max(200), url: httpsUrl });

const EXAM_GOAL = new Map(EXAM_REGISTRY.map((e) => [e.slug as string, e.goal]));

const fitSchema = z
  .object({
    goal: goalSchema,
    subject: subjectSchema,
    strength: z.enum(ids(STRENGTHS)),
    why: z.string().min(1).max(300),
    exams: z.array(z.string()).default([]),
  })
  .superRefine((f, ctx) => {
    for (const slug of f.exams) {
      const goal = EXAM_GOAL.get(slug);
      if (!goal) ctx.addIssue({ code: "custom", path: ["exams"], message: `exam ${slug} is not in EXAM_REGISTRY` });
      else if (goal !== f.goal)
        ctx.addIssue({ code: "custom", path: ["exams"], message: `exam ${slug} belongs to ${goal}, not ${f.goal}` });
    }
  });

const idSchema = z.string().regex(/^[a-z0-9][a-z0-9-]{1,79}$/, { message: "id must be lowercase letters, digits and dashes" });

/** One game row as stored (snake_case, the table's columns). */
const gameRowSchema = z
  .object({
    id: idSchema,
    name: z.string().min(1).max(120),
    url: httpsUrl,
    maker: z.string().max(120).default(""),
    platform: z.enum(ids(PLATFORMS)),
    price: z.string().max(120).default(""),
    audience: z.string().max(120).default(""),
    subjects: z.array(subjectSchema).min(1, { message: "subjects: at least one" }),
    how_it_plays: z.string().min(1).max(400),
    mechanics: z.array(mechanicSchema).min(1, { message: "mechanics: at least one" }),
    evidence: z.enum(ids(EVIDENCE)),
    evidence_note: z.string().max(400).default(""),
    vendor_funded: z.boolean().default(false),
    scale: z.string().max(200).default(""),
    scale_as_of: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().default(null),
    borrow: z.string().max(300).default(""),
    fits: z.array(fitSchema).default([]),
    sources: z.array(sourceSchema).default([]),
    checked_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "checked_on must be YYYY-MM-DD" }),
  })
  .superRefine((r, ctx) => {
    if (r.evidence !== "none" && r.sources.length === 0)
      ctx.addIssue({ code: "custom", path: ["sources"], message: `evidence "${r.evidence}" needs a source` });
    const seen = new Set<string>();
    for (const f of r.fits) {
      const key = `${f.goal}/${f.subject}`;
      if (seen.has(key)) ctx.addIssue({ code: "custom", path: ["fits"], message: `fit ${key} appears twice` });
      seen.add(key);
    }
  });

const noteRowSchema = z.object({
  id: idSchema,
  title: z.string().min(2).max(120),
  sort: z.number().int().default(0),
  paragraphs: z.array(z.string().min(1)).default([]),
  bullets: z.array(z.string().min(1)).default([]),
  sources: z.array(sourceSchema).default([]),
});

export type Source = z.infer<typeof sourceSchema>;
export type Fit = z.output<typeof fitSchema>;
export type GameRowInput = z.input<typeof gameRowSchema>;
export type NoteRowInput = z.input<typeof noteRowSchema>;

export type Game = {
  id: string;
  name: string;
  url: string;
  maker: string;
  platform: PlatformId;
  price: string;
  audience: string;
  subjects: SubjectId[];
  howItPlays: string;
  mechanics: MechanicId[];
  evidence: EvidenceId;
  evidenceNote: string;
  vendorFunded: boolean;
  scale: string;
  scaleAsOf: string | null;
  borrow: string;
  fits: Fit[];
  sources: Source[];
  checkedOn: string;
  gate: Gate;
};

export type GameNote = z.output<typeof noteRowSchema>;

function fail(what: string, error: z.ZodError): never {
  const first = error.issues[0];
  throw new Error(`${what}: ${first.path.join(".")}: ${first.message}`);
}

const idOf = (input: unknown) => String((input as { id?: unknown })?.id ?? "?");

function checkGame(input: unknown) {
  const parsed = gameRowSchema.safeParse(input);
  if (!parsed.success) fail(`game ${idOf(input)}`, parsed.error);
  return parsed.data;
}

function checkNote(input: unknown) {
  const parsed = noteRowSchema.safeParse(input);
  if (!parsed.success) fail(`game note ${idOf(input)}`, parsed.error);
  return parsed.data;
}

/** Check one database row (or one loader-file entry) and map it to the page's shape. */
export function parseGameRow(input: unknown): Game {
  const r = checkGame(input);
  return {
    id: r.id,
    name: r.name,
    url: r.url,
    maker: r.maker,
    platform: r.platform,
    price: r.price,
    audience: r.audience,
    subjects: r.subjects,
    howItPlays: r.how_it_plays,
    mechanics: r.mechanics,
    evidence: r.evidence,
    evidenceNote: r.evidence_note,
    vendorFunded: r.vendor_funded,
    scale: r.scale,
    scaleAsOf: r.scale_as_of,
    borrow: r.borrow,
    fits: r.fits,
    sources: r.sources,
    checkedOn: r.checked_on,
    gate: gateVerdict(r.mechanics),
  };
}

export function parseNoteRow(input: unknown): GameNote {
  return checkNote(input);
}

/**
 * Check the loader's whole file: every row as above, plus what only shows
 * across rows (duplicate ids). Returns the rows in the table's own column
 * names, every column filled, ready for load_learning_games.
 */
export function parseLoadFile(input: unknown): {
  games: z.output<typeof gameRowSchema>[];
  notes: GameNote[];
} {
  const file = z.object({ games: z.array(z.unknown()), notes: z.array(z.unknown()).default([]) }).safeParse(input);
  if (!file.success) fail("load file", file.error);

  const games = file.data.games.map(checkGame);
  const notes = file.data.notes.map(checkNote);

  const dup = (list: string[]) => list.find((x, i) => list.indexOf(x) !== i);
  const dupGame = dup(games.map((g) => g.id));
  if (dupGame) throw new Error(`load file: duplicate id ${dupGame}`);
  const dupNote = dup(notes.map((n) => n.id));
  if (dupNote) throw new Error(`load file: duplicate id ${dupNote} (notes)`);

  return { games, notes };
}
