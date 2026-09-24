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
 *
 * ⚠ AND ONE LOSS IS WORSE THAN A HOLE — IT IS A COLLISION. On the Physics prints
 * the operators themselves are rasterised, so Q.1(iii) of jun-2026
 *
 *     (a) Q = ΔU     (b) Q = 0     (c) Q = ΔU + W     (d) Q = ΔU − W
 *
 * extracts as `Q U`, `0 Q`, `Q U W`, `Q U W`. Options (c) and (d) are IDENTICAL
 * in the text layer, because the `+` and the `−` are the only things that
 * distinguish them and both are PNGs. A `[math]` marker does not help here: the
 * line looks complete and merely differs from a sibling it should differ from.
 * So the option grid is reconstructed and collisions are reported BY REF, and
 * `verify.ts` refuses a transcription whose four option texts are not pairwise
 * distinct. That second gate is the one that matters, because it fires whatever
 * the cause.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, PAPERS, requirePaper } from "./config";

const PY = String.raw`
import fitz, sys, json, re
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

    # Reconstruct the MCQ option grid. Labels "(a)".."(d)" sit in two columns;
    # an option's content is whatever shares its row and lies to its right, up
    # to the next label across. Read in (row, column) order the labels come out
    # a,b,c,d — which is how the paper prints them.
    raw = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            t = "".join(s["text"] for s in line["spans"]).strip()
            if t:
                raw.append({"t": t, "x0": line["bbox"][0], "x1": line["bbox"][2],
                            "yc": (line["bbox"][1] + line["bbox"][3]) / 2})
    labels = sorted([r for r in raw if re.fullmatch(r"\(([a-d])\)", r["t"])],
                    key=lambda r: (round(r["yc"] / 6), r["x0"]))
    opts = []
    for i, lab in enumerate(labels):
        right = [o["x0"] for o in labels
                 if abs(o["yc"] - lab["yc"]) < 6 and o["x0"] > lab["x0"] + 1]
        limit = min(right) if right else 1e9
        # A tall band: a fraction's numerator and denominator are separate
        # lines several points above and below the label's own centre.
        body = [r["t"] for r in raw
                if r is not lab and abs(r["yc"] - lab["yc"]) < 14
                and r["x0"] > lab["x0"] and r["x0"] < limit]
        opts.append({"label": lab["t"][1], "text": " ".join(body).strip(), "yc": round(lab["yc"], 1)})
    pages.append({"lines": lines, "options": opts})
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
  type Line = { y: number; text: string; lost: number };
  type Opt = { label: string; text: string; yc: number };
  const pages = JSON.parse(res.stdout) as { lines: Line[]; options: Opt[] }[];

  // Group the page's option labels into questions of four and report any whose
  // extracted texts are not pairwise distinct. A collision is not a warning
  // about THIS file — it is proof that a text-layer transcription of that
  // question would be wrong, silently, with a well-formed-looking result.
  const collisions: { page: number; labels: string; text: string }[] = [];
  let optionGroups = 0;
  for (const [i, pg] of pages.entries()) {
    for (let k = 0; k < pg.options.length; k += 4) {
      const group = pg.options.slice(k, k + 4);
      if (group.length < 2) continue;
      optionGroups++;
      const byText = new Map<string, string[]>();
      for (const o of group) {
        const key = o.text.replace(/\s+/g, " ").trim();
        if (!key) continue;
        byText.set(key, [...(byText.get(key) ?? []), o.label]);
      }
      for (const [text, labels] of byText) {
        if (labels.length > 1) collisions.push({ page: i + 1, labels: labels.join("/"), text });
      }
    }
  }

  const out: string[] = [
    `# ${paper.month} ${paper.year} — ${paper.subject} (${paper.paperCode})`,
    ``,
    `> Source: ${paper.pdf}`,
    `> **LOSSY.** \`[math]\` marks a line where the text layer dropped glyph-image`,
    `> content. Read the rendered PNG (out/${id}/p-NN.png) for anything marked,`,
    `> and for every option list. Never transcribe math from this file.`,
    ...(collisions.length
      ? [
          `>`,
          `> ⚠ **${collisions.length} OPTION COLLISION${collisions.length > 1 ? "S" : ""}.** The text layer gives two`,
          `> options of the same question IDENTICAL text, because what separates them`,
          `> is rasterised. Transcribing any option from this file is unsafe on this`,
          `> paper — read the image. Collisions found:`,
          ...collisions.map((c) => `> - p${c.page} options (${c.labels}) both read \`${escapeControlChars(c.text)}\``),
        ]
      : []),
    ``,
  ];

  let markedLines = 0;
  let totalLines = 0;
  for (const [i, pg] of pages.entries()) {
    out.push(`## page ${i + 1}  (out/${id}/p-${String(i + 1).padStart(2, "0")}.png)`, ``);
    for (const l of pg.lines) {
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
  console.log(
    `${paper.id.padEnd(14)} ${totalLines} lines, ${markedLines} carry lost math (${pct}%)` +
      `, ${collisions.length} option collision(s) over ${optionGroups} group(s) -> ${join(dir, "text.md")}`,
  );
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/dump-text.ts <paperId|--all|--subject=<name>>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
const subject = arg.startsWith("--subject=") ? arg.slice("--subject=".length) : null;
const ids = subject
  ? Object.values(PAPERS).filter((p) => p.subject === subject).map((p) => p.id)
  : arg === "--all"
    ? Object.keys(PAPERS)
    : [arg];
if (!ids.length) throw new Error(`no papers for ${JSON.stringify(arg)}`);
for (const id of ids) dump(id);
