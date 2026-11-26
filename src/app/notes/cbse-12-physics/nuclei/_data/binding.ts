import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_NU_BINDING_NOTE: SubtopicNote = {
  subtopicName: "Mass-Energy and Nuclear Binding Energy",
  title: "Mass-Energy and Nuclear Binding Energy",
  oneLineDefinition:
    "Einstein's E = mc², the mass defect of a nucleus and its binding energy, binding energy per nucleon and its curve against mass number, and the Q value of a nuclear reaction found from masses.",
  whyItMatters:
    "33 questions, twenty-six of them from board papers, the most of any page in this chapter. The board asks you to define mass defect and binding energy and say how they are related (2023, 2025, 2026), and to calculate a binding energy or a binding energy per nucleon from masses (2023, 2024, 2025). It asks for the curve of binding energy per nucleon in 2023, 2025 and 2026: its features, its meaning for fission and fusion, and why it falls for A > 170, a question set word for word in 2023 and again in 2026. It also asks the energy released or absorbed in a reaction from masses (2022, 2024, 2025, 2026) and assertion-reason items on mass defect and the curve (2023, 2025, 2026). Two of the 2024 reactions are textbook exercises. The textbook adds the energy equivalent of 1 g and of 1 u, the binding energies of nitrogen, iron and bismuth, and the energy needed to separate every nucleon of a copper coin.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpnu-mass-defect",
      name: "Mass defect and binding energy",
      intuition:
        "Weigh a nucleus and it comes out lighter than its protons and neutrons weighed one by one. The missing mass left as energy when the nucleons came together. To pull the nucleus apart you must put that same energy back, and that energy is the binding energy.",
      definition:
        "- **Mass-energy equivalence:** mass is a form of energy, \\(E = mc^2\\). One gram of matter is equivalent to \\(9 \\times 10^{13}\\) J.\n" +
        "- **Mass defect:** the difference between the total mass of the nucleons taken separately and the mass of the nucleus, \\(\\Delta M = [Z m_p + (A - Z) m_n] - M\\). It is always positive.\n" +
        "- **Binding energy:** the energy needed to separate a nucleus completely into its protons and neutrons, which is also the energy released when they bind together: \\(E_b = \\Delta M c^2\\).\n" +
        "- With masses in u, multiply by 931.5 MeV (\\(1\\ \\text{u} = 931.5\\ \\text{MeV}/c^2\\)).\n" +
        "- A bigger binding energy per nucleon means a more tightly bound, more stable nucleus.\n" +
        "- In a nuclear reaction the numbers of protons and of neutrons stay the same, so the total mass of the nucleons is the same on both sides. The energy released or absorbed comes from the difference in the binding energies of the nuclei, which shows up as a difference in their masses.",
      formula: {
        label: "Mass defect and binding energy",
        latex: "\\Delta M = [Z m_p + (A - Z) m_n] - M, \\qquad E_b = \\Delta M c^2 = \\Delta M\\ (\\text{in u}) \\times 931.5\\ \\text{MeV}",
        symbols: [
          { symbol: "\\(M\\)", meaning: "mass of the nucleus" },
          { symbol: "\\(m_p, m_n\\)", meaning: "masses of a proton and a neutron" },
          { symbol: "\\(E_b\\)", meaning: "binding energy of the nucleus" },
        ],
      },
      authoredExample: {
        prompt:
          "The nucleus \\({}^{40}_{20}\\text{Ca}\\) has 20 protons and 20 neutrons. Its atomic mass is 39.962591 u. Taking \\(m_p = 1.00727\\) u, \\(m_n = 1.00866\\) u and \\(m_e = 0.00055\\) u, find its mass defect and binding energy.",
        steps: [
          "Given: \\(Z = 20\\), \\(A - Z = 20\\), atomic mass 39.962591 u.",
          "Mass of the nucleus: \\(M = 39.962591 - 20 \\times 0.00055 = 39.951591\\) u.",
          "Mass of the separate nucleons: \\(20 \\times 1.00727 + 20 \\times 1.00866 = 20.14540 + 20.17320 = 40.31860\\) u.",
          "Formula: \\(\\Delta M = [Z m_p + (A - Z) m_n] - M = 40.318600 - 39.951591 = 0.367009\\) u.",
          "\\(E_b = \\Delta M \\times 931.5\\ \\text{MeV} = 0.367009 \\times 931.5 = 341.9\\) MeV.",
        ],
        answer: "Mass defect 0.367 u; binding energy 341.9 MeV",
      },
      selfCheckExample: {
        prompt: "A nucleus has a mass defect of 0.2 u. How much energy must be supplied to break it into its separate nucleons?",
        steps: ["\\(E_b = \\Delta M \\times 931.5\\ \\text{MeV} = 0.2 \\times 931.5\\).", "\\(E_b = 186.3\\) MeV."],
        answer: "186.3 MeV",
      },
      practiceSet: [
        { prompt: "Find the energy equivalent of 1 mg of matter.", answer: "\\(E = 10^{-6} \\times (3 \\times 10^{8})^2 = 9 \\times 10^{10}\\) J" },
        { prompt: "When free protons and neutrons combine to form a nucleus, is energy absorbed or released?", answer: "Released; that energy is the binding energy" },
        { prompt: "Which is greater: the mass of a nucleus, or the total mass of its protons and neutrons taken separately?", answer: "The total mass of the separate nucleons" },
      ],
      pyqExampleId: "9d458b52-3159-423e-b2d1-127a70650413",
      traps: [
        {
          title: "Writing the mass defect the wrong way round",
          body: "Take (mass of the separate nucleons) minus (mass of the nucleus). The other order gives a negative number for every nucleus and hides that the nucleus is the lighter one.",
        },
        {
          title: "Saying energy is absorbed when a nucleus forms",
          body: "Energy is RELEASED when nucleons bind, which is why the nucleus weighs less. Energy is absorbed only when you pull the nucleus apart.",
        },
        {
          title: "A definition with no relation",
          body: "When asked how mass defect and binding energy are related, write \\(E_b = \\Delta M c^2\\) and say in words that the binding energy is the energy equivalent of the mass defect.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpnu-be-calc",
      name: "Calculating binding energy and binding energy per nucleon",
      intuition:
        "Tables give the masses of ATOMS, not of bare nuclei. If you add Z hydrogen atoms and N neutrons and subtract the atom, the Z electrons on each side cancel, so you never have to handle them. Divide the binding energy by A to compare nuclei of different sizes.",
      definition:
        "- **With atomic masses** (the usual data): \\(\\Delta M = Z m_H + N m_n - M_{\\text{atom}}\\), where \\(m_H = 1.007825\\) u is the mass of a hydrogen atom and \\(m_n = 1.008665\\) u.\n" +
        "- **With nuclear masses:** use \\(m_p\\) and the mass of the nucleus instead. Never mix the two kinds.\n" +
        "- **Binding energy per nucleon:** \\(E_{bn} = \\dfrac{E_b}{A}\\), the average energy needed to remove one nucleon. It is the better measure of how tightly a nucleus is held.\n" +
        "- Keep all six decimal places until the subtraction: the mass defect is a small difference between two nearly equal numbers.\n" +
        "- Use the conversion the question gives (931 or 931.5 MeV per u).",
      formula: {
        label: "Binding energy from atomic masses",
        latex: "E_b = [Z m_H + (A - Z) m_n - M_{\\text{atom}}] \\times 931.5\\ \\text{MeV}, \\qquad E_{bn} = \\frac{E_b}{A}",
        symbols: [
          { symbol: "\\(m_H\\)", meaning: "mass of a hydrogen atom, 1.007825 u" },
          { symbol: "\\(M_{\\text{atom}}\\)", meaning: "atomic mass of the nuclide" },
          { symbol: "\\(E_{bn}\\)", meaning: "binding energy per nucleon" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the binding energy and the binding energy per nucleon of \\({}^{20}_{10}\\text{Ne}\\). Atomic mass of \\({}^{20}_{10}\\text{Ne}\\) = 19.992439 u, \\(m_H = 1.007825\\) u, \\(m_n = 1.008665\\) u, 1 u = 931.5 MeV/\\(c^2\\).",
        steps: [
          "Given: \\(Z = 10\\), \\(N = 20 - 10 = 10\\), \\(M_{\\text{atom}} = 19.992439\\) u.",
          "Mass of the separate parts: \\(10 \\times 1.007825 + 10 \\times 1.008665 = 10.078250 + 10.086650 = 20.164900\\) u.",
          "Mass defect: \\(\\Delta M = 20.164900 - 19.992439 = 0.172461\\) u.",
          "\\(E_b = 0.172461 \\times 931.5 = 160.6\\) MeV.",
          "\\(E_{bn} = \\dfrac{160.6}{20} = 8.03\\) MeV per nucleon.",
        ],
        answer: "Binding energy 160.6 MeV; binding energy per nucleon 8.03 MeV",
      },
      selfCheckExample: {
        prompt:
          "Find the binding energy of tritium, \\({}^{3}_{1}\\text{H}\\), whose atomic mass is 3.016049 u. (\\(m_H = 1.007825\\) u, \\(m_n = 1.008665\\) u, 1 u = 931.5 MeV/\\(c^2\\))",
        steps: [
          "One proton and two neutrons: \\(1.007825 + 2 \\times 1.008665 = 3.025155\\) u.",
          "\\(\\Delta M = 3.025155 - 3.016049 = 0.009106\\) u.",
          "\\(E_b = 0.009106 \\times 931.5 = 8.48\\) MeV.",
        ],
        answer: "8.48 MeV (about 2.83 MeV per nucleon)",
      },
      practiceSet: [
        { prompt: "A nucleus with A = 40 has a binding energy of 340 MeV. Find its binding energy per nucleon.", answer: "8.5 MeV per nucleon" },
        { prompt: "A nucleus of mass number 50 has a binding energy per nucleon of 8 MeV. How much energy separates it completely into nucleons?", answer: "400 MeV" },
        { prompt: "Why is the mass of a hydrogen atom used, and not the mass of a proton, when the data are atomic masses?", answer: "The Z electrons in the Z hydrogen atoms cancel the Z electrons counted in the atomic mass" },
      ],
      pyqExampleId: "47b2cb36-a30b-4e66-b123-bdfad829c370",
      traps: [
        {
          title: "Proton mass with an atomic mass",
          body: "If the nuclide's mass is an atomic mass, use \\(m_H\\), not \\(m_p\\). Mixing them leaves Z electron masses unbalanced and the answer comes out wrong in the third figure.",
        },
        {
          title: "Rounding the masses first",
          body: "The mass defect is a tiny difference of two large numbers. For the deuteron, rounding the neutron mass to three decimal places changes the mass defect by about 14 per cent. Keep every decimal place and round only the final energy.",
        },
        {
          title: "Dividing by Z",
          body: "Binding energy per nucleon is \\(E_b\\) divided by A, the number of nucleons, not by the number of protons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpnu-be-curve",
      name: "The binding energy per nucleon curve",
      intuition:
        "Plot how tightly each nucleon is held against the size of the nucleus. Light nuclei are loosely held, middle nuclei most tightly, heavy nuclei a little less. Energy is released whenever nuclei move towards the middle of this curve, by light nuclei joining or heavy nuclei splitting.",
      definition:
        "- **How to draw it** (the graph carries the marks): binding energy per nucleon \\(E_{bn}\\) in MeV on the vertical axis, mass number A on the horizontal axis, from 0 to about 240.\n" +
        "- The curve **rises steeply** from about 1.1 MeV for \\({}^{2}\\text{H}\\) (2.22 MeV shared by 2 nucleons). The point for \\({}^{4}\\text{He}\\) stands well above its neighbours.\n" +
        "- It is **nearly flat at about 8 MeV** for \\(30 < A < 170\\), with a **maximum of about 8.75 MeV near A = 56** (iron).\n" +
        "- It then **falls slowly** for heavy nuclei, to 7.6 MeV at A = 238. It is lower than 8 MeV both for light nuclei (A < 30) and for heavy nuclei (A > 170).\n" +
        "- **Why it falls for A > 170** (the answer the board gives marks for): the nuclear force is short-ranged and saturates, so each nucleon is held only by its near neighbours, while the Coulomb repulsion acts between every pair of protons, near or far. In a heavy nucleus the repulsion becomes large, so the binding energy per nucleon goes down.\n" +
        "- **Assertion-reason codes** in these papers: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) both false. Judge each statement alone first, then ask whether R is the cause of A.",
      table: {
        columns: ["Feature of the curve", "What it tells you"],
        rows: [
          { cells: ["Binding energy per nucleon of a few MeV", "The nuclear force is attractive and strong enough to give this binding"] },
          {
            cells: ["Nearly constant for \\(30 < A < 170\\)", "The nuclear force is short-ranged: a nucleon is held only by the neighbours within range, so adding nucleons does not change its binding (saturation)"],
            pyqExampleId: "0f5e621a-4ee0-42ff-abca-7f9867700d0e",
            noteAmber: "Board 2025 gave this as an assertion with the reason that nuclear forces are NOT short-range; the reason is false.",
          },
          { cells: ["Maximum near A = 56", "Iron-region nuclei are the most tightly bound and the most stable"] },
          {
            cells: ["Sharp peak at \\({}^{4}\\text{He}\\)", "Helium-4 is more tightly bound, so more stable, than the nuclei next to it"],
            pyqExampleId: "2f06a771-2b15-4740-8cba-082ce7e42253",
            noteAmber: "Board 2023 asked what the sharp peak for helium implies: it is more stable than its neighbours.",
          },
          { cells: ["Lower for light nuclei (A < 30)", "Two very light nuclei that fuse make a more tightly bound nucleus, so fusion releases energy"] },
          { cells: ["Falls for heavy nuclei (A > 170)", "A nucleus with A = 240 that splits into two of A = 120 has its nucleons more tightly bound, so fission releases energy"] },
        ],
      },
      practiceSet: [
        { prompt: "Near which mass number is the binding energy per nucleon greatest, and roughly what is its value?", answer: "Near A = 56 (iron), about 8.75 MeV" },
        { prompt: "Does the binding energy per nucleon increase with mass number for all nuclei?", answer: "No. It rises up to about A = 56 and then falls slowly for heavier nuclei" },
        { prompt: "Two light nuclei fuse into a nucleus with a higher binding energy per nucleon. Does the total mass increase or decrease?", answer: "It decreases; the lost mass appears as the energy released" },
      ],
      pyqExampleId: "c1cf8cf7-b16d-405c-ac0a-b13e8c58d079",
      traps: [
        {
          title: "An unlabelled or wrongly shaped graph",
          body: "Label both axes (binding energy per nucleon in MeV, mass number A), mark the peak near A = 56 and show the slow fall after it. A curve that keeps rising, or has no labels, loses the graph's marks.",
        },
        {
          title: "Total binding energy instead of per nucleon",
          body: "Total binding energy keeps growing with A. Stability is judged by binding energy PER NUCLEON, and only that has the peak.",
        },
        {
          title: "Explaining the fall without the reason",
          body: "\"It decreases for heavy nuclei\" repeats the question. Give the cause: the short-range, saturating nuclear force against the Coulomb repulsion between all the protons.",
        },
        {
          title: "Assertion-reason: missing the twist in R",
          body: "Most reasons set on this page turn a true fact round: \"for all nuclei\", \"not short-range\", \"energy is absorbed\". Each of these makes R false, so the code is (C) when A is a true textbook statement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpnu-q-value",
      name: "Energy of a nuclear reaction from masses",
      intuition:
        "Add up the masses before the reaction and after it. If the products are lighter, the missing mass came out as energy and the reaction releases energy. If the products are heavier, energy had to be supplied to make that extra mass.",
      definition:
        "- **Q value:** \\(Q = (\\text{sum of initial masses} - \\text{sum of final masses})\\,c^2\\). It is also the gain in kinetic energy.\n" +
        "- \\(Q > 0\\): energy released, the reaction is **exothermic**. \\(Q < 0\\): energy absorbed, **endothermic**.\n" +
        "- First check that the mass numbers and the charges (atomic numbers) are the same on both sides.\n" +
        "- When the atomic numbers add up the same on both sides, the electrons balance too, so atomic masses can be used directly.\n" +
        "- A nucleus X can break up into Y and Z by itself only if \\(M_X > M_Y + M_Z\\), so that Q is positive.",
      formula: {
        label: "Q value of a nuclear reaction",
        latex: "Q = \\left[\\sum m_{\\text{initial}} - \\sum m_{\\text{final}}\\right] c^2 = \\Delta m\\ (\\text{in u}) \\times 931.5\\ \\text{MeV}",
        symbols: [
          { symbol: "\\(Q\\)", meaning: "energy released (positive) or absorbed (negative)" },
          { symbol: "\\(\\Delta m\\)", meaning: "initial mass minus final mass" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the Q value of \\({}^{6}_{3}\\text{Li} + {}^{1}_{0}\\text{n} \\rightarrow {}^{3}_{1}\\text{H} + {}^{4}_{2}\\text{He}\\) and say whether it is exothermic. Masses: \\({}^{6}\\text{Li}\\) 6.015122 u, n 1.008665 u, \\({}^{3}\\text{H}\\) 3.016049 u, \\({}^{4}\\text{He}\\) 4.002603 u; 1 u = 931.5 MeV/\\(c^2\\).",
        steps: [
          "Check: mass numbers \\(6 + 1 = 3 + 4\\); atomic numbers \\(3 + 0 = 1 + 2\\).",
          "Initial mass: \\(6.015122 + 1.008665 = 7.023787\\) u.",
          "Final mass: \\(3.016049 + 4.002603 = 7.018652\\) u.",
          "\\(\\Delta m = 7.023787 - 7.018652 = 0.005135\\) u.",
          "\\(Q = 0.005135 \\times 931.5 = 4.78\\) MeV, which is positive.",
        ],
        answer: "Q = +4.78 MeV; the reaction is exothermic",
      },
      selfCheckExample: {
        prompt:
          "Find the Q value of \\({}^{14}_{7}\\text{N} + {}^{4}_{2}\\text{He} \\rightarrow {}^{17}_{8}\\text{O} + {}^{1}_{1}\\text{H}\\). Masses: \\({}^{14}\\text{N}\\) 14.003074 u, \\({}^{4}\\text{He}\\) 4.002603 u, \\({}^{17}\\text{O}\\) 16.999132 u, \\({}^{1}\\text{H}\\) 1.007825 u.",
        steps: [
          "Initial: \\(14.003074 + 4.002603 = 18.005677\\) u. Final: \\(16.999132 + 1.007825 = 18.006957\\) u.",
          "\\(\\Delta m = 18.005677 - 18.006957 = -0.001280\\) u.",
          "\\(Q = -0.001280 \\times 931.5 = -1.19\\) MeV.",
        ],
        answer: "Q = −1.19 MeV; energy is absorbed, so the reaction is endothermic",
      },
      practiceSet: [
        { prompt: "In a reaction the products are heavier than the reactants by 0.002 u. How much energy is absorbed?", answer: "\\(0.002 \\times 931.5 = 1.863\\) MeV" },
        { prompt: "Find A in \\({}^{235}_{92}\\text{U} + {}^{1}_{0}\\text{n} \\rightarrow {}^{141}_{56}\\text{Ba} + {}^{A}_{36}\\text{Kr} + 3\\,{}^{1}_{0}\\text{n}\\).", answer: "A = 236 − 141 − 3 = 92" },
        { prompt: "A reaction has Q = +3.0 MeV. Is it exothermic or endothermic?", answer: "Exothermic: a positive Q means energy is released" },
      ],
      pyqExampleId: "5620d241-0c9b-4fd8-b319-7fdb0132a858",
      traps: [
        {
          title: "Taking the size and ignoring the sign",
          body: "Always subtract final from initial. When the question says \"released/absorbed\", the sign of Q is the answer: a negative Q means energy absorbed.",
        },
        {
          title: "Not checking the balance",
          body: "Check that A and Z add up the same on both sides before using the masses. It also finds a missing particle, such as a neutron, that must be counted.",
        },
        {
          title: "No unit or no verdict",
          body: "Give Q in MeV and write exothermic or endothermic when asked. The verdict is a separate mark.",
        },
      ],
    },
  ],
};
