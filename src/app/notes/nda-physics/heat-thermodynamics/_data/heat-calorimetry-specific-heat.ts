import type { SubtopicNote } from "@/app/notes/_types";

export const HEAT_CALORIMETRY_SPECIFIC_HEAT_NOTE: SubtopicNote = {
  subtopicName: "Heat, Calorimetry and Specific Heat",
  title: "Heat, Specific Heat, Calorimetry, and Heat Transfer",
  oneLineDefinition:
    "Heat is energy in transit driven by a temperature difference; specific heat sets how much heat a unit mass needs per degree, calorimetry balances heat lost against heat gained, and heat moves by conduction, convection, or radiation.",
  whyItMatters:
    "This is the chapter's biggest marks pool — about 12 PYQs and the home of every HARD calorimetry numeric. " +
    "The recall layer is steady (heat is energy transfer due to a temperature difference; specific heat is a material property; thermal capacity = mass × specific heat). " +
    "The HARD layer is the ice-melting mixing problem: you set heat gained = heat lost, remembering to include the latent-heat term while ice melts at constant temperature. " +
    "The three modes of heat transfer (conduction, convection, radiation) are a near-guaranteed one-mark recall — the thermos-flask question lives here too.",
  concepts: [
    // Concept 1 — foundation: heat as energy in transit
    {
      kind: "formula" as const,
      slug: "heat-as-energy-transfer",
      name: "Heat — energy in transit due to a temperature difference",
      intuition:
        "Heat is NOT something a body 'contains' — it is energy that FLOWS from a hotter body to a colder one because of the temperature difference between them. The moment they reach the same temperature, the flow stops. " +
        "Energy can also be transferred by doing work, but that is not heat; heat specifically means transfer driven by a temperature difference.",
      definition:
        "**Heat** is the energy transferred between bodies (or a body and its surroundings) **because of a temperature difference**. Key consequences:\n" +
        "- Heat always flows from **higher temperature to lower temperature** on its own.\n" +
        "- Any energy transfer NOT driven by a temperature difference (e.g. mechanical work) is **not heat**.\n" +
        "- Heat is measured in joules (J); an older unit is the calorie (1 cal = 4.18 J), where **1 calorie raises 1 g of water by 1°C**.",
      authoredExample: {
        prompt:
          "Two blocks at 80°C and 30°C are placed in contact and isolated. In which direction does heat flow, and when does it stop?",
        steps: [
          "Heat flows from the hotter body to the colder body — from the 80°C block to the 30°C block.",
          "It keeps flowing as long as a temperature difference exists.",
          "It stops when both reach a common (equilibrium) temperature somewhere between 30°C and 80°C.",
        ],
        answer: "From the 80°C block to the 30°C block, until they reach the same temperature.",
      },
      selfCheckExample: {
        prompt:
          "Which statement best defines heat: (i) energy a body stores, or (ii) energy transferred due to a temperature difference?",
        steps: [
          "A body does not 'store heat' — it stores internal/thermal energy. 'Heat' is reserved for energy in transit.",
          "The defining feature is the temperature difference driving the transfer.",
        ],
        answer: "(ii) — heat is the transfer of energy due to a temperature difference.",
      },
      practiceSet: [
        { prompt: "Heat flows from a body at higher temperature to one at lower temperature: true or false?", answer: "True" },
        { prompt: "Is mechanical work a form of heat?", answer: "No", method: "no temperature difference drives it" },
        { prompt: "1 calorie raises the temperature of 1 g of water by how much?", answer: "1°C" },
        { prompt: "The SI unit of heat is?", answer: "Joule (J)" },
      ],
      pyqExampleId: "30cd832f-69a3-417e-9550-7aa720b865a8", // 2024 EASY — defines heat
      traps: [
        {
          title: "A body has internal energy, not 'heat'",
          body:
            "It is loose to say a hot body 'has a lot of heat'. Strictly, heat is energy IN TRANSIT — once absorbed it becomes the body's internal energy. NDA tests the precise definition: energy transferred due to a temperature difference.",
        },
      ],
    },

    // Concept 2 — specific heat + thermal capacity + Q = mcΔT
    {
      kind: "formula" as const,
      slug: "specific-heat-and-calorimetry",
      name: "Specific heat, thermal capacity, and Q = mcΔT",
      intuition:
        "Different substances need different amounts of heat to warm up by the same amount. Specific heat capacity is how much heat one kilogram of a substance needs to rise by one degree — water's is famously high, which is why the sea moderates climate. " +
        "Multiply specific heat by mass and you get the body's thermal (heat) capacity: how much heat it needs per degree as a whole object.",
      definition:
        "**Specific heat capacity** \\(c\\): heat needed to raise the temperature of **unit mass** (1 kg) of a substance by **1°C** (or 1 K). It is an **intrinsic material property** — independent of the mass and shape of the body.\n" +
        "**Thermal (heat) capacity** \\(= mc\\): heat needed to raise the WHOLE body by 1°C. It depends on **mass** (for a given material) but not on shape.\n" +
        "The heat to change a body's temperature is \\(Q = mc\\,\\Delta\\theta\\).",
      formula: {
        label: "Sensible heat (no phase change)",
        latex: "Q = mc\\,\\Delta\\theta \\qquad \\text{Thermal capacity} = mc",
        symbols: [
          { symbol: "Q", meaning: "heat supplied or removed (J)" },
          { symbol: "m", meaning: "mass (kg)" },
          { symbol: "c", meaning: "specific heat capacity (J/(kg·°C))" },
          { symbol: "\\(\\Delta\\theta\\)", meaning: "change in temperature (°C or K)" },
        ],
      },
      authoredExample: {
        prompt:
          "How much heat is needed to raise the temperature of 3 kg of copper (specific heat \\(390\\,\\text{J/(kg·°C)}\\)) from 25°C to 75°C?",
        steps: [
          "Temperature rise: \\(\\Delta\\theta = 75 - 25 = 50°\\text{C}\\).",
          "Apply \\(Q = mc\\,\\Delta\\theta = 3 \\times 390 \\times 50\\).",
          "\\(Q = 1170 \\times 50 = 58500\\,\\text{J}\\), i.e. 58.5 kJ.",
        ],
        answer: "58 500 J (58.5 kJ).",
      },
      selfCheckExample: {
        prompt:
          "On what does the thermal (heat) capacity of a body depend — mass, shape, both, or temperature?",
        steps: [
          "Thermal capacity \\(= mc\\). For a given material, \\(c\\) is fixed (a material property), so the capacity scales only with mass.",
          "Specific heat is independent of shape, so shape does not enter; temperature dependence is negligible for NDA.",
        ],
        answer: "On the mass of the body only.",
      },
      practiceSet: [
        { prompt: "Specific heat depends on mass and shape: true or false?", answer: "False", method: "it is a material property, independent of both" },
        { prompt: "Heat to warm 2 kg of water (c = 4200) by 5°C?", answer: "42000 J", method: "\\(Q = 2\\times 4200\\times 5\\)" },
        { prompt: "Thermal capacity = mass × ?", answer: "Specific heat" },
        { prompt: "Which has higher specific heat — water or iron?", answer: "Water", method: "≈ 4200 vs ≈ 450 J/(kg·°C)" },
      ],
      pyqExampleId: "fb40d7d6-07cd-473e-b0d9-593e191f6931", // 2022 EASY — find mass from Q=mcΔT
      traps: [
        {
          title: "Specific heat is intrinsic; thermal capacity is not",
          body:
            "Specific heat capacity does NOT depend on mass or shape — it is the same for 1 g or 1 tonne of the material. Thermal capacity \\(= mc\\) DOES scale with mass. The NDA repeatedly tests this distinction (statements like 'specific heat depends on mass' are false).",
        },
        {
          title: "Watch the units — kJ vs J, kg vs g",
          body:
            "Convert kilojoules to joules and grams to kilograms before plugging in, or the answer is off by a factor of 1000. In \\(Q = mc\\,\\Delta\\theta\\) keep \\(c\\) in J/(kg·°C) with \\(m\\) in kg.",
        },
      ],
    },

    // Concept 3 — latent heat + ice mixing (HARD)
    {
      kind: "formula" as const,
      slug: "latent-heat-and-mixing",
      name: "Latent heat and the calorimetry mixing balance",
      intuition:
        "When a substance changes phase — ice to water, water to steam — it absorbs heat WITHOUT changing temperature. That hidden heat is the latent heat. In a mixing problem you must account for it separately from the warming/cooling heat. " +
        "The master principle is conservation of energy: in an isolated mix, heat lost by the hot bodies equals heat gained by the cold ones.",
      definition:
        "**Latent heat** \\(L\\): heat per unit mass absorbed or released during a phase change **at constant temperature** — \\(Q = mL\\). For water (in calorie units): latent heat of fusion (melting) \\(\\approx 80\\) cal/g; latent heat of vaporization \\(\\approx 540\\) cal/g.\n" +
        "**Principle of calorimetry (method of mixtures):** in an isolated system,\n" +
        "- **Heat lost by hot bodies = heat gained by cold bodies.**\n" +
        "- A calorimetry problem chains \\(Q = mc\\,\\Delta\\theta\\) terms (temperature change) with \\(Q = mL\\) terms (phase change) until everything reaches a common final temperature.",
      formula: {
        label: "Latent heat + the mixing balance",
        latex: "Q = mL \\qquad \\sum Q_{\\text{lost}} = \\sum Q_{\\text{gained}}",
        symbols: [
          { symbol: "L", meaning: "specific latent heat (cal/g or J/kg)" },
          { symbol: "m", meaning: "mass undergoing phase change" },
          { symbol: "Q", meaning: "heat absorbed/released at constant temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "5 g of ice at −20°C is dropped into m kg of water at 30°C. The final state is liquid at 0°C. Find m. (Take ice specific heat 0.5 cal/(g·°C), latent heat of fusion 80 cal/g, water specific heat 1 cal/(g·°C).)",
        steps: [
          "Heat GAINED by ice (cold body): warm ice from −20°C to 0°C, then melt it at 0°C.",
          "Warming: \\(5\\times 0.5\\times 20 = 50\\) cal. Melting: \\(5\\times 80 = 400\\) cal. Total gained \\(= 450\\) cal.",
          "Heat LOST by water (hot body) cooling from 30°C to 0°C: \\((m\\times 1000)\\times 1\\times 30\\) cal (mass in grams = \\(1000m\\)).",
          "Balance: \\(1000m\\times 30 = 450 \\Rightarrow m = \\frac{450}{30000} = 0.015\\,\\text{kg}\\).",
        ],
        answer: "m = 0.015 kg (15 g).",
      },
      selfCheckExample: {
        prompt:
          "10 g of ice at −10°C is mixed with 10 g of water at 0°C. How much heat is needed to raise the whole mixture to 10°C? (ice c = 0.5, fusion 80, water c = 1, all cal/g.)",
        steps: [
          "Warm ice −10°C → 0°C: \\(10\\times 0.5\\times 10 = 50\\) cal.",
          "Melt the 10 g of ice at 0°C: \\(10\\times 80 = 800\\) cal. (The 10 g of water at 0°C needs no heat to reach 0°C.)",
          "Now 20 g of water at 0°C; warm to 10°C: \\(20\\times 1\\times 10 = 200\\) cal.",
          "Total \\(= 50 + 800 + 200 = 1050\\) cal.",
        ],
        answer: "1050 cal.",
      },
      practiceSet: [
        { prompt: "Heat to melt 4 g of ice at 0°C (L = 80 cal/g)?", answer: "320 cal", method: "\\(Q = mL = 4\\times 80\\)" },
        { prompt: "During melting, does the temperature change?", answer: "No", method: "latent heat is absorbed at constant temperature" },
        { prompt: "State the calorimetry balance in words.", answer: "Heat lost by hot bodies = heat gained by cold bodies" },
        { prompt: "Latent heat of vaporization of water (cal/g)?", answer: "≈ 540 cal/g" },
      ],
      pyqExampleId: "387f390f-1a21-42d4-8c7a-60bb27cc9b22", // 2026 HARD — ice into water, find m
      traps: [
        {
          title: "Don't forget the latent-heat term while ice is melting",
          body:
            "A classic error is treating ice → water as pure \\(Q = mc\\,\\Delta\\theta\\). The melting itself absorbs \\(mL\\) at a flat 0°C with no temperature change. Add a separate \\(mL\\) term, or your heat budget is hundreds of calories short.",
        },
        {
          title: "Keep masses in consistent units across both sides",
          body:
            "In these problems one mass is in grams (ice) and the other may be given in kg (water). Convert to grams everywhere (or kg everywhere) before equating heat lost and heat gained.",
        },
      ],
    },

    // Concept 4 — variable specific heat (HARD, integration)
    {
      kind: "formula" as const,
      slug: "variable-specific-heat",
      name: "When specific heat varies with temperature",
      intuition:
        "If a material's specific heat changes with temperature — say \\(C(T) = C_0 + \\alpha T\\) — you cannot just use \\(Q = mc\\,\\Delta\\theta\\) with a single \\(c\\). Instead you add up \\(mC(T)\\,dT\\) over the temperature range, which means integrating.",
      definition:
        "When specific heat is **temperature-dependent**, the heat supplied is the integral\n" +
        "\\[Q = m\\int_{T_1}^{T_2} C(T)\\,dT.\\]\n" +
        "For the common linear form \\(C(T) = C_0 + \\alpha T\\), this evaluates to\n" +
        "\\[Q = m(T_2 - T_1)\\left[C_0 + \\tfrac{1}{2}\\alpha(T_1 + T_2)\\right],\\]\n" +
        "i.e. the bracket carries the average value of \\(C\\) over the interval.",
      formula: {
        label: "Heat for a temperature-dependent specific heat",
        latex:
          "Q = m\\int_{T_1}^{T_2}\\!\\big(C_0 + \\alpha T\\big)\\,dT = m(T_2 - T_1)\\left[C_0 + \\tfrac{1}{2}\\alpha(T_1 + T_2)\\right]",
        symbols: [
          { symbol: "C_0", meaning: "specific heat at T = 0 (a constant)" },
          { symbol: "\\(\\alpha\\)", meaning: "rate of change of specific heat with temperature" },
          { symbol: "T_1, T_2", meaning: "initial and final temperatures" },
        ],
      },
      authoredExample: {
        prompt:
          "A solid of mass m has specific heat \\(C(T) = C_0 + \\alpha T\\). It is heated from \\(T_1\\) to \\(T_2\\). Find the heat Q supplied.",
        steps: [
          "Write \\(Q = m\\int_{T_1}^{T_2}(C_0 + \\alpha T)\\,dT\\).",
          "Integrate: \\(\\int(C_0 + \\alpha T)\\,dT = C_0 T + \\tfrac{\\alpha}{2}T^2\\).",
          "Evaluate: \\(Q = m\\left[C_0(T_2 - T_1) + \\tfrac{\\alpha}{2}(T_2^2 - T_1^2)\\right]\\).",
          "Factor \\((T_2 - T_1)\\) using \\(T_2^2 - T_1^2 = (T_2 - T_1)(T_2 + T_1)\\): \\(Q = m(T_2 - T_1)\\left[C_0 + \\tfrac{\\alpha}{2}(T_1 + T_2)\\right]\\).",
        ],
        answer: "\\(Q = m(T_2 - T_1)\\left[C_0 + \\tfrac{1}{2}\\alpha(T_1 + T_2)\\right]\\).",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg solid has \\(C(T) = 100 + 0.2T\\) (SI). Find the heat to warm it from \\(T_1 = 100\\,\\text{K}\\) to \\(T_2 = 200\\,\\text{K}\\).",
        steps: [
          "Use \\(Q = m(T_2 - T_1)[C_0 + \\tfrac{1}{2}\\alpha(T_1 + T_2)]\\).",
          "\\(T_2 - T_1 = 100\\); \\(C_0 = 100\\); \\(\\tfrac{1}{2}\\alpha(T_1 + T_2) = \\tfrac{1}{2}(0.2)(300) = 30\\).",
          "Bracket \\(= 100 + 30 = 130\\). So \\(Q = 2\\times 100\\times 130 = 26000\\,\\text{J}\\).",
        ],
        answer: "26000 J (26 kJ).",
      },
      practiceSet: [
        { prompt: "For variable c, Q equals the integral of what?", answer: "\\(m\\int C(T)\\,dT\\) over the range" },
        { prompt: "The bracket \\(C_0 + \\tfrac{1}{2}\\alpha(T_1+T_2)\\) represents what?", answer: "The average specific heat over the interval" },
        { prompt: "\\(\\int(C_0 + \\alpha T)\\,dT = ?\\)", answer: "\\(C_0 T + \\tfrac{\\alpha}{2}T^2\\)" },
      ],
      pyqExampleId: "ed85da7d-94c0-445e-b6ae-26b09e727884", // 2026 HARD — integrate C(T)
      traps: [
        {
          title: "The factor on \\(\\alpha\\) is one-half, not one",
          body:
            "The planted distractor uses \\([C_0 + \\alpha(T_1 + T_2)]\\) (no one-half). The integral of \\(\\alpha T\\) gives \\(\\tfrac{\\alpha}{2}T^2\\), so after factoring you get \\(\\tfrac{1}{2}\\alpha(T_1 + T_2)\\) — the half is essential.",
        },
      ],
    },

    // Concept 5 — heat transfer modes (REFERENCE)
    {
      kind: "reference" as const,
      slug: "modes-of-heat-transfer",
      name: "The three modes of heat transfer — conduction, convection, radiation",
      intuition:
        "Heat moves from hot to cold in exactly three ways. CONDUCTION passes heat molecule-to-molecule through a solid without the molecules travelling. CONVECTION carries heat by the bulk movement of a heated fluid (warm fluid rises, cool sinks). RADIATION sends heat as electromagnetic waves — it needs no medium and travels at the speed of light, which is how the Sun warms the Earth across empty space.",
      definition:
        "Three independent mechanisms by which heat is transferred. The defining facts that the NDA tests: conduction needs contact and no bulk motion, convection needs a moving fluid, and **radiation needs no medium and travels at the speed of light**.",
      visualizationSlug: "ht-heat-transfer-modes",
      table: {
        columns: ["Mode", "How it works", "Medium / key fact"],
        rows: [
          {
            cells: [
              "**Conduction**",
              "Heat passes molecule to molecule; molecules vibrate in place and pass energy to neighbours without moving from their positions",
              "Needs a material medium; dominant in **solids** (especially metals)",
            ],
          },
          {
            cells: [
              "**Convection**",
              "Heated fluid becomes less dense and rises; cooler fluid sinks to replace it, setting up a circulating current that carries heat",
              "Needs a **fluid** (liquid or gas) that can flow; bulk movement of matter",
            ],
          },
          {
            cells: [
              "**Radiation**",
              "Heat travels as electromagnetic (infrared) waves in a straight line",
              "**Needs NO medium**; travels at the **speed of light** — how the Sun heats Earth",
            ],
            noteAmber:
              "NDA 2019 — 'heat waves travel in a straight line with the speed of light' is THERMAL RADIATION (not conduction or convection).",
          },
        ],
        caption:
          "Conduction and convection both require a medium; only radiation crosses vacuum. A thermos flask defeats all three: vacuum gap stops conduction/convection, silvered walls reflect radiation.",
      },
      selfCheckExample: {
        prompt:
          "Which one of these statements about a thermos (vacuum) flask is NOT correct? (a) the walls are separated by vacuum, (b) the glass walls have shiny silvered surfaces, (c) the inner wall radiates heat and the outer wall absorbs it, (d) the cork supports are poor conductors.",
        steps: [
          "A thermos is designed to MINIMISE all three heat-transfer modes, not to radiate or absorb heat.",
          "The vacuum stops conduction and convection; the silvered (shiny) walls REFLECT radiation rather than radiating or absorbing it; the cork stops conduction at the neck.",
          "So statement (c) — that the inner wall radiates and the outer absorbs — describes the opposite of what a flask does.",
        ],
        answer: "(c) is NOT correct — the silvered walls reflect radiation; they do not radiate/absorb it.",
      },
      practiceSet: [
        { prompt: "Which mode of heat transfer needs no medium?", answer: "Radiation" },
        { prompt: "Heat transfer through a metal rod is by which mode?", answer: "Conduction" },
        { prompt: "How does heat travel through boiling water (a fluid)?", answer: "Convection" },
        { prompt: "Radiation travels at the speed of what?", answer: "Light", method: "it is electromagnetic" },
        { prompt: "What stops conduction and convection in a thermos flask?", answer: "The vacuum gap between the walls" },
      ],
      pyqExampleId: "b5f31a99-79ed-41d3-b5de-1ea79b50b803", // 2019 EASY — heat waves at speed of light = radiation
      traps: [
        {
          title: "Only radiation crosses a vacuum",
          body:
            "Conduction and convection BOTH need matter — conduction needs contact, convection needs a flowing fluid. Radiation alone needs no medium, which is why the Sun's heat reaches us through the vacuum of space. Any 'heat travels at the speed of light' clue means radiation.",
        },
        {
          title: "A thermos REFLECTS radiation — it does not absorb it",
          body:
            "The silvered walls are there to reflect infrared back, not to soak it up. An option saying the inner wall radiates and the outer absorbs is the planted wrong statement on 'which is NOT correct' questions.",
        },
      ],
    },
  ],
};
