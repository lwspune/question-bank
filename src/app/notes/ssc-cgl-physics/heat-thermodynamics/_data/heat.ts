import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FHT_HEAT_NOTE: SubtopicNote = {
  subtopicName: "Heat, Latent Heat and Thermodynamics",
  title: "Heat, Latent Heat and Thermodynamics",
  oneLineDefinition:
    "Why steam burns worse than boiling water, how an earthen pot cools water, the copper calorimeter, spit-roasting, the zeroth law, and heat engines.",
  whyItMatters:
    "Six questions in the bank, two from each year's shifts. Each turns on one idea, latent heat most often, so learn why each everyday case works.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscfhthe-heat",
      name: "Heat in daily life",
      intuition:
        "Changing state takes or gives a lot of heat without changing temperature. That hidden heat explains both the steam burn and the cool matka.",
      definition:
        "The cases:\n" +
        "- **Steam** at 100 degrees burns worse than water at 100 degrees: as it condenses on skin it also gives up its **latent heat of vaporisation** (about 2,260 J per gram).\n" +
        "- An **earthen pot** (matka) is porous: water seeps out and **evaporates** from the outside, taking latent heat from the water inside. Water vapour does not come in.\n" +
        "- A **calorimeter** is a thin **copper** vessel: copper conducts well and takes little heat itself.\n" +
        "- **Spit-roasting** cooks food on a turning rod by the fire's **radiant** heat and hot air.",
      table: {
        columns: ["Case", "Reason"],
        rows: [
          { cells: ["Matka keeps water cool", "Evaporation at the surface"], pyqExampleId: "0e124c81-7b94-4cfa-961a-b49d3c20e012" },
          { cells: ["Calorimeter metal", "Copper"], pyqExampleId: "b52938b3-d366-4e32-ad6a-4ee421ff50a8" },
          { cells: ["Food on a rod over a fire", "Spit-roasting"], pyqExampleId: "372700da-bfb2-4838-9ae7-21f29fe68329" },
        ],
      },
      pyqExampleId: "dfb88d8a-f508-4d20-a030-28025404727f",
      selfCheckExample: {
        prompt: "Why does water in a matka stay cooler than water in a steel pot?",
        steps: ["Water seeps through the matka's pores and evaporates outside.", "Evaporation takes latent heat from the water inside; a steel pot has no pores."],
        answer: "Evaporation through its pores draws heat out of the water.",
      },
      practiceSet: [
        { prompt: "Is steam at 100 degrees hotter than water at 100 degrees?", answer: "No; it carries more latent heat" },
        { prompt: "Why is copper used for calorimeters?", answer: "It conducts heat well and has low specific heat" },
        { prompt: "What carries the heat away from a matka?", answer: "Evaporating water" },
      ],
      traps: [
        {
          title: "Steam is not hotter",
          body: "Steam and boiling water are at the **same** 100 degrees. The extra harm comes from **latent heat**, not a higher temperature.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfhthe-laws",
      name: "Laws of thermodynamics and engines",
      intuition:
        "The laws set what heat can and cannot do. SSC asks who named the zeroth law and checks statements about engines.",
      definition:
        "The facts:\n" +
        "- **Zeroth law**: two bodies each in equilibrium with a third are in equilibrium with each other. **Ralph H. Fowler** named it (1930s).\n" +
        "- An ideal (Carnot) engine's **efficiency** = 1 minus Tcold / Thot: it depends **only on the two temperatures**.\n" +
        "- Heat flows from cold to hot **only with work** done (as in a refrigerator).\n" +
        "- A slow, **reversible** expansion gives the **most** work; an irreversible one gives less.",
      table: {
        columns: ["Statement", "True or false"],
        rows: [
          { cells: ["Named the zeroth law", "Ralph H. Fowler"], pyqExampleId: "ae5d88f6-6130-4ab8-912d-cea58bd418e3" },
          { cells: ["Ideal efficiency depends only on temperatures", "True"] },
          { cells: ["Irreversible expansion gives more work", "False"] },
        ],
      },
      pyqExampleId: "c7692637-02d8-4958-bd19-f8333c1415c6",
      selfCheckExample: {
        prompt: "A Carnot engine runs between 600 K and 300 K. What is its efficiency?",
        steps: ["Efficiency = 1 minus 300 / 600.", "1 minus 0.5 = 0.5."],
        answer: "50%.",
      },
      practiceSet: [
        { prompt: "Who named the zeroth law?", answer: "Ralph H. Fowler" },
        { prompt: "Can heat flow from cold to hot without work?", answer: "No" },
        { prompt: "Which expansion gives more work, reversible or irreversible?", answer: "Reversible" },
      ],
      traps: [
        {
          title: "Maxwell stated it, Fowler named it",
          body: "The zeroth law's idea is older, but the **name** came from **Fowler**. Maxwell and Planck are the decoys.",
        },
      ],
    },
  ],
};
