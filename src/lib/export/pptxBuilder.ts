/**
 * Classroom slide deck (.pptx): ONE question per slide — stem + options, on a
 * white background in black Cambria, with LaTeX preserved as real, editable
 * PowerPoint equations.
 *
 * This is a SECOND CONSUMER of the same math core the Word exporter uses
 * (`textWithMathToOmmlSegments`), not a parallel pipeline — so every fix
 * earned there (matrix delimiters, accents, XML sanitising, the nesting guard,
 * the readable-Unicode fallback) applies here unchanged.
 *
 * Unlike docxBuilder there is no marker-and-patchZip step: the `docx` library
 * owns document.xml, so math has to be smuggled past it, whereas here we own
 * the XML and can emit <m:oMath> in place.
 *
 * THREE RULES BELOW WERE ESTABLISHED BY RENDERING THROUGH POWERPOINT, and none
 * is guessable from the spec:
 *   1. mml2omml ALREADY declares xmlns:m — declaring it again is a duplicate
 *      attribute and PowerPoint refuses the whole file.
 *   2. Math size comes from the paragraph's <a:defRPr>, NOT from sibling run
 *      properties; without it equations draw at the master's default size.
 *   3. At 100% line spacing 2-D math (fractions, radicals) collides with the
 *      next line. 150% clears it.
 */
import JSZip from "jszip";
import type { QuestionRow } from "@/lib/questions/query";
import {
  textWithMathToOmmlSegments,
  type OmmlSegment,
} from "./ommlBuilder";
import { parseTableBlocks, type TableBlock } from "@/components/math/parseTableBlocks";
import { readImageDimensions, fitWithinBox } from "./imageDimensions";
import { stripPassageCountPhrase } from "./stripPassageCount";
import { formatSourceTag } from "./sourceTag";
import { attr, escapeXml } from "./pptxXml";
import {
  BODY_HEIGHT_EMU,
  BODY_WIDTH_EMU,
  MARGIN_EMU,
  NS_A,
  NS_A14,
  NS_MC,
  NS_TABLE,
  NS_P,
  NS_R,
  ROOT_RELS_XML,
  SLIDE_LAYOUT_RELS_XML,
  SLIDE_LAYOUT_XML,
  SLIDE_MASTER_RELS_XML,
  SLIDE_MASTER_XML,
  PRES_PROPS_XML,
  TABLE_STYLES_XML,
  THEME_XML,
  VIEW_PROPS_XML,
  appPropsXml,
  contentTypesXml,
  corePropsXml,
  presentationRelsXml,
  presentationXml,
  slideRelsXml,
} from "./pptxParts";

const FONT = "Cambria";
const BLACK = "000000";
const WHITE = "FFFFFF";
const GREY = "555555";

/** Font ladder, in hundredths of a point (OOXML `sz` units). */
const FONT_LADDER = [2400, 2000, 1800, 1600, 1400] as const;
export const MAX_FONT = FONT_LADDER[0];
export const MIN_FONT = FONT_LADDER[FONT_LADDER.length - 1];

/** Line spacing as thousandths of a percent — 150000 = 150%. See rule 3. */
const LINE_SPACING_PCT = 150000;
const LINE_SPACING = 1.5;
/** Space before a paragraph, in hundredths of a point. */
const SPACE_BEFORE = 600;
const SPACE_BEFORE_PT = 6;

/** Measured off a PowerPoint render: ~76 Cambria chars fit the body at 24pt. */
const CHARS_PER_LINE_AT_MAX = 76;
const BODY_HEIGHT_PT = (BODY_HEIGHT_EMU / 914400) * 72;

/** A 2-D math zone grows a line by roughly half again. */
const MATH_ZONE_EXTRA_LINES = 0.45;

/** Context/source-tag are set smaller than the stem. */
const SECONDARY_SCALE = 0.85;

/** Pixels are assumed to be 96 dpi when converting an image to EMU. */
const EMU_PER_PX = 9525;

