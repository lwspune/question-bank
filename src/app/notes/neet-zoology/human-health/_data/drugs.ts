import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HH_DRUGS_NOTE: SubtopicNote = {
  subtopicName: "Drugs and Alcohol Abuse",
  title: "Drugs and Alcohol Abuse",
  oneLineDefinition:
    "The three drug classes NCERT names (opioids, cannabinoids and coca alkaloids) with their plant sources and effects, the medicines that are abused, tobacco and alcohol, and what abuse does to the body.",
  whyItMatters:
    "Four NEET questions from 2023 to 2026, three of them match-the-columns. Morphine as a sedative and painkiller came up in all four (NEET 2023, NEET 2024, NEET 2026 and Re-NEET 2026), so each drug's source and effect is the fact to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohh-drug-classes",
      name: "Opioids, cannabinoids and coca alkaloids",
      intuition:
        "The commonly abused drugs mostly come from flowering plants. Group them by plant: the poppy gives morphine and heroin, the cannabis plant gives marijuana and its relatives, and the coca plant gives cocaine. Then attach one effect to each: heroin slows the body down, marijuana acts on the heart and blood vessels, and cocaine speeds the brain up.",
      definition:
        "The drugs commonly abused are **opioids, cannabinoids and coca alkaloids**. Most come from **flowering plants**, some from fungi.\n\n" +
        "- **Opioids** bind to specific **opioid receptors** in the **central nervous system and gastrointestinal tract**. **Heroin**, commonly called **smack**, is chemically **diacetylmorphine**, a white, odourless, bitter crystalline compound. It is made by **acetylation of morphine**, which is extracted from the **latex of the poppy plant** *Papaver somniferum*. It is taken by snorting and injection, and it is a **depressant that slows down body functions**.\n" +
        "- **Cannabinoids** interact with **cannabinoid receptors**, mainly in the **brain**. Natural cannabinoids come from the **inflorescences** of *Cannabis sativa*. The flower tops, leaves and resin are used to make **marijuana, hashish, charas and ganja**. They are taken by inhalation and oral ingestion and are known for their **effects on the cardiovascular system**.\n" +
        "- **Coca alkaloid or cocaine** comes from the coca plant *Erythroxylum coca*, native to South America. It **interferes with the transport of the neurotransmitter dopamine**. Commonly called **coke or crack**, it is usually snorted. It has a strong **stimulating** action on the central nervous system, giving a **sense of euphoria and increased energy**; too much of it causes hallucinations.\n" +
        "- Other plants with hallucinogenic properties: *Atropa belladonna* and *Datura*.",
      table: {
        columns: ["Drug", "Source", "Acts on", "Effect"],
        rows: [
          {
            cells: ["Heroin (smack, diacetylmorphine)", "Acetylation of morphine from the poppy Papaver somniferum", "Opioid receptors in the central nervous system and gut", "A depressant; slows down body functions"],
            noteAmber: "NEET 2023: heroin slows down body function, marijuana affects the cardiovascular system, cocaine interferes with dopamine transport and morphine is a painkiller.",
            pyqExampleId: "7a9644ac-65a4-4746-ace7-dddb15e06d06",
          },
          { cells: ["Morphine", "Latex of the poppy Papaver somniferum", "Opioid receptors", "Very effective sedative and painkiller"] },
          { cells: ["Marijuana, hashish, charas, ganja", "Flower tops, leaves and resin of Cannabis sativa", "Cannabinoid receptors, mainly in the brain", "Effects on the cardiovascular system"] },
          { cells: ["Cocaine (coke, crack)", "Coca plant Erythroxylum coca, native to South America", "Interferes with the transport of dopamine", "Stimulant: euphoria and increased energy; hallucinations in excess"] },
        ],
      },
      pyqExampleId: "860f87fd-a8d3-4edc-8a6f-4b86248c6ab1",
      selfCheckExample: {
        prompt: "Heroin and marijuana each act through their own receptors. Which receptors are these, and where are they found?",
        steps: [
          "Heroin is an opioid; opioids bind to opioid receptors in the central nervous system and the gastrointestinal tract.",
          "Marijuana is a cannabinoid; cannabinoids bind to cannabinoid receptors, mainly in the brain.",
        ],
        answer: "Opioid receptors (central nervous system and gut) for heroin; cannabinoid receptors (mainly the brain) for marijuana.",
      },
      practiceSet: [
        { prompt: "What is the chemical name of heroin?", answer: "Diacetylmorphine" },
        { prompt: "Which neurotransmitter's transport does cocaine interfere with?", answer: "Dopamine" },
        { prompt: "Name two plants NCERT gives as having hallucinogenic properties, besides the drug plants.", answer: "Atropa belladonna and Datura" },
        { prompt: "How are cannabinoids usually taken?", answer: "By inhalation and oral ingestion" },
        { prompt: "From which part of the Cannabis sativa plant are natural cannabinoids obtained?", answer: "The inflorescences" },
      ],
      traps: [
        {
          title: "Heroin is a depressant, cocaine a stimulant",
          body: "**Heroin** slows down body functions: a **depressant**. **Cocaine** stimulates the central nervous system, giving **euphoria and increased energy**.",
        },
        {
          title: "Heroin comes from the poppy, not cannabis",
          body: "Heroin is made by **acetylation of morphine** from the poppy *Papaver somniferum*. *Cannabis sativa* gives marijuana, hashish, charas and ganja.",
        },
        {
          title: "Marijuana's NCERT effect is on the cardiovascular system",
          body: "NCERT ties **cannabinoids** to the **cardiovascular system**. Interfering with **dopamine** transport is **cocaine**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohh-tobacco-abuse",
      name: "Medicines, tobacco, alcohol and the effects of abuse",
      intuition:
        "Some drugs are good medicines when a doctor uses them and dangerous when people take them on their own. Morphine kills pain after an operation; sleeping pills and similar drugs help with depression and insomnia. Tobacco and alcohol are legal but still harm the heart, lungs and liver. Anabolic steroids, misused by athletes, upset the body's sex hormones.",
      definition:
        "Drugs used as medicines but often abused:\n" +
        "- **Morphine** is a very effective **sedative and painkiller**, very useful in patients who have undergone **surgery**.\n" +
        "- **Barbiturates, amphetamines, benzodiazepines, LSD** and similar drugs help patients cope with mental illnesses like **depression and insomnia**.\n\n" +
        "**Tobacco** is smoked, chewed or used as snuff. It contains **nicotine**, an alkaloid. Nicotine **stimulates the adrenal gland to release adrenaline and nor-adrenaline** into the blood; both **raise blood pressure and heart rate**.\n" +
        "- **Smoking** is linked to cancers of the **lung, urinary bladder and throat**, bronchitis, emphysema, coronary heart disease and gastric ulcer. It raises the **carbon monoxide** in blood and lowers the haem-bound oxygen.\n" +
        "- **Tobacco chewing** raises the risk of **cancer of the oral cavity**.\n\n" +
        "Abuse, addiction and dependence:\n" +
        "- **Adolescence** (roughly **12 to 18 years**) is when use often starts. Repeated use leads to **addiction**, and the body's **dependence** shows as a **withdrawal syndrome** (anxiety, shakiness, nausea and sweating) if the drug is stopped.\n" +
        "- Heavy doses can cause coma and death from respiratory failure, heart failure or cerebral haemorrhage. Injecting drugs can spread **AIDS and hepatitis B**.\n" +
        "- **Chronic alcohol** use damages the **nervous system and liver (cirrhosis)**. Drugs and alcohol in pregnancy harm the foetus.\n" +
        "- Prevention: avoid undue **peer pressure**, education and counselling, seek help from parents and peers, look for danger signs, and seek professional and medical help.",
      table: {
        columns: ["Item", "NCERT fact"],
        rows: [
          { cells: ["Morphine as a medicine", "Very effective sedative and painkiller for patients who have undergone surgery"] },
          { cells: ["Barbiturates, amphetamines, benzodiazepines, LSD", "Used to treat depression and insomnia, but often abused"] },
          {
            cells: ["Nicotine", "Alkaloid in tobacco; makes the adrenal gland release adrenaline and nor-adrenaline, raising blood pressure and heart rate"],
            noteAmber: "NEET 2026: nicotine went with the adrenal gland releasing catecholamines, morphine with sedative and painkiller, heroin with a depressant and cocaine with euphoria.",
            pyqExampleId: "147b6a46-ddd2-4b18-9496-ee619fa2d851",
          },
          { cells: ["Smoking", "Cancer of lung, urinary bladder and throat; bronchitis, emphysema, heart disease, gastric ulcer; more carbon monoxide, less haem-bound oxygen"] },
          { cells: ["Tobacco chewing", "Higher risk of cancer of the oral cavity"] },
          { cells: ["Chronic alcohol use", "Damages the nervous system and the liver (cirrhosis)"] },
          { cells: ["Anabolic steroids in females", "Masculinisation, aggressiveness, mood swings, depression, abnormal menstrual cycles, excess facial and body hair, enlarged clitoris, deeper voice"] },
          { cells: ["Anabolic steroids in males", "Acne, aggressiveness, mood swings, depression, smaller testicles, less sperm, kidney and liver dysfunction, breast enlargement, premature baldness, enlarged prostate"] },
        ],
      },
      pyqExampleId: "492cd251-f489-4203-8cfb-73ff96c495c8",
      selfCheckExample: {
        prompt: "A smoker's blood carries less oxygen bound to haemoglobin than a non-smoker's. Which gas from the smoke is responsible?",
        steps: [
          "NCERT says smoking increases the carbon monoxide content of the blood.",
          "This reduces the concentration of haem-bound oxygen.",
        ],
        answer: "Carbon monoxide.",
      },
      practiceSet: [
        { prompt: "Which two hormones does nicotine make the adrenal gland release?", answer: "Adrenaline and nor-adrenaline" },
        { prompt: "Tobacco chewing raises the risk of cancer of which part of the body?", answer: "The oral cavity" },
        { prompt: "Which organ does chronic alcohol use damage, causing cirrhosis?", answer: "The liver" },
        { prompt: "Name the withdrawal symptoms NCERT lists.", answer: "Anxiety, shakiness, nausea and sweating" },
        { prompt: "What effect of anabolic steroids on the long bones is seen in adolescents?", answer: "Premature closure of the growth centres, causing stunted growth" },
      ],
      traps: [
        {
          title: "Nicotine works through the adrenal gland",
          body: "**Nicotine** stimulates the **adrenal gland** to release **adrenaline and nor-adrenaline**, raising blood pressure and heart rate. It does not act by blocking dopamine transport; that is **cocaine**.",
        },
        {
          title: "Morphine is also a medicine",
          body: "**Morphine** is an opioid, yet it is a very effective **sedative and painkiller** for patients after **surgery**. Interferons, antibiotics and anti-retroviral drugs are not painkillers.",
        },
        {
          title: "Steroid effects differ between the sexes",
          body: "In **males**, anabolic steroids **shrink the testicles** and can cause **breast enlargement**; in **females** they cause **masculinisation**, a **deeper voice** and an **enlarged clitoris**.",
        },
      ],
    },
  ],
};
