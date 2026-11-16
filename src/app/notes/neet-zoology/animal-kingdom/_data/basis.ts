import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_AK_BASIS_NOTE: SubtopicNote = {
  subtopicName: "Basis of Classification",
  title: "Basis of Classification",
  oneLineDefinition:
    "The features NCERT uses to sort animals into phyla: level of organisation, the gut and blood system, symmetry, germ layers, the body cavity, segmentation and the notochord.",
  whyItMatters:
    "Five NEET questions from 2023 to 2026, one each in NEET 2023, Re-NEET 2024, NEET 2024, NEET 2025 and Re-NEET 2026. Symmetry was asked twice (NEET 2023 and Re-NEET 2026), and the kind of body cavity twice (NEET 2024 and NEET 2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoak-organisation",
      name: "Levels of organisation, germ layers, segmentation and the notochord",
      intuition:
        "Animals look very different, but a few basic features are shared by whole groups. How the cells are arranged, how many layers the embryo has, whether the gut has one opening or two, whether blood flows in tubes, whether the body is cut into repeated segments: each of these sorts animals into groups. NCERT uses these features as the basis of classification.",
      definition:
        "Level of organisation:\n" +
        "- **Cellular level:** the cells form loose aggregates, as in **sponges**.\n" +
        "- **Tissue level:** cells doing the same job are arranged into tissues, as in **coelenterates**.\n" +
        "- **Organ level:** tissues are grouped into organs, seen in **Platyhelminthes** and higher phyla.\n" +
        "- **Organ system level:** organs work together as systems, as in **annelids, arthropods, molluscs, echinoderms and chordates**.\n\n" +
        "The gut and the blood system:\n" +
        "- An **incomplete** digestive system has **only one opening**, which works as both mouth and anus (Platyhelminthes). A **complete** one has two openings, a mouth and an anus.\n" +
        "- In an **open** circulatory system, blood is pumped out of the heart and the cells and tissues are directly bathed in it. In a **closed** system, blood flows through vessels of different sizes: arteries, veins and capillaries.\n\n" +
        "Germ layers, segments and the notochord:\n" +
        "- **Diploblastic** animals have two embryonic layers, an outer **ectoderm** and an inner **endoderm**, with an undifferentiated layer, the **mesoglea**, between them (coelenterates).\n" +
        "- **Triploblastic** animals also have a middle layer, the **mesoderm** (Platyhelminthes to chordates).\n" +
        "- **Metameric segmentation (metamerism):** the body is divided externally and internally into segments, with serial repetition of at least some organs, as in the **earthworm**.\n" +
        "- The **notochord** is a mesodermally derived rod formed on the **dorsal** side during embryonic development in some animals. Animals with it are **chordates**; those without it (Porifera to Echinodermata) are **non-chordates**.",
      table: {
        columns: ["Feature", "Kinds", "Examples"],
        rows: [
          { cells: ["Level of organisation", "Cellular", "Sponges"] },
          { cells: ["Level of organisation", "Tissue", "Coelenterates"] },
          { cells: ["Level of organisation", "Organ", "Platyhelminthes"] },
          { cells: ["Level of organisation", "Organ system", "Annelids, arthropods, molluscs, echinoderms, chordates"] },
          { cells: ["Digestive system", "Incomplete (one opening) or complete (mouth and anus)", "Incomplete in Platyhelminthes"] },
          { cells: ["Circulatory system", "Open (tissues bathed in blood) or closed (blood in vessels)", "Open in arthropods, closed in annelids and chordates"] },
          { cells: ["Germ layers", "Diploblastic: ectoderm and endoderm, with mesoglea between", "Coelenterates and ctenophores"] },
          {
            cells: ["Germ layers", "Triploblastic: ectoderm, mesoderm and endoderm", "Platyhelminthes to chordates"],
            noteAmber: "Re-NEET 2024: pairing Platyhelminthes with diploblastic organisation was the incorrect match.",
          },
          { cells: ["Segmentation", "Metameric: organs repeated segment by segment", "Earthworm"] },
          { cells: ["Notochord", "A mesodermal rod on the dorsal side of the embryo", "Present in chordates, absent in non-chordates"] },
        ],
      },
      pyqExampleId: "c42e691a-7628-4bf7-a7ec-01d7f76e0e1b",
      selfCheckExample: {
        prompt: "An animal's gut has only one opening, which serves as both mouth and anus. What kind of digestive system is this, and which phylum does NCERT give as the example?",
        steps: [
          "A gut with a single opening is called incomplete; a complete gut has a separate mouth and anus.",
          "NCERT gives Platyhelminthes as the phylum with an incomplete digestive system.",
        ],
        answer: "An incomplete digestive system, as in Platyhelminthes.",
      },
      practiceSet: [
        { prompt: "What is the undifferentiated layer between the ectoderm and the endoderm of a diploblastic animal called?", answer: "The mesoglea" },
        { prompt: "At what level of organisation are sponges, whose cells exist as loose aggregates?", answer: "The cellular level" },
        { prompt: "What is metameric segmentation, and which animal does NCERT give as its example?", answer: "Division of the body externally and internally into segments with serial repetition of at least some organs; the earthworm" },
        { prompt: "In which kind of circulatory system are the cells and tissues directly bathed in blood pumped out of the heart?", answer: "An open circulatory system" },
        { prompt: "From which germ layer is the notochord derived, and on which side of the embryo does it form?", answer: "From the mesoderm, on the dorsal side" },
      ],
      traps: [
        {
          title: "Flatworms are triploblastic",
          body: "**Platyhelminthes** have three germ layers. NCERT calls only **coelenterates** (and ctenophores) diploblastic; from Platyhelminthes to chordates every phylum is **triploblastic**.",
        },
        {
          title: "Sponges are cellular, coelenterates are tissue level",
          body: "In **sponges** the cells form only loose aggregates, so they are at the **cellular** level. The **tissue** level starts with the **coelenterates**.",
        },
        {
          title: "The flatworm gut has one opening",
          body: "In **Platyhelminthes** the digestive system is **incomplete**: one opening serves as both mouth and anus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-symmetry",
      name: "Body symmetry",
      intuition:
        "Cut an animal through its centre. If no cut gives two equal halves, it is asymmetrical, like most sponges. If every cut through the central axis gives two identical halves, like slicing a round cake, it is radially symmetrical. If only one cut, down the middle from head to tail, gives matching left and right halves, it is bilaterally symmetrical, like us.",
      definition:
        "- **Asymmetrical:** any plane through the centre does **not** divide the body into equal halves. **Sponges are mostly asymmetrical.**\n" +
        "- **Radial symmetry:** **any plane passing through the central axis** of the body divides the organism into two identical halves. Seen in **coelenterates, ctenophores and echinoderms**.\n" +
        "- **Bilateral symmetry:** the body can be divided into identical left and right halves **in only one plane**. Seen in annelids, arthropods and the other higher phyla: Platyhelminthes, Aschelminthes, molluscs, hemichordates and chordates are all bilateral.\n" +
        "- **Echinoderms are the special case:** the **adults are radially symmetrical but the larvae are bilaterally symmetrical**.",
      table: {
        columns: ["Symmetry", "What it means", "Phyla"],
        rows: [
          { cells: ["Asymmetry", "No plane through the centre gives equal halves", "Most sponges"] },
          {
            cells: ["Radial", "Any plane through the central axis gives two identical halves", "Coelenterates, ctenophores, adult echinoderms"],
          },
          {
            cells: ["Bilateral", "Only one plane gives identical left and right halves", "Platyhelminthes, Aschelminthes, annelids, arthropods, molluscs, hemichordates, chordates"],
            noteAmber: "NEET 2023: hemichordates are bilaterally symmetrical, so radial symmetry is not found in their adults.",
          },
          { cells: ["Radial in the adult, bilateral in the larva", "The symmetry changes during development", "Echinoderms"] },
        ],
      },
      pyqExampleId: "6ab2b673-8d2a-4535-bbe7-1dd8ed39a920",
      selfCheckExample: {
        prompt: "A starfish larva is compared with an adult starfish. Which symmetry does each one show?",
        steps: [
          "The starfish is an echinoderm.",
          "NCERT says adult echinoderms are radially symmetrical, but their larvae are bilaterally symmetrical.",
        ],
        answer: "The larva is bilaterally symmetrical; the adult is radially symmetrical.",
      },
      practiceSet: [
        { prompt: "Which kind of symmetry do most sponges show?", answer: "None: they are mostly asymmetrical" },
        { prompt: "Name the two diploblastic phyla whose members are radially symmetrical.", answer: "Coelenterata and Ctenophora" },
        { prompt: "In bilateral symmetry, in how many planes can the body be cut into identical left and right halves?", answer: "In only one plane" },
        { prompt: "Which kind of symmetry do annelids and arthropods show?", answer: "Bilateral symmetry" },
      ],
      traps: [
        {
          title: "Echinoderm larvae are bilateral",
          body: "Only the **adult** echinoderm is radially symmetrical. Its **larva is bilaterally symmetrical**, so a statement that both adults and larvae are radial is false, and so is one calling bilateral symmetry a feature of **adult** echinoderms.",
        },
        {
          title: "Hemichordates are not radial",
          body: "**Hemichordates** such as *Balanoglossus* are worm-like and **bilaterally symmetrical**. The radial phyla are coelenterates, ctenophores and adult echinoderms.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-coelom",
      name: "The coelom",
      intuition:
        "Between the body wall and the gut there may be a space, the body cavity. What matters is what lines it. If the middle germ layer, the mesoderm, lines it all round, it is a true coelom. If the mesoderm lies only in scattered pouches, the space is a false coelom, a pseudocoelom. If there is no space at all, the animal is an acoelomate.",
      definition:
        "- **Coelom:** a body cavity **lined by mesoderm**. Animals with it are **coelomates**: annelids, molluscs, arthropods, echinoderms, hemichordates and chordates.\n" +
        "- **Pseudocoelom:** the body cavity is **not lined by mesoderm**; instead the mesoderm is present as **scattered pouches** between the ectoderm and the endoderm. Animals with it are **pseudocoelomates**, as in **Aschelminthes**.\n" +
        "- **Acoelomates:** animals in which the body cavity is **absent**, as in **Platyhelminthes**. In NCERT's table of phyla the body cavity is also absent in **Porifera, Coelenterata and Ctenophora**.\n" +
        "- The **spongocoel** of a sponge is not a coelom: it is the central cavity of the sponge's water canal system.",
      table: {
        columns: ["Type", "Body cavity", "Phyla"],
        rows: [
          { cells: ["Coelomate", "Present and lined by mesoderm", "Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata, Chordata"] },
          {
            cells: ["Pseudocoelomate", "Present, but mesoderm only in scattered pouches between ectoderm and endoderm", "Aschelminthes"],
          },
          {
            cells: ["Acoelomate", "Absent", "Platyhelminthes; also Porifera, Coelenterata and Ctenophora"],
            noteAmber: "NEET 2024: annelids are true coelomates; poriferans and platyhelminthes are acoelomates and aschelminthes are pseudocoelomates.",
            pyqExampleId: "7fd5bc1d-de98-485e-b948-22bc88203d21",
          },
        ],
      },
      pyqExampleId: "cc64f9ae-388c-46a3-ac1b-1779023fae24",
      selfCheckExample: {
        prompt: "Which is the one phylum that NCERT describes as pseudocoelomate?",
        steps: [
          "A pseudocoelom is a body cavity with mesoderm only in scattered pouches.",
          "Of all the phyla, NCERT gives this body cavity only to the roundworms.",
        ],
        answer: "Aschelminthes (the roundworms).",
      },
      practiceSet: [
        { prompt: "What is a coelom?", answer: "A body cavity lined by mesoderm" },
        { prompt: "Are Platyhelminthes coelomates, pseudocoelomates or acoelomates?", answer: "Acoelomates" },
        { prompt: "What is the central cavity of a sponge called, and is it a coelom?", answer: "The spongocoel; no, it is part of the water canal system" },
        { prompt: "Name four non-chordate phyla that are coelomate.", answer: "Any four of Annelida, Arthropoda, Mollusca, Echinodermata and Hemichordata" },
      ],
      traps: [
        {
          title: "Roundworms are pseudocoelomate, flatworms acoelomate",
          body: "**Aschelminthes** (roundworms) have a **pseudocoelom**; **Platyhelminthes** (flatworms) have **no body cavity**. Swapping the two is the commonest wrong statement.",
        },
        {
          title: "A pseudocoelom lacks mesoderm on part of its lining",
          body: "In a pseudocoelom the mesoderm is only in **scattered pouches**, so a cavity with mesoderm along the body wall but none around the gut is a **pseudocoelom**, not a true coelom.",
        },
        {
          title: "The spongocoel is not a coelom",
          body: "Sponges are **acoelomate**. Their **spongocoel** is the central cavity through which water flows, not a body cavity lined by mesoderm.",
        },
      ],
    },
  ],
};
