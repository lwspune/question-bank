/**
 * Runs once after every `npm test`. Sweeps any leftover test taxonomy out
 * of the live Supabase project so the public /browse Subject + Chapter
 * filters don't show garbage values.
 *
 * Catches three kinds of leak:
 *  - Test-named subjects (PYQB_/QD_/UD_/EditTest...) that survived a
 *    crashed afterAll. Their chapters/subtopics cascade.
 *  - Non-canonical chapters auto-created by `goodXlsxBuffer` commits
 *    under canonical subjects (currently only "Chemical Thermodynamics"
 *    under Chemistry).
 *  - Non-canonical subtopics auto-created by `goodXlsxBuffer` under
 *    canonical chapters (currently only "Chain Rule" under Differentiation).
 *
 * Per-suite afterAll hooks ALSO clean up — this is a safety net, not the
 * primary mechanism. Why both: vitest runs files in parallel and a
 * cleanup helper that runs at file-end races with other files still
 * mid-flight. The afterAll handles the run-id-scoped subjects (no race
 * because no other file shares a RUN_ID); this teardown handles the
 * canonical-adjacent auto-creates (would race if done per-file).
 *
 * NEVER deletes:
 *  - Subtopics with attached questions (Lens Formula and Magnification,
 *    Resonance and Tuning Forks — these hold real LWS Pune seed questions).
 *  - Anything matching the canonical taxonomy in supabase/seed/taxonomy.json.
 */
import { config } from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";

const TEST_SUBJECT_PREFIXES = [
  "PYQB_Subject_",
  "QD_Subject_",
  "UD_Subject_",
  "UD_DelSubject_",
  "EditTestSubject",
];

// Vitest globalSetup module: default export is the setup function, which
// returns the teardown function. We do nothing on setup; all the work is
// in the returned teardown.
export default async function setup() {
  return async function teardown(): Promise<void> {
    const envFile = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envFile)) config({ path: envFile });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return; // tests skipped — nothing to clean

    const admin = createClient(url, key, {
      auth: { persistSession: false },
    });

    // 1) Test-named subjects (cascades chapters + subtopics).
    for (const prefix of TEST_SUBJECT_PREFIXES) {
      await admin.from("subjects").delete().like("name", `${prefix}%`);
    }

    // 2) Non-canonical chapter under Chemistry.
    const { data: chem } = await admin
      .from("subjects")
      .select("id")
      .eq("name", "Chemistry")
      .maybeSingle();
    if (chem?.id) {
      await admin
        .from("chapters")
        .delete()
        .eq("subject_id", chem.id)
        .eq("name", "Chemical Thermodynamics");
    }

    // 3) Non-canonical subtopic "Chain Rule" under canonical Maths>Differentiation.
    const { data: maths } = await admin
      .from("subjects")
      .select("id")
      .eq("name", "Maths")
      .maybeSingle();
    if (maths?.id) {
      const { data: diff } = await admin
        .from("chapters")
        .select("id")
        .eq("subject_id", maths.id)
        .eq("name", "Differentiation")
        .maybeSingle();
      if (diff?.id) {
        await admin
          .from("subtopics")
          .delete()
          .eq("chapter_id", diff.id)
          .eq("name", "Chain Rule");
      }
    }
  };
}
