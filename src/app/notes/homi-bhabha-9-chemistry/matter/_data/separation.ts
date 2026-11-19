import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MN_SEPARATION_NOTE: SubtopicNote = {
  subtopicName: "Separating Mixtures",
  title: "Separating Mixtures",
  oneLineDefinition:
    "The parts of a mixture are separated by a difference in their properties: sublimation, distillation and the separating funnel use heat or density, and centrifugation and a magnet use force.",
  whyItMatters:
    "Six questions in the bank, two EASY and four MODERATE. Three show an apparatus and ask what it does or which substance suits it: sublimation of camphor, a separating funnel with two liquids, and distillation. The other three ask for centrifugation, to clean factory smoke and muddy water, or for a magnet.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mnse-heat",
      name: "Sublimation, distillation and the separating funnel",
      intuition:
        "Every method uses one difference between the parts. If one solid turns straight into vapour, heat the mixture and catch the vapour on something cool. If a liquid boils off and leaves the rest behind, boil it and cool the vapour back to a liquid. If two liquids do not mix, let them stand: the lighter floats on the heavier, and you drain the bottom one out through the tap.",
      definition:
        "- **Sublimation**: separates a solid that sublimes (camphor, naphthalene, iodine, ammonium chloride) from one that does not. The mixture is heated in a china dish under an inverted funnel plugged with cotton; the vapour turns back into solid on the cool funnel.\n" +
        "- **Distillation**: the liquid is **boiled** in a flask, and its vapour is **condensed** back to liquid in a water-cooled condenser. It gets pure water from salt water.\n" +
        "- **Fractional distillation**: separates liquids that mix but boil at different temperatures, such as the gases of liquid air and the parts of petroleum.\n" +
        "- **Separating funnel**: separates liquids that **do not mix**. The **lighter** liquid floats on top, the **denser** one sinks and is drained out through the tap. Kerosene, benzene and oil are lighter than water; **chloroform is denser** than water.",
      table: {
        columns: ["Method", "Difference it uses", "Example"],
        rows: [
          { cells: ["Sublimation", "One solid sublimes, the other does not", "Camphor or ammonium chloride from common salt"] },
          { cells: ["Evaporation", "The liquid evaporates, the dissolved solid stays", "Salt from sea water"] },
          { cells: ["Distillation", "The liquid boils off and is condensed", "Pure water from salt water"] },
          { cells: ["Fractional distillation", "Different boiling points of liquids that mix", "Oxygen and nitrogen from liquid air"] },
          { cells: ["Separating funnel", "Liquids that do not mix, of different density", "Kerosene (on top) from water"] },
        ],
        caption: "In a separating funnel the denser liquid is always the bottom layer.",
      },
      selfCheckExample: {
        prompt: "Oil and water are shaken in a separating funnel and left to stand. Which liquid forms the upper layer, and why?",
        steps: ["Oil and water do not mix, so they form two layers.", "Oil is lighter (less dense) than water, so it floats."],
        answer: "Oil, because it is less dense than water.",
      },
      practiceSet: [
        { prompt: "Name a substance, other than camphor, that sublimes on heating.", answer: "Naphthalene, iodine or ammonium chloride" },
        { prompt: "Which method gives pure water from salt water?", answer: "Distillation" },
        { prompt: "What happens to the vapour in the condenser of a distillation set-up?", answer: "It cools and condenses back into a liquid" },
        { prompt: "How are oxygen and nitrogen separated from air?", answer: "By fractional distillation of liquid air" },
      ],
      pyqExampleId: "907ff80b-44b7-4bb4-bd19-a73ad87a2904",
      traps: [
        {
          title: "Putting chloroform on top of water",
          body: "Chloroform is denser than water, so it forms the lower layer. Kerosene and benzene are lighter and float above water.",
        },
        {
          title: "Using a separating funnel for liquids that mix",
          body: "A separating funnel works only for liquids that form two layers. Liquids that mix, such as chloroform and benzene, need fractional distillation.",
        },
        {
          title: "Expecting every white solid to sublime",
          body: "Camphor and ammonium chloride sublime, but common salt, baking soda and alum do not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mnse-force",
      name: "Centrifugation, magnets and other methods",
      intuition:
        "Some particles are too small to settle or be filtered. Spin the mixture very fast and the heavier particles are flung outwards and collect at the bottom of the tube: that is centrifugation. A magnet is simpler still: it pulls out whatever is magnetic, but only if the other part is not.",
      definition:
        "- **Centrifugation**: spinning a mixture very fast so the **heavier particles** move outwards and collect. It separates **cream from milk**, fine clay from **muddy water**, and blood cells in a laboratory. Spinning **cyclone separators** remove dust particles from **factory smoke**.\n" +
        "- **Magnetic separation**: a magnet pulls out the magnetic part. Only **iron, cobalt and nickel** (and their alloys such as steel) are magnetic; copper, aluminium, magnesium, zinc and brass are not. It works only if one part is magnetic and the other is not.\n" +
        "- **Filtration**: an insoluble solid is held back by filter paper.\n" +
        "- **Sedimentation and decantation**: heavy particles settle, and the clear liquid is poured off.\n" +
        "- **Chromatography**: separates the coloured dyes in ink, which travel up the paper at different speeds.",
      table: {
        columns: ["Method", "Separates", "Example"],
        rows: [
          { cells: ["Centrifugation", "Fine suspended particles by spinning", "Cream from milk, clay from muddy water"] },
          { cells: ["Magnet", "A magnetic metal from a non-magnetic one", "Iron filings from sand"] },
          { cells: ["Filtration", "An insoluble solid from a liquid", "Chalk from water"] },
          { cells: ["Sedimentation and decantation", "Heavy particles that settle", "Sand from water"] },
          { cells: ["Chromatography", "Dissolved coloured substances", "Dyes in black ink"] },
        ],
        caption: "A magnet works only when exactly one part is iron, cobalt or nickel.",
      },
      selfCheckExample: {
        prompt: "How would you separate iron filings from sand?",
        steps: ["Iron is magnetic; sand is not.", "Move a magnet through the mixture to pull out the iron."],
        answer: "With a magnet",
      },
      practiceSet: [
        { prompt: "How is cream separated from milk in a dairy?", answer: "By centrifugation" },
        { prompt: "Which method separates the coloured dyes in black ink?", answer: "Chromatography" },
        { prompt: "Can a magnet separate copper powder from aluminium powder?", answer: "No: neither copper nor aluminium is magnetic" },
        { prompt: "What is the spinning device that removes dust from factory smoke called?", answer: "A cyclone separator (it works by centrifugation)" },
      ],
      pyqExampleId: "5eebb0bc-1a26-4b32-8022-3c7d22a9855f",
      traps: [
        {
          title: "Using a magnet when both metals are magnetic",
          body: "A magnet pulls iron, cobalt and nickel alike, so it cannot separate iron from cobalt. One part must be non-magnetic.",
        },
        {
          title: "Thinking very fine particles can be filtered easily",
          body: "The fine clay in muddy water is hard to filter and settles very slowly. Centrifugation separates it quickly.",
        },
      ],
    },
  ],
};
