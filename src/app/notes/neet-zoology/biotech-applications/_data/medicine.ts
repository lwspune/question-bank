import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BA_MEDICINE_NOTE: SubtopicNote = {
  subtopicName: "Biotechnology in Medicine",
  title: "Biotechnology in Medicine",
  oneLineDefinition:
    "How human insulin is made in E. coli and why the C peptide matters, how gene therapy treats ADA deficiency, and which methods find a disease before its symptoms show.",
  whyItMatters:
    "Ten NEET questions: four on insulin, three on gene therapy for ADA deficiency and three on molecular diagnosis. The C peptide was asked in 2021 and 2022, and Eli Lilly's bacterium in 2025. The gene therapy questions are from 2021 and 2022 and the diagnosis questions from 2021 to 2023; ADA deficiency came back in two 2024 match questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoba-insulin",
      name: "Genetically engineered insulin",
      intuition:
        "Insulin is a small protein of two chains, A and B, held together by disulphide bridges. The body first makes it as a longer pro-hormone with an extra piece, the C peptide, which is cut out to give mature insulin. Insulin taken from cattle and pigs gave some patients allergies. So Eli Lilly made the A and B chains separately in *E. coli* and joined them, skipping the C peptide altogether.",
      definition:
        "Insulin, as NCERT gives it:\n" +
        "- Adult-onset diabetes is managed by taking **insulin at regular intervals**.\n" +
        "- Insulin was earlier **extracted from the pancreas of slaughtered cattle and pigs**. Insulin from an animal source caused some patients to develop **allergy** or other reactions to the foreign protein.\n" +
        "- Insulin has **two short polypeptide chains, A and B**, linked by **disulphide bridges**.\n" +
        "- In mammals, including humans, insulin is made as a **pro-hormone** that contains an **extra stretch called the C peptide**. Like a pro-enzyme, the pro-hormone must be **processed** before it becomes a mature, functional hormone.\n" +
        "- The **C peptide is not present in mature insulin**: it is removed during maturation.\n" +
        "- The main challenge for making insulin by rDNA techniques was getting insulin **assembled into a mature form**.\n" +
        "- In **1983**, **Eli Lilly**, an American company, prepared **two DNA sequences** for the **A and B chains** of human insulin and introduced them into the **plasmids** of *E. coli*. The chains were **produced separately, extracted and combined by creating disulphide bonds** to form human insulin.\n" +
        "- Insulin is a **protein**, so a dose swallowed by mouth would be **digested in the gut** like any other protein (NEET 2025 asked why it is not given orally).\n" +
        "- Recombinant therapeutics do not cause the unwanted immune responses common with similar products from non-human sources.",
      table: {
        columns: ["Form of insulin", "Has the C peptide?", "Note"],
        rows: [
          { cells: ["Pro-hormone (pro-insulin)", "Yes", "Must be processed into the mature hormone"] },
          { cells: ["Mature insulin", "No", "A and B chains joined by disulphide bridges"] },
          {
            cells: ["Insulin made by rDNA technology", "No", "A and B chains made separately in E. coli, then joined"],
            noteAmber: "NEET 2025: Eli Lilly used a bacterium (E. coli), not yeast, a virus or a phage.",
            pyqExampleId: "0a82f916-725f-43ef-8c2a-2bfec973ea7e",
          },
        ],
      },
      pyqExampleId: "c8239c66-9b82-4d75-83ea-646b0e2e0aed",
      selfCheckExample: {
        prompt: "Why did doctors want human insulin made by genetic engineering instead of insulin from cattle and pigs?",
        steps: [
          "Insulin from an animal is a foreign protein to a human.",
          "Some patients developed allergy or other reactions to it.",
        ],
        answer: "Animal insulin caused allergy and other reactions in some patients; human insulin made by rDNA technology avoids this.",
      },
      practiceSet: [
        { prompt: "In which year, and by which company, was human insulin first made from separate A and B chains in E. coli?", answer: "1983, Eli Lilly" },
        { prompt: "Into what part of E. coli were the DNA sequences for the insulin chains introduced?", answer: "Into its plasmids" },
        { prompt: "Before insulin was made by rDNA technology, where was insulin for diabetes extracted from?", answer: "From the pancreas of slaughtered cattle and pigs" },
        { prompt: "What was the main challenge in producing insulin by rDNA techniques?", answer: "Getting insulin assembled into a mature form" },
        { prompt: "Insulin is a protein. What would happen to a dose of insulin swallowed by mouth?", answer: "It would be digested in the gut like any other protein" },
      ],
      traps: [
        {
          title: "Engineered insulin has no C peptide",
          body: "The **pro-hormone** carries the **C peptide**; **mature insulin does not**. Eli Lilly made the **A and B chains separately**, so its insulin never had a C peptide. A statement that rDNA insulin has the C peptide is false.",
        },
        {
          title: "Two chains, two genes",
          body: "Eli Lilly prepared **two DNA sequences**, one for chain **A** and one for chain **B**, and made the chains **separately** before joining them with disulphide bonds. It did not make pro-insulin and process it.",
        },
        {
          title: "Read what the statement is about",
          body: "A statement set may ask only about **genetically engineered** insulin. Lines that are true of pro-insulin or of animal insulin (made in the pancreas, taken from cattle and pigs, causing allergy) do not describe the engineered product.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-gene-therapy",
      name: "Gene therapy for ADA deficiency",
      intuition:
        "Some children are born without a working gene for the enzyme adenosine deaminase (ADA), which the immune system needs. Gene therapy gives the body a normal copy of the gene. In the first trial, white blood cells (lymphocytes) were taken out, given the gene and put back. These cells do not live forever, so the treatment must be repeated. Putting the gene into early embryonic cells could cure it for good.",
      definition:
        "Gene therapy, as NCERT gives it:\n" +
        "- **Gene therapy** is a collection of methods that allows **correction of a gene defect** diagnosed in a **child or embryo**. Genes are inserted into a person's cells and tissues to treat a disease.\n" +
        "- Correction means delivering a **normal gene** into the person or embryo to take over the function of, and compensate for, the non-functional gene.\n" +
        "- The **first clinical gene therapy** was given in **1990** to a **4-year-old girl** with **adenosine deaminase (ADA) deficiency**.\n" +
        "- The **ADA enzyme is crucial for the immune system** to work. The disorder is caused by **deletion of the gene** for adenosine deaminase.\n" +
        "- In some children it can be cured by **bone marrow transplantation**; in others it is treated by **enzyme replacement therapy** (functional ADA given by injection). Neither approach is **completely curative**.\n" +
        "- Gene therapy steps: **lymphocytes from the patient's blood are grown in culture** outside the body; a **functional ADA cDNA** is introduced into them using a **retroviral vector**; the cells are **returned to the patient**.\n" +
        "- These cells are **not immortal**, so the patient needs **periodic infusion** of genetically engineered lymphocytes.\n" +
        "- If the gene isolated from **marrow cells producing ADA** is introduced into cells at **early embryonic stages**, it could be a **permanent cure**.",
      table: {
        columns: ["Treatment for ADA deficiency", "What is done", "Is it a lasting cure?"],
        rows: [
          { cells: ["Bone marrow transplantation", "New marrow given", "Not completely curative"] },
          { cells: ["Enzyme replacement therapy", "Functional ADA injected", "Not completely curative"] },
          { cells: ["Gene therapy in lymphocytes", "ADA cDNA put into cultured lymphocytes by a retroviral vector, then returned", "No: the cells are not immortal, so infusions are repeated"] },
          { cells: ["Gene put into early embryonic cells", "Gene from ADA-producing marrow cells introduced at early embryonic stages", "Could be a permanent cure"] },
        ],
      },
      pyqExampleId: "676bc48d-ad46-418b-b650-e594b831832c",
      selfCheckExample: {
        prompt: "A child with ADA deficiency shows frequent infections. Which body system fails, and what causes the disorder?",
        steps: [
          "The ADA enzyme is crucial for the immune system to function.",
          "The disorder is caused by deletion of the gene for adenosine deaminase.",
        ],
        answer: "The immune system fails; the cause is deletion of the ADA gene.",
      },
      practiceSet: [
        { prompt: "When and to whom was the first clinical gene therapy given?", answer: "In 1990, to a 4-year-old girl with ADA deficiency" },
        { prompt: "What vector carries the functional ADA cDNA into the patient's lymphocytes?", answer: "A retroviral vector" },
        { prompt: "Name the two treatments for ADA deficiency other than gene therapy.", answer: "Bone marrow transplantation and enzyme replacement therapy" },
        { prompt: "How could ADA deficiency be cured permanently?", answer: "By introducing the gene from ADA-producing marrow cells into cells at early embryonic stages" },
        { prompt: "Define gene therapy.", answer: "A collection of methods that allows correction of a gene defect diagnosed in a child or embryo, by inserting genes into a person's cells and tissues" },
      ],
      traps: [
        {
          title: "The reason is short-lived cells",
          body: "Infusions are repeated because the engineered **lymphocytes are not immortal**. That the cells are grown in culture, or that a retroviral vector is used, is true but is not the reason.",
        },
        {
          title: "ADA deficiency is an immune disorder",
          body: "Without ADA the **immune system** does not work. It is not linked to Addison's disease, Parkinson's disease or digestion.",
        },
        {
          title: "Only the embryonic route is permanent",
          body: "Bone marrow transplantation, enzyme replacement and lymphocyte gene therapy are all **not completely curative**. Only introducing the gene at **early embryonic stages** could give a permanent cure.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-diagnosis",
      name: "Molecular diagnosis",
      intuition:
        "A doctor usually suspects an infection only after symptoms appear, and by then the germs are already many. Molecular methods find a disease much earlier. PCR copies the germ's DNA or RNA until even a tiny amount can be seen. A labelled probe finds a gene by pairing with it. ELISA finds the germ's antigens or the antibodies made against it.",
      definition:
        "Molecular diagnosis, as NCERT gives it:\n" +
        "- Early diagnosis and understanding the **pathophysiology** of a disease are important for effective treatment.\n" +
        "- **Conventional methods** (serum and urine analysis) **cannot detect a disease early**.\n" +
        "- **Recombinant DNA technology, PCR and ELISA** serve the purpose of **early diagnosis**.\n" +
        "- A pathogen is usually suspected only after it has caused a **symptom**, when its concentration is already high.\n" +
        "- **PCR** amplifies the nucleic acid of a bacterium or virus, so a **very low concentration** can be found before symptoms show. PCR is routinely used to **detect HIV** in suspected AIDS patients, to find **mutations in genes in suspected cancer patients**, and to identify many other genetic disorders.\n" +
        "- **Probe and autoradiography:** a **single-stranded DNA or RNA tagged with a radioactive molecule** (the probe) is allowed to hybridise to its complementary DNA in a clone of cells, then detected by **autoradiography**. The clone with the **mutated gene does not appear** on the photographic film, because the probe has **no complementarity** with the mutated gene.\n" +
        "- **ELISA** is based on **antigen-antibody interaction**. It detects infection by the presence of **antigens** (proteins, glycoproteins) or of **antibodies** made against the pathogen.",
      table: {
        columns: ["Method", "What it detects", "How"],
        rows: [
          { cells: ["Serum and urine analysis", "Disease, but late", "Conventional method; no early detection"] },
          { cells: ["PCR", "Very small amounts of a pathogen's nucleic acid; gene mutations", "Amplifies the nucleic acid (used for HIV and suspected cancer)"] },
          {
            cells: ["Radioactive probe with autoradiography", "A mutated gene", "The mutated clone does not appear on the film, as the probe does not pair with it"],
            noteAmber: "NEET 2021: the mutated gene does not appear on the film because the probe has no complementarity with it.",
            pyqExampleId: "261a7c51-581e-4170-8545-d27ebe3fe467",
          },
          { cells: ["ELISA", "Antigens of the pathogen, or antibodies against it", "Antigen-antibody interaction"] },
        ],
      },
      pyqExampleId: "da8844b1-0027-446b-b68b-3a939a82d1ea",
      selfCheckExample: {
        prompt: "A test for an infection works by detecting the antibodies a patient has made against the pathogen. Which technique is this, and on what principle does it rest?",
        steps: [
          "Detecting antigens or antibodies is ELISA.",
          "ELISA is based on antigen-antibody interaction.",
        ],
        answer: "ELISA; it rests on antigen-antibody interaction.",
      },
      practiceSet: [
        { prompt: "Why can PCR detect a pathogen before any symptoms appear?", answer: "It amplifies the pathogen's nucleic acid, so even a very low concentration can be detected" },
        { prompt: "Which virus does PCR routinely detect in suspected AIDS patients?", answer: "HIV" },
        { prompt: "What is a probe in molecular diagnosis?", answer: "A single-stranded DNA or RNA tagged with a radioactive molecule" },
        { prompt: "By what technique is a hybridised radioactive probe detected?", answer: "Autoradiography" },
        { prompt: "Name the two things ELISA can detect to show an infection.", answer: "Antigens of the pathogen (proteins, glycoproteins) or antibodies made against it" },
      ],
      traps: [
        {
          title: "Serum and urine tests are not early tests",
          body: "NCERT calls **serum and urine analysis** conventional methods that **cannot** give early detection. rDNA technology, PCR and ELISA can.",
        },
        {
          title: "The mutated gene stays dark",
          body: "The probe pairs only with the **normal** sequence. The clone with the **mutated** gene does **not** appear on the film, because the probe has no complementarity with it.",
        },
        {
          title: "ELISA is antibodies, PCR is nucleic acid",
          body: "**ELISA** works through **antigen-antibody** binding. **PCR** amplifies **DNA or RNA** and uses no antibodies. Options swap the two.",
        },
      ],
    },
  ],
};
