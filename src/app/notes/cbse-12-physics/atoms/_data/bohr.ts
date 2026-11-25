import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AT_BOHR_NOTE: SubtopicNote = {
  subtopicName: "Bohr Model of the Hydrogen Atom",
  title: "The Bohr Model of the Hydrogen Atom",
  oneLineDefinition:
    "Bohr's three postulates, the radius, speed and period of the nth orbit, and the energy of the electron with its kinetic and potential parts.",
  whyItMatters:
    "55 questions, forty-nine of them from board papers, the most of any page in this chapter. The board asked you to state Bohr's postulates in every year from 2022 to 2026, derive the radius of the nth orbit (2022 to 2025), derive the total energy and explain its negative sign (2025), find the kinetic and potential energy from the total energy (2022 to 2026), find the angular momentum in an orbit (2022, 2023, 2025, 2026), show how the period depends on n (2024, 2025, 2026) and find the quantum number of the earth's orbit (2024). In 2025 it set a whole case study on this page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpat-postulates",
      name: "Bohr's three postulates",
      intuition:
        "Bohr kept Rutherford's nucleus and orbits but added three rules that classical physics does not give. Some orbits are allowed and do not radiate. They are the ones whose angular momentum is a whole number of h/2π. Light comes out only when the electron jumps from one allowed orbit to a lower one.",
      definition:
        "- **First postulate:** an electron in an atom can revolve in certain stable orbits without the emission of radiant energy. Each such stationary state has a definite total energy.\n" +
        "- **Second postulate:** the electron revolves only in those orbits for which the angular momentum is an integral multiple of \\(h/2\\pi\\): \\(L = mvr = \\dfrac{nh}{2\\pi}\\), n = 1, 2, 3, ... (the quantisation condition; n is the principal quantum number).\n" +
        "- **Third postulate:** when the electron jumps from an orbit of energy \\(E_i\\) to one of lower energy \\(E_f\\), a photon is emitted with \\(h\\nu = E_i - E_f\\). An atom absorbs only the same frequencies it emits.\n" +
        "- **How Bohr removed Rutherford's difficulties:** postulate 1 makes the atom stable (no radiation in a stationary orbit); postulates 2 and 3 give discrete energies and so a line spectrum.\n" +
        "- **Angular momentum from an energy:** find n from \\(E_n = -13.6/n^2\\) eV first, then \\(L = nh/2\\pi\\).\n" +
        "- **Large orbits:** for the earth round the sun \\(n = 2\\pi mvr/h\\) is about \\(10^{74}\\), so the allowed orbits are far too close together to notice. For an atom with large n, the frequency of the light from n to (n − 1) comes out as \\(\\nu \\approx \\alpha/n^3\\), the same as the classical frequency of revolution. Board 2024 asked this; the present NCERT book does not work it out.",
      formula: {
        label: "Bohr's quantisation condition and frequency condition",
        latex: "L = mvr = \\frac{nh}{2\\pi}, \\qquad h\\nu = E_i - E_f",
      },
      authoredExample: {
        prompt: "The total energy of the electron in an orbit of a hydrogen atom is −1.51 eV. Find the angular momentum of the electron in this orbit.",
        steps: [
          "Given: \\(E_n = -1.51\\) eV, and \\(E_n = -\\dfrac{13.6}{n^2}\\) eV.",
          "\\(n^2 = \\dfrac{13.6}{1.51} = 9\\), so n = 3.",
          "Formula: \\(L = \\dfrac{nh}{2\\pi}\\).",
          "\\(L = \\dfrac{3 \\times 6.63 \\times 10^{-34}}{2 \\times 3.14} = 3.17 \\times 10^{-34}\\) J s.",
        ],
        answer: "\\(L = 3.17 \\times 10^{-34}\\) J s (that is, \\(3h/2\\pi\\))",
      },
      selfCheckExample: {
        prompt: "Which of Bohr's postulates goes against classical electromagnetic theory, and in what way?",
        steps: [
          "Classical theory says an accelerated charge always radiates.",
          "The first postulate says an electron in a stationary orbit is accelerated but does not radiate.",
        ],
        answer: "The first: an electron in a stable orbit does not give out radiant energy, although it is accelerated",
      },
      practiceSet: [
        { prompt: "Which of Bohr's postulates is called the quantisation condition?", answer: "The second: \\(mvr = nh/2\\pi\\)" },
        { prompt: "An electron jumps from a stationary orbit of energy \\(E_i\\) to one of lower energy \\(E_f\\). What is the frequency of the photon given out?", answer: "\\(\\nu = \\dfrac{E_i - E_f}{h}\\)" },
        { prompt: "Why do we never notice the quantisation of the earth's orbit round the sun?", answer: "Its quantum number is about \\(10^{74}\\), so neighbouring allowed orbits are far too close to tell apart" },
      ],
      pyqExampleId: "eaf5628d-8877-4a40-aaeb-5647abb6d1a9",
      traps: [
        {
          title: "Writing nh/2πr",
          body: "The angular momentum is \\(nh/2\\pi\\). There is no r in it: r appears on the other side, in \\(mvr\\).",
        },
        {
          title: "The photon frequency taken as the frequency of revolution",
          body: "In Bohr's model the photon's frequency is set by \\(h\\nu = E_i - E_f\\), not by how fast the electron goes round. That break with classical theory is the point of the third postulate.",
        },
        {
          title: "Assertion-reason on the postulates",
          body: "Board 2026 paired 'energy levels are discrete' with 'the electric force gives the centripetal force'. Both are true, but the force balance alone allows any radius; it is the quantisation of L that makes the levels discrete. So R does not explain A: code (B).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpat-orbit-radius",
      name: "Radius of the nth orbit",
      intuition:
        "Two conditions fix an orbit: the electric pull must supply the centripetal force, and the angular momentum must be a whole number of h/2π. Together they allow only certain radii, and these grow as n squared, so the orbits spread out fast.",
      definition:
        "- **Step 1 (force balance):** \\(\\dfrac{mv^2}{r} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^2}{r^2}\\) ... (i)\n" +
        "- **Step 2 (second postulate):** \\(mvr = \\dfrac{nh}{2\\pi}\\), so \\(v = \\dfrac{nh}{2\\pi mr}\\) ... (ii)\n" +
        "- **Step 3:** put (ii) in (i): \\(m\\dfrac{n^2h^2}{4\\pi^2 m^2 r^2} = \\dfrac{e^2}{4\\pi\\varepsilon_0 r}\\).\n" +
        "- **Step 4:** \\(r_n = \\dfrac{n^2 h^2 \\varepsilon_0}{\\pi m e^2}\\), so \\(r_n \\propto n^2\\).\n" +
        "- **Step 5:** for n = 1 this is the Bohr radius, \\(a_0 = \\dfrac{h^2\\varepsilon_0}{\\pi m e^2} = 5.3 \\times 10^{-11}\\) m \\(= 0.53\\) Å, and \\(r_n = n^2 a_0\\): 0.53 Å, 2.12 Å, 4.77 Å, ...\n" +
        "- **The orbits are not equally spaced:** \\(r_{n+1} - r_n = (2n + 1)a_0\\), which grows with n (for large n it is about \\(2na_0\\), proportional to n).",
      formula: {
        label: "Radius of the nth Bohr orbit",
        latex: "r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m e^2} = n^2 a_0, \\qquad a_0 = 0.53\\ \\text{Å}",
      },
      authoredExample: {
        prompt: "Find the radius of the n = 4 orbit of hydrogen, and how far the electron moves inwards when it jumps from n = 4 to n = 2. The Bohr radius is 0.53 Å.",
        steps: [
          "Given: \\(a_0 = 0.53\\) Å; formula \\(r_n = n^2 a_0\\).",
          "\\(r_4 = 16 \\times 0.53 = 8.48\\) Å.",
          "\\(r_2 = 4 \\times 0.53 = 2.12\\) Å.",
          "Change: \\(8.48 - 2.12 = 6.36\\) Å \\(= 6.36 \\times 10^{-10}\\) m, inwards.",
        ],
        answer: "\\(r_4 = 8.48\\) Å; the radius falls by 6.36 Å",
      },
      selfCheckExample: {
        prompt: "Find the ratio of the radius of the third Bohr orbit of hydrogen to that of the second.",
        steps: ["\\(r_n \\propto n^2\\).", "\\(\\dfrac{r_3}{r_2} = \\dfrac{9}{4}\\)."],
        answer: "9 : 4",
      },
      practiceSet: [
        { prompt: "How many times the first Bohr orbit is the fifth?", answer: "25 times" },
        { prompt: "By what percentage does the orbit radius change when the electron goes from n = 2 to n = 1?", answer: "It falls by 75%" },
        { prompt: "Are the gaps between neighbouring Bohr orbits equal?", answer: "No; the gap \\((2n + 1)a_0\\) grows with n" },
      ],
      pyqExampleId: "76a95343-576d-468f-a0c9-14bfa85cf17e",
      traps: [
        {
          title: "Calling the force balance a postulate",
          body: "Equation (i) is ordinary mechanics: the electric force gives the centripetal force. Only (ii), the quantisation of angular momentum, is Bohr's postulate. Name each one when you derive.",
        },
        {
          title: "The change asked for, the final radius given",
          body: "If the question asks how much the radius changes, subtract the two radii. Giving the new radius alone is the wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpat-speed-period",
      name: "Speed, period and frequency of revolution in the nth orbit",
      intuition:
        "In a bigger orbit the electron moves more slowly and also has further to go round. Both make one trip take longer, so the period grows very fast with n.",
      definition:
        "- **Speed:** from the force balance \\(v = \\sqrt{\\dfrac{e^2}{4\\pi\\varepsilon_0 m r}}\\). With \\(mvr = nh/2\\pi\\) and \\(r_n \\propto n^2\\), \\(v_n = \\dfrac{nh}{2\\pi m r_n} \\propto \\dfrac{n}{n^2} = \\dfrac{1}{n}\\). In full, \\(v_n = \\dfrac{e^2}{2\\varepsilon_0 n h}\\); \\(v_1 = 2.18 \\times 10^6\\) m/s.\n" +
        "- **Period, step 1:** \\(T = \\dfrac{2\\pi r_n}{v_n}\\).\n" +
        "- **Step 2:** \\(r_n \\propto n^2\\) and \\(v_n \\propto \\dfrac{1}{n}\\).\n" +
        "- **Step 3:** \\(T \\propto \\dfrac{n^2}{1/n} = n^3\\). For n = 1, \\(T_1 = 1.53 \\times 10^{-16}\\) s.\n" +
        "- **Frequency of revolution:** \\(f = \\dfrac{1}{T} = \\dfrac{v_n}{2\\pi r_n} \\propto \\dfrac{1}{n^3}\\).",
      formula: {
        label: "How speed, period and frequency change with n",
        latex: "v_n \\propto \\frac{1}{n}, \\qquad T_n = \\frac{2\\pi r_n}{v_n} \\propto n^3, \\qquad f_n \\propto \\frac{1}{n^3}",
      },
      authoredExample: {
        prompt: "The electron in the first Bohr orbit of hydrogen moves at \\(2.18 \\times 10^6\\) m/s in an orbit of radius \\(5.3 \\times 10^{-11}\\) m. Find its speed and its period in the n = 4 orbit.",
        steps: [
          "Given: \\(v_1 = 2.18 \\times 10^6\\) m/s, \\(r_1 = 5.3 \\times 10^{-11}\\) m, n = 4.",
          "Speed: \\(v_4 = \\dfrac{v_1}{4} = 5.45 \\times 10^5\\) m/s.",
          "Radius: \\(r_4 = 16 \\times 5.3 \\times 10^{-11} = 8.48 \\times 10^{-10}\\) m.",
          "Period: \\(T_4 = \\dfrac{2\\pi r_4}{v_4} = \\dfrac{2 \\times 3.14 \\times 8.48 \\times 10^{-10}}{5.45 \\times 10^5} = 9.8 \\times 10^{-15}\\) s.",
        ],
        answer: "\\(v_4 = 5.45 \\times 10^5\\) m/s; \\(T_4 = 9.8 \\times 10^{-15}\\) s",
      },
      selfCheckExample: {
        prompt: "Find the ratio of the period of revolution of the electron in the third Bohr orbit to that in the first.",
        steps: ["\\(T \\propto n^3\\).", "\\(\\dfrac{T_3}{T_1} = \\dfrac{27}{1}\\)."],
        answer: "27 : 1",
      },
      practiceSet: [
        { prompt: "How does the speed of the electron in the second Bohr orbit compare with that in the first?", answer: "It is half" },
        { prompt: "How does the frequency of revolution of the electron depend on n?", answer: "As \\(1/n^3\\)" },
        { prompt: "The electron jumps from n = 3 to n = 1. Does its period of revolution rise or fall?", answer: "It falls, to 1/27 of its value" },
      ],
      pyqExampleId: "d0f156e5-1896-4c8c-a02b-9c753b55bc51",
      traps: [
        {
          title: "Period taken as n²",
          body: "The radius goes as \\(n^2\\), but the period also carries the slower speed, \\(1/n\\). So \\(T \\propto n^3\\), not \\(n^2\\).",
        },
        {
          title: "Speed taken to grow with n",
          body: "The electron is slowest in the outer orbits: \\(v \\propto 1/n\\). It speeds up as it falls to a lower orbit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpat-energy-levels",
      name: "Energy of the electron in the nth orbit",
      intuition:
        "The electron is held to the proton, so its total energy is negative: you must give it energy to set it free. The kinetic energy is positive and the potential energy is negative and twice as big, so the total is minus the kinetic energy.",
      definition:
        "- **Step 1:** the force balance \\(mv^2 = \\dfrac{e^2}{4\\pi\\varepsilon_0 r}\\) gives \\(K = \\tfrac{1}{2}mv^2 = \\dfrac{e^2}{8\\pi\\varepsilon_0 r}\\).\n" +
        "- **Step 2:** the potential energy of \\(+e\\) and \\(-e\\) a distance r apart, zero at infinity, is \\(U = -\\dfrac{e^2}{4\\pi\\varepsilon_0 r}\\).\n" +
        "- **Step 3:** \\(E = K + U = -\\dfrac{e^2}{8\\pi\\varepsilon_0 r}\\). The negative sign means the electron is bound to the nucleus.\n" +
        "- **Step 4:** put in \\(r_n\\): \\(E_n = -\\dfrac{me^4}{8n^2\\varepsilon_0^2h^2} = -\\dfrac{2.18 \\times 10^{-18}}{n^2}\\) J \\(= -\\dfrac{13.6}{n^2}\\) eV.\n" +
        "- **In every orbit:** \\(K = -E\\), \\(U = 2E\\), \\(U/K = -2\\). E, K and U all go as \\(1/n^2\\).\n" +
        "- **Ionisation energy** of hydrogen: the least energy to free the electron from the ground state, 13.6 eV. To excite it from n = 1 to n = 2 needs 10.2 eV, to n = 3 needs 12.09 eV. The levels come closer and closer together as n grows.\n" +
        "- **When the atom emits a photon** its total energy falls by hν and its kinetic energy rises by the same amount.",
      formula: {
        label: "Energy levels of hydrogen",
        latex: "E_n = -\\frac{me^4}{8n^2\\varepsilon_0^2h^2} = -\\frac{13.6}{n^2}\\ \\text{eV}, \\qquad K = -E_n, \\quad U = 2E_n",
      },
      authoredExample: {
        prompt: "Find the total, kinetic and potential energy of the electron in the n = 5 orbit of hydrogen, and the energy needed to ionise the atom from this state.",
        steps: [
          "Formula: \\(E_n = -\\dfrac{13.6}{n^2}\\) eV, with n = 5.",
          "\\(E_5 = -\\dfrac{13.6}{25} = -0.544\\) eV.",
          "\\(K = -E_5 = +0.544\\) eV; \\(U = 2E_5 = -1.088\\) eV.",
          "Ionisation from n = 5: \\(0 - (-0.544) = 0.544\\) eV.",
        ],
        answer: "E = −0.544 eV, K = 0.544 eV, U = −1.088 eV; 0.544 eV to ionise",
      },
      selfCheckExample: {
        prompt: "How much energy is needed to free the electron of a hydrogen atom that is in its first excited state?",
        steps: ["The first excited state is n = 2: \\(E_2 = -\\dfrac{13.6}{4} = -3.4\\) eV.", "Energy needed \\(= 0 - (-3.4) = 3.4\\) eV."],
        answer: "3.4 eV",
      },
      practiceSet: [
        { prompt: "What is the ratio of the potential energy to the kinetic energy of the electron in any Bohr orbit?", answer: "−2" },
        { prompt: "How much energy is needed to raise a hydrogen atom from its ground state to n = 3?", answer: "12.09 eV" },
        { prompt: "A hydrogen atom gives out a photon of 1.89 eV. By how much does the kinetic energy of its electron change?", answer: "It rises by 1.89 eV" },
      ],
      pyqExampleId: "0a53bca3-0acf-467d-82ba-1dafc7d40707",
      traps: [
        {
          title: "Miscounting excited states",
          body: "The ground state is n = 1, the first excited state n = 2, the second n = 3 and the third excited state n = 4. Read 'third excited state' as n = 3 and every number after it is wrong.",
        },
        {
          title: "Signs of K and U",
          body: "Kinetic energy is never negative. Potential energy is negative, and twice the total energy. If your K comes out negative, you have swapped the signs.",
        },
        {
          title: "Total energy given as the potential energy",
          body: "\\(-13.6/n^2\\) eV is the TOTAL energy. The potential energy is twice that; a question on U wants \\(2E_n\\).",
        },
      ],
    },
  ],
};
