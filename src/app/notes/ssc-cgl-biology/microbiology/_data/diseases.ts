import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BMD_DISEASES_NOTE: SubtopicNote = {
  subtopicName: "Pathogens and Diseases",
  title: "Pathogens and Diseases",
  oneLineDefinition:
    "Which diseases come from bacteria, viruses or protozoa, the organism behind each, bacterial shapes, how faeco-oral diseases spread, and diseases with the organ they hit, their other names and vaccines.",
  whyItMatters:
    "Eleven questions in the bank: two from the 2023 shifts and nine from the 2024 shifts, ten of them EASY. They match a disease to its cause or its organ, so two tables carry the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbmdmi-pathogens",
      name: "What causes each disease",
      intuition:
        "Diseases split by the kind of organism behind them. Learn the bacterial set and the viral set, and malaria as the protozoan one.",
      definition:
        "By cause:\n" +
        "- **Bacteria**: **typhoid** (Salmonella), **cholera** (Vibrio), **tuberculosis** (Mycobacterium), diphtheria, tetanus.\n" +
        "- **Viruses**: dengue, influenza, common cold, and **rotavirus** diarrhoea in children.\n" +
        "- **Protozoa**: **malaria** (Plasmodium).\n" +
        "- **Worms**: **Ancylostoma** is the **hookworm**; Taenia the tapeworm, Ascaris the roundworm, Wuchereria the filarial worm.\n\n" +
        "Bacterial shapes: **bacillus** rod, **coccus** sphere, **vibrio** comma, **spirillum** spiral.\n\n" +
        "Faeco-oral diseases spread by the **five Fs**: **flies, fingers, fomites, food and fluids**.",
      table: {
        columns: ["Disease or term", "Cause or meaning"],
        rows: [
          { cells: ["Malaria, typhoid, cholera", "Plasmodium, Salmonella, Vibrio"], pyqExampleId: "6c515689-b17c-4e0a-b28f-efa28c936027" },
          { cells: ["Spirillum", "Spiral bacterium"], pyqExampleId: "6eed54cc-40b2-4c90-b65b-d704a464a100" },
          { cells: ["Ancylostoma", "Hookworm"], pyqExampleId: "4e4d0490-fed4-4575-a56b-ce35373aa0a2" },
          { cells: ["Five Fs", "Flies, fingers, fomites, food, fluids"], pyqExampleId: "63b73ef5-fb0c-4b71-b1c5-b9c2e439d86c" },
        ],
      },
      pyqExampleId: "3167dbdf-1e83-43e0-8dc2-10afb9e45567",
      selfCheckExample: {
        prompt: "Pick the odd one out by cause: dengue, cholera, influenza, common cold.",
        steps: ["Dengue, influenza and the common cold are caused by viruses.", "Cholera is caused by the bacterium Vibrio cholerae."],
        answer: "Cholera.",
      },
      practiceSet: [
        { prompt: "What shape is a vibrio bacterium?", answer: "Comma-shaped" },
        { prompt: "What kind of organism causes malaria?", answer: "A protozoan, Plasmodium" },
        { prompt: "What is a fomite?", answer: "A contaminated object that spreads infection" },
      ],
      traps: [
        {
          title: "Malaria is not bacterial",
          body: "Sets mixing **malaria** with cholera or typhoid are not all bacterial. Malaria comes from the **protozoan** Plasmodium.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbmdmi-diseases",
      name: "Diseases, organs, other names and vaccines",
      intuition:
        "Some diseases are asked by the organ they hit, others by a second name or a vaccine. Each needs one fact.",
      definition:
        "Organs:\n" +
        "- **Alzheimer's disease**: the **brain**.\n" +
        "- **Diphtheria**: the **nose and throat** (a bacterial infection).\n" +
        "- **Gonorrhoea**: the reproductive tract.\n" +
        "- **Mumps**: the **salivary** glands.\n\n" +
        "Other names and vaccines:\n" +
        "- **Tetanus** (Clostridium tetani) is **lockjaw**.\n" +
        "- **Jaundice** is **icterus**: yellow skin and eyes from excess bilirubin.\n" +
        "- The **Salk** vaccine (**1952**) is the **inactivated** (killed) polio vaccine.\n\n" +
        "Home remedy: **tulsi** for cold and cough; arjun for the heart, jamun seeds for diabetes.",
      table: {
        columns: ["Disease", "Fact"],
        rows: [
          { cells: ["Mumps", "Salivary glands"], pyqExampleId: "4618b569-565d-4729-967f-ead0fb48db72" },
          { cells: ["Diphtheria", "Nose and throat"], pyqExampleId: "94603690-42e0-42a5-818c-b3ec915c3a9e" },
          { cells: ["Jaundice", "Also called icterus"], pyqExampleId: "9f2231b0-5034-4d35-ae10-7d00c05c4cd8" },
          { cells: ["Polio, Salk vaccine", "Inactivated, 1952"], pyqExampleId: "abedb933-f109-4650-8b8a-1ab5536da1a6" },
          { cells: ["Cold and cough", "Tulsi"], pyqExampleId: "091df3ce-7cab-4ff7-b99f-11a2f7433886" },
        ],
      },
      pyqExampleId: "d3509d5c-a83b-4624-b79a-fea64235f6b1",
      selfCheckExample: {
        prompt: "Which organ does mumps affect, and which does Alzheimer's disease affect?",
        steps: ["Mumps swells the salivary (parotid) glands.", "Alzheimer's disease is a degenerative disease of the brain."],
        answer: "Mumps: salivary glands. Alzheimer's: brain.",
      },
      practiceSet: [
        { prompt: "What is another name for tetanus?", answer: "Lockjaw" },
        { prompt: "Is the Salk polio vaccine live or killed?", answer: "Killed (inactivated)" },
        { prompt: "What causes the yellow colour in jaundice?", answer: "Excess bilirubin in the blood" },
      ],
      traps: [
        {
          title: "Diphtheria hits the throat, not the glands",
          body: "**Diphtheria** affects the **nose and throat**; **mumps** the salivary glands. Match lists swap the two.",
        },
      ],
    },
  ],
};
