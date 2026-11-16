import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MM_MATERIALS_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Properties of Materials",
  title: "Magnetic Properties of Materials",
  oneLineDefinition:
    "How a material placed in a field H becomes magnetised, M = χH, so that B = μ₀(H + M) and μᵣ = 1 + χ, and how the sign and size of χ sort materials into diamagnetic, paramagnetic and ferromagnetic.",
  whyItMatters:
    "Two NEET questions, both from 2024 and none since. NEET 2024 matched four kinds of material (diamagnetic, ferromagnetic, paramagnetic and non-magnetic) with their ranges of susceptibility, and Re-NEET 2024 asked which relation between μ, μᵣ and χ is wrong for a diamagnet. Both are settled by knowing the ranges exactly.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmm-intensity",
      name: "Magnetisation, magnetic intensity and susceptibility",
      intuition:
        "Put a material inside a solenoid. The current alone sets the magnetic intensity H, whatever fills the core. The material then becomes magnetised: its atoms add up to a magnetic moment, and the moment per unit volume is its magnetisation M. That adds a field of its own, so the total field is \\(B = \\mu_0(H + M)\\). Susceptibility tells how strongly the material answers: \\(M = \\chi H\\). Relative permeability tells the same thing in another form, and the two always differ by one.",
      definition:
        "- **Magnetisation** M: net magnetic moment per unit volume. Unit A/m.\n" +
        "- **Magnetic intensity** H: the part of the field set by the current, \\(H = \\dfrac{B_0}{\\mu_0}\\). In a solenoid with n turns per metre, \\(H = nI\\). Unit A/m.\n" +
        "- Total field: \\(B = \\mu_0(H + M)\\).\n" +
        "- **Susceptibility** \\(\\chi\\): \\(M = \\chi H\\). It has no unit.\n" +
        "- Then \\(B = \\mu_0(1 + \\chi)H = \\mu_0\\mu_r H = \\mu H\\), with relative permeability \\(\\mu_r = 1 + \\chi\\) and permeability \\(\\mu = \\mu_0\\mu_r\\). So \\(\\chi = \\dfrac{\\mu}{\\mu_0} - 1\\).",
      formula: {
        label: "Magnetising a material",
        latex:
          "B = \\mu_0(H + M), \\qquad M = \\chi H, \\qquad \\mu_r = 1 + \\chi = \\frac{\\mu}{\\mu_0}",
        symbols: [
          { symbol: "\\(H\\)", meaning: "magnetic intensity, set by the current" },
          { symbol: "\\(M\\)", meaning: "magnetisation, magnetic moment per unit volume" },
          { symbol: "\\(\\chi\\)", meaning: "magnetic susceptibility, with no unit" },
          { symbol: "\\(\\mu_r\\)", meaning: "relative permeability" },
        ],
      },
      authoredExample: {
        prompt:
          "A long solenoid has 1000 turns per metre and carries 2 A. Its core has relative permeability 400. Find H, B and the magnetisation of the core. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "\\(H = nI = 1000 \\times 2 = 2000\\) A/m. The core does not change H.",
          "\\(B = \\mu_0\\mu_r H = 4\\pi \\times 10^{-7} \\times 400 \\times 2000 = 0.32\\pi \\approx 1.0\\) T.",
          "\\(\\chi = \\mu_r - 1 = 399\\), so \\(M = \\chi H = 399 \\times 2000 \\approx 7.98 \\times 10^{5}\\) A/m.",
        ],
        answer: "2000 A/m; about 1.0 T; about \\(7.98 \\times 10^{5}\\) A/m",
      },
      selfCheckExample: {
        prompt:
          "A magnetic intensity of 3000 A/m inside a rod gives it a magnetisation of \\(4.5 \\times 10^{5}\\) A/m. Find the susceptibility and the relative permeability of the rod.",
        steps: [
          "\\(\\chi = \\dfrac{M}{H} = \\dfrac{4.5 \\times 10^{5}}{3000} = 150\\).",
          "\\(\\mu_r = 1 + \\chi = 151\\).",
        ],
        answer: "\\(\\chi = 150\\), \\(\\mu_r = 151\\)",
      },
      practiceSet: [
        { prompt: "What is the SI unit of magnetisation M?", answer: "A/m (the same as magnetic intensity H)" },
        { prompt: "A material has susceptibility 0.0004. What is its relative permeability?", answer: "1.0004" },
        { prompt: "A solenoid has 500 turns per metre and carries 4 A. What is the magnetic intensity H inside it?", answer: "2000 A/m" },
        { prompt: "Write the total magnetic field B inside a material in terms of H and M.", answer: "\\(B = \\mu_0(H + M)\\)" },
      ],
      pyqExampleId: "c796ec70-a133-4383-bd35-06b8264f8e35",
      traps: [
        {
          title: "Relative permeability and susceptibility differ by one",
          body: "\\(\\mu_r = 1 + \\chi\\). A susceptibility of 599 means a relative permeability of 600. For a small susceptibility, mixing the two up changes the answer completely.",
        },
        {
          title: "A diamagnet's permeability is still positive",
          body: "For a diamagnet \\(\\chi\\) is negative, but \\(\\mu_r = 1 + \\chi\\) lies between 0 and 1, so \\(\\mu\\) is positive and smaller than \\(\\mu_0\\).",
        },
        {
          title: "Magnetisation is per unit volume",
          body: "M is a magnetic moment divided by a volume, so its unit is A/m, not A m². Multiply M by the volume to get the moment of a piece of material.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphmm-classes",
      name: "Diamagnetic, paramagnetic and ferromagnetic materials",
      intuition:
        "Materials answer a magnetic field in three ways. In a diamagnet the field induces a small moment opposite to itself, so the material is weakly pushed out of a strong field. In a paramagnet the atoms already have moments, and the field lines them up a little, so the material is weakly pulled in. In a ferromagnet the atomic moments line up by themselves in small regions called domains, so the material is pulled in strongly. The sign and size of the susceptibility tell the three apart.",
      definition:
        "- **Diamagnetic**: \\(-1 \\le \\chi < 0\\), so \\(0 \\le \\mu_r < 1\\) and \\(\\mu < \\mu_0\\). A superconductor is a perfect diamagnet, with \\(\\chi = -1\\): it pushes the field out completely (the Meissner effect).\n" +
        "- **Paramagnetic**: \\(\\chi\\) small and positive, \\(0 < \\chi < \\varepsilon\\), so \\(1 < \\mu_r < 1 + \\varepsilon\\). Curie's law: its susceptibility falls as the temperature rises, \\(\\chi \\propto \\dfrac{1}{T}\\).\n" +
        "- **Ferromagnetic**: \\(\\chi \\gg 1\\) and \\(\\mu_r \\gg 1\\). Heated above its Curie temperature, a ferromagnet becomes paramagnetic.\n" +
        "- **Non-magnetic** (vacuum): \\(\\chi = 0\\) and \\(\\mu_r = 1\\).\n" +
        "- Here \\(\\varepsilon\\) stands for a small positive number.",
      table: {
        columns: ["Property", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          {
            cells: ["Susceptibility χ", "−1 ≤ χ < 0 (small, negative)", "0 < χ < ε (small, positive)", "χ ≫ 1"],
            pyqExampleId: "900e39f1-30b7-4917-a807-54666298e1ae",
            noteAmber: "NEET 2024: match diamagnetic, ferromagnetic, paramagnetic and non-magnetic materials with their ranges of susceptibility (non-magnetic: χ = 0).",
          },
          { cells: ["Relative permeability μᵣ", "0 ≤ μᵣ < 1", "1 < μᵣ < 1 + ε", "μᵣ ≫ 1"] },
          { cells: ["Permeability μ", "Less than μ₀", "Slightly more than μ₀", "Much more than μ₀"] },
          { cells: ["Atomic moments", "None of their own; the field induces a moment opposite to itself", "Permanent, pointing at random until a field lines them up a little", "Permanent, lined up within domains"] },
          { cells: ["In a non-uniform field", "Moves from the stronger to the weaker region", "Moves from the weaker to the stronger region, weakly", "Strongly attracted"] },
          { cells: ["Examples", "Bismuth, copper, lead, water, sodium chloride", "Aluminium, sodium, calcium, oxygen", "Iron, cobalt, nickel, gadolinium"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A material is weakly attracted by a strong magnet. Its susceptibility is \\(2 \\times 10^{-5}\\) at 300 K. Which class is it, and what is its susceptibility at 150 K?",
        steps: [
          "Weak attraction and a small positive susceptibility: paramagnetic.",
          "Curie's law, \\(\\chi \\propto \\dfrac{1}{T}\\): halving the temperature doubles the susceptibility.",
        ],
        answer: "Paramagnetic; \\(4 \\times 10^{-5}\\)",
      },
      practiceSet: [
        { prompt: "What is the susceptibility of a superconductor, a perfect diamagnet?", answer: "−1" },
        { prompt: "What does a ferromagnet become when heated above its Curie temperature?", answer: "Paramagnetic" },
        { prompt: "Which class of material moves weakly from the weaker to the stronger part of a non-uniform field?", answer: "Paramagnetic" },
        { prompt: "Is copper diamagnetic, paramagnetic or ferromagnetic?", answer: "Diamagnetic" },
      ],
      pyqExampleId: "900e39f1-30b7-4917-a807-54666298e1ae",
      traps: [
        {
          title: "Weak attraction means paramagnetic",
          body: "A paramagnet is attracted only weakly. Strong attraction is the mark of a ferromagnet, and being pushed towards the weaker field is the mark of a diamagnet.",
        },
        {
          title: "A paramagnet's μᵣ is only just above 1",
          body: "For a paramagnet \\(1 < \\mu_r < 1 + \\varepsilon\\). A relative permeability much greater than 1 belongs to a ferromagnet, and one below 1 to a diamagnet.",
        },
        {
          title: "Above the Curie temperature, not below",
          body: "A ferromagnet loses its ferromagnetism only when heated above its Curie temperature; then it behaves as a paramagnet.",
        },
      ],
    },
  ],
};
