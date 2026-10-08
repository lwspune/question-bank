import type { SubtopicNote } from "@/app/notes/_types";

const CA = "\\(\\mathrm{Ca^{2+}}\\)";
const NA = "\\(\\mathrm{Na^+}\\)";

export const IMAT_BIO_HAP_BRAIN_HORMONES_NOTE: SubtopicNote = {
  subtopicName: "Brain, Senses and Hormones",
  title: "The Brain, the Eye, Hormones and Reproduction",
  oneLineDefinition:
    "Each brain region has its own jobs, the eye turns light into nerve impulses, and hormones carried in the blood control glucose, growth and the reproductive cycle.",
  whyItMatters:
    "The ministry papers asked which structure sets the circadian rhythm (2023), which hormones of the adrenal gland and pancreas work together (2023), what insulin does (2025) and which hormone drives labour (2026). Earlier papers asked about brain regions (2016, 2017), the eye and rod cells (2020, 2021), hormones in general (2012, 2017), glucose control (2011, 2014) and the menstrual cycle (2015).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-brain",
      name: "Regions of the brain and their functions",
      intuition:
        "The brain is divided into regions with different jobs. The big folded cerebrum does conscious work; the small cerebellum at the back fine-tunes movement; the brainstem keeps you alive without thinking; and the hypothalamus, deep in the middle, runs homeostasis and links the nervous system to the hormones.",
      definition:
        "- The **cerebrum** has two hemispheres joined by the **corpus callosum**; its outer layer, the cortex, handles thought, memory, language, voluntary movement and the senses.\n" +
        "- The **hippocampus** and **amygdala** lie deep inside the cerebrum: the hippocampus forms new memories, the amygdala handles emotions such as fear.\n" +
        "- The **hypothalamus** controls the pituitary gland, which hangs just below it.\n" +
        "- The **medulla oblongata** connects the brain to the spinal cord and controls heart rate, breathing and blood pressure without conscious thought.\n" +
        "- The daily (**circadian**) rhythm: a small master clock in the hypothalamus drives the **pineal gland**, which releases **melatonin** in the dark. Melatonin carries the clock's signal to the rest of the body, so the pineal gland is the gland usually named as regulating the circadian rhythm.",
      table: {
        columns: ["Region", "Main functions"],
        rows: [
          { cells: ["Cerebrum (cerebral cortex)", "Conscious thought, memory, language, voluntary movement, interpreting senses"] },
          { cells: ["Corpus callosum", "Links the left and right hemispheres"] },
          { cells: ["Hippocampus", "Forming new long-term memories"] },
          { cells: ["Amygdala", "Emotions, especially fear"] },
          { cells: ["Thalamus", "Relays sensory signals to the cortex"] },
          { cells: ["Hypothalamus", "Body temperature, water balance, hunger and thirst; controls the pituitary"] },
          { cells: ["Pineal gland", "Secretes melatonin at night; regulates the circadian rhythm of sleep"] },
          { cells: ["Cerebellum", "Balance, posture and coordination of movement"] },
          { cells: ["Medulla oblongata", "Heart rate, breathing rate, blood pressure; reflexes such as swallowing and coughing"] },
        ],
      },
      selfCheckExample: {
        prompt: "A stroke damages a patient's cerebellum. Which problem is most likely?",
        options: [
          "Poor balance and clumsy, badly coordinated movements",
          "Inability to control body temperature",
          "Irregular breathing",
          "Loss of all memories",
          "Blindness",
        ],
        steps: [
          "The cerebellum coordinates movement and keeps balance, so damage causes unsteady, clumsy movement.",
          "Temperature is the hypothalamus (B), breathing the medulla (C), memory the cerebrum and hippocampus (D), and vision the cortex at the back of the cerebrum (E).",
        ],
        answer: "(A) Poor balance and clumsy, badly coordinated movements",
      },
      practiceSet: [
        { prompt: "Which region of the brain controls the breathing rate?", answer: "The medulla oblongata" },
        { prompt: "Which structure links the two cerebral hemispheres?", answer: "The corpus callosum" },
        { prompt: "Which brain region contains the osmoreceptors that control ADH release?", answer: "The hypothalamus" },
      ],
      traps: [
        {
          title: "Cerebrum and cerebellum are easy to swap",
          body: "The cerebrum (the large upper brain) holds memory and conscious thought. The cerebellum (the small region at the back, below it) coordinates movement. Loss of memory points to the cerebrum, loss of balance to the cerebellum.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-eye",
      name: "The eye: its parts, rods and cones, and how light is detected",
      intuition:
        "The front of the eye focuses light, like a camera lens, onto the retina at the back. There, two kinds of light-sensitive cell turn light into nerve impulses: rods work in dim light but see no colour, cones need bright light but see colour and fine detail.",
      definition:
        "- **Rods**: very sensitive, work in dim light, black and white only. Many rods share one nerve pathway, so detail is poor. Their pigment is **rhodopsin**: light splits it into **opsin** and **retinal** (bleaching), which starts the signal. Retinal is made from **vitamin A** (retinol), so a lack of vitamin A causes night blindness.\n" +
        "- **Cones**: need bright light, give colour vision (three types, for red, green and blue light) and sharp detail. They are packed in the **fovea**.\n" +
        "- **Accommodation**: for a near object the ciliary muscle contracts, the suspensory ligaments slacken and the lens becomes fatter.\n" +
        "- **Pupil reflex**: in bright light the circular muscles of the iris contract and the pupil gets smaller.\n" +
        "- Impulses travel along the optic nerve to the visual cortex at the back of the cerebrum.",
      table: {
        columns: ["Part", "Function"],
        rows: [
          { cells: ["Cornea", "Transparent front; does most of the bending of light; has no blood vessels"] },
          { cells: ["Iris", "Coloured muscular ring that controls the size of the pupil"] },
          { cells: ["Lens", "Fine focusing; changes shape for near and far objects"] },
          { cells: ["Ciliary muscle and suspensory ligaments", "Change the shape of the lens"] },
          { cells: ["Retina", "Contains the rods and cones"] },
          { cells: ["Fovea", "Only cones; the sharpest vision"] },
          { cells: ["Blind spot", "Where the optic nerve leaves; no rods or cones"] },
          { cells: ["Choroid", "Blood vessels and dark pigment that stops light reflecting inside the eye"] },
          { cells: ["Sclera", "Tough white outer coat"] },
        ],
      },
      selfCheckExample: {
        prompt: "A person with a lack of vitamin A sees poorly in dim light. What is the explanation?",
        options: [
          "The cones can no longer detect colour",
          "The lens can no longer change shape",
          "Too little retinal is made, so the rods cannot rebuild enough rhodopsin",
          "The optic nerve stops carrying impulses",
          "The pupil can no longer dilate",
        ],
        steps: [
          "Dim-light vision depends on rods, and rods depend on rhodopsin, which is opsin joined to retinal. Retinal is made from vitamin A.",
          "Cones work in bright light (A). The lens, optic nerve and pupil do not depend on vitamin A in this way (B, D, E).",
        ],
        answer: "(C) Too little retinal is made, so the rods cannot rebuild enough rhodopsin",
      },
      practiceSet: [
        { prompt: "Which part of the retina contains only cones?", answer: "The fovea" },
        { prompt: "When you look at a near object, does the ciliary muscle contract or relax?", answer: "It contracts" },
        { prompt: "Which part of the retina has no light receptors at all?", answer: "The blind spot" },
        { prompt: "Into what two parts does light split rhodopsin?", answer: "Opsin and retinal" },
      ],
      traps: [
        {
          title: "Retinal, retinol, opsin and opsonin",
          body: "Light splits rhodopsin into opsin and retinal (the aldehyde). Retinol is vitamin A, the raw material. Opsonin is something different: a molecule that marks pathogens for phagocytes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-glands",
      name: "Endocrine glands, their hormones and how hormones act",
      intuition:
        "Hormones are chemical messages sent by post rather than by wire. A gland releases them into the blood, they reach every cell, but only cells with the right receptor respond. That makes hormones slower than nerves, but their effects can be widespread and long-lasting.",
      definition:
        "- **Endocrine glands** have no ducts: they release hormones directly into the blood. **Exocrine glands** (salivary glands, sweat glands, the digestive part of the pancreas) release secretions through ducts.\n" +
        "- Every hormone is a chemical. It travels at the speed of blood flow and can affect one or several target organs.\n" +
        "- **Peptide and protein hormones** (insulin, glucagon, ADH) and **amine hormones** such as adrenaline bind receptors on the cell surface and act through a second messenger such as cyclic AMP.\n" +
        "- **Steroid hormones** (cortisol, aldosterone, oestrogen, progesterone, testosterone) are lipid-soluble: they cross the membrane, bind a receptor inside the cell and change which genes are expressed.\n" +
        "- The **anterior pituitary** controls several other glands, so pituitary failure has many effects at once: no ADH means large volumes of urine, and no FSH and LH means infertility in both sexes.",
      table: {
        columns: ["Gland", "Hormone", "Chemical type", "Main effect"],
        rows: [
          { cells: ["Anterior pituitary", "FSH, LH, TSH, ACTH, growth hormone, prolactin", "Peptide and protein", "Controls the gonads, thyroid and adrenal cortex; growth; milk production"] },
          { cells: ["Posterior pituitary", "ADH and oxytocin (made in the hypothalamus)", "Peptide", "Water reabsorption in the kidney; uterine contraction and milk release"] },
          { cells: ["Thyroid", "Thyroxine; calcitonin", "Amine (contains iodine); peptide", `Raises metabolic rate; lowers blood ${CA}`] },
          { cells: ["Parathyroids", "Parathyroid hormone", "Peptide", `Raises blood ${CA}`] },
          { cells: ["Adrenal medulla", "Adrenaline", "Amine", "Fight or flight: raises heart rate, breathing rate and blood glucose"] },
          { cells: ["Adrenal cortex", "Cortisol; aldosterone", "Steroid", `Raises blood glucose in stress; increases ${NA} reabsorption`] },
          { cells: ["Pancreas (islets)", "Insulin (beta cells); glucagon (alpha cells)", "Peptide", "Lowers and raises blood glucose"] },
          { cells: ["Ovaries", "Oestrogen, progesterone", "Steroid", "Female characteristics; build and keep the uterine lining"] },
          { cells: ["Testes", "Testosterone", "Steroid", "Male characteristics; sperm production"] },
          { cells: ["Pineal gland", "Melatonin", "Amine", "Daily sleep rhythm"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which hormone is a steroid that acts by entering its target cells and binding a receptor inside them?",
        options: ["Insulin", "Adrenaline", "Glucagon", "Cortisol", "ADH"],
        steps: [
          "Cortisol, from the adrenal cortex, is a steroid. Being lipid-soluble, it crosses the membrane and binds an internal receptor.",
          "Insulin, glucagon and ADH are peptides and adrenaline is an amine; all of them bind receptors on the cell surface.",
        ],
        answer: "(D) Cortisol",
      },
      practiceSet: [
        { prompt: "Which gland releases ADH into the blood?", answer: "The posterior pituitary" },
        { prompt: "Which hormone raises the calcium concentration of the blood?", answer: "Parathyroid hormone" },
        { prompt: "What is the difference between an endocrine and an exocrine gland?", answer: "Endocrine glands secrete into the blood with no ducts; exocrine glands secrete through ducts" },
        { prompt: "Which part of the adrenal gland makes adrenaline?", answer: "The medulla" },
      ],
      traps: [
        {
          title: "Hormones do not flow down ducts",
          body: "Endocrine glands are ductless and release hormones straight into the blood. Secretions that flow down ducts, such as bile or pancreatic juice, are exocrine. Steroids such as testosterone and oestrogen are hormones too.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-glucose",
      name: "Blood glucose control: insulin, glucagon and adrenaline",
      intuition:
        "Cells need a steady supply of glucose, but meals arrive in bursts. After a meal insulin stores the extra; between meals glucagon releases the store. In an emergency adrenaline releases it too, so on raising glucose the adrenal gland and the pancreas work together.",
      definition:
        "- The islet cells of the **pancreas** detect blood glucose directly and respond by secreting hormones; the loop needs no brain.\n" +
        "- **Glycogenesis**: making glycogen from glucose. **Glycogenolysis**: breaking glycogen down to glucose. **Gluconeogenesis**: making new glucose from amino acids, lactate or glycerol.\n" +
        "- **Insulin** is a peptide hormone. It makes muscle and fat cells take up glucose (by adding glucose carriers to their membranes), drives glycogen and fat synthesis, and lowers blood glucose.\n" +
        "- **Type 1 diabetes**: the immune system destroys the beta cells, so no insulin is made. **Type 2 diabetes**: insulin is made but cells respond poorly to it.",
      table: {
        columns: ["Hormone", "Made by", "Released when", "Effects"],
        rows: [
          { cells: ["Insulin", "Beta cells of the islets", "Blood glucose is high", "Glucose uptake into muscle and fat; glycogen and fat made; blood glucose falls"] },
          { cells: ["Glucagon", "Alpha cells of the islets", "Blood glucose is low", "Liver breaks down glycogen and makes new glucose; blood glucose rises"] },
          { cells: ["Adrenaline", "Adrenal medulla", "Stress, fear or exercise", "Glycogen breakdown in liver and muscle; blood glucose rises fast"] },
          { cells: ["Cortisol", "Adrenal cortex", "Long-term stress", "Gluconeogenesis; blood glucose rises"] },
        ],
      },
      selfCheckExample: {
        prompt: "A student skips breakfast and then goes for a long run. Which change is expected?",
        options: [
          "Insulin secretion rises",
          "Alpha cells release more glucagon, and the liver breaks down glycogen to glucose",
          "Glucagon makes muscle cells take up more glucose",
          "The liver turns blood glucose into glycogen",
          "Beta cells release glucagon",
        ],
        steps: [
          "Fasting and exercise both lower blood glucose. The alpha cells respond with glucagon, and the liver breaks glycogen down (glycogenolysis).",
          "A and D are responses to high glucose. Glucose uptake into muscle is an insulin effect (C). Beta cells make insulin, not glucagon (E).",
        ],
        answer: "(B) Alpha cells release more glucagon, and the liver breaks down glycogen to glucose",
      },
      practiceSet: [
        { prompt: "Which cells make insulin?", answer: "The beta cells of the islets of Langerhans" },
        { prompt: "What is the breakdown of glycogen to glucose called?", answer: "Glycogenolysis" },
        { prompt: "Name a hormone from the adrenal gland that raises blood glucose.", answer: "Adrenaline (medulla) or cortisol (cortex)" },
      ],
      traps: [
        {
          title: "Glucagon is a hormone; glycogen is the store",
          body: "Glucagon (the hormone) causes glycogen (the stored polysaccharide) to be broken down. Insulin does the opposite: it promotes glycogen and fat synthesis and is a peptide, not a steroid, made by the pancreas, not the adrenal gland.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-reproduction",
      name: "Reproductive organs, the menstrual cycle, pregnancy and birth",
      intuition:
        "The menstrual cycle is a monthly hand-over between the pituitary and the ovary. Pituitary hormones grow an egg; the ovary's hormones build the uterine lining; a surge releases the egg; and if no embryo arrives, the hormone support collapses and the lining is shed.",
      definition:
        "- **Male**: testes (sperm made in the seminiferous tubules; testosterone from cells between them), epididymis (sperm mature and are stored), sperm duct (vas deferens), seminal vesicles and prostate (add fluid), urethra.\n" +
        "- **Female**: ovaries (eggs and hormones), oviducts (fertilisation happens here; ciliated epithelium moves the egg), uterus (lining called the endometrium), cervix, vagina.\n" +
        "- **Cycle** (about 28 days): menstruation (days 1 to 5); follicle phase (FSH grows a follicle, whose oestrogen rebuilds the lining); ovulation (about day 14); luteal phase (the empty follicle becomes the **corpus luteum**, which makes progesterone).\n" +
        "- Around ovulation **LH and FSH reach their peak**; oestrogen peaks just before and then falls; progesterone starts to rise.\n" +
        "- If no embryo implants, the corpus luteum breaks down, progesterone falls and menstruation begins. If one implants, its **hCG** keeps the corpus luteum going until the placenta takes over.\n" +
        "- **Birth**: oxytocin causes uterine contractions, which cause more oxytocin release (positive feedback).",
      table: {
        columns: ["Hormone", "Made by", "Role"],
        rows: [
          { cells: ["FSH", "Anterior pituitary", "Growth of a follicle; sperm production in males"] },
          { cells: ["LH", "Anterior pituitary", "A surge triggers ovulation and forms the corpus luteum; testosterone production in males"] },
          { cells: ["Oestrogen", "Growing follicle", "Rebuilds the uterine lining; a high level triggers the LH surge"] },
          { cells: ["Progesterone", "Corpus luteum, later the placenta", "Keeps the lining thick; inhibits FSH and LH"] },
          { cells: ["hCG", "The early embryo", "Keeps the corpus luteum alive; detected by pregnancy tests"] },
          { cells: ["Oxytocin", "Made in the hypothalamus, released by the posterior pituitary", "Uterine contractions in labour; milk release"] },
          { cells: ["Prolactin", "Anterior pituitary", "Milk production"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why does menstruation begin at the end of a cycle in which no egg was fertilised?",
        options: [
          "FSH rises sharply",
          "LH surges",
          "hCG from the embryo rises",
          "Oestrogen from the placenta falls",
          "The corpus luteum breaks down, so progesterone falls",
        ],
        steps: [
          "Progesterone from the corpus luteum keeps the lining in place. Without an embryo making hCG, the corpus luteum breaks down, progesterone falls and the lining is shed.",
          "FSH rising (A) follows menstruation and starts the next cycle. The LH surge (B) causes ovulation, mid-cycle. hCG (C) and a placenta (D) exist only in pregnancy.",
        ],
        answer: "(E) The corpus luteum breaks down, so progesterone falls",
      },
      practiceSet: [
        { prompt: "Which hormone does a pregnancy test detect?", answer: "hCG" },
        { prompt: "Which hormone surge triggers ovulation?", answer: "LH" },
        { prompt: "Where does fertilisation normally happen?", answer: "In the oviduct" },
        { prompt: "Which hormone produces milk, and which one releases it?", answer: "Prolactin produces it; oxytocin releases it" },
      ],
      traps: [
        {
          title: "Progesterone comes from the corpus luteum, not the pituitary",
          body: "The pituitary makes FSH and LH. The ovary makes oestrogen (follicle) and progesterone (corpus luteum). Oxytocin, not LH or FSH, drives the contractions of labour.",
        },
      ],
    },
  ],
};