export type PptxOptions = {
  /** Print `[JEE Mains 2016]` under the stem. PYQs only — see ./sourceTag. */
  includeSourceTag?: boolean;
  /** Insert a divider slide at the start of each subtopic run. */
  groupBySubtopic?: boolean;
};

export type PptxInput = PptxOptions & {
  title: string;
  questions: QuestionRow[];
  /** Storage path → bytes. A missing path is skipped, never fatal. */
  imageBytes?: Map<string, Buffer>;
};

export type SlideSpec =
  | { kind: "section"; title: string }
  | {
      kind: "question";
      number: number;
      question: QuestionRow;
      /** Shared/solo passage, repeated on this slide. Null when absent. */
      context: string | null;
      sourceTag: string | null;
    };

const NO_SUBTOPIC_LABEL = "Other";

/**
 * Decide what goes on each slide, in order. Pure.
 *
 * A set's shared context is REPEATED on every sibling slide rather than
 * printed once as the Word paper does: a slide is shown on its own, so a
 * passage that appeared two slides ago leaves the current question
 * unanswerable on screen.
 */
export function planSlides(
  questions: QuestionRow[],
  options: PptxOptions
): SlideSpec[] {
  const out: SlideSpec[] = [];
  let number = 0;
  let lastSubtopic: string | null = null;

  for (const question of questions) {
    if (options.groupBySubtopic) {
      const name = question.subtopic?.name ?? NO_SUBTOPIC_LABEL;
      if (name !== lastSubtopic) {
        out.push({ kind: "section", title: name });
        lastSubtopic = name;
      }
    }
    number += 1;
    const raw = question.context?.trim();
    out.push({
      kind: "question",
      number,
      question,
      // The passage's own "for the three (03) items that follow" would
      // contradict a slide showing one question, so it is normalised out.
      context: raw ? stripPassageCountPhrase(raw) : null,
      sourceTag: options.includeSourceTag ? formatSourceTag(question) : null,
    });
  }
  return out;
}

export type SlideLoad = {
  /** Character length of each paragraph that will be laid out. */
  paragraphs: number[];
  /** Total math zones across those paragraphs. */
  mathZones: number;
  /** Share of the body height reserved for images/tables, 0..1. */
  imageFraction: number;
};

/**
 * Pick the largest ladder size whose estimated height fits the slide body.
 *
 * PowerPoint's own autofit is NOT usable here: `<a:normAutofit/>` only shrinks
 * text via a `fontScale` PowerPoint computes while EDITING, so a generated
 * deck would render at full size and overflow. We therefore size it ourselves
 * and still emit normAutofit so a teacher's later edit can shrink further.
 *
 * The estimate is deliberately crude — it cannot know Cambria's real metrics —
 * but it is monotonic in every input, which is the property that matters:
 * more content never yields a bigger font. Pure.
 */
export function pickFontSize(load: SlideLoad): number {
  for (const size of FONT_LADDER) {
    if (estimateHeightPt(load, size) <= BODY_HEIGHT_PT) return size;
  }
  return MIN_FONT;
}

/**
 * How many chars fit one line at `size`, scaled from the 24pt measurement.
 *
 * `LAYOUT` is deliberately more pessimistic than `SIZING`. The two estimates
 * are used for different jobs and fail in opposite directions:
 *
 *   - SIZING picks the font. Over-estimating lines here shrinks text
 *     unnecessarily, so it should be close to the truth.
 *   - LAYOUT decides how tall a text shape is, and the NEXT block starts
 *     below it. Under-estimating there puts the next shape ON TOP of the
 *     text — which is exactly what happened to a 4-line paragraph allotted
 *     3 lines: an image landed over its last line.
 *
 * Since 76-chars-per-line was measured on one string and real character
 * widths vary, layout assumes fewer chars fit and so allots more height. The
 * cost is a little whitespace; the alternative is losing content.
 */
