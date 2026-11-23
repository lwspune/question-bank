import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_ABSORPTION_NOTE: SubtopicNote = {
  subtopicName: "Absorption, Reflection and Transmission of Heat Radiation",
  title: "Absorption, Reflection and Transmission of Heat Radiation",
  oneLineDefinition:
    "What happens to heat radiation falling on a body: the coefficients of absorption, reflection and transmission, why they add up to one, and diathermanous and athermanous substances.",
  whyItMatters:
    "6 questions. Four were set in board papers: the emissivity and transmission coefficient of a perfect blackbody (2024), the transmission coefficient of an athermanous material (2025), which material is diathermanous (2025), and the derivation of a + r + t = 1 (2026). The textbook adds a sum on the three coefficients and the definitions of athermanous and diathermanous substances.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpkt-art-relation",
      name: "Coefficients of absorption, reflection and transmission",
      intuition:
        "When heat radiation falls on a body, it has only three choices: it is soaked up, it bounces off, or it passes through. Energy is not lost, so the three shares always add up to the whole. Each coefficient is simply the fraction that takes one route.",
      definition:
        "**Derivation:**\n" +
        "- Let Q be the radiant heat falling on a body. Of it, \\(Q_a\\) is absorbed, \\(Q_r\\) is reflected and \\(Q_t\\) is transmitted.\n" +
        "- By conservation of energy, \\(Q = Q_a + Q_r + Q_t\\).\n" +
        "- Dividing by Q: \\(\\dfrac{Q_a}{Q} + \\dfrac{Q_r}{Q} + \\dfrac{Q_t}{Q} = 1\\).\n" +
        "- The three ratios are the **coefficient of absorption** a, the **coefficient of reflection** r and the **coefficient of transmission** \\(t_r\\), so \\(a + r + t_r = 1\\).\n" +
        "- Each is a pure number between 0 and 1. A perfect blackbody has \\(a = 1\\), \\(r = t_r = 0\\). A perfect reflector has \\(r = 1\\). An athermanous body has \\(t_r = 0\\), so \\(a + r = 1\\).",
      formula: {
        label: "Absorption, reflection and transmission",
        latex: "a + r + t_r = 1",
        symbols: [
          { symbol: "\\(a\\)", meaning: "coefficient of absorption, fraction absorbed" },
          { symbol: "\\(r\\)", meaning: "coefficient of reflection, fraction reflected" },
          { symbol: "\\(t_r\\)", meaning: "coefficient of transmission, fraction transmitted" },
        ],
      },
      authoredExample: {
        prompt: "Of 500 J of heat radiation falling on a body, 150 J is reflected and 50 J is transmitted. Find the coefficients of absorption, reflection and transmission.",
        steps: [
          "Given: \\(Q = 500\\) J, \\(Q_r = 150\\) J, \\(Q_t = 50\\) J, so \\(Q_a = 500 - 150 - 50 = 300\\) J.",
          "\\(a = \\dfrac{300}{500} = 0.6\\), \\(r = \\dfrac{150}{500} = 0.3\\), \\(t_r = \\dfrac{50}{500} = 0.1\\).",
          "Check: \\(0.6 + 0.3 + 0.1 = 1\\).",
        ],
        answer: "a = 0.6, r = 0.3, t = 0.1",
      },
      selfCheckExample: {
        prompt: "A body has a coefficient of absorption of 0.55 and a coefficient of transmission of 0.15. Find its coefficient of reflection.",
        steps: ["\\(r = 1 - a - t_r\\).", "\\(r = 1 - 0.55 - 0.15 = 0.30\\)."],
        answer: "0.3",
      },
      practiceSet: [
        { prompt: "What are a and r for a perfect reflector?", answer: "\\(r = 1\\), \\(a = 0\\)" },
        { prompt: "What is the coefficient of absorption of a perfect blackbody?", answer: "1" },
        { prompt: "Do the coefficients a, r and t have units?", answer: "No. Each is a ratio of two quantities of heat" },
      ],
      pyqExampleId: "3e7a816d-f3dc-435e-b662-1008b4776c35",
      traps: [
        {
          title: "Writing the relation without the reason",
          body: "\\(a + r + t_r = 1\\) is worth its marks only with the step before it: the incident heat splits into absorbed, reflected and transmitted parts, and energy is conserved.",
        },
        {
          title: "Coefficients as fixed properties",
          body: "a, r and \\(t_r\\) also depend on the wavelength of the radiation. A substance can transmit one range of wavelengths and stop another.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpkt-athermanous",
      name: "Diathermanous and athermanous substances",
      intuition:
        "Some substances let heat radiation pass straight through, as clear glass lets light through. Others stop it completely: everything that falls on them is either absorbed or reflected. The two names sort substances by that one property, the coefficient of transmission.",
      definition:
        "- **Diathermanous substances** allow heat radiation to pass through them: \\(t_r \\neq 0\\).\n" +
        "- **Athermanous substances** are largely opaque to heat radiation and do not transmit it: \\(t_r = 0\\), so \\(a + r = 1\\).",
      table: {
        columns: ["Point", "Diathermanous", "Athermanous"],
        rows: [
          { cells: ["Heat radiation", "Passes through", "Does not pass through"] },
          {
            cells: ["Coefficient of transmission", "Not zero", "Zero, so a + r = 1"],
            pyqExampleId: "13af1a11-9934-4a0f-a704-743c31afa49f",
            noteAmber: "Board 2025 asked the coefficient of transmission of an athermanous material: zero.",
          },
          {
            cells: ["Examples", "Glass, quartz, sodium chloride, hydrogen, oxygen, dry air", "Water, wood, iron, copper, moist air, benzene"],
            pyqExampleId: "acc6af7e-cf9e-4f6b-a6c0-53f75a18a110",
            noteAmber: "Board 2025 asked which of wood, iron, glass and copper is diathermanous: glass.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "An athermanous body reflects 40% of the heat radiation falling on it. What fraction does it absorb?",
        steps: ["For an athermanous body \\(t_r = 0\\), so \\(a + r = 1\\).", "\\(a = 1 - 0.4 = 0.6\\)."],
        answer: "0.6 (60%)",
      },
      practiceSet: [
        { prompt: "Is dry air diathermanous or athermanous?", answer: "Diathermanous" },
        { prompt: "Is moist air diathermanous or athermanous?", answer: "Athermanous" },
        { prompt: "Name two athermanous substances.", answer: "Any two of water, wood, iron, copper, moist air, benzene" },
      ],
      traps: [
        {
          title: "Mixing up the two prefixes",
          body: "'Dia' means through: diathermanous substances let heat radiation through. 'A' means not: athermanous substances do not.",
        },
      ],
    },
  ],
};
