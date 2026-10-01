import type { SubtopicNote } from "@/app/notes/_types";

export const STRUCTURE_NUC_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Size, Mass Defect and Binding Energy",
  title: "Nuclear Size, Mass Defect and Binding Energy",
  oneLineDefinition:
    "A nucleus has radius R₀A^(1/3), so every nucleus has the same density; its mass is less than the mass of its free nucleons, and that missing mass times c² is the binding energy that holds it together.",
  whyItMatters:
    "Thirty PYQs, six of them numerical, and seven from 2026, more than any other page in this chapter. Fourteen use the radius rule: a ratio of radii or volumes, a density that never changes, the speeds of two fragments. Eight find a binding energy from masses, and eight test the binding-energy curve and the nuclear force in words.",
  concepts: [
    // C1 — R = R0 A^(1/3) and constant density
    {
      kind: "formula" as const,
      slug: "jpnuc-size-density",
      name: "Nuclear radius and constant density",
      intuition:
        "Nucleons pack like marbles in a bag: each takes the same small volume. So the volume of a nucleus grows in step with its mass number A, and the radius grows only as the cube root of A. Mass and volume both grow as A, so their ratio, the density, is the same for every nucleus.",
      definition:
        "- \\(R = R_0A^{1/3}\\), with \\(R_0 \\approx 1.2\\) fm (1 fm = \\(10^{-15}\\) m).\n" +
        "- Volume \\(\\propto A\\), surface area \\(\\propto A^{2/3}\\), radius \\(\\propto A^{1/3}\\). In ratios: \\(\\left(\\dfrac{R_1}{R_2}\\right)^{3} = \\dfrac{A_1}{A_2}\\).\n" +
        "- Density \\(\\rho = \\dfrac{Am}{\\tfrac{4}{3}\\pi R_0^{3}A} = \\dfrac{3m}{4\\pi R_0^{3}} \\approx 2.3 \\times 10^{17}\\ \\text{kg/m}^{3}\\). A cancels, so **every nucleus has the same density**.\n" +
        "- Only protons and neutrons count in A. Electrons add nothing to the mass number.\n" +
        "- A nucleus at rest splitting in two: momentum stays zero, so \\(A_1v_1 = A_2v_2\\). Then \\(\\dfrac{v_1}{v_2} = \\dfrac{A_2}{A_1}\\) and \\(\\dfrac{R_1}{R_2} = \\left(\\dfrac{A_1}{A_2}\\right)^{1/3}\\).",
      formula: {
        label: "Nuclear radius",
        latex: "R = R_0A^{1/3}, \\qquad \\rho = \\frac{3m}{4\\pi R_0^{3}}\\ \\text{(same for all A)}",
        symbols: [
          { symbol: "\\(R_0\\)", meaning: "a constant, about 1.2 fm" },
          { symbol: "\\(A\\)", meaning: "mass number (protons + neutrons)" },
          { symbol: "\\(m\\)", meaning: "mass of one nucleon" },
        ],
      },
      authoredExample: {
        prompt:
          "The nucleus \\(^{27}\\text{Al}\\) has radius 3.6 fm. Find \\(R_0\\), the radius of a nucleus with \\(A = 125\\), and the ratio of their surface areas.",
        steps: [
          "\\(27^{1/3} = 3\\), so \\(R_0 = 3.6/3 = 1.2\\) fm.",
          "\\(125^{1/3} = 5\\), so \\(R = 1.2 \\times 5 = 6.0\\) fm.",
          "Surface area goes as \\(R^{2}\\): \\(\\left(\\dfrac{6.0}{3.6}\\right)^{2} = \\left(\\dfrac{5}{3}\\right)^{2} = \\dfrac{25}{9}\\).",
        ],
        answer: "\\(R_0 = 1.2\\) fm; 6.0 fm; surface areas in the ratio 25 : 9 (larger to smaller).",
      },
      selfCheckExample: {
        prompt:
          "A nucleus at rest splits into two fragments with mass numbers 64 and 125. Find the ratio of their radii and the ratio of their speeds (lighter to heavier).",
        steps: [
          "Radii: \\(\\left(\\dfrac{64}{125}\\right)^{1/3} = \\dfrac{4}{5}\\).",
          "Momentum is zero before, so \\(64v_1 = 125v_2\\) and \\(\\dfrac{v_1}{v_2} = \\dfrac{125}{64}\\).",
          "The lighter fragment is smaller and faster.",
        ],
        answer: "Radii 4 : 5; speeds 125 : 64.",
      },
      practiceSet: [
        { prompt: "With \\(R_0 = 1.3\\) fm, the radius of a nucleus with \\(A = 216\\)?", answer: "7.8 fm", method: "\\(216^{1/3} = 6\\)" },
        { prompt: "Nucleus Q has 27 times the volume of nucleus P. Ratio of their radii (Q to P)?", answer: "3 : 1" },
        { prompt: "Ratio of the nuclear densities of \\(^{4}\\text{He}\\) and \\(^{208}\\text{Pb}\\)?", answer: "1 : 1" },
        { prompt: "Ratio of the surface areas of nuclei with \\(A = 1\\) and \\(A = 216\\)?", answer: "1 : 36" },
      ],
      pyqExampleId: "4111d8c6-b1f2-491d-b499-4aed6b50fa30", // 31 Jan 2024: radius half that of A = 192, so A = 24
      traps: [
        {
          title: "Any statement that orders nuclear densities is false",
          body: "Bismuth is not denser than lithium. The A in the mass cancels the A in the volume, so a statement ranking nuclei by density, or saying density grows with A, is wrong. The reason \\(R \\propto A^{1/3}\\) is true; the claim built on it is not.",
        },
        {
          title: "Cube the radius ratio, do not cube-root it twice",
          body: "Halving the radius divides A by 8, not by 2. Go from radii to mass numbers by cubing, and from mass numbers to radii by taking the cube root.",
        },
        {
          title: "Absorbed electrons do not change A",
          body: "If a nucleus captures protons, neutrons and electrons, only the protons and neutrons raise A. Count the nucleons, then apply \\(A^{1/3}\\) or \\(A^{2/3}\\).",
        },
      ],
    },

    // C2 — mass defect and binding energy
    {
      kind: "formula" as const,
      slug: "jpnuc-mass-defect",
      name: "Mass defect and binding energy",
      intuition:
        "Weigh the free protons and neutrons, then weigh the nucleus they make: the nucleus is lighter. The missing mass left as energy when the nucleus formed. Putting that energy back, Δm c², is what it takes to pull the nucleus apart. That is the binding energy.",
      definition:
        "- Mass defect \\(\\Delta m = Zm_p + (A - Z)m_n - M_{\\text{nucleus}}\\).\n" +
        "- Binding energy \\(BE = \\Delta m\\,c^{2}\\); with masses in u, \\(1\\ \\text{u} = 931.5\\ \\text{MeV}/c^{2}\\).\n" +
        "- With **atomic** masses, use the mass of a hydrogen atom, \\(m(^{1}\\text{H}) = 1.007825\\) u, in place of \\(m_p\\). The Z electrons then cancel.\n" +
        "- **BE per nucleon**, \\(BE/A\\), measures how tightly bound a nucleus is. Compare stability with it, not with total BE.\n" +
        "- The other direction: \\(\\Delta m = BE/c^{2}\\). Energy in joules divided by \\(9 \\times 10^{16}\\) gives kilograms.\n" +
        "- Neutron separation energy: \\(S_n = [M(A - 1) + m_n - M(A)]c^{2}\\), the energy to pull out one neutron.",
      formula: {
        label: "Binding energy",
        latex: "BE = \\left[Zm_p + (A - Z)m_n - M\\right]c^{2}, \\qquad 1\\ \\text{u}\\,c^{2} = 931.5\\ \\text{MeV}",
      },
      authoredExample: {
        prompt:
          "Find the binding energy and the binding energy per nucleon of \\(^{7}_{3}\\text{Li}\\). Atomic mass of \\(^{7}\\text{Li}\\) = 7.01600 u; \\(m(^{1}\\text{H})\\) = 1.00783 u; \\(m_n\\) = 1.00867 u; 1 u = 931.5 MeV/\\(c^{2}\\).",
        steps: [
          "Protons, as hydrogen atoms: \\(3 \\times 1.00783 = 3.02349\\) u.",
          "Neutrons: \\(4 \\times 1.00867 = 4.03468\\) u. Total \\(7.05817\\) u.",
          "\\(\\Delta m = 7.05817 - 7.01600 = 0.04217\\) u.",
          "\\(BE = 0.04217 \\times 931.5 = 39.3\\) MeV; per nucleon \\(39.3/7 = 5.61\\) MeV.",
        ],
        answer: "About 39.3 MeV in all; 5.6 MeV per nucleon.",
      },
      selfCheckExample: {
        prompt:
          "Atomic masses: \\(^{16}\\text{O}\\) = 15.994915 u, \\(^{17}\\text{O}\\) = 16.999132 u; \\(m_n\\) = 1.008665 u. How much energy is needed to remove one neutron from \\(^{17}\\text{O}\\)? (1 u = 931.5 MeV/\\(c^{2}\\))",
        steps: [
          "After removal: \\(15.994915 + 1.008665 = 17.003580\\) u.",
          "Mass gained: \\(17.003580 - 16.999132 = 0.004448\\) u.",
          "\\(S_n = 0.004448 \\times 931.5 = 4.14\\) MeV.",
        ],
        answer: "About 4.14 MeV",
      },
      practiceSet: [
        { prompt: "\\(m_p\\) = 1.00728 u, \\(m_n\\) = 1.00866 u, deuteron mass = 2.01355 u. Binding energy of the deuteron? (931.5 MeV/u)", answer: "About 2.23 MeV", method: "\\(\\Delta m = 0.00239\\) u" },
        { prompt: "A nucleus with \\(A = 56\\) has total binding energy 492 MeV. Binding energy per nucleon?", answer: "About 8.79 MeV" },
        { prompt: "Write the binding energy of \\(^{14}_{7}\\text{N}\\) (nuclear mass M) in terms of \\(m_p\\), \\(m_n\\) and M.", answer: "\\((7m_p + 7m_n - M)c^{2}\\)" },
        { prompt: "A binding energy of \\(4.5 \\times 10^{10}\\) J corresponds to what mass defect?", answer: "\\(5 \\times 10^{-7}\\) kg = 0.5 mg" },
      ],
      pyqExampleId: "ef8fefcc-2387-4bf8-8dc3-7160094ea919", // 2 Apr 2026: BE per nucleon of Bi-209 from atomic masses, 7.84 MeV
      traps: [
        {
          title: "Atom mass or nucleus mass",
          body: "Tables give atomic masses, which include the electrons. Pair an atomic mass with \\(m(^{1}\\text{H})\\) for the protons so the electrons cancel. Mixing an atomic mass with bare proton masses leaves Z electron masses in the defect.",
        },
        {
          title: "Bound mass is the smaller one",
          body: "The defect is (free nucleons) − (nucleus). Written the other way round, the binding energy comes out negative.",
        },
        {
          title: "Per nucleon or in total",
          body: "Read whether the question wants BE or BE/A. Stability is compared with BE per nucleon; the energy to break the whole nucleus is the total.",
        },
      ],
    },

    // C3 — binding-energy curve, nuclear force, nuclide names
    {
      kind: "reference" as const,
      slug: "jpnuc-be-curve",
      name: "The binding-energy curve and the nuclear force",
      intuition:
        "Plot BE per nucleon against A. It climbs fast for light nuclei, peaks near iron at A ≈ 56, and then falls slowly. In the long middle it is almost flat, because the nuclear force reaches only the nearest neighbours: adding nucleons adds the same bond energy each time. Any change that moves nuclei toward the peak releases energy.",
      definition:
        "- **Nuclear force:** the strongest force, short ranged (a few fm), attractive at those distances and repulsive when nucleons get too close. It is charge independent (p–p, n–n and n–p alike), spin dependent, not inverse-square, and it saturates.\n" +
        "- **Liquid-drop terms in the binding energy:** volume term \\(\\propto A\\) (adds), surface term \\(\\propto A^{2/3}\\) (subtracts, since surface nucleons have fewer neighbours), Coulomb term \\(\\propto Z(Z - 1)/A^{1/3}\\) (subtracts).\n" +
        "- **Isotopes:** same Z, different A (\\(^{12}\\text{C}\\), \\(^{14}\\text{C}\\)). **Isobars:** same A, different Z (\\(^{40}_{18}\\text{Ar}\\), \\(^{40}_{20}\\text{Ca}\\)). **Isotones:** same number of neutrons (\\(^{13}_{6}\\text{C}\\), \\(^{14}_{7}\\text{N}\\)).\n" +
        "- Nuclei with lower BE per nucleon tend to change into nuclei with higher BE per nucleon: heavy ones by fission, light ones by fusion.",
      table: {
        columns: ["Part of the curve", "Mass number", "BE per nucleon", "What it means"],
        rows: [
          {
            cells: ["Lightest nuclei", "Below about 20", "Low and uneven: about 1.1 MeV for \\(^{2}\\text{H}\\), a spike near 7 MeV for \\(^{4}\\text{He}\\)", "Fusing two light nuclei raises BE per nucleon and releases energy."],
          },
          {
            cells: ["Flat middle", "About 30 to 170", "Nearly constant, about 8 MeV", "The force is short ranged and saturates: each nucleon binds only to its neighbours."],
            noteAmber: "Flat because the force is SHORT ranged. A reason that says long range is false.",
          },
          {
            cells: ["Peak", "Near 56 (iron)", "Highest, about 8.8 MeV", "The most tightly bound nuclei; neither fission nor fusion releases energy from them."],
          },
          {
            cells: ["Heavy nuclei", "Above about 170", "Falls slowly, to about 7.6 MeV for uranium", "Coulomb repulsion grows; splitting into two middle nuclei releases energy."],
          },
        ],
        caption: "Energy is released whenever the products sit higher on this curve than what you started with.",
      },
      selfCheckExample: {
        prompt:
          "A nucleus with A = 240 splits into two nuclei with A = 120. Does BE per nucleon rise or fall, and is energy released or absorbed?",
        steps: [
          "A = 240 is on the falling heavy side, about 7.6 MeV per nucleon.",
          "A = 120 is in the flat middle, about 8.5 MeV per nucleon.",
          "The products are more tightly bound, so the difference is released.",
        ],
        answer: "It rises, so energy is released.",
      },
      practiceSet: [
        { prompt: "Are \\(^{13}_{6}\\text{C}\\) and \\(^{14}_{7}\\text{N}\\) isotopes, isobars or isotones?", answer: "Isotones (both have 7 neutrons)" },
        { prompt: "Name an isobar of \\(^{40}_{18}\\text{Ar}\\).", answer: "\\(^{40}_{20}\\text{Ca}\\) (or \\(^{40}_{19}\\text{K}\\))" },
        { prompt: "At the same separation, is the nuclear force between two protons different from that between two neutrons?", answer: "No: the nuclear force is charge independent." },
        { prompt: "Which liquid-drop term grows as \\(A^{2/3}\\)?", answer: "The surface term" },
      ],
      pyqExampleId: "a14e93de-11d0-4d38-852a-a184dad91005", // 13 Apr 2023: BE/A flat for 30 < A < 170 because the nuclear force is short ranged
      traps: [
        {
          title: "Heavier is not always more tightly bound",
          body: "BE per nucleon rises only up to iron. Beyond A ≈ 56 it falls. A statement that says it grows with mass for all nuclei is false.",
        },
        {
          title: "Isobars share A, isotopes share Z",
          body: "Iso-BAR: same mass number (the bar on a balance weighs mass). Iso-TOPE: same place in the periodic table, so same Z. Isotones share N.",
        },
        {
          title: "Stability is judged per nucleon",
          body: "A bigger nucleus has a bigger total binding energy almost always. Compare BE per nucleon to say which nucleus is more stable.",
        },
      ],
    },
  ],
};
