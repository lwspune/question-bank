import type { SubtopicNote } from "@/app/notes/_types";

export const PLANT_PHOTOSYNTHESIS_NOTE: SubtopicNote = {
  subtopicName: "Photosynthesis",
  title: "Photosynthesis",
  oneLineDefinition:
    "Photosynthesis is how green plants use light, water and CO₂ to make glucose and release oxygen; the light reaction splits water (giving the O₂) and the dark reaction fixes CO₂ into sugar.",
  whyItMatters:
    "10 PYQs — a mix of mechanism questions (what splits, what's a product) and crop/botany recall. " +
    "The mechanism core is small but reliably tested: the oxygen released comes from SPLITTING WATER, not CO₂; O₂ is a PRODUCT not a requirement; and chlorophyll reflects green (so leaves look green) while absorbing red and blue. " +
    "A cluster of crop facts (golden rice, sugarcane, intercropping) and one odd botany fact (nettle sting) round it out.",
  concepts: [
    // OVERVIEW — requirements, equation, products (features O2-NOT-requirement)
    {
      kind: "formula" as const,
      slug: "photosynthesis-overview",
      name: "Photosynthesis — requirements, equation and products",
      intuition:
        "Think of a leaf as a tiny solar food factory. It needs four things to run: a pigment to catch the light (chlorophyll), a carbon source (CO₂), a hydrogen source (water), and the energy itself (light). " +
        "Feed it those and it makes glucose and gives off oxygen. The oxygen is OUTPUT — never list it as an input.",
      definition:
        "Photosynthesis converts light energy into chemical energy stored in glucose. The four **requirements** are **chlorophyll, carbon dioxide, water, and light**. The **products** are **glucose and oxygen**. " +
        "Only about **1%** of the sunlight falling on leaves is actually captured for photosynthesis.",
      formula: {
        label: "Overall photosynthesis equation",
        latex: "6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{light, chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2",
        symbols: [
          { symbol: "\\text{CO}_2", meaning: "carbon dioxide — the carbon source (a requirement)" },
          { symbol: "\\text{H}_2\\text{O}", meaning: "water — the hydrogen source (a requirement)" },
          { symbol: "\\text{C}_6\\text{H}_{12}\\text{O}_6", meaning: "glucose — the food made (a product)" },
          { symbol: "\\text{O}_2", meaning: "oxygen — released (a PRODUCT, never a requirement)" },
        ],
      },
      visualizationSlug: "plant-photosynthesis-flow",
      authoredExample: {
        prompt:
          "From this list — chlorophyll, oxygen, carbon dioxide, water — which one is NOT needed to RUN photosynthesis?",
        steps: [
          "Chlorophyll catches the light — a requirement.",
          "Carbon dioxide is the carbon source — a requirement.",
          "Water is the hydrogen source (and gets split) — a requirement.",
          "Oxygen is RELEASED by the reaction — it is a product, not a requirement.",
        ],
        answer: "Oxygen — it is a product of photosynthesis, not a requirement.",
      },
      selfCheckExample: {
        prompt:
          "Name the two products of photosynthesis and the gaseous one among them.",
        steps: [
          "The reaction stores energy as glucose and gives off a gas.",
          "Products = glucose + oxygen.",
          "The gaseous product is oxygen.",
        ],
        answer: "Glucose and oxygen; oxygen is the gaseous product.",
      },
      practiceSet: [
        { prompt: "List the four requirements of photosynthesis.", answer: "Chlorophyll, CO₂, water, light" },
        { prompt: "Is oxygen a requirement or a product of photosynthesis?", answer: "A product" },
        { prompt: "Roughly what % of incident sunlight do green plants use for photosynthesis?", answer: "About 1%" },
        { prompt: "Name the food (sugar) made in photosynthesis.", answer: "Glucose (C₆H₁₂O₆)" },
      ],
      pyqExampleId: "176efa48-4854-4a78-8306-01183dcb33e8", // O2 not a requirement
      traps: [
        {
          title: "Oxygen is a PRODUCT, not a requirement",
          body:
            "The 'which is NOT a requirement' question is a classic. Chlorophyll, CO₂ and water are all needed; **oxygen is released**, so it is the odd one out. Don't confuse the inputs with the outputs.",
        },
        {
          title: "Only ~1% of sunlight is used",
          body:
            "Green plants capture only about **1%** of the solar radiation that hits them — distractors offer 5%, 8%, 10%. Most light is reflected or turned to heat.",
        },
      ],
    },

    // LIGHT REACTION — water splitting gives the O2 (features oxygen-from-water)
    {
      kind: "formula" as const,
      slug: "photosynthesis-light-reaction",
      name: "The light reaction — splitting water releases oxygen",
      intuition:
        "Photosynthesis runs in two stages. The light reaction comes first: light energy is used to SPLIT water molecules. That splitting (photolysis) is where the released oxygen comes from — NOT from carbon dioxide. " +
        "The dark reaction then uses CO₂ to build sugar, with no light needed directly.",
      definition:
        "The **light reaction** (light-dependent) uses light energy to **split water (photolysis)** into hydrogen ions, electrons and **oxygen** — so the **oxygen evolved comes from water, not CO₂**. " +
        "The **dark reaction** (Calvin cycle) then fixes CO₂ into glucose using the products of the light reaction.",
      formula: {
        label: "Photolysis of water (the source of O₂)",
        latex: "2\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{light}} 4\\text{H}^+ + 4e^- + \\text{O}_2",
        symbols: [
          { symbol: "\\text{H}_2\\text{O}", meaning: "water — the molecule that is split" },
          { symbol: "\\text{O}_2", meaning: "oxygen released — sourced from water, not CO₂" },
        ],
      },
      authoredExample: {
        prompt:
          "A student is told the oxygen released in photosynthesis is labelled with a special atom. Should they label the carbon dioxide or the water to track where the released oxygen comes from?",
        steps: [
          "The oxygen released comes from the splitting of water (photolysis), not from CO₂.",
          "To track the released oxygen, label the **water**.",
        ],
        answer: "Label the water — the released oxygen comes from splitting water.",
      },
      selfCheckExample: {
        prompt:
          "Which statement about the light reaction is correct: 'light directly splits water with no help' or 'water is split during the light-dependent reaction'?",
        steps: [
          "Water is split during the light-dependent (light) reaction via photolysis.",
          "It is the water-splitting reaction itself, driven by the light reaction's machinery — described as 'water molecule splits into hydrogen and oxygen'.",
        ],
        answer: "'Water is split during the light reaction' — it splits into hydrogen and oxygen.",
      },
      practiceSet: [
        { prompt: "The oxygen released in photosynthesis comes from splitting what?", answer: "Water (H₂O)", method: "photolysis in the light reaction" },
        { prompt: "Which reaction splits water — light or dark?", answer: "The light reaction" },
        { prompt: "Does the dark reaction need light directly?", answer: "No", method: "it uses the products of the light reaction" },
      ],
      pyqExampleId: "f8ca5491-319c-477a-9419-6a8b5294376a", // oxygen comes from splitting water
      traps: [
        {
          title: "Released O₂ comes from WATER, not CO₂",
          body:
            "A favourite trap offers 'carbon dioxide' as the source of the oxygen. The oxygen evolved comes from **splitting water (photolysis)**. CO₂ is reduced to sugar in the dark reaction — its oxygen is not the gas released.",
        },
        {
          title: "Water splits in the LIGHT reaction",
          body:
            "The correct statement is 'water molecule splits into hydrogen and oxygen'. The misleading distractor 'light energy is directly used to split water' overstates it — water splitting happens within the light-dependent machinery, not by light acting alone.",
        },
      ],
    },

    // CHLOROPHYLL & LIGHT ABSORPTION (features green-leaf PYQ)
    {
      kind: "formula" as const,
      slug: "photosynthesis-chlorophyll-light",
      name: "Chlorophyll and why leaves look green",
      intuition:
        "Chlorophyll is choosy about light. It grabs the red and blue parts of sunlight to power photosynthesis but bounces the green part back. " +
        "Your eye sees that reflected green light — which is exactly why leaves look green.",
      definition:
        "**Chlorophyll absorbs mainly red (~680 nm) and blue (~430 nm) light** and **reflects green light**. Because the reflected light reaching your eye is green, **leaves appear green**. " +
        "The absorbed red and blue wavelengths supply the energy for photosynthesis.",
      authoredExample: {
        prompt:
          "If chlorophyll absorbs red and blue light strongly, what colour does it reflect, and how does that explain leaf colour?",
        steps: [
          "Chlorophyll absorbs the red and blue wavelengths for photosynthesis.",
          "It reflects the green wavelengths instead of absorbing them.",
          "The reflected green light reaches our eyes, so leaves look green.",
        ],
        answer: "It reflects green light, which is why leaves appear green.",
      },
      selfCheckExample: {
        prompt:
          "A plant is lit with pure green light only. Would you expect photosynthesis to be efficient? Why?",
        steps: [
          "Chlorophyll mostly reflects green light rather than absorbing it.",
          "With only green light, little energy is absorbed, so photosynthesis is inefficient.",
        ],
        answer: "No — chlorophyll reflects green, so green light is poorly used.",
      },
      practiceSet: [
        { prompt: "Which two colours of light does chlorophyll absorb most?", answer: "Red and blue" },
        { prompt: "Which colour does chlorophyll reflect?", answer: "Green" },
        { prompt: "Why do leaves appear green?", answer: "Chlorophyll reflects green light to our eyes" },
      ],
      pyqExampleId: "e0ca060d-0179-4255-8902-920dd543128c", // leaves green: absorb red+blue, reflect green
      traps: [
        {
          title: "Leaves look green because chlorophyll REFLECTS green",
          body:
            "A reversed distractor says chlorophyll 'absorbs green'. It is the opposite — chlorophyll **absorbs red and blue** and **reflects green**, and we see that reflected green.",
        },
      ],
    },

    // MERISTEM ACTIVITY (05987f1b filed here — growth via cell division)
    {
      kind: "formula" as const,
      slug: "photosynthesis-meristem-growth",
      name: "Meristematic tissue drives plant growth",
      intuition:
        "Plants grow because certain tissues never stop dividing. Those dividing tissues are the meristems. They are not dead wood, not the thick-walled support tissue, and not confined to the bark — they are the living dividing zones at tips and along the cambium.",
      definition:
        "**Meristematic tissue** consists of **actively dividing cells**, and **plant growth occurs because of the division of these cells**. " +
        "It is living (not dead wood), distinct from the thick-walled flexibility tissue (collenchyma), and found at growing tips and the cambium — not only in the bark.",
      authoredExample: {
        prompt:
          "Which single property of meristematic tissue makes a plant grow taller and thicker?",
        steps: [
          "Meristematic cells keep dividing.",
          "New cells from this division add length (apical) and girth (lateral).",
          "So it is the **division of meristematic cells** that produces growth.",
        ],
        answer: "Its cells actively divide, and that division produces plant growth.",
      },
      selfCheckExample: {
        prompt:
          "True or false: 'Meristematic tissues are dead tissues that form wood.' Correct the statement if false.",
        steps: [
          "Meristematic tissue is made of LIVING, actively dividing cells.",
          "Dead tissue forms wood (e.g. sclerenchyma/old xylem), not the meristem.",
          "So the statement is false.",
        ],
        answer: "False — meristematic tissue is living and dividing; growth comes from its cell division.",
      },
      pyqExampleId: "05987f1b-5674-4780-bafb-df6b3d3e650d", // growth via division of meristematic cells
      traps: [
        {
          title: "Meristem is LIVING and dividing — not dead wood",
          body:
            "Distractors call meristem 'dead tissue forming wood', 'flexibility tissue', or 'only in bark'. The correct statement is that **growth occurs due to the division of meristematic cells** — they are living, dividing cells at tips and the cambium.",
        },
      ],
    },

    // CROP & BOTANY FACTS (REFERENCE) — golden rice, sugarcane, intercropping, nettle
    {
      kind: "reference" as const,
      slug: "photosynthesis-crop-botany-facts",
      name: "Crop and botany facts — golden rice, sugarcane, cropping, nettle",
      intuition:
        "A handful of stand-alone recall facts cluster around crops and plant products. They don't share a mechanism — just memorise the pairs the bank repeats: what golden rice makes, what sugarcane yields, the name for two crops grown together, and why nettle stings.",
      definition:
        "High-yield stand-alone facts:\n" +
        "- **Golden rice** — genetically engineered to make **beta-carotene (provitamin A / Vitamin A)** in its grain, to fight vitamin-A deficiency.\n" +
        "- **Sugarcane** — grown to obtain **sucrose** (table sugar), not glucose or starch.\n" +
        "- **Intercropping** — growing **two or more crops simultaneously** on the same field (in a definite row pattern); distinct from mixed cropping (no defined rows) and crop rotation (different crops in sequence).\n" +
        "- **Nettle (Urtica) sting** — injects **methanoic acid (formic acid)** through hollow hairs, causing the burning sensation.",
      table: {
        columns: ["Fact", "Answer", "Note"],
        rows: [
          {
            cells: ["Golden rice produces", "**Vitamin A** (beta-carotene)", "GM crop targeting vitamin-A deficiency"],
            noteAmber: "Golden rice = Vitamin A, NOT omega-3 or vitamin B/C (NDA 2017).",
          },
          { cells: ["Sugarcane is grown for", "**Sucrose**", "The cash-crop sugar; not glucose/fructose/starch"] },
          {
            cells: ["Two+ crops grown together", "**Intercropping**", "Same land, same time, defined rows"],
            noteAmber: "Intercropping = simultaneous; crop rotation = in sequence (NDA 2020).",
          },
          { cells: ["Nettle sting injects", "**Methanoic (formic) acid**", "Through hollow stinging hairs"] },
        ],
        caption:
          "Stand-alone recall pairs — no shared mechanism, just memorise them.",
      },
      selfCheckExample: {
        prompt:
          "A farmer grows rows of maize and beans together in one field in the same season. What is this practice called, and how does it differ from crop rotation?",
        steps: [
          "Growing two crops together, same field, same season, in rows = **intercropping**.",
          "Crop rotation grows different crops in the same field across DIFFERENT seasons (in sequence), not together.",
        ],
        answer: "Intercropping — simultaneous, unlike crop rotation which is sequential.",
      },
      practiceSet: [
        { prompt: "Golden rice is engineered to make which vitamin?", answer: "Vitamin A", method: "beta-carotene in the grain" },
        { prompt: "Sugarcane is grown to obtain what?", answer: "Sucrose" },
        { prompt: "What is the practice of growing two crops together on one field called?", answer: "Intercropping" },
        { prompt: "Which acid does a nettle leaf inject to cause its sting?", answer: "Methanoic (formic) acid" },
      ],
      pyqExampleId: "b117694b-dc96-4728-b798-464fc0caa7a8", // golden rice = vitamin A
      traps: [
        {
          title: "Golden rice = Vitamin A",
          body:
            "Golden rice is engineered for **Vitamin A** (beta-carotene), not omega-3 fatty acids or vitamins B/C. It targets vitamin-A deficiency.",
        },
        {
          title: "Intercropping (simultaneous) vs crop rotation (sequential)",
          body:
            "**Intercropping** = two or more crops at the SAME TIME on the same land. **Crop rotation** = different crops in SEQUENCE across seasons. Don't swap them.",
        },
      ],
    },
  ],
};
