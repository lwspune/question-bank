import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_DN_MATTER_NOTE: SubtopicNote = {
  subtopicName: "Wave Nature of Matter",
  title: "Wave Nature of Matter",
  oneLineDefinition:
    "De Broglie's idea that every moving particle has a wave with wavelength h/p, how to find that wavelength for a particle accelerated through a potential, and how to compare the wavelengths of two particles.",
  whyItMatters:
    "42 questions, thirty-nine of them from board papers. The board asks you to explain matter waves and the dual aspect in the de Broglie relation (2022, 2024, 2026), deduce the wavelength of a charged particle accelerated through a potential and plot it (2023, 2026), work out wavelengths, speeds and voltages for electrons, protons, neutrons and alpha particles (2022 to 2026), compare the wavelengths of two particles at the same speed, kinetic energy or potential (every year), and read the slope of a wavelength graph to find the heavier particle (2023, 2024). The textbook adds the wavelengths of a bullet, a ball and a dust particle, and shows that a photon's de Broglie wavelength equals the wavelength of its radiation, which the board asked again in 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpdn-de-broglie",
      name: "The de Broglie relation and matter waves",
      intuition:
        "Light behaves as a wave in interference and as particles in the photoelectric effect. De Broglie argued that nature is symmetrical, so moving particles of matter should also behave as waves. The wavelength he gave them is fixed by the momentum alone: the larger the momentum, the shorter the wave.",
      definition:
        "- **De Broglie hypothesis (1924):** moving particles of matter should show wave-like properties under suitable conditions. These waves are called **matter waves** or de Broglie waves.\n" +
        "- **De Broglie relation:** \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}\\).\n" +
        "- **The dual aspect:** on the left, \\(\\lambda\\) is a property of a wave; on the right, the momentum \\(p\\) is a property of a particle. Planck's constant links the two.\n" +
        "- \\(\\lambda\\) is smaller for a heavier or a faster particle. For everyday objects it is far too small to measure. For electrons, protons and similar particles it is about the spacing of atomic planes in crystals, so it can be measured.\n" +
        "- The de Broglie wavelength depends only on the momentum, not on the charge or the nature of the particle.\n" +
        "- **For a photon:** \\(p = h\\nu/c\\), so \\(\\dfrac{h}{p} = \\dfrac{c}{\\nu} = \\lambda\\): its de Broglie wavelength is the wavelength of the radiation itself.\n" +
        "- **Evidence:** electrons give a diffraction pattern, which only a wave can do. Board 2025 and 2026 asked this as an MCQ and an assertion-reason item. The present NCERT book does not describe the experiment that showed it (the Davisson and Germer experiment), so give that experiment little time and learn only the fact.",
      formula: {
        label: "De Broglie relation",
        latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
        symbols: [
          { symbol: "\\(\\lambda\\)", meaning: "de Broglie wavelength of the particle" },
          { symbol: "\\(p = mv\\)", meaning: "momentum of the particle" },
          { symbol: "\\(h\\)", meaning: "Planck's constant, 6.63 × 10⁻³⁴ J s" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the de Broglie wavelength of (a) a proton moving at \\(2.0 \\times 10^{5}\\) m/s, and (b) a cricket ball of mass 0.16 kg moving at 25 m/s. Why do we never notice the wave nature of the ball? (Mass of proton \\(= 1.67 \\times 10^{-27}\\) kg.)",
        steps: [
          "Formula: \\(\\lambda = \\dfrac{h}{mv}\\).",
          "(a) \\(p = 1.67 \\times 10^{-27} \\times 2.0 \\times 10^{5} = 3.34 \\times 10^{-22}\\) kg m/s, so \\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{3.34 \\times 10^{-22}} = 1.99 \\times 10^{-12}\\) m.",
          "(b) \\(p = 0.16 \\times 25 = 4.0\\) kg m/s, so \\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{4.0} = 1.66 \\times 10^{-34}\\) m.",
          "The ball's wavelength is far smaller than any length that can be measured, so it shows no wave behaviour.",
        ],
        answer: "(a) \\(1.99 \\times 10^{-12}\\) m (b) \\(1.66 \\times 10^{-34}\\) m, far too small to detect",
      },
      selfCheckExample: {
        prompt: "A neutron moves at \\(4.0 \\times 10^{3}\\) m/s. Find its de Broglie wavelength. (Mass of neutron \\(= 1.675 \\times 10^{-27}\\) kg.)",
        steps: [
          "\\(p = mv = 1.675 \\times 10^{-27} \\times 4.0 \\times 10^{3} = 6.7 \\times 10^{-24}\\) kg m/s.",
          "\\(\\lambda = \\dfrac{h}{p} = \\dfrac{6.63 \\times 10^{-34}}{6.7 \\times 10^{-24}} = 9.9 \\times 10^{-11}\\) m.",
        ],
        answer: "\\(9.9 \\times 10^{-11}\\) m, about 0.1 nm",
      },
      practiceSet: [
        { prompt: "Two particles have the same de Broglie wavelength. Which quantity must be the same for both?", answer: "Their momentum" },
        { prompt: "By what factor does the de Broglie wavelength change when a particle's speed is made three times as large?", answer: "It becomes one third" },
        { prompt: "Why does a moving car show no wave nature?", answer: "Its momentum is so large that its de Broglie wavelength is far too small to measure" },
        {
          prompt: "A particle at rest breaks into two parts of different masses that fly apart. Compare their de Broglie wavelengths.",
          answer: "Equal. Momentum is conserved, so the two parts have equal and opposite momenta",
        },
      ],
      pyqExampleId: "a6d220da-3f0a-4887-83b6-5ae4987ce66e",
      traps: [
        {
          title: "Using p = mv for a photon",
          body: "A photon has no rest mass. Its momentum is \\(p = h\\nu/c = h/\\lambda\\), and the 'show that' answer must start from \\(E = h\\nu\\) and \\(p = h\\nu/c\\).",
        },
        {
          title: "Thinking the wavelength depends on charge",
          body: "\\(\\lambda = h/p\\) contains no charge. A neutron has a de Broglie wavelength just as a proton does; charge enters only through how a particle gains its kinetic energy.",
        },
        {
          title: "A dual-nature answer with one side",
          body: "To explain the dual aspect, name BOTH sides: \\(\\lambda\\) is a wave property, \\(p\\) a particle property, and \\(h\\) joins them. Writing only the formula earns half.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpdn-accelerated",
      name: "Wavelength from kinetic energy and accelerating potential",
      intuition:
        "Most board numericals do not give the speed. They give the kinetic energy, or the potential difference the particle was accelerated through. Turn that into momentum first, then use the de Broglie relation. Because momentum goes as the square root of the energy, so does the wavelength.",
      definition:
        "Deriving \\(\\lambda\\) for a particle of mass \\(m\\) and charge \\(q\\) accelerated from rest through a potential difference \\(V\\):\n" +
        "- Work done by the field = gain in kinetic energy: \\(K = qV = \\tfrac{1}{2}mv^{2}\\).\n" +
        "- So \\(v = \\sqrt{\\dfrac{2qV}{m}}\\) and the momentum is \\(p = mv = \\sqrt{2mK} = \\sqrt{2mqV}\\).\n" +
        "- De Broglie relation: \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{\\sqrt{2mK}} = \\dfrac{h}{\\sqrt{2mqV}}\\).\n" +
        "- So \\(\\lambda \\propto \\dfrac{1}{\\sqrt{V}}\\) and \\(\\lambda \\propto \\dfrac{1}{\\sqrt{K}}\\): four times the kinetic energy halves the wavelength.\n" +
        "- For an electron, putting in \\(h\\), \\(m\\) and \\(e\\) gives \\(\\lambda = \\dfrac{1.227}{\\sqrt{V}}\\) nm, with \\(V\\) in volts. It is a result of the formula above, for electrons only; in a board answer write the formula first.",
      formula: {
        label: "De Broglie wavelength from kinetic energy or accelerating potential",
        latex: "\\lambda = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2mqV}}",
        symbols: [
          { symbol: "\\(K\\)", meaning: "kinetic energy, in joules" },
          { symbol: "\\(q\\)", meaning: "charge of the particle (2e for an alpha particle)" },
          { symbol: "\\(V\\)", meaning: "accelerating potential difference" },
        ],
      },
      authoredExample: {
        prompt:
          "An electron is accelerated from rest through a potential difference of 150 V. Find its kinetic energy, its momentum and its de Broglie wavelength.",
        steps: [
          "Given: \\(V = 150\\) V, \\(e = 1.6 \\times 10^{-19}\\) C, \\(m = 9.1 \\times 10^{-31}\\) kg, \\(h = 6.63 \\times 10^{-34}\\) J s.",
          "\\(K = eV = 1.6 \\times 10^{-19} \\times 150 = 2.4 \\times 10^{-17}\\) J (150 eV).",
          "\\(p = \\sqrt{2mK} = \\sqrt{2 \\times 9.1 \\times 10^{-31} \\times 2.4 \\times 10^{-17}} = 6.61 \\times 10^{-24}\\) kg m/s.",
          "\\(\\lambda = \\dfrac{h}{p} = \\dfrac{6.63 \\times 10^{-34}}{6.61 \\times 10^{-24}} = 1.0 \\times 10^{-10}\\) m \\(= 0.10\\) nm.",
          "Check: \\(\\dfrac{1.227}{\\sqrt{150}} = 0.10\\) nm.",
        ],
        answer: "\\(K = 2.4 \\times 10^{-17}\\) J; \\(p = 6.61 \\times 10^{-24}\\) kg m/s; \\(\\lambda = 0.10\\) nm",
      },
      selfCheckExample: {
        prompt: "Through what potential difference must an electron be accelerated from rest to have a de Broglie wavelength of 0.050 nm?",
        steps: [
          "From \\(\\lambda = \\dfrac{h}{\\sqrt{2meV}}\\): \\(V = \\dfrac{h^{2}}{2me\\lambda^{2}}\\).",
          "\\(V = \\dfrac{(6.63 \\times 10^{-34})^{2}}{2 \\times 9.1 \\times 10^{-31} \\times 1.6 \\times 10^{-19} \\times (5.0 \\times 10^{-11})^{2}} = 604\\) V.",
        ],
        answer: "About 604 V",
      },
      practiceSet: [
        { prompt: "The kinetic energy of an electron is made nine times as large. What happens to its de Broglie wavelength?", answer: "It becomes one third" },
        { prompt: "Use \\(\\lambda = 1.227/\\sqrt{V}\\) nm to find the de Broglie wavelength of an electron accelerated through 100 V.", answer: "0.123 nm" },
        { prompt: "The accelerating potential of an electron is doubled. By what factor does its de Broglie wavelength change?", answer: "It is divided by \\(\\sqrt{2}\\)" },
      ],
      pyqExampleId: "2ce58fdf-a3a9-4c91-8634-05c9555cf75a",
      traps: [
        {
          title: "Taking λ in proportion to 1/V",
          body: "\\(\\lambda \\propto 1/\\sqrt{V}\\) and \\(\\lambda \\propto 1/\\sqrt{K}\\). Four times the energy gives HALF the wavelength, not a quarter.",
        },
        {
          title: "The wrong charge for an alpha particle",
          body: "An alpha particle carries \\(2e\\), so accelerated through \\(V\\) it gains \\(2eV\\) of kinetic energy, not \\(eV\\).",
        },
        {
          title: "Using the electron shortcut for other particles",
          body: "\\(1.227/\\sqrt{V}\\) nm holds for electrons only. For a proton, neutron or alpha particle, use \\(\\lambda = h/\\sqrt{2mqV}\\) or \\(h/\\sqrt{2mK}\\) with its own mass.",
        },
        {
          title: "A derivation with steps missing",
          body: "The marks are for \\(K = qV\\), then \\(p = \\sqrt{2mqV}\\), then \\(\\lambda = h/p\\). Writing only the final formula earns one of them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpdn-compare",
      name: "Comparing the wavelengths of two particles",
      intuition:
        "A ratio question needs no constants. Write the wavelength in terms of the quantity the two particles share, take the ratio, and everything common cancels. What is left is a ratio of masses, and sometimes of charges, under a square root or not.",
      definition:
        "- **Same momentum:** \\(\\lambda = h/p\\), so the wavelengths are equal, whatever the masses.\n" +
        "- **Same speed:** \\(\\lambda = h/mv\\), so \\(\\lambda \\propto 1/m\\).\n" +
        "- **Same kinetic energy:** \\(\\lambda = h/\\sqrt{2mK}\\), so \\(\\lambda \\propto 1/\\sqrt{m}\\).\n" +
        "- **Same accelerating potential:** \\(\\lambda = h/\\sqrt{2mqV}\\), so \\(\\lambda \\propto 1/\\sqrt{mq}\\).\n" +
        "- **Masses and charges:** proton \\(m\\) and \\(e\\); deuteron \\(2m\\) and \\(e\\); alpha particle \\(4m\\) and \\(2e\\); neutron about \\(m\\) and no charge; electron about \\(m/1836\\) and charge of size \\(e\\).\n" +
        "- **A particle and a photon of the same energy \\(E\\):** the photon has \\(\\lambda = hc/E\\), the particle \\(\\lambda = h/\\sqrt{2mE}\\).",
      formula: {
        label: "Ratio of two de Broglie wavelengths",
        latex: "\\frac{\\lambda_1}{\\lambda_2} = \\frac{p_2}{p_1} = \\sqrt{\\frac{m_2 K_2}{m_1 K_1}} = \\sqrt{\\frac{m_2 q_2 V_2}{m_1 q_1 V_1}}",
      },
      authoredExample: {
        prompt:
          "A deuteron and a proton are accelerated from rest through the same potential difference. Find the ratio of their de Broglie wavelengths, \\(\\lambda_d/\\lambda_p\\). What would the ratio be if they moved with the same speed instead?",
        steps: [
          "Same potential: \\(\\lambda \\propto \\dfrac{1}{\\sqrt{mq}}\\), so \\(\\dfrac{\\lambda_d}{\\lambda_p} = \\sqrt{\\dfrac{m_p q_p}{m_d q_d}}\\).",
          "A deuteron has mass \\(2m\\) and the same charge \\(e\\): \\(\\dfrac{\\lambda_d}{\\lambda_p} = \\sqrt{\\dfrac{m \\times e}{2m \\times e}} = \\dfrac{1}{\\sqrt{2}}\\).",
          "Same speed: \\(\\lambda \\propto \\dfrac{1}{m}\\), so \\(\\dfrac{\\lambda_d}{\\lambda_p} = \\dfrac{m}{2m} = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(1 : \\sqrt{2}\\) through the same potential; \\(1 : 2\\) at the same speed",
      },
      selfCheckExample: {
        prompt: "An electron and a proton have the same kinetic energy. Which has the longer de Broglie wavelength, and by what factor? (Take \\(m_p = 1836\\,m_e\\).)",
        steps: [
          "Same kinetic energy: \\(\\lambda \\propto \\dfrac{1}{\\sqrt{m}}\\).",
          "\\(\\dfrac{\\lambda_e}{\\lambda_p} = \\sqrt{\\dfrac{m_p}{m_e}} = \\sqrt{1836} = 42.8\\).",
        ],
        answer: "The electron, by about 43 times",
      },
      practiceSet: [
        { prompt: "An alpha particle and a deuteron have the same kinetic energy. Find \\(\\lambda_\\alpha/\\lambda_d\\).", answer: "\\(1/\\sqrt{2}\\)" },
        { prompt: "Two particles have equal momenta, and one is twice as heavy as the other. Find the ratio of their de Broglie wavelengths.", answer: "1 : 1" },
        {
          prompt: "A deuteron accelerated through 50 V and a proton accelerated through a potential V have the same de Broglie wavelength. Find V.",
          answer: "100 V, since \\(m_p V = m_d \\times 50\\) with equal charges",
        },
      ],
      pyqExampleId: "cfeccac9-74f5-4cc7-b277-5a57d1b72275",
      traps: [
        {
          title: "Doubling the charge of a deuteron",
          body: "A deuteron is a proton joined to a neutron: twice the mass, the SAME charge \\(e\\). Only the alpha particle has charge \\(2e\\).",
        },
        {
          title: "Same potential treated as same kinetic energy",
          body: "Through the same potential an alpha particle gains \\(2eV\\) and a proton \\(eV\\), so their kinetic energies are NOT equal. Use \\(\\lambda \\propto 1/\\sqrt{mq}\\), not \\(1/\\sqrt{m}\\).",
        },
        {
          title: "Dropping the square root",
          body: "At the same speed the ratio is the plain mass ratio; at the same kinetic energy or potential it sits under a square root. Write the full formula for each case before cancelling.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpdn-lambda-graphs",
      name: "Graphs of de Broglie wavelength",
      intuition:
        "Each graph comes from the de Broglie relation written for the quantity on the horizontal axis. Against a quantity the wavelength is inversely proportional to, the graph is a falling curve; against its reciprocal, it is a straight line through the origin whose slope tells you the mass.",
      definition:
        "- The graphs cannot be drawn here, so learn each in words: the axes, the shape, and what the slope means.\n" +
        "- Label both axes. For a straight line, say what its slope is equal to; for a curve, say that it never touches either axis.\n" +
        "- For a straight line through the origin, the board asks which particle is heavier: compare the slopes.",
      table: {
        columns: ["Graph", "Shape", "What it tells you"],
        rows: [
          {
            cells: [
              "\\(p\\) against \\(\\lambda\\) (or \\(\\lambda\\) against \\(p\\))",
              "A curve falling steeply and then flattening, never touching either axis, because \\(p\\lambda = h\\)",
              "Momentum and wavelength are inversely proportional",
            ],
            noteAmber: "Board 2023 asked which graph shows momentum against de Broglie wavelength: this falling curve.",
            pyqExampleId: "d272fa29-7e9f-474a-89d8-beb716dab041",
          },
          {
            cells: [
              "\\(\\lambda\\) against \\(V\\)",
              "A curve falling steeply and flattening towards the \\(V\\) axis without meeting it, because \\(\\lambda \\propto 1/\\sqrt{V}\\)",
              "A larger accelerating potential gives a shorter wavelength",
            ],
          },
          {
            cells: [
              "\\(\\lambda\\) against \\(1/\\sqrt{V}\\)",
              "A straight line through the origin of slope \\(h/\\sqrt{2mq}\\)",
              "For particles of equal charge, the heavier one has the smaller slope",
            ],
            noteAmber: "Board 2023 gave two such lines for particles A and B of the same charge and asked which is heavier: the one with the smaller slope.",
            pyqExampleId: "8b6ec231-e52b-4a82-ad40-7316d77eeb98",
          },
          {
            cells: [
              "\\(\\lambda\\) against \\(1/\\sqrt{K}\\)",
              "A straight line through the origin of slope \\(h/\\sqrt{2m}\\)",
              "The heavier particle has the smaller slope. It does not hold for a photon, whose \\(\\lambda = hc/E\\)",
            ],
            noteAmber: "Board 2024 asked what the slope represents, which particle is heavier, and whether the graph holds for a photon.",
            pyqExampleId: "3f5bee18-b220-43d0-a9e7-16f2ffe1113a",
          },
        ],
        caption: "Inverse proportion gives a falling curve; plotting against the reciprocal gives a straight line.",
      },
      selfCheckExample: {
        prompt:
          "Two particles A and B of the same charge give straight lines on a graph of \\(\\lambda\\) against \\(1/\\sqrt{V}\\). The slope of A's line is twice that of B's. Which particle is heavier, and by what factor?",
        steps: [
          "Slope \\(= \\dfrac{h}{\\sqrt{2mq}}\\), so with equal charges the slope \\(\\propto \\dfrac{1}{\\sqrt{m}}\\).",
          "\\(\\dfrac{\\text{slope}_A}{\\text{slope}_B} = \\sqrt{\\dfrac{m_B}{m_A}} = 2\\), so \\(m_B = 4 m_A\\).",
        ],
        answer: "B is heavier, four times as heavy as A",
      },
      practiceSet: [
        { prompt: "What is the slope of a graph of \\(\\lambda\\) against \\(1/\\sqrt{K}\\) for a particle of mass \\(m\\)?", answer: "\\(h/\\sqrt{2m}\\)" },
        { prompt: "Is a graph of \\(\\lambda\\) against \\(1/\\sqrt{K}\\) a straight line for a photon?", answer: "No. For a photon \\(\\lambda = hc/E\\), so \\(\\lambda\\) goes as \\(1/E\\)" },
        { prompt: "What is the product of the momentum and the de Broglie wavelength of any particle?", answer: "Planck's constant, h" },
      ],
      pyqExampleId: "26b5bdf7-9912-46aa-8368-f34991bd9bfb",
      traps: [
        {
          title: "Drawing λ against V as a straight line",
          body: "\\(\\lambda \\propto 1/\\sqrt{V}\\), so against \\(V\\) the graph is a falling curve. Only against \\(1/\\sqrt{V}\\) is it a straight line.",
        },
        {
          title: "Heavier means steeper",
          body: "It is the other way round: the slope is \\(h/\\sqrt{2mq}\\), so the HEAVIER particle gives the LESS steep line.",
        },
        {
          title: "A curve that touches the axes",
          body: "The falling curves approach the axes but never meet them: no finite potential or momentum makes the wavelength zero, and none makes it infinite.",
        },
      ],
    },
  ],
};
