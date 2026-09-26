/**
 * Flip the UPSC CSE (Prelims) corpus PUBLIC — the deliberate publishing step the
 * rest of this pipeline refuses to take (commit.ts forces PRIVATE).
 *
 *   npx tsx scripts/upsc/flip-public.ts           # dry run: counts only
 *   npx tsx scripts/upsc/flip-public.ts --apply
 *
 * Decided by the owner 2026-09-26. Reversible: set the same rows back to PRIVATE.
 * Afterwards the exam needs its EXAM_REGISTRY entry, or it has no surface.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const count = async (vis: string) =>
    (await db.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", EXAM_ID).eq("visibility", vis)).count ?? 0;

  console.log(`before: PUBLIC ${await count("PUBLIC")} · PRIVATE ${await count("PRIVATE")}`);
  if (!apply) return console.log("[dry run] pass --apply to flip.");
  const { error } = await db.from("questions").update({ visibility: "PUBLIC" }).eq("exam_id", EXAM_ID).eq("visibility", "PRIVATE");
  if (error) throw new Error(error.message);
  console.log(`after:  PUBLIC ${await count("PUBLIC")} · PRIVATE ${await count("PRIVATE")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
