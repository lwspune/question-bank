import type { SubtopicNote } from "@/app/notes/_types";

export const QVALUE_NUC_NOTE: SubtopicNote = {
  subtopicName: "Q-value, Fission and Fusion",
  title: "Q-value, Fission and Fusion",
  oneLineDefinition:
    "The energy a nuclear reaction releases, its Q-value, is the gain in total binding energy, or equally the mass lost times c²; one reaction's Q times the number of nuclei gives the energy of a whole sample.",
  whyItMatters:
    "Twenty-three PYQs, ten of them numerical, and six from 2026. Eight find the energy released from binding energies per nucleon, in a fission or a fusion. Ten find it from masses: alpha decay, a fission, a fusion chain, and how Q is shared between the products. Five scale one reaction up to grams of fuel or a star's power output.",
  concepts: [
    // C1 — Q from binding energies
    {
      kind: "formula" as const,
      slug: "jpnuc-q-from-be",
      name: "Q from binding energies per nucleon",
      intuition:
        "Binding energy is energy the nucleus has already given away. If the products are more tightly bound than what you started with, the extra binding energy comes out as released energy. So multiply each BE per nucleon by its mass number to get totals, and subtract: products minus reactants.",
      definition:
        "- Total binding energy of a nucleus = \\(A \\times (BE/A)\\).\n" +
        "- \\(Q = \\sum BE_{\\text{products}} - \\sum BE_{\\text{reactants}}\\).\n" +
        "- \\(Q > 0\\): energy released. \\(Q < 0\\): energy must be supplied.\n" +
        "- A free proton or neutron has zero binding energy.\n" +
        "- **Fission:** a heavy nucleus (about 7.6 MeV per nucleon) splits into two middle ones (about 8.5 MeV per nucleon), so roughly 1 MeV per nucleon, about 200 MeV per fission, is released.\n" +
        "- **Fusion:** light nuclei join; the jump in BE per nucleon is large, so the energy per nucleon is larger than in fission.",
      formula: {
        label: "Q-value from binding energy",
        latex: "Q = \\sum_{\\text{products}} A\\,b - \\sum_{\\text{reactants}} A\\,b",
        symbols: [{ symbol: "\\(b\\)", meaning: "binding energy per nucleon of that nucleus" }],
      },
      authoredExample: {
        prompt:
          "A nucleus with A = 200 and binding energy 7.8 MeV per nucleon splits into two equal nuclei with binding energy 8.7 MeV per nucleon. Find the energy released.",
        steps: [
          "Before: \\(200 \\times 7.8 = 1560\\) MeV.",
          "After: two nuclei of A = 100, so \\(200 \\times 8.7 = 1740\\) MeV.",
          "\\(Q = 1740 - 1560 = 180\\) MeV. Shortcut: 200 nucleons each gain 0.9 MeV.",
        ],
        answer: "180 MeV released",
      },
      selfCheckExample: {
        prompt:
          "\\(^{2}\\text{H} + {}^{3}\\text{H} \\rightarrow {}^{4}\\text{He} + n\\). Binding energies per nucleon: \\(^{2}\\text{H}\\) 1.1 MeV, \\(^{3}\\text{H}\\) 2.8 MeV, \\(^{4}\\text{He}\\) 7.07 MeV. Energy released?",
        steps: [
          "Reactants: \\(2 \\times 1.1 + 3 \\times 2.8 = 2.2 + 8.4 = 10.6\\) MeV.",
          "Products: \\(4 \\times 7.07 = 28.28\\) MeV; the free neutron adds nothing.",
          "\\(Q = 28.28 - 10.6 = 17.68\\) MeV.",
        ],
        answer: "About 17.7 MeV",
      },
      practiceSet: [
        { prompt: "A = 240 at 7.6 MeV per nucleon splits into two A = 120 nuclei at 8.5 MeV per nucleon. Q?", answer: "216 MeV" },
        { prompt: "Two \\(^{4}\\text{He}\\) (7.07 MeV per nucleon) join to make \\(^{8}\\text{Be}\\) (7.06 MeV per nucleon). Q?", answer: "−0.08 MeV: energy is absorbed" },
        { prompt: "\\(^{12}\\text{C} + {}^{4}\\text{He} \\rightarrow {}^{16}\\text{O}\\). BE per nucleon: C 7.68, He 7.07, O 7.98 MeV. Q?", answer: "7.24 MeV" },
        { prompt: "A reaction has a negative Q-value. Are the products more or less tightly bound in total?", answer: "Less: energy must be supplied." },
      ],
      pyqExampleId: "4d10cb49-91a3-434d-bad3-ccd3cb3f8f55", // 14 Jun 2022: A = 220 at 5.6 MeV splits into 105 + 115 at 6.4 MeV, 176 MeV
      traps: [
        {
          title: "Multiply by A before subtracting",
          body: "BE per nucleon values cannot be subtracted directly: 8.4 − 7.6 = 0.8 MeV is per nucleon, not the answer. Multiply each by its own A first, then subtract totals.",
        },
        {
          title: "Products minus reactants, for binding energy",
          body: "With binding energies, Q = after − before. With masses it is the other way round, before − after. Mixing the two flips the sign.",
        },
        {
          title: "Count every product nucleus",
          body: "Two deuterons make one helium: the reactants hold 2 × 2 = 4 nucleons. Forgetting the second deuteron halves the reactant side.",
        },
      ],
    },

    // C2 — Q from masses, and how it is shared
    {
      kind: "formula" as const,
      slug: "jpnuc-q-from-mass",
      name: "Q from masses, and how it is shared",
      intuition:
        "Mass that disappears in a reaction reappears as kinetic energy. Add up the masses before, subtract the masses after, and multiply by 931.5 MeV per u. In a decay at rest, momentum must stay zero, so the light alpha flies off fast and the heavy daughter recoils slowly: the alpha takes almost all of Q, but not quite all.",
      definition:
        "- \\(Q = \\left(\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}\\right)c^{2}\\), with \\(1\\ \\text{u}\\,c^{2} = 931.5\\) MeV.\n" +
        "- Atomic masses can be used when the electron count is the same on both sides.\n" +
        "- A chain of reactions: add the steps; an intermediate made in one step and used in the next cancels.\n" +
        "- Q goes into kinetic energy: \\(K_{\\text{products}} = K_{\\text{projectile}} + Q\\). The products' energy cannot be negative, so \\(K_p + Q > 0\\).\n" +
        "- **Alpha decay of a nucleus at rest:** \\(K_\\alpha = Q\\dfrac{A - 4}{A}\\), daughter \\(K_d = Q\\dfrac{4}{A}\\).\n" +
        "- Splitting at rest into equal pieces: momenta cancel, and the total kinetic energy equals \\(\\Delta m\\,c^{2}\\).",
      formula: {
        label: "Q-value from masses; alpha's share",
        latex: "Q = \\left(\\sum m_i - \\sum m_f\\right)c^{2}, \\qquad K_\\alpha = Q\\,\\frac{A - 4}{A}",
      },
      authoredExample: {
        prompt:
          "\\(^{226}\\text{Ra} \\rightarrow {}^{222}\\text{Rn} + {}^{4}\\text{He}\\). Atomic masses: Ra 226.025410 u, Rn 222.017578 u, He 4.002603 u; 1 u = 931.5 MeV/\\(c^{2}\\). Find Q and the alpha's kinetic energy.",
        steps: [
          "Products: \\(222.017578 + 4.002603 = 226.020181\\) u.",
          "\\(\\Delta m = 226.025410 - 226.020181 = 0.005229\\) u, so \\(Q = 0.005229 \\times 931.5 = 4.87\\) MeV.",
          "The alpha's share: \\(K_\\alpha = 4.87 \\times \\dfrac{222}{226} = 4.78\\) MeV.",
          "The radon recoils with the rest, about 0.09 MeV.",
        ],
        answer: "Q ≈ 4.87 MeV; \\(K_\\alpha\\) ≈ 4.78 MeV",
      },
      selfCheckExample: {
        prompt:
          "\\(^{210}\\text{Po}\\) at rest emits an alpha with Q = 5.41 MeV. Find the kinetic energies of the alpha and of the \\(^{206}\\text{Pb}\\) daughter.",
        steps: [
          "\\(K_\\alpha = 5.41 \\times \\dfrac{206}{210} = 5.31\\) MeV.",
          "\\(K_d = 5.41 \\times \\dfrac{4}{210} = 0.10\\) MeV.",
          "Check: they add to 5.41 MeV.",
        ],
        answer: "Alpha about 5.31 MeV; lead about 0.10 MeV",
      },
      practiceSet: [
        { prompt: "\\(^{2}\\text{H} + {}^{2}\\text{H} \\rightarrow {}^{3}\\text{He} + n\\). Masses: \\(^{2}\\text{H}\\) 2.014102 u, \\(^{3}\\text{He}\\) 3.016029 u, n 1.008665 u. Q? (931.5 MeV/u)", answer: "About 3.27 MeV" },
        { prompt: "A reaction has Q = −2 MeV. Can a projectile with 1.5 MeV of kinetic energy make it go?", answer: "No: \\(K_p + Q\\) would be negative." },
        { prompt: "A = 230 decays by alpha emission with Q = 5 MeV. Kinetic energy of the daughter?", answer: "About 0.087 MeV", method: "\\(5 \\times 4/230\\)" },
        { prompt: "In alpha decay at rest, which product has more momentum?", answer: "Neither: their momenta are equal and opposite." },
      ],
      pyqExampleId: "be8227a0-d694-460b-801c-bc8eee469b18", // 13 Apr 2023: U-238 alpha decay from masses, about 4.25 MeV
      traps: [
        {
          title: "The alpha does not get all of Q",
          body: "Momentum is shared equally and oppositely, so kinetic energy splits inversely with mass. The alpha gets \\(Q(A - 4)/A\\). Giving it all of Q ignores the recoil.",
        },
        {
          title: "Before minus after, for masses",
          body: "Mass lost is released energy, so Q = (reactant masses) − (product masses). A negative answer means the reaction needs energy.",
        },
        {
          title: "Keep the electrons balanced",
          body: "Atomic masses carry electrons. In alpha decay the parent atom's electrons equal the daughter's plus helium's, so atomic masses work. In beta-plus decay they do not balance; take care there.",
        },
      ],
    },

    // C3 — energy from a whole sample
    {
      kind: "formula" as const,
      slug: "jpnuc-bulk-energy",
      name: "Energy from a sample, and power",
      intuition:
        "One fission gives about 200 MeV, a tiny amount. A gram of uranium holds about 2.6 × 10²¹ nuclei, so the total is huge. Count the nuclei with moles and Avogadro's number, multiply by the energy per reaction, and convert MeV to joules if asked. For a reactor or a star, divide the power by the energy per reaction to get reactions per second.",
      definition:
        "- Number of nuclei \\(N = \\dfrac{m}{M}N_A\\), with m and the molar mass M in the same unit.\n" +
        "- Total energy \\(E = N \\times Q\\).\n" +
        "- \\(1\\ \\text{MeV} = 1.6 \\times 10^{-13}\\ \\text{J}\\).\n" +
        "- Power: reactions per second \\(= \\dfrac{P}{Q}\\), with Q in joules. Mass used per second = (reactions per second) × (mass per reaction).\n" +
        "- When several nuclei make one reaction (three helium into one carbon), divide the count of nuclei by that number first.",
      formula: {
        label: "Energy from a sample",
        latex: "E = \\frac{m}{M}N_A\\,Q, \\qquad \\text{rate} = \\frac{P}{Q}",
      },
      authoredExample: {
        prompt:
          "Each fission of \\(^{235}\\text{U}\\) releases 200 MeV. Find the energy, in joules, if every nucleus in 1 kg of \\(^{235}\\text{U}\\) undergoes fission. (\\(N_A = 6.022 \\times 10^{23}\\), 1 MeV = \\(1.6 \\times 10^{-13}\\) J)",
        steps: [
          "Moles: \\(1000/235 = 4.255\\).",
          "Nuclei: \\(4.255 \\times 6.022 \\times 10^{23} = 2.563 \\times 10^{24}\\).",
          "Energy: \\(2.563 \\times 10^{24} \\times 200 = 5.13 \\times 10^{26}\\) MeV.",
          "In joules: \\(5.13 \\times 10^{26} \\times 1.6 \\times 10^{-13} = 8.2 \\times 10^{13}\\) J.",
        ],
        answer: "About \\(8.2 \\times 10^{13}\\) J",
      },
      selfCheckExample: {
        prompt:
          "A 300 MW reactor runs on \\(^{235}\\text{U}\\) at 200 MeV per fission. How many fissions happen each second, and how much uranium is used in a day? (\\(N_A = 6 \\times 10^{23}\\))",
        steps: [
          "Energy per fission: \\(200 \\times 1.6 \\times 10^{-13} = 3.2 \\times 10^{-11}\\) J.",
          "Fissions per second: \\(3 \\times 10^{8}/3.2 \\times 10^{-11} = 9.4 \\times 10^{18}\\).",
          "In a day: \\(9.375 \\times 10^{18} \\times 86400 = 8.1 \\times 10^{23}\\) nuclei, which is 1.35 mol.",
          "Mass: \\(1.35 \\times 235 = 317\\) g.",
        ],
        answer: "About \\(9.4 \\times 10^{18}\\) per second; about 317 g a day",
      },
      practiceSet: [
        { prompt: "How many nuclei are in 2.35 g of \\(^{235}\\text{U}\\)? (\\(N_A = 6 \\times 10^{23}\\))", answer: "\\(6 \\times 10^{21}\\)" },
        { prompt: "Each fusion releases 17.6 MeV. Energy from \\(10^{20}\\) fusions, in joules?", answer: "About \\(2.8 \\times 10^{8}\\) J" },
        { prompt: "How many fissions per second give 1.6 W at 200 MeV each?", answer: "\\(5 \\times 10^{10}\\) per second" },
        { prompt: "All nuclei in 11.65 g of \\(^{233}\\text{U}\\) undergo fission at 200 MeV each. Total energy in MeV? (\\(N_A = 6 \\times 10^{23}\\))", answer: "\\(6 \\times 10^{24}\\) MeV" },
      ],
      pyqExampleId: "1357ca7b-65e3-4af1-b89a-a3a71283ee92", // 23 Jan 2026: 47 g of U-235 at 190 MeV per fission, 228 × 10^23 MeV
      traps: [
        {
          title: "Grams over grams per mole",
          body: "Moles = mass ÷ molar mass with both in grams. Using kilograms for one and grams for the other is off by a thousand.",
        },
        {
          title: "MeV is not joules",
          body: "Power is in watts, joules per second. Turn Q into joules (× 1.6 × 10⁻¹³) before dividing a power by it.",
        },
        {
          title: "Several nuclei per reaction",
          body: "If three helium nuclei make one carbon, the number of reactions is a third of the number of helium nuclei.",
        },
      ],
    },
  ],
};
