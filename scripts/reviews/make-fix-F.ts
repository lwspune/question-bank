/**
 * Build fix.F.out.json: one targeted wording repair on Q866.
 *
 * Done as a find/replace against the LIVE text rather than by retyping the whole
 * solution, so every byte outside the edited sentence is preserved exactly. The
 * replacement must match EXACTLY ONCE or nothing is written — a near-miss needle
 * is what a shell-mangled string looks like, and a silent 0-match "fix" is worse
 * than no fix at all.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const ID = "aa228215-8957-485e-bfc6-709de017ec1f";

// The note is TRUE — it records that the source booklet's key column disagreed
// with its own worked solution, and that the disagreement was resolved in favour
// of the derivation. But "the supplied answer key marks A" prints directly beside
// a stored key of D and reads as self-contradictory. Name the SOURCE, and name
// the option by VALUE rather than letter (a letter inside a caveat makes the
// standing key-audit probe read it as the concluded answer).
const FROM =
  "NOTE: the supplied answer key marks A, but both this derivation and the book's own printed solution give \\(\\frac{1}{\\log_{10} 4 - \\log_{10} 3}\\) = option D.";
const TO =
  "NOTE: the source booklet's key column marks \\(\\frac{1}{\\log_{10} 4 + \\log_{10} 3}\\), which contradicts the booklet's own printed solution; that solution and this derivation both give \\(\\frac{1}{\\log_{10} 4 - \\log_{10} 3}\\), which is the answer recorded here.";

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db.from("questions").select("id, question_number, solution").eq("id", ID).single();
  if (error) throw error;

  const cur: string = data.solution ?? "";
  const hits = cur.split(FROM).length - 1;
  if (hits !== 1) throw new Error(`needle matched ${hits} time(s), expected exactly 1 — refusing`);

  const next = cur.replace(FROM, TO);
  if (next === cur) throw new Error("replacement is a no-op — refusing");

  writeFileSync(
    join(process.cwd(), "scripts", "reviews", "data", "chunks", "fix.F.out.json"),
    JSON.stringify(
      [
        {
          questionId: ID,
          questionNumber: data.question_number,
          newSolution: next,
          whatChanged:
            "Reworded the closing note: it now names the SOURCE BOOKLET's key column (which contradicted the booklet's own worked solution) instead of 'the supplied answer key', which read as contradicting the key printed beside it.",
          concern: "",
        },
      ],
      null,
      2
    ),
    "utf8"
  );
  console.log(`fix.F.out.json written — 1 replacement, ${cur.length} -> ${next.length} chars`);
})().catch((e) => {
  console.error(e instanceof Error ? e.message : JSON.stringify(e, null, 2));
  process.exit(1);
});
