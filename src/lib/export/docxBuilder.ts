import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  LevelFormat,
  LevelSuffix,
  PageOrientation,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  type ParagraphChild,
} from "docx";
import JSZip from "jszip";
import type { QuestionRow } from "@/lib/questions/query";
import { parseTableBlocks, type TableBlock } from "@/components/math/parseTableBlocks";
import { textWithMathToOmmlSegments } from "./ommlBuilder";
import { readImageDimensions, fitWithinBox } from "./imageDimensions";
import { groupBySet, type Group } from "./groupBySet";
import { headingsOnChange } from "./subtopicHeadings";
import { stripPassageCountPhrase } from "./stripPassageCount";
import { formatSourceTag } from "./sourceTag";

const MARGIN = 720; // 0.5" in twips
const COL_SPACE = 720;
const PAGE_WIDTH = 12240; // US Letter
const PAGE_HEIGHT = 15840;
const FONT = "Cambria";
const SIZE_HALF_POINTS = 20; // 10pt
const TITLE_SIZE = 28; // 14pt
const SUBTITLE_SIZE = 24; // 12pt
const NUM_REF = "questions";
const MARKER_PREFIX = "OMML_";

type Builder = { ommlByIndex: string[] };

const sectionProperties = {
  page: {
    size: {
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      orientation: PageOrientation.PORTRAIT,
    },
    margin: {
      top: MARGIN,
      right: MARGIN,
      bottom: MARGIN,
      left: MARGIN,
      header: 0,
      footer: 0,
    },
  },
  column: { count: 2, space: COL_SPACE },
};

const documentDefaults = {
  styles: {
    default: {
      document: {
        run: { font: FONT, size: SIZE_HALF_POINTS },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: NUM_REF,
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            // Flush-left: wrap lines come back to column 0 so the question
            // block aligns with options, Context, and the Set banner.
            // SPACE suffix replaces Word's default tab (which would push
            // the first-line body to the next tab stop, ~720 twips).
            suffix: LevelSuffix.SPACE,
            style: {
              paragraph: { indent: { left: 0, hanging: 0 } },
            },
          },
        ],
      },
    ],
  },
};

export type QuestionPaperInput = {
  title: string;
  questions: QuestionRow[];
  /** Storage path → image bytes. If omitted or a path is missing, the image is silently skipped. */
  imageBytes?: Map<string, Buffer>;
  /** When true, print a bold subtopic heading before each new subtopic run. */
  groupBySubtopic?: boolean;
  /**
   * When true, print `[JEE Mains 2016]` after each question's stem — the
   * coaching-book source citation. Off by default so existing exports are
   * unchanged. Practice questions (no PYQ year) are never tagged; see
   * ./sourceTag.
   */
  includeSourceTag?: boolean;
};

export type AnswerKeyInput = {
  title: string;
  questions: QuestionRow[];
  includeSolutions: boolean;
  /** Accepted for symmetry with QuestionPaperInput; ignored — answer key never embeds images. */
  imageBytes?: Map<string, Buffer>;
  /** When true, print a bold subtopic heading before each new subtopic run. */
  groupBySubtopic?: boolean;
};

// Heading text for a question with no subtopic — keeps the grouping total.
const NO_SUBTOPIC_LABEL = "Other";

// Maximum render boxes (px). Images smaller than the cap render at their
// natural size; larger images scale-to-fit while preserving aspect ratio.
// Caps are sized to keep the image inside one of the two columns
// (column width ~336 px at 96 dpi).
const QUESTION_IMAGE_MAX_WIDTH = 320;
const QUESTION_IMAGE_MAX_HEIGHT = 360;
const OPTION_IMAGE_MAX_WIDTH = 200;
const OPTION_IMAGE_MAX_HEIGHT = 200;
// Fallback when the image bytes can't be parsed (corrupt PNG/JPEG header):
// preserves the legacy fixed-rectangle behaviour rather than dropping the
// image entirely.
const FALLBACK_QUESTION_DIMS = { width: 320, height: 240 };
const FALLBACK_OPTION_DIMS = { width: 200, height: 150 };

