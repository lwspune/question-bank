import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BEM_PHOTOSYNTHESIS_NOTE: SubtopicNote = {
  subtopicName: "Photosynthesis",
  title: "Photosynthesis: Light Reactions and the Calvin Cycle",
  oneLineDefinition:
    "In the chloroplast, light energy splits water and makes ATP and NADPH on the thylakoid membranes; in the stroma, the Calvin cycle uses them to turn CO₂ into sugar.",
  whyItMatters:
    "The ministry papers asked for the balanced equation (2023) and the organelle (2026). The older papers went deeper: the products of photolysis, the site of the light-dependent reactions and the carrier they reduce, where proton pumps sit in the chloroplast, an outline of carbon fixation, and whether plants release CO₂ by day and by night.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bem-chloroplast-equation",
      name: "Photosynthesis: the overall equation and the chloroplast",
      intuition:
        "Photosynthesis runs the chemistry of respiration uphill. Light energy is used to pull electrons out of water and push them onto \\(\\mathrm{CO_2}\\), building sugar and releasing oxygen. In plants and algae it all happens in the chloroplast: light is captured on the thylakoid membranes, and sugar is built in the stroma around them.",
      definition:
        "- Overall: \\[6\\mathrm{CO_2} + 6\\mathrm{H_2O} \\xrightarrow{\\text{light, chlorophyll}} \\mathrm{C_6H_{12}O_6} + 6\\mathrm{O_2}\\] It is **endergonic** and **anabolic**: light supplies the energy.\n" +
        "- The \\(\\mathrm{O_2}\\) released comes from **water**, not from \\(\\mathrm{CO_2}\\) (shown by labelling water with the isotope oxygen-18).\n" +
        "- **Chloroplast**: a double membrane (the envelope); the **stroma**, a fluid holding enzymes such as RuBisCO, circular DNA, 70S ribosomes and starch grains; and **thylakoids**, flattened membrane sacs stacked into **grana**.\n" +
        "- **Chlorophyll** and the photosystems sit in the **thylakoid membranes**, not in the envelope. Chlorophyll absorbs mainly red and blue light and reflects green.\n" +
        "- Two stages: the **light-dependent reactions** (thylakoid membranes) and the **light-independent reactions, or Calvin cycle** (stroma).\n" +
        "- Cyanobacteria photosynthesise without chloroplasts, on folded internal membranes.",
      table: {
        columns: ["Part", "Structure", "What happens there"],
        rows: [
          { cells: ["Envelope", "Two membranes, outer and inner", "Controls exchange with the cytoplasm; holds no chlorophyll"] },
          { cells: ["Thylakoid membrane", "Membrane of the flattened sacs", "Light absorbed by chlorophyll, water split, electron transport, ATP synthase"] },
          { cells: ["Granum", "A stack of thylakoids", "Gives a large membrane area for the light-dependent reactions"] },
          { cells: ["Thylakoid lumen", "The space inside each thylakoid", "Protons collect here; oxygen from water is released here"] },
          { cells: ["Stroma", "Fluid around the thylakoids", "Calvin cycle: CO₂ fixed by RuBisCO and sugar made; starch stored"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about photosynthesis in a leaf cell is correct?",
        options: [
          "The oxygen released comes from carbon dioxide",
          "Chlorophyll is in the thylakoid membranes, where light energy is absorbed",
          "The Calvin cycle takes place in the grana",
          "Chlorophyll absorbs mainly green light",
          "The overall reaction releases energy",
        ],
        steps: [
          "Chlorophyll is held in the thylakoid membranes, stacked in grana, and absorbs light there: B is correct.",
          "A is wrong: the oxygen comes from water. C is wrong: the Calvin cycle runs in the stroma.",
          "D is wrong: green is mostly reflected, which is why leaves look green. E is wrong: photosynthesis stores energy (it is endergonic).",
        ],
        answer: "(B) Chlorophyll is in the thylakoid membranes, where light energy is absorbed",
      },
      practiceSet: [
        { prompt: "Write the reactants of photosynthesis with their coefficients.", answer: "\\(6\\mathrm{CO_2} + 6\\mathrm{H_2O}\\) (with light energy)" },
        { prompt: "In which part of the chloroplast is RuBisCO found?", answer: "The stroma" },
        { prompt: "What is a granum?", answer: "A stack of thylakoids" },
        { prompt: "Which colours of light does chlorophyll absorb best?", answer: "Red and blue" },
      ],
      traps: [
        {
          title: "The oxygen comes from water",
          body: "In the equation, the 6 \\(\\mathrm{O_2}\\) all come from the split water molecules. The oxygen atoms of \\(\\mathrm{CO_2}\\) end up in the sugar and in new water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-light-reactions",
      name: "The light-dependent reactions: photolysis, NADPH and ATP",
      intuition:
        "Light gives electrons in chlorophyll so much energy that they leave it. Photosystem II replaces its lost electrons by splitting water, which releases oxygen and protons. The electrons flow down a chain to photosystem I, get a second boost from light, and end up on \\(\\mathrm{NADP^+}\\). On the way, protons are pumped into the thylakoid, and their flow back out through ATP synthase makes ATP, just as in mitochondria.",
      definition:
        "- Site: the **thylakoid membranes** (in the grana).\n" +
        "- **Photolysis** at photosystem II: \\(2\\mathrm{H_2O} \\rightarrow 4\\mathrm{H^+} + 4e^- + \\mathrm{O_2}\\). Its direct products are oxygen, protons and electrons; no \\(\\mathrm{CO_2}\\) is involved.\n" +
        "- **Non-cyclic electron flow**: water \\(\\rightarrow\\) photosystem II \\(\\rightarrow\\) plastoquinone \\(\\rightarrow\\) cytochrome \\(b_6f\\) complex (a proton pump) \\(\\rightarrow\\) plastocyanin \\(\\rightarrow\\) photosystem I \\(\\rightarrow\\) ferredoxin \\(\\rightarrow\\) \\(\\mathrm{NADP^+}\\), which is **reduced to NADPH**.\n" +
        "- Protons build up in the **thylakoid lumen** (from photolysis and from pumping). **ATP synthase** in the thylakoid membrane lets them flow out to the stroma and makes ATP there: **photophosphorylation**, by chemiosmosis.\n" +
        "- Products sent to the Calvin cycle: **ATP and NADPH**. Oxygen leaves the leaf or is used in the plant's own respiration.\n" +
        "- **Cyclic electron flow** uses photosystem I only: electrons return from ferredoxin to the cytochrome complex. It makes ATP but **no NADPH and no \\(\\mathrm{O_2}\\)**.",
      table: {
        columns: ["Feature", "Mitochondrion", "Chloroplast"],
        rows: [
          { cells: ["Membrane holding the chain and ATP synthase", "Inner membrane (cristae)", "Thylakoid membrane"] },
          { cells: ["Source of the electrons", "NADH and FADH₂ from food", "Water, split using light energy"] },
          { cells: ["Protons pumped into", "Intermembrane space", "Thylakoid lumen"] },
          { cells: ["ATP made in", "Matrix", "Stroma"] },
          { cells: ["Final electron acceptor", "Oxygen, forming water", "NADP⁺, forming NADPH"] },
          { cells: ["Name of the ATP synthesis", "Oxidative phosphorylation", "Photophosphorylation"] },
        ],
        caption: "Both organelles make ATP by chemiosmosis, so ATP is made in both photosynthesis and respiration.",
      },
      selfCheckExample: {
        prompt: "In non-cyclic electron flow in the chloroplast, which molecule is the final electron acceptor?",
        options: [
          "Oxygen",
          "Water",
          "\\(\\mathrm{NAD^+}\\)",
          "\\(\\mathrm{NADP^+}\\)",
          "Carbon dioxide",
        ],
        steps: [
          "Electrons leave water, pass through photosystem II, the chain and photosystem I, and are finally accepted by \\(\\mathrm{NADP^+}\\), which becomes NADPH.",
          "A is the final acceptor in mitochondria, not chloroplasts. B is the electron donor, not the acceptor.",
          "C is the respiration carrier. E is reduced later, in the Calvin cycle, using the NADPH.",
        ],
        answer: "(D) \\(\\mathrm{NADP^+}\\)",
      },
      practiceSet: [
        { prompt: "What are the direct products of the photolysis of water?", answer: "Oxygen, protons (\\(\\mathrm{H^+}\\)) and electrons" },
        { prompt: "In which compartment do protons build up during the light-dependent reactions?", answer: "The thylakoid lumen" },
        { prompt: "What does cyclic electron flow produce?", answer: "ATP only (no NADPH, no oxygen)" },
        { prompt: "Which photosystem splits water?", answer: "Photosystem II" },
      ],
      traps: [
        {
          title: "Proton pumps are in membranes, not in spaces",
          body: "A pump has to sit in a membrane to move protons across it. In the chloroplast the pumping complex and ATP synthase are in the thylakoid (granum) membrane. The stroma and the lumen are spaces: they hold protons but contain no pumps.",
        },
        {
          title: "Photosynthesis reduces NADP⁺, not NAD⁺",
          body: "The carrier reduced in the light-dependent reactions is \\(\\mathrm{NADP^+}\\), and it ends up reduced (NADPH). NAD⁺ and FAD are the carriers of respiration.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-calvin-cycle",
      name: "The Calvin cycle: fixing carbon dioxide in the stroma",
      intuition:
        "The Calvin cycle spends the ATP and NADPH from the light-dependent reactions to turn \\(\\mathrm{CO_2}\\) into sugar. The enzyme RuBisCO joins \\(\\mathrm{CO_2}\\) to a 5-carbon acceptor; the product splits in two, and each half is reduced to a 3-carbon sugar phosphate. Most of that sugar is used to rebuild the acceptor, so the cycle keeps turning as long as light keeps supplying ATP and NADPH.",
      definition:
        "- Site: the **stroma**. It is called light-independent because light does not drive it directly, but it stops within a minute of darkness, when ATP and NADPH run out.\n" +
        "- **Fixation**: \\(\\mathrm{CO_2}\\) + **RuBP** (ribulose bisphosphate, 5C) \\(\\rightarrow\\) an unstable 6C compound \\(\\rightarrow\\) 2 **GP** (glycerate 3-phosphate, 3C). The enzyme is **RuBisCO**, probably the most abundant protein on Earth.\n" +
        "- **Reduction**: GP is reduced to **triose phosphate** (TP) using ATP and NADPH. The hydrogen that came from water enters the sugar here.\n" +
        "- **Regeneration**: 5 of every 6 TP are rearranged into 3 RuBP, using more ATP.\n" +
        "- Per 3 \\(\\mathrm{CO_2}\\) fixed: 9 ATP and 6 NADPH, giving 1 TP to export. Per glucose (6 \\(\\mathrm{CO_2}\\)): **18 ATP and 12 NADPH**.\n" +
        "- TP is used to make glucose, sucrose, starch and cellulose, and also amino acids and lipids.\n" +
        "- The cycle releases no \\(\\mathrm{O_2}\\) and no \\(\\mathrm{CO_2}\\). RuBisCO can also react with \\(\\mathrm{O_2}\\) instead of \\(\\mathrm{CO_2}\\) (photorespiration), which wastes energy, more so in hot, dry conditions.",
      table: {
        columns: ["Stage", "What happens", "Uses", "Carbon atoms"],
        rows: [
          { cells: ["Fixation", "CO₂ joins RuBP, catalysed by RuBisCO", "No ATP or NADPH", "1 + 5 → 6, which splits into 2 × 3"] },
          { cells: ["Reduction", "GP is reduced to triose phosphate", "ATP and NADPH", "3 → 3"] },
          { cells: ["Regeneration", "Five triose phosphates are rearranged into three RuBP", "ATP", "5 × 3 → 3 × 5"] },
          { cells: ["Export", "One triose phosphate in six leaves the cycle", "Nothing more", "2 × 3 → 6 (two make one glucose)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A plant in bright light suddenly has its supply of \\(\\mathrm{CO_2}\\) cut off. What happens to the amounts of RuBP and GP in its chloroplasts over the next minute?",
        options: [
          "RuBP rises and GP falls",
          "RuBP falls and GP rises",
          "Both rise",
          "Both fall",
          "Neither changes, because the Calvin cycle does not depend on \\(\\mathrm{CO_2}\\)",
        ],
        steps: [
          "Without \\(\\mathrm{CO_2}\\), RuBP is no longer used up in fixation, but it is still being regenerated, so RuBP rises.",
          "GP is no longer being made, but the light still supplies ATP and NADPH to reduce it, so GP falls.",
          "B is what happens when the light is switched off instead (GP cannot be reduced, RuBP cannot be regenerated).",
        ],
        answer: "(A) RuBP rises and GP falls",
      },
      practiceSet: [
        { prompt: "How many carbon atoms does RuBP have?", answer: "5" },
        { prompt: "How much ATP and NADPH does the Calvin cycle use to make one glucose?", answer: "18 ATP and 12 NADPH", method: "9 ATP and 6 NADPH per 3 \\(\\mathrm{CO_2}\\), doubled" },
        { prompt: "Which enzyme fixes \\(\\mathrm{CO_2}\\) in the Calvin cycle?", answer: "RuBisCO" },
        { prompt: "Light is switched off. Which rises: GP or RuBP?", answer: "GP rises (and RuBP falls)" },
      ],
      traps: [
        {
          title: "Light-independent does not mean it runs at night",
          body: "The Calvin cycle needs a constant supply of ATP and NADPH, which only the light-dependent reactions make. In the dark it stops within a minute or so.",
        },
        {
          title: "Light splits water, not carbon dioxide",
          body: "\\(\\mathrm{CO_2}\\) is never split by light. It is joined whole to RuBP by RuBisCO, and the product is then reduced with hydrogen that came from water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-limiting-factors",
      name: "Limiting factors, the compensation point and respiration in plants",
      intuition:
        "The rate of photosynthesis is set by whichever input is in shortest supply, like a production line held back by its slowest worker. Raising that factor speeds the process up; raising anything else does nothing. Meanwhile the plant respires all the time, day and night, so what we measure in the light is photosynthesis minus respiration.",
      definition:
        "- **Law of limiting factors**: the rate is limited by the factor in shortest supply relative to need.\n" +
        "- **Light intensity** limits the light-dependent reactions. At high light the rate levels off, because another factor takes over.\n" +
        "- **\\(\\mathrm{CO_2}\\) concentration** (about 0.04% of air) limits fixation by RuBisCO; on a bright day it is often the limiting factor, which is why growers add \\(\\mathrm{CO_2}\\) to greenhouses.\n" +
        "- **Temperature** affects the Calvin cycle enzymes: the rate rises to an optimum, then falls as enzymes denature.\n" +
        "- Water shortage acts indirectly: stomata close and \\(\\mathrm{CO_2}\\) intake falls.\n" +
        "- Plant cells have mitochondria and **respire day and night**, releasing \\(\\mathrm{CO_2}\\). In the light, that \\(\\mathrm{CO_2}\\) can be fixed by the plant's own chloroplasts.\n" +
        "- The **compensation point** is the light intensity at which the rate of photosynthesis equals the rate of respiration: there is no net exchange of \\(\\mathrm{CO_2}\\) or \\(\\mathrm{O_2}\\), though both processes are still running.",
      table: {
        columns: ["Condition", "Photosynthesis", "Respiration", "Net gas exchange with the air"],
        rows: [
          { cells: ["Darkness", "Stopped", "Running", "CO₂ released, O₂ taken in"] },
          { cells: ["Dim light, below the compensation point", "Slower than respiration", "Running", "Small net release of CO₂"] },
          { cells: ["At the compensation point", "Equal to respiration", "Running", "None"] },
          { cells: ["Bright light", "Faster than respiration", "Running", "O₂ released, CO₂ taken in"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about a healthy green plant is correct?",
        options: [
          "It respires only at night, when photosynthesis stops",
          "Its chloroplasts make ATP, so its mitochondria make none",
          "At the compensation point it neither photosynthesises nor respires",
          "Raising the temperature always raises its rate of photosynthesis",
          "In bright light, some of the \\(\\mathrm{CO_2}\\) it fixes can come from its own respiration",
        ],
        steps: [
          "Respiration goes on all the time, and in the light the \\(\\mathrm{CO_2}\\) it releases can be fixed in the chloroplasts: E is correct.",
          "A and B are wrong: mitochondria respire and make ATP day and night. C is wrong: both processes run, at equal rates.",
          "D is wrong: above the optimum, enzymes denature and the rate falls.",
        ],
        answer: "(E) In bright light, some of the \\(\\mathrm{CO_2}\\) it fixes can come from its own respiration",
      },
      practiceSet: [
        { prompt: "The rate of photosynthesis has stopped rising with light intensity. Name two factors that may now be limiting.", answer: "\\(\\mathrm{CO_2}\\) concentration and temperature" },
        { prompt: "What is the net release of oxygen at the compensation point?", answer: "Zero" },
        { prompt: "Why does the rate of photosynthesis fall at very high temperatures?", answer: "The enzymes of the Calvin cycle denature" },
        { prompt: "Do the leaf cells of a plant contain mitochondria?", answer: "Yes; they respire as well as photosynthesise" },
      ],
      traps: [
        {
          title: "Plants respire all the time",
          body: "Photosynthesis does not replace respiration. A plant releases \\(\\mathrm{CO_2}\\) from respiration in the light as well as in the dark; in bright light the release is simply hidden, because photosynthesis takes in more than respiration gives out.",
        },
      ],
    },
  ],
};
