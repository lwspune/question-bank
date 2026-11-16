import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_PB_BORON_NOTE: SubtopicNote = {
  subtopicName: "Boron and Carbon Families",
  title: "Boron and Carbon Families",
  oneLineDefinition:
    "Groups 13 and 14: the inert pair effect and boron's covalency of four, diborane and the electron-deficient halides of boron and aluminium, and carbon's multiple bonds, catenation and allotropes.",
  whyItMatters:
    "Seven NEET questions from 2022 to 2026. Two are on group 13 trends: which of thallium's iodides is more stable (2023) and boron's maximum covalency of four (Re-NEET 2026). One picks the false statement about diborane (2022), and one asks the ratio of K⁺ to SO₄²⁻ ions in potash alum (Re-NEET 2026). Three are on carbon: the hybridisation of diamond and graphite (2022), a match of coke, diamond, fullerene and graphite with their uses and structures (2023), and an incorrect-statement question on carbon's multiple bonds, catenation and the dimer of aluminium chloride (2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchpb-group13",
      name: "Group 13: oxidation states, the inert pair effect and covalency",
      intuition:
        "Boron, aluminium, gallium, indium and thallium all have three outer electrons (ns² np¹), so +3 is the oxidation state you expect. Down the group, though, the two s electrons hold on more and more tightly and stay out of bonding. Only the single p electron is used, and the +1 state becomes more stable. By thallium, +1 is the normal state and Tl³⁺ is a strong oxidising agent. Boron, at the top, is small and has only four outer orbitals, which limits how many bonds it can form.",
      definition:
        "- **Outer configuration:** \\(ns^2 np^1\\). Boron and aluminium show +3.\n" +
        "- **Inert pair effect:** in Ga, In and Tl both +1 and +3 are seen. The stability of +1 rises down the group: Al < Ga < In < Tl. In thallium +1 is the main state, and Tl(III) compounds are strong oxidising agents.\n" +
        "- The cause: the d and f electrons of the heavier atoms shield the nucleus poorly, so the \\(ns^2\\) pair is held tightly and does not take part in bonding.\n" +
        "- **Covalency:** boron has only four outer orbitals (one 2s and three 2p) and no d orbitals, so its maximum covalency is 4, as in \\([\\text{BF}_4]^-\\). Aluminium and the heavier members have d orbitals and can reach a covalency of 6.\n" +
        "- **Size:** gallium's atomic radius is a little smaller than aluminium's, because its ten 3d electrons shield poorly.",
      table: {
        columns: ["Element", "Oxidation states seen", "What to remember"],
        rows: [
          { cells: ["Boron, B", "+3", "Non-metal; covalency at most 4, since it has no d orbitals"], pyqExampleId: "f726cb62-5ce2-4f44-b884-6fa8af6b68f7", noteAmber: "Re-NEET 2026: boron has a maximum covalency of four." },
          { cells: ["Aluminium, Al", "+3", "Metal; can use d orbitals and reach a covalency of 6"] },
          { cells: ["Gallium, Ga", "+1 and +3", "Slightly smaller atom than aluminium"] },
          { cells: ["Indium, In", "+1 and +3", "+1 more stable than in gallium"] },
          { cells: ["Thallium, Tl", "+1 and +3", "+1 is the main state; Tl³⁺ is a strong oxidising agent"] },
        ],
      },
      pyqExampleId: "f726cb62-5ce2-4f44-b884-6fa8af6b68f7",
      selfCheckExample: {
        prompt: "Which oxidation state of thallium is the more stable, +1 or +3, and what is the reason?",
        steps: [
          "Down group 13 the ns² pair is held more and more tightly by the nucleus, because the inner d and f electrons shield it poorly.",
          "So the heaviest member, thallium, tends to use only its p electron.",
        ],
        answer: "+1, because of the inert pair effect",
      },
      practiceSet: [
        { prompt: "What is the outer electronic configuration of the group 13 elements?", answer: "\\(ns^2 np^1\\)" },
        { prompt: "Name the effect that makes the +1 oxidation state more stable down group 13.", answer: "The inert pair effect" },
        { prompt: "Is a thallium(III) compound more likely to act as an oxidising agent or a reducing agent?", answer: "An oxidising agent (Tl³⁺ is readily reduced to Tl⁺)" },
        { prompt: "Which is the smaller atom, aluminium or gallium?", answer: "Gallium" },
      ],
      traps: [
        {
          title: "Down the group, +1 gets more stable",
          body: "The inert pair effect grows from Al to Tl. So for thallium the +1 compound is the stable one: TlI is more stable than \\(\\text{TlI}_3\\), and \\(\\text{TlCl}\\) more stable than \\(\\text{TlCl}_3\\).",
        },
        {
          title: "Boron stops at four bonds",
          body: "Boron has four outer orbitals and no d orbitals, so it can never form more than four bonds. A covalency of six belongs to aluminium and the heavier members.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-boron-compounds",
      name: "Diborane, boric acid and the halides of boron and aluminium",
      intuition:
        "A boron or aluminium atom with three bonds has only six electrons around it, two short of an octet. Its compounds keep trying to fix that. Boron trifluoride grabs a lone pair from ammonia. Aluminium chloride pairs up into a dimer. Diborane, \\(\\text{B}_2\\text{H}_6\\), does not have enough electrons for ordinary bonds everywhere, so two hydrogens act as bridges, each bridge holding three atoms together with one pair of electrons.",
      definition:
        "- **Diborane** \\(\\text{B}_2\\text{H}_6\\): each boron is \\(sp^3\\) hybridised. The four terminal hydrogens and the two borons lie in one plane, and the four terminal B-H bonds are ordinary two-centre two-electron bonds.\n" +
        "- The two bridging hydrogens sit above and below that plane. Each B-H-B bridge is a **three-centre two-electron (3c-2e) bond**, a banana bond: diborane has two of them. The bridging B-H bonds are longer than the terminal ones.\n" +
        "- Diborane burns in oxygen with a lot of heat: \\(\\text{B}_2\\text{H}_6 + 3\\text{O}_2 \\rightarrow \\text{B}_2\\text{O}_3 + 3\\text{H}_2\\text{O}\\). Water hydrolyses it: \\(\\text{B}_2\\text{H}_6 + 6\\text{H}_2\\text{O} \\rightarrow 2\\text{B(OH)}_3 + 6\\text{H}_2\\).\n" +
        "- **Boron trihalides** are electron deficient and act as Lewis acids: \\(\\text{BF}_3\\) easily takes the lone pair of \\(\\text{NH}_3\\).\n" +
        "- **Aluminium chloride** gains stability by forming the dimer \\(\\text{Al}_2\\text{Cl}_6\\), in which a chlorine of each unit gives a lone pair to the aluminium of the other. Boron trichloride stays a monomer.\n" +
        "- **Alums** are double salts such as potash alum, \\(\\text{K}_2\\text{SO}_4\\cdot\\text{Al}_2(\\text{SO}_4)_3\\cdot 24\\text{H}_2\\text{O}\\). One formula unit holds 2 \\(\\text{K}^+\\), 2 \\(\\text{Al}^{3+}\\) and 4 \\(\\text{SO}_4^{2-}\\), so \\(\\text{K}^+ : \\text{SO}_4^{2-} = 1 : 2\\).\n" +
        "- **Boric acid** \\(\\text{B(OH)}_3\\) is a weak monobasic acid. It is not a proton donor: it accepts a hydroxide ion, \\(\\text{B(OH)}_3 + 2\\text{H}_2\\text{O} \\rightarrow [\\text{B(OH)}_4]^- + \\text{H}_3\\text{O}^+\\), so it is a Lewis acid.",
      table: {
        columns: ["Compound", "Structure", "Behaviour"],
        rows: [
          { cells: ["\\(\\text{B}_2\\text{H}_6\\)", "Each B is sp³; four terminal B-H bonds in one plane, two B-H-B bridges above and below it", "Two 3c-2e bridge bonds; burns in air, hydrolysed by water to boric acid"], pyqExampleId: "a6bd3542-2b37-4fd9-8d63-801e6043fede", noteAmber: "NEET 2022: the false statement was that both borons are sp² hybridised." },
          { cells: ["\\(\\text{BF}_3\\), \\(\\text{BCl}_3\\)", "Trigonal planar, B is sp²; six electrons around B", "Lewis acids; take a lone pair from \\(\\text{NH}_3\\)"] },
          { cells: ["\\(\\text{AlCl}_3\\)", "Exists as the dimer \\(\\text{Al}_2\\text{Cl}_6\\)", "Electron deficient as a monomer; a Lewis acid"] },
          { cells: ["\\(\\text{B(OH)}_3\\)", "Planar \\(\\text{BO}_3\\) units joined by hydrogen bonds into layers", "Weak monobasic Lewis acid: accepts \\(\\text{OH}^-\\)"] },
        ],
      },
      pyqExampleId: "a6bd3542-2b37-4fd9-8d63-801e6043fede",
      selfCheckExample: {
        prompt: "What does diborane give when it reacts with water?",
        steps: [
          "\\(\\text{B}_2\\text{H}_6 + 6\\text{H}_2\\text{O} \\rightarrow 2\\text{B(OH)}_3 + 6\\text{H}_2\\).",
          "Check: B 2 = 2; H 6 + 12 = 18 on the left, 6 + 12 = 18 on the right; O 6 = 6.",
        ],
        answer: "Boric acid, B(OH)₃, and hydrogen gas",
      },
      practiceSet: [
        { prompt: "What does diborane give when it burns in oxygen?", answer: "\\(\\text{B}_2\\text{O}_3\\) and water, with a large release of heat" },
        { prompt: "Is boric acid a proton donor or a Lewis acid?", answer: "A Lewis acid: it accepts \\(\\text{OH}^-\\) from water" },
        { prompt: "In which form does aluminium chloride gain stability?", answer: "As the dimer \\(\\text{Al}_2\\text{Cl}_6\\)" },
        { prompt: "BF₃ reacts with NH₃. Which of the two acts as the Lewis acid?", answer: "\\(\\text{BF}_3\\)" },
      ],
      traps: [
        {
          title: "Diborane's boron is sp³",
          body: "Each boron in \\(\\text{B}_2\\text{H}_6\\) uses \\(sp^3\\) hybrid orbitals: two for terminal hydrogens and two for the bridges. The \\(sp^2\\) boron belongs to \\(\\text{BF}_3\\) and \\(\\text{BCl}_3\\).",
        },
        {
          title: "Two banana bonds, and not all hydrogens in one plane",
          body: "Diborane has four bridging B-H links but only two 3c-2e bonds. The two bridging hydrogens lie above and below the plane of the other four hydrogens, and their bonds are longer and weaker than the terminal ones.",
        },
        {
          title: "Boric acid does not give up a proton",
          body: "\\(\\text{B(OH)}_3\\) is acidic because it accepts \\(\\text{OH}^-\\) from water, releasing \\(\\text{H}_3\\text{O}^+\\). It is a monobasic Lewis acid, not a tribasic protonic one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-carbon",
      name: "Carbon: multiple bonds, catenation and allotropes",
      intuition:
        "Carbon is small and fairly electronegative, so it forms strong bonds to itself, long chains and rings (catenation), and double and triple bonds by side-on overlap of p orbitals. Its heavier cousins cannot do this as well. Carbon's pure forms differ only in how the atoms are joined: four bonds each in a rigid 3D network makes diamond, three bonds each in flat layers makes graphite, and a closed cage makes fullerene.",
      definition:
        "- **Multiple bonds:** carbon forms \\(p\\pi\\)-\\(p\\pi\\) multiple bonds with itself (C=C, C≡C) and with nitrogen and oxygen. The heavier members of group 14 do not.\n" +
        "- **Catenation:** strongest in carbon and falls sharply down the group, C >> Si > Ge ≈ Sn. Lead shows none.\n" +
        "- **Diamond:** each carbon \\(sp^3\\), joined to four others tetrahedrally in a rigid three-dimensional network. The hardest natural substance; used as an abrasive, to make dies and as a gem.\n" +
        "- **Graphite:** each carbon \\(sp^2\\), joined to three others in flat layers of hexagonal rings. The layers are held by weak van der Waals forces, so they slide: graphite is soft and slippery and is a dry lubricant. The fourth electron of each carbon is free to move, so graphite conducts electricity along the layers.\n" +
        "- **Fullerene** \\(\\text{C}_{60}\\) (buckminsterfullerene): a cage-like molecule of 20 six-membered and 12 five-membered rings, all carbons \\(sp^2\\). It is the only pure form of carbon, since it has no dangling bonds.\n" +
        "- Coke, charcoal and carbon black are impure forms of graphite or fullerenes.\n" +
        "- **Silicates** are built from \\(\\text{SiO}_4^{4-}\\) tetrahedra, joined at their corners by sharing 1, 2, 3 or 4 oxygen atoms per unit.",
      table: {
        columns: ["Form of carbon", "Structure", "Remember it for"],
        rows: [
          { cells: ["Diamond", "sp³ carbon, each bonded to four others in a 3D network", "Hardest natural substance; abrasive, dies, jewellery"] },
          { cells: ["Graphite", "sp² carbon in flat hexagonal layers held by weak van der Waals forces", "Dry lubricant; conducts electricity along the layers"] },
          { cells: ["Fullerene, C₆₀", "sp² carbon in a closed cage of 20 six-membered and 12 five-membered rings", "Cage-like molecule; the pure form of carbon"] },
          { cells: ["Coke", "Impure, amorphous form", "Fuel, and the reducing agent in metallurgy"], pyqExampleId: "2881794e-be9b-4415-b5c8-e478c9ddb862", noteAmber: "NEET 2023: coke was matched with 'used as a reducing agent' and fullerene with 'cage like molecules'." },
          { cells: ["Charcoal and carbon black", "Impure, amorphous forms", "Charcoal adsorbs gases; carbon black makes black ink"] },
        ],
      },
      pyqExampleId: "2881794e-be9b-4415-b5c8-e478c9ddb862",
      selfCheckExample: {
        prompt: "Why does graphite conduct electricity while diamond does not?",
        steps: [
          "In graphite each carbon uses three electrons in bonds within its layer; the fourth is free to move across the layer.",
          "In diamond all four electrons of each carbon are locked in bonds, so none is free to move.",
        ],
        answer: "Graphite has a free electron on each carbon; diamond has none",
      },
      practiceSet: [
        { prompt: "Arrange C, Si, Ge and Sn by their tendency to catenate, strongest first.", answer: "C >> Si > Ge ≈ Sn" },
        { prompt: "What is the hybridisation of carbon in fullerene, C₆₀?", answer: "\\(sp^2\\)" },
        { prompt: "How many five-membered rings does buckminsterfullerene contain?", answer: "12" },
        { prompt: "What is the basic structural unit of all silicates?", answer: "The \\(\\text{SiO}_4^{4-}\\) tetrahedron" },
      ],
      traps: [
        {
          title: "Graphite is layered, not a 3D network",
          body: "Diamond is the three-dimensional network. Graphite is flat sheets stacked loosely, which is exactly why it is soft and works as a lubricant.",
        },
        {
          title: "Only diamond is sp³",
          body: "Diamond's carbons are \\(sp^3\\); graphite's and fullerene's are \\(sp^2\\).",
        },
        {
          title: "Only carbon makes pπ-pπ bonds in group 14",
          body: "Silicon and the heavier members do not form \\(p\\pi\\)-\\(p\\pi\\) multiple bonds: their p orbitals are too large and diffuse to overlap side on. Their catenation is much weaker too: C >> Si > Ge ≈ Sn.",
        },
      ],
    },
  ],
};
