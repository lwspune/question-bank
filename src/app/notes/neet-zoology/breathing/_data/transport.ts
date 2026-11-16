import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BR_TRANSPORT_NOTE: SubtopicNote = {
  subtopicName: "Exchange and Transport of Gases",
  title: "Exchange and Transport of Gases",
  oneLineDefinition:
    "How O₂ and CO₂ diffuse between the alveoli, the blood and the tissues by partial pressure, how the blood carries each gas, how the brain controls breathing, and the respiratory disorders NCERT names.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2025, three of them in NEET 2021. The conditions that favour the formation of oxyhaemoglobin in the alveoli were asked twice, in NEET 2021 and NEET 2024.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobr-exchange",
      name: "Exchange of gases and partial pressures",
      intuition:
        "A gas always moves from where its pressure is high to where it is low, the way water runs downhill. In the alveoli oxygen is high and carbon dioxide is low; in the tissues it is the other way round. So oxygen runs from the alveoli into the blood and on to the tissues, and carbon dioxide runs back.",
      definition:
        "- **Alveoli** are the primary sites of exchange of gases. Gases are also exchanged between the **blood and the tissues**.\n" +
        "- The exchange is by **simple diffusion**, mainly based on the **pressure or concentration gradient**. The **solubility** of the gases and the **thickness of the membranes** also affect the rate of diffusion.\n" +
        "- The pressure contributed by one gas in a mixture is its **partial pressure**: \\(p\\text{O}_2\\) for oxygen and \\(p\\text{CO}_2\\) for carbon dioxide.\n" +
        "- The solubility of **CO₂ is 20 to 25 times higher than that of O₂**, so much more CO₂ can diffuse through the membrane for each unit difference in partial pressure.\n" +
        "- The **diffusion membrane** has **three major layers**: the thin squamous **epithelium of the alveoli**, the **endothelium of the alveolar capillaries**, and the **basement substance** between them. Its total thickness is much less than a millimetre.",
      table: {
        columns: ["Where", "pO₂ (mm Hg)", "pCO₂ (mm Hg)"],
        rows: [
          { cells: ["Atmospheric air", "159", "0.3"] },
          {
            cells: ["Alveoli", "104", "40"],
            noteAmber: "NEET 2021: the alveolar values asked were pO₂ 104 and pCO₂ 40.",
          },
          { cells: ["Deoxygenated blood", "40", "45"] },
          { cells: ["Oxygenated blood", "95", "40"] },
          { cells: ["Tissues", "40", "45"] },
        ],
        caption: "Partial pressures of oxygen and carbon dioxide at different parts involved in diffusion, compared with the atmosphere (NCERT).",
      },
      pyqExampleId: "16daaa7d-3e7c-4fce-b794-7eb167ec3fb5",
      selfCheckExample: {
        prompt: "Deoxygenated blood reaches the alveoli. In which direction does each gas diffuse, and why?",
        steps: [
          "Oxygen: alveolar pO₂ is 104 mm Hg and the blood's is 40 mm Hg, so O₂ diffuses from the alveoli into the blood.",
          "Carbon dioxide: the blood's pCO₂ is 45 mm Hg and the alveolar pCO₂ is 40 mm Hg, so CO₂ diffuses from the blood into the alveoli.",
        ],
        answer: "O₂ moves into the blood and CO₂ moves into the alveoli, each down its own partial pressure gradient.",
      },
      practiceSet: [
        { prompt: "Name the three layers of the diffusion membrane between an alveolus and the blood.", answer: "The squamous epithelium of the alveoli, the endothelium of the alveolar capillaries, and the basement substance between them" },
        { prompt: "How many times more soluble is CO₂ than O₂?", answer: "20 to 25 times" },
        { prompt: "Which two places in the body share a pO₂ of 40 mm Hg and a pCO₂ of 45 mm Hg?", answer: "Deoxygenated blood and the tissues" },
        { prompt: "Besides the partial pressure gradient, which two factors affect the rate of diffusion of a gas?", answer: "The solubility of the gas and the thickness of the membrane" },
      ],
      traps: [
        {
          title: "Alveolar pO₂ is 104, not 159",
          body: "**159 mm Hg** is the pO₂ of **atmospheric air**. In the **alveoli** it is **104 mm Hg**, with a pCO₂ of **40 mm Hg**.",
        },
        {
          title: "Oxygenated blood has a pO₂ of 95",
          body: "Blood leaving the lungs has **pO₂ 95** and **pCO₂ 40** mm Hg. Its pCO₂ matches the alveoli, but its pO₂ is lower than the alveolar 104.",
        },
        {
          title: "A small CO₂ gradient is enough",
          body: "The pCO₂ gradient (45 to 40 mm Hg) is much smaller than the pO₂ gradient, but CO₂ is **20 to 25 times more soluble**, so it still diffuses readily.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobr-oxygen",
      name: "Transport of oxygen",
      intuition:
        "Haemoglobin is like a bus that picks oxygen up where it is plentiful and drops it where it is scarce. In the lungs, plenty of oxygen and cool, less acidic blood make it pick oxygen up. In busy tissues, little oxygen, more carbon dioxide, more acid and more heat make it let oxygen go.",
      definition:
        "- About **97 per cent of O₂** is transported by the **RBCs**; the remaining **3 per cent** is carried **dissolved in the plasma**.\n" +
        "- **Haemoglobin** is a red-coloured, **iron-containing pigment** in the RBCs. O₂ binds it reversibly to form **oxyhaemoglobin**. Each haemoglobin molecule can carry a **maximum of four molecules of O₂**.\n" +
        "- Binding of O₂ with haemoglobin is primarily related to the **partial pressure of O₂**. The **partial pressure of CO₂, the hydrogen ion concentration and the temperature** can also interfere with it.\n" +
        "- A curve of percentage saturation of haemoglobin against pO₂ is **sigmoid**: the **oxygen dissociation curve**.\n" +
        "- In the **alveoli**: high pO₂, low pCO₂, lesser H⁺ concentration and lower temperature favour the **formation** of oxyhaemoglobin.\n" +
        "- In the **tissues**: low pO₂, high pCO₂, high H⁺ concentration and higher temperature favour the **dissociation** of oxygen from oxyhaemoglobin.\n" +
        "- Under normal physiological conditions, **every 100 mL of oxygenated blood delivers around 5 mL of O₂** to the tissues.",
      table: {
        columns: ["Factor", "In the alveoli (O₂ binds)", "In the tissues (O₂ is released)"],
        rows: [
          { cells: ["pO₂", "High", "Low"] },
          { cells: ["pCO₂", "Low", "High"] },
          {
            cells: ["H⁺ concentration", "Less", "More"],
            noteAmber: "NEET 2024: high pO₂ with lesser H⁺ concentration was the favourable pair for oxyhaemoglobin in the alveoli.",
            pyqExampleId: "eb795fe2-bfbb-4be1-a21a-b616aadae6a3",
          },
          { cells: ["Temperature", "Lower", "Higher"] },
        ],
      },
      pyqExampleId: "ac8dc072-9971-49fd-908e-24d4a1cddff9",
      selfCheckExample: {
        prompt: "A hard-working muscle becomes warmer and makes more CO₂ and H⁺. Does this help haemoglobin hold its oxygen or give it up?",
        steps: [
          "High pCO₂, high H⁺ concentration and higher temperature are the tissue conditions.",
          "NCERT says these favour the dissociation of oxygen from oxyhaemoglobin.",
        ],
        answer: "It helps haemoglobin give up its oxygen to the muscle.",
      },
      practiceSet: [
        { prompt: "What percentage of oxygen is carried by the RBCs, and how is the rest carried?", answer: "About 97 per cent; the remaining 3 per cent is dissolved in the plasma" },
        { prompt: "What is the maximum number of O₂ molecules one haemoglobin molecule can carry?", answer: "Four" },
        { prompt: "What is the shape of the oxygen dissociation curve?", answer: "Sigmoid" },
        { prompt: "Name the red pigment in RBCs that carries oxygen, and the metal it contains.", answer: "Haemoglobin; iron" },
      ],
      traps: [
        {
          title: "Low temperature and less H⁺ favour binding",
          body: "Oxyhaemoglobin forms in the **alveoli**, where pO₂ is **high**, pCO₂ is **low**, H⁺ is **less** and the temperature is **lower**. Any option pairing high pO₂ with high pCO₂, more H⁺ or higher temperature is wrong.",
        },
        {
          title: "5 mL of O₂, 4 mL of CO₂",
          body: "Every 100 mL of **oxygenated** blood delivers about **5 mL of O₂** to the tissues; every 100 mL of **deoxygenated** blood delivers about **4 mL of CO₂** to the alveoli. Do not swap the two figures.",
        },
        {
          title: "Most oxygen rides on haemoglobin",
          body: "About **97 per cent** of O₂ is carried by the **RBCs** as oxyhaemoglobin; only **3 per cent** is dissolved in the plasma.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobr-co2",
      name: "Transport of carbon dioxide",
      intuition:
        "Carbon dioxide travels in three ways. Most of it is turned into bicarbonate, a fifth or so rides on haemoglobin, and a little simply dissolves. In the tissues the blood loads it up; in the lungs every step runs backwards and the CO₂ is set free to be breathed out.",
      definition:
        "- Nearly **20 to 25 per cent of CO₂** is transported by the RBCs as **carbamino-haemoglobin**, about **70 per cent** as **bicarbonate**, and about **7 per cent dissolved in the plasma**.\n" +
        "- The binding of CO₂ with haemoglobin is related to the **partial pressure of CO₂**, and **pO₂** is a major factor that can affect it. Where **pCO₂ is high and pO₂ is low**, as in the **tissues**, more CO₂ binds. Where **pCO₂ is low and pO₂ is high**, as in the **alveoli**, CO₂ dissociates from carbamino-haemoglobin.\n" +
        "- RBCs contain a very high concentration of the enzyme **carbonic anhydrase**; minute quantities are present in the plasma too. It speeds up the reaction in both directions: \\(\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{HCO}_3^- + \\text{H}^+\\).\n" +
        "- At the **tissues**, where pCO₂ is high, CO₂ diffuses into the blood and forms HCO₃⁻ and H⁺. At the **alveoli**, where pCO₂ is low, the reaction runs the other way and releases CO₂ and H₂O.\n" +
        "- **Every 100 mL of deoxygenated blood delivers approximately 4 mL of CO₂** to the alveoli.",
      table: {
        columns: ["Form", "Share of CO₂", "How it is carried"],
        rows: [
          { cells: ["Bicarbonate", "About 70 per cent", "Carbonic anhydrase turns CO₂ and water into carbonic acid, which splits into bicarbonate and H⁺"] },
          {
            cells: ["Carbamino-haemoglobin", "20 to 25 per cent", "CO₂ binds haemoglobin where pCO₂ is high and pO₂ is low, as in the tissues"],
            noteAmber: "Re-NEET 2024: both the 20 to 25 per cent figure and its link to high pCO₂ and low pO₂ in the tissues were true, the reason explaining the assertion.",
          },
          { cells: ["Dissolved in plasma", "About 7 per cent", "CO₂ dissolves directly in the plasma"] },
        ],
      },
      pyqExampleId: "5223438b-74b3-4e64-8d9c-5e832515312c",
      selfCheckExample: {
        prompt: "Where in the blood is carbonic anhydrase present in very high concentration, and which reaction does it speed up?",
        steps: [
          "NCERT says the RBCs hold a very high concentration of carbonic anhydrase, and the plasma only minute quantities.",
          "It speeds up \\(\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{HCO}_3^- + \\text{H}^+\\) in both directions.",
        ],
        answer: "In the RBCs; it speeds up the conversion of CO₂ and water into carbonic acid and bicarbonate, and back.",
      },
      practiceSet: [
        { prompt: "What share of carbon dioxide is carried in the blood as bicarbonate?", answer: "About 70 per cent" },
        { prompt: "About how much CO₂ does every 100 mL of deoxygenated blood deliver to the alveoli?", answer: "About 4 mL" },
        { prompt: "What happens to carbamino-haemoglobin in the alveoli, where pCO₂ is low and pO₂ is high?", answer: "CO₂ dissociates from it and is released" },
        { prompt: "What share of carbon dioxide is carried dissolved in the plasma?", answer: "About 7 per cent" },
      ],
      traps: [
        {
          title: "Bicarbonate, not haemoglobin, carries most CO₂",
          body: "About **70 per cent** of CO₂ travels as **bicarbonate**. Carbamino-haemoglobin carries only **20 to 25 per cent**, and the plasma dissolves about **7 per cent**.",
        },
        {
          title: "Carbonic anhydrase works both ways",
          body: "At the **tissues** carbonic anhydrase turns CO₂ into **bicarbonate**; at the **alveoli** the same enzyme runs the reaction backwards and **releases CO₂**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobr-control",
      name: "Regulation of breathing and respiratory disorders",
      intuition:
        "Breathing runs on autopilot from the brain stem. The body watches the carbon dioxide and acid in the blood, not the oxygen, and speeds breathing up when they rise. When the airways or the alveoli are damaged, by allergy, smoke or dust, breathing becomes hard.",
      definition:
        "Regulation:\n" +
        "- A specialised centre in the **medulla** region of the brain, the **respiratory rhythm centre**, is primarily responsible for regulating breathing.\n" +
        "- The **pneumotaxic centre** in the **pons** can moderate the rhythm centre: its signal can **reduce the duration of inspiration** and so alter the respiratory rate.\n" +
        "- A **chemosensitive area** next to the rhythm centre is highly sensitive to **CO₂ and hydrogen ions**. A rise in them activates it, and it signals the rhythm centre to adjust breathing.\n" +
        "- Receptors on the **aortic arch and the carotid artery** also recognise changes in CO₂ and H⁺ concentration.\n" +
        "- The role of **oxygen** in regulating the respiratory rhythm is **quite insignificant**.\n\n" +
        "Disorders:\n" +
        "- **Asthma:** difficulty in breathing with **wheezing**, due to **inflammation of the bronchi and bronchioles**.\n" +
        "- **Emphysema:** a **chronic** disorder in which the **alveolar walls are damaged**, so the **respiratory surface is decreased**. **Cigarette smoking** is one of its major causes.\n" +
        "- **Occupational respiratory disorders:** in industries with grinding or stone-breaking, so much dust is made that the body's defences cannot cope. Long exposure causes **inflammation leading to fibrosis** (growth of fibrous tissue) and serious lung damage. Workers should wear **protective masks**.\n" +
        "- **Altitude sickness:** at high altitude the **low atmospheric pressure** means the body does **not get enough oxygen**, giving nausea, fatigue and heart palpitations.\n" +
        "- Match questions also mix in disorders taught in other chapters: **angina pectoris** is acute chest pain when not enough oxygen reaches the heart muscle (Body Fluids and Circulation), **glomerulonephritis** is inflammation of the glomeruli of the kidney (Excretory Products), and **tetany** is rapid spasms in muscle due to low Ca²⁺ in body fluid (Locomotion and Movement).",
      table: {
        columns: ["Name", "What NCERT says"],
        rows: [
          { cells: ["Respiratory rhythm centre", "In the medulla; primarily responsible for regulating breathing"] },
          { cells: ["Pneumotaxic centre", "In the pons; can reduce the duration of inspiration and so alter the respiratory rate"] },
          { cells: ["Chemosensitive area", "Next to the rhythm centre; highly sensitive to CO₂ and H⁺, and signals the rhythm centre to adjust"] },
          { cells: ["Aortic arch and carotid artery receptors", "Also recognise changes in CO₂ and H⁺ concentration"] },
          { cells: ["Asthma", "Difficulty in breathing with wheezing, due to inflammation of the bronchi and bronchioles"] },
          {
            cells: ["Emphysema", "A chronic disorder: alveolar walls damaged, respiratory surface decreased; cigarette smoking is a major cause"],
            noteAmber: "NEET 2025: matched with damaged alveolar walls and decreased respiratory surface, beside angina pectoris, glomerulonephritis and tetany.",
          },
          { cells: ["Occupational respiratory disorders", "Long exposure to dust causes inflammation leading to fibrosis and serious lung damage"] },
          {
            cells: ["Altitude sickness", "Low atmospheric pressure at high altitude, so the body does not get enough oxygen"],
            noteAmber: "NEET 2021: asked as an assertion and reason; the low pressure and too little oxygen correctly explain the breathing difficulty.",
            pyqExampleId: "61ab85a5-edd9-47ca-ba28-22ff5ab53e58",
          },
        ],
      },
      pyqExampleId: "50f12e7b-2f96-4bc0-94b1-34e684079cce",
      selfCheckExample: {
        prompt: "The CO₂ level in the blood rises during exercise. Which area of the brain senses this, and which centre does it signal?",
        steps: [
          "The chemosensitive area next to the respiratory rhythm centre is highly sensitive to CO₂ and H⁺.",
          "When activated, it signals the respiratory rhythm centre in the medulla to adjust breathing.",
        ],
        answer: "The chemosensitive area senses it and signals the respiratory rhythm centre in the medulla.",
      },
      practiceSet: [
        { prompt: "Where is the pneumotaxic centre, and how can it change breathing?", answer: "In the pons; it can reduce the duration of inspiration and so alter the respiratory rate" },
        { prompt: "What causes the wheezing in asthma?", answer: "Inflammation of the bronchi and bronchioles" },
        { prompt: "Why do long-term workers in stone-breaking industries suffer lung fibrosis?", answer: "Long exposure to the dust causes inflammation, which leads to fibrosis and serious lung damage" },
        { prompt: "How important is oxygen in regulating the respiratory rhythm?", answer: "Quite insignificant; CO₂ and H⁺ are what the body senses" },
      ],
      traps: [
        {
          title: "Oxygen hardly regulates breathing",
          body: "The chemosensitive area and the aortic and carotid receptors respond to **CO₂ and H⁺**. NCERT calls the role of **oxygen** in regulating the respiratory rhythm **quite insignificant**.",
        },
        {
          title: "Rhythm centre in the medulla, pneumotaxic centre in the pons",
          body: "The **respiratory rhythm centre** is in the **medulla**; the **pneumotaxic centre**, which shortens inspiration, is in the **pons**.",
        },
        {
          title: "Emphysema damages alveoli, asthma inflames airways",
          body: "**Emphysema** damages the **alveolar walls** and decreases the respiratory surface. **Asthma** is inflammation of the **bronchi and bronchioles** with wheezing.",
        },
      ],
    },
  ],
};
