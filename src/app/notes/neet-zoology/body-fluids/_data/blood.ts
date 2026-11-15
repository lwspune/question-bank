import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BF_BLOOD_NOTE: SubtopicNote = {
  subtopicName: "Blood",
  title: "Blood",
  oneLineDefinition:
    "What plasma and lymph carry, the three kinds of formed elements and their counts, the ABO and Rh blood groups, and the cascade that turns fibrinogen into a clot.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026. The blood groups were asked three times (NEET 2021, Re-NEET 2024 and NEET 2026) and clotting three times (NEET 2021, NEET 2022 and Re-NEET 2026). The white cell percentages were asked twice, once as a calculation in NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobf-formed-elements",
      name: "Plasma, lymph and the formed elements",
      intuition:
        "Blood is a fluid connective tissue. Spin it and it splits into a straw-coloured liquid, the plasma, and the cells floating in it, the formed elements. Red cells carry gases, white cells defend the body, and platelets help the blood clot. Some of the plasma leaks out of the capillaries to bathe the cells, and the lymph vessels carry it back.",
      definition:
        "Plasma:\n" +
        "- A straw-coloured, viscous fluid that makes up nearly **55 per cent** of the blood. It is **90 to 92 per cent water**, and **proteins make up 6 to 8 per cent** of it.\n" +
        "- The major proteins are **fibrinogen** (needed for clotting), **globulins** (mainly in the defence of the body) and **albumins** (help in osmotic balance).\n" +
        "- It also has small amounts of minerals such as Na⁺, Ca⁺⁺, Mg⁺⁺, HCO₃⁻ and Cl⁻, and glucose, amino acids and lipids in transit.\n" +
        "- Factors for clotting are present in plasma in an inactive form. **Plasma without the clotting factors is called serum.**\n\n" +
        "Formed elements (nearly 45 per cent of the blood):\n" +
        "- **Erythrocytes (RBCs)** are the most abundant cells: **5 to 5.5 million per mm³** in a healthy adult man. They are formed in the **red bone marrow** in adults, have **no nucleus** in most mammals and are **biconcave**. They carry the red, iron-containing **haemoglobin**, about **12 to 16 g per 100 mL** of blood. An RBC lives about **120 days** and is then destroyed in the **spleen, the graveyard of RBCs**.\n" +
        "- **Leucocytes (WBCs)** are colourless (no haemoglobin), nucleated and fairly few: **6000 to 8000 per mm³**. They are generally short-lived. **Granulocytes** are neutrophils, eosinophils and basophils; **agranulocytes** are lymphocytes and monocytes.\n" +
        "- **Platelets (thrombocytes)** are cell fragments made from **megakaryocytes** in the bone marrow. Blood has **1,50,000 to 3,50,000 per mm³**. They release factors needed for clotting, so a fall in their number causes clotting disorders and heavy blood loss.\n\n" +
        "Lymph (tissue fluid):\n" +
        "- As blood passes through the capillaries, some water and small water-soluble substances move out into the spaces between the cells. The large proteins and most formed elements stay in the vessels. This fluid is the **interstitial fluid or tissue fluid**, with the same minerals as plasma.\n" +
        "- Nutrients and gases pass between blood and cells through it. The **lymphatic system** collects it and drains it back into the major veins.\n" +
        "- Lymph is **colourless** and holds specialised **lymphocytes** for immune responses. It carries nutrients and hormones, and **fats are absorbed through the lymph in the lacteals** of the intestinal villi.",
      table: {
        columns: ["Formed element", "Share or count", "What it does"],
        rows: [
          { cells: ["Neutrophils", "60 to 65 per cent of WBCs, the most abundant", "Phagocytic: destroy foreign organisms that enter the body"] },
          { cells: ["Eosinophils", "2 to 3 per cent of WBCs", "Resist infections; linked with allergic reactions"] },
          {
            cells: ["Basophils", "0.5 to 1 per cent of WBCs, the least abundant", "Secrete histamine, serotonin and heparin; take part in inflammatory reactions"],
            noteAmber: "NEET 2023: basophils secrete histamine, serotonin and heparin and are involved in inflammation; they are granulocytes, not the most abundant WBC.",
          },
          { cells: ["Lymphocytes", "20 to 25 per cent of WBCs", "Two kinds, B and T; responsible for the immune responses of the body"] },
          { cells: ["Monocytes", "6 to 8 per cent of WBCs", "Phagocytic"] },
          { cells: ["Erythrocytes", "5 to 5.5 million per mm³", "Carry haemoglobin, which carries respiratory gases; live about 120 days"] },
          { cells: ["Platelets", "1,50,000 to 3,50,000 per mm³", "Release factors for clotting; made from megakaryocytes"] },
        ],
      },
      pyqExampleId: "7670502a-15f0-4c82-8a04-4d5856125134",
      selfCheckExample: {
        prompt: "Blood is left to clot in a tube and the clear fluid above the clot is drawn off. Is that fluid plasma or serum, and why?",
        steps: [
          "Plasma carries the clotting factors in an inactive form.",
          "During clotting those factors are used up in making the clot.",
          "Plasma without the clotting factors is called serum.",
        ],
        answer: "Serum, because the clotting factors have gone into the clot.",
      },
      practiceSet: [
        { prompt: "Which plasma protein helps in osmotic balance?", answer: "Albumin" },
        { prompt: "How many RBCs does a healthy adult man have per mm³ of blood?", answer: "5 to 5.5 million" },
        { prompt: "Which organ is called the graveyard of RBCs?", answer: "The spleen" },
        { prompt: "From which cells of the bone marrow are platelets produced?", answer: "Megakaryocytes" },
        { prompt: "Which two kinds of white blood cell are phagocytic?", answer: "Neutrophils and monocytes" },
        { prompt: "Through which vessels of the intestinal villi are fats absorbed?", answer: "The lacteals, into the lymph" },
      ],
      traps: [
        {
          title: "Neutrophils are the most abundant WBC, basophils the least",
          body: "**Neutrophils** make up 60 to 65 per cent of the white cells; **basophils** only 0.5 to 1 per cent. A statement that basophils are the most abundant WBC is false.",
        },
        {
          title: "Basophils are granulocytes",
          body: "The granulocytes are **neutrophils, eosinophils and basophils**. Only **lymphocytes and monocytes** are agranulocytes.",
        },
        {
          title: "Serum is plasma without clotting factors",
          body: "**Serum** is what is left of plasma once the clotting factors are removed. It is not plasma without cells: plasma already has no formed elements.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nzobf-wbc-count",
      name: "Working out a white cell count from its percentage",
      intuition:
        "NCERT gives each kind of white cell as a share of the total. If you know the total WBC count, each kind is just that share of it. Work out the low end of the range and the high end separately.",
      definition:
        "To find how many of one kind of WBC a sample holds:\n" +
        "- Take the **total WBC count** (normally 6000 to 8000 per mm³).\n" +
        "- Multiply it by the NCERT percentage of that kind, once for the lower figure and once for the upper figure.\n" +
        "- The shares are: **neutrophils 60 to 65**, **lymphocytes 20 to 25**, **monocytes 6 to 8**, **eosinophils 2 to 3** and **basophils 0.5 to 1** per cent.",
      formula: {
        label: "Count of one kind of WBC",
        latex: "N = T \\times \\dfrac{p}{100}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of that kind of white cell per mm³" },
          { symbol: "\\(T\\)", meaning: "total WBC count per mm³" },
          { symbol: "\\(p\\)", meaning: "the NCERT percentage of that kind among all WBCs" },
        ],
      },
      authoredExample: {
        prompt: "A blood sample has 6000 WBCs per mm³. About how many neutrophils and how many monocytes does it hold?",
        steps: [
          "Neutrophils are 60 to 65 per cent: \\(6000 \\times 0.60 = 3600\\) and \\(6000 \\times 0.65 = 3900\\).",
          "Monocytes are 6 to 8 per cent: \\(6000 \\times 0.06 = 360\\) and \\(6000 \\times 0.08 = 480\\).",
        ],
        answer: "About 3600 to 3900 neutrophils and 360 to 480 monocytes per mm³.",
      },
      pyqExampleId: "3d47e961-bf52-44c2-8ae8-d0fbdb299212",
      selfCheckExample: {
        prompt: "A sample has 7000 WBCs per mm³. About how many basophils does it have?",
        steps: [
          "Basophils are 0.5 to 1 per cent of the WBCs.",
          "\\(7000 \\times 0.005 = 35\\) and \\(7000 \\times 0.01 = 70\\).",
        ],
        answer: "About 35 to 70 basophils per mm³.",
      },
      practiceSet: [
        { prompt: "A sample has 6000 WBCs per mm³. About how many lymphocytes does it hold?", answer: "1200 to 1500 per mm³", method: "20 to 25 per cent of 6000" },
        { prompt: "A sample has 8000 WBCs per mm³. About how many neutrophils does it hold?", answer: "4800 to 5200 per mm³", method: "60 to 65 per cent of 8000" },
        { prompt: "A sample has 7500 WBCs per mm³. About how many monocytes does it hold?", answer: "450 to 600 per mm³", method: "6 to 8 per cent of 7500" },
        { prompt: "A sample has 9000 WBCs per mm³. Which kind of white cell would number about 1800 to 2250 per mm³ in it?", answer: "Lymphocytes", method: "1800 and 2250 are 20 and 25 per cent of 9000" },
      ],
      traps: [
        {
          title: "Eosinophils are 2 to 3 per cent, monocytes 6 to 8",
          body: "The two small shares are easy to swap. **Eosinophils are 2 to 3 per cent** of WBCs and **monocytes 6 to 8 per cent**; basophils are smaller still at 0.5 to 1 per cent.",
        },
        {
          title: "The percentages are of WBCs, not of all blood cells",
          body: "Each share is a part of the **white cell count** (6000 to 8000 per mm³), never of the RBC count. Multiply by the WBC total.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobf-blood-groups",
      name: "ABO and Rh blood groups",
      intuition:
        "An RBC can carry two sugar-like markers on its surface, antigen A and antigen B. The plasma carries antibodies against whichever marker the person does not have. Donor blood is safe only if the receiver's plasma has no antibody against the donor's RBC antigens. The Rh antigen is a second, separate marker that must also match.",
      definition:
        "ABO grouping:\n" +
        "- It is based on the presence or absence of two surface antigens on the RBCs, **A and B**.\n" +
        "- The plasma of different people has two natural antibodies, proteins made in response to antigens, **anti-A and anti-B**.\n" +
        "- Group **O** has neither antigen, so it can donate to everyone: the **universal donor**. Group **AB** has no anti-A or anti-B antibody in its plasma, so it can receive from everyone: the **universal recipient**.\n\n" +
        "Rh grouping:\n" +
        "- The **Rh antigen** is similar to one found in **Rhesus monkeys**. It is seen on the RBC surface of the majority, **nearly 80 per cent**, of humans: they are **Rh positive (Rh+ve)**. Those without it are **Rh negative (Rh-ve)**.\n" +
        "- An Rh-ve person exposed to Rh+ve blood forms specific antibodies against the Rh antigen. So **the Rh group must also be matched** before a transfusion.\n" +
        "- **Erythroblastosis foetalis:** a special case of Rh incompatibility between an **Rh-ve pregnant mother** and an **Rh+ve foetus**. In the first pregnancy the Rh antigens of the foetus do not reach the mother, because the two bloods are kept apart by the placenta. During the delivery of the **first child**, the mother may be exposed to small amounts of the foetal blood and starts making antibodies against Rh.\n" +
        "- In a later pregnancy, these antibodies can leak into the blood of an Rh+ve foetus and destroy its RBCs. This can be fatal, or cause severe anaemia and jaundice to the baby.\n" +
        "- It is avoided by giving **anti-Rh antibodies to the mother immediately after the delivery of the first child**.",
      table: {
        columns: ["Blood group", "Antigen on RBCs", "Antibody in plasma", "Can receive from"],
        rows: [
          { cells: ["A", "A", "anti-B", "A and O"] },
          { cells: ["B", "B", "anti-A", "B and O"] },
          {
            cells: ["AB", "A and B", "None", "AB, A, B and O"],
            noteAmber: "NEET 2021: AB is the universal recipient because its plasma has no anti-A or anti-B antibodies.",
            pyqExampleId: "67ec86ec-c258-4afc-a8e9-837af521d51c",
          },
          { cells: ["O", "None", "anti-A and anti-B", "O only"] },
          {
            cells: ["Rh+ve or Rh-ve", "Rh antigen present in about 80 per cent", "Anti-Rh forms only after an Rh-ve person meets Rh+ve blood", "An Rh-ve person only from Rh-ve blood"],
            noteAmber: "NEET 2026: erythroblastosis foetalis is an Rh-ve mother with an Rh+ve foetus, and anti-Rh antibodies are given after the first delivery.",
            pyqExampleId: "be386be6-49b5-49a1-a54c-372b97a01fe8",
          },
        ],
      },
      pyqExampleId: "96e5d68b-5df7-41bd-ae24-643496844487",
      selfCheckExample: {
        prompt: "Why can a person of blood group O receive blood only from another group O donor?",
        steps: [
          "Group O plasma carries both antibodies, anti-A and anti-B.",
          "RBCs of group A, B or AB carry antigen A, antigen B or both, which these antibodies would attack.",
          "Only group O RBCs carry neither antigen.",
        ],
        answer: "Its plasma has both anti-A and anti-B, so only RBCs with no A or B antigen, group O, are safe.",
      },
      practiceSet: [
        { prompt: "Which blood group is called the universal donor?", answer: "Group O" },
        { prompt: "Which antibody does the plasma of a group A person carry?", answer: "Anti-B" },
        { prompt: "The Rh antigen is similar to an antigen found in which animal?", answer: "Rhesus monkeys" },
        { prompt: "About what share of humans are Rh positive?", answer: "Nearly 80 per cent" },
        { prompt: "Name two problems erythroblastosis foetalis can cause in a baby.", answer: "Severe anaemia and jaundice (it can also be fatal)" },
      ],
      traps: [
        {
          title: "AB lacks antibodies, not antigens",
          body: "**AB** RBCs carry **both** antigens A and B. It is the universal recipient because its **plasma has no anti-A or anti-B antibody**. Group O is the one with no antigens.",
        },
        {
          title: "The mother is Rh-ve and the foetus Rh+ve",
          body: "Erythroblastosis foetalis needs an **Rh-ve mother** carrying an **Rh+ve foetus**. The reverse pairing does not cause it.",
        },
        {
          title: "Anti-Rh is given after the first delivery",
          body: "The mother is given **anti-Rh antibodies immediately after the delivery of the first child**, before she makes her own. Waiting until after the second child is too late.",
        },
        {
          title: "The first child is usually safe",
          body: "In the **first** pregnancy the placenta keeps the two bloods apart. The mother makes antibodies after exposure at that delivery, so it is a **later** Rh+ve foetus that is harmed.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobf-coagulation",
      name: "Coagulation of blood",
      intuition:
        "A cut must be sealed fast. The damaged tissue and the platelets set off a chain of enzyme reactions, each step switching on the next. The last enzyme, thrombin, turns a soluble plasma protein, fibrinogen, into long fibrin threads. The threads form a net that traps blood cells and plugs the wound.",
      definition:
        "Blood exhibits **coagulation or clotting in response to an injury or trauma**, to prevent excessive loss of blood.\n" +
        "- The dark reddish brown scum formed at a cut is a **clot or coagulum**, formed mainly of a **network of threads called fibrins**, in which dead and damaged formed elements of blood are trapped.\n" +
        "- **Fibrins are formed by the conversion of inactive fibrinogens** by the enzyme **thrombin**.\n" +
        "- **Thrombins are formed from another inactive substance, prothrombin**. An enzyme complex, **thrombokinase**, is needed for this step.\n" +
        "- Thrombokinase is formed by a series of linked enzymic reactions (a **cascade process**) involving a number of factors present in the plasma in an inactive state.\n" +
        "- An injury stimulates the **platelets** to release certain factors which activate the mechanism. Certain factors released by the **tissues at the site of injury** can also start coagulation.\n" +
        "- **Calcium ions** play a very important role in clotting.",
      table: {
        columns: ["Step", "Inactive form", "Active form", "Made active by"],
        rows: [
          { cells: ["1", "Clotting factors in plasma", "Thrombokinase", "A cascade started by factors from platelets and injured tissue"] },
          { cells: ["2", "Prothrombin", "Thrombin", "Thrombokinase"] },
          {
            cells: ["3", "Fibrinogen", "Fibrin threads", "Thrombin"],
            noteAmber: "Re-NEET 2026: fibrin is made from fibrinogen; the reverse statement was the incorrect one.",
            pyqExampleId: "2df9cd1c-edd8-4941-b68c-87c41fc3be7c",
          },
          {
            cells: ["4", "Fibrin threads with trapped formed elements", "Clot or coagulum", "Network of fibrins"],
            noteAmber: "NEET 2022: the coagulum is a network of fibrins, not thrombins; the spleen is the graveyard of erythrocytes.",
            pyqExampleId: "f400b138-7074-44f0-ac11-f72edec53909",
          },
        ],
      },
      pyqExampleId: "441ff9b1-2ab7-471a-8912-5c011af1ba07",
      selfCheckExample: {
        prompt: "Which enzyme complex converts prothrombin into thrombin during clotting?",
        steps: [
          "Thrombin is formed from the inactive prothrombin.",
          "NCERT names the enzyme complex needed for this step as thrombokinase.",
        ],
        answer: "Thrombokinase.",
      },
      practiceSet: [
        { prompt: "What is the clot or coagulum mainly made of?", answer: "A network of fibrin threads, with dead and damaged formed elements trapped in it" },
        { prompt: "From which inactive substance is thrombin formed?", answer: "Prothrombin" },
        { prompt: "Which ions play a very important role in blood clotting?", answer: "Calcium ions" },
        { prompt: "Which blood cells release factors that start clotting at an injury?", answer: "Platelets (thrombocytes)" },
        { prompt: "What is the name for a series of linked enzymic reactions, each step activating the next, as in clotting?", answer: "A cascade process" },
      ],
      traps: [
        {
          title: "The clot is fibrin, not thrombin",
          body: "**Thrombin** is the enzyme; **fibrin** is the thread that forms the net of a clot. 'A network of threads called thrombins' is false.",
        },
        {
          title: "Thrombokinase acts on prothrombin, not fibrinogen",
          body: "**Thrombokinase** turns **prothrombin into thrombin**. It is **thrombin** that turns **fibrinogen into fibrin**.",
        },
        {
          title: "Fibrinogen comes first",
          body: "**Fibrinogen** is the inactive plasma protein and **fibrin** is the product. Fibrinogen is never made from fibrin.",
        },
      ],
    },
  ],
};
