import type { SubtopicNote } from "@/app/notes/_types";

export const PATHOGENS_AND_DISEASES_NOTE: SubtopicNote = {
  subtopicName: "Pathogens and Diseases",
  title: "Pathogens and Diseases — the Master Pairings",
  oneLineDefinition:
    "A pathogen is a disease-causing organism; the NDA tests you on which exact organism causes which disease, and what KIND of organism it is — virus, bacterium, protozoan, fungus or worm.",
  whyItMatters:
    "This is the heart of the chapter — 13 PYQs, all EASY or MODERATE, all pure recall. " +
    "The single highest-yield skill is the disease↔pathogen↔type table: knowing malaria is a protozoan (Plasmodium), TB a bacterium (Mycobacterium), AIDS a virus (HIV), and elephantiasis a worm (Wuchereria). " +
    "The bank's signature trap is the swapped pair (Malaria : Mycobacterium), so learn each pairing in BOTH directions. " +
    "Beyond the pairings, three side-facts recur: how a disease spreads (waterborne vs airborne), the genetic material of a virus, and the cell a disease attacks (dengue drops platelets).",
  concepts: [
    // Foundation — the five kinds of pathogen (formula variant, NO PYQ)
    {
      kind: "formula" as const,
      slug: "micro-pathogen-types",
      name: "The five kinds of pathogen",
      intuition:
        "Every disease-causing organism is one of five kinds: virus, bacterium, protozoan, fungus or worm. " +
        "Before you can name the exact organism, classify the kind — most NDA questions are won or lost at this first step, because the wrong-kind distractors are the easy eliminations.",
      definition:
        "A **pathogen** is any organism that causes disease. The five kinds, smallest to largest:\n" +
        "- **Virus** — not truly alive; a protein coat around DNA or RNA; reproduces only inside a host cell. Causes AIDS, dengue, smallpox, COVID-19.\n" +
        "- **Bacterium** — a single-celled organism with a cell wall but no nucleus (prokaryote). Causes TB, cholera, typhoid, tetanus.\n" +
        "- **Protozoan** — a single-celled organism WITH a nucleus (eukaryote). Causes malaria, sleeping sickness, amoebic dysentery.\n" +
        "- **Fungus** — yeasts and moulds; eukaryotic. Causes ringworm, athlete's foot.\n" +
        "- **Worm (helminth)** — a multicellular parasite. Causes elephantiasis, ascariasis (roundworm).",
      visualizationSlug: "micro-pathogen-tree",
      authoredExample: {
        prompt:
          "Classify the cause of each disease by kind of pathogen: (a) tuberculosis, (b) malaria, (c) smallpox, (d) elephantiasis.",
        steps: [
          "Tuberculosis is caused by Mycobacterium — a bacterium.",
          "Malaria is caused by Plasmodium — a protozoan (single-celled, with a nucleus).",
          "Smallpox is caused by the Variola virus — a virus.",
          "Elephantiasis is caused by Wuchereria bancrofti — a worm (filarial roundworm).",
        ],
        answer: "(a) bacterium, (b) protozoan, (c) virus, (d) worm.",
      },
      practiceSet: [
        { prompt: "What kind of pathogen causes malaria?", answer: "Protozoan", method: "Plasmodium — single-celled with a nucleus" },
        { prompt: "What kind of pathogen causes AIDS?", answer: "Virus", method: "HIV" },
        { prompt: "What kind of pathogen causes elephantiasis?", answer: "Worm (helminth)", method: "Wuchereria bancrofti" },
        { prompt: "Is a bacterium a prokaryote or a eukaryote?", answer: "Prokaryote", method: "cell wall, no true nucleus" },
      ],
    },

    // Master disease-pathogen-type table (REFERENCE)
    {
      kind: "reference" as const,
      slug: "micro-disease-pathogen-table",
      name: "The disease–pathogen–type table",
      intuition:
        "This is the table the whole chapter is built on. Each row pins a disease to the exact organism that causes it and the kind of organism that is. " +
        "Read it down (disease → cause) and across (cause → kind) until both directions are automatic — the bank tests both.",
      definition:
        "The high-yield disease↔pathogen↔type pairings the NDA has tested. Learn the **bold** organism name with its disease:\n" +
        "- **Protozoan diseases:** malaria (**Plasmodium**), sleeping sickness (**Trypanosoma**), amoebic dysentery (**Entamoeba**).\n" +
        "- **Bacterial diseases:** tuberculosis (**Mycobacterium**), cholera (**Vibrio cholerae**), typhoid (**Salmonella typhi**), tooth decay (**Streptococcus mutans**), tetanus (**Clostridium tetani**).\n" +
        "- **Viral diseases:** AIDS (**HIV**), dengue, smallpox (**Variola**), COVID-19, chickenpox (**Varicella zoster**).\n" +
        "- **Worm diseases:** elephantiasis / filariasis (**Wuchereria bancrofti**), ascariasis (**Ascaris**).",
      table: {
        columns: ["Disease", "Pathogen", "Type"],
        rows: [
          { cells: ["Malaria", "**Plasmodium**", "Protozoan"] },
          {
            cells: ["Sleeping sickness", "**Trypanosoma**", "Protozoan"],
            noteAmber: "Transmitted by the tsetse fly. NDA 2017.",
            pyqExampleId: "99e6810a-a844-4dc3-80b2-9f384c9f0195",
          },
          {
            cells: ["Tuberculosis (TB)", "**Mycobacterium**", "Bacterium"],
            noteAmber: "TB = Mycobacterium, NOT Plasmodium. The bank swaps this with malaria. NDA 2025.",
            pyqExampleId: "8b39982f-d429-4308-963b-cc9582d954c2",
          },
          { cells: ["Cholera", "**Vibrio cholerae**", "Bacterium"] },
          {
            cells: ["Typhoid", "**Salmonella typhi**", "Bacterium"],
            noteAmber: "AIDS, dengue and COVID-19 are viral; typhoid is the bacterial one. NDA 2019, 2022.",
            pyqExampleId: "4bd91418-5a6d-43d3-b6c8-030d0b9e7b9f",
          },
          {
            cells: ["Smallpox", "**Variola virus**", "Virus"],
            noteAmber: "Eradicated worldwide in 1980 (WHO). NDA 2021.",
            pyqExampleId: "84de8915-bbaf-4d11-bda8-27964242ffa4",
          },
          { cells: ["AIDS", "**HIV**", "Virus"] },
          { cells: ["Chickenpox", "**Varicella zoster**", "Virus"] },
          { cells: ["Elephantiasis (filariasis)", "**Wuchereria bancrofti**", "Worm"] },
        ],
        caption:
          "The swapped pair is the classic trap: Malaria is Plasmodium (protozoan), TB is Mycobacterium (bacterium) — never the reverse.",
      },
      selfCheckExample: {
        prompt:
          "An exam lists the pair 'Typhoid : Trypanosoma'. Is it correctly matched? If not, give the right pathogen for each name.",
        steps: [
          "Typhoid is caused by Salmonella typhi, a bacterium — not Trypanosoma.",
          "Trypanosoma causes sleeping sickness, a protozoan disease.",
          "So the pair is wrongly matched on both sides.",
        ],
        answer: "Wrongly matched. Typhoid = Salmonella typhi; Trypanosoma = sleeping sickness.",
      },
      practiceSet: [
        { prompt: "Which organism causes sleeping sickness?", answer: "Trypanosoma", method: "protozoan, via tsetse fly" },
        { prompt: "Which organism causes tuberculosis?", answer: "Mycobacterium (tuberculosis)" },
        { prompt: "Which bacterium causes typhoid?", answer: "Salmonella typhi" },
        { prompt: "Which virus caused smallpox?", answer: "Variola virus" },
        { prompt: "Of AIDS, dengue, COVID-19 and typhoid — which is bacterial?", answer: "Typhoid", method: "the other three are viral" },
      ],
      pyqExampleId: "8b39982f-d429-4308-963b-cc9582d954c2", // malaria:Plasmodium / TB:Mycobacterium swap
      traps: [
        {
          title: "Malaria ↔ Plasmodium, TB ↔ Mycobacterium — never swapped",
          body:
            "The bank's favourite item gives 'Malaria : Mycobacterium' and 'TB : Plasmodium' and asks which is correct — the answer is **neither**. Malaria is **Plasmodium** (protozoan); TB is **Mycobacterium** (bacterium). Lock both pairings in both directions.",
        },
        {
          title: "Typhoid is the bacterial odd-one-out",
          body:
            "When a list mixes AIDS, dengue, COVID-19 and typhoid and asks which is **bacterial**, the answer is **typhoid** (Salmonella typhi). The other three are all viral.",
        },
        {
          title: "Sleeping sickness is a protozoan, not a worm",
          body:
            "Sleeping sickness is caused by **Trypanosoma**, a single-celled protozoan — not a worm. Distractors offer Naegleria, Histomonas; the right answer is Trypanosoma, carried by the tsetse fly.",
        },
      ],
    },

    // How diseases spread (REFERENCE)
    {
      kind: "reference" as const,
      slug: "micro-disease-transmission",
      name: "How diseases spread — waterborne, airborne, vector",
      intuition:
        "Knowing the cause is half the marks; knowing the route of spread is the other half. " +
        "The NDA asks 'which one is a waterborne disease?' and 'cholera is caused by ___' — both are route questions. Group the common diseases by how they reach you.",
      definition:
        "Diseases grouped by route of transmission:\n" +
        "- **Waterborne** (contaminated food/water): **cholera**, **typhoid**, **jaundice** (hepatitis A/E), amoebic dysentery. Caused by drinking or eating contaminated material.\n" +
        "- **Airborne** (droplets): **tuberculosis**, common cold, influenza, COVID-19.\n" +
        "- **Vector-borne** (an insect carrier): **malaria** (Anopheles mosquito), **dengue** (Aedes mosquito), **filariasis** (Culex mosquito), sleeping sickness (tsetse fly).\n" +
        "- **Animal bite:** **rabies** (dog/bat bite). Non-infectious conditions like **arthritis** spread by no route at all.",
      table: {
        columns: ["Route", "Diseases", "Key fact"],
        rows: [
          {
            cells: ["**Waterborne**", "Cholera, typhoid, jaundice", "Spread by contaminated food or water"],
            noteAmber: "Jaundice is the waterborne answer when paired against TB (air), rabies (bite), arthritis (none). NDA 2018.",
            pyqExampleId: "8d6149f9-b469-4b3c-9113-b46778537524",
          },
          {
            cells: ["**Cholera (route)**", "Vibrio cholerae", "Contaminated food/water → severe watery diarrhoea"],
            noteAmber: "Not loss of memory, not a muscle disease, not genetic. NDA 2019.",
            pyqExampleId: "21fc358f-c1e7-4f19-8395-898edf122b57",
          },
          { cells: ["**Airborne**", "Tuberculosis, cold, flu, COVID-19", "Spread by respiratory droplets"] },
          { cells: ["**Vector-borne**", "Malaria, dengue, filariasis", "Carried by a mosquito or fly"] },
          { cells: ["**Animal bite**", "Rabies", "Dog or bat bite; not waterborne"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "From this list — tuberculosis, jaundice, rabies, arthritis — which one is waterborne, and why are the others not?",
        steps: [
          "Jaundice (hepatitis A/E) spreads through contaminated water → waterborne.",
          "Tuberculosis spreads through air (respiratory droplets).",
          "Rabies spreads through an animal bite.",
          "Arthritis is non-infectious — no transmission route.",
        ],
        answer: "Jaundice is waterborne; TB is airborne, rabies is bite-borne, arthritis spreads by no route.",
      },
      practiceSet: [
        { prompt: "Cholera is caused by consuming ___.", answer: "Contaminated food or water", method: "Vibrio cholerae" },
        { prompt: "Name a waterborne disease.", answer: "Jaundice / cholera / typhoid" },
        { prompt: "How does tuberculosis spread?", answer: "Through air (droplets)" },
        { prompt: "How does rabies spread?", answer: "Through an animal bite (dog/bat)" },
      ],
      pyqExampleId: "21fc358f-c1e7-4f19-8395-898edf122b57", // cholera = contaminated food/water
      traps: [
        {
          title: "Cholera is NOT a memory, muscle or genetic disease",
          body:
            "Distractors recast cholera as 'loss of memory', a 'muscle disease from alcohol', or a 'genetic disease'. It is a **bacterial infection (Vibrio cholerae) from contaminated food or water** causing watery diarrhoea.",
        },
        {
          title: "TB is airborne, not waterborne",
          body:
            "When asked for a waterborne disease, **tuberculosis is a distractor** — it spreads through air. The waterborne answer is usually jaundice, cholera or typhoid.",
        },
      ],
    },

    // Viruses — nature + genetic material (REFERENCE)
    {
      kind: "reference" as const,
      slug: "micro-viruses",
      name: "Viruses — nature and genetic material",
      intuition:
        "Viruses sit on the border of living and non-living: inert like a chemical outside a host, but able to reproduce inside one. " +
        "The NDA tests two things — what viruses can and cannot do, and the genetic material of specific viruses (AIDS is the favourite).",
      definition:
        "What the bank tests about viruses:\n" +
        "- A virus is a **protein coat around genetic material** (DNA *or* RNA, never both); it has no cell, no organelles, no metabolism of its own.\n" +
        "- Viruses **need a living host cell to reproduce** — they cannot multiply on their own.\n" +
        "- Outside a host they behave like inert chemical particles and can even be crystallised.\n" +
        "- They **cannot make their own food** — no photosynthesis, no respiration (they lack the organelles).\n" +
        "- **HIV (AIDS)** is a retrovirus whose genetic material is **single-stranded RNA**.",
      table: {
        columns: ["Statement about viruses", "True or false"],
        rows: [
          { cells: ["Need living cells to reproduce", "**True**"] },
          { cells: ["All viruses are parasites", "**True**"] },
          {
            cells: ["Can synthesize food by photosynthesis", "**False**"],
            noteAmber: "Viruses have no chloroplasts or organelles — they cannot photosynthesise. The 'NOT true' answer. NDA 2019.",
            pyqExampleId: "fd4f3f70-9a5b-4700-8bca-f7471a4b208c",
          },
          { cells: ["Behave like chemicals outside a host", "**True**"] },
          {
            cells: ["HIV genetic material", "**Single-stranded RNA**"],
            noteAmber: "HIV is a retrovirus — single-stranded RNA, not DNA. NDA 2018.",
            pyqExampleId: "12f64d6f-eebe-4591-8e47-65990f8fb776",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statement is NOT true of viruses: (a) they need a host to reproduce, (b) they are parasites, (c) they make food by photosynthesis, (d) they act like chemicals outside a host?",
        steps: [
          "Viruses do need a host to reproduce — true.",
          "All viruses are parasites — true.",
          "Viruses have no chloroplasts and no metabolism — they cannot photosynthesise. This is the FALSE statement.",
          "Outside a host they behave like inert chemicals — true.",
        ],
        answer: "(c) is NOT true — viruses cannot photosynthesise.",
      },
      practiceSet: [
        { prompt: "What is the genetic material of HIV?", answer: "Single-stranded RNA", method: "a retrovirus" },
        { prompt: "Can a virus reproduce outside a living cell?", answer: "No", method: "it needs a host cell" },
        { prompt: "Can a virus photosynthesise?", answer: "No", method: "it has no chloroplasts or organelles" },
        { prompt: "A virus is a protein coat around what?", answer: "Genetic material (DNA or RNA)" },
      ],
      pyqExampleId: "12f64d6f-eebe-4591-8e47-65990f8fb776", // AIDS = single-stranded RNA
      traps: [
        {
          title: "HIV carries RNA, not DNA",
          body:
            "AIDS is caused by HIV, a **retrovirus with single-stranded RNA**. Distractors offer double-stranded DNA or double-stranded RNA — the answer is single-stranded RNA.",
        },
        {
          title: "Viruses cannot make their own food",
          body:
            "A 'which statement is NOT true?' item slips in 'viruses can synthesise food by photosynthesis' — **false**. Viruses have no organelles and no metabolism; they depend entirely on a host.",
        },
      ],
    },

    // Disease side-facts: target cell, mechanism, agencies (REFERENCE)
    {
      kind: "reference" as const,
      slug: "micro-disease-mechanisms",
      name: "Disease mechanisms and the odd facts",
      intuition:
        "A few questions go past 'who causes it' to 'what does it do' — which cell a disease attacks, how a bacterium grips your teeth, what an ECG records. These are scattered single-fact recalls; collect them in one place.",
      definition:
        "The mechanism and side-facts the bank has tested:\n" +
        "- **Dengue** drops the count of **platelets (thrombocytes)** — causing the bleeding risk. (Not monocytes, eosinophils or neutrophils.)\n" +
        "- **Streptococcus mutans** (tooth decay) attaches to enamel by making a sticky slime layer from **sugar** (dietary glucose).\n" +
        "- An **ECG (electrocardiogram)** is a graphical record of the **electrical activity of the heart** — not the brain (EEG), kidney or cornea.\n" +
        "- **FSSAI** (Food Safety and Standards Authority of India) is the agency that enforces **food-safety laws in India** — not the FDA, WHO or FAO.",
      table: {
        columns: ["Question", "Answer", "Note"],
        rows: [
          {
            cells: ["Dengue reduces which blood cells?", "**Platelets** (thrombocytes)", "Causes bleeding risk; NDA 2017"],
            pyqExampleId: "1a523e91-1db7-43a3-81f3-950599bf0152",
          },
          {
            cells: ["Streptococcus mutans makes slime from", "**Sugar**", "Sticky glucan grips tooth enamel; NDA 2023"],
            pyqExampleId: "bef384f9-5d9e-472d-80c3-232aefe68957",
          },
          {
            cells: ["ECG records the activity of the", "**Heart**", "Electrical activity; brain = EEG. NDA 2019"],
            pyqExampleId: "4aaa72e8-30f4-4c07-b403-30ec3455645e",
          },
          {
            cells: ["Agency enforcing food-safety law in India", "**FSSAI**", "Not FDA, WHO or FAO. NDA 2017"],
            pyqExampleId: "788689b4-8dc0-4d5b-8b88-0d2f9b7b2c82",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Dengue is dangerous partly because it sharply lowers the count of one type of blood cell. Which one, and what does that cause?",
        steps: [
          "Dengue virus causes thrombocytopenia — a fall in platelet count.",
          "Platelets (thrombocytes) are needed for blood clotting.",
          "A low platelet count raises the risk of internal bleeding.",
        ],
        answer: "Platelets (thrombocytes) — their fall raises bleeding risk.",
      },
      practiceSet: [
        { prompt: "Dengue reduces the count of which blood cells?", answer: "Platelets (thrombocytes)" },
        { prompt: "Streptococcus mutans builds its slime layer from what?", answer: "Sugar", method: "sticky glucan" },
        { prompt: "An ECG records the electrical activity of which organ?", answer: "The heart" },
        { prompt: "Which agency enforces food-safety laws in India?", answer: "FSSAI" },
      ],
      pyqExampleId: "1a523e91-1db7-43a3-81f3-950599bf0152", // dengue → platelets
      traps: [
        {
          title: "Dengue hits platelets, not white cells",
          body:
            "Distractors offer monocytes, eosinophils, neutrophils — all white cells. Dengue specifically lowers **platelets (thrombocytes)**, the clotting cells, which is why bleeding is a danger.",
        },
        {
          title: "ECG = heart, EEG = brain",
          body:
            "An **ECG** (electrocardiogram) records the **heart's** electrical activity. The brain's electrical activity is recorded by an **EEG** (electroencephalogram) — a common swap.",
        },
      ],
    },
  ],
};
