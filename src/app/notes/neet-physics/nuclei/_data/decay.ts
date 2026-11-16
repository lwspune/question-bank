import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_NU_DECAY_NOTE: SubtopicNote = {
  subtopicName: "Radioactive Decay",
  title: "Radioactive Decay",
  oneLineDefinition:
    "What alpha, beta and gamma rays are, how each decay changes the mass number A and the atomic number Z, and how half-life and activity measure the speed of decay.",
  whyItMatters:
    "Six NEET questions from 2021 to 2024, none since. Three track A and Z through decays: a positron emission (2022) and two chains of decays (2021, NEET 2024). One checks the nature of alpha, beta and gamma rays (Re-NEET 2024). Two count half-lives of activity (2021, 2023).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphnu-radiations",
      name: "Alpha, beta and gamma rays",
      intuition:
        "A radioactive nucleus is unstable and changes on its own by sending something out. It may throw out a helium nucleus (alpha), an electron or a positron made inside the nucleus (beta), or a burst of light of very high energy (gamma). The charged rays bend in electric and magnetic fields; gamma, with no charge, goes straight.",
      definition:
        "- **Alpha rays** are helium nuclei, \\(^{4}_{2}\\text{He}\\), with charge \\(+2e\\).\n" +
        "- **Beta rays** are fast electrons (\\(\\beta^-\\)) or positrons (\\(\\beta^+\\)), made inside the nucleus when a neutron turns into a proton, or a proton into a neutron. A positron has the mass of an electron and a charge of \\(+e\\).\n" +
        "- **Gamma rays** are electromagnetic radiation, emitted when a nucleus left in an excited state drops to a lower energy level. Their wavelength is shorter than that of X-rays.\n" +
        "- Charged rays are bent by electric and magnetic fields: alpha and \\(\\beta^-\\) bend opposite ways because their charges have opposite signs. Gamma rays are not bent.",
      table: {
        columns: ["Ray", "What it is", "Charge", "In an electric or magnetic field"],
        rows: [
          { cells: ["Alpha (\\(\\alpha\\))", "A helium nucleus, \\(^{4}_{2}\\text{He}\\)", "\\(+2e\\)", "Bent"] },
          { cells: ["Beta-minus (\\(\\beta^-\\))", "A fast electron from the nucleus", "\\(-e\\)", "Bent, the opposite way to alpha"] },
          { cells: ["Beta-plus (\\(\\beta^+\\))", "A fast positron from the nucleus", "\\(+e\\)", "Bent, the same way as alpha"] },
          {
            cells: ["Gamma (\\(\\gamma\\))", "Electromagnetic radiation (photons)", "None", "Not bent"],
            noteAmber: "Gamma rays have a SHORTER wavelength than X-rays, not a longer one.",
          },
        ],
        caption: "Alpha and beta rays are particles with charge; gamma rays are light of very short wavelength.",
      },
      selfCheckExample: {
        prompt:
          "After a beta decay, a nucleus is left in an excited state and then drops to its lowest energy level. What does it emit, and do its A and Z change?",
        steps: [
          "A nucleus dropping from an excited level gives out the energy as electromagnetic radiation: a gamma photon.",
          "A photon carries no charge and no nucleons, so A and Z stay the same.",
        ],
        answer: "A gamma ray; A and Z do not change",
      },
      practiceSet: [
        { prompt: "Which of alpha, beta and gamma rays is not bent by an electric field?", answer: "Gamma rays" },
        { prompt: "What is the charge of an alpha particle, in units of e?", answer: "+2" },
        { prompt: "Which particle has the mass of an electron but a positive charge?", answer: "The positron" },
        { prompt: "Alpha particles and beta-minus particles enter the same magnetic field. Do they bend the same way?", answer: "No: they bend opposite ways, having opposite charges" },
      ],
      pyqExampleId: "71600e5e-64c5-40aa-9885-f628214990fd",
      traps: [
        {
          title: "Gamma is shorter than X-rays",
          body: "Gamma photons carry more energy than X-rays, so their wavelength is shorter. A statement that gamma rays have a longer wavelength than X-rays is false.",
        },
        {
          title: "A beta electron comes from the nucleus",
          body: "The electron in beta-minus decay is made when a neutron inside the nucleus turns into a proton. It is not one of the atom's orbiting electrons.",
        },
        {
          title: "Beta covers both signs",
          body: "Beta rays can be electrons or positrons. A statement that beta rays are only electrons leaves out beta-plus decay.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphnu-displacement",
      name: "How each decay changes A and Z",
      intuition:
        "Every decay keeps two totals the same: the number of nucleons and the charge. An alpha carries off 2 protons and 2 neutrons. In beta decay one neutron becomes a proton, or one proton a neutron, so A stays and Z moves by one. Gamma is only light, so nothing changes. Follow a chain one step at a time, or count from the two ends: only alpha changes A.",
      definition:
        "- Alpha: \\(^{A}_{Z}\\text{X} \\rightarrow {}^{A-4}_{Z-2}\\text{Y} + {}^{4}_{2}\\text{He}\\).\n" +
        "- Beta-minus: \\(n \\rightarrow p + e^- + \\bar{\\nu}\\) (an antineutrino). A stays, Z rises by 1.\n" +
        "- Beta-plus: \\(p \\rightarrow n + e^+ + \\nu\\) (a neutrino). A stays, Z falls by 1. This happens only inside a nucleus.\n" +
        "- Gamma: A and Z do not change.\n" +
        "- \\(e^-\\) and \\(\\beta^-\\) are the same particle; so are \\(e^+\\) and \\(\\beta^+\\).\n" +
        "- Counting from the two ends of a chain: number of alphas \\(= \\dfrac{A_{\\text{start}} - A_{\\text{end}}}{4}\\); then each alpha takes 2 from Z and each beta-minus adds 1.",
      formula: {
        label: "Decay rules",
        latex: "\\alpha:\\ (A, Z) \\rightarrow (A - 4, Z - 2), \\qquad \\beta^-:\\ (A, Z) \\rightarrow (A, Z + 1), \\qquad \\beta^+:\\ (A, Z) \\rightarrow (A, Z - 1)",
      },
      authoredExample: {
        prompt:
          "\\(^{232}_{90}\\text{Th}\\) decays through a chain to \\(^{208}_{82}\\text{Pb}\\). How many alpha and beta-minus particles are emitted?",
        steps: [
          "A falls by \\(232 - 208 = 24\\), so there are \\(24/4 = 6\\) alphas.",
          "Six alphas alone would take Z to \\(90 - 12 = 78\\).",
          "Lead has Z = 82, so 4 beta-minus decays raise Z by 4.",
        ],
        answer: "6 alpha and 4 beta-minus",
      },
      selfCheckExample: {
        prompt:
          "\\(^{238}_{92}\\text{U}\\) emits an alpha particle, then two beta-minus particles one after the other. What is the final nucleus?",
        steps: [
          "Alpha: \\(^{238}_{92} \\rightarrow {}^{234}_{90}\\).",
          "Two beta-minus: Z rises by 2, A stays: \\(^{234}_{92}\\).",
          "Z = 92 is uranium again.",
        ],
        answer: "\\(^{234}_{92}\\text{U}\\), an isotope of the parent",
      },
      practiceSet: [
        { prompt: "In beta-minus decay, is the electron emitted with a neutrino or an antineutrino?", answer: "An antineutrino" },
        { prompt: "A nucleus emits one alpha particle and one beta-minus particle. By how much do A and Z change?", answer: "A falls by 4 and Z falls by 1" },
        { prompt: "Which emission changes neither A nor Z?", answer: "Gamma" },
        { prompt: "In beta-minus decay, which particle inside the nucleus changes, and into what?", answer: "A neutron changes into a proton" },
      ],
      pyqExampleId: "ea4e7840-f35e-46dc-ab6f-f62a621a6481",
      traps: [
        {
          title: "Beta-minus raises Z",
          body: "It feels as if a minus should lower Z, but losing a negative electron leaves the nucleus one charge more positive. Beta-minus: Z goes up by 1. Beta-plus: Z goes down by 1.",
        },
        {
          title: "Count the alphas first",
          body: "Beta decay never changes A, so the drop in A alone fixes the number of alphas. Then use Z to find the betas.",
        },
        {
          title: "Neutrino or antineutrino",
          body: "Beta-minus gives an electron and an antineutrino; beta-plus gives a positron and a neutrino. Swapping them is a common wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphnu-half-life",
      name: "Half-life and activity",
      intuition:
        "Each nucleus decays at random, but in a large sample a fixed share decays every second. So the more nuclei there are, the more decay per second: the activity is proportional to the number left. In every half-life, half of the nuclei still present decay, so the amount left goes 1, 1/2, 1/4, 1/8 and so on. The activity falls on the same clock.",
      definition:
        "- Activity, the number of decays per second: \\(R = \\lambda N\\), where \\(\\lambda\\) is the decay constant. Its unit is the becquerel (1 Bq = 1 decay per second); 1 curie = \\(3.7 \\times 10^{10}\\) Bq.\n" +
        "- \\(N = N_0e^{-\\lambda t}\\). After n half-lives, \\(N = N_0\\left(\\tfrac{1}{2}\\right)^{n}\\) with \\(n = \\dfrac{t}{T_{1/2}}\\).\n" +
        "- Activity and mass halve on the same clock: \\(R = R_0\\left(\\tfrac{1}{2}\\right)^{t/T_{1/2}}\\).\n" +
        "- n need not be a whole number: the same power law holds.\n" +
        "- Fraction **left** \\(= \\left(\\tfrac{1}{2}\\right)^{n}\\); fraction **decayed** \\(= 1 - \\left(\\tfrac{1}{2}\\right)^{n}\\).\n" +
        "- \\(T_{1/2} = \\dfrac{\\ln 2}{\\lambda} = \\dfrac{0.693}{\\lambda}\\). Mean life \\(\\tau = \\dfrac{1}{\\lambda}\\), so \\(T_{1/2} = 0.693\\,\\tau\\).",
      formula: {
        label: "Decay law",
        latex: "N = N_0\\left(\\tfrac{1}{2}\\right)^{t/T_{1/2}}, \\qquad R = \\lambda N, \\qquad T_{1/2} = \\frac{0.693}{\\lambda} = 0.693\\,\\tau",
      },
      authoredExample: {
        prompt:
          "A sample of 80 mg has a half-life of 6 hours. How much of it is left after 24 hours, and how much has decayed?",
        steps: [
          "\\(n = \\dfrac{24}{6} = 4\\) half-lives.",
          "Left: \\(80 \\times \\left(\\tfrac{1}{2}\\right)^{4} = \\dfrac{80}{16} = 5\\) mg.",
          "Decayed: \\(80 - 5 = 75\\) mg.",
        ],
        answer: "5 mg left; 75 mg decayed",
      },
      selfCheckExample: {
        prompt: "The activity of a source falls from 9600 to 300 decays per minute in 40 minutes. What is its half-life?",
        steps: [
          "\\(\\dfrac{9600}{300} = 32 = 2^{5}\\), so 5 half-lives have passed.",
          "\\(T_{1/2} = \\dfrac{40}{5} = 8\\) minutes.",
        ],
        answer: "8 minutes",
      },
      practiceSet: [
        { prompt: "A nuclide has a half-life of 10 days. What fraction of it is left after 30 days?", answer: "1/8" },
        { prompt: "A sample has a half-life of 5 hours. What fraction of it has decayed after 10 hours?", answer: "3/4" },
        { prompt: "A nuclide has a decay constant of 0.0693 per second. What is its half-life?", answer: "10 s" },
        { prompt: "A nuclide has a half-life of 0.693 s. What is its mean life?", answer: "1 s" },
      ],
      pyqExampleId: "f2edde36-e1e9-4896-a3be-c06aa384b204",
      traps: [
        {
          title: "Decayed is not left",
          body: "If 7/8 of a sample has decayed, 1/8 is left, so 3 half-lives have passed. Read whether the question gives the part left or the part decayed.",
        },
        {
          title: "Each half-life halves what remains",
          body: "After two half-lives a quarter is left, not nothing. A half-life removes half of what is still there, not half of the original amount.",
        },
        {
          title: "Use the power even when n is not whole",
          body: "After half a half-life the fraction left is \\(\\left(\\tfrac{1}{2}\\right)^{1/2} = \\dfrac{1}{\\sqrt{2}} \\approx 0.71\\), not 3/4. Never share out a half-life in a straight line.",
        },
        {
          title: "Mean life is longer than half-life",
          body: "\\(\\tau = \\dfrac{T_{1/2}}{0.693}\\), about 1.44 half-lives. Multiplying the half-life by 0.693 to get the mean life gives a value that is too small.",
        },
      ],
    },
  ],
};
