/**
 * Sync harvested quiz atoms (scripts/quiz/atoms/*.json) into public.quiz_atoms.
 *
 * Run:  npm run quiz:harvest   # (re)build the JSON first
 *       npm run quiz:sync      # then push it to the DB
 *
 * Idempotent + staleness-aware (see planSync in atoms.ts): re-syncing preserves a
 * 'verified' atom whose /notes source is unchanged, and re-writes (flags stale)
 * any atom whose source_fingerprint changed. Service-role only — quiz_atoms has
 * no write RLS by design (migration 0030).
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { planSync, type QuizAtom, type QuizAtomRow } from "../../src/lib/quiz/atoms";

function loadEnvLocal() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("dotenv").config({ path: local, override: true });
  }
}

function loadAtoms(): QuizAtom[] {
  const dir = path.join(process.cwd(), "scripts", "quiz", "atoms");
  if (!fs.existsSync(dir)) throw new Error(`no atoms dir — run 'npm run quiz:harvest' first`);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  if (files.length === 0) throw new Error(`no atom JSON in ${dir} — run 'npm run quiz:harvest'`);
  return files.flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as QuizAtom[]);
}

/** Page through quiz_atoms (PostgREST caps a .select at 1000 rows). */
async function readExisting(
  db: SupabaseClient
): Promise<Map<string, { fingerprint: string; status: string }>> {
  const out = new Map<string, { fingerprint: string; status: string }>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("quiz_atoms")
      .select("atom_key, source_fingerprint, status")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`read quiz_atoms failed: ${error.message}`);
    for (const r of data ?? []) {
      out.set(r.atom_key, { fingerprint: r.source_fingerprint, status: r.status });
    }
    if (!data || data.length < PAGE) break;
  }
  return out;
}

async function upsertChunked(db: SupabaseClient, rows: QuizAtomRow[]) {
  const CHUNK = 500;
  const stamped = rows.map((r) => ({ ...r, updated_at: new Date().toISOString() }));
  for (let i = 0; i < stamped.length; i += CHUNK) {
    const { error } = await db
      .from("quiz_atoms")
      .upsert(stamped.slice(i, i + CHUNK), { onConflict: "atom_key" });
    if (error) throw new Error(`upsert quiz_atoms failed: ${error.message}`);
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

  const incoming = loadAtoms();
  console.log(`→ ${incoming.length} harvested atoms; reading existing rows…`);
  const existing = await readExisting(db);
  const plan = planSync(incoming, existing);

  console.log(
    `  upsert ${plan.upserts.length} · skip ${plan.skippedVerified} verified-unchanged · ${plan.stale} stale (source changed)`
  );
  if (plan.upserts.length > 0) await upsertChunked(db, plan.upserts);
  console.log(`✓ synced. quiz_atoms now holds ${existing.size + plan.upserts.filter((r) => !existing.has(r.atom_key)).length} keys.`);
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
