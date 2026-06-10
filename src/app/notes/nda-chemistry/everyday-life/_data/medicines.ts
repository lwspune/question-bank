import type { SubtopicNote } from "@/app/notes/_types";

export const MEDICINES_NOTE: SubtopicNote = {
  subtopicName: "Medicines and Health Chemistry",
  title: "Medicines and Health Chemistry",
  oneLineDefinition:
    "The drug classes the NDA names by their job — antacid, analgesic, antibiotic, antiseptic versus disinfectant — plus the calcium compound in tooth enamel and the radioisotope used to treat cancer.",
  whyItMatters:
    "The smaller subtopic — about three PYQs, all EASY/MODERATE, each a single recall fact: which medicine class treats a complaint, what tooth enamel is made of, which radioisotope treats cancer. " +
    "The classic traps live here: antiseptic versus disinfectant (skin versus surfaces) and analgesic versus antipyretic (pain versus fever). Learn the class↔use table.",
  concepts: [
    // Drug classes by use — antacid is the tagged PYQ; carries the antiseptic/disinfectant trap
    {
      kind: "reference" as const,
      slug: "drug-classes",
      name: "Drug classes by their job",
      intuition:
        "Each medicine class is named by what it does — relieves acidity, kills pain, kills bacteria, prevents infection. The bank asks 'which type of medicine treats X?'. Learn the class↔use pairs and keep the look-alike classes apart.",
      definition:
        "The high-frequency drug classes:\n" +
        "- **Antacid** — neutralises excess stomach acid; treats **indigestion / acidity** (e.g. milk of magnesia, sodium bicarbonate).\n" +
        "- **Analgesic** — relieves **pain** (e.g. aspirin, paracetamol).\n" +
        "- **Antipyretic** — reduces **fever** (e.g. paracetamol). (Paracetamol is both analgesic and antipyretic.)\n" +
        "- **Antibiotic** — kills or stops **bacteria** (e.g. penicillin). Does not work on viruses.\n" +
        "- **Antiseptic** — kills microbes on **living tissue / skin** (e.g. Dettol, tincture of iodine).\n" +
        "- **Disinfectant** — kills microbes on **non-living surfaces / floors** (e.g. phenol, chlorine). Too harsh for skin.\n" +
        "- **Antihistamine** — relieves **allergy** symptoms.",
      table: {
        columns: ["Class", "Job", "Example"],
        rows: [
          {
            cells: ["Antacid", "Treats indigestion / acidity", "Milk of magnesia, NaHCO₃"],
            pyqExampleId: "6f8e5c6b-6e48-41c8-8e7a-2e19852f627e",
            noteAmber: "Antacid is the answer for indigestion — it neutralises excess stomach acid.",
          },
          { cells: ["Analgesic", "Relieves pain", "Aspirin, paracetamol"] },
          { cells: ["Antipyretic", "Reduces fever", "Paracetamol"] },
          { cells: ["Antibiotic", "Kills bacteria", "Penicillin"] },
          {
            cells: ["Antiseptic", "Kills microbes on living skin/tissue", "Dettol, tincture of iodine"],
            noteAmber: "Antiseptic is for the BODY (cuts, skin). Disinfectant is for SURFACES (floors). Same idea, different place.",
          },
          { cells: ["Disinfectant", "Kills microbes on non-living surfaces", "Phenol, chlorine, bleach"] },
        ],
      },
      pyqExampleId: "6f8e5c6b-6e48-41c8-8e7a-2e19852f627e",
      practiceSet: [
        { prompt: "Which type of medicine is used to treat indigestion?", answer: "Antacid" },
        { prompt: "Which class of drug relieves pain?", answer: "Analgesic" },
        { prompt: "Which class of drug reduces fever?", answer: "Antipyretic" },
        { prompt: "Which medicine is applied to a cut on the skin to prevent infection?", answer: "Antiseptic" },
        { prompt: "Which chemical is used to clean floors and toilets to kill germs?", answer: "Disinfectant" },
      ],
      traps: [
        {
          title: "Antiseptic (skin) versus disinfectant (surfaces)",
          body:
            "Both kill microbes, but an antiseptic is mild enough for living tissue (applied to skin, cuts), while a disinfectant is harsher and used on non-living surfaces (floors, instruments). Tincture of iodine and Dettol are antiseptics; phenol and bleach are disinfectants.",
        },
        {
          title: "Analgesic (pain) versus antipyretic (fever)",
          body:
            "An analgesic relieves pain; an antipyretic reduces fever. Paracetamol happens to do both, but the class names mean different jobs — match the name to the symptom in the question.",
        },
        {
          title: "Antacid treats acidity, not infection",
          body:
            "An antacid neutralises stomach acid (indigestion). It is not an antibiotic or antiseptic. The cue word 'indigestion / acidity' points to antacid.",
        },
      ],
    },

    // Radioisotopes / elements in medicine — cobalt for cancer
    {
      kind: "reference" as const,
      slug: "radioisotopes-in-medicine",
      name: "Radioisotopes and elements in medicine",
      intuition:
        "Some elements' radioactive isotopes are used to diagnose or treat disease. The bank's recurring fact is the isotope used to treat cancer — cobalt-60, whose gamma rays destroy tumour cells.",
      definition:
        "The medical-isotope recall facts:\n" +
        "- **Cobalt-60 (Co-60)** — its gamma radiation is used in **radiotherapy to treat cancer** ('cobalt therapy').\n" +
        "- **Iodine-131 (I-131)** — used to diagnose and treat **thyroid** disorders.\n" +
        "- **Sodium-24 (Na-24)** — used to study **blood circulation**.\n" +
        "- **Phosphorus-32 (P-32)** — used in treating some blood disorders.",
      table: {
        columns: ["Isotope", "Medical use"],
        rows: [
          {
            cells: ["Cobalt-60", "Radiotherapy for cancer (gamma rays)"],
            pyqExampleId: "52662a27-b7c6-42de-8932-c5696e4a6250",
            noteAmber: "Cobalt-60 is the cancer-treatment isotope the bank asks for ('cobalt therapy').",
          },
          { cells: ["Iodine-131", "Thyroid diagnosis and treatment"] },
          { cells: ["Sodium-24", "Tracing blood circulation"] },
          { cells: ["Phosphorus-32", "Treating certain blood disorders"] },
        ],
      },
      pyqExampleId: "52662a27-b7c6-42de-8932-c5696e4a6250",
      practiceSet: [
        { prompt: "Which element's isotope is used in the treatment of cancer?", answer: "Cobalt (cobalt-60)" },
        { prompt: "Which radioisotope is used for thyroid disorders?", answer: "Iodine-131" },
        { prompt: "Which radioisotope is used to study blood circulation?", answer: "Sodium-24" },
      ],
      traps: [
        {
          title: "Cobalt-60 treats cancer; iodine-131 treats the thyroid",
          body:
            "Cobalt-60 is for cancer radiotherapy. Iodine-131 is for the thyroid. The bank pairs the wrong organ with the isotope as a distractor.",
        },
      ],
    },

    // Body chemistry — tooth enamel = calcium phosphate
    {
      kind: "reference" as const,
      slug: "body-chemistry",
      name: "Chemistry of the body — bones and teeth",
      intuition:
        "A few facts about the chemicals that make up the body. The bank's recurring one is what tooth enamel is made of — a calcium phosphate (hydroxyapatite), the hardest substance in the body.",
      definition:
        "The body-chemistry recall facts:\n" +
        "- **Tooth enamel** is made of **calcium phosphate** (hydroxyapatite) — the hardest tissue in the human body.\n" +
        "- **Bones** are also mainly **calcium phosphate**, with some calcium carbonate.\n" +
        "- Acids dissolve calcium phosphate, which is why acidic food and bacterial acid cause **tooth decay** — fluoride toothpaste forms acid-resistant fluorapatite.",
      table: {
        columns: ["Body part", "Main chemical"],
        rows: [
          {
            cells: ["Tooth enamel", "Calcium phosphate (hydroxyapatite)"],
            pyqExampleId: "94877ab4-dcb1-4e68-91e1-0f9188692ac1",
            noteAmber: "Tooth enamel = calcium phosphate. Not calcium carbonate or calcium chloride.",
          },
          { cells: ["Bones", "Calcium phosphate (with some carbonate)"] },
        ],
      },
      pyqExampleId: "94877ab4-dcb1-4e68-91e1-0f9188692ac1",
      practiceSet: [
        { prompt: "Tooth enamel is made of which calcium compound?", answer: "Calcium phosphate (hydroxyapatite)" },
        { prompt: "Bones are made mainly of which calcium compound?", answer: "Calcium phosphate" },
      ],
      traps: [
        {
          title: "Tooth enamel is calcium phosphate, not calcium carbonate",
          body:
            "Enamel and bone are mainly calcium PHOSPHATE (hydroxyapatite). Calcium carbonate (chalk, eggshell) is the distractor — do not pick it for tooth enamel.",
        },
      ],
    },
  ],
};
