/**
 * Build the "Motion in a Plane" teaching decks.
 *
 *   npx tsx scripts/ppt/motion-in-a-plane/build.ts
 *
 * Emits four .pptx into generated-papers/:
 *   Motion-in-a-Plane-Part-1-Rectilinear-Motion.pptx
 *   Motion-in-a-Plane-Part-2a-Two-Dimensions.pptx
 *   Motion-in-a-Plane-Part-2b-Circular-Motion.pptx
 *   Motion-in-a-Plane-Complete.pptx          (all three, with dividers)
 *
 * The three separate files match the syllabus tracker, which teaches this
 * chapter as Part 1 (before Unit Test 1) and Part 2 (before the First Term
 * exam). The combined file is for handing the whole chapter over at once —
 * same authored content, only the partition differs.
 *
 * Anchor questions are fetched live from the bank by id, so a stem repaired
 * later flows into the next build rather than being frozen into a copy.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildTeachingDeck, type DeckSlide } from "../../../src/lib/export/pptxBuilder";
import { queryQuestionsByIds, type QuestionRow } from "../../../src/lib/questions/query";
import { downloadImage } from "../../../src/lib/storage/images";
import { DECK_A, DECK_B, DECK_C, type AuthoredSlide } from "./content";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const OUT_DIR = join(process.cwd(), "generated-papers");
const FIGURE_MAP = join(__dirname, "figures.json");

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Authored slides → deck slides. Anchors are replaced by the live question and
 * numbered ACROSS the deck, so a teacher can say "question 4" and be understood.
 */
function resolve(
  slides: AuthoredSlide[],
  byId: Map<string, QuestionRow>,
  startNumber = 0
): { deck: DeckSlide[]; next: number } {
  const deck: DeckSlide[] = [];
  let number = startNumber;
  for (const slide of slides) {
    if (slide.kind !== "anchor") {
      deck.push(slide);
      continue;
    }
    const question = byId.get(slide.id);
    if (!question) {
      // Loud, not silent: a dropped anchor is a hole in the practice set and
      // nothing downstream would show it.
      throw new Error(`anchor question not found in the bank: ${slide.id}`);
    }
    number += 1;
    deck.push({ kind: "practice", question, number });
  }
  return { deck, next: number };
}

/**
 * Give every chapter figure its own slide, straight after the slide that cites
 * it.
 *
 * These figures are dense — Fig 3.1 is five graphs, Fig 3.5 is a labelled
 * trajectory — and putting one under six bullets left it a strip of the body:
 * the text overflowed its shape and the picture was drawn over the last two
 * bullets. Trimming the teaching text would have fixed the layout by deleting
 * the lesson. A full-bleed figure is also how you actually teach it: the class
 * looks at the graphs while the teacher talks.
 */
function splitFigures(slides: AuthoredSlide[]): AuthoredSlide[] {
  return slides.flatMap((slide) => {
    if (slide.kind !== "teaching" || !slide.image) return [slide];
    const { image, ...text } = slide;
    return [
      text,
      // The badge on every figure-bearing slide is already the figure's
      // reference ("Figure 3.4(a)"), which is the right title for the figure.
      { kind: "teaching" as const, title: slide.badge ?? slide.title, lines: [], image },
    ];
  });
}

function anchorIds(slides: AuthoredSlide[]): string[] {
  return slides.flatMap((s) => (s.kind === "anchor" ? [s.id] : []));
}

function countSlides(deck: DeckSlide[]): number {
  // Practice expands to a question slide plus its answer slide.
  return deck.reduce((n, s) => n + (s.kind === "practice" ? 2 : 1), 0);
}

