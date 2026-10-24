import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_HU_CONTROL_NOTE: SubtopicNote = {
  subtopicName: "Nerves, Senses and Hormones",
  title: "Nerves, Senses and Hormones",
  oneLineDefinition:
    "The parts of the brain and what each controls, the reflex arc, the blind spot of the eye, and the main endocrine glands with their hormones.",
  whyItMatters:
    "Seven CDS questions from 2016 (II) to 2026 (II). Four are about the nervous system and the eye: the parts of the brain, the reflex arc, the blind spot and schizophrenia. Three are about hormones: insulin, thyroxine and the one unpaired gland.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbihu-nervous",
      name: "The brain, reflexes and the eye",
      intuition:
        "The brain has three parts. The big forebrain does the thinking, remembering and feeling. The small midbrain links it to the hindbrain, and the hindbrain runs the things you never think about: balance, heartbeat and breathing. Some actions are too urgent to wait for the brain, so the spinal cord handles them as reflexes. The eye sends its picture to the brain along the optic nerve, and the spot where that nerve leaves the eye cannot see at all.",
      definition:
        "The nervous system:\n" +
        "- The brain has three main parts: **forebrain**, **midbrain** and **hindbrain**.\n" +
        "- **Forebrain**: the **cerebrum** (thinking, memory, the senses, voluntary actions) and the hypothalamus.\n" +
        "- **Hindbrain**: the **cerebellum** (balance and posture) and the **medulla** (heartbeat, breathing, blood pressure, swallowing, vomiting).\n" +
        "- **Reflex arc** (NCERT): **receptor → sensory neuron → relay neuron in the spinal cord → motor neuron → effector** (a muscle or gland). Information also goes on to the brain, which learns of the action.\n\n" +
        "The eye:\n" +
        "- The **retina** has **rods** (dim light) and **cones** (colour and bright light).\n" +
        "- The **blind spot** is where the **optic nerve** leaves the eye: it has **no rods or cones**, so nothing is seen there.\n" +
        "- The **fovea** (yellow spot) has the most cones and gives the sharpest vision.\n\n" +
        "**Schizophrenia** is a mental disorder marked by **hallucinations** and **delusions**. It is not 'split' or multiple personality, which is a different disorder.",
      table: {
        columns: ["Part", "Job or fact"],
        rows: [
          { cells: ["Cerebrum (forebrain)", "Thinking, memory, the senses, voluntary actions"] },
          { cells: ["Cerebellum (hindbrain)", "Balance and posture"] },
          { cells: ["Medulla (hindbrain)", "Heartbeat, breathing, blood pressure"] },
          { cells: ["Spinal cord", "Carries messages to and from the brain; centre of many reflexes"] },
          {
            cells: ["Blind spot", "Where the optic nerve leaves; no rods or cones"],
            noteAmber: "CDS 2025 (I): the point of the eye with no photoreceptors is the blind spot, not the fovea.",
            pyqExampleId: "1488aa30-7750-471d-a64f-856a5df4e437",
          },
          { cells: ["Fovea", "Most cones; sharpest vision"] },
          {
            cells: ["Schizophrenia", "Hallucinations and delusions"],
            noteAmber: "CDS 2026 (II): schizophrenia is associated with hallucination, not multiple personalities.",
            pyqExampleId: "ef6b9f4a-05b4-4fa8-9f77-fb00b046783f",
          },
        ],
      },
      pyqExampleId: "4112f18f-aa1b-488d-ab47-b3de5c42137f",
      selfCheckExample: {
        prompt: "After an injury to the back of his head, a man can think and speak clearly but keeps losing his balance and staggers when he walks. Which part of the brain is probably damaged?",
        steps: [
          "Thinking and speech are the work of the cerebrum, and these are unharmed.",
          "Balance and smooth, coordinated movement are controlled by the cerebellum, in the hindbrain at the back of the head.",
        ],
        answer: "The cerebellum.",
      },
      practiceSet: [
        { prompt: "Which part of the brain controls heartbeat and breathing?", answer: "The medulla" },
        { prompt: "Which cells of the retina detect colour?", answer: "Cones" },
        { prompt: "Which part of the retina gives the sharpest vision?", answer: "The fovea (yellow spot)" },
        { prompt: "In a reflex arc, which neuron carries the message from the spinal cord to the muscle?", answer: "The motor neuron" },
      ],
      traps: [
        {
          title: "Blind spot, not fovea",
          body: "The **fovea** is the **best** seeing point, packed with cones. The **blind spot** has **no** photoreceptors, because the optic nerve leaves there.",
        },
        {
          title: "Schizophrenia is not split personality",
          body: "Schizophrenia means hallucinations and delusions. 'Multiple personalities' is a different disorder, and schizophrenia is influenced by surroundings and stress, not by genes alone.",
        },
        {
          title: "Sensory in, motor out",
          body: "In a reflex arc the **sensory** neuron comes first, from the receptor, and the **motor** neuron last, to the effector. An order that starts with a motor neuron is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-hormones",
      name: "Endocrine glands and their hormones",
      intuition:
        "Hormones are chemical messengers poured straight into the blood by glands that have no ducts. Each one acts on particular organs far from the gland. The pituitary, a single small gland under the brain, controls many of the others. Insulin from the pancreas lets cells take in sugar, and the thyroid needs iodine from food to make its hormone.",
      definition:
        "The main endocrine glands:\n" +
        "- **Pituitary**: one **single** gland at the base of the brain; the **master gland**. Makes **growth hormone** and hormones that control other glands, such as TSH for the thyroid.\n" +
        "- **Thyroid** (in the neck): **thyroxine**, which controls the rate of metabolism. It needs **iodine**; too little iodine gives **goitre**.\n" +
        "- **Pancreas** (islets of Langerhans): **insulin**, which lets body cells **take up glucose** and so lowers blood sugar. Too little insulin causes **diabetes**.\n" +
        "- **Adrenal glands** (a pair, on top of the kidneys): **adrenaline**, for emergencies.\n" +
        "- **Testes** (a pair): **testosterone**. **Ovaries** (a pair): **oestrogen**.",
      table: {
        columns: ["Gland", "Hormone", "What it does"],
        rows: [
          {
            cells: ["Pituitary (single)", "Growth hormone, TSH and others", "Controls growth and other glands"],
            noteAmber: "CDS 2020 (I): the pituitary is the one gland that is not paired; adrenals, testes and ovaries are.",
            pyqExampleId: "2945c168-8bc5-4ad6-98c8-7b727b077e3b",
          },
          {
            cells: ["Thyroid", "Thyroxine", "Controls metabolism; needs iodine"],
            noteAmber: "CDS 2023 (I): iodine is what the thyroid needs to make thyroxin.",
            pyqExampleId: "cf6bb995-6216-44cc-96b4-a6f8cd1526dd",
          },
          {
            cells: ["Pancreas", "Insulin", "Lets cells take up glucose; lowers blood sugar"],
            noteAmber: "CDS 2016 (II): insulin, not GH, TSH or cortisol, is essential for glucose uptake by cells.",
            pyqExampleId: "3e8b4723-47b6-4b18-b2ae-495dff79d5e8",
          },
          { cells: ["Adrenals (pair)", "Adrenaline", "Prepares the body for an emergency"] },
          { cells: ["Testes (pair)", "Testosterone", "Male characters"] },
          { cells: ["Ovaries (pair)", "Oestrogen", "Female characters"] },
        ],
      },
      pyqExampleId: "cf6bb995-6216-44cc-96b4-a6f8cd1526dd",
      selfCheckExample: {
        prompt: "After meals a man's blood sugar stays very high, yet his muscles are short of glucose. Which hormone is he short of, and which gland makes it?",
        steps: [
          "Glucose in the blood can enter muscle and fat cells only when insulin is present.",
          "Without enough insulin the sugar stays in the blood and the cells go short: this is diabetes.",
        ],
        answer: "Insulin, made by the pancreas.",
      },
      practiceSet: [
        { prompt: "Which gland is called the master gland?", answer: "The pituitary" },
        { prompt: "Which hormone prepares the body for an emergency?", answer: "Adrenaline" },
        { prompt: "Which disease is caused when the pancreas makes too little insulin?", answer: "Diabetes" },
        { prompt: "What do we call glands that pour their hormones straight into the blood, with no ducts?", answer: "Endocrine glands" },
      ],
      traps: [
        {
          title: "The pituitary is single",
          body: "Adrenals, testes and ovaries come in **pairs**. The **pituitary**, at the base of the brain, is one gland.",
        },
        {
          title: "Iodine, not common salt",
          body: "Thyroxine is built with **iodine**. Plain salt (NaCl) only helps because it is iodised; KCl and cholesterol play no part.",
        },
      ],
    },
  ],
};
