import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LP_DIGESTION_NOTE: SubtopicNote = {
  subtopicName: "Digestion and Nutrition",
  title: "Digestion and Nutrition",
  oneLineDefinition:
    "Each digestive gland pours out its own juice: saliva, gastric juice, bile and pancreatic juice, each with its own enzymes and job; insects take in food with mouthparts suited to it.",
  whyItMatters:
    "Five questions in the bank, one EASY and four MODERATE. Four are about which gland makes which juice or enzyme (what the pancreas does not make, the odd enzyme out, what makes food alkaline, and a Venn diagram of three glands), and one pairs insects with their mouthparts.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9lpdi-glands",
      name: "Digestive glands and their juices",
      intuition:
        "Digestion is a relay race. Saliva starts on starch in the mouth, the stomach's acid juice starts on proteins, bile from the liver breaks fat into tiny drops, and the pancreas sends in enzymes for all three kinds of food. Questions ask you to match each enzyme to the gland that makes it.",
      definition:
        "- **Salivary glands** make saliva, whose enzyme **ptyalin** (salivary amylase) turns starch into sugar.\n" +
        "- **Gastric glands** in the stomach wall make **hydrochloric acid** (makes food acidic and kills germs), **pepsin** (digests proteins) and **mucus** (protects the stomach wall).\n" +
        "- The **liver** makes **bile**, which is stored in the **gall bladder**. Bile has **no enzyme**: it makes the food **alkaline** and breaks fat into tiny droplets.\n" +
        "- The **pancreas** makes **pancreatic juice** with **trypsin** (proteins), **lipase** (fats) and **amylase** (starch).\n" +
        "- Digested food is **absorbed** through the villi of the **small intestine**.",
      table: {
        columns: ["Gland", "Juice", "What it contains or does"],
        rows: [
          { cells: ["Salivary glands", "Saliva", "Ptyalin: starch into sugar"] },
          { cells: ["Gastric glands (stomach wall)", "Gastric juice", "Hydrochloric acid, pepsin, mucus"] },
          { cells: ["Liver", "Bile (stored in the gall bladder)", "No enzyme: makes food alkaline, breaks fat into droplets"] },
          { cells: ["Pancreas", "Pancreatic juice", "Trypsin, lipase, amylase"], noteAmber: "The one gland with enzymes for proteins, fats and starch." },
        ],
        caption: "Pepsin belongs to the stomach; trypsin belongs to the pancreas.",
      },
      selfCheckExample: {
        prompt: "Which gland makes a digestive juice that has no enzyme at all, yet still helps in digesting fats?",
        steps: ["Bile has no enzyme.", "It breaks fat into tiny droplets so that lipase can act on it, and bile is made by the liver."],
        answer: "The liver (bile)",
      },
      practiceSet: [
        { prompt: "Which acid is secreted by the stomach wall?", answer: "Hydrochloric acid" },
        { prompt: "Which enzyme in saliva begins the digestion of starch?", answer: "Ptyalin (salivary amylase)" },
        { prompt: "Where is bile stored?", answer: "In the gall bladder" },
        { prompt: "In which part of the alimentary canal is digested food absorbed?", answer: "The small intestine, through its villi" },
      ],
      pyqExampleId: "f53728e1-3c7a-4366-aabd-d1977d30a02f",
      traps: [
        {
          title: "Thinking the gall bladder makes bile",
          body: "Bile is made by the liver. The gall bladder only stores it.",
        },
        {
          title: "Giving pepsin to the pancreas",
          body: "Pepsin is made by the gastric glands of the stomach. The pancreas makes trypsin, lipase and amylase.",
        },
        {
          title: "Calling mucus a pancreatic enzyme",
          body: "Mucus comes from the walls of the stomach and intestine and protects them. It is not an enzyme and not part of pancreatic juice.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lpdi-insects",
      name: "How insects take in food",
      intuition:
        "An insect's mouth is shaped like the tool its food needs. Leaf eaters have jaws that bite and chew; a butterfly that drinks nectar has a long straw; a mosquito that drinks blood has a fine needle.",
      definition:
        "- **Biting and chewing** mouthparts (jaw-like): **cockroach** and **grasshopper**.\n" +
        "- A long, coiled tube called a **proboscis** for sucking nectar: **butterfly**. It stays coiled when not in use.\n" +
        "- **Piercing and sucking** (needle-like) mouthparts: **mosquito**. Only the female sucks blood.\n" +
        "- A sponge-like pad that soaks up liquid food: **housefly**.\n" +
        "- A single-celled **amoeba** surrounds its food with **pseudopodia** (false feet) and takes it into a food vacuole.",
      table: {
        columns: ["Insect", "Mouthparts", "Food"],
        rows: [
          { cells: ["Cockroach", "Jaw-like, biting and chewing", "Almost any solid food"] },
          { cells: ["Grasshopper", "Jaw-like, biting and chewing", "Leaves and grass"] },
          { cells: ["Butterfly", "Long, coiled tube (proboscis)", "Nectar of flowers"] },
          { cells: ["Mosquito", "Needle-like, piercing and sucking", "Blood (female), plant juices"] },
          { cells: ["Housefly", "Sponge-like pad", "Liquid or dissolved food"] },
        ],
        caption: "Chewing, sucking through a tube, piercing, sponging: four tools for four kinds of food.",
      },
      selfCheckExample: {
        prompt: "Which insect feeds by soaking up liquid food with a sponge-like pad?",
        steps: ["Houseflies pour saliva on food and sponge up the liquid with a pad at the tip of the mouth."],
        answer: "The housefly",
      },
      practiceSet: [
        { prompt: "What is the tube-like mouthpart of a butterfly called?", answer: "The proboscis" },
        { prompt: "What kind of mouthparts does a cockroach have?", answer: "Jaw-like mouthparts for biting and chewing" },
        { prompt: "How does a female mosquito take in its food?", answer: "It pierces the skin with needle-like mouthparts and sucks blood" },
        { prompt: "How does an amoeba take in food?", answer: "It surrounds the food with pseudopodia and forms a food vacuole" },
      ],
      pyqExampleId: "37c171db-2977-4168-b915-0a4d8a62f6aa",
      traps: [
        {
          title: "Thinking grasshoppers suck their food",
          body: "A grasshopper bites and chews leaves with jaw-like mouthparts, just like a cockroach.",
        },
        {
          title: "Thinking butterflies chew",
          body: "A butterfly sucks nectar through its proboscis, a long tube it keeps coiled under its head.",
        },
      ],
    },
  ],
};
