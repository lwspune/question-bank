import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_LW_NAMING_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature, Approaches and Biologists",
  title: "Nomenclature, Approaches and Biologists",
  oneLineDefinition:
    "How every organism gets one scientific name under the rules of binomial nomenclature, what reductionist biology means, and the biologists NCERT names in its unit openings.",
  whyItMatters:
    "Three NEET questions, all EASY. NEET 2025 asked two of them: what reductionist biology means and who is the father of Ecology in India. NEET 2026 asked which statement about the rules of binomial nomenclature is false.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbolw-nomenclature",
      name: "Taxonomy and binomial nomenclature",
      intuition:
        "About 1.7 to 1.8 million species are known, and the same plant can have a different local name in every state. So scientists give each organism one name that is used all over the world. That name always has two parts: the genus, then the species. This two-part system is binomial nomenclature, given by Carolus Linnaeus.",
      definition:
        "Taxonomy and the naming rules:\n" +
        "- **Taxonomy** rests on four steps: **characterisation**, **identification**, **classification** and **nomenclature** (naming).\n" +
        "- **Systematics** (from the Latin *systema*, an orderly arrangement) also takes the **evolutionary relationships** between organisms into account. Linnaeus called his book *Systema Naturae*.\n" +
        "- Plant names follow the **ICBN** (International Code of Botanical Nomenclature); animal names follow the **ICZN** (International Code of Zoological Nomenclature).\n" +
        "- **Binomial nomenclature** (Carolus **Linnaeus**): the first word is the **genus**, the second is the **specific epithet**.\n" +
        "- Names are in **Latin**, or Latinised, whatever language the word came from.\n" +
        "- The genus starts with a **capital** letter, the specific epithet with a **small** letter.\n" +
        "- Printed names are in **italics**; handwritten, **each word is underlined separately**.\n" +
        "- The name of the author who first described the species comes after the epithet, in short form: *Mangifera indica* Linn.",
      table: {
        columns: ["Rule", "What it says", "Example"],
        rows: [
          { cells: ["Language", "Latin or Latinised, whatever the origin of the word", "*Mangifera indica* (mango), *Homo sapiens* (man)"] },
          { cells: ["First word", "The genus, starting with a capital letter", "*Mangifera*"] },
          { cells: ["Second word", "The specific epithet, starting with a small letter", "*indica*"] },
          { cells: ["How it is written", "Italics in print; each word underlined separately by hand", "*Solanum tuberosum* (potato)"] },
          { cells: ["Author", "Abbreviated name after the epithet", "*Mangifera indica* Linn. (Linnaeus)"] },
          { cells: ["Codes", "ICBN for plants, ICZN for animals", "Mango is named under the ICBN"] },
        ],
      },
      pyqExampleId: "4dee7498-aed3-4de2-825b-d1ef981eb5fa",
      selfCheckExample: {
        prompt: "A student writes the scientific name of the potato as Tuberosum solanum, in plain letters. What are the mistakes, and what is the right way to write it?",
        steps: [
          "The genus must come first and start with a capital letter: Solanum.",
          "The specific epithet comes second and starts with a small letter: tuberosum.",
          "In print the name goes in italics; by hand each word is underlined separately.",
        ],
        answer: "*Solanum tuberosum*: genus first with a capital, epithet second in small letters, in italics.",
      },
      practiceSet: [
        { prompt: "Who proposed the system of binomial nomenclature?", answer: "Carolus Linnaeus" },
        { prompt: "Which code governs the scientific names of plants?", answer: "The ICBN (International Code of Botanical Nomenclature)" },
        { prompt: "In the name *Homo sapiens*, which word is the genus?", answer: "*Homo*" },
        { prompt: "What does Linn. stand for in *Mangifera indica* Linn.?", answer: "Linnaeus, the scientist who first described the species" },
        { prompt: "Which branch of study classifies organisms while taking their evolutionary relationships into account?", answer: "Systematics" },
      ],
      traps: [
        {
          title: "Genus first, epithet second",
          body: "The **first** word of a scientific name is the **genus** and the **second** is the **specific epithet**. A statement that puts the epithet first and the genus second is false.",
        },
        {
          title: "The epithet keeps a small letter",
          body: "Even when the epithet comes from a place, as *indica* comes from India, it starts with a **small** letter. Only the genus takes a capital.",
        },
        {
          title: "Underline the two words separately",
          body: "When a name is handwritten, each word gets **its own** underline. One line running under both words together is not the rule.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbolw-reductionist",
      name: "Reductionist biology",
      intuition:
        "Early biology mostly described what living things look like, which showed how varied they are. The cell theory then showed the unity underneath: every living thing is made of cells. Later, biologists began to explain life using the ideas and tools of physics and chemistry, looking at the molecules and reactions inside a cell. That way of studying life is called reductionist biology.",
      definition:
        "The physico-chemical approach:\n" +
        "- **Reductionist biology** is the **physico-chemical approach** to studying and understanding living organisms.\n" +
        "- It applies the **concepts and techniques of physics and chemistry** to living processes.\n" +
        "- It explains life in terms of the **molecules** of the cell (proteins, nucleic acids, carbohydrates, lipids) and the reactions between them.\n" +
        "- The **cell theory** came first and showed the **unity** beneath the diversity of living forms.",
      table: {
        columns: ["Term", "What it means", "Example"],
        rows: [
          { cells: ["Reductionist biology", "The physico-chemical approach: physics and chemistry used to explain living processes", "Explaining how an enzyme works as a reaction between molecules"] },
          { cells: ["Physico-chemical", "Using both physics (physico) and chemistry (chemical) together", "Studying a membrane by the chemistry of its lipids and the physics of diffusion"] },
          { cells: ["Biomolecules", "The chemicals living things are made of, which this approach studies", "Proteins, nucleic acids, carbohydrates, lipids"] },
          { cells: ["Cell theory", "All living things are made of cells; it shows the unity beneath their diversity", "A plant, an animal and a bacterium are all built of cells"] },
        ],
      },
      pyqExampleId: "511e3f09-31cd-4cbb-8d5f-be1c11f97f52",
      selfCheckExample: {
        prompt: "A scientist explains how a muscle contracts by studying the proteins inside it and the chemical energy they use. Which approach to biology is this?",
        steps: [
          "She is explaining a living process through its molecules and their reactions.",
          "That uses the ideas and tools of physics and chemistry.",
        ],
        answer: "The physico-chemical approach, called reductionist biology.",
      },
      practiceSet: [
        { prompt: "Which two sciences does reductionist biology borrow its concepts and techniques from?", answer: "Physics and chemistry" },
        { prompt: "What did the cell theory show about the diversity of living things?", answer: "The unity beneath it: all living things are made of cells" },
        { prompt: "Name two kinds of biomolecules found in a cell.", answer: "Any two of proteins, nucleic acids, carbohydrates and lipids" },
      ],
      traps: [
        {
          title: "Physico-chemical, not just chemical",
          body: "Reductionist biology is the **physico-chemical** approach. A chemical approach alone, a physiological approach or a behavioural approach is not the textbook meaning.",
        },
        {
          title: "Reductionist means breaking life into parts",
          body: "The word comes from **reducing** a living process to the physics and chemistry of its parts. It does not mean studying fewer organisms or reducing the number of species.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbolw-biologists",
      name: "Biologists NCERT profiles",
      intuition:
        "Each unit of the NCERT books opens with a short profile of a biologist whose work built that field. NEET has started to ask these as one-line questions, so learn each name with the field and the title the book gives them.",
      definition:
        "Names to know:\n" +
        "- **Ramdeo Misra** is the **father of Ecology in India**. He took his PhD in ecology at Leeds under W. H. Pearsall and set up ecology teaching and research at **Banaras Hindu University**.\n" +
        "- **Ernst Mayr** is called the **Darwin of the 20th century** and gave the biological species concept.\n" +
        "- **Panchanan Maheshwari** worked on the **embryology of flowering plants**.\n" +
        "- **G. N. Ramachandran** worked on **protein structure**: the Ramachandran plot and the triple helix of collagen.\n" +
        "- **Har Gobind Khorana** helped work out the **genetic code** and made an artificial gene.\n" +
        "- Not NCERT profiles, but common wrong options: **Birbal Sahni** (fossil plants, palaeobotany) and **S. R. Kashyap** (mosses and liverworts, bryology).",
      table: {
        columns: ["Biologist", "Known as or for", "Field"],
        rows: [
          { cells: ["Ramdeo Misra", "Father of Ecology in India; ecology at Banaras Hindu University", "Ecology"] },
          { cells: ["Ernst Mayr", "Darwin of the 20th century; the biological species concept", "Taxonomy and evolution"] },
          { cells: ["Panchanan Maheshwari", "Embryology of flowering plants", "Plant embryology"] },
          { cells: ["G. N. Ramachandran", "Ramachandran plot; triple helix of collagen", "Protein structure"] },
          { cells: ["Har Gobind Khorana", "The genetic code; an artificial gene", "Molecular biology"] },
          { cells: ["Birbal Sahni", "Fossil plants; father of Indian palaeobotany", "Palaeobotany"] },
          { cells: ["S. R. Kashyap", "Mosses and liverworts; father of Indian bryology", "Bryology"] },
        ],
      },
      pyqExampleId: "73fc6753-c01d-4157-bd29-154deb94a711",
      selfCheckExample: {
        prompt: "Which Indian botanist is linked with the study of how the embryo forms inside the seeds of flowering plants?",
        steps: [
          "The study of how an embryo forms is embryology.",
          "NCERT names Panchanan Maheshwari for the embryology of flowering plants.",
        ],
        answer: "Panchanan Maheshwari.",
      },
      practiceSet: [
        { prompt: "Who is called the Darwin of the 20th century?", answer: "Ernst Mayr" },
        { prompt: "Which Indian scientist worked out the triple helix of collagen?", answer: "G. N. Ramachandran" },
        { prompt: "Birbal Sahni is known for work in which field?", answer: "Palaeobotany, the study of fossil plants" },
      ],
      traps: [
        {
          title: "Misra for ecology, Sahni for fossils",
          body: "The father of Ecology in India is **Ramdeo Misra**. **Birbal Sahni** studied fossil plants and **S. R. Kashyap** studied mosses and liverworts.",
        },
        {
          title: "Ramachandran and Khorana are different fields",
          body: "**G. N. Ramachandran** is linked with **protein** structure (collagen, the Ramachandran plot). The **genetic code** and the first artificial gene belong to **Har Gobind Khorana**.",
        },
      ],
    },
  ],
};
