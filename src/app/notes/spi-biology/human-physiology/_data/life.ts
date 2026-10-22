import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_HP_LIFE_NOTE: SubtopicNote = {
  subtopicName: "Life Processes in Humans",
  title: "Life Processes in Humans",
  oneLineDefinition:
    "The body digests food, breathes to release energy from it, carries everything around in the blood and throws out waste as urine.",
  whyItMatters:
    "Eight questions in the bank, seven of them EASY: the acid of the stomach, the enzyme found in both saliva and pancreatic juice, where gases are exchanged, lime water and exhaled air, cramps after hard exercise, the element used in clotting, the four chambers of the heart and the path of urine. Each one is a single named fact.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spihpli-digestion",
      name: "Digestion: each organ and what it adds",
      intuition:
        "Food is broken down step by step as it moves along the gut. Each organ adds its own juice, and each juice has an enzyme that splits one kind of food. " +
        "Learn the organ, the juice and the food it works on as one row.",
      definition:
        "- **Mouth**: saliva has **salivary amylase**, which turns starch into sugar.\n" +
        "- **Stomach**: gastric glands make **hydrochloric acid** (kills germs, makes the medium acidic), **pepsin** (starts protein digestion) and mucus (protects the stomach wall).\n" +
        "- **Liver**: makes **bile**, which has no enzyme. It breaks fat into small droplets (emulsifies it) and makes the food alkaline.\n" +
        "- **Pancreas**: pancreatic juice has **trypsin** (protein), **lipase** (fat) and **amylase** (starch).\n" +
        "- **Small intestine**: digestion ends here and the villi absorb the food into the blood.\n" +
        "- **Large intestine**: absorbs water.",
      table: {
        columns: ["Organ", "Juice or enzyme", "What it acts on"],
        rows: [
          { cells: ["Mouth", "Salivary amylase", "Starch (a carbohydrate)"] },
          { cells: ["Stomach", "Hydrochloric acid", "Kills germs, makes the medium acidic for pepsin"] },
          { cells: ["Stomach", "Pepsin", "Protein"] },
          { cells: ["Liver", "Bile (no enzyme)", "Fat, broken into small droplets"] },
          { cells: ["Pancreas", "Trypsin", "Protein"] },
          { cells: ["Pancreas", "Lipase", "Fat"] },
          {
            cells: ["Pancreas", "Pancreatic amylase", "Starch (a carbohydrate)"],
            noteAmber: "Amylase is the one enzyme found in both saliva and pancreatic juice.",
          },
          { cells: ["Small intestine", "Villi", "Absorb digested food into the blood"] },
        ],
        caption: "Protein has two enzymes (pepsin, trypsin); starch has two places (mouth, pancreas).",
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong row: (a) pepsin, stomach, protein (b) lipase, pancreas, fat (c) bile, liver, starch (d) trypsin, pancreas, protein",
        steps: [
          "Pepsin in the stomach digests protein: right.",
          "Lipase from the pancreas digests fat: right. Trypsin from the pancreas digests protein: right.",
          "Bile is made in the liver, but it has no enzyme and works on fat, not starch.",
        ],
        answer: "(c) is wrong: bile acts on fat, not starch.",
      },
      practiceSet: [
        { prompt: "Which enzyme of the stomach starts the digestion of protein?", answer: "Pepsin" },
        { prompt: "Which organ makes bile?", answer: "The liver" },
        { prompt: "Which pancreatic enzyme digests fat?", answer: "Lipase" },
        { prompt: "In which part of the gut is most digested food absorbed into the blood?", answer: "The small intestine (through its villi)" },
        { prompt: "Which acid do the gastric glands of the stomach make?", answer: "Hydrochloric acid" },
      ],
      pyqExampleId: "8667a19b-eecd-4204-b139-8e26dc6ef639",
      traps: [
        {
          title: "Calling bile an enzyme",
          body:
            "Bile digests nothing on its own. It breaks fat into small droplets so that lipase can work on it. The enzyme that digests fat is lipase.",
        },
        {
          title: "Picking a weak acid for the stomach",
          body:
            "The stomach makes hydrochloric acid, a strong mineral acid. Acetic acid is in vinegar and lactic acid is in curd and tired muscles; neither comes from the stomach.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spihpli-breathing",
      name: "Breathing and respiration",
      intuition:
        "Breathing brings air to the lungs; respiration is what the cells do with the oxygen. Glucose is broken down to release energy, and carbon dioxide is the waste we breathe out. " +
        "When a muscle runs short of oxygen, it breaks glucose down another way and makes lactic acid.",
      definition:
        "- **Air path**: nose, throat (pharynx), voice box (larynx), windpipe (trachea), bronchi, bronchioles, **alveoli**.\n" +
        "- **Gas exchange** happens only in the **alveoli**: tiny air sacs with thin walls and many blood capillaries. Oxygen goes into the blood; carbon dioxide comes out.\n" +
        "- **Haemoglobin** in red blood cells carries the oxygen.\n" +
        "- **Aerobic respiration** (with oxygen): glucose breaks to pyruvate, then to **carbon dioxide + water + much energy**.\n" +
        "- **Anaerobic** in our **muscles** (short of oxygen): pyruvate becomes **lactic acid**, which causes **cramps**.\n" +
        "- **Anaerobic** in **yeast**: pyruvate becomes **ethanol + carbon dioxide**.\n" +
        "- **Lime water test**: exhaled air turns lime water **milky** because of its **carbon dioxide** (calcium carbonate forms).",
      table: {
        columns: ["Where", "Oxygen", "Pyruvate becomes"],
        rows: [
          { cells: ["Mitochondria of most cells", "Present", "Carbon dioxide and water, with much energy"] },
          {
            cells: ["Muscle cells during hard exercise", "Short", "Lactic acid, with less energy"],
            noteAmber: "Lactic acid building up in the muscle is what causes cramps.",
          },
          { cells: ["Yeast", "Absent", "Ethanol and carbon dioxide"] },
        ],
        caption: "Ethanol belongs to yeast; lactic acid belongs to our muscles.",
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong statement: (a) the trachea is also called the windpipe (b) haemoglobin carries oxygen (c) our muscles make ethanol when they run short of oxygen (d) aerobic respiration releases more energy than anaerobic",
        steps: [
          "The trachea is the windpipe, and aerobic respiration releases far more energy: both right.",
          "Haemoglobin carries oxygen: right.",
          "Muscles short of oxygen make lactic acid. Ethanol is made by yeast.",
        ],
        answer: "(c) is wrong: muscles make lactic acid, not ethanol.",
      },
      practiceSet: [
        { prompt: "Which gas in exhaled air turns lime water milky?", answer: "Carbon dioxide" },
        { prompt: "What does yeast make from pyruvate when there is no oxygen?", answer: "Ethanol and carbon dioxide" },
        { prompt: "Which pigment in red blood cells carries oxygen?", answer: "Haemoglobin" },
        { prompt: "What are the products of aerobic respiration of glucose?", answer: "Carbon dioxide, water and energy" },
        { prompt: "Name the tube that carries air from the larynx to the lungs.", answer: "The trachea (windpipe)" },
      ],
      pyqExampleId: "bd70922b-c22b-4468-8f24-50e81f1e95d6",
      traps: [
        {
          title: "Exchange in the windpipe or throat",
          body:
            "The trachea, larynx and throat only carry air. Oxygen and carbon dioxide cross into and out of the blood only in the alveoli of the lungs.",
        },
        {
          title: "Mixing up the two kinds of anaerobic respiration",
          body: "In our muscles pyruvate becomes lactic acid. Ethanol and carbon dioxide come from yeast, not from the human body.",
        },
        {
          title: "Water vapour as the lime water gas",
          body: "Exhaled air also has water vapour, but only carbon dioxide reacts with lime water to make the white calcium carbonate that turns it milky.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spihpli-blood",
      name: "Blood and the four chambers of the heart",
      intuition:
        "The heart is two pumps side by side. The right side takes used blood from the body and sends it to the lungs; the left side takes fresh blood from the lungs and sends it to the whole body. " +
        "Blood itself is a liquid, plasma, carrying three kinds of cells.",
      definition:
        "- **Right atrium**: receives deoxygenated blood from the body.\n" +
        "- **Right ventricle**: pumps it to the lungs through the **pulmonary artery**.\n" +
        "- **Left atrium**: receives oxygenated blood from the lungs through the **pulmonary veins**.\n" +
        "- **Left ventricle**: pumps it to the body through the **aorta**. Its wall is the thickest.\n" +
        "- **Arteries** carry blood away from the heart; **veins** bring it back and have valves.\n" +
        "- **Blood**: plasma, **red cells** (haemoglobin, which contains iron, carries oxygen), **white cells** (fight germs), **platelets** (clotting).\n" +
        "- **Calcium** is the element needed for **blood clotting**.",
      table: {
        columns: ["Chamber", "Receives blood from", "Sends blood to"],
        rows: [
          { cells: ["Right atrium", "The body (deoxygenated)", "Right ventricle"] },
          { cells: ["Right ventricle", "Right atrium", "The lungs, by the pulmonary artery"] },
          {
            cells: ["Left atrium", "The lungs, by the pulmonary veins (oxygenated)", "Left ventricle"],
            noteAmber: "The left atrium is the chamber that receives blood from the lungs.",
          },
          { cells: ["Left ventricle", "Left atrium", "The whole body, by the aorta"] },
        ],
        caption: "Right side: body to lungs. Left side: lungs to body.",
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong row: (a) platelets: clotting (b) white cells: fight germs (c) red cells: carry oxygen (d) right ventricle: pumps blood to the whole body",
        steps: [
          "Platelets help blood clot, white cells fight germs and red cells carry oxygen: all right.",
          "The right ventricle pumps blood to the lungs. The left ventricle pumps it to the whole body.",
        ],
        answer: "(d) is wrong: the right ventricle pumps blood to the lungs.",
      },
      practiceSet: [
        { prompt: "Which chamber of the heart pumps oxygenated blood to the whole body?", answer: "The left ventricle" },
        { prompt: "Which chamber receives deoxygenated blood from the body?", answer: "The right atrium" },
        { prompt: "Which blood cells help the blood to clot?", answer: "Platelets" },
        { prompt: "Which element is part of haemoglobin?", answer: "Iron" },
        { prompt: "Which kind of blood vessel has valves?", answer: "Veins" },
      ],
      pyqExampleId: "31e164bc-b3da-4c4a-aa5b-29090dfec269",
      traps: [
        {
          title: "Iron for clotting",
          body: "Iron is in haemoglobin and helps carry oxygen. The element that blood needs to clot is calcium.",
        },
        {
          title: "Thinking the right side of the heart sends blood to the body",
          body:
            "The right side handles deoxygenated blood and sends it to the lungs. Only the left ventricle pumps blood to the body, which is why its wall is the thickest.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spihpli-urine",
      name: "Excretion: the path of urine",
      intuition:
        "The kidneys clean the blood. Waste filtered out of the blood becomes urine, which flows down two tubes into a bag that stores it, and leaves by one tube.",
      definition:
        "- Each **kidney** has about a million **nephrons**, the tiny filters that make urine.\n" +
        "- **Ureters** (two): carry urine from the kidneys to the bladder.\n" +
        "- **Urinary bladder**: stores urine.\n" +
        "- **Urethra** (one): carries urine out of the body.\n" +
        "- Urine is mostly water, with urea and salts.",
      table: {
        columns: ["Step", "Organ", "Job"],
        rows: [
          { cells: ["1", "Kidneys", "Filter the blood and make urine (in the nephrons)"] },
          { cells: ["2", "Ureters", "Carry urine down to the bladder"] },
          { cells: ["3", "Urinary bladder", "Stores urine"] },
          {
            cells: ["4", "Urethra", "Carries urine out of the body"],
            noteAmber: "Ureter comes before the bladder; urethra comes after it.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which tube carries urine out of the body from the urinary bladder: the ureter or the urethra?",
        steps: ["Ureters join the kidneys to the bladder.", "The urethra leads from the bladder to the outside."],
        answer: "The urethra",
      },
      practiceSet: [
        { prompt: "What is the filtering unit of the kidney called?", answer: "The nephron" },
        { prompt: "Which organ stores urine?", answer: "The urinary bladder" },
        { prompt: "How many ureters does the human body have?", answer: "Two, one from each kidney" },
      ],
      pyqExampleId: "2f24b796-4463-40dd-8d83-275a0a6e6de2",
      traps: [
        {
          title: "Swapping ureter and urethra",
          body:
            "The two names sound alike. The ureters come first (kidney to bladder) and the urethra comes last (bladder to outside). A path that puts the urethra before the bladder is wrong.",
        },
      ],
    },
  ],
};