export async function buildQuestionPaper(
  input: QuestionPaperInput
): Promise<Buffer> {
  const builder: Builder = { ommlByIndex: [] };
  const children: (Paragraph | Table)[] = [];

  children.push(titleParagraph(input.title));
  children.push(blank());

  // Group consecutive set siblings so the shared passage prints once at the
  // top of each unbroken run. Standalone questions go through unchanged.
  // The banner names the questions explicitly by their 1-indexed position
  // in the export ("Common context for questions X-Y:") so a student reading
  // the paper sees which questions share the context without inferring it
  // from visual grouping. Set-of-1 falls through to a standalone render with
  // the passage inline as Context — a 1-question "Set:" framing reads worst.
  // Subtopic section headings (opt-in). Computed per set-group so a passage
  // set stays under one heading; the label comes from the group's first
  // question (set siblings are co-located on one subtopic by invariant).
  const groups = groupBySet(input.questions);
  const headings = input.groupBySubtopic
    ? headingsOnChange(groups.map((g) => groupSubtopicLabel(g)))
    : [];

  const includeSourceTag = !!input.includeSourceTag;
  let position = 1;
  for (let gi = 0; gi < groups.length; gi++) {
    const group = groups[gi];
    if (input.groupBySubtopic && headings[gi]) {
      children.push(subtopicHeading(headings[gi]!));
    }
    if (group.kind === "single") {
      children.push(
        ...questionParagraphs(
          group.question,
          builder,
          input.imageBytes,
          /* skipContextParagraph */ false,
          includeSourceTag
        )
      );
      children.push(blank());
      position += 1;
      continue;
    }
    if (group.questions.length === 1) {
      children.push(
        ...questionParagraphs(
          group.questions[0],
          builder,
          input.imageBytes,
          /* skipContextParagraph */ false,
          includeSourceTag
        )
      );
      children.push(blank());
      position += 1;
      continue;
    }
    const firstQ = position;
    const lastQ = position + group.questions.length - 1;
    children.push(...passageBanner(group.passage, firstQ, lastQ, builder));
    for (const q of group.questions) {
      children.push(
        ...questionParagraphs(
          q,
          builder,
          input.imageBytes,
          /* skipContextParagraph */ true,
          includeSourceTag
        )
      );
      children.push(blank());
    }
    position += group.questions.length;
  }

  const doc = new Document({
    ...documentDefaults,
    sections: [{ properties: sectionProperties, children }],
  });
  return finalize(doc, builder);
}

export async function buildAnswerKey(input: AnswerKeyInput): Promise<Buffer> {
  const builder: Builder = { ommlByIndex: [] };
  // (Paragraph | Table) — a solution may contain a GFM pipe-table, which
  // renders as a native Word table rather than a paragraph.
  const children: (Paragraph | Table)[] = [];

  children.push(titleParagraph(input.title));
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "Answer Key", bold: true, size: SUBTITLE_SIZE }),
      ],
    })
  );
  children.push(blank());

  const keyHeadings = input.groupBySubtopic
    ? headingsOnChange(
        input.questions.map((q) => q.subtopic?.name ?? NO_SUBTOPIC_LABEL)
      )
    : [];

  for (let i = 0; i < input.questions.length; i++) {
    const q = input.questions[i];
    if (input.groupBySubtopic && keyHeadings[i]) {
      children.push(subtopicHeading(keyHeadings[i]!));
    }
    if (q.questionFormat === "subjective") {
      // Subjective questions have no A/B/C/D letter — the "answer" is the model
      // answer itself. Print it inline (or a pending note); never `(?)`.
      if (q.solution) {
        children.push(
          ...solutionBlocks("Model answer: ", q.solution, builder, { numbered: true })
        );
      } else {
        children.push(
          new Paragraph({
            numbering: { reference: NUM_REF, level: 0 },
            children: [
              new TextRun({
                text: "(subjective — model answer pending)",
                italics: true,
              }),
            ],
          })
        );
      }
      if (input.includeSolutions) {
        const solImg = solutionImagePara(q, input.imageBytes);
        if (solImg) children.push(solImg);
        children.push(blank());
      }
      continue;
    }

    if (q.questionFormat === "numeric") {
      // NAT: no A/B/C/D letter — the answer is the exact numerical value.
      children.push(
        new Paragraph({
          numbering: { reference: NUM_REF, level: 0 },
          children: [
            new TextRun({ text: "Answer: ", italics: true, bold: true }),
            new TextRun({ text: q.numericAnswer != null ? String(q.numericAnswer) : "(pending)" }),
          ],
        })
      );
      if (input.includeSolutions && q.solution) {
        children.push(
          ...solutionBlocks("Solution: ", q.solution, builder, { indent: 720 })
        );
      }
      if (input.includeSolutions) {
        const solImg = solutionImagePara(q, input.imageBytes);
        if (solImg) children.push(solImg);
        children.push(blank());
      }
      continue;
    }

    const correct = q.options.find((o) => o.isCorrect);
    children.push(
      new Paragraph({
        numbering: { reference: NUM_REF, level: 0 },
        children: [
          new TextRun({
            text: `(${correct?.label?.toLowerCase() ?? "?"})`,
            bold: true,
          }),
        ],
      })
    );
    if (input.includeSolutions && q.solution) {
      children.push(
        ...solutionBlocks("Solution: ", q.solution, builder, { indent: 720 })
      );
    }
    if (input.includeSolutions) {
      const solImg = solutionImagePara(q, input.imageBytes);
      if (solImg) children.push(solImg);
    }
    // Plain answer key stays tight (one paragraph per question, easy to
    // skim). Solution mode adds a blank between blocks so each solution
    // breathes — mirrors the paper's per-question rhythm.
    if (input.includeSolutions) {
      children.push(blank());
    }
  }

  const doc = new Document({
    ...documentDefaults,
    sections: [{ properties: sectionProperties, children }],
  });
  return finalize(doc, builder);
}

