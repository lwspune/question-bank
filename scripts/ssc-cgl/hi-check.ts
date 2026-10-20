/**
 * Check a Hindi reading against the shift's English rows. Read-only.
 *
 *   npx tsx scripts/ssc-cgl/hi-check.ts <shiftId>                     # hindi/<shiftId>.txt, every question
 *   npx tsx scripts/ssc-cgl/hi-check.ts <shiftId> --file=<draft> --partial   # an agent's slice
 *
 * The checks are the Marathi lane's (checkMarathiPaper, scripts/mh-ssc-10/
 * marathi.ts), whose messages say "Marathi"; read them as "the second print".
 * --partial checks only the questions the draft holds (a slice). Exits 1 on an
 * error; warnings (a number differing between the prints) are for the main
 * session to read against the sheet.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { checkMarathiPaper } from "../mh-ssc-10/marathi";
import { requireShift } from "./config";
import { parseHindiDraft, relaxScriptFindings } from "./hindi";
import { hindiPath, loadEnglishRows } from "./hi-rows";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const args = process.argv.slice(2);
  const shift = requireShift(args.find((a) => !a.startsWith("--")));
  const file = args.find((a) => a.startsWith("--file="))?.slice(7) ?? hindiPath(shift.id);
  const partial = args.includes("--partial");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const hindi = parseHindiDraft(readFileSync(file, "utf8"));
  const refs = new Set(hindi.map((q) => q.ref));
  const english = (await loadEnglishRows(client, shift))
    .map((r) => r.paper)
    .filter((p) => !partial || refs.has(p.ref));
  const findings = relaxScriptFindings(checkMarathiPaper(english, hindi, { requireSolution: false }), hindi);
  for (const f of findings) console.log(`${f.level.toUpperCase().padEnd(5)} Q${f.ref}: ${f.reason}`);
  const errors = findings.filter((f) => f.level === "error").length;
  console.log(`${shift.id}: ${hindi.length} read, ${errors} error(s), ${findings.length - errors} warning(s)`);
  if (errors) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
