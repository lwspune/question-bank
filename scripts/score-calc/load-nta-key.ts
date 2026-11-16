/**
 * Load NTA's JEE Main answer key into score_keys (migration 0266), so the
 * score calculator at /score-calculator/jee-main can mark sheets against it.
 *
 *   npm run score:load-key -- --pdf=<key.pdf> --url=<NTA link> --status=provisional|final [--apply] [--target=test]
 *   npm run score:load-key -- --text=<key.txt> ...   (text already made with `pdftotext -layout`)
 *
 * DRY RUN by default: prints every shift it read (date, shift, region, the
 * questions per subject, dropped questions) and writes nothing. `--apply`
 * writes; re-running replaces that sitting's row, so a corrected key is one
 * more run. The calculator picks a new key up within 5 minutes (its cache).
 *
 * KEY DAY: NTA posts the provisional key on jeemain.nta.nic.in (Public
 * Notices). Download the PDF, run this dry, read the summary, then --apply.
 * When the final key comes, run it again with --status=final: the calculator
 * prefers a final key over a provisional one for the same shift.
 *
 * The parser refuses a shift whose subjects do not come out at 25 questions
 * each, so a print it has not seen fails here, never on a student's score.
 */
import { config } from "dotenv";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { parseNtaKeyText } from "../../src/lib/scoreCalc/ntaKey";
import { keyRowsFromShifts } from "../../src/lib/scoreCalc/jeeServer";

function flag(name: string): string | undefined {
  const hit = process.argv.slice(2).find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : "true";
}

const pdf = flag("pdf");
const textFile = flag("text");
const sourceUrl = flag("url");
const status = flag("status");
const apply = flag("apply") === "true";
const target = flag("target") ?? "prod";

if (
  (!pdf && !textFile) ||
  !sourceUrl?.startsWith("https://") ||
  (status !== "provisional" && status !== "final") ||
  !["prod", "test"].includes(target)
) {
  console.error(
    "usage: npm run score:load-key -- (--pdf=<key.pdf> | --text=<key.txt>) --url=<https NTA link> --status=provisional|final [--apply] [--target=test]",
  );
  process.exit(1);
}

config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });

function readText(): string {
  if (textFile) return readFileSync(textFile, "utf8");
  try {
    return execFileSync("pdftotext", ["-layout", pdf!, "-"], { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });
  } catch {
    console.error("Could not run pdftotext (poppler). Install it, or pass --text= with the text already extracted.");
    process.exit(1);
  }
}

async function main() {
  const shifts = parseNtaKeyText(readText());
  if (shifts.length === 0) {
    console.error("No shifts found. Is this NTA's answer-key PDF?");
    process.exit(1);
  }

  console.log(`${shifts.length} shift blocks (${status} key):`);
  for (const s of shifts) {
    const dropped = [...s.entries.values()].filter((e) => e.answer.kind === "dropped").length;
    const multi = [...s.entries.values()].filter((e) => e.answer.kind === "values" && e.answer.values.length > 1).length;
    console.log(
      `  ${s.date} shift ${s.shift}  ${s.region.padEnd(7)}  ${s.entries.size} questions` +
        (dropped ? `  dropped ${dropped}` : "") +
        (multi ? `  two answers ${multi}` : ""),
    );
  }

  const rows = keyRowsFromShifts(shifts, { status: status as "provisional" | "final", sourceUrl: sourceUrl! });
  if (!apply) {
    console.log(`\nDRY RUN: ${rows.length} rows would be written to ${target}. Add --apply to write.`);
    return;
  }

  // The test project's settings ride separate names (.env.test.local).
  const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error(`Supabase settings missing for ${target}.`);
  const db = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error } = await db
    .from("score_keys")
    .upsert(
      rows.map((r) => ({ ...r, loaded_at: new Date().toISOString() })),
      { onConflict: "calculator,sitting,region,status" },
    );
  if (error) {
    console.error(`Write failed: ${error.message}`);
    process.exit(1);
  }
  console.log(`\nWrote ${rows.length} rows to ${target}.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
