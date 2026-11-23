import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_BINDING_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Binding Energy",
  title: "Mass Defect and Nuclear Binding Energy",
  oneLineDefinition:
    "Why a nucleus weighs less than its separate protons and neutrons, how that mass defect gives the binding energy through E = mc², and how binding energy per nucleon measures the stability of a nucleus.",
  whyItMatters:
    "3 questions, all from the textbook's exercises and solved examples: the binding energy of an alpha particle and of lithium-7, and the binding energy per nucleon of americium-244. No board paper in the bank has set a calculation here yet, but the board asked what mass defect means in 2016, as part of a question on the Geiger-Marsden experiment.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpan-mass-defect",
      name: "Mass defect and binding energy",
      intuition:
        "Weigh a nucleus and then weigh its protons and neutrons separately: the nucleus is lighter. The missing mass was given out as energy when the nucleons came together, so the same energy must be put back to pull them apart. That energy is the binding energy, and Einstein's E = mc² turns the missing mass into it. In nuclear physics the handy conversion is 1 u of mass = 931.5 MeV of energy.",
      definition:
        "- **Mass defect:** \\(\\Delta M = Zm_p + Nm_n - M\\), where M is the mass of the nucleus, \\(N = A - Z\\).\n" +
        "- **Binding energy:** \\(E_B = \\Delta M\\,c^2 = (Zm_p + Nm_n - M)c^2\\). It is the energy released when the nucleus is formed from its nucleons brought from infinity, and the energy needed to separate them.\n" +
        "- With **atomic** masses, add and subtract Z electron masses: \\(E_B = (Zm_H + Nm_n - M_{\\text{atom}})c^2\\), where \\(m_H\\) is the mass of a hydrogen atom. The textbook works with atomic masses unless it says otherwise.\n" +
        "- Converting: \\(E_B\\) (MeV) \\(= \\Delta M\\) (u) \\(\\times 931.5\\).\n" +
        "- The hydrogen nucleus is a single proton, so its binding energy is zero.",
      formula: {
        label: "Binding energy",
        latex: "E_B = \\left(Zm_p + Nm_n - M\\right)c^2 = \\left(Zm_H + Nm_n - M_{\\text{atom}}\\right)c^2",
        symbols: [
          { symbol: "\\(m_p, m_n\\)", meaning: "masses of a free proton and a free neutron" },
          { symbol: "\\(m_H\\)", meaning: "mass of a hydrogen atom, 1.007825 u" },
          { symbol: "\\(M\\)", meaning: "mass of the nucleus (or of the atom, when the hydrogen atom mass is used)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the binding energy of the deuterium nucleus \\(^{2}_{1}\\text{H}\\). Atomic mass of deuterium = 2.014102 u, \\(m_H = 1.007825\\) u, \\(m_n = 1.00866\\) u, 1 u = 931.5 MeV.",
        steps: [
          "Given: Z = 1, N = 1; atomic masses, so use \\(m_H\\).",
          "Formula: \\(E_B = (Zm_H + Nm_n - M)c^2\\).",
          "Mass defect: \\(1.007825 + 1.00866 - 2.014102 = 0.002383\\) u.",
          "\\(E_B = 0.002383 \\times 931.5 = 2.22\\) MeV.",
        ],
        answer: "2.22 MeV",
      },
      selfCheckExample: {
        prompt: "The mass defect of a nucleus is 0.1 u. Find its binding energy in MeV.",
        steps: ["\\(E_B = 0.1 \\times 931.5\\) MeV.", "\\(E_B = 93.15\\) MeV."],
        answer: "93.15 MeV",
      },
      practiceSet: [
        { prompt: "Why is the binding energy of the hydrogen nucleus zero?", answer: "It is a single proton, so there are no nucleons to bind together" },
        { prompt: "How many neutrons are in the nucleus \\(^{7}_{3}\\text{Li}\\)?", answer: "4" },
        { prompt: "When the mass of a nucleus is given as an ATOMIC mass, which mass do you use for each proton?", answer: "The mass of a hydrogen atom, \\(m_H\\)" },
      ],
      pyqExampleId: "1282d19f-f01b-484a-8620-9b32e28ae74a",
      traps: [
        {
          title: "Mixing nuclear and atomic masses",
          body: "If the nucleus's own mass is given, use \\(m_p\\). If the atom's mass is given, use \\(m_H\\), so the electrons cancel. Mixing the two leaves the electron masses in the answer.",
        },
        {
          title: "Subtracting the wrong way round",
          body: "Binding energy is positive: nucleons minus nucleus, \\(Zm_p + Nm_n - M\\). Writing \\(M - (Zm_p + Nm_n)\\) gives a negative energy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-be-per-nucleon",
      name: "Binding energy per nucleon and stability",
      intuition:
        "A big nucleus has more nucleons, so of course its total binding energy is bigger. To compare how firmly two nuclei are held, share the binding energy out: binding energy per nucleon is the average energy needed to pull one nucleon out. The higher it is, the more stable the nucleus. It is highest for middle-weight nuclei near iron, which is why heavy nuclei give out energy when they split and light nuclei give out energy when they join.",
      definition:
        "- **Binding energy per nucleon** \\(= E_B/A\\): the average energy to remove one nucleon from the nucleus and make it free. A larger value means a more stable nucleus.\n" +
        "- The graph of \\(E_B/A\\) against A: low for the lightest nuclei, rising quickly, a plateau for A between **50 and 80** (the most stable nuclei), a peak near **A = 56 (iron)**, then a slow fall for A above 80.\n" +
        "- Splitting a heavy nucleus (fission) or joining two light ones (fusion) moves towards the peak, so both release energy.",
      formula: {
        label: "Binding energy per nucleon",
        latex: "\\frac{E_B}{A} = \\frac{\\left(Zm_H + Nm_n - M\\right)c^2}{A}",
      },
      authoredExample: {
        prompt:
          "Find the binding energy per nucleon of \\(^{56}_{26}\\text{Fe}\\). Atomic mass of \\(^{56}\\text{Fe}\\) = 55.934942 u, \\(m_H = 1.007825\\) u, \\(m_n = 1.00866\\) u, 1 u = 931.5 MeV.",
        steps: [
          "Given: \\(Z = 26\\), \\(N = 56 - 26 = 30\\), \\(A = 56\\).",
          "Mass of nucleons: \\(26 \\times 1.007825 + 30 \\times 1.00866 = 26.20345 + 30.2598 = 56.46325\\) u.",
          "Mass defect: \\(56.46325 - 55.934942 = 0.528308\\) u, so \\(E_B = 0.528308 \\times 931.5 = 492.1\\) MeV.",
          "\\(E_B/A = 492.1/56 = 8.79\\) MeV per nucleon, close to the top of the curve.",
        ],
        answer: "8.79 MeV per nucleon",
      },
      selfCheckExample: {
        prompt: "A nucleus of mass number 20 has a binding energy of 160.6 MeV. Find its binding energy per nucleon.",
        steps: ["\\(E_B/A = 160.6/20\\).", "\\(= 8.03\\) MeV per nucleon."],
        answer: "8.03 MeV",
      },
      practiceSet: [
        { prompt: "For which range of mass numbers is the binding energy per nucleon highest?", answer: "A between 50 and 80" },
        { prompt: "Near which element does the binding energy per nucleon curve peak?", answer: "Iron (A = 56)" },
        { prompt: "Nucleus X has 7.6 MeV per nucleon and nucleus Y has 8.7 MeV per nucleon. Which is more stable?", answer: "Y, the larger binding energy per nucleon" },
      ],
      pyqExampleId: "78d1c9d8-40d6-4a08-821a-b5c528f71644",
      traps: [
        {
          title: "Judging stability by total binding energy",
          body: "Uranium has a far larger total binding energy than iron, yet it is less stable. Compare binding energy per nucleon, not the total.",
        },
        {
          title: "Dividing by Z instead of A",
          body: "Per nucleon means per proton AND neutron: divide by the mass number A, not by the atomic number Z.",
        },
      ],
    },
  ],
};
