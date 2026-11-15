import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BA_TRANSGENIC_NOTE: SubtopicNote = {
  subtopicName: "Transgenic Animals and Ethical Issues",
  title: "Transgenic Animals and Ethical Issues",
  oneLineDefinition:
    "What transgenic animals are and the five reasons they are made, how India regulates GM research through GEAC, what biopiracy means, and the organism or method behind each application in the chapter.",
  whyItMatters:
    "Four NEET questions, all from 2024 or later. The human protein α-1-antitrypsin, used for emphysema, was asked twice (NEET 2024 and NEET 2026). GEAC and biopiracy came up in Re-NEET 2024, and two match-the-columns questions in 2024 pulled the whole chapter together: insulin with E. coli, GM cotton with Bacillus thuringiensis, ADA deficiency with gene therapy, ELISA with antigen-antibody interaction.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoba-transgenic",
      name: "Transgenic animals and why they are made",
      intuition:
        "A transgenic animal carries an extra, foreign gene in its DNA and expresses it. Over 95 per cent of them are mice. NCERT gives five reasons for making them, from studying how genes work to producing human medicines in milk.",
      definition:
        "Transgenic animals, as NCERT gives them:\n" +
        "- Animals whose DNA has been manipulated to **possess and express an extra (foreign) gene** are **transgenic animals**.\n" +
        "- Transgenic **rats, rabbits, pigs, sheep, cows and fish** have been produced, but **over 95 per cent** of all existing transgenic animals are **mice**.\n" +
        "- **(i) Normal physiology and development:** to study how genes are regulated and how they affect normal body functions and development, for example the study of **insulin-like growth factor**.\n" +
        "- **(ii) Study of disease:** as models for human diseases such as **cancer, cystic fibrosis, rheumatoid arthritis and Alzheimer's**.\n" +
        "- **(iii) Biological products:** transgenic animals that make useful products. The human protein **α-1-antitrypsin** is used to treat **emphysema**. Similar attempts are being made for **phenylketonuria (PKU)** and **cystic fibrosis**. In **1997** the first transgenic cow, **Rosie**, produced **human protein-enriched milk (2.4 grams per litre)**. The milk contained human **alpha-lactalbumin** and was nutritionally more balanced for human babies than natural cow milk.\n" +
        "- **(iv) Vaccine safety:** transgenic **mice** are used to test the safety of vaccines before use on humans, for example the **polio vaccine**.\n" +
        "- **(v) Chemical safety testing:** animals made **more sensitive to toxic substances** than non-transgenic animals are used for toxicity testing.",
      table: {
        columns: ["Reason", "NCERT example"],
        rows: [
          { cells: ["Normal physiology and development", "Insulin-like growth factor"] },
          { cells: ["Study of disease", "Models for cancer, cystic fibrosis, rheumatoid arthritis, Alzheimer's"] },
          { cells: ["Biological products", "α-1-antitrypsin for emphysema; attempts for PKU and cystic fibrosis"] },
          { cells: ["Biological products", "Rosie (1997): milk with human alpha-lactalbumin, 2.4 g per litre"] },
          { cells: ["Vaccine safety", "Transgenic mice test the polio vaccine"] },
          { cells: ["Chemical safety testing", "Animals more sensitive to toxic substances"] },
        ],
      },
      pyqExampleId: "65b8725f-151c-4713-9ad8-d3b7b247f388",
      selfCheckExample: {
        prompt: "The first transgenic cow was made in 1997. What was her name, and what made her milk special?",
        steps: [
          "The cow was named Rosie.",
          "Her milk carried a human protein, alpha-lactalbumin, at 2.4 grams per litre.",
        ],
        answer: "Rosie; her milk was enriched with human alpha-lactalbumin, more balanced for human babies than ordinary cow milk.",
      },
      practiceSet: [
        { prompt: "What is a transgenic animal?", answer: "An animal whose DNA has been manipulated to possess and express an extra (foreign) gene" },
        { prompt: "Which animal makes up over 95 per cent of all existing transgenic animals?", answer: "The mouse" },
        { prompt: "Which vaccine's safety is tested on transgenic mice?", answer: "The polio vaccine" },
        { prompt: "Name four human diseases for which transgenic models exist.", answer: "Cancer, cystic fibrosis, rheumatoid arthritis and Alzheimer's disease" },
        { prompt: "Why are some transgenic animals made more sensitive to toxic substances?", answer: "For chemical safety (toxicity) testing" },
      ],
      traps: [
        {
          title: "Mice, not cattle",
          body: "Transgenic rats, rabbits, pigs, sheep, cows and fish exist, but **over 95 per cent** of transgenic animals are **mice**.",
        },
        {
          title: "Emphysema is the α-1-antitrypsin disease",
          body: "**α-1-antitrypsin** treats **emphysema**. Alzheimer's, rheumatoid arthritis and cystic fibrosis appear in the chapter as diseases studied with transgenic **models**, which is a different use.",
        },
        {
          title: "Rosie gave a protein, not a drug",
          body: "Rosie's milk carried human **alpha-lactalbumin** to make it better food for babies. It was not a medicine for emphysema or PKU.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-ethics",
      name: "GEAC, patents and biopiracy",
      intuition:
        "Changing living things raises hard questions: is it safe, and who owns the result? India set up a committee to decide whether GM research is valid and safe. Some companies have taken patents on plants and knowledge that came from Indian farmers and traditional medicine. Using such resources without permission or payment is biopiracy.",
      definition:
        "Ethical issues, as NCERT gives them:\n" +
        "- The Indian Government has set up organisations such as **GEAC (Genetic Engineering Approval Committee)**, which make decisions on the **validity of GM research** and the **safety of introducing GM organisms for public services**.\n" +
        "- In **1997** an **American company** got **patent rights on Basmati rice** through the US Patent and Trademark Office. The \"new\" variety had actually been **derived from Indian farmers' varieties**: Indian Basmati was crossed with **semi-dwarf varieties** and claimed as an invention.\n" +
        "- There have been attempts to patent uses, products and processes based on **Indian traditional herbal medicines**, for example **turmeric and neem**.\n" +
        "- India alone has an estimated **200,000 varieties of rice**, and **27 documented varieties of Basmati** are grown in India.\n" +
        "- **Biopiracy** is the use of bio-resources by **multinational companies and other organisations** **without proper authorisation** from the countries and people concerned, **without compensatory payment**.\n" +
        "- The developing and underdeveloped world is rich in biodiversity and traditional knowledge; the industrialised nations are rich in finances and technology but poor in biodiversity.\n" +
        "- The **Indian Parliament** has cleared the **second amendment of the Indian Patents Bill**, which takes such issues into account.",
      table: {
        columns: ["Term or case", "What NCERT says"],
        rows: [
          { cells: ["GEAC", "Genetic Engineering Approval Committee: decides the validity of GM research and the safety of GM organisms for public services"] },
          { cells: ["Biopiracy", "Use of bio-resources by multinational companies and other organisations without authorisation or compensatory payment"] },
          { cells: ["Basmati patent (1997)", "An American company patented a Basmati derived from Indian farmers' varieties crossed with semi-dwarf varieties"] },
          { cells: ["Herbal medicines", "Attempts to patent turmeric and neem based uses, products and processes"] },
          { cells: ["Rice diversity in India", "About 200,000 varieties of rice; 27 documented varieties of Basmati"] },
          { cells: ["Indian Patents Bill", "Second amendment cleared by Parliament to address these issues"] },
        ],
      },
      pyqExampleId: "2c7d64b1-91e9-4230-9b93-34950d1dde1f",
      selfCheckExample: {
        prompt: "In 1997 an American company was granted a patent on a new Basmati rice. From what was that variety actually bred?",
        steps: [
          "The variety had been derived from Indian farmers' varieties.",
          "Indian Basmati was crossed with semi-dwarf varieties and the result was claimed as an invention.",
        ],
        answer: "From Indian farmers' Basmati varieties crossed with semi-dwarf varieties.",
      },
      practiceSet: [
        { prompt: "What does GEAC stand for?", answer: "Genetic Engineering Approval Committee" },
        { prompt: "How many documented varieties of Basmati are grown in India?", answer: "27" },
        { prompt: "About how many varieties of rice are estimated to exist in India?", answer: "About 200,000" },
        { prompt: "Name two Indian traditional herbal medicines that people have tried to patent uses of.", answer: "Turmeric and neem" },
      ],
      traps: [
        {
          title: "Biopiracy is not done by native people",
          body: "Biopiracy is use of bio-resources by **multinational companies and other organisations** without authorisation or payment. Native people using their own resources is not biopiracy.",
        },
        {
          title: "GEAC judges GM research",
          body: "**GEAC** decides the **validity of GM research** and the **safety of releasing GM organisms**. It does not ban research on any animal; it approves or rejects work.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-match",
      name: "One organism or method for each application",
      intuition:
        "Match-the-columns questions mix the whole chapter: a product, the organism used to make it, the disease it treats or the principle a test rests on. Learn one clean pairing for each application, and the options sort themselves.",
      definition:
        "The pairings NEET matches:\n" +
        "- **Genetically engineered human insulin**: made in *E. coli*.\n" +
        "- **GM (Bt) cotton**: gene from *Bacillus thuringiensis*.\n" +
        "- **ADA deficiency**: treated by **gene therapy**, **enzyme replacement therapy** or bone marrow transplantation.\n" +
        "- **ELISA**: **antigen-antibody interaction**.\n" +
        "- **PCR**: amplification of nucleic acid.\n" +
        "- **α-1-antitrypsin**: **emphysema**.\n" +
        "- **cryIAb**: **corn borer**; **cryIAc** and **cryIIAb**: **cotton bollworms**.\n" +
        "- **RNAi in tobacco**: against the nematode *Meloidogyne incognita*, with genes carried by *Agrobacterium*.\n" +
        "- **Golden rice**: vitamin A.",
      table: {
        columns: ["Application", "Paired with"],
        rows: [
          { cells: ["Genetically engineered human insulin", "E. coli"] },
          { cells: ["GM cotton", "Bacillus thuringiensis"] },
          { cells: ["ADA deficiency", "Gene therapy (also enzyme replacement therapy)"] },
          { cells: ["ELISA", "Antigen-antibody interaction"] },
          {
            cells: ["α-1-antitrypsin", "Emphysema"],
            noteAmber: "NEET 2024: α-1-antitrypsin with emphysema, cry IAb with corn borer, cry IAc with cotton bollworm, enzyme replacement therapy with ADA deficiency.",
            pyqExampleId: "9b8edbdd-bf6b-4658-96f3-52b8e111b722",
          },
          { cells: ["cryIAb", "Corn borer"] },
          { cells: ["cryIAc", "Cotton bollworm"] },
          { cells: ["RNAi tobacco", "Meloidogyne incognita"] },
          { cells: ["Golden rice", "Vitamin A"] },
        ],
      },
      pyqExampleId: "79213c59-b27f-4950-9ccf-def0e995caca",
      selfCheckExample: {
        prompt: "Match each to what it is paired with in NCERT: PCR, transgenic tobacco made by RNAi, Golden rice.",
        steps: [
          "PCR amplifies nucleic acid, so it finds a pathogen at very low concentration.",
          "The RNAi tobacco resists the root nematode Meloidogyne incognita.",
          "Golden rice is enriched in vitamin A.",
        ],
        answer: "PCR: amplifying nucleic acid; RNAi tobacco: the nematode Meloidogyne incognita; Golden rice: vitamin A.",
      },
      practiceSet: [
        { prompt: "Which cry gene of Bacillus thuringiensis controls the corn borer?", answer: "cryIAb" },
        { prompt: "Which organism carried the nematode-specific genes into tobacco?", answer: "Agrobacterium" },
        { prompt: "Name the two treatments for ADA deficiency that are not completely curative and do not use a gene.", answer: "Bone marrow transplantation and enzyme replacement therapy" },
      ],
      traps: [
        {
          title: "E. coli for insulin, Bacillus for cotton",
          body: "Human insulin was made in *E. coli*; the Bt gene of GM cotton came from *Bacillus thuringiensis*. Swapping the two bacteria is the usual wrong option.",
        },
        {
          title: "ADA deficiency has more than one treatment",
          body: "In a match, **ADA deficiency** may pair with **gene therapy** or with **enzyme replacement therapy**. Both are NCERT treatments for it.",
        },
      ],
    },
  ],
};
