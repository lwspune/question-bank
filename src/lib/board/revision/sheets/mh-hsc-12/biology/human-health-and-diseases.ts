import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 10 Human Health and Diseases. Definitions checked
 * against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the 11 board past-paper questions in the bank,
 * 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Human Health and Diseases",
  chapterSlug: "human-health-and-diseases",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 10",
  keyPoints: [
    {
      term: "Antigen and antibody",
      text: "**Antigen:** any foreign substance invading the body and capable of stimulating an immune response. **Antibodies:** the protective chemicals (glycoproteins, immunoglobulins) produced by immune cells in response to antigens. The immune system distinguishes **self** from **non self**.",
    },
    {
      term: "Innate immunity",
      text: "The resistance to infection an individual has by virtue of his genetic make up: inborn, not affected by prior contact or immunisation. Its barriers: skin and mucosa, lysozyme in tears, gastric acid, complement and interferons, phagocytes and NK cells, fever, acute phase proteins.",
    },
    {
      term: "Unique features of acquired immunity",
      text: "Acquired (adaptive, specific) immunity is gained during life. **Specificity:** specific antibody or T cell against one antigen. **Diversity:** recognises a vast variety of pathogens. **Discrimination** between self and non self. **Memory:** a second encounter gives a quicker and stronger response.",
    },
    {
      term: "Active and passive immunity",
      text: "**Active:** the body makes its own antibodies after an antigenic stimulus; natural (after infection, e.g. measles) or artificial (vaccines, e.g. polio, BCG); long lasting. **Passive:** ready made antibodies are received; natural (placenta, colostrum) or artificial (antiserum, e.g. against rabies); short lived.",
    },
    {
      term: "Lymphocytes",
      text: "Arise from stem cells in foetal liver and adult bone marrow. **B lymphocytes** (bursal) form the humoral or antibody mediated immune system (AMIS). **T lymphocytes**, matured in the thymus, form the cell mediated immune system (CMIS).",
    },
    {
      term: "Cells of the immune system",
      text: "**Helper T cells:** lymphokines, stimulate B cells and macrophages. **Cytotoxic (killer) T cells:** bind infected cells and secrete **perforins** that make holes in them. **Suppressor T cells:** stop attack on own cells. **Memory cells:** keep the sensitisation. **Plasma cells:** secrete antibodies. **Antigen presenting cells:** activate helper T cells.",
    },
    {
      term: "Structure of antibody",
      text: "A **Y shaped** molecule of four polypeptide chains, two heavy (H) and two light (L), held by disulfide bonds. The **hinge** joins arms and stem. Each chain has a variable and a constant region. Plasma cells make antibodies at about **2000 molecules per second**.",
    },
    {
      term: "Antigen antibody complex",
      text: "Antigen binding sites of the antibody, the **paratopes**, lie on the **variable regions**. They bind the antigenic determinants (**epitopes**) in a lock and key manner, forming an antigen antibody complex. Free antibodies then cause agglutination, opsonisation and neutralisation of toxins.",
    },
    {
      term: "Typhoid",
      text: "An acute infection of the intestine caused by *Salmonella typhi*, a Gram negative bacterium. **Symptoms:** prolonged fever up to 104°F, headache, abdominal pain, rose coloured rash, white coat on tongue. **Transmission:** food and water borne; houseflies carry it from faeces to food. **Diagnosis:** Widal test.",
    },
    {
      term: "AIDS",
      text: "Acquired immuno deficiency syndrome, caused by **HIV**, a retrovirus (ss RNA) that destroys T4 lymphocytes. Spread by unsafe sex, blood transfusion and **sharing of needles**, and from mother to child. Not spread by hugging, handshake or mosquito bite. Prevention: education, disposable needles and syringes.",
    },
    {
      term: "Adolescence",
      text: "The period that begins with the appearance of secondary sexual characters and ends with cessation of body growth, between 10 and 19 years. Stages: early (10 to 14), middle (15 to 17), late (18 to 19 years).",
    },
    {
      term: "Middle adolescence (15 to 17 years)",
      text: "Secondary sexual characters almost completely developed; growth slows and about **95%** of adult stature is reached; thinking becomes more abstract, with long range thinking; body image re established; sense of leadership; attraction towards the opposite sex; peer group defines behaviour.",
    },
    {
      term: "Addiction",
      text: "A complex condition characterised by **compulsive use** of a substance despite its harmful consequences (alcohol, opioids, cocaine, nicotine) or a behaviour (gambling). It acts on the brain's reward pathway through **dopamine**; the changes are reversible once use stops.",
    },
    {
      term: "Commonly abused drugs",
      text: "**Opioids:** heroin (smack, diacetyl morphine) from poppy, a depressant. **Cannabinoids:** from *Cannabis sativa* (marijuana, hashish, **charas, ganja**); act on brain receptors and affect the cardiovascular system. **Cocaine:** alkaloid of *Erythroxylum coca*; raises dopamine, excess gives extreme happiness, irritability, paranoia. Shared needles spread HIV and hepatitis B.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the response of B lymphocytes to an antigen (antibody mediated immunity)",
      steps: [
        "B lymphocytes are sensitised directly by antigens and by helper T cells.",
        "An activated B lymphocyte multiplies fast into a clone of plasma cells and memory B cells.",
        "Plasma cells secrete antibodies into body fluids (blood, lymph); memory B cells keep the memory for a second encounter.",
        "Antibodies bind the antigen to form an antigen antibody complex, then act by agglutination, opsonisation and neutralisation of toxins.",
      ],
    },
    {
      title: "Explain the response of T lymphocytes to an antigen (cell mediated immunity)",
      steps: [
        "An antigen presenting cell engulfs the pathogen and presents the processed antigen on its surface, activating helper T cells.",
        "The T lymphocyte forms a clone of four kinds of T cells.",
        "Helper T cells make lymphokines; cytotoxic T cells secrete perforins and kill infected and cancer cells.",
        "Suppressor T cells stop attack on own cells; memory T cells keep the sensitisation for the future.",
      ],
    },
  ],
  diagrams: [
    { title: "Structure of antibody", labels: ["two heavy chains", "two light chains", "variable and constant regions", "antigen binding site (paratope)", "hinge", "disulfide bonds"] },
    { title: "Formation of antigen antibody complex", labels: ["antigen", "antigenic determinants (epitopes)", "paratopes of antibodies bound to epitopes"] },
    { title: "Structure of HIV", labels: ["gp120 and gp41", "lipid coat", "matrix protein (p17)", "capsid protein (p24)", "two ss RNA", "reverse transcriptase"] },
    { title: "Salmonella typhi", labels: ["capsule (K antigen)", "somatic O antigen", "flagella (H antigen)"] },
  ],
  mostAsked: [
    { topic: "Antibody: structure with a labelled sketch, the antigen binding site, rate of production", years: [2026, 2025] },
    { topic: "Typhoid: causative agent, symptoms and mode of transmission", years: [2026, 2024] },
    { topic: "Addiction and drugs: cocaine, cannabinoids, charas and ganja", years: [2026] },
    { topic: "Acquired immunity: its unique features and the cells of the immune system", years: [2024] },
    { topic: "Adolescence: definition and the features of the 15 to 17 years stage", years: [2025] },
    { topic: "Diseases spread by unsterilised needles (AIDS, hepatitis B)", years: [2024] },
  ],
  mistakes: [
    {
      title: "Epitope and paratope swapped",
      body: "The **epitope** is on the antigen; the **paratope** is the antigen binding site on the antibody's variable region.",
    },
    {
      title: "Labelling the antibody",
      body: "The antigen binding site is at the tips of the arms (variable regions), not on the stem. Draw both heavy and light chains and the disulfide bonds.",
    },
    {
      title: "Vaccines give active immunity",
      body: "A vaccine makes the body form its own antibodies: **artificial active** immunity. Ready made antibodies (antiserum, colostrum) give **passive** immunity.",
    },
    {
      title: "Typhoid is bacterial",
      body: "Typhoid is caused by the bacterium *Salmonella typhi*, diagnosed by the Widal test. Do not name a virus or a protozoan.",
    },
    {
      title: "Wrong source plant",
      body: "Charas, ganja, hashish and marijuana come from *Cannabis sativa*; cocaine from *Erythroxylum coca*; heroin from the poppy *Papaver somniferum*.",
    },
  ],
};

export default sheet;
