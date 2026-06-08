import type { SubtopicNote } from "@/app/notes/_types";

export const TISSUES_NOTE: SubtopicNote = {
  subtopicName: "Connective and Epithelial Tissues",
  title: "Body Tissues — the Building Blocks",
  oneLineDefinition:
    "A tissue is a group of similar cells doing one job; the body builds every organ from four tissue types — epithelial (covering), connective (support), muscle (movement), and nervous (signalling).",
  whyItMatters:
    "Start here — every organ system later in the chapter is made of these tissues, so the NDA tests them directly (8 PYQs). " +
    "The connective-tissue family is the highest-yield cluster: blood, cartilage, bone, tendon and ligament are all connective, and the bank loves to swap tendon with ligament or ask where cartilage is NOT found. " +
    "All EASY or MODERATE — pure recall.",
  concepts: [
    // Foundation — levels of organization (no PYQ)
    {
      kind: "formula" as const,
      slug: "levels-of-organization",
      name: "Levels of organization — cells to organ systems",
      intuition:
        "The body is built in a hierarchy. Similar cells group into a tissue; different tissues combine into an organ; organs that share a job form an organ system. " +
        "Knowing the ladder tells you what KIND of thing each exam term is — 'epithelium' is a tissue, 'stomach' is an organ, 'digestive system' is an organ system.",
      definition:
        "The structural hierarchy of the body, smallest to largest:\n" +
        "- **Cell** — the basic unit of life.\n" +
        "- **Tissue** — a group of similar cells performing a common function (four types: epithelial, connective, muscle, nervous).\n" +
        "- **Organ** — different tissues working together (heart, stomach, kidney).\n" +
        "- **Organ system** — organs sharing one overall job (circulatory, digestive, excretory).",
      authoredExample: {
        prompt:
          "Place these in order from smallest to largest unit: stomach, digestive system, muscle tissue, a single gland cell.",
        steps: [
          "A single gland cell is one cell — the smallest unit.",
          "Muscle tissue is a group of similar cells — one level up.",
          "The stomach is an organ — built from several tissues (muscle, epithelial, connective, nervous).",
          "The digestive system is an organ system — the stomach plus mouth, intestine, pancreas, etc.",
        ],
        answer: "Gland cell → muscle tissue → stomach → digestive system.",
      },
    },

    // four tissue types (REFERENCE)
    {
      kind: "reference" as const,
      slug: "four-tissue-types",
      name: "The four types of animal tissue",
      intuition:
        "Every tissue in the human body is one of four kinds. Each has a signature job: epithelium covers and lines, connective tissue supports and binds, muscle contracts, and nervous tissue carries signals. " +
        "Most NDA tissue questions just ask 'which type is this?' — so learn the one-line job of each.",
      definition:
        "Four primary animal tissues, classified by function. Note the surprises the bank tests: **blood is a connective tissue** (fluid matrix), and the **contractile proteins actin and myosin are found only in muscle tissue**.",
      table: {
        columns: ["Tissue type", "Function", "Examples"],
        rows: [
          {
            cells: [
              "**Epithelial**",
              "Covering and lining of surfaces; protection, absorption, secretion",
              "Skin surface, lining of mouth, oesophagus, intestine, glands",
            ],
          },
          {
            cells: [
              "**Connective**",
              "Support, binding, transport; cells in a matrix",
              "Blood, bone, cartilage, tendon, ligament, adipose (fat)",
            ],
            noteAmber:
              "Blood is a CONNECTIVE tissue — fluid matrix (plasma) with cells (RBC, WBC, platelets) suspended in it.",
          },
          {
            cells: [
              "**Muscle**",
              "Contraction and movement; contains actin + myosin",
              "Skeletal, smooth, cardiac muscle",
            ],
          },
          {
            cells: [
              "**Nervous**",
              "Conducting electrical signals",
              "Neurons (brain, spinal cord, nerves)",
            ],
          },
        ],
        caption:
          "The 'odd one out' answers the bank tests: blood = connective, not a fluid of its own category; contractile proteins = muscle only.",
      },
      selfCheckExample: {
        prompt:
          "Classify each into a tissue type: (a) blood, (b) the lining of your intestine, (c) the biceps, (d) a nerve carrying touch signals.",
        steps: [
          "Blood — cells in a fluid matrix → connective tissue.",
          "Intestinal lining — a covering surface → epithelial tissue.",
          "Biceps — contracts to move the arm → muscle tissue.",
          "A signal-carrying nerve → nervous tissue.",
        ],
        answer: "(a) connective, (b) epithelial, (c) muscle, (d) nervous.",
      },
      practiceSet: [
        { prompt: "Which tissue type is blood?", answer: "Connective tissue", method: "fluid matrix (plasma) + suspended cells" },
        { prompt: "Which tissue type contains contractile proteins?", answer: "Muscle tissue", method: "actin + myosin" },
        { prompt: "What tissue lines the inside of the intestine?", answer: "Epithelial tissue" },
        { prompt: "Which tissue type carries electrical signals?", answer: "Nervous tissue" },
      ],
      pyqExampleId: "5d213815-7c3d-4cd0-a2fb-85218504c1de", // blood = connective tissue
      traps: [
        {
          title: "Blood is connective tissue, not 'a fluid' of its own",
          body:
            "A classic distractor lists blood as epithelial, muscular or nervous. It is **connective** — defined by cells suspended in a non-living matrix, which for blood is the plasma. Bone and cartilage are connective for the same reason.",
        },
      ],
    },

    // connective tissue family (REFERENCE) — tendon/ligament/cartilage/blood
    {
      kind: "reference" as const,
      slug: "connective-tissue-family",
      name: "The connective-tissue family — tendon, ligament, cartilage, bone",
      intuition:
        "Connective tissue is the body's support department, and the NDA mines it for recall questions. " +
        "Two facts carry most marks: tendon connects MUSCLE to BONE while ligament connects BONE to BONE, and cartilage appears in specific named places (nose, ear, larynx, trachea, knee) but NOT in others. " +
        "Get the tendon/ligament direction right and the cartilage locations memorised and this cluster is free.",
      definition:
        "Members of the connective-tissue family and the facts the bank tests:\n" +
        "- **Tendon** — connects **muscle to bone**; made of tightly packed **collagen** fibres (high tensile strength).\n" +
        "- **Ligament** — connects **bone to bone** at a joint; more elastic than tendon.\n" +
        "- **Cartilage** — flexible support; found in the **nose, ear (pinna), larynx, trachea, and joints (knee)**. NOT in the urinary bladder (smooth muscle) and NOT in the **bronchioles** (only the larger bronchi have cartilage).\n" +
        "- **Bone** — rigid calcified connective tissue; the skeleton.\n" +
        "- **Blood** — fluid connective tissue (plasma + cells).",
      table: {
        columns: ["Tissue", "Connects / role", "Key fact"],
        rows: [
          { cells: ["**Tendon**", "Muscle to bone", "Made of collagen; high tensile strength"] },
          { cells: ["**Ligament**", "Bone to bone", "Elastic; holds joints together"] },
          {
            cells: ["**Cartilage**", "Flexible support", "In nose, ear, larynx, trachea, knee"],
            noteAmber: "NOT in the urinary bladder or the bronchioles.",
          },
          { cells: ["**Bone**", "Rigid framework", "Calcified; the skeleton"] },
          { cells: ["**Blood**", "Transport", "Fluid matrix (plasma) + cells"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A sprinter tears the tissue joining her shin bone to her thigh bone at the knee, and separately strains the tissue joining her calf muscle to her heel bone. Name each tissue.",
        steps: [
          "Bone-to-bone at a joint → ligament.",
          "Muscle-to-bone → tendon.",
          "Both are connective tissues; the direction of connection is what names them.",
        ],
        answer: "Bone-to-bone = ligament; muscle-to-bone = tendon.",
      },
      practiceSet: [
        { prompt: "Tendons connect ___ to ___.", answer: "Muscle to bone", method: "made of collagen" },
        { prompt: "Ligaments connect ___ to ___.", answer: "Bone to bone" },
        { prompt: "Name three places cartilage is found.", answer: "Nose, ear (pinna), larynx / trachea / knee joint" },
        { prompt: "Is cartilage found in the urinary bladder?", answer: "No", method: "bladder is smooth muscle + transitional epithelium" },
      ],
      pyqExampleId: "86b7f742-7670-4514-a972-8a749101150e", // ligaments connect bone-bone
      traps: [
        {
          title: "Tendon ↔ ligament — the direction is the answer",
          body:
            "Tendon = **muscle to bone** (think: 'Tendon Tugs the muscle'). Ligament = **bone to bone**. The bank swaps these constantly; if you only remember one, remember tendon = collagen, muscle-to-bone.",
        },
        {
          title: "'Cartilage is NOT found in ___' — know the exceptions",
          body:
            "Cartilage IS in the nose, ear, larynx, trachea and joints. It is NOT in the **urinary bladder** (2020) or the **bronchioles** (2024) — the small airways lose their cartilage even though the larger bronchi keep it.",
        },
      ],
    },

    // epithelium and skin (REFERENCE)
    {
      kind: "reference" as const,
      slug: "epithelium-and-skin",
      name: "Epithelium and skin",
      intuition:
        "Epithelial tissue covers the body and lines its tubes and cavities. It is named by cell shape — squamous (flat, scale-like), cuboidal (cube), columnar (tall). " +
        "The skin is the body's largest epithelial organ, and its pigment melanin is a recall favourite: it blocks ultraviolet radiation.",
      definition:
        "Epithelial types by cell shape, plus the skin's UV defence:\n" +
        "- **Squamous** — flat, scale-like cells; line surfaces where smooth flow or thin diffusion is needed (oesophagus, alveoli, blood vessels).\n" +
        "- **Cuboidal / Columnar** — cube-shaped / tall cells; line glands and the intestine (absorption, secretion).\n" +
        "- **Melanin** — the brown skin/hair/iris pigment; it absorbs **ultraviolet (UV) radiation**, protecting cells from UV-induced DNA damage.",
      table: {
        columns: ["Feature", "Detail"],
        rows: [
          { cells: ["Squamous epithelium", "Flat cells; lines the **oesophagus**, alveoli, blood vessels"] },
          { cells: ["Columnar epithelium", "Tall cells; lines the intestine and stomach (absorption/secretion)"] },
          { cells: ["Skin pigment", "**Melanin** — gives colour to skin, hair, iris"] },
          {
            cells: ["Melanin's role", "Absorbs **ultraviolet (UV)** radiation — not infrared, X-ray or radio"],
            noteAmber: "NDA 2017 — melanin protects against ULTRAVIOLET radiation specifically.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Why does the oesophagus have flat squamous cells lining it, and what pigment protects skin from sun damage?",
        steps: [
          "The oesophagus carries swallowed food — a smooth, abrasion-resistant flat lining suits it → squamous epithelium.",
          "Sun damage is caused by ultraviolet rays.",
          "Melanin absorbs UV radiation, shielding the deeper skin cells.",
        ],
        answer: "Squamous epithelium lines the oesophagus; melanin protects against UV.",
      },
      practiceSet: [
        { prompt: "Which epithelium lines the oesophagus?", answer: "Squamous epithelium", method: "flat, scale-like cells" },
        { prompt: "Melanin protects the skin against which radiation?", answer: "Ultraviolet (UV)" },
        { prompt: "Melanin gives colour to which three structures?", answer: "Skin, hair, iris" },
      ],
      pyqExampleId: "cb7c159e-e919-4827-a4fe-10579dfc8537", // squamous → oesophagus
      traps: [
        {
          title: "Melanin blocks UV, not infrared or X-rays",
          body:
            "The distractors offer infrared, X-ray and radio radiation. Melanin's job is specifically **ultraviolet** absorption — the band of sunlight that damages DNA and causes sunburn.",
        },
      ],
    },
  ],
};