const LAYOUT_SAFETY = 0.85;

export function charsPerLine(
  sizeHundredths: number,
  purpose: "sizing" | "layout" = "sizing"
): number {
  const base = (CHARS_PER_LINE_AT_MAX * MAX_FONT) / sizeHundredths;
  return Math.max(12, base * (purpose === "layout" ? LAYOUT_SAFETY : 1));
}

/** Lines one paragraph occupies, including the growth from 2-D math. */
export function estimateLines(
  chars: number,
  mathZones: number,
  sizeHundredths: number,
  purpose: "sizing" | "layout" = "sizing"
): number {
  return (
    Math.max(1, Math.ceil(chars / charsPerLine(sizeHundredths, purpose))) +
    mathZones * MATH_ZONE_EXTRA_LINES
  );
}

function estimateHeightPt(load: SlideLoad, sizeHundredths: number): number {
  const lineHeight = (sizeHundredths / 100) * LINE_SPACING;
  // Math zones are counted once for the slide, so they are added after the
  // per-paragraph loop rather than inside estimateLines.
  let lines = load.mathZones * MATH_ZONE_EXTRA_LINES;
  for (const chars of load.paragraphs) {
    lines += estimateLines(chars, 0, sizeHundredths);
  }
  const textHeight =
    lines * lineHeight + load.paragraphs.length * SPACE_BEFORE_PT;
  const reserved = Math.min(Math.max(load.imageFraction, 0), 1) * BODY_HEIGHT_PT;
  return textHeight + reserved;
}

// ————————————————————————————————————————————————————————————————
// Runs and paragraphs
// ————————————————————————————————————————————————————————————————

function runProps(size: number, opts: { bold?: boolean; italic?: boolean; underline?: boolean; color?: string } = {}): string {
  return (
    `<a:rPr lang="en-IN"${attr("sz", size)}` +
    (opts.bold ? ` b="1"` : "") +
    (opts.italic ? ` i="1"` : "") +
    (opts.underline ? ` u="sng"` : "") +
    ` dirty="0">` +
    `<a:solidFill><a:srgbClr${attr("val", opts.color ?? BLACK)}/></a:solidFill>` +
    `<a:latin${attr("typeface", FONT)}/><a:cs${attr("typeface", FONT)}/>` +
    `</a:rPr>`
  );
}

function textRun(text: string, size: number, opts: Parameters<typeof runProps>[1] = {}): string {
  return `<a:r>${runProps(size, opts)}<a:t>${escapeXml(text)}</a:t></a:r>`;
}

/**
 * A math zone. The verified PowerPoint shape is <a14:m> inside an
 * mc:AlternateContent choice; the mc:Fallback keeps the slide legible in a
 * renderer that does not understand the a14 extension.
 *
 * `omml` already carries its own xmlns:m (see rule 1) — declaring another here
 * would be a duplicate attribute and PowerPoint would refuse the file.
 */
function mathRun(omml: string, fallback: string, size: number): string {
  return (
    `<mc:AlternateContent${attr("xmlns:mc", NS_MC)}>` +
    `<mc:Choice${attr("xmlns:a14", NS_A14)} Requires="a14">` +
    `<a14:m>${omml}</a14:m>` +
    `</mc:Choice>` +
    `<mc:Fallback>${textRun(fallback, size)}</mc:Fallback>` +
    `</mc:AlternateContent>`
  );
}

type ParaOpts = {
  size: number;
  italic?: boolean;
  bold?: boolean;
  color?: string;
  align?: "l" | "ctr";
};

/**
 * Render one paragraph from a rich-text string. `<a:defRPr>` carries the size
 * because the a14:m math block ignores sibling run properties (rule 2).
 */
function paragraph(text: string, opts: ParaOpts): string {
  const runs = segmentRuns(textWithMathToOmmlSegments(text), opts);
  return wrapParagraph(runs, opts);
}

