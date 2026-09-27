/**
 * Flip the MPSC Mains corpus PUBLIC — the deliberate publishing step the rest of
 * this pipeline refuses to take (commit.ts forces PRIVATE).
 *
 *   npx tsx scripts/mpsc-mains/flip-public.ts           # dry run: counts only
 *   npx tsx scripts/mpsc-mains/flip-public.ts --apply
 *
 * Decided by the owner 2026-09-27. Scoped to the five Mains exam rows (resolved
 * by name from EXAMS), so no other exam can be touched. Reversible: set the same
 * rows back to PRIVATE. Afterwards drop `noPublicContent` from the five
 * EXAM_REGISTRY entries, or the picker keeps hiding them.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAMS } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const names = Object.values(EXAMS).map((e) => e.name);
  const { data: exams, error } = await db.from("exams").select("id, name").in("name", names);
  if (error) throw new Error(error.message);
  if ((exams ?? []).length !== names.length) throw new Error(`expected ${names.length} Mains exams, found ${exams?.length}`);

  for (const ex of exams!) {
    const count = async (vis: string) =>
      (await db.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", ex.id).eq("visibility", vis)).count ?? 0;
    const before = `PUBLIC ${await count("PUBLIC")} · PRIVATE ${await count("PRIVATE")}`;
    if (apply) {
      const { error: uErr } = await db.from("questions").update({ visibility: "PUBLIC" }).eq("exam_id", ex.id).eq("visibility", "PRIVATE");
      if (uErr) throw new Error(`${ex.name}: ${uErr.message}`);
    }
    console.log(`${ex.name.padEnd(30)} before ${before}${apply ? ` → after PUBLIC ${await count("PUBLIC")} · PRIVATE ${await count("PRIVATE")}` : ""}`);
  }
  if (!apply) console.log("[dry run] pass --apply to flip.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
