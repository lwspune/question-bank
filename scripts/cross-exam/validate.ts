// Check one agent's exam-twin draft against its evidence (scripts/cross-exam/BRIEF.md).
//
//   npx tsx scripts/cross-exam/validate.ts <run dir> <slice>
//
// Reads <dir>/evidence/target.md, <dir>/evidence/board-<slice>.md and
// <dir>/out/board-<slice>.json; exits 1 and names each problem, else prints OK.
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Draft = {
  slice: number;
  checked: number;
  matches: { board: string; target: string; kind: string; why: string }[];
  unsure: { board: string; target: string; why: string }[];
};

const ids = (file: string) =>
  new Set(Array.from(readFileSync(file, "utf8").matchAll(/^### ([0-9a-f-]{36}) \|/gm), (m) => m[1]));

function main() {
  const [dir, n] = process.argv.slice(2);
  if (!dir || !n) throw new Error("usage: validate.ts <run dir> <slice>");
  const target = ids(join(dir, "evidence/target.md"));
  const board = ids(join(dir, `evidence/board-${n}.md`));
  const d = JSON.parse(readFileSync(join(dir, `out/board-${n}.json`), "utf8")) as Draft;
  const err: string[] = [];
  if (d.slice !== Number(n)) err.push(`slice must be ${n}`);
  if (d.checked !== board.size) err.push(`checked is ${d.checked}; the slice has ${board.size} questions`);
  const seen = new Set<string>();
  for (const [k, list] of [["matches", d.matches], ["unsure", d.unsure]] as const) {
    if (!Array.isArray(list)) {
      err.push(`${k} must be a list`);
      continue;
    }
    list.forEach((m, i) => {
      if (!board.has(m.board)) err.push(`${k}[${i}]: board id not in your slice: ${m.board}`);
      if (!target.has(m.target)) err.push(`${k}[${i}]: target id not in target.md: ${m.target}`);
      if (k === "matches" && !["exact", "numbers", "similar"].includes((m as Draft["matches"][number]).kind))
        err.push(`${k}[${i}]: kind must be exact, numbers or similar`);
      if (!m.why || m.why.length > 200 || /\\[a-z(]/i.test(m.why)) err.push(`${k}[${i}]: why missing, over 200 characters or has LaTeX`);
      const key = `${m.board}>${m.target}`;
      if (seen.has(key)) err.push(`${k}[${i}]: duplicate pair`);
      seen.add(key);
    });
  }
  if (err.length) {
    console.log(err.slice(0, 20).join("\n") + (err.length > 20 ? `\n...${err.length - 20} more` : ""));
    process.exit(1);
  }
  console.log(`OK: ${d.matches.length} matches, ${d.unsure.length} unsure`);
}

main();
