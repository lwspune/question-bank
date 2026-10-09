import type { SubtopicNote } from "@/app/notes/_types";

const NA = "\\(\\mathrm{Na^+}\\)";
const K = "\\(\\mathrm{K^+}\\)";
const CA = "\\(\\mathrm{Ca^{2+}}\\)";

export const IMAT_BIO_HAP_NERVES_MUSCLES_NOTE: SubtopicNote = {
  subtopicName: "Nerve Impulses and Muscle",
  title: "Nerve Impulses, Synapses, Reflexes and Muscle Contraction",
  oneLineDefinition:
    "Ions moving through gated channels make the nerve impulse, a chemical crosses each synapse, and in a muscle, calcium lets myosin pull actin filaments along.",
  whyItMatters:
    "This is the most tested part of the chapter. The 2023 and 2025 papers asked the order of events after acetylcholine reaches a muscle, what calcium binds to and what ATP does to actin and myosin. Earlier papers asked about conduction speed (2011), reflex arcs (2012), one-way synapses (2014), action potentials (2015, 2016, 2017), sarcomere bands (2015, 2019) and the autonomic system (2019, 2022).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-action-potential",
      name: "Resting potential, action potential and conduction speed",
      intuition:
        "A resting neurone is like a charged battery: pumps keep the inside negative. When a stimulus pushes the voltage past a threshold, sodium channels fly open, sodium rushes in, and the inside briefly turns positive. That flip spreads along the axon like a falling row of dominoes.",
      definition:
        `**Resting potential** (about \\(-70\\ \\text{mV}\\), inside negative) is set up by three processes together: the **${NA}/${K} pump** (active transport, using ATP from respiration) moves 3 ${NA} out for every 2 ${K} in; ${K} then leaks out through open channels by **facilitated diffusion**; and the membrane is much less permeable to ${NA}.\n` +
        "- An action potential is **all-or-nothing**: below threshold nothing happens, above it the size is always the same. A stronger stimulus gives more impulses per second, not bigger ones.\n" +
        "- The **refractory period** (sodium channels cannot reopen at once) keeps impulses separate and makes them travel one way along the axon.\n" +
        "- **Speed**: faster in **myelinated** axons, where the impulse jumps between the **nodes of Ranvier** (saltatory conduction); faster in **wider** axons; faster at higher temperature. The length of the axon does not change the speed, and synapses slow transmission down.\n" +
        `- Local anaesthetics block voltage-gated ${NA} channels, so the membrane is harder to depolarise and no impulse reaches the brain.`,
      table: {
        columns: ["Stage", "Membrane potential", "What the ions do"],
        rows: [
          { cells: ["Resting", "About \\(-70\\ \\text{mV}\\)", `Pump moves ${NA} out and ${K} in; ${K} leaks out`] },
          { cells: ["Depolarisation", "Rises past threshold (about \\(-55\\ \\text{mV}\\)) to about \\(+30\\ \\text{mV}\\)", `Voltage-gated ${NA} channels open; ${NA} floods in`] },
          { cells: ["Repolarisation", "Falls back towards \\(-70\\ \\text{mV}\\)", `${NA} channels close; voltage-gated ${K} channels open; ${K} flows out`] },
          { cells: ["Hyperpolarisation", "Briefly below resting, about \\(-80\\ \\text{mV}\\)", `${K} channels are slow to close`] },
          { cells: ["Refractory period", "Returning to rest", `${NA} channels cannot reopen yet`] },
        ],
      },
      selfCheckExample: {
        prompt: "A toxin blocks voltage-gated potassium channels in an axon but leaves the sodium channels working. What is the most likely effect?",
        options: [
          "Repolarisation is slowed, so each action potential lasts longer",
          "The axon can no longer depolarise",
          "The resting potential becomes positive",
          "Impulses travel along the axon faster",
          "The sodium-potassium pump stops",
        ],
        steps: [
          "Depolarisation needs only the sodium channels, so it still happens. Repolarisation needs potassium to flow out through voltage-gated channels; with them blocked, the membrane returns to rest slowly.",
          "B would follow from blocking sodium channels. The pump and leak channels still set a negative resting potential (C, E). Nothing here speeds conduction (D).",
        ],
        answer: "(A) Repolarisation is slowed, so each action potential lasts longer",
      },
      practiceSet: [
        { prompt: "What is the resting potential of a typical neurone?", answer: "About \\(-70\\ \\text{mV}\\)" },
        { prompt: "Which ions enter the axon during depolarisation?", answer: "Sodium ions" },
        { prompt: "Why do myelinated axons conduct faster?", answer: "The impulse jumps from node to node (saltatory conduction)" },
        { prompt: "How many sodium ions does the pump move out for every two potassium ions moved in?", answer: "Three" },
      ],
      traps: [
        {
          title: "Synapses and long axons do not speed up transmission",
          body: "Myelin, nodes of Ranvier and a wider axon all increase speed. A longer axon only means a longer journey, and each synapse adds a delay because a chemical must diffuse across the gap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-synapse",
      name: "The cholinergic synapse and the neuromuscular junction",
      intuition:
        "Two neurones do not touch: there is a tiny gap. The electrical signal is turned into a chemical one, the chemical drifts across, and on the other side it is turned back into an electrical signal. Because only one side can release the chemical and only the other side can detect it, the signal goes one way.",
      definition:
        "A **cholinergic** synapse uses **acetylcholine (ACh)** as its neurotransmitter.\n" +
        "- Transmission is **one way** because vesicles of ACh are only in the presynaptic knob (released by exocytosis) and the ACh receptors and their linked ion channels are only on the postsynaptic membrane. The enzyme that breaks ACh down only stops the signal; it is not what makes it one way.\n" +
        "- **Summation**: several small inputs, from different neurones at once (spatial) or one neurone firing quickly (temporal), may add up to reach threshold. Inhibitory synapses make the postsynaptic cell harder to excite.\n" +
        "- The **neuromuscular junction** is a synapse between a motor neurone and a muscle fibre. It uses ACh and is always excitatory.\n" +
        "- Drugs act here: curare blocks ACh receptors (paralysis); nerve gases and some insecticides block acetylcholinesterase, so ACh stays and muscles go into spasm.",
      table: {
        columns: ["Step", "Event"],
        rows: [
          { cells: ["1", "An action potential arrives at the presynaptic knob"] },
          { cells: ["2", `Voltage-gated ${CA} channels open and ${CA} diffuses into the knob`] },
          { cells: ["3", "Vesicles fuse with the membrane and release ACh into the cleft by exocytosis"] },
          { cells: ["4", "ACh diffuses across the cleft and binds receptors on the postsynaptic membrane"] },
          { cells: ["5", `${NA} channels linked to the receptors open; ${NA} enters and the membrane depolarises; at threshold a new action potential starts`] },
          { cells: ["6", "Acetylcholinesterase hydrolyses ACh; the choline is taken back and ACh is remade using ATP"] },
        ],
      },
      selfCheckExample: {
        prompt: "An insecticide inhibits acetylcholinesterase. What happens at the neuromuscular junctions of an exposed insect?",
        options: [
          "Acetylcholine is no longer released",
          "Calcium cannot enter the presynaptic knob",
          "Acetylcholine stays in the cleft, so the muscle fibre keeps being stimulated and goes into spasm",
          "The receptors are blocked, so the muscle stays relaxed",
          "Impulses start to travel backwards across the synapse",
        ],
        steps: [
          "Acetylcholinesterase normally removes ACh within milliseconds. Without it ACh keeps binding the receptors, so the muscle fibre is stimulated again and again.",
          "Release and calcium entry are upstream and unaffected (A, B). D describes curare, the opposite effect. The one-way structure is unchanged (E).",
        ],
        answer: "(C) Acetylcholine stays in the cleft, so the muscle fibre keeps being stimulated and goes into spasm",
      },
      practiceSet: [
        { prompt: "Which ion entering the knob triggers the release of neurotransmitter?", answer: "Calcium ions" },
        { prompt: "Which enzyme breaks down acetylcholine in the cleft?", answer: "Acetylcholinesterase" },
        { prompt: "Why can an impulse cross a synapse in only one direction?", answer: "Vesicles are only presynaptic and receptors only postsynaptic" },
      ],
      traps: [
        {
          title: "Breaking down the transmitter is not what makes a synapse one-way",
          body: "Acetylcholinesterase ends each signal so the next one can be told apart. Direction comes from where things are: transmitter release on one side, receptors and their ion channels on the other.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-reflex-autonomic",
      name: "Reflex arcs and the sympathetic and parasympathetic systems",
      intuition:
        "Some responses are too urgent, or too routine, to wait for conscious thought. A reflex runs through the spinal cord and back out in a fraction of a second. The organs inside you are run by the autonomic system, whose two halves pull in opposite directions, like an accelerator and a brake.",
      definition:
        "- **Central nervous system (CNS)**: brain and spinal cord. **Peripheral nervous system**: all the nerves outside them.\n" +
        "- The **somatic** system controls skeletal muscle (voluntary); the **autonomic** system controls glands, cardiac muscle and smooth muscle (involuntary).\n" +
        "- **Reflex arc**: receptor, sensory neurone (enters the spinal cord at the back), relay neurone in the CNS, motor neurone (leaves at the front), effector. With these three neurones there are two synapses, both inside the CNS.\n" +
        "- The **sympathetic** (fight or flight) and **parasympathetic** (rest and digest) systems work in **opposition** on the same organs.\n" +
        "- Sympathetic ganglia lie close to the spinal cord (short first neurone, long second neurone); parasympathetic ganglia lie in or near the target organ (long first neurone, short second neurone).\n" +
        "- Both systems release ACh at their ganglia. At the target organ, sympathetic neurones mostly release **noradrenaline** and parasympathetic neurones release **ACh**.",
      table: {
        columns: ["Target", "Sympathetic effect", "Parasympathetic effect"],
        rows: [
          { cells: ["Heart rate", "Increases", "Decreases (vagus nerve)"] },
          { cells: ["Bronchioles", "Widen", "Narrow"] },
          { cells: ["Pupil", "Dilates", "Constricts"] },
          { cells: ["Gut movement and secretion", "Decrease", "Increase"] },
          { cells: ["Saliva", "Small amount, thick", "Large amount, watery"] },
          { cells: ["Adrenal medulla", "Stimulated to release adrenaline", "No effect"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of the following is caused by parasympathetic nerves?",
        options: [
          "The pupils dilate",
          "The heart rate rises",
          "The bronchioles widen",
          "Gut movement and saliva production increase",
          "The adrenal medulla releases adrenaline",
        ],
        steps: [
          "The parasympathetic system is the rest-and-digest system: it speeds up digestion and saliva production.",
          "All four other effects prepare the body for action and are sympathetic.",
        ],
        answer: "(D) Gut movement and saliva production increase",
      },
      practiceSet: [
        { prompt: "A reflex pathway runs through a sensory neurone, two relay neurones in a chain and a motor neurone to a muscle. How many synapses does it have in total, and how many lie inside the CNS?", answer: "Four in total; three inside the CNS (the fourth is the neuromuscular junction)" },
        { prompt: "Where are the ganglia of the parasympathetic system?", answer: "In or close to the target organ" },
        { prompt: "Which neurotransmitter do parasympathetic neurones release at the target organ?", answer: "Acetylcholine" },
        { prompt: "Which pair of systems works in opposition on the same organs?", answer: "The sympathetic and parasympathetic systems" },
      ],
      traps: [
        {
          title: "Count only the synapses inside the CNS",
          body: "The junction between the motor neurone and the muscle is a synapse too, but it lies outside the CNS. In a three-neurone reflex arc the two synapses in the spinal cord are the ones inside the CNS.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-sarcomere",
      name: "Muscle types, skeletal muscle structure and the sarcomere bands",
      intuition:
        "Skeletal muscle is built from repeating units called sarcomeres, lined up end to end. Inside each, thick and thin filaments overlap like interlocking fingers. When the muscle contracts the fingers slide further in, so the units get shorter, but no filament itself changes length.",
      definition:
        `A skeletal muscle is made of **muscle fibres** (long cells with many nuclei). Each fibre is packed with **myofibrils**, which are chains of **sarcomeres**. The fibre has many mitochondria and a **sarcoplasmic reticulum** that stores ${CA}; **T-tubules** carry the impulse into the fibre.\n` +
        "- **Thick filaments**: myosin. **Thin filaments**: actin, with the regulating proteins tropomyosin and troponin.\n" +
        "- **Sliding filament model**: in contraction the thin filaments slide between the thick ones towards the centre. The Z lines move closer and the sarcomere shortens; the filaments keep their length.\n" +
        "- **Three muscle types**: skeletal (striped, voluntary, many nuclei per cell); cardiac (striped, branched cells joined by intercalated discs, myogenic, involuntary); smooth (no stripes, spindle-shaped cells, involuntary, in the gut, airways and vessel walls).",
      table: {
        columns: ["Band or line", "What it contains", "During contraction"],
        rows: [
          { cells: ["A band", "The whole length of the thick (myosin) filaments, with overlapping actin", "Stays the same length"] },
          { cells: ["I band", "Thin (actin) filaments only", "Gets shorter"] },
          { cells: ["H zone", "Thick filaments only, in the centre", "Gets shorter and may disappear"] },
          { cells: ["Z line", "Anchors the thin filaments at each end of a sarcomere", "Z lines move closer together"] },
          { cells: ["M line", "Holds the thick filaments at the centre", "Stays at the centre"] },
        ],
        caption: "A sarcomere runs from one Z line to the next.",
      },
      selfCheckExample: {
        prompt: "Which observation gives the strongest support to the sliding filament model of contraction?",
        options: [
          "The A band gets shorter",
          "The Z lines move further apart",
          "The myosin filaments get shorter",
          "The actin filaments get longer",
          "The I band and H zone get shorter while the A band keeps its length",
        ],
        steps: [
          "If the filaments slide, the regions made of only one kind of filament (I band, H zone) shrink, while the A band, set by the length of the myosin filaments, stays the same.",
          "A, C and D would mean the filaments themselves change length, which is what the model denies. B is the opposite of what happens.",
        ],
        answer: "(E) The I band and H zone get shorter while the A band keeps its length",
      },
      practiceSet: [
        { prompt: "Which band contains only thin filaments?", answer: "The I band" },
        { prompt: "Which structure in a muscle fibre stores calcium ions?", answer: "The sarcoplasmic reticulum" },
        { prompt: "Which muscle type has intercalated discs?", answer: "Cardiac muscle" },
      ],
      traps: [
        {
          title: "The filaments slide; they do not shorten",
          body: "Actin and myosin filaments keep the same length during contraction. Only the overlap changes, so the A band, which is the length of a myosin filament, stays constant while the I band and H zone shrink.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-contraction",
      name: "From nerve impulse to cross-bridge cycle: calcium, troponin and ATP",
      intuition:
        "At rest, a protein thread (tropomyosin) covers the places on actin where myosin wants to grab. Calcium is the key: it binds troponin, which drags tropomyosin out of the way. Myosin heads then grab, pull, let go and re-cock, over and over, and each release needs a fresh ATP.",
      definition:
        "- The **myosin head** is the ATPase: it hydrolyses ATP to re-cock itself. Actin and tropomyosin have no ATPase activity.\n" +
        `- ${CA} binds **troponin**, not tropomyosin, myosin or actin.\n` +
        "- **ATP binding** to the myosin head makes it **detach** from actin. Without ATP the heads stay locked on, which is why muscles stiffen after death (rigor mortis).\n" +
        `- ATP is also needed to pump ${CA} back into the sarcoplasmic reticulum, which lets the muscle relax.\n` +
        "- In hard exercise muscles also respire anaerobically; lactate builds up and muscle pH falls, while more blood is sent to the working muscles.",
      table: {
        columns: ["Step", "Event"],
        rows: [
          { cells: ["1", "Acetylcholine at the neuromuscular junction depolarises the muscle fibre membrane (sarcolemma)"] },
          { cells: ["2", "The depolarisation spreads down the T-tubules into the fibre"] },
          { cells: ["3", `The sarcoplasmic reticulum releases ${CA}, which diffuses into the sarcoplasm`] },
          { cells: ["4", `${CA} binds troponin; troponin changes shape and moves tropomyosin off the myosin-binding sites on actin`] },
          { cells: ["5", "A myosin head, already carrying ADP and phosphate, binds actin: a cross-bridge forms"] },
          { cells: ["6", "ADP and phosphate are released and the head tilts: the power stroke pulls actin towards the centre"] },
          { cells: ["7", "A new ATP binds the head, which detaches from actin"] },
          { cells: ["8", "The head hydrolyses ATP and re-cocks, ready for the next cycle"] },
        ],
      },
      selfCheckExample: {
        prompt: "After death, ATP runs out and the muscles become rigid. Which step of the cross-bridge cycle can no longer take place?",
        options: [
          "Calcium binding to troponin",
          "Myosin heads detaching from actin",
          "Myosin heads attaching to actin",
          "Release of ADP and phosphate in the power stroke",
          "Depolarisation spreading along the T-tubules",
        ],
        steps: [
          "A myosin head lets go of actin only when a new ATP binds to it. With no ATP the heads stay attached, so the muscle locks.",
          "Attachment and the power stroke (C, D) do not need a new ATP, which is why the heads end up stuck on. Calcium binding (A) and the T-tubule signal (E) do not use ATP directly.",
        ],
        answer: "(B) Myosin heads detaching from actin",
      },
      practiceSet: [
        { prompt: "Which protein do calcium ions bind to in skeletal muscle?", answer: "Troponin" },
        { prompt: "Which protein has the ATPase activity in the cross-bridge cycle?", answer: "Myosin (its head)" },
        { prompt: "Which event comes straight after the power stroke: ATP binding to the head, or calcium binding to troponin?", answer: "ATP binding to the myosin head, which makes it detach" },
        { prompt: "What lets a muscle relax after the impulses stop?", answer: "Calcium is actively pumped back into the sarcoplasmic reticulum, and tropomyosin covers the sites again" },
      ],
      traps: [
        {
          title: "Calcium binds troponin, and ATP makes myosin let go",
          body: "Options swap troponin and tropomyosin, or claim ATP makes actin and myosin bind. The truth: calcium binds troponin, which moves tropomyosin; ATP binding releases the myosin head from actin, and its hydrolysis re-cocks the head.",
        },
      ],
    },
  ],
};
