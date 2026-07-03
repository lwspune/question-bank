import type { SubtopicNote } from "@/app/notes/_types";

export const BOHR_MODEL_NOTE: SubtopicNote = {
  subtopicName: "Bohr's Atomic Model",
  title: "Bohr's Atomic Model",
  oneLineDefinition:
    "Bohr fixed the electron into definite circular orbits of quantized angular momentum, giving exact formulas for the radius, energy and velocity of the electron in any orbit of a single-electron (hydrogen-like) species.",
  whyItMatters:
    "This is the biggest, most computation-heavy subtopic in MHT-CET Structure of Atom — 18 PYQs, mostly one-step plug-ins into three formulas (radius, energy, angular momentum) plus a couple of pure-recall model questions. The recurring pattern is a hydrogen-like ion (He+, Li2+, Be3+, B4+) where you must scale by Z, and the recurring trap is treating a two-electron species like Li+ as hydrogen-like. " +
    "Memorise the four numbers 0.529 Angstrom, 13.6 eV, 2.18e-18 J and 2.18e6 m/s together with their n^2 / Z^2 / 1/n scalings and every question here becomes a gift.",
  concepts: [
    // 0 — Rutherford's nuclear model and its drawbacks (motivates Bohr) — State Board 4.4
    {
      kind: "reference" as const,
      slug: "cetsoa-bohr-rutherford-model",
      name: "Rutherford's nuclear model and its drawbacks",
      intuition:
        "Rutherford's alpha-particle scattering experiment gave the nuclear atom — a tiny dense positive nucleus with electrons revolving around it in mostly empty space. But the model had two fatal flaws that Bohr's postulates were invented to fix, so the paper tests it as a 'which statement is NOT true about Rutherford's model' recall.",
      definition:
        "From the scattering of alpha-particles by a thin gold foil, Rutherford concluded:\n" +
        "- The atom has a very small, dense, **positively charged nucleus** at its centre that holds almost all the mass.\n" +
        "- **Electrons revolve** around the nucleus; most of the atom is **empty space**.\n" +
        "It failed on two counts, both of which Bohr later resolved:\n" +
        "- **Stability** — a revolving electron is accelerating, so by classical electromagnetism it must continuously radiate energy, spiral inward and collapse into the nucleus. Atoms are in fact stable.\n" +
        "- **Line spectrum** — a spiralling electron would emit a continuous spectrum, but hydrogen gives a discrete **line** spectrum.",
      table: {
        columns: ["Aspect", "Rutherford's model", "The problem"],
        rows: [
          {
            cells: [
              "Structure",
              "Tiny dense positive nucleus; electrons revolve around it; atom is mostly empty space.",
              "This part is correct — established by alpha-particle scattering.",
            ],
          },
          {
            cells: [
              "Stability of the atom",
              "Electrons move in circular paths around the nucleus.",
              "A revolving (accelerating) electron must radiate energy continuously and spiral into the nucleus, so the atom should collapse.",
            ],
          },
          {
            cells: [
              "Atomic spectrum",
              "Does not restrict the electron's energy.",
              "Predicts a continuous spectrum, but hydrogen actually shows a discrete line spectrum.",
            ],
          },
        ],
        caption: "Rutherford got the nucleus right but could not explain atomic stability or the line spectrum — Bohr's quantized orbits fixed both.",
      },
      pyqExampleId: "bb6dc789-2692-492d-9ba6-52267e630d5d", // which statement is NOT true about Rutherford's model
      practiceSet: [
        { prompt: "What did Rutherford's alpha-scattering experiment establish about the atom?", answer: "A tiny, dense, positively charged nucleus with electrons revolving around it in mostly empty space." },
        { prompt: "Why could Rutherford's model not explain the stability of the atom?", answer: "A revolving electron continuously radiates energy and would spiral into the nucleus." },
        { prompt: "Which type of spectrum could Rutherford's model not explain?", answer: "The discrete line (emission) spectrum of hydrogen." },
      ],
      traps: [
        {
          title: "Rutherford placed the electrons OUTSIDE the nucleus",
          body:
            "The nucleus holds the protons (and neutrons) and nearly all the mass; the electrons revolve **around** it. A statement putting electrons inside the nucleus, or giving the nucleus a negative charge, is the false one in a 'NOT true about Rutherford's model' question.",
        },
        {
          title: "The stability failure is a CLASSICAL-physics problem",
          body:
            "The collapse prediction comes from classical electromagnetism (an accelerating charge radiates). Bohr did not change the nuclear picture — he **quantized** the orbits (fixed energy levels, no radiation while in an orbit) to rescue stability and explain the line spectrum.",
        },
      ],
    },

    // 1 — postulates + angular momentum quantization
    {
      kind: "formula" as const,
      slug: "cetsoa-bohr-postulates-angular-momentum",
      name: "Postulates and quantized angular momentum",
      visualizationSlug: "atom-bohr-shells",
      intuition:
        "Bohr's key idea: an electron may only occupy certain fixed circular orbits (stationary states) in which it neither absorbs nor emits energy. Only those orbits are allowed whose angular momentum is a whole-number multiple of h/2pi. " +
        "This single quantization rule is what forces the radius and energy to come in discrete steps.",
      definition:
        "Bohr's postulates for a hydrogen-like atom:\n" +
        "- The electron revolves only in certain **stationary orbits** of fixed energy; while in an orbit it does **not** radiate energy.\n" +
        "- The **angular momentum is quantized**: \\(mvr = \\dfrac{nh}{2\\pi}\\), i.e. an integer multiple of \\(\\dfrac{h}{2\\pi}\\).\n" +
        "- Energy is absorbed or emitted **only when the electron jumps** between orbits, with \\(\\Delta E = h\\nu\\).\n" +
        "- So for the \\(n\\)th orbit the angular momentum is simply \\(L = \\dfrac{nh}{2\\pi}\\) — it grows in equal steps of \\(\\dfrac{h}{2\\pi}\\) and is **independent of \\(Z\\)**.",
      formula: {
        label: "Quantized angular momentum",
        latex: "L = mvr = \\dfrac{nh}{2\\pi}",
        symbols: [
          { symbol: "L", meaning: "angular momentum of the electron in the nth orbit" },
          { symbol: "m", meaning: "mass of the electron" },
          { symbol: "v", meaning: "speed of the electron" },
          { symbol: "r", meaning: "radius of the orbit" },
          { symbol: "n", meaning: "principal quantum number (orbit number), 1, 2, 3, ..." },
          { symbol: "h", meaning: "Planck's constant, 6.626e-34 J s" },
        ],
      },
      pyqExampleId: "eac7e894-4649-419b-889e-9bfa7e8a7dfb", // L in 4th orbit of H = 2h/pi
      authoredExample: {
        prompt:
          "What is the angular momentum of an electron in the third orbit of a hydrogen atom, in terms of h?",
        steps: [
          "Angular momentum is quantized: \\(L = \\dfrac{nh}{2\\pi}\\).",
          "For the third orbit, \\(n = 3\\): \\(L = \\dfrac{3h}{2\\pi}\\).",
        ],
        answer: "\\(L = \\dfrac{3h}{2\\pi}\\) (equivalently \\(1.5\\,\\dfrac{h}{\\pi}\\)).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the numerical value of the angular momentum of an electron in the first orbit of a hydrogen atom. (h = 6.626e-34 J s)",
        steps: [
          "First orbit means \\(n = 1\\): \\(L = \\dfrac{nh}{2\\pi} = \\dfrac{1 \\times 6.626 \\times 10^{-34}}{2 \\times 3.14}\\).",
          "\\(L = \\dfrac{6.626 \\times 10^{-34}}{6.28}\\).",
        ],
        answer: "\\(L = 1.05 \\times 10^{-34}\\ \\text{kg m}^2\\,\\text{s}^{-1}\\).",
      },
      practiceSet: [
        { prompt: "Angular momentum of an electron in the 2nd orbit (in terms of h)?", answer: "\\(\\dfrac{2h}{2\\pi} = \\dfrac{h}{\\pi}\\)", method: "L = nh/2pi with n = 2" },
        { prompt: "State Bohr's angular-momentum quantization condition.", answer: "\\(mvr = \\dfrac{nh}{2\\pi}\\)" },
        { prompt: "Does the angular momentum of the nth orbit depend on the atomic number Z?", answer: "No — it depends only on n", method: "L = nh/2pi, no Z" },
        { prompt: "In which orbit does the electron NOT radiate energy according to Bohr?", answer: "In any stationary orbit (it radiates only while jumping between orbits)" },
      ],
      traps: [
        {
          title: "It is n h / 2 pi, not 2 pi n / h",
          body:
            "The correct form is \\(mvr = \\dfrac{nh}{2\\pi}\\). Inverted look-alikes such as \\(mvr = \\dfrac{2\\pi n}{h}\\) or \\(mv = \\dfrac{2\\pi rn}{h}\\) are the standard wrong options — h sits on top, \\(2\\pi\\) underneath.",
        },
        {
          title: "Angular momentum ignores Z",
          body:
            "Radius and energy scale with \\(Z\\), but angular momentum \\(L = \\dfrac{nh}{2\\pi}\\) does **not**. The 4th orbit of \\(\\text{He}^+\\) and the 4th orbit of \\(\\text{H}\\) have the **same** angular momentum.",
        },
      ],
    },

    // 2 — radius of nth orbit
    {
      kind: "formula" as const,
      slug: "cetsoa-bohr-radius",
      name: "Radius of the nth orbit",
      intuition:
        "The orbit gets bigger as you go out (grows as n squared) and smaller as the nucleus pulls harder (shrinks as 1/Z). For hydrogen's first orbit the radius is the Bohr radius, 0.529 Angstrom (52.9 pm). " +
        "For any single-electron ion just take that value, multiply by n squared and divide by Z.",
      definition:
        "Radius of the \\(n\\)th orbit of a hydrogen-like species:\n" +
        "- \\(r_n = 0.529\\,\\dfrac{n^2}{Z}\\ \\text{\\AA} = 52.9\\,\\dfrac{n^2}{Z}\\ \\text{pm}\\).\n" +
        "- The first orbit of hydrogen (\\(n=1,\\ Z=1\\)) is the **Bohr radius**, \\(a_0 = 0.529\\ \\text{\\AA} = 52.9\\ \\text{pm}\\).\n" +
        "- Radius **increases** as \\(n^2\\) and **decreases** as \\(1/Z\\); so a higher charge pulls the electron into a tighter orbit.\n" +
        "- Unit reminder: \\(1\\ \\text{\\AA} = 100\\ \\text{pm} = 10^{-10}\\ \\text{m}\\).",
      formula: {
        label: "Radius of nth orbit",
        latex: "r_n = 0.529\\,\\dfrac{n^2}{Z}\\ \\text{\\AA}",
        symbols: [
          { symbol: "r_n", meaning: "radius of the nth orbit" },
          { symbol: "n", meaning: "orbit number (principal quantum number)" },
          { symbol: "Z", meaning: "atomic number (nuclear charge)" },
          { symbol: "0.529 \\text{\\AA}", meaning: "Bohr radius a_0 (= 52.9 pm)" },
        ],
      },
      pyqExampleId: "5c5820e8-205c-48b2-bf0a-66349b942090", // radius of 3rd orbit of He+ = 238.1 pm
      authoredExample: {
        prompt:
          "Calculate the radius of the second orbit of a hydrogen atom.",
        steps: [
          "\\(r_n = 52.9\\,\\dfrac{n^2}{Z}\\ \\text{pm}\\); for hydrogen \\(Z = 1\\), and here \\(n = 2\\).",
          "\\(r_2 = 52.9 \\times \\dfrac{4}{1} = 52.9 \\times 4\\).",
        ],
        answer: "\\(r_2 = 211.6\\ \\text{pm}\\ (= 2.116\\ \\text{\\AA})\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the radius of the fourth orbit of the B4+ ion. (atomic number of boron = 5)",
        steps: [
          "\\(r_n = 52.9\\,\\dfrac{n^2}{Z}\\ \\text{pm}\\); \\(\\text{B}^{4+}\\) is hydrogen-like with \\(Z = 5\\), \\(n = 4\\).",
          "\\(r_4 = 52.9 \\times \\dfrac{16}{5} = 52.9 \\times 3.2\\).",
        ],
        answer: "\\(r_4 = 169.3\\ \\text{pm}\\).",
      },
      practiceSet: [
        { prompt: "Radius of the first orbit of He+ (Z = 2)?", answer: "26.45 pm", method: "52.9 x 1/2" },
        { prompt: "Radius of the first orbit of Li2+ (Z = 3)?", answer: "17.63 pm", method: "52.9 x 1/3" },
        { prompt: "Radius of the fourth orbit of hydrogen?", answer: "846.4 pm", method: "52.9 x 16/1 = 0.529 x 16 Angstrom" },
        { prompt: "Radius of the fourth orbit of Be3+ (Z = 4)?", answer: "211.6 pm", method: "52.9 x 16/4 = 52.9 x 4" },
        { prompt: "What is the value of the Bohr radius in Angstrom?", answer: "0.529 Angstrom (= 52.9 pm)" },
      ],
      traps: [
        {
          title: "Divide by Z for ions",
          body:
            "The bare formula \\(r_n = 0.529\\,n^2\\ \\text{\\AA}\\) is only for **hydrogen** (\\(Z=1\\)). For \\(\\text{He}^+,\\ \\text{Li}^{2+},\\ \\text{Be}^{3+},\\ \\text{B}^{4+}\\) you must divide by \\(Z = 2, 3, 4, 5\\) — forgetting this gives an answer that is \\(Z\\) times too large.",
        },
        {
          title: "Angstrom vs pm",
          body:
            "Answers are often listed in **pm**. Convert: \\(0.529\\ \\text{\\AA} = 52.9\\ \\text{pm}\\), so multiply an Angstrom answer by 100. \\(r_4(\\text{H}) = 8.464\\ \\text{\\AA} = 846.4\\ \\text{pm}\\).",
        },
      ],
    },

    // 3 — energy of nth orbit
    {
      kind: "formula" as const,
      slug: "cetsoa-bohr-energy",
      name: "Energy of the nth orbit",
      intuition:
        "The electron is bound to the nucleus, so its total energy is negative — most negative (most tightly held) in the first orbit and rising toward zero as n grows. A higher nuclear charge binds it harder, so energy scales as Z squared. " +
        "The ground-state energy of hydrogen is the reference number: -13.6 eV, or -2.18e-18 J.",
      definition:
        "Energy of the electron in the \\(n\\)th orbit of a hydrogen-like species:\n" +
        "- \\(E_n = -13.6\\,\\dfrac{Z^2}{n^2}\\ \\text{eV} = -2.18 \\times 10^{-18}\\,\\dfrac{Z^2}{n^2}\\ \\text{J}\\).\n" +
        "- Per mole: \\(E_n = -1312\\,\\dfrac{Z^2}{n^2}\\ \\text{kJ mol}^{-1}\\).\n" +
        "- The energy is **always negative** (a bound electron); its magnitude **falls** as \\(1/n^2\\) and **rises** as \\(Z^2\\).\n" +
        "- For hydrogen (\\(Z=1,\\ n=1\\)) the ground state is \\(-13.6\\ \\text{eV} = -2.18 \\times 10^{-18}\\ \\text{J}\\); the constant \\(R_H = 2.18 \\times 10^{-18}\\ \\text{J}\\) is this same number.",
      formula: {
        label: "Energy of nth orbit",
        latex: "E_n = -2.18 \\times 10^{-18}\\,\\dfrac{Z^2}{n^2}\\ \\text{J} = -13.6\\,\\dfrac{Z^2}{n^2}\\ \\text{eV}",
        symbols: [
          { symbol: "E_n", meaning: "energy of the electron in the nth orbit (negative)" },
          { symbol: "Z", meaning: "atomic number" },
          { symbol: "n", meaning: "orbit number" },
          { symbol: "R_H", meaning: "2.18e-18 J = 13.6 eV, the hydrogen ground-state magnitude" },
        ],
      },
      pyqExampleId: "48b1e4cd-8e70-4306-8832-eb621bd2a59a", // E of 3rd orbit of He+ = -9.69e-19 J
      authoredExample: {
        prompt:
          "Calculate the energy associated with the first orbit of the He+ ion in joules. (R_H = 2.18e-18 J)",
        steps: [
          "\\(E_n = -R_H\\,\\dfrac{Z^2}{n^2}\\); \\(\\text{He}^+\\) has \\(Z = 2\\), and the first orbit is \\(n = 1\\).",
          "\\(E_1 = -2.18 \\times 10^{-18} \\times \\dfrac{2^2}{1^2} = -2.18 \\times 10^{-18} \\times 4\\).",
        ],
        answer: "\\(E_1 = -8.72 \\times 10^{-18}\\ \\text{J}\\ (= -54.4\\ \\text{eV})\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the energy associated with the fourth orbit of a hydrogen atom? (R_H = 2.18e-18 J)",
        steps: [
          "Hydrogen: \\(Z = 1\\); fourth orbit \\(n = 4\\). \\(E_n = -\\dfrac{R_H}{n^2}\\).",
          "\\(E_4 = -\\dfrac{2.18 \\times 10^{-18}}{16} = -0.136 \\times 10^{-18}\\ \\text{J}\\).",
        ],
        answer: "\\(E_4 = -0.136 \\times 10^{-18}\\ \\text{J}\\ (= -1.36 \\times 10^{-19}\\ \\text{J})\\).",
      },
      practiceSet: [
        { prompt: "Energy of the first orbit of hydrogen in eV?", answer: "-13.6 eV", method: "-13.6 x 1/1" },
        { prompt: "Energy of the first orbit of He+ in eV?", answer: "-54.4 eV", method: "-13.6 x 4/1" },
        { prompt: "Energy of the third orbit of He+ in joules?", answer: "\\(-9.69 \\times 10^{-19}\\) J", method: "-2.18e-18 x 4/9" },
        { prompt: "Is the energy of a bound electron positive or negative?", answer: "Negative" },
        { prompt: "Energy of the second orbit of hydrogen in eV?", answer: "-3.4 eV", method: "-13.6/4" },
      ],
      traps: [
        {
          title: "Keep the minus sign",
          body:
            "Orbital energy is **negative** because the electron is bound. Options that drop the sign (a positive energy) are wrong. The magnitude is largest for \\(n=1\\) and approaches 0 as \\(n \\to \\infty\\).",
        },
        {
          title: "Z is squared, n is squared",
          body:
            "Both appear squared: \\(E_n \\propto \\dfrac{Z^2}{n^2}\\). For \\(\\text{He}^+\\) (\\(Z=2\\)) the energy is \\(2^2 = 4\\) times more negative than hydrogen at the same \\(n\\) — a factor of 4, not 2.",
        },
      ],
    },

    // 4 — velocity of electron
    {
      kind: "formula" as const,
      slug: "cetsoa-bohr-velocity",
      name: "Velocity of the electron in the nth orbit",
      intuition:
        "The electron moves fastest in the innermost orbit and slows down as it moves out; a heavier nuclear charge speeds it up. So velocity rises with Z and falls with n — the mirror image of the radius behaviour. " +
        "The first-orbit speed in hydrogen is the reference value, 2.18e6 m/s (about 1/137 the speed of light).",
      definition:
        "Speed of the electron in the \\(n\\)th orbit of a hydrogen-like species:\n" +
        "- \\(v_n = 2.18 \\times 10^{6}\\,\\dfrac{Z}{n}\\ \\text{m s}^{-1}\\).\n" +
        "- Velocity **increases** with \\(Z\\) and **decreases** with \\(n\\) (as \\(1/n\\), not \\(1/n^2\\)).\n" +
        "- For hydrogen's first orbit (\\(Z=1,\\ n=1\\)) this gives \\(2.18 \\times 10^{6}\\ \\text{m s}^{-1}\\).\n" +
        "- It follows from the quantization rule: since \\(mvr = \\dfrac{nh}{2\\pi}\\) and \\(r \\propto \\dfrac{n^2}{Z}\\), the \\(n^2\\) cancels one \\(n\\) to leave \\(v \\propto \\dfrac{Z}{n}\\).",
      formula: {
        label: "Velocity of electron in nth orbit",
        latex: "v_n = 2.18 \\times 10^{6}\\,\\dfrac{Z}{n}\\ \\text{m s}^{-1}",
        symbols: [
          { symbol: "v_n", meaning: "speed of the electron in the nth orbit" },
          { symbol: "Z", meaning: "atomic number" },
          { symbol: "n", meaning: "orbit number" },
          { symbol: "2.18 \\times 10^{6}", meaning: "first-orbit speed in hydrogen (m/s)" },
        ],
      },
      authoredExample: {
        prompt:
          "Calculate the velocity of the electron in the first orbit of the He+ ion.",
        steps: [
          "\\(v_n = 2.18 \\times 10^{6}\\,\\dfrac{Z}{n}\\ \\text{m s}^{-1}\\); \\(\\text{He}^+\\) has \\(Z = 2\\), first orbit \\(n = 1\\).",
          "\\(v_1 = 2.18 \\times 10^{6} \\times \\dfrac{2}{1}\\).",
        ],
        answer: "\\(v_1 = 4.36 \\times 10^{6}\\ \\text{m s}^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the velocity of the electron in the second orbit of a hydrogen atom.",
        steps: [
          "\\(v_n = 2.18 \\times 10^{6}\\,\\dfrac{Z}{n}\\); hydrogen \\(Z = 1\\), second orbit \\(n = 2\\).",
          "\\(v_2 = 2.18 \\times 10^{6} \\times \\dfrac{1}{2}\\).",
        ],
        answer: "\\(v_2 = 1.09 \\times 10^{6}\\ \\text{m s}^{-1}\\).",
      },
      practiceSet: [
        { prompt: "Velocity of the electron in the first orbit of hydrogen?", answer: "\\(2.18 \\times 10^{6}\\) m/s", method: "2.18e6 x 1/1" },
        { prompt: "Velocity in the third orbit of hydrogen?", answer: "\\(0.727 \\times 10^{6}\\) m/s", method: "2.18e6 x 1/3" },
        { prompt: "Velocity in the first orbit of Li2+ (Z = 3)?", answer: "\\(6.54 \\times 10^{6}\\) m/s", method: "2.18e6 x 3/1" },
        { prompt: "Does the electron move faster in the 1st or the 4th orbit?", answer: "The 1st orbit", method: "v proportional to 1/n" },
      ],
      traps: [
        {
          title: "Velocity goes as 1/n, not 1/n squared",
          body:
            "Radius scales as \\(n^2/Z\\) and energy as \\(Z^2/n^2\\), but velocity scales as \\(Z/n\\) — a single power of each. Don't square the \\(n\\) here.",
        },
        {
          title: "Higher Z, faster electron",
          body:
            "A larger nuclear charge pulls the electron in tighter (smaller \\(r\\)) AND makes it move faster (larger \\(v\\)). So \\(\\text{He}^+\\) is faster than \\(\\text{H}\\) in the same orbit number.",
        },
      ],
    },

    // 5 — energy difference between levels + ionization energy
    {
      kind: "formula" as const,
      slug: "cetsoa-bohr-transition-ionization",
      name: "Energy difference between levels and ionization energy",
      intuition:
        "To move an electron up you must supply the energy gap between the two orbits; the electron drops back down by emitting that same gap as a photon. Removing the electron completely (to n = infinity) is ionization — and its cost is just the energy of the level you started from, with the sign flipped. " +
        "From the ground state of hydrogen that cost is exactly 13.6 eV.",
      definition:
        "Transitions and ionization for a hydrogen-like species:\n" +
        "- **Energy gap** between orbits \\(n_1\\) and \\(n_2\\): \\(\\Delta E = E_{n_2} - E_{n_1} = 13.6\\,Z^2\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\ \\text{eV}\\) (positive when absorbed).\n" +
        "- **Ionization energy** = energy to take the electron from its orbit to \\(n = \\infty\\) (where \\(E = 0\\)): \\(\\text{I.E.} = E_\\infty - E_n = 0 - E_n = +13.6\\,\\dfrac{Z^2}{n^2}\\ \\text{eV}\\).\n" +
        "- From the **ground state** (\\(n=1\\)): \\(\\text{I.E.} = 13.6\\,Z^2\\ \\text{eV}\\). For hydrogen this is **13.6 eV** (\\(= 2.18 \\times 10^{-18}\\ \\text{J}\\)).\n" +
        "- The emitted/absorbed photon carries \\(\\Delta E = h\\nu = \\dfrac{hc}{\\lambda}\\).",
      formula: {
        label: "Energy gap between two orbits",
        latex: "\\Delta E = 13.6\\,Z^2\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\ \\text{eV}",
        symbols: [
          { symbol: "\\Delta E", meaning: "energy absorbed (n1 to n2, up) or emitted (down)" },
          { symbol: "n_1", meaning: "lower orbit number" },
          { symbol: "n_2", meaning: "higher orbit number" },
          { symbol: "Z", meaning: "atomic number" },
        ],
      },
      pyqExampleId: "338e8e1b-c196-4339-846a-c8d27be50ffc", // E of first orbit of He+ = -8.72e-18 J (magnitude = I.E.)
      authoredExample: {
        prompt:
          "Calculate the ionization energy of a hydrogen atom in its ground state, in joules. (R_H = 2.18e-18 J)",
        steps: [
          "Ionization removes the electron from \\(n = 1\\) to \\(n = \\infty\\), where \\(E = 0\\).",
          "\\(\\text{I.E.} = 0 - E_1 = -\\left(-2.18 \\times 10^{-18} \\times \\dfrac{1^2}{1^2}\\right)\\).",
        ],
        answer: "\\(\\text{I.E.} = 2.18 \\times 10^{-18}\\ \\text{J}\\ (= 13.6\\ \\text{eV})\\).",
      },
      selfCheckExample: {
        prompt:
          "How much energy (in eV) is needed to excite the electron in a hydrogen atom from the first orbit to the second orbit?",
        steps: [
          "\\(\\Delta E = 13.6\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\) with \\(n_1 = 1,\\ n_2 = 2,\\ Z = 1\\).",
          "\\(\\Delta E = 13.6\\left(\\dfrac{1}{1} - \\dfrac{1}{4}\\right) = 13.6 \\times \\dfrac{3}{4}\\).",
        ],
        answer: "\\(\\Delta E = 10.2\\ \\text{eV}\\) (absorbed).",
      },
      practiceSet: [
        { prompt: "Ionization energy of hydrogen from its ground state (in eV)?", answer: "13.6 eV", method: "13.6 x Z^2 = 13.6 x 1" },
        { prompt: "Ionization energy of He+ from its ground state (in eV)?", answer: "54.4 eV", method: "13.6 x Z^2 = 13.6 x 4" },
        { prompt: "Energy emitted when an electron falls from n = 2 to n = 1 in hydrogen?", answer: "10.2 eV", method: "13.6(1 - 1/4)" },
        { prompt: "What is the energy of a hydrogen-like electron at n = infinity?", answer: "0 (zero)" },
      ],
      traps: [
        {
          title: "Ionization energy is positive",
          body:
            "The orbital energy \\(E_n\\) is negative, but the **ionization energy** you must supply is its magnitude with a plus sign: \\(\\text{I.E.} = -E_n = +13.6\\,Z^2/n^2\\ \\text{eV}\\). For H from \\(n=1\\) it is \\(+13.6\\ \\text{eV}\\), not \\(-13.6\\).",
        },
        {
          title: "Bigger n subtracted from smaller n",
          body:
            "In \\(\\Delta E = 13.6\\,Z^2\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\), the **lower** orbit \\(n_1\\) supplies the first (larger) term. Swapping \\(n_1\\) and \\(n_2\\) flips the sign — keep \\(n_1 < n_2\\) for a positive absorbed energy.",
        },
      ],
    },

    // 6 — hydrogen-like species + model successes/failures
    {
      kind: "formula" as const,
      slug: "cetsoa-bohr-hydrogen-like-and-limits",
      name: "Hydrogen-like species and limitations of the model",
      intuition:
        "Every Bohr formula holds only for a single-electron (hydrogen-like) species — H, He+, Li2+, Be3+, B4+ — because with two or more electrons the electron-electron repulsion breaks the simple picture. That same repulsion is why Bohr's model fails for any atom bigger than hydrogen, and why it cannot explain fine spectral detail. " +
        "So the bank tests two recall points: spotting the non-hydrogen-like ion, and naming what Bohr's model could not do.",
      definition:
        "**Hydrogen-like (single-electron) species** — the only ones the formulas apply to:\n" +
        "- Must have **exactly one electron**: \\(\\text{H}\\) (Z=1), \\(\\text{He}^+\\) (Z=2), \\(\\text{Li}^{2+}\\) (Z=3), \\(\\text{Be}^{3+}\\) (Z=4), \\(\\text{B}^{4+}\\) (Z=5).\n" +
        "- \\(\\text{Li}^{+}\\) has **two** electrons, so it is **NOT** hydrogen-like.\n\n" +
        "**What Bohr's model could NOT explain (its failures):**\n" +
        "- The **spectra of multi-electron atoms** (only hydrogen works).\n" +
        "- The **finer details** (splitting) of even the hydrogen spectrum.\n" +
        "- The **Zeeman effect** (splitting of lines in a magnetic field) and the **Stark effect** (in an electric field).\n" +
        "- The **ability of atoms to form chemical bonds** (molecules).\n\n" +
        "Note the contrast with **Rutherford's** model, which could not describe the **energies or arrangement** of electrons at all — that gap is exactly what Bohr filled.",
      formula: {
        label: "Test for a hydrogen-like species",
        latex: "\\text{electrons} = Z - (\\text{charge}) = 1",
        symbols: [
          { symbol: "Z", meaning: "atomic number (number of protons)" },
          { symbol: "\\text{charge}", meaning: "the positive charge on the ion" },
          { symbol: "= 1", meaning: "hydrogen-like requires exactly one remaining electron" },
        ],
      },
      pyqExampleId: "1dbd0bba-91a1-4b32-a1f0-29720992e3c3", // which is NOT hydrogen-like -> Li+
      authoredExample: {
        prompt:
          "Which of these is NOT a hydrogen-like species: He+, Li2+, Li+, Be3+?",
        steps: [
          "Hydrogen-like means exactly one electron. Electrons remaining = Z minus the positive charge.",
          "\\(\\text{He}^+\\): \\(2-1 = 1\\). \\(\\text{Li}^{2+}\\): \\(3-2 = 1\\). \\(\\text{Be}^{3+}\\): \\(4-3 = 1\\). All have one electron.",
          "\\(\\text{Li}^{+}\\): \\(3-1 = 2\\) electrons — two electrons, so not hydrogen-like.",
        ],
        answer: "\\(\\text{Li}^{+}\\) is NOT hydrogen-like (it has 2 electrons).",
      },
      selfCheckExample: {
        prompt:
          "Which one of the following statements about the Bohr model is NOT correct: (a) it fails for atomic spectra other than hydrogen, (b) it fails to account for finer details of the hydrogen spectrum, (c) it explains the Zeeman effect, (d) it fails to explain chemical bonding?",
        steps: [
          "Bohr's model works only for one-electron systems and gives only the gross line positions of hydrogen.",
          "It could NOT explain the Zeeman effect (line splitting in a magnetic field).",
          "So the statement that it 'explains the Zeeman effect' is the incorrect one.",
        ],
        answer: "(c) It explains the Zeeman effect — this is FALSE; Bohr's model fails to explain it.",
      },
      practiceSet: [
        { prompt: "How many electrons does a hydrogen-like species have?", answer: "Exactly one" },
        { prompt: "Is Li+ hydrogen-like? Why/why not?", answer: "No — it has 2 electrons (Z = 3, charge +1)" },
        { prompt: "Name one effect the Bohr model failed to explain.", answer: "The Zeeman effect (or Stark effect / multi-electron spectra / bonding)" },
        { prompt: "Which model — Rutherford or Bohr — describes the energies of electrons?", answer: "Bohr's model", method: "Rutherford's did not describe electron energies" },
      ],
      traps: [
        {
          title: "Bohr formulas are single-electron only",
          body:
            "\\(r_n,\\ E_n,\\ v_n\\) apply only to **one-electron** species. Do not use them for \\(\\text{Li}^+\\), \\(\\text{He}\\), or any neutral/multi-electron atom — count the electrons (\\(Z\\) minus the charge) first.",
        },
        {
          title: "Bohr explains hydrogen, not the Zeeman effect",
          body:
            "Among 'which is NOT correct about Bohr' options, the false one is usually **'it explains the Zeeman effect'**. Bohr's model FAILED to explain the Zeeman effect, multi-electron spectra, fine structure, and chemical bonding.",
        },
        {
          title: "Rutherford vs Bohr on electron energy",
          body:
            "A 'not true about Rutherford's model' question is answered by **'it describes the energies of electrons'** — Rutherford's model did **not**; describing electron energies is **Bohr's** contribution.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Atomic models — Dalton, Rutherford, Bohr (NDA)",
      href: "/notes/nda-chemistry/atomic-structure",
    },
  ],
};
