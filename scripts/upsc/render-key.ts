/**
 * Rasterise the Series-A page of a paper's official answer key, for vision
 * transcription into data/<paperId>.key.json.
 *
 *   npx tsx scripts/upsc/render-key.ts 2023-p1
 *
 * A key PDF is FOUR pages, one per booklet series A/B/C/D, each a plain
 * `Q.No -> Key` grid. EVERY booklet we hold is Series A, so only page 0 matters —
 * transcribing the wrong series would produce a complete, well-formed, entirely
 * wrong key, which nothing downstream could detect.
 *
 * The page is rendered at high DPI because the grid is small print and the whole
 * paper's correctness rests on reading ~100 single letters correctly.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { KEY_SERIES_A_PAGE, OUT, keyPath, paperById, pattern } from "./config";

const DPI = 300;

const PY = String.raw`
import sys, fitz
pdf, out, page, dpi = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
d = fitz.open(pdf)
if d.page_count < 1:
    raise SystemExit("key PDF has no pages")
print("PAGES", d.page_count)
d[page].get_pixmap(dpi=dpi).save(out)
d.close()
`;

function main() {
  const paper = paperById(process.argv.find((a) => !a.startsWith("--") && a.includes("-p")));
  const key = keyPath(paper.id);
  if (!existsSync(key)) {
    throw new Error(
      `no official key on disk for ${paper.id}:\n  ${key}\n` +
        `Run: npx tsx scripts/upsc/fetch-keys.ts --apply`
    );
  }
  const dir = join(OUT, paper.id);
  mkdirSync(dir, { recursive: true });
  const out = join(dir, "key-seriesA.png");

  const res = execFileSync("python", ["-c", PY, key, out, String(KEY_SERIES_A_PAGE), String(DPI)], {
    encoding: "utf8",
  });
  const pages = Number(res.trim().split(/\s+/).pop());
  console.log(`${paper.id}: key has ${pages} page(s) (one per series A/B/C/D)`);
  if (pages !== 4) {
    console.log(
      `  !! expected 4. Confirm page ${KEY_SERIES_A_PAGE} really is SERIES A before transcribing —\n` +
        `     the wrong series yields a complete, well-formed, entirely wrong key.`
    );
  }
  console.log(`wrote ${out}`);
  console.log(
    `\nNext: transcribe it to data/${paper.id}.key.json as {"1":"A","2":"B",...},\n` +
      `using "X" for any question the key marks as dropped. Expect ${pattern(paper).questions} entries.`
  );
}

main();
