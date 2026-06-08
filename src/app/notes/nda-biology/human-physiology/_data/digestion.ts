import type { SubtopicNote } from "@/app/notes/_types";

export const DIGESTION_NOTE: SubtopicNote = {
  subtopicName: "Digestive System and Enzymes",
  title: "Digestion and Enzymes",
  oneLineDefinition:
    "Digestion breaks food into absorbable molecules using enzymes — each enzyme acts on one substrate, comes from one gland, and works best at one pH.",
  whyItMatters:
    "7 PYQs and the chapter's one HARD question all live here. " +
    "The recall spine is the enzyme table: pepsin and trypsin digest protein, amylase digests starch, lipase (with bile) digests fat — and each has a signature optimum pH. " +
    "Get the gland-to-enzyme map straight and the questions become lookups.",
  concepts: [
    // digestive enzymes (REFERENCE)
    {
      kind: "reference" as const,
      slug: "digestive-enzymes",
      name: "Digestive enzymes — substrate, source, and pH",
      intuition:
        "Each digestive enzyme is a specialist: it splits ONE class of food molecule, is made by ONE gland, and works in ONE pH window. " +
        "The bank's distractors swap these around (offering trypsin where pepsin belongs, or amylase for fat), so learn the four-way mapping as a block.",
      definition:
        "The core enzymes and the facts the NDA tests:\n" +
        "- **Pepsin** — digests **protein**; secreted by the **stomach** wall; works best in acid (**pH ~2**).\n" +
        "- **Trypsin** — digests **protein**; secreted by the **pancreas**; works in the alkaline small intestine (**pH ~8**).\n" +
        "- **Amylase** — digests **starch / carbohydrate**; from saliva and pancreas.\n" +
        "- **Lipase** — digests **fat**; from the pancreas. Bile (from the liver) first **emulsifies** fat so lipase can act.",
      table: {
        columns: ["Enzyme", "Substrate", "Source", "Optimum pH"],
        rows: [
          {
            cells: ["**Pepsin**", "Protein", "Stomach wall", "~2 (acidic)"],
            noteAmber: "NDA 2025 — pepsin works at pH ~2, trypsin at pH ~7.9. Opposite ends.",
          },
          { cells: ["**Trypsin**", "Protein", "Pancreas", "~8 (alkaline)"] },
          { cells: ["**Amylase**", "Starch / carbohydrate", "Saliva, pancreas", "Slightly alkaline / neutral"] },
          { cells: ["**Lipase**", "Fat (after bile emulsifies it)", "Pancreas", "Alkaline"] },
        ],
        caption: "Fat digestion needs TWO players: bile emulsifies, lipase digests.",
      },
      selfCheckExample: {
        prompt:
          "Which enzyme digests fat, and what must happen to the fat first before that enzyme can work efficiently?",
        steps: [
          "Fat is digested by lipase, secreted by the pancreas.",
          "Fat forms large globules that lipase cannot easily reach.",
          "Bile (from the liver, stored in the gallbladder) emulsifies the fat — breaking big globules into tiny droplets, increasing surface area.",
          "Now lipase can act efficiently.",
        ],
        answer: "Lipase digests fat; bile must first emulsify it.",
      },
      practiceSet: [
        { prompt: "Which enzyme digests protein in the stomach?", answer: "Pepsin" },
        { prompt: "Optimum pH of pepsin?", answer: "About 2 (acidic)" },
        { prompt: "Which enzyme digests starch?", answer: "Amylase" },
        { prompt: "Fat digestion needs which two players?", answer: "Bile (emulsifies) + lipase (digests)" },
      ],
      pyqExampleId: "6bc22394-1e57-4f5a-98c2-7d5ac9606888", // pepsin pH 2, trypsin pH 7.9
      traps: [
        {
          title: "Pepsin = acid, trypsin = alkaline",
          body:
            "Both digest protein, so the bank separates them by pH. Pepsin works in the **acidic stomach (pH ~2)**; trypsin works in the **alkaline small intestine (pH ~8)**. An option pairing pepsin with a high pH is wrong.",
        },
        {
          title: "Bile is not an enzyme",
          body:
            "Bile **emulsifies** fat (a physical breakup) — it contains no digestive enzyme. The enzyme that chemically digests fat is **lipase**. 'Fat digestion = bile + lipase', not 'bile + amylase' or 'bile + pepsin'.",
        },
      ],
    },

    // digestive glands & secretions (FORMULA — process, includes the HARD)
    {
      kind: "formula" as const,
      slug: "digestive-glands-secretions",
      name: "Digestive glands and their secretions",
      intuition:
        "Food moves through the alimentary canal and is processed by glands along the way. " +
        "The stomach adds acid and pepsin; the pancreas adds a cocktail of enzymes AND alkali to neutralise the acid; the liver adds bile. " +
        "Knowing which gland does what explains the chain — and the HARD question about damaged acid-secreting cells.",
      definition:
        "The major digestive glands and what they secrete:\n" +
        "- **Stomach (gastric glands)** — hydrochloric acid (HCl) + pepsin. The acid activates pepsin and creates the acidic environment protein digestion needs.\n" +
        "- **Pancreas** — an alkaline juice carrying **lipase, amylase and protease**; the alkali **neutralises the acidic chyme** arriving from the stomach.\n" +
        "- **Liver / gallbladder** — produces and stores **bile**, which emulsifies fat (no enzymes).",
      authoredExample: {
        prompt:
          "Acid-secreting cells in a patient's stomach are damaged. Why is BOTH protein and carbohydrate digestion affected, not just one?",
        steps: [
          "Stomach acid (HCl) does two jobs.",
          "First, it activates pepsinogen into pepsin — without acid, protein digestion in the stomach stalls.",
          "Second, the strongly acidic environment also affects the action on starch begun by salivary amylase and the overall processing of food.",
          "So losing acid secretion harms both protein and carbohydrate digestion — a broader effect than 'protein only'.",
        ],
        answer: "Acid both activates pepsin (protein) and conditions carbohydrate digestion — so both are affected.",
      },
      selfCheckExample: {
        prompt:
          "The chyme leaving the stomach is strongly acidic, yet intestinal enzymes need an alkaline environment. Which secretion fixes this, and from which organ?",
        steps: [
          "The small intestine's enzymes (trypsin, lipase) work best in alkaline conditions.",
          "The pancreas releases an alkaline juice into the duodenum.",
          "This neutralises the acidic chyme so intestinal digestion can proceed.",
        ],
        answer: "Pancreatic juice (alkaline), from the pancreas, neutralises the acid.",
      },
      practiceSet: [
        { prompt: "What two things does the stomach secrete?", answer: "Hydrochloric acid (HCl) + pepsin" },
        { prompt: "What neutralises acidic chyme in the duodenum?", answer: "Pancreatic juice (alkaline)" },
        { prompt: "Name the three enzyme classes the pancreas secretes.", answer: "Lipase, amylase, protease" },
        { prompt: "Which organ makes bile?", answer: "Liver (stored in gallbladder)" },
      ],
      pyqExampleId: "61e34b98-4891-490b-b080-2d54c63914f2", // HARD — acid cells → protein + carb
      traps: [
        {
          title: "The pancreas is an enzyme factory, not a bile store",
          body:
            "A distractor credits the pancreas with storing bile or making surfactant. The pancreas secretes **digestive enzymes (lipase, amylase, protease) + alkali**. Bile is made by the liver; surfactant is in the lungs.",
        },
      ],
    },

    // ruminant stomach (REFERENCE, 1 q)
    {
      kind: "reference" as const,
      slug: "ruminant-stomach",
      name: "The ruminant (four-chambered) stomach",
      intuition:
        "Grazing animals — cattle, buffalo, goat, sheep — digest tough cellulose with a four-chambered stomach that ferments grass with the help of microbes. " +
        "The NDA asks the chamber count and names directly.",
      definition:
        "Ruminants (cattle, buffalo, goat, sheep) have a **four-chambered stomach**. In order: **rumen → reticulum → omasum → abomasum**. The abomasum is the 'true' stomach (acid + enzymes); the first three ferment cellulose with microbes. Food is regurgitated and re-chewed as 'cud'.",
      table: {
        columns: ["Chamber", "Role"],
        rows: [
          { cells: ["**Rumen**", "Largest; microbial fermentation of cellulose"] },
          { cells: ["**Reticulum**", "Forms the cud; traps foreign objects"] },
          { cells: ["**Omasum**", "Absorbs water and minerals"] },
          { cells: ["**Abomasum**", "The 'true' stomach — acid + enzymes"] },
        ],
      },
      practiceSet: [
        { prompt: "How many stomach chambers do cattle have?", answer: "Four" },
        { prompt: "Name the four chambers in order.", answer: "Rumen, reticulum, omasum, abomasum" },
        { prompt: "Which chamber is the 'true' stomach?", answer: "Abomasum" },
      ],
      pyqExampleId: "ff8392e0-bf9a-42fe-a0d1-f538955eb3af", // ruminant 4 chambers
    },
  ],
};
