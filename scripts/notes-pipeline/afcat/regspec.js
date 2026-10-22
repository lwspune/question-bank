// Build a register.py spec for one AFCAT chapter from its _data files and tag json.
// usage: node regspec.js <repo> <code> <slug> "<chip label>" <out.json>
const fs = require("fs");
const path = require("path");
const [repo, code, slug, chip, out] = process.argv.slice(2);
const tags = JSON.parse(fs.readFileSync(path.join(repo, "generated-papers", `_af${code}-tags.json`), "utf8"));
const dir = path.join(repo, "src/app/notes/afcat-maths", slug, "_data");
const chapterSrc = fs.readFileSync(path.join(dir, "chapter.ts"), "utf8");
const order = [...chapterSrc.matchAll(/"(af-[a-z0-9-]+)"/g)].map((m) => m[1]);
const chapterConst = chapterSrc.match(/export const (AF_\w+)_CHAPTER/)[1];
const pages = order.map((s) => {
  const file = fs.readdirSync(dir).find((f) => f.endsWith(".ts") && f !== "chapter.ts" && f !== "index.ts" &&
    fs.readFileSync(path.join(dir, f), "utf8").includes(`subtopicName: ${JSON.stringify(tags.subtopics[s])}`));
  if (!file) throw new Error(`no page file for ${s} (${tags.subtopics[s]})`);
  const exp = fs.readFileSync(path.join(dir, file), "utf8").match(/export const (\w+): SubtopicNote/)[1];
  return [s, file.replace(/\.ts$/, ""), exp];
});
const spec = {
  route: "afcat-maths", subject: "Numerical Ability", display: "AFCAT Numerical Ability", exam: "AFCAT",
  slug, const: chapterConst, chip, prefix: tags.prefix, cprefix: tags.prefix.replace("-", ""),
  blurb: `Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_af${code}-plan.json, 2026-10-22).\nOrder matches \`subtopicOrder\`.`,
  pages,
};
fs.writeFileSync(out, JSON.stringify(spec, null, 1));
console.log(`${slug}: ${pages.length} pages, const ${chapterConst}`);
