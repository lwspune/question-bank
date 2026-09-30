// usage: node scripts/notes-pipeline/jee/list.js <dump.json> [subtopic] [len]
// One line per row: id8, current subtopic initials, stem with LaTeX noise stripped.
const d = require(require("path").resolve("generated-papers", process.argv[2]));
const want = process.argv[3];
const L = +(process.argv[4] || 150);
const sub = Object.fromEntries(d.subtopics.map((s) => [s.id, s.name]));
const strip = (t) =>
  t
    .replace(/\\[()[\]]/g, "")
    .replace(/\\(text|mathbf|left|right|mathcal|operatorname)\b/g, "")
    .replace(/\s+/g, " ");
for (const q of d.questions) {
  const s = sub[q.subtopic_id];
  if (want && s !== want) continue;
  const tag = s.split(/\s+/).map((w) => w[0]).join("");
  console.log(`${q.id.slice(0, 8)} [${tag}] ${strip(q.text).slice(0, L)}`);
}
