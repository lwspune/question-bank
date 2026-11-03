import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 7 Human Health and Disease. Diseases, immunity,
 * AIDS, cancer and drugs checked against the NCERT text (the book's own
 * wording, trimmed); most-asked years and marks from the CBSE board
 * past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Human Health and Disease",
  chapterSlug: "human-health-and-disease",
  source: "NCERT Biology (CBSE Class 12), Chapter 7",
  keyPoints: [
    {
      term: "Typhoid and pneumonia",
      text: "**Typhoid**: Salmonella typhi, through contaminated food and water; sustained high fever (39 to 40 °C), weakness, stomach pain, constipation, headache; confirmed by the **Widal test**. **Mary Mallon** (Typhoid Mary), a cook, was a carrier. **Pneumonia**: Streptococcus pneumoniae and Haemophilus influenzae infect the **alveoli**; in severe cases lips and nails turn grey to bluish.",
    },
    {
      term: "Common cold and amoebiasis",
      text: "**Common cold**: **Rhino viruses** infect the nose and respiratory passage but **not the lungs**; nasal congestion, sore throat, hoarseness, cough, for 3-7 days; spread by droplets and contaminated objects. **Amoebiasis**: Entamoeba histolytica in the large intestine; stools with excess mucous and blood clots; **houseflies** are mechanical carriers.",
    },
    {
      term: "Malaria",
      text: "Plasmodium (P. vivax, P. malaria, P. falciparum); **P. falciparum** causes **malignant malaria**, the most serious, even fatal. Enters as **sporozoites** through the bite of an infected **female Anopheles**. Rupture of RBCs releases **haemozoin**, which causes chill and high fever recurring every three to four days. Two hosts: human and mosquito, which is also the vector.",
    },
    {
      term: "Ascariasis, filariasis and ringworm",
      text: "**Ascaris** (common round worm): internal bleeding, muscular pain, fever, anaemia, blockage of the intestine; eggs in faeces contaminate soil and water. **Wuchereria** (W. bancrofti, W. malayi): chronic inflammation of lymphatic vessels of the lower limbs (**elephantiasis**), spread by female mosquitoes. **Ringworm**: Microsporum, Trichophyton, Epidermophyton; dry, scaly, itchy lesions.",
    },
    {
      term: "Prevention and control",
      text: "Personal hygiene (clean body, water and food) and public hygiene (disposal of waste and excreta, disinfecting reservoirs) for typhoid, amoebiasis, ascariasis. Avoid contact for pneumonia and common cold. For malaria and filariasis, control the **vectors**: no stagnant water, mosquito nets, **Gambusia** fish, insecticides. **Aedes** spreads dengue and chikungunya.",
    },
    {
      term: "Innate immunity",
      text: "**Non-specific**, present at birth. Four barriers: **physical** (skin, mucus), **physiological** (stomach acid, saliva, tears), **cellular** (PMNL-neutrophils, monocytes, natural killer cells, macrophages), **cytokine** (virus-infected cells secrete **interferons**, which protect non-infected cells from further viral infection).",
    },
    {
      term: "Acquired immunity",
      text: "**Pathogen specific**, with **memory**: a low-intensity **primary** response, then a highly intensified **secondary (anamnestic)** response. **B-lymphocytes** make **antibodies** (humoral immune response); **T-lymphocytes** help B cells and mediate **cell-mediated immunity**, which causes **graft rejection**. Antibody: two light and two heavy chains, **H2L2**; IgA, IgM, IgE, IgG.",
    },
    {
      term: "Active and passive immunity; vaccination",
      text: "**Active**: the body makes antibodies after exposure to antigens; slow. **Passive**: ready-made antibodies given (colostrum's **IgA**, antibodies through the placenta, **antitoxin** for tetanus, antivenom for snakebite). **Vaccination** rests on **memory**: antigens or weakened pathogens make the body form memory B and T cells. **Hepatitis B vaccine** is made in yeast by recombinant DNA technology.",
    },
    {
      term: "Allergy and auto-immunity",
      text: "**Allergy**: exaggerated response of the immune system to certain environmental antigens (**allergens**: dust mites, pollen, animal dander); **IgE** antibodies; mast cells release **histamine and serotonin**. Treated with anti-histamine, adrenalin and steroids. **Auto-immune disease**: the body attacks self-cells, e.g. **rheumatoid arthritis**.",
    },
    {
      term: "Lymphoid organs",
      text: "**Primary**: **bone marrow** and **thymus**, where lymphocytes mature into antigen-sensitive cells. Thymus: lobed, near the heart beneath the breastbone, shrinks after puberty. **Secondary**: **spleen** (bean-shaped blood filter, reservoir of erythrocytes), lymph nodes, tonsils, Peyer's patches, appendix. **MALT**, in the lining of major tracts, is about 50 per cent of lymphoid tissue.",
    },
    {
      term: "AIDS",
      text: "Acquired Immuno Deficiency Syndrome, caused by **HIV**, a **retrovirus** with an RNA genome. Spread by sexual contact, contaminated blood, shared needles, and mother to child through the placenta; **not by mere touch**. Time-lag of usually **5-10 years**. Diagnosed by **ELISA**; anti-retroviral drugs only prolong life. **NACO** and NGOs educate people.",
    },
    {
      term: "Cancer",
      text: "Normal cells show **contact inhibition**; cancer cells have lost it and form tumours. **Benign**: stay confined, little damage. **Malignant**: invade tissues; cells reach distant sites through blood and start new tumours (**metastasis**, the most feared property). Carcinogens: X-rays, gamma rays, UV, tobacco smoke, **oncogenic viruses**; **proto oncogenes** (c-onc) may be activated.",
    },
    {
      term: "Drugs commonly abused",
      text: "**Opioids** bind opioid receptors in the CNS and gut: **heroin (smack)**, diacetylmorphine, from acetylation of morphine from the latex of **Papaver somniferum**; a depressant. **Cannabinoids** bind receptors in the brain; from inflorescences of **Cannabis sativa**; affect the cardiovascular system. **Cocaine** from **Erythroxylum coca** interferes with **dopamine** transport; a CNS stimulant.",
    },
    {
      term: "Tobacco, addiction and dependence",
      text: "**Nicotine** (an alkaloid) makes the adrenal gland release adrenaline and nor-adrenaline: higher blood pressure and heart rate. Smoking raises **CO** and lowers haem-bound oxygen. **Addiction**: psychological attachment to effects like euphoria. **Dependence**: an unpleasant **withdrawal syndrome** (anxiety, shakiness, nausea, sweating) when the dose stops.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Life cycle of Plasmodium (flow chart)",
      steps: [
        "Infected female Anopheles bites a human and injects **sporozoites**.",
        "Parasites **multiply in liver cells** (asexual reproduction), then attack **red blood cells**.",
        "RBCs rupture and release **haemozoin**: chill and high fever every three to four days. Gametocytes develop in the RBCs.",
        "A female Anopheles bites an infected person; the parasites (gametocytes) enter it, **fertilisation and development** occur in its gut.",
        "Sporozoites form and are stored in the mosquito's **salivary glands**, ready for the next bite.",
      ],
    },
    {
      title: "How HIV causes AIDS, from entry into the body",
      steps: [
        "HIV enters **macrophages**; **reverse transcriptase** copies its RNA genome into viral DNA.",
        "Viral DNA joins the host cell's DNA and directs it to make viruses: the macrophage becomes an **HIV factory**.",
        "HIV enters **helper T-lymphocytes**, replicates; progeny viruses attack more helper T cells, whose number falls steadily.",
        "Bouts of fever, diarrhoea and weight loss follow.",
        "The person cannot fight infections otherwise overcome (Mycobacterium, viruses, fungi, Toxoplasma): these opportunistic infections, not HIV itself, cause death.",
      ],
    },
    {
      title: "Humoral and cell-mediated immune responses",
      steps: [
        "Humoral (antibody mediated): **B-lymphocytes** produce antibodies, found in the blood.",
        "Cell-mediated: **T-lymphocytes** mediate it; T cells do not secrete antibodies but help B cells make them.",
        "CMI tells **self from non-self** and rejects grafts: so tissue and blood group matching are needed, and lifelong immunosuppressants.",
      ],
    },
    {
      title: "Detection and treatment of cancer",
      steps: [
        "**Biopsy** and histopathology; blood and bone marrow tests for leukaemias.",
        "**Radiography** (X-rays), **CT** (X-rays, a three-dimensional image) and **MRI** (strong magnetic fields, non-ionising radiations) for internal organs; antibodies against cancer-specific antigens.",
        "Treatment: **surgery, radiotherapy, chemotherapy** (side effects: hair loss, anaemia).",
        "**Immunotherapy**: biological response modifiers such as **alpha-interferon** activate the immune system to destroy the tumour.",
      ],
    },
    {
      title: "Warning signs of drug abuse, and its prevention",
      steps: [
        "Signs: drop in academic performance, unexplained absence, lack of personal hygiene, withdrawal, isolation, depression, aggressive behaviour, change in sleeping and eating habits.",
        "Adolescence (12-18 years) is the most vulnerable period: curiosity, stress, peer pressure, the idea that it is cool.",
        "Prevent: avoid undue **peer pressure**; **education and counselling**; seek help from **parents and peers**.",
        "Look for danger signs; seek **professional and medical help**.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Stages in the life cycle of Plasmodium (Figure 7.1)",
      labels: ["sporozoites in salivary glands", "liver cells", "red blood cells, haemozoin released", "gametocytes", "fertilisation in the mosquito gut", "female Anopheles and human hosts"],
    },
    {
      title: "Structure of an antibody molecule (Figure 7.4)",
      labels: ["two heavy chains", "two light chains", "antigen binding site", "disulphide bonds", "H2L2"],
    },
    {
      title: "Replication of retrovirus (Figure 7.6)",
      labels: ["viral RNA genome and envelope", "reverse transcriptase", "viral DNA", "integration into host DNA", "new viruses released"],
    },
    {
      title: "Lymphoid organs in the human body (Figure 7.5)",
      labels: ["thymus", "bone marrow", "spleen", "lymph nodes", "tonsils", "Peyer's patches and appendix"],
    },
  ],
  mostAsked: [
    {
      topic: "Immunity: innate barriers, interferons, B and T cells, antibody structure, humoral and cell-mediated responses, active and passive immunity, vaccination",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Drugs and alcohol abuse: opioids, cannabinoids, cocaine and their sources, nicotine, warning signs, addiction, effects on health",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Allergy, auto-immunity, organ transplants and lymphoid organs (thymus, spleen, MALT)",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Common diseases: typhoid, pneumonia, common cold, amoebiasis, ascariasis, filariasis, ringworm, with pathogens, symptoms and prevention",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Malaria: life cycle of Plasmodium, haemozoin, why two hosts are needed",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "AIDS: how HIV multiplies and destroys immunity, ELISA, prevention",
      years: [2026, 2025, 2024, 2022],
    },
    {
      topic: "Cancer: contact inhibition, benign and malignant tumours, metastasis, oncogenes, detection and treatment",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Calling antitoxin or antivenom active immunity",
      body: "Ready-made antibodies (antitoxin for tetanus, antivenom for snakebite, colostrum's IgA, antibodies through the placenta) give **passive** immunity: quick, but no memory. A **vaccine** makes the body form its own antibodies and memory cells: **active** immunity.",
    },
    {
      title: "Wrong pathogen or vector",
      body: "Female **Anopheles**: malaria. Filariasis: bites of female mosquito vectors. **Aedes**: dengue and chikungunya. Amoebiasis has no mosquito: **houseflies** are mechanical carriers. Common cold does not infect the lungs; pneumonia infects the alveoli.",
    },
    {
      title: "Saying HIV attacks B cells or that AIDS kills directly",
      body: "HIV first enters **macrophages**, then **helper T-lymphocytes**. The fall in helper T cells leaves the patient unable to fight other infections; these kill, not HIV itself. AIDS does not spread by touch.",
    },
    {
      title: "Mixing up the drugs and their sources",
      body: "Opioids (heroin, morphine): **latex** of Papaver somniferum. Cannabinoids: **inflorescences** of Cannabis sativa. Cocaine: Erythroxylum coca. Heroin is a **depressant**; cocaine is a **stimulant**. Smack is heroin.",
    },
    {
      title: "Benign versus malignant",
      body: "Only **malignant** tumours invade and **metastasise**. Benign tumours stay at their original location and cause little damage.",
    },
    {
      title: "Primary and secondary lymphoid organs swapped",
      body: "**Primary**: bone marrow and thymus (where lymphocytes form and mature). **Secondary**: spleen, lymph nodes, tonsils, Peyer's patches, appendix, MALT (where lymphocytes meet antigens).",
    },
  ],
};

export default sheet;
