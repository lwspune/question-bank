import type { SubtopicNote } from "@/app/notes/_types";

export const EXCRETION_REPRODUCTION_NOTE: SubtopicNote = {
  subtopicName: "Excretory and Reproductive Anatomy",
  title: "Excretion and Reproduction",
  oneLineDefinition:
    "The nephron filters blood at Bowman's capsule to make urine; the kidney also releases renin to control blood pressure; sperm form through meiosis from the primary spermatocyte.",
  whyItMatters:
    "3 PYQs — small but reliable. Two anchors: Bowman's capsule is the filtration site of the nephron, and the kidney's enzyme renin starts the blood-pressure cascade. One reproduction fact: the first meiotic division of spermatogenesis occurs in the primary spermatocyte.",
  concepts: [
    // nephron & filtration (FORMULA + diagram)
    {
      kind: "formula" as const,
      slug: "nephron-filtration",
      name: "The nephron — filtration and renin",
      intuition:
        "The kidney's working unit is the nephron. Blood is filtered at a cup-shaped structure — Bowman's capsule — surrounding a knot of capillaries (the glomerulus). The filtrate is then refined into urine as it travels down the tubule. " +
        "The kidney also has a hormone job: it releases the enzyme renin to raise blood pressure when needed.",
      definition:
        "The nephron's key parts and the renin role:\n" +
        "- **Bowman's capsule (+ glomerulus)** — the site of **ultrafiltration**; blood is filtered here.\n" +
        "- **Tubule (PCT, loop of Henle, DCT) + collecting duct** — reabsorb water, salts and useful molecules; the rest becomes urine.\n" +
        "- **Renin** — an enzyme secreted by the kidney that converts plasma **angiotensinogen → angiotensin**, raising blood pressure (the RAAS cascade).",
      visualizationSlug: "hp-nephron-schematic",
      authoredExample: {
        prompt:
          "In which part of the nephron is blood first filtered, and what is the rest of the tubule mainly for?",
        steps: [
          "Blood arrives at the glomerulus, a tuft of capillaries.",
          "It is filtered into the surrounding **Bowman's capsule** — this is ultrafiltration.",
          "The filtrate then flows through the tubule, where useful water and solutes are reabsorbed.",
          "What remains is urine, collected by the collecting duct.",
        ],
        answer: "Filtration happens at Bowman's capsule; the tubule reabsorbs useful substances.",
      },
      selfCheckExample: {
        prompt:
          "The kidney secretes an enzyme that converts angiotensinogen into angiotensin. Name the enzyme and its overall effect.",
        steps: [
          "The kidney's juxtaglomerular cells release the enzyme renin.",
          "Renin cleaves plasma angiotensinogen to angiotensin I (start of the RAAS cascade).",
          "The net effect is to raise blood pressure.",
        ],
        answer: "Renin; it raises blood pressure via the angiotensin cascade.",
      },
      practiceSet: [
        { prompt: "Which part of the nephron filters blood?", answer: "Bowman's capsule" },
        { prompt: "Which kidney enzyme acts on angiotensinogen?", answer: "Renin" },
        { prompt: "What does renin ultimately raise?", answer: "Blood pressure" },
      ],
      pyqExampleId: "40d3a6a7-3443-4a07-9458-f8080eb86e2c", // Bowman's capsule filtration
      traps: [
        {
          title: "Bowman's capsule filters; it doesn't carry urine away",
          body:
            "Distractors offer the collecting duct, ureter or renal vein. Filtration specifically happens at **Bowman's capsule**; the ureter merely carries finished urine out of the kidney.",
        },
      ],
    },

    // spermatogenesis (FORMULA, 1 q)
    {
      kind: "formula" as const,
      slug: "spermatogenesis",
      name: "Spermatogenesis — where meiosis happens",
      intuition:
        "Sperm are made in stages. Diploid stem cells (spermatogonia) divide by mitosis, then one of them grows into a primary spermatocyte — and it is THIS cell that undergoes the first meiotic division, halving the chromosome number.",
      definition:
        "The sequence and the meiosis checkpoint:\n" +
        "- **Spermatogonium** (diploid) — divides by **mitosis**.\n" +
        "- **Primary spermatocyte** — undergoes **meiosis I** (the FIRST meiotic division) → two secondary spermatocytes.\n" +
        "- **Secondary spermatocyte** — undergoes meiosis II → spermatids → mature sperm.\n" +
        "- **Sertoli cells** — nurse cells that nourish developing sperm (they do not divide into sperm).",
      authoredExample: {
        prompt:
          "During spermatogenesis, in which cell does the first meiotic division take place?",
        steps: [
          "Spermatogonia divide by mitosis, not meiosis.",
          "One enlarges into a **primary spermatocyte**.",
          "The primary spermatocyte undergoes meiosis I — the first meiotic division.",
          "Its products (secondary spermatocytes) then undergo meiosis II.",
        ],
        answer: "The primary spermatocyte (it undergoes meiosis I).",
      },
      practiceSet: [
        { prompt: "Which cell undergoes the first meiotic division in sperm formation?", answer: "Primary spermatocyte" },
        { prompt: "How do spermatogonia divide?", answer: "By mitosis" },
        { prompt: "What is the role of Sertoli cells?", answer: "Nurse / nourish developing sperm" },
      ],
      pyqExampleId: "1a75329f-4bab-4908-b910-36a46c42ef1e", // spermatogenesis primary spermatocyte
    },
  ],
};