function wrapParagraph(runs: string, opts: ParaOpts): string {
  const align = opts.align === "ctr" ? ` algn="ctr"` : "";
  return (
    `<a:p><a:pPr${align}>` +
    `<a:lnSpc><a:spcPct${attr("val", LINE_SPACING_PCT)}/></a:lnSpc>` +
    `<a:spcBef><a:spcPts${attr("val", SPACE_BEFORE)}/></a:spcBef>` +
    `<a:defRPr${attr("sz", opts.size)}><a:latin${attr("typeface", FONT)}/></a:defRPr>` +
    `</a:pPr>` +
    runs +
    `<a:endParaRPr lang="en-IN"${attr("sz", opts.size)}><a:latin${attr("typeface", FONT)}/></a:endParaRPr>` +
    `</a:p>`
  );
}

function segmentRuns(segments: OmmlSegment[], opts: ParaOpts): string {
  let out = "";
  for (const seg of segments) {
    if (seg.type === "math") {
      // The unconvertible case never reaches here: textWithMathToOmmlSegments
      // already downgrades it to a prettified text segment.
      out += mathRun(seg.content, "", opts.size);
      continue;
    }
    if (seg.type === "underlined-text") {
      out += textRun(seg.content, opts.size, {
        underline: true,
        italic: seg.italic || opts.italic,
        color: opts.color,
      });
      continue;
    }
    // A newline inside a text segment is a real line break, not a paragraph.
    const lines = seg.content.split("\n");
    lines.forEach((line, i) => {
      if (i > 0) out += `<a:br/>`;
      if (line) {
        out += textRun(line, opts.size, {
          bold: seg.bold || opts.bold,
          italic: opts.italic,
          color: opts.color,
        });
      }
    });
  }
  return out;
}

function countMathZones(text: string): number {
  return textWithMathToOmmlSegments(text).filter((s) => s.type === "math").length;
}

// ————————————————————————————————————————————————————————————————
// Slide blocks — a vertical stack of shapes
// ————————————————————————————————————————————————————————————————

type Block =
  | { kind: "paras"; items: { text: string; opts: Omit<ParaOpts, "size">; scale?: number }[] }
  | { kind: "table"; table: TableBlock }
  | { kind: "image"; path: string };

/** Split a rich string into prose paragraphs and table blocks. */
function contentBlocks(
  text: string,
  opts: Omit<ParaOpts, "size">,
  prefix?: string
): Block[] {
  const out: Block[] = [];
  let first = true;
  for (const block of parseTableBlocks(text)) {
    if (block.kind === "table") {
      out.push({ kind: "table", table: block });
      continue;
    }
    const body = first && prefix ? `${prefix}${block.text}` : block.text;
    first = false;
    if (body.trim()) out.push({ kind: "paras", items: [{ text: body, opts }] });
  }
  // A stem that is nothing BUT a table still needs its number printed.
  if (prefix && !out.some((b) => b.kind === "paras")) {
    out.unshift({ kind: "paras", items: [{ text: prefix.trim(), opts }] });
  }
  return out;
}

/** Merge adjacent paragraph blocks so they share one text shape. */
function coalesce(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (const block of blocks) {
    const prev = out[out.length - 1];
    if (block.kind === "paras" && prev?.kind === "paras") {
      prev.items.push(...block.items);
    } else {
      out.push(block);
    }
  }
  return out;
}

function questionBlocks(spec: Extract<SlideSpec, { kind: "question" }>): Block[] {
  const { question, number, context, sourceTag } = spec;
  const blocks: Block[] = [];

  if (context) {
    blocks.push(
      ...contentBlocks(context, { italic: true, color: GREY }).map((b) =>
        b.kind === "paras"
          ? { ...b, items: b.items.map((i) => ({ ...i, scale: SECONDARY_SCALE })) }
          : b
      )
    );
  }

  blocks.push(...contentBlocks(question.text, {}, `Q${number}. `));

  if (sourceTag) {
    blocks.push({
      kind: "paras",
      items: [{ text: sourceTag, opts: { italic: true, color: GREY }, scale: SECONDARY_SCALE }],
    });
  }

  if (question.imageUrl) blocks.push({ kind: "image", path: question.imageUrl });

  for (const option of question.options) {
    blocks.push({
      kind: "paras",
      items: [{ text: `(${option.label}) ${option.text}`, opts: {} }],
    });
    if (option.imageUrl) blocks.push({ kind: "image", path: option.imageUrl });
  }

  return coalesce(blocks);
}

