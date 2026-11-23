import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_BOHR_NOTE: SubtopicNote = {
  subtopicName: "Bohr's Atomic Model",
  title: "Bohr's Model of the Hydrogen Atom",
  oneLineDefinition:
    "Bohr's three postulates, the radius and speed of the nth orbit, the period and frequency of revolution, and the energy of the electron with its excitation and ionisation energies.",
  whyItMatters:
    "25 questions, the largest page in this chapter. Sixteen were set in board papers from 2017 to 2026: state Bohr's postulates (2020, 2023) or write the third one as a formula (2022), derive the radius of the nth orbit (2022, 2026), find the energy or the kinetic and potential energy in an orbit (2020, 2026), say what the binding energy of a hydrogen atom is (2024), and short calculations of angular momentum, period, frequency and the number of revolutions. The textbook adds the energy derivation, excitation energy and the largest angular speed of the electron.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpan-postulates",
      name: "Bohr's postulates and quantised angular momentum",
      intuition:
        "Bohr kept Rutherford's nucleus and orbiting electron, and added two rules to stop the collapse. Only some orbits are allowed: those in which the angular momentum comes in whole steps of h/2π. And in an allowed orbit the electron simply does not radiate. Light comes out only when the electron jumps from one allowed orbit down to another, and the photon carries away exactly the energy difference.",
      definition:
        "- **Postulate 1:** the electrons revolve round the nucleus in circular orbits. The centripetal force is provided by the electrostatic attraction between the electron and the nucleus.\n" +
        "- **Postulate 2:** the radius of the orbit can take only certain fixed values, such that the angular momentum of the electron is an integral multiple of \\(h/2\\pi\\): \\(m_e v_n r_n = \\dfrac{nh}{2\\pi}\\). In these **stable orbits** the electron does not emit radiation.\n" +
        "- **Postulate 3:** an electron can make a transition from one orbit to another of lower energy, emitting a photon whose energy equals the difference of the two energies: \\(h\\nu = E_m - E_n\\).\n" +
        "- Change in angular momentum between orbits \\(n_1\\) and \\(n_2\\): \\(\\Delta L = \\dfrac{(n_1 - n_2)h}{2\\pi}\\).\n" +
        "- **De Broglie's explanation:** treat the electron as a standing wave. The orbit must hold a whole number of wavelengths, \\(2\\pi r_n = n\\lambda_n\\), and with \\(\\lambda_n = h/m_e v_n\\) this gives the second postulate.\n" +
        "- **Limitations:** the model cannot explain the spectra of atoms other than hydrogen, the fine components of some hydrogen lines, or why the lines differ in intensity, and it gives no reason why only those orbits are stable.",
      formula: {
        label: "Bohr's conditions",
        latex: "m_e v_n r_n = \\frac{nh}{2\\pi}, \\qquad h\\nu = E_m - E_n",
        symbols: [
          { symbol: "\\(n\\)", meaning: "orbit number (principal quantum number), 1, 2, 3, ..." },
          { symbol: "\\(h\\)", meaning: "Planck's constant, 6.63 × 10⁻³⁴ J s" },
          { symbol: "\\(E_m, E_n\\)", meaning: "energies of the outer and inner orbits" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the change in the angular momentum of the electron when it jumps from the fifth orbit to the second orbit of a hydrogen atom. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(n_1 = 5\\), \\(n_2 = 2\\).",
          "Formula: \\(\\Delta L = \\dfrac{(n_1 - n_2)h}{2\\pi}\\).",
          "Substitution: \\(\\Delta L = \\dfrac{3 \\times 6.63 \\times 10^{-34}}{2 \\times 3.142}\\).",
          "\\(\\Delta L = 3.165 \\times 10^{-34}\\) J s. The angular momentum decreases by this amount, since the electron moves to a smaller orbit.",
        ],
        answer: "A decrease of \\(3.165 \\times 10^{-34}\\) J s",
      },
      selfCheckExample: {
        prompt: "In de Broglie's picture of the electron as a standing wave, how many electron wavelengths fit round the third orbit of hydrogen?",
        steps: ["The orbit must hold a whole number of wavelengths: \\(2\\pi r_n = n\\lambda_n\\).", "For the third orbit n = 3, so three wavelengths fit."],
        answer: "Three",
      },
      practiceSet: [
        { prompt: "Write Bohr's third postulate as a formula for the wavelength of the emitted photon.", answer: "\\(\\dfrac{hc}{\\lambda} = E_m - E_n\\)" },
        { prompt: "Does an electron radiate energy while it stays in one of Bohr's stable orbits?", answer: "No" },
        { prompt: "State one limitation of Bohr's model.", answer: "It cannot explain the spectra of atoms other than hydrogen (or: it cannot explain why the lines differ in intensity)" },
      ],
      pyqExampleId: "5bd376c4-f767-477e-92c9-925f55f5bbd4",
      traps: [
        {
          title: "Writing L = nh",
          body: "The condition is \\(L = nh/2\\pi\\). Dropping the \\(2\\pi\\) makes every angular momentum about six times too large.",
        },
        {
          title: "Leaving out 'does not radiate'",
          body: "The second postulate has two parts: the angular momentum is a whole multiple of \\(h/2\\pi\\), and an electron in such an orbit does not radiate. Write both.",
        },
        {
          title: "Stating two postulates when all are asked",
          body: "'State the postulates' means all three. Write each as a sentence and add its formula where it has one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-orbit-radius",
      name: "Radius and speed of the nth orbit",
      intuition:
        "Two facts fix each orbit. The pull of the nucleus supplies the centripetal force, and the angular momentum is nh/2π. Solve the two together and the radius comes out proportional to n², so the orbits spread out quickly: 1, 4, 9, 16 times the first. The speed comes out proportional to 1/n, so the electron moves more slowly in outer orbits.",
      definition:
        "**Derivation of the radius** (atom of atomic number Z, electron of mass \\(m_e\\) and charge \\(e\\)):\n" +
        "- The electrostatic force gives the centripetal force: \\(\\dfrac{m_e v_n^2}{r_n} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Ze^2}{r_n^2}\\) ... (1)\n" +
        "- Second postulate: \\(m_e v_n r_n = \\dfrac{nh}{2\\pi}\\), so \\(v_n = \\dfrac{nh}{2\\pi m_e r_n}\\) ... (2)\n" +
        "- Put (2) in (1): \\(\\dfrac{n^2 h^2}{4\\pi^2 m_e r_n^2} = \\dfrac{Ze^2}{4\\pi\\varepsilon_0 r_n}\\).\n" +
        "- Cancel one \\(r_n\\) and rearrange: \\(r_n = \\dfrac{\\varepsilon_0 n^2 h^2}{\\pi m_e Z e^2}\\), so \\(r_n \\propto n^2\\).\n" +
        "- Eliminating \\(r_n\\) instead gives the speed: \\(v_n = \\dfrac{Ze^2}{2\\varepsilon_0 h n}\\), so \\(v_n \\propto 1/n\\).\n" +
        "- For hydrogen (Z = 1, n = 1) the radius is the **Bohr radius** \\(a_0 = 0.053\\) nm. In general \\(r_n = a_0 n^2/Z\\).",
      formula: {
        label: "Bohr orbit",
        latex: "r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m_e Z e^2}, \\qquad v_n = \\frac{Z e^2}{2\\varepsilon_0 h n}",
        symbols: [
          { symbol: "\\(\\varepsilon_0\\)", meaning: "permittivity of free space, 8.85 × 10⁻¹² C²/N m²" },
          { symbol: "\\(Z\\)", meaning: "atomic number (1 for hydrogen, 2 for He⁺)" },
          { symbol: "\\(a_0\\)", meaning: "Bohr radius, 0.053 nm" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the radius of the second orbit of singly ionised helium (Z = 2) and compare it with the second orbit of hydrogen. (\\(a_0 = 0.053\\) nm)",
        steps: [
          "Given: \\(n = 2\\), \\(Z = 2\\), \\(a_0 = 0.053\\) nm.",
          "Formula: \\(r_n = \\dfrac{a_0 n^2}{Z}\\).",
          "Helium ion: \\(r_2 = \\dfrac{0.053 \\times 2^2}{2} = 0.106\\) nm.",
          "Hydrogen: \\(r_2 = 0.053 \\times 2^2 = 0.212\\) nm. The helium ion's orbit is half as large, because its nucleus pulls twice as hard.",
        ],
        answer: "0.106 nm, half of hydrogen's 0.212 nm",
      },
      selfCheckExample: {
        prompt: "The speed of the electron in the first orbit of hydrogen is \\(2.19 \\times 10^6\\) m/s. Find its speed in the third orbit.",
        steps: ["\\(v_n \\propto 1/n\\), so \\(v_3 = v_1/3\\).", "\\(v_3 = 2.19 \\times 10^6 / 3 = 7.3 \\times 10^5\\) m/s."],
        answer: "\\(7.3 \\times 10^5\\) m/s",
      },
      practiceSet: [
        { prompt: "By what factor does the radius of a hydrogen orbit grow from n = 2 to n = 6?", answer: "9 times" },
        { prompt: "In which orbit of hydrogen is the radius 0.848 nm? (\\(a_0 = 0.053\\) nm)", answer: "n = 4, since \\(0.848/0.053 = 16 = 4^2\\)" },
        { prompt: "How does the speed of the electron depend on the orbit number n?", answer: "\\(v_n \\propto 1/n\\): it falls as n grows" },
      ],
      pyqExampleId: "86b2410b-bcd0-4bba-8fa8-2652fa4767a0",
      traps: [
        {
          title: "Taking the radius proportional to n",
          body: "The radius goes as \\(n^2\\), not \\(n\\). Going from the fourth orbit to the eighth multiplies it by 4, not 2.",
        },
        {
          title: "Ending the derivation without the result in words",
          body: "After \\(r_n = \\dfrac{\\varepsilon_0 n^2 h^2}{\\pi m_e Z e^2}\\), add that \\(r_n \\propto n^2\\) and that \\(a_0 = 0.053\\) nm for hydrogen. Number the two starting equations so the examiner can follow the substitution.",
        },
        {
          title: "Calling ε₀ the permeability",
          body: "The textbook's line under its Eq. (15.3) calls \\(\\varepsilon_0\\) the permeability of vacuum. It is the **permittivity** of free space; permeability is \\(\\mu_0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-revolution",
      name: "Period, frequency and number of revolutions",
      intuition:
        "Once you know how fast the electron moves and how big its circle is, everything about its going round follows from one idea: one revolution covers the circumference 2πr. Time for one trip is the period; trips per second is the frequency; trips in a given time is frequency times time. Because the radius grows as n² and the speed falls as 1/n, the period grows very fast, as n³.",
      definition:
        "- **Period:** \\(T = \\dfrac{2\\pi r}{v}\\) (time for one revolution).\n" +
        "- **Frequency of revolution:** \\(f = \\dfrac{1}{T} = \\dfrac{v}{2\\pi r}\\) (revolutions per second, unit Hz).\n" +
        "- **Number of revolutions** in a time \\(t\\): \\(N = f\\,t = \\dfrac{t}{T}\\). It is a pure number.\n" +
        "- **Angular speed:** \\(\\omega = \\dfrac{v}{r} = 2\\pi f\\).\n" +
        "- Since \\(r \\propto n^2\\) and \\(v \\propto 1/n\\): \\(T \\propto n^3\\), \\(f \\propto 1/n^3\\), \\(\\omega \\propto 1/n^3\\). The angular speed is largest in the first orbit.",
      formula: {
        label: "Revolution of the electron",
        latex: "T = \\frac{2\\pi r}{v}, \\qquad f = \\frac{v}{2\\pi r}, \\qquad N = f\\,t",
      },
      authoredExample: {
        prompt:
          "In the third orbit of hydrogen the radius is \\(4.77 \\times 10^{-10}\\) m and the speed of the electron is \\(7.3 \\times 10^5\\) m/s. Find the frequency and the period of revolution. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(r = 4.77 \\times 10^{-10}\\) m, \\(v = 7.3 \\times 10^5\\) m/s.",
          "Formula: \\(f = \\dfrac{v}{2\\pi r}\\).",
          "Substitution: \\(f = \\dfrac{7.3 \\times 10^5}{2 \\times 3.142 \\times 4.77 \\times 10^{-10}} = \\dfrac{7.3 \\times 10^5}{2.997 \\times 10^{-9}}\\).",
          "\\(f = 2.44 \\times 10^{14}\\) Hz, and \\(T = 1/f = 4.11 \\times 10^{-15}\\) s.",
        ],
        answer: "\\(f = 2.44 \\times 10^{14}\\) Hz; \\(T = 4.11 \\times 10^{-15}\\) s",
      },
      selfCheckExample: {
        prompt: "An electron moves at \\(1.09 \\times 10^6\\) m/s in an orbit of radius \\(2.12 \\times 10^{-10}\\) m. Find its angular speed.",
        steps: ["\\(\\omega = \\dfrac{v}{r} = \\dfrac{1.09 \\times 10^6}{2.12 \\times 10^{-10}}\\).", "\\(\\omega = 5.14 \\times 10^{15}\\) rad/s."],
        answer: "\\(5.14 \\times 10^{15}\\) rad/s",
      },
      practiceSet: [
        { prompt: "The period of revolution in Bohr's model is proportional to which power of n?", answer: "\\(n^3\\)" },
        { prompt: "The period of revolution in the first orbit of hydrogen is T. What is it in the second orbit?", answer: "8T" },
        { prompt: "In which orbit of hydrogen is the angular speed of the electron the largest?", answer: "The first orbit (n = 1), since \\(\\omega \\propto 1/n^3\\)" },
      ],
      pyqExampleId: "0ebb468a-1715-49a5-a501-fa8b87472744",
      traps: [
        {
          title: "Turning the period formula upside down",
          body: "Period is \\(2\\pi r/v\\) (seconds); frequency is \\(v/2\\pi r\\) (per second). A period of \\(10^{14}\\) s for an electron is a sure sign the formula was flipped.",
        },
        {
          title: "Leaving the radius in ångström",
          body: "Convert first: 1 Å = \\(10^{-10}\\) m and 1 nm = \\(10^{-9}\\) m. A radius left as 0.53 makes the answer wrong by \\(10^{10}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-energy",
      name: "Energy of the electron, excitation and ionisation",
      intuition:
        "The electron's total energy is its kinetic energy plus its electric potential energy. The potential energy is negative and twice as large as the kinetic energy, so the total is negative: the electron is bound, and you must supply energy to free it. Energy zero means the electron is just free, far away at rest. Outer orbits have energies closer to zero, so moving outwards needs energy, and falling inwards gives energy out as light.",
      definition:
        "**Derivation of the energy:**\n" +
        "- Kinetic energy: from \\(\\dfrac{m_e v_n^2}{r_n} = \\dfrac{Ze^2}{4\\pi\\varepsilon_0 r_n^2}\\), \\(\\text{K.E.} = \\dfrac{1}{2}m_e v_n^2 = \\dfrac{Ze^2}{8\\pi\\varepsilon_0 r_n}\\).\n" +
        "- Potential energy: \\(\\text{P.E.} = -\\dfrac{Ze^2}{4\\pi\\varepsilon_0 r_n}\\).\n" +
        "- Total: \\(E_n = \\text{K.E.} + \\text{P.E.} = -\\dfrac{Ze^2}{8\\pi\\varepsilon_0 r_n}\\).\n" +
        "- Put \\(r_n = \\dfrac{\\varepsilon_0 n^2 h^2}{\\pi m_e Z e^2}\\): \\(E_n = -\\dfrac{m_e Z^2 e^4}{8\\varepsilon_0^2 h^2 n^2} = -\\dfrac{13.6\\,Z^2}{n^2}\\) eV.\n" +
        "- So \\(\\text{K.E.} = -E_n\\) and \\(\\text{P.E.} = 2E_n\\). Hydrogen: \\(-13.6, -3.4, -1.51, -0.85\\) eV for n = 1, 2, 3, 4.\n" +
        "- **Ground state:** n = 1, the lowest energy. Orbits with larger n are **excited states**.\n" +
        "- **Excitation energy:** the energy needed to take the electron from the ground state to an excited state. Hydrogen's smallest is \\(-3.4 - (-13.6) = 10.2\\) eV.\n" +
        "- **Ionisation energy:** the least energy that sets the electron in the ground state free (total energy zero): 13.6 eV for hydrogen. This is also the **binding energy** of the hydrogen atom: 13.6 eV is released when a proton and an electron come together from far apart to form the atom.",
      formula: {
        label: "Energy of the nth orbit",
        latex: "E_n = -\\frac{m_e Z^2 e^4}{8\\varepsilon_0^2 h^2 n^2} = -\\frac{13.6\\,Z^2}{n^2}\\ \\text{eV}",
      },
      authoredExample: {
        prompt:
          "For a hydrogen atom, find the energy of the electron in the fourth orbit, the excitation energy of that state, and the energy needed to free the electron from it.",
        steps: [
          "Given: \\(n = 4\\), \\(Z = 1\\).",
          "Formula: \\(E_n = -\\dfrac{13.6}{n^2}\\) eV, so \\(E_4 = -\\dfrac{13.6}{16} = -0.85\\) eV.",
          "Excitation energy: \\(E_4 - E_1 = -0.85 - (-13.6) = 12.75\\) eV.",
          "Energy to free it from n = 4: \\(0 - (-0.85) = 0.85\\) eV.",
        ],
        answer: "\\(E_4 = -0.85\\) eV; excitation energy 12.75 eV; 0.85 eV to free it",
      },
      selfCheckExample: {
        prompt: "Find the energy of the electron in the first orbit of singly ionised helium (Z = 2).",
        steps: ["\\(E_1 = -\\dfrac{13.6 \\times 2^2}{1^2}\\) eV.", "\\(E_1 = -54.4\\) eV."],
        answer: "\\(-54.4\\) eV",
      },
      practiceSet: [
        { prompt: "What is the ionisation energy of a hydrogen atom in its ground state?", answer: "13.6 eV" },
        { prompt: "Why is the total energy of an electron in a Bohr orbit negative?", answer: "It is bound: energy is taken as zero when the electron is free, and energy must be supplied to free it" },
        { prompt: "What is the smallest excitation energy of a hydrogen atom?", answer: "10.2 eV (from n = 1 to n = 2)" },
      ],
      pyqExampleId: "62d4a12d-ec38-4ecd-b1a6-1ad4f2b7d307",
      traps: [
        {
          title: "Dropping the minus sign",
          body: "The total energy of a bound electron is negative, and so is its potential energy. Only the kinetic energy is positive. A positive total energy loses the mark.",
        },
        {
          title: "Saying the energy falls as n grows",
          body: "\\(-1.51\\) eV is greater than \\(-3.4\\) eV. The energy rises towards zero as n grows, which is why moving out needs energy.",
        },
        {
          title: "Copying the textbook's ε₀ without the square",
          body: "The textbook prints Eq. (15.7) with \\(\\varepsilon_0\\) instead of \\(\\varepsilon_0^2\\). Write \\(E_n = -\\dfrac{m_e Z^2 e^4}{8\\varepsilon_0^2 h^2 n^2}\\); without the square the expression is not even an energy.",
        },
      ],
    },
  ],
};
