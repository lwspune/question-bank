/**
 * Remove objects in the `question-images` bucket that no live image_url references —
 * the orphans left behind every time a figure is re-cropped + re-attached (the old PNG
 * is never deleted). Service-role only. Referenced = `questions.image_url` ∪
 * `options.image_url` (BOTH columns — option-figures live here too).
 *
 *   npx tsx scripts/sweep-orphan-images.ts          # dry-run: report counts + a sample
 *   npx tsx scripts/sweep-orphan-images.ts --apply  # delete org-folder orphans only
 *
 * SCOPE: by default deletes only orphans under the LWS org folder (where every live
 * image lives) — i.e. superseded re-crop uploads. Objects in OTHER top-level folders
 * (a historical pre-org-folder upload scheme) are reported but NOT deleted without an
 * explicit `--purge-all`. Refuses to run if the referenced set looks implausibly small.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "question-images";
const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune — the live image folder

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Every file path in the bucket (recurses one level: <folder>/<file>). */
async function listAllPaths(c: SupabaseClient): Promise<string[]> {
  const paths: string[] = [];
  const roots = await c.storage.from(BUCKET).list("", { limit: 1000 });
  if (roots.error) throw roots.error;
  const folders = (roots.data ?? []).filter((o) => o.id === null).map((o) => o.name);
  const bare = (roots.data ?? []).filter((o) => o.id !== null).map((o) => o.name); // files at root (unexpected)
  paths.push(...bare);
  for (const folder of folders) {
    let offset = 0;
    for (;;) {
      const { data, error } = await c.storage.from(BUCKET).list(folder, { limit: 1000, offset });
      if (error) throw error;
      const files = (data ?? []).filter((o) => o.id !== null);
      paths.push(...files.map((o) => `${folder}/${o.name}`));
      if (!data || data.length < 1000) break;
      offset += 1000;
    }
  }
  return paths;
}

/** Every non-null image_url from BOTH questions + options (paginated past the 1000-row cap). */
async function referencedPaths(c: SupabaseClient): Promise<Set<string>> {
  const set = new Set<string>();
  for (const table of ["questions", "options"] as const) {
    const page = 1000;
    for (let from = 0; ; from += page) {
      const { data, error } = await c.from(table).select("image_url").not("image_url", "is", null).range(from, from + page - 1);
      if (error) throw error;
      for (const r of data ?? []) if (r.image_url) set.add(r.image_url as string);
      if (!data || data.length < page) break;
    }
  }
  return set;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const purgeAll = process.argv.includes("--purge-all");
  loadEnv();
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const [allPaths, referenced] = await Promise.all([listAllPaths(c), referencedPaths(c)]);
  if (referenced.size < 50) throw new Error(`referenced set is only ${referenced.size} — refusing to sweep (query looks broken)`);

  const orphans = allPaths.filter((p) => !referenced.has(p));
  const orgOrphans = orphans.filter((p) => p.startsWith(`${ORG_ID}/`));
  const otherOrphans = orphans.filter((p) => !p.startsWith(`${ORG_ID}/`));
  console.log(`bucket objects: ${allPaths.length} · referenced (questions+options): ${referenced.size} · orphans: ${orphans.length}`);
  console.log(`  org-folder orphans (superseded re-crops, in scope): ${orgOrphans.length}`);
  console.log(`  other-folder orphans (historical pre-org-folder scheme, needs --purge-all): ${otherOrphans.length}`);
  if (orgOrphans.length) console.log("  org-folder sample:", orgOrphans.slice(0, 6).join(", "));

  const toRemove = purgeAll ? orphans : orgOrphans;
  if (!apply) { console.log(`\n[dry-run] --apply would delete ${toRemove.length} object(s)${purgeAll ? " (incl. other folders)" : " (org folder only)"}.`); return; }
  if (!toRemove.length) { console.log("nothing to delete."); return; }

  let removed = 0;
  for (let i = 0; i < toRemove.length; i += 100) {
    const { data, error } = await c.storage.from(BUCKET).remove(toRemove.slice(i, i + 100));
    if (error) throw error;
    removed += data?.length ?? 0;
  }
  console.log(`removed ${removed} orphaned object(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