function titleParagraph(title: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: title, bold: true, size: TITLE_SIZE })],
  });
}

/** Subtopic of a set-group, taken from its first question (siblings co-located). */
function groupSubtopicLabel(group: Group): string {
  const q = group.kind === "single" ? group.question : group.questions[0];
  return q.subtopic?.name ?? NO_SUBTOPIC_LABEL;
}

/** Bold, underlined section heading printed before a new subtopic run. */
function subtopicHeading(name: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 40 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "999999", space: 1 },
    },
    children: [new TextRun({ text: name, bold: true, size: SUBTITLE_SIZE })],
  });
}

function questionParagraphs(
  q: QuestionRow,
  builder: Builder,
  imageBytes: Map<string, Buffer> | undefined,
  skipContextParagraph: boolean,
  includeSourceTag: boolean
): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = [];

  // Source citation — `[JEE Mains 2016]` — rides on the END of the stem, before
  // the options, per the coaching-book convention. null when the flag is off or
  // the question isn't a PYQ (see ./sourceTag).
  const sourceTag = includeSourceTag ? formatSourceTag(q) : null;

  // Stem: split into prose + GFM-table blocks. The question NUMBER rides on the
  // first PARAGRAPH; if the stem opens with a table, emit a numbered empty
  // paragraph first so the number still prints.
  const stemBlocks = parseTableBlocks(q.text);
  // The tag can't ride inside a table cell, so it attaches to the LAST prose
  // block; a stem that ends in a table gets it as its own paragraph below.
  const lastTextBlock = stemBlocks.reduce(
    (acc, b, i) => (b.kind === "text" ? i : acc),
    -1
  );
  let numbered = false;
  let tagPrinted = false;
  for (let i = 0; i < stemBlocks.length; i++) {
    const b = stemBlocks[i];
    if (b.kind === "text") {
      const withTag = sourceTag !== null && i === lastTextBlock;
      out.push(
        new Paragraph({
          ...(numbered ? {} : { numbering: { reference: NUM_REF, level: 0 } }),
          children: [
            ...mathRuns(b.text, builder),
            ...(withTag
              ? [new TextRun({ text: ` ${sourceTag}`, italics: true })]
              : []),
          ],
        })
      );
      if (withTag) tagPrinted = true;
      numbered = true;
    } else {
      if (!numbered) {
        out.push(new Paragraph({ numbering: { reference: NUM_REF, level: 0 }, children: [] }));
        numbered = true;
      }
      out.push(docxTable(b, builder));
    }
  }
  if (!numbered) {
    out.push(new Paragraph({ numbering: { reference: NUM_REF, level: 0 }, children: [] }));
  }
  if (sourceTag !== null && !tagPrinted) {
    out.push(
      new Paragraph({
        indent: { left: 0 },
        children: [new TextRun({ text: sourceTag, italics: true })],
      })
    );
  }

  if (q.imageUrl && imageBytes?.has(q.imageUrl)) {
    const data = imageBytes.get(q.imageUrl)!;
    const dims = pickDims(
      data,
      QUESTION_IMAGE_MAX_WIDTH,
      QUESTION_IMAGE_MAX_HEIGHT,
      FALLBACK_QUESTION_DIMS
    );
    out.push(imageParagraph(data, dims.width, dims.height, 0));
  }

  if (q.context && !skipContextParagraph) {
    const ctxBlocks = parseTableBlocks(q.context);
    if (ctxBlocks.some((b) => b.kind === "table")) {
      // Table-bearing context: label line, then prose paragraphs + table(s).
      out.push(
        new Paragraph({
          indent: { left: 0 },
          children: [new TextRun({ text: "Context:", italics: true })],
        })
      );
      for (const b of ctxBlocks) {
        if (b.kind === "text") {
          out.push(new Paragraph({ indent: { left: 0 }, children: mathRuns(b.text, builder) }));
        } else {
          out.push(docxTable(b, builder));
        }
      }
    } else {
      out.push(
        new Paragraph({
          indent: { left: 0 },
          children: [
            new TextRun({ text: "Context: ", italics: true }),
            ...mathRuns(q.context, builder),
          ],
        })
      );
    }
  }

  for (const opt of q.options) {
    out.push(
      new Paragraph({
        indent: { left: 0 },
        children: [
          new TextRun({ text: `(${opt.label.toLowerCase()}) ` }),
          ...mathRuns(opt.text, builder),
        ],
      })
    );
    if (opt.imageUrl && imageBytes?.has(opt.imageUrl)) {
      const data = imageBytes.get(opt.imageUrl)!;
      const dims = pickDims(
        data,
        OPTION_IMAGE_MAX_WIDTH,
        OPTION_IMAGE_MAX_HEIGHT,
        FALLBACK_OPTION_DIMS
      );
      out.push(imageParagraph(data, dims.width, dims.height, 0));
    }
  }

  return out;
}