// ————————————————————————————————————————————————————————————————
// Shape emission
// ————————————————————————————————————————————————————————————————

type ShapeIds = { next: number };

function textShape(
  ids: ShapeIds,
  paragraphs: string,
  box: { x: number; y: number; cx: number; cy: number }
): string {
  const id = ids.next++;
  return (
    `<p:sp><p:nvSpPr><p:cNvPr${attr("id", id)}${attr("name", `Text ${id}`)}/>` +
    `<p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>` +
    `<p:spPr><a:xfrm><a:off${attr("x", box.x)}${attr("y", box.y)}/>` +
    `<a:ext${attr("cx", box.cx)}${attr("cy", box.cy)}/></a:xfrm>` +
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>` +
    `<p:txBody><a:bodyPr vert="horz" wrap="square" lIns="0" rIns="0" tIns="0" bIns="0" rtlCol="0">` +
    // Emitted even though we size the text ourselves — it lets a teacher's
    // later edit shrink further rather than overflow.
    `<a:normAutofit/></a:bodyPr><a:lstStyle/>` +
    paragraphs +
    `</p:txBody></p:sp>`
  );
}

function pictureShape(
  ids: ShapeIds,
  embedId: string,
  box: { x: number; y: number; cx: number; cy: number }
): string {
  const id = ids.next++;
  return (
    `<p:pic><p:nvPicPr><p:cNvPr${attr("id", id)}${attr("name", `Picture ${id}`)}/>` +
    `<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>` +
    `<p:blipFill><a:blip${attr("r:embed", embedId)}/><a:stretch><a:fillRect/></a:stretch></p:blipFill>` +
    `<p:spPr><a:xfrm><a:off${attr("x", box.x)}${attr("y", box.y)}/>` +
    `<a:ext${attr("cx", box.cx)}${attr("cy", box.cy)}/></a:xfrm>` +
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>`
  );
}

/**
 * "No Style, Table Grid" — black text on white with hairline borders.
 *
 * NOT the default `{5C22544A-…}` ("Medium Style 2 – Accent 1"), which paints a
 * BLUE banded table: the deck is specified as white background / black text,
 * and a themed table is the one place PowerPoint injects colour on its own.
 * `firstRow`/`bandRow` stay off for the same reason — a header is distinguished
 * by bold weight, not by a fill.
 */
const TABLE_STYLE_ID = "{5940675A-B579-460E-94D1-54222C63F5DA}";

/**
 * An image never shrinks below this share of the slide, even when the text is
 * long — a figure squeezed to a sliver is worse than a slightly crowded slide,
 * because the question usually cannot be answered without reading it.
 */
const MIN_IMAGE_BODY_FRACTION = 0.25;

/** Gap between stacked blocks so a table's border never touches a descender. */
const BLOCK_GAP_EMU = 73152; // 0.08in

