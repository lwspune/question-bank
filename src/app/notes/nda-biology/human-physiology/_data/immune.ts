import type { SubtopicNote } from "@/app/notes/_types";

export const IMMUNE_NOTE: SubtopicNote = {
  subtopicName: "Immune System — Antibody Production",
  title: "The Immune System",
  oneLineDefinition:
    "White blood cells defend the body; lymphocytes are the cells that produce antibodies against foreign antigens.",
  whyItMatters:
    "2 PYQs, both the same fact: lymphocytes make antibodies. Worth one sure mark — learn which white blood cell does antibody production versus the others (neutrophils, eosinophils, monocytes).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "immune-cells-antibodies",
      name: "White blood cells and antibody production",
      intuition:
        "White blood cells (leucocytes) are the body's defence force, and they specialise. The one that makes antibodies against a specific foreign antigen is the lymphocyte — specifically B-lymphocytes, which mature into antibody-secreting plasma cells.",
      definition:
        "The white-blood-cell roles the bank tests:\n" +
        "- **Lymphocytes** — produce **antibodies** (B-lymphocytes → plasma cells); also T-lymphocytes for cell-mediated immunity.\n" +
        "- **Neutrophils** — first responders; engulf bacteria (phagocytosis).\n" +
        "- **Eosinophils** — fight parasites and act in allergy.\n" +
        "- **Monocytes** — become macrophages (large eaters).\n" +
        "Antibody production is the lymphocyte's job — not erythrocytes (RBCs), platelets, or the other WBCs.",
      table: {
        columns: ["Cell", "Main role"],
        rows: [
          {
            cells: ["**Lymphocytes**", "Produce ANTIBODIES (B-cells → plasma cells)"],
            noteAmber: "NDA 2024/2025 — the antibody-producing cells are LYMPHOCYTES.",
          },
          { cells: ["Neutrophils", "Phagocytosis of bacteria"] },
          { cells: ["Eosinophils", "Parasites, allergy"] },
          { cells: ["Monocytes", "Become macrophages"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "During an infection the body makes large numbers of antibodies. Which blood cell type is responsible — and which definitely is not (red blood cells, platelets)?",
        steps: [
          "Antibodies are made by B-lymphocytes, which mature into plasma cells.",
          "Red blood cells carry oxygen — they make no antibodies.",
          "Platelets aid clotting — also not antibody producers.",
        ],
        answer: "Lymphocytes produce antibodies; RBCs and platelets do not.",
      },
      practiceSet: [
        { prompt: "Which white blood cells produce antibodies?", answer: "Lymphocytes" },
        { prompt: "Do red blood cells make antibodies?", answer: "No", method: "they carry oxygen" },
        { prompt: "Which lymphocytes mature into antibody-secreting plasma cells?", answer: "B-lymphocytes" },
      ],
      pyqExampleId: "c1a044f8-f7fd-4e7c-8b12-b5146d5d7811", // lymphocytes produce antibodies
      traps: [
        {
          title: "Antibodies = lymphocytes, not other WBCs",
          body:
            "Distractors offer neutrophils, eosinophils or monocytes — all are white blood cells but none produce antibodies. Antibody production is specifically the **lymphocyte** (B-cell) job.",
        },
      ],
    },
  ],
};
