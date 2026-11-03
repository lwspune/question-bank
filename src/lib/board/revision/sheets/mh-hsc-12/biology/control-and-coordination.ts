import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 9 Control and Coordination. Definitions checked
 * against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the 24 board past-paper questions in the bank,
 * 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Control and Coordination",
  chapterSlug: "control-and-coordination",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 9",
  keyPoints: [
    {
      term: "Properties of nerve fibre",
      text: "**Irritability:** because of its polarised membrane, a nerve fibre can perceive a stimulus and enter a state of activity. **Conductivity:** the ability to transmit the excitation. **All or none law:** a nerve conducts the impulse along its entire length or not at all. **Refractory period:** about a millisecond in which it fails to respond to a second stimulus.",
    },
    {
      term: "Reflex action",
      text: "A sudden, spontaneous, automatic, involuntary response to a stimulus; its path is the **reflex arc**. By previous experience: **unconditioned** reflexes need none (sneezing, coughing, yawning); **conditioned** reflexes are learnt (swimming, cycling, dancing), first studied by Pavlov on salivation in a dog at the sound of a bell.",
    },
    {
      term: "Meninges",
      text: "Three membranes over the CNS. **Dura mater:** outermost, tough, fibrous, non vascular. **Arachnoid mater:** middle, thin, web like, non vascular. **Pia mater:** innermost, delicate, highly vascular, in close contact with the CNS. Subdural space lies below the dura; subarachnoid space (with CSF) below the arachnoid.",
    },
    {
      term: "Cerebrospinal fluid (CSF)",
      text: "A lymph like fluid secreted by the **choroid plexuses** of the pia mater and the ependymal cells of the ventricles and central canal. Functions: shock absorber protecting brain and spinal cord, keeps a constant pressure inside the cranium, exchange of nutrients and wastes between blood and brain tissue.",
    },
    {
      term: "Functional areas of cerebrum",
      text: "**Frontal lobe:** motor area (voluntary movements), premotor area, association area, Broca's area (motor speech). **Parietal lobe:** sensations of pain, pressure, temperature, taste. **Temporal lobe:** smell, hearing, speech, emotions. **Occipital lobe:** vision. **Wernicke's area** (where temporal, parietal and occipital lobes meet) helps understand spoken and written words.",
    },
    {
      term: "Corpus callosum, cerebellum, arbor vitae",
      text: "**Corpus callosum:** the thick band of nerve fibres joining the two cerebral hemispheres, the largest commissure of the brain. **Cerebellum:** second largest part of the hind brain; maintains equilibrium, posture and **body balance**, muscle tone. Inside it, white matter mixed with grey matter forms a tree like pattern, the **arbor vitae**.",
    },
    {
      term: "Medulla oblongata",
      text: "The posterior conical part of the brain that continues as the spinal cord. It controls involuntary **vital** functions (heart beat, respiration, vasomotor activity, peristalsis) and non vital reflexes (coughing, sneezing, swallowing, vomiting, yawning). Its cavity is the IVth ventricle.",
    },
    {
      term: "Cranial nerves",
      text: "12 pairs, I to XII. **Sensory:** I olfactory, II optic, VIII auditory (vestibulocochlear). **Motor:** III oculomotor, IV pathetic (trochlear), VI abducens, XI spinal accessory, XII hypoglossal. **Mixed:** V trigeminal (largest), VII facial, IX glossopharyngeal, X vagus.",
    },
    {
      term: "Alzheimer's and Parkinson's disease",
      text: "**Alzheimer's disease:** the most common form of dementia; loss of thinking, remembering and reasoning, due to loss of cholinergic neurons and accumulation of amyloid proteins; no cure. **Parkinson's disease:** degeneration of **dopamine** producing neurons in the CNS; tremors, stiffness, difficulty in walking and balance.",
    },
    {
      term: "Hormone",
      text: "A chemical messenger released by an endocrine gland directly into the blood, acting only on its target organs. Properties: effective in very low concentration; may stimulate, inhibit or modify a process; metabolised after action, so not reused; hypo or hyper secretion causes disorders; secretion regulated by positive or negative feedback.",
    },
    {
      term: "Hormones of adenohypophysis",
      text: "**GH:** growth of all tissues by protein synthesis and cell division. **TSH:** stimulates the thyroid to secrete thyroxine. **ACTH:** stimulates the adrenal cortex. **Prolactin:** breast growth and milk production. **FSH:** growth of ovarian follicles. **LH:** ovulation and corpus luteum formation. **ICSH:** testes make testosterone.",
    },
    {
      term: "Islets of Langerhans",
      text: "Endocrine cells of the pancreas (pancreas develops from **endoderm**). **Alpha cells** (20%): glucagon, raises blood glucose by glycogenolysis. **Beta cells** (70%): **insulin**, lowers blood glucose by glycogenesis. **Delta cells** (5%): somatostatin, inhibits glucagon and insulin secretion. **PP cells:** pancreatic polypeptide.",
    },
    {
      term: "Thymus and ovarian hormones",
      text: "**Thymus:** prominent at birth, atrophies in the adult (a temporary gland); secretes thymosin, matures **T lymphocytes**, so develops the immune system. **Ovaries:** estrogen (developing follicle, female secondary sexual characters), progesterone (corpus luteum, prepares uterus for implantation), relaxin (relaxes cervix and pelvic ligaments at birth).",
    },
    {
      term: "Disorders of hormone secretion",
      text: "**Diabetes insipidus:** ADH deficiency, less water reabsorption, more urine. **Graves' disease:** hyperthyroidism; protruding eyeballs, raised BMR, weight loss. **Addison's disease:** hyposecretion of corticoids; low blood sugar, low Na⁺, weight loss, weakness. **Cushing's disease:** excess glucocorticoids; high blood sugar, high BP, obesity, wasting of limb muscles.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the transmission of a nerve impulse along an axon",
      steps: [
        "Resting (polarised) nerve: Na⁺ in excess outside, K⁺ and negative proteins inside; resting potential about \\(-70\\) mV, kept by the Na⁺/K⁺ pump (3 Na⁺ out for 2 K⁺ in).",
        "Depolarisation: a stimulus opens voltage gated Na⁺ channels, Na⁺ rushes in, and the potential becomes about \\(+30\\) mV: the action potential.",
        "Repolarisation: at the peak Na⁺ gates close, K⁺ gates open, K⁺ diffuses out and the inside turns negative again; the refractory period follows.",
        "The wave of depolarisation and repolarisation repeats along the axon to the terminal: a self propagating process.",
        "In a myelinated fibre the impulse jumps from node to node of Ranvier (saltatory conduction, about 120 m/s), faster than in a non myelinated fibre.",
      ],
    },
    {
      title: "Explain synaptic transmission",
      steps: [
        "The impulse reaches the synaptic knob of the presynaptic neuron.",
        "Voltage sensitive Ca²⁺ channels open and Ca²⁺ diffuses in from the extracellular fluid.",
        "Synaptic vesicles fuse with the membrane and release the neurotransmitter into the synaptic cleft by exocytosis.",
        "The neurotransmitter binds receptors on the postsynaptic membrane, opening ligand gated channels: the action is excitatory or inhibitory.",
      ],
    },
    {
      title: "Mode of hormone action through membrane bound receptors",
      steps: [
        "Water soluble hormones (catecholamines, peptides) cannot cross the plasma membrane, so they bind a specific receptor on the target cell membrane.",
        "The hormone receptor complex releases the enzyme adenylate cyclase, which forms cyclic AMP from ATP.",
        "cAMP activates enzymes, giving biochemical and then physiological responses (e.g. FSH causes ovarian growth).",
        "The hormone is the first messenger and cAMP the second messenger; Ca²⁺, cGMP and IP3 are other second messengers.",
      ],
    },
    {
      title: "Describe the nervous system of Planaria",
      steps: [
        "Planaria (a flatworm) is the most primitive animal with a CNS, on the ventral side of the body.",
        "A mass of cerebral (cephalic) ganglia in the head forms an inverted U shaped brain, with branches to the sides.",
        "A pair of ventral nerve cords runs back from below the ganglia, joined by transverse nerves (commissures) in a ladder like manner.",
        "A peripheral nerve plexus arises laterally from the nerve cords.",
      ],
    },
  ],
  diagrams: [
    { title: "Ladder type nervous system in Planaria", labels: ["eyespot", "brain (cerebral ganglia)", "ventral nerve cords", "transverse nerves"] },
    { title: "Sagittal section of brain", labels: ["cerebrum", "corpus callosum", "thalamus and hypothalamus", "pituitary and pineal gland", "mid brain, pons varolii, medulla oblongata", "cerebellum with arbor vitae"] },
    { title: "Mechanism of hormone action through membrane receptor", labels: ["hormone (e.g. FSH)", "receptor on cell membrane", "second messenger (cAMP or Ca²⁺)", "biochemical response", "physiological response"] },
    { title: "Synaptic transmission", labels: ["presynaptic neuron and synaptic end bulb", "synaptic vesicles with neurotransmitter", "voltage gated Ca²⁺ channel", "synaptic cleft", "receptor and ligand gated channel", "postsynaptic neuron"] },
    { title: "Polarisation and depolarisation along a nerve", labels: ["resting (polarised) axon", "Na⁺ outside, K⁺ inside", "stimulus applied", "depolarised region", "repolarised region"] },
  ],
  mostAsked: [
    { topic: "Parts of the brain and their functions: areas of cerebrum, cerebellum, medulla oblongata, corpus callosum, arbor vitae", years: [2026, 2025, 2024] },
    { topic: "Hormones of the adenohypophysis, ovaries and thymus and their roles", years: [2025, 2024] },
    { topic: "Disorders of hypo or hyper secretion: Addison's, Cushing's, Graves' disease, diabetes insipidus", years: [2026, 2025] },
    { topic: "Cranial nerves: name and type (sensory, motor, mixed)", years: [2026, 2025, 2024] },
    { topic: "Islets of Langerhans: cells and their hormones", years: [2026, 2024] },
    { topic: "Meninges and the functions of CSF", years: [2026, 2025] },
    { topic: "Alzheimer's disease and Parkinson's disease", years: [2026, 2024] },
    { topic: "Define hormone, its properties and action through membrane receptors", years: [2024] },
  ],
  mistakes: [
    {
      title: "Diabetes insipidus is not diabetes mellitus",
      body: "ADH deficiency gives diabetes **insipidus** (more urine, no sugar). Low insulin from beta cells gives diabetes **mellitus** (high blood glucose).",
    },
    {
      title: "Mixing up the germ layers",
      body: "Adrenal **cortex** is from mesoderm, adrenal **medulla** from ectoderm, pancreas from **endoderm**. Name the one the question asks.",
    },
    {
      title: "Wrong cranial nerve type",
      body: "VIII auditory is sensory, VII facial is mixed, IV pathetic and VI abducens are motor. Learn the three sensory nerves (I, II, VIII) and the four mixed ones (V, VII, IX, X); the rest are motor.",
    },
    {
      title: "Body balance is the cerebellum",
      body: "Balance and posture belong to the **cerebellum**. The medulla oblongata controls vital functions like heart beat and breathing.",
    },
    {
      title: "Swapping alpha and delta cells",
      body: "Alpha cells make **glucagon** (raises blood sugar); delta cells make **somatostatin** (inhibits both glucagon and insulin). Insulin comes only from beta cells.",
    },
  ],
};

export default sheet;
