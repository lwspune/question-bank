import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_NC_NEURON_NOTE: SubtopicNote = {
  subtopicName: "Neuron and Nerve Impulse",
  title: "Neuron and Nerve Impulse",
  oneLineDefinition:
    "How the human neural system is divided, how a neuron is built and named by its fibres, how a resting neuron becomes an impulse, and how the impulse crosses a synapse.",
  whyItMatters:
    "Three NEET questions, from 2022 to 2026. The synapse was asked twice, in NEET 2022 and NEET 2026, and the parts and types of neurons once, as a match-the-columns in Re-NEET 2024.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzonc-neuron",
      name: "The neural system and the neuron",
      visualizationSlug: "neet-neuron-structure",
      intuition:
        "Think of the neural system as a telephone network. The brain and spinal cord are the exchange where messages are handled; the nerves are the wires running out to every organ. Each wire is made of neurons, long thin cells that pass a message in one direction: in through the short dendrites, through the cell body, and out along the long axon.",
      definition:
        "The neural system:\n" +
        "- The neural system is made of highly specialised cells called **neurons**, which detect, receive and transmit different kinds of stimuli. In lower invertebrates like *Hydra* it is a simple **network of neurons**; insects have a brain with a number of ganglia and neural tissues; vertebrates have a more developed system.\n" +
        "- The human neural system has two parts: the **central neural system (CNS)**, the brain and the spinal cord, which is the site of information processing and control; and the **peripheral neural system (PNS)**, all the nerves of the body associated with the CNS.\n" +
        "- PNS nerve fibres are of two types: **afferent fibres** carry impulses from tissues and organs **to the CNS**; **efferent fibres** carry regulatory impulses **from the CNS** to the peripheral tissues and organs.\n" +
        "- The PNS is divided into the **somatic neural system**, which relays impulses from the CNS to the **skeletal muscles**, and the **autonomic neural system**, which carries impulses from the CNS to the **involuntary organs and smooth muscles**. The autonomic system is further divided into the **sympathetic** and the **parasympathetic** neural system.\n\n" +
        "The neuron:\n" +
        "- A neuron has three major parts: the **cell body**, the **dendrites** and the **axon**.\n" +
        "- The cell body holds cytoplasm with the usual organelles and granular bodies called **Nissl's granules**.\n" +
        "- **Dendrites** are short, repeatedly branched fibres that also contain Nissl's granules. They carry impulses **towards** the cell body.\n" +
        "- The **axon** is a long fibre whose far end is branched. Each branch ends in a bulb-like **synaptic knob** holding **synaptic vesicles** filled with **neurotransmitters**. The axon carries impulses **away** from the cell body to a synapse or a neuro-muscular junction.\n" +
        "- **Myelinated** fibres are wrapped by **Schwann cells** that form a **myelin sheath** around the axon. The gaps between two adjacent myelin sheaths are the **nodes of Ranvier**. Myelinated fibres are found in the **spinal and cranial nerves**.\n" +
        "- An **unmyelinated** fibre is enclosed by a Schwann cell that does **not** form a myelin sheath. Such fibres are common in the **autonomous and the somatic** neural systems.",
      table: {
        columns: ["Type of neuron", "Axon and dendrites", "Where NCERT places it"],
        rows: [
          {
            cells: ["Multipolar", "One axon and two or more dendrites", "Cerebral cortex"],
            noteAmber: "Re-NEET 2024: multipolar neurons were matched with the cerebral cortex and bipolar neurons with the retina.",
          },
          { cells: ["Bipolar", "One axon and one dendrite", "Retina of the eye"] },
          { cells: ["Unipolar", "Cell body with one axon only", "Usually the embryonic stage"] },
        ],
        caption: "The three kinds of neuron, by the number of axons and dendrites (NCERT).",
      },
      pyqExampleId: "d683e04e-4c63-48b0-8387-6b13e5bac10a",
      selfCheckExample: {
        prompt: "A nerve fibre carries a message from the skin to the spinal cord. Is it afferent or efferent, and in which direction do its dendrites carry the impulse?",
        steps: [
          "Afferent fibres carry impulses from tissues and organs to the CNS, and the spinal cord is part of the CNS.",
          "In any neuron, the dendrites carry impulses towards the cell body; the axon carries them away.",
        ],
        answer: "It is afferent, and its dendrites carry the impulse towards the cell body.",
      },
      practiceSet: [
        { prompt: "What are the gaps between two adjacent myelin sheaths on an axon called?", answer: "Nodes of Ranvier" },
        { prompt: "Name the granular bodies found in the cell body and dendrites of a neuron.", answer: "Nissl's granules" },
        { prompt: "At which stage of life are unipolar neurons usually found?", answer: "The embryonic stage" },
        { prompt: "Which division of the peripheral neural system relays impulses from the CNS to the skeletal muscles?", answer: "The somatic neural system" },
        { prompt: "In which neural systems are unmyelinated nerve fibres commonly found?", answer: "The autonomous and the somatic neural systems" },
      ],
      traps: [
        {
          title: "Dendrites carry impulses in, the axon carries them out",
          body: "**Dendrites** carry impulses **towards** the cell body. The **axon** carries them **away** from the cell body, to a synapse or a neuro-muscular junction.",
        },
        {
          title: "Unmyelinated fibres still have a Schwann cell",
          body: "An unmyelinated fibre is **enclosed by a Schwann cell**; the cell simply does not form a myelin sheath. Myelinated fibres are in the **spinal and cranial nerves**; unmyelinated ones are common in the **autonomous and somatic** systems.",
        },
        {
          title: "Bipolar in the retina, multipolar in the cortex",
          body: "**Bipolar** neurons (one axon, one dendrite) are in the **retina**. **Multipolar** neurons (one axon, two or more dendrites) are in the **cerebral cortex**. **Unipolar** neurons are usually found in the **embryonic stage**.",
        },
        {
          title: "Autonomic is not the same as somatic",
          body: "The **somatic** system serves the **skeletal muscles**. The **autonomic** system serves the **involuntary organs and smooth muscles**, and it alone splits into **sympathetic** and **parasympathetic** parts.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzonc-synapse",
      name: "The nerve impulse and the synapse",
      intuition:
        "A resting neuron is like a charged battery: a pump keeps more sodium outside and more potassium inside, so the outside is positive and the inside negative. A stimulus opens the door to sodium, which rushes in and flips the charge for a moment. That flip spreads along the axon like a falling row of dominoes. At the end of the axon the message has to cross to the next neuron, either as a direct current or by a chemical messenger.",
      definition:
        "The resting neuron:\n" +
        "- Neurons are **excitable cells** because their membranes are in a **polarised** state. The neural membrane has different **ion channels**, each selectively permeable to different ions.\n" +
        "- At rest, the axonal membrane is comparatively **more permeable to K⁺** and **nearly impermeable to Na⁺**. It is also impermeable to the negatively charged proteins in the axoplasm.\n" +
        "- The **axoplasm** has a **high K⁺**, negatively charged proteins and **low Na⁺**. The fluid outside has **low K⁺ and high Na⁺**.\n" +
        "- The **sodium-potassium pump** keeps these gradients by active transport: it moves **3 Na⁺ outwards for 2 K⁺ into the cell**. So the outer surface is **positive** and the inner surface **negative**: the membrane is **polarised**. This potential difference is the **resting potential**.\n\n" +
        "The impulse:\n" +
        "- At a stimulated site the membrane becomes **freely permeable to Na⁺**. A rapid **influx of Na⁺** reverses the polarity: the outer surface turns negative and the inner surface positive. The membrane is **depolarised**, and this potential difference is the **action potential**, which is the **nerve impulse**.\n" +
        "- On the **inner** surface, current flows from the depolarised site to the site just ahead; on the **outer** surface it flows back, completing the circuit. The site ahead is depolarised in turn, and so the impulse is conducted along the axon.\n" +
        "- The rise in Na⁺ permeability is **extremely short-lived**. It is quickly followed by a rise in **K⁺ permeability**; within a fraction of a second **K⁺ diffuses outside** and the resting potential is restored.\n\n" +
        "The synapse:\n" +
        "- A **synapse** is formed by the membranes of a **pre-synaptic** and a **post-synaptic** neuron, which may or may not be separated by a gap called the **synaptic cleft**.\n" +
        "- At an **electrical synapse** the two membranes are in **very close proximity**, and electrical current flows **directly** from one neuron into the other. Transmission here is very like conduction along one axon, and it is **always faster** than across a chemical synapse. Electrical synapses are **rare** in our system.\n" +
        "- At a **chemical synapse** the membranes are separated by a **fluid-filled** synaptic cleft, and **neurotransmitters** carry the message. An arriving impulse moves the synaptic vesicles to the membrane; they fuse with it and release their neurotransmitters into the cleft.\n" +
        "- The neurotransmitters bind **specific receptors on the post-synaptic membrane**. This opens ion channels, and the entry of ions can generate a new potential in the post-synaptic neuron, which may be **excitatory or inhibitory**.",
      table: {
        columns: ["Feature", "Electrical synapse", "Chemical synapse"],
        rows: [
          { cells: ["Gap between the membranes", "Membranes in very close proximity", "A fluid-filled synaptic cleft"] },
          { cells: ["How the message crosses", "Electrical current flows directly into the next neuron", "Neurotransmitters released into the cleft"] },
          {
            cells: ["Speed", "Always faster", "Slower than an electrical synapse"],
            noteAmber: "NEET 2022: the incorrect statement claimed a chemical synapse is always faster than an electrical one.",
          },
          { cells: ["How common", "Rare in our system", "The usual kind"] },
          {
            cells: ["Where the receptors are", "No neurotransmitter is used", "Specific receptors on the post-synaptic membrane"],
            noteAmber: "NEET 2026: the receptors for neurotransmitters are on the post-synaptic membrane.",
            pyqExampleId: "59d05d56-b0b4-49cb-aab8-48b38a0990ce",
          },
        ],
        caption: "The two kinds of synapse in NCERT.",
      },
      pyqExampleId: "124254cf-bdb6-4d46-9b6e-010019c1878c",
      selfCheckExample: {
        prompt: "A resting axon is stimulated at one point. What happens to the charge on its outer surface at that point, and which ion causes the change?",
        steps: [
          "At rest the outer surface is positive and the inner surface negative.",
          "The stimulus makes the membrane freely permeable to Na⁺, and Na⁺ rushes in.",
          "This reverses the polarity, so the outer surface becomes negative and the inner surface positive.",
        ],
        answer: "The outer surface turns from positive to negative, because of a rapid influx of Na⁺ ions.",
      },
      practiceSet: [
        { prompt: "How many Na⁺ and K⁺ ions does the sodium-potassium pump move, and in which directions?", answer: "3 Na⁺ outwards for 2 K⁺ into the cell" },
        { prompt: "To which ion is the axonal membrane of a resting neuron comparatively more permeable?", answer: "K⁺" },
        { prompt: "Which ion's movement out of the axon restores the resting potential after an impulse?", answer: "K⁺" },
        { prompt: "What fills the synaptic cleft at a chemical synapse?", answer: "Fluid" },
        { prompt: "The new potential produced in a post-synaptic neuron may be of which two kinds?", answer: "Excitatory or inhibitory" },
      ],
      traps: [
        {
          title: "Sodium in makes the impulse, potassium out ends it",
          body: "The action potential comes from **Na⁺ rushing in**. The resting potential is then restored by **K⁺ diffusing out**. Neither step is the pump: the pump moves **3 Na⁺ out for 2 K⁺ in** to keep the gradients.",
        },
        {
          title: "The resting outside is positive",
          body: "A resting, polarised membrane is **positive outside and negative inside**. Only during the action potential is the outer surface negative.",
        },
        {
          title: "Electrical synapses are faster but rare",
          body: "Transmission across an **electrical** synapse is **always faster** than across a chemical one, yet electrical synapses are **rare** in our system. Neurotransmitters belong to the **chemical** synapse.",
        },
        {
          title: "Receptors sit on the post-synaptic side",
          body: "Neurotransmitters are stored in vesicles of the **pre-synaptic** axon terminal, but their **specific receptors** are on the **post-synaptic membrane**.",
        },
      ],
    },
  ],
};
