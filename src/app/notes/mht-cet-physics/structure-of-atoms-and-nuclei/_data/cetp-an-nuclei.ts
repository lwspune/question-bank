import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/structure-of-atoms-and-nuclei";

export const NUCLEI_NOTE: SubtopicNote = {
  subtopicName: "Radioactive Decay and Half-Life",
  title: "Nuclei: Radioactive Decay and Binding Energy",
  oneLineDefinition:
    "A radioactive sample loses a fixed fraction of its nuclei per unit time, N = N₀e^(−λt), so it halves every T½ = ln 2/λ; each alpha decay removes 4 from the mass number and 2 from the atomic number, each beta-minus adds 1 to the atomic number, and a nucleus's binding energy is its mass defect times c².",
  whyItMatters:
    "18 PYQs, one HARD. Eleven are the decay law — the fraction left after some half-lives, a decay constant from two activities, the time for two samples to reach a given ratio, and activity as λN. " +
    "Five count the alpha and beta particles between two nuclei or name the particle a decay emits, and two are binding energy and fission. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-an-decay-law",
      name: "The Decay Law and Half-Life",
      intuition:
        "Each nucleus has the same chance λ per second of decaying, so the number left falls exponentially: N = N₀e^(−λt). After one half-life T½ = ln 2/λ half remain, after n half-lives (1/2)ⁿ. Activity, the decays per second, is A = λN and falls the same way, so two activities give λ directly: A/A₀ = e^(−λt). Two samples with decay constants λ₁ and λ₂ starting equal have N₁/N₂ = e^(−(λ₁ − λ₂)t). Read the question for 'decayed' or 'left': after 3 half-lives, 12.5% is left and 87.5% has decayed.",
      definition:
        "- \\(N = N_0 e^{-\\lambda t}\\); \\(T_{1/2} = \\dfrac{\\ln 2}{\\lambda}\\); mean life \\(\\dfrac{1}{\\lambda}\\).\n" +
        "- After n half-lives: left \\(\\left(\\tfrac{1}{2}\\right)^n\\), decayed \\(1 - \\left(\\tfrac{1}{2}\\right)^n\\).\n" +
        "- **Activity** \\(A = \\lambda N = \\dfrac{\\ln 2}{T}N\\): two samples \\(\\dfrac{A_1}{A_2} = \\dfrac{N_1T_2}{N_2T_1}\\).\n" +
        "- From two activities: \\(\\dfrac{A}{A_0} = e^{-\\lambda t}\\) (9000 → 3000 in 2 min ⇒ \\(\\lambda = 0.5\\ln 3\\) per min).\n" +
        "- Two samples from equal numbers: \\(\\dfrac{N_1}{N_2} = e^{-(\\lambda_1 - \\lambda_2)t}\\) (\\(7\\lambda\\) and \\(\\lambda\\), ratio e ⇒ \\(t = \\dfrac{1}{6\\lambda}\\)).\n" +
        "- \\(\\dfrac{dA}{dt} = -\\lambda^2 N \\propto T^{-2}\\).",
      formula: {
        label: "Decay law",
        latex: "N = N_0 e^{-\\lambda t}, \\qquad T_{1/2} = \\frac{\\ln 2}{\\lambda}, \\qquad A = \\lambda N",
      },
      authoredExample: {
        prompt: "A sample's activity falls from 12 000 to 3 000 decays per minute in 6 minutes. Half-life and decay constant?",
        steps: ["3000/12 000 = 1/4 = two half-lives in 6 min.", "T½ = 3 min; λ = ln 2/3 per minute."],
        answer: "3 min; (ln 2)/3 per min",
      },
      selfCheckExample: {
        prompt: "Half-life 20 minutes. Fraction left after one hour?",
        steps: ["Three half-lives."],
        answer: "1/8",
      },
      practiceSet: [
        { prompt: "Ratio of initial atoms to atoms left at t = 1/(2λ)?", answer: "√e" },
        { prompt: "Half-life 60 min: fraction decayed in 3 hours?", answer: "87.5%" },
      ],
      pyqExampleId: "d05959de-73ad-4fee-881b-89f2d0abb0a0",
      traps: [
        {
          title: "Answering 'left' when the question asks 'decayed'",
          body:
            "(1/2)ⁿ is what REMAINS. The decayed fraction is 1 − (1/2)ⁿ, and the options carry both.",
        },
        {
          title: "Multiplying N by T for activity",
          body:
            "A = λN = N ln 2/T: a LONGER half-life means a LOWER activity. The ratio of activities is N₁T₂ : N₂T₁, not N₁T₁ : N₂T₂.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-an-decay-modes",
      name: "Counting Alpha and Beta Decays",
      intuition:
        "Only alpha decay changes the mass number, by 4 each time, so the number of alphas is the fall in mass number divided by 4. Each alpha also lowers the atomic number by 2, and each beta-minus raises it by 1, so the betas make up the difference: β = 2α − (Z_initial − Z_final). Gamma emission changes neither number. Beta-minus emits an electron and an antineutrino; beta-plus emits a positron and a neutrino. One alpha followed by two beta-minus returns the atomic number to where it started, so the first and last nuclei are isotopes.",
      definition:
        "- **α**: \\(A - 4\\), \\(Z - 2\\). **β⁻**: \\(Z + 1\\) (electron + antineutrino). **β⁺**: \\(Z - 1\\) (positron + neutrino). **γ**: no change.\n" +
        "- \\(n_\\alpha = \\dfrac{A_i - A_f}{4}\\); \\(n_\\beta = 2n_\\alpha - (Z_i - Z_f)\\).\n" +
        "- ²³⁸U → ²⁰⁶Pb: 8α, 6β. ²²⁶Ra → ²⁰⁶Pb: 5α, 4β.\n" +
        "- Same Z, different A: **isotopes**; same A: **isobars**.",
      formula: {
        label: "Counting decays",
        latex: "n_\\alpha = \\frac{A_i - A_f}{4}, \\qquad n_\\beta = 2n_\\alpha - (Z_i - Z_f)",
      },
      authoredExample: {
        prompt: "²³⁵₉₂U decays to ²⁰⁷₈₂Pb. How many alpha and beta particles?",
        steps: ["n_α = (235 − 207)/4 = 7.", "n_β = 14 − (92 − 82) = 4."],
        answer: "7 α, 4 β",
      },
      selfCheckExample: {
        prompt: "²³²₉₀Th decays to ²⁰⁸₈₂Pb. Alpha and beta particles?",
        steps: ["n_α = 24/4; n_β = 12 − 8."],
        answer: "6 α, 4 β",
      },
      practiceSet: [
        { prompt: "¹¹₆C → ¹¹₅B + β + X. X?", answer: "A neutrino" },
        { prompt: "A emits one α, then its daughter emits two β⁻, giving C. A and C are?", answer: "Isotopes" },
      ],
      pyqExampleId: "4d13f790-978a-42b2-b7a4-45501b494a15",
      traps: [
        {
          title: "Pairing beta-plus with an antineutrino",
          body:
            "Beta-minus (Z rises) comes with an ANTIneutrino; beta-plus (Z falls, a positron) comes with a neutrino.",
        },
        {
          title: "Counting betas before alphas",
          body:
            "Fix the alphas from the mass number first; only then does the change in Z tell you the betas. Starting from Z gives a wrong count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-an-binding-energy",
      name: "Binding Energy and a Nucleus That Splits",
      intuition:
        "A nucleus weighs less than its separate protons and neutrons. The shortfall, the mass defect Δm = Zm_p + (A − Z)m_n − M, is the binding energy divided by c², with 1 u equal to 931.5 MeV. When a nucleus at rest splits in two, the pieces fly apart with equal and opposite momenta, so their speeds are in the inverse ratio of their masses. Nuclear mass is proportional to A, and the radius to A^(1/3), so a radius ratio of 1 : 2 means a mass ratio of 1 : 8 and speeds of 8 : 1.",
      definition:
        "- \\(\\Delta m = Zm_p + (A - Z)m_n - M\\); \\(BE = \\Delta m\\,c^2\\), \\(1\\) u \\(= 931.5\\) MeV.\n" +
        "- ¹⁷₈O: 8 protons, 9 neutrons: \\(BE = (8M_P + 9M_N - M_O)c^2\\).\n" +
        "- \\(R = R_0A^{1/3}\\), so mass ratio = (radius ratio)³.\n" +
        "- Splitting at rest: \\(m_1v_1 = m_2v_2\\), \\(\\dfrac{v_1}{v_2} = \\dfrac{m_2}{m_1}\\).",
      formula: {
        label: "Binding energy",
        latex: "BE = \\left[Zm_p + (A - Z)m_n - M\\right]c^2",
      },
      authoredExample: {
        prompt: "The mass defect of ⁴He is 0.0304 u. Binding energy?",
        steps: ["BE = 0.0304 × 931.5 MeV."],
        answer: "≈ 28.3 MeV",
      },
      selfCheckExample: {
        prompt: "A nucleus at rest splits into two parts with radii 1 : 3. Ratio of their speeds?",
        steps: ["Masses 1 : 27; speeds inversely."],
        answer: "27 : 1",
      },
      practiceSet: [
        { prompt: "How many neutrons does ¹⁷₈O have?", answer: "9" },
      ],
      pyqExampleId: "0d616028-deea-4984-a2e3-3f525e31f2e1",
      traps: [
        {
          title: "Taking the radius ratio as the mass ratio",
          body:
            "Mass goes as A and radius as A^(1/3), so the mass ratio is the radius ratio CUBED. Radii 1 : 2 give masses 1 : 8.",
        },
        {
          title: "Writing the binding energy with the nucleus first",
          body:
            "Binding energy is positive: nucleons minus nucleus. One paper prints (M_O − 8M_P − 9M_N)c², which is negative; the magnitude is what is meant.",
        },
      ],
    },
  ],
  related: [
    { label: "Bohr Model — the atom around the nucleus", href: `${BASE}/cetp-an-bohr` },
  ],
};
