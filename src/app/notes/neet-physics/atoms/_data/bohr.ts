import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_AT_BOHR_NOTE: SubtopicNote = {
  subtopicName: "Bohr Model of Hydrogen",
  title: "Bohr Model of Hydrogen",
  oneLineDefinition:
    "Bohr allowed only the orbits where the angular momentum is nh/2π; from that rule the radius grows as n², the speed falls as 1/n and the energy is −13.6/n² eV.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026, two of them from 2025 or later. One finds the radius of the third orbit from the first, one finds an orbit's radius from the electron's speed, one compares the energies of the first and second excited states, and one applies Bohr's rule to a particle pulled by a constant force.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphat-postulates",
      name: "Bohr's postulates and quantised angular momentum",
      intuition:
        "Bohr kept Rutherford's nucleus and added three rules. The electron may circle only in certain orbits, and while it is in one of them it does not radiate, even though it is accelerating. The allowed orbits are those where the angular momentum is a whole number of h/2π. Light comes out or goes in only when the electron jumps from one orbit to another, and the photon carries exactly the difference in energy. Every result on this page comes from putting the second rule together with a force balance.",
      definition:
        "- **Postulate 1:** the electron moves in certain stable orbits without radiating energy. These are the stationary states.\n" +
        "- **Postulate 2:** an orbit is allowed only if \\(L = mvr = \\dfrac{nh}{2\\pi}\\), with n = 1, 2, 3, and so on. n is the principal quantum number.\n" +
        "- **Postulate 3:** when the electron jumps from a higher level to a lower one, it gives out a photon with \\(h\\nu = E_i - E_f\\). It takes in a photon of the same energy to jump back up.\n" +
        "- L does not depend on the nucleus: the orbit n = 3 has \\(L = \\dfrac{3h}{2\\pi}\\) in hydrogen and in He⁺ alike.\n" +
        "- The model works only for atoms and ions with one electron: H, He⁺, Li²⁺.\n" +
        "- **The method for any central force:** write the force balance \\(\\dfrac{mv^{2}}{r} = F(r)\\), then use \\(mvr = \\dfrac{nh}{2\\pi}\\) to remove v, and see how r depends on n.",
      formula: {
        label: "Bohr's quantum condition and frequency condition",
        latex: "L = mvr = \\frac{nh}{2\\pi}, \\qquad h\\nu = E_i - E_f",
        symbols: [
          { symbol: "\\(n\\)", meaning: "principal quantum number, 1, 2, 3 and so on" },
          { symbol: "\\(E_i, E_f\\)", meaning: "energies of the starting and final levels" },
        ],
      },
      authoredExample: {
        prompt:
          "The electron of a hydrogen atom has angular momentum \\(\\dfrac{h}{\\pi}\\). Which orbit is it in? By how much does its angular momentum change when it falls to the ground state? Take \\(h = 6.6 \\times 10^{-34}\\) J s.",
        steps: [
          "Write \\(\\dfrac{h}{\\pi} = \\dfrac{2h}{2\\pi}\\). Compare with \\(\\dfrac{nh}{2\\pi}\\): n = 2.",
          "In the ground state n = 1, so \\(\\Delta L = (2 - 1)\\dfrac{h}{2\\pi} = \\dfrac{6.6 \\times 10^{-34}}{2 \\times 3.14}\\).",
          "\\(\\Delta L \\approx 1.05 \\times 10^{-34}\\) J s.",
        ],
        answer: "n = 2; it falls by \\(\\dfrac{h}{2\\pi}\\), about \\(1.05 \\times 10^{-34}\\) J s",
      },
      selfCheckExample: {
        prompt:
          "An electron in hydrogen has angular momentum \\(\\dfrac{3h}{2\\pi}\\) and falls to the orbit where its angular momentum is \\(\\dfrac{h}{2\\pi}\\). The energies of these two orbits are −1.51 eV and −13.6 eV. Find the energy of the photon given out.",
        steps: [
          "The electron falls from n = 3 to n = 1.",
          "\\(h\\nu = E_i - E_f = -1.51 - (-13.6) = 12.09\\) eV.",
        ],
        answer: "12.09 eV",
      },
      practiceSet: [
        { prompt: "What is the angular momentum of the electron in the orbit n = 4, in terms of h?", answer: "\\(\\dfrac{2h}{\\pi}\\)" },
        { prompt: "The angular momentum of an electron in hydrogen is \\(\\dfrac{5h}{\\pi}\\). Which orbit is it in?", answer: "n = 10" },
        { prompt: "Does the angular momentum of the orbit n = 2 depend on whether the atom is H or He⁺?", answer: "No: it is \\(\\dfrac{h}{\\pi}\\) in both." },
        { prompt: "An electron in hydrogen falls from a level at −3.4 eV to a level at −13.6 eV. Energy of the photon?", answer: "10.2 eV" },
        { prompt: "Which atoms and ions does Bohr's model describe?", answer: "Those with one electron, such as H, He⁺ and Li²⁺" },
      ],
      pyqExampleId: "dcdbe858-448f-4a5a-82a7-3d8166ed4a8d",
      traps: [
        {
          title: "A whole number of h/2π, not of h",
          body: "Bohr's rule is \\(L = \\dfrac{nh}{2\\pi}\\). A statement that angular momentum is a whole-number multiple of h is false.",
        },
        {
          title: "Read n off the angular momentum first",
          body: "If \\(L = \\dfrac{5h}{\\pi}\\), rewrite it as \\(\\dfrac{10h}{2\\pi}\\): the orbit is n = 10, not n = 5.",
        },
        {
          title: "A stationary orbit does not radiate",
          body: "In an allowed orbit the electron accelerates but gives out no light. Light comes only from a jump between two orbits.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphat-radius",
      name: "Radius and speed of Bohr orbits",
      intuition:
        "Put Bohr's rule mvr = nh/2π together with the Coulomb pull. Two results come out. The radius grows as n², so the orbits spread out fast: n = 2 is four times as far out as n = 1. The speed falls as 1/n, so outer electrons move slowly. A nucleus with more charge pulls every orbit in and speeds the electron up. Most questions are ratios, so the constants cancel and only the powers of n and Z matter.",
      definition:
        "- **Radius:** \\(r_n = \\dfrac{n^{2}h^{2}\\varepsilon_0}{\\pi m e^{2}}\\) in hydrogen, that is \\(r_n = a_0 n^{2}\\), with the Bohr radius \\(a_0 = 0.53\\) Å \\(= 5.3 \\times 10^{-11}\\) m.\n" +
        "- **Speed:** \\(v_n = \\dfrac{v_1}{n}\\), with \\(v_1 \\approx 2.19 \\times 10^{6}\\) m/s, about \\(\\dfrac{c}{137}\\).\n" +
        "- **An ion with nuclear charge Ze and one electron:** \\(r_n = a_0\\dfrac{n^{2}}{Z}\\) and \\(v_n = v_1\\dfrac{Z}{n}\\).\n" +
        "- **Linear momentum:** \\(p = mv \\propto \\dfrac{Z}{n}\\).\n" +
        "- **Radius from the speed:** the force balance gives \\(v^{2}r = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^{2}}{m}\\) in hydrogen, so \\(r = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^{2}}{mv^{2}}\\).\n" +
        "- The ground state is n = 1. The first excited state is n = 2, the second excited state n = 3.",
      formula: {
        label: "Bohr radius and speed",
        latex: "r_n = 0.53\\,\\frac{n^{2}}{Z}\\ \\text{Å}, \\qquad v_n = 2.19 \\times 10^{6}\\,\\frac{Z}{n}\\ \\text{m/s}",
      },
      authoredExample: {
        prompt:
          "For the electron in the second orbit of He⁺ (Z = 2), find the radius of its orbit and its speed. Take \\(a_0 = 0.53\\) Å and \\(v_1 = 2.19 \\times 10^{6}\\) m/s.",
        steps: [
          "\\(r = a_0\\dfrac{n^{2}}{Z} = 0.53 \\times \\dfrac{4}{2} = 1.06\\) Å.",
          "\\(v = v_1\\dfrac{Z}{n} = 2.19 \\times 10^{6} \\times \\dfrac{2}{2} = 2.19 \\times 10^{6}\\) m/s.",
          "The speed is the same as in the ground state of hydrogen, because Z/n is 1 in both.",
        ],
        answer: "1.06 Å and \\(2.19 \\times 10^{6}\\) m/s",
      },
      selfCheckExample: {
        prompt:
          "The electron of a hydrogen atom moves at \\(7.3 \\times 10^{5}\\) m/s. Which orbit is it in, and what fraction of the ground-state linear momentum does it have?",
        steps: [
          "\\(v_n = \\dfrac{v_1}{n}\\), so \\(n = \\dfrac{2.19 \\times 10^{6}}{7.3 \\times 10^{5}} = 3\\).",
          "\\(p = mv \\propto \\dfrac{1}{n}\\), so the momentum is \\(\\dfrac{1}{3}\\) of its ground-state value.",
        ],
        answer: "n = 3; one third",
      },
      practiceSet: [
        { prompt: "Radius of the first orbit of Li²⁺ (Z = 3)? Take \\(a_0 = 0.53\\) Å.", answer: "About 0.18 Å" },
        { prompt: "Ratio of the electron's speeds in the first and third orbits of hydrogen?", answer: "3 : 1" },
        { prompt: "Speed of the electron in the second orbit of hydrogen? Take \\(v_1 = 2.19 \\times 10^{6}\\) m/s.", answer: "About \\(1.1 \\times 10^{6}\\) m/s" },
        { prompt: "Ratio of the electron's speeds in the third orbit of He⁺ and the third orbit of hydrogen?", answer: "2 : 1" },
        { prompt: "Which state of hydrogen is the second excited state?", answer: "n = 3" },
      ],
      pyqExampleId: "c2fbff2b-6413-44e2-b391-0e33db9babbb",
      traps: [
        {
          title: "Radius goes as n², not n",
          body: "The third orbit is 9 times as far out as the first, not 3 times: \\(r_n = a_0 n^{2}\\).",
        },
        {
          title: "Count excited states from n = 2",
          body: "The first excited state is n = 2 and the second excited state is n = 3. Taking the first excited state as n = 1 shifts every answer.",
        },
        {
          title: "Speed falls as n grows",
          body: "\\(v_n \\propto \\dfrac{1}{n}\\): outer electrons are slower. Only the radius grows with n.",
        },
        {
          title: "More nuclear charge pulls the orbit in as 1/Z",
          body: "\\(r_n = a_0\\dfrac{n^{2}}{Z}\\). The radius divides by Z, not by \\(Z^{2}\\); it is the energy that scales as \\(Z^{2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphat-energy",
      name: "Energy levels of hydrogen",
      intuition:
        "Put the Bohr radius into the energy of an orbiting electron, \\(E = -\\dfrac{e^{2}}{8\\pi\\varepsilon_0 r}\\), and each orbit gets a fixed energy: −13.6 eV for n = 1, −3.4 eV for n = 2, −1.51 eV for n = 3, climbing towards zero. These are the energy levels. The lowest, n = 1, is the ground state. Zero energy means the electron is just free, so the energy needed to free it from a level is the size of that level's energy. The levels crowd together as n grows.",
      definition:
        "- **Energy of level n:** \\(E_n = -\\dfrac{13.6}{n^{2}}\\) eV in hydrogen; \\(E_n = -13.6\\dfrac{Z^{2}}{n^{2}}\\) eV for an ion with one electron.\n" +
        "- Levels of hydrogen: n = 1 is −13.6 eV, n = 2 is −3.4 eV, n = 3 is −1.51 eV, n = 4 is −0.85 eV.\n" +
        "- In every level \\(K = -E_n\\) and \\(U = 2E_n\\).\n" +
        "- **Ionisation energy** from a level is \\(|E_n|\\): 13.6 eV from the ground state of hydrogen.\n" +
        "- **Excitation energy** from the ground state to level n is \\(E_n - E_1\\): 10.2 eV to n = 2, 12.09 eV to n = 3.\n" +
        "- A higher level has a higher energy, meaning one closer to zero. The gap between neighbouring levels shrinks as n grows.",
      formula: {
        label: "Energy levels",
        latex: "E_n = -13.6\\,\\frac{Z^{2}}{n^{2}}\\ \\text{eV}, \\qquad K = -E_n, \\qquad U = 2E_n",
      },
      authoredExample: {
        prompt:
          "How much energy is needed (a) to free the electron of a hydrogen atom from its first excited state, and (b) to raise it from the ground state to n = 3?",
        steps: [
          "(a) The first excited state is n = 2: \\(E_2 = -\\dfrac{13.6}{4} = -3.4\\) eV. Freeing it needs 3.4 eV.",
          "(b) \\(E_3 = -\\dfrac{13.6}{9} = -1.51\\) eV. Energy needed \\(= E_3 - E_1 = -1.51 - (-13.6) = 12.09\\) eV.",
        ],
        answer: "(a) 3.4 eV; (b) 12.09 eV",
      },
      selfCheckExample: {
        prompt: "What is the ground-state energy of He⁺ (Z = 2), and how much energy is needed to remove its electron?",
        steps: [
          "\\(E_1 = -13.6 \\times \\dfrac{2^{2}}{1^{2}} = -54.4\\) eV.",
          "Removing the electron needs \\(|E_1| = 54.4\\) eV.",
        ],
        answer: "−54.4 eV; 54.4 eV",
      },
      practiceSet: [
        { prompt: "Energy of the electron in the orbit n = 4 of hydrogen?", answer: "−0.85 eV" },
        { prompt: "Kinetic energy of the electron in the orbit n = 3 of hydrogen?", answer: "1.51 eV" },
        { prompt: "Potential energy of the electron in the ground state of hydrogen?", answer: "−27.2 eV" },
        { prompt: "Energy needed to raise the electron of hydrogen from n = 1 to n = 2?", answer: "10.2 eV" },
        { prompt: "As n increases, does the energy gap between neighbouring levels of hydrogen grow or shrink?", answer: "It shrinks." },
      ],
      pyqExampleId: "b92eafff-702d-4634-ae5c-9181b69f2bb3",
      traps: [
        {
          title: "A higher level is closer to zero",
          body: "−1.51 eV is a higher energy than −13.6 eV. The ground state has the most negative energy, not the most energy.",
        },
        {
          title: "Energy goes as Z², the radius as 1/Z",
          body: "For He⁺ the ground-state energy is \\(4 \\times (-13.6) = -54.4\\) eV. Multiplying by Z instead of \\(Z^{2}\\) gives −27.2 eV, which is wrong.",
        },
        {
          title: "Ionisation from an excited state needs less energy",
          body: "Freeing an electron from level n needs \\(\\dfrac{13.6}{n^{2}}\\) eV, not 13.6 eV. From n = 2 it is only 3.4 eV.",
        },
      ],
    },
  ],
};
