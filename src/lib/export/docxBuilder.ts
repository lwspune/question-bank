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
import { groupBySet } from "./groupBySet";
import { stripPassageCountPhrase } from "./stripPassageCount";

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
};

export type AnswerKeyInput = {
  title: string;
  questions: QuestionRow[];
  includeSolutions: boolean;
  /** Accepted for symmetry with QuestionPaperInput; ignored — answer key never embeds images. */
  imageBytes?: Map<string, Buffer>;
};

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
  let position = 1;
  for (const group of groupBySet(input.questions)) {
    if (group.kind === "single") {
      children.push(
        ...questionParagraphs(
          group.question,
          builder,
          input.imageBytes,
          /* skipContextParagraph */ false
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
          /* skipContextParagraph */ false
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
          /* skipContextParagraph */ true
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
  const children: Paragraph[] = [];

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

  for (const q of input.questions) {
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
        new Paragraph({
          indent: { left: 720 },
          children: [
            new TextRun({ text: "Solution: ", italics: true, bold: true }),
            ...mathRuns(q.solution, builder),
          ],
        })
      );
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

function questionParagraphs(
  q: QuestionRow,
  builder: Builder,
  imageBytes: Map<string, Buffer> | undefined,
  skipContextParagraph: boolean
): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = [];

  // Stem: split into prose + GFM-table blocks. The question NUMBER rides on the
  // first PARAGRAPH; if the stem opens with a table, emit a numbered empty
  // paragraph first so the number still prints.
  const stemBlocks = parseTableBlocks(q.text);
  let numbered = false;
  for (const b of stemBlocks) {
    if (b.kind === "text") {
      out.push(
        new Paragraph({
          ...(numbered ? {} : { numbering: { reference: NUM_REF, level: 0 } }),
          children: mathRuns(b.text, builder),
        })
      );
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
        if (line) out.push(new TextRun({ text: line }));
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
): Paragraph[] {
  if (!passage) return [];
  return [
    new Paragraph({
      indent: { left: 0 },
      children: [
        new TextRun({
          text: `Common context for questions ${firstQ}-${lastQ}: `,
          italics: true,
          bold: true,
        }),
        ...mathRuns(stripPassageCountPhrase(passage), builder),
      ],
    }),
  ];
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
