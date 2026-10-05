/**
 * Print a sample PDF Question Paper + Answer Key from real bank questions, to
 * LOOK at the layout. The HTML is pinned by tests/pdf-paper-html.test.ts; how
 * a page looks can only be judged by opening the file.
 *
 *   npm run pdf:sample                        # the dense maths + chemistry set below
 *   npm run pdf:sample -- --ids=<uuid>,<uuid> # your own questions, in that order
 *   npm run pdf:sample -- --unbranded         # as institute staff would get it
 *   npm run pdf:sample -- --out=generated-papers/pdf-sample-2   # another folder (a PDF open in a viewer is locked on Windows)
 *
 * Writes generated-papers/pdf-sample/{QP,Answers}_sample.pdf plus the HTML.
 * Read-only against the bank (service role, PUBLIC rows only).
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { queryQuestionsByIds } from "../../src/lib/questions/query";
import { buildKeyHtml, buildPaperHtml } from "../../src/lib/export/pdf/paperHtml";
import { pdfHead } from "../../src/lib/export/pdf/assets";
import { printPdf } from "../../src/lib/export/pdf/printPdf";
import { imageDataUris } from "../../src/lib/export/pdf/images";

// Picked 2026-10-05 for density: JEE/CET maths with the most math zones
// (matrices, integrals, limits), chemistry with reaction arrows, a table, and
// questions carrying figures.
const SAMPLE_IDS = [
  "4b4ef684-5e56-4e56-9298-66dddfd2bc0a",
  "dc6babd5-77b7-4b3c-aec7-116dcd9f5159",
  "08201f35-a3dc-4f22-9686-806c7279b698",
  "98466ddb-9262-4bea-8c27-6d34315d8c9a",
  "82de5de2-e267-4dff-bdad-13dfbd1159b5",
  "5faac73d-ec65-4929-8c62-3fea64be6ea0",
  "e12e3c13-7a99-4037-b385-e818e1e46345",
  "73508add-c3d6-4bd2-9ad9-4b9d56252c28",
  "a0db9e39-f96b-4aca-a843-0dadc5faab4a",
  "047ae9d9-4691-406c-b305-a04187458c51",
  "643f877c-65cd-49b4-b85f-93e0c5cbf7bc",
  "8bdfb59a-b53e-419e-8d7e-b01084c1b0bd",
  "213f0e72-2609-4a98-9205-d798c10dd41f",
  "d2984670-0b2f-4061-b5ad-d380f631aae9",
  "4c43fba9-32dd-413b-99a3-4868ae443998",
  "0d8d391a-a5c7-4680-b6d5-839732b18228",
  "086ae47f-da06-434a-86ed-a35e3cc7e2ac",
  "e9ebf3d3-785f-4d59-995c-bf3a1531993d",
  "59c41ab9-9a6e-4298-87f2-7a399b72b523",
];

async function main() {
  const args = process.argv.slice(2);
  const idsArg = args.find((a) => a.startsWith("--ids="));
  const ids = idsArg ? idsArg.slice(6).split(",").filter(Boolean) : SAMPLE_IDS;
  const branded = !args.includes("--unbranded");

  const admin = createSupabaseAdminClient();
  const rows = await queryQuestionsByIds(admin, ids);
  const byId = new Map(rows.map((r) => [r.id, r]));
  const questions = ids.map((id) => byId.get(id)).filter((q): q is NonNullable<typeof q> => !!q);

  const outArg = args.find((a) => a.startsWith("--out="));
  const out = join(process.cwd(), outArg ? outArg.slice(6) : join("generated-papers", "pdf-sample"));
  mkdirSync(out, { recursive: true });
  const head = pdfHead();
  const title = "JEE Mains + MHT-CET · Maths and Chemistry";
  const paper = buildPaperHtml({
    title, questions, branded, head, includeSourceTag: true,
    images: await imageDataUris(admin, "paper", questions),
  });
  const key = buildKeyHtml({
    title, questions, branded, head, includeSolutions: true,
    images: await imageDataUris(admin, "key", questions),
  });
  for (const [name, html] of [["QP_sample", paper], ["Answers_sample", key]] as const) {
    const t0 = Date.now();
    const pdf = await printPdf(html);
    writeFileSync(join(out, `${name}.html`), html);
    writeFileSync(join(out, `${name}.pdf`), pdf);
    console.log(`${name}.pdf  ${(pdf.length / 1024).toFixed(0)} KB  ${Date.now() - t0} ms`);
  }
  console.log(`\n${questions.length} questions -> ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
