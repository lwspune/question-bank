import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_MI_CURES_NOTE: SubtopicNote = {
  subtopicName: "Vaccines, Antibiotics and AYUSH",
  title: "Vaccines, Antibiotics and AYUSH",
  oneLineDefinition:
    "Who gave medicine the vaccine and the antibiotic, how penicillin kills bacteria and why antibiotics do nothing to a virus, and the AYUSH systems with their national institutes.",
  whyItMatters:
    "Six CDS questions from 2019 (II) to 2024 (II). Three are about the AYUSH systems, and two of those are HARD: a match of national institutes with cities, and a statement about the Ministry of Ayush. The other three ask about Jenner, penicillin and why a vaccine works where an antibiotic fails.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbimi-vaccines",
      name: "Vaccines and the scientists behind them",
      intuition:
        "Edward Jenner noticed that milkmaids who had caught mild cowpox did not catch smallpox. In 1796 he put cowpox material into a boy and showed that the boy was then safe from smallpox. That was the first vaccine. A vaccine gives the body a harmless form of a germ, so the immune system learns to recognise it and is ready if the real germ ever comes.",
      definition:
        "Immunisation (NCERT Class 9 and 12):\n" +
        "- A **vaccine** holds **killed or weakened germs**, or parts of them. The immune system makes antibodies and **memory cells**, so a later infection is fought off quickly. This is **active immunity**.\n" +
        "- **Edward Jenner** (1796): the **smallpox vaccine** from cowpox; he introduced **immunisation** (the word vaccine comes from vacca, Latin for cow).\n" +
        "- **Louis Pasteur**: vaccines against **rabies** and anthrax; pasteurisation.\n" +
        "- **Robert Koch**: found the bacteria of **tuberculosis** and cholera.\n" +
        "- **Smallpox** was **eradicated** worldwide by vaccination (declared in 1980).\n" +
        "- Robert Hooke (who named the cell) and Carl Linnaeus (who named species) had nothing to do with immunisation.",
      table: {
        columns: ["Scientist", "Contribution"],
        rows: [
          {
            cells: ["Edward Jenner", "Smallpox vaccine (1796); immunisation"],
            noteAmber: "CDS 2020 (I): Edward Jenner introduced immunisation to medicine.",
            pyqExampleId: "9db650be-e318-4e23-a2b9-ceb6cc9b7468",
          },
          { cells: ["Louis Pasteur", "Rabies and anthrax vaccines; pasteurisation"] },
          { cells: ["Robert Koch", "Bacteria of tuberculosis and cholera"] },
          { cells: ["Alexander Fleming", "Penicillin (1928)"] },
          { cells: ["Robert Hooke", "Saw and named the cell (1665)"] },
        ],
      },
      pyqExampleId: "9db650be-e318-4e23-a2b9-ceb6cc9b7468",
      selfCheckExample: {
        prompt: "A child vaccinated against measles later plays with a friend who has measles, and does not fall ill. What did the vaccine do?",
        steps: [
          "The vaccine carried a weakened form of the measles virus, which could not cause the disease.",
          "The child's immune system made antibodies and memory cells against it.",
          "When the real virus came, the memory cells recognised it and the body destroyed it before it could cause illness.",
        ],
        answer: "It trained the immune system, leaving memory cells that destroyed the real virus quickly.",
      },
      practiceSet: [
        { prompt: "Who made the first vaccine against rabies?", answer: "Louis Pasteur" },
        { prompt: "Which disease has been wiped out worldwide by vaccination?", answer: "Smallpox" },
        { prompt: "Who discovered the bacterium that causes tuberculosis?", answer: "Robert Koch" },
        { prompt: "What does a vaccine contain?", answer: "Killed or weakened germs, or parts of them" },
      ],
      traps: [
        {
          title: "Jenner for vaccines, Koch for germs",
          body: "**Jenner** began immunisation with the smallpox vaccine. **Koch** identified the germs of tuberculosis and cholera, and **Pasteur** made later vaccines such as rabies. Hooke and Linnaeus are not connected with medicine.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbimi-antibiotics",
      name: "How antibiotics work",
      intuition:
        "An antibiotic kills bacteria by jamming a job that bacteria do and our cells do not. Many bacteria build a tough wall around themselves, and penicillin stops that wall from being built, so the bacteria burst. Our own cells have no wall, so penicillin leaves them alone. A virus has no such machinery of its own at all; it borrows the host cell's. So there is nothing for an antibiotic to block.",
      definition:
        "Antibiotics (NCERT Class 9):\n" +
        "- An **antibiotic** is a substance, first found in microbes, that kills or stops bacteria.\n" +
        "- **Penicillin** was discovered by **Alexander Fleming** (1928) in the mould **Penicillium**, a fungus. It **blocks the building of the bacterial cell wall**. Human cells have no cell wall, so it does not harm them.\n" +
        "- **Antibiotics do not work against viruses**: a virus does not use the biochemical pathways an antibiotic blocks; it uses the host cell's machinery. So an antibiotic does not cure a cold.\n" +
        "- A **vaccine** works against a virus because it **boosts the immune system** to fight it.\n" +
        "- Using antibiotics when they are not needed helps bacteria become **resistant** to them.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Who discovered penicillin?", "Alexander Fleming, 1928, from the mould Penicillium"] },
          { cells: ["What does penicillin block?", "Building of the bacterial cell wall"] },
          { cells: ["Why is penicillin safe for us?", "Human cells have no cell wall"] },
          {
            cells: ["Why does an antibiotic not cure a viral disease?", "A virus has no pathways of its own for the antibiotic to block"],
            noteAmber: "CDS 2021 (I): a virus does not use pathways an antibiotic can block, but a vaccine boosts immunity against it.",
            pyqExampleId: "fc311c5c-822e-4ccd-8d7b-b1b4ccef32e6",
          },
          { cells: ["What happens when antibiotics are overused?", "Bacteria become resistant"] },
        ],
      },
      pyqExampleId: "6ab414c3-fae7-4698-a199-d1e5d2fd8bc8",
      selfCheckExample: {
        prompt: "A patient with a viral fever asks for antibiotics. The doctor refuses. Give the doctor's reason.",
        steps: [
          "Antibiotics act on processes that bacteria carry out for themselves, such as building a cell wall.",
          "A virus has no such processes; it multiplies using the host cell's machinery.",
          "So the antibiotic has nothing to act on, and taking it only helps bacteria in the body become resistant.",
        ],
        answer: "Antibiotics cannot act on a virus, and needless use breeds resistant bacteria.",
      },
      practiceSet: [
        { prompt: "Who discovered penicillin?", answer: "Alexander Fleming" },
        { prompt: "From which kind of organism was penicillin first obtained?", answer: "A mould (the fungus Penicillium)" },
        { prompt: "Can an antibiotic cure the common cold?", answer: "No: the common cold is caused by a virus" },
        { prompt: "What is it called when bacteria are no longer killed by an antibiotic?", answer: "Antibiotic resistance" },
      ],
      traps: [
        {
          title: "Penicillin blocks the wall, not DNA or RNA",
          body: "Penicillin stops bacteria from **building their cell wall**. It does not block DNA or RNA synthesis, and it does not act by stopping division directly.",
        },
        {
          title: "Antibiotics fail on viruses for a reason of pathways",
          body: "The reason is not that antibiotics break only RNA or that vaccines are proteins. A virus simply has **no biochemical pathway of its own** for an antibiotic to block, while a vaccine **trains the immune system**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbimi-ayush",
      name: "AYUSH systems of medicine",
      intuition:
        "Besides modern medicine, India recognises several traditional systems, grouped under the name AYUSH and run by the Ministry of Ayush. Each has a national institute in a different city. Learn the systems, where each came from, and the city of each institute.",
      definition:
        "The AYUSH systems:\n" +
        "- **AYUSH** stands for **Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homoeopathy**. The **Ministry of AYUSH** was formed in **2014**.\n" +
        "- **Sowa-Rigpa**, the Tibetan or **Amchi** system practised in the **Himalayan regions** (Ladakh, Sikkim, Himachal Pradesh), was added in **2010**, the **latest** system to be recognised. The name AYUSH did not change.\n" +
        "- **Ayurveda**: the old Indian system; its classics are the **Charaka Samhita** (medicine) and the **Sushruta Samhita** (surgery).\n" +
        "- **Unani**: came from Greece through Arab and Persian physicians.\n" +
        "- **Siddha**: a holistic system from **Tamil Nadu**.\n" +
        "- **Homoeopathy**: founded by **Samuel Hahnemann** of Germany.\n" +
        "- **Reiki** is not an AYUSH system.",
      table: {
        columns: ["System", "National institute"],
        rows: [
          {
            cells: ["Ayurveda", "National Institute of Ayurveda, Jaipur"],
            noteAmber: "CDS 2019 (II): Ayurveda Jaipur, Homoeopathy Kolkata, Unani Bengaluru, Siddha Chennai.",
            pyqExampleId: "ba231d57-af69-4c12-93b2-8520adb3dc17",
          },
          { cells: ["Homoeopathy", "National Institute of Homoeopathy, Kolkata"] },
          {
            cells: ["Unani", "National Institute of Unani Medicine, Bengaluru"],
            noteAmber: "CDS 2024 (II): the false statement is that Unani has been dissociated from the Ministry of Ayush; it is still one of its systems.",
            pyqExampleId: "705a9ba9-ab4f-498b-b940-8c580af9be4c",
          },
          { cells: ["Siddha", "National Institute of Siddha, Chennai"] },
          { cells: ["Sowa-Rigpa", "National Institute of Sowa Rigpa, Leh"] },
          { cells: ["Yoga", "Morarji Desai National Institute of Yoga, New Delhi"] },
          { cells: ["Naturopathy", "National Institute of Naturopathy, Pune"] },
        ],
      },
      pyqExampleId: "3ab96b8f-ce07-498d-933d-237f913a00f7",
      selfCheckExample: {
        prompt: "Write out the five systems that the letters of AYUSH stand for.",
        steps: [
          "A is for Ayurveda.",
          "Y is for Yoga and Naturopathy.",
          "U is for Unani, S for Siddha and H for Homoeopathy.",
        ],
        answer: "Ayurveda, Yoga and Naturopathy, Unani, Siddha, Homoeopathy.",
      },
      practiceSet: [
        { prompt: "Who founded homoeopathy?", answer: "Samuel Hahnemann" },
        { prompt: "Which classic text of Ayurveda deals with surgery?", answer: "The Sushruta Samhita" },
        { prompt: "In which state is the Siddha system mainly practised?", answer: "Tamil Nadu" },
        { prompt: "Which AYUSH system reached India from Greece through Arab physicians?", answer: "Unani" },
      ],
      traps: [
        {
          title: "Sowa-Rigpa is in AYUSH, Reiki is not",
          body: "**Sowa-Rigpa** joined in 2010 even though the name AYUSH has no letter for it. **Reiki** is not one of the recognised systems.",
        },
        {
          title: "Jaipur and Kolkata, Bengaluru and Chennai",
          body: "**Ayurveda** is at **Jaipur** and **Homoeopathy** at **Kolkata**. **Unani** is at **Bengaluru**, and **Siddha**, the Tamil system, at **Chennai**. The south Indian pair is the one most often swapped.",
        },
      ],
    },
  ],
};