/**
 * Render a SOLUTION (or subjective model answer) as prose + native Word tables.
 *
 * The stem and context paths have always gone through `parseTableBlocks`; the
 * solution path did not, so a GFM pipe-table in a solution printed as raw
 * `| a | b |` text in the downloaded answer key. Same defect the web renderer
 * had until 2026-07-06. Long-form fields (text / context / solution) must all
 * handle prose + math + table — see tests/docx-solution-table.test.ts.
 *
 * The `label` ("Solution: " / "Model answer: ") rides on the first PARAGRAPH;
 * if the solution opens with a table, the label gets its own paragraph first so
 * it is never lost.
 */
function solutionBlocks(
  label: string,
  solution: string,
  builder: Builder,
  opts: { numbered?: boolean; indent?: number } = {}
): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = [];
  const labelRun = () => new TextRun({ text: label, italics: true, bold: true });
  const paraProps = () => ({
    ...(opts.indent ? { indent: { left: opts.indent } } : {}),
  });

  const blocks = parseTableBlocks(solution);
  let labelled = false;
  for (const b of blocks) {
    const first = !labelled;
    const numbering =
      first && opts.numbered ? { numbering: { reference: NUM_REF, level: 0 } } : {};
    if (b.kind === "text") {
      out.push(
        new Paragraph({
          ...numbering,
          ...paraProps(),
          children: [...(first ? [labelRun()] : []), ...mathRuns(b.text, builder)],
        })
      );
      labelled = true;
    } else {
      if (first) {
        out.push(new Paragraph({ ...numbering, ...paraProps(), children: [labelRun()] }));
        labelled = true;
      }
      out.push(docxTable(b, builder));
    }
  }
  if (!labelled) {
    // Solution was empty/whitespace-only — still print the label paragraph so
    // the numbering (subjective) isn't dropped.
    out.push(
      new Paragraph({
        ...(opts.numbered ? { numbering: { reference: NUM_REF, level: 0 } } : {}),
        ...paraProps(),
        children: [labelRun()],
      })
    );
  }
  return out;
}

