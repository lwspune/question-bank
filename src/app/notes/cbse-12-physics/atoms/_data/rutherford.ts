import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AT_RUTHERFORD_NOTE: SubtopicNote = {
  subtopicName: "Alpha-Particle Scattering and Rutherford's Model",
  title: "Alpha-Particle Scattering and Rutherford's Nuclear Model",
  oneLineDefinition:
    "The Geiger-Marsden experiment and its graph, the distance of closest approach and the impact parameter, and why an atom built like Rutherford's would collapse.",
  whyItMatters:
    "33 questions, twenty-eight of them from board papers. The board asked the graph of the number of scattered alpha particles against the scattering angle, with two conclusions, in every year from 2022 to 2026. It asked the distance of closest approach in every year too, as a definition, a derivation (2024, 2025), a numerical (2022 to 2025) or a ratio for two particles (2024, 2025, 2026). It also asked you to describe the experiment (2023, 2024, 2025), define or tell apart the impact parameter and the distance of closest approach (2022, 2023), set an assertion-reason item on the impact parameter (2024), predict the result with a hydrogen foil (2022) and give the limits of Rutherford's model (2022).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpat-geiger-marsden",
      name: "The Geiger-Marsden experiment and what its graph shows",
      intuition:
        "Fire fast alpha particles at a very thin gold foil and count how many come out at each angle. Almost all go straight through, as if the foil were not there. A very few bounce back. Something tiny, heavy and positive must sit inside each atom to turn them round.",
      definition:
        "- **Set-up:** 5.5 MeV alpha particles from a \\(^{214}_{83}\\text{Bi}\\) source are made into a narrow beam by lead bricks and aimed at a gold foil \\(2.1 \\times 10^{-7}\\) m thick. A zinc sulphide screen with a microscope, which can be turned to any angle θ, counts the flashes (scintillations). The whole apparatus is in a vacuum chamber.\n" +
        "- **The graph:** the number N of alpha particles scattered, on the vertical axis, against the scattering angle θ from 0° to 180°. N is very large at small angles and falls steeply as θ grows, leaving only a few at large angles.\n" +
        "- **Observations:** most alpha particles pass through undeflected; only about 0.14% are scattered by more than 1°; about 1 in 8000 is deflected by more than 90°.\n" +
        "- **Conclusions:** most of the atom is empty space; the entire positive charge and most of the mass of the atom are packed into a tiny central nucleus.\n" +
        "- **Thomson's model** spreads the positive charge over the whole atom with electrons embedded in it, so it cannot turn an alpha particle back. Both models give the atom the same size, about \\(10^{-10}\\) m.",
      table: {
        columns: ["What was seen", "What it shows"],
        rows: [
          {
            cells: ["Most alpha particles pass through the foil undeflected", "Most of an atom is empty space"],
            noteAmber: "Board 2022 to 2026 asked the graph of N against θ with two conclusions every year: draw it, label both axes, then write the conclusions.",
          },
          {
            cells: [
              "About 1 in 8000 is turned through more than 90°, a few almost straight back",
              "A large repulsive force acts in a few close encounters: the positive charge and most of the mass sit in a tiny nucleus",
            ],
          },
          {
            cells: [
              "Nucleus size from the data: \\(10^{-15}\\) m to \\(10^{-14}\\) m",
              "The atom, about \\(10^{-10}\\) m, is 10,000 to 100,000 times larger than its nucleus",
            ],
          },
          {
            cells: [
              "A thin sheet of solid hydrogen in place of gold",
              "No large-angle scattering: the proton is lighter than the alpha particle and has charge e only, so it recoils instead of turning the alpha particle back",
            ],
            noteAmber: "Board 2022 asked this; it is also NCERT Exercise 12.2.",
            pyqExampleId: "9dddaf74-3df7-4528-aa5b-6b1124425736",
          },
        ],
        caption: "The gold nucleus is about 50 times heavier than an alpha particle, so it stays still while the alpha particle is turned.",
      },
      selfCheckExample: {
        prompt: "In the Geiger-Marsden experiment, why was the gold foil made so thin?",
        steps: [
          "A thin foil means an alpha particle meets at most one nucleus closely on its way through.",
          "Then each deflection is from a single nucleus, so one trajectory explains the whole graph.",
        ],
        answer: "So that an alpha particle is scattered at most once while it crosses the foil",
      },
      practiceSet: [
        { prompt: "What fraction of the alpha particles were deflected by more than 90° in the Geiger-Marsden experiment?", answer: "About 1 in 8000" },
        { prompt: "Why is the Geiger-Marsden apparatus kept in a vacuum?", answer: "So that air molecules do not scatter the alpha particles" },
        { prompt: "In which model of the atom is the positive charge spread over the whole atom?", answer: "Thomson's model" },
      ],
      pyqExampleId: "2ff2f88c-8a1e-4868-ac20-3a34c0eefcd0",
      traps: [
        {
          title: "A graph that rises, or has no labels",
          body: "N falls steeply as θ grows. Put N on the vertical axis and θ (0° to 180°) on the horizontal axis and label both. An unlabelled curve, or one that rises, loses the graph's mark.",
        },
        {
          title: "Conclusions without the observation behind them",
          body: "Write each conclusion with the fact it comes from: most pass undeflected, so the atom is mostly empty; a very few bounce back, so the positive charge and mass are in a tiny nucleus.",
        },
        {
          title: "A schematic with parts missing",
          body: "When the board asks for the schematic arrangement, draw and label the source in a lead block, the narrow beam, the gold foil and the turning detector (zinc sulphide screen and microscope), and say it is all in a vacuum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpat-closest-approach",
      name: "Distance of closest approach",
      intuition:
        "An alpha particle aimed straight at a nucleus slows down as the repulsion grows. At one point it stops for an instant and turns back. There all its kinetic energy has become electric potential energy, and that fixes how close it got.",
      definition:
        "- **Definition:** the distance of closest approach d is the least distance from the centre of the nucleus that a charged particle fired head-on reaches before it stops momentarily and turns back.\n" +
        "- **Step 1:** the alpha particle has charge \\(2e\\); the nucleus has charge \\(Ze\\).\n" +
        "- **Step 2:** at d the particle is at rest, so its kinetic energy K has all become potential energy: \\(K = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{(2e)(Ze)}{d}\\).\n" +
        "- **Step 3:** \\(d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{K}\\). For a proton (charge e) the 2 goes: \\(d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Ze^2}{K}\\).\n" +
        "- **What d depends on:** \\(d \\propto \\dfrac{q}{K}\\). At the same speed \\(K = \\tfrac{1}{2}mv^2\\), so \\(d \\propto \\dfrac{q}{mv^2}\\): halving v makes d four times as large. At the same momentum \\(K = \\dfrac{p^2}{2m}\\), so \\(d \\propto qm\\).\n" +
        "- Particles accelerated from rest through the same potential difference V have \\(K = qV\\), so \\(d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Ze}{V}\\), the same for any charge.\n" +
        "- d is an upper limit on the size of the nucleus. For a 7.7 MeV alpha particle on gold, d works out to about 30 fm, while the radius of the gold nucleus is about 6 fm, so the alpha particle turns back without touching it.",
      formula: {
        label: "Distance of closest approach",
        latex: "d = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{2Ze^2}{K} \\quad (\\alpha\\text{ particle}), \\qquad d = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{Ze^2}{K} \\quad (\\text{proton})",
        symbols: [
          { symbol: "\\(Z\\)", meaning: "atomic number of the target nucleus" },
          { symbol: "\\(K\\)", meaning: "kinetic energy of the particle far from the nucleus, in joules" },
        ],
      },
      authoredExample: {
        prompt: "An alpha particle of kinetic energy 5.0 MeV approaches a silver nucleus (Z = 47) head-on. Find its distance of closest approach.",
        steps: [
          "Given: \\(K = 5.0\\) MeV \\(= 5.0 \\times 10^6 \\times 1.6 \\times 10^{-19} = 8.0 \\times 10^{-13}\\) J; Z = 47; alpha charge \\(2e\\).",
          "Formula: \\(d = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{K}\\).",
          "Substitution: \\(d = \\dfrac{9 \\times 10^9 \\times 2 \\times 47 \\times (1.6 \\times 10^{-19})^2}{8.0 \\times 10^{-13}}\\).",
          "\\(d = \\dfrac{2.17 \\times 10^{-26}}{8.0 \\times 10^{-13}} = 2.7 \\times 10^{-14}\\) m.",
        ],
        answer: "\\(d = 2.7 \\times 10^{-14}\\) m (27 fm)",
      },
      selfCheckExample: {
        prompt: "An alpha particle and a proton with the same kinetic energy are fired head-on at the same nucleus. Find the ratio of their distances of closest approach, alpha to proton.",
        steps: [
          "With K the same, \\(d \\propto q\\).",
          "\\(\\dfrac{d_\\alpha}{d_p} = \\dfrac{2e}{e} = 2\\).",
        ],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "The kinetic energy of an alpha particle aimed head-on at a nucleus is made three times as large. What happens to its distance of closest approach?", answer: "It becomes one third" },
        { prompt: "The speed of an alpha particle aimed head-on at a nucleus is doubled. What happens to its distance of closest approach?", answer: "It becomes one quarter, since \\(d \\propto 1/v^2\\)" },
        { prompt: "Why is the distance of closest approach only an upper limit on the size of the nucleus?", answer: "The particle turns back before touching the nucleus, so the nucleus is smaller than d" },
      ],
      pyqExampleId: "d227c56e-eb8a-4162-b81f-f9cb62963e18",
      traps: [
        {
          title: "The alpha particle's charge",
          body: "An alpha particle carries \\(2e\\), a proton \\(e\\). Writing \\(Ze^2\\) for an alpha particle halves the answer; writing \\(2Ze^2\\) for a proton doubles it.",
        },
        {
          title: "MeV left unconverted",
          body: "Change MeV to joules (\\(1\\) MeV \\(= 1.6 \\times 10^{-13}\\) J) before dividing. A d of order \\(10^{-14}\\) m is a sign the units are right.",
        },
        {
          title: "Ratios at the same speed",
          body: "At the same speed the kinetic energies differ, because the masses differ. Use \\(d \\propto q/(mv^2)\\), not \\(d \\propto q\\). A proton moving at the same speed as an alpha particle has a d twice the alpha particle's, not half.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpat-impact-parameter",
      name: "Impact parameter and distance of closest approach",
      intuition:
        "The impact parameter is how far off-centre the alpha particle is aimed. Aim it dead centre and it comes straight back; aim it far off and it hardly bends. The distance of closest approach is the stopping point of the head-on shot.",
      definition:
        "- **Impact parameter b:** the perpendicular distance of the initial velocity vector of the alpha particle from the centre of the nucleus.\n" +
        "- Small b gives a large scattering angle. In a head-on collision b is least (zero) and the alpha particle rebounds, \\(\\theta \\approx 180^\\circ\\). For a large b it goes nearly undeviated, \\(\\theta \\approx 0^\\circ\\).\n" +
        "- A beam has particles with many values of b, so it is scattered in many directions with different probabilities. Few particles have a very small b, so few bounce back.\n" +
        "- A 'distinguish' answer must give both sides of each point.",
      table: {
        columns: ["Point", "Impact parameter b", "Distance of closest approach d"],
        rows: [
          {
            cells: [
              "Meaning",
              "Perpendicular distance of the initial velocity of the particle from the centre of the nucleus",
              "Least distance from the centre of the nucleus reached by a particle fired head-on",
            ],
            noteAmber: "Board 2023 asked you to differentiate the two (twice) and to name when b is least and when it is very large.",
            pyqExampleId: "7655e4aa-098b-4199-9987-50b6e35f243f",
          },
          { cells: ["Fixed by", "How the particle is aimed", "The kinetic energy and charge of the particle and the charge of the nucleus"] },
          { cells: ["At θ = 180°", "Zero (least): a head-on collision", "Reached: the particle stops and turns back"] },
          {
            cells: ["At θ near 0°", "Very large", "Not reached: the particle passes far away"],
            noteAmber: "Board 2024 set an assertion-reason item claiming b is largest at 180°: it is least there.",
          },
        ],
        caption: "Small b, close encounter, large deflection; large b, distant pass, small deflection.",
      },
      selfCheckExample: {
        prompt: "An alpha particle is scattered through 90° and another, aimed at the same nucleus with the same energy, through 10°. Which had the larger impact parameter?",
        steps: ["A larger impact parameter gives a smaller deflection.", "So the particle scattered through 10° had the larger b."],
        answer: "The one scattered through 10°",
      },
      practiceSet: [
        { prompt: "Two alpha particles of the same energy are aimed at one nucleus, with impact parameters b and 2b. Which is deflected more?", answer: "The one with impact parameter b" },
        { prompt: "Why do only a few alpha particles in a beam bounce back from a gold foil?", answer: "Very few have an impact parameter close to zero" },
        { prompt: "Does the distance of closest approach of a head-on alpha particle depend on its kinetic energy?", answer: "Yes; it is inversely proportional to the kinetic energy" },
      ],
      pyqExampleId: "3b559c0a-d255-4706-b2da-95ec2ed9633e",
      traps: [
        {
          title: "Impact parameter largest for a head-on hit",
          body: "It is the other way round. A head-on collision has the least impact parameter, zero, and the particle bounces straight back; a very large impact parameter leaves it almost undeviated.",
        },
        {
          title: "A distinction that covers one side",
          body: "For 'differentiate between', write each point for both b and d, in a table if you like. Defining only one of them earns half the marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpat-electron-orbits",
      name: "Electron orbits in Rutherford's model and why it fails",
      intuition:
        "Rutherford put the electrons in orbit round the nucleus, held by electric attraction the way gravity holds a planet. The orbit works as mechanics. It fails as electromagnetism: a charge going round a circle is accelerating, and an accelerating charge gives out light and loses energy.",
      definition:
        "- **Force balance:** the electric attraction gives the centripetal force, \\(\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^2}{r^2} = \\dfrac{mv^2}{r}\\), so \\(r = \\dfrac{e^2}{4\\pi\\varepsilon_0 mv^2}\\).\n" +
        "- **Energies:** \\(K = \\dfrac{e^2}{8\\pi\\varepsilon_0 r}\\), \\(U = -\\dfrac{e^2}{4\\pi\\varepsilon_0 r}\\), so \\(E = K + U = -\\dfrac{e^2}{8\\pi\\varepsilon_0 r}\\). The total energy is negative: the electron is bound to the nucleus.\n" +
        "- **Difficulty 1, the atom is unstable:** an electron moving in a circle is accelerated, and by classical electromagnetic theory it radiates, loses energy and spirals into the nucleus.\n" +
        "- **Difficulty 2, no line spectrum:** classically the frequency of the emitted light equals the frequency of revolution, \\(\\nu = \\dfrac{v}{2\\pi r}\\). As the electron spirals in, this changes continuously, so the atom would give a continuous spectrum, not the line spectrum actually seen.",
      formula: {
        label: "Total energy of the electron in an orbit of radius r",
        latex: "E = K + U = \\frac{e^2}{8\\pi\\varepsilon_0 r} - \\frac{e^2}{4\\pi\\varepsilon_0 r} = -\\frac{e^2}{8\\pi\\varepsilon_0 r}",
      },
      authoredExample: {
        prompt: "An electron revolves round a proton in an orbit of radius \\(2.12 \\times 10^{-10}\\) m. Find its total energy in joules and in eV.",
        steps: [
          "Given: \\(r = 2.12 \\times 10^{-10}\\) m, \\(e = 1.6 \\times 10^{-19}\\) C, \\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\) N m² C⁻².",
          "Formula: \\(E = -\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^2}{2r}\\).",
          "\\(E = -\\dfrac{9 \\times 10^9 \\times (1.6 \\times 10^{-19})^2}{2 \\times 2.12 \\times 10^{-10}} = -5.4 \\times 10^{-19}\\) J.",
          "In eV: \\(\\dfrac{-5.4 \\times 10^{-19}}{1.6 \\times 10^{-19}} = -3.4\\) eV.",
        ],
        answer: "\\(E = -5.4 \\times 10^{-19}\\) J \\(= -3.4\\) eV",
      },
      selfCheckExample: {
        prompt: "Give the two difficulties of Rutherford's model of the atom.",
        steps: [
          "The revolving electron is accelerated, so it should radiate, lose energy and spiral into the nucleus: atoms would not be stable.",
          "The frequency of revolution would change as it spirals in, so the light would form a continuous spectrum, not lines.",
        ],
        answer: "It cannot explain why atoms are stable, and it cannot explain their line spectra",
      },
      practiceSet: [
        { prompt: "What does the negative sign of the total energy of an electron in an atom mean?", answer: "The electron is bound to the nucleus; energy must be given to free it" },
        { prompt: "In Rutherford's model, how is the kinetic energy of the orbiting electron related to its potential energy?", answer: "\\(K = -U/2\\)" },
        { prompt: "The total energy of an electron in an orbit is −5 eV. What is its kinetic energy?", answer: "+5 eV, since \\(K = -E\\)" },
      ],
      pyqExampleId: "7a5efba4-fca5-4ed3-a2e6-18402643aa52",
      traps: [
        {
          title: "A limitation without the reason",
          body: "Do not write only 'the atom is unstable'. Say why: the orbiting electron is accelerated, an accelerated charge radiates, so it loses energy and spirals in.",
        },
        {
          title: "Ångström left in the formula",
          body: "Change Å to metres (\\(1\\) Å \\(= 10^{-10}\\) m) before using \\(v/2\\pi r\\) or \\(e^2/8\\pi\\varepsilon_0 r\\).",
        },
      ],
    },
  ],
};
