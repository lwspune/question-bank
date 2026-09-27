/**
 * The ONE PDF reader for the Class 10 Social Science lane.
 *
 * This is impure (it shells out to PyMuPDF), which is why it is not in
 * `socialLib.ts`. It lives in its own file rather than inside the gate because
 * two scripts need it — `social-grounding.ts` and `social-anchor-strength.ts` —
 * and `socialLib.ts`'s own header records what happened the last time a helper
 * in this repo was copied instead of shared: the copies drifted, and the newer
 * one had learned fixes the older one had not. A second copy of the extractor
 * would drift exactly the same way, and the two scripts would then disagree
 * about what a chapter's anchors are — the gate saying one thing and the probe
 * that measures the gate saying another.
 */
import { spawnSync } from "node:child_process";
import { stitchSmallCaps, type HeadingLine, type RawHeadingLine } from "./socialLib";

/**
 * Every line of the chapter with its size, page and whether it is WHOLLY bold.
 *
 * Wholly, not partly: body prose bolds a term inline constantly, and a line
 * carrying one bold word is not a heading. The body size is the modal size
 * weighted by character count, so a chapter of mostly-display pages cannot drag
 * the baseline up and hide its own headings.
 *
 * The result is STITCHED (see `stitchSmallCaps`): PyMuPDF decomposes a
 * small-caps heading into a dozen overlapping windows at one y, and anchoring
 * those directly is what let a citation resolve onto the bare word "water".
 */
export function chapterLines(pdf: string): { body: number; lines: HeadingLine[] } {
  const py = [
    "import fitz, sys, json, collections",
    "doc = fitz.open(sys.argv[1])",
    "raw=[]; sizes=collections.Counter()",
    "def heavy(f):",
    "    f=f.lower()",
    "    return ('bold' in f) or ('demi' in f) or ('black' in f) or ('heavy' in f)",
    "for pi,p in enumerate(doc):",
    "    for b in p.get_text('dict')['blocks']:",
    "        for l in b.get('lines', []):",
    "            sp=l['spans']",
    "            txt=''.join(s['text'] for s in sp).strip()",
    "            if not txt: continue",
    "            sizes[round(max(s['size'] for s in sp),1)] += len(txt)",
    "            raw.append({'page':pi,'y':round(l['bbox'][1],2),'frags':[",
    "                {'text':s['text'],'x0':round(s['bbox'][0],2),'x1':round(s['bbox'][2],2),",
    "                 'size':round(s['size'],1),",
    "                 'bold': bool(heavy(s['font']) or (s['flags'] & 16))} for s in sp]})",
    "doc.close()",
    "body = sizes.most_common(1)[0][0] if sizes else 0",
    "sys.stdout.buffer.write(json.dumps({'body':body,'raw':raw}).encode('utf-8'))",
  ].join("\n");

  const r = spawnSync("python", ["-c", py, pdf], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`pdf line extraction failed: ${r.stderr}`);
  const { body, raw } = JSON.parse(r.stdout) as { body: number; raw: RawHeadingLine[] };
  return { body, lines: stitchSmallCaps(raw) };
}
