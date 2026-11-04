import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 6 Control and Coordination. Statements checked
 * against the NCERT text (definitions in the book's own words). Most-asked
 * years and marks from all 119 CBSE board past-paper questions in the bank,
 * 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Control and Coordination",
  chapterSlug: "control-and-coordination",
  source: "NCERT Science (CBSE Class 10), Chapter 6",
  keyPoints: [
    {
      term: "Neuron and synapse",
      text: "Information is picked up at the **dendrite** tips, travels as an electrical impulse to the cell body, along the **axon** to its end, where chemicals are released. These cross the gap, the **synapse**, and start an impulse in the next neuron's dendrite. So at a synapse the signal goes from the axon end of one neuron to the dendrite of the next.",
    },
    {
      term: "Reflex action and reflex arc",
      text: "A reflex action is a sudden response to a stimulus, made without thinking (pulling the hand from a hot object). Path of a reflex arc: receptor, sensory neuron, relay neuron in the spinal cord, motor neuron, effector (muscle). Reflex arcs are formed in the spinal cord, though the information also reaches the brain.",
    },
    {
      term: "Why reflex arcs evolved",
      text: "The thinking process of the brain is not fast enough for emergencies. Reflex arcs give quick responses, so they work efficiently even where there is no true thought.",
    },
    {
      term: "Central and peripheral nervous system",
      text: "The brain and spinal cord form the **central nervous system**. The **peripheral nervous system** (cranial nerves from the brain, spinal nerves from the spinal cord) connects the CNS with all other parts of the body. Sensory nerves carry messages to the CNS; motor nerves carry them to muscles and glands.",
    },
    {
      term: "Fore-brain",
      text: "The main thinking part: it receives sensory impulses, has separate areas for hearing, smell and sight, stores information, and controls voluntary actions (picking up a pencil, writing). It also has the centre for hunger (feeling full).",
    },
    {
      term: "Mid-brain and hind-brain",
      text: "Involuntary actions such as blood pressure, salivation and vomiting are controlled by the **medulla** in the hind-brain. The **cerebellum** (hind-brain) controls precision of voluntary actions, posture and balance: walking in a straight line, riding a bicycle. Pons is also in the hind-brain.",
    },
    {
      term: "Protection of brain and spinal cord",
      text: "The brain sits inside a bony box (the skull), in a fluid-filled balloon that absorbs shocks. The spinal cord is protected by the vertebral column (backbone).",
    },
    {
      term: "How muscles move",
      text: "Muscle cells have special proteins that change their shape and arrangement in response to nerve impulses. This makes the muscle shorten, and the body part moves.",
    },
    {
      term: "Immediate response in plants",
      text: "Leaves of the sensitive plant (chhui-mui) fold quickly on touch with no growth involved. Plants have no nervous or muscle tissue; cells pass the information by electrical-chemical means and change shape by changing the amount of water in them, so the leaves droop.",
    },
    {
      term: "Tropic movements",
      text: "Directional growth towards or away from a stimulus. Shoots bend towards light (positive phototropism), roots grow down (positive geotropism) and towards water (hydrotropism); pollen tubes grow towards ovules (chemotropism). Pea tendrils coil around a support: the side touching it grows less than the side away from it.",
    },
    {
      term: "Plant hormones",
      text: "**Auxin**, made at the shoot tip, diffuses to the shady side and makes those cells grow longer, so the shoot bends towards light. **Gibberellins** help stem growth. **Cytokinins** promote cell division (high in fruits and seeds). **Abscisic acid** inhibits growth and causes wilting of leaves.",
    },
    {
      term: "Limits of electrical impulses",
      text: "Impulses reach only cells connected by nervous tissue, and a cell needs time to reset before making a new one, so it cannot send impulses continuously. Hormones, carried in blood, reach every cell and give wide-ranging, slower, longer-lasting changes.",
    },
    {
      term: "Adrenaline",
      text: "Secreted by the adrenal glands into the blood in a scary (fight or flight) situation. The heart beats faster, giving more oxygen to the muscles; blood to the digestive system and skin is reduced and diverted to skeletal muscles; the breathing rate rises as the diaphragm and ribs move faster.",
    },
    {
      term: "Other hormones and feedback",
      text: "Thyroid: thyroxin, which needs iodine (lack causes goitre, so use iodised salt). Pituitary: growth hormone (lack in childhood: dwarfism). Pancreas: insulin controls blood sugar (lack: diabetes). Testes: testosterone; ovaries: oestrogen. **Feedback:** if blood sugar rises, the pancreas makes more insulin; as it falls, less.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Structure of neuron (Figure 6.1)",
      labels: ["dendrite", "cell body with nucleus", "axon", "nerve ending", "synapse"],
    },
    {
      title: "Reflex arc (Figure 6.2)",
      labels: ["receptor in skin", "sensory neuron", "relay neuron in spinal cord", "motor neuron", "effector (muscle in arm)"],
    },
    {
      title: "Human brain (Figure 6.3)",
      labels: ["fore-brain (cerebrum)", "mid-brain", "hind-brain: cerebellum, pons, medulla", "pituitary gland", "spinal cord"],
    },
    {
      title: "Response of the plant to the direction of light (Figure 6.5)",
      labels: ["conical flask with water", "wire mesh", "shoot bending towards light", "roots bending away from light"],
    },
    {
      title: "Endocrine glands in human beings (Figure 6.7)",
      labels: ["hypothalamus, pituitary, pineal", "thyroid, parathyroid", "thymus", "adrenal, pancreas", "testes (male), ovaries (female)"],
    },
  ],
  mostAsked: [
    {
      topic: "Hormones in animals: adrenaline in a scary situation, thyroxin and iodine (goitre), growth hormone, insulin (diabetes), feedback mechanism, glands",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Tropic movements and the sensitive plant: phototropism, geotropism, hydrotropism, chemotropism (pollen tube), tendrils; touch vs growth movement",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Human brain: functions of fore-brain, cerebellum and medulla; voluntary and involuntary actions; protection of brain and spinal cord",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Neurons and nerves: parts of a neuron, path of an impulse, synapse, receptors, CNS and PNS, why chemical signals are also needed",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Plant hormones: auxin and phototropism, gibberellins, cytokinins, abscisic acid",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Reflex action and reflex arc: define it, trace the path (touching a hot object, sneezing), why reflex arcs evolved",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Synapse direction",
      body: "The chemical signal goes from the **axon** ending of one neuron to the **dendrite** of the next, never backwards. Inside a neuron the impulse goes dendrite, cell body, axon, nerve ending.",
    },
    {
      title: "Cerebellum and medulla swapped",
      body: "Cerebellum: posture, balance, precise voluntary actions (cycling, walking straight). Medulla: involuntary actions (blood pressure, salivation, vomiting). Thinking and voluntary actions: fore-brain.",
    },
    {
      title: "Calling the sensitive plant tropic",
      body: "The touch movement of chhui-mui is quick, needs no growth and does not depend on direction. A tropic movement is slow, by growth, and towards or away from the stimulus.",
    },
    {
      title: "Wrong direction for auxin",
      body: "Auxin moves to the **shady** side, so that side grows more and the shoot bends towards light. Roots are negatively phototropic.",
    },
    {
      title: "Naming a hormone without its gland",
      body: "Write both: adrenaline from the adrenal glands (on top of the kidneys), thyroxin from the thyroid, growth hormone from the pituitary, insulin from the pancreas. Pituitary and pineal are the glands in the brain.",
    },
  ],
};

export default sheet;
