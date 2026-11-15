import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_NC_BRAIN_NOTE: SubtopicNote = {
  subtopicName: "Brain and Eye",
  title: "Brain and Eye",
  oneLineDefinition:
    "The coverings of the brain, the parts of the forebrain, midbrain and hindbrain with the work NCERT gives each, which parts make the brain stem, and the parts of the human eye.",
  whyItMatters:
    "Five NEET questions, from 2023 to 2026. Four are on the brain: the limbic system (NEET 2023), two in NEET 2024 on the hindbrain and the brain stem, and the meninges (Re-NEET 2026). The fifth matched the parts of the eye in NEET 2023; the eye was cut from the rationalised NCERT book, and none has been asked since 2023.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzonc-forebrain",
      name: "The coverings of the brain and the forebrain",
      intuition:
        "The brain is the body's control room, so it is packed safely inside the skull and wrapped in three sheets, like a parcel in three layers of paper. Its largest part, the cerebrum, does the thinking. Tucked under it are two small but busy centres: the thalamus, which relays signals, and the hypothalamus, which keeps the body's temperature, hunger and thirst in check. Deep inside, the limbic system handles feelings.",
      definition:
        "The brain and its coverings:\n" +
        "- The brain is the **central information processing organ**: the command and control system. It controls voluntary movements, the balance of the body, the working of vital involuntary organs (lungs, heart, kidneys), thermoregulation, hunger and thirst, the **circadian (24-hour) rhythms**, the activities of several endocrine glands and human behaviour. It is also the site for processing vision, hearing, speech, memory, intelligence, emotions and thoughts.\n" +
        "- The brain is protected by the **skull**. Inside the skull it is covered by the **cranial meninges**: an outer **dura mater**, a very thin middle **arachnoid**, and an inner **pia mater**, which is in contact with the brain tissue.\n" +
        "- The brain has three major parts: the **forebrain**, the **midbrain** and the **hindbrain**.\n\n" +
        "The forebrain (cerebrum, thalamus, hypothalamus):\n" +
        "- The **cerebrum** forms the major part of the brain. A deep cleft divides it lengthwise into the **left and right cerebral hemispheres**, joined by a tract of nerve fibres, the **corpus callosum**.\n" +
        "- The layer of cells covering each hemisphere is the **cerebral cortex**, thrown into prominent folds. It is called **grey matter** because the neuron cell bodies concentrated there give it a greyish look.\n" +
        "- The cortex has **motor areas**, **sensory areas** and large regions that are neither clearly sensory nor motor. These **association areas** handle complex functions like intersensory associations, memory and communication.\n" +
        "- The fibres of the tracts are covered with a **myelin sheath** and form the inner part of the hemisphere. They look opaque white, so this layer is the **white matter**.\n" +
        "- The cerebrum wraps around the **thalamus**, a major coordinating centre for **sensory and motor signalling**.\n" +
        "- The **hypothalamus** lies at the base of the thalamus. Its centres control **body temperature** and the **urge for eating and drinking**. It also has groups of **neurosecretory cells** that secrete **hypothalamic hormones**.\n" +
        "- The inner parts of the cerebral hemispheres and associated deep structures like the **amygdala** and the **hippocampus** form the **limbic lobe or limbic system**. Along with the hypothalamus, it regulates **sexual behaviour**, the expression of emotional reactions (excitement, pleasure, rage and fear) and **motivation**.",
      table: {
        columns: ["Part", "What NCERT says"],
        rows: [
          {
            cells: ["Cranial meninges", "Three coverings of the brain inside the skull: outer dura mater, very thin middle arachnoid, inner pia mater touching the brain tissue"],
            noteAmber: "Re-NEET 2026: the pericardium, the bag around the heart, was the one option that is not part of the central neural system.",
            pyqExampleId: "7102f76e-bb3a-47c1-b7a9-de96b4324f52",
          },
          { cells: ["Cerebrum", "The major part of the brain, split by a deep cleft into left and right cerebral hemispheres"] },
          { cells: ["Corpus callosum", "The tract of nerve fibres that connects the two cerebral hemispheres"] },
          { cells: ["Cerebral cortex", "Folded outer layer of cells; grey matter, because neuron cell bodies are concentrated there"] },
          { cells: ["White matter", "Inner part of the hemisphere: tract fibres covered with myelin sheath, opaque white"] },
          { cells: ["Association areas", "Neither clearly sensory nor motor; intersensory associations, memory and communication"] },
          { cells: ["Thalamus", "Wrapped by the cerebrum; a major coordinating centre for sensory and motor signalling"] },
          { cells: ["Hypothalamus", "At the base of the thalamus; controls body temperature and the urge for eating and drinking; neurosecretory cells secrete hypothalamic hormones"] },
          {
            cells: ["Limbic system", "Inner parts of the hemispheres with the amygdala, hippocampus and others; with the hypothalamus, regulates sexual behaviour, emotional reactions and motivation"],
            noteAmber: "NEET 2023: sexual behaviour and the expression of excitement, pleasure, rage and fear were credited to the limbic system and hypothalamus together.",
          },
        ],
        caption: "The brain's coverings and the parts of the forebrain (NCERT).",
      },
      pyqExampleId: "8f3623e2-5cc9-45d5-8a99-bab0616ce04f",
      selfCheckExample: {
        prompt: "Why is the outer layer of the cerebrum called grey matter, while the layer beneath it is called white matter?",
        steps: [
          "The cerebral cortex is the outer layer, and neuron cell bodies are concentrated there, which gives it a greyish look.",
          "The inner layer is made of tract fibres covered with myelin sheath, which look opaque white.",
        ],
        answer: "The cortex is grey because of its neuron cell bodies; the inner layer is white because of its myelinated fibres.",
      },
      practiceSet: [
        { prompt: "Name the three cranial meninges from the outermost to the innermost.", answer: "Dura mater, arachnoid, pia mater" },
        { prompt: "Which part of the forebrain is a major coordinating centre for sensory and motor signalling?", answer: "The thalamus" },
        { prompt: "What hormones do the neurosecretory cells of the hypothalamus secrete?", answer: "Hypothalamic hormones" },
        { prompt: "Which regions of the cerebral cortex are responsible for intersensory associations, memory and communication?", answer: "The association areas" },
        { prompt: "What are the three major parts of the human brain?", answer: "The forebrain, the midbrain and the hindbrain" },
      ],
      traps: [
        {
          title: "The arachnoid is the middle covering",
          body: "The meninges run **dura mater** (outer), **arachnoid** (very thin, middle), **pia mater** (inner, in contact with the brain). The **pericardium** covers the heart, not the brain.",
        },
        {
          title: "Grey outside, white inside",
          body: "In the cerebrum the **cortex** (outer) is **grey matter**, made of neuron cell bodies. The **white matter** (inner) is myelinated fibres.",
        },
        {
          title: "Emotions need the limbic system and the hypothalamus",
          body: "NCERT credits sexual behaviour, emotional reactions and motivation to the **limbic system along with the hypothalamus**. The corpus callosum only joins the hemispheres, and the corpora quadrigemina are in the midbrain.",
        },
        {
          title: "Body temperature is the hypothalamus",
          body: "The centres for **body temperature** and the **urge for eating and drinking** are in the **hypothalamus**, not the cerebellum or the medulla.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzonc-brainstem",
      name: "The midbrain, the hindbrain and the brain stem",
      intuition:
        "Below the forebrain the brain narrows into a stalk that joins the spinal cord. That stalk, the brain stem, is three parts stacked one on another: the midbrain, the pons and the medulla. Behind it sits the cerebellum, deeply folded to fit in more neurons. The medulla, the lowest part, runs the jobs you never think about, such as breathing.",
      definition:
        "The midbrain:\n" +
        "- The midbrain lies **between the thalamus and hypothalamus** of the forebrain and the **pons** of the hindbrain.\n" +
        "- A canal called the **cerebral aqueduct** passes through it.\n" +
        "- Its dorsal portion consists mainly of **four round swellings** (lobes) called the **corpora quadrigemina**.\n\n" +
        "The hindbrain (pons, cerebellum, medulla):\n" +
        "- The **pons** consists of fibre tracts that **interconnect different regions of the brain**.\n" +
        "- The **cerebellum** has a very **convoluted surface**, to provide additional space for many more neurons.\n" +
        "- The **medulla** (medulla oblongata) is connected to the **spinal cord**. It contains centres that control **respiration, cardiovascular reflexes and gastric secretions**.\n\n" +
        "The brain stem:\n" +
        "- Three major regions make up the **brain stem**: the **midbrain**, the **pons** and the **medulla oblongata**.\n" +
        "- The brain stem forms the **connections between the brain and the spinal cord**.\n" +
        "- The **cerebellum** is in the hindbrain but is **not** part of the brain stem, and the **cerebrum** belongs to the forebrain.",
      table: {
        columns: ["Part", "Region", "What NCERT says"],
        rows: [
          { cells: ["Cerebral aqueduct", "Midbrain", "A canal passing through the midbrain"] },
          { cells: ["Corpora quadrigemina", "Midbrain", "Four round swellings on the dorsal side of the midbrain"] },
          {
            cells: ["Pons", "Hindbrain", "Fibre tracts that interconnect different regions of the brain"],
            noteAmber: "NEET 2024: pons was matched with connecting different regions of the brain, beside hypothalamus, medulla and cerebellum.",
          },
          {
            cells: ["Cerebellum", "Hindbrain", "Very convoluted surface, giving additional space for many more neurons"],
            noteAmber: "NEET 2024: cerebellum was matched with additional space for neurons, posture and balance.",
          },
          { cells: ["Medulla oblongata", "Hindbrain", "Joined to the spinal cord; centres for respiration, cardiovascular reflexes and gastric secretions"] },
          {
            cells: ["Brain stem", "Midbrain and hindbrain", "Midbrain, pons and medulla oblongata; connects the brain to the spinal cord"],
            noteAmber: "NEET 2024: a statement put the cerebrum in the brain stem with the medulla and pons; that statement was false.",
            pyqExampleId: "7a72b2be-af3a-4fd5-9e5c-20f8dd63974f",
          },
        ],
        caption: "The midbrain and the hindbrain, and the three regions of the brain stem (NCERT).",
      },
      pyqExampleId: "0fe14ecd-1b84-4e77-ba90-64c99ccf3d82",
      selfCheckExample: {
        prompt: "A part of the brain has a canal called the cerebral aqueduct running through it and four round swellings on its dorsal side. Name the part and say whether it belongs to the brain stem.",
        steps: [
          "The cerebral aqueduct passes through the midbrain, and the corpora quadrigemina are the four swellings on its dorsal side.",
          "The brain stem is made of the midbrain, the pons and the medulla oblongata.",
        ],
        answer: "It is the midbrain, and yes, it is part of the brain stem.",
      },
      practiceSet: [
        { prompt: "Between which two parts of the brain does the midbrain lie?", answer: "Between the thalamus and hypothalamus of the forebrain and the pons of the hindbrain" },
        { prompt: "Name the three parts of the hindbrain.", answer: "The pons, the cerebellum and the medulla oblongata" },
        { prompt: "Which part of the hindbrain is not part of the brain stem?", answer: "The cerebellum" },
        { prompt: "Besides respiration and gastric secretions, which reflexes are controlled by centres in the medulla?", answer: "Cardiovascular reflexes" },
        { prompt: "What does the brain stem connect?", answer: "The brain and the spinal cord" },
      ],
      traps: [
        {
          title: "The brain stem is midbrain, pons and medulla",
          body: "The **brain stem** is the **midbrain, pons and medulla oblongata**. The **cerebrum** (forebrain) and the **cerebellum** (hindbrain) are not part of it.",
        },
        {
          title: "Corpora quadrigemina are in the midbrain",
          body: "The four round swellings called **corpora quadrigemina** are on the **dorsal side of the midbrain**, not in the forebrain or the hindbrain.",
        },
        {
          title: "Pons connects, medulla controls",
          body: "The **pons** is fibre tracts that **interconnect regions of the brain**. The **medulla** holds the centres for **respiration, cardiovascular reflexes and gastric secretions**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzonc-eye",
      name: "Parts of the human eye",
      intuition:
        "The eye is built like a camera inside a ball with three walls. The tough white outer wall protects it, the middle wall carries blood and makes the coloured iris that sets the size of the opening, and the inner wall, the retina, is the film that senses light. This topic was cut from the rationalised NCERT book, so these facts come from the earlier edition of the same chapter.",
      definition:
        "From the earlier NCERT edition of this chapter:\n" +
        "- The adult eye ball is nearly spherical, and its wall has **three layers**.\n" +
        "- The **external layer** is **dense connective tissue**, the **sclera**. Its anterior portion is the **cornea**.\n" +
        "- The **middle layer**, the **choroid**, has many blood vessels and looks **bluish**. It is thin over the posterior two-thirds of the eye ball and thickens in front to form the **ciliary body**, which continues forward as the pigmented, opaque **iris**, the **visible coloured portion** of the eye.\n" +
        "- The transparent crystalline **lens** is held by ligaments attached to the ciliary body. In front of the lens is an aperture, the **pupil**, surrounded by the iris; the muscle fibres of the iris **regulate the diameter of the pupil**.\n" +
        "- The **inner layer**, the **retina**, has three layers of neural cells, from inside to outside: **ganglion cells, bipolar cells and photoreceptor cells**.\n" +
        "- There are two kinds of photoreceptor: **rods** and **cones**. **Cones** give daylight (photopic) vision and colour vision; **rods** give twilight (scotopic) vision. Rods hold a purplish-red protein, **rhodopsin** (visual purple), which contains a derivative of **vitamin A**. There are **three types of cones**, responding to **red, green and blue** light.\n" +
        "- The optic nerve leaves the eye, and the retinal blood vessels enter it, at a point where there are **no photoreceptor cells**: the **blind spot**.\n" +
        "- Lateral to the blind spot is a yellowish pigmented spot, the **macula lutea**, with a central pit, the **fovea**. The fovea is a thinned-out part of the retina where **only cones are densely packed**, and it is the point of **greatest visual acuity (resolution)**.\n" +
        "- The space between the cornea and the lens is the **aqueous chamber**, holding a thin watery **aqueous humor**. The space between the lens and the retina is the **vitreous chamber**, filled with a transparent gel, the **vitreous humor**.",
      table: {
        columns: ["Part", "What it is"],
        rows: [
          {
            cells: ["Sclera", "External layer of the eye ball, made of dense connective tissue; its front part is the cornea"],
            noteAmber: "NEET 2023: sclera, fovea, iris and blind spot were matched with their descriptions.",
          },
          { cells: ["Choroid", "Middle layer with many blood vessels; looks bluish; thickens in front into the ciliary body"] },
          { cells: ["Iris", "Pigmented, opaque, visible coloured portion of the eye; its muscle fibres regulate the diameter of the pupil"] },
          { cells: ["Retina", "Inner layer: ganglion cells, bipolar cells and photoreceptor cells, from inside to outside"] },
          { cells: ["Rods", "Twilight (scotopic) vision; contain rhodopsin, a derivative of vitamin A"] },
          { cells: ["Cones", "Daylight (photopic) and colour vision; three types, for red, green and blue light"] },
          { cells: ["Blind spot", "Where the optic nerve leaves the eye ball; no photoreceptor cells"] },
          { cells: ["Fovea", "Central pit of the macula lutea; only cones, densely packed; greatest visual acuity"] },
          { cells: ["Aqueous humor", "Thin watery fluid between the cornea and the lens"] },
          { cells: ["Vitreous humor", "Transparent gel between the lens and the retina"] },
        ],
        caption: "The parts of the human eye, from the earlier NCERT edition of this chapter.",
      },
      pyqExampleId: "a6758bcc-bbda-4cb4-85f7-83666efaf623",
      selfCheckExample: {
        prompt: "In dim evening light we still see shapes but not colours. Which photoreceptors are doing the work, and which pigment do they hold?",
        steps: [
          "Twilight (scotopic) vision is the work of the rods; cones give daylight and colour vision.",
          "Rods contain rhodopsin, or visual purple, which contains a derivative of vitamin A.",
        ],
        answer: "The rods, which hold rhodopsin (visual purple), a pigment containing a derivative of vitamin A.",
      },
      practiceSet: [
        { prompt: "Name the three layers of neural cells in the retina, from inside to outside.", answer: "Ganglion cells, bipolar cells, photoreceptor cells" },
        { prompt: "What fills the space between the lens and the retina?", answer: "The vitreous humor, a transparent gel" },
        { prompt: "Which layer of the eye ball contains many blood vessels and looks bluish?", answer: "The choroid" },
        { prompt: "To which three colours of light do the three types of cones respond?", answer: "Red, green and blue" },
        { prompt: "What is the anterior portion of the sclera called?", answer: "The cornea" },
      ],
      traps: [
        {
          title: "Fovea sees best, the blind spot sees nothing",
          body: "The **fovea** has only densely packed cones and the **greatest visual acuity**. The **blind spot**, where the optic nerve leaves, has **no photoreceptor cells** at all.",
        },
        {
          title: "Rods for dim light, cones for colour",
          body: "**Rods** give **twilight** vision and carry rhodopsin. **Cones** give **daylight and colour** vision. Do not swap them.",
        },
        {
          title: "Photoreceptors are the outermost retinal layer",
          body: "From inside to outside the retina runs **ganglion cells**, **bipolar cells**, then **photoreceptor cells**. The photoreceptors are the outermost layer, not the innermost.",
        },
      ],
    },
  ],
};
