import type { SubtopicNote } from "@/app/notes/_types";

export const ORBITS_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Bohr Orbits: Radius, Speed and Energy",
  title: "Bohr Orbits: Radius, Speed and Energy",
  oneLineDefinition:
    "In a hydrogen-like ion the radius goes as n²/Z, the speed as Z/n and the energy as −13.6 Z²/n² eV; every other orbital quantity is built from these three.",
  whyItMatters:
    "Twenty-three PYQs, seventeen of them multiple choice, and two from 2026. Fifteen scale an orbit: eight work with the radius, four with the speed, and three with a quantity built from both, such as the frequency of revolution, the magnetic moment or the field at the nucleus. Eight are about the energy: three split it into kinetic and potential energy, four find a level's energy from Z²/n², and one replaces the electron with a muon.",
  concepts: [
    // C1 — radius and speed scaling
    {
      kind: "formula" as const,
      slug: "jpatom-orbit-scaling",
      name: "Bohr radius and orbital speed in hydrogen-like ions",
      intuition:
        "Put Bohr's rule mvr = nh/2π together with the Coulomb pull mv²/r = kZe²/r². Two results fall out: the radius grows as n² and shrinks as Z, and the speed falls as 1/n and grows with Z. Outer orbits are big and slow; a heavier nuclear charge pulls every orbit in and speeds it up. Nearly every question on this page is a ratio, so the constants cancel and only the powers of n and Z matter.",
      definition:
        "- **Radius:** \\(r_n = a_0\\dfrac{n^2}{Z}\\), with \\(a_0 = 0.529\\) Å (a question may give 0.53 Å or 0.51 Å; use its value).\n" +
        "- **Speed:** \\(v_n = v_1\\dfrac{Z}{n}\\), with \\(v_1 = 2.19 \\times 10^{6}\\) m/s, about c/137.\n" +
        "- **Period:** \\(T = \\dfrac{2\\pi r}{v} \\propto \\dfrac{n^3}{Z^2}\\). **Frequency of revolution:** \\(f \\propto \\dfrac{Z^2}{n^3}\\).\n" +
        "- **Current of the orbiting electron:** \\(I = ef \\propto \\dfrac{Z^2}{n^3}\\).\n" +
        "- **Magnetic moment:** \\(\\mu = IA = \\dfrac{evr}{2} = \\dfrac{neh}{4\\pi m}\\). It grows as n and does not depend on Z.\n" +
        "- **Field at the nucleus:** \\(B = \\dfrac{\\mu_0 I}{2r} \\propto \\dfrac{Z^2/n^3}{n^2/Z} = \\dfrac{Z^3}{n^5}\\).\n" +
        "- **Radius from the ionisation energy:** the bound energy is \\(E = -\\dfrac{kZe^2}{2r}\\), so \\(r = \\dfrac{kZe^2}{2|E|}\\).\n" +
        "- **Radius to n:** divide by \\(a_0/Z\\) and take the square root.",
      formula: {
        label: "Bohr radius and speed",
        latex: "r_n = 0.529\\,\\frac{n^2}{Z}\\ \\text{Å}, \\qquad v_n = 2.19 \\times 10^{6}\\,\\frac{Z}{n}\\ \\text{m/s}",
      },
      authoredExample: {
        prompt:
          "For the electron in the third orbit of He⁺, find (a) the orbit radius, (b) its speed, and (c) its frequency of revolution as a fraction of that in the ground state of hydrogen.",
        steps: [
          "He⁺ has Z = 2, and n = 3.",
          "(a) \\(r = 0.529 \\times \\dfrac{9}{2} = 2.38\\) Å.",
          "(b) \\(v = 2.19 \\times 10^{6} \\times \\dfrac{2}{3} = 1.46 \\times 10^{6}\\) m/s.",
          "(c) \\(f \\propto \\dfrac{Z^2}{n^3}\\). Hydrogen's ground state has \\(Z^2/n^3 = 1\\); here it is \\(\\dfrac{4}{27}\\).",
        ],
        answer: "(a) 2.38 Å; (b) \\(1.46 \\times 10^{6}\\) m/s; (c) 4/27 of hydrogen's ground-state value.",
      },
      selfCheckExample: {
        prompt:
          "For the electron in the second orbit of Li²⁺, find its speed and the ratio of its period of revolution to the period in the ground state of hydrogen.",
        steps: [
          "Li²⁺ has Z = 3, and n = 2.",
          "\\(v = 2.19 \\times 10^{6} \\times \\dfrac{3}{2} \\approx 3.29 \\times 10^{6}\\) m/s.",
          "\\(T \\propto \\dfrac{n^3}{Z^2} = \\dfrac{8}{9}\\) of hydrogen's ground-state period.",
        ],
        answer: "About \\(3.29 \\times 10^{6}\\) m/s; the period is 8/9 of hydrogen's.",
      },
      practiceSet: [
        { prompt: "Ratio of the radii of the second and fifth orbits of hydrogen?", answer: "4 : 25" },
        { prompt: "An orbit of hydrogen has radius 4.76 Å. Which orbit is it? (a₀ = 0.529 Å)", answer: "n = 3" },
        { prompt: "Speed of the electron in the ground state of He⁺?", answer: "\\(4.38 \\times 10^{6}\\) m/s" },
        { prompt: "In one atom, by what factor does the period of revolution change from n = 1 to n = 2?", answer: "It becomes 8 times as long." },
      ],
      pyqExampleId: "ba78534e-f8ad-4754-8d29-c0504c713081", // 2023: He⁺ second orbit vs Be³⁺ fourth orbit, radius ratio
      traps: [
        {
          title: "Radius goes as n², speed as 1/n",
          body: "Swapping the powers is the commonest slip. The radius of the third orbit is 9 times the first; the speed is one third of it.",
        },
        {
          title: "A larger Z makes the orbit smaller",
          body: "r = a₀n²/Z, so Li²⁺ orbits are a third the size of hydrogen's for the same n. The speed, on the other hand, is three times as large.",
        },
        {
          title: "Build a derived quantity from r and v",
          body: "Frequency is v/2πr, current is ef, magnetic moment is evr/2, field at the centre is μ₀I/2r. Write each in terms of n and Z step by step; guessing the power is where marks go.",
        },
      ],
    },

    // C2 — energy levels and the K/U split
    {
      kind: "formula" as const,
      slug: "jpatom-energy-levels",
      name: "Energy levels and the kinetic–potential split",
      intuition:
        "The electron is bound, so its total energy is negative. Its kinetic energy is positive, its potential energy negative and twice as large, so the total equals minus the kinetic energy. Moving to a higher level, the electron slows down (kinetic energy falls) while its potential and total energy rise towards zero. Two levels in different ions sit at the same energy when Z/n is the same.",
      definition:
        "- \\(E_n = -13.6\\,\\dfrac{Z^2}{n^2}\\) eV.\n" +
        "- \\(K = \\dfrac{kZe^2}{2r} = -E\\), \\(U = -\\dfrac{kZe^2}{r} = 2E\\). So \\(K : |U| = 1 : 2\\) in every orbit of every hydrogen-like ion.\n" +
        "- Going up a level: K decreases; U and E increase (towards zero).\n" +
        "- Ionisation energy from level n = binding energy = \\(|E_n| = 13.6\\,\\dfrac{Z^2}{n^2}\\) eV.\n" +
        "- **Naming levels:** n = 1 is the ground state, n = 2 the first excited state, n = 3 the second. The kth excited state is n = k + 1.\n" +
        "- Two levels have equal energy when \\(\\dfrac{Z}{n}\\) is equal.\n" +
        "- **The orbiting particle's mass:** \\(E \\propto m\\) and \\(r \\propto \\dfrac{1}{m}\\). A heavier particle in place of the electron sits in deeper, smaller orbits (taking the nucleus as fixed).",
      formula: {
        label: "Energy of level n",
        latex: "E_n = -13.6\\,\\frac{Z^2}{n^2}\\ \\text{eV}, \\qquad K = -E, \\quad U = 2E",
      },
      authoredExample: {
        prompt:
          "For the electron in the fourth orbit of Li²⁺, find its total energy, its kinetic and potential energy, and the energy needed to remove it from the ion.",
        steps: [
          "Li²⁺ has Z = 3, and n = 4: \\(E = -13.6 \\times \\dfrac{9}{16} = -7.65\\) eV.",
          "\\(K = -E = 7.65\\) eV; \\(U = 2E = -15.3\\) eV.",
          "Removing it takes \\(|E| = 7.65\\) eV.",
        ],
        answer: "E = −7.65 eV, K = 7.65 eV, U = −15.3 eV; 7.65 eV to remove it.",
      },
      selfCheckExample: {
        prompt:
          "Which level of Be³⁺ has the same energy as the second orbit of hydrogen, and what is that energy?",
        steps: [
          "Equal energy needs equal Z/n. Hydrogen n = 2 gives Z/n = 1/2.",
          "Be³⁺ has Z = 4, so n = 8.",
          "\\(E = -13.6 \\times \\dfrac{16}{64} = -3.4\\) eV.",
        ],
        answer: "n = 8, at −3.4 eV",
      },
      practiceSet: [
        { prompt: "The total energy of an electron in a Bohr orbit is −3.4 eV. Its kinetic and potential energy?", answer: "K = 3.4 eV, U = −6.8 eV" },
        { prompt: "Ratio of the kinetic energies of the electron in the first and third orbits of hydrogen?", answer: "9 : 1" },
        { prompt: "Ionisation energy of He⁺ from its ground state?", answer: "54.4 eV" },
        { prompt: "Which n is the third excited state?", answer: "n = 4" },
      ],
      pyqExampleId: "17d25353-ff6c-42a7-b956-fce9ba276af4", // 2025: which levels of H, He⁺ and Li²⁺ share an energy
      traps: [
        {
          title: "Z is squared in the energy",
          body: "E = −13.6 Z²/n² eV. Using Z instead of Z² gives He⁺ half its true ground-state energy. The radius has Z to the first power; the energy has Z².",
        },
        {
          title: "Excited-state numbers are one behind n",
          body: "The first excited state is n = 2 and the second excited state is n = 3. Reading second excited as n = 2 is wrong in every such question.",
        },
        {
          title: "Kinetic energy falls as the electron moves out",
          body: "Total and potential energy rise towards zero in a higher orbit, but the kinetic energy falls, because K = −E. Saying all three increase is a standard wrong option.",
        },
      ],
    },
  ],
};
