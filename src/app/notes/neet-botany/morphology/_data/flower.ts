import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MO_FLOWER_NOTE: SubtopicNote = {
  subtopicName: "The Flower",
  title: "The Flower",
  oneLineDefinition:
    "The flower as a modified shoot, its symmetry, where the ovary sits on the thalamus, how sepals and petals lie in the bud, and how stamens are attached and joined.",
  whyItMatters:
    "Eight NEET questions, every year from 2021 to 2025: three EASY and five MODERATE. Symmetry alone was asked three times, in 2022, 2024 and 2025, and pea is the answer or an option in five of the eight.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomo-symmetry",
      name: "The flower and its symmetry",
      visualizationSlug: "repro-flower-structure",
      intuition:
        "A flower is a shoot that has been changed for reproduction. Its axis stays short, and instead of leaves it carries four whorls of floral parts. NEET most often asks one thing about the whole flower: can it be cut into two equal halves along many planes, along only one, or along none? Learn the NCERT plants for each answer.",
      definition:
        "The flower in NCERT:\n" +
        "- A flower is a **modified shoot**: the **shoot apical meristem** changes into a **floral meristem**. The internodes do not lengthen, so the axis is **condensed**, and the apex makes floral parts at successive nodes **instead of leaves**.\n" +
        "- Four whorls sit on the **thalamus** (receptacle): **calyx**, **corolla**, **androecium**, **gynoecium**. Calyx and corolla are accessory organs; androecium and gynoecium are the reproductive organs.\n" +
        "- In lily, calyx and corolla look alike and are called the **perianth**.\n" +
        "- **Bisexual**: has both androecium and gynoecium. **Unisexual**: has only one of them.\n" +
        "- **Trimerous**, **tetramerous**, **pentamerous**: floral parts in multiples of 3, 4 or 5.\n" +
        "- **Bracteate** flowers have a **bract** (a reduced leaf) at the base of the pedicel; **ebracteate** flowers have none.",
      table: {
        columns: ["Symmetry", "How the flower can be divided", "NCERT examples"],
        rows: [
          {
            cells: ["Actinomorphic (radial)", "Into two equal halves along any radial plane through the centre", "Mustard, *Datura*, chilli"],
            noteAmber: "NEET 2024: Datura was the actinomorphic flower among Cassia, Pisum and Sesbania.",
            pyqExampleId: "029df419-4b24-4ba8-97a1-0796bb3a855b",
          },
          {
            cells: ["Zygomorphic (bilateral)", "Into two similar halves along only one particular vertical plane", "Pea, gulmohur, bean, *Cassia*"],
            noteAmber: "NEET 2025: pea was the zygomorphic flower among Petunia, Datura and chilli.",
            pyqExampleId: "518d457f-acce-47ac-b5fb-6c391dfb8092",
          },
          { cells: ["Asymmetric (irregular)", "Cannot be divided into two similar halves by any vertical plane", "Canna"] },
        ],
      },
      pyqExampleId: "2736dca8-c308-4336-9ec9-eeba677ddc7e",
      selfCheckExample: {
        prompt: "No vertical plane can cut a canna flower into two similar halves. What is this kind of symmetry called, and how is it different from a zygomorphic flower?",
        steps: [
          "A flower that cannot be divided into similar halves by any vertical plane is asymmetric, or irregular.",
          "A zygomorphic flower can be divided into two similar halves, but only along one vertical plane.",
        ],
        answer: "Asymmetric (irregular). A zygomorphic flower still has one plane of symmetry; canna has none.",
      },
      practiceSet: [
        { prompt: "What are the sepals and petals of a lily called, since they look alike?", answer: "The perianth" },
        { prompt: "What is a flower with its floral parts in multiples of four called?", answer: "Tetramerous" },
        { prompt: "What is a flower with only stamens, or only carpels, called?", answer: "Unisexual" },
        { prompt: "What is the reduced leaf at the base of the pedicel of a flower called?", answer: "A bract" },
        { prompt: "On which part of the flower are the four whorls borne?", answer: "The thalamus (receptacle)" },
      ],
      traps: [
        {
          title: "Cassia and gulmohur are zygomorphic",
          body: "NCERT lists **pea, gulmohur, bean and *Cassia*** as zygomorphic. **Mustard, *Datura* and chilli** are actinomorphic. Petunia is in Solanaceae, whose flowers NCERT describes as actinomorphic, so it is actinomorphic too.",
        },
        {
          title: "In a flower the internodes do not lengthen",
          body: "A flower forms when the shoot apex becomes a floral meristem and the **internodes stay short**, so the axis is condensed. A statement that the internodes elongate in a flower is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-position-aestivation",
      name: "Ovary position and aestivation",
      intuition:
        "Two different arrangements are asked here. The first is where the ovary sits compared with the other floral parts on the thalamus: above them, level with them, or sunk below them. The second is aestivation: how the sepals or petals of one whorl lie against each other inside the closed bud.",
      definition:
        "Position of the ovary:\n" +
        "- **Hypogynous**: the gynoecium is at the **highest** point and the other parts are below it; the ovary is **superior**.\n" +
        "- **Perigynous**: the gynoecium is in the centre and the other parts sit on the **rim** of the thalamus, almost at the same level; the ovary is **half inferior**.\n" +
        "- **Epigynous**: the thalamus grows up around the ovary, encloses it and fuses with it; the other parts arise **above** the ovary; the ovary is **inferior**.\n" +
        "**Aestivation** is the way sepals or petals are arranged in the floral bud with respect to the other members of the **same whorl**.",
      table: {
        columns: ["Term", "What it means", "NCERT examples"],
        rows: [
          { cells: ["Hypogynous", "Ovary superior; other parts below it", "Mustard, china rose, brinjal"] },
          {
            cells: ["Perigynous", "Ovary half inferior; other parts on the rim of the thalamus", "Plum, rose, peach"],
            noteAmber: "NEET 2024 showed two drawings and both were perigynous; Re-NEET 2024 matched peach with perigynous.",
            pyqExampleId: "9b812f56-328b-4674-b8b6-e80ae6952175",
          },
          { cells: ["Epigynous", "Ovary inferior; other parts arise above it", "Guava, cucumber, ray florets of sunflower"] },
          { cells: ["Valvate aestivation", "Sepals or petals just touch at the margins, without overlapping", "*Calotropis*"] },
          { cells: ["Twisted aestivation", "One margin of each part overlaps the next one, all in the same direction", "China rose, lady's finger, cotton"] },
          { cells: ["Imbricate aestivation", "Margins overlap, but not in any particular direction", "*Cassia*, gulmohur"] },
          { cells: ["Vexillary (papilionaceous) aestivation", "Five petals: the largest, the standard, overlaps the two wings, which overlap the two smallest front petals, the keel", "Pea, bean"] },
        ],
      },
      pyqExampleId: "be7cceed-18c8-41c3-aa23-744b0146a27a",
      selfCheckExample: {
        prompt: "In the bud of a lady's finger flower, one margin of each petal overlaps the next petal, and this goes on in the same direction all the way round. Name the aestivation and one more NCERT example of it.",
        steps: [
          "Each petal overlapping the next one, always in the same direction, is twisted aestivation.",
          "NCERT gives china rose, lady's finger and cotton as its examples.",
        ],
        answer: "Twisted aestivation; china rose or cotton also show it.",
      },
      practiceSet: [
        { prompt: "In a guava flower the sepals, petals and stamens arise above the ovary. What is the position of its ovary?", answer: "Inferior (the flower is epigynous)" },
        { prompt: "Which type of aestivation is seen in *Calotropis*?", answer: "Valvate" },
        { prompt: "In vexillary aestivation, what is the largest petal called?", answer: "The standard (vexillum)" },
        { prompt: "What is the position of the ovary in a perigynous flower?", answer: "Half inferior" },
        { prompt: "Name the aestivation in which margins overlap but in no particular direction, with an NCERT example.", answer: "Imbricate, as in *Cassia* or gulmohur" },
      ],
      traps: [
        {
          title: "Rose is perigynous, not hypogynous",
          body: "**Rose, plum and peach** are perigynous with a **half inferior** ovary. **Mustard, china rose and brinjal** are hypogynous with a **superior** ovary. Rose and china rose are different plants.",
        },
        {
          title: "Aestivation is within one whorl",
          body: "Aestivation compares sepals with sepals, or petals with petals, of the **same whorl** in the bud. It says nothing about where the ovary sits.",
        },
        {
          title: "Cassia is imbricate, not vexillary",
          body: "Vexillary aestivation belongs to **pea and bean**. *Cassia* and gulmohur are zygomorphic too, but their aestivation is **imbricate**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-androecium",
      name: "Stamens: attachment and union",
      intuition:
        "The androecium is the whorl of stamens. NEET asks two things about it: what the stamens are attached to, and whether they are free or joined into bundles. Count the bundles and you have the name: one bundle, two bundles, or more than two.",
      definition:
        "The androecium in NCERT:\n" +
        "- Each **stamen** has a stalk, the **filament**, and an **anther**. The anther is usually **bilobed** and each lobe has **two chambers**, the pollen sacs.\n" +
        "- A sterile stamen is a **staminode**.\n" +
        "- **Epipetalous**: stamens attached to the **petals**. **Epiphyllous**: stamens attached to the **perianth**.\n" +
        "- Stamens may be **free** (polyandrous) or **united** in varying degrees: one bundle, two bundles or more than two bundles.\n" +
        "- The filaments in one flower may differ in length.",
      table: {
        columns: ["Condition", "What it means", "NCERT example"],
        rows: [
          { cells: ["Epipetalous", "Stamens attached to the petals", "Brinjal"] },
          { cells: ["Epiphyllous", "Stamens attached to the perianth", "Lily"] },
          { cells: ["Monoadelphous", "Stamens united in one bundle", "China rose"] },
          {
            cells: ["Diadelphous", "Stamens united in two bundles", "Pea"],
            noteAmber: "NEET 2021: pea is the diadelphous example; china rose is monoadelphous and Citrus polyadelphous.",
            pyqExampleId: "2d99d65b-202a-4a6c-b61e-0509fa37aac0",
          },
          { cells: ["Polyadelphous", "Stamens united in more than two bundles", "*Citrus*"] },
          { cells: ["Filaments of different lengths", "Stamens of unequal length in the same flower", "*Salvia*, mustard"] },
        ],
      },
      pyqExampleId: "d37651fb-294b-4b74-8f25-ba89b62b3082",
      selfCheckExample: {
        prompt: "A mustard flower has six stamens: four long and two short. Which feature of the androecium does this show, and which other NCERT plant shows it?",
        steps: [
          "Stamens of unequal length in one flower show variation in the length of the filaments.",
          "NCERT gives *Salvia* and mustard as its examples.",
        ],
        answer: "Filaments of different lengths in the same flower, also seen in *Salvia*.",
      },
      practiceSet: [
        { prompt: "What is a sterile stamen called?", answer: "A staminode" },
        { prompt: "What are the two parts of a stamen?", answer: "The filament and the anther" },
        { prompt: "How many chambers (pollen sacs) does a typical bilobed anther have in all?", answer: "Four: two in each lobe" },
        { prompt: "In the diadelphous androecium of pea, how are its ten stamens grouped?", answer: "Nine joined in one bundle and one free" },
      ],
      traps: [
        {
          title: "Count bundles, not stamens",
          body: "**Diadelphous** means **two bundles**, not two stamens: pea has ten stamens in a bundle of nine and a single free one. **Monoadelphous** is one bundle (china rose) and **polyadelphous** more than two (*Citrus*).",
        },
        {
          title: "Epiphyllous is the perianth, not the leaf",
          body: "**Epiphyllous** stamens are attached to the **perianth**, as in lily. Stamens attached to **petals** are **epipetalous**, as in brinjal.",
        },
      ],
    },
  ],
};
