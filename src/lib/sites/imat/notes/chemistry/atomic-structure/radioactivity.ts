import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ATS_RADIOACTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Radioactivity and Half-Life",
  title: "Radioactive Decay, Nuclear Equations and Half-Life",
  oneLineDefinition:
    "Unstable nuclei decay by emitting alpha, beta or gamma radiation; nuclear equations balance mass and atomic numbers, and the half-life is the time for half the nuclei to decay.",
  whyItMatters:
    "No past paper in this chapter has asked about radioactivity yet, but it is in the official syllabus. Expect a short calculation (a half-life, or the nucleus left after a decay) rather than a long one.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ats-radiation-types",
      name: "Alpha, beta and gamma radiation and what each does to the nucleus",
      intuition:
        "A nucleus with the wrong balance of protons and neutrons is unstable. A heavy nucleus can shed a compact package of two protons and two neutrons (alpha). A nucleus with too many neutrons turns a neutron into a proton and throws out an electron (beta-minus). Gamma rays carry away leftover energy without changing which nucleus it is.",
      definition:
        "- **Radioactive decay** is random and spontaneous: it cannot be sped up by heat, pressure or chemical reaction.\n" +
        "- **Ionising power** (damage done along the path) is greatest for alpha and least for gamma; **penetrating power** is the reverse.\n" +
        "- A beta-minus electron is made in the nucleus (\\(\\mathrm{n} \\rightarrow \\mathrm{p} + e^-\\)); it is not one of the atom's shell electrons.\n" +
        "- Alpha and beta particles are deflected by electric and magnetic fields in opposite directions; gamma rays are not deflected.",
      table: {
        columns: ["Radiation", "What it is", "Change to the nucleus", "Charge", "Stopped by"],
        rows: [
          { cells: ["Alpha (α)", "Helium nucleus \\({}^{4}_{2}\\mathrm{He}\\): 2 protons and 2 neutrons", "A falls by 4, Z falls by 2", "+2", "A sheet of paper or a few cm of air"] },
          { cells: ["Beta-minus (β⁻)", "Fast electron \\({}^{0}_{-1}e\\), made when a neutron becomes a proton", "A unchanged, Z rises by 1", "−1", "A few mm of aluminium"] },
          { cells: ["Beta-plus (β⁺)", "Positron \\({}^{0}_{+1}e\\), made when a proton becomes a neutron", "A unchanged, Z falls by 1", "+1", "A few mm of aluminium"] },
          { cells: ["Gamma (γ)", "High-energy electromagnetic radiation", "No change to A or Z", "0", "Only reduced, by thick lead or concrete"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A radioactive nucleus emits radiation. Afterwards its atomic number is one higher and its mass number is unchanged. What was emitted?",
        options: [
          "An alpha particle",
          "A positron",
          "A beta-minus particle (an electron)",
          "A gamma ray",
          "A neutron",
        ],
        steps: [
          "Z up by 1 with A unchanged means a neutron became a proton, which is beta-minus decay.",
          "A positron (B) lowers Z by 1. An alpha particle (A) lowers A by 4 and Z by 2.",
          "A gamma ray (D) changes neither number. Losing a neutron (E) would lower A by 1 and leave Z unchanged.",
        ],
        answer: "(C) A beta-minus particle (an electron)",
      },
      practiceSet: [
        { prompt: "Which radiation is the most penetrating?", answer: "Gamma" },
        { prompt: "Which radiation is the most strongly ionising?", answer: "Alpha" },
        { prompt: "What happens to A and Z when a nucleus emits only a gamma ray?", answer: "Neither changes; the nucleus just loses energy" },
      ],
      traps: [
        {
          title: "The beta electron comes from the nucleus",
          body: "In beta-minus decay a neutron in the nucleus changes into a proton and an electron, and the electron is emitted. The atom's shell electrons are not involved. That is why the atomic number rises by one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-nuclear-equations",
      name: "Balancing nuclear equations",
      intuition:
        "Nucleons and charge are both conserved in a decay. So the mass numbers on the top line must add up to the same total on both sides, and so must the atomic numbers on the bottom line. Find the unknown by subtraction, then name it from its atomic number.",
      definition:
        "In a nuclear equation:\n" +
        "- The **mass numbers** (top) add up to the same total on each side.\n" +
        "- The **atomic numbers** (bottom) add up to the same total on each side.\n" +
        "- Write particles in the same style: alpha \\({}^{4}_{2}\\mathrm{He}\\), beta-minus \\({}^{0}_{-1}e\\), positron \\({}^{0}_{+1}e\\), neutron \\({}^{1}_{0}\\mathrm{n}\\).\n" +
        "- The new atomic number tells you the new element, so a decay changes one element into another (except gamma).",
      formula: {
        label: "Conservation in a nuclear equation",
        latex: "\\sum A_{\\text{before}} = \\sum A_{\\text{after}} \\qquad \\sum Z_{\\text{before}} = \\sum Z_{\\text{after}}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "mass number of each particle" },
          { symbol: "\\(Z\\)", meaning: "atomic number (charge number) of each particle" },
        ],
      },
      authoredExample: {
        prompt:
          "Uranium-238 (\\(Z = 92\\)) emits an alpha particle, and the product then emits a beta-minus particle. Write both equations. (Th has \\(Z = 90\\); Pa has \\(Z = 91\\).)",
        steps: [
          "Alpha: \\({}^{238}_{92}\\mathrm{U} \\rightarrow {}^{234}_{90}\\mathrm{Th} + {}^{4}_{2}\\mathrm{He}\\). Check: \\(238 = 234 + 4\\) and \\(92 = 90 + 2\\).",
          "Beta-minus: \\({}^{234}_{90}\\mathrm{Th} \\rightarrow {}^{234}_{91}\\mathrm{Pa} + {}^{0}_{-1}e\\). Check: \\(234 = 234 + 0\\) and \\(90 = 91 + (-1)\\).",
        ],
        answer: "\\({}^{234}_{90}\\mathrm{Th}\\), then \\({}^{234}_{91}\\mathrm{Pa}\\)",
      },
      selfCheckExample: {
        prompt:
          "A nucleus of radium-226 (\\(Z = 88\\)) emits two alpha particles and then one beta-minus particle. What are the mass number A and atomic number Z of the final nucleus?",
        options: [
          "A = 218, Z = 83",
          "A = 222, Z = 85",
          "A = 218, Z = 84",
          "A = 218, Z = 85",
          "A = 217, Z = 85",
        ],
        steps: [
          "Two alphas: A falls by \\(2 \\times 4 = 8\\) to 218; Z falls by \\(2 \\times 2 = 4\\) to 84.",
          "One beta-minus: A stays 218; Z rises by 1 to 85.",
          "A lowers Z for the beta (that would be a positron). C forgets the beta. B counts only one alpha, and E takes 1 off the mass number for the beta.",
        ],
        answer: "(D) A = 218, Z = 85",
      },
      practiceSet: [
        { prompt: "Phosphorus-32 (\\(Z = 15\\)) decays by beta-minus emission. What nucleus forms?", answer: "Sulfur-32, \\({}^{32}_{16}\\mathrm{S}\\)", method: "Z rises by 1, A unchanged" },
        { prompt: "Radon-222 (\\(Z = 86\\)) emits an alpha particle. Give A and Z of the product.", answer: "A = 218, Z = 84 (polonium)", method: "\\(222 - 4\\), \\(86 - 2\\)" },
        {
          prompt: "Uranium-238 (\\(Z = 92\\)) decays in a series to lead-206 (\\(Z = 82\\)). How many alpha and beta-minus decays occur?",
          answer: "8 alpha and 6 beta-minus",
          method: "Alphas from A: \\((238 - 206)/4 = 8\\), lowering Z by 16 to 76; six betas raise it to 82",
        },
      ],
      traps: [
        {
          title: "Beta decay does not change the mass number",
          body: "An electron has mass number 0, so beta emission leaves A unchanged and changes Z by one. Only alpha decay lowers the mass number (by 4). Options that lower A after a beta decay are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-half-life",
      name: "Half-life calculations",
      intuition:
        "Each unstable nucleus has the same chance of decaying in a given time, whatever has happened before. So in one half-life, half of whatever is left decays: a sample never runs out in a fixed time, it keeps halving. Count the half-lives, then halve that many times.",
      definition:
        "The **half-life** \\(T_{1/2}\\) is the time taken for half the radioactive nuclei in a sample to decay. The activity (decays per second, in **becquerels**, Bq) and the mass of the radioactive isotope halve in the same time.\n" +
        "- After 1, 2, 3, 4 half-lives the fraction left is \\(\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}, \\tfrac{1}{16}\\).\n" +
        "- The half-life is fixed for each isotope (carbon-14: about 5730 years; iodine-131: about 8 days). It does not depend on the amount, temperature or chemical form.\n" +
        "- The fraction **decayed** is 1 minus the fraction left.",
      formula: {
        label: "Amount left after time t",
        latex: "N = N_0 \\left(\\tfrac{1}{2}\\right)^{t/T_{1/2}}",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "starting amount (nuclei, mass or activity)" },
          { symbol: "\\(N\\)", meaning: "amount left after time \\(t\\)" },
          { symbol: "\\(T_{1/2}\\)", meaning: "half-life, in the same unit as \\(t\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A sample contains 80 g of an isotope with a half-life of 5 days. How much of the isotope is left after 20 days?",
        steps: [
          "Number of half-lives: \\(20 / 5 = 4\\).",
          "Halve four times: \\(80 \\rightarrow 40 \\rightarrow 20 \\rightarrow 10 \\rightarrow 5\\ \\text{g}\\).",
          "Same with the formula: \\(80 \\times (1/2)^4 = 80/16 = 5\\ \\text{g}\\).",
        ],
        answer: "5 g",
      },
      selfCheckExample: {
        prompt:
          "The activity of a radioactive sample falls from 640 Bq to 40 Bq in 24 hours. What is its half-life?",
        options: ["6 hours", "4 hours", "8 hours", "12 hours", "1.5 hours"],
        steps: [
          "\\(640 \\rightarrow 320 \\rightarrow 160 \\rightarrow 80 \\rightarrow 40\\): four halvings, so 24 hours is 4 half-lives.",
          "\\(T_{1/2} = 24 / 4 = 6\\) hours.",
          "C counts three halvings and D only two. B would need six halvings, down to 10 Bq. E divides 24 by the ratio 16 instead of by the number of halvings.",
        ],
        answer: "(A) 6 hours",
      },
      practiceSet: [
        { prompt: "What fraction of a sample is left after 3 half-lives?", answer: "\\(\\tfrac{1}{8}\\)" },
        { prompt: "What fraction of a sample has decayed after 2 half-lives?", answer: "\\(\\tfrac{3}{4}\\)", method: "\\(1 - \\tfrac{1}{4}\\)" },
        { prompt: "Iodine-131 has a half-life of 8 days. How much of a 100 mg sample is left after 24 days?", answer: "12.5 mg", method: "3 half-lives: \\(100/8\\)" },
        { prompt: "Wood keeps 25% of its original carbon-14. How old is it? (Half-life 5730 years.)", answer: "11 460 years", method: "25% is 2 half-lives" },
      ],
      traps: [
        {
          title: "Two half-lives leave a quarter, not nothing",
          body: "Each half-life halves what is LEFT, not the original amount. After two half-lives a quarter remains, after three an eighth. An option saying the sample is gone after two half-lives is wrong.",
        },
        {
          title: "Heating or reacting a sample does not change its half-life",
          body: "Radioactive decay happens in the nucleus, which chemical reactions and temperature do not reach. The half-life of an isotope is the same in any compound, at any temperature and for any sample size.",
        },
      ],
    },
  ],
};