async function main() {
  const supabase = client();
  const ids = [...anchorIds(DECK_A), ...anchorIds(DECK_B), ...anchorIds(DECK_C)];
  const rows = await queryQuestionsByIds(supabase, ids);
  const byId = new Map(rows.map((r) => [r.id, r]));

  const missing = ids.filter((id) => !byId.has(id));
  if (missing.length) throw new Error(`missing anchor questions: ${missing.join(", ")}`);

  // A figure question is unanswerable on a slide without its figure, so the
  // bytes are fetched and embedded. A path that fails to download is FATAL
  // rather than skipped: the builder would silently drop the frame and ship a
  // graph question with no graphs.
  const paths = rows.flatMap((r) => [
    ...(r.imageUrl ? [r.imageUrl] : []),
    ...r.options.flatMap((o) => (o.imageUrl ? [o.imageUrl] : [])),
    ...(r.solutionImageUrl ? [r.solutionImageUrl] : []),
  ]);
  const imageBytes = new Map<string, Buffer>();
  for (const path of paths) {
    const bytes = await downloadImage(supabase, path);
    if (!bytes) throw new Error(`anchor image failed to download: ${path}`);
    imageBytes.set(path, bytes);
  }
  if (paths.length) console.log(`embedded ${paths.length} anchor image(s)`);

  // Chapter figures, cropped by extract_figures.py and pushed to Supabase
  // Storage by upload-figures.ts. They live in Storage rather than git because
  // Std XI PCM alone is ~743 figures / ~37 MB and git keeps every blob forever;
  // the repo carries only `figures.json`, the filename → path map.
  //
  // The slides CITE these by number ("Figure 3.5"), so a missing one leaves a
  // dangling reference on screen — every failure here is FATAL, never skipped.
  const figures = [...DECK_A, ...DECK_B, ...DECK_C].flatMap((s) =>
    s.kind === "teaching" && s.image ? [s.image] : []
  );
  const wanted = new Set(figures);
  if (wanted.size) {
    if (!existsSync(FIGURE_MAP)) {
      throw new Error(
        `${FIGURE_MAP} not found.\n` +
          `Run: python scripts/ppt/motion-in-a-plane/extract_figures.py\n` +
          `then: npx tsx scripts/ppt/motion-in-a-plane/upload-figures.ts --apply`
      );
    }
    const map = JSON.parse(readFileSync(FIGURE_MAP, "utf8")) as {
      files: Record<string, string>;
    };
    for (const name of wanted) {
      const path = map.files[name];
      if (!path) {
        throw new Error(
          `figure "${name}" is cited by a slide but absent from figures.json — ` +
            `re-run upload-figures.ts --apply`
        );
      }
      imageBytes.set(name, await downloadImage(supabase, path));
    }
    console.log(`embedded ${wanted.size} chapter figure(s) from Storage`);
  }
  const withoutSolution = rows.filter((r) => !r.solution);
  if (withoutSolution.length) {
    console.warn(
      `WARNING: ${withoutSolution.length} anchor(s) have no stored solution, so their ` +
        `answer slide will show only the key:\n` +
        withoutSolution.map((r) => `  ${r.id}`).join("\n")
    );
  }

  const a = resolve(splitFigures(DECK_A), byId, 0);
  const b = resolve(splitFigures(DECK_B), byId, a.next);
  const c = resolve(splitFigures(DECK_C), byId, b.next);

  const decks: { file: string; title: string; slides: DeckSlide[] }[] = [
    {
      file: "Motion-in-a-Plane-Part-1-Rectilinear-Motion.pptx",
      title: "Motion in a Plane — Part 1: Rectilinear Motion",
      slides: a.deck,
    },
    {
      file: "Motion-in-a-Plane-Part-2a-Two-Dimensions.pptx",
      title: "Motion in a Plane — Part 2a: Motion in Two Dimensions",
      slides: b.deck,
    },
    {
      file: "Motion-in-a-Plane-Part-2b-Circular-Motion.pptx",
      title: "Motion in a Plane — Part 2b: Uniform Circular Motion",
      slides: c.deck,
    },
    {
      file: "Motion-in-a-Plane-Complete.pptx",
      title: "Motion in a Plane — MH State Board Std XI Physics",
      slides: [
        { kind: "section", title: "Part 1 — Rectilinear Motion" },
        ...a.deck,
        { kind: "section", title: "Part 2a — Motion in Two Dimensions" },
        ...b.deck,
        { kind: "section", title: "Part 2b — Uniform Circular Motion" },
        ...c.deck,
      ],
    },
  ];

  mkdirSync(OUT_DIR, { recursive: true });
  for (const deck of decks) {
    const buffer = await buildTeachingDeck({ title: deck.title, slides: deck.slides, imageBytes });
    writeFileSync(join(OUT_DIR, deck.file), buffer);
    console.log(
      `${deck.file.padEnd(52)} ${String(countSlides(deck.slides)).padStart(3)} slides  ` +
        `${(buffer.length / 1024).toFixed(0)} KB`
    );
  }
  console.log(`\n${rows.length} anchor questions embedded, ${ids.length} requested.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
