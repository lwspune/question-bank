import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HH_DISEASES_NOTE: SubtopicNote = {
  subtopicName: "Common Diseases in Humans",
  title: "Common Diseases in Humans",
  oneLineDefinition:
    "The common human diseases NCERT describes, each with its pathogen, how it spreads and its symptoms, and the life cycle of the malaria parasite Plasmodium.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Four are match-the-columns pairing diseases with their pathogens (NEET 2021, NEET 2023 and two in NEET 2024); ringworm and filariasis each came up in three of them. The other two (NEET 2026 and Re-NEET 2026) are on the Plasmodium life cycle.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohh-pathogens",
      name: "Diseases and their pathogens",
      intuition:
        "A disease that passes from one person to another is caused by a living agent, the pathogen. NCERT gives a short list of diseases, and for each one NEET wants three things: who causes it (a bacterium, a virus, a protozoan, a worm or a fungus), how it reaches a new person, and the symptom that gives it away. Learn the table row by row, because a match-the-columns question is just this table cut into pieces.",
      definition:
        "**Health** is a state of complete physical, mental and social well-being. Diseases that spread from one person to another are **infectious**; the organisms that cause them are **pathogens**: **bacteria, viruses, fungi, protozoans and helminths** (worms).\n\n" +
        "Points NCERT adds beyond the table:\n" +
        "- **Typhoid** bacteria enter the **small intestine** with contaminated food and water and spread to other organs through the blood. Intestinal perforation and death can occur in severe cases. The fever is confirmed by the **Widal test**. **Mary Mallon** (Typhoid Mary), a cook, was a typhoid carrier who spread it for years through the food she prepared.\n" +
        "- **Pneumonia** infects the **alveoli** of the lungs, which fill with fluid and make breathing hard.\n" +
        "- The **common cold** infects the **nose and respiratory passage but not the lungs**.\n" +
        "- **Dysentery, plague and diphtheria** are other bacterial diseases of humans.\n" +
        "- **Ringworm** is caused by a **fungus**, not a worm.\n\n" +
        "Prevention and control:\n" +
        "- **Personal hygiene** (clean body, safe food and water) and **public hygiene** (proper disposal of waste and excreta, clean water reservoirs, pools and tanks).\n" +
        "- For air-borne diseases such as pneumonia and the common cold, avoid close contact with the infected person and their belongings.\n" +
        "- For vector-borne diseases, control the vector: avoid stagnant water, use mosquito nets and wire mesh on doors and windows, spray insecticides in ditches and swamps, and put fish such as *Gambusia* in ponds to eat mosquito larvae. *Aedes* mosquitoes spread **dengue and chikungunya**.",
      table: {
        columns: ["Disease", "Pathogen", "How it spreads", "Key symptoms"],
        rows: [
          {
            cells: ["Typhoid", "Salmonella typhi (bacterium)", "Contaminated food and water", "Sustained high fever (39 to 40 °C), weakness, stomach pain, constipation, headache, loss of appetite; confirmed by the Widal test"],
            noteAmber: "NEET 2024: the Widal test was matched to typhoid, haemozoin to Plasmodium, common cold to rhinoviruses and allergy to dust mites.",
            pyqExampleId: "06d145dc-e125-4653-9ca6-c263ff05d394",
          },
          { cells: ["Pneumonia", "Streptococcus pneumoniae and Haemophilus influenzae (bacteria)", "Inhaling droplets or aerosols from an infected person; sharing glasses and utensils", "Alveoli fill with fluid; fever, chills, cough, headache; in severe cases lips and fingernails turn grey to bluish"] },
          { cells: ["Common cold", "Rhinoviruses", "Droplets from a cough or sneeze, inhaled or picked up from pens, books, cups, doorknobs or a computer keyboard or mouse", "Nasal congestion and discharge, sore throat, hoarseness, cough, headache, tiredness, lasting 3 to 7 days"] },
          { cells: ["Malaria", "Plasmodium vivax, P. malariae and P. falciparum (protozoa)", "Bite of an infected female Anopheles mosquito", "Chill and high fever recurring every 3 to 4 days"] },
          {
            cells: ["Amoebiasis (amoebic dysentery)", "Entamoeba histolytica (protozoan), in the large intestine", "Food and water contaminated with faecal matter; houseflies are mechanical carriers", "Constipation, abdominal pain and cramps, stools with excess mucous and blood clots"],
            noteAmber: "NEET 2021: filariasis went with Wuchereria bancrofti, amoebiasis with Entamoeba histolytica, pneumonia with Haemophilus influenzae and ringworm with Trichophyton.",
            pyqExampleId: "5f0095fe-00b6-4bba-89f0-e494a78d5ed4",
          },
          { cells: ["Ascariasis", "Ascaris, the common roundworm (helminth), an intestinal parasite", "Eggs passed in the faeces of an infected person contaminate soil, water and plants; taken in with water, vegetables and fruits", "Internal bleeding, muscular pain, fever, anaemia, blockage of the intestinal passage"] },
          {
            cells: ["Filariasis (elephantiasis)", "Wuchereria bancrofti and W. malayi, filarial worms (helminths)", "Bite of the female Culex mosquito", "Chronic inflammation of the organs they live in for years, usually the lymphatic vessels of the lower limbs; genital organs also affected"],
            noteAmber: "NEET 2024: typhoid was matched to a bacterium, leishmaniasis to a protozoan, ringworm to a fungus and filariasis to a nematode.",
            pyqExampleId: "525ed8b8-4857-47ce-a4fe-cc51e8498975",
          },
          { cells: ["Ringworm", "Fungi of the genera Microsporum, Trichophyton and Epidermophyton", "From soil, or from towels, clothes or combs used by an infected person", "Dry, scaly lesions on skin, nails and scalp with intense itching; heat and moisture help it grow, as in the groin or between the toes"] },
        ],
      },
      pyqExampleId: "ce6ca027-d103-46c3-b1e9-a016f175e02c",
      selfCheckExample: {
        prompt: "A patient has had a sustained fever of 39 to 40 °C for a week, with stomach pain, constipation and loss of appetite. Which disease is likely, and which test confirms it?",
        steps: [
          "Sustained high fever with stomach pain and constipation is NCERT's picture of typhoid, caused by Salmonella typhi.",
          "NCERT names one test that confirms typhoid fever.",
        ],
        answer: "Typhoid; the Widal test.",
      },
      practiceSet: [
        { prompt: "Which part of the respiratory system does the common cold not infect?", answer: "The lungs" },
        { prompt: "Which insects act as mechanical carriers of amoebiasis?", answer: "Houseflies" },
        { prompt: "In pneumonia, which part of the lungs is infected?", answer: "The alveoli, which fill with fluid" },
        { prompt: "Which fish is put in ponds to feed on mosquito larvae?", answer: "Gambusia" },
        { prompt: "Which mosquito spreads dengue and chikungunya?", answer: "Aedes" },
        { prompt: "Which mosquito is the vector of filariasis?", answer: "The female Culex mosquito" },
      ],
      traps: [
        {
          title: "Ringworm is a fungus, not a worm",
          body: "**Ringworm** is caused by **fungi** (*Microsporum*, *Trichophyton*, *Epidermophyton*). The worm diseases in this chapter are **ascariasis** and **filariasis**.",
        },
        {
          title: "Filariasis is spread by Culex, malaria by Anopheles",
          body: "The **female Culex** mosquito carries the filarial worm; the **female Anopheles** carries *Plasmodium*; *Aedes* carries dengue and chikungunya.",
        },
        {
          title: "The common cold stays out of the lungs",
          body: "Rhinoviruses infect the **nose and respiratory passage but not the lungs**. Pneumonia is the disease that infects the **alveoli**.",
        },
        {
          title: "Haemophilus influenzae is a bacterium",
          body: "Despite its name, *Haemophilus influenzae* is a **bacterium** that causes **pneumonia**, along with *Streptococcus pneumoniae*. The common cold is the viral disease, caused by **rhinoviruses**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohh-malaria",
      name: "The life cycle of Plasmodium",
      visualizationSlug: "neet-plasmodium-cycle",
      intuition:
        "Plasmodium needs two hosts, a human and a mosquito. In the human it only multiplies by splitting, first in the liver and then in the red blood cells. The sexual part, the joining of gametes, can only happen once a mosquito sucks up the parasite with blood. Keep the two halves apart: asexual in the human, fertilisation in the mosquito.",
      definition:
        "Malaria is caused by *Plasmodium*, a protozoan: *P. vivax*, *P. malariae* and *P. falciparum*. **Malignant malaria**, caused by *P. falciparum*, is the most serious and can even be fatal.\n\n" +
        "*Plasmodium* needs **two hosts**, humans and mosquitoes:\n" +
        "- It enters the human as **sporozoites** (the infectious form) through the bite of an infected **female Anopheles** mosquito.\n" +
        "- The parasites first multiply **asexually in the liver cells**, then attack the **red blood cells**, multiplying there and bursting them.\n" +
        "- The rupture of RBCs releases a toxic substance, **haemozoin**, which causes the **chill and high fever recurring every three to four days**.\n" +
        "- The sexual stages, **gametocytes**, develop **in the RBCs**.\n" +
        "- When a female *Anopheles* bites an infected person, the gametocytes enter the mosquito. **Fertilisation and development take place in the mosquito's stomach**.\n" +
        "- The mature sporozoites escape from the intestine and migrate to the mosquito's **salivary glands**, from where they are injected into the next person it bites.",
      table: {
        columns: ["Stage", "Where", "What happens"],
        rows: [
          {
            cells: ["1. Sporozoites enter", "Human blood, by the bite of an infected female Anopheles", "Sporozoites, the infectious form, are injected"],
            noteAmber: "NEET 2026: the stages were put in order: sporozoites injected, sporozoites reach the liver, asexual reproduction in liver cells, asexual reproduction in RBCs, gametocytes in RBCs.",
            pyqExampleId: "e9116a94-b8ce-49d7-8c69-0fd63ae1db3a",
          },
          { cells: ["2. Liver", "Human liver cells", "The parasites reach the liver through the blood, reproduce asexually, burst the cells and are released into the blood"] },
          { cells: ["3. Red blood cells", "Human RBCs", "The parasites reproduce asexually, bursting the RBCs and releasing haemozoin; cycles of fever follow and new RBCs are infected"] },
          { cells: ["4. Gametocytes", "Human RBCs", "The sexual stages, gametocytes, develop"] },
          { cells: ["5. Blood meal", "Female Anopheles biting an infected person", "Gametocytes are taken up with the blood"] },
          { cells: ["6. Fertilisation", "Mosquito's stomach", "Fertilisation and development take place"] },
          { cells: ["7. Salivary glands", "Mosquito's salivary glands", "Mature sporozoites escape from the intestine and are stored here, ready for the next bite"] },
        ],
      },
      pyqExampleId: "b5476f79-808a-48d0-a064-d92a23f262fa",
      selfCheckExample: {
        prompt: "After an infected mosquito bites a person, in which human cells does Plasmodium multiply first, and does it multiply sexually or asexually there?",
        steps: [
          "Sporozoites travel in the blood to the liver.",
          "In the human, Plasmodium only multiplies asexually; fertilisation happens in the mosquito.",
        ],
        answer: "In the liver cells, asexually.",
      },
      practiceSet: [
        { prompt: "Which toxic substance, released when infected red blood cells burst, causes the chill and high fever of malaria?", answer: "Haemozoin" },
        { prompt: "Which species of Plasmodium causes malignant malaria?", answer: "Plasmodium falciparum" },
        { prompt: "In which organ of the mosquito are Plasmodium sporozoites stored?", answer: "The salivary glands" },
        { prompt: "What is the infectious form of Plasmodium that enters the human body?", answer: "Sporozoites" },
        { prompt: "How often does the fever of malaria recur?", answer: "Every three to four days" },
      ],
      traps: [
        {
          title: "Gametocytes form in human RBCs",
          body: "The sexual stages, **gametocytes**, develop in the **red blood cells of the human**. The mosquito only takes them up with a blood meal.",
        },
        {
          title: "Fertilisation happens in the mosquito",
          body: "*Plasmodium* reproduces **asexually** in human **liver cells and RBCs**. **Fertilisation** takes place in the **mosquito's stomach**, never in the human.",
        },
        {
          title: "Only the female Anopheles transmits malaria",
          body: "Sporozoites are injected by the bite of an infected **female Anopheles** mosquito. *Culex* spreads filariasis and *Aedes* spreads dengue.",
        },
        {
          title: "Haemozoin causes the fever",
          body: "The chill and high fever come from **haemozoin**, released when infected **RBCs burst**. It is a toxic substance, not the parasite itself.",
        },
      ],
    },
  ],
};
