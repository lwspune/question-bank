import type { SubtopicNote } from "@/app/notes/_types";

const O2 = "\\(\\mathrm{O_2}\\)";
const CO2 = "\\(\\mathrm{CO_2}\\)";
const CA = "\\(\\mathrm{Ca^{2+}}\\)";

export const IMAT_BIO_HAP_BLOOD_IMMUNITY_NOTE: SubtopicNote = {
  subtopicName: "Blood and Immunity",
  title: "Blood Cells, Immune Defences and Blood Groups",
  oneLineDefinition:
    "Blood carries oxygen, food and wastes, and its white cells defend the body: some attack anything foreign, others target one pathogen and remember it.",
  whyItMatters:
    "The 2026 paper asked the main job of red blood cells. The Cambridge papers asked which cells defend against infection (2013), what B lymphocytes do and where they come from (2018, 2019), why blood cell counts change (2021), and which transplant needs no tissue matching (2021).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-blood-cells",
      name: "Blood: plasma, red cells, white cells and platelets",
      intuition:
        "Blood is a liquid tissue. The liquid part, plasma, carries dissolved substances; the cells each have one job. Red cells are little more than bags of haemoglobin, white cells defend, and platelets plug leaks.",
      definition:
        "Blood is about 55% **plasma** and 45% cells.\n" +
        "- All blood cells come from **stem cells in the red bone marrow**.\n" +
        "- Red cells have **no nucleus and no mitochondria**, which leaves more room for haemoglobin. They respire anaerobically and so do not use the oxygen they carry. They live about 120 days and are broken down in the liver and spleen.\n" +
        `- When blood ${O2} is low (for example at high altitude), the kidney releases **erythropoietin (EPO)**, and the marrow makes more red cells.\n` +
        `- **Clotting**: damaged tissue and platelets set off a cascade that turns prothrombin into **thrombin**; thrombin turns soluble **fibrinogen** into insoluble **fibrin** threads that trap cells. ${CA} and vitamin K are needed.\n` +
        "- A rise in white cells usually signals infection; a rise in red cells can follow a stay at altitude.",
      table: {
        columns: ["Component", "Structure", "Main job"],
        rows: [
          { cells: ["Plasma", "Water with glucose, amino acids, ions, urea, hormones and plasma proteins (albumin, fibrinogen, antibodies)", `Transport; carries most ${CO2} as hydrogencarbonate ions`] },
          { cells: ["Red blood cell (erythrocyte)", "Biconcave disc, no nucleus, full of haemoglobin", `Carries ${O2} from the lungs to the tissues`] },
          { cells: ["Neutrophil", "Lobed nucleus, granular cytoplasm; the commonest white cell", "Phagocytosis; first to arrive at an infection"] },
          { cells: ["Monocyte and macrophage", "Large cell with a kidney-shaped nucleus; becomes a macrophage in tissues", "Phagocytosis and presenting antigens to lymphocytes"] },
          { cells: ["Lymphocyte", "Large round nucleus, little cytoplasm", "Specific immunity: B cells make antibodies, T cells kill or coordinate"] },
          { cells: ["Platelet", "Cell fragment without a nucleus", "Starts blood clotting"] },
        ],
      },
      selfCheckExample: {
        prompt: "A climber spends a month at high altitude. Which change best explains why their blood then carries more oxygen?",
        options: [
          "The kidney releases more erythropoietin, so the bone marrow makes more red cells",
          "More fibrinogen is made by the liver",
          "More neutrophils are made",
          "Each haemoglobin molecule can now carry eight oxygen molecules",
          "Red cells gain mitochondria",
        ],
        steps: [
          "Low oxygen triggers erythropoietin from the kidney. More red cells means more haemoglobin per litre of blood.",
          "Fibrinogen (B) is for clotting and neutrophils (C) for defence. One haemoglobin carries at most four oxygen molecules (D). Mature red cells never have mitochondria (E).",
        ],
        answer: "(A) The kidney releases more erythropoietin, so the bone marrow makes more red cells",
      },
      practiceSet: [
        { prompt: "Which blood cells have no nucleus?", answer: "Mature red blood cells (platelets are cell fragments with none either)" },
        { prompt: "Which plasma protein is turned into the threads of a clot?", answer: "Fibrinogen, which becomes fibrin" },
        { prompt: "Where are all blood cells made in an adult?", answer: "In the red bone marrow" },
        { prompt: "About how long does a red blood cell live?", answer: "About 120 days" },
      ],
      traps: [
        {
          title: "Red cells do not fight infection or clot blood",
          body: `Their one main job is carrying ${O2}. White cells defend, platelets and fibrin clot, and ${CO2} goes to the lungs (mostly in the plasma as hydrogencarbonate), never to the liver.`,
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-innate-defence",
      name: "Non-specific defences: barriers, phagocytes and inflammation",
      intuition:
        "The first defences treat every invader the same way. Barriers keep most microbes out, and phagocytes eat whatever gets through. These defences are fast but do not improve with a second infection.",
      definition:
        "**Non-specific (innate) defences** act against any pathogen, quickly, in the same way every time.\n" +
        "- An **antigen** is a molecule, usually a protein or glycoprotein on a cell surface, that the immune system recognises as foreign.\n" +
        "- **Phagocytosis**: a neutrophil or macrophage engulfs a bacterium into a vesicle (phagosome); lysosomes fuse with it and their enzymes digest the bacterium.\n" +
        "- **Opsonins** (antibodies and some blood proteins) coat a pathogen so phagocytes take it up faster. Do not confuse them with **opsin**, the protein in the eye.\n" +
        "- **Inflammation**: damaged cells and mast cells release **histamine**, which widens arterioles and makes capillaries leaky. The area becomes red, hot and swollen, and white cells reach it faster.\n" +
        "- **Fever**: the hypothalamus raises the set point, which slows microbial growth.",
      table: {
        columns: ["Defence", "How it works", "Where"],
        rows: [
          { cells: ["Skin", "Tough outer layer of dead keratinised cells; slightly acidic surface", "Body surface"] },
          { cells: ["Mucus and cilia", "Mucus traps microbes and dust; cilia sweep it up to the throat", "Airways"] },
          { cells: ["Stomach acid", "pH about 2 kills most swallowed microbes", "Stomach"] },
          { cells: ["Lysozyme", "Enzyme that breaks bacterial cell walls", "Tears, saliva, nasal mucus"] },
          { cells: ["Phagocytes", "Engulf and digest pathogens", "Blood and tissues"] },
          { cells: ["Inflammation", "Histamine causes vasodilation and leaky capillaries", "Site of injury or infection"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of the following defences acts against only one particular pathogen?",
        options: [
          "Lysozyme in tears",
          "Stomach acid",
          "Inflammation",
          "Phagocytosis by neutrophils",
          "Antibodies made by plasma cells",
        ],
        steps: [
          "Each antibody fits one antigen shape, so it acts against one pathogen. That is the specific immune response.",
          "Lysozyme, acid, inflammation and phagocytosis all act on any invader in the same way.",
        ],
        answer: "(E) Antibodies made by plasma cells",
      },
      practiceSet: [
        { prompt: "Which chemical released by mast cells causes the redness and swelling of inflammation?", answer: "Histamine" },
        { prompt: "Which organelle fuses with a phagosome to digest a bacterium?", answer: "The lysosome" },
        { prompt: "Name an enzyme in tears that attacks bacteria.", answer: "Lysozyme" },
      ],
      traps: [
        {
          title: "Beta cells are not immune cells",
          body: "Beta cells are in the pancreas and make insulin. The cells that defend against infection are phagocytes and lymphocytes (B cells and T cells), plus the antibodies that plasma cells make.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-lymphocytes",
      name: "B and T lymphocytes, antibodies and immune memory",
      intuition:
        "Each lymphocyte carries receptors for one antigen shape. When that antigen appears, only the matching cells are chosen and copied many times. Some copies fight now; others stay as memory cells, which is why the second infection is beaten faster.",
      definition:
        "**Specific (adaptive) immunity** recognises one antigen and remembers it.\n" +
        "- **Clonal selection**: the lymphocyte whose receptor fits the antigen is activated and divides by **mitosis** into many identical cells.\n" +
        "- B cells become **plasma cells**, which transcribe and translate antibody genes at a high rate (lots of rough ER), and **memory B cells**. B cells do not engulf and digest bacteria; phagocytes do that.\n" +
        "- **Antibodies** are Y-shaped proteins of four polypeptide chains (two heavy, two light) held by disulfide bonds. The tips (variable regions) bind one specific antigen. They clump pathogens together (agglutination), neutralise toxins and mark pathogens for phagocytes.\n" +
        "- **Humoral** response: B cells and antibodies in the body fluids. **Cell-mediated** response: T cells acting on infected cells.\n" +
        "- **Primary response**: slow (about a week) and small. **Secondary response**: faster and much larger, because memory cells are already present.",
      table: {
        columns: ["Cell", "Made in", "Matures in", "Job"],
        rows: [
          { cells: ["B lymphocyte", "Bone marrow", "Bone marrow", "Binds antigen, divides, becomes plasma cells and memory cells"] },
          { cells: ["Plasma cell", "Lymph nodes and spleen, from a B cell", "Already mature", "Secretes large amounts of one antibody"] },
          { cells: ["Helper T cell", "Bone marrow", "Thymus", "Releases cytokines that activate B cells, killer T cells and macrophages; the cell HIV destroys"] },
          { cells: ["Cytotoxic (killer) T cell", "Bone marrow", "Thymus", "Kills body cells infected by viruses, and cancer cells"] },
          { cells: ["Memory B and T cells", "Bone marrow", "As their parent cell", "Survive for years and start a fast secondary response"] },
        ],
      },
      selfCheckExample: {
        prompt: "A baby is born without a thymus. Which cells are most directly affected?",
        options: ["B lymphocytes", "T lymphocytes", "Red blood cells", "Neutrophils", "Platelets"],
        steps: [
          "T lymphocytes are made in the bone marrow but must mature in the thymus. Without it, there are almost no working T cells.",
          "B cells (A) mature in the bone marrow. Red cells, neutrophils and platelets do not pass through the thymus at all.",
        ],
        answer: "(B) T lymphocytes",
      },
      practiceSet: [
        { prompt: "What do plasma cells secrete?", answer: "Antibodies" },
        { prompt: "Which lymphocyte does HIV infect and destroy?", answer: "The helper T cell" },
        { prompt: "How many polypeptide chains make up one antibody molecule?", answer: "Four: two heavy and two light" },
        { prompt: "Why is the secondary immune response faster than the primary?", answer: "Memory cells for that antigen already exist and divide at once" },
      ],
      traps: [
        {
          title: "B for bone marrow, T for thymus",
          body: "Both kinds of lymphocyte are formed from bone marrow stem cells. B cells also mature there; only T cells are processed in the thymus. An option saying B cells mature in the thymus is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-immunity-types",
      name: "Active and passive immunity, and how vaccines work",
      intuition:
        "Immunity is active when your own lymphocytes make the antibodies, so memory cells form and protection lasts. It is passive when you receive ready-made antibodies: protection starts at once but fades as the borrowed antibodies are broken down.",
      definition:
        "- **Active immunity**: the body makes its own antibodies and memory cells. Slow to start, long-lasting.\n" +
        "- **Passive immunity**: antibodies come from outside. Immediate, but no memory cells, so it lasts only weeks to months.\n" +
        "- A **vaccine** contains antigens without the disease: killed or weakened pathogens, inactivated toxins (toxoids), purified proteins, or mRNA that makes the body produce one viral protein. It causes a primary response and leaves memory cells.\n" +
        "- **Booster doses** produce a secondary response, raising antibody levels higher and for longer.\n" +
        "- **Herd immunity**: when most people are immune, a pathogen cannot spread, which protects those who cannot be vaccinated.\n" +
        "- Viruses whose antigens keep changing (influenza) need new vaccines often.",
      table: {
        columns: ["Type", "How it is gained", "Memory cells", "Example"],
        rows: [
          { cells: ["Natural active", "Catching the disease", "Yes, long-lasting", "Immunity after recovering from measles"] },
          { cells: ["Artificial active", "Vaccination", "Yes, long-lasting", "The measles, mumps and rubella vaccine"] },
          { cells: ["Natural passive", "Antibodies cross the placenta, or come in breast milk", "No, lasts weeks to months", "Protection of a newborn baby"] },
          { cells: ["Artificial passive", "Injection of ready-made antibodies", "No, lasts weeks", "Antivenom after a snake bite; tetanus antitoxin"] },
        ],
      },
      selfCheckExample: {
        prompt: "A hiker bitten by a venomous snake is injected with antibodies against the venom. Which statement is correct?",
        options: [
          "This is active immunity, giving lifelong protection",
          "The injection makes the hiker's memory cells multiply",
          "This is natural passive immunity",
          "This is passive immunity: protection starts at once but is short-lived",
          "Protection starts only after about two weeks",
        ],
        steps: [
          "Ready-made antibodies were given, so the hiker's own lymphocytes made nothing. That is artificial passive immunity: it acts at once and no memory cells form.",
          "A and B describe active immunity. C is wrong because injection is artificial. E describes the delay of a primary response.",
        ],
        answer: "(D) This is passive immunity: protection starts at once but is short-lived",
      },
      practiceSet: [
        { prompt: "Antibodies a baby gets in breast milk give which type of immunity?", answer: "Natural passive immunity" },
        { prompt: "Why are booster vaccine doses given?", answer: "They cause a secondary response, giving higher and longer-lasting antibody levels" },
        { prompt: "Does passive immunity produce memory cells?", answer: "No" },
      ],
      traps: [
        {
          title: "Passive immunity has no memory",
          body: "Received antibodies are proteins that are slowly broken down. Because the person's own B cells were never activated, no memory cells form and the protection does not last.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-blood-groups",
      name: "ABO and Rhesus blood groups, transfusions and transplants",
      intuition:
        "Red cells carry antigens on their surface, and plasma carries antibodies against the antigens a person does not have. A transfusion is dangerous when the donor's red cells carry an antigen that the recipient's antibodies attack: the cells clump together.",
      definition:
        "- **ABO system**: antigens A and B on red cells; the plasma has antibodies against whichever antigen is absent. The alleles for A and B are codominant; the allele for O is recessive.\n" +
        "- **Agglutination** (clumping) happens when donor red cell antigens meet matching antibodies in the recipient.\n" +
        "- Group O red cells have no A or B antigen, so they can be given to anyone (**universal donor**). Group AB plasma has no anti-A or anti-B, so AB people can receive any group (**universal recipient**).\n" +
        "- **Rhesus**: Rh positive cells carry the D antigen. An Rh negative person makes anti-D only after exposure. An Rh negative mother carrying an Rh positive baby can be sensitised at birth, so a later Rh positive baby may be harmed; an anti-D injection prevents this.\n" +
        "- **Transplants**: donor and recipient tissue types (MHC or HLA proteins) must be closely matched, and drugs suppress the immune system. The **cornea** has no blood vessels, so immune cells rarely reach it and it is usually transplanted without matching.",
      table: {
        columns: ["Blood group", "Antigens on red cells", "Antibodies in plasma", "Can safely receive red cells from"],
        rows: [
          { cells: ["A", "A", "Anti-B", "A and O"] },
          { cells: ["B", "B", "Anti-A", "B and O"] },
          { cells: ["AB", "A and B", "Neither", "A, B, AB and O"] },
          { cells: ["O", "Neither", "Anti-A and anti-B", "O only"] },
          { cells: ["Rh negative", "No D antigen", "Anti-D only after exposure", "Rh negative only"] },
        ],
      },
      selfCheckExample: {
        prompt: "A patient with blood group B needs red cells urgently and no group B blood is available. Which donor group is safe?",
        options: ["A", "AB", "O", "A or AB", "Any group"],
        steps: [
          "The patient has anti-A antibodies, so any red cells with antigen A would clump. Group O cells carry neither antigen.",
          "Groups A and AB both carry antigen A, so A, B, D and E are unsafe.",
        ],
        answer: "(C) O",
      },
      practiceSet: [
        { prompt: "Which antibodies are in the plasma of a group A person?", answer: "Anti-B" },
        { prompt: "Which group is the universal recipient?", answer: "AB" },
        { prompt: "Why can a cornea usually be transplanted without tissue matching?", answer: "It has no blood vessels, so immune cells rarely reach it" },
      ],
      traps: [
        {
          title: "Universal donor means no antigens, not no antibodies",
          body: "Group O plasma does contain anti-A and anti-B. Group O is the universal donor of red cells because those cells carry neither A nor B antigen, so the recipient's antibodies have nothing to attack.",
        },
      ],
    },
  ],
};
