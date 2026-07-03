import type { SubtopicNote } from "@/app/notes/_types";

export const DALTON_KTG_NOTE: SubtopicNote = {
  subtopicName: "Real Gases, Dalton's Law and KTG",
  title: "Real Gases, Dalton's Law and the Kinetic Theory of Gases",
  oneLineDefinition:
    "In a gas mixture each component pushes independently, so its partial pressure is just its share of the moles times the total pressure; the kinetic theory explains this, gives the speed of the molecules, and shows why real gases stray from ideal behaviour.",
  whyItMatters:
    "Thirteen PYQs, and more than half are a single trick: partial pressure is proportional to moles, so equal masses of two gases do NOT share pressure equally. " +
    "The rest split between one root-mean-square-velocity ratio, the compressibility factor Z as the measure of non-ideality, and one recall question on liquefaction. " +
    "Master 'moles first, never grams' and you have the whole subtopic — the arithmetic is easy once the mole fractions are right.",
  concepts: [
    // Dalton's law of partial pressures — the workhorse
    {
      kind: "formula" as const,
      slug: "cetsom-dalton-partial-pressure",
      name: "Dalton's law of partial pressures",
      intuition:
        "In a mixture, each gas ignores the others and pushes on the walls as if it were alone; the total pressure is just the sum of those individual pushes. " +
        "Because pressure at fixed temperature and volume depends only on how many molecules there are, each gas's share of the pressure equals its share of the moles.",
      definition:
        "Dalton's law and the mole-fraction rule:\n" +
        "- The **total pressure** of a non-reacting gas mixture equals the sum of the **partial pressures** of its components: \\(P_{\\text{total}} = P_1 + P_2 + \\cdots\\).\n" +
        "- The partial pressure of a component is its **mole fraction** times the total pressure: \\(P_i = x_i\\,P_{\\text{total}}\\).\n" +
        "- Mole fraction \\(x_i = \\dfrac{n_i}{n_{\\text{total}}}\\), so at fixed \\(T\\) and \\(V\\), **partial pressure is proportional to moles**.\n" +
        "- **Equal-mass shortcut:** if the components have equal masses, then \\(n \\propto \\dfrac{1}{M}\\) — the lighter gas has more moles and therefore the larger partial pressure.",
      formula: {
        label: "Partial pressure from mole fraction",
        latex: "P_i = x_i\\,P_{\\text{total}} = \\dfrac{n_i}{n_{\\text{total}}}\\,P_{\\text{total}}",
        symbols: [
          { symbol: "P_i", meaning: "partial pressure of component i" },
          { symbol: "x_i", meaning: "mole fraction of component i" },
          { symbol: "n_i", meaning: "moles of component i" },
          { symbol: "P_{\\text{total}}", meaning: "total pressure of the mixture" },
        ],
      },
      pyqExampleId: "eb6e7839-db12-42fc-acb4-f0861f766b3d", // 28 g N2 + 8 g He + 40 g Ne, P_total 20 bar -> P(N2) = 4 bar
      authoredExample: {
        prompt:
          "A vessel holds 16 g of O2, 14 g of N2 and 2 g of H2 at the same temperature. If the total pressure is 12 bar, find the partial pressure of O2. (O2 = 32, N2 = 28, H2 = 2)",
        steps: [
          "Convert each mass to moles: \\(n_{\\text{O}_2} = 16/32 = 0.5\\), \\(n_{\\text{N}_2} = 14/28 = 0.5\\), \\(n_{\\text{H}_2} = 2/2 = 1\\).",
          "Total moles \\(= 0.5 + 0.5 + 1 = 2\\) mol.",
          "Mole fraction of \\(\\text{O}_2\\): \\(x_{\\text{O}_2} = 0.5/2 = 0.25\\).",
          "Partial pressure: \\(P_{\\text{O}_2} = x_{\\text{O}_2}\\,P_{\\text{total}} = 0.25 \\times 12 = 3\\) bar.",
        ],
        answer: "\\(P_{\\text{O}_2} = 3\\) bar.",
      },
      selfCheckExample: {
        prompt:
          "Equal masses of helium and oxygen are mixed in a container. What fraction of the total pressure is exerted by helium? (He = 4, O2 = 32)",
        steps: [
          "Let each gas have mass \\(w\\). Moles: \\(n_{\\text{He}} = w/4\\), \\(n_{\\text{O}_2} = w/32\\).",
          "Fraction of pressure by He \\(= x_{\\text{He}} = \\dfrac{w/4}{w/4 + w/32}\\).",
          "Multiply numerator and denominator by 32: \\(= \\dfrac{8w}{8w + w} = \\dfrac{8}{9}\\).",
        ],
        answer: "\\(\\dfrac{8}{9}\\) of the total pressure is exerted by helium.",
      },
      practiceSet: [
        {
          prompt: "In a mixture, a gas has mole fraction 0.4 and the total pressure is 5 bar. Its partial pressure?",
          answer: "2 bar",
          method: "\\(P_i = x_i P_{\\text{total}} = 0.4 \\times 5\\)",
        },
        {
          prompt: "Equal masses of H2 (M = 2) and He (M = 4) are mixed. Ratio of their partial pressures H2 : He?",
          answer: "2 : 1",
          method: "moles \\(\\propto 1/M\\), so \\((1/2):(1/4) = 2:1\\)",
        },
        {
          prompt: "A mixture has 1 mol N2 and 4 mol He. Mole fraction of N2?",
          answer: "0.2",
          method: "\\(1/(1+4) = 1/5\\)",
        },
      ],
      traps: [
        {
          title: "Partial pressure follows moles, not mass",
          body:
            "Equal masses of two gases do NOT exert equal partial pressures. Convert every mass to moles first: the lighter gas (smaller \\(M\\)) has more moles and the larger partial pressure. For equal masses of \\(\\text{H}_2\\) and He, the ratio is \\(2:1\\), not \\(1:1\\).",
        },
        {
          title: "Use the total moles in the denominator",
          body:
            "Mole fraction is \\(x_i = n_i / n_{\\text{total}}\\), where \\(n_{\\text{total}}\\) is the sum over **all** gases in the mixture. Forgetting one component inflates every mole fraction and the sum of all \\(x_i\\) will not equal 1.",
        },
      ],
    },

    // Root-mean-square velocity
    {
      kind: "formula" as const,
      slug: "cetsom-dalton-rms-velocity",
      name: "Root-mean-square velocity",
      intuition:
        "The molecules of a gas move at a spread of speeds; the root-mean-square velocity is the effective average speed that carries the kinetic energy. " +
        "It rises with temperature (hotter means faster) and falls with molar mass (heavier molecules are more sluggish).",
      definition:
        "Root-mean-square (rms) velocity:\n" +
        "- \\(v_{rms} = \\sqrt{\\dfrac{3RT}{M}}\\) — it grows as \\(\\sqrt{T}\\) and shrinks as \\(1/\\sqrt{M}\\).\n" +
        "- To compare two gases (or the same gas at two states), take the **ratio** and cancel the constant \\(3R\\): \\(\\dfrac{v_1}{v_2} = \\sqrt{\\dfrac{T_1/M_1}{T_2/M_2}}\\).\n" +
        "- The square root is essential — a ratio of \\(4\\) inside the root becomes \\(2\\) outside it.",
      formula: {
        label: "Root-mean-square velocity and its ratio",
        latex: "v_{rms} = \\sqrt{\\dfrac{3RT}{M}}\\qquad \\dfrac{v_1}{v_2} = \\sqrt{\\dfrac{T_1/M_1}{T_2/M_2}}",
        symbols: [
          { symbol: "v_{rms}", meaning: "root-mean-square velocity" },
          { symbol: "R", meaning: "universal gas constant" },
          { symbol: "T", meaning: "absolute temperature (K)" },
          { symbol: "M", meaning: "molar mass (kg/mol in SI)" },
        ],
      },
      pyqExampleId: "f6edab84-3c11-419b-b0d7-18c48cefc2ee", // ratio v_rms(H2 @ 50K) : v_rms(O2 @ 800K) = 1
      authoredExample: {
        prompt:
          "Find the ratio of the rms velocity of H2 at 50 K to that of O2 at 800 K. (H2 = 2, O2 = 32)",
        steps: [
          "Write the ratio: \\(\\dfrac{v_{\\text{H}_2}}{v_{\\text{O}_2}} = \\sqrt{\\dfrac{T_{\\text{H}_2}/M_{\\text{H}_2}}{T_{\\text{O}_2}/M_{\\text{O}_2}}}\\).",
          "Substitute: \\(= \\sqrt{\\dfrac{50/2}{800/32}} = \\sqrt{\\dfrac{25}{25}}\\).",
          "The fraction inside is \\(1\\), and \\(\\sqrt{1} = 1\\).",
        ],
        answer: "The ratio is \\(1\\) (the two rms velocities are equal).",
      },
      selfCheckExample: {
        prompt:
          "At the same temperature, what is the ratio of the rms velocity of H2 to that of O2? (H2 = 2, O2 = 32)",
        steps: [
          "Same \\(T\\), so \\(\\dfrac{v_{\\text{H}_2}}{v_{\\text{O}_2}} = \\sqrt{\\dfrac{M_{\\text{O}_2}}{M_{\\text{H}_2}}}\\) (the lighter gas is faster).",
          "Substitute: \\(= \\sqrt{\\dfrac{32}{2}} = \\sqrt{16}\\).",
          "\\(\\sqrt{16} = 4\\).",
        ],
        answer: "The ratio is \\(4 : 1\\).",
      },
      practiceSet: [
        {
          prompt: "At the same temperature, which is faster on average — H2 or O2?",
          answer: "H2",
          method: "\\(v_{rms} \\propto 1/\\sqrt{M}\\); lighter is faster",
        },
        {
          prompt: "If the absolute temperature of a gas is made 4 times larger, by what factor does v_rms change?",
          answer: "2 times",
          method: "\\(v_{rms} \\propto \\sqrt{T}\\), \\(\\sqrt{4} = 2\\)",
        },
        {
          prompt: "For the same gas, ratio of v_rms at 400 K to that at 100 K?",
          answer: "2 : 1",
          method: "\\(\\sqrt{400/100} = 2\\)",
        },
      ],
      traps: [
        {
          title: "Take the square root at the end",
          body:
            "The molar-mass and temperature factors sit **inside** a square root. If the combined ratio inside works out to \\(4\\), the velocity ratio is \\(\\sqrt{4} = 2\\), not \\(4\\). Forgetting the root is the most common error in these ratio problems.",
        },
        {
          title: "Use absolute temperature in kelvin",
          body:
            "\\(v_{rms} = \\sqrt{3RT/M}\\) needs \\(T\\) in **kelvin**. Never plug in Celsius — convert \\(t\\,^\\circ\\text{C}\\) to \\(T = t + 273\\) K first.",
        },
      ],
    },

    // Kinetic theory of gases — postulates (reference table)
    {
      kind: "reference" as const,
      slug: "cetsom-dalton-ktg-postulates",
      name: "Postulates of the kinetic theory of gases",
      intuition:
        "The kinetic theory pictures a gas as a huge number of tiny, fast, independent particles bouncing around in empty space. " +
        "Its handful of assumptions are exactly what make the ideal gas laws work — and knowing which one fails tells you why real gases misbehave.",
      definition:
        "The kinetic theory of gases (KTG) rests on a few idealising assumptions:\n" +
        "- Gas molecules are **point masses** — their own volume is negligible compared with the container.\n" +
        "- There are **no attractive or repulsive forces** between molecules.\n" +
        "- Collisions are **perfectly elastic**, so no kinetic energy is lost.\n" +
        "- The **average kinetic energy is proportional to the absolute temperature**.\n" +
        "The two assumptions in **bold above** (zero molecular volume, zero intermolecular force) are precisely the ones that break down for a real gas.",
      table: {
        columns: ["Postulate", "Statement"],
        rows: [
          {
            cells: [
              "Negligible molecular volume",
              "The actual volume of the gas molecules is negligibly small compared with the total volume of the container; the gas is mostly empty space.",
            ],
            noteAmber:
              "This assumption fails at high pressure, when molecules are squeezed close together and their own volume is no longer negligible.",
          },
          {
            cells: [
              "No intermolecular forces",
              "There are no forces of attraction or repulsion between the molecules of an ideal gas; they move completely independently.",
            ],
            noteAmber:
              "This assumption fails at low temperature / high pressure, when attractions pull molecules together — the reason gases can be liquefied.",
          },
          {
            cells: [
              "Elastic collisions",
              "Collisions between molecules, and with the walls, are perfectly elastic — the total kinetic energy is conserved during every collision.",
            ],
          },
          {
            cells: [
              "Kinetic energy proportional to temperature",
              "The average kinetic energy of the molecules is directly proportional to the absolute temperature; it depends only on T, not on the gas's identity.",
            ],
          },
          {
            cells: [
              "Continuous random motion",
              "Molecules are in constant, rapid, random straight-line motion in all directions, colliding with one another and the container walls.",
            ],
          },
        ],
        caption: "The two bold postulates (zero volume, zero force) are what an ideal gas assumes and a real gas violates.",
      },
      pyqExampleId: "36abe7e3-1322-4f19-8990-1c363950c64c", // which gas is difficult to liquify -> O2 (weak intermolecular attraction)
      selfCheckExample: {
        prompt:
          "Among SO2, Cl2, NH3 and O2, which gas is the most difficult to liquefy, and which kinetic-theory assumption explains why gases can be liquefied at all?",
        steps: [
          "Liquefaction relies on **intermolecular attractions** pulling molecules together — the assumption an ideal gas ignores.",
          "\\(\\text{O}_2\\) is a small non-polar molecule with the weakest attractions (and a very low critical temperature), so it clings least.",
          "The weaker the attraction, the harder it is to condense, so \\(\\text{O}_2\\) is the most difficult to liquefy.",
        ],
        answer:
          "\\(\\text{O}_2\\) is the hardest to liquefy; liquefaction is possible because real gases have intermolecular attractions, which the ideal-gas KTG ignores.",
      },
      practiceSet: [
        {
          prompt: "In the kinetic theory, the volume of the gas molecules themselves is assumed to be what?",
          answer: "Negligible (point masses)",
        },
        {
          prompt: "According to KTG, molecular collisions are of what type?",
          answer: "Perfectly elastic",
        },
        {
          prompt: "The average kinetic energy of gas molecules is proportional to what?",
          answer: "The absolute temperature (T in kelvin)",
        },
        {
          prompt: "Which KTG assumption must fail for a gas to be liquefiable?",
          answer: "The 'no intermolecular forces' assumption",
        },
      ],
      traps: [
        {
          title: "Kinetic energy depends on temperature, not on the gas",
          body:
            "The average kinetic energy of gas molecules depends only on the **absolute temperature** — at the same \\(T\\), \\(\\text{H}_2\\) and \\(\\text{O}_2\\) have the same average kinetic energy. They differ in *speed* (the lighter gas moves faster), not in energy.",
        },
        {
          title: "Ideal gas = zero volume AND zero force",
          body:
            "An ideal gas assumes **both** that molecules have no volume and that there are no forces between them. A real gas violates both, which is why it deviates most where these matter — at high pressure and low temperature.",
        },
      ],
    },

    // Real gases and compressibility factor
    {
      kind: "formula" as const,
      slug: "cetsom-dalton-real-gas-deviation",
      name: "Real gases and the compressibility factor",
      intuition:
        "A real gas obeys \\(PV = nRT\\) only approximately, because its molecules do take up space and do attract one another. " +
        "The compressibility factor Z measures how far the gas strays from ideal: Z = 1 is perfectly ideal, and any departure from 1 signals real-gas behaviour.",
      definition:
        "Deviation from ideal behaviour:\n" +
        "- The **compressibility factor** \\(Z = \\dfrac{PV}{nRT}\\). For an ideal gas \\(Z = 1\\) at all conditions; for a real gas \\(Z \\ne 1\\).\n" +
        "- Since \\(Z = V_{\\text{real}}/V_{\\text{ideal}}\\), the real molar volume is \\(V_{\\text{real}} = Z \\times V_{\\text{ideal}}\\) (at STP \\(V_{\\text{ideal}} = 22.4\\,\\text{dm}^3\\)).\n" +
        "- The **van der Waals equation** corrects both flaws: \\(\\left(P + \\dfrac{an^2}{V^2}\\right)(V - nb) = nRT\\), where \\(a\\) accounts for intermolecular attraction and \\(b\\) for the finite volume of the molecules.\n" +
        "- Deviations are **greatest at high pressure and low temperature**; gases with stronger attractions (higher \\(a\\), higher critical temperature) are easier to liquefy.",
      formula: {
        label: "Compressibility factor and van der Waals equation",
        latex: "Z = \\dfrac{PV}{nRT}\\qquad \\left(P + \\dfrac{an^2}{V^2}\\right)(V - nb) = nRT",
        symbols: [
          { symbol: "Z", meaning: "compressibility factor (1 for ideal, ≠ 1 for real)" },
          { symbol: "a", meaning: "van der Waals constant for intermolecular attraction" },
          { symbol: "b", meaning: "van der Waals constant for molecular volume" },
        ],
      },
      pyqExampleId: "50d74b0b-4ed9-4950-bac0-8033b9f37b79", // Z = 1.05 at STP -> V_real = 23.52 dm3
      authoredExample: {
        prompt:
          "The compressibility factor of a real gas is 1.05 at STP. What is its molar volume? (Ideal molar volume at STP = 22.4 dm3)",
        steps: [
          "Use \\(Z = \\dfrac{V_{\\text{real}}}{V_{\\text{ideal}}}\\), so \\(V_{\\text{real}} = Z \\times V_{\\text{ideal}}\\).",
          "Substitute: \\(V_{\\text{real}} = 1.05 \\times 22.4\\).",
          "\\(1.05 \\times 22.4 = 23.52\\,\\text{dm}^3\\).",
        ],
        answer: "\\(V_{\\text{real}} = 23.52\\,\\text{dm}^3\\).",
      },
      selfCheckExample: {
        prompt:
          "A real gas has compressibility factor 1.1 at STP. Find its molar volume. (Ideal molar volume at STP = 22.4 dm3)",
        steps: [
          "\\(V_{\\text{real}} = Z \\times V_{\\text{ideal}} = 1.1 \\times 22.4\\).",
          "\\(1.1 \\times 22.4 = 24.64\\,\\text{dm}^3\\).",
        ],
        answer: "\\(V_{\\text{real}} = 24.64\\,\\text{dm}^3\\).",
      },
      practiceSet: [
        {
          prompt: "What is the compressibility factor Z of an ideal gas?",
          answer: "Z = 1",
          method: "\\(Z = PV/nRT = 1\\) for an ideal gas",
        },
        {
          prompt: "Write the formula for the compressibility factor.",
          answer: "\\(Z = \\dfrac{PV}{nRT}\\)",
        },
        {
          prompt: "In the van der Waals equation, which constant corrects for the volume of the molecules?",
          answer: "The constant b",
        },
        {
          prompt: "Deviations from ideal behaviour are largest at what conditions?",
          answer: "High pressure and low temperature",
        },
      ],
      traps: [
        {
          title: "Z = 1 means ideal, in either direction",
          body:
            "A gas is ideal only when \\(Z = 1\\). Both \\(Z > 1\\) (repulsion / molecular volume dominates) and \\(Z < 1\\) (attraction dominates) mean the gas is **real** — the deviation, not its sign, is what matters.",
        },
        {
          title: "Multiply, do not add, the ideal molar volume",
          body:
            "\\(V_{\\text{real}} = Z \\times V_{\\text{ideal}}\\). For \\(Z = 1.05\\) at STP that is \\(1.05 \\times 22.4 = 23.52\\,\\text{dm}^3\\), not \\(22.4 + 1.05\\). Z is a multiplying factor, not an offset.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Mole Concept and Stoichiometry",
      href: "/notes/nda-chemistry/mole-concept",
    },
  ],
};
