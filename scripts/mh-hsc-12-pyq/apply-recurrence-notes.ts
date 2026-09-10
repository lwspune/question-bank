/**
 * Record the SECOND sitting on a question the board asked twice.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/apply-recurrence-notes.ts          # dry run
 *   npx tsx scripts/mh-hsc-12-pyq/apply-recurrence-notes.ts --apply
 *
 * `content_hash` is unique on (org_id, exam_id, content_hash), so when the board
 * re-asks a question verbatim in a later sitting the two copies CANNOT both exist
 * as rows — the second is absorbed and its year and question number disappear
 * from the bank. That is correct behaviour and the recurrence is genuine signal
 * (a repeat is a high-yield marker, not a defect), but the surviving row then
 * silently claims to be a one-off.
 *
 * This names the other sitting on the surviving row.
 *
 * SAFE AS AN IN-PLACE UPDATE. `pyq_note` is not part of `content_hash` — that
 * covers stem + options + answer — so the row's identity does not move and no
 * delete-and-re-commit is needed. (Contrast the escaped-bracket repair, which
 * touches a STEM and therefore cannot be an UPDATE.)
 *
 * Refuses unless the live row resolves uniquely AND still carries the note this
 * was adjudicated against, so a re-run is a no-op rather than a second append.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, CHAPTERS, DATA } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Pair = { chapter: string; refs: [string, string]; why: string };

/** Each pair is TWO refs whose stem+options+answer hash identically. */
const PAIRS: Pair[] = [
  {
    chapter: "differentiation-12-pyq",
    refs: ["differentiation-12-pyq#2", "differentiation-12-pyq#7"],
    why: "If y = x^x, find dy/dx — set in March 2016 Q.4(B)(ii) and again in March 2019 Q.11.",
  },
  {
    chapter: "indef-integration-12-pyq",
    refs: ["indef-integration-12-pyq#20", "indef-integration-12-pyq#23"],
    why:
      "Prove the standard integral of 1/(a^2 - x^2) — set in March 2018 Q.5(B)(ii) and again " +
      "in 2024 Q.23.",
  },
  {
    chapter: "rotational-dynamics-12-pyq",
    refs: ["rotational-dynamics-12-pyq#35", "rotational-dynamics-12-pyq#41"],
    why:
      "State and prove the principle of conservation of angular momentum — set in March 2018 " +
      "Q.3(ii) and again in February 2023 Q.5.",
  },
  {
    chapter: "oscillations-12-pyq",
    refs: ["oscillations-12-pyq#8", "oscillations-12-pyq#13"],
    why:
      "Obtain the differential equation of linear S.H.M. — set in March 2017 Q.2(iii) and " +
      "again in February 2024 Q.6.",
  },
];

type Row = { ref: string; stem: string; questionNumber: string; pyqYear?: number; pyqMonth?: string };
const sitting = (r: Row) => `${r.pyqMonth ? `${r.pyqMonth} ` : ""}${r.pyqYear ?? "?"} (Q. ${r.questionNumber.replace(/^Q\.\s*/, "")})`;

async function main() {
  const apply = process.argv.includes("--apply");
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const planned: { id: string; from: string; to: string; label: string }[] = [];
  const problems: string[] = [];

  for (const pair of PAIRS) {
    const rows = JSON.parse(
      readFileSync(join(DATA, `${pair.chapter}.questions.json`), "utf8"),
    ) as Row[];
    const both = pair.refs.map((ref) => rows.find((r) => r.ref === ref));
    if (both.some((r) => !r)) {
      problems.push(`${pair.refs.join(" / ")}: a ref is missing from the committed file`);
      continue;
    }
    const [a, b] = both as Row[];
    if (a.stem !== b.stem) {
      problems.push(`${pair.refs.join(" / ")}: the two stems no longer match — re-adjudicate`);
      continue;
    }

    const { data, error } = await client
      .from("questions")
      .select("id,pyq_year,pyq_month,pyq_note,visibility")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", CHAPTERS[pair.chapter].sourceFile)
      .eq("text", a.stem);
    if (error) throw error;
    if (data?.length !== 1) {
      problems.push(`${pair.refs.join(" / ")}: matched ${data?.length ?? 0} live rows (need exactly 1)`);
      continue;
    }
    const live = data[0];

    // WHICH sitting survived? The row carries one of them; name the OTHER.
    const survivor = [a, b].find((r) => r.pyqYear === live.pyq_year && (r.pyqMonth ?? null) === (live.pyq_month ?? null));
    const other = [a, b].find((r) => r !== survivor);
    if (!survivor || !other) {
      problems.push(
        `${pair.refs.join(" / ")}: the live row's sitting (${live.pyq_month ?? "-"} ${live.pyq_year ?? "-"}) ` +
          `matches neither authored copy — re-adjudicate rather than guessing which survived`,
      );
      continue;
    }

    const note = String(live.pyq_note ?? "");
    const clause = ` The board also set this question in ${sitting(other)}; the two printings are identical, so the bank holds one row for both.`;
    if (note.includes("also set this question in")) continue; // already recorded — re-run is a no-op
    planned.push({
      id: live.id as string,
      from: note,
      to: note.trimEnd() + clause,
      label: `${survivor.ref} (kept ${sitting(survivor)}) + ${other.ref}`,
    });
  }

  if (problems.length) throw new Error(`REFUSING (${problems.length}):\n  ${problems.join("\n  ")}`);
  if (!planned.length) {
    console.log("nothing to do — every recurrence is already recorded.");
    return;
  }

  for (const p of planned) {
    console.log(`\n${p.label}\n  ${p.id}`);
    console.log(`  + ${p.to.slice(p.from.trimEnd().length).trim()}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] ${planned.length} note(s) ready. Pass --apply to write.`);
    return;
  }
  for (const p of planned) {
    const { error } = await client.from("questions").update({ pyq_note: p.to }).eq("id", p.id);
    if (error) throw error;
  }
  console.log(`\napplied ${planned.length} recurrence note(s).`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
