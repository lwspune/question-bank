import type { SubtopicNote } from "@/app/notes/_types";

export const SI_UNITS_NOTE: SubtopicNote = {
  subtopicName: "SI Units, Physical Properties and Atomic Abundance",
  title: "SI Units, Physical Properties and Atomic Abundance",
  oneLineDefinition:
    "The measurement toolkit of chemistry: the seven SI base units and the derived units built from them, how a property behaves when you change the sample size (intensive vs extensive), and how an element's average atomic mass falls out of its isotopes' masses and abundances.",
  whyItMatters:
    "Six PYQs here, all EASY and all pure recall or one-line computation — the reliable free marks of this chapter. " +
    "They cluster three ways: name-the-unit (SI unit of viscosity, of rate of diffusion; the quantity measured in candela), classify-the-property (which pair is intensive), and one abundance calculation (find isotopic percentages from the average atomic mass of chlorine). " +
    "So the work is mostly memorising two short reference tables plus one mixing formula — the kind of subtopic where a student should never drop a mark.",
  concepts: [
    // FOUNDATION — classification of matter (State Board 1.2)
    {
      kind: "reference" as const,
      slug: "cetsbcc-si-matter-classification",
      name: "Classification of matter",
      intuition:
        "Before any calculation, chemistry sorts matter by composition: pure substances (fixed composition) versus mixtures (variable), and within pure substances, elements versus compounds. Learn the tree and the metal / non-metal / metalloid split — the paper tests these as one-line recall.",
      definition:
        "Matter is classified by its chemical composition:\n" +
        "- **Pure substances** have a fixed composition — either **elements** (cannot be broken into simpler substances by a chemical change) or **compounds** (two or more elements in a fixed mass ratio).\n" +
        "- **Mixtures** have a variable composition — **homogeneous** (uniform throughout, a solution) or **heterogeneous** (non-uniform).\n" +
        "- Elements are further grouped as **metals**, **non-metals** and **metalloids** (intermediate properties).",
      table: {
        columns: ["Category", "Definition", "Example"],
        rows: [
          { cells: ["Element", "A pure substance that cannot be broken into simpler substances by a chemical change.", "Gold, oxygen, iron"] },
          { cells: ["Compound", "A pure substance of two or more elements combined in a fixed proportion by mass.", "Water, table salt, mercuric oxide"] },
          { cells: ["Homogeneous mixture", "A mixture with uniform composition throughout (a solution).", "Salt water, air"] },
          { cells: ["Heterogeneous mixture", "A mixture whose composition is not uniform throughout.", "Sand in water, oil and water"] },
          {
            cells: ["Metal", "Lustrous, malleable and ductile; a good conductor of heat and electricity.", "Copper, silver, iron"],
          },
          {
            cells: ["Non-metal", "Dull and brittle; a poor conductor of heat and electricity.", "Nitrogen, iodine, carbon"],
            noteAmber: "Exceptions the paper likes: graphite (a non-metal) conducts electricity; diamond and iodine have lustre.",
          },
          { cells: ["Metalloid", "An element with properties intermediate between metals and non-metals.", "Silicon, germanium, arsenic"] },
        ],
        caption: "Sort by composition first (pure vs mixture), then refine (element/compound, metal/non-metal/metalloid).",
      },
      practiceSet: [
        { prompt: "Is a compound a pure substance or a mixture?", answer: "A pure substance — it has a fixed composition." },
        { prompt: "What is a homogeneous mixture with uniform composition called?", answer: "A solution." },
        { prompt: "Silicon and germanium belong to which class of element?", answer: "Metalloids." },
        { prompt: "Name a non-metal that is a good conductor of electricity.", answer: "Graphite (a form of carbon)." },
      ],
      traps: [
        {
          title: "A compound is a pure substance, not a mixture",
          body:
            "A compound has a FIXED composition (water is always \\(\\text{H}_2\\text{O}\\)), so it is a **pure substance** — unlike a mixture, whose proportions vary. Distilled water is a pure substance; salt water is a mixture.",
        },
      ],
    },

    // SI base units — reference table (tests the candela question)
    {
      kind: "reference" as const,
      slug: "cetsbcc-si-base-units",
      name: "The seven SI base units",
      intuition:
        "Every measurement in chemistry is ultimately built from seven agreed-upon base units. " +
        "The bank tests these as a straight name-the-unit or name-the-quantity recall, so learn the pairing both ways: quantity to unit and unit to quantity.",
      definition:
        "The **SI (International System)** defines seven **base quantities**, each with one base unit and symbol:\n" +
        "- **Mass** in kilogram \\(\\text{kg}\\); **length** in metre \\(\\text{m}\\); **time** in second \\(\\text{s}\\).\n" +
        "- **Temperature** in kelvin \\(\\text{K}\\); **amount of substance** in mole \\(\\text{mol}\\).\n" +
        "- **Electric current** in ampere \\(\\text{A}\\); **luminous intensity** in candela \\(\\text{cd}\\).\n" +
        "Everything else (volume, force, pressure, viscosity, ...) is a **derived** unit assembled from these.",
      table: {
        columns: ["Base quantity", "Unit", "Symbol"],
        rows: [
          { cells: ["Mass", "kilogram", "kg"] },
          { cells: ["Length", "metre", "m"] },
          { cells: ["Time", "second", "s"] },
          {
            cells: ["Temperature", "kelvin", "K"],
            noteAmber:
              "Note kelvin has no degree sign: write \\(300\\ \\text{K}\\), not \\(300\\ ^\\circ\\text{K}\\).",
          },
          { cells: ["Amount of substance", "mole", "mol"] },
          { cells: ["Electric current", "ampere", "A"] },
          {
            cells: ["Luminous intensity", "candela", "cd"],
            noteAmber:
              "The odd one out that PYQs love — candela measures luminous intensity, not energy, force or work.",
            pyqExampleId: "0811f063-372b-49fc-8f07-9e515405879d",
          },
        ],
        caption: "Learn the pairing in both directions — quantity to unit and unit to quantity.",
      },
      pyqExampleId: "0811f063-372b-49fc-8f07-9e515405879d", // candela -> luminous intensity
      selfCheckExample: {
        prompt: "Which physical quantity has the SI base unit mole?",
        steps: [
          "The mole is one of the seven SI base units.",
          "It is the base unit of the base quantity 'amount of substance'.",
        ],
        answer: "Amount of substance.",
      },
      practiceSet: [
        { prompt: "SI base unit of amount of substance?", answer: "mole (mol)" },
        { prompt: "Candela is the SI unit of which quantity?", answer: "Luminous intensity" },
        { prompt: "SI base unit of temperature?", answer: "kelvin (K)" },
        { prompt: "Which quantity has the SI base unit ampere?", answer: "Electric current" },
      ],
      traps: [
        {
          title: "Candela measures luminous intensity, not energy",
          body:
            "A common distractor set offers energy, work or force for candela. Candela \\(\\text{cd}\\) is strictly the base unit of **luminous intensity**; energy and work are measured in joules and force in newtons.",
        },
      ],
    },

    // Derived units — reference table (tests viscosity + rate of diffusion)
    {
      kind: "reference" as const,
      slug: "cetsbcc-si-derived-units",
      name: "Common SI derived units",
      intuition:
        "A derived unit is just base units multiplied and divided together, dictated by the defining formula of the quantity. " +
        "If you can write the quantity as a formula, you can build its unit — but the bank usually just wants you to recognise the finished unit.",
      definition:
        "A **derived unit** is assembled from base units through the quantity's own defining relation:\n" +
        "- **Volume** \\(= (\\text{length})^3\\), so its unit is \\(\\text{m}^3\\) (litre and \\(\\text{dm}^3\\) are common non-SI equivalents).\n" +
        "- **Rate of diffusion** \\(= \\dfrac{\\text{volume}}{\\text{time}}\\), giving \\(\\text{dm}^3\\,\\text{s}^{-1}\\).\n" +
        "- **Coefficient of viscosity** has unit \\(\\text{N s m}^{-2} = \\text{Pa s}\\) (pascal-second).\n" +
        "- Density, force and pressure follow the same build-from-the-formula rule.",
      table: {
        columns: ["Quantity", "Defining relation", "SI derived unit"],
        rows: [
          { cells: ["Volume", "length cubed", "\\(\\text{m}^3\\)"] },
          {
            cells: ["Density", "mass / volume", "\\(\\text{kg m}^{-3}\\)"],
          },
          {
            cells: ["Force", "mass \\(\\times\\) acceleration", "newton \\(\\text{N} = \\text{kg m s}^{-2}\\)"],
          },
          {
            cells: ["Pressure", "force / area", "pascal \\(\\text{Pa} = \\text{N m}^{-2}\\)"],
          },
          {
            cells: ["Rate of diffusion", "volume / time", "\\(\\text{dm}^3\\,\\text{s}^{-1}\\)"],
            pyqExampleId: "6b49e4ae-d9f3-4032-a46f-a3fd7507efca",
          },
          {
            cells: ["Coefficient of viscosity", "stress / velocity gradient", "\\(\\text{N s m}^{-2} = \\text{Pa s}\\)"],
            noteAmber:
              "Watch the exponents on \\(\\text{s}\\) and \\(\\text{m}\\): the correct form is \\(\\text{N s m}^{-2}\\), not \\(\\text{N s}^{-1}\\text{m}^{-2}\\).",
            pyqExampleId: "70761336-dfaa-49e9-aeae-b294978d5c1f",
          },
        ],
        caption: "Every derived unit is the base units of its defining formula, combined.",
      },
      pyqExampleId: "70761336-dfaa-49e9-aeae-b294978d5c1f", // SI unit of viscosity = N s m^-2
      selfCheckExample: {
        prompt:
          "Rate of diffusion of a gas is measured as the volume diffused per unit time. Volume is in dm3 and time in seconds. What is its SI-style unit?",
        steps: [
          "Rate of diffusion \\(= \\dfrac{\\text{volume}}{\\text{time}}\\).",
          "Put in the units: \\(\\dfrac{\\text{dm}^3}{\\text{s}} = \\text{dm}^3\\,\\text{s}^{-1}\\).",
        ],
        answer: "\\(\\text{dm}^3\\,\\text{s}^{-1}\\).",
      },
      practiceSet: [
        { prompt: "SI unit of coefficient of viscosity?", answer: "\\(\\text{N s m}^{-2}\\) (Pa s)" },
        { prompt: "SI unit of density?", answer: "\\(\\text{kg m}^{-3}\\)" },
        { prompt: "SI unit of pressure?", answer: "pascal (Pa) = \\(\\text{N m}^{-2}\\)" },
        { prompt: "Unit of rate of diffusion (volume in \\(\\text{dm}^3\\))?", answer: "\\(\\text{dm}^3\\,\\text{s}^{-1}\\)" },
      ],
      traps: [
        {
          title: "The exponents on the viscosity unit matter",
          body:
            "Viscosity is \\(\\text{N s m}^{-2}\\) — one power of \\(\\text{s}\\) in the numerator and \\(\\text{m}^{-2}\\). Distractors flip these to \\(\\text{N s}^{-1}\\text{m}^{-2}\\) or \\(\\text{N s m}^{2}\\). Read the exponents carefully before choosing.",
        },
      ],
    },

    // Intensive vs extensive — reference table (tests the intensive-pair question)
    {
      kind: "reference" as const,
      slug: "cetsbcc-si-intensive-extensive-properties",
      name: "Intensive vs extensive properties",
      intuition:
        "Ask one question: if I take a bigger sample, does the value change? If it does, the property is extensive; if it stays put, it is intensive. " +
        "The bank tests this by asking you to pick the pair that are both intensive.",
      definition:
        "Physical properties split by their dependence on the **amount** of substance:\n" +
        "- **Extensive** properties **depend on the amount** — mass, volume, internal energy, heat capacity all double if you double the sample.\n" +
        "- **Intensive** properties are **independent of the amount** — temperature, density, boiling point, surface tension, viscosity and specific heat are the same for a drop or a bucketful.\n" +
        "- A tell-tale: any **ratio of two extensive properties is intensive** (density = mass/volume; specific heat = heat capacity/mass).",
      table: {
        columns: ["Property", "Type", "Why"],
        rows: [
          { cells: ["Mass", "Extensive", "Doubles when the sample doubles."] },
          { cells: ["Volume", "Extensive", "Scales directly with amount."] },
          { cells: ["Internal energy", "Extensive", "Total energy grows with amount."] },
          { cells: ["Heat capacity", "Extensive", "Whole-sample quantity; scales with mass."] },
          { cells: ["Temperature", "Intensive", "A drop and a bucket of the same liquid share it."] },
          { cells: ["Density", "Intensive", "Ratio mass/volume — the amounts cancel."] },
          { cells: ["Boiling point", "Intensive", "Fixed for a pure substance, any amount."] },
          {
            cells: ["Surface tension", "Intensive", "A material property, independent of quantity."],
            pyqExampleId: "2a4bda00-4001-4551-af6e-ab0e904950ea",
          },
          {
            cells: ["Viscosity", "Intensive", "Same for a drop or a barrel of the liquid."],
            noteAmber:
              "Surface tension and viscosity are the intensive pair the bank tests — both material properties, unchanged by sample size.",
          },
          { cells: ["Specific heat", "Intensive", "Heat capacity per unit mass — a ratio, so amounts cancel."] },
        ],
        caption: "Change the sample size in your head: if the value moves, it is extensive.",
      },
      pyqExampleId: "2a4bda00-4001-4551-af6e-ab0e904950ea", // surface tension + viscosity both intensive
      selfCheckExample: {
        prompt:
          "Classify each as intensive or extensive: density, mass, boiling point, volume.",
        steps: [
          "Imagine doubling the sample.",
          "Mass and volume double — they are extensive.",
          "Density and boiling point stay the same — they are intensive.",
        ],
        answer: "Intensive: density, boiling point. Extensive: mass, volume.",
      },
      practiceSet: [
        { prompt: "Is temperature intensive or extensive?", answer: "Intensive" },
        { prompt: "Is volume intensive or extensive?", answer: "Extensive" },
        { prompt: "Density is a ratio of which two extensive properties?", answer: "Mass and volume" },
        { prompt: "Name the intensive pair among: surface tension, mass, viscosity, volume.", answer: "Surface tension and viscosity" },
      ],
      traps: [
        {
          title: "Heat capacity is extensive; specific heat is intensive",
          body:
            "Heat **capacity** is a whole-sample quantity — it scales with mass, so it is **extensive**. Divide it by mass and you get **specific heat**, which is **intensive**. The 'heat capacity and specific heat' option is a mixed pair, not an intensive one.",
        },
      ],
    },

    // Average atomic mass — formula concept (tests the chlorine isotope question)
    {
      kind: "formula" as const,
      slug: "cetsbcc-si-average-atomic-mass",
      name: "Average atomic mass from isotopic abundance",
      intuition:
        "A natural sample of an element is a mixture of isotopes, so its atomic mass is a weighted average — each isotope's mass counted according to how common it is. " +
        "The same formula runs backwards: given the average and the isotope masses, you can solve for the abundances.",
      definition:
        "The **average (relative) atomic mass** is the abundance-weighted mean of the isotope masses:\n" +
        "- Multiply each **isotope mass** by its **fractional abundance** and add.\n" +
        "- Fractional abundance = percentage abundance \\(\\div 100\\); the fractions must sum to 1.\n" +
        "- For a two-isotope element with abundances \\(x\\) and \\(1-x\\), set up \\(m_1 x + m_2(1-x) = \\bar{m}\\) and solve for \\(x\\).",
      formula: {
        label: "Average atomic mass",
        latex: "\\bar{m} = \\sum_i m_i\\,f_i \\quad\\text{where}\\quad \\sum_i f_i = 1",
        symbols: [
          { symbol: "\\(\\bar{m}\\)", meaning: "average atomic mass" },
          { symbol: "m_i", meaning: "mass of isotope i" },
          { symbol: "f_i", meaning: "fractional abundance of isotope i (percentage / 100)" },
        ],
      },
      pyqExampleId: "3100c786-6cf8-4d1c-bfd3-4e17c08f902f", // Cl-35/Cl-37 -> 75%, 25%
      authoredExample: {
        prompt:
          "Boron has two isotopes of masses 10 and 11. Their percentage abundances are 20% and 80%. Find the average atomic mass of boron.",
        steps: [
          "Convert to fractions: \\(f_{10} = 0.20\\), \\(f_{11} = 0.80\\).",
          "Weighted sum: \\(\\bar{m} = 10(0.20) + 11(0.80)\\).",
          "\\(\\bar{m} = 2.0 + 8.8 = 10.8\\).",
        ],
        answer: "\\(10.8\\) u.",
      },
      selfCheckExample: {
        prompt:
          "Silver has two isotopes of masses 107 and 109. Its average atomic mass is 107.9. Find the percentage abundance of each isotope.",
        steps: [
          "Let the fraction of the mass-107 isotope be \\(x\\), so the mass-109 fraction is \\(1-x\\).",
          "Set up the weighted average: \\(107x + 109(1-x) = 107.9\\).",
          "Expand: \\(107x + 109 - 109x = 107.9 \\Rightarrow -2x = -1.1 \\Rightarrow x = 0.55\\).",
          "So mass-107 is \\(55\\%\\) and mass-109 is \\(45\\%\\).",
        ],
        answer: "\\(^{107}\\text{Ag}\\): 55%, \\(^{109}\\text{Ag}\\): 45%.",
      },
      practiceSet: [
        { prompt: "Two isotopes, masses 20 and 22, abundances 90% and 10%. Average mass?", answer: "20.2", method: "\\(20(0.9)+22(0.1)\\)" },
        { prompt: "If fractional abundances are 0.75 and 0.25, what do they sum to?", answer: "1" },
        { prompt: "Convert 25% abundance to a fraction.", answer: "0.25" },
      ],
      traps: [
        {
          title: "Weight by abundance, not a plain average",
          body:
            "For chlorine's masses 35 and 37, a plain average would give 36. The true value 35.5 is lower because the lighter isotope is far more abundant (75%). Always multiply each mass by its fraction before adding — never just average the isotope masses.",
        },
      ],
    },

    // Atomic abundance in the crust — reference table (tests most-abundant element)
    {
      kind: "reference" as const,
      slug: "cetsbcc-si-element-abundance",
      name: "Abundance of elements on Earth",
      intuition:
        "The bank asks which element is most abundant, and the answer depends on where you look: the Earth's crust versus the whole Earth versus the universe give different winners. " +
        "For the crust — the default 'on Earth' answer — oxygen leads.",
      definition:
        "Element abundance is context-dependent, and PYQs default to the **crust**:\n" +
        "- In the **Earth's crust** (by mass), **oxygen** is most abundant (~46%), then silicon, then aluminium.\n" +
        "- For the **Earth as a whole**, iron dominates (the core is iron-rich).\n" +
        "- In the **universe**, hydrogen is by far the most abundant.\n" +
        "Read the question's frame, but 'most abundant on Earth' unqualified means the crust — oxygen.",
      table: {
        columns: ["Domain", "Most abundant element", "Approx. share"],
        rows: [
          {
            cells: ["Earth's crust (by mass)", "Oxygen", "about 46%"],
            noteAmber:
              "This is the default 'most abundant element on Earth' answer the bank wants — oxygen.",
            pyqExampleId: "e277c77e-9083-4d80-9825-79a5a50b2878",
          },
          { cells: ["Earth's crust (2nd)", "Silicon", "about 28%"] },
          { cells: ["Earth's crust (3rd)", "Aluminium", "about 8%"] },
          { cells: ["Whole Earth (by mass)", "Iron", "about 32%"] },
          { cells: ["Universe (by mass)", "Hydrogen", "about 74%"] },
        ],
        caption: "The winner changes with the domain — match the answer to what the question asks.",
      },
      pyqExampleId: "e277c77e-9083-4d80-9825-79a5a50b2878", // most abundant on earth = O
      selfCheckExample: {
        prompt: "Which element is the most abundant in the Earth's crust by mass?",
        steps: [
          "The crust is dominated by silicate minerals, rich in oxygen.",
          "Oxygen makes up about 46% of the crust by mass — more than any other element.",
        ],
        answer: "Oxygen.",
      },
      practiceSet: [
        { prompt: "Most abundant element in the Earth's crust?", answer: "Oxygen" },
        { prompt: "Second most abundant element in the Earth's crust?", answer: "Silicon" },
        { prompt: "Most abundant element in the universe?", answer: "Hydrogen" },
      ],
      traps: [
        {
          title: "Crust versus universe versus whole Earth",
          body:
            "Oxygen tops the **crust**, but hydrogen tops the **universe** and iron tops the **whole Earth**. An unqualified 'most abundant on Earth' means the crust, so choose **oxygen** — not hydrogen.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Mole Concept and Stoichiometry (NDA Chemistry)",
      href: "/notes/nda-chemistry/mole-concept",
    },
  ],
};
