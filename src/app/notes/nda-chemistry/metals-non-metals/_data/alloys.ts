import type { SubtopicNote } from "@/app/notes/_types";

export const ALLOYS_NOTE: SubtopicNote = {
  subtopicName: "Alloys and Their Composition",
  title: "Alloys and Their Composition",
  oneLineDefinition:
    "Alloys are solid mixtures of a metal with one or more other elements — brass, bronze, steel, amalgam — engineered to beat the pure metal on strength, hardness or corrosion resistance.",
  whyItMatters:
    "A reliable recall pocket — about 4 PYQs. " +
    "The bank asks the composition of a named alloy (bronze = Cu + Sn), which alloy contains a non-metal (steel = Fe + C), the coolant alloy in nuclear reactors (NaK), and which metal is NOT essential to stainless steel. " +
    "Learn the name↔composition table and these are one-line answers.",
  concepts: [
    // composition table
    {
      kind: "reference" as const,
      slug: "alloy-compositions",
      name: "Common alloys and their composition",
      intuition:
        "An alloy mixes a base metal with other elements to improve its properties — brass and bronze are both copper-based, steel adds carbon to iron, amalgam dissolves a metal in mercury. The bank simply asks 'X is an alloy of what?', so memorise each composition.",
      definition:
        "The high-frequency name↔composition facts:\n" +
        "- **Brass** = **copper + zinc** (Cu + Zn).\n" +
        "- **Bronze** = **copper + tin** (Cu + Sn).\n" +
        "- **Steel** = **iron + carbon** (Fe + C) — carbon, a **non-metal**, is the alloying element.\n" +
        "- **Stainless steel** = **iron + chromium + nickel** (+ carbon); essential components are Fe, Cr and Ni — **tin is NOT** part of it.\n" +
        "- **Amalgam** = an alloy in which one component is **mercury** (Hg + another metal).\n" +
        "- **Solder** = **lead + tin** (Pb + Sn).\n" +
        "- **Duralumin** = **aluminium + copper + magnesium + manganese**.",
      table: {
        columns: ["Alloy", "Composition", "Note"],
        rows: [
          { cells: ["Brass", "Copper + Zinc", "Both metals"] },
          {
            cells: ["Bronze", "Copper + Tin", "Cu + Sn — the bank's favourite composition question"],
          },
          {
            cells: ["Steel", "Iron + Carbon", "Carbon is a non-metal — the 'alloy with a non-metal' answer"],
            noteAmber: "Steel is the alloy that contains a NON-METAL (carbon). Brass, bronze and amalgam are metal-only.",
          },
          {
            cells: ["Stainless steel", "Iron + Chromium + Nickel (+ C)", "Tin is NOT an essential component"],
            noteAmber: "Essential components of stainless steel are Fe, Cr and Ni — tin is the odd one out.",
          },
          { cells: ["Amalgam", "Mercury + another metal", "Mercury-based alloy"] },
          { cells: ["Solder", "Lead + Tin", "Low-melting joining alloy"] },
        ],
        caption: "Brass = Cu+Zn, Bronze = Cu+Sn, Steel = Fe+C, Stainless steel = Fe+Cr+Ni, Amalgam = Hg-based.",
      },
      pyqExampleId: "cb5edf8f-529f-4ebe-952d-ce25aa86453d", // bronze is Cu and Sn
      selfCheckExample: {
        prompt: "Of brass, bronze, amalgam and steel, which alloy contains a non-metal, and what is it?",
        steps: [
          "Brass (Cu+Zn), bronze (Cu+Sn) and amalgam (Hg + metal) are all metal-only.",
          "Steel is iron alloyed with carbon, and carbon is a non-metal.",
        ],
        answer: "Steel — it contains carbon, a non-metal.",
      },
      practiceSet: [
        { prompt: "Bronze is an alloy of which two elements?", answer: "Copper and tin (Cu + Sn)" },
        { prompt: "Brass is an alloy of which two metals?", answer: "Copper and zinc" },
        { prompt: "Which alloy contains a non-metal?", answer: "Steel (iron + carbon)" },
        { prompt: "Which metal is NOT essential in stainless steel: chromium, nickel or tin?", answer: "Tin" },
        { prompt: "Amalgam always contains which metal?", answer: "Mercury" },
      ],
      traps: [
        {
          title: "Brass vs bronze — don't swap zinc and tin",
          body:
            "**Brass = copper + zinc**; **bronze = copper + tin**. Both are copper-based, so the trap is mixing up the second metal — zinc for brass, tin for bronze.",
        },
        {
          title: "Tin is not in stainless steel",
          body:
            "Stainless steel's essential metals are **iron, chromium and nickel**. Tin belongs to bronze and solder, not stainless steel — it is the 'NOT essential' answer.",
        },
      ],
    },

    // special-purpose alloys (NaK coolant)
    {
      kind: "reference" as const,
      slug: "special-purpose-alloys",
      name: "Special-purpose alloys",
      intuition:
        "Some alloys are made for one specific job. The sodium-potassium (NaK) alloy is liquid over a wide range and conducts heat extremely well, so it is used as a coolant to transfer heat in nuclear reactors. The bank tests this one directly: which metal is alloyed with sodium to transfer heat in a reactor?",
      definition:
        "Special-purpose alloy facts:\n" +
        "- **NaK** = **sodium + potassium**. It is **liquid** over a wide temperature range and is used as a **heat-transfer coolant in nuclear reactors**.\n" +
        "- **Type metal** = lead + tin + antimony (printing type).\n" +
        "- **Magnalium** = aluminium + magnesium (light, strong).\n" +
        "- **Nichrome** = nickel + chromium (heating elements; high resistance).",
      table: {
        columns: ["Alloy", "Composition", "Special use"],
        rows: [
          {
            cells: ["NaK", "Sodium + Potassium", "Coolant / heat transfer in nuclear reactors"],
            noteAmber: "Potassium is alloyed with sodium (NaK) to transfer heat in nuclear reactors.",
          },
          { cells: ["Nichrome", "Nickel + Chromium", "Heating elements (high resistance)"] },
          { cells: ["Magnalium", "Aluminium + Magnesium", "Light, strong structural parts"] },
          { cells: ["Type metal", "Lead + Tin + Antimony", "Printing type"] },
        ],
        caption: "NaK (sodium + potassium) is the nuclear-reactor heat-transfer coolant.",
      },
      pyqExampleId: "c9f654ef-7ab4-43c5-ad08-80e15156d25c", // metal alloyed with sodium for heat transfer — potassium
      practiceSet: [
        { prompt: "Which metal is alloyed with sodium to transfer heat in a nuclear reactor?", answer: "Potassium (NaK alloy)" },
        { prompt: "Nichrome is an alloy of which two metals?", answer: "Nickel and chromium" },
        { prompt: "What makes NaK suitable as a reactor coolant?", answer: "It is liquid over a wide range and transfers heat well" },
      ],
      traps: [
        {
          title: "NaK coolant uses potassium, not calcium",
          body:
            "The reactor heat-transfer alloy is **sodium + potassium (NaK)**. Calcium, magnesium and strontium are distractors — the partner metal alloyed with sodium is **potassium**.",
        },
      ],
    },
  ],
};
