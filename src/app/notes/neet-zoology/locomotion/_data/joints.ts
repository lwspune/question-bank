import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_LM_JOINTS_NOTE: SubtopicNote = {
  subtopicName: "Joints and Disorders",
  title: "Joints and Disorders",
  oneLineDefinition:
    "The three structural kinds of joint and the five synovial joints NCERT names with their places, then the six disorders of the muscular and skeletal system.",
  whyItMatters:
    "Seven NEET questions. Joints were set as a match-the-columns three times, in NEET 2023, Re-NEET 2024 and NEET 2024. The disorders were asked four times, in NEET 2021, twice in NEET 2022 and in NEET 2026, and myasthenia gravis appears in three of those four.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzolm-joint-types",
      name: "Fibrous, cartilaginous and synovial joints",
      intuition:
        "A joint is where two bones meet, and the question is how much they can move there. Glue them edge to edge with tough fibres and they cannot move at all: that is the skull. Put a pad of cartilage between them and they can move a little: that is the backbone. Leave a fluid-filled gap between them and they can move a lot: those are the synovial joints of the limbs.",
      definition:
        "Joints:\n" +
        "- Joints are **points of contact between bones, or between bones and cartilages**. The force made by the muscles is used to move the body through joints, and the **joint acts as a fulcrum**.\n" +
        "- NCERT classifies joints into three major structural forms: **fibrous, cartilaginous and synovial**.\n" +
        "- **Fibrous joints** do **not allow any movement**. Example: the **flat skull bones**, which fuse end to end with **dense fibrous connective tissue** in the form of **sutures** to form the **cranium**.\n" +
        "- **Cartilaginous joints:** the bones are joined with the help of **cartilage**. Example: the joint between **adjacent vertebrae** of the vertebral column. It permits **limited movement**.\n" +
        "- **Synovial joints** have a **fluid-filled synovial cavity** between the articulating surfaces of the two bones. This allows **considerable movement**, and these joints help in **locomotion** and many other movements.",
      table: {
        columns: ["Joint", "How the bones are held", "Movement", "Example"],
        rows: [
          {
            cells: ["Fibrous", "Dense fibrous connective tissue (sutures)", "None", "Flat bones of the skull (cranium)"],
            noteAmber: "NEET 2023: fibrous joint between flat skull bones, cartilaginous between adjacent vertebrae, ball and socket between humerus and pectoral girdle, saddle between carpal and metacarpal of thumb.",
            pyqExampleId: "eb8957e9-4af6-4bb7-98e1-364140f3f233",
          },
          { cells: ["Cartilaginous", "Cartilage", "Limited", "Between adjacent vertebrae"] },
          { cells: ["Synovial", "Fluid-filled synovial cavity between the bones", "Considerable", "Knee, shoulder and the others below"] },
        ],
      },
      pyqExampleId: "fa3636b9-a485-4a01-95ac-274d301033bb",
      selfCheckExample: {
        prompt: "When a muscle moves a bone, what role does NCERT give to the joint the bone moves at?",
        steps: [
          "The force for movement is made by the muscles.",
          "The movement is carried out through a joint, and the joint acts as the fulcrum.",
        ],
        answer: "The joint acts as a fulcrum.",
      },
      practiceSet: [
        { prompt: "Name the three major structural forms of joints.", answer: "Fibrous, cartilaginous and synovial" },
        { prompt: "What feature sets a synovial joint apart from the other two kinds?", answer: "A fluid-filled synovial cavity between the articulating surfaces of the two bones" },
        { prompt: "What are the fibrous joints between the flat bones of the skull called?", answer: "Sutures" },
      ],
      traps: [
        {
          title: "Vertebrae are cartilaginous, not synovial",
          body: "The joint between **adjacent vertebrae** is a **cartilaginous** joint with **limited** movement. It is not fibrous (no movement) and not synovial (considerable movement).",
        },
        {
          title: "Fibrous means no movement at all",
          body: "**Fibrous joints** such as the skull sutures allow **no movement**. Limited movement belongs to cartilaginous joints.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-synovial",
      name: "The five synovial joints and where they are",
      intuition:
        "Each synovial joint moves the way its shape allows. A ball in a socket turns in every direction. A hinge swings one way like a door. A pivot lets one bone turn on another, which is how you shake your head. Gliding joints let flat bones slide a little over each other, and a saddle joint lets the thumb move across the palm. NEET asks you to pair each with its place.",
      definition:
        "The synovial joints NCERT names:\n" +
        "- **Ball and socket joint:** between the **humerus and the pectoral girdle** (the shoulder). NEET 2024 paired it with rotational movement.\n" +
        "- **Hinge joint:** the **knee joint**.\n" +
        "- **Pivot joint:** between the **atlas and the axis**.\n" +
        "- **Gliding joint:** **between the carpals**.\n" +
        "- **Saddle joint:** **between the carpal and the metacarpal of the thumb**.",
      table: {
        columns: ["Synovial joint", "Where NCERT places it"],
        rows: [
          { cells: ["Ball and socket", "Between humerus and pectoral girdle"] },
          { cells: ["Hinge", "Knee joint"] },
          { cells: ["Pivot", "Between atlas and axis"] },
          { cells: ["Gliding", "Between the carpals"] },
          { cells: ["Saddle", "Between carpal and metacarpal of the thumb"] },
        ],
      },
      pyqExampleId: "4f346345-d887-4497-8b0c-fcfc3ca79a40",
      selfCheckExample: {
        prompt: "A student writes that the joint between adjacent vertebrae is a synovial joint because the backbone can bend. Correct the student.",
        steps: [
          "Synovial joints have a fluid-filled synovial cavity and allow considerable movement.",
          "The joint between adjacent vertebrae has cartilage joining the bones and allows only limited movement.",
        ],
        answer: "It is a cartilaginous joint, which permits limited movement; it is not synovial.",
      },
      practiceSet: [
        { prompt: "Which joint lies between the carpal and the metacarpal of the human thumb?", answer: "A saddle joint" },
        { prompt: "Which of the three structural kinds of joint allows considerable movement and helps in locomotion?", answer: "Synovial joints" },
      ],
      traps: [
        {
          title: "Saddle at the thumb, gliding between carpals",
          body: "The **saddle joint** is between the **carpal and metacarpal of the thumb**. The joints **between the carpals** themselves are **gliding joints**. The two are often swapped in a match.",
        },
        {
          title: "Hinge at the knee, pivot at the neck",
          body: "The **knee** is a **hinge joint**. The **pivot joint** is between the **atlas and axis**, the first two vertebrae.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-muscle-disorders",
      name: "Disorders of muscle: myasthenia gravis, muscular dystrophy, tetany",
      intuition:
        "Each muscle disorder breaks a different link in the chain of contraction. In myasthenia gravis the body's own immune system attacks the neuromuscular junction, so the signal does not get through well. In muscular dystrophy the muscle itself slowly wastes away, mostly because of a faulty gene. In tetany there is too little calcium in the body fluid, and the muscles go into wild spasms.",
      definition:
        "NCERT's muscle disorders:\n" +
        "- **Myasthenia gravis:** an **autoimmune** disorder affecting the **neuromuscular junction**, leading to **fatigue, weakening and paralysis** of skeletal muscle.\n" +
        "- **Muscular dystrophy:** **progressive degeneration of skeletal muscle**, mostly due to a **genetic disorder**.\n" +
        "- **Tetany:** **rapid spasms (wild contractions)** in muscle due to **low Ca²⁺ in body fluid**.",
      table: {
        columns: ["Disorder", "What it is", "Cause NCERT gives"],
        rows: [
          { cells: ["Myasthenia gravis", "Fatigue, weakening and paralysis of skeletal muscle", "Autoimmune; affects the neuromuscular junction"] },
          { cells: ["Muscular dystrophy", "Progressive degeneration of skeletal muscle", "Mostly genetic"] },
          {
            cells: ["Tetany", "Rapid spasms (wild contractions) in muscle", "Low Ca²⁺ in body fluid"],
            noteAmber: "NEET 2026: tetany, low Ca²⁺; arthritis, inflamed joints; myasthenia gravis, autoimmune at the neuromuscular junction; muscular dystrophy, progressive degeneration.",
            pyqExampleId: "402e958f-a07d-4a3e-8f07-1aee7ecacc50",
          },
        ],
      },
      pyqExampleId: "bdab0f12-ef69-4aa7-b3ed-51d739aa0687",
      selfCheckExample: {
        prompt: "Tetany and myasthenia gravis both upset muscle contraction. Which one acts at the nerve signal reaching the muscle, and which one comes from a fault in the body fluid?",
        steps: [
          "Myasthenia gravis is an autoimmune disorder of the neuromuscular junction, where the nerve signal passes to the muscle.",
          "Tetany is caused by low Ca²⁺ in the body fluid.",
        ],
        answer: "Myasthenia gravis acts at the neuromuscular junction; tetany comes from low Ca²⁺ in the body fluid.",
      },
      practiceSet: [
        { prompt: "Which muscle disorder is mostly due to a genetic fault?", answer: "Muscular dystrophy" },
        { prompt: "What does NCERT call rapid spasms, or wild contractions, of muscle caused by low calcium in body fluid?", answer: "Tetany" },
        { prompt: "Is the muscle loss in muscular dystrophy sudden or progressive, and which muscle does it affect?", answer: "Progressive; skeletal muscle" },
      ],
      traps: [
        {
          title: "Autoimmune is myasthenia, genetic is dystrophy",
          body: "**Myasthenia gravis** is the **autoimmune** disorder of the neuromuscular junction. **Muscular dystrophy** is **mostly genetic**. Options that swap the two causes are false.",
        },
        {
          title: "Tetany is low calcium, not high",
          body: "Tetany comes from **low** Ca²⁺ in body fluid. A statement linking it to a high Ca²⁺ level is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-bone-disorders",
      name: "Disorders of joints and bone: arthritis, gout, osteoporosis",
      intuition:
        "Two of these disorders are about joints becoming inflamed. Arthritis is the general name for inflamed joints; gout is one kind with a clear cause, crystals of uric acid piling up in the joint. The third, osteoporosis, is about the bone itself: with age bone mass falls, so bones break more easily.",
      definition:
        "NCERT's skeletal disorders:\n" +
        "- **Arthritis:** **inflammation of joints**.\n" +
        "- **Osteoporosis:** an **age-related** disorder with **decreased bone mass** and **increased chances of fractures**. **Decreased levels of estrogen** is a common cause.\n" +
        "- **Gout:** **inflammation of joints** due to the **accumulation of uric acid crystals**.",
      table: {
        columns: ["Disorder", "What it is", "Key point"],
        rows: [
          {
            cells: ["Arthritis", "Inflammation of joints", "The general name for inflamed joints"],
            noteAmber: "NEET 2022: arthritis, inflamed joints was the correct match; tetany with high Ca²⁺, myasthenia gravis as genetic and muscular dystrophy as autoimmune were the false ones.",
            pyqExampleId: "27b55685-43d6-4aa6-9fbd-a4250a1669f8",
          },
          { cells: ["Gout", "Inflammation of joints", "Caused by accumulation of uric acid crystals"] },
          { cells: ["Osteoporosis", "Decreased bone mass and more fractures", "Age-related; decreased estrogen is a common cause"] },
        ],
      },
      pyqExampleId: "4c661040-27c3-4d15-9751-55e74dcf76b7",
      selfCheckExample: {
        prompt: "Gout and arthritis both inflame the joints. What sets gout apart?",
        steps: [
          "Arthritis is inflammation of joints in general.",
          "Gout is inflammation of joints caused by the accumulation of uric acid crystals.",
        ],
        answer: "Gout has a named cause: uric acid crystals building up in the joints.",
      },
      practiceSet: [
        { prompt: "What does NCERT define arthritis as?", answer: "Inflammation of joints" },
        { prompt: "Name the three disorders of joints and bone that NCERT lists.", answer: "Arthritis, osteoporosis and gout" },
      ],
      traps: [
        {
          title: "Osteoporosis follows falling estrogen",
          body: "A common cause of osteoporosis is **decreased** estrogen. A reason that says increased estrogen is false, even when the description of the disease is right.",
        },
        {
          title: "Gout is uric acid in joints",
          body: "**Gout** is joint inflammation from **uric acid crystals**. It has nothing to do with calcium; wild contractions from low Ca²⁺ are **tetany**.",
        },
      ],
    },
  ],
};
