import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_LM_MUSCLE_NOTE: SubtopicNote = {
  subtopicName: "Muscle and Muscle Contraction",
  title: "Muscle and Muscle Contraction",
  oneLineDefinition:
    "The three kinds of movement and of muscle, how a skeletal muscle fibre is built down to the sarcomere, the actin and myosin molecules, and the steps from a nerve signal to a shortened sarcomere.",
  whyItMatters:
    "Five NEET questions: NEET 2021, NEET 2023, Re-NEET 2024, NEET 2026 and Re-NEET 2026. The steps of contraction were set twice as a pick-the-correct-statements question, in Re-NEET 2024 and NEET 2026, and the band changes during contraction once, in NEET 2021.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzolm-fibre",
      name: "Movement, muscle types and the skeletal muscle fibre",
      intuition:
        "Cells and bodies move in three ways: by flowing (amoeboid), by beating cilia (ciliary) and by muscles. Muscle comes in three kinds, and the one NEET asks about most is skeletal muscle. Think of it as a cable: the whole muscle is a bundle of smaller bundles, each smaller bundle is a bundle of fibres, and each fibre is packed with thin threads called myofibrils. The stripes you see on a myofibril come from how two proteins, actin and myosin, are laid out.",
      definition:
        "Movement and muscle:\n" +
        "- **Amoeboid movement:** some specialised cells such as **macrophages and leucocytes** in blood move by **pseudopodia**, formed by streaming of protoplasm (as in *Amoeba*). Cytoskeletal elements such as **microfilaments** are also involved.\n" +
        "- **Ciliary movement:** in most internal tubular organs lined by ciliated epithelium. Cilia in the **trachea** remove dust and foreign particles from inhaled air; cilia help the **ova** pass through the female reproductive tract.\n" +
        "- **Muscular movement:** limbs, jaws, tongue. Locomotion needs the muscular, skeletal and neural systems working together.\n" +
        "- Muscle is a tissue of **mesodermal** origin and makes up about **40 to 50 per cent** of an adult human's body weight. Its properties: **excitability, contractility, extensibility and elasticity**.\n" +
        "- **Skeletal muscle:** attached to skeletal parts, **striated**, **voluntary**; used for locomotion and changes of posture.\n" +
        "- **Visceral muscle:** in the inner walls of hollow organs such as the alimentary canal and reproductive tract; **smooth (non-striated)**, **involuntary**; moves food along the gut and gametes along the genital tract.\n" +
        "- **Cardiac muscle:** the heart; cells joined in a **branching** pattern; **striated** and **involuntary**.\n" +
        "Structure of a skeletal muscle:\n" +
        "- A muscle is made of **muscle bundles (fascicles)** held together by a collagenous connective tissue layer, the **fascia**.\n" +
        "- Each fibre is lined by the **sarcolemma** around the **sarcoplasm**. The fibre has many nuclei, so it is a **syncytium**.\n" +
        "- The **sarcoplasmic reticulum** (the fibre's ER) is the **store house of calcium ions**.\n" +
        "- The sarcoplasm holds many parallel **myofibrils (myofilaments)** with alternate light and dark bands. The striations come from the distribution of **actin and myosin**.\n" +
        "- **I band (isotropic, light):** contains actin (thin filaments). **A band (anisotropic, dark):** contains myosin (thick filaments).\n" +
        "- A **Z line** (an elastic fibre) bisects each I band; the thin filaments are fixed to it. An **M line** (a thin fibrous membrane) holds the thick filaments together in the middle of the A band.\n" +
        "- The part of a myofibril between **two successive Z lines** is the **sarcomere**, the functional unit of contraction.\n" +
        "- At rest the thin filaments overlap only the ends of the thick filaments. The central part of the thick filaments left uncovered is the **H zone**.",
      table: {
        columns: ["Structure", "What NCERT says about it"],
        rows: [
          { cells: ["Fascicle", "A muscle bundle; many fascicles make one muscle"] },
          {
            cells: ["Fascia", "Collagenous connective tissue layer that holds the fascicles together"],
            noteAmber: "NEET 2023: the layer holding the bundles together is the fascia, not the fascicle, and the sarcomere lies between two Z lines, not at the M line.",
          },
          { cells: ["Sarcolemma", "Plasma membrane of a muscle fibre"] },
          { cells: ["Sarcoplasmic reticulum", "Store house of calcium ions"] },
          { cells: ["I band", "Light band with actin (thin filaments); bisected by the Z line"] },
          { cells: ["A band", "Dark band with myosin (thick filaments); M line at its middle"] },
          { cells: ["H zone", "Middle of the thick filaments not overlapped by thin filaments"] },
          { cells: ["Sarcomere", "Between two successive Z lines; the functional unit of contraction"] },
        ],
      },
      pyqExampleId: "bd025de6-102d-4afe-ae82-e17c6b3f3ad0",
      selfCheckExample: {
        prompt: "A skeletal muscle fibre is called a syncytium. What feature of the fibre earns it that name?",
        steps: [
          "A syncytium is a single mass of cytoplasm with many nuclei.",
          "The sarcoplasm of a skeletal muscle fibre contains many nuclei.",
        ],
        answer: "Its sarcoplasm has many nuclei, so the fibre is a syncytium.",
      },
      practiceSet: [
        { prompt: "Which type of movement do macrophages and leucocytes in blood show?", answer: "Amoeboid movement, by pseudopodia" },
        { prompt: "Which muscle type is striated but involuntary?", answer: "Cardiac muscle" },
        { prompt: "Name the four properties of muscle that NCERT lists.", answer: "Excitability, contractility, extensibility and elasticity" },
        { prompt: "Which line holds the thick filaments together in the middle of the A band?", answer: "The M line" },
        { prompt: "Which band of a myofibril contains actin, and what is its other name?", answer: "The I band (isotropic band)" },
      ],
      traps: [
        {
          title: "Fascia holds, fascicle is held",
          body: "A **fascicle** is a muscle bundle. The **fascia** is the collagenous layer that holds the fascicles together. A statement that calls the binding layer a fascicle is false.",
        },
        {
          title: "The sarcomere runs Z line to Z line",
          body: "The **sarcomere** is the part between **two successive Z lines**. The **M line** sits in the middle of the A band and only holds the thick filaments together.",
        },
        {
          title: "I is light and actin, A is dark and myosin",
          body: "The **I band** (isotropic) is light and holds **actin**. The **A band** (anisotropic) is dark and holds **myosin**. Swapping them is the usual wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-sliding",
      name: "Actin, myosin and the sliding filament theory",
      visualizationSlug: "imat-sarcomere",
      intuition:
        "Two kinds of filament lie side by side. The thin one, actin, carries a lock: troponin covers the spots where myosin would grab it. The thick one, myosin, sticks out little heads that can grab actin and pull. When they pull, the thin filaments slide inwards over the thick ones. Nothing gets shorter by itself; the overlap grows, so the sarcomere shortens.",
      definition:
        "The contractile proteins:\n" +
        "- Each **actin (thin) filament** is two **F (filamentous) actins** wound helically round each other. Each F actin is a polymer of **G (globular) actin** monomers.\n" +
        "- Two filaments of **tropomyosin** run close to the F actins along their length. A complex protein, **troponin**, sits at regular intervals on the tropomyosin.\n" +
        "- At rest, a **subunit of troponin masks the active binding sites for myosin** on the actin filaments.\n" +
        "- Each **myosin (thick) filament** is a polymer of many **meromyosins**. A meromyosin has a **globular head with a short arm** (the **heavy meromyosin, HMM**) and a **tail** (the **light meromyosin, LMM**).\n" +
        "- The head and short arm project outwards at regular distance and angle; this is the **cross arm**.\n" +
        "- The globular head is an **active ATPase** and has **binding sites for ATP** and **active sites for actin**.\n" +
        "The sliding filament theory:\n" +
        "- Contraction of a muscle fibre takes place by the **sliding of the thin filaments over the thick filaments**.\n" +
        "- The myosin heads pull the actin filaments towards the **centre of the A band**, and the **Z lines** attached to them are pulled inwards. The sarcomere shortens.\n" +
        "- During contraction the **I bands get reduced** while the **A bands retain their length**. The H zone, the uncovered middle of the thick filaments, also shrinks as the thin filaments slide in.\n" +
        "- The myosin head hydrolyses ATP, and later releases the **ADP and inorganic phosphate (Pi)** and goes back to its relaxed state.",
      table: {
        columns: ["During contraction", "What happens"],
        rows: [
          { cells: ["Thin (actin) filaments", "Slide over the thick filaments towards the centre of the A band"] },
          { cells: ["Z lines", "Pulled inwards, so the sarcomere shortens"] },
          { cells: ["I band", "Gets reduced"] },
          { cells: ["A band", "Retains its length"] },
          {
            cells: ["H zone", "Shrinks as the thin filaments slide in"],
            noteAmber: "NEET 2021: H zone disappears, I band reduces, myosin hydrolyses ATP and Z lines are pulled in were correct; A band widens was the false event.",
          },
          { cells: ["Myosin head", "Hydrolyses ATP, then releases ADP and Pi"] },
        ],
      },
      pyqExampleId: "08231d64-bd59-4e46-a3a5-e71c26197893",
      selfCheckExample: {
        prompt: "A meromyosin has two parts. Name each part with its short form, and say which part works as an ATPase.",
        steps: [
          "The globular head with its short arm is the heavy meromyosin (HMM).",
          "The tail is the light meromyosin (LMM).",
          "The globular head is the active ATPase, with binding sites for ATP and active sites for actin.",
        ],
        answer: "Head with short arm: heavy meromyosin (HMM); tail: light meromyosin (LMM). The head is the ATPase.",
      },
      practiceSet: [
        { prompt: "F actin is a polymer of which monomer?", answer: "G (globular) actin" },
        { prompt: "In a resting muscle, what masks the active binding sites for myosin on actin?", answer: "A subunit of troponin" },
        { prompt: "What does the sliding filament theory state?", answer: "A muscle fibre contracts by the sliding of the thin filaments over the thick filaments" },
        { prompt: "What is the cross arm of a myosin filament?", answer: "The head and short arm of a meromyosin (the HMM part) projecting outwards from the filament" },
        { prompt: "Which protein runs as two filaments close to the F actins along their whole length?", answer: "Tropomyosin" },
      ],
      traps: [
        {
          title: "The A band keeps its length",
          body: "The thick filaments do not shorten, so the **A band retains its length**. Only the **I band** (and the H zone) gets smaller. An option where the A band widens or narrows is false.",
        },
        {
          title: "Troponin masks, tropomyosin carries",
          body: "**Troponin** is the protein whose subunit **masks** the myosin binding sites at rest. **Tropomyosin** is the filament it sits on. Calcium binds to troponin, not to tropomyosin.",
        },
        {
          title: "HMM is the head, LMM is the tail",
          body: "The **heavy meromyosin** is the globular head with the short arm, and it is the ATPase. The **light meromyosin** is the tail. A pairing of the tail with ATPase activity is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzolm-signal",
      name: "From nerve signal to cross bridge: the steps of contraction",
      intuition:
        "Contraction is a chain of events, and NEET asks you to spot the broken link. The brain sends the order down a motor neuron. At the junction with the muscle a chemical messenger fires the fibre. That sets free calcium from its store, calcium takes the lock off actin, and myosin heads grab on and pull. Take the calcium away and the lock goes back on: the muscle relaxes.",
      definition:
        "The steps, in order:\n" +
        "- Contraction is **initiated by a signal sent by the CNS via a motor neuron**. A motor neuron with the muscle fibres connected to it is a **motor unit**.\n" +
        "- The junction between a motor neuron and the sarcolemma is the **neuromuscular junction (motor-end plate)**.\n" +
        "- The neural signal releases the neurotransmitter **acetylcholine**, which generates an **action potential in the sarcolemma**.\n" +
        "- The action potential spreads through the fibre and causes the **release of calcium ions into the sarcoplasm**.\n" +
        "- The rise in Ca²⁺ leads to **binding of calcium with a subunit of troponin** on the actin filaments, which **removes the masking of the active sites for myosin**.\n" +
        "- Using energy from **ATP hydrolysis**, the **myosin head binds to the exposed active sites on actin** to form a **cross bridge**. This pulls the actin towards the centre of the A band and the sarcomere shortens.\n" +
        "- The myosin releases ADP and Pi and goes back to its relaxed state. **A new ATP binds and the cross bridge is broken.** The ATP is hydrolysed again and the cycle of cross bridge formation and breakage repeats, causing further sliding.\n" +
        "- This goes on until the **Ca²⁺ is pumped back to the sarcoplasmic cisternae**, the actin filaments are masked again and the **Z lines return** to their places: **relaxation**.",
      table: {
        columns: ["Step", "What happens"],
        rows: [
          {
            cells: ["1. Signal", "CNS sends a signal through a motor neuron (not a sensory neuron)"],
            noteAmber: "Re-NEET 2024: a signal via a sensory neuron and masking of the active sites being activated were the two false statements.",
            pyqExampleId: "0b8811df-7539-4db6-af97-e94da22806ff",
          },
          {
            cells: ["2. Neuromuscular junction", "Acetylcholine is released and generates an action potential in the sarcolemma"],
            noteAmber: "Re-NEET 2026: the CNS signal works through the release of acetylcholine.",
            pyqExampleId: "a0de4ab9-e21a-4f59-90bb-49735a402a25",
          },
          { cells: ["3. Calcium release", "Ca²⁺ is released into the sarcoplasm"] },
          { cells: ["4. Unmasking", "Ca²⁺ binds a troponin subunit; the active sites for myosin are unmasked"] },
          { cells: ["5. Cross bridge", "Myosin head, using ATP energy, binds actin and pulls it towards the centre of the A band"] },
          { cells: ["6. Breaking the bridge", "A new ATP binds the myosin head and the cross bridge breaks"] },
          { cells: ["7. Relaxation", "Ca²⁺ is pumped back to the sarcoplasmic cisternae; actin is masked again; Z lines return"] },
        ],
      },
      pyqExampleId: "9e19d03e-8e77-4623-a047-aa1357db1d62",
      selfCheckExample: {
        prompt: "What is a motor unit?",
        steps: [
          "Contraction starts with a signal carried by a motor neuron.",
          "That motor neuron together with all the muscle fibres connected to it forms a motor unit.",
        ],
        answer: "A motor neuron together with the muscle fibres connected to it.",
      },
      practiceSet: [
        { prompt: "What is another name for the neuromuscular junction?", answer: "The motor-end plate" },
        { prompt: "In a contracting muscle fibre, what makes the cross bridge break?", answer: "A new ATP binding to the myosin head" },
        { prompt: "Where is Ca²⁺ pumped back to when a muscle fibre relaxes?", answer: "The sarcoplasmic cisternae (the sarcoplasmic reticulum)" },
        { prompt: "To which protein on the actin filament does Ca²⁺ bind when a muscle fibre is stimulated?", answer: "To a subunit of troponin" },
      ],
      traps: [
        {
          title: "Motor neuron, not sensory neuron",
          body: "The CNS sends the signal to the muscle through a **motor neuron**. A sensory neuron carries signals to the CNS, so a statement naming it is false.",
        },
        {
          title: "Calcium removes the mask",
          body: "At rest troponin masks the myosin binding sites. Ca²⁺ binding to troponin **removes** the masking. A statement that the masking is activated, or that Ca²⁺ inactivates actin, is false.",
        },
        {
          title: "ATP makes the bridge and also breaks it",
          body: "ATP hydrolysis gives the energy for the myosin head to bind actin. Then **a new ATP must bind** for the cross bridge to break. Relaxation comes only when Ca²⁺ is pumped back.",
        },
      ],
    },
  ],
};
