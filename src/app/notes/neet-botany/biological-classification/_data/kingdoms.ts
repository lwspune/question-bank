import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_BC_KINGDOMS_NOTE: SubtopicNote = {
  subtopicName: "Five Kingdoms, Monera and Protista",
  title: "Five Kingdoms, Monera and Protista",
  oneLineDefinition:
    "Whittaker's five kingdoms and the features that separate them, then the two simplest kingdoms: Monera (bacteria, cyanobacteria and Mycoplasma) and Protista (single-celled eukaryotes).",
  whyItMatters:
    "Eight NEET questions from 2022 to 2026, more than half of the chapter. Two ask about Whittaker's system itself (the criteria in NEET 2026, the order of body organisation in NEET 2025), five are on Monera, and one matches four protists to their mode of nutrition (Re-NEET 2024). Most are statement questions where one NCERT line decides each option.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbobc-kingdoms",
      name: "Whittaker's five kingdoms",
      intuition:
        "People have sorted living things for a long time. Aristotle sorted plants into trees, shrubs and herbs, and animals into those with red blood and those without. Linnaeus used just two kingdoms, Plantae and Animalia. Two boxes were too few: they mixed up prokaryotes and eukaryotes, single cells and many cells, and green plants with fungi. So in 1969 R.H. Whittaker proposed five kingdoms, using several features at once.",
      definition:
        "Whittaker's system (1969):\n" +
        "- The five kingdoms are **Monera, Protista, Fungi, Plantae and Animalia**.\n" +
        "- His main criteria: **cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships**.\n" +
        "- **Monera** is the only prokaryotic kingdom; the other four are eukaryotic.\n" +
        "- Single-celled *Chlamydomonas* and *Chlorella* (once called plants, with cell walls) were put in **Protista** with *Paramoecium* and *Amoeba* (once called animals, with no wall).\n" +
        "- Fungi, which were kept with plants, got a kingdom of their own because they are heterotrophs with walls of chitin.\n" +
        "- A newer **three-domain system** splits Monera into two domains and keeps all eukaryotes in the third.",
      table: {
        columns: ["Kingdom", "Cell type", "Cell wall", "Body organisation", "Mode of nutrition"],
        rows: [
          {
            cells: ["Monera", "Prokaryotic, no nuclear membrane", "Noncellulosic (polysaccharide and amino acid)", "Cellular", "Autotrophic (photosynthetic or chemosynthetic) and heterotrophic (saprophytic or parasitic)"],
            noteAmber: "Re-NEET 2026: of bacteria, blue-green algae, Mycoplasma and fungi, only fungi are not prokaryotes.",
            pyqExampleId: "7863d757-b690-4f54-85d7-ce38b7002b0a",
          },
          { cells: ["Protista", "Eukaryotic, nuclear membrane present", "Present in some", "Cellular", "Autotrophic (photosynthetic) and heterotrophic"] },
          { cells: ["Fungi", "Eukaryotic, nuclear membrane present", "Present, without cellulose", "Multicellular or loose tissue", "Heterotrophic (saprophytic or parasitic)"] },
          { cells: ["Plantae", "Eukaryotic, nuclear membrane present", "Present (cellulose)", "Tissue or organ", "Autotrophic (photosynthetic)"] },
          {
            cells: ["Animalia", "Eukaryotic, nuclear membrane present", "Absent", "Tissue, organ or organ system", "Heterotrophic (holozoic, saprophytic and others)"],
            noteAmber: "NEET 2025: in rising order of body organisation the kingdoms run Monera, Protista, Fungi, Plantae, Animalia.",
            pyqExampleId: "394505dd-b0e0-4e00-a4b9-abd9a7f3c611",
          },
        ],
      },
      pyqExampleId: "5be9576d-e322-493d-bb7f-0b7daf23fe85",
      selfCheckExample: {
        prompt: "An organism is eukaryotic, many-celled, has no cell wall and takes in its food by eating it. To which of Whittaker's kingdoms does it belong, and which single feature already rules out Plantae and Fungi?",
        steps: [
          "Plantae have cellulose walls and Fungi have walls without cellulose.",
          "Only Animalia has no cell wall, and its nutrition is heterotrophic (holozoic).",
        ],
        answer: "Animalia; having no cell wall rules out both Plantae and Fungi.",
      },
      practiceSet: [
        { prompt: "Who proposed the five kingdom classification, and in which year?", answer: "R.H. Whittaker, 1969" },
        { prompt: "Into which two kingdoms did Linnaeus divide living organisms?", answer: "Plantae and Animalia" },
        { prompt: "Which kingdom of the five kingdom system has no cell wall at all?", answer: "Animalia" },
        { prompt: "Which kingdom of the five kingdom system has a cellulose cell wall and photosynthetic nutrition?", answer: "Plantae" },
        { prompt: "In which kingdom does the five kingdom system place *Chlamydomonas* and *Chlorella*?", answer: "Protista" },
      ],
      traps: [
        {
          title: "Fungi are eukaryotes",
          body: "Only **Monera** is prokaryotic. Fungi have a nucleus with a nuclear membrane, so they are **eukaryotes**, like protists, plants and animals.",
        },
        {
          title: "Aristotle, not Linnaeus, used trees, shrubs and herbs",
          body: "**Aristotle** sorted plants into trees, shrubs and herbs. **Linnaeus** gave the two-kingdom system of **Plantae and Animalia**.",
        },
        {
          title: "The fungal wall has no cellulose",
          body: "A fungal cell wall is made of **chitin** and polysaccharides. A **cellulose** wall belongs to **Plantae**, and Monera have a noncellulosic wall of polysaccharide and amino acid.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobc-bacteria",
      name: "Bacteria: shapes, nutrition and archaebacteria",
      intuition:
        "Bacteria are the only members of Kingdom Monera. They live almost everywhere, even in hot springs, deserts and deep oceans. Their bodies are simple, but what they do is not: as a group they show the widest range of ways to get food and energy of any living things.",
      definition:
        "Kingdom Monera:\n" +
        "- **Four shapes**: spherical **coccus**, rod-shaped **bacillus**, comma-shaped **vibrium** and spiral **spirillum**.\n" +
        "- Most bacteria are **heterotrophs**; some are **autotrophs**, either **photosynthetic** or **chemosynthetic**.\n" +
        "- **Archaebacteria** live in the harshest places and differ from other bacteria in their **cell wall structure**.\n" +
        "- **Eubacteria** (true bacteria) have a **rigid cell wall**, and motile ones have a **flagellum**.\n" +
        "- They reproduce mainly by **fission**, form **spores** in bad conditions, and show a primitive kind of **DNA transfer** as sexual reproduction.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["Spherical", "Coccus (plural cocci)"] },
          { cells: ["Rod-shaped", "Bacillus (plural bacilli)"] },
          { cells: ["Comma-shaped", "Vibrium (vibrio)"] },
          {
            cells: ["Spiral", "Spirillum (plural spirilla)"],
            noteAmber: "Re-NEET 2026 matched the four shapes: spherical cocci, rod bacilli, comma vibrio, spiral spirilla.",
            pyqExampleId: "c8f61d59-ca12-4fd8-b212-2a523ed28211",
          },
          { cells: ["Chemosynthetic autotrophs", "Oxidise inorganic substances such as nitrates, nitrites and ammonia and use the energy to make ATP; they recycle nitrogen, phosphorus, iron and sulphur"] },
          { cells: ["Heterotrophic bacteria", "The most abundant; important decomposers; used to make curd from milk and antibiotics; some fix nitrogen in legume roots"] },
          { cells: ["Diseases", "Cholera, typhoid, tetanus and citrus canker"] },
          { cells: ["Halophiles", "Archaebacteria of extremely salty areas"] },
          { cells: ["Thermoacidophiles", "Archaebacteria of hot springs"] },
          { cells: ["Methanogens", "Archaebacteria of marshy areas and the gut of ruminants such as cows and buffaloes; they make methane (biogas) from dung"] },
        ],
      },
      pyqExampleId: "151ea8b4-14dc-4e8a-a8aa-e9f8cacf81ba",
      selfCheckExample: {
        prompt: "A bacterium lives in the gut of a buffalo and gives off methane from the dung. Is it an archaebacterium or a eubacterium, and to which group does it belong?",
        steps: [
          "Methane-making bacteria of marshes and ruminant guts are the methanogens.",
          "Methanogens are one of the three groups of archaebacteria.",
        ],
        answer: "An archaebacterium: a methanogen.",
      },
      practiceSet: [
        { prompt: "What is a rod-shaped bacterium called?", answer: "Bacillus" },
        { prompt: "Which archaebacteria live in hot springs?", answer: "Thermoacidophiles" },
        { prompt: "In what feature do archaebacteria differ from other bacteria?", answer: "Their cell wall structure" },
        { prompt: "Which inorganic substances do chemosynthetic bacteria oxidise to get energy?", answer: "Nitrates, nitrites and ammonia" },
        { prompt: "By what process do bacteria mainly reproduce?", answer: "Fission" },
      ],
      traps: [
        {
          title: "Bacteria are not all heterotrophs",
          body: "Most bacteria are heterotrophs, but some are **autotrophs**: photosynthetic like cyanobacteria, or chemosynthetic like the nitrifying bacteria.",
        },
        {
          title: "Comma is vibrio, spiral is spirillum",
          body: "A **comma**-shaped bacterium is a **vibrio**; a **spiral** one is a **spirillum**. Spherical ones are **cocci** and rods are **bacilli**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobc-cyanobacteria-mycoplasma",
      name: "Cyanobacteria and Mycoplasma",
      intuition:
        "Two members of Monera get their own questions. Cyanobacteria are bacteria that photosynthesise like plants, which is why they were once called blue-green algae. Mycoplasma is the opposite kind of record holder: it has no cell wall at all and is the smallest living cell known.",
      definition:
        "Cyanobacteria (blue-green algae):\n" +
        "- Have **chlorophyll a**, like green plants, and are **photosynthetic autotrophs**.\n" +
        "- Are **unicellular, colonial or filamentous**, in fresh water, the sea or on land.\n" +
        "- Some fix nitrogen in special cells called **heterocysts**, for example *Nostoc* and *Anabaena*.\n\n" +
        "*Mycoplasma*:\n" +
        "- **Completely lacks a cell wall**.\n" +
        "- The **smallest living cells** known; NCERT's cell chapter gives about **0.3 µm** in length.\n" +
        "- Can **survive without oxygen**; many cause disease in animals and plants.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["Other name of cyanobacteria", "Blue-green algae"] },
          { cells: ["Pigment", "Chlorophyll a, similar to green plants"] },
          { cells: ["Body forms", "Unicellular, colonial or filamentous"] },
          { cells: ["Colonies", "Usually wrapped in a gelatinous sheath"] },
          { cells: ["Blooms", "Often form blooms in polluted water bodies"] },
          {
            cells: ["Nitrogen fixation", "In specialised cells called heterocysts, as in *Nostoc* and *Anabaena*"],
            noteAmber: "NEET 2025: *Azotobacter*, *Oscillatoria*, *Anabaena* and *Nostoc* fix nitrogen; *Volvox*, a green alga, does not.",
            pyqExampleId: "ba8d1863-dffb-4377-8d10-b033570225f7",
          },
          { cells: ["*Mycoplasma* cell wall", "None at all"] },
          { cells: ["*Mycoplasma* size", "Smallest living cells known, about 0.3 µm long"] },
          { cells: ["*Mycoplasma* and oxygen", "Can survive without oxygen"] },
        ],
      },
      pyqExampleId: "6b0e97af-cb50-4b49-8f61-139c07786027",
      selfCheckExample: {
        prompt: "A filamentous blue-green organism grows in a pond and has a few special cells along its filament. In which kingdom is it placed, and what do those special cells do?",
        steps: [
          "Blue-green algae are cyanobacteria, which are prokaryotes, so the kingdom is Monera.",
          "The special cells are heterocysts, where atmospheric nitrogen is fixed.",
        ],
        answer: "Monera; the heterocysts fix atmospheric nitrogen.",
      },
      practiceSet: [
        { prompt: "Which chlorophyll do cyanobacteria share with green plants?", answer: "Chlorophyll a" },
        { prompt: "Name the two cyanobacteria NCERT gives as examples of nitrogen fixers with heterocysts.", answer: "*Nostoc* and *Anabaena*" },
        { prompt: "Can *Mycoplasma* survive without oxygen?", answer: "Yes" },
        { prompt: "What usually surrounds a colony of cyanobacteria?", answer: "A gelatinous sheath" },
      ],
      traps: [
        {
          title: "Blue-green algae are not algae",
          body: "Cyanobacteria are **prokaryotes** in Kingdom **Monera**. True algae, such as *Volvox* and *Spirogyra*, are eukaryotes.",
        },
        {
          title: "Heterocysts, not sheath cells",
          body: "Nitrogen is fixed in **heterocysts**. The gelatinous **sheath** only wraps the colony.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobc-protista",
      name: "Kingdom Protista",
      intuition:
        "Protista holds all the single-celled eukaryotes. They have a true nucleus and other membrane-bound organelles, most live in water, and some move with flagella or cilia. The kingdom is a meeting point: some members are like plants, some like animals and some like fungi.",
      definition:
        "The protist groups in NCERT:\n" +
        "- **Chrysophytes**: diatoms and golden algae (desmids).\n" +
        "- **Dinoflagellates**: mostly marine, photosynthetic, with cellulose plates.\n" +
        "- **Euglenoids**: no cell wall, a flexible **pellicle**; can switch between photosynthesis and heterotrophy.\n" +
        "- **Slime moulds**: saprophytic protists.\n" +
        "- **Protozoans**: all heterotrophs (predators or parasites), in four groups: amoeboid, flagellated, ciliated and sporozoans.\n" +
        "- Protists reproduce asexually, and sexually by cell fusion and zygote formation.",
      table: {
        columns: ["Group", "Key features", "Example or use"],
        rows: [
          { cells: ["Chrysophytes", "Fresh water and sea; photosynthetic; tiny and float with the water (plankton); diatom walls are two overlapping shells, like a soap box, with silica", "Diatoms are the chief producers in the oceans; their walls pile up as diatomaceous earth, used for polishing and filtering oils and syrups"] },
          { cells: ["Dinoflagellates", "Mostly marine and photosynthetic; yellow, green, brown, blue or red; stiff cellulose plates on the wall; two flagella, one along the body and one across it in a furrow", "*Gonyaulax*, a red form, multiplies fast and makes red tides; its toxins can kill fish"] },
          { cells: ["Euglenoids", "Mostly in stagnant fresh water; a protein-rich pellicle instead of a wall; two flagella, one short and one long; photosynthetic in light, catch smaller organisms in the dark", "*Euglena*; its pigments are the same as those of higher plants"] },
          { cells: ["Slime moulds", "Saprophytic; crawl over rotting twigs and leaves; join into a plasmodium that can spread over several feet; in bad times form fruiting bodies with spores", "Spores have true walls, survive for many years and spread by air"] },
          { cells: ["Amoeboid protozoans", "Move and catch food with pseudopodia; fresh water, sea or moist soil; marine forms have silica shells", "*Amoeba*; *Entamoeba* is a parasite"] },
          { cells: ["Flagellated protozoans", "Move with flagella; free-living or parasitic", "*Trypanosoma* causes sleeping sickness"] },
          { cells: ["Ciliated protozoans", "Thousands of cilia; a cavity called the gullet opens outside", "*Paramoecium*"] },
          { cells: ["Sporozoans", "Have an infectious spore-like stage in the life cycle", "*Plasmodium* causes malaria"] },
        ],
      },
      pyqExampleId: "c18436d3-983e-4a13-8496-d0789a31bd81",
      selfCheckExample: {
        prompt: "A marine protist has stiff cellulose plates on its wall and two flagella, one lying across the body in a groove. Which group is it in, and what can a red member of this group do to the sea?",
        steps: [
          "Cellulose plates and two flagella at right angles mark a dinoflagellate.",
          "The red dinoflagellate *Gonyaulax* multiplies so fast that the sea looks red: a red tide.",
        ],
        answer: "A dinoflagellate; red forms such as *Gonyaulax* cause red tides.",
      },
      practiceSet: [
        { prompt: "Which protists are the chief producers in the oceans?", answer: "Diatoms" },
        { prompt: "What covers a euglenoid in place of a cell wall?", answer: "A protein-rich layer called the pellicle" },
        { prompt: "Which flagellated protozoan causes sleeping sickness?", answer: "*Trypanosoma*" },
        { prompt: "What is the large spreading mass formed by slime moulds in good conditions called?", answer: "A plasmodium" },
        { prompt: "Which substance in diatom walls makes them almost indestructible?", answer: "Silica" },
      ],
      traps: [
        {
          title: "Diatoms, not dinoflagellates, are the chief producers",
          body: "The **chief producers in the oceans** are the **diatoms** (chrysophytes). Dinoflagellates are mostly marine and photosynthetic too, but NCERT gives that title to diatoms.",
        },
        {
          title: "Slime moulds are protists",
          body: "Slime moulds are **saprophytic protists** in Kingdom **Protista**, not Monera and not Fungi.",
        },
        {
          title: "Ciliates have many cilia",
          body: "Ciliated protozoans such as *Paramoecium* have **thousands of cilia**. Two flagella, one short and one long, belong to **euglenoids**.",
        },
      ],
    },
  ],
};