function tableShape(
  ids: ShapeIds,
  table: TableBlock,
  size: number,
  box: { x: number; y: number; cx: number; cy: number }
): string {
  const id = ids.next++;
  const columns = Math.max(
    table.headers.length,
    ...table.rows.map((r) => r.length),
    1
  );
  const colWidth = Math.floor(box.cx / columns);
  const rowHeight = Math.round((size / 100) * LINE_SPACING * 1.6 * 12700);

  const cell = (text: string, bold: boolean): string =>
    `<a:tc><a:txBody><a:bodyPr/><a:lstStyle/>` +
    wrapParagraph(
      segmentRuns(textWithMathToOmmlSegments(text ?? ""), { size, bold }),
      { size, bold }
    ) +
    `</a:txBody><a:tcPr marL="45720" marR="45720" marT="27432" marB="27432">` +
    `<a:solidFill><a:srgbClr${attr("val", WHITE)}/></a:solidFill></a:tcPr></a:tc>`;

  const row = (cells: string[], bold: boolean): string =>
    `<a:tr${attr("h", rowHeight)}>` +
    Array.from({ length: columns }, (_, i) => cell(cells[i] ?? "", bold)).join("") +
    `</a:tr>`;

  return (
    `<p:graphicFrame><p:nvGraphicFramePr>` +
    `<p:cNvPr${attr("id", id)}${attr("name", `Table ${id}`)}/>` +
    `<p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr><p:nvPr/></p:nvGraphicFramePr>` +
    `<p:xfrm><a:off${attr("x", box.x)}${attr("y", box.y)}/><a:ext${attr("cx", box.cx)}${attr("cy", box.cy)}/></p:xfrm>` +
    // NOT `${NS_A}/table` — the drawing and table namespaces are SIBLINGS
    // under /2006, so appending to NS_A yields .../2006/main/table and
    // PowerPoint silently drops the table.
    `<a:graphic><a:graphicData${attr("uri", NS_TABLE)}>` +
    `<a:tbl><a:tblPr firstRow="0" bandRow="0"><a:tableStyleId>${TABLE_STYLE_ID}</a:tableStyleId></a:tblPr>` +
    `<a:tblGrid>${Array.from({ length: columns }, () => `<a:gridCol${attr("w", colWidth)}/>`).join("")}</a:tblGrid>` +
    row(table.headers, true) +
    table.rows.map((r) => row(r, false)).join("") +
    `</a:tbl></a:graphicData></a:graphic></p:graphicFrame>`
  );
}

// ————————————————————————————————————————————————————————————————
// Slide assembly
// ————————————————————————————————————————————————————————————————

type SlideImage = { id: string; target: string; bytes: Buffer };

