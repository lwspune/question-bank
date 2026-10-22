import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_HP_CONTROL_NOTE: SubtopicNote = {
  subtopicName: "Control and Coordination",
  title: "Control and Coordination",
  oneLineDefinition:
    "The brain and nerves send fast electrical messages, and the endocrine glands send slower chemical messages called hormones.",
  whyItMatters:
    "Five questions in the bank, four of them EASY: the largest part of the brain, an involuntary action, the nerve from the ear, the direction an impulse travels through two neurons, and the endocrine glands that sit in the brain. Learn which part of the brain does what and where each gland is.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spihpco-brain",
      name: "Parts of the brain and voluntary actions",
      intuition:
        "The brain has three parts. The front part, the cerebrum, is the thinking part and the largest. The back part looks after balance and the actions we never think about, such as the heartbeat. " +
        "An action we choose is voluntary; one that goes on without our will is involuntary.",
      definition:
        "- **Forebrain: cerebrum**, the **largest** part. Thinking, memory, intelligence, the senses and all **voluntary** actions.\n" +
        "- **Forebrain: hypothalamus**, a small region that controls hunger, thirst and body temperature, and makes hormones.\n" +
        "- **Hindbrain: cerebellum**: **balance**, posture and smooth, exact movements (walking in a straight line, riding a cycle).\n" +
        "- **Hindbrain: medulla**: **involuntary** actions such as the heartbeat, breathing, blood pressure, vomiting and salivation.\n" +
        "- **Spinal cord**: controls **reflex actions**, such as pulling the hand away from a hot object.",
      table: {
        columns: ["Part", "Region", "Controls"],
        rows: [
          {
            cells: ["Cerebrum", "Forebrain", "Thinking, memory, senses, voluntary actions"],
            noteAmber: "The cerebrum is the largest part of the brain.",
          },
          { cells: ["Hypothalamus", "Forebrain", "Hunger, thirst, body temperature"] },
          { cells: ["Cerebellum", "Hindbrain", "Balance and posture"] },
          { cells: ["Medulla", "Hindbrain", "Heartbeat, breathing, vomiting (involuntary)"] },
          { cells: ["Spinal cord", "Below the brain", "Reflex actions"] },
        ],
        caption: "Chosen actions: cerebrum. Balance: cerebellum. Heartbeat: medulla.",
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong row: (a) cerebellum: balance (b) medulla: heartbeat (c) cerebrum: memory (d) spinal cord: thinking",
        steps: [
          "The cerebellum keeps balance, the medulla controls the heartbeat and the cerebrum holds memory: all right.",
          "Thinking is done by the cerebrum. The spinal cord controls reflex actions.",
        ],
        answer: "(d) is wrong: the spinal cord controls reflexes, not thinking.",
      },
      practiceSet: [
        { prompt: "Which part of the brain keeps the body balanced?", answer: "The cerebellum" },
        { prompt: "Is breathing during sleep a voluntary or an involuntary action?", answer: "Involuntary" },
        { prompt: "Which part of the brain controls vomiting?", answer: "The medulla" },
        { prompt: "Pulling your hand away from a hot pan is controlled by which part?", answer: "The spinal cord (a reflex action)" },
        { prompt: "Is writing a letter a voluntary or an involuntary action?", answer: "Voluntary" },
      ],
      pyqExampleId: "3b188ca7-b08d-49b5-9be5-0700ad89e75f",
      traps: [
        {
          title: "Cerebellum for the largest part",
          body:
            "The names are close. The cerebrum is the largest part and does the thinking; the cerebellum is smaller, at the back, and keeps balance.",
        },
        {
          title: "A skill is not involuntary",
          body:
            "Riding a cycle or walking straight feels automatic once learnt, but we choose to do it, so it is voluntary. Involuntary actions, such as the heartbeat, go on even when we sleep.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spihpco-nerves",
      name: "Neurons, nerves and the direction of an impulse",
      intuition:
        "A neuron is a long cell built to carry a message one way. The message comes in at the branched dendrites, passes the cell body, runs down the long axon and jumps a small gap, the synapse, to the dendrites of the next neuron. " +
        "Each sense organ has its own nerve to the brain.",
      definition:
        "- **Path in one neuron**: dendrite, cell body, axon, nerve ending.\n" +
        "- **Synapse**: the gap between the nerve ending of one neuron and the **dendrite** of the next. A chemical crosses it.\n" +
        "- The impulse never runs backwards, from axon to dendrite.\n" +
        "- **Optic nerve**: eye to brain. **Auditory nerve**: ear to brain. **Olfactory nerve**: nose to brain.\n" +
        "- **Reflex arc**: receptor, sensory neuron, spinal cord, motor neuron, muscle.",
      table: {
        columns: ["Nerve", "Carries messages from", "Sense"],
        rows: [
          { cells: ["Optic nerve", "Eye", "Sight"] },
          { cells: ["Auditory nerve", "Ear", "Hearing"] },
          { cells: ["Olfactory nerve", "Nose", "Smell"] },
        ],
        caption: "In a neuron: dendrite, cell body, axon, then across the synapse to the next dendrite.",
      },
      selfCheckExample: {
        prompt: "Put in order for one impulse: axon, dendrite, nerve ending, cell body.",
        steps: [
          "The message enters at the dendrite and passes into the cell body.",
          "It runs along the axon and reaches the nerve ending.",
        ],
        answer: "Dendrite, cell body, axon, nerve ending",
      },
      practiceSet: [
        { prompt: "Which nerve carries messages from the eye to the brain?", answer: "The optic nerve" },
        { prompt: "What is the gap between two neurons called?", answer: "A synapse" },
        { prompt: "In a reflex arc, which neuron carries the message from the spinal cord to the muscle?", answer: "The motor neuron" },
        { prompt: "Which nerve carries the sense of smell to the brain?", answer: "The olfactory nerve" },
      ],
      pyqExampleId: "c2d46a80-a01c-4a15-8ae4-91d57d4e1744",
      traps: [
        {
          title: "An impulse crossing into the next axon",
          body:
            "At a synapse the message passes from the nerve ending of one neuron to the dendrite of the next, never straight into its axon or nerve ending.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spihpco-glands",
      name: "Endocrine glands and where they sit",
      intuition:
        "Endocrine glands pour hormones straight into the blood. The questions ask where a gland is and what its hormone does, so learn each gland with its place in the body.",
      definition:
        "- **In the brain**: **hypothalamus**, **pituitary** (growth hormone, the master gland) and **pineal**.\n" +
        "- **In the neck**: **thyroid** (thyroxine, needs iodine; lack of iodine causes goitre) and the **parathyroids**.\n" +
        "- **In the chest**: **thymus**.\n" +
        "- **On top of the kidneys**: **adrenal** glands (adrenaline, for emergencies).\n" +
        "- **In the abdomen**: **pancreas** (insulin, which lowers blood sugar; too little causes diabetes).\n" +
        "- **Testes** make testosterone; **ovaries** make oestrogen.",
      table: {
        columns: ["Gland", "Where", "Hormone or job"],
        rows: [
          { cells: ["Hypothalamus", "Brain", "Releasing hormones that control the pituitary"] },
          { cells: ["Pituitary", "Brain", "Growth hormone"] },
          { cells: ["Pineal", "Brain", "Melatonin (sleep cycle)"] },
          { cells: ["Thyroid", "Neck", "Thyroxine (needs iodine)"] },
          { cells: ["Parathyroid", "Neck", "Controls calcium in the blood"] },
          {
            cells: ["Thymus", "Chest", "Helps build immunity in children"],
            noteAmber: "The thymus is in the chest, not the brain.",
          },
          { cells: ["Adrenal", "On top of the kidneys", "Adrenaline"] },
          { cells: ["Pancreas", "Abdomen", "Insulin"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong row: (a) thyroid: neck (b) adrenal: on top of the kidneys (c) pituitary: brain (d) thymus: brain",
        steps: [
          "The thyroid is in the neck, the adrenals sit on the kidneys and the pituitary is in the brain: all right.",
          "The thymus lies in the chest, behind the breastbone.",
        ],
        answer: "(d) is wrong: the thymus is in the chest.",
      },
      practiceSet: [
        { prompt: "Which hormone lowers the sugar level in the blood?", answer: "Insulin" },
        { prompt: "Lack of which element in the diet causes goitre?", answer: "Iodine" },
        { prompt: "Which gland makes growth hormone?", answer: "The pituitary" },
        { prompt: "Which glands sit on top of the kidneys?", answer: "The adrenal glands" },
      ],
      pyqExampleId: "548dc027-d43c-44c3-aac1-78d3f79f448c",
      traps: [
        {
          title: "Parathyroid next to pituitary",
          body: "The pituitary is in the brain, but the parathyroids are in the neck beside the thyroid. A pair is in the brain only if both glands are.",
        },
        {
          title: "Pancreas as only a digestive organ",
          body: "The pancreas makes pancreatic juice for digestion and also insulin for the blood. It is both a digestive gland and an endocrine gland.",
        },
      ],
    },
  ],
};