function docxTable(block: TableBlock, builder: Builder): Table {
  const ncols = Math.max(1, block.headers.length);
  const colPct = Math.floor(100 / ncols);
  const edge = { style: BorderStyle.SINGLE, size: 4, color: "999999" } as const;
  const cell = (content: string, header: boolean): TableCell =>
    new TableCell({
      width: { size: colPct, type: WidthType.PERCENTAGE },
      shading: header ? { fill: "EEEEEE" } : undefined,
      // mathRuns (not a plain TextRun) so a math header like \(x\) renders;
      // the header row's shading is what visually distinguishes it.
      children: [new Paragraph({ children: mathRuns(content, builder) })],
    });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: edge,
      bottom: edge,
      left: edge,
      right: edge,
      insideHorizontal: edge,
      insideVertical: edge,
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: block.headers.map((h) => cell(h, true)),
      }),
      ...block.rows.map(
        (r) => new TableRow({ children: r.map((c) => cell(c, false)) })
      ),
    ],
  });
}

function pickDims(
  data: Buffer,
  maxW: number,
  maxH: number,
  fallback: { width: number; height: number }
): { width: number; height: number } {
  const natural = readImageDimensions(data);
  if (!natural) return fallback;
  return fitWithinBox(natural, maxW, maxH);
}

// A per-question SOLUTION diagram (migration 0042), rendered under the answer
// in the WITH-solutions answer key only. Returns null when there's no diagram
// or its bytes weren't fetched (graceful fallback, same as stem images).
function solutionImagePara(
  q: QuestionRow,
  imageBytes: Map<string, Buffer> | undefined
): Paragraph | null {
  if (!q.solutionImageUrl || !imageBytes?.has(q.solutionImageUrl)) return null;
  const data = imageBytes.get(q.solutionImageUrl)!;
  const dims = pickDims(
    data,
    QUESTION_IMAGE_MAX_WIDTH,
    QUESTION_IMAGE_MAX_HEIGHT,
    FALLBACK_QUESTION_DIMS
  );
  return imageParagraph(data, dims.width, dims.height, 720);
}

function imageParagraph(
  data: Buffer,
  width: number,
  height: number,
  indentLeft: number
): Paragraph {
  return new Paragraph({
    indent: { left: indentLeft },
    children: [
      new ImageRun({
        type: detectImageType(data),
        data,
        transformation: { width, height },
      }),
    ],
  });
}

function detectImageType(bytes: Buffer): "png" | "jpg" {
  // PNG: 89 50 4E 47
  if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50) return "png";
  // JPEG: FF D8 FF
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  // Default to png; we accept only png/jpeg at upload, so this is unreachable
  // unless someone seeds bytes manually. The docx library still needs *some*
  // type, so picking png keeps the file from breaking outright.
  return "png";
}

function mathRuns(text: string, builder: Builder): ParagraphChild[] {
  const segments = textWithMathToOmmlSegments(text);
  const out: ParagraphChild[] = [];
  for (const seg of segments) {
    if (seg.type === "text") {
      const lines = seg.content.split("\n");
      lines.forEach((line, i) => {
        if (i > 0) out.push(new TextRun({ break: 1 }));
        // Markdown **bold** becomes a native Word bold run. Math inside a bold
        // span stays unbolded: it goes through the OMML path, which carries no
        // run properties (the web renderer is the same — KaTeX sets its font).
        if (line) out.push(new TextRun({ text: line, bold: seg.bold ? true : undefined }));
      });
    } else if (seg.type === "underlined-text") {
      // Native Word underline run — bypasses the OMML borderBox path
      // whose bottom border doesn't render under our inline-math defaults.
      out.push(
        new TextRun({
          text: seg.content,
          underline: { type: "single" },
          italics: seg.italic ? true : undefined,
        })
      );
    } else {
      const idx = builder.ommlByIndex.length;
      builder.ommlByIndex.push(seg.content);
      out.push(new TextRun({ text: `${MARKER_PREFIX}${idx}` }));
    }
  }
  return out;
}

function blank(): Paragraph {
  return new Paragraph({ children: [] });
}

/**
 * Print the passage shared by a question-set once, naming the questions
 * by their 1-indexed position in the export so the student reading the
 * paper sees exactly which questions inherit this context. The passage's
 * own count phrase ("for the three (03) items that follow") is stripped
 * at render so it can't contradict the banner when the user has selected
 * a subset of the original siblings.
 */
