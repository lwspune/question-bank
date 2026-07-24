import type { SubtopicNote } from "@/app/notes/_types";

export const SUBATOMIC_PARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Subatomic Particles, Isotopes, Isobars and Isoelectronic Species",
  title: "Subatomic Particles, Isotopes, Isobars and Isoelectronic Species",
  oneLineDefinition:
    "An atom is built from protons, neutrons and electrons; the atomic number counts the protons and the mass number counts the nucleons, and from those two numbers the whole family of iso-terms (isotopes, isobars, isotones, isoelectronic) is just a matter of asking which count is being held fixed.",
  whyItMatters:
    "About 14 PYQs, all EASY and almost all pure recall or a one-line electron count — the guaranteed free marks of this chapter. " +
    "They split three ways: the definitions of the four iso-words (isotopes, isobars, isotones, isoelectronic), the recurring 'identify the isoelectronic pair / the odd one out' electron-count, and one weighted-average-mass calculation for chlorine. " +
    "Master the two defining numbers and how to count electrons in an ion, and every question here is a single step.",
  concepts: [
    // C1 — FOUNDATION: the three particles + notation (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cetsoa-sub-particles-notation",
      name: "The three subatomic particles and the nuclide notation",
      intuition:
        "Every atom is three particles. Protons (positive) and neutrons (neutral) sit in the tiny dense nucleus and carry nearly all the mass; electrons (negative) are almost massless and occupy shells outside. " +
        "The nuclide symbol packs the two key counts around the element: mass number on top, atomic number at the bottom.",
      definition:
        "The three particles and the two numbers that describe a nuclide:\n" +
        "- **Proton** — charge **+1**, mass about **1 u**, in the **nucleus**. Its count is the atomic number.\n" +
        "- **Neutron** — charge **0**, mass about **1 u**, in the **nucleus**. Protons and neutrons together are **nucleons**.\n" +
        "- **Electron** — charge **−1**, mass about **1/1836** of a proton (nearly massless), in **shells outside** the nucleus.\n" +
        "- The nuclide is written \\(^{A}_{Z}\\text{X}\\): **mass number** \\(A\\) (top) and **atomic number** \\(Z\\) (bottom), with **neutrons** \\(= A - Z\\).",
      table: {
        columns: ["Particle", "Charge", "Relative mass", "Location"],
        rows: [
          { cells: ["Proton", "\\(+1\\)", "\\(\\approx 1\\ \\text{u}\\)", "Nucleus"] },
          { cells: ["Neutron", "\\(0\\) (neutral)", "\\(\\approx 1\\ \\text{u}\\)", "Nucleus"] },
          {
            cells: ["Electron", "\\(-1\\)", "\\(\\approx \\tfrac{1}{1836}\\) of a proton", "Shells outside the nucleus"],
            noteAmber:
              "Electrons are so light that the mass number counts only protons and neutrons — never electrons.",
          },
        ],
        caption:
          "Nucleons (protons + neutrons) carry the mass; the atomic number \\(Z\\) fixes the element.",
      },
      pyqExampleId: "b559d09d-a133-414e-9a44-31aebdcf5b08", // 40 mass, 21 neutrons -> Z=19 notation
      selfCheckExample: {
        prompt:
          "An element has mass number 40 and 21 neutrons. Write its nuclide symbol and give its atomic number.",
        steps: [
          "Neutrons \\(= A - Z\\), so \\(Z = A - \\text{neutrons} = 40 - 21 = 19\\).",
          "The atomic number is \\(19\\); the symbol places \\(A = 40\\) on top and \\(Z = 19\\) below.",
        ],
        answer: "\\(^{40}_{19}\\text{X}\\), atomic number \\(19\\).",
      },
      practiceSet: [
        { prompt: "Which particle carries a charge of \\(-1\\) and sits outside the nucleus?", answer: "Electron" },
        { prompt: "What is the collective name for protons and neutrons?", answer: "Nucleons" },
        { prompt: "In \\(^{23}_{11}\\text{Na}\\), how many neutrons are present?", answer: "\\(12\\)", method: "\\(A - Z = 23 - 11\\)" },
        { prompt: "Which number in \\(^{A}_{Z}\\text{X}\\) identifies the element?", answer: "The atomic number \\(Z\\)" },
      ],
      traps: [
        {
          title: "Mass number counts nucleons, not electrons",
          body:
            "The mass number is protons **plus neutrons** only. Electrons are about \\(1/1836\\) of a nucleon, so they add nothing to the mass number — never include them.",
        },
        {
          title: "Read the notation the right way up",
          body:
            "In \\(^{A}_{Z}\\text{X}\\) the **top** number is the mass number \\(A\\) and the **bottom** is the atomic number \\(Z\\). Swapping them gives the wrong neutron count \\(A-Z\\).",
        },
      ],
    },

    // C2 — counting electrons in atoms and ions (FORMULA)
    {
      kind: "formula" as const,
      slug: "cetsoa-sub-counting-electrons",
      name: "Counting protons, neutrons and electrons in a species",
      intuition:
        "Once you have the atomic number, the electron count is fixed by the charge: a neutral atom has electrons equal to protons, an ion adds electrons for a negative charge and loses them for a positive one. " +
        "This single count is what almost every question here really tests.",
      definition:
        "The counts, straight from \\(Z\\), \\(A\\) and the charge:\n" +
        "- **Protons** \\(= Z\\); **neutrons** \\(= A - Z\\).\n" +
        "- **Electrons in a neutral atom** \\(= Z\\).\n" +
        "- **Electrons in an ion** \\(= Z - (\\text{charge})\\): subtract the charge, so a \\(+\\) ion has fewer electrons and a \\(-\\) ion has more.\n" +
        "- Example — \\(\\text{Ca}\\) has \\(Z = 20\\), so a neutral calcium atom has exactly **20 electrons**, whereas \\(\\text{K}^{+}\\) (\\(Z = 19\\)) has \\(19 - 1 = 18\\).",
      formula: {
        label: "Electron count of a species",
        latex: "e^- = Z - (\\text{charge}) \\qquad N = A - Z",
        symbols: [
          { symbol: "Z", meaning: "atomic number (protons)" },
          { symbol: "A", meaning: "mass number (nucleons)" },
          { symbol: "N", meaning: "number of neutrons" },
        ],
      },
      pyqExampleId: "c5e9b1f7-a099-4ec6-809e-498e7f02e7ac", // which species has 20 electrons -> Ca
      authoredExample: {
        prompt:
          "Which of these has exactly 20 electrons: \\(\\text{K}^{+}\\) (\\(Z=19\\)), \\(\\text{Ca}\\) (\\(Z=20\\)), \\(\\text{Mg}\\) (\\(Z=12\\)), \\(\\text{Cl}\\) (\\(Z=17\\))?",
        steps: [
          "For an ion, electrons \\(= Z - \\text{charge}\\); for a neutral atom, electrons \\(= Z\\).",
          "\\(\\text{K}^{+}: 19 - 1 = 18\\); \\(\\text{Mg}: 12\\); \\(\\text{Cl}: 17\\).",
          "\\(\\text{Ca}\\) is neutral with \\(Z = 20\\), so it has \\(20\\) electrons.",
        ],
        answer: "\\(\\text{Ca}\\) — a neutral calcium atom has \\(20\\) electrons.",
      },
      selfCheckExample: {
        prompt: "How many electrons does the sulphide ion \\(\\text{S}^{2-}\\) have, given sulphur has \\(Z = 16\\)?",
        steps: [
          "A neutral sulphur atom has \\(16\\) electrons.",
          "The \\(2-\\) charge means it has gained \\(2\\) electrons.",
          "Electrons \\(= 16 + 2 = 18\\).",
        ],
        answer: "\\(18\\) electrons.",
      },
      practiceSet: [
        { prompt: "Electrons in \\(\\text{Ca}\\) (\\(Z = 20\\))?", answer: "\\(20\\)", method: "neutral atom: electrons \\(= Z\\)" },
        { prompt: "Electrons in \\(\\text{K}^{+}\\) (\\(Z = 19\\))?", answer: "\\(18\\)", method: "\\(19 - 1\\)" },
        { prompt: "Electrons in \\(\\text{F}^{-}\\) (\\(Z = 9\\))?", answer: "\\(10\\)", method: "\\(9 + 1\\) for the negative charge" },
        { prompt: "Neutrons in \\(^{40}_{20}\\text{Ca}\\)?", answer: "\\(20\\)", method: "\\(A - Z = 40 - 20\\)" },
      ],
      traps: [
        {
          title: "A neutral atom of Ca has 20 electrons, but Ca-based ions do not",
          body:
            "The 20-electron species is neutral **calcium**, because electrons \\(= Z = 20\\). \\(\\text{Ca}^{2+}\\) would have only \\(18\\). Check the charge before you count.",
        },
        {
          title: "Add for negative, subtract for positive",
          body:
            "For \\(\\text{O}^{2-}\\) you **add** \\(2\\) electrons (\\(8 + 2 = 10\\)); for \\(\\text{Na}^{+}\\) you **subtract** \\(1\\) (\\(11 - 1 = 10\\)). Getting the sign backwards is the single most common slip.",
        },
      ],
    },

    // C3 — the four iso-families (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cetsoa-sub-iso-families",
      name: "Isotopes, isobars, isotones and isoelectronic species",
      intuition:
        "Four 'iso-' words sound alike but each holds a different count fixed. Ask 'what is the same?' — protons, mass number, neutrons, or electrons — and the term names itself. " +
        "This one distinction answers most of the definition questions in the subtopic.",
      definition:
        "The four families, sorted by which count is held equal:\n" +
        "- **Isotopes** — same **protons** (same element, same \\(Z\\)), different **neutrons** and mass number. Same chemical properties, same periodic-table position. Example: \\(^{35}\\text{Cl}\\) and \\(^{37}\\text{Cl}\\).\n" +
        "- **Isobars** — same **mass number** \\(A\\), different elements (different \\(Z\\)). Example: \\(^{40}\\text{Ar}\\) and \\(^{40}\\text{Ca}\\).\n" +
        "- **Isotones** — same number of **neutrons** \\((A - Z)\\), different \\(Z\\) and \\(A\\). Example: \\(^{12}_{6}\\text{C}\\) and \\(^{11}_{5}\\text{B}\\) (both \\(6\\) neutrons).\n" +
        "- **Isoelectronic species** — same number of **electrons**, regardless of element or charge. Example: \\(\\text{Na}^{+}\\), \\(\\text{F}^{-}\\), \\(\\text{O}^{2-}\\) and \\(\\text{Ne}\\) (all \\(10\\)).",
      table: {
        columns: ["Term", "What is the same", "What differs", "Example"],
        rows: [
          {
            cells: ["Isotopes", "Protons \\(Z\\) (same element)", "Neutrons / mass number", "\\(^{35}\\text{Cl}\\), \\(^{37}\\text{Cl}\\)"],
            noteAmber:
              "Isotopes do NOT have equal neutrons — that is the false statement the bank plants.",
          },
          { cells: ["Isobars", "Mass number \\(A\\)", "Element (\\(Z\\))", "\\(^{40}\\text{Ar}\\), \\(^{40}\\text{Ca}\\)"] },
          { cells: ["Isotones", "Number of neutrons", "\\(Z\\) and \\(A\\)", "\\(^{12}_{6}\\text{C}\\), \\(^{11}_{5}\\text{B}\\)"] },
          { cells: ["Isoelectronic", "Number of electrons", "Element and charge", "\\(\\text{Na}^{+}\\), \\(\\text{F}^{-}\\), \\(\\text{O}^{2-}\\), \\(\\text{Ne}\\)"] },
        ],
        caption:
          "Ask 'what count is held fixed?' — protons, mass number, neutrons, or electrons.",
      },
      pyqExampleId: "4fe48b2f-8140-4cca-89cb-5745101e0180", // isotones pair C-12 / B-11
      selfCheckExample: {
        prompt:
          "\\(^{14}_{6}\\text{C}\\) and \\(^{16}_{8}\\text{O}\\): are they isotopes, isobars, isotones or isoelectronic?",
        steps: [
          "Neutrons in \\(^{14}_{6}\\text{C} = 14 - 6 = 8\\).",
          "Neutrons in \\(^{16}_{8}\\text{O} = 16 - 8 = 8\\).",
          "Same neutron count, different elements — that is the definition of isotones.",
        ],
        answer: "Isotones — both have \\(8\\) neutrons.",
      },
      practiceSet: [
        { prompt: "Two nuclides with the same mass number but different atomic numbers are called what?", answer: "Isobars" },
        { prompt: "\\(^{35}\\text{Cl}\\) and \\(^{37}\\text{Cl}\\) differ only in the number of which particle?", answer: "Neutrons", method: "same protons -> isotopes" },
        { prompt: "\\(^{12}_{6}\\text{C}\\) and \\(^{11}_{5}\\text{B}\\) share the same number of which particle?", answer: "Neutrons (\\(6\\) each) -> isotones" },
        { prompt: "Do isotopes occupy the same position in the periodic table?", answer: "Yes", method: "same \\(Z\\), same element" },
      ],
      traps: [
        {
          title: "'Isotopes have equal neutrons' is FALSE",
          body:
            "Isotopes share protons, not neutrons — indeed they must differ in neutrons (that is what gives them different mass numbers). The statement 'they have equal number of neutrons' is the false one to spot.",
        },
        {
          title: "Isotones vs isobars vs isotopes",
          body:
            "Same **neutrons** -> **isotones**; same **mass number** -> **isobars**; same **protons** -> **isotopes**. \\(^{14}_{6}\\text{C}\\) and \\(^{16}_{8}\\text{O}\\) share neutrons, so they are isotones, not isobars.",
        },
      ],
    },

    // C4 — isoelectronic electron-count matching (FORMULA)
    {
      kind: "formula" as const,
      slug: "cetsoa-sub-isoelectronic",
      name: "Identifying isoelectronic species by counting electrons",
      intuition:
        "The bank's favourite recurring question: pick the isoelectronic pair, or spot the odd one out. There is no theory — just count electrons in each species and find the match. " +
        "The count is \\(Z\\) minus the charge, so \\(\\text{O}^{2-}\\) is \\(8 + 2 = 10\\), \\(\\text{Na}^{+}\\) is \\(11 - 1 = 10\\), and they match.",
      definition:
        "Two species are **isoelectronic** when they have the **same number of electrons**:\n" +
        "- Compute electrons for each: \\(e^- = Z - (\\text{charge})\\).\n" +
        "- The \\(10\\)-electron set (neon core) is the one PYQs use most: \\(\\text{O}^{2-}\\), \\(\\text{F}^{-}\\), \\(\\text{Ne}\\), \\(\\text{Na}^{+}\\), \\(\\text{Mg}^{2+}\\), \\(\\text{Al}^{3+}\\) all have \\(10\\).\n" +
        "- The odd-one-out is usually a **neutral atom** slipped in beside its ions — e.g. neutral \\(\\text{Na}\\) has \\(11\\), not \\(10\\).",
      formula: {
        label: "Isoelectronic test",
        latex: "e^-_1 = Z_1 - q_1 \\;\\overset{?}{=}\\; Z_2 - q_2 = e^-_2",
        symbols: [
          { symbol: "Z", meaning: "atomic number of the species" },
          { symbol: "q", meaning: "charge (with sign; subtract it)" },
          { symbol: "e^-", meaning: "resulting electron count" },
        ],
      },
      pyqExampleId: "9e2c3198-425a-42ea-a3a7-fedec8cbb987", // isoelectronic pair Ne and O2-
      authoredExample: {
        prompt:
          "Identify the isoelectronic pair: (a) \\(\\text{Ne}\\) and \\(\\text{O}^{2-}\\), (b) \\(\\text{Cl}^{-}\\) and \\(\\text{Ca}\\), (c) \\(\\text{Ar}\\) and \\(\\text{F}^{-}\\).",
        steps: [
          "Count electrons: \\(\\text{Ne} = 10\\); \\(\\text{O}^{2-} = 8 + 2 = 10\\) — a match.",
          "\\(\\text{Cl}^{-} = 17 + 1 = 18\\), but \\(\\text{Ca} = 20\\) — not equal.",
          "\\(\\text{Ar} = 18\\), but \\(\\text{F}^{-} = 9 + 1 = 10\\) — not equal.",
        ],
        answer: "(a) \\(\\text{Ne}\\) and \\(\\text{O}^{2-}\\), both with \\(10\\) electrons.",
      },
      selfCheckExample: {
        prompt:
          "Which one is NOT isoelectronic with the other three: \\(\\text{Ne}\\), \\(\\text{O}^{2-}\\), \\(\\text{Na}\\), \\(\\text{Na}^{+}\\)?",
        steps: [
          "\\(\\text{Ne} = 10\\); \\(\\text{O}^{2-} = 8 + 2 = 10\\); \\(\\text{Na}^{+} = 11 - 1 = 10\\).",
          "Neutral \\(\\text{Na}\\) has \\(11\\) electrons.",
          "So \\(\\text{Na}\\) is the odd one out.",
        ],
        answer: "Neutral \\(\\text{Na}\\) — it has \\(11\\) electrons, while the others have \\(10\\).",
      },
      practiceSet: [
        { prompt: "Is \\(\\text{Mg}^{2+}\\) (\\(Z=12\\)) isoelectronic with \\(\\text{Ne}\\)?", answer: "Yes", method: "\\(12 - 2 = 10 = \\text{Ne}\\)" },
        { prompt: "How many electrons in \\(\\text{Al}^{3+}\\) (\\(Z = 13\\))?", answer: "\\(10\\)", method: "\\(13 - 3\\)" },
        { prompt: "Are \\(\\text{O}^{2-}\\) and \\(\\text{Na}^{+}\\) isoelectronic?", answer: "Yes", method: "both \\(10\\) electrons" },
        { prompt: "Is neutral \\(\\text{Na}\\) isoelectronic with \\(\\text{Ne}\\)?", answer: "No", method: "\\(\\text{Na}\\) has \\(11\\), \\(\\text{Ne}\\) has \\(10\\)" },
      ],
      traps: [
        {
          title: "The neutral atom hidden among its ions",
          body:
            "When the options are \\(\\text{Ne}\\), \\(\\text{O}^{2-}\\), \\(\\text{Na}^{+}\\) and \\(\\text{Na}\\), the odd one out is the **neutral** \\(\\text{Na}\\) (\\(11\\) electrons). Always apply the charge before comparing.",
        },
        {
          title: "Same electrons, not same protons",
          body:
            "Isoelectronic is about **electron** count, so \\(\\text{Cl}^{-}\\) and \\(\\text{Ca}\\) (\\(18\\) vs \\(20\\)) are not a pair even though both are 'near argon'. Recount \\(Z - q\\) each time — do not eyeball by element.",
        },
      ],
    },

    // C5 — average atomic mass / abundance (FORMULA)
    {
      kind: "formula" as const,
      slug: "cetsoa-sub-average-atomic-mass",
      name: "Average atomic mass and isotope abundance ratio",
      intuition:
        "An element's periodic-table mass is the abundance-weighted average of its isotope masses. The same relation runs backwards: given the average and the two isotope masses, you can solve for the abundance ratio. " +
        "Chlorine (average \\(35.5\\) from \\(^{35}\\text{Cl}\\) and \\(^{37}\\text{Cl}\\)) is the standard example.",
      definition:
        "The weighted-average mass, used both ways:\n" +
        "- **Forwards** — average \\(= \\sum (\\text{isotope mass} \\times \\text{fraction})\\), where the fractions sum to \\(1\\).\n" +
        "- **Backwards** — let the abundance of one isotope be \\(x\\%\\) and solve. For chlorine: \\(\\dfrac{35x + 37(100 - x)}{100} = 35.5\\) gives \\(x = 75\\), so the ratio \\(^{35}\\text{Cl} : {}^{37}\\text{Cl} = 75 : 25 = 3 : 1\\).",
      formula: {
        label: "Weighted average atomic mass",
        latex: "\\bar{m} = \\frac{m_1 x + m_2 (100 - x)}{100}",
        symbols: [
          { symbol: "\\(\\bar{m}\\)", meaning: "average atomic mass" },
          { symbol: "m_1, m_2", meaning: "the two isotope masses" },
          { symbol: "x", meaning: "percentage abundance of isotope 1" },
        ],
      },
      pyqExampleId: "ccd2a327-eb0a-4655-bd7f-e1b2bdcbe5b5", // Cl 35.5 -> abundance ratio 3:1
      authoredExample: {
        prompt:
          "Copper has two isotopes of masses \\(63\\) and \\(65\\) and an average atomic mass of \\(63.5\\). Find the percentage abundance of each isotope.",
        steps: [
          "Let the abundance of the mass-\\(63\\) isotope be \\(x\\%\\), so the mass-\\(65\\) isotope is \\((100 - x)\\%\\).",
          "\\(\\dfrac{63x + 65(100 - x)}{100} = 63.5 \\Rightarrow 63x + 6500 - 65x = 6350\\).",
          "\\(-2x = -150 \\Rightarrow x = 75\\), so mass-\\(63\\) is \\(75\\%\\) and mass-\\(65\\) is \\(25\\%\\).",
        ],
        answer: "\\(75\\%\\) of mass \\(63\\) and \\(25\\%\\) of mass \\(65\\).",
      },
      selfCheckExample: {
        prompt:
          "An element has isotopes of masses \\(10\\) and \\(11\\) in the ratio \\(1 : 4\\). Find its average atomic mass.",
        steps: [
          "The ratio \\(1 : 4\\) has \\(5\\) parts, so fractions are \\(\\tfrac{1}{5}\\) and \\(\\tfrac{4}{5}\\).",
          "\\(\\bar{m} = 10 \\times \\tfrac{1}{5} + 11 \\times \\tfrac{4}{5} = 2 + 8.8\\).",
          "\\(= 10.8\\).",
        ],
        answer: "\\(10.8\\ \\text{u}\\).",
      },
      practiceSet: [
        { prompt: "\\(^{35}\\text{Cl}\\) and \\(^{37}\\text{Cl}\\) give an average of \\(35.5\\). What is their abundance ratio?", answer: "\\(3 : 1\\)", method: "solve \\(35x + 37(100-x) = 3550\\)" },
        { prompt: "Two isotopes of mass \\(20\\) and \\(22\\) occur \\(90\\%\\) and \\(10\\%\\). Average mass?", answer: "\\(20.2\\)", method: "\\(20(0.9) + 22(0.1)\\)" },
        { prompt: "Two isotopes of mass \\(12\\) and \\(14\\) occur \\(1 : 1\\). Average mass?", answer: "\\(13\\)" },
      ],
      traps: [
        {
          title: "Weight by abundance, don't just average",
          body:
            "The plain mean of \\(35\\) and \\(37\\) is \\(36\\), but chlorine's true \\(35.5\\) is lower because the lighter \\(^{35}\\text{Cl}\\) is far more abundant (\\(75\\%\\)). Always multiply each mass by its fraction first.",
        },
        {
          title: "Match the ratio order to the isotopes",
          body:
            "For chlorine the \\(3 : 1\\) is \\(^{35}\\text{Cl} : {}^{37}\\text{Cl}\\) — the lighter, more abundant isotope first. A distractor offers \\(1 : 3\\); keep the order aligned with the masses.",
        },
      ],
    },

    // C6 — special species: isotope counts, hydrogen-like, radioactivity (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cetsoa-sub-special-species",
      name: "Isotope counts, hydrogen-like species and radioactivity",
      intuition:
        "A few pure-recall facts round out the subtopic: how many natural isotopes a common element has, what makes a species 'hydrogen-like', and which elements are radioactive. " +
        "Each is a one-line memory item the bank recycles.",
      definition:
        "The recall facts the bank tests here:\n" +
        "- **Number of isotopes** — nitrogen has **2** natural isotopes (\\(^{14}\\text{N}\\), \\(^{15}\\text{N}\\)); hydrogen has \\(3\\) (protium, deuterium, tritium); carbon has \\(3\\) (\\(^{12}\\text{C}, {}^{13}\\text{C}, {}^{14}\\text{C}\\)).\n" +
        "- **Hydrogen-like (hydrogenic) species** have exactly **one electron**: \\(\\text{H}\\), \\(\\text{He}^{+}\\), \\(\\text{Li}^{2+}\\), \\(\\text{Be}^{3+}\\). Neutral \\(\\text{He}\\) has \\(2\\) electrons, so it is **not** hydrogen-like.\n" +
        "- **Radioactivity** — heavy elements such as \\(\\text{At}\\) (astatine), \\(\\text{Po}\\) (polonium) and \\(\\text{Rn}\\) (radon) are radioactive; the noble gas \\(\\text{Ar}\\) (argon) is stable and **not** radioactive.",
      table: {
        columns: ["Fact", "Answer", "Watch out for"],
        rows: [
          {
            cells: ["Natural isotopes of nitrogen", "\\(2\\) (\\(^{14}\\text{N}\\), \\(^{15}\\text{N}\\))", "Hydrogen has \\(3\\), not nitrogen"],
            pyqExampleId: "b179ee8a-3b82-4653-9087-062d40291f64",
          },
          {
            cells: ["Hydrogen-like species", "One electron only", "Neutral \\(\\text{He}\\) has \\(2\\) e\\(^-\\), so it is excluded"],
            pyqExampleId: "e02e08ee-c03f-46b1-8394-4dcc2667e8ab",
          },
          {
            cells: ["Not radioactive", "\\(\\text{Ar}\\) (argon)", "\\(\\text{At}\\), \\(\\text{Po}\\), \\(\\text{Rn}\\) are all radioactive"],
            pyqExampleId: "64e82d43-a936-4de3-993f-23063aacb6af",
          },
        ],
        caption: "Three independent recall items — learn the exception in each.",
      },
      pyqExampleId: "e02e08ee-c03f-46b1-8394-4dcc2667e8ab", // NOT hydrogen-like -> He
      selfCheckExample: {
        prompt:
          "Which is NOT a hydrogen-like species: \\(\\text{He}\\), \\(\\text{He}^{+}\\), \\(\\text{Li}^{2+}\\), \\(\\text{Be}^{3+}\\)?",
        steps: [
          "Hydrogen-like means exactly one electron.",
          "\\(\\text{He}^{+}\\), \\(\\text{Li}^{2+}\\), \\(\\text{Be}^{3+}\\) each have \\(1\\) electron.",
          "Neutral \\(\\text{He}\\) has \\(2\\) electrons.",
        ],
        answer: "\\(\\text{He}\\) — it has \\(2\\) electrons, so it is not hydrogen-like.",
      },
      practiceSet: [
        { prompt: "How many natural isotopes does nitrogen have?", answer: "\\(2\\)" },
        { prompt: "Is \\(\\text{Li}^{2+}\\) a hydrogen-like species?", answer: "Yes", method: "\\(3 - 2 = 1\\) electron" },
        { prompt: "Which of At, Po, Rn, Ar is NOT radioactive?", answer: "Ar (argon)" },
        { prompt: "Is neutral helium hydrogen-like?", answer: "No", method: "it has \\(2\\) electrons" },
      ],
      traps: [
        {
          title: "Hydrogen-like means one electron, not 'near hydrogen'",
          body:
            "The test is a **single electron**, so \\(\\text{He}^{+}\\), \\(\\text{Li}^{2+}\\) and \\(\\text{Be}^{3+}\\) qualify but neutral \\(\\text{He}\\) (\\(2\\) e\\(^-\\)) does not. The neutral noble gas is the planted wrong answer.",
        },
        {
          title: "Argon is the stable one",
          body:
            "Among \\(\\text{At}\\), \\(\\text{Po}\\), \\(\\text{Rn}\\) and \\(\\text{Ar}\\), only **argon** is a stable, non-radioactive noble gas; the other three are radioactive heavy elements.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Isotopes and Isoelectronic Species (NDA Chemistry)",
      href: "/notes/nda-chemistry/atomic-structure",
    },
  ],
};
