import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_CC_MEIOSIS_NOTE: SubtopicNote = {
  subtopicName: "Meiosis",
  title: "Meiosis",
  oneLineDefinition:
    "The division that halves the chromosome number: the five substages of prophase I and the event that marks each, the rest of meiosis I and meiosis II, and how meiosis differs from mitosis.",
  whyItMatters:
    "Eleven NEET questions from 2021 to Re-NEET 2026. Six test the five substages of prophase I, and recombination nodules alone came up in 2022, 2023 and 2024. The stage where the centromere divides (anaphase II) was asked with the same stem in 2021 and 2023.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbocc-prophase",
      name: "Prophase I: five substages in order",
      intuition:
        "Prophase I is long because the two chromosomes of each homologous pair must find each other, zip together, swap pieces and then start to come apart. Each substage is named after what the chromosomes look like. Leptotene: thin threads. Zygotene: paired. Pachytene: thick, with four chromatids clearly seen. Diplotene: double, the pair pulling apart. Diakinesis: moving apart, ready for metaphase. Learn the order, then the one event that marks each.",
      definition:
        "Prophase I is longer and more complex than the prophase of mitosis. Its five substages, in order:\n" +
        "- **Leptotene**: chromosomes become **gradually visible** under the light microscope; compaction continues.\n" +
        "- **Zygotene**: homologous chromosomes start to pair (**synapsis**), along with the **synaptonemal complex**. A synapsed pair is a **bivalent** or **tetrad**, seen more clearly in the next stage.\n" +
        "- **Pachytene**: the four chromatids of each bivalent become distinct (**tetrads**). **Recombination nodules** appear: the sites where **crossing over** happens between **non-sister chromatids** of homologous chromosomes. Crossing over is enzyme-mediated (**recombinase**). Recombination is **complete by the end of pachytene**.\n" +
        "- **Diplotene**: the **synaptonemal complex dissolves** and the homologues tend to separate, except at the crossover sites. These X-shaped points are **chiasmata**. In the oocytes of some vertebrates, diplotene can last **months or years**.\n" +
        "- **Diakinesis**: **terminalisation of chiasmata**. Chromosomes are **fully condensed** and the meiotic spindle is assembled. By its end the **nucleolus disappears** and the **nuclear envelope breaks down**; it is the transition to metaphase I.",
      table: {
        columns: ["Substage", "What marks it (NCERT)"],
        rows: [
          {
            cells: ["Leptotene", "Chromosomes become gradually visible under the light microscope, like thin threads"],
            noteAmber: "NEET 2024: both statements true; chromosomes become visible in leptotene, and diplotene begins with the dissolution of the synaptonemal complex.",
            pyqExampleId: "5fdda51e-5802-41f4-8de8-7af18b6de668",
          },
          {
            cells: ["Zygotene", "Synapsis of homologous chromosomes; synaptonemal complex forms; the pair is a bivalent (tetrad)"],
            noteAmber: "Re-NEET 2024: synaptonemal complex with zygotene, crossing over with pachytene, chiasmata with diplotene, terminalisation with diakinesis.",
            pyqExampleId: "9ee5085e-494c-42b5-bfb9-65c3dd0065d4",
          },
          {
            cells: ["Pachytene", "Tetrads clearly seen; recombination nodules appear; crossing over between non-sister chromatids; recombination complete by its end"],
            noteAmber: "NEET 2023: recombination nodules appear in pachytene.",
            pyqExampleId: "a7ea29cb-4405-4158-b0ad-2fc8fdbe3868",
          },
          { cells: ["Diplotene", "Synaptonemal complex dissolves; homologues separate except at the X-shaped chiasmata"] },
          {
            cells: ["Diakinesis", "Terminalisation of chiasmata; chromosomes fully condensed; spindle assembled; nucleolus and nuclear envelope disappear"],
            noteAmber: "NEET 2023: terminalisation happens in diakinesis, not pachytene, and the tetrad forms in zygotene, not leptotene.",
            pyqExampleId: "c7b4ed59-ac44-4771-8f5d-fc57942821e6",
          },
        ],
      },
      pyqExampleId: "5c65df96-8adb-4209-923b-8acfc8dd7b0a",
      selfCheckExample: {
        prompt: "In a meiocyte the synaptonemal complex has just dissolved, and each homologous pair is held together only at a few X-shaped points. Name the substage of prophase I and the X-shaped points.",
        steps: [
          "The synaptonemal complex forms in zygotene and dissolves at the start of diplotene.",
          "As the recombined homologues pull apart, they stay joined only where crossing over happened; these X-shaped points are chiasmata.",
        ],
        answer: "Diplotene; the X-shaped points are chiasmata.",
      },
      practiceSet: [
        { prompt: "Name the five substages of prophase I in order.", answer: "Leptotene, zygotene, pachytene, diplotene, diakinesis" },
        { prompt: "Which enzyme carries out crossing over?", answer: "Recombinase" },
        { prompt: "In the oocytes of some vertebrates, which substage of prophase I can last for months or years?", answer: "Diplotene" },
        { prompt: "Crossing over takes place between which chromatids: sister chromatids, or non-sister chromatids of homologous chromosomes?", answer: "Non-sister chromatids of homologous chromosomes" },
      ],
      traps: [
        {
          title: "The tetrad forms in zygotene",
          body: "The synapsed pair (bivalent or **tetrad**) forms in **zygotene**; its four chromatids are seen **clearly in pachytene**. Leptotene has no pairing yet.",
        },
        {
          title: "Nodules are crossing over sites",
          body: "**Recombination nodules** are the **sites where crossing over happens**, seen in **pachytene**. They are not the synaptonemal complex (zygotene), not the bivalent and not terminalisation.",
        },
        {
          title: "Chiasmata appear in diplotene, terminalise in diakinesis",
          body: "Crossing over is in **pachytene**, the X-shaped **chiasmata** become visible in **diplotene**, and their **terminalisation** is in **diakinesis**.",
        },
        {
          title: "Crossing over is between non-sister chromatids",
          body: "Sister chromatids are identical copies, so swapping between them changes nothing. Crossing over is between **non-sister chromatids** of **homologous** chromosomes.",
        },
        {
          title: "Recombination ends with pachytene",
          body: "Recombination between homologous chromosomes is **completed by the end of pachytene**. Diplotene only shows the result, as chiasmata.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbocc-meiosis-stages",
      name: "Meiosis I, meiosis II and how meiosis differs from mitosis",
      intuition:
        "Meiosis is two divisions after only one round of DNA copying, so it ends with four cells, each with half the chromosomes. In meiosis I the homologous chromosomes are pulled apart, which halves the number. Meiosis II then works just like mitosis: the centromeres split and the sister chromatids separate. A simple test: if centromeres are splitting, you are in anaphase II (or mitotic anaphase), never anaphase I.",
      definition:
        "Key features:\n" +
        "- **Two divisions** (meiosis I and meiosis II) but **one DNA replication** (in S phase before meiosis I).\n" +
        "- **Pairing of homologous chromosomes** and **recombination** between non-sister chromatids happen only in meiosis.\n" +
        "- Ends with **four haploid cells**. It happens during **gametogenesis**.\n\n" +
        "Meiosis I after prophase I:\n" +
        "- **Metaphase I**: bivalents line up on the equatorial plate.\n" +
        "- **Anaphase I**: **homologous chromosomes separate**; sister chromatids stay joined at their centromeres.\n" +
        "- **Telophase I**: nuclear membrane and nucleolus reappear; cytokinesis gives a **dyad** of cells.\n" +
        "- **Interkinesis**: the short gap between the two divisions, with **no DNA replication**.\n\n" +
        "Meiosis II **resembles normal mitosis** (meiosis I does not):\n" +
        "- **Anaphase II** starts with the **splitting of the centromere** of each chromosome; sister chromatids move to opposite poles.\n" +
        "- **Telophase II**: nuclear envelopes form; cytokinesis gives a **tetrad** of four haploid cells.\n\n" +
        "Why meiosis matters: it keeps the **chromosome number of a species constant** from one generation to the next, and it **increases genetic variability**, which matters for evolution.",
      table: {
        columns: ["Stage or event", "What happens (NCERT)"],
        rows: [
          { cells: ["Metaphase I", "Bivalents align on the equatorial plate; microtubules from opposite poles attach to the pair of homologous chromosomes"] },
          { cells: ["Anaphase I", "Homologous chromosomes separate; sister chromatids stay together at their centromeres"] },
          { cells: ["Telophase I and interkinesis", "Nuclear membrane and nucleolus reappear; cytokinesis gives a dyad; short interkinesis with no DNA replication"] },
          { cells: ["Metaphase II", "Chromosomes align at the equator; microtubules attach to the kinetochores of sister chromatids"] },
          {
            cells: ["Anaphase II", "The centromere of each chromosome splits; sister chromatids move to opposite poles"],
            noteAmber: "NEET 2023: the stage of meiosis that involves division of the centromere is anaphase II (asked the same way in 2021).",
            pyqExampleId: "bf3eca75-a2b1-4c8e-ae27-b2457d85f553",
          },
          { cells: ["Telophase II", "Nuclear envelopes re-form; cytokinesis gives a tetrad of four haploid cells"] },
          {
            cells: ["Pairing of homologous chromosomes", "Only in prophase I of meiosis, never in mitosis"],
            noteAmber: "NEET 2022: pairing of homologues never occurs in mitosis; spindle attachment, centriole movement and chromatid condensation happen in both divisions.",
            pyqExampleId: "d5c7c370-5f74-4d4d-8810-369c626fd5e1",
          },
        ],
      },
      pyqExampleId: "bd907e99-fd3f-4321-8d11-3f70ff2b88c7",
      selfCheckExample: {
        prompt: "A plant has 2n = 24 chromosomes. How many chromosomes does each cell have at the end of meiosis I, and how many at the end of meiosis II?",
        steps: [
          "Anaphase I separates homologous chromosomes, so each cell of the dyad gets one of each pair: 24 ÷ 2 = 12.",
          "Meiosis II is like mitosis: it separates sister chromatids and does not change the chromosome number.",
        ],
        answer: "12 at the end of meiosis I, and still 12 in each of the four cells at the end of meiosis II.",
      },
      practiceSet: [
        { prompt: "What separates in anaphase I: homologous chromosomes or sister chromatids?", answer: "Homologous chromosomes" },
        { prompt: "Is DNA replicated during interkinesis?", answer: "No" },
        { prompt: "How many cells are formed at the end of meiosis II, and are they haploid or diploid?", answer: "Four haploid cells" },
        { prompt: "Give two reasons meiosis matters to a sexually reproducing species.", answer: "It keeps the chromosome number constant across generations, and it increases genetic variability" },
      ],
      traps: [
        {
          title: "Meiosis II resembles mitosis, not meiosis I",
          body: "Meiosis I pairs homologues, crosses over and separates whole homologous chromosomes. **Meiosis II** splits centromeres and separates sister chromatids, just like **mitosis**.",
        },
        {
          title: "Centromeres stay whole in anaphase I",
          body: "In **anaphase I** the sister chromatids stay joined at their centromeres while the homologues separate. The centromere **divides in anaphase II**. In metaphase I and II the chromosomes only line up.",
        },
        {
          title: "No DNA copying between the two divisions",
          body: "Meiosis has **one** DNA replication for **two** divisions. **Interkinesis** is short and has **no DNA replication**, which is why the chromosome number ends up halved.",
        },
        {
          title: "Pairing of homologues never happens in mitosis",
          body: "Spindle fibres attaching to kinetochores, centrioles moving to the poles and chromatids condensing happen in **both** divisions. **Pairing of homologous chromosomes** happens **only in prophase I** of meiosis.",
        },
      ],
    },
  ],
};