function slideOpen(): string {
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n` +
    `<p:sld${attr("xmlns:a", NS_A)}${attr("xmlns:r", NS_R)}${attr("xmlns:p", NS_P)}>` +
    `<p:cSld>` +
    // Painted explicitly rather than inherited: a projected deck must be white
    // whatever the theme is later changed to.
    `<p:bg><p:bgPr><a:solidFill><a:srgbClr${attr("val", WHITE)}/></a:solidFill><a:effectLst/></p:bgPr></p:bg>` +
    `<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>`
  );
}

const SLIDE_CLOSE = `</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;

function sectionSlide(spec: Extract<SlideSpec, { kind: "section" }>): {
  xml: string;
  images: SlideImage[];
} {
  const ids: ShapeIds = { next: 2 };
  const body = wrapParagraph(textRun(spec.title, MAX_FONT, { bold: true }), {
    size: MAX_FONT,
    align: "ctr",
  });
  const xml =
    slideOpen() +
    textShape(ids, body, {
      x: MARGIN_EMU,
      y: Math.round(BODY_HEIGHT_EMU / 2),
      cx: BODY_WIDTH_EMU,
      cy: Math.round(BODY_HEIGHT_EMU / 4),
    }) +
    SLIDE_CLOSE;
  return { xml, images: [] };
}

function measureImage(
  bytes: Buffer | undefined,
  maxWidthEmu: number,
  maxHeightEmu: number
): { cx: number; cy: number } | null {
  if (!bytes) return null;
  const natural = readImageDimensions(bytes) ?? { width: 480, height: 360 };
  const fitted = fitWithinBox(
    natural,
    Math.floor(maxWidthEmu / EMU_PER_PX),
    Math.floor(maxHeightEmu / EMU_PER_PX)
  );
  return { cx: fitted.width * EMU_PER_PX, cy: fitted.height * EMU_PER_PX };
}

/** Height a non-image block occupies; images are budgeted separately. */
function nonImageHeight(block: Block, size: number, lineHeightEmu: number): number {
  if (block.kind === "paras") {
    const lines = block.items.reduce(
      (n, item) =>
        n +
        estimateLines(
          item.text.length,
          countMathZones(item.text),
          Math.round(size * (item.scale ?? 1)),
          "layout"
        ),
      0
    );
    return Math.round(lines * lineHeightEmu + block.items.length * 7620);
  }
  if (block.kind === "table") {
    return Math.round((block.table.rows.length + 1) * lineHeightEmu * 1.6);
  }
  return 0;
}

function questionSlide(
  spec: Extract<SlideSpec, { kind: "question" }>,
  imageBytes: Map<string, Buffer>,
  slideIndex: number
): { xml: string; images: SlideImage[] } {
  const blocks = questionBlocks(spec).filter(
    // An image whose bytes never arrived is dropped rather than left as an
    // empty frame — the route fetches images best-effort.
    (b) => b.kind !== "image" || imageBytes.has(b.path)
  );

  // Sizing pass: estimate the load, then commit to one font size for the slide.
  const paragraphLengths: number[] = [];
  let mathZones = 0;
  let imageFraction = 0;
  for (const block of blocks) {
    if (block.kind === "paras") {
      for (const item of block.items) {
        paragraphLengths.push(item.text.length);
        mathZones += countMathZones(item.text);
      }
    } else if (block.kind === "table") {
      // A row behaves like a paragraph as long as its widest cell.
      for (const row of [block.table.headers, ...block.table.rows]) {
        paragraphLengths.push(Math.max(...row.map((c) => c.length), 1));
      }
    } else {
      const measured = measureImage(imageBytes.get(block.path), BODY_WIDTH_EMU, BODY_HEIGHT_EMU);
      if (measured) imageFraction += measured.cy / BODY_HEIGHT_EMU;
    }
  }
  const size = pickFontSize({ paragraphs: paragraphLengths, mathZones, imageFraction });

  // Layout pass: stack the shapes down the body.
  const ids: ShapeIds = { next: 2 };
  const images: SlideImage[] = [];
  const lineHeightEmu = Math.round((size / 100) * LINE_SPACING * 12700);

  // Images are sized against what the TEXT leaves over, not against the whole
  // slide. Sizing them greedily pushed the options of a figure question off
  // the bottom edge — the image took its natural height and the four option
  // paragraphs after it had nowhere to go.
  const textHeight = blocks.reduce(
    (total, block) => total + nonImageHeight(block, size, lineHeightEmu) + BLOCK_GAP_EMU,
    0
  );
  const imageBudget = Math.max(
    Math.round(BODY_HEIGHT_EMU * MIN_IMAGE_BODY_FRACTION),
    BODY_HEIGHT_EMU - textHeight
  );
  const imageCount = blocks.filter((b) => b.kind === "image").length;
  const perImageCap = imageCount > 0 ? Math.floor(imageBudget / imageCount) : 0;

  let y = MARGIN_EMU;
  let xml = slideOpen();

  for (const block of blocks) {
    const remaining = Math.max(lineHeightEmu, MARGIN_EMU + BODY_HEIGHT_EMU - y);

    if (block.kind === "paras") {
      const paragraphs = block.items
        .map((item) =>
          paragraph(item.text, {
            ...item.opts,
            size: Math.round(size * (item.scale ?? 1)),
          })
        )
        .join("");
      // Conservative on purpose — see LAYOUT_SAFETY. Math zones are counted
      // PER BLOCK here (not once per slide) because it is this block's own
      // height that decides where the next shape starts.
      const lines = block.items.reduce(
        (n, item) =>
          n +
          estimateLines(
            item.text.length,
            countMathZones(item.text),
            Math.round(size * (item.scale ?? 1)),
            "layout"
          ),
        0
      );
      const cy = Math.round(
        Math.min(remaining, lines * lineHeightEmu + block.items.length * 7620)
      );
      xml += textShape(ids, paragraphs, { x: MARGIN_EMU, y, cx: BODY_WIDTH_EMU, cy });
      y += cy + BLOCK_GAP_EMU;
      continue;
    }

    if (block.kind === "table") {
      const rows = block.table.rows.length + 1;
      const cy = Math.min(remaining, Math.round(rows * lineHeightEmu * 1.6));
      xml += tableShape(ids, block.table, size, {
        x: MARGIN_EMU,
        y,
        cx: BODY_WIDTH_EMU,
        cy,
      });
      y += cy + BLOCK_GAP_EMU;
      continue;
    }

    const bytes = imageBytes.get(block.path)!;
    const measured = measureImage(
      bytes,
      BODY_WIDTH_EMU,
      Math.min(remaining, perImageCap)
    );
    if (!measured) continue;
    const embedId = `rId${100 + images.length}`;
    const extension = detectImageExtension(bytes);
    images.push({
      id: embedId,
      target: `../media/image${slideIndex}_${images.length + 1}.${extension}`,
      bytes,
    });
    xml += pictureShape(ids, embedId, {
      x: MARGIN_EMU,
      y,
      cx: measured.cx,
      cy: measured.cy,
    });
    y += measured.cy + BLOCK_GAP_EMU;
  }

  return { xml: xml + SLIDE_CLOSE, images };
}

function detectImageExtension(bytes: Buffer): "png" | "jpg" {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  return "png";
}

/**
 * Build the .pptx. One slide per question; images are embedded per slide.
 */
export async function buildQuestionSlides(input: PptxInput): Promise<Buffer> {
  const imageBytes = input.imageBytes ?? new Map<string, Buffer>();
  const plan = planSlides(input.questions, input);

  const zip = new JSZip();
  const mediaExtensions: string[] = [];

  plan.forEach((spec, index) => {
    const slideNumber = index + 1;
    const { xml, images } =
      spec.kind === "section"
        ? sectionSlide(spec)
        : questionSlide(spec, imageBytes, slideNumber);

    zip.file(`ppt/slides/slide${slideNumber}.xml`, xml);
    zip.file(
      `ppt/slides/_rels/slide${slideNumber}.xml.rels`,
      slideRelsXml(images.map((i) => ({ id: i.id, target: i.target })))
    );
    for (const image of images) {
      const name = image.target.replace("../", "ppt/");
      zip.file(name, image.bytes);
      mediaExtensions.push(name.split(".").pop()!);
    }
  });

  const count = plan.length;
  zip.file("[Content_Types].xml", contentTypesXml(count, mediaExtensions));
  zip.file("_rels/.rels", ROOT_RELS_XML);
  zip.file("docProps/core.xml", corePropsXml(escapeXml(input.title)));
  zip.file("docProps/app.xml", appPropsXml(count));
  zip.file("ppt/presentation.xml", presentationXml(count));
  zip.file("ppt/_rels/presentation.xml.rels", presentationRelsXml(count));
  zip.file("ppt/slideMasters/slideMaster1.xml", SLIDE_MASTER_XML);
  zip.file("ppt/slideMasters/_rels/slideMaster1.xml.rels", SLIDE_MASTER_RELS_XML);
  zip.file("ppt/slideLayouts/slideLayout1.xml", SLIDE_LAYOUT_XML);
  zip.file("ppt/slideLayouts/_rels/slideLayout1.xml.rels", SLIDE_LAYOUT_RELS_XML);
  zip.file("ppt/theme/theme1.xml", THEME_XML);
  zip.file("ppt/presProps.xml", PRES_PROPS_XML);
  zip.file("ppt/viewProps.xml", VIEW_PROPS_XML);
  zip.file("ppt/tableStyles.xml", TABLE_STYLES_XML);

  return (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
}
