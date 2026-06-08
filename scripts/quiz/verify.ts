/**
 * Verify pass: promote needs_review atoms to status='verified' by finalizing
 * their distractors from a verify/<name>.ts data file.
 *
 * Run:  npm run quiz:verify                       # default nda-maths__probability
 *       npm run quiz:verify nda-maths__statistics
 *
 * For each entry it fetches the atom's (correct) key from the DB, validates +
 * assembles options via buildVerifyUpdate (fail-fast: nothing is written if ANY
 * entry is bad), then UPDATEs quiz_atoms SET options, answer, status='verified',
 * verified_at. Service-role only (no write RLS). Re-runnable — re-verifying just
 * re-writes the same options.
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildVerifyUpdate } from "./atoms";
import type { VerifiedEntry } from "./verify/nda-maths__probability";

function loadEnvLocal() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("dotenv").config({ path: local, override: true });
  }
}

async function main() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
  }
  const db = createClient(url, serviceRole, { auth: { persistSession: false } });

  const name = process.argv[2] ?? "nda-maths__probability";
  const mod = await import(`./verify/${name.replace(/\.ts$/, "")}`);
  const entries: VerifiedEntry[] = mod.VERIFIED;
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error(`verify/${name} must export a non-empty VERIFIED array`);
  }
  console.log(`→ verifying ${entries.length} atoms from verify/${name}…`);

  const keys = entries.map((e) => e.atomKey);
  const { data: rows, error } = await db
    .from("quiz_atoms")
    .select("atom_key, correct")
    .in("atom_key", keys);
  if (error) throw new Error(`read quiz_atoms failed: ${error.message}`);
  const correctByKey = new Map((rows ?? []).map((r) => [r.atom_key, r.correct as string]));

  // Build + validate every update before writing anything (fail fast).
  const updates: { key: string; options: unknown; answer: string; theme?: string }[] = [];
  const problems: string[] = [];
  for (const e of entries) {
    const correct = correctByKey.get(e.atomKey);
    if (correct === undefined) {
      problems.push(`${e.atomKey}: not found in quiz_atoms (harvest+sync first?)`);
      continue;
    }
    try {
      const { options, answer } = buildVerifyUpdate(e.atomKey, correct, e.distractors);
      updates.push({ key: e.atomKey, options, answer, theme: e.theme });
    } catch (err) {
      problems.push(err instanceof Error ? err.message : String(err));
    }
  }
  if (problems.length > 0) {
    console.error(`✗ ${problems.length} problem(s), nothing written:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  for (const u of updates) {
    const patch: Record<string, unknown> = { options: u.options, answer: u.answer, status: "verified", verified_at: now };
    if (u.theme) patch.theme = u.theme;
    const { error: upErr } = await db.from("quiz_atoms").update(patch).eq("atom_key", u.key);
    if (upErr) throw new Error(`update ${u.key} failed: ${upErr.message}`);
  }
  console.log(`✓ verified ${updates.length} atoms (status='verified').`);
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
