import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_ALLOTROPY_NOTE: SubtopicNote = {
  subtopicName: "Allotropy",
  title: "Allotropy in Group 16",
  oneLineDefinition:
    "The different forms of oxygen, sulfur, selenium, tellurium and polonium, above all rhombic and monoclinic sulfur and the paramagnetic S₂ found in sulfur vapour.",
  whyItMatters:
    "3 questions, all from the textbook: the allotropes of selenium, the differences between rhombic and monoclinic sulfur, and which form of sulfur is paramagnetic. None of the board papers from 2014 to 2026 in this bank asked this section, but 'distinguish between rhombic and monoclinic sulfur' is a ready four-point answer worth learning.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgp-sulfur-allotropes",
      name: "Rhombic and monoclinic sulfur",
      intuition:
        "Both common forms of sulfur are made of the same crown-shaped S₈ rings. They differ only in how the rings pack in the crystal, the way the same bricks can be stacked two ways. Below 369 K the rhombic packing is the stable one; above it, the monoclinic. Heat sulfur strongly and the rings break up, until at about 1000 K the vapour is mostly S₂, which, like O₂, has two unpaired electrons.",
      definition:
        "- Elements of group 16 show **allotropy**: one element existing in more than one form. Sulfur has many allotropes; **rhombic (α) and monoclinic (β) sulfur** are the important ones, both non-metallic.\n" +
        "- Both are built of \\(\\text{S}_8\\) molecules with a **puckered ring** of crown shape. Cyclo-\\(\\text{S}_6\\) has its ring in the chair form.\n" +
        "- **369 K** is the transition temperature: rhombic sulfur is stable below it, monoclinic above it.\n" +
        "- **Paramagnetic sulfur:** in the vapour state sulfur partly exists as \\(\\text{S}_2\\), which has two unpaired electrons in antibonding \\(\\pi^*\\) orbitals like \\(\\text{O}_2\\); at about 1000 K \\(\\text{S}_2\\) is the main species.\n" +
        "- A 'distinguish' answer takes each property and states it for **both** forms, in two columns.",
      table: {
        columns: ["Property", "Rhombic sulfur (α)", "Monoclinic sulfur (β)"],
        rows: [
          { cells: ["Colour", "Pale yellow", "Bright yellow solid"] },
          { cells: ["Crystals", "Orthorhombic", "Needle-shaped, monoclinic"] },
          { cells: ["Melting point", "385.8 K", "393 K"] },
          { cells: ["Density", "2.069 g/cm³", "1.989 g/cm³"] },
          { cells: ["Solubility", "Insoluble in water, soluble in \\(\\text{CS}_2\\)", "Soluble in \\(\\text{CS}_2\\)"] },
          { cells: ["Stability", "Stable below 369 K; changes to β above it", "Stable above 369 K; changes to α below it"] },
          { cells: ["Preparation", "Evaporating a solution of roll sulfur in \\(\\text{CS}_2\\)", "Melting rhombic sulfur, cooling till a crust forms, making two holes and pouring out the liquid"] },
          {
            cells: ["Molecule", "\\(\\text{S}_8\\), puckered ring", "\\(\\text{S}_8\\), puckered ring"],
            pyqExampleId: "bfaf966b-d8e2-4176-8a02-20118307e091",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which form of sulfur is stable at room temperature, 298 K?", answer: "Rhombic sulfur, since 298 K is below 369 K" },
        { prompt: "What is the shape of the ring in an S₈ molecule?", answer: "Puckered, crown shaped" },
        { prompt: "In what form does cyclo-S₆ hold its ring?", answer: "The chair form" },
        { prompt: "Which species is the main form of sulfur vapour at about 1000 K?", answer: "\\(\\text{S}_2\\)" },
      ],
      pyqExampleId: "b553677a-9e11-4edc-b49b-1f2d4363aa7c",
      traps: [
        {
          title: "One-sided distinguishing",
          body: "Writing 'rhombic sulfur is pale yellow' with nothing about monoclinic earns nothing. State every point for both forms.",
        },
        {
          title: "Different molecules?",
          body: "Rhombic and monoclinic sulfur are both made of \\(\\text{S}_8\\) rings. They differ in the packing of the rings, not in the molecule.",
        },
        {
          title: "Paramagnetic solid sulfur",
          body: "Ordinary sulfur is diamagnetic. Only the \\(\\text{S}_2\\) molecules in hot sulfur vapour are paramagnetic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-other-allotropes",
      name: "Allotropes of oxygen, selenium, tellurium and polonium",
      intuition:
        "Allotropy runs right down group 16. Oxygen has two forms, the O₂ we breathe and ozone, O₃. Selenium has a red non-metallic form and a grey metallic form, and the grey form conducts electricity when light falls on it, which is how an old photocopier works.",
      definition:
        "- **Oxygen:** dioxygen \\(\\text{O}_2\\) and ozone \\(\\text{O}_3\\).\n" +
        "- **Selenium:** red selenium (non-metallic) and grey selenium (metallic). Grey selenium is a photoconductor, used in photocells and in the photocopying process, where a selenium-coated drum holds the charge pattern of the image.\n" +
        "- **Tellurium:** crystalline and amorphous.\n" +
        "- **Polonium:** α and β forms, both metallic.",
      table: {
        columns: ["Element", "Allotropes", "Note"],
        rows: [
          { cells: ["Oxygen", "\\(\\text{O}_2\\) and \\(\\text{O}_3\\) (ozone)", "Ozone in the upper atmosphere absorbs harmful ultraviolet light"] },
          { cells: ["Sulfur", "Rhombic (α) and monoclinic (β), and many others", "Both important forms are non-metallic"] },
          {
            cells: ["Selenium", "Red and grey", "Red is non-metallic; grey is metallic and a photoconductor"],
            pyqExampleId: "2f219e1e-8664-4c5a-afd9-18d6e48f5ad1",
          },
          { cells: ["Tellurium", "Crystalline and amorphous", "Tellurium is a metalloid"] },
          { cells: ["Polonium", "α and β", "Both are metallic"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the two allotropes of oxygen.", answer: "Dioxygen, \\(\\text{O}_2\\), and ozone, \\(\\text{O}_3\\)" },
        { prompt: "Name the allotropic forms of tellurium.", answer: "Crystalline and amorphous" },
        { prompt: "Are the allotropes of polonium metallic or non-metallic?", answer: "Both are metallic" },
      ],
      pyqExampleId: "2f219e1e-8664-4c5a-afd9-18d6e48f5ad1",
      traps: [
        {
          title: "Which selenium is metallic",
          body: "Grey selenium is metallic and is the photoconductor; red selenium is non-metallic. Swapping them is the usual slip.",
        },
        {
          title: "Ozone is an allotrope, not a compound",
          body: "Ozone contains only oxygen atoms, so it is an allotrope of oxygen, not a compound of it.",
        },
      ],
    },
  ],
};
