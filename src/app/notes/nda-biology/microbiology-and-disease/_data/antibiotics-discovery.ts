import type { SubtopicNote } from "@/app/notes/_types";

export const ANTIBIOTICS_DISCOVERY_NOTE: SubtopicNote = {
  subtopicName: "Antibiotics — Discovery",
  title: "Antibiotics and Useful Microbes",
  oneLineDefinition:
    "An antibiotic is a chemical made by one microbe that kills or stops another; this subtopic covers Fleming's discovery of penicillin, why antibiotics miss viruses, how bacteria resist them, and the friendly microbes we put to work.",
  whyItMatters:
    "Seven PYQs, all EASY or MODERATE recall. The cornerstone fact is Fleming → penicillin (1928), tested directly in 2025. " +
    "Three follow-ups recur: antibiotics act on bacterial metabolic pathways so they do NOTHING to viruses; resistant bacteria destroy penicillin with the enzyme β-lactamase; and antibiotics themselves come FROM microbes. " +
    "The subtopic also folds in the useful side of microbiology — Lactobacillus curdling milk, probiotics as live microbial supplements — and one worm-disease recall (elephantiasis = Wuchereria).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "micro-antibiotic-discovery",
      name: "Antibiotics — discovery and how they work",
      intuition:
        "Penicillin was the first antibiotic, found by Alexander Fleming in 1928 when a stray Penicillium mould killed the bacteria on his culture plate. " +
        "An antibiotic works by jamming a step in bacterial metabolism (cell-wall building, protein synthesis) — which is exactly why it does nothing to a virus, since a virus has no metabolism to jam.",
      definition:
        "The discovery and mechanism facts:\n" +
        "- **Penicillin** — the first antibiotic, discovered by **Alexander Fleming** (1928) from the mould *Penicillium*. (Not Crick, Wilkins or Darwin.)\n" +
        "- Antibiotics are **obtained from microbes** themselves — fungi and bacteria (e.g. penicillin from a fungus, streptomycin from a bacterium). The statement 'no antibiotic has been obtained from any microbe' is **false**.\n" +
        "- Antibiotics act on **bacterial metabolic pathways** (cell-wall synthesis, protein synthesis). **Viruses have no such pathways**, so antibiotics **do not work on viral infections**.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          {
            cells: ["Penicillin was discovered by", "**Alexander Fleming** (1928)"],
            noteAmber: "From the Penicillium mould killing Staphylococcus. NDA 2025.",
            pyqExampleId: "c9755cc8-c6f6-4c39-bd98-c33e0f548cc5",
          },
          {
            cells: ["Are antibiotics obtained from microbes?", "**Yes** — fungi and bacteria"],
            noteAmber: "'No antibiotic from any microbe' is the FALSE statement. NDA 2017.",
            pyqExampleId: "4d64d16e-20a1-4415-b800-6dd7e0085872",
          },
          {
            cells: ["Do antibiotics affect viruses?", "**No** — viruses lack metabolic pathways"],
            noteAmber: "Antibiotics target bacterial pathways; viruses have none, so taking antibiotics does NOT cure a viral infection. NDA 2020.",
            pyqExampleId: "35c87db5-037d-4cea-b405-8def26d59576",
          },
        ],
        caption:
          "Antibiotics fight bacteria by attacking their metabolism — a virus has none, so antibiotics are useless against viral disease.",
      },
      selfCheckExample: {
        prompt:
          "A patient with a viral cold is given antibiotics and does not improve. Explain, in terms of how antibiotics work, why they had no effect.",
        steps: [
          "Antibiotics act on bacterial metabolic pathways — cell-wall synthesis and protein synthesis.",
          "A virus has no cell and no metabolism of its own; it hijacks the host cell to reproduce.",
          "With no bacterial pathway to target, the antibiotic has nothing to act on.",
        ],
        answer: "Antibiotics target bacterial metabolism, which viruses lack — so they cannot cure a viral infection.",
      },
      practiceSet: [
        { prompt: "Who discovered penicillin?", answer: "Alexander Fleming", method: "1928, from Penicillium mould" },
        { prompt: "Are antibiotics obtained from microbes?", answer: "Yes", method: "fungi and bacteria" },
        { prompt: "Do antibiotics work against viruses?", answer: "No", method: "viruses have no metabolic pathway to target" },
        { prompt: "Penicillin comes from which kind of organism?", answer: "A fungus (Penicillium mould)" },
      ],
      pyqExampleId: "c9755cc8-c6f6-4c39-bd98-c33e0f548cc5", // Fleming discovered penicillin
      traps: [
        {
          title: "Antibiotics do nothing to viruses",
          body:
            "Taking antibiotics does **not** cure a viral infection. Antibiotics attack **bacterial** metabolic pathways; viruses have none. The correct statement is 'viruses do not possess metabolic pathways on which antibiotics can function, whereas bacteria do'.",
        },
        {
          title: "Antibiotics DO come from microbes",
          body:
            "A 'which statement is NOT correct?' item plants 'no antibiotic has been obtained from any microbe' — this is **false**. Penicillin comes from a fungus, streptomycin from a bacterium; microbes are the source of antibiotics.",
        },
      ],
    },

    {
      kind: "reference" as const,
      slug: "micro-antibiotic-resistance",
      name: "Antibiotic resistance — β-lactamase",
      intuition:
        "Some bacteria survive penicillin because they make an enzyme that chops the drug apart before it can act. " +
        "That enzyme is **β-lactamase (penicillinase)** — it breaks the β-lactam ring at the heart of the penicillin molecule, switching the drug off.",
      definition:
        "How penicillin resistance works:\n" +
        "- Penicillin's killing power lives in its **β-lactam ring**.\n" +
        "- Resistant bacteria produce the enzyme **β-lactamase** (also called **penicillinase**), which **hydrolyses (breaks) the β-lactam ring**, inactivating the drug.\n" +
        "- The bacteria do **not** store the drug in a vacuole, and the enzyme is not 'lactic acid dehydrogenase' — those are distractors.",
      table: {
        columns: ["Mechanism of resistance", "Correct?"],
        rows: [
          {
            cells: ["Degrade penicillin with the enzyme β-lactamase", "**Yes** — the correct mechanism"],
            noteAmber: "β-lactamase breaks the β-lactam ring. NDA 2019.",
            pyqExampleId: "0e6f0cfc-6624-4d71-a702-48ddedd1a3df",
          },
          { cells: ["Store the antibiotic in a vacuole", "No — a distractor"] },
          { cells: ["Degrade it with lactic acid dehydrogenase", "No — wrong enzyme"] },
          { cells: ["Penicillin is simply not absorbed", "No — a distractor"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A strain of bacteria is unaffected by penicillin even at high doses. Name the enzyme responsible and the exact part of the penicillin molecule it destroys.",
        steps: [
          "Penicillin resistance is usually enzymatic.",
          "The enzyme is β-lactamase (penicillinase).",
          "It hydrolyses the β-lactam ring — the reactive core of penicillin — making the drug inactive.",
        ],
        answer: "β-lactamase (penicillinase); it breaks the β-lactam ring.",
      },
      practiceSet: [
        { prompt: "Which enzyme makes bacteria resistant to penicillin?", answer: "β-lactamase (penicillinase)" },
        { prompt: "Which part of penicillin does β-lactamase destroy?", answer: "The β-lactam ring" },
        { prompt: "Another name for β-lactamase is ___.", answer: "Penicillinase" },
      ],
      pyqExampleId: "0e6f0cfc-6624-4d71-a702-48ddedd1a3df",
      traps: [
        {
          title: "The resistance enzyme is β-lactamase, not 'lactic acid dehydrogenase'",
          body:
            "The right enzyme is **β-lactamase (penicillinase)**, which hydrolyses penicillin's β-lactam ring. 'Lactic acid dehydrogenase' is a planted look-alike, and 'stored in a vacuole' is wrong — bacteria destroy the drug, they don't hoard it.",
        },
      ],
    },

    {
      kind: "reference" as const,
      slug: "micro-useful-microbes",
      name: "Useful microbes — Lactobacillus and probiotics",
      intuition:
        "Not all microbes cause disease — many are put to work. Lactic acid bacteria turn milk into curd, and live beneficial microbes taken as food are called probiotics. " +
        "Keep these friendly microbes separate from the disease-causers; the bank mixes them into the same option lists.",
      definition:
        "The useful-microbe facts:\n" +
        "- **Curdling of milk** is done by **Lactobacillus** (Lactic Acid Bacillus), which ferments lactose into lactic acid — acidifying and curdling the milk.\n" +
        "- A **probiotic** is a **live microbial food supplement** — beneficial bacteria (often Lactobacillus) eaten to improve gut health. It is NOT an antacid, an antibiotic, or 'organic food'.\n" +
        "- *Saccharomyces cerevisiae* (yeast) is used in baking and brewing — a useful microbe, but it does not curdle milk.",
      table: {
        columns: ["Useful microbe / term", "Role"],
        rows: [
          {
            cells: ["**Lactobacillus** (Lactic Acid Bacillus)", "Curdles milk — ferments lactose to lactic acid"],
            noteAmber: "The acidification + curdling agent. NDA 2017.",
            pyqExampleId: "9d86eac0-d2bc-4676-8f1a-8563ca2cd104",
          },
          {
            cells: ["**Probiotic**", "Live microbial food supplement (beneficial bacteria)"],
            noteAmber: "Not an antacid, antibiotic, or organic food. NDA 2017.",
            pyqExampleId: "ca8635e6-276a-4c81-b95c-13ed53a2ba88",
          },
          { cells: ["**Saccharomyces cerevisiae** (yeast)", "Baking and brewing (fermentation)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Match the role to the microbe: (a) curdles milk, (b) a live supplement eaten for gut health. Name the microbe/term for each.",
        steps: [
          "Curdling milk is done by Lactobacillus, fermenting lactose to lactic acid.",
          "A live beneficial-microbe supplement is called a probiotic.",
          "Both involve Lactobacillus-type bacteria — useful, not disease-causing.",
        ],
        answer: "(a) Lactobacillus; (b) probiotic (a live microbial food supplement).",
      },
      practiceSet: [
        { prompt: "Which microbe curdles milk?", answer: "Lactobacillus (Lactic Acid Bacillus)", method: "ferments lactose to lactic acid" },
        { prompt: "A probiotic is a ___.", answer: "Live microbial food supplement" },
        { prompt: "Which microbe is used in baking and brewing?", answer: "Saccharomyces cerevisiae (yeast)" },
      ],
      pyqExampleId: "9d86eac0-d2bc-4676-8f1a-8563ca2cd104", // curdling = Lactobacillus
      traps: [
        {
          title: "A probiotic is live microbes, not an antibiotic",
          body:
            "A **probiotic** is a **live microbial food supplement** (beneficial bacteria). The look-alike 'antibiotic' is the opposite — a chemical that KILLS microbes. Distractors also offer 'antacid' and 'organic food'; the answer is the live-microbe supplement.",
        },
        {
          title: "Milk curdles by Lactobacillus, not yeast",
          body:
            "Curdling is done by **Lactobacillus** (lactic acid fermentation). *Saccharomyces cerevisiae* is a yeast used for baking/brewing, and Vibrio/Clostridium are disease-causers — all distractors here.",
        },
      ],
    },

    {
      kind: "reference" as const,
      slug: "micro-worm-diseases",
      name: "Worm diseases — elephantiasis",
      intuition:
        "Not every parasite is a microbe — some are worms (helminths). Elephantiasis is the marquee worm disease: a thread-like filarial worm blocks the lymph vessels, swelling the limbs.",
      definition:
        "The worm-disease fact the bank tests:\n" +
        "- **Elephantiasis (lymphatic filariasis)** is caused by **Wuchereria bancrofti**, a parasitic **roundworm (filarial worm)** transmitted by mosquitoes (Culex).\n" +
        "- It is NOT *Ascaris lumbricoides* (intestinal roundworm), NOT *Culex* (that's the mosquito vector, not the pathogen), and NOT *Fasciola hepatica* (the liver fluke).",
      table: {
        columns: ["Disease", "Causal worm", "Type"],
        rows: [
          {
            cells: ["Elephantiasis (filariasis)", "**Wuchereria bancrofti**", "Filarial roundworm"],
            noteAmber: "Blocks lymph vessels → limb swelling. Vector is the Culex mosquito. NDA 2017.",
            pyqExampleId: "17c7936e-9dd8-4687-9399-a14a0f739c74",
          },
          { cells: ["Ascariasis", "**Ascaris lumbricoides**", "Intestinal roundworm"] },
          { cells: ["Fascioliasis", "**Fasciola hepatica**", "Liver fluke (flatworm)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Elephantiasis is a parasitic disease causing massive limb swelling. Name its causal organism and say what kind of organism it is.",
        steps: [
          "Elephantiasis = lymphatic filariasis.",
          "It is caused by Wuchereria bancrofti.",
          "Wuchereria is a filarial roundworm — a helminth, not a bacterium or protozoan.",
        ],
        answer: "Wuchereria bancrofti — a filarial roundworm (helminth).",
      },
      practiceSet: [
        { prompt: "Which organism causes elephantiasis?", answer: "Wuchereria bancrofti", method: "a filarial roundworm" },
        { prompt: "What kind of organism is Wuchereria?", answer: "A worm (helminth)" },
        { prompt: "Which mosquito carries the elephantiasis worm?", answer: "Culex" },
      ],
      pyqExampleId: "17c7936e-9dd8-4687-9399-a14a0f739c74",
      traps: [
        {
          title: "Wuchereria is the pathogen; Culex is only the vector",
          body:
            "Elephantiasis is caused by **Wuchereria bancrofti** (a worm). *Culex* appears as a distractor — but that is the **mosquito vector**, not the cause. The causal organism is the worm, not the carrier.",
        },
      ],
    },
  ],
};
