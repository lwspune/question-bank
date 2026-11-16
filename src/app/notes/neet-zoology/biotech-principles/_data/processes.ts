import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BP_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Processes and Bioreactors",
  title: "Processes and Bioreactors",
  oneLineDefinition:
    "The steps of recombinant DNA technology in order: isolating DNA, cutting it, amplifying the gene, ligating it and putting it into a host, then growing the product in a bioreactor and purifying it by downstream processing; plus somatic hybridisation of plant protoplasts.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026. Which molecule chilled ethanol precipitates was asked twice in the same words (NEET 2021 and NEET 2023), and Re-NEET 2026 asked why lysozyme and cellulase are used. Bioreactors came in NEET 2024 and NEET 2025, and somatic hybridisation in NEET 2024 and NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobp-isolation",
      name: "Isolating DNA and the order of steps",
      intuition:
        "DNA sits locked inside cells, tangled with proteins and mixed with RNA, sugars and fats. So first you break the cells open with the right enzyme for their wall, then digest away everything that is not DNA, and finally pour in cold ethanol so the DNA comes out as fine threads. Only then can you cut it, copy the gene, stitch it into a vector and put it into a host.",
      definition:
        "Isolating the genetic material (DNA):\n" +
        "- DNA is enclosed within membranes, so the cell must be **broken open** to release DNA along with RNA, proteins, polysaccharides and lipids.\n" +
        "- Enzymes break the cells: **lysozyme** for **bacteria**, **cellulase** for **plant cells**, **chitinase** for **fungi**.\n" +
        "- Genes lie on long DNA molecules intertwined with proteins such as **histones**.\n" +
        "- **RNA** is removed with **ribonuclease**; **proteins** with **protease**; other molecules by suitable treatments.\n" +
        "- Purified DNA finally **precipitates** out after the addition of **chilled ethanol**, seen as a collection of **fine threads** in the suspension.\n\n" +
        "Then, in order:\n" +
        "- **Cutting:** the purified DNA is incubated with a restriction enzyme at its optimal conditions; agarose gel electrophoresis checks the progress of the digestion. The vector DNA is cut with the **same** enzyme.\n" +
        "- **Isolating the fragment:** the desired DNA fragment is separated and eluted from the gel.\n" +
        "- **Amplification** of the gene of interest using **PCR**.\n" +
        "- **Ligation:** the cut gene of interest and the cut vector are mixed with **ligase**, giving recombinant DNA.\n" +
        "- **Insertion** into the host. If the recombinant DNA carries resistance to an antibiotic such as **ampicillin**, cells spread on ampicillin plates grow only if they are **transformants**.\n" +
        "- Culturing the host on a large scale and obtaining the foreign gene product.",
      table: {
        columns: ["Cell or molecule", "Enzyme or step that deals with it"],
        rows: [
          {
            cells: ["Bacterial cell", "Lysozyme"],
            noteAmber: "Re-NEET 2026: lysozyme for bacteria and cellulase for plants, because isolating DNA needs the cells broken open.",
            pyqExampleId: "55c5c392-6f4b-431a-8827-2b2024782824",
          },
          { cells: ["Plant cell", "Cellulase"] },
          { cells: ["Fungal cell", "Chitinase"] },
          { cells: ["RNA", "Ribonuclease"] },
          { cells: ["Proteins (such as histones)", "Protease"] },
          {
            cells: ["Purified DNA", "Precipitated by chilled ethanol as fine threads"],
            noteAmber: "NEET 2023: chilled ethanol precipitates DNA, not RNA, histones or polysaccharides.",
            pyqExampleId: "247f42ff-8a0a-4e84-aad0-bd221a410549",
          },
          {
            cells: ["Order of the main steps", "Cut with a restriction enzyme, isolate the fragment, amplify by PCR, insert into the host"],
            noteAmber: "NEET 2023: B, C, D, A, that is cutting, isolating the fragment, PCR, then insertion into the host.",
            pyqExampleId: "b05c97a0-4e91-4ad6-8166-f5570f60d56e",
          },
        ],
      },
      pyqExampleId: "a132458c-1a28-41ae-a9cb-471b4e6f2b8e",
      selfCheckExample: {
        prompt: "A student wants DNA from a fungus. Which enzyme breaks the cells open, and which enzymes then remove the RNA and the proteins?",
        steps: [
          "Each kind of cell wall needs its own enzyme; for fungi it is chitinase.",
          "RNA is removed by ribonuclease and proteins by protease.",
        ],
        answer: "Chitinase opens the fungal cells; ribonuclease removes the RNA and protease removes the proteins.",
      },
      practiceSet: [
        { prompt: "Which enzyme is used to break open plant cells to isolate their DNA?", answer: "Cellulase" },
        { prompt: "How does purified DNA look after chilled ethanol is added?", answer: "A collection of fine threads in the suspension" },
        { prompt: "Which enzyme joins the cut gene of interest to the cut vector?", answer: "Ligase" },
        { prompt: "Recombinant DNA carrying ampicillin resistance is put into Escherichia coli. On an ampicillin plate, which cells grow?", answer: "Only the transformants" },
      ],
      traps: [
        {
          title: "Lysozyme for bacteria, cellulase for plants, chitinase for fungi",
          body: "Each wall has its own enzyme: **lysozyme** (bacteria), **cellulase** (plant cells), **chitinase** (fungi). Mixing them is the usual distractor.",
        },
        {
          title: "Chilled ethanol brings out DNA",
          body: "RNA is destroyed by **ribonuclease** and proteins such as histones by **protease**. What **chilled ethanol** precipitates is the purified **DNA**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-bioreactors",
      name: "Bioreactors and downstream processing",
      intuition:
        "A flask in the lab gives a spoonful of product, not the tonnes a factory needs. A bioreactor is a big, closely controlled tank where cells grow at their best: stirred, aerated, at the right temperature and pH, with the foam kept down. Once the cells have made the product, it still has to be separated, purified, preserved and tested before anyone can use it.",
      definition:
        "Bioreactors:\n" +
        "- **Small volume cultures cannot yield appreciable quantities** of product, so **bioreactors** are used, where **large volumes (100 to 1000 litres)** of culture can be processed.\n" +
        "- A bioreactor is a vessel where raw materials are biologically converted into specific products, individual enzymes and so on, using microbial, plant, animal or human cells.\n" +
        "- It provides the **optimal growth conditions** (temperature, pH, substrate, salts, vitamins, oxygen) for the desired product.\n" +
        "- The most commonly used bioreactors are of the **stirring type**. A **stirred-tank reactor** is usually cylindrical or has a curved base to help mixing; the **stirrer** gives even mixing and oxygen availability. Alternatively, **air can be bubbled** through the reactor (a sparged stirred-tank bioreactor).\n" +
        "- It has an **agitator system**, an **oxygen delivery system**, a **foam control system**, a **temperature control system**, a **pH control system** and **sampling ports** to withdraw small volumes of culture.\n" +
        "- In **continuous culture**, used medium is drained from one side while fresh medium is added from the other, keeping the cells in their most active **log (exponential) phase**.\n\n" +
        "Downstream processing:\n" +
        "- After the biosynthetic stage the product is **separated and purified**: together these are **downstream processing**.\n" +
        "- It is formulated with suitable **preservatives**, goes through **clinical trials** (as for drugs), and each product needs strict **quality control** testing.",
      table: {
        columns: ["Part or idea", "What it does"],
        rows: [
          { cells: ["Motor and stirrer (flat bladed impeller)", "Mixes the contents evenly and spreads oxygen"] },
          {
            cells: ["Foam breaker", "Part of the foam control system; keeps the foam down at the top"],
            noteAmber: "NEET 2025: the part labelled C in the stirred-tank figure was the foam breaker.",
            pyqExampleId: "5418ae02-8bce-49a1-a2f9-d04045492ac4",
          },
          { cells: ["Sterile air", "Bubbled (sparged) through the culture in a sparged stirred-tank bioreactor"] },
          { cells: ["Temperature and pH control", "Keep the conditions optimal"] },
          { cells: ["Sampling ports", "Let small volumes of culture be withdrawn"] },
          { cells: ["Continuous culture", "Keeps the cells in the log (exponential) phase"] },
          { cells: ["Downstream processing", "Separation, purification, formulation, clinical trials and quality control"] },
        ],
      },
      pyqExampleId: "e5ab3120-91bd-493f-8e58-baabc32cadb9",
      selfCheckExample: {
        prompt: "Why is a continuous culture system said to give a larger yield of product?",
        steps: [
          "Used medium is drained out from one side and fresh medium added from the other.",
          "This keeps the cells in their physiologically most active phase.",
        ],
        answer: "It keeps the cells in their most active log (exponential) phase, so they go on making product.",
      },
      practiceSet: [
        { prompt: "What volume of culture can a bioreactor process?", answer: "Large volumes, 100 to 1000 litres" },
        { prompt: "Which type of bioreactor is the most commonly used?", answer: "The stirring type" },
        { prompt: "What are the separation and purification of a product after the biosynthetic stage together called?", answer: "Downstream processing" },
        { prompt: "Name the six control systems or features NCERT lists for a bioreactor.", answer: "An agitator system, an oxygen delivery system, a foam control system, a temperature control system, a pH control system and sampling ports" },
      ],
      traps: [
        {
          title: "Bioreactors are for large volumes",
          body: "Bioreactors exist because **small cultures cannot give appreciable product**. They process **100 to 1000 litres**, not small bacterial cultures.",
        },
        {
          title: "Downstream comes after biosynthesis",
          body: "**Downstream processing** is everything after the product is made: separation, purification, formulation with preservatives, clinical trials and quality control.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-somatic",
      name: "Somatic hybridisation",
      intuition:
        "Two plant varieties each have one good trait. Instead of crossing them through flowers, you take single body cells from each, strip off their walls so only the naked protoplasts are left, and fuse one protoplast from each. The fused hybrid cell is then grown into a whole new plant.",
      definition:
        "Somatic hybridisation (a plant tissue culture method):\n" +
        "- Single cells are isolated from **two different varieties** of plants, each with a desirable character.\n" +
        "- Their **cell walls are digested**, which gives **naked protoplasts**, surrounded only by the plasma membrane.\n" +
        "- The protoplasts of the two varieties are **fused** to get a **hybrid protoplast**.\n" +
        "- The hybrid protoplast is grown to form a **new plant**. Such plants are **somatic hybrids**, and the process is **somatic hybridisation**.\n" +
        "- Example: a protoplast of **tomato** fused with one of **potato** gave the **pomato**, which did not have all the desired combination of characters.",
      table: {
        columns: ["Step", "What happens"],
        rows: [
          { cells: ["1", "Isolate single cells from two different plant varieties"] },
          { cells: ["2", "Digest the cell walls"] },
          {
            cells: ["3", "Isolate the naked protoplasts"],
            noteAmber: "NEET 2024: somatic hybridisation fuses protoplasts, not callus, somatic embryos or pollen.",
            pyqExampleId: "53c73b24-1a1a-42a3-9f6f-6c2faf445f2f",
          },
          { cells: ["4", "Fuse them to get a hybrid protoplast"] },
          { cells: ["5", "Grow the hybrid protoplast into a new plant, the somatic hybrid"] },
        ],
      },
      pyqExampleId: "41c8110e-f6c2-40ec-b9f2-d8497cbbd808",
      selfCheckExample: {
        prompt: "Which two plants were fused by somatic hybridisation to give the pomato?",
        steps: [
          "The name joins the two plants it came from.",
          "A tomato protoplast was fused with a potato protoplast.",
        ],
        answer: "Tomato and potato.",
      },
      practiceSet: [
        { prompt: "What is a cell called once its cell wall has been digested away, leaving only the plasma membrane around it?", answer: "A naked protoplast" },
        { prompt: "What is a plant grown from a fused hybrid protoplast called?", answer: "A somatic hybrid" },
        { prompt: "Did the pomato have all the desired combination of characters of its two parents?", answer: "No" },
      ],
      traps: [
        {
          title: "Protoplasts are fused, not pollen or callus",
          body: "Somatic hybridisation fuses **protoplasts**, cells whose walls have been **digested** away. It does not fuse pollen, callus or somatic embryos.",
        },
        {
          title: "Walls are digested before protoplasts are isolated",
          body: "The order is: isolate single cells, **digest the walls**, isolate **naked protoplasts**, **fuse** them, then **grow** the hybrid.",
        },
      ],
    },
  ],
};
