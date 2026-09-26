import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/surface-chemistry";

export const ADSORPTION_NOTE: SubtopicNote = {
  subtopicName: "Adsorption, Physisorption, Chemisorption and Isotherms",
  title: "Adsorption: Surface vs Bulk, Physisorption vs Chemisorption, and the Freundlich Isotherm",
  oneLineDefinition:
    "Adsorption is the gathering of a substance on the surface of another; it is exothermic, falls as temperature rises, and grows with pressure and with how easily the gas liquefies.",
  whyItMatters:
    "12 PYQs, none HARD. Four separate adsorption from absorption, sorption and desorption; six ask which gas adsorbs most, whether a case is physisorption, or how temperature acts; two are the Freundlich equation. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetsurf-adsorption-basics",
      name: "Adsorption, Absorption, Sorption and Desorption",
      intuition:
        "Adsorption stays on the surface; absorption soaks right through the bulk. When both happen at once — the dye sticks to the chalk's surface while the water soaks in — it is sorption. Desorption is adsorption run backwards, freeing the surface for more.",
      definition:
        "- **Adsorption**: a **surface** phenomenon; the concentration is higher at the surface than in the bulk; **exothermic**; usually **reversible**.\n" +
        "- **Absorption**: a **bulk** phenomenon; uniform concentration throughout; independent of surface area.\n" +
        "- **Sorption**: adsorption and absorption together — **chalk dipped in ink**.\n" +
        "- **Desorption**: removing the adsorbed substance, freeing the sites for more adsorbate.",
      authoredExample: {
        prompt: "Which is an example of sorption: charcoal in methylene blue, chalk dipped in ink, H₂ over platinum, O₂ over nickel?",
        steps: [
          "Charcoal and dye, H₂ on Pt, O₂ on Ni: the substance stays on the surface — adsorption only.",
          "Chalk in ink: the dye is adsorbed on the surface while the solvent is absorbed into the chalk — both at once.",
        ],
        answer: "Chalk dipped in ink",
      },
      selfCheckExample: {
        prompt: "Which is NOT true of absorption: uniform concentration in the bulk; independent of temperature and pressure; no heat change; depends on surface area?",
        steps: ["Dependence on surface area is the mark of ADSORPTION. Absorption is a bulk process."],
        answer: "It depends on surface area",
      },
      practiceSet: [
        { prompt: "Adsorption is NOT which of these: irreversible, bulk, exothermic, endothermic?", answer: "Bulk — it is a surface phenomenon" },
        { prompt: "Freeing an adsorbent's sites so more adsorbate can occupy them is called?", answer: "Desorption" },
      ],
      pyqExampleId: "23bedcd3-a8f5-4cd3-b235-93fad643597e",
      traps: [
        {
          title: "Calling a dye on charcoal sorption",
          body: "Charcoal decolourising methylene blue is the textbook ADSORPTION example. Sorption needs something to be absorbed into the bulk as well.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetsurf-physisorption-chemisorption",
      name: "Physisorption vs Chemisorption, and What Controls the Extent",
      intuition:
        "Physisorption is weak van der Waals attraction — non-specific, so charcoal takes up any gas, and more of a gas that liquefies easily. Chemisorption forms real chemical bonds with particular metals, like H₂ on nickel or N₂ on iron. Both release heat, so cooling increases adsorption.",
      definition:
        "- **Physisorption**: van der Waals forces, **non-specific**, low enthalpy, reversible, multilayer — **all gases on charcoal**.\n" +
        "- **Chemisorption**: chemical bonds, **specific**, high enthalpy, often irreversible, monolayer — O₂ on W, H₂ on Ni, N₂ on Fe.\n" +
        "- **Nature of gas**: higher **critical temperature** (easier to liquefy) → more adsorbed: **SO₂ ≈ Cl₂ > NH₃ > … > O₂ > N₂ > H₂**.\n" +
        "- **Temperature**: adsorption is exothermic, so it **decreases as temperature rises** — the lowest-temperature isobar sits highest.\n" +
        "- **Pressure and surface area**: more of each → more adsorption.",
      formula: {
        label: "Extent of physisorption",
        latex: "\\frac{x}{m} \\uparrow \\ \\text{as}\\ T_c \\uparrow,\\ p \\uparrow,\\ T \\downarrow",
      },
      authoredExample: {
        prompt: "Which gas is adsorbed least on a solid under the same conditions: Cl₂, NH₃, SO₂, H₂?",
        steps: [
          "The extent follows the critical temperature: the easier a gas liquefies, the more it adsorbs.",
          "H₂ has by far the lowest critical temperature of the four.",
        ],
        answer: "H₂",
      },
      selfCheckExample: {
        prompt: "An adsorption graph shows isobars at 195 K, 210 K, 244 K and 273 K. At which temperature is the most gas adsorbed?",
        steps: ["Adsorption is exothermic, so the lowest temperature gives the highest curve."],
        answer: "195 K",
      },
      practiceSet: [
        { prompt: "Which is physisorption: O₂ on W, H₂ on Ni, N₂ on Fe, all gases on charcoal?", answer: "All gases on charcoal" },
        { prompt: "Most readily adsorbed: Cl₂, N₂, O₂, H₂?", answer: "Cl₂" },
        { prompt: "Which factor is inversely related to adsorption: critical temperature, surface area, temperature, pressure?", answer: "Temperature" },
      ],
      pyqExampleId: "a2c47656-af1b-4604-877b-389ca83f7fd5",
      traps: [
        {
          title: "Reading 'inversely proportional' as critical temperature",
          body: "Critical temperature raises adsorption; the TEMPERATURE of the process lowers it. The question lists both on purpose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetsurf-freundlich",
      name: "The Freundlich Adsorption Isotherm",
      intuition:
        "At a fixed temperature, the amount adsorbed per gram of adsorbent rises with pressure — but less than proportionally, as a fractional power 1/n with n > 1. Taking logs turns it into a straight line whose slope is 1/n and intercept log k.",
      definition:
        "- **Freundlich equation**: **x/m = k p^(1/n)**, with n > 1 (for a solution, p is replaced by the concentration C).\n" +
        "- **Log form**: log(x/m) = log k + (1/n) log p — a straight line.\n" +
        "- **Slope = 1/n**; **intercept = log k**.",
      formula: {
        label: "Freundlich isotherm",
        latex: "\\frac{x}{m} = k\\,p^{1/n}\\quad\\Longrightarrow\\quad \\log\\frac{x}{m} = \\log k + \\frac{1}{n}\\log p",
      },
      authoredExample: {
        prompt: "In a Freundlich plot of log(x/m) against log C, what are the slope and the intercept?",
        steps: [
          "Write the equation in log form: \\(\\log(x/m) = \\log k + \\tfrac{1}{n}\\log C\\).",
          "Compare with y = c + mx: the slope multiplies log C, the intercept stands alone.",
        ],
        answer: "Slope 1/n; intercept log k",
      },
      selfCheckExample: {
        prompt: "Which is Freundlich's equation for a gas on a solid: x/m = kp^(1/n), m/x = kp^(1/n), x/m = kpⁿ, m/x = kpⁿ?",
        steps: ["Amount adsorbed per unit mass (x/m) equals k times p to the power 1/n."],
        answer: "x/m = kp^(1/n)",
      },
      practiceSet: [
        { prompt: "Slope of log(x/m) vs log C in the Freundlich isotherm?", answer: "1/n" },
      ],
      pyqExampleId: "2635dac7-c711-4928-80bf-2791f70011dd",
      traps: [
        {
          title: "Inverting x/m or the exponent",
          body: "The options swap x/m for m/x and 1/n for n. It is x/m on the left, and the power is the FRACTION 1/n.",
        },
      ],
    },
  ],
  related: [
    { label: "Catalysis — adsorption is how a solid catalyst works", href: `${BASE}/cetsurf-catalysis` },
  ],
};
