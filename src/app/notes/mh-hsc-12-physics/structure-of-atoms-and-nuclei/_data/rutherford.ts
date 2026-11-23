import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_RUTHERFORD_NOTE: SubtopicNote = {
  subtopicName: "Thomson's and Rutherford's Atomic Models",
  title: "Thomson's and Rutherford's Models of the Atom",
  oneLineDefinition:
    "How the Geiger-Marsden scattering experiment ruled out Thomson's plum-pudding model and led to Rutherford's nuclear atom, and why Rutherford's model could not explain a stable atom or its line spectrum.",
  whyItMatters:
    "3 questions. One was set in a board paper: describe the Geiger-Marsden experiment with a neat labelled diagram, asked in 2016 together with the meaning of mass defect. The textbook adds the difficulties of Rutherford's model and the energy an alpha particle needs to reach the surface of a gold nucleus.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpan-geiger-marsden",
      name: "The Geiger-Marsden experiment",
      intuition:
        "Thomson pictured the atom as a sphere of thinly spread positive charge with electrons stuck in it, like a plum pudding. Spread so thinly, that charge could only nudge a fast alpha particle by a tiny angle. So when a few alpha particles bounced straight back off a gold foil, the positive charge had to be packed into a very small, heavy centre. That centre is the nucleus.",
      definition:
        "- **Thomson's model (1903):** the atom is a sphere of uniform positive charge in which the electrons are embedded, so that the atom is neutral. It is called the plum-pudding model.\n" +
        "- **Set-up:** alpha particles (helium nuclei, charge \\(+2e\\)) from a source are collimated into a narrow beam and fall on a thin **gold foil**. The scattered particles produce flashes (scintillations) on a surrounding screen, watched through a **microscope** that can be moved to any scattering angle \\(\\theta\\).\n" +
        "- **Rutherford's conclusion:** the whole positive charge and most (99.9%) of the mass of the atom sit in a tiny central **nucleus**, about 10 fm (\\(10^{-14}\\) m) across. The electrons revolve round it, and the space between is mostly empty.\n" +
        "- The board asks this as 'describe with a neat labelled diagram'. Draw the source, the beam, the foil, the screen with the microscope and the angle \\(\\theta\\), then write the observations and conclusions in pairs.",
      table: {
        columns: ["Observation", "What it shows"],
        rows: [
          {
            cells: ["Most alpha particles passed straight through the foil", "Most of the atom is empty space"],
            pyqExampleId: "e61788d5-1f7e-45e7-a2e2-46aecca87aca",
            noteAmber: "Board 2016 asked you to describe the experiment with a neat labelled diagram.",
          },
          {
            cells: ["Only about 0.14% were turned through more than 0.1°", "The positive charge is not spread through the whole atom"],
          },
          {
            cells: ["About 1 in 8000 was turned through more than 90°, a few through nearly 180°", "A tiny, heavy, positively charged centre (the nucleus) repels them back"],
          },
          {
            cells: ["Thomson's model allows only very small deflections", "The large deflections rule out Thomson's model"],
          },
        ],
      },
      practiceSet: [
        { prompt: "Which metal foil was used in the Geiger-Marsden experiment?", answer: "A thin gold foil" },
        { prompt: "About how many alpha particles in 8000 were turned through more than 90° in the Geiger-Marsden experiment?", answer: "About one" },
        { prompt: "Which model of the atom did the Geiger-Marsden results rule out?", answer: "Thomson's plum-pudding model" },
      ],
      traps: [
        {
          title: "No diagram where one is asked",
          body: "When the question says 'with a neat labelled diagram', the diagram carries marks of its own. Label the source, the collimated beam, the gold foil, the screen, the microscope and the scattering angle \\(\\theta\\).",
        },
        {
          title: "Saying most alpha particles bounced back",
          body: "Most passed straight through. Only about 1 in 8000 was turned through more than 90°. That small number is exactly why the nucleus must be tiny.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-rutherford-model",
      name: "Rutherford's model, its difficulties and the closest approach",
      intuition:
        "Rutherford's atom is a tiny solar system: a heavy nucleus with electrons circling it. But a charge moving in a circle is accelerating, and by Maxwell's theory an accelerating charge radiates. So the electron should lose energy, spiral inwards and crash into the nucleus, giving out light of steadily changing frequency on the way. Real atoms are stable and give sharp lines, so the model needed fixing. That fix is Bohr's model, on the next page. An alpha particle fired straight at a nucleus slows down as it climbs the electric hill, and stops where all its kinetic energy has become potential energy.",
      definition:
        "- **Model:** the entire positive charge and most of the mass are in the central nucleus; the electrons revolve round it in circular orbits, like planets round the Sun. Without that revolution the electrons would fall into the nucleus.\n" +
        "- **Difficulty 1 (stability):** an electron in a circular orbit is accelerated, so it should radiate continuously, lose energy and spiral into the nucleus. The atom would collapse, but atoms are stable.\n" +
        "- **Difficulty 2 (spectrum):** as the electron spirals in, the frequency it emits would change continuously, giving a continuous spectrum. Atoms actually give a line spectrum.\n" +
        "- **Difficulty 3:** atoms do not radiate on their own; they must first be given energy, for example by heating.\n" +
        "- **Closest approach:** an alpha particle (charge \\(2e\\)) moving head-on towards a nucleus of charge \\(Ze\\) stops at distance \\(r\\) when its kinetic energy \\(K\\) equals the electrostatic potential energy.",
      formula: {
        label: "Closest approach of an alpha particle",
        latex: "K = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{(2e)(Ze)}{r}",
        symbols: [
          { symbol: "\\(K\\)", meaning: "initial kinetic energy of the alpha particle, in joules" },
          { symbol: "\\(Z\\)", meaning: "atomic number of the target nucleus (79 for gold)" },
          { symbol: "\\(r\\)", meaning: "distance between the centres when the alpha particle stops" },
        ],
      },
      authoredExample: {
        prompt:
          "An alpha particle of kinetic energy 7.7 MeV moves straight towards a gold nucleus (Z = 79). Find its distance of closest approach. (\\(\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\) SI units, \\(e = 1.6 \\times 10^{-19}\\) C, 1 MeV = \\(1.6 \\times 10^{-13}\\) J)",
        steps: [
          "Given: \\(K = 7.7\\) MeV \\(= 7.7 \\times 1.6 \\times 10^{-13} = 1.232 \\times 10^{-12}\\) J, \\(Z = 79\\).",
          "Formula: \\(r = \\dfrac{1}{4\\pi\\varepsilon_0}\\,\\dfrac{2Ze^2}{K}\\).",
          "Substitution: \\(r = \\dfrac{9 \\times 10^9 \\times 2 \\times 79 \\times (1.6 \\times 10^{-19})^2}{1.232 \\times 10^{-12}}\\).",
          "\\(r = \\dfrac{3.640 \\times 10^{-26}}{1.232 \\times 10^{-12}} = 2.95 \\times 10^{-14}\\) m.",
        ],
        answer: "\\(2.95 \\times 10^{-14}\\) m (about 30 fm)",
      },
      selfCheckExample: {
        prompt: "Explain in two steps why an electron in Rutherford's model should spiral into the nucleus.",
        steps: [
          "Moving in a circle, the electron's direction changes all the time, so it is accelerated.",
          "An accelerated charge radiates energy, so the electron loses energy and its orbit shrinks until it falls into the nucleus.",
        ],
        answer: "It is accelerated, so it radiates, loses energy and spirals inwards",
      },
      practiceSet: [
        { prompt: "In Rutherford's model, where is almost all of the mass of the atom?", answer: "In the nucleus (about 99.9% of it)" },
        { prompt: "What kind of spectrum would Rutherford's model predict for an atom?", answer: "A continuous spectrum, not a line spectrum" },
        { prompt: "The kinetic energy of an alpha particle aimed head-on at a nucleus is doubled. What happens to its distance of closest approach?", answer: "It is halved, since \\(r \\propto 1/K\\)" },
      ],
      pyqExampleId: "b64a791b-ec18-47ab-b3c0-cf72cccea854",
      traps: [
        {
          title: "Giving the alpha particle a charge of e",
          body: "An alpha particle is a helium nucleus with two protons, so its charge is \\(2e\\). Using \\(e\\) halves the answer.",
        },
        {
          title: "Leaving the energy in MeV",
          body: "In \\(K = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{r}\\) every quantity is in SI units. Convert MeV to joules first: 1 MeV = \\(1.6 \\times 10^{-13}\\) J.",
        },
        {
          title: "Naming one difficulty when the question asks for difficulties",
          body: "Write both: the atom would collapse (stability), and it would give a continuous spectrum instead of lines. One point earns only part of the marks.",
        },
      ],
    },
  ],
};