function passageBanner(
  passage: string,
  firstQ: number,
  lastQ: number,
  builder: Builder
): (Paragraph | Table)[] {
  if (!passage) return [];
  const text = stripPassageCountPhrase(passage);
  const label = new TextRun({
    text: `Common context for questions ${firstQ}-${lastQ}: `,
    italics: true,
    bold: true,
  });

  // A SHARED context can carry a pipe-table just as a solo one can — the
  // co-ordinate table that several "are these segments congruent?" siblings all
  // read is exactly that shape. This path rendered through `mathRuns` alone
  // until 2026-08-11, so those tables printed as raw `| a | b |` pipes in every
  // downloaded paper (36 PUBLIC rows across 10 sets). Same conversion the solo
  // context and the stem already had; the contract is pinned by
  // tests/docx-solution-table.test.ts.
  const blocks = parseTableBlocks(text);
  if (!blocks.some((b) => b.kind === "table")) {
    return [new Paragraph({ indent: { left: 0 }, children: [label, ...mathRuns(text, builder)] })];
  }

  // Table-bearing: the banner label rides on the first prose paragraph so the
  // "Common context for questions X-Y:" framing is not orphaned above a table.
  const out: (Paragraph | Table)[] = [];
  let labelPlaced = false;
  for (const b of blocks) {
    if (b.kind === "text") {
      out.push(
        new Paragraph({
          indent: { left: 0 },
          children: labelPlaced ? mathRuns(b.text, builder) : [label, ...mathRuns(b.text, builder)],
        })
      );
      labelPlaced = true;
    } else {
      if (!labelPlaced) {
        out.push(new Paragraph({ indent: { left: 0 }, children: [label] }));
        labelPlaced = true;
      }
      out.push(docxTable(b, builder));
    }
  }
  return out;
}

// Word's built-in math defaults (defJc="centerGroup", wrapIndent="1440",
// non-zero margins) cause paragraphs with a 2-D math element (e.g. <m:f>)
// to render with extra left indent — option "(A) -3/4" lands ~1" to the
// right of a plain-text option on the next question. Forcing these values
// makes inline math align flush with the surrounding text.
const MATH_PR_BLOCK =
  "<m:mathPr>" +
  '<m:mathFont m:val="Cambria Math"/>' +
  '<m:brkBin m:val="before"/>' +
  '<m:brkBinSub m:val="--"/>' +
  '<m:smallFrac m:val="0"/>' +
  "<m:dispDef/>" +
  '<m:lMargin m:val="0"/>' +
  '<m:rMargin m:val="0"/>' +
  '<m:defJc m:val="left"/>' +
  '<m:wrapIndent m:val="0"/>' +
  '<m:intLim m:val="subSup"/>' +
  '<m:naryLim m:val="undOvr"/>' +
  "</m:mathPr>";

async function finalize(doc: Document, builder: Builder): Promise<Buffer> {
  const buf = (await Packer.toBuffer(doc)) as Buffer;
  return patchZip(buf, builder.ommlByIndex);
}

async function patchZip(
  buf: Buffer,
  ommlByIndex: string[]
): Promise<Buffer> {
  const zip = await JSZip.loadAsync(buf);

  const docFile = zip.file("word/document.xml");
  if (docFile && ommlByIndex.length > 0) {
    let xml = await docFile.async("text");
    for (let i = 0; i < ommlByIndex.length; i++) {
      const marker = `${MARKER_PREFIX}${i}`;
      const re = new RegExp(
        `<w:r>(?:<w:rPr>[\\s\\S]*?</w:rPr>)?<w:t[^>]*>${escapeRegex(marker)}</w:t></w:r>`,
        "g"
      );
      xml = xml.replace(re, ommlByIndex[i]);
    }
    zip.file("word/document.xml", xml);
  }

  const settingsFile = zip.file("word/settings.xml");
  if (settingsFile) {
    let settings = await settingsFile.async("text");
    if (!settings.includes("<m:mathPr")) {
      settings = settings.replace("</w:settings>", `${MATH_PR_BLOCK}</w:settings>`);
      zip.file("word/settings.xml", settings);
    }
  }

  return (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
