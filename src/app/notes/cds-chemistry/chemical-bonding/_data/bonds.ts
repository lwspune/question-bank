import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_BO_BONDS_NOTE: SubtopicNote = {
  subtopicName: "Ionic and Covalent Bonding",
  title: "Ionic and Covalent Bonds",
  oneLineDefinition:
    "How ionic bonds (electron transfer) differ from covalent bonds (electron sharing), what makes a compound more ionic, and why plastics last so long.",
  whyItMatters:
    "Two CDS questions: which compound is the most ionic (2024) and why plastics do not degrade (2025). Both turn on knowing what kind of bond holds the substance together.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschbo-ionic-covalent",
      name: "Ionic and covalent bonds",
      intuition:
        "A metal that easily loses electrons and a non-metal that eagerly takes them form an ionic bond: one gives, one takes. Two non-metals that both want electrons share them instead, forming a covalent bond. The bigger and less charged the metal ion, the more purely ionic the compound.",
      definition:
        "The two bonds:\n" +
        "- **Ionic**: electrons **transferred** from a metal to a non-metal (NaCl, K₂S). High melting points; conduct when molten or dissolved.\n" +
        "- **Covalent**: electrons **shared** between non-metals (H₂O, CH₄, SiO₂, NCl₃). Usually low melting points (except network solids); do not conduct.\n" +
        "- **Ionic character is greatest** with a **large, singly charged cation** (K⁺, Cs⁺) and an electronegative anion.\n" +
        "- A **small, highly charged cation** (Be²⁺, Al³⁺) distorts the anion's electrons, so its compounds lean **covalent** (Fajans' rule).\n" +
        "- **Plastics** are long chains held by strong **covalent C–C and C–H bonds** that microbes cannot break, so they do not degrade easily.",
      table: {
        columns: ["Property", "Ionic", "Covalent"],
        rows: [
          { cells: ["How the bond forms", "Electron transfer", "Electron sharing"] },
          { cells: ["Typical partners", "Metal + non-metal", "Non-metal + non-metal"] },
          { cells: ["Melting point", "High", "Usually low"] },
          { cells: ["Conducts when molten", "Yes", "No"] },
          {
            cells: ["Example", "K₂S (highly ionic)", "SiO₂, NCl₃, plastics"],
            pyqExampleId: "e3765b23-5369-4d8b-8a19-cd2baf4be288",
          },
        ],
      },
      pyqExampleId: "c96b6e49-e40f-4099-9909-d4e7da690a90",
      selfCheckExample: {
        prompt: "Which is more ionic, sodium chloride or aluminium chloride? Give the reason.",
        steps: [
          "Na⁺ is large and carries one charge; Al³⁺ is small and carries three.",
          "A small, highly charged cation distorts the chloride ion's electrons and makes the bond partly covalent.",
        ],
        answer: "Sodium chloride; Al³⁺ is small and highly charged, so aluminium chloride is largely covalent.",
      },
      practiceSet: [
        { prompt: "Is the bond in sodium chloride ionic or covalent?", answer: "Ionic" },
        { prompt: "Is the bond in methane ionic or covalent?", answer: "Covalent" },
        { prompt: "Why do plastics not degrade easily?", answer: "Their strong covalent bonds cannot be broken by microbes" },
      ],
      traps: [
        {
          title: "A big, singly charged cation gives the most ionic compound",
          body: "Potassium sulphide is highly ionic because K⁺ is large and singly charged. Beryllium compounds lean covalent because Be²⁺ is tiny and highly charged.",
        },
        {
          title: "Plastics last because of covalent bonds",
          body: "Plastics are not ionic or metallic. Their long chains are held by **strong covalent bonds**, which is why they persist in the environment.",
        },
        {
          title: "SiO₂ is covalent despite its high melting point",
          body: "Silicon dioxide melts at a very high temperature because it is a giant covalent network, not because it is ionic.",
        },
      ],
    },
  ],
};
