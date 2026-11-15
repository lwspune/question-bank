import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HH_CANCER_NOTE: SubtopicNote = {
  subtopicName: "AIDS and Cancer",
  title: "AIDS and Cancer",
  oneLineDefinition:
    "How HIV spreads and destroys the helper T cells, how AIDS is diagnosed, and what cancer is: benign and malignant tumours, metastasis, carcinogens, detection and treatment.",
  whyItMatters:
    "Four NEET questions from 2023 to 2025. One asks where HIV multiplies (NEET 2023). Three are on cancer (Re-NEET 2024 and two in NEET 2025): what makes cells neoplastic and a tumour malignant, how cancer is detected, and how alpha-interferon helps.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohh-aids",
      name: "HIV and AIDS",
      intuition:
        "HIV attacks the very cells that run the immune system. It hides inside macrophages, which keep making new virus, and it multiplies inside the helper T cells, killing them one after another. As the helper T cells fall, the body can no longer fight even germs it would normally beat easily. AIDS is not one disease but this collapse of defence.",
      definition:
        "**AIDS** is **Acquired Immuno Deficiency Syndrome**: a deficiency of the immune system, acquired during life, shown as a group of symptoms. It was first reported in **1981**. It is caused by the **Human Immuno deficiency Virus (HIV)**, a **retrovirus** with an **RNA genome** inside an envelope.\n\n" +
        "How it spreads:\n" +
        "- sexual contact with an infected person\n" +
        "- transfusion of contaminated blood and blood products\n" +
        "- sharing infected needles, as intravenous drug abusers do\n" +
        "- from an infected mother to her child through the placenta\n\n" +
        "People at high risk: those with multiple sexual partners, drug addicts who take drugs intravenously, people who need repeated blood transfusions, and children born to an HIV-infected mother. HIV/AIDS is **not spread by mere touch or physical contact**; it spreads only through body fluids. There is always a gap between infection and the appearance of AIDS symptoms, from a few months to many years (usually **5 to 10 years**).\n\n" +
        "Treatment and prevention: **anti-retroviral drugs** are only partially effective; they **prolong life but cannot prevent death**. In India the **National AIDS Control Organisation (NACO)** and other NGOs educate people about AIDS. Safe blood from blood banks, disposable needles and syringes and free distribution of condoms help prevent it.",
      table: {
        columns: ["Step", "What happens"],
        rows: [
          { cells: ["Entry", "HIV, a retrovirus with an RNA genome, enters the body through infected body fluids"] },
          { cells: ["In macrophages", "Its RNA genome is copied into viral DNA by the enzyme reverse transcriptase; the viral DNA joins the host DNA and the cell makes virus particles. Macrophages keep producing virus, like an HIV factory"] },
          { cells: ["In helper T cells", "HIV also enters the helper T-lymphocytes (TH), replicates and produces progeny viruses, which are released into the blood and attack other helper T cells"] },
          { cells: ["Result", "Helper T cells fall steadily; fever, diarrhoea and weight loss follow, then infections by Mycobacterium, viruses, fungi and parasites such as Toxoplasma"] },
          { cells: ["Diagnosis", "ELISA (enzyme linked immuno-sorbent assay)"] },
          { cells: ["Treatment", "Anti-retroviral drugs, only partially effective: they prolong life but cannot prevent death"] },
        ],
      },
      pyqExampleId: "fe8daac3-9d48-4904-a6e6-3490a627c465",
      selfCheckExample: {
        prompt: "Inside a macrophage, which enzyme turns the RNA genome of HIV into viral DNA?",
        steps: [
          "HIV is a retrovirus: its genome is RNA.",
          "To join the host DNA, the RNA must first be copied into DNA, which reverse transcriptase does.",
        ],
        answer: "Reverse transcriptase.",
      },
      practiceSet: [
        { prompt: "Name the test widely used to diagnose AIDS.", answer: "ELISA (enzyme linked immuno-sorbent assay)" },
        { prompt: "Which organisation in India educates people about AIDS?", answer: "NACO, the National AIDS Control Organisation" },
        { prompt: "Why are macrophages called an HIV factory?", answer: "Once infected, they keep producing virus particles" },
        { prompt: "How long is the usual gap between HIV infection and the appearance of AIDS symptoms?", answer: "Usually 5 to 10 years (a few months to many years)" },
        { prompt: "In which year was AIDS first reported?", answer: "1981" },
      ],
      traps: [
        {
          title: "Anti-retroviral drugs do not cure AIDS",
          body: "Anti-retroviral drugs are **only partially effective**: they **prolong life** but **cannot prevent death**.",
        },
        {
          title: "HIV does not spread by touch",
          body: "HIV/AIDS is **not spread by mere touch or physical contact**. It spreads only through **body fluids**: sexual contact, contaminated blood, shared needles and mother to child.",
        },
        {
          title: "Helper T cells are the ones that fall",
          body: "HIV multiplies in **macrophages** and **helper T-lymphocytes (TH)**, and it is the **helper T cell** count that falls steadily. It is not a disease of B-lymphocytes or of red blood cells.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohh-cancer",
      name: "Cancer: tumours, causes, detection and treatment",
      intuition:
        "Normal cells stop dividing when they touch their neighbours. A cancer cell has lost this brake, so it keeps dividing into a lump, a tumour. If the lump stays where it began, it is benign. If it spreads into the tissue around it and sends cells through the blood to start new lumps elsewhere, it is malignant, and that spreading is what makes cancer deadly.",
      definition:
        "Cell growth and differentiation are highly controlled. Normal cells show **contact inhibition**: contact with other cells stops their growth. **Cancer cells have lost this property**, so they keep dividing and form **tumours**.\n" +
        "- **Benign tumours** normally stay **confined to their original location**, do not spread to other parts of the body and cause little damage.\n" +
        "- **Malignant tumours** are a mass of proliferating cells called **neoplastic or tumour cells**. They **grow very rapidly, invade and damage the surrounding normal tissue**, and starve normal cells by competing for nutrients.\n" +
        "- **Metastasis:** cells sloughed from a malignant tumour reach distant sites through the blood and start new tumours wherever they lodge. It is the **most feared property** of malignant tumours.\n\n" +
        "Causes: **carcinogens** turn normal cells into cancerous neoplastic cells.\n" +
        "- **Physical:** ionising radiations such as **X-rays and gamma rays**, and non-ionising radiations such as **UV**, damage DNA.\n" +
        "- **Chemical:** the chemical carcinogens in **tobacco smoke** are a major cause of lung cancer.\n" +
        "- **Biological:** **oncogenic viruses** carry **viral oncogenes**. Normal cells carry **cellular oncogenes (c-onc) or proto-oncogenes**, which can cause oncogenic transformation when activated under certain conditions.\n\n" +
        "Detection: **biopsy** and **histopathological** study of the tissue; blood and bone marrow tests for **increased cell counts in leukaemia**; **radiography (X-rays), CT and MRI** for cancers of internal organs (**CT** uses X-rays to give a three-dimensional image; **MRI** uses strong magnetic fields and non-ionising radiation); and antibodies against cancer-specific antigens.\n\n" +
        "Treatment: **surgery, radiation therapy and immunotherapy**, usually combined. **Chemotherapeutic drugs kill cancerous cells**, with side effects such as **hair loss and anaemia**. Tumour cells avoid the immune system, so patients are given **biological response modifiers** such as **α-interferon**, which **activates the immune system** and helps destroy the tumour.",
      table: {
        columns: ["Aspect", "NCERT fact"],
        rows: [
          { cells: ["Benign tumour", "Stays in its original location, does not spread, causes little damage"] },
          { cells: ["Malignant tumour", "Neoplastic cells that grow very rapidly, invade and damage the surrounding normal tissue"] },
          {
            cells: ["Metastasis", "Cells from a malignant tumour travel in the blood and start new tumours at distant sites; the most feared property"],
            noteAmber: "Re-NEET 2024: malignant tumours went with metastasis, MALT with lymphoid tissue, NACO with AIDS and alpha-interferons with destroying tumours.",
            pyqExampleId: "75f1209e-f870-49a0-8a50-a0a1e245b3d6",
          },
          { cells: ["Physical carcinogens", "Ionising X-rays and gamma rays; non-ionising UV"] },
          { cells: ["Proto-oncogenes", "Cellular oncogenes (c-onc) in normal cells; activated, they cause oncogenic transformation"] },
          {
            cells: ["Detection", "Biopsy and histopathology; raised blood cell counts in leukaemia; X-rays, CT and MRI for internal organs; antibodies against cancer-specific antigens"],
            noteAmber: "NEET 2025: CT and MRI detecting cancers of internal organs and alpha-interferon helping destroy the tumour were the true statements.",
            pyqExampleId: "de30b16d-85b1-4571-9315-273301cf2366",
          },
          { cells: ["Treatment", "Surgery, radiotherapy, chemotherapy (side effects: hair loss, anaemia) and immunotherapy with alpha-interferon"] },
        ],
      },
      pyqExampleId: "2596fe79-819c-4042-9a81-1e5e2f259385",
      selfCheckExample: {
        prompt: "Normal cells stop dividing when they touch neighbouring cells. What is this property called, and what has a cancer cell done to it?",
        steps: [
          "The brake on growth from contact with other cells is contact inhibition.",
          "Cancer cells have lost it, so they keep dividing and pile up into a tumour.",
        ],
        answer: "Contact inhibition; cancer cells have lost it.",
      },
      practiceSet: [
        { prompt: "What does CT (computed tomography) use to make a three-dimensional image of internal organs?", answer: "X-rays" },
        { prompt: "What does MRI use to detect changes in living tissue?", answer: "Strong magnetic fields and non-ionising radiation" },
        { prompt: "Name two side effects of chemotherapeutic drugs.", answer: "Hair loss and anaemia" },
        { prompt: "What are the genes in normal cells that can cause cancer when activated called?", answer: "Cellular oncogenes (c-onc) or proto-oncogenes" },
        { prompt: "Name two ionising radiations that can cause cancer.", answer: "X-rays and gamma rays" },
      ],
      traps: [
        {
          title: "Staying in place is benign",
          body: "A tumour that stays **confined to its original location** is **benign**. **Malignant** (neoplastic) cells **invade and damage** the surrounding tissue and spread by **metastasis**.",
        },
        {
          title: "Leukaemia raises blood cell counts",
          body: "Blood and bone marrow tests look for **increased** cell counts in **leukaemia**. A statement that the counts are decreased is false.",
        },
        {
          title: "Alpha-interferon is the biological response modifier",
          body: "**α-interferon** is a **biological response modifier** that activates the immune system. **Chemotherapeutic drugs** are not; they **kill cancerous cells** directly.",
        },
        {
          title: "UV is non-ionising but still causes cancer",
          body: "**X-rays and gamma rays** are **ionising**; **UV** is **non-ionising**. All of them damage DNA and can lead to neoplastic transformation.",
        },
      ],
    },
  ],
};
