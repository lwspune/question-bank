/**
 * Merge the 3 per-subject derivation fragments into one shift data file.
 *
 *   npx tsx scripts/mhtcet/merge-shift.ts <shiftId>
 *
 * Reads shifts/<shiftId>.{physics,chemistry,maths}.json (authored by the derive
 * step) + the SHIFTS registry metadata, writes shifts/<shiftId>.json (the
 * ShiftData consumed by commit.ts). Validates 150 keys + required fields.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SHIFTS, shiftDataPath, requireShiftId, type ShiftQuestion } from "./config";

function main() {
  const shiftId = requireShiftId(process.argv, 2, "merge-shift.ts <shiftId>");
  const meta = SHIFTS[shiftId];
  if (!meta) throw new Error(`unknown shiftId ${shiftId} — add it to SHIFTS in config.ts`);

  const dir = join(__dirname, "shifts");
  const merged: Record<string, ShiftQuestion> = {};
  for (const subj of ["physics", "chemistry", "maths"] as const) {
    const p = join(dir, `${shiftId}.${subj}.json`);
    if (!existsSync(p)) throw new Error(`missing fragment: ${p}`);
    const frag = JSON.parse(readFileSync(p, "utf8")) as Record<string, ShiftQuestion>;
    for (const [k, v] of Object.entries(frag)) {
      if (merged[k]) throw new Error(`duplicate question number ${k} across fragments`);
      // Defensive: agents sometimes emit optionOverrides as an array [{label,text}] instead
      // of the expected object {label: text}. Coerce so commit's ov[label] lookup works.
      const ovRaw = v.optionOverrides as unknown;
      if (Array.isArray(ovRaw)) {
        v.optionOverrides = Object.fromEntries(
          (ovRaw as { label: string; text: string }[]).map((o) => [o.label, o.text])
        ) as ShiftQuestion["optionOverrides"];
      }
      merged[k] = v;
    }
  }

  const keys = Object.keys(merged).map(Number).sort((a, b) => a - b);
  if (keys.length !== 150) console.warn(`[warn] ${keys.length} questions merged (expected 150)`);
  const missing = [];
  for (let i = 1; i <= 150; i++) if (!merged[String(i)]) missing.push(i);
  if (missing.length) console.warn(`[warn] missing question numbers: ${missing.join(", ")}`);

  const bad: string[] = [];
  for (const [k, q] of Object.entries(merged)) {
    if (!q.chapter || !q.subtopic || !q.answer || !q.solution) bad.push(k);
    if (!["A", "B", "C", "D"].includes(q.answer)) bad.push(`${k}(answer=${q.answer})`);
    if (!["EASY", "MODERATE", "HARD"].includes(q.difficulty)) bad.push(`${k}(diff=${q.difficulty})`);
  }
  if (bad.length) throw new Error(`incomplete questions: ${bad.join(", ")}`);

  const data = {
    sourceFile: meta.sourceFile,
    pyqYear: meta.pyqYear,
    pyqMonth: meta.pyqMonth,
    pyqNote: meta.pyqNote,
    questions: merged,
  };
  writeFileSync(shiftDataPath(shiftId), JSON.stringify(data, null, 2), "utf8");

  const dis = Object.entries(merged).filter(([, q]) => q.agreesWithAk === false);
  const flawed = Object.entries(merged).filter(([, q]) => q.flawed);
  console.log(`merged ${keys.length} questions -> ${shiftDataPath(shiftId)}`);
  console.log(`  disagreements with AK: ${dis.length}${dis.length ? " (Q" + dis.map(([k]) => k).join(", Q") + ")" : ""}`);
  console.log(`  flawed (stay PRIVATE): ${flawed.length}${flawed.length ? " (Q" + flawed.map(([k]) => k).join(", Q") + ")" : ""}`);
}

main();
