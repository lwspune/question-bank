import type { SubtopicNote } from "@/app/notes/_types";

export const HALFLIFE_NUC_NOTE: SubtopicNote = {
  subtopicName: "Decay Modes and Half-Lives",
  title: "Decay Modes and Half-Lives",
  oneLineDefinition:
    "Alpha decay takes 4 from A and 2 from Z, beta-minus adds 1 to Z, beta-plus takes 1 from Z and gamma changes neither; and after every half-life, half of what is left decays.",
  whyItMatters:
    "Twenty-four PYQs, three of them numerical, and none from 2026. Fifteen count half-lives, and the last of those was in April 2023. Nine track A and Z through alpha and beta decay or balance a fission; only three of them are later than 2023 (two in April 2024, one in January 2025). Radioactivity was cut from the NCERT syllabus in 2023-24, and these dates match: this page serves older papers, the boards and NEET more than a 2026 JEE paper.",
  concepts: [
    // C1 — decay modes and A, Z bookkeeping
    {
      kind: "reference" as const,
      slug: "jpnuc-decay-modes",
      name: "Alpha, beta and gamma decay: what changes",
      intuition:
        "Every decay keeps two totals fixed: the number of nucleons (A) and the charge (Z). An alpha carries away 2 protons and 2 neutrons. In beta decay a neutron turns into a proton, or a proton into a neutron, so A stays and Z moves by one. Gamma is only light leaving an excited nucleus. To count a chain, use A first (only alphas change it), then fix Z with betas.",
      definition:
        "- Count the alphas from the change in A: \\(n_\\alpha = \\dfrac{A_{\\text{parent}} - A_{\\text{daughter}}}{4}\\).\n" +
        "- Each alpha lowers Z by 2, each beta-minus raises it by 1: \\(n_{\\beta^-} = 2n_\\alpha - (Z_{\\text{parent}} - Z_{\\text{daughter}})\\).\n" +
        "- Beta-minus: \\(n \\rightarrow p + e^- + \\bar{\\nu}\\) (an antineutrino). Beta-plus: \\(p \\rightarrow n + e^+ + \\nu\\) (a neutrino).\n" +
        "- A free neutron can decay because it is heavier than a proton plus an electron. A free proton cannot turn into a neutron, which is heavier; inside a nucleus the energy can come from the binding energy.\n" +
        "- A fission equation balances the same way: A and Z on both sides, counting the neutrons that are released.",
      table: {
        columns: ["Decay", "What leaves the nucleus", "Change in A", "Change in Z", "Example"],
        rows: [
          {
            cells: ["Alpha (\\(\\alpha\\))", "A helium nucleus, \\(^{4}_{2}\\text{He}\\)", "Falls by 4", "Falls by 2", "\\(^{226}_{88}\\text{Ra} \\rightarrow {}^{222}_{86}\\text{Rn} + \\alpha\\)"],
          },
          {
            cells: ["Beta-minus (\\(\\beta^-\\))", "An electron and an antineutrino", "No change", "Rises by 1", "\\(^{14}_{6}\\text{C} \\rightarrow {}^{14}_{7}\\text{N} + e^- + \\bar{\\nu}\\)"],
            noteAmber: "A neutron becomes a proton and the partner is an ANTI-neutrino.",
          },
          {
            cells: ["Beta-plus (\\(\\beta^+\\))", "A positron and a neutrino", "No change", "Falls by 1", "\\(^{22}_{11}\\text{Na} \\rightarrow {}^{22}_{10}\\text{Ne} + e^+ + \\nu\\)"],
            noteAmber: "Happens only inside a nucleus: a free proton is lighter than a neutron.",
          },
          {
            cells: ["Gamma (\\(\\gamma\\))", "A photon, as an excited nucleus drops to a lower level", "No change", "No change", "\\(^{60}\\text{Ni}^{*} \\rightarrow {}^{60}\\text{Ni} + \\gamma\\)"],
          },
        ],
        caption: "Only alpha decay changes A, so count alphas from A and then betas from Z.",
      },
      selfCheckExample: {
        prompt: "How many alpha and beta-minus particles are emitted when \\(^{232}_{90}\\text{Th}\\) decays to \\(^{208}_{82}\\text{Pb}\\)?",
        steps: [
          "A falls by 232 − 208 = 24, so there are 24/4 = 6 alphas.",
          "Six alphas alone would take Z to 90 − 12 = 78.",
          "Lead has Z = 82, so 4 beta-minus decays raise Z by 4.",
        ],
        answer: "6 alpha and 4 beta-minus",
      },
      practiceSet: [
        { prompt: "\\(^{238}_{92}\\text{U}\\) emits one alpha and then two beta-minus particles. Product?", answer: "\\(^{234}_{92}\\text{U}\\), an isotope of the parent" },
        { prompt: "A nucleus emits a positron. Change in A and Z?", answer: "A unchanged; Z falls by 1" },
        { prompt: "\\(^{235}_{92}\\text{U} + n \\rightarrow {}^{137}_{52}\\text{Te} + {}^{97}_{40}\\text{Zr} + x\\,n\\). Find x.", answer: "x = 2" },
        { prompt: "Which emission changes neither A nor Z?", answer: "Gamma" },
      ],
      pyqExampleId: "2b7b9ea7-198b-4681-b097-7123cb5a7304", // 26 Jun 2022: U-238 to Pb-206, 8 alpha and 6 beta
      traps: [
        {
          title: "Count the alphas first",
          body: "Betas do not change A, so A alone fixes the number of alphas. Starting from Z mixes two unknowns.",
        },
        {
          title: "Beta-minus raises Z",
          body: "It feels like a minus should lower Z, but losing a negative electron leaves the nucleus one charge more positive. Beta-minus: Z + 1. Beta-plus: Z − 1.",
        },
        {
          title: "Neutrino or antineutrino",
          body: "Beta-minus emits an electron and an antineutrino; beta-plus emits a positron and a neutrino. The lepton number must balance.",
        },
      ],
    },

    // C2 — counting half-lives
    {
      kind: "formula" as const,
      slug: "jpnuc-half-lives",
      name: "Counting half-lives",
      intuition:
        "In each half-life, half of the nuclei still present decay. So the amount left halves again and again: 1, 1/2, 1/4, 1/8, … Find n, the number of half-lives that pass, and the fraction left is (1/2)ⁿ. Mass, number of nuclei and activity all follow this same law.",
      definition:
        "- \\(N = N_0\\left(\\tfrac{1}{2}\\right)^{n}\\), with \\(n = t/T_{1/2}\\).\n" +
        "- Fraction **left** \\(= \\left(\\tfrac{1}{2}\\right)^{n}\\); fraction **decayed** \\(= 1 - \\left(\\tfrac{1}{2}\\right)^{n}\\). Read which one is asked.\n" +
        "- Activity and mass halve on the same clock: \\(\\dfrac{A_0}{A} = 2^{n}\\).\n" +
        "- n need not be whole: after half a half-life the fraction left is \\(\\left(\\tfrac{1}{2}\\right)^{1/2} = \\dfrac{1}{\\sqrt 2}\\).\n" +
        "- A source k times above a safe level is safe after \\(n = \\log_2 k\\) half-lives.",
      formula: {
        label: "Half-life law",
        latex: "N = N_0\\left(\\tfrac{1}{2}\\right)^{t/T_{1/2}}",
      },
      authoredExample: {
        prompt:
          "A sample of 80 mg has a half-life of 6 hours. How much is left after 24 hours, and how much has decayed?",
        steps: [
          "\\(n = 24/6 = 4\\) half-lives.",
          "Left: \\(80 \\times \\left(\\tfrac{1}{2}\\right)^{4} = 80/16 = 5\\) mg.",
          "Decayed: \\(80 - 5 = 75\\) mg, which is 15/16 of the sample.",
        ],
        answer: "5 mg left; 75 mg decayed",
      },
      selfCheckExample: {
        prompt: "A source's activity falls from 9600 to 300 counts per minute in 40 minutes. Find its half-life.",
        steps: [
          "\\(9600/300 = 32 = 2^{5}\\), so 5 half-lives passed.",
          "\\(T_{1/2} = 40/5 = 8\\) minutes.",
        ],
        answer: "8 minutes",
      },
      practiceSet: [
        { prompt: "Half-life 10 days. Fraction left after 40 days?", answer: "1/16" },
        { prompt: "Fraction left after 1.5 half-lives?", answer: "\\(\\dfrac{1}{2\\sqrt 2} \\approx 0.35\\)" },
        { prompt: "A source is 32 times the safe level and has a half-life of 4 hours. How long before it is safe?", answer: "20 hours" },
        { prompt: "What fraction has decayed after 2 half-lives?", answer: "3/4" },
      ],
      pyqExampleId: "dab91030-7081-4018-b7e6-e27c7e45fb8d", // 8 Apr 2023: 1/8 left in 3 days, 8 g left after 5 days, 256 g at start
      traps: [
        {
          title: "Decayed is not left",
          body: "If 15/16 has decayed, 1/16 is left, so 4 half-lives have passed. Taking the decayed fraction as the fraction left gives a time far too short.",
        },
        {
          title: "Halve, do not subtract halves",
          body: "After two half-lives a quarter is left, not zero. Each half-life halves what remains; it does not remove half of the original.",
        },
        {
          title: "Find n from a ratio, then the time",
          body: "When a count or activity falls by a power of 2, write the ratio as \\(2^{n}\\) first. Then time = n × half-life, or half-life = time ÷ n.",
        },
      ],
    },
  ],
};
