/**
 * Dump a paper's text layer to out/<id>/text.md — the transcription SCAFFOLD.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/dump-text.ts <paperId|--all>
 *
 * ⚠ THE TEXT LAYER IS LOSSY AND THE LOSS IS SILENT. These are born-digital
 * typeset papers, so a text layer exists (~5-7k chars) — but every math symbol
 * is drawn as a glyph-IMAGE, not a character. So the layer renders
 *
 *     "The converse of contrapositive of  is _____."
 *
 * for a question whose whole content is the missing `~p -> q`. Nothing marks the
 * hole: the sentence still reads as a sentence. Measured on the six papers, the
 * layer drops ~55-70% of each MCQ stem's information.
 *
 * WHAT IT IS GOOD FOR: question numbering, section boundaries, marks brackets,
 * reading order, and pure-prose stems (the "stone dropped into a quiet lake"
 * class). Use it to build the skeleton, then read the rendered PNG for every
 * piece of math. NEVER transcribe math from this file.
 *
 * The per-line `[math]` markers below are the point: they mark where the layer
 * KNOWS it dropped something, so a transcription pass can see its own blind
 * spots instead of reading a truncated stem as complete.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, PAPERS, requirePaper } from "./config";

const PY = String.raw`
import fitz, sys, json
d = fitz.open(sys.argv[1])
pages = []
for pno, page in enumerate(d):
    # Glyph-images are the dropped math. Record their y-position so a line can
    # be marked as "there was math on this line that the text layer lost".
    img_rows = []
    for im in page.get_images(full=True):
        for r in page.get_image_rects(im[0]):
            img_rows.append((round(r.y0, 1), round(r.y1, 1)))
    lines = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            text = "".join(s["text"] for s in line["spans"])
            y0, y1 = line["bbox"][1], line["bbox"][3]
            # a glyph-image overlapping this line's vertical band == lost math
            lost = sum(1 for (a, b) in img_rows if b > y0 - 2 and a < y1 + 2)
            lines.append({"y": round(y0, 1), "text": text, "lost": lost})
    lines.sort(key=lambda l: l["y"])
    pages.append(lines)
print(json.dumps(pages))
`;

/**
 * Render any control character as a visible `\uXXXX` escape.
 *
 * The text layer emits raw `\x01`/`\x02` where a glyph has no Unicode mapping,
 * and they land exactly on the `[math]` lines — they ARE dropped math, in its
 * most deniable form. Written as raw bytes they are invisible to grep, to
 * `audit:text` and to a human reading the scaffold, so a transcription pass
 * could copy one into a stem and nothing downstream would see it. The repo's
 * `tests/no-control-bytes.test.ts` fails on any file that contains one; this is
 * that rule applied at the point the file is written.
 */
/** A literal backslash, built by code point.
 *
 *  Spelling it as an escape inside a template literal is how the first two
 *  attempts at this function broke: one lost the backslash, leaving an invalid
 *  escape that crashed at load; the other stored raw control bytes in THIS file
 *  - the very defect the function exists to prevent. Neither survived a round
 *  trip through an editor. A code point cannot be mangled. */
const BACKSLASH = String.fromCharCode(92);

export function escapeControlChars(text: string): string {
  // Built by CODE POINT rather than a regex character class: writing the class
  // out in source means typing the very bytes we are keeping out of the output.
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    out += code < 0x20 || code === 0x7f ? `${BACKSLASH}u${code.toString(16).padStart(4, "0")}` : ch;
  }
  return out;
}

function dump(id: string) {
  const paper = requirePaper(id);
  const dir = join(OUT, id);
  mkdirSync(dir, { recursive: true });

  const tmp = join(OUT, `_dump_${process.pid}.py`);
  mkdirSync(OUT, { recursive: true });
  writeFileSync(tmp, PY);
  const res = spawnSync("python", [tmp, paper.pdf], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`dump failed: ${res.stderr}`);
  const pages = JSON.parse(res.stdout) as { y: number; text: string; lost: number }[][];

  const out: string[] = [
    `# ${paper.month} ${paper.year} — Mathematics & Statistics (${paper.paperCode})`,
    ``,
    `> Source: ${paper.pdf}`,
    `> **LOSSY.** \`[math]\` marks a line where the text layer dropped glyph-image`,
    `> content. Read the rendered PNG (out/${id}/p-NN.png) for anything marked,`,
    `> and for every option list. Never transcribe math from this file.`,
    ``,
  ];

  let markedLines = 0;
  let totalLines = 0;
  for (const [i, lines] of pages.entries()) {
    out.push(`## page ${i + 1}  (out/${id}/p-${String(i + 1).padStart(2, "0")}.png)`, ``);
    for (const l of lines) {
      const text = escapeControlChars(l.text.trim());
      if (!text) continue;
      totalLines++;
      if (l.lost > 0) markedLines++;
      out.push(`${l.lost > 0 ? `\`[math x${l.lost}]\` ` : ""}${text}`);
    }
    out.push(``);
  }

  const pct = totalLines ? Math.round((markedLines / totalLines) * 100) : 0;
  writeFileSync(join(dir, "text.md"), out.join("\n"), "utf8");
  console.log(`${paper.id}: ${totalLines} lines, ${markedLines} carry lost math (${pct}%) -> ${join(dir, "text.md")}`);
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/dump-text.ts <paperId|--all>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
for (const id of arg === "--all" ? Object.keys(PAPERS) : [arg]) dump(id);
