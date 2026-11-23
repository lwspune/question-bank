import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_KIRCHHOFF_NOTE: SubtopicNote = {
  subtopicName: "Kirchhoff's Law of Heat Radiation",
  title: "Kirchhoff's Law of Heat Radiation",
  oneLineDefinition:
    "At a given temperature, the ratio of a body's emissive power to its coefficient of absorption equals the emissive power of a perfect blackbody, so a good absorber is a good emitter.",
  whyItMatters:
    "2 questions, both asking you to state and prove Kirchhoff's law: one set in a board paper (2025) and one from the textbook exercise. It is a full long answer: the statement, the two bodies in an enclosure, the two equations and the result a = e.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpkt-kirchhoff-law",
      name: "Statement and proof of Kirchhoff's law",
      intuition:
        "Put an ordinary body and a perfect blackbody in the same closed box and wait. Both settle at the box's temperature, so each must give out exactly as much heat as it takes in. The blackbody takes in everything that falls on it; the ordinary body takes in only the fraction a. So the ordinary body must also give out only the fraction a of what the blackbody gives out.",
      definition:
        "- **Statement:** at a given temperature, the ratio of the emissive power of a body to its coefficient of absorption is equal to the emissive power of a perfect blackbody at the same temperature: \\(\\dfrac{R}{a} = R_B\\). Since \\(e = R/R_B\\), this means \\(a = e\\): a good absorber is a good emitter.\n" +
        "**Proof:**\n" +
        "- Place an ordinary body A and a perfect blackbody B of the same shape in an enclosure. In thermal equilibrium both are at the temperature of the enclosure.\n" +
        "- Let Q be the radiant heat falling on unit area of each body in unit time, R the emissive power of A, \\(R_B\\) that of B, and a the coefficient of absorption of A.\n" +
        "- A absorbs \\(aQ\\). Its temperature stays constant, so it emits what it absorbs: \\(R = aQ\\) ... (1)\n" +
        "- B absorbs all of Q and emits what it absorbs: \\(R_B = Q\\) ... (2)\n" +
        "- Dividing (1) by (2): \\(\\dfrac{R}{R_B} = a\\), that is \\(\\dfrac{R}{a} = R_B\\). As \\(\\dfrac{R}{R_B} = e\\), \\(a = e\\).",
      formula: {
        label: "Kirchhoff's law of heat radiation",
        latex: "\\frac{R}{a} = R_B, \\qquad a = e",
        symbols: [
          { symbol: "\\(R\\)", meaning: "emissive power of the body" },
          { symbol: "\\(a\\)", meaning: "coefficient of absorption of the body" },
          { symbol: "\\(R_B\\)", meaning: "emissive power of a perfect blackbody at the same temperature" },
        ],
      },
      authoredExample: {
        prompt: "A body has a coefficient of absorption of 0.4. At its temperature, a perfect blackbody has an emissive power of 2000 W/m². Find the emissive power of the body.",
        steps: [
          "Given: \\(a = 0.4\\), \\(R_B = 2000\\) W/m².",
          "Formula: \\(\\dfrac{R}{a} = R_B\\), so \\(R = aR_B\\).",
          "Substitution: \\(R = 0.4 \\times 2000 = 800\\) W/m².",
        ],
        answer: "800 W/m²",
      },
      selfCheckExample: {
        prompt: "An athermanous surface has an emissivity of 0.7. What fraction of the heat radiation falling on it does it absorb, and what fraction does it reflect?",
        steps: ["By Kirchhoff's law \\(a = e = 0.7\\).", "Athermanous, so \\(t_r = 0\\) and \\(r = 1 - 0.7 = 0.3\\)."],
        answer: "Absorbs 0.7, reflects 0.3",
      },
      practiceSet: [
        { prompt: "Complete: a good absorber of heat radiation is a good ______.", answer: "Emitter" },
        { prompt: "A body has an emissive power of 300 W/m² where a perfect blackbody at the same temperature has 1200 W/m². Find its coefficient of absorption.", answer: "0.25" },
      ],
      pyqExampleId: "02f878d5-fefd-4bfb-8267-70128ec8b0b0",
      traps: [
        {
          title: "Leaving out thermal equilibrium",
          body: "The proof works only because both bodies are in equilibrium with the enclosure, so each emits exactly what it absorbs. Say this, or the step R = aQ has no reason behind it.",
        },
        {
          title: "Stating the law without 'same temperature'",
          body: "\\(R/a\\) equals the emissive power of a blackbody at the SAME temperature. Without that phrase the statement loses its mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpkt-kirchhoff-uses",
      name: "Good absorber, good emitter: everyday uses",
      intuition:
        "Kirchhoff's law explains why we blacken some surfaces and polish or silver others. To take in heat well, use a black surface. To keep heat in, use a shiny one, which absorbs little and therefore also gives out little.",
      definition:
        "- Since \\(a = e\\), a black surface (a near 1) absorbs and radiates well, and a polished or silvered surface (r near 1, a small) absorbs and radiates poorly.\n" +
        "- A line of application after the proof shows the examiner you understand what the law means.",
      table: {
        columns: ["Observation", "Explanation"],
        rows: [
          {
            cells: ["The bottom of a cooking utensil is blackened", "A black surface absorbs heat radiation well"],
            pyqExampleId: "1c37a54c-0b81-4c92-967c-9b6fc3a0f5d3",
          },
          { cells: ["The top of a cooking utensil is polished", "A polished surface absorbs little and so also radiates little heat away"] },
          { cells: ["The walls of a thermos flask are silvered", "A good reflector is a poor absorber and so a poor emitter, so little heat crosses the walls by radiation"] },
        ],
      },
      practiceSet: [
        { prompt: "Why are the walls of a thermos flask silvered?", answer: "A silvered surface is a poor absorber and so a poor emitter, which cuts heat exchange by radiation" },
        { prompt: "By Kirchhoff's law, is a highly reflecting surface a good or a poor emitter?", answer: "A poor emitter" },
      ],
      traps: [
        {
          title: "Thinking a good reflector is a good emitter",
          body: "A good reflector absorbs little, so by \\(a = e\\) it emits little. Shiny surfaces keep heat in; black surfaces lose it fastest.",
        },
      ],
    },
  ],
};
