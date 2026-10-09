import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CDR_GAMETES_NOTE: SubtopicNote = {
  subtopicName: "Gametogenesis and Fertilisation",
  title: "Making Sperm and Eggs, Fertilisation and the Early Embryo",
  oneLineDefinition:
    "Sperm and eggs are made by mitosis then meiosis in the testes and ovaries; fertilisation joins them into a diploid zygote that divides into an embryo.",
  whyItMatters:
    "The papers asked once, in 2017, which cells along the path to an egg are diploid. Spermatogenesis, fertilisation and early development have not been asked yet but are on the syllabus, and they reuse the ploidy rules of meiosis.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-cdr-spermatogenesis",
      name: "Spermatogenesis: the stages of sperm production in the testis",
      intuition:
        "A stock of stem cells keeps dividing by mitosis so the supply never runs out. Some of them grow, go through meiosis and become four small haploid cells, which then reshape into swimming sperm. The cell only becomes haploid at the end of meiosis I.",
      definition:
        "**Spermatogenesis** takes place in the **seminiferous tubules** of the testes, continuously from puberty.\n" +
        "- **Spermatogonia** (2n) divide by mitosis; some grow into **primary spermatocytes** (2n).\n" +
        "- Meiosis I gives two **secondary spermatocytes** (n); meiosis II gives four **spermatids** (n).\n" +
        "- Spermatids mature into **spermatozoa** without dividing.\n" +
        "- **Sertoli cells** nourish the developing sperm; **Leydig (interstitial) cells** between the tubules make **testosterone**.",
      table: {
        columns: ["Cell", "Ploidy", "Made by"],
        rows: [
          { cells: ["Spermatogonium", "Diploid (2n)", "Mitosis of germ cells"] },
          { cells: ["Primary spermatocyte", "Diploid (2n), DNA copied", "Growth of a spermatogonium"] },
          { cells: ["Secondary spermatocyte", "Haploid (n), two chromatids per chromosome", "Meiosis I (2 per primary)"] },
          { cells: ["Spermatid", "Haploid (n)", "Meiosis II (4 per primary)"] },
          { cells: ["Spermatozoon", "Haploid (n)", "Differentiation of a spermatid, no division"] },
        ],
      },
      selfCheckExample: {
        prompt: "In human spermatogenesis, which is the first cell to be haploid?",
        options: ["Spermatogonium", "Primary spermatocyte", "Secondary spermatocyte", "Spermatid", "Spermatozoon"],
        steps: [
          "Meiosis I halves the chromosome number, and its products are the secondary spermatocytes.",
          "Spermatogonia and primary spermatocytes come before meiosis I, so they are diploid.",
          "Spermatids and spermatozoa are haploid too, but they come later, so they are not the first.",
        ],
        answer: "(C) Secondary spermatocyte",
      },
      practiceSet: [
        { prompt: "How many spermatids come from one primary spermatocyte?", answer: "Four" },
        { prompt: "Which cells in the testis make testosterone?", answer: "Leydig (interstitial) cells" },
        { prompt: "By what kind of division do spermatogonia multiply?", answer: "Mitosis" },
      ],
      traps: [
        {
          title: "Sperm are made by meiosis, not mitosis",
          body: "Mitosis only builds up the stock of diploid spermatogonia. The step that makes haploid cells is meiosis. Saying sperm are formed by mitosis is wrong in animals (in plants it is different: see life cycles).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-cdr-oogenesis",
      name: "Oogenesis: egg production and its pauses",
      intuition:
        "Egg making starts before birth and then waits, sometimes for decades. Each division of the cytoplasm is unequal: almost all of it goes to one cell, so the future egg keeps the food store, and the small leftover cells (polar bodies) die. One primary oocyte gives only one egg.",
      definition:
        "**Oogenesis** takes place in the ovaries.\n" +
        "- Before birth, **oogonia** (2n) multiply by mitosis and grow into **primary oocytes** (2n), which start meiosis I and **stop in prophase I**.\n" +
        "- From puberty, in each cycle usually one primary oocyte completes meiosis I, giving a large **secondary oocyte** (n) and a small **first polar body**.\n" +
        "- The secondary oocyte **stops in metaphase II** and is released at **ovulation**.\n" +
        "- Meiosis II is completed only if a sperm enters, giving the **ovum** (n) and a **second polar body**.\n" +
        "- The cells of the ovary's germinal epithelium and follicles are ordinary diploid body cells.",
      table: {
        columns: ["Cell", "Ploidy", "When"],
        rows: [
          { cells: ["Oogonium", "Diploid (2n)", "Multiplies by mitosis before birth"] },
          { cells: ["Primary oocyte", "Diploid (2n), DNA copied", "Formed before birth; paused in prophase I until puberty"] },
          { cells: ["Secondary oocyte", "Haploid (n), two chromatids per chromosome", "Made by meiosis I; paused in metaphase II; ovulated"] },
          { cells: ["Polar bodies", "Haploid (n)", "Small cells from each unequal division; they degenerate"] },
          { cells: ["Ovum", "Haploid (n)", "Completed only after a sperm enters"] },
        ],
      },
      selfCheckExample: {
        prompt: "What does a human ovary release at ovulation?",
        options: [
          "A primary oocyte paused in prophase I",
          "A secondary oocyte paused in metaphase II",
          "A mature ovum that has finished meiosis",
          "An oogonium",
          "A diploid secondary oocyte",
        ],
        steps: [
          "Just before ovulation the primary oocyte finishes meiosis I, giving a haploid secondary oocyte.",
          "That cell pauses in metaphase II and is released; it finishes meiosis only if fertilised.",
          "A describes the cell before ovulation; C is wrong because meiosis II is not yet complete; D is a cell from before birth; E is wrong because the secondary oocyte is haploid.",
        ],
        answer: "(B) A secondary oocyte paused in metaphase II",
      },
      practiceSet: [
        { prompt: "How many functional eggs come from one primary oocyte?", answer: "One" },
        { prompt: "Is a primary oocyte haploid or diploid?", answer: "Diploid" },
        { prompt: "At which stage is a primary oocyte paused from before birth until puberty?", answer: "Prophase I" },
        { prompt: "Why is the cytoplasm divided unequally in oogenesis?", answer: "So that one cell, the egg, keeps the food and organelles for the early embryo" },
      ],
      traps: [
        {
          title: "Spermatogenesis gives four gametes, oogenesis gives one",
          body: "One primary spermatocyte gives four sperm. One primary oocyte gives one egg plus polar bodies, because the cytoplasm is divided unequally. Both still go through the same two meiotic divisions.",
        },
        {
          title: "The secondary oocyte is already haploid",
          body: "The halving happens in meiosis I, so the secondary oocyte is haploid even though meiosis is not finished. Only the oogonia and primary oocytes (and the body cells of the ovary) are diploid.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-cdr-fertilisation-development",
      name: "Fertilisation and early development of the human embryo",
      intuition:
        "Fertilisation joins two haploid sets into one diploid cell, and lets in only one sperm. The zygote then divides fast by mitosis without growing, so its cells get smaller. A hollow ball forms, sinks into the uterus wall, and its cells start to sort into three layers that build every organ.",
      definition:
        "**Fertilisation** usually happens in the **oviduct** (Fallopian tube).\n" +
        "- The **acrosome** at the sperm's tip releases enzymes that digest a path through the layers round the egg (the **zona pellucida**).\n" +
        "- After one sperm enters, the **cortical reaction** hardens the zona and blocks other sperm (**polyspermy**).\n" +
        "- The egg finishes meiosis II; the two haploid nuclei join to give a diploid **zygote**. The sperm (X or Y) decides the sex.\n" +
        "- **Cleavage**: fast mitosis, no growth, giving a solid **morula** then a hollow **blastocyst** (inner cell mass plus an outer **trophoblast**, which helps form the placenta). It **implants** in the endometrium about a week after fertilisation.\n" +
        "- **Gastrulation** forms the three **germ layers**.\n" +
        "- **Identical twins** come from one zygote that splits; **non-identical twins** from two eggs fertilised by two sperm.",
      table: {
        columns: ["Germ layer", "Position", "Gives rise to"],
        rows: [
          { cells: ["Ectoderm", "Outer", "Epidermis of the skin, hair, nervous system (brain, spinal cord, nerves)"] },
          { cells: ["Mesoderm", "Middle", "Muscle, bone, heart, blood and vessels, kidneys, gonads"] },
          { cells: ["Endoderm", "Inner", "Lining of the gut and airways, liver, pancreas"] },
        ],
      },
      selfCheckExample: {
        prompt: "From which layer of the early embryo does the human brain develop?",
        options: ["Endoderm", "Mesoderm", "Trophoblast", "Placenta", "Ectoderm"],
        steps: [
          "The nervous system, including the brain and spinal cord, forms from the ectoderm (the neural tube folds in from it).",
          "Endoderm gives the gut lining; mesoderm gives muscle, bone and blood.",
          "The trophoblast and placenta are support tissues outside the embryo itself.",
        ],
        answer: "(E) Ectoderm",
      },
      practiceSet: [
        { prompt: "Where in the female body does fertilisation usually happen?", answer: "In the oviduct (Fallopian tube)" },
        { prompt: "What stops more than one sperm entering the egg?", answer: "The cortical reaction, which hardens the zona pellucida" },
        { prompt: "Which germ layer forms the heart and blood?", answer: "Mesoderm" },
        { prompt: "Do cells get bigger or smaller during cleavage?", answer: "Smaller: they divide without growing" },
      ],
      traps: [
        {
          title: "Identical twins share one zygote",
          body: "Identical twins come from one fertilised egg that splits early, so they have the same genes. Non-identical twins come from two eggs and two sperm, so they are no more alike than other siblings.",
        },
      ],
    },
  ],
};
