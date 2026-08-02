/**
 * Export the syllabus concept map as a SELF-CONTAINED HTML page for fast design
 * iteration, without a Next build/gate/push cycle in the loop.
 *
 *   npx tsx scripts/syllabus/export-html.ts
 *   -> generated-papers/syllabus-map.html   (gitignored; open with file://)
 *
 * Data is inlined, so the file works offline and can be mailed to anyone. Once a
 * layout settles here, port it to src/app/dashboard/syllabus/page.tsx — this file
 * is a prototype, NOT the shipped surface, and nothing should read from it.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Concept = {
  id: string;
  class: number;
  chapter_no: number;
  chapter_name: string;
  section_no: string;
  concept: string;
  seq: number;
};
type Link = { concept_id: string; exam: string; status: string; note: string | null };

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + a key required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  async function all<T>(table: string, columns: string): Promise<T[]> {
    const out: T[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db.from(table).select(columns).range(from, from + 999);
      if (error) throw new Error(`${table}: ${error.message}`);
      const rows = (data ?? []) as unknown as T[];
      out.push(...rows);
      if (rows.length < 1000) break;
    }
    return out;
  }

  const concepts = await all<Concept>(
    "syllabus_concepts",
    "id,class,chapter_no,chapter_name,section_no,concept,seq",
  );
  const links = await all<Link>("syllabus_concept_exams", "concept_id,exam,status,note");

  // Compact payload: index concepts, then emit links as [conceptIdx, examIdx, status].
  // The raw join is ~3.4k rows; inlining it verbatim would triple the file for no gain.
  const exams = [...new Set(links.map((l) => l.exam))].sort((a, b) =>
    a === "MH State Board" ? -1 : b === "MH State Board" ? 1 : a.localeCompare(b),
  );
  const idIndex = new Map(concepts.map((c, i) => [c.id, i]));
  const examIndex = new Map(exams.map((e, i) => [e, i]));
  const STATUS = ["full", "partial", "not"];

  const notes: Record<string, string> = {};
  const compactLinks: number[][] = [];
  for (const l of links) {
    const ci = idIndex.get(l.concept_id);
    const ei = examIndex.get(l.exam);
    if (ci === undefined || ei === undefined) continue;
    compactLinks.push([ci, ei, STATUS.indexOf(l.status)]);
    if (l.note) {
      // One note per (chapter, exam) — they are authored at chapter grain, so
      // keeping 864 copies would bloat the file with duplicates.
      const c = concepts[ci];
      notes[`${c.class}-${c.chapter_no}-${ei}`] ??= l.note;
    }
  }

  const payload = {
    exams,
    statuses: STATUS,
    concepts: concepts.map((c) => [c.class, c.chapter_no, c.chapter_name, c.section_no, c.concept, c.seq]),
    links: compactLinks,
    notes,
    generatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
  };

  const html = render(JSON.stringify(payload));
  const dir = join(process.cwd(), "generated-papers");
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, "syllabus-map.html");
  writeFileSync(dest, html, "utf8");
  console.log(`WROTE ${dest}`);
  console.log(`  ${concepts.length} concepts · ${links.length} rulings · ${exams.length} exams`);
  console.log(`  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB — open it with file://`);
}

function render(dataJson: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Syllabus map — Chemistry</title>
<style>
  :root{
    --bg:#fff; --fg:#18181b; --muted:#71717a; --line:#e4e4e7; --panel:#fafafa;
    --brand:#4f46e5; --brand-fg:#fff;
    --full-bg:#ecfdf5; --full-fg:#065f46;
    --part-bg:#fffbeb; --part-fg:#92400e;
    /* 'not' is an adjudicated exclusion, so it is a solid chip with full-contrast
       text — never the muted grey used for genuinely-absent data. */
    --not-bg:#ffe4e6;  --not-fg:#9f1239;
    --mix-bg:#eff6ff;  --mix-fg:#1e40af;
    --none-fg:#c4c4c8;
  }
  @media (prefers-color-scheme:dark){
    :root{
      --bg:#09090b; --fg:#fafafa; --muted:#a1a1aa; --line:#27272a; --panel:#111113;
      --brand:#818cf8; --brand-fg:#09090b;
      --full-bg:#022c22; --full-fg:#6ee7b7;
      --part-bg:#2e1a05; --part-fg:#fcd34d;
      --not-bg:#3f0d18;  --not-fg:#fda4af;
      --mix-bg:#0b1e3d;  --mix-fg:#93c5fd;
      --none-fg:#3f3f46;
    }
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--fg);
       font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
  .wrap{max-width:1200px;margin:0 auto;padding:24px}
  h1{font-size:22px;margin:0 0 4px}
  h2{font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:28px 0 8px}
  .sub{color:var(--muted);font-size:13px;margin:0 0 4px}
  table{border-collapse:collapse;width:100%;font-size:13px}
  th,td{padding:6px 8px;text-align:left;border-bottom:1px solid var(--line)}
  thead th{position:sticky;top:0;background:var(--panel);font-size:11px;
           text-transform:uppercase;letter-spacing:.03em;color:var(--muted);z-index:2}
  .num{text-align:right;font-variant-numeric:tabular-nums;color:var(--muted)}
  .box{border:1px solid var(--line);border-radius:8px;overflow:auto;max-height:78vh}
  .chip{display:inline-block;padding:2px 8px;border-radius:999px;font-size:12px;
        border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer}
  .chip[aria-pressed="true"]{background:var(--brand);color:var(--brand-fg);border-color:transparent}
  .cell{display:block;text-align:center;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:600}
  .full{background:var(--full-bg);color:var(--full-fg)}
  .partial{background:var(--part-bg);color:var(--part-fg)}
  .not{background:var(--not-bg);color:var(--not-fg)}
  .mixed{background:var(--mix-bg);color:var(--mix-fg)}
  .none{color:var(--none-fg);background:transparent;font-weight:400}
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  .legend{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:6px 0 14px;
          font-size:12px;color:var(--muted)}
  .legend span.cell{min-width:44px}
  tr.chap{background:var(--panel);font-weight:600;cursor:pointer}
  tr.chap:hover{background:var(--line)}
  tr.sec td:first-child{padding-left:22px;font-family:ui-monospace,Menlo,Consolas,monospace;
                        font-size:11px;color:var(--muted)}
  tr.con td:first-child{padding-left:40px;font-family:ui-monospace,Menlo,Consolas,monospace;
                        font-size:11px;color:var(--muted)}
  tr.con{font-size:12.5px}
  .bar{display:flex;height:8px;border-radius:999px;overflow:hidden;min-width:110px;border:1px solid var(--line)}
  .bar i{display:block;height:100%}
  .toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0 12px}
  input[type=search]{padding:6px 10px;border:1px solid var(--line);border-radius:6px;
                     background:var(--bg);color:var(--fg);min-width:230px;font-size:13px}
  .note{font-size:12px;color:var(--muted);border-left:3px solid var(--line);
        padding:6px 10px;margin:6px 0;background:var(--panel);border-radius:0 6px 6px 0}
  .warn{border-left-color:#f59e0b;color:var(--part-fg);background:var(--part-bg)}
  .grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
  .card{border:1px solid var(--line);border-radius:8px}
  .card h3{margin:0;padding:8px 10px;font-size:12px;background:var(--panel);border-bottom:1px solid var(--line)}
  .card li{display:flex;justify-content:space-between;gap:8px;padding:6px 10px;
           border-bottom:1px solid var(--line);font-size:12.5px;list-style:none}
  .card ul{margin:0;padding:0}
  .foot{color:var(--muted);font-size:11px;margin-top:22px}
  .hide{display:none}
</style>
</head>
<body>
<div class="wrap">
  <h1>Syllabus map — Chemistry</h1>
  <p class="sub" id="headline"></p>
  <p class="sub" style="font-size:12px">
    <strong>What this page is:</strong> a list of every numbered section of the Maharashtra
    State Board Std XI + XII Chemistry textbooks, and for each one, whether a given exam
    requires it. The State Board syllabus is the fixed baseline; the exams are measured
    <em>against</em> it. This page never counts anything outside those books.
  </p>
  <div class="legend">
    <strong style="color:var(--fg)">Each cell = does this exam require this State Board concept?</strong>
    <span><span class="cell full">Yes</span> required</span>
    <span><span class="cell partial">Part</span> partly required</span>
    <span><span class="cell not">No</span> reviewed, <strong>not</strong> required</span>
    <span><span class="cell mixed">Mixed</span> concepts differ — expand</span>
    <span><span class="cell none">–</span> not yet assessed</span>
  </div>

  <h2>How each exam draws on the State Board syllabus</h2>
  <p class="sub" style="font-size:12px;margin:0 0 8px">
    Every row counts the <strong>same 864 State Board concepts</strong> — the columns are what
    that exam does with them. Read a row as a sentence:
    <em>"Of the 864 State Board concepts, MHT-CET requires 730, partly requires 39,
    and does not require 95."</em>
    Nothing here counts material outside the State Board books.
  </p>
  <div class="box" style="max-height:none"><table id="coverage"></table></div>

  <h2>Gap view — taught by the State Board, not required by…</h2>
  <div class="toolbar" id="gapChips"></div>
  <div id="gapOut"></div>

  <h2>Chapter → section → concept</h2>
  <div class="toolbar">
    <input type="search" id="q" placeholder="Filter concepts…" aria-label="Filter concepts">
    <button class="chip" id="expandAll" aria-pressed="false">Expand all</button>
    <span class="sub" id="count"></span>
  </div>
  <div class="box"><table id="matrix"></table></div>

  <p class="foot" id="foot"></p>
</div>
<script id="data" type="application/json">${dataJson}</script>
<script>
const D = JSON.parse(document.getElementById('data').textContent);
const EXAMS = D.exams, ST = D.statuses;
/**
 * Every ADJUDICATED state gets a word and a colour; only the UNKNOWN state gets a
 * grey dash. The first cut had this inverted — 'not' rendered as an em-dash in
 * muted grey, so a confident "excluded from the syllabus" looked like missing
 * data, while 'unassessed' got the louder '?'. That destroys the one distinction
 * this table exists to preserve.
 */
const SHORT = {full:'Yes', partial:'Part', not:'No'};
// "in syllabus" begs the question "whose?" — always name the exam's relationship
// to this State Board concept.
const LABEL = {full:'Required by this exam', partial:'Partly required by this exam',
               not:'NOT required by this exam (reviewed)'};

// concepts: [class, chapterNo, chapterName, sectionNo, concept, seq]
const C = D.concepts.map((r,i)=>({i,cls:r[0],ch:r[1],chName:r[2],sec:r[3],name:r[4],seq:r[5],st:{}}));
for (const [ci,ei,si] of D.links) C[ci].st[EXAMS[ei]] = ST[si];

const groupKey = s => { const m=/^(\\d+)\\.(\\d+)/.exec(String(s).trim()); return m? m[1]+'.'+m[2] : String(s).trim(); };
const isTop = s => groupKey(s) === String(s).trim();

function roll(list, exam){
  const v = list.map(c=>c.st[exam] ?? null);
  if(!v.length) return null;
  const seen = v.filter(x=>x!==null);
  if(seen.length !== v.length) return seen.length ? 'mixed' : null;
  return seen.every(x=>x===seen[0]) ? seen[0] : 'mixed';
}

// build chapter -> section -> concepts
const chapters = [];
const byCh = new Map();
for (const c of C){
  const k = c.cls+'-'+c.ch;
  let ch = byCh.get(k);
  if(!ch){ ch={key:k,cls:c.cls,ch:c.ch,name:c.chName,items:[],secs:new Map()}; byCh.set(k,ch); chapters.push(ch); }
  ch.items.push(c);
  const gk = groupKey(c.sec);
  let s = ch.secs.get(gk);
  if(!s){ s={key:gk,title:gk,items:[],seq:c.seq}; ch.secs.set(gk,s); }
  s.items.push(c); s.seq=Math.min(s.seq,c.seq);
  if(isTop(c.sec)) s.title=c.name;
}
chapters.sort((a,b)=>a.cls-b.cls||a.ch-b.ch);
for(const ch of chapters) ch.sections=[...ch.secs.values()].sort((a,b)=>a.seq-b.seq);

document.getElementById('headline').textContent =
  C.length+' concepts · '+chapters.length+' chapters · '+EXAMS.length+' exams';
document.getElementById('foot').textContent =
  'Generated '+D.generatedAt+' from the live bank. Prototype for layout iteration — the shipped page is /dashboard/syllabus.';

function cell(st){
  const cls = st===null||st===undefined ? 'none' : st;
  // Unknown gets the faint dash; a reviewed exclusion never does.
  const txt = st===null||st===undefined ? '–' : (st==='mixed'?'Mixed':SHORT[st]);
  const ttl = st===null||st===undefined ? 'Not yet assessed — no ruling exists' : (st==='mixed'?'Concepts differ — expand':LABEL[st]);
  return '<span class="cell '+cls+'" title="'+ttl+'"><span class="sr">'+ttl+'</span>'+txt+'</span>';
}

/* coverage */
(function(){
  // Column headers name the RELATIONSHIP ("does not require"), not a bare "Not".
  // "Not" next to an exam name reads as "95 exam topics missing from the State
  // Board" — the exact inversion of what the number means.
  let h='<thead><tr><th>Exam</th>'+
        '<th class="num">Requires</th><th class="num">Partly requires</th>'+
        '<th class="num">Does <u>not</u> require</th><th class="num">Not yet assessed</th>'+
        '<th class="num">State Board total</th><th>Share of the 864</th></tr></thead><tbody>';
  for(const e of EXAMS){
    let f=0,p=0,n=0,u=0;
    for(const c of C){ const s=c.st[e]; if(s==='full')f++; else if(s==='partial')p++; else if(s==='not')n++; else u++; }
    const pc=x=>(x/C.length*100).toFixed(1)+'%';
    h+='<tr><th>'+e+'</th><td class="num">'+f+'</td><td class="num">'+p+'</td>'+
       '<td class="num">'+n+'</td><td class="num">'+(u||'—')+'</td>'+
       '<td class="num" style="color:var(--muted)">'+C.length+'</td>'+
       '<td><span class="bar" title="'+pc(f)+' required, '+pc(p)+' partly, '+pc(n)+' not required">'+
       '<i style="width:'+pc(f)+';background:var(--full-fg)"></i>'+
       '<i style="width:'+pc(p)+';background:var(--part-fg)"></i>'+
       '<i style="width:'+pc(n)+';background:var(--not-fg)"></i></span></td></tr>';
  }
  document.getElementById('coverage').innerHTML=h+'</tbody>';
})();

/* gap view */
let gapExam=null;
const chipBox=document.getElementById('gapChips');
for(const e of EXAMS){
  if(e==='MH State Board') continue;
  const b=document.createElement('button');
  b.className='chip'; b.textContent=e; b.setAttribute('aria-pressed','false');
  b.onclick=()=>{ gapExam = gapExam===e ? null : e; drawGap(); };
  chipBox.appendChild(b);
}
function drawGap(){
  [...chipBox.children].forEach(b=>b.setAttribute('aria-pressed', String(b.textContent===gapExam)));
  const out=document.getElementById('gapOut');
  if(!gapExam){ out.innerHTML='<p class="sub">Pick an exam to list the State Board chapters it does not require.</p>'; return; }
  const not=[],part=[],un=[];
  for(const ch of chapters){
    const s=roll(ch.items,gapExam);
    const e={cls:ch.cls,ch:ch.ch,name:ch.name,n:ch.items.length};
    if(s==='not')not.push(e); else if(s==='partial'||s==='mixed')part.push(e); else if(s===null)un.push(e);
  }
  const sum=a=>a.reduce((k,x)=>k+x.n,0);
  const xi=not.filter(x=>x.cls===11).length, xii=not.filter(x=>x.cls===12).length;
  let h='<p class="sub"><strong>'+sum(not)+'</strong> of '+C.length+' concepts ('+
        Math.round(sum(not)/C.length*100)+'%) are taught by the State Board but never required by '+gapExam+
        (sum(part)?'; a further <strong>'+sum(part)+'</strong> only partly':'')+'. '+
        'Excluded chapters: Std XI '+xi+', Std XII '+xii+'.</p>';
  if(sum(un)) h+='<p class="note warn">'+sum(un)+' concepts have no ruling for '+gapExam+' yet — listed separately, and NOT skippable.</p>';
  h+='<div class="grid">';
  for(const [t,list] of [['Not required',not],['Partly required',part],...(un.length?[['Not yet assessed',un]]:[])]){
    h+='<div class="card"><h3>'+t+' — '+list.length+' chapter'+(list.length===1?'':'s')+'</h3><ul>';
    h+= list.length? list.map(x=>'<li><span><span class="num" style="margin-right:6px">Std '+(x.cls===11?'XI':'XII')+' · '+x.ch+'</span>'+x.name+'</span><span class="num">'+x.n+'</span></li>').join('')
                   : '<li style="color:var(--muted)">None.</li>';
    h+='</ul></div>';
  }
  document.getElementById('gapOut').innerHTML=h+'</div>';
  // notes for the selected exam
  const ei=EXAMS.indexOf(gapExam);
  const ns=Object.entries(D.notes).filter(([k])=>k.endsWith('-'+ei));
  if(ns.length){
    const box=document.createElement('details');
    box.innerHTML='<summary class="sub" style="cursor:pointer;margin-top:10px">Ruling notes ('+ns.length+')</summary>'+
      ns.map(([k,v])=>{const [cl,c]=k.split('-'); const ch=byCh.get(cl+'-'+c);
        return '<p class="note"><strong>Std '+(cl==='11'?'XI':'XII')+' Ch.'+c+' '+(ch?ch.name:'')+'</strong><br>'+v+'</p>';}).join('');
    document.getElementById('gapOut').appendChild(box);
  }
}
drawGap();

/* matrix */
const open=new Set();
let expandAll=false;
function drawMatrix(){
  const q=document.getElementById('q').value.trim().toLowerCase();
  let h='<thead><tr><th style="width:70px">Ref</th><th>Chapter / section / concept</th><th class="num">n</th>'+
        EXAMS.map(e=>'<th style="text-align:center">'+e.replace('MH State Board','State Board').replace(' Class 12','')+'</th>').join('')+'</tr></thead><tbody>';
  let shown=0;
  for(const ch of chapters){
    const match = c => !q || c.name.toLowerCase().includes(q) || String(c.sec).includes(q);
    const anyMatch = ch.items.some(match);
    if(q && !anyMatch && !ch.name.toLowerCase().includes(q)) continue;
    const isOpen = expandAll || open.has(ch.key) || (q && anyMatch);
    h+='<tr class="chap" data-k="'+ch.key+'"><td>'+(ch.cls===11?'XI':'XII')+'.'+ch.ch+'</td>'+
       '<td>'+(isOpen?'▾ ':'▸ ')+ch.name+'</td><td class="num">'+ch.items.length+'</td>'+
       EXAMS.map(e=>'<td>'+cell(roll(ch.items,e))+'</td>').join('')+'</tr>';
    if(!isOpen) continue;
    for(const s of ch.sections){
      const secItems = q ? s.items.filter(match) : s.items;
      if(q && !secItems.length) continue;
      h+='<tr class="sec"><td>'+s.key+'</td><td>'+s.title+'</td><td class="num">'+s.items.length+'</td>'+
         EXAMS.map(e=>'<td>'+cell(roll(s.items,e))+'</td>').join('')+'</tr>';
      for(const c of secItems){
        if(isTop(c.sec) && s.items.length>1) continue; // its title is already the section row
        shown++;
        h+='<tr class="con"><td>'+c.sec+'</td><td>'+c.name+'</td><td class="num"></td>'+
           EXAMS.map(e=>'<td>'+cell(c.st[e]??null)+'</td>').join('')+'</tr>';
      }
    }
  }
  document.getElementById('matrix').innerHTML=h+'</tbody>';
  document.getElementById('count').textContent = q ? shown+' concepts match' : '';
  document.querySelectorAll('tr.chap').forEach(tr=>tr.onclick=()=>{
    const k=tr.dataset.k; open.has(k)?open.delete(k):open.add(k); expandAll=false;
    document.getElementById('expandAll').setAttribute('aria-pressed','false'); drawMatrix();
  });
}
document.getElementById('q').addEventListener('input',drawMatrix);
document.getElementById('expandAll').onclick=e=>{
  expandAll=!expandAll; open.clear();
  e.target.setAttribute('aria-pressed',String(expandAll));
  e.target.textContent = expandAll?'Collapse all':'Expand all';
  drawMatrix();
};
drawMatrix();
</script>
</body>
</html>`;
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
