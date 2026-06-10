import type { SubtopicNote } from "@/app/notes/_types";

export const SEPARATION_NOTE: SubtopicNote = {
  subtopicName: "Separation Techniques",
  title: "Separation Techniques",
  oneLineDefinition:
    "Mixtures are pulled apart by physical methods chosen to exploit a difference between the components — boiling point (distillation), density/immiscibility (separating funnel, centrifugation), or volatility and solubility (sublimation, evaporation, crystallization).",
  whyItMatters:
    "Seven PYQs, the joint-largest subtopic. The bank tests a single skill: match the mixture to the right separation method. Distillation and fractional distillation dominate (petrol/kerosene, petroleum refining, two miscible liquids), with centrifugation (blood, cream), chromatography (pigments), separating funnel (oil and water), sublimation (anthracene, camphor) and evaporation/crystallization (a non-volatile solute) filling the rest. Learn which property each method exploits and the match-list questions solve themselves.",
  concepts: [
    // distillation family (reference)
    {
      kind: "reference" as const,
      slug: "distillation-methods",
      name: "Distillation, fractional distillation and the separating funnel",
      visualizationSlug: "matt-distillation-apparatus",
      intuition:
        "How you split two liquids depends on whether they mix. If they mix (miscible) and boil at different temperatures, distil them. If their boiling points are close, use fractional distillation. If they don't mix (immiscible, like oil and water), just let them settle into layers and run off the bottom one — a separating funnel.",
      definition:
        "The liquid-separation methods:\n" +
        "- **Distillation** — separates **two miscible liquids** (a homogeneous mixture) with a **large boiling-point difference**, or a liquid from a non-volatile solid. The liquid is boiled and the vapour condensed back. Use for **acetone and water**, or **two miscible liquids** in general.\n" +
        "- **Fractional distillation** — distillation with a fractionating column, for **miscible liquids whose boiling points are close**. Use for **petrol and kerosene**, and the **refining of petroleum** (crude oil → fractions).\n" +
        "- **Separating funnel** — separates **two immiscible liquids** of different density (they form layers). Use for **water and kerosene oil**, or **oil and water**.",
      table: {
        columns: ["Method", "Use it when…", "Example"],
        rows: [
          { cells: ["Distillation", "Two miscible liquids, boiling points far apart", "Acetone and water; two miscible liquids"] },
          {
            cells: ["Fractional distillation", "Miscible liquids, boiling points close", "Petrol and kerosene; refining petroleum"],
            noteAmber: "Close boiling points → you need the fractionating column → fractional distillation.",
          },
          {
            cells: ["Separating funnel", "Two immiscible liquids (don't mix)", "Water and kerosene oil; oil and water"],
            noteAmber: "Immiscible = they form separate layers → separating funnel, not distillation.",
          },
        ],
        caption: "Miscible → (fractional) distillation by boiling point; immiscible → separating funnel by layers.",
      },
      pyqExampleId: "727eb261-6403-4f41-962f-76f176d63225", // kerosene and petrol = fractional distillation
      selfCheckExample: {
        prompt: "Which method best separates a mixture of kerosene and petrol, and why?",
        steps: [
          "Kerosene and petrol are miscible (they mix), so a separating funnel won't work.",
          "Their boiling points are fairly close, so simple distillation is poor.",
          "A fractionating column resolves close boiling points — fractional distillation.",
        ],
        answer: "Fractional distillation — they are miscible with close boiling points.",
      },
      practiceSet: [
        { prompt: "How is a homogeneous mixture of two miscible liquids separated?", answer: "By distillation" },
        { prompt: "Which technique refines petroleum (crude oil)?", answer: "Fractional distillation" },
        { prompt: "How do you separate water and kerosene oil?", answer: "Separating funnel", method: "they are immiscible — they form layers" },
        { prompt: "Acetone and water are separated by?", answer: "Distillation", method: "miscible, large boiling-point gap" },
      ],
      traps: [
        {
          title: "Miscible vs immiscible decides the method",
          body:
            "Two liquids that **mix** (miscible) are separated by **distillation**; two that **don't mix** (immiscible, like oil and water) are separated by a **separating funnel**. Picking distillation for oil-and-water is the classic error.",
        },
        {
          title: "Close boiling points need the column",
          body:
            "When miscible liquids have **close** boiling points (petrol/kerosene, crude-oil fractions), simple distillation fails — use **fractional** distillation (with the fractionating column).",
        },
      ],
    },

    // other methods: centrifugation, chromatography, sublimation, evaporation, crystallization (reference)
    {
      kind: "reference" as const,
      slug: "other-separation-methods",
      name: "Centrifugation, chromatography, sublimation, evaporation and crystallization",
      intuition:
        "The rest of the toolbox, each tuned to one property. Spin to separate by density (centrifugation). Let components creep up paper at different rates to separate by adsorption (chromatography). Heat a mixture where one part sublimes (sublimation). Boil off the solvent (evaporation) or cool a hot solution to grow pure crystals (crystallization).",
      definition:
        "The remaining methods and the property each exploits:\n" +
        "- **Centrifugation** — spins a mixture so **denser particles move out**; separates **suspended solids from a liquid**. Use for **cream from milk** and **blood tests** (separating blood cells from plasma).\n" +
        "- **Chromatography** — separates components by their **different rates of movement** over an adsorbing medium. Use for **pigments from a plant extract** (and dyes in ink).\n" +
        "- **Sublimation** — separates a **sublimable solid** (turns straight to gas) from a non-sublimable one. Use for **anthracene from a salt mixture**, **camphor/naphthalene from sand**, **iodine from sand**.\n" +
        "- **Evaporation** — boils/dries off the **solvent** to leave a **non-volatile solute** behind (e.g. salt from salt water).\n" +
        "- **Crystallization** — cools a hot saturated solution so the **pure solute crystallises out** (purer than evaporation). Both evaporation and crystallization recover a **non-volatile solid solute** from its solution.",
      table: {
        columns: ["Method", "Separates", "Example"],
        rows: [
          {
            cells: ["Centrifugation", "Suspended solid from liquid (by density, by spinning)", "Cream from milk; blood tests"],
            noteAmber: "Blood tests in diagnostic labs use centrifugation to spin cells from plasma.",
          },
          { cells: ["Chromatography", "Components by rate of movement / adsorption", "Pigments from plant extract; ink dyes"] },
          {
            cells: ["Sublimation", "A sublimable solid from a non-sublimable one", "Anthracene from salt; camphor from sand"],
            noteAmber: "Use sublimation only when ONE component sublimes (turns solid → gas).",
          },
          { cells: ["Evaporation", "Non-volatile solute from solvent (dry off solvent)", "Salt from salt water"] },
          {
            cells: ["Crystallization", "Pure solute crystals from a hot solution", "Pure crystals from a non-volatile solute"],
            noteAmber: "A non-volatile solid solute can be recovered by EITHER evaporation OR crystallization.",
          },
        ],
      },
      pyqExampleId: "8330bf85-92ed-4333-ab8a-dea202f1699a", // match list: methods to mixtures
      selfCheckExample: {
        prompt:
          "Match each process to its method: A. Acetone + water; B. Water + kerosene; C. Cream from milk; D. Pigments from plant extract. Methods: 1. Chromatography, 2. Centrifugation, 3. Distillation, 4. Separating funnel.",
        steps: [
          "A. Acetone + water are miscible with a big boiling gap → Distillation (3).",
          "B. Water + kerosene are immiscible → Separating funnel (4).",
          "C. Cream from milk separates by density on spinning → Centrifugation (2).",
          "D. Pigments separate by rate of movement → Chromatography (1).",
        ],
        answer: "A-3, B-4, C-2, D-1.",
      },
      practiceSet: [
        { prompt: "Which technique is used for blood tests in diagnostic labs?", answer: "Centrifugation" },
        { prompt: "How do you separate anthracene from a mixture of salt and anthracene?", answer: "Sublimation", method: "anthracene sublimes; salt does not" },
        { prompt: "Which method separates pigments from a plant extract?", answer: "Chromatography" },
        { prompt: "Name two methods to recover a non-volatile solid solute from a solution.", answer: "Evaporation and crystallization" },
        { prompt: "Cream is separated from milk by?", answer: "Centrifugation" },
      ],
      traps: [
        {
          title: "Non-volatile solute → evaporation OR crystallization",
          body:
            "A non-volatile solid solute can be recovered from its solution by **both** evaporation **and** crystallization — so in a 'which process(es) work' question, the answer is often 'both'. Crystallization gives purer crystals.",
        },
        {
          title: "Sublimation needs a sublimable component",
          body:
            "Reach for **sublimation** only when one component turns solid → gas directly (camphor, naphthalene, iodine, ammonium chloride, anthracene). To separate anthracene from salt, the anthracene sublimes and the salt stays.",
        },
      ],
    },
  ],
};
