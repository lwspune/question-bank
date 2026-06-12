import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_MICROSCOPY_NOTE: SubtopicNote = {
  subtopicName: "Microscopy",
  title: "Microscopy — Discovering the Cell",
  oneLineDefinition:
    "The cell was discovered with the microscope: Robert Hooke first saw and named 'cells' in cork in 1665, and the compound microscope (mirror, stage, clip, lenses) is the tool that made all of cell biology possible.",
  whyItMatters:
    "Small but free marks (2 PYQs) — both are one-fact recall. " +
    "The bank tests two things: who FIRST discovered the cell (Robert Hooke, not Leeuwenhoek or Brown), and which listed part is NOT on a compound microscope (the 'retina' trap — that belongs to the eye). " +
    "Both EASY.",
  concepts: [
    // discoverers (PYQ f5e55b95)
    {
      kind: "reference" as const,
      slug: "cell-discoverers",
      name: "Who discovered the cell — the scientist table",
      intuition:
        "Several scientists shaped early cell biology, and the bank loves to swap their names. The key fact: Robert Hooke FIRST observed and named cells (in cork, 1665). Don't confuse him with Leeuwenhoek (saw living cells) or Brown (named the nucleus).",
      definition:
        "The cell-biology pioneers and their one claim to fame:\n" +
        "- **Robert Hooke (1665)** — first observed and named **'cells'** in a slice of cork.\n" +
        "- **Anton van Leeuwenhoek** — first saw live, moving cells (bacteria, protozoa) with a simple microscope.\n" +
        "- **Robert Brown** — discovered the **nucleus**.\n" +
        "- **Rudolf Virchow** — proposed that all cells arise from pre-existing cells (cell theory).",
      table: {
        columns: ["Scientist", "Famous for"],
        rows: [
          {
            cells: ["**Robert Hooke**", "First observed and NAMED the cell (cork, 1665)"],
            noteAmber: "'Who FIRST discovered the cell?' → Robert Hooke.",
          },
          { cells: ["**Anton van Leeuwenhoek**", "First saw living cells (bacteria, protozoa)"] },
          { cells: ["**Robert Brown**", "Discovered the nucleus"] },
          { cells: ["**Rudolf Virchow**", "All cells come from pre-existing cells"] },
        ],
      },
      practiceSet: [
        { prompt: "Who first discovered the cell?", answer: "Robert Hooke", method: "saw cork cells in 1665" },
        { prompt: "Who discovered the nucleus?", answer: "Robert Brown" },
        { prompt: "Who first observed living cells?", answer: "Anton van Leeuwenhoek" },
      ],
      pyqExampleId: "f5e55b95-2dfa-43cc-81d7-138947dc5353",
      traps: [
        {
          title: "Hooke saw the cell; Leeuwenhoek saw LIVE cells",
          body:
            "Robert Hooke (1665) saw dead cork cells and coined the word 'cell'. Leeuwenhoek later saw living organisms. The question 'who FIRST discovered the cell' wants Hooke.",
        },
      ],
    },

    // parts of a compound microscope (PYQ 6adb4d18)
    {
      kind: "reference" as const,
      slug: "cell-compound-microscope-parts",
      name: "Parts of a compound microscope",
      intuition:
        "A compound microscope is built from a mechanical frame plus a light path. The exam asks you to spot the ODD part — a structure that belongs to something else (usually the eye's retina). Learn the real parts and the imposter stands out.",
      definition:
        "The real parts of a compound microscope, and the imposter the bank slips in:\n" +
        "- **Mirror** — reflects light up through the specimen.\n" +
        "- **Stage** — flat platform the slide rests on.\n" +
        "- **Clip** — holds the slide on the stage.\n" +
        "- **Lenses** — objective and eyepiece (the magnifying optics).\n" +
        "- **Retina** is NOT a microscope part — it is the light-sensitive layer of the **human eye**.",
      table: {
        columns: ["Part", "Microscope or not?"],
        rows: [
          { cells: ["Mirror", "**Yes** — reflects light to the specimen"] },
          { cells: ["Stage", "**Yes** — holds the slide"] },
          { cells: ["Clip", "**Yes** — secures the slide"] },
          {
            cells: ["Retina", "**No** — part of the EYE, not the microscope"],
            noteAmber: "The retina is the odd-one-out answer in 'which is NOT a microscope part'.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which is NOT a part of a compound microscope: mirror, stage, clip, retina?", answer: "Retina", method: "the retina belongs to the eye" },
        { prompt: "What holds the slide on the stage?", answer: "The clip" },
        { prompt: "What reflects light up through the specimen?", answer: "The mirror" },
      ],
      pyqExampleId: "6adb4d18-89a9-410c-9fa1-1d5a18053a49",
      traps: [
        {
          title: "Retina = eye, not microscope",
          body:
            "Mirror, stage and clip are all microscope parts; the retina is the light-sensitive layer of the eye. In a 'which is NOT a part' question, the body-part imposter is the answer.",
        },
      ],
    },
  ],
};
