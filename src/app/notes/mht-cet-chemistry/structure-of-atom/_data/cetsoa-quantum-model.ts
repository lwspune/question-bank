import type { SubtopicNote } from "@/app/notes/_types";

export const QUANTUM_MODEL_NOTE: SubtopicNote = {
  subtopicName:
    "Quantum Mechanical Model, de Broglie, Heisenberg and Quantum Numbers",
  title:
    "Quantum Mechanical Model — de Broglie, Heisenberg and Quantum Numbers",
  oneLineDefinition:
    "The electron is both a wave and a particle: de Broglie gives its wavelength, Heisenberg says you can never pin down its position and momentum together, and four quantum numbers act as the electron's address — naming its shell, subshell, orbital and spin.",
  whyItMatters:
    "Thirteen PYQs, and the bank tests four reliable patterns: a one-line recall of Heisenberg's principle, a plug-in of de Broglie's formula, a quantum-number-to-orbital label (n=3, l=2 gives 3d), and the (n+l) rule for orbital energy order. " +
    "Every question is a direct application — no derivations. Learn the four formulas and the l-to-shape mapping and the whole subtopic is arithmetic.",
  concepts: [
    // 1. de Broglie wavelength (FORMULA)
    {
      kind: "formula" as const,
      slug: "cetsoa-qm-de-broglie",
      name: "de Broglie wavelength — wave-particle duality",
      intuition:
        "de Broglie said every moving particle also behaves as a wave, and its wavelength is just Planck's constant divided by its momentum. " +
        "Heavier or faster particles have shorter wavelengths, which is why the wave nature only shows up for tiny particles like electrons.",
      definition:
        "de Broglie's hypothesis links a particle's momentum to a wavelength:\n" +
        "- Wavelength \\(\\lambda = \\dfrac{h}{mv} = \\dfrac{h}{p}\\), where \\(p = mv\\) is the momentum.\n" +
        "- Rearranged, the **momentum** is \\(p = \\dfrac{h}{\\lambda}\\) — this is the form the bank uses when it gives you \\(\\lambda\\) and asks for \\(p\\).\n" +
        "- \\(\\lambda \\propto \\dfrac{1}{mv}\\): a larger mass or speed means a **smaller** wavelength, so macroscopic objects have immeasurably tiny wavelengths.\n" +
        "- Watch the units: \\(h = 6.63 \\times 10^{-34}\\,\\text{J s}\\), so with \\(m\\) in kg and \\(v\\) in \\(\\text{m s}^{-1}\\), \\(\\lambda\\) comes out in metres.",
      formula: {
        label: "de Broglie wavelength and momentum",
        latex:
          "\\lambda = \\dfrac{h}{mv} = \\dfrac{h}{p} \\qquad p = \\dfrac{h}{\\lambda}",
        symbols: [
          { symbol: "\\(\\lambda\\)", meaning: "de Broglie wavelength (m)" },
          { symbol: "h", meaning: "Planck's constant, 6.63e-34 J s" },
          { symbol: "m", meaning: "mass of the particle (kg)" },
          { symbol: "v", meaning: "velocity of the particle (m/s)" },
          { symbol: "p", meaning: "momentum, p = mv (kg m/s)" },
        ],
      },
      pyqExampleId: "05c4b0ea-4e8d-442c-a50c-936a71cf1d4b", // lambda for m=6.64e-27, v=3e3 -> 0.0333 nm
      authoredExample: {
        prompt:
          "Find the de Broglie wavelength of an electron of mass \\(9.1 \\times 10^{-31}\\,\\text{kg}\\) moving with a velocity of \\(2 \\times 10^{6}\\,\\text{m s}^{-1}\\). (\\(h = 6.63 \\times 10^{-34}\\,\\text{J s}\\))",
        steps: [
          "Use \\(\\lambda = \\dfrac{h}{mv}\\).",
          "Denominator: \\(mv = 9.1 \\times 10^{-31} \\times 2 \\times 10^{6} = 1.82 \\times 10^{-24}\\,\\text{kg m s}^{-1}\\).",
          "Divide: \\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{1.82 \\times 10^{-24}} = 3.64 \\times 10^{-10}\\,\\text{m}\\).",
        ],
        answer: "\\(\\lambda = 3.64 \\times 10^{-10}\\,\\text{m} = 3.64\\,\\text{Å}\\).",
      },
      selfCheckExample: {
        prompt:
          "A microscopic particle has a de Broglie wavelength of \\(6.0\\,\\text{Å}\\). What is its momentum? (\\(h = 6.63 \\times 10^{-34}\\,\\text{J s}\\), \\(1\\,\\text{Å} = 10^{-10}\\,\\text{m}\\))",
        steps: [
          "Use the momentum form \\(p = \\dfrac{h}{\\lambda}\\).",
          "Convert \\(\\lambda = 6.0\\,\\text{Å} = 6.0 \\times 10^{-10}\\,\\text{m}\\).",
          "Divide: \\(p = \\dfrac{6.63 \\times 10^{-34}}{6.0 \\times 10^{-10}} = 1.1 \\times 10^{-24}\\,\\text{kg m s}^{-1}\\).",
        ],
        answer: "\\(p = 1.1 \\times 10^{-24}\\,\\text{kg m s}^{-1}\\).",
      },
      practiceSet: [
        {
          prompt:
            "Write the de Broglie relation for the wavelength of a moving particle.",
          answer: "\\(\\lambda = \\dfrac{h}{mv}\\)",
        },
        {
          prompt:
            "If the velocity of a particle is doubled, how does its de Broglie wavelength change?",
          answer: "It is halved",
          method: "\\(\\lambda \\propto 1/v\\), so doubling v halves \\(\\lambda\\)",
        },
        {
          prompt:
            "A particle has momentum \\(3 \\times 10^{-24}\\,\\text{kg m s}^{-1}\\). Its de Broglie wavelength? (\\(h = 6.63 \\times 10^{-34}\\,\\text{J s}\\))",
          answer: "\\(2.21 \\times 10^{-10}\\,\\text{m}\\)",
          method: "\\(\\lambda = h/p = 6.63\\times10^{-34}/3\\times10^{-24}\\)",
        },
      ],
      traps: [
        {
          title: "Divide by momentum, not by mass alone",
          body:
            "The denominator is \\(mv\\) (the momentum), not just the mass. Multiply mass by velocity first, then divide \\(h\\) by that product.",
        },
        {
          title: "Convert Ångström to metres",
          body:
            "\\(1\\,\\text{Å} = 10^{-10}\\,\\text{m}\\) and \\(1\\,\\text{nm} = 10^{-9}\\,\\text{m}\\). A wavelength given in Å or nm must be in metres before you divide, or the power of ten will be wrong.",
        },
      ],
    },

    // 2. Heisenberg uncertainty principle (FORMULA)
    {
      kind: "formula" as const,
      slug: "cetsoa-qm-heisenberg",
      name: "Heisenberg's uncertainty principle",
      intuition:
        "Because an electron is also a wave, you cannot say exactly where it is and exactly how fast it is going at the same instant. " +
        "The more precisely you fix its position, the fuzzier its momentum becomes, and vice versa — this is a fundamental limit, not a measuring error.",
      definition:
        "Heisenberg's uncertainty principle:\n" +
        "- It is **impossible to determine simultaneously the exact position and the exact momentum** of a microscopic particle such as an electron.\n" +
        "- The product of the uncertainties has a lower bound: \\(\\Delta x \\cdot \\Delta p \\geq \\dfrac{h}{4\\pi}\\).\n" +
        "- Equivalently \\(\\Delta x \\cdot \\Delta v \\geq \\dfrac{h}{4\\pi m}\\), since \\(\\Delta p = m\\,\\Delta v\\).\n" +
        "- Small position uncertainty forces a **large** momentum uncertainty — the two cannot both be zero.",
      formula: {
        label: "Heisenberg uncertainty relation",
        latex:
          "\\Delta x \\cdot \\Delta p \\geq \\dfrac{h}{4\\pi} \\qquad \\Delta x \\cdot \\Delta v \\geq \\dfrac{h}{4\\pi m}",
        symbols: [
          { symbol: "\\(\\Delta x\\)", meaning: "uncertainty in position" },
          { symbol: "\\(\\Delta p\\)", meaning: "uncertainty in momentum" },
          { symbol: "\\(\\Delta v\\)", meaning: "uncertainty in velocity" },
          { symbol: "h", meaning: "Planck's constant" },
        ],
      },
      pyqExampleId: "9fbaecef-59f6-4664-9933-a1e294c85b69", // "impossible to determine simultaneously..." -> Heisenberg
      authoredExample: {
        prompt:
          "The uncertainty in the position of an electron is \\(1 \\times 10^{-10}\\,\\text{m}\\). What is the minimum uncertainty in its momentum? (\\(h = 6.63 \\times 10^{-34}\\,\\text{J s}\\))",
        steps: [
          "Use \\(\\Delta x \\cdot \\Delta p \\geq \\dfrac{h}{4\\pi}\\), so the minimum \\(\\Delta p = \\dfrac{h}{4\\pi\\,\\Delta x}\\).",
          "Compute \\(4\\pi = 12.57\\), so \\(4\\pi\\,\\Delta x = 12.57 \\times 10^{-10} = 1.257 \\times 10^{-9}\\).",
          "Divide: \\(\\Delta p = \\dfrac{6.63 \\times 10^{-34}}{1.257 \\times 10^{-9}} = 5.27 \\times 10^{-25}\\,\\text{kg m s}^{-1}\\).",
        ],
        answer:
          "Minimum \\(\\Delta p \\approx 5.27 \\times 10^{-25}\\,\\text{kg m s}^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "Which principle states that it is impossible to determine both the exact position and the exact momentum of an electron at the same time?",
        steps: [
          "Pauli's exclusion principle limits two electrons sharing all four quantum numbers — not position/momentum.",
          "Aufbau and Hund's rules govern the order and pairing of electron filling — not measurement.",
          "The impossibility of knowing position and momentum together is Heisenberg's uncertainty principle.",
        ],
        answer: "Heisenberg's uncertainty principle.",
      },
      practiceSet: [
        {
          prompt: "Write the mathematical form of Heisenberg's uncertainty principle.",
          answer: "\\(\\Delta x \\cdot \\Delta p \\geq \\dfrac{h}{4\\pi}\\)",
        },
        {
          prompt:
            "If the uncertainty in position of an electron decreases, what happens to the uncertainty in its momentum?",
          answer: "It increases",
          method: "Their product is fixed at a minimum of \\(h/4\\pi\\)",
        },
        {
          prompt:
            "Why is the uncertainty principle unnoticeable for a moving cricket ball?",
          answer: "Its large mass makes \\(h/4\\pi m\\) negligibly small",
        },
      ],
      traps: [
        {
          title: "It is a fundamental limit, not an instrument error",
          body:
            "The uncertainty is built into nature — it is not due to imperfect instruments. Even a perfect measuring device cannot beat the \\(\\dfrac{h}{4\\pi}\\) bound.",
        },
        {
          title: "Don't confuse it with Pauli or Aufbau",
          body:
            "Position-and-momentum together = **Heisenberg**. Pauli's exclusion principle is about no two electrons having the same four quantum numbers; Aufbau is about the order of filling. The bank swaps these as distractors.",
        },
      ],
    },

    // 3. Four quantum numbers + orbital designation (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cetsoa-qm-four-quantum-numbers",
      name: "The four quantum numbers",
      intuition:
        "Four quantum numbers are the electron's full address: n names the shell (floor), l names the subshell/shape (room type), m_l names the particular orbital (room number) and m_s names the spin (which way it faces). " +
        "The bank's staple is turning an (n, l) pair into an orbital label — l = 2 always means a d orbital.",
      definition:
        "The four quantum numbers and what each fixes:\n" +
        "- **Principal (n)** — the shell / energy level and size; \\(n = 1, 2, 3, \\ldots\\) (K, L, M, N).\n" +
        "- **Azimuthal (l)** — the subshell and orbital **shape**; \\(l = 0\\) to \\(n-1\\), coded \\(0 = s, 1 = p, 2 = d, 3 = f\\).\n" +
        "- **Magnetic (m_l)** — the orbital's orientation in space; integers from \\(-l\\) to \\(+l\\), giving \\(2l+1\\) orbitals per subshell.\n" +
        "- **Spin (m_s)** — the electron's spin direction, \\(+\\tfrac{1}{2}\\) or \\(-\\tfrac{1}{2}\\).\n" +
        "To name an orbital, write the value of \\(n\\) then the letter for \\(l\\): \\(n=3, l=2 \\Rightarrow\\) **3d**; \\(n=4, l=3 \\Rightarrow\\) **4f**.",
      table: {
        columns: ["Quantum number", "Symbol", "What it describes", "Allowed values"],
        rows: [
          {
            cells: [
              "Principal",
              "n",
              "Shell / main energy level and size of the orbital",
              "1, 2, 3, ... (positive integers)",
            ],
          },
          {
            cells: [
              "Azimuthal (subsidiary)",
              "l",
              "Subshell and shape of the orbital (s, p, d, f)",
              "0 to (n-1); coded 0=s, 1=p, 2=d, 3=f",
            ],
            noteAmber:
              "l runs only from 0 up to n-1. For n=3, l can be 0, 1 or 2 — never 3.",
          },
          {
            cells: [
              "Magnetic",
              "m_l",
              "Orientation of the orbital in space (which orbital)",
              "-l to +l, i.e. (2l+1) values",
            ],
          },
          {
            cells: [
              "Spin",
              "m_s",
              "Direction of the electron's spin",
              "+1/2 or -1/2 only",
            ],
          },
        ],
        caption:
          "l fixes the shape (s/p/d/f); the orbital label is n followed by that letter.",
      },
      pyqExampleId: "940a25ee-21ca-4130-852b-f6161deb249a", // n=3, l=2 -> 3d
      selfCheckExample: {
        prompt:
          "What is the designation of the orbital with quantum numbers \\(n = 4\\) and \\(l = 3\\)?",
        steps: [
          "The value of \\(l\\) fixes the letter: \\(l = 3\\) is an f orbital.",
          "The value of \\(n\\) is written in front: \\(n = 4\\).",
          "So the orbital is 4f.",
        ],
        answer: "4f.",
      },
      practiceSet: [
        {
          prompt: "Which quantum number decides the shape of an orbital?",
          answer: "The azimuthal quantum number, l",
        },
        {
          prompt: "For n = 3, what values can l take?",
          answer: "0, 1 and 2 (s, p, d)",
          method: "l runs 0 to n-1",
        },
        {
          prompt: "What orbital is represented by n = 3, l = 2?",
          answer: "3d",
          method: "l = 2 means d; prefix with n = 3",
        },
        {
          prompt: "What are the only two allowed values of the spin quantum number?",
          answer: "\\(+\\tfrac{1}{2}\\) and \\(-\\tfrac{1}{2}\\)",
        },
      ],
      traps: [
        {
          title: "l ranges from 0 to n-1",
          body:
            "The azimuthal quantum number cannot equal or exceed \\(n\\). For \\(n = 3\\) the allowed \\(l\\) values are 0, 1, 2 only — there is no 3f (that would need \\(n \\geq 4\\)).",
        },
        {
          title: "m_l ranges from -l to +l",
          body:
            "The magnetic quantum number runs over the \\(2l+1\\) integers from \\(-l\\) to \\(+l\\), including 0. A p subshell (\\(l = 1\\)) has \\(m_l = -1, 0, +1\\) — three orbitals, not two.",
        },
      ],
    },

    // 4. Orbital shapes from l + d-orbital exception (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cetsoa-qm-orbital-shapes",
      name: "Orbital shapes from l",
      intuition:
        "The azimuthal quantum number l fixes the shape of the orbital: s is a sphere, p is a dumbbell, d is a four-lobed clover leaf. " +
        "The bank's favourite catch is that four of the five d orbitals look the same but the fifth, \\(d_{z^2}\\), is a different shape — a dumbbell wrapped in a doughnut.",
      definition:
        "Shape of the orbital for each value of \\(l\\):\n" +
        "- \\(l = 0\\) (**s**) — **spherical**, symmetric about the nucleus; one orbital.\n" +
        "- \\(l = 1\\) (**p**) — **dumbbell** (two lobes) along an axis; three orbitals \\(p_x, p_y, p_z\\).\n" +
        "- \\(l = 2\\) (**d**) — mostly **double-dumbbell / clover-leaf** (four lobes); five orbitals.\n" +
        "- \\(l = 3\\) (**f**) — complex multi-lobed shapes; seven orbitals.\n" +
        "Among the d orbitals, \\(d_{xy}, d_{yz}, d_{xz}\\) and \\(d_{x^2-y^2}\\) are the four-lobed clover leaves, while \\(d_{z^2}\\) is the odd one out — two lobes on the z-axis plus a ring in the xy-plane.",
      table: {
        columns: ["l value", "Subshell", "Shape", "Orbitals in subshell"],
        rows: [
          { cells: ["0", "s", "Spherical", "1"] },
          { cells: ["1", "p", "Dumbbell (two lobes)", "3"] },
          {
            cells: ["2", "d", "Four-lobed clover leaf (except d(z2))", "5"],
            noteAmber:
              "d(z2) is the exception: two lobes along z plus a doughnut ring in the xy-plane — a different shape from the other four.",
          },
          { cells: ["3", "f", "Complex multi-lobed", "7"] },
        ],
        caption:
          "Number of orbitals in a subshell is 2l+1: s=1, p=3, d=5, f=7.",
      },
      pyqExampleId: "f120375d-fe9a-4211-920e-4d65efbb5ee1", // which d-orbital has different shape -> d(z2)
      selfCheckExample: {
        prompt:
          "Which of the five d orbitals has a shape different from the other four?",
        steps: [
          "Four d orbitals \\(d_{xy}, d_{yz}, d_{xz}, d_{x^2-y^2}\\) are four-lobed clover leaves.",
          "The fifth, \\(d_{z^2}\\), has two lobes along the z-axis plus a doughnut-shaped ring in the xy-plane.",
          "So \\(d_{z^2}\\) is the one with a different shape.",
        ],
        answer: "\\(d_{z^2}\\).",
      },
      practiceSet: [
        {
          prompt: "What is the shape of an s orbital?",
          answer: "Spherical",
        },
        {
          prompt: "What is the characteristic shape of a p orbital?",
          answer: "Dumbbell (two lobes)",
        },
        {
          prompt: "How many orbitals are there in a d subshell?",
          answer: "5",
          method: "\\(2l+1 = 2(2)+1 = 5\\)",
        },
        {
          prompt: "Which d orbital does not have the clover-leaf shape?",
          answer: "\\(d_{z^2}\\)",
        },
      ],
      traps: [
        {
          title: "d(z2) is the shape exception",
          body:
            "When asked which d orbital has a different shape, the answer is \\(d_{z^2}\\). The other four (\\(d_{xy}, d_{yz}, d_{xz}, d_{x^2-y^2}\\)) are all four-lobed clover leaves.",
        },
      ],
    },

    // 5. Orbitals/electrons per shell + (n+l) energy rule + nodes (FORMULA)
    {
      kind: "formula" as const,
      slug: "cetsoa-qm-shell-capacity-energy",
      name: "Shell capacity, orbital energy order and nodes",
      intuition:
        "A shell of number n holds \\(n^2\\) orbitals and up to \\(2n^2\\) electrons — that is the whole answer to 'how many orbitals/electrons in the M shell?'. " +
        "For energy order the trick is the (n+l) rule: lower \\(n+l\\) means lower energy, and a tie is broken by the smaller n.",
      definition:
        "Counting and ordering rules:\n" +
        "- **Orbitals in a shell** \\(= n^2\\); **maximum electrons** \\(= 2n^2\\). (M shell, \\(n=3\\): 9 orbitals, 18 electrons.)\n" +
        "- **Electrons in a subshell** \\(= 2(2l+1)\\): s holds 2, p holds 6, d holds 10, f holds 14.\n" +
        "- **(n+l) rule (Aufbau):** the orbital with the **lower** \\(n+l\\) has lower energy; if two orbitals have the **same** \\(n+l\\), the one with the **smaller n** is lower.\n" +
        "- **Degeneracy in hydrogen only:** for the H atom, energy depends on \\(n\\) alone, so 2s and 2p (same n) are degenerate. In multi-electron atoms they are not.\n" +
        "- **Nodes:** total nodes \\(= n-1\\); angular nodes \\(= l\\); radial nodes \\(= n-l-1\\).",
      formula: {
        label: "Shell capacity, subshell capacity and nodes",
        latex:
          "\\text{orbitals} = n^2,\\quad e^- _{\\max} = 2n^2,\\quad e^-_{\\text{subshell}} = 2(2l+1) \\qquad \\text{nodes} = n-1,\\ \\text{radial} = n-l-1",
        symbols: [
          { symbol: "n", meaning: "principal quantum number (shell)" },
          { symbol: "l", meaning: "azimuthal quantum number (subshell)" },
          { symbol: "n^2", meaning: "number of orbitals in the shell" },
          { symbol: "2n^2", meaning: "maximum electrons in the shell" },
        ],
      },
      pyqExampleId: "5b07ae06-0cc6-4a45-b4e4-d047e1480bc5", // M shell -> 9 orbitals, 18 electrons
      authoredExample: {
        prompt:
          "How many orbitals and how many electrons at most can the M shell hold?",
        steps: [
          "The M shell is \\(n = 3\\).",
          "Orbitals \\(= n^2 = 3^2 = 9\\).",
          "Maximum electrons \\(= 2n^2 = 2 \\times 9 = 18\\).",
        ],
        answer: "9 orbitals and 18 electrons.",
      },
      selfCheckExample: {
        prompt:
          "Of the orbitals 2p, 3s, 3d and 4p, which has the lowest energy?",
        steps: [
          "Compute \\(n+l\\): 2p \\(= 2+1 = 3\\); 3s \\(= 3+0 = 3\\); 3d \\(= 3+2 = 5\\); 4p \\(= 4+1 = 5\\).",
          "The smallest \\(n+l\\) is 3, shared by 2p and 3s.",
          "Break the tie by smaller \\(n\\): 2p (\\(n=2\\)) beats 3s (\\(n=3\\)).",
        ],
        answer: "2p has the lowest energy.",
      },
      practiceSet: [
        {
          prompt: "How many orbitals are in the N shell?",
          answer: "16",
          method: "\\(n^2 = 4^2 = 16\\)",
        },
        {
          prompt: "Maximum number of electrons in a d subshell?",
          answer: "10",
          method: "\\(2(2l+1) = 2(2\\cdot2+1) = 10\\)",
        },
        {
          prompt:
            "Which orbital has higher energy, 3d or 4p? (both n+l = 5)",
          answer: "4p",
          method: "Same n+l, higher n (4) is higher energy",
        },
        {
          prompt:
            "In a hydrogen atom, are 2s and 2p degenerate?",
          answer: "Yes",
          method: "In H, energy depends on n alone; same n = degenerate",
        },
      ],
      traps: [
        {
          title: "Break an (n+l) tie with the smaller n",
          body:
            "When two orbitals share the same \\(n+l\\) (e.g. 3d and 4p both give 5), the one with the **smaller n** has the lower energy: 3d is below 4p. Only after comparing \\(n+l\\) do you look at \\(n\\).",
        },
        {
          title: "Degeneracy of 2s and 2p is a hydrogen-only fact",
          body:
            "In the hydrogen atom, energy depends only on \\(n\\), so 2s and 2p are degenerate. In any multi-electron atom the (n+l) rule splits them — 2s is below 2p. The bank's degeneracy question is specifically about hydrogen.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Atomic Structure — Models and Electron Configuration",
      href: "/notes/nda-chemistry/atomic-structure",
    },
  ],
};
