/**
 * One-off, 2026-10-10: move a textbook-erratum note from Physics Feb 2023 Q.20
 * to Physics Feb 2024 Q.17, the question it is about.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/move-q20-erratum.ts [--apply]
 *
 * The compilation had appended Feb 2024 Q.17 (current gains alpha and beta and
 * the relation between them) to Feb 2023 Q.20, and the row's solution answered
 * both. reconcile-apply.ts trimmed Q.20 to the printed question; the erratum on
 * the textbook's beta formula belonged to the half it lost. Q.17 has its own
 * row with a full derivation but not the erratum, so the note goes there.
 * Solution-only, so no fingerprint changes. Reads the note from the Q.20
 * backup; refuses if Q.17 already carries it or has changed since.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

const Q20 = "25742c73-a02c-464c-8327-835dfdc006c6";
const Q17 = "af1a3d57-c293-4d89-998e-529ccf167fe1";

async function main() {
  const apply = process.argv.includes("--apply");
  const dir = join(process.cwd(), "backups");
  const file = readdirSync(dir).filter((f) => f.startsWith("reconcile-phy-feb-2023-")).sort()[0];
  if (!file) throw new Error("no phy-feb-2023 reconcile backup");
  const old = (JSON.parse(readFileSync(join(dir, file), "utf8")) as { id: string; solution: string }[]).find((r) => r.id === Q20);
  if (!old) throw new Error(`Q.20 not in ${file}`);
  const note = /\[Textbook answer-key error:[\s\S]*\]\s*$/.exec(old.solution)?.[0].trim();
  if (!note) throw new Error("no erratum in the old Q.20 solution");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: row, error } = await db.from("questions").select("id, solution").eq("id", Q17).single();
  if (error || !row) throw new Error(`Q.17: ${error?.message}`);
  if ((row.solution ?? "").includes("Textbook answer-key error")) {
    console.log("Q.17 already carries the note; nothing to do.");
    return;
  }
  const next = `${(row.solution ?? "").trimEnd()}\n\n${note}`;
  console.log(`append to Q.17 (${Q17}):\n${note}`);
  if (!apply) return console.log("DRY RUN: add --apply.");
  writeFileSync(join(dir, `move-q20-erratum-${new Date().toISOString().replace(/[:.]/g, "-")}.json`), JSON.stringify(row, null, 1));
  const { data, error: uErr } = await db.from("questions").update({ solution: next }).eq("id", Q17).eq("solution", row.solution).select("id");
  if (uErr) throw new Error(uErr.message);
  if (data?.length !== 1) throw new Error("Q.17 changed since it was read; nothing written");
  console.log("appended.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
