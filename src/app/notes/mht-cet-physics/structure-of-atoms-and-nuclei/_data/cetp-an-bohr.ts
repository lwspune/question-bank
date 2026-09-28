import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/structure-of-atoms-and-nuclei";

export const BOHR_NOTE: SubtopicNote = {
  subtopicName: "Bohr Model and Atomic Properties",
  title: "Bohr's Model: How Each Orbit Scales With n",
  oneLineDefinition:
    "In Bohr's model the electron's angular momentum is a whole number of h/2π, which fixes each orbit: the radius grows as n², the speed falls as 1/n, and the energy is −13.6 Z²/n² eV, so every other orbital quantity is a power of n.",
  whyItMatters:
    "39 PYQs, 11 of them HARD — the largest page in the chapter. Twenty-two ask how an orbit property scales with n: radius, speed, period, acceleration, the field at the nucleus, the de Broglie wavelength. " +
    "Twelve are the energy levels and the photon between two of them, and five apply the quantum condition outside the atom — to a rotating molecule and to a charge circling in a magnetic field. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-an-orbit-scaling",
      name: "Radius, Speed and Everything Built From Them",
      intuition:
        "Two equations fix an orbit: the Coulomb pull supplies the centripetal force, and mvr = nh/2π. Solving them gives r ∝ n²/Z and v ∝ Z/n. Every other quantity is built from these two, so its power of n follows by counting: the period 2πr/v goes as n³, the revolution frequency as n⁻³, the acceleration v²/r and the force as n⁻⁴, the current e·f as n⁻³, and the field at the nucleus μ₀I/2r as n⁻⁵. The de Broglie wavelength h/mv grows as n, and exactly n wavelengths fit round the orbit. Read 'first excited state' as n = 2 and 'second excited state' as n = 3.",
      definition:
        "- \\(r_n = \\dfrac{\\varepsilon_0 n^2 h^2}{\\pi m Z e^2} = 0.53\\,\\dfrac{n^2}{Z}\\) Å; \\(v_n = \\dfrac{Ze^2}{2\\varepsilon_0 n h} \\approx 2.2\\times10^6\\,\\dfrac{Z}{n}\\) m/s.\n" +
        "- \\(L = \\dfrac{nh}{2\\pi}\\): one step in n changes L by \\(\\dfrac{h}{2\\pi} \\approx 1.05\\times10^{-34}\\) J s.\n" +
        "- Period \\(\\propto n^3\\) (\\(T_n = \\dfrac{4\\varepsilon_0^2 n^3 h^3}{me^4}\\)); frequency \\(\\propto n^{-3}\\); acceleration and force \\(\\propto n^{-4}\\).\n" +
        "- Current \\(\\propto n^{-3}\\); field at the nucleus \\(\\dfrac{\\mu_0 I}{2r} \\propto n^{-5}\\).\n" +
        "- de Broglie: \\(\\lambda_n = \\dfrac{2\\pi r_n}{n} \\propto n\\) (third orbit: \\(6\\pi a_0\\)).\n" +
        "- Area of the orbit \\(\\propto r^2 \\propto n^4\\); moment of inertia \\(mr^2 \\propto n^4\\).",
      formula: {
        label: "Bohr orbit",
        latex: "r_n \\propto \\frac{n^2}{Z}, \\qquad v_n \\propto \\frac{Z}{n}, \\qquad mvr = \\frac{nh}{2\\pi}",
      },
      authoredExample: {
        prompt: "The electron in hydrogen moves from n = 1 to n = 3. By what factor do its speed and orbital period change?",
        steps: ["Speed ∝ 1/n: it becomes one third.", "Period ∝ n³: it becomes 27 times longer."],
        answer: "Speed ÷ 3; period × 27",
      },
      selfCheckExample: {
        prompt: "The first Bohr radius is 0.53 Å. Radius of the orbit n = 3?",
        steps: ["r ∝ n²: 9 × 0.53."],
        answer: "4.77 Å",
      },
      practiceSet: [
        { prompt: "Frequency of revolution in the nth orbit is proportional to?", answer: "n⁻³" },
        { prompt: "Ratio of orbit areas for the second excited state to the first excited state?", answer: "81 : 16" },
      ],
      pyqExampleId: "4d4ed09c-7b26-4f3f-b30e-53ea0c21a4ca",
      traps: [
        {
          title: "Numbering the excited states from 1",
          body:
            "The ground state is n = 1, so the FIRST excited state is n = 2 and the third excited state is n = 4. Counting from 1 puts every ratio one orbit out.",
        },
        {
          title: "Stopping at the current for the field at the nucleus",
          body:
            "The current goes as n⁻³, but the field is μ₀I/2r, and r grows as n². The field therefore goes as n⁻⁵, not n⁻³.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-an-energy-levels",
      name: "Energy Levels and the Photon Between Them",
      intuition:
        "The total energy of the nth orbit is E_n = −13.6 Z²/n² eV. It is negative because the electron is bound, and it rises towards zero as n grows. The kinetic energy is −E and the potential energy is 2E, so moving outward raises the potential energy (less negative) and lowers the kinetic energy. A jump between two levels emits or absorbs one photon carrying the difference, hν = E_i − E_f. Exciting hydrogen from the ground state to n = 2 needs 10.2 eV; removing the electron entirely needs 13.6 eV. The photon also carries momentum h/λ, so the atom recoils when it emits.",
      definition:
        "- \\(E_n = -\\dfrac{13.6\\,Z^2}{n^2}\\) eV: \\(-13.6, -3.4, -1.51, -0.85\\) eV for hydrogen.\n" +
        "- \\(KE = -E\\), \\(PE = 2E\\): at \\(E = -3.4\\) eV, KE = 3.4 eV, PE = −6.8 eV.\n" +
        "- Photon: \\(h\\nu = E_i - E_f\\); \\(1 \\to 2\\) needs 10.2 eV; ionisation from the ground state 13.6 eV.\n" +
        "- Between atoms: \\(E \\propto \\dfrac{Z^2}{n^2}\\) (H in n = 3 has E; He⁺ in n = 5 has \\(\\dfrac{36E}{25}\\)).\n" +
        "- Recoil of the emitting atom: \\(Mv = \\dfrac{h}{\\lambda}\\).",
      formula: {
        label: "Energy of the nth level",
        latex: "E_n = -\\frac{13.6\\,Z^2}{n^2}\\ \\text{eV}, \\qquad h\\nu = E_i - E_f",
      },
      authoredExample: {
        prompt: "An electron in hydrogen has total energy −1.51 eV. Which orbit is it in, and what are its kinetic and potential energies?",
        steps: ["13.6/n² = 1.51 ⇒ n = 3.", "KE = +1.51 eV; PE = 2E = −3.02 eV."],
        answer: "n = 3; KE 1.51 eV; PE −3.02 eV",
      },
      selfCheckExample: {
        prompt: "The ground-state energy of hydrogen is E. Energy of Li²⁺ (Z = 3) in n = 3?",
        steps: ["Z²/n² = 9/9 = 1."],
        answer: "E",
      },
      practiceSet: [
        { prompt: "Ratio of photon energies for 2 → 1 and ∞ → 2 in hydrogen?", answer: "3 : 1" },
        { prompt: "Hydrogen is raised from the ground state. Its PE and KE?", answer: "PE increases, KE decreases" },
      ],
      pyqExampleId: "2bb4c644-2230-4f82-8e73-51ddb75ee9b9",
      traps: [
        {
          title: "Saying the potential energy falls as the electron moves out",
          body:
            "The potential energy is negative and becomes LESS negative outward: −6.8 eV at n = 2 is greater than −27.2 eV at n = 1. It increases, while the kinetic energy decreases.",
        },
        {
          title: "Forgetting Z² when changing the atom",
          body:
            "He⁺ and Li²⁺ are hydrogen-like but their levels are Z² deeper. Compare two atoms with E ∝ Z²/n², both factors at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-an-quantization-beyond",
      name: "The Quantum Condition Outside the Atom",
      intuition:
        "The papers apply L = nh/2π to two other systems. A diatomic molecule of moment of inertia I rotating with L = nh/2π has energy L²/2I = n²h²/8π²I. A charge q moving in a circle in a magnetic field B has qBR = mv; combined with mvR = nh/2π, vR = nh/2πm, and the energy ½mv² = ½qB·vR = nqBh/4πm, which grows as n, not n².",
      definition:
        "- **Rotor**: \\(E_n = \\dfrac{L^2}{2I} = \\dfrac{n^2 h^2}{8\\pi^2 I}\\) (n = 2: \\(\\dfrac{h^2}{2\\pi^2 I}\\); n = 3: \\(\\dfrac{9h^2}{8\\pi^2 I}\\)).\n" +
        "- **Charge in a field**: \\(qBR = mv\\) and \\(mvR = \\dfrac{nh}{2\\pi}\\) give \\(E_n = \\dfrac{nqBh}{4\\pi m}\\).",
      formula: {
        label: "Rotor and charge in a field",
        latex: "E_{\\text{rot}} = \\frac{n^2 h^2}{8\\pi^2 I}, \\qquad E_{B} = \\frac{n\\,qBh}{4\\pi m}",
      },
      authoredExample: {
        prompt: "Rotational energy of a diatomic molecule of moment of inertia I in the level n = 1?",
        steps: ["L = h/2π.", "E = L²/2I = h²/(8π²I)."],
        answer: "h²/(8π²I)",
      },
      selfCheckExample: {
        prompt: "Same molecule, level n = 4?",
        steps: ["16 × h²/(8π²I)."],
        answer: "2h²/(π²I)",
      },
      practiceSet: [
        { prompt: "Charge q, mass m, field B: energy in level n = 2?", answer: "qBh/(2πm)" },
      ],
      pyqExampleId: "6a1f63a2-5cf7-478a-8a78-c14fe8253adb",
      traps: [
        {
          title: "Writing L = nh",
          body:
            "Bohr's condition is L = nh/2π. Dropping the 2π puts a factor 4π² into every energy, and the options include that wrong answer.",
        },
      ],
    },
  ],
  related: [
    { label: "Hydrogen Spectrum — photons between these levels", href: `${BASE}/cetp-an-spectrum` },
    { label: "Nuclei — binding energy and radioactive decay", href: `${BASE}/cetp-an-nuclei` },
  ],
};
