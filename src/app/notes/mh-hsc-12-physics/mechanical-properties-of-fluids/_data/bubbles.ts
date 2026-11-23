import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_BUBBLES_NOTE: SubtopicNote = {
  subtopicName: "Excess Pressure, Drops and Bubbles",
  title: "Excess Pressure in Drops and Bubbles",
  oneLineDefinition:
    "Why the pressure inside a curved liquid surface is higher than outside, Laplace's law 2T/r for a drop and 4T/r for a soap bubble, and how to find the pressure inside a drop or bubble.",
  whyItMatters:
    "6 questions. Three were set in board papers: derive Laplace's law for a spherical membrane (2016), find the pressure inside a water drop (2025), and find the radius of a drop for a given excess pressure (2026). The textbook adds the derivation for a drop, the diameter of a drop and the gauge pressure in an air bubble just under water.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-laplace",
      name: "Laplace's law for a spherical membrane",
      intuition:
        "A curved liquid surface is a stretched skin, and a stretched skin pressing round a ball squeezes what is inside. So the pressure on the inside (concave side) of a drop or bubble is higher than outside. The smaller the radius, the more sharply the skin curves and the bigger this excess. A soap bubble has two skins, so its excess is twice that of a drop of the same size.",
      definition:
        "- The pressure on the **concave** side of a curved liquid surface is greater than on the convex side.\n" +
        "- Derivation: take a drop of radius \\(r\\), surface tension \\(T\\), pressure \\(p_i\\) inside and \\(p_o\\) outside.\n" +
        "- Let the radius grow by a very small \\(\\Delta r\\), so that the pressure inside stays practically constant.\n" +
        "- Work done by the excess pressure: \\(dW = (p_i - p_o) \\times 4\\pi r^2 \\times \\Delta r\\).\n" +
        "- Increase in area: \\(4\\pi(r + \\Delta r)^2 - 4\\pi r^2 = 8\\pi r\\,\\Delta r\\), neglecting \\(\\Delta r^2\\).\n" +
        "- Increase in surface energy: \\(T \\times 8\\pi r\\,\\Delta r\\).\n" +
        "- Equate the two: \\((p_i - p_o)\\,4\\pi r^2\\,\\Delta r = 8\\pi r T\\,\\Delta r\\), so \\(p_i - p_o = \\dfrac{2T}{r}\\). This is **Laplace's law of a spherical membrane**.\n" +
        "- A drop, and an air bubble inside a liquid, have one surface: \\(\\dfrac{2T}{r}\\). A soap bubble in air has two surfaces, so the new area doubles and \\(p_i - p_o = \\dfrac{4T}{r}\\).",
      formula: {
        label: "Laplace's law",
        latex: "p_i - p_o = \\frac{2T}{r} \\ (\\text{drop}), \\qquad p_i - p_o = \\frac{4T}{r} \\ (\\text{soap bubble in air})",
        symbols: [
          { symbol: "\\(p_i - p_o\\)", meaning: "excess pressure inside" },
          { symbol: "\\(r\\)", meaning: "radius of the drop or bubble" },
        ],
      },
      authoredExample: {
        prompt: "Find the excess pressure inside a soap bubble of radius 1 cm. Surface tension of the soap solution \\(= 0.03\\) N/m.",
        steps: [
          "Given: \\(r = 1\\) cm \\(= 0.01\\) m, \\(T = 0.03\\) N/m.",
          "Formula: a soap bubble in air has two surfaces, so \\(p_i - p_o = \\dfrac{4T}{r}\\).",
          "Substitution: \\(p_i - p_o = \\dfrac{4 \\times 0.03}{0.01} = 12\\) N/m².",
        ],
        answer: "12 N/m²",
      },
      selfCheckExample: {
        prompt: "Two soap bubbles of radii 1 cm and 3 cm are joined by a narrow tube. Which way does the air flow, and why?",
        steps: [
          "Excess pressure \\(\\propto \\dfrac{1}{r}\\), so the smaller bubble has the larger pressure inside.",
          "Air flows from the high pressure to the low pressure.",
        ],
        answer: "From the 1 cm bubble into the 3 cm bubble; the small bubble shrinks and the large one grows",
      },
      practiceSet: [
        { prompt: "On which side of a curved liquid surface is the pressure greater?", answer: "On the concave side" },
        { prompt: "How many free surfaces does an air bubble inside water have?", answer: "One, so its excess pressure is \\(2T/r\\)" },
        { prompt: "The radius of a soap bubble is halved. What happens to the excess pressure inside it?", answer: "It doubles, since it varies as \\(1/r\\)" },
      ],
      pyqExampleId: "aabb4bae-730f-4f37-a52a-9cbbd37b7b76",
      traps: [
        {
          title: "4T/r for every bubble",
          body: "Only a soap bubble in air has two surfaces. An air bubble inside a liquid has one surface, so its excess pressure is \\(2T/r\\), the same as a drop.",
        },
        {
          title: "Not saying why Δr² is dropped",
          body: "Say that \\(\\Delta r\\) is very small, so \\(\\Delta r^2\\) is negligible and the pressure inside stays constant. These two lines carry marks in the derivation.",
        },
        {
          title: "Bigger bubble, bigger pressure",
          body: "The excess pressure varies as \\(1/r\\). The smaller bubble has the higher pressure inside, which is why it empties into a larger one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-excess-pressure",
      name: "Pressure inside drops and bubbles",
      intuition:
        "Laplace's law gives only the extra pressure due to the curved surface. The total pressure inside is that extra added to whatever presses on the outside: the air for a drop in air, or the air plus the liquid above for a bubble under water.",
      definition:
        "- Pressure inside a drop in air: \\(p_i = p_0 + \\dfrac{2T}{r}\\), where \\(p_0\\) is the atmospheric pressure. The gauge pressure inside is \\(\\dfrac{2T}{r}\\).\n" +
        "- Air bubble at a depth \\(h\\) in a liquid of density \\(\\rho\\): the pressure outside it is \\(p_0 + h\\rho g\\), so \\(p_i = p_0 + h\\rho g + \\dfrac{2T}{r}\\). Just below the surface, \\(h\\rho g\\) is negligible.\n" +
        "- Rearranged for the radius: \\(r = \\dfrac{2T}{p_i - p_o}\\) for a drop.\n" +
        "- Always use the radius in metres and \\(T\\) in N/m; 1 dyne/cm \\(= 10^{-3}\\) N/m.",
      formula: {
        label: "Pressure inside a drop in air",
        latex: "p_i = p_0 + \\frac{2T}{r}",
        symbols: [
          { symbol: "\\(p_0\\)", meaning: "atmospheric pressure outside" },
          { symbol: "\\(T\\)", meaning: "surface tension of the liquid" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the pressure inside a water drop of radius 0.5 mm. Surface tension of water \\(= 0.072\\) N/m and atmospheric pressure \\(= 1.013 \\times 10^{5}\\) N/m².",
        steps: [
          "Given: \\(r = 0.5\\) mm \\(= 5 \\times 10^{-4}\\) m, \\(T = 0.072\\) N/m, \\(p_0 = 1.013 \\times 10^{5}\\) N/m².",
          "Excess pressure: \\(\\dfrac{2T}{r} = \\dfrac{2 \\times 0.072}{5 \\times 10^{-4}} = 288\\) N/m².",
          "Formula: \\(p_i = p_0 + \\dfrac{2T}{r} = 101300 + 288 = 101588\\) N/m².",
        ],
        answer: "1.0159 × 10⁵ N/m²",
      },
      selfCheckExample: {
        prompt:
          "An air bubble of radius 0.1 mm is 10 cm below the surface of water. Find the pressure inside it above atmospheric pressure. (\\(T = 0.072\\) N/m, \\(\\rho = 1000\\) kg/m³, \\(g = 9.8\\) m/s²)",
        steps: [
          "Pressure of the water above: \\(h\\rho g = 0.1 \\times 1000 \\times 9.8 = 980\\) N/m².",
          "Excess due to the surface (one surface): \\(\\dfrac{2T}{r} = \\dfrac{0.144}{10^{-4}} = 1440\\) N/m².",
          "Total above atmospheric: \\(980 + 1440 = 2420\\) N/m².",
        ],
        answer: "2420 N/m²",
      },
      practiceSet: [
        { prompt: "Find the excess pressure inside a mercury drop of radius 1 mm. (Surface tension of mercury \\(= 0.465\\) N/m)", answer: "930 N/m²" },
        { prompt: "Find the excess pressure inside a soap bubble of diameter 2 cm, if \\(T = 0.025\\) N/m.", answer: "\\(r = 0.01\\) m, so \\(4T/r = 10\\) N/m²" },
        {
          prompt: "The excess pressure inside one soap bubble is three times that inside another. Compare their radii.",
          answer: "The first has one third the radius of the second (1 : 3)",
        },
      ],
      pyqExampleId: "327c4f56-d761-4ccc-942c-ce04387aa10f",
      traps: [
        {
          title: "Diameter used as radius",
          body: "Questions often give the diameter. Halve it first: using the diameter halves the excess pressure.",
        },
        {
          title: "Excess pressure or pressure inside?",
          body: "\\(2T/r\\) is only the excess. If the question asks for the pressure inside, add the atmospheric pressure (and \\(h\\rho g\\) for a bubble under a liquid).",
        },
        {
          title: "Surface tension left in dyne/cm",
          body: "Convert to N/m before dividing by a radius in metres, or the answer is a thousand times off.",
        },
      ],
    },
  ],
};
