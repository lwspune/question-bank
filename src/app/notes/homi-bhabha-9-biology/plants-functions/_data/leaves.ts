import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_PF_LEAVES_NOTE: SubtopicNote = {
  subtopicName: "Transpiration and Photosynthesis",
  title: "Transpiration and Photosynthesis",
  oneLineDefinition:
    "A leaf loses water as vapour through its stomata (transpiration) and as drops through hydathodes (guttation), and it makes glucose from carbon dioxide and water using sunlight (photosynthesis).",
  whyItMatters:
    "Four questions in the bank, two EASY, one MODERATE and one HARD: which side of a leaf turns cobalt chloride paper pink first, the name for water lost as drops, the time of day when root pressure pushes water up, and the leaf seen as a factory with its power, raw materials and products.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9pfle-transpiration",
      name: "Transpiration, guttation and root pressure",
      intuition:
        "A big tree lifts hundreds of litres of water a day without a pump. By day, water evaporates from the tiny pores of the leaves and pulls the column of water up behind it, like a drink up a straw. At night the pores close and that pull stops; then the roots push water up from below. If they push hard, drops of water appear at the leaf tips by morning.",
      definition:
        "- **Transpiration**: loss of water as **vapour**, mainly through **stomata**. In a dicot leaf most stomata are on the **lower surface**, so the lower side loses more water.\n" +
        "- **Cobalt chloride paper** is **blue when dry** and turns **pink when moist**: the paper on the side with more stomata turns pink first.\n" +
        "- **Guttation**: loss of water as liquid **drops** from **hydathodes** at the tips and edges of leaves, seen in the early morning on grass and colocasia.\n" +
        "- **Transpiration pull** lifts water during the **day**. At **night** the stomata close, transpiration is very low, and **root pressure** is what pushes water up.\n" +
        "- Transpiration keeps the leaf cool and helps carry water and minerals up from the roots.",
      table: {
        columns: ["Process", "Water lost as", "Through", "Main time"],
        rows: [
          { cells: ["Transpiration", "Vapour", "Stomata", "Day"] },
          { cells: ["Guttation", "Liquid drops", "Hydathodes at leaf tips and edges", "Night and early morning"] },
        ],
        caption: "Root pressure acts most at night, when transpiration pull is weak.",
      },
      selfCheckExample: {
        prompt: "Early on a cool morning, drops of water line the tips of grass blades although it has not rained and there is no dew on the ground nearby. What is this called, and through what does the water come out?",
        steps: ["Water lost as liquid drops, not vapour, is guttation.", "It comes out through hydathodes at the leaf tips."],
        answer: "Guttation, through hydathodes",
      },
      practiceSet: [
        { prompt: "What colour does dry cobalt chloride paper turn when it absorbs moisture?", answer: "From blue to pink" },
        { prompt: "Through which pores does a leaf lose most of its water vapour?", answer: "Through the stomata" },
        { prompt: "On which surface of a mango leaf are most stomata found?", answer: "On the lower surface" },
        { prompt: "What lifts water up a tree during a sunny afternoon?", answer: "The transpiration pull from the leaves" },
      ],
      pyqExampleId: "419d92e9-f88f-4ae3-b3b4-9dee4b5a9cf4",
      traps: [
        {
          title: "Calling the drops at a leaf tip transpiration",
          body: "Transpiration is loss of water as vapour through stomata. Drops of liquid water from hydathodes are guttation.",
        },
        {
          title: "Thinking the upper surface loses more water",
          body: "In a dicot leaf most stomata are on the lower surface, so the lower side gives out more water vapour.",
        },
        {
          title: "Putting root pressure at midday",
          body: "At midday transpiration pull does the lifting. Root pressure matters most at night, when the stomata are closed.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9pfle-photosynthesis",
      name: "Photosynthesis: the leaf as a factory",
      intuition:
        "A factory needs power, raw materials and machines, and it turns out a product and some waste. A leaf is just such a factory. Sunlight is the power, carbon dioxide and water are the raw materials, chlorophyll in the chloroplasts is the machine, glucose is the product, and oxygen is the waste it lets out.",
      definition:
        "- **Photosynthesis**: green plants make **glucose** from **carbon dioxide** and **water**, using **sunlight** and **chlorophyll**, and give out **oxygen**.\n" +
        "- \\(\\mathrm{6CO_2 + 6H_2O \\xrightarrow{\\text{sunlight, chlorophyll}} C_6H_{12}O_6 + 6O_2}\\)\n" +
        "- Carbon dioxide enters through the **stomata**; water comes up from the roots.\n" +
        "- The glucose is stored as **starch**: a leaf kept in sunlight turns **blue-black with iodine**.",
      table: {
        columns: ["Part of the factory", "In the leaf"],
        rows: [
          { cells: ["Power", "Sunlight"] },
          { cells: ["Raw materials", "Carbon dioxide and water"] },
          { cells: ["Machine", "Chlorophyll in the chloroplasts"] },
          { cells: ["End product", "Glucose (stored as starch)"] },
          { cells: ["By-products", "Oxygen and water"] },
        ],
        caption: "Oxygen is given out; carbon dioxide is taken in.",
      },
      selfCheckExample: {
        prompt: "Which gas does a leaf take in for photosynthesis, and through which openings does it enter?",
        steps: ["Carbon dioxide is one of the raw materials.", "Gases enter and leave the leaf through the stomata."],
        answer: "Carbon dioxide, through the stomata",
      },
      practiceSet: [
        { prompt: "Which pigment traps sunlight for photosynthesis?", answer: "Chlorophyll" },
        { prompt: "In what form is the glucose made by a leaf stored?", answer: "As starch" },
        { prompt: "What colour does a starch-filled leaf turn when iodine is put on it?", answer: "Blue-black" },
        { prompt: "In which part of a leaf cell does photosynthesis take place?", answer: "In the chloroplasts" },
      ],
      pyqExampleId: "af4d87b4-85fe-438f-92bb-0141d0c5d612",
      traps: [
        {
          title: "Calling oxygen a raw material",
          body: "Carbon dioxide and water are the raw materials. Oxygen is given out as a by-product.",
        },
        {
          title: "Calling sunlight a raw material",
          body: "Sunlight supplies the energy (the power); it does not become part of the glucose.",
        },
      ],
    },
  ],
};
