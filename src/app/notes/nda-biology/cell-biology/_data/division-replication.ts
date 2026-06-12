import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_DIVISION_REPLICATION_NOTE: SubtopicNote = {
  subtopicName: "Cell Division and DNA Replication",
  title: "Cell Division and DNA Replication",
  oneLineDefinition:
    "Before a cell divides it copies its DNA (replication); the loose chromatin then coils into rod-shaped chromosomes. Eukaryotes divide by mitosis/meiosis, but prokaryotes divide differently — by binary fission.",
  whyItMatters:
    "Small (2 PYQs) but both are MODERATE statement questions that reward careful reading. " +
    "Two ideas are tested: the sequence of replication (DNA copies when chromatin is open, then condenses into chromosomes for division) plus the prokaryote-vs-eukaryote difference, and ploidy in double fertilization (zygote 2N, endosperm 3N). " +
    "Both MODERATE.",
  concepts: [
    // replication + division process (PYQ 2601e89e)
    {
      kind: "reference" as const,
      slug: "cell-replication-division-process",
      name: "DNA replication and cell division — the sequence",
      intuition:
        "A cell can only copy its DNA while the chromatin is loosely unwound — replication needs access to the strands. Once copied, the chromatin condenses into compact rod-shaped chromosomes so they can be cleanly separated during division. And how a cell divides depends on its type.",
      definition:
        "The correct statements the bank tests:\n" +
        "- **DNA replication** takes place when the **chromatin is opened up** (uncoiled) — TRUE.\n" +
        "- Chromatin then **organises into rod-shaped chromosomes before division** — TRUE.\n" +
        "- Prokaryotes and eukaryotes do **NOT** use the same division process — prokaryotes divide by **binary fission**, eukaryotes by **mitosis / meiosis** — so 'same process' is FALSE.",
      table: {
        columns: ["Statement", "Correct?"],
        rows: [
          { cells: ["DNA replicates when chromatin is opened up", "**True**"] },
          { cells: ["Chromatin forms rod-shaped chromosomes before division", "**True**"] },
          {
            cells: ["Prokaryotes and eukaryotes divide by the same process", "**False**"],
            noteAmber: "Prokaryotes = binary fission; eukaryotes = mitosis/meiosis. NOT the same.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statements are correct? 1. DNA replication takes place when chromatin is opened up. 2. Chromatin organises into rod-shaped chromosomes before division. 3. Prokaryotes and eukaryotes share the same division process.",
        steps: [
          "1 — true: replication needs the chromatin uncoiled to access the strands.",
          "2 — true: chromatin condenses into chromosomes before division.",
          "3 — false: prokaryotes use binary fission, eukaryotes use mitosis/meiosis.",
        ],
        answer: "1 and 2 only.",
      },
      practiceSet: [
        { prompt: "Is the chromatin open or condensed during DNA replication?", answer: "Open (uncoiled)" },
        { prompt: "How do prokaryotes divide?", answer: "By binary fission" },
        { prompt: "Do prokaryotes and eukaryotes divide by the same process?", answer: "No" },
      ],
      pyqExampleId: "2601e89e-aff2-4a12-a3e5-488485292a80",
      traps: [
        {
          title: "Prokaryote and eukaryote division differ",
          body:
            "A statement claiming 'both prokaryotes and eukaryotes have the same process for cell division' is FALSE. Prokaryotes split by binary fission; eukaryotes use mitosis (body cells) or meiosis (gametes).",
        },
      ],
    },

    // ploidy / double fertilization (PYQ 06c44bb6)
    {
      kind: "formula" as const,
      slug: "cell-ploidy-double-fertilization",
      name: "Ploidy and double fertilization (N, 2N, 3N)",
      intuition:
        "Ploidy just counts chromosome sets. A gamete carries one set (N, haploid); a normal body cell carries two (2N, diploid). In flowering plants, 'double fertilization' makes two products with different ploidy: a 2N zygote and a 3N endosperm.",
      definition:
        "Ploidy in plant double fertilization:\n" +
        "- One set of chromosomes = **N** (haploid); a normal body cell = **2N** (diploid).\n" +
        "- **Zygote** = sperm (N) + egg (N) = **2N**.\n" +
        "- **Endosperm** = sperm (N) + two polar nuclei (N + N = 2N) = **3N** (triploid).\n" +
        "- So for a diploid plant, the zygote and endosperm have **2N and 3N** sets respectively.",
      formula: {
        label: "Double fertilization products",
        latex: "\\text{zygote} = N + N = 2N \\qquad \\text{endosperm} = N + 2N = 3N",
        symbols: [
          { symbol: "N", meaning: "one set of chromosomes (haploid)" },
          { symbol: "2N", meaning: "two sets (diploid) — the zygote" },
          { symbol: "3N", meaning: "three sets (triploid) — the endosperm" },
        ],
      },
      authoredExample: {
        prompt:
          "In a plant whose one chromosome set is N, what is the ploidy of the egg cell, and of the endosperm formed in double fertilization?",
        steps: [
          "The egg is a gamete, so it carries a single set: N (haploid).",
          "The endosperm forms from one sperm (N) fusing with the two polar nuclei (N + N = 2N).",
          "N + 2N = 3N, so the endosperm is triploid (3N).",
        ],
        answer: "Egg = N; endosperm = 3N.",
      },
      practiceSet: [
        { prompt: "What is the ploidy of a zygote in a diploid plant?", answer: "2N", method: "sperm (N) + egg (N)" },
        { prompt: "What is the ploidy of the endosperm?", answer: "3N", method: "sperm (N) + two polar nuclei (2N)" },
        { prompt: "How many chromosome sets does a gamete carry?", answer: "One (N, haploid)" },
      ],
      pyqExampleId: "06c44bb6-3df7-4620-8075-aa206fb50f6c",
      traps: [
        {
          title: "Endosperm is 3N, not 2N",
          body:
            "The zygote is 2N (one sperm + egg). The endosperm is 3N because the second sperm fuses with TWO polar nuclei (N + 2N = 3N). Don't give both products the same ploidy.",
        },
      ],
    },
  ],
};
