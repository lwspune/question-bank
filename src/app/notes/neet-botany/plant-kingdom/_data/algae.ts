import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PK_ALGAE_NOTE: SubtopicNote = {
  subtopicName: "Algae",
  title: "Algae",
  oneLineDefinition:
    "What algae are, the three ways they reproduce sexually, the green, brown and red classes with their pigments, stored food and cell walls, and what algae are used for.",
  whyItMatters:
    "Six NEET questions from 2021 to 2024: three in 2021, two in 2022 and one in NEET 2024, none since. Carrageen was asked twice (2021 and 2022) and mannitol twice (2021 and 2022). Almost all of them test one row of NCERT's table of the three algal classes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopk-algae-basics",
      name: "What algae are and how they reproduce",
      intuition:
        "Algae are the simplest plants in this chapter. They have chlorophyll, make their own food and mostly live in water. Their body is a thallus: it is not split into root, stem and leaf. They reproduce in three ways. A piece breaks off and grows (vegetative), special spores form (asexual), or two gametes fuse (sexual). The sexual kind has three types, told apart by the size and movement of the gametes.",
      definition:
        "Algae, as NCERT describes them:\n" +
        "- **Chlorophyll-bearing, simple, thalloid, autotrophic** and largely **aquatic** (fresh water and marine). Some live on moist stones, soil and wood; some live with fungi (**lichen**) and with animals (on the **sloth bear**).\n" +
        "- **Form**: colonial like *Volvox*, filamentous like *Ulothrix* and *Spirogyra*; marine **kelps** form massive plant bodies.\n" +
        "- **Vegetative** reproduction: by **fragmentation**.\n" +
        "- **Asexual** reproduction: by spores, most commonly **zoospores**, which are flagellated and motile.\n" +
        "- **Sexual** reproduction: **isogamous**, **anisogamous** or **oogamous** (see the table).",
      table: {
        columns: ["Kind of sexual reproduction", "The gametes", "NCERT example"],
        rows: [
          { cells: ["Isogamous, flagellated", "Similar in size and with flagella", "*Chlamydomonas*"] },
          { cells: ["Isogamous, non-flagellated", "Similar in size, without flagella", "*Spirogyra*"] },
          { cells: ["Anisogamous", "Dissimilar in size", "Some species of *Chlamydomonas*"] },
          { cells: ["Oogamous", "Large non-motile female gamete and small motile male gamete", "*Volvox*, *Fucus*"] },
        ],
        caption: "NEET 2021 asked which of papaya, *Chara*, *Marchantia polymorpha* and *Cycas circinalis* is monoecious (male and female sex organs on one plant). Its key is *Chara*; the other three are dioecious.",
      },
      pyqExampleId: "50656ef9-3013-4fa8-92c6-a880786a77b6",
      selfCheckExample: {
        prompt: "In an alga, a large egg that cannot move is fertilised by a small male gamete that swims. What kind of sexual reproduction is this, and which NCERT algae show it?",
        steps: [
          "The gametes differ in size, and only the male one moves.",
          "A large non-motile female gamete with a small motile male gamete is oogamy.",
        ],
        answer: "Oogamous reproduction, as in *Volvox* and *Fucus*.",
      },
      practiceSet: [
        { prompt: "What are the flagellated, motile asexual spores of algae called?", answer: "Zoospores" },
        { prompt: "By what method do algae reproduce vegetatively?", answer: "Fragmentation" },
        { prompt: "What is sexual reproduction called when the two fusing gametes are of different sizes?", answer: "Anisogamous" },
        { prompt: "Name an alga whose gametes are similar in size but have no flagella.", answer: "*Spirogyra*" },
        { prompt: "Which colonial alga does NCERT name as an example of algal form?", answer: "*Volvox*" },
      ],
      traps: [
        {
          title: "Spirogyra is isogamous, not oogamous",
          body: "*Spirogyra* fuses gametes of the **same size** that have **no flagella**, so it is **isogamous**. *Volvox* and *Fucus* are the **oogamous** examples.",
        },
        {
          title: "Isogamy does not need flagella",
          body: "Isogamy only means the gametes are **similar in size**. In *Chlamydomonas* they have flagella; in *Spirogyra* they do not. Both are isogamous.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-algae-classes",
      name: "The three classes of algae",
      intuition:
        "Algae are sorted into three classes: green, brown and red. The colour comes from the main pigment, and each class also has its own stored food, cell wall and flagella. NEET builds its questions from this one table, often by pairing an alga with the wrong food or pigment. So learn the table across each row, and learn which genus sits in which class.",
      definition:
        "Key points beyond the table:\n" +
        "- **Chlorophyceae** (green): chloroplasts may be discoid, plate-like, reticulate, cup-shaped, spiral or ribbon-shaped. Most have **pyrenoids**, which store protein besides starch. Some store food as **oil droplets**. Cell wall: inner layer of **cellulose**, outer layer of **pectose**.\n" +
        "- **Phaeophyceae** (brown): mostly marine. Colour runs from olive green to brown with the amount of **fucoxanthin**. Body has a **holdfast**, a stalk (**stipe**) and a leaf-like **frond**. Asexual reproduction by **biflagellate zoospores**, pear-shaped, with two **unequal, laterally attached** flagella. Sexual reproduction may be **isogamous, anisogamous or oogamous**.\n" +
        "- **Rhodophyceae** (red): red from **r-phycoerythrin**. Mostly marine, more in warmer areas, from the lit surface to great depths. **Floridean starch** is very like amylopectin and glycogen. Asexual spores and gametes are **non-motile**; sexual reproduction is **oogamous**.",
      table: {
        columns: ["Point", "Chlorophyceae (green)", "Phaeophyceae (brown)", "Rhodophyceae (red)"],
        rows: [
          { cells: ["Main pigments", "Chlorophyll a and b", "Chlorophyll a and c, fucoxanthin", "Chlorophyll a and d, phycoerythrin"] },
          {
            cells: ["Stored food", "Starch", "Mannitol and laminarin", "Floridean starch"],
            noteAmber: "NEET 2021: of *Ectocarpus*, *Gracilaria*, *Volvox* and *Ulothrix*, only the brown alga *Ectocarpus* stores mannitol.",
            pyqExampleId: "79602758-9ed2-4cdd-a1a8-b77bf7423f78",
          },
          { cells: ["Cell wall", "Cellulose", "Cellulose and algin", "Cellulose, pectin and poly sulphate esters"] },
          { cells: ["Flagella", "2 to 8, equal, apical", "2, unequal, lateral", "Absent"] },
          { cells: ["Habitat", "Fresh water, brackish water, salt water", "Fresh water (rare), brackish water, salt water", "Fresh water (some), brackish water, salt water (most)"] },
          {
            cells: ["Sexual reproduction", "Isogamous, anisogamous or oogamous", "Isogamous, anisogamous or oogamous", "Oogamous, with non-motile gametes"],
            noteAmber: "NEET 2024: a statement that brown algae reproduce sexually by the oogamous method only was the false one.",
            pyqExampleId: "2154f2ac-5e57-4345-92cc-ef3d99118779",
          },
          { cells: ["NCERT examples", "*Chlamydomonas*, *Volvox*, *Ulothrix*, *Spirogyra*, *Chara*", "*Ectocarpus*, *Dictyota*, *Laminaria*, *Sargassum*, *Fucus*", "*Polysiphonia*, *Porphyra*, *Gracilaria*, *Gelidium*"] },
        ],
      },
      pyqExampleId: "adaa54d7-8f5f-411c-aed6-8ee4326e6ccc",
      selfCheckExample: {
        prompt: "An alga has chlorophyll a and d, stores floridean starch and has no flagella at any stage. Which class is it in? Name two genera of that class.",
        steps: [
          "Chlorophyll d, floridean starch and no flagella are all marks of the red algae.",
          "NCERT names *Polysiphonia*, *Porphyra*, *Gracilaria* and *Gelidium* as red algae.",
        ],
        answer: "Rhodophyceae (red algae), for example *Polysiphonia* and *Gelidium*.",
      },
      practiceSet: [
        { prompt: "Which pigment gives the brown algae their olive green to brown colour?", answer: "Fucoxanthin" },
        { prompt: "Which pigment makes the red algae red?", answer: "r-phycoerythrin" },
        { prompt: "How many flagella do the zoospores of brown algae have, and how are they attached?", answer: "Two unequal flagella, attached laterally" },
        { prompt: "What is the gelatinous coating on the outside of the cell wall of brown algae made of?", answer: "Algin" },
        { prompt: "To which class of algae does *Sargassum* belong?", answer: "Phaeophyceae (brown algae)" },
        { prompt: "Which structures in the chloroplasts of green algae store protein besides starch?", answer: "Pyrenoids" },
      ],
      traps: [
        {
          title: "Mannitol belongs to the brown algae only",
          body: "**Mannitol** and **laminarin** are the stored food of **Phaeophyceae**. Green algae such as *Ulothrix* and *Volvox* store **starch**, and red algae store **floridean starch**.",
        },
        {
          title: "Brown algae are not oogamous only",
          body: "Sexual reproduction in **Phaeophyceae** may be **isogamous, anisogamous or oogamous**. It is the **red algae** whose sexual reproduction is oogamous.",
        },
        {
          title: "Chlorophyll c and d mark different classes",
          body: "Brown algae have chlorophyll **a and c**; red algae have chlorophyll **a and d**; green algae have chlorophyll **a and b**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-algae-uses",
      name: "Uses of algae",
      intuition:
        "Algae matter to us in two big ways. They fix about half of all the carbon dioxide fixed on earth, so they are key primary producers. And we use them: as food, and for gel-forming substances called hydrocolloids. Each useful product comes from one class, so tie the product to its class.",
      definition:
        "What NCERT says algae give us:\n" +
        "- At least **half of the total carbon dioxide fixation** on earth is done by algae through photosynthesis. As **primary producers** they are the base of food cycles in water.\n" +
        "- **70 species** of marine algae are used as **food**, among them *Porphyra*, *Laminaria* and *Sargassum*.\n" +
        "- **Hydrocolloids** (water-holding substances): **algin** from **brown** algae and **carrageen** from **red** algae.\n" +
        "- **Agar** from *Gelidium* and *Gracilaria* (red algae) is used to grow microbes and in ice creams and jellies.\n" +
        "- *Chlorella*, a unicellular alga **rich in protein**, is a food supplement, even for space travellers.",
      table: {
        columns: ["Product or use", "Comes from"],
        rows: [
          {
            cells: ["Carrageen (hydrocolloid)", "Red algae (Rhodophyceae)"],
            noteAmber: "Asked twice: NEET 2021 (which algae produce carrageen) and NEET 2022 (carrageen from Rhodophyceae only).",
            pyqExampleId: "bc5d556b-96df-42ac-a11b-aa19405b3ad4",
          },
          { cells: ["Algin (hydrocolloid)", "Brown algae (Phaeophyceae)"] },
          { cells: ["Agar", "*Gelidium* and *Gracilaria* (red algae)"] },
          { cells: ["Food", "*Porphyra*, *Laminaria*, *Sargassum*, among 70 marine species"] },
          { cells: ["Protein-rich food supplement", "*Chlorella* (unicellular)"] },
          { cells: ["Carbon dioxide fixation", "At least half of the total on earth"] },
        ],
      },
      pyqExampleId: "bab26520-98e9-4ef0-8d5b-f7f824d75141",
      selfCheckExample: {
        prompt: "A lab worker needs a solid medium to grow bacteria. Which algal product does she use, and which two algae give it?",
        steps: [
          "The gel used to grow microbes is agar.",
          "NCERT says agar comes from *Gelidium* and *Gracilaria*, both red algae.",
        ],
        answer: "Agar, from *Gelidium* and *Gracilaria*.",
      },
      practiceSet: [
        { prompt: "Which hydrocolloid is obtained from brown algae?", answer: "Algin" },
        { prompt: "Which unicellular alga, rich in protein, is used as a food supplement by space travellers?", answer: "*Chlorella*" },
        { prompt: "What share of the earth's total carbon dioxide fixation do algae carry out?", answer: "At least half" },
        { prompt: "Name two marine algae that NCERT lists as food.", answer: "Any two of *Porphyra*, *Laminaria* and *Sargassum*" },
      ],
      traps: [
        {
          title: "Algin and carrageen come from different classes",
          body: "**Algin** is from **brown** algae; **carrageen** is from **red** algae only. Neither comes from green algae.",
        },
        {
          title: "Agar is from red algae, not brown",
          body: "**Agar** comes from *Gelidium* and *Gracilaria*, which are **red algae**. Brown algae give algin.",
        },
      ],
    },
  ],
};
