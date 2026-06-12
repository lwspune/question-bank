import type { SubtopicNote } from "@/app/notes/_types";

export const ENVIRONMENT_BIODIVERSITY_NOTE: SubtopicNote = {
  subtopicName: "Environment and Biodiversity",
  title: "Environment and Biodiversity",
  oneLineDefinition:
    "The environmental-issues half of the chapter: greenhouse gases and global warming, biogas and biomass as renewable energy, the variety of life (biodiversity) and how it is conserved, and the depletion of groundwater.",
  whyItMatters:
    "6 PYQs, EASY-to-MODERATE, and almost all are 'spot the odd one out' or 'which statement is NOT correct'. " +
    "The bank reliably tests: which gas is NOT a greenhouse gas (oxygen), what biogas is mostly made of (methane), which activity does NOT reduce biodiversity (sacred groves help it), and which is NOT a cause of groundwater depletion (afforestation helps recharge). " +
    "Learn the short fact lists and the recall is automatic.",
  concepts: [
    // greenhouse gases (REFERENCE) — covers 7d5915b6
    {
      kind: "reference" as const,
      slug: "eco-greenhouse-pollution",
      name: "Greenhouse gases and global warming",
      intuition:
        "Greenhouse gases trap the Sun's heat in the atmosphere — like glass in a greenhouse — keeping the Earth warm. Too much of them causes global warming. " +
        "The NDA tests which gases ARE greenhouse gases; the trick is that oxygen and nitrogen, the main gases of the air, are NOT greenhouse gases.",
      definition:
        "**Greenhouse gases (GHGs)** absorb and re-emit the Earth's outgoing heat, warming the lower atmosphere. The major ones are:\n" +
        "- **Water vapour (H₂O)** — the most abundant greenhouse gas.\n" +
        "- **Carbon dioxide (CO₂)** — the main man-made driver (fossil-fuel burning).\n" +
        "- **Methane (CH₄)** — far stronger per molecule than CO₂; from cattle, paddy fields, biogas.\n" +
        "- **Nitrous oxide (N₂O)** and **CFCs / ozone** — minor but potent.\n\n" +
        "**Oxygen (O₂) and nitrogen (N₂) are NOT greenhouse gases** — even though they make up most of the air, they do not trap heat.",
      table: {
        columns: ["Gas", "Greenhouse gas?", "Note"],
        rows: [
          { cells: ["Water vapour (H₂O)", "**Yes**", "Most abundant GHG"] },
          { cells: ["Carbon dioxide (CO₂)", "**Yes**", "Main man-made driver"] },
          { cells: ["Methane (CH₄)", "**Yes**", "Strong; from cattle, paddy, biogas"] },
          {
            cells: ["Oxygen (O₂)", "**No**", "A main gas of air, but does NOT trap heat"],
            noteAmber: "NDA 2023 — Oxygen is NOT a main greenhouse gas (the odd one out).",
          },
          { cells: ["Nitrogen (N₂)", "**No**", "78% of air, but not a GHG"] },
        ],
        caption:
          "The major GHGs are water vapour, CO₂ and methane. Oxygen and nitrogen are NOT greenhouse gases.",
      },
      selfCheckExample: {
        prompt:
          "From water vapour, oxygen, carbon dioxide and methane, which one is NOT a main greenhouse gas?",
        steps: [
          "Water vapour is the most abundant greenhouse gas.",
          "Carbon dioxide and methane both trap heat and are major greenhouse gases.",
          "Oxygen, although a main component of air, does not absorb outgoing heat, so it is not a greenhouse gas.",
        ],
        answer: "Oxygen is not a greenhouse gas.",
      },
      practiceSet: [
        { prompt: "Name the three major greenhouse gases.", answer: "Water vapour, carbon dioxide, methane" },
        { prompt: "Is oxygen a greenhouse gas?", answer: "No", method: "it does not trap heat" },
        { prompt: "Which greenhouse gas is the most abundant?", answer: "Water vapour" },
        { prompt: "Which greenhouse gas is the main man-made driver of warming?", answer: "Carbon dioxide (CO₂)" },
      ],
      pyqExampleId: "7d5915b6-2459-4187-a421-fceb59e76b71", // oxygen NOT a greenhouse gas
      traps: [
        {
          title: "Oxygen and nitrogen are NOT greenhouse gases",
          body:
            "They are the two main gases of the air, which tempts students to mark them as greenhouse gases. They are not — only gases that absorb outgoing heat (water vapour, CO₂, methane, N₂O) qualify.",
        },
      ],
    },

    // biogas / biomass (FORMULA-style, but recall) — covers 41563815 + 4b9c4ee4
    {
      kind: "formula" as const,
      slug: "eco-biogas-biomass",
      name: "Biogas and biomass — renewable energy from waste",
      intuition:
        "Biomass is plant and animal waste used as an energy source. Let cow-dung, crop residue and sewage rot WITHOUT oxygen and microbes produce biogas (gobar gas), a clean fuel. " +
        "The NDA tests two facts: biogas is mostly methane, and its heating value is actually HIGH — so a statement calling it low is wrong.",
      definition:
        "**Biomass** is organic matter (plant/animal waste, crop residue, dung) used as a renewable energy source. **Biogas** (gobar gas) is produced when biomass — cow-dung, crop residues, vegetable waste, sewage — is allowed to decompose by bacteria in the **absence of oxygen** (anaerobic digestion).\n" +
        "- **Composition** — biogas is mostly **methane (CH₄), about 50–70%**, the rest mainly CO₂ with traces of H₂ and H₂S.\n" +
        "- **It is a renewable, clean fuel** — burning it gives heat with little smoke, and the process reduces soil and water pollution.\n" +
        "- **High heating value** — because methane is its main component, biogas has a HIGH calorific (heating) value. A claim that biogas has a very low heating capacity is INCORRECT.",
      authoredExample: {
        prompt:
          "Cow-dung and crop waste are sealed in a tank with no air and allowed to rot. The gas collected burns with a clean flame. What is this gas mostly made of, and is its heating value high or low?",
        steps: [
          "Decomposing biomass without oxygen is anaerobic digestion — it produces biogas (gobar gas).",
          "Biogas is roughly 50–70% methane, the rest mostly carbon dioxide.",
          "Methane is a good fuel, so biogas has a HIGH heating (calorific) value, not a low one.",
        ],
        answer: "Mostly methane; its heating value is high.",
      },
      selfCheckExample: {
        prompt:
          "Which of these statements about biogas is NOT correct: (i) biomass is a renewable energy source; (ii) gobar gas forms by decomposing dung and sewage without oxygen; (iii) biogas reduces soil and water pollution; (iv) the heating capacity of biogas is very low?",
        steps: [
          "Statements (i), (ii) and (iii) are all correct facts about biomass and biogas.",
          "Biogas is mostly methane, a strong fuel, so it has a HIGH heating value.",
          "Therefore statement (iv) — 'heating capacity of biogas is very low' — is NOT correct.",
        ],
        answer: "Statement (iv) is incorrect — biogas has a high heating capacity.",
      },
      practiceSet: [
        { prompt: "Biogas is mostly composed of which gas?", answer: "Methane (CH₄)", method: "about 50–70%" },
        { prompt: "Is biogas produced in the presence or absence of oxygen?", answer: "Absence of oxygen", method: "anaerobic digestion" },
        { prompt: "Is the heating value of biogas high or low?", answer: "High", method: "because it is mostly methane" },
        { prompt: "Name two raw materials used to make gobar gas.", answer: "Cow-dung and crop residues (also vegetable waste, sewage)" },
      ],
      pyqExampleId: "41563815-d17c-438b-82cb-ca3101f986cc", // biogas = mostly methane
      traps: [
        {
          title: "Biogas heating value is HIGH, not low",
          body:
            "Because biogas is mostly methane, it burns well and has a high calorific value. A statement claiming 'heating capacity of biogas is very low' is the INCORRECT one the bank wants you to catch (NDA 2020).",
        },
        {
          title: "Biogas is the largest component methane — not carbon dioxide",
          body:
            "CO₂ is present (the second-largest part), but the LARGEST component is methane (~50–70%). Marking carbon dioxide as the main component is the classic error.",
        },
      ],
    },

    // biodiversity and conservation (REFERENCE) — covers 6836a02c + 9ddedcd3
    {
      kind: "reference" as const,
      slug: "eco-biodiversity-conservation",
      name: "Biodiversity, hotspots and conservation",
      intuition:
        "Biodiversity is the variety of all living things. It is being lost to deforestation, hunting and encroachment — but traditional protected areas such as sacred groves actually preserve it. " +
        "The NDA tests the named facts (who coined 'biodiversity', what a hotspot is, roughly how many hotspots exist) and asks which activity does NOT reduce biodiversity.",
      definition:
        "**Biodiversity** is the variety of life — the number and variety of species, genes and ecosystems. Key recall facts:\n" +
        "- The term **'biodiversity'** was coined by **Walter G. Rosen (1986)**.\n" +
        "- A **biodiversity hotspot** is a region with exceptionally rich, threatened biodiversity; the term was coined by **Norman Myers (1988)**.\n" +
        "- There are about **36 hotspots** recognised worldwide — NOT more than 100.\n" +
        "- **Causes of biodiversity loss:** large-scale deforestation, over-exploitation of forest produce, hunting, pollution, and encroachment into forests.\n" +
        "- **Conservation measures:** national parks, wildlife sanctuaries, biosphere reserves, and traditional **sacred groves** (forest patches protected by local communities) — these INCREASE biodiversity, they do not reduce it.",
      table: {
        columns: ["Fact", "Detail"],
        rows: [
          { cells: ["Term 'biodiversity' coined by", "**Walter G. Rosen (1986)**"] },
          { cells: ["Term 'biodiversity hotspot' coined by", "**Norman Myers (1988)**"] },
          {
            cells: ["Number of hotspots worldwide", "About **36** (NOT more than 100)"],
            noteAmber: "NDA 2021 — 'More than 100 hotspots are identified' is the INCORRECT statement.",
          },
          { cells: ["Causes of loss", "Deforestation, over-exploitation, encroachment, hunting"] },
          {
            cells: ["Sacred groves", "**Conserve** biodiversity (do NOT reduce it)"],
            noteAmber: "NDA 2020 — maintaining sacred groves is NOT a cause of biodiversity decrease.",
          },
        ],
        caption:
          "Rosen coined 'biodiversity' (1986); Myers coined 'hotspot' (1988); ~36 hotspots; sacred groves protect, not harm.",
      },
      selfCheckExample: {
        prompt:
          "Which of these is NOT a reason for the decrease in biodiversity: large-scale deforestation, exploitation of forest produce, maintaining sacred groves, or encroachment in forest areas?",
        steps: [
          "Deforestation, exploitation of forest produce and encroachment all destroy habitats and reduce biodiversity.",
          "Sacred groves are forest patches that communities protect from cutting and hunting.",
          "Protecting forest in this way conserves biodiversity, so maintaining sacred groves is NOT a cause of decrease.",
        ],
        answer: "Maintaining sacred groves is not a cause of biodiversity decrease.",
      },
      practiceSet: [
        { prompt: "Who coined the term 'biodiversity'?", answer: "Walter G. Rosen (1986)" },
        { prompt: "Who coined the term 'biodiversity hotspot'?", answer: "Norman Myers (1988)" },
        { prompt: "Roughly how many biodiversity hotspots are recognised worldwide?", answer: "About 36", method: "NOT more than 100" },
        { prompt: "Do sacred groves increase or decrease biodiversity?", answer: "Increase (conserve) it", method: "community-protected forest patches" },
      ],
      pyqExampleId: "9ddedcd3-98c8-400f-86e7-cc0b27d96b98", // 'more than 100 hotspots' is incorrect
      traps: [
        {
          title: "Sacred groves CONSERVE biodiversity",
          body:
            "In a 'which is NOT a cause of biodiversity decrease?' question, the answer is the conservation activity — **maintaining sacred groves** protects forest, so it does not reduce biodiversity (NDA 2020).",
        },
        {
          title: "There are about 36 hotspots, not 'more than 100'",
          body:
            "Rosen (1986) coined 'biodiversity' and Myers (1988) coined 'hotspot' — both true. The false statement is that more than 100 hotspots exist; the recognised figure is about 36 (NDA 2021).",
        },
      ],
    },

    // water resources / groundwater (REFERENCE) — covers 2580b8b2
    {
      kind: "reference" as const,
      slug: "eco-water-resources",
      name: "Groundwater depletion and conservation",
      intuition:
        "Groundwater is the water stored underground in soil and rock. It is depleted by over-pumping, by losing the forests that help rain soak in, and by paving land with concrete so rain runs off instead of recharging. " +
        "The NDA asks which activity does NOT deplete groundwater — and planting trees (afforestation) actually recharges it.",
      definition:
        "**Groundwater** is recharged when rainwater seeps into the soil. Causes that DEPLETE it versus actions that CONSERVE it:\n" +
        "- **Depleting causes:** excessive pumping of groundwater (over-extraction); loss of forests (less seepage, more runoff); large-scale concrete construction (paving blocks rain from soaking in).\n" +
        "- **Conserving actions:** **afforestation** (planting trees, whose roots and litter let water soak in and recharge the aquifer); rainwater harvesting; check dams.\n" +
        "Afforestation INCREASES recharge — it is the opposite of a depletion cause.",
      table: {
        columns: ["Activity", "Effect on groundwater"],
        rows: [
          { cells: ["Excessive pumping", "**Depletes** — over-extraction lowers the water table"] },
          { cells: ["Loss of forests", "**Depletes** — bare soil means more runoff, less seepage"] },
          { cells: ["Large-scale concrete buildings", "**Depletes** — paving stops rain soaking in"] },
          {
            cells: ["Afforestation (planting trees)", "**Conserves / recharges** — roots and litter aid seepage"],
            noteAmber: "NDA 2020 — afforestation is NOT a cause of groundwater depletion (it recharges it).",
          },
        ],
        caption:
          "Pumping, deforestation and concreting deplete groundwater; afforestation and rainwater harvesting recharge it.",
      },
      selfCheckExample: {
        prompt:
          "Which of these is NOT a cause of groundwater depletion: afforestation, loss of forests, excessive pumping, or construction of large concrete buildings?",
        steps: [
          "Excessive pumping over-extracts groundwater; loss of forests reduces seepage; concrete buildings block rain from soaking in — all deplete groundwater.",
          "Afforestation means planting trees; the roots and leaf litter help rainwater seep down and recharge the aquifer.",
          "So afforestation increases groundwater — it is NOT a cause of depletion.",
        ],
        answer: "Afforestation is not a cause of groundwater depletion.",
      },
      practiceSet: [
        { prompt: "Which activity recharges groundwater rather than depleting it?", answer: "Afforestation (planting trees)" },
        { prompt: "How does large-scale concrete construction affect groundwater?", answer: "Depletes it", method: "paving stops rain soaking in" },
        { prompt: "Name two ways to conserve groundwater.", answer: "Afforestation and rainwater harvesting (also check dams)" },
        { prompt: "Does loss of forests increase or decrease groundwater recharge?", answer: "Decreases it", method: "less seepage, more runoff" },
      ],
      pyqExampleId: "2580b8b2-1ce3-4f1f-8f67-0cea6400b917", // afforestation NOT a cause of depletion
      traps: [
        {
          title: "Afforestation RECHARGES groundwater — it is the odd one out",
          body:
            "In a 'which is NOT a cause of groundwater depletion?' question, pick the conservation action. **Afforestation** helps rainwater seep in and recharge the water table, so it does not deplete groundwater (NDA 2020).",
        },
      ],
    },
  ],
};
