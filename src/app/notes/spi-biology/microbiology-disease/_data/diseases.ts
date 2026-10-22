import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MB_DISEASES_NOTE: SubtopicNote = {
  subtopicName: "Diseases and Their Causes",
  title: "Diseases and Their Causes",
  oneLineDefinition:
    "An infectious disease is caused by a microbe (a virus, bacterium, protozoan or fungus) and often attacks one particular organ of the body.",
  whyItMatters:
    "Two questions in the bank, both EASY: the microbe that causes malaria and the organ hepatitis attacks. The options in each are real microbes or real organs, so you need the exact pair, not a rough idea.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimbdi-microbes",
      name: "Diseases and the microbes that cause them",
      intuition:
        "Every infectious disease has one kind of microbe behind it and a way of spreading. Learn the disease, its microbe group and how it spreads as one row.",
      definition:
        "- **Viruses**: common cold, influenza, polio, measles, chickenpox, hepatitis, AIDS (HIV), dengue.\n" +
        "- **Bacteria**: tuberculosis, typhoid, cholera, tetanus.\n" +
        "- **Protozoa**: **malaria** (**Plasmodium**, spread by the female **Anopheles** mosquito), amoebic dysentery (Entamoeba), sleeping sickness (Trypanosoma).\n" +
        "- **Fungi**: ringworm, athlete's foot.\n" +
        "- Antibiotics work against bacteria, not viruses. Vaccines protect against many diseases before they strike.",
      table: {
        columns: ["Disease", "Caused by", "Group", "Spread by"],
        rows: [
          {
            cells: ["Malaria", "Plasmodium", "Protozoan", "Female Anopheles mosquito"],
            noteAmber: "Plasmodium causes malaria; the mosquito only carries it.",
          },
          { cells: ["Dengue", "Dengue virus", "Virus", "Aedes mosquito"] },
          { cells: ["Amoebic dysentery", "Entamoeba", "Protozoan", "Dirty water and food"] },
          { cells: ["Sleeping sickness", "Trypanosoma", "Protozoan", "Tsetse fly"] },
          { cells: ["Tuberculosis", "Mycobacterium", "Bacterium", "Air"] },
          { cells: ["Cholera", "Vibrio cholerae", "Bacterium", "Dirty water"] },
          { cells: ["Ringworm", "A fungus", "Fungus", "Touch"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong row: (a) tuberculosis: bacterium (b) common cold: virus (c) ringworm: worm (d) sleeping sickness: Trypanosoma",
        steps: ["Tuberculosis is bacterial, the cold is viral, and Trypanosoma causes sleeping sickness: all right.", "Ringworm is caused by a fungus, not a worm."],
        answer: "(c) is wrong: ringworm is a fungal disease.",
      },
      practiceSet: [
        { prompt: "Which mosquito spreads dengue?", answer: "Aedes" },
        { prompt: "Is cholera caused by a bacterium or a virus?", answer: "A bacterium" },
        { prompt: "Which protozoan causes amoebic dysentery?", answer: "Entamoeba" },
        { prompt: "Do antibiotics cure a viral disease such as the common cold?", answer: "No: antibiotics act on bacteria" },
      ],
      pyqExampleId: "cfb0a250-8d4f-48b3-ab4c-1d6fda021b4f",
      traps: [
        {
          title: "Naming the carrier as the cause",
          body: "The female Anopheles mosquito carries malaria, but the cause is the protozoan Plasmodium. A question about the cause wants the microbe.",
        },
        {
          title: "Ringworm is not a worm",
          body: "Despite its name, ringworm is a fungal infection of the skin.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimbdi-organs",
      name: "Diseases and the organ they attack",
      intuition:
        "Many disease names carry a clue to the organ. 'Hepar' is Greek for the liver, so hepatitis is a disease of the liver; '-itis' means swelling or inflammation.",
      definition:
        "- **Hepatitis, jaundice**: the **liver**.\n" +
        "- **Tuberculosis, pneumonia**: the **lungs**.\n" +
        "- **Typhoid, cholera**: the **intestine**.\n" +
        "- **Conjunctivitis**: the **eyes**.\n" +
        "- **Polio**: the nerves, leading to weak limbs. **Meningitis**: the covering of the brain.\n" +
        "- **Goitre** (lack of iodine): the **thyroid**, in the neck. It is a deficiency disease, not an infection.",
      table: {
        columns: ["Disease", "Organ attacked"],
        rows: [
          {
            cells: ["Hepatitis", "Liver"],
            noteAmber: "Hepar means liver.",
          },
          { cells: ["Jaundice", "Liver"] },
          { cells: ["Tuberculosis", "Lungs"] },
          { cells: ["Pneumonia", "Lungs"] },
          { cells: ["Typhoid", "Intestine"] },
          { cells: ["Conjunctivitis", "Eyes"] },
          { cells: ["Goitre", "Thyroid gland"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong pair: (a) pneumonia: lungs (b) conjunctivitis: eyes (c) typhoid: intestine (d) jaundice: kidney",
        steps: ["Pneumonia, conjunctivitis and typhoid are matched rightly.", "Jaundice is a disease of the liver."],
        answer: "(d) is wrong: jaundice attacks the liver.",
      },
      practiceSet: [
        { prompt: "Which organ does tuberculosis usually attack?", answer: "The lungs" },
        { prompt: "Conjunctivitis is a disease of which organ?", answer: "The eyes" },
        { prompt: "Which gland swells in goitre?", answer: "The thyroid" },
      ],
      pyqExampleId: "7890be62-58d5-45be-bd1d-9e5117c3d14b",
      traps: [
        {
          title: "Jaundice of the kidney",
          body: "Jaundice turns the skin and eyes yellow, but the organ at fault is the liver, like hepatitis.",
        },
      ],
    },
  ],
};
