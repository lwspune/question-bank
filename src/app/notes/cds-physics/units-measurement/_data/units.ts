import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_UN_UNITS_NOTE: SubtopicNote = {
  subtopicName: "Units, Prefixes and Dimensions",
  title: "Units, Prefixes and Dimensions",
  oneLineDefinition:
    "The SI units CDS asks about, how to read a unit off a formula, the powers of ten behind each prefix, and how to write and compare dimensions.",
  whyItMatters:
    "Five CDS questions from 2016 (II) to 2021 (I), two of them in the 2016 (II) paper. Each one is a single step: name a unit, convert a prefix, or match two quantities by their dimensions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphun-si-units",
      name: "SI units and reading a unit off a formula",
      intuition:
        "Every unit in physics is built from a few base units: the metre, the kilogram and the second. If you know the formula for a quantity, you know its unit: put the units of each term into the formula and simplify. A spring constant is force per extension, so its unit is newton per metre. Pressure is force per area, so its unit is newton per square metre, which is called the pascal.",
      definition:
        "Units CDS has asked about:\n" +
        "- **Pressure**: SI unit the **pascal**, 1 Pa = 1 N/m².\n" +
        "- **Standard atmosphere**: the pressure of a **760 mm column of mercury at 0 °C**, about **101325 Pa**.\n" +
        "- **Bar**: exactly \\(10^{5}\\) Pa, a little less than one atmosphere.\n" +
        "- **Poise**: the CGS unit of **viscosity**, not of pressure.\n" +
        "- **Spring constant** \\(k\\): from Hooke's law \\(F = kx\\), \\(k = F/x\\), so its unit is **newton per metre (N/m)**.\n" +
        "- **Method**: rearrange the formula so the quantity stands alone, then replace each symbol by its unit.",
      table: {
        columns: ["Quantity or unit", "What to remember"],
        rows: [
          { cells: ["Pressure", "Force per area; SI unit pascal (N/m²)"] },
          {
            cells: ["1 atmosphere", "760 mm of mercury at 0 °C, about 101325 Pa"],
            noteAmber: "CDS 2016 (II): a 760 mm mercury column at 0 °C is one atmosphere, not one pascal or one bar.",
            pyqExampleId: "fbf7bb5c-87b1-461e-a590-76d6b36e6683",
          },
          { cells: ["1 bar", "10⁵ Pa, slightly less than 1 atmosphere"] },
          { cells: ["Poise", "Unit of viscosity (CGS)"] },
          {
            cells: ["Spring constant k", "Force per extension: N/m"],
            noteAmber: "CDS 2020 (I): the unit of the force constant of a spring is N/m.",
            pyqExampleId: "27114052-6e3e-49d6-86f2-050245cfc5d6",
          },
        ],
      },
      pyqExampleId: "fbf7bb5c-87b1-461e-a590-76d6b36e6683",
      selfCheckExample: {
        prompt: "Work is force multiplied by the distance moved. Find the SI unit of work in terms of the newton and the metre, and give its special name.",
        steps: [
          "Write the formula: work = force × distance.",
          "Replace each quantity by its unit: newton × metre.",
          "One newton metre of work is given the name joule.",
        ],
        answer: "Newton metre (N m), called the joule.",
      },
      practiceSet: [
        { prompt: "What is the SI unit of pressure?", answer: "The pascal, equal to one newton per square metre" },
        { prompt: "How many pascals make one bar?", answer: "\\(10^{5}\\) Pa" },
        { prompt: "Of which quantity is the poise a unit?", answer: "Viscosity" },
        { prompt: "Power is work done per second. What is its unit in joules and seconds?", answer: "Joule per second, called the watt" },
      ],
      traps: [
        {
          title: "Atmosphere, bar and pascal are three different sizes",
          body: "One **atmosphere** is the pressure of 760 mm of mercury, about 101325 Pa. One **bar** is exactly 100000 Pa. One **pascal** is tiny, one newton on a square metre. The mercury column always names the atmosphere.",
        },
        {
          title: "Spring constant is per metre, not per square metre",
          body: "\\(k = F/x\\) divides a force by a **length**, so its unit is **N/m**. N/m² divides a force by an **area**: that is the unit of pressure or stress.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphun-prefixes",
      name: "Prefixes, powers of ten and the nanoscale",
      intuition:
        "A prefix is a shorthand for a power of ten stuck in front of a unit. Kilo means a thousand, milli means a thousandth, nano means a billionth. To change a length from one prefix to another, write both as powers of ten of the metre and divide. Nanotechnology gets its name from the nanometre, because it works with things between about 1 and 100 nanometres across.",
      definition:
        "Lengths as powers of ten of the metre:\n" +
        "- **kilometre** \\(10^{3}\\) m, **centimetre** \\(10^{-2}\\) m, **millimetre** \\(10^{-3}\\) m.\n" +
        "- **micrometre** (micron, μm) \\(10^{-6}\\) m, **nanometre** \\(10^{-9}\\) m, **picometre** \\(10^{-12}\\) m.\n" +
        "- **Ångström** (Å) \\(10^{-10}\\) m, so **1 nm = 10 Å**.\n" +
        "- **To convert**, divide the powers: from metres to centimetres, multiply by \\(10^{2}\\).\n" +
        "- **Nanotechnology** studies and builds structures of about **1 to 100 nm**, where materials behave differently from the bulk solid.",
      table: {
        columns: ["Prefix or unit", "Power of ten (in metres)"],
        rows: [
          { cells: ["kilo (km)", "10³"] },
          { cells: ["centi (cm)", "10⁻²"] },
          { cells: ["milli (mm)", "10⁻³"] },
          { cells: ["micro (μm)", "10⁻⁶"] },
          {
            cells: ["nano (nm)", "10⁻⁹, which is 10⁻⁷ cm"],
            noteAmber: "CDS 2018 (I): one nanometre is 10⁻⁷ cm.",
            pyqExampleId: "cce58f84-90b2-4bac-bcf9-d2d694dd276b",
          },
          { cells: ["ångström (Å)", "10⁻¹⁰"] },
          {
            cells: ["Nanoscale", "About 1 to 100 nm"],
            noteAmber: "CDS 2021 (I): the particles studied in nanotechnology are about 1 to 100 nm in size.",
            pyqExampleId: "433148b9-3027-4442-a046-1c9933ae9484",
          },
        ],
      },
      pyqExampleId: "cce58f84-90b2-4bac-bcf9-d2d694dd276b",
      selfCheckExample: {
        prompt: "Express one micrometre in centimetres.",
        steps: [
          "One micrometre is \\(10^{-6}\\) m.",
          "One metre is \\(10^{2}\\) cm, so multiply by \\(10^{2}\\).",
          "\\(10^{-6} \\times 10^{2} = 10^{-4}\\).",
        ],
        answer: "\\(1\\ \\mu\\text{m} = 10^{-4}\\) cm.",
      },
      practiceSet: [
        { prompt: "How many ångströms make one nanometre?", answer: "10" },
        { prompt: "Express one nanometre in millimetres.", answer: "\\(10^{-6}\\) mm", method: "\\(10^{-9}\\) m × \\(10^{3}\\) mm per m" },
        { prompt: "How many millimetres make one kilometre?", answer: "\\(10^{6}\\)" },
        { prompt: "Which power of ten of the metre is one picometre?", answer: "\\(10^{-12}\\) m" },
      ],
      traps: [
        {
          title: "A nanometre is 10⁻⁹ metre, not 10⁻⁹ centimetre",
          body: "The power \\(10^{-9}\\) belongs to the **metre**. In centimetres one nanometre is \\(10^{-9} \\times 10^{2} = 10^{-7}\\) cm. Converting the unit changes the power.",
        },
        {
          title: "The nanoscale runs to 100 nm",
          body: "Nanotechnology covers about **1 to 100 nm**. A range like 1 Å to 10 nm is too small at both ends, and anything in micrometres or millimetres is far too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphun-dimensions",
      name: "Dimensions of a physical quantity",
      intuition:
        "The dimensions of a quantity say how it is built from mass (M), length (L) and time (T). Speed is length over time, so it is L T⁻¹. Two quantities with the same dimensions can be measured in the same unit, even when they mean different things. To find dimensions, start from a formula and replace every symbol by its dimensions.",
      definition:
        "How to write and compare dimensions:\n" +
        "- Velocity \\([\\text{L}\\text{T}^{-1}]\\), acceleration \\([\\text{L}\\text{T}^{-2}]\\), force = mass × acceleration \\([\\text{M}\\text{L}\\text{T}^{-2}]\\).\n" +
        "- Energy and work = force × distance \\([\\text{M}\\text{L}^{2}\\text{T}^{-2}]\\); torque has the **same** dimensions.\n" +
        "- Linear momentum = mass × velocity \\([\\text{M}\\text{L}\\text{T}^{-1}]\\).\n" +
        "- Angular momentum = linear momentum × distance \\([\\text{M}\\text{L}^{2}\\text{T}^{-1}]\\).\n" +
        "- **Planck's constant** \\(h = E/\\nu\\) is energy × time (unit J s), so it has the dimensions \\([\\text{M}\\text{L}^{2}\\text{T}^{-1}]\\), the same as angular momentum.",
      formula: {
        label: "Common dimensional formulas",
        latex:
          "[F] = [\\text{M}\\text{L}\\text{T}^{-2}] \\qquad [E] = [\\text{M}\\text{L}^{2}\\text{T}^{-2}] \\qquad [p] = [\\text{M}\\text{L}\\text{T}^{-1}] \\qquad [L] = [h] = [\\text{M}\\text{L}^{2}\\text{T}^{-1}]",
        symbols: [
          { symbol: "F", meaning: "force" },
          { symbol: "E", meaning: "energy or work" },
          { symbol: "p", meaning: "linear momentum" },
          { symbol: "L, h", meaning: "angular momentum and Planck's constant" },
        ],
      },
      authoredExample: {
        prompt: "Pressure is force divided by area. Find the dimensions of pressure.",
        steps: [
          "Force has dimensions \\([\\text{M}\\text{L}\\text{T}^{-2}]\\).",
          "Area is length × length, \\([\\text{L}^{2}]\\).",
          "Divide: \\([\\text{M}\\text{L}\\text{T}^{-2}] / [\\text{L}^{2}] = [\\text{M}\\text{L}^{-1}\\text{T}^{-2}]\\).",
        ],
        answer: "\\([\\text{M}\\text{L}^{-1}\\text{T}^{-2}]\\)",
      },
      selfCheckExample: {
        prompt: "Impulse is force multiplied by the time for which it acts. Show that impulse has the same dimensions as linear momentum.",
        steps: [
          "Impulse = force × time = \\([\\text{M}\\text{L}\\text{T}^{-2}] \\times [\\text{T}] = [\\text{M}\\text{L}\\text{T}^{-1}]\\).",
          "Linear momentum = mass × velocity = \\([\\text{M}] \\times [\\text{L}\\text{T}^{-1}] = [\\text{M}\\text{L}\\text{T}^{-1}]\\).",
        ],
        answer: "Both are \\([\\text{M}\\text{L}\\text{T}^{-1}]\\), so they have the same dimensions.",
      },
      pyqExampleId: "52880b78-2d3a-4f7a-bec1-103ad4403aa2",
      practiceSet: [
        { prompt: "What are the dimensions of power, which is work done per second?", answer: "\\([\\text{M}\\text{L}^{2}\\text{T}^{-3}]\\)" },
        { prompt: "Which quantity has the same dimensions as work: torque or force?", answer: "Torque, \\([\\text{M}\\text{L}^{2}\\text{T}^{-2}]\\)" },
        { prompt: "What are the dimensions of acceleration?", answer: "\\([\\text{L}\\text{T}^{-2}]\\)" },
        { prompt: "What are the dimensions of kinetic energy?", answer: "\\([\\text{M}\\text{L}^{2}\\text{T}^{-2}]\\)", method: "\\(\\tfrac{1}{2}mv^{2}\\): the half has no dimensions" },
      ],
      traps: [
        {
          title: "Planck's constant matches angular momentum, not linear momentum",
          body: "Planck's constant has the unit **joule second**, \\([\\text{M}\\text{L}^{2}\\text{T}^{-1}]\\). Linear momentum is only \\([\\text{M}\\text{L}\\text{T}^{-1}]\\): it lacks one power of length. Angular momentum, which is momentum × distance, has that extra L.",
        },
        {
          title: "Numbers carry no dimensions",
          body: "A pure number such as the half in \\(\\tfrac{1}{2}mv^{2}\\), or \\(2\\pi\\), has no dimensions. Drop it before comparing two quantities.",
        },
      ],
    },
  ],
};
