import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_LM_SKELETON_NOTE: SubtopicNote = {
  subtopicName: "Skeletal System",
  title: "Skeletal System",
  oneLineDefinition:
    "The 206 bones of the human skeleton: the skull, the vertebral column, the sternum and ribs of the axial skeleton, and the limbs and girdles of the appendicular skeleton, with the exact counts NCERT gives.",
  whyItMatters:
    "Five NEET questions, and three of them came in one paper, Re-NEET 2026: the number of vertebrae, the order of the vertebral regions and the order of the bones of the leg. NEET 2026 set a statement question on the skull, vertebrae and ribs, and NEET 2021 a match on the scapula, cranium, sternum and vertebral column.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzolm-skull",
      name: "The skeleton in numbers and the skull",
      intuition:
        "The skeleton is a frame of bones with a few cartilages. Split it down the middle line of the body: the axial skeleton runs along that line, and the appendicular skeleton hangs off it as limbs and girdles. NEET loves the counts, so learn them as a sum: 80 axial bones plus 126 appendicular bones make 206. The skull is the first part of the axial skeleton, and it sits on the backbone with two knobs, which is why it is called dicondylic.",
      definition:
        "The skeletal system:\n" +
        "- A framework of **bones and a few cartilages**. Bone has a very hard matrix because of **calcium salts**; cartilage has a slightly pliable matrix because of **chondroitin salts**.\n" +
        "- In humans it has **206 bones** and a few cartilages, in two divisions: the **axial skeleton (80 bones)** along the main axis of the body, and the **appendicular skeleton**.\n" +
        "- The **skull, vertebral column, sternum and ribs** make up the axial skeleton.\n" +
        "The skull:\n" +
        "- Two sets of bones, **cranial and facial**, totalling **22 bones**.\n" +
        "- **Cranial bones: 8.** They form the hard protective outer covering of the **brain**, the **cranium**.\n" +
        "- **Facial region: 14** skeletal elements, which form the front part of the skull.\n" +
        "- A single **U-shaped hyoid** bone at the base of the buccal cavity is also included in the skull.\n" +
        "- Each **middle ear** has three tiny bones, the **malleus, incus and stapes**, together the **ear ossicles**.\n" +
        "- The skull articulates with the top of the vertebral column with **two occipital condyles**, so the human skull is **dicondylic**. The first vertebra, the **atlas**, articulates with the occipital condyles.\n" +
        "- Counted together: 22 + 1 hyoid + 6 ossicles (3 in each ear) = **29 bones**.",
      table: {
        columns: ["Part", "Number of bones"],
        rows: [
          { cells: ["Whole skeleton", "206"] },
          { cells: ["Axial skeleton", "80"] },
          { cells: ["Cranial bones", "8"] },
          { cells: ["Facial bones", "14"] },
          { cells: ["Hyoid (U-shaped, base of buccal cavity)", "1"] },
          { cells: ["Ear ossicles (malleus, incus, stapes)", "3 in each middle ear, 6 in all"] },
          {
            cells: ["Occipital condyles", "2, so the skull is dicondylic"],
            noteAmber: "NEET 2026: the human skull is dicondylic, not monocondylic, and all ribs are bicephalic, not all but the last two pairs.",
          },
        ],
      },
      pyqExampleId: "006b2ec5-a7cd-418c-ae44-802177558ef2",
      selfCheckExample: {
        prompt: "Add up every bone NCERT includes in the human skull, counting the hyoid and the ear ossicles of both ears.",
        steps: [
          "Cranial and facial bones together are 22 (8 cranial and 14 facial).",
          "Add the single hyoid: 23.",
          "Each middle ear has 3 ossicles, so both ears add 6: 29.",
        ],
        answer: "29 bones.",
      },
      practiceSet: [
        { prompt: "How many bones make up the human axial skeleton?", answer: "80" },
        { prompt: "Name the three ear ossicles found in each human middle ear.", answer: "Malleus, incus and stapes" },
        { prompt: "Which U-shaped bone at the base of the buccal cavity is counted as part of the skull?", answer: "The hyoid" },
        { prompt: "Why is bone matrix very hard while cartilage matrix is slightly pliable?", answer: "Bone has calcium salts in its matrix; cartilage has chondroitin salts" },
      ],
      traps: [
        {
          title: "Two condyles: dicondylic",
          body: "The human skull rests on the atlas with **two occipital condyles**, so it is **dicondylic**. A statement calling it monocondylic is false.",
        },
        {
          title: "22 is cranial plus facial only",
          body: "NCERT's **22** counts the 8 cranial and 14 facial bones. The **hyoid** and the **ear ossicles** are counted in the skull on top of those 22.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-vertebrae",
      name: "The vertebral column, sternum and ribs",
      intuition:
        "The backbone is a stack of 26 small bones running from the base of the skull down the back. Read its regions from head to tail and the counts tell a story: 7 in the neck, 12 in the chest where the ribs attach, 5 in the lower back, then two fused pieces at the bottom. The ribs are sorted by how they reach the breastbone: directly, through the seventh rib, or not at all.",
      definition:
        "Vertebral column:\n" +
        "- Made of **26 serially arranged units, the vertebrae**, placed dorsally. It runs from the base of the skull and forms the main framework of the trunk.\n" +
        "- Each vertebra has a central hollow, the **neural canal**, through which the **spinal cord** passes.\n" +
        "- The first vertebra is the **atlas**, which articulates with the occipital condyles.\n" +
        "- Regions from the skull down: **cervical (7), thoracic (12), lumbar (5), sacral (1, fused) and coccygeal (1, fused)**.\n" +
        "- The number of cervical vertebrae is **seven in almost all mammals, including humans**.\n" +
        "- The column protects the spinal cord, supports the head, and gives attachment to the ribs and the muscles of the back.\n" +
        "Sternum and ribs:\n" +
        "- The **sternum** is a **flat bone on the ventral midline** of the thorax.\n" +
        "- There are **12 pairs of ribs**. Each rib is a thin flat bone joined dorsally to the vertebral column and ventrally to the sternum. It has **two articulation surfaces on its dorsal end**, so it is **bicephalic**.\n" +
        "- **True ribs:** the first **7 pairs**, attached dorsally to the thoracic vertebrae and ventrally to the sternum by **hyaline cartilage**.\n" +
        "- **Vertebrochondral (false) ribs:** the **8th, 9th and 10th pairs**. They do not join the sternum directly but join the **seventh rib** with hyaline cartilage.\n" +
        "- **Floating ribs:** the last **2 pairs (11th and 12th)**, not connected ventrally.\n" +
        "- The **thoracic vertebrae, ribs and sternum** together form the **rib cage**.",
      table: {
        columns: ["Region or part", "Count", "Note"],
        rows: [
          {
            cells: ["Cervical vertebrae", "7", "Seven in almost all mammals"],
            noteAmber: "Re-NEET 2026: the regions run cervical, thoracic, lumbar, sacrum from head to toe.",
          },
          { cells: ["Thoracic vertebrae", "12", "Give attachment to the ribs"] },
          { cells: ["Lumbar vertebrae", "5", "Lower back"] },
          { cells: ["Sacral", "1", "Fused"] },
          { cells: ["Coccygeal", "1", "Fused"] },
          {
            cells: ["All vertebrae", "26", "Serially arranged, dorsal"],
            noteAmber: "Re-NEET 2026: the human vertebral column has 26 vertebrae; 206 is the whole skeleton.",
            pyqExampleId: "bc096e19-d263-4977-b76d-aac99a969522",
          },
          { cells: ["True ribs", "7 pairs", "Reach the sternum through hyaline cartilage"] },
          { cells: ["Vertebrochondral (false) ribs", "3 pairs (8th, 9th, 10th)", "Join the seventh rib, not the sternum"] },
          { cells: ["Floating ribs", "2 pairs (11th, 12th)", "Not connected ventrally"] },
        ],
      },
      pyqExampleId: "3fab9e64-b23c-49d9-925e-5736b3524e99",
      selfCheckExample: {
        prompt: "The 9th pair of human ribs does not touch the sternum directly. How does it reach the front of the rib cage, and what is this kind of rib called?",
        steps: [
          "The 8th, 9th and 10th pairs do not articulate directly with the sternum.",
          "They join the seventh rib with the help of hyaline cartilage.",
        ],
        answer: "Through hyaline cartilage joining it to the seventh rib; it is a vertebrochondral (false) rib.",
      },
      practiceSet: [
        { prompt: "Why is a human rib called bicephalic?", answer: "It has two articulation surfaces on its dorsal end" },
        { prompt: "What passes through the neural canal of a vertebra?", answer: "The spinal cord" },
        { prompt: "Which three parts together form the rib cage?", answer: "The thoracic vertebrae, the ribs and the sternum" },
        { prompt: "Which pairs of human ribs are the floating ribs?", answer: "The 11th and 12th pairs" },
        { prompt: "How many lumbar vertebrae does a human have?", answer: "5" },
      ],
      traps: [
        {
          title: "Every rib is bicephalic",
          body: "All **12 pairs** of ribs have two articulation surfaces on their dorsal end. The floating ribs differ only at the **ventral** end, where they are free.",
        },
        {
          title: "Floating ribs are 11 and 12",
          body: "The last two pairs, the **11th and 12th**, are the floating ribs. The **8th to 10th** are vertebrochondral (false) ribs, joined to the seventh rib.",
        },
        {
          title: "Lumbar comes after thoracic",
          body: "From the head down: **cervical, thoracic, lumbar, sacral, coccygeal**. An order that puts lumbar before thoracic, or the sacrum above the lumbar region, is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-limbs",
      name: "Limbs and girdles: the appendicular skeleton",
      intuition:
        "Each arm and each leg has the same plan of 30 bones: one long bone, then a pair, then a block of small bones at the wrist or ankle, then the palm or sole, then the fingers or toes. The girdles are the frames that hold the limbs to the body: the shoulder (pectoral) girdle for the arms and the hip (pelvic) girdle for the legs.",
      definition:
        "Limbs (each limb has **30 bones**):\n" +
        "- **Upper limb:** **humerus**, **radius and ulna**, **carpals** (wrist bones, **8**), **metacarpals** (palm bones, **5**) and **phalanges** (digits, **14**).\n" +
        "- **Lower limb:** **femur** (thigh bone, the **longest bone**), **tibia and fibula**, **tarsals** (ankle bones, **7**), **metatarsals** (**5**) and **phalanges** (**14**).\n" +
        "- A cup-shaped bone, the **patella**, covers the knee ventrally (the knee cap). So down the leg the order is femur, patella at the knee, tibia, tarsals.\n" +
        "Girdles:\n" +
        "- **Pectoral girdle:** each half has a **clavicle** and a **scapula**.\n" +
        "- The **scapula** is a **large triangular flat bone** in the dorsal part of the thorax, between the **second and the seventh ribs**. Its slightly raised ridge, the **spine**, projects as a flat expanded process, the **acromion**; the clavicle articulates with it. Below the acromion a depression, the **glenoid cavity**, articulates with the head of the **humerus** to form the **shoulder joint**.\n" +
        "- The **clavicle** is a long slender bone with **two curvatures**, the **collar bone**.\n" +
        "- **Pelvic girdle:** two **coxal bones**. Each is formed by the fusion of three bones, the **ilium, ischium and pubis**. Where they fuse is a cavity, the **acetabulum**, to which the **thigh bone** articulates.\n" +
        "- The two halves meet ventrally to form the **pubic symphysis**, which contains **fibrous cartilage**.",
      table: {
        columns: ["Bone or part", "Where it is", "What to remember"],
        rows: [
          { cells: ["Humerus", "Upper arm", "Its head fits the glenoid cavity of the scapula"] },
          { cells: ["Carpals", "Wrist", "8 in each upper limb"] },
          { cells: ["Femur", "Thigh", "The longest bone; its head fits the acetabulum"] },
          {
            cells: ["Patella", "Covers the knee ventrally", "Cup-shaped knee cap, between femur and tibia in the order down the leg"],
            noteAmber: "Re-NEET 2026: down the lower limb the bones run femur, patella, tibia, tarsal.",
            pyqExampleId: "0c3d64a0-284b-4f66-b362-2ef02ee30662",
          },
          { cells: ["Tarsals", "Ankle", "7 in each lower limb"] },
          { cells: ["Phalanges", "Fingers and toes", "14 in each limb"] },
          {
            cells: ["Scapula", "Dorsal thorax, between the 2nd and 7th ribs", "Large triangular flat bone with spine, acromion and glenoid cavity"],
            noteAmber: "NEET 2021: scapula, triangular flat bone; cranium, fibrous joints; sternum, flat bone; vertebral column, cartilaginous joints.",
          },
          { cells: ["Clavicle", "Shoulder", "Collar bone with two curvatures"] },
          { cells: ["Coxal bone", "Hip", "Ilium, ischium and pubis fused; acetabulum where they meet"] },
        ],
      },
      pyqExampleId: "3cc7f5e9-137d-4a30-b649-cb529ef6111b",
      selfCheckExample: {
        prompt: "Which three bones fuse to form each coxal bone of the pelvic girdle, and what forms at the point where they fuse?",
        steps: [
          "Each coxal bone is formed by the fusion of the ilium, ischium and pubis.",
          "At the point of fusion lies a cavity, the acetabulum, to which the thigh bone articulates.",
        ],
        answer: "The ilium, ischium and pubis; the acetabulum forms where they fuse.",
      },
      practiceSet: [
        { prompt: "How many bones does each human limb have?", answer: "30" },
        { prompt: "Which depression of the scapula articulates with the head of the humerus?", answer: "The glenoid cavity" },
        { prompt: "Which is the longest bone of the human body?", answer: "The femur" },
        { prompt: "What does the pubic symphysis contain?", answer: "Fibrous cartilage" },
        { prompt: "Name the bones of the human upper limb in order from the shoulder to the fingers.", answer: "Humerus, radius and ulna, carpals, metacarpals, phalanges" },
      ],
      traps: [
        {
          title: "Glenoid for the arm, acetabulum for the leg",
          body: "The **glenoid cavity** of the scapula holds the **humerus**. The **acetabulum** of the coxal bone holds the **femur**. A pairing of the glenoid cavity with the thigh bone is wrong.",
        },
        {
          title: "Wrist 8, ankle 7",
          body: "There are **8 carpals** in the wrist but **7 tarsals** in the ankle. Metacarpals and metatarsals are **5** each, and phalanges **14** in each limb.",
        },
        {
          title: "The patella sits at the knee",
          body: "The **patella** covers the knee, between the femur above and the tibia below. A sequence that starts the leg with the patella, or puts it after the tibia, is wrong.",
        },
      ],
    },
  ],
};
