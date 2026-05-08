import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  LevelFormat,
  PageOrientation,
  type ParagraphChild,
} from "docx";
import JSZip from "jszip";
import type { QuestionRow } from "@/lib/questions/query";
import { textWithMathToOmmlSegments } from "./ommlBuilder";

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
            style: {
              paragraph: { indent: { left: 720, hanging: 480 } },
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
};

export type AnswerKeyInput = {
  title: string;
  questions: QuestionRow[];
  includeSolutions: boolean;
};

export async function buildQuestionPaper(
  input: QuestionPaperInput
): Promise<Buffer> {
  const builder: Builder = { ommlByIndex: [] };
  const children: Paragraph[] = [];

  children.push(titleParagraph(input.title));
  children.push(blank());

  for (const q of input.questions) {
    children.push(...questionParagraphs(q, builder));
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
            text: `(${correct?.label ?? "?"})`,
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

function questionParagraphs(q: QuestionRow, builder: Builder): Paragraph[] {
  const out: Paragraph[] = [];

  out.push(
    new Paragraph({
      numbering: { reference: NUM_REF, level: 0 },
      children: mathRuns(q.text, builder),
    })
  );

  if (q.context) {
    out.push(
      new Paragraph({
        indent: { left: 720 },
        children: [
          new TextRun({ text: "Context: ", italics: true }),
          ...mathRuns(q.context, builder),
        ],
      })
    );
  }

  for (const opt of q.options) {
    out.push(
      new Paragraph({
        indent: { left: 720 },
        children: [
          new TextRun({ text: `(${opt.label}) ` }),
          ...mathRuns(opt.text, builder),
        ],
      })
    );
  }

  return out;
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

async function finalize(doc: Document, builder: Builder): Promise<Buffer> {
  const buf = (await Packer.toBuffer(doc)) as Buffer;
  if (builder.ommlByIndex.length === 0) return buf;
  return injectOmml(buf, builder.ommlByIndex);
}

async function injectOmml(
  buf: Buffer,
  ommlByIndex: string[]
): Promise<Buffer> {
  const zip = await JSZip.loadAsync(buf);
  const file = zip.file("word/document.xml");
  if (!file) return buf;
  let xml = await file.async("text");

  for (let i = 0; i < ommlByIndex.length; i++) {
    const marker = `${MARKER_PREFIX}${i}`;
    const re = new RegExp(
      `<w:r>(?:<w:rPr>[\\s\\S]*?</w:rPr>)?<w:t[^>]*>${escapeRegex(marker)}</w:t></w:r>`,
      "g"
    );
    xml = xml.replace(re, ommlByIndex[i]);
  }

  zip.file("word/document.xml", xml);
  return (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
