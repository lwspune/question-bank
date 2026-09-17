/**
 * Signature classifier for Matrices & Determinants formulas, VALIDATED against
 * a hand-labelled set before it is trusted with anything.
 *
 * 240 of the 768 questions (batches 1-3) were classified by reading the
 * solution. This script re-derives labels for those same 240 from the solution
 * TEXT and scores itself against them, per formula. Only formulas that score
 * well are allowed to auto-label the remaining 528; the rest stay hand-read.
 *
 * The point is not to avoid reading. It is to find out WHICH formulas a machine
 * can be trusted to spot, because that is the question behind "is this axis
 * worth scaling" — and a measured per-formula score answers it, where an
 * unvalidated scan would only look like an answer.
 */
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local))
  require("dotenv").config({ path: local, override: true });

/** Collapse presentation-only LaTeX so one identity has one spelling. */
export function norm(s: string): string {
  return s
    .replace(/\\(operatorname|text|mathrm|mathop|mbox|textbf|mathbf)\s*\{\s*([^}]*)\s*\}/g, "$2")
    .replace(/\\[,;:!]/g, "")
    .replace(/\\ /g, " ")
    .replace(/\\(left|right|big|Big|bigg|Bigg|displaystyle)\b/g, "")
    .replace(/\\(det)\b/g, "det")
    .replace(/\\[dt]frac/g, "frac")
    .replace(/[{}]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

type Rule = { slug: string; test: (t: string) => boolean };

const has = (...res: RegExp[]) => (t: string) => res.some((r) => r.test(t));
const all = (...res: RegExp[]) => (t: string) => res.every((r) => r.test(t));

const RULES: Rule[] = [
  { slug: "adj-adj-a", test: has(/adj\s*\(?\s*adj/) },
  {
    slug: "det-adj",
    test: (t) =>
      /adj/.test(t) &&
      (/\|\s*adj\s*[a-z]?\s*\|\s*=/.test(t) ||
        /det\s*\(\s*adj/.test(t) ||
        /determinant of the adjoint/.test(t)) &&
      /n\s*-\s*1|\^\s*2\b|\(n-1\)/.test(t),
  },
  {
    slug: "adjoint-identity",
    test: has(
      /[a-z]\s*\(?\s*adj\s*[a-z]?\s*\)?\s*=\s*\|\s*[a-z]\s*\|\s*i/,
      /\(adj\s*[a-z]?\)\s*[a-z]\s*=\s*\|/,
      /adj\s*[a-z]?\s*\)\s*=\s*\|[a-z]\|\s*i/
    ),
  },
  {
    slug: "inverse-via-adjoint",
    test: has(
      /\^\s*-\s*1\s*=\s*frac\s*1\s*\|/,
      /\^\s*-\s*1\s*=\s*\frac?\s*1\s*\|\s*[a-z]\s*\|\s*adj/,
      /=\s*frac\s*1\s*\|\s*[a-z]\s*\|\s*adj/,
      /adj\s*[a-z]?\s*\/\s*\|\s*[a-z]\s*\|/,
      /inverse.{0,40}adjoint|adjoint.{0,30}divided by/
    ),
  },
  {
    slug: "det-scalar",
    test: has(
      /\|\s*k\s*[a-z]\s*\|\s*=\s*k\s*\^?\s*n/,
      /det\s*\(\s*k[a-z]\s*\)\s*=\s*k\s*\^?\s*n/,
      /k\s*\^\s*n\s*det/,
      /scalar.{0,60}raised to the power/,
      /multiplying every entry by a scalar/
    ),
  },
  {
    slug: "det-product",
    test: has(
      /\|\s*ab\s*\|\s*=\s*\|\s*a\s*\|\s*\|\s*b\s*\|/,
      /det\s*\(\s*ab\s*\)\s*=\s*det\s*a?\s*det/,
      /determinant of (a |the )?product equals/
    ),
  },
  {
    slug: "det-power",
    test: has(
      /\|\s*a\s*\^\s*\d+\s*\|\s*=\s*\|\s*a\s*\|\s*\^/,
      /det\s*\(\s*a\s*\^\s*\w+\s*\)\s*=\s*\(\s*det\s*a\s*\)\s*\^/,
      /\(\s*det\s*a\s*\)\s*\^\s*\d/
    ),
  },
  {
    slug: "det-inverse",
    test: has(
      /det\s*\(\s*a\s*\^\s*-\s*1\s*\)\s*=/,
      /\|\s*a\s*\^\s*-\s*1\s*\|\s*=\s*frac\s*1/,
      /\|\s*a\s*\|\s*\|\s*a\s*\^\s*-\s*1\s*\|\s*=/
    ),
  },
  {
    slug: "det-transpose",
    test: has(
      /det\s*\(\s*a\s*\^\s*t\s*\)\s*=\s*det/,
      /\|\s*a'?\s*\|\s*=\s*\|\s*a\s*\|/,
      /determinant of (a )?(matrix|its transpose)/,
      /transposing.{0,40}determinant unchanged/
    ),
  },
  { slug: "det-similar", test: has(/b\s*\^\s*-\s*1\s*ab/) },
  {
    slug: "skew-odd-order-det-zero",
    test: has(/skew.{0,20}symmetric.{0,40}odd.{0,40}(determinant|zero)/, /odd order.{0,30}determinant.{0,20}0/),
  },
  {
    slug: "skew-symmetric-definition",
    test: has(/skew.?symmetric/),
  },
  { slug: "symmetric-definition", test: has(/symmetric/) },
  {
    slug: "transpose-of-product",
    test: has(/\(\s*[a-z]{2}\s*\)\s*'?\s*\^?\s*t?\s*=\s*[a-z]\s*'?\s*\^?\s*t?\s*[a-z]\s*'/, /reversal law/, /transpos\w+ (a )?product reverses/, /\(ab\)\s*'\s*=\s*b\s*'\s*a\s*'/),
  },
  {
    slug: "order-of-product",
    test: has(/number of columns of.{0,30}(must )?equal.{0,30}(number of )?rows/, /is defined only when/, /conformab/, /order of the (product|matrix)/),
  },
  { slug: "counting-matrices", test: has(/2\s*\^\s*9|number of such matrices|possible orders|multiplication principle|independently/) },
  { slug: "cofactor-expansion", test: has(/expand\w* along/, /cofactor expansion/, /expanding the determinant/) },
  { slug: "alien-cofactor-zero", test: has(/alien cofactor/) },
  { slug: "adjoint-definition", test: has(/transpose of the cofactor/, /adj\s*\(?[a-z]\)?\s*=\s*\[?\s*a_?\{?ij/, /swaps the diagonal entries/) },
  { slug: "reversal-law-inverse", test: has(/\(\s*ab\s*\)\s*\^\s*-\s*1\s*=\s*b\s*\^\s*-\s*1\s*a\s*\^\s*-\s*1/) },
  { slug: "homogeneous-nontrivial", test: has(/non.?(trivial|zero) solution/, /homogeneous system/) },
  { slug: "consistency-from-determinant", test: has(/consistent|no solution|unique solution|inconsistent/) },
  { slug: "cramers-rule", test: has(/cramer/) },
  { slug: "singular-iff-det-zero", test: has(/singular/, /invertible exactly when|has no inverse when|determinant is zero/) },
  { slug: "identical-rows-zero", test: has(/linearly dependent/, /identical rows|proportional rows|two rows.{0,20}(same|equal)/, /rows? (is|are) (a )?linear combination/) },
  { slug: "row-column-operations", test: has(/r_?\d\s*(->|\\to|→)/, /c_?\d\s*(->|\\to|→)/, /apply\w*\s+(the\s+)?(row|column) operation/) },
  { slug: "row-swap-sign", test: has(/interchang\w+.{0,30}(sign|-det)/, /r_?\d\s*(<->|\\leftrightarrow)\s*r_?\d/) },
  { slug: "row-scaling-common-factor", test: has(/common (factor )?(in|from|to) (r|row|c|column)/, /take.{0,20}common/, /factor out/) },
  { slug: "triangular-determinant", test: has(/upper triangular|lower triangular|triangular, so/) },
  { slug: "det-2x2", test: has(/ad\s*-\s*bc/, /\|\s*a\s*\|\s*=\s*\d+\s*[*x]\s*\d+\s*-/) },
  { slug: "matrix-powers-pattern", test: has(/a\s*\^\s*n\s*=/, /a\s*\^\s*2\s*=\s*a\s*\\?cdot\s*a/, /nilpotent/, /a\^\{?\d+\}?\s*=\s*\(?a\^/) },
  { slug: "matrix-polynomial-equation", test: has(/a\s*\^\s*2\s*-\s*\w+\s*a\s*\+/, /cayley/, /multiply.{0,30}by\s*a\s*\^\s*-\s*1/) },
  { slug: "matrix-commutativity", test: has(/ab\s*=\s*ba/, /commut/) },
  { slug: "involutory-definition", test: has(/involutory/, /a\s*\^\s*2\s*=\s*i\b/) },
  { slug: "idempotent-matrix", test: has(/idempotent/) },
  { slug: "nilpotent-matrix", test: has(/nilpotent/) },
  { slug: "orthogonal-inverse-transpose", test: has(/orthogonal/) },
  { slug: "diagonal-definition", test: has(/diagonal matrix/) },
  { slug: "scalar-matrix-definition", test: has(/scalar matrix/) },
  { slug: "symmetric-skew-decomposition", test: has(/frac\s*1\s*2\s*\(\s*a\s*[+-]\s*a\s*'/, /splits uniquely/, /p\s*\+\s*q.{0,40}symmetric/) },
  { slug: "cube-roots-unity", test: has(/cube root/, /omega\s*\^\s*3\s*=\s*1/, /1\s*\+\s*omega\s*\+\s*omega\s*\^\s*2/) },
  { slug: "trig-determinant", test: has(/\\?sin|\\?cos|\\?cot|\\?tan/) },
  { slug: "circulant-determinant", test: has(/circulant/) },
  { slug: "area-of-triangle-determinant", test: has(/area of (a |the )?triangle/) },
  { slug: "collinearity-determinant", test: has(/collinear/) },
  { slug: "differentiating-determinant", test: has(/differentiat\w+ the determinant/, /d\s*\^?\s*2?\s*\/\s*dx/) },
  { slug: "hermitian-determinant-real", test: has(/hermitian/) },
  { slug: "matrix-equality", test: has(/equating corresponding entries/, /two matrices are equal/, /corresponding entries/) },
  { slug: "matrix-addition-scalar", test: has(/scalar multiplication/, /multiplying each element/, /null matrix means/) },
  { slug: "matrix-zero-divisors", test: has(/zero.?divisor/) },
  { slug: "matrix-cancellation", test: has(/ab\s*=\s*ac/, /cancellation/) },
  { slug: "inverse-definition", test: has(/ab\s*=\s*ba\s*=\s*i/, /ab\s*=\s*i/, /inverse of/) },
  { slug: "series-sum-determinant", test: has(/\\?sum_|sum\s*=\s*\\?sum/, /\+\s*\\?ldots\s*\+/) },
  { slug: "matrix-associativity", test: has(/associativ/) },
  { slug: "matrix-index-rule", test: has(/a_?\{?ij\}?\s*=\s*[^=]{0,25}(i|j)/) },
  { slug: "determinant-equation-roots", test: has(/roots? of the (equation|determinant)/, /third root/, /sum of the roots/) },
  { slug: "scalar-multiple-inverse", test: has(/\(\s*k?\d?a\s*\)\s*\^\s*-\s*1\s*=\s*frac\s*1/) },
  { slug: "matrix-equation-system", test: has(/ax\s*=\s*b/) },
  { slug: "det-not-additive", test: has(/det\s*\(\s*a\s*\+\s*b\s*\)/) },
  { slug: "trace-skew-odd-zero", test: has(/trace/) },
];

function classify(text: string): string[] {
  const t = norm(text);
  return RULES.filter((r) => r.test(t)).map((r) => r.slug);
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("needs supabase env");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const dir = path.join(process.cwd(), "generated-papers");
  fs.mkdirSync(dir, { recursive: true });
  const chapter = process.argv[2] ?? "matrices-determinants";
  const tagPath = path.join(
    process.cwd(), "scripts", "formula", "tags", `${chapter}.json`
  );
  const gold: Record<string, string[]> = JSON.parse(
    fs.readFileSync(tagPath, "utf8")
  ).tags;
  const ids = Object.keys(gold);
  console.log(`hand-labelled gold set: ${ids.length}`);

  // Fetch the gold questions' text.
  const rows: { id: string; text: string; solution: string | null }[] = [];
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await db
      .from("questions")
      .select("id, text, solution")
      .in("id", ids.slice(i, i + 150));
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as typeof rows));
  }

  type Score = { tp: number; fp: number; fn: number };
  const per = new Map<string, Score>();
  const bump = (s: string, k: keyof Score) => {
    const v = per.get(s) ?? { tp: 0, fp: 0, fn: 0 };
    v[k]++;
    per.set(s, v);
  };

  for (const r of rows) {
    const want = new Set(gold[r.id] ?? []);
    const got = new Set(classify(`${r.text ?? ""} ${r.solution ?? ""}`));
    for (const s of got) (want.has(s) ? bump(s, "tp") : bump(s, "fp"));
    for (const s of want) if (!got.has(s)) bump(s, "fn");
  }

  const out: string[] = [];
  const reliable: string[] = [];
  const rowsOut = [...per.entries()]
    .map(([slug, s]) => {
      const prec = s.tp + s.fp === 0 ? 0 : s.tp / (s.tp + s.fp);
      const rec = s.tp + s.fn === 0 ? 0 : s.tp / (s.tp + s.fn);
      return { slug, ...s, prec, rec, gold: s.tp + s.fn };
    })
    .sort((a, b) => b.gold - a.gold);

  out.push("slug | gold | tp | fp | fn | precision | recall");
  for (const r of rowsOut) {
    out.push(
      `${r.slug} | ${r.gold} | ${r.tp} | ${r.fp} | ${r.fn} | ${(r.prec * 100).toFixed(0)}% | ${(r.rec * 100).toFixed(0)}%`
    );
    if (r.gold >= 5 && r.prec >= 0.9 && r.rec >= 0.85) reliable.push(r.slug);
  }
  console.log(out.join("\n"));

  const microTp = rowsOut.reduce((n, r) => n + r.tp, 0);
  const microFp = rowsOut.reduce((n, r) => n + r.fp, 0);
  const microFn = rowsOut.reduce((n, r) => n + r.fn, 0);
  console.log(
    `\nMICRO over all labels — precision ${((microTp / (microTp + microFp)) * 100).toFixed(1)}%  recall ${((microTp / (microTp + microFn)) * 100).toFixed(1)}%`
  );
  console.log(
    `\nformulas meeting the bar (gold>=5, prec>=90%, recall>=85%): ${reliable.length}\n  ${reliable.join("\n  ") || "(none)"}`
  );
  fs.writeFileSync(path.join(dir, "classifier-score.md"), out.join("\n"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
