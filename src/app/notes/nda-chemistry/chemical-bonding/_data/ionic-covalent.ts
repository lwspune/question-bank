import type { SubtopicNote } from "@/app/notes/_types";

export const IONIC_COVALENT_NOTE: SubtopicNote = {
  subtopicName: "Ionic and Covalent Bonding",
  title: "Ionic and Covalent Bonding",
  oneLineDefinition:
    "Atoms bond to complete their outer shells — metals give electrons to non-metals (ionic), non-metals share electrons (covalent), one atom can donate both shared electrons (coordinate), and metals pool their electrons (metallic).",
  whyItMatters:
    "The foundation of the whole chapter — 5 PYQs and the frame for every other concept. " +
    "The bank tests it four ways: spot the covalent compound in a list of ionic ones, rank oxides by melting point (ionic strength), give the coordination number in an ionic lattice, and the classic 'which statement about water is NOT correct' polarity trap. " +
    "Learn the octet rule, the four bond types, and the ionic-vs-covalent property contrast, and these all fall out.",
  concepts: [
    // FOUNDATION — why atoms bond (octet rule + bond-type overview) — reference table
    {
      kind: "reference" as const,
      slug: "octet-rule-and-bond-types",
      name: "The octet rule and the four types of chemical bond",
      intuition:
        "Noble gases (He, Ne, Ar…) are unreactive because their outer shell is already full. Every other atom bonds to reach that same full outer shell of eight electrons — the octet. " +
        "There are only four ways to do it: hand electrons over (ionic), share them (covalent), have one atom donate both shared electrons (coordinate), or pool them across many atoms (metallic).",
      definition:
        "Atoms bond to achieve a stable, completely filled outermost shell (a duplet of 2 for hydrogen and lithium, an **octet** of 8 for most others) — the **octet rule**. The four bond types:\n" +
        "- **Ionic (electrovalent) bond** — a metal **transfers** electrons to a non-metal, forming positive and negative ions held by electrostatic attraction. Example: Na⁺Cl⁻.\n" +
        "- **Covalent bond** — two non-metals **share** one or more pairs of electrons. Example: H₂O, CH₄, SiC.\n" +
        "- **Coordinate (dative) bond** — a covalent bond where **both** shared electrons come from the **same** atom. Example: the fourth N–H bond in the ammonium ion NH₄⁺.\n" +
        "- **Metallic bond** — metal atoms release their valence electrons into a shared 'sea' of delocalised electrons around fixed positive ions.",
      table: {
        columns: ["Bond type", "How the octet is reached", "Formed between", "Example"],
        rows: [
          {
            cells: ["Ionic (electrovalent)", "Electrons transferred (lost / gained)", "Metal + non-metal", "Na⁺Cl⁻, MgO"],
          },
          {
            cells: ["Covalent", "Electrons shared (one pair from each atom)", "Non-metal + non-metal", "H₂O, CH₄, SiC"],
          },
          {
            cells: ["Coordinate (dative)", "Shared pair donated by one atom only", "Donor with a lone pair", "NH₄⁺, H₃O⁺"],
          },
          {
            cells: ["Metallic", "Valence electrons pooled in a 'sea'", "Metal atoms", "Na, Fe, Cu"],
            noteAmber: "Metallic bonding (mobile electron sea) is why metals conduct electricity and are malleable.",
          },
        ],
        caption: "Transfer = ionic; share = covalent; one-sided share = coordinate; pool = metallic.",
      },
      pyqExampleId: "6dafd434-b700-45bd-b821-2563e75b9de9", // which is a covalent compound — SiC
      selfCheckExample: {
        prompt:
          "Which one of these is a covalent compound: calcium oxide, sodium nitride, silicon carbide, or zinc sulphide?",
        steps: [
          "Calcium oxide (CaO), sodium nitride (Na₃N) and zinc sulphide (ZnS) all pair a metal with a non-metal → ionic.",
          "Silicon carbide (SiC) pairs two non-metals (Si and C), which share electrons.",
          "Sharing between non-metals is a covalent bond.",
        ],
        answer: "Silicon carbide (SiC) — a covalent (giant network) compound; the other three are ionic.",
      },
      practiceSet: [
        { prompt: "Why do atoms form chemical bonds?", answer: "To complete their outermost shell (achieve a stable octet)" },
        { prompt: "What type of bond forms when a metal transfers electrons to a non-metal?", answer: "Ionic (electrovalent) bond" },
        { prompt: "What type of bond forms when two non-metals share electrons?", answer: "Covalent bond" },
        { prompt: "In which bond do both shared electrons come from the same atom?", answer: "Coordinate (dative) bond" },
        { prompt: "Which bond type holds a piece of copper metal together?", answer: "Metallic bond", method: "a sea of delocalised valence electrons" },
        { prompt: "Is silicon carbide (SiC) ionic or covalent?", answer: "Covalent", method: "two non-metals sharing electrons" },
      ],
      traps: [
        {
          title: "Metal + non-metal is ionic; non-metal + non-metal is covalent",
          body:
            "The quick test: a compound of a metal and a non-metal (CaO, Na₃N, ZnS) is **ionic**; a compound of two non-metals (SiC, CO₂, H₂O) is **covalent**. Silicon carbide trips students because it 'looks hard like a salt', but Si and C are both non-metals → covalent.",
        },
        {
          title: "A coordinate bond is still a covalent bond",
          body:
            "A coordinate (dative) bond shares a pair of electrons just like an ordinary covalent bond — the only difference is that **one atom supplied both** electrons. Once formed it is identical to any other covalent bond.",
        },
      ],
    },

    // ionic vs covalent properties — melting point / conductivity (reference)
    {
      kind: "reference" as const,
      slug: "ionic-vs-covalent-properties",
      name: "Properties of ionic versus covalent compounds",
      intuition:
        "Ionic compounds are giant lattices of ions held by strong electrostatic forces — so they melt high and conduct when molten or dissolved. Covalent compounds are usually small molecules held to each other weakly — so they melt low and don't conduct. " +
        "Stronger ionic attraction (higher charges, smaller ions) means a higher melting point: that is how the bank ranks oxides.",
      definition:
        "The property contrast the bank tests, and why:\n" +
        "- **Melting / boiling point** — **ionic: high** (strong lattice forces); **covalent (molecular): low** (weak forces between molecules). Higher ion charges raise the melting point, so **MgO (Mg²⁺O²⁻) melts higher than Na₂O (Na⁺O²⁻)** — a +2/−2 lattice beats a +1/−2 one.\n" +
        "- **Electrical conductivity** — **ionic: conduct when molten or in solution** (ions are then free to move), but not as a solid; **covalent: do not conduct** (no free ions or electrons).\n" +
        "- **Solubility** — ionic compounds usually dissolve in water (polar); covalent (non-polar) compounds dissolve in organic solvents.\n" +
        "- **State** — ionic compounds are hard crystalline solids; covalent compounds are often gases, liquids or soft solids.\n" +
        "- **Coordination number** — in the NaCl lattice each Na⁺ is surrounded by 6 Cl⁻ and each Cl⁻ by 6 Na⁺, so the coordination number is **6 : 6**.",
      table: {
        columns: ["Property", "Ionic compounds", "Covalent (molecular) compounds"],
        rows: [
          {
            cells: ["Melting / boiling point", "High (strong lattice)", "Low (weak intermolecular forces)"],
            noteAmber: "Among Na₂O, MgO, Fe₂O₃, CuO the highest melting point is MgO (~2852°C) — the small, doubly-charged Mg²⁺O²⁻ lattice.",
          },
          { cells: ["Electrical conductivity", "Conducts when molten or dissolved (not solid)", "Does not conduct"] },
          { cells: ["Solubility", "Usually soluble in water", "Soluble in organic solvents"] },
          { cells: ["Physical state", "Hard crystalline solids", "Gases, liquids or soft solids"] },
          {
            cells: ["NaCl lattice coordination number", "6 : 6 (each ion surrounded by 6 of the opposite)", "—"],
            pyqExampleId: "c71900b4-ed8f-4aff-b8bc-6cb1e3356bc8", // coordination number Na+ and Cl- = 6,6
          },
        ],
        caption: "Ionic = high MP + conducts when molten; covalent = low MP + does not conduct.",
      },
      pyqExampleId: "d5051c7a-c581-4240-99fe-72a8c0128c34", // highest melting point oxide — MgO
      selfCheckExample: {
        prompt:
          "Which oxide has the highest melting point: Na₂O, MgO, Fe₂O₃ or CuO?",
        steps: [
          "Melting point of an ionic lattice rises with ion charge and falls with ion size.",
          "MgO is built from small, doubly-charged Mg²⁺ and O²⁻ ions — a very strong +2/−2 lattice.",
          "Na₂O uses singly-charged Na⁺, so its lattice is weaker; MgO outranks all four.",
        ],
        answer: "MgO — its small, doubly-charged ions give the strongest lattice and highest melting point (~2852°C).",
      },
      practiceSet: [
        { prompt: "Do ionic or covalent compounds generally have higher melting points?", answer: "Ionic compounds", method: "strong electrostatic lattice forces" },
        { prompt: "When does an ionic compound conduct electricity?", answer: "When molten or dissolved in water", method: "ions are then free to move" },
        { prompt: "Do covalent (molecular) compounds conduct electricity?", answer: "No", method: "no free ions or electrons" },
        { prompt: "What is the coordination number of Na⁺ and Cl⁻ in the NaCl lattice?", answer: "6 and 6 (6 : 6)" },
        { prompt: "Why does MgO melt higher than Na₂O?", answer: "Mg²⁺ is doubly charged, giving a stronger lattice than singly-charged Na⁺" },
      ],
      traps: [
        {
          title: "Ionic solids do NOT conduct — only when molten or dissolved",
          body:
            "A statement that 'solid sodium chloride conducts electricity' is **wrong**. In the solid the ions are locked in the lattice; they conduct only when **molten or dissolved**, when the ions can move.",
        },
        {
          title: "Higher charge → higher melting point",
          body:
            "When ranking oxide melting points, the +2/−2 lattice (MgO) beats the +1/−2 lattice (Na₂O). Don't rank by molecular mass — rank by **ionic charge and size**.",
        },
      ],
    },

    // bond polarity — water is polar (reference)
    {
      kind: "reference" as const,
      slug: "bond-polarity",
      name: "Bond polarity and polar molecules",
      intuition:
        "When two different atoms share electrons, the more electronegative atom pulls the shared pair closer, so one end is slightly negative and the other slightly positive — a polar bond. " +
        "If a molecule's bent or asymmetric shape leaves those pulls uncancelled, the whole molecule is polar. Water is the classic polar molecule the bank loves to falsify.",
      definition:
        "Polarity facts the bank tests:\n" +
        "- A bond between **two identical** atoms (H–H, Cl–Cl) is **non-polar** — the electrons are shared equally.\n" +
        "- A bond between **different** atoms (H–O, H–Cl) is **polar** — the more electronegative atom (O, Cl) gains a partial negative charge δ⁻ and the other a partial positive δ⁺.\n" +
        "- **Water (H₂O) is a polar molecule** — it is **bent** (~104.5°), so the two O–H bond dipoles don't cancel; oxygen is δ⁻, the hydrogens δ⁺. This polarity makes water an excellent solvent for ionic compounds and gives it a high boiling point (hydrogen bonding).\n" +
        "- A symmetric molecule (CO₂, CH₄) can have polar bonds yet be **non-polar overall** because the bond dipoles cancel.",
      table: {
        columns: ["Statement about water", "True or false"],
        rows: [
          {
            cells: ["Water is a polar molecule", "TRUE — it is bent, so the O–H dipoles don't cancel"],
            noteAmber: "The bank's trap: the FALSE option is 'water is a non-polar molecule'. Water is polar.",
          },
          { cells: ["Water has a bent (V-shaped) geometry", "TRUE — bond angle ≈ 104.5°"] },
          { cells: ["Water is a good solvent for ionic compounds", "TRUE — its polarity pulls ions apart"] },
          { cells: ["Water is a non-polar molecule", "FALSE — this is the statement the bank wants flagged"] },
        ],
      },
      pyqExampleId: "ce3bb556-96bc-400d-9aab-7796bd48f615", // which statement about water is NOT true — non-polar
      selfCheckExample: {
        prompt:
          "Which statement about water is NOT true: (a) it is a polar molecule, (b) it has a bent shape, (c) it is a non-polar molecule, (d) it dissolves ionic salts?",
        steps: [
          "Water's O–H bonds are polar because oxygen is far more electronegative than hydrogen.",
          "The molecule is bent (~104.5°), so the two bond dipoles do not cancel — the molecule is polar.",
          "Statement (c) calls it non-polar, which contradicts the above.",
        ],
        answer: "(c) — 'water is a non-polar molecule' is the false statement; water IS polar.",
      },
      practiceSet: [
        { prompt: "Is the H–H bond polar or non-polar?", answer: "Non-polar", method: "identical atoms share electrons equally" },
        { prompt: "Is the H–O bond polar or non-polar?", answer: "Polar", method: "oxygen is more electronegative, pulling the shared pair" },
        { prompt: "Is water a polar or non-polar molecule?", answer: "Polar", method: "bent shape leaves the bond dipoles uncancelled" },
        { prompt: "Why is water a good solvent for salts?", answer: "Its polarity lets it pull apart ions in the lattice" },
        { prompt: "Why is CO₂ non-polar despite having polar C=O bonds?", answer: "It is linear, so the two bond dipoles cancel" },
      ],
      traps: [
        {
          title: "Water is polar, not non-polar",
          body:
            "The single most-tested trap in this subtopic: 'water is a non-polar molecule' is **FALSE**. Water is **polar** because its bent shape stops the two O–H bond dipoles cancelling.",
        },
        {
          title: "Polar bonds don't always make a polar molecule",
          body:
            "CO₂ has polar C=O bonds but is **non-polar overall** because the molecule is linear and the dipoles cancel. Shape decides molecular polarity, not just the bonds.",
        },
      ],
    },
  ],
};
