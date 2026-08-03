/**
 * Render the three-book alignment table as a standalone HTML file for review.
 *
 *   npx tsx scripts/syllabus/export-alignment.ts
 *   -> generated-papers/syllabus-alignment.html   (gitignored; open with file://)
 *
 * Unlike export-html.ts, this is NOT a second implementation: it calls the same
 * loadAlignmentRows() the page renders from, so the two cannot disagree. It only
 * exists because the table is ~400 rows and reviewing that is easier in a file
 * than in a terminal.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { loadAlignmentRows, loadOldSyllabusChapters } from "../../src/lib/syllabus/query";
import { requireSubjectArg } from "./subject-arg";
import type { AlignmentRow } from "../../src/lib/syllabus/summary";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function main() {
  return (async () => {
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    ) as never;
    const cfg = requireSubjectArg(process.argv);
    const rows = await loadAlignmentRows(db, {
      subject: cfg.subject,
      oldSyllabus: await loadOldSyllabusChapters(db, {
        subject: cfg.subject,
        liveFromYear: cfg.liveFromYear,
      }),
    });

    const stat = {
      both: rows.filter((r) => r.ncert && r.jee).length,
      n: rows.filter((r) => r.ncert && !r.jee).length,
      j: rows.filter((r) => !r.ncert && r.jee).length,
      none: rows.filter((r) => !r.ncert && !r.jee).length,
      anchors: new Set(rows.map((r) => `${r.anchor.cls}|${r.anchor.sectionNo}`)).size,
      pyq: rows.reduce((n, r) => n + (r.jee?.pyq ?? 0), 0),
    };

    let body = "";
    for (const cls of [11, 12]) {
      const mine = rows.filter((r) => r.anchor.cls === cls);
      if (!mine.length) continue;
      body += `<h2>State Board Std ${cls === 11 ? "XI" : "XII"} <span class="sub">${mine.length} rows</span></h2>`;
      body += `<table><thead><tr><th style="width:28%">State Board subtopic</th><th style="width:34%">NCERT subtopic</th><th>JEE Mains subtopic</th></tr></thead><tbody>`;
      let lastCh = "";
      let lastAnchor = "";
      for (const r of mine) {
        const ch = `Ch.${r.anchor.chapterNo} ${r.anchor.chapterName}`;
        if (ch !== lastCh) {
          lastCh = ch;
          lastAnchor = "";
          body += `<tr class="chap"><td colspan="3">${esc(ch)}</td></tr>`;
        }
        const same = r.anchor.sectionNo === lastAnchor;
        lastAnchor = r.anchor.sectionNo;
        const sb = same
          ? `<span class="rep">&#8627;</span>`
          : `<span class="no">${esc(r.anchor.sectionNo)}</span> ${esc(r.anchor.concept)}`;
        const nc = r.ncert
          ? `${esc(r.ncert.label)}<span class="sub">${esc(r.ncert.chapterLabel)}</span>`
          : `<span class="blank">not in NCERT</span>`;
        const je = r.jee
          ? `${esc(r.jee.label)}${r.jee.pyq ? ` <b class="pyq">${r.jee.pyq} PYQ</b>` : ""}${
              r.jee.oldSyllabus ? ` <span class="old">old syllabus</span>` : ""
            }<span class="sub">${esc(r.jee.chapterLabel)}</span>`
          : `<span class="blank soft">not asked in the bank</span>`;
        body += `<tr${r.ncert && r.jee ? ' class="pair"' : ""}><td>${sb}</td><td>${nc}</td><td>${je}</td></tr>`;
      }
      body += `</tbody></table>`;
    }

    const html = `<!doctype html><meta charset="utf-8"><title>Syllabus alignment — Chemistry</title>
<style>
  :root{color-scheme:light dark}
  body{font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:28px;max-width:1500px}
  h1{font-size:19px;margin:0 0 4px}
  h2{font-size:15px;margin:34px 0 8px;position:sticky;top:0;background:Canvas;padding:6px 0;border-bottom:2px solid #8884}
  p.lede{color:#666;margin:0 0 18px;max-width:80ch}
  table{border-collapse:collapse;width:100%;margin-bottom:10px}
  th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#666;border-bottom:2px solid #8884;padding:8px 10px;position:sticky;top:38px;background:Canvas}
  td{border-top:1px solid #8883;padding:8px 10px;vertical-align:top}
  tr.chap td{background:#8881;font-weight:600;font-size:13px}
  tr.pair td{background:#22c55e0d}
  .no{color:#888;font-variant-numeric:tabular-nums;margin-right:4px}
  .sub{display:block;color:#888;font-size:11px;margin-top:2px}
  .rep{color:#aaa;font-size:16px}
  .blank{color:#b45309;font-size:12px;font-style:italic}
  .blank.soft{color:#999}
  .pyq{color:#1d4ed8;font-variant-numeric:tabular-nums}
  .old{border:1px solid #8886;border-radius:99px;padding:1px 6px;font-size:10px;color:#888}
  .stats{display:flex;gap:22px;flex-wrap:wrap;margin:0 0 20px;padding:12px 14px;border:1px solid #8884;border-radius:8px}
  .stats div{font-size:12px;color:#666}.stats b{display:block;font-size:19px;color:CanvasText}
</style>
<h1>Syllabus alignment — Chemistry</h1>
<p class="lede">One subtopic per cell, in State Board book order. A subtopic <b>repeats</b> down a column
(shown as &#8627;) when it answers more than one thing on the other side. NCERT and JEE share a row only
where that pairing was <b>authored</b>; otherwise each gets its own row rather than being paired off for
merely sharing a State Board section. The blanks differ: <i>not in NCERT</i> is a checked claim, while
<i>not asked in the bank</i> only means no past question has been sampled &mdash; not that JEE never asks it.
Deeper pointers roll up to their 1.x parent, so a mapping authored at 5.8.7 appears on the 5.8 row.</p>
<div class="stats">
  <div><b>${rows.length}</b>rows</div><div><b>${stat.anchors}</b>State Board subtopics</div>
  <div><b>${stat.both}</b>both books</div><div><b>${stat.n}</b>NCERT only</div>
  <div><b>${stat.j}</b>JEE only</div><div><b>${stat.none}</b>neither</div>
  <div><b>${stat.pyq}</b>PYQ accounted</div>
</div>
${body}`;

    mkdirSync(join(process.cwd(), "generated-papers"), { recursive: true });
    const out = join(process.cwd(), "generated-papers", "syllabus-alignment.html");
    writeFileSync(out, html, "utf8");
    console.log(`WROTE ${out}`);
    console.log(
      `  ${rows.length} rows · ${stat.anchors} subtopics · both ${stat.both} · NCERT-only ${stat.n} · JEE-only ${stat.j} · neither ${stat.none}`,
    );
  })();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
