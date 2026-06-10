import type { SubtopicNote } from "@/app/notes/_types";

export const REDOX_NOTE: SubtopicNote = {
  subtopicName: "Redox: Oxidation, Reduction and Reducing Agents",
  title: "Redox — Oxidation, Reduction and Reducing Agents",
  oneLineDefinition:
    "Oxidation is loss of electrons (oxidation number goes up); reduction is gain of electrons (oxidation number goes down); the two always happen together in a redox reaction.",
  whyItMatters:
    "The biggest and HARDEST subtopic in the chapter — 10 PYQs and the source of almost every HARD question. " +
    "The bank tests whether you can ASSIGN oxidation numbers, name the oxidising and reducing agent, order reducing power from the activity series, and spot the one reaction that is NOT redox. Master the oxidation-number rules and these marks are reliable.",
  concepts: [
    // assigning oxidation numbers (formula variant) — the technique
    {
      kind: "formula" as const,
      slug: "assigning-oxidation-numbers",
      name: "Assigning oxidation numbers",
      intuition:
        "An oxidation number is the charge an atom WOULD have if every bond were ionic. Fix the easy atoms (H is +1, O is −2, free elements are 0), then make the numbers add to the overall charge to find the unknown. Tracking how this number changes tells you instantly what is oxidised and what is reduced.",
      definition:
        "The standard rules, applied in order:\n" +
        "- A **free element** (Fe, O₂, H₂, Cl₂) has oxidation number **0**.\n" +
        "- **Hydrogen** is **+1** (except −1 in metal hydrides like NaH); **oxygen** is **−2** (except −1 in peroxides).\n" +
        "- A **monatomic ion**'s oxidation number equals its **charge** (Fe³⁺ is +3).\n" +
        "- The oxidation numbers in a **neutral molecule sum to 0**; in an **ion** they sum to the **ion charge**.\n" +
        "- **Oxidation = increase** in oxidation number (loss of electrons); **reduction = decrease** (gain of electrons).\n" +
        "- A compound can hold the **same element in two oxidation states** — Pb₃O₄ has Pb²⁺ and Pb⁴⁺; Fe₃O₄ has Fe²⁺ and Fe³⁺; Mn₃O₄ has Mn²⁺ and Mn³⁺. But Fe₂O₃ has only Fe³⁺ (uniform).",
      formula: {
        label: "Oxidation-number bookkeeping",
        latex: "\\sum (\\text{oxidation numbers}) = \\text{net charge}; \\qquad \\text{H} = +1,\\ \\text{O} = -2,\\ \\text{element} = 0",
      },
      pyqExampleId: "930fa968-3c19-458b-8e09-e658620e1998", // CH4 combustion: carbon oxidized (only statement 1 correct)
      authoredExample: {
        prompt:
          "In the reaction CH₄ + 2O₂ → CO₂ + 2H₂O, find the oxidation number of carbon before and after, and state what happens to carbon and hydrogen.",
        steps: [
          "In CH₄: H is +1 (four of them = +4 total), so C must be −4 for the molecule to be neutral.",
          "In CO₂: O is −2 (two of them = −4), so C must be +4.",
          "Carbon goes −4 → +4: its oxidation number INCREASES, so carbon is oxidised.",
          "Hydrogen is +1 in CH₄ and +1 in H₂O — unchanged, so hydrogen is neither oxidised nor reduced.",
        ],
        answer: "Carbon goes from −4 to +4 (oxidised); hydrogen stays +1 (unchanged). Only 'carbon is oxidised' is correct.",
      },
      selfCheckExample: {
        prompt: "What is the oxidation number of sulphur in sulphuric acid, H₂SO₄?",
        steps: [
          "H is +1 (two of them = +2); O is −2 (four of them = −8).",
          "The molecule is neutral, so +2 + S + (−8) = 0.",
          "S = +6.",
        ],
        answer: "Sulphur is +6 in H₂SO₄.",
      },
      practiceSet: [
        { prompt: "Oxidation number of a free element such as O₂ or Fe?", answer: "0" },
        { prompt: "Oxidation number of carbon in CO₂?", answer: "+4", method: "O is −2 each, so C = +4" },
        { prompt: "Which compound has iron in only ONE oxidation state: Fe₂O₃ or Fe₃O₄?", answer: "Fe₂O₃ (all Fe³⁺)", method: "Fe₃O₄ mixes Fe²⁺ and Fe³⁺" },
        { prompt: "An increase in oxidation number means oxidation or reduction?", answer: "Oxidation", method: "loss of electrons" },
      ],
      traps: [
        {
          title: "Fe₂O₃ is uniform; Fe₃O₄ is mixed",
          body:
            "Fe₂O₃ contains only Fe³⁺ (one oxidation state), but Fe₃O₄ contains BOTH Fe²⁺ and Fe³⁺. The same trap applies to Pb₃O₄ (Pb²⁺ + Pb⁴⁺) and Mn₃O₄ (Mn²⁺ + Mn³⁺).",
        },
        {
          title: "Unchanged oxidation number = neither oxidised nor reduced",
          body:
            "In CH₄ combustion, hydrogen stays +1 throughout, so it is NEITHER oxidised nor reduced. Only carbon (−4 → +4) changes. Do not assume every atom in a redox reaction is itself oxidised or reduced.",
        },
      ],
    },

    // oxidation & reduction defined (reference)
    {
      kind: "reference" as const,
      slug: "oxidation-reduction-defined",
      name: "Defining oxidation and reduction",
      intuition:
        "There are four equivalent ways to spot oxidation: loss of electrons, increase in oxidation number, gain of oxygen, or loss of hydrogen. Reduction is the exact opposite of each. Memorise the four pairs and the definition questions are automatic.",
      definition:
        "Oxidation and reduction, four equivalent definitions each:\n" +
        "- **Oxidation** = **loss** of electrons = increase in oxidation number = **gain of oxygen** = **loss of hydrogen**.\n" +
        "- **Reduction** = **gain** of electrons = decrease in oxidation number = **loss of oxygen** = **gain of hydrogen**.\n" +
        "- A memory aid is **OIL RIG**: Oxidation Is Loss, Reduction Is Gain (of electrons).\n" +
        "- So 'loses hydrogen → reduced' is **wrong** — losing hydrogen is OXIDATION.",
      table: {
        columns: ["Change to a substance", "Oxidation or reduction?"],
        rows: [
          { cells: ["Loses electrons", "Oxidation"] },
          { cells: ["Gains electrons", "Reduction"] },
          { cells: ["Gains oxygen", "Oxidation"] },
          { cells: ["Loses oxygen", "Reduction"] },
          {
            cells: ["Loses hydrogen", "Oxidation"],
            noteAmber: "Losing hydrogen is OXIDATION, not reduction — this is the bank's favourite false statement.",
          },
          { cells: ["Gains hydrogen", "Reduction"] },
        ],
      },
      pyqExampleId: "b283b1f6-b11e-4a44-a9fa-d4e013953fad", // NOT correct: loses hydrogen -> reduced
      practiceSet: [
        { prompt: "Loss of electrons is oxidation or reduction?", answer: "Oxidation", method: "OIL — Oxidation Is Loss" },
        { prompt: "Gain of oxygen is oxidation or reduction?", answer: "Oxidation" },
        { prompt: "A substance that LOSES hydrogen has been oxidised or reduced?", answer: "Oxidised", method: "loss of hydrogen = oxidation" },
        { prompt: "Gain of hydrogen corresponds to which process?", answer: "Reduction" },
      ],
      traps: [
        {
          title: "'Loses hydrogen → reduced' is false",
          body:
            "Loss of hydrogen is OXIDATION, not reduction. The four markers of reduction are: gains electrons, loses oxygen, gains hydrogen, oxidation number falls. Any statement pairing 'loses hydrogen' with 'reduced' is incorrect.",
        },
      ],
    },

    // oxidising & reducing agents (formula variant)
    {
      kind: "formula" as const,
      slug: "oxidising-reducing-agents",
      name: "Oxidising and reducing agents",
      intuition:
        "The reducing agent is the one that GETS oxidised (it gives electrons away, reducing the other species). The oxidising agent is the one that GETS reduced (it takes electrons). It feels backwards but it's consistent: the agent does the opposite to itself than its name suggests.",
      definition:
        "How to name the agents:\n" +
        "- **Reducing agent** — the species that is itself **oxidised** (loses electrons / oxidation number rises). It REDUCES the other reactant.\n" +
        "- **Oxidising agent** — the species that is itself **reduced** (gains electrons / oxidation number falls). It OXIDISES the other reactant.\n" +
        "- In **Zn + CuSO₄ → ZnSO₄ + Cu**: Zn (0 → +2) is oxidised, so **Zn is the reducing agent**; Cu²⁺ (+2 → 0) is reduced, so **CuSO₄ is the oxidising agent**.\n" +
        "- In **N₂H₄ + 2H₂O₂ → N₂ + 4H₂O**: nitrogen goes −2 → 0 (oxidised), so **N₂H₄ is the reducing agent**.\n" +
        "- In a halogen displacement **Br₂ + 2I⁻ → 2Br⁻ + I₂**, Br₂ gains electrons (reduced), so **Br₂ is the oxidising agent** — calling it the reductant is wrong.",
      formula: {
        label: "The agent does the opposite to itself",
        latex: "\\text{Reducing agent} \\Rightarrow \\text{itself oxidised}; \\qquad \\text{Oxidising agent} \\Rightarrow \\text{itself reduced}",
      },
      pyqExampleId: "a5eb20ad-e8df-4080-b471-c2024c27dd91", // reducing agent = N2H4
      authoredExample: {
        prompt:
          "In Zn + CuSO₄ → ZnSO₄ + Cu, identify the oxidising agent and the reducing agent.",
        steps: [
          "Zinc goes from 0 (free metal) to +2 in ZnSO₄ — its oxidation number rises, so Zn is oxidised.",
          "Copper goes from +2 in CuSO₄ to 0 as Cu metal — its oxidation number falls, so Cu²⁺ is reduced.",
          "The species oxidised (Zn) is the reducing agent; the species reduced (CuSO₄) is the oxidising agent.",
        ],
        answer: "Reducing agent = Zn; oxidising agent = CuSO₄ (the Cu²⁺ ion).",
      },
      selfCheckExample: {
        prompt: "In Br₂ + 2I⁻ → 2Br⁻ + I₂, which species is the oxidising agent?",
        steps: [
          "Bromine goes from 0 in Br₂ to −1 in Br⁻ — it gains electrons, so Br₂ is reduced.",
          "Iodide goes from −1 to 0 in I₂ — it loses electrons, so I⁻ is oxidised.",
          "The species reduced (Br₂) is the oxidising agent.",
        ],
        answer: "Br₂ is the oxidising agent (it is reduced); I⁻ is the reducing agent.",
      },
      practiceSet: [
        { prompt: "The reducing agent is the species that is itself ...?", answer: "Oxidised", method: "it loses electrons" },
        { prompt: "In Zn + CuSO₄ → ZnSO₄ + Cu, name the reducing agent.", answer: "Zinc (Zn)" },
        { prompt: "In N₂H₄ + 2H₂O₂ → N₂ + 4H₂O, which is the reducing agent?", answer: "N₂H₄", method: "N goes −2 → 0, oxidised" },
        { prompt: "Is Br₂ in Br₂ + 2I⁻ → 2Br⁻ + I₂ an oxidising or reducing agent?", answer: "Oxidising agent", method: "Br₂ is reduced to Br⁻" },
      ],
      traps: [
        {
          title: "The reducing agent is the one OXIDISED",
          body:
            "The naming feels reversed: the REDUCING agent is the species that itself gets OXIDISED (it donates electrons). Mixing this up flips every answer. Remember: the agent does to itself the opposite of its name.",
        },
        {
          title: "A halogen in a displacement is the OXIDISING agent",
          body:
            "In Br₂ + 2I⁻ → 2Br⁻ + I₂, Br₂ gains electrons (0 → −1), so it is REDUCED and is the oxidising agent — not the reductant. Calling Br₂ the reducing agent is a classic false statement.",
        },
      ],
    },

    // identifying redox + oxidation in daily life (reference)
    {
      kind: "reference" as const,
      slug: "identifying-redox-daily-life",
      name: "Spotting a redox reaction and oxidation in daily life",
      intuition:
        "A reaction is redox only if some oxidation number actually CHANGES. If atoms only swap partners with no change in oxidation state (hydrolysis, precipitation, neutralisation), it is NOT redox. Several everyday processes — rusting, burning, food spoiling — are slow oxidations.",
      definition:
        "Identifying redox and the daily-life examples:\n" +
        "- A reaction is **redox** only if at least one element **changes oxidation number**. Combination of elements (2Mg + O₂ → 2MgO) and metal displacements (Cu + Zn salt) ARE redox.\n" +
        "- **Not redox**: double displacement / hydrolysis / precipitation where ions just swap with **no oxidation-state change** — e.g. **AlCl₃ + 3H₂O → Al(OH)₃ + 3HCl** is hydrolysis, not redox.\n" +
        "- **Electron-releasing tendency** (reducing power) follows the activity series: **Zn > Cu > Ag** — a more reactive metal releases electrons more readily.\n" +
        "- **Oxidation in daily life**: **rusting of iron**, **burning of fuel**, **rancidity of oils and fats**, and **browning of cut fruit** are all oxidation reactions.",
      table: {
        columns: ["Reaction or process", "Redox? / Note"],
        rows: [
          { cells: ["2Mg + O₂ → 2MgO", "Redox — Mg oxidised (0 → +2), O reduced"] },
          { cells: ["Cu + Zn-salt displacement", "Redox — electron transfer between metals"] },
          {
            cells: ["AlCl₃ + 3H₂O → Al(OH)₃ + 3HCl", "NOT redox — hydrolysis, no oxidation-state change"],
            noteAmber: "Hydrolysis/double displacement with no oxidation-number change is NOT a redox reaction.",
          },
          { cells: ["Rusting of iron", "Oxidation — Fe → hydrated Fe³⁺ oxide"] },
          { cells: ["Burning of fuel", "Oxidation — carbon/hydrogen oxidised"] },
          { cells: ["Rancidity of oils and fats", "Oxidation — fatty acids oxidise"] },
          { cells: ["Browning of cut fruit", "Oxidation — chemical/enzymatic"] },
        ],
      },
      pyqExampleId: "8027235f-7465-4b61-a3ea-244279671579", // rusting/burning/rancidity/browning all oxidation
      practiceSet: [
        { prompt: "Is 2Mg + O₂ → 2MgO a redox reaction?", answer: "Yes", method: "Mg oxidised, O reduced" },
        { prompt: "Is AlCl₃ + 3H₂O → Al(OH)₃ + 3HCl redox?", answer: "No — it is hydrolysis (no oxidation-state change)" },
        { prompt: "Order the electron-releasing tendency of Zn, Cu, Ag.", answer: "Zn > Cu > Ag", method: "most reactive releases electrons most readily" },
        { prompt: "Rusting of iron is an example of which process?", answer: "Oxidation" },
        { prompt: "Is the browning of cut fruit oxidation or reduction?", answer: "Oxidation" },
      ],
      traps: [
        {
          title: "No oxidation-state change → not redox",
          body:
            "AlCl₃ + 3H₂O → Al(OH)₃ + 3HCl LOOKS like a reaction, but every element keeps its oxidation number (Al stays +3, Cl stays −1). With no electron transfer it is hydrolysis, NOT a redox reaction.",
        },
        {
          title: "Reducing power follows reactivity",
          body:
            "Electron-releasing tendency (reducing power) is Zn > Cu > Ag, mirroring the activity series — not the reverse. A more reactive metal gives up electrons more readily.",
        },
      ],
    },
  ],
};
