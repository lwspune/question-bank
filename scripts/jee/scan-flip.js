// Scan a JEE source_file's Maths rows for LaTeX/answer issues, optionally flip PUBLIC.
//   node scripts/jee/scan-flip.js <sourceFile> [--flip]
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const EXAM = "56360311-614d-43ea-9cd9-8ca8178dd679";
const OPEN = /\\\(/g, CLOSE = /\\\)/g;
const src = process.argv[2];
const flip = process.argv.includes("--flip");
const exceptArg = process.argv.find((a) => a.startsWith("--except="));
const except = exceptArg ? exceptArg.slice("--except=".length).split(",") : [];
(async () => {
  const { data, error } = await db
    .from("questions")
    .select("id,question_number,question_format,numeric_answer,text,solution,visibility")
    .eq("exam_id", EXAM).eq("source_file", src);
  if (error) { console.error(error.message); process.exit(1); }
  let issues = 0;
  for (const q of data) {
    const blob = (q.text || "") + " " + (q.solution || "");
    const opens = (blob.match(OPEN) || []).length, closes = (blob.match(CLOSE) || []).length;
    const f = [];
    if (opens !== closes) f.push("delim " + opens + "/" + closes);
    if (/(?<!\\)\\n(?![a-zA-Z])/.test(blob)) f.push("literal-bs-n"); // exclude matrix row-sep \\n
    if (!q.solution) f.push("NO-SOLUTION");
    if (q.question_format === "numeric" && (q.numeric_answer === null || q.numeric_answer === undefined)) f.push("NAT-no-answer");
    if (f.length) {
      const excepted = except.includes(String(q.question_number));
      if (!excepted) issues++;
      console.log("  Q" + q.question_number + " [" + q.question_format + "] " + f.join(", ") + (excepted ? " (excepted — kept PRIVATE)" : ""));
    }
  }
  const mcq = data.filter((q) => q.question_format === "mcq").length, nat = data.filter((q) => q.question_format === "numeric").length;
  const pub = data.filter((q) => q.visibility === "PUBLIC").length;
  console.log(`${src}: ${data.length} rows (${mcq} mcq, ${nat} nat) | flagged ${issues} | PUBLIC ${pub}`);
  if (flip && issues === 0) {
    let q = db.from("questions").update({ visibility: "PUBLIC" }).eq("exam_id", EXAM).eq("source_file", src).eq("visibility", "PRIVATE");
    if (except.length) q = q.not("question_number", "in", `(${except.join(",")})`);
    const { data: u } = await q.select("id");
    console.log(`  flipped PUBLIC: ${u.length}${except.length ? ` (kept PRIVATE: ${except.join(",")})` : ""}`);
  } else if (flip) {
    console.log(`  NOT flipped — ${issues} issues to resolve first`);
  }
})();
