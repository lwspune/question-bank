import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BHP_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Organ Systems of the Body",
  title: "Organ Systems of the Body",
  oneLineDefinition:
    "Digestion with the liver, bile and enzymes; the nerves, brain and hormone disorders; and the heart, kidney, connective tissues and antibodies.",
  whyItMatters:
    "Fifteen questions in the bank: seven from the 2023 shifts, three from the 2024 shifts and five from the 2025 shifts. The 2025 ones are three-statement questions, so learn the reason behind each fact, not only the fact.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbhpsy-digestion",
      name: "Digestion, the liver and enzymes",
      intuition:
        "Food moves from the acid of the stomach to the small intestine, where bile neutralises it and enzymes finish the job. The liver makes the bile.",
      definition:
        "The canal:\n" +
        "- The **small intestine** is the **longest** part, about 6 to 7 m in an adult.\n" +
        "- The stomach is **acidic** (hydrochloric acid, pepsin).\n\n" +
        "The liver:\n" +
        "- The **largest gland**, reddish brown, in the upper abdomen on the **right** side.\n" +
        "- It makes **bile**, stored in the **gall bladder**. Bile is **alkaline**: it neutralises acidic food from the stomach and **emulsifies fats**.\n" +
        "- **Kupffer cells** are the liver's macrophages.\n\n" +
        "Enzymes:\n" +
        "- **Lipase** breaks emulsified fats into fatty acids and glycerol.\n" +
        "- Enzymes **lower** the activation energy, are **specific** because of the active site, and depend on **pH and temperature**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Liver lies", "Upper right abdomen"], pyqExampleId: "0eecd78c-ed62-4e0f-bbed-7f744a4fccea" },
          { cells: ["Liver macrophages", "Kupffer cells"], pyqExampleId: "01f512f1-93d4-4f92-bdbc-6259dcb6ab23" },
          { cells: ["Makes stomach food alkaline", "Bile"], pyqExampleId: "7b6ca764-2d5d-4694-831c-da14dd32d726" },
          { cells: ["Lipase digests", "Emulsified fats"], pyqExampleId: "1ee7cba4-0e5e-43e9-97a1-b286590f0fc1" },
          { cells: ["Enzymes and activation energy", "Lower it"], pyqExampleId: "9aa9489c-e460-4845-b38c-9907cdafa02e" },
        ],
      },
      pyqExampleId: "e33e7116-d444-49b4-902d-f0722f9c20d0",
      selfCheckExample: {
        prompt: "Bile contains no digestive enzymes. Give two things it still does for digestion.",
        steps: ["Bile is alkaline, so it neutralises the acidic food from the stomach.", "It breaks fat into small droplets (emulsifies it) for lipase to act on."],
        answer: "It neutralises stomach acid and emulsifies fats.",
      },
      practiceSet: [
        { prompt: "Which is the largest gland in the body?", answer: "The liver" },
        { prompt: "Where is bile stored?", answer: "In the gall bladder" },
        { prompt: "Do enzymes raise or lower activation energy?", answer: "Lower it" },
      ],
      traps: [
        {
          title: "The liver is on the right",
          body: "The liver sits in the upper abdomen on the **right** side. A statement placing it on the left is the false one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbhpsy-control",
      name: "Nerves, brain and hormones",
      intuition:
        "The body is controlled by nerves and by hormones. SSC asks which brain part runs a function, and which hormone sits behind a named disorder.",
      definition:
        "Nerves and brain:\n" +
        "- **Schwann cells** (neurilemma cells) are the main glial cells of the peripheral nervous system; they form the myelin sheath.\n" +
        "- **Hypothalamus**: the body clock, the **circadian rhythm**. **Cerebellum**: balance. **Medulla**: breathing and heart rate. **Thalamus**: relays sensory signals.\n\n" +
        "Hormone disorders:\n" +
        "- **Acromegaly**: too much **growth hormone** in adults.\n" +
        "- **Cushing's syndrome**: too much **cortisol**. **Addison's disease**: an underactive **adrenal** gland.\n" +
        "- **Goitre**: thyroxine (iodine lack). **Hashimoto's disease**: autoimmune **thyroid** disease.\n" +
        "- **Diabetes**: insulin. **SIADH**: too much **vasopressin** (antidiuretic hormone).",
      table: {
        columns: ["Disorder", "Hormone or gland"],
        rows: [
          { cells: ["Acromegaly", "Growth hormone"], pyqExampleId: "94265770-3ee4-4529-ba82-ed0fa6ad98d6" },
          { cells: ["Addison's disease", "Adrenal gland"], pyqExampleId: "f7cb24f7-1e83-4b8b-8d20-dc605499aa4d" },
          { cells: ["Cushing's syndrome", "Cortisol"] },
          { cells: ["Hashimoto's disease", "Thyroid"] },
          { cells: ["SIADH", "Vasopressin"] },
        ],
      },
      pyqExampleId: "aa49bca5-9fc7-4b8d-8f42-bff6508f5606",
      selfCheckExample: {
        prompt: "Which cells form the myelin sheath around nerves outside the brain and spinal cord?",
        steps: ["Nerves outside the brain and spinal cord form the peripheral nervous system.", "Its main glial cells, which wrap the axons in myelin, are Schwann cells."],
        answer: "Schwann cells.",
      },
      practiceSet: [
        { prompt: "Which part of the brain controls balance?", answer: "The cerebellum" },
        { prompt: "Excess of which hormone causes Cushing's syndrome?", answer: "Cortisol" },
        { prompt: "What is another name for vasopressin?", answer: "Antidiuretic hormone" },
      ],
      traps: [
        {
          title: "Acromegaly is not adrenaline",
          body: "Pairing **acromegaly** with **adrenaline** is the mismatch. It comes from too much **growth hormone**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbhpsy-circulation",
      name: "Heart, kidney, tissues and antibodies",
      intuition:
        "This last group is a set of single facts: how blood moves through the heart, what filters it in the kidney, what joins bones and muscles, and which antibody does what.",
      definition:
        "The facts:\n" +
        "- **Heart chambers**: fish **2**, amphibians and most reptiles 3, birds and mammals **4**.\n" +
        "- **Blood flow**: right atrium, right ventricle, lungs, **left atrium**, left ventricle, body.\n" +
        "- **Nephrons** are the kidney's filtration units, about a million in each kidney; Bowman's capsule is one part of a nephron.\n" +
        "- **Tendons** join muscle to bone (dense regular tissue); **ligaments** join bone to bone and stretch a little. **Bone**, not cartilage, is hardened by calcium salts.\n" +
        "- Antibodies: **IgG** is the most plentiful in blood, **IgE** drives **allergy**, **IgA** is in saliva, tears and **breast milk**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Fish heart", "Two chambers"], pyqExampleId: "dd5b0afa-6d9c-4048-964d-90a8b6bd9640" },
          { cells: ["Blood path", "Right atrium, right ventricle, left atrium, left ventricle"], pyqExampleId: "f7f5fab9-536d-4b5c-9af7-fd2cbe5e4dd0" },
          { cells: ["Tendon, ligament", "Muscle to bone, bone to bone"], pyqExampleId: "56a1b775-d1d1-4a47-bb73-be426dd6d648" },
          { cells: ["IgG, IgE, IgA", "Most in blood, allergy, secretions"], pyqExampleId: "e1852e9c-b4b7-404e-abf1-c00042617038" },
        ],
      },
      pyqExampleId: "bf46b178-37ef-4bdb-8ae5-f5eb86a29a3d",
      selfCheckExample: {
        prompt: "A statement says cartilage contains calcium salts and is harder than bone. Correct it.",
        steps: ["Calcium salts harden the matrix of bone.", "Cartilage has a flexible matrix and is softer than bone."],
        answer: "Bone has the calcium salts; cartilage is softer.",
      },
      practiceSet: [
        { prompt: "How many chambers does a mammal's heart have?", answer: "Four" },
        { prompt: "Which antibody is found in breast milk?", answer: "IgA" },
        { prompt: "What joins a muscle to a bone?", answer: "A tendon" },
      ],
      traps: [
        {
          title: "Bowman's capsule is only part",
          body: "The kidney's filtration **unit** is the **nephron**. **Bowman's capsule** is one part of it, offered as the decoy.",
        },
      ],
    },
  ],
};
