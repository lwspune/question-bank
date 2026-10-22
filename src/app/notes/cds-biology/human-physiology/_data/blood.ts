import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_HU_BLOOD_NOTE: SubtopicNote = {
  subtopicName: "Blood and Breathing",
  title: "Blood and Breathing",
  oneLineDefinition:
    "What blood is made of, how haemoglobin carries the gases of breathing, why high altitude makes you breathless, what lymph is, the ABO blood groups, and how a vaccine prepares the body.",
  whyItMatters:
    "Seven CDS questions from 2016 (II) to 2026 (II). Five are about the blood itself: haemoglobin, red cells, platelets, lymph and altitude sickness. One asks the four ABO groups and one is about vaccination.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbihu-blood-cells",
      name: "Blood, haemoglobin and lymph",
      intuition:
        "Blood is a liquid, the plasma, carrying three kinds of cell. Red cells are bags of haemoglobin that pick up oxygen in the lungs and drop it in the tissues, and haemoglobin brings some carbon dioxide back. White cells fight germs, and platelets start a clot at a cut. Some plasma leaks out of the thin capillaries into the spaces between cells; this fluid is collected again as lymph.",
      definition:
        "The parts of blood:\n" +
        "- **Plasma**: the liquid part (mostly water) carrying digested food, hormones, salts and much of the carbon dioxide.\n" +
        "- **Red blood cells (RBCs)**: full of **haemoglobin**, an iron-containing protein. Haemoglobin carries **oxygen** and also some **carbon dioxide**. A mature mammalian RBC has **no nucleus** and no ribosomes, so it cannot make protein or divide, but it can squeeze through narrow capillaries.\n" +
        "- **White blood cells (WBCs)**: fight infection.\n" +
        "- **Platelets**: release the **clotting factors** that start a blood clot.\n" +
        "- **Lymph**: tissue fluid that has **leaked out of the capillaries**, collected in lymph vessels. It has white cells but **no red cells**, carries absorbed **fat** from the intestine, and is moved by body muscles and valves, not by the heart.\n\n" +
        "Breathing:\n" +
        "- In the lungs, oxygen passes from tiny air sacs, the **alveoli**, into the blood, and carbon dioxide passes out.\n" +
        "- At **high altitude** the air is thinner. It still has about 21 per cent oxygen, but the **partial pressure of oxygen** is **low**, so haemoglobin picks up less of it: this causes **altitude sickness**.",
      table: {
        columns: ["Part or situation", "What to remember"],
        rows: [
          {
            cells: ["Haemoglobin", "Carries both oxygen and carbon dioxide"],
            noteAmber: "CDS 2019 (I): haemoglobin carries both gases, not oxygen alone.",
            pyqExampleId: "eee07303-d437-4a17-9eea-e3ef6f4ec3b2",
          },
          {
            cells: ["Mature red blood cell", "No nucleus: cannot make protein or divide"],
            noteAmber: "CDS 2026 (II): protein synthesis and cell division are what an erythrocyte cannot do.",
            pyqExampleId: "45b9059e-0e35-4cf8-bee7-2922b7c50702",
          },
          {
            cells: ["Platelets", "Release clotting factors"],
            noteAmber: "CDS 2024 (I): clotting factors come from platelets, not RBCs, eosinophils or monocytes.",
            pyqExampleId: "f0b7dda1-1599-4050-844b-c6328139e2c5",
          },
          {
            cells: ["Lymph", "Fluid leaked from capillaries; no red cells"],
            noteAmber: "CDS 2018 (I): lymph forms from leakage of blood through capillaries.",
            pyqExampleId: "4bc033e2-3545-4fcf-bad5-edac84642194",
          },
          {
            cells: ["High altitude", "Low partial pressure of oxygen"],
            noteAmber: "CDS 2016 (II): altitude sickness is caused by low partial pressure of oxygen.",
            pyqExampleId: "74dfd759-a7a4-4f5f-9674-c662a66579fd",
          },
        ],
      },
      pyqExampleId: "eee07303-d437-4a17-9eea-e3ef6f4ec3b2",
      selfCheckExample: {
        prompt: "The air on a high mountain still contains about 21 per cent oxygen, yet a climber there feels breathless and dizzy. Why?",
        steps: [
          "The total air pressure is much lower high up.",
          "So the partial pressure of oxygen, the share of that pressure due to oxygen, is low, even though the percentage is the same.",
          "At low partial pressure haemoglobin loads less oxygen, and the tissues get too little.",
        ],
        answer: "The low partial pressure of oxygen means the blood carries less oxygen.",
      },
      practiceSet: [
        { prompt: "What is the liquid part of blood called?", answer: "Plasma" },
        { prompt: "Which blood cells fight infection?", answer: "White blood cells" },
        { prompt: "Does lymph contain red blood cells?", answer: "No" },
        { prompt: "What are the tiny air sacs in the lungs where gases are exchanged called?", answer: "Alveoli" },
      ],
      traps: [
        {
          title: "The percentage of oxygen does not fall",
          body: "High up, air still has about 21 per cent oxygen. What falls is the **pressure**, and so the **partial pressure** of oxygen. 'High partial pressure' or 'low haemoglobin' are the wrong causes.",
        },
        {
          title: "Lymph is not pumped by the heart",
          body: "Lymph has **no red cells**, is moved by **muscle squeezing and valves**, and carries fat and white cells, not hormones only.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-groups",
      name: "ABO blood groups and vaccination",
      intuition:
        "Red cells carry markers called antigens on their surface. A person may have the A marker, the B marker, both, or neither, and that gives the four blood groups. The plasma holds antibodies against whichever marker the person lacks, which is why the wrong blood in a transfusion makes the cells clump. A vaccine uses the same defence system: it shows the body a harmless form of a germ so the body is ready for the real one.",
      definition:
        "ABO blood groups (Karl Landsteiner):\n" +
        "- Four groups: **A, B, AB and O**, named by the antigen on the red cells.\n" +
        "- **O** has no A or B antigen: the **universal donor**. **AB** has no anti-A or anti-B antibody: the **universal recipient**.\n" +
        "- The **Rh factor** is a separate antigen: Rh positive or Rh negative.\n\n" +
        "Vaccination:\n" +
        "- A **vaccine** contains killed or weakened germs, or parts of them.\n" +
        "- The immune system responds by making **antibodies** and **memory cells**.\n" +
        "- When the real germ enters later, the body recognises it and responds much faster and more strongly. Edward **Jenner** made the first vaccine, against smallpox.",
      table: {
        columns: ["Blood group", "Antigen on red cells", "Antibody in plasma", "Can receive from"],
        rows: [
          {
            cells: ["A", "A", "Anti-B", "A and O"],
            noteAmber: "CDS 2025 (II): the four ABO types are A, B, AB and O.",
            pyqExampleId: "a5891143-6e57-4917-93b6-20e52d9b5bbb",
          },
          { cells: ["B", "B", "Anti-A", "B and O"] },
          { cells: ["AB", "A and B", "Neither", "All groups (universal recipient)"] },
          { cells: ["O", "Neither", "Anti-A and anti-B", "O only (universal donor)"] },
        ],
      },
      pyqExampleId: "a5891143-6e57-4917-93b6-20e52d9b5bbb",
      selfCheckExample: {
        prompt: "A patient of blood group B needs a transfusion urgently. Which groups can safely be given, and why not group A?",
        steps: [
          "Group B plasma carries anti-A antibodies.",
          "So blood with the A antigen (group A or AB) would clump; blood with no A antigen is safe.",
        ],
        answer: "Group B or group O. Group A cells carry the A antigen, which the patient's anti-A antibodies attack.",
      },
      practiceSet: [
        { prompt: "Which blood group is called the universal donor?", answer: "O" },
        { prompt: "Which antibody is present in the plasma of a person of group A?", answer: "Anti-B" },
        { prompt: "Who discovered the ABO blood groups?", answer: "Karl Landsteiner" },
        { prompt: "Who made the first vaccine, and against which disease?", answer: "Edward Jenner, against smallpox" },
      ],
      traps: [
        {
          title: "AO and BO are not blood groups",
          body: "AO and BO describe the **genes** a person carries. The four blood **groups** are **A, B, AB and O**.",
        },
        {
          title: "Donor O, recipient AB",
          body: "Group **O** cells have no A or B antigen, so they can be given to anyone. Group **AB** plasma has no anti-A or anti-B, so it can receive any group. Swapping the two is the usual mistake.",
        },
      ],
    },
  ],
};
