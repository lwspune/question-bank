import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HH_IMMUNITY_NOTE: SubtopicNote = {
  subtopicName: "Immunity",
  title: "Immunity",
  oneLineDefinition:
    "Innate and acquired immunity, the B and T lymphocytes and the antibodies they make, active and passive immunity, allergy and autoimmunity, and the lymphoid organs of the immune system.",
  whyItMatters:
    "Eleven NEET questions from 2022 to 2026, the most of any page in this chapter. The lymphoid organs were asked three times (NEET 2024, NEET 2025 and Re-NEET 2026), innate against acquired immunity twice (NEET 2022 and NEET 2025) and autoimmune disorders twice (NEET 2022 and NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohh-innate-acquired",
      name: "Innate and acquired immunity",
      intuition:
        "Your body has two lines of defence. The first is there from birth and treats every invader the same way: skin, mucus, stomach acid, cells that swallow germs, and proteins that warn nearby cells about a virus. The second is learnt. It recognises one particular pathogen and remembers it, so the next time the same germ arrives the body hits back much harder and faster.",
      definition:
        "**Immunity** is the overall ability of the host to fight disease-causing organisms. It is of two types.\n\n" +
        "**Innate immunity** is a **non-specific** type of defence that is **present at the time of birth**. It works by four kinds of barrier to the entry of foreign agents:\n" +
        "- **Physical barriers:** the **skin**, and the **mucus** coating the epithelium of the respiratory, gastrointestinal and urogenital tracts, which traps microbes.\n" +
        "- **Physiological barriers:** **acid in the stomach, saliva in the mouth, tears from the eyes**.\n" +
        "- **Cellular barriers:** leucocytes in the blood, namely **polymorpho-nuclear leucocytes (PMNL, neutrophils)**, **monocytes** and **natural killer** lymphocytes, and **macrophages** in tissues, which phagocytose and destroy microbes.\n" +
        "- **Cytokine barriers:** virus-infected cells secrete proteins called **interferons**, which protect non-infected cells from further viral infection.\n\n" +
        "**Acquired immunity** is **pathogen specific** and is characterised by **memory**:\n" +
        "- On the first encounter with a pathogen the body gives a **primary response** of **low intensity**.\n" +
        "- A later encounter with the same pathogen gives a highly intensified **secondary or anamnestic response**, because the body remembers the first encounter.\n" +
        "- The primary and secondary responses are carried out by two kinds of lymphocyte in the blood: **B-lymphocytes** and **T-lymphocytes**.",
      table: {
        columns: ["Defence", "Type", "What it is"],
        rows: [
          {
            cells: ["Physical barrier", "Innate", "Skin; mucus coating the lining of the respiratory, gastrointestinal and urogenital tracts"],
            noteAmber: "NEET 2025: the immunity present at birth and non-specific is innate immunity.",
            pyqExampleId: "3f4c6d75-eb04-4cf8-ab4c-84881dc7eb3b",
          },
          { cells: ["Physiological barrier", "Innate", "Acid in the stomach, saliva in the mouth, tears from the eyes"] },
          { cells: ["Cellular barrier", "Innate", "PMNL (neutrophils), monocytes and natural killer lymphocytes in blood, and macrophages in tissues, which phagocytose microbes"] },
          {
            cells: ["Cytokine barrier", "Innate", "Interferons, secreted by virus-infected cells, which protect non-infected cells from further viral infection"],
            noteAmber: "Re-NEET 2024: interferons went with innate immunity, B-lymphocytes with an army of proteins, T-lymphocytes with cell-mediated immunity and colostrum with passive immunity.",
            pyqExampleId: "ebc7f39c-1f04-4edd-8768-3d0c93c0f308",
          },
          { cells: ["Primary response", "Acquired", "First encounter with a pathogen; low intensity"] },
          { cells: ["Secondary (anamnestic) response", "Acquired", "Later encounter with the same pathogen; highly intensified, because of memory"] },
        ],
      },
      pyqExampleId: "1d1bfe84-71d4-4373-9128-6645377c27da",
      selfCheckExample: {
        prompt: "Interferons are secreted by which cells, and which kind of innate barrier do they form?",
        steps: [
          "NCERT says interferons are proteins secreted by virus-infected cells.",
          "They protect non-infected cells from further viral infection, which makes them the cytokine barrier.",
        ],
        answer: "By virus-infected cells; the cytokine barrier.",
      },
      practiceSet: [
        { prompt: "Name the three physiological barriers of innate immunity.", answer: "Acid in the stomach, saliva in the mouth and tears from the eyes" },
        { prompt: "Is the mucus lining the respiratory tract a physical or a physiological barrier?", answer: "A physical barrier" },
        { prompt: "Which phagocytic cells in tissues form part of the cellular barrier?", answer: "Macrophages" },
        { prompt: "What are the two features that mark acquired immunity?", answer: "It is pathogen specific and it has memory" },
        { prompt: "Name the two kinds of lymphocyte that carry out acquired immunity.", answer: "B-lymphocytes and T-lymphocytes" },
      ],
      traps: [
        {
          title: "Innate is present at birth, acquired is learnt",
          body: "**Innate** immunity is **non-specific and present at birth**. **Acquired** immunity is **pathogen specific** and has **memory**; calling acquired immunity non-specific or present at birth is false.",
        },
        {
          title: "PMNLs are a cellular barrier",
          body: "**Neutrophils (PMNL)**, monocytes, NK cells and macrophages are the **cellular** barrier. The **cytokine** barrier is the **interferons**.",
        },
        {
          title: "Tears and saliva are physiological barriers",
          body: "**Skin and mucus** are the **physical** barriers. **Stomach acid, saliva and tears** are the **physiological** barriers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohh-antibodies",
      name: "Antibodies, active and passive immunity",
      intuition:
        "B cells answer an infection by pouring proteins called antibodies into the blood; T cells help them and also kill on their own. If your body makes its own antibodies, the immunity is active: slow to build but lasting. If you are handed ready-made antibodies, as a baby gets from its mother's first milk, the immunity is passive: instant but short.",
      definition:
        "Lymphocytes of acquired immunity:\n" +
        "- **B-lymphocytes** produce an army of proteins in response to pathogens into the blood. These proteins are **antibodies**. **T-cells** do not secrete antibodies but **help B-cells** produce them.\n" +
        "- Each antibody has **four peptide chains**: two small **light chains** and two longer **heavy chains**, so it is written **\\(H_2L_2\\)**. NCERT names **IgA, IgM, IgE and IgG** as types of antibody.\n" +
        "- The antibody response is the **humoral immune response**, because the antibodies are found in the blood.\n" +
        "- The response mediated by T-lymphocytes is **cell-mediated immunity (CMI)**. CMI is why the body can **reject a transplanted organ** (graft rejection). Tissue matching and blood group matching are needed before a transplant, and the patient takes **immunosuppressants** all their life.\n\n" +
        "Active and passive immunity:\n" +
        "- **Active immunity:** the host meets antigens (living or dead microbes or other proteins) and makes its own antibodies. It is **slow** and takes time to give its full response. Immunisation and natural infection both give active immunity.\n" +
        "- **Passive immunity:** **ready-made antibodies** are given directly. The yellowish **colostrum** secreted by the mother in the first days of lactation has abundant antibodies (**IgA**) that protect the infant. The **foetus** also receives some antibodies from its mother **through the placenta**. Where a quick response is needed, as for **tetanus**, preformed antibodies or antitoxin are injected; the injection given for a **snake bite** contains antibodies against the venom.\n\n" +
        "**Vaccination** introduces antigenic proteins of a pathogen, or the inactivated or weakened pathogen. The body makes antibodies and also **memory B and T cells**, which recognise the pathogen quickly later. **Recombinant DNA technology** produces antigenic polypeptides in bacteria or yeast: the **hepatitis B vaccine** is made from **yeast**.\n\n" +
        "**Antibiotics** are different from antibodies: they are chemicals produced by some **microbes** that kill or slow the growth of other, disease-causing microbes.",
      table: {
        columns: ["Term", "What it means", "Example"],
        rows: [
          {
            cells: ["Antibody", "Protein made by B-lymphocytes; four peptide chains, two light and two heavy (H₂L₂)", "IgA, IgM, IgE, IgG"],
            noteAmber: "NEET 2025: the statement that was NOT correct put the antigen binding site at the C-terminal region of the antibody.",
            pyqExampleId: "a7efebf7-70a1-4ea3-87e0-55a45d4c7e9d",
          },
          { cells: ["Humoral immune response", "Antibody-mediated, since antibodies are in the blood", "Response of B-lymphocytes"] },
          { cells: ["Cell-mediated immunity", "Mediated by T-lymphocytes", "Rejection of a transplanted organ"] },
          { cells: ["Active immunity", "The host makes its own antibodies after meeting antigens; slow to build", "Vaccination; natural infection"] },
          { cells: ["Passive immunity", "Ready-made antibodies are given directly; quick", "Colostrum (IgA); antibodies across the placenta; antitoxin for tetanus; antibodies against snake venom"] },
          {
            cells: ["Antibiotic", "Chemical made by some microbes that kills or slows the growth of other microbes", "Penicillin"],
            noteAmber: "Re-NEET 2024: both statements were true: antibiotics are made by microbes to kill other microbes, and antibodies are formed in the body to eliminate microbes.",
            pyqExampleId: "9962c46b-a8e6-492a-8e02-f4e79e907c2f",
          },
        ],
      },
      pyqExampleId: "6dc48526-0b65-46a9-8523-0bbe113cdb49",
      selfCheckExample: {
        prompt: "A person bitten by a snake is given an injection of antibodies against the venom. Is this active or passive immunisation, and why?",
        steps: [
          "The person's body has not made these antibodies itself.",
          "Ready-made antibodies given directly give passive immunity.",
        ],
        answer: "Passive immunisation, because preformed antibodies are injected.",
      },
      practiceSet: [
        { prompt: "How many peptide chains does an antibody molecule have, and how is it represented?", answer: "Four (two light and two heavy chains); H₂L₂" },
        { prompt: "Which kind of immune response is responsible for the rejection of a transplanted organ?", answer: "Cell-mediated immunity, by T-lymphocytes" },
        { prompt: "Name the four types of antibody NCERT lists.", answer: "IgA, IgM, IgE and IgG" },
        { prompt: "In which organism is the recombinant hepatitis B vaccine produced?", answer: "Yeast" },
        { prompt: "By which route does a foetus receive some antibodies from its mother?", answer: "Through the placenta" },
      ],
      traps: [
        {
          title: "Vaccines give active immunity",
          body: "A **vaccine** makes the body produce its **own** antibodies and memory cells: **active** immunity. **Passive** immunity is the gift of **ready-made** antibodies, as in colostrum or antivenom.",
        },
        {
          title: "T-cells help, B-cells secrete",
          body: "**B-lymphocytes** secrete the antibodies. **T-cells** do not secrete antibodies; they **help B-cells** and carry out **cell-mediated** immunity.",
        },
        {
          title: "Graft rejection is cell-mediated",
          body: "The body rejects a transplanted organ through **cell-mediated immunity (T-lymphocytes)**, not through the humoral (antibody) response.",
        },
        {
          title: "Antibiotics and antibodies are not the same",
          body: "**Antibiotics** are made by **microbes** and kill other microbes. **Antibodies** are made by the body's **B-lymphocytes**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohh-disorders",
      name: "Allergy and autoimmunity",
      intuition:
        "The immune system can go wrong in two ways. It can overreact to something harmless, like dust or pollen: that is an allergy. Or it can forget what belongs to the body and attack its own cells: that is an autoimmune disease. NEET also checks that you can tell an autoimmune disease from other joint and muscle disorders that only look similar.",
      definition:
        "**Allergy** is the **exaggerated response** of the immune system to certain antigens in the environment. The substances causing it are **allergens**, and the antibodies produced are of the **IgE type**.\n" +
        "- Common allergens: **mites in dust, pollens, animal dander**.\n" +
        "- Symptoms: **sneezing, watery eyes, running nose and difficulty in breathing**. They come from chemicals such as **histamine and serotonin** released from **mast cells**.\n" +
        "- The cause is found by exposing the patient to, or injecting, **very small doses of possible allergens** and studying the reactions.\n" +
        "- **Anti-histamine, adrenalin and steroids** quickly reduce the symptoms.\n" +
        "- Modern life has lowered immunity and made people more sensitive to allergens.\n\n" +
        "**Autoimmunity:** the immune system of higher vertebrates can tell foreign molecules from its own. Sometimes, due to **genetic and other unknown reasons**, the body **attacks self-cells**. This damages the body and is called **autoimmune disease**. **Rheumatoid arthritis** is NCERT's example.\n\n" +
        "Disorders from NCERT XI Locomotion and Movement that NEET mixes in:\n" +
        "- **Myasthenia gravis** is an **autoimmune** disorder of the neuromuscular junction.\n" +
        "- **Gout** (uric acid crystals in the joints) and **muscular dystrophy** (mostly genetic) are **not** autoimmune.",
      table: {
        columns: ["Disorder", "Autoimmune?", "What goes wrong"],
        rows: [
          { cells: ["Allergy", "No", "Exaggerated response to allergens; IgE antibodies; histamine and serotonin released from mast cells"] },
          {
            cells: ["Rheumatoid arthritis", "Yes", "The body attacks its own cells"],
            noteAmber: "NEET 2024: myasthenia gravis, rheumatoid arthritis and systemic lupus erythematosus (SLE) were the autoimmune disorders; gout and muscular dystrophy were not.",
            pyqExampleId: "d888c734-44e2-465e-af20-b8b97d7e6e64",
          },
          { cells: ["Myasthenia gravis", "Yes", "Affects the neuromuscular junction, leading to fatigue, weakening and paralysis of skeletal muscle"] },
          { cells: ["Gout", "No", "Inflammation of joints due to accumulation of uric acid crystals"] },
          { cells: ["Muscular dystrophy", "No", "Progressive degeneration of skeletal muscle, mostly due to a genetic disorder"] },
        ],
      },
      pyqExampleId: "ea5ac0e4-c2de-4733-b084-8c9774c2328f",
      selfCheckExample: {
        prompt: "A student starts sneezing, with watery eyes, near a dusty bookshelf. Which type of antibody is behind this, and which chemicals from which cells cause the symptoms?",
        steps: [
          "An exaggerated response to an allergen such as dust mites is an allergy.",
          "Allergy antibodies are of the IgE type, and the symptoms come from histamine and serotonin released by mast cells.",
        ],
        answer: "IgE antibodies; histamine and serotonin from mast cells.",
      },
      practiceSet: [
        { prompt: "Name three drugs that quickly reduce the symptoms of allergy.", answer: "Anti-histamine, adrenalin and steroids" },
        { prompt: "How is the cause of an allergy found?", answer: "The patient is exposed to, or injected with, very small doses of possible allergens and the reactions are studied" },
        { prompt: "Which autoimmune disorder affects the neuromuscular junction?", answer: "Myasthenia gravis" },
        { prompt: "What causes gout?", answer: "Accumulation of uric acid crystals in the joints" },
        { prompt: "Name three common allergens NCERT lists.", answer: "Mites in dust, pollens and animal dander" },
      ],
      traps: [
        {
          title: "Allergy antibodies are IgE",
          body: "In an allergy the antibodies produced are of the **IgE** type. **IgA** is the antibody abundant in colostrum.",
        },
        {
          title: "Gout and muscular dystrophy are not autoimmune",
          body: "**Gout** comes from **uric acid crystals** and **muscular dystrophy** is mostly **genetic**. **Myasthenia gravis** and **rheumatoid arthritis** are the autoimmune ones.",
        },
        {
          title: "In rheumatoid arthritis the body does attack itself",
          body: "**Rheumatoid arthritis** is NCERT's example of an **autoimmune** disease, where the body **attacks self-cells**. A statement that it does not attack self-cells is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohh-lymphoid",
      name: "Lymphoid organs",
      intuition:
        "Lymphocytes are born and trained in two places, the bone marrow and the thymus. Once trained, they move out to posts all over the body, the spleen, the lymph nodes, the tonsils and the patches of lymphoid tissue in the gut, where they wait for germs to arrive. The training schools are the primary organs; the posts are the secondary organs.",
      definition:
        "The **immune system** is made of lymphoid organs, tissues, cells and soluble molecules such as antibodies. **Lymphoid organs** are where lymphocytes originate, mature and multiply.\n\n" +
        "- **Primary lymphoid organs:** the **bone marrow** and **thymus**, where immature lymphocytes differentiate into **antigen-sensitive lymphocytes**.\n" +
        "- **Secondary lymphoid organs:** after maturation the lymphocytes migrate to the **spleen, lymph nodes, tonsils, Peyer's patches of the small intestine and the appendix**. These are the sites where lymphocytes **interact with the antigen**, which then multiply to become effector cells.\n\n" +
        "The organs one by one:\n" +
        "- **Bone marrow:** the **main lymphoid organ**, where **all blood cells including lymphocytes** are produced.\n" +
        "- **Thymus:** a lobular organ **near the heart, beneath the breastbone**. It is quite **large at birth**, keeps **shrinking with age**, and is very small by puberty. **Both the bone marrow and the thymus** provide micro-environments for the development and maturation of **T-lymphocytes**.\n" +
        "- **Spleen:** a large **bean-shaped** organ, mainly lymphocytes and phagocytes. It **filters the blood** by trapping blood-borne micro-organisms and is a large **reservoir of erythrocytes**.\n" +
        "- **Lymph nodes:** small solid structures at points along the lymphatic system. They **trap micro-organisms or other antigens** in the lymph and tissue fluid, which activates the lymphocytes there.\n" +
        "- **MALT** (mucosa-associated lymphoid tissue) lines the major tracts (respiratory, digestive and urogenital) and makes up about **50 per cent** of the lymphoid tissue in the human body.",
      table: {
        columns: ["Organ", "Primary or secondary", "Job"],
        rows: [
          {
            cells: ["Bone marrow", "Primary", "Main lymphoid organ: makes all blood cells including lymphocytes; micro-environment for T-lymphocyte maturation"],
            noteAmber: "NEET 2024: both statements were true: bone marrow makes all blood cells including lymphocytes, and both bone marrow and thymus help T-lymphocytes develop and mature.",
            pyqExampleId: "2d901a2f-0bba-4a75-b015-2667a36f7fb9",
          },
          { cells: ["Thymus", "Primary", "Near the heart, beneath the breastbone; large at birth, shrinks with age; micro-environment for T-lymphocyte maturation"] },
          {
            cells: ["Spleen", "Secondary", "Bean-shaped; filters blood by trapping micro-organisms; large reservoir of erythrocytes"],
            noteAmber: "Re-NEET 2026: tonsils and spleen were the secondary lymphoid organs; bone marrow and thymus are primary.",
            pyqExampleId: "4633c004-c344-4c32-b178-64a59389695e",
          },
          { cells: ["Lymph nodes", "Secondary", "Trap micro-organisms and antigens in lymph and tissue fluid, activating lymphocytes"] },
          { cells: ["Tonsils", "Secondary", "A site where mature lymphocytes meet antigens"] },
          { cells: ["Peyer's patches and appendix", "Secondary", "Lymphoid tissue of the small intestine and the appendix"] },
          { cells: ["MALT", "Lymphoid tissue in the linings", "Lines the respiratory, digestive and urogenital tracts; about 50% of the body's lymphoid tissue"] },
        ],
      },
      pyqExampleId: "4a7d451c-ffb3-4608-84ef-5c06b0cd0527",
      selfCheckExample: {
        prompt: "Why is the thymus of a newborn baby much larger than the thymus of an adult?",
        steps: [
          "NCERT says the thymus is quite large at the time of birth.",
          "It keeps reducing in size with age and is very small by puberty.",
        ],
        answer: "The thymus is large at birth and shrinks with age, becoming very small by puberty.",
      },
      practiceSet: [
        { prompt: "About what share of the lymphoid tissue in the human body is MALT?", answer: "About 50 per cent" },
        { prompt: "Where in the body is the thymus located?", answer: "Near the heart, beneath the breastbone" },
        { prompt: "Which lymphoid organ is a large reservoir of erythrocytes?", answer: "The spleen" },
        { prompt: "In the primary lymphoid organs, what do immature lymphocytes differentiate into?", answer: "Antigen-sensitive lymphocytes" },
        { prompt: "What do lymph nodes trap?", answer: "Micro-organisms or other antigens in the lymph and tissue fluid" },
      ],
      traps: [
        {
          title: "Bone marrow and thymus are primary",
          body: "**Bone marrow** and **thymus** are the **primary** lymphoid organs. The **spleen, lymph nodes, tonsils, Peyer's patches and appendix** are **secondary**.",
        },
        {
          title: "The thymus shrinks with age",
          body: "The thymus is **large at birth** and **reduces in size with age**, becoming very small by puberty. It does not grow larger in adults.",
        },
        {
          title: "Both primary organs help T-lymphocytes mature",
          body: "NCERT says **both the bone marrow and the thymus** provide micro-environments for the development and maturation of **T-lymphocytes**, not the thymus alone.",
        },
      ],
    },
  ],
};
