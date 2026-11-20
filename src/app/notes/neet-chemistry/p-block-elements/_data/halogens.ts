import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_PB_HALOGENS_NOTE: SubtopicNote = {
  subtopicName: "Halogens and Noble Gases",
  title: "Halogens and Noble Gases",
  oneLineDefinition:
    "Groups 17 and 18: halogen trends and the hydrogen halides, interhalogen compounds and the making of chlorine, the properties and uses of the noble gases, and the shapes of the xenon compounds.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026, more than any other page. Five are on the halogens: the acid strength of HX (2021, and again inside an incorrect-statement question in Re-NEET 2024), why ICl is more reactive than I₂ (2022), the shape of ClF₃ (2026), and what happens to manganese when a halide is heated with MnO₂ and sulphuric acid (Re-NEET 2026). Four are on the noble gases: their properties (2021), helium in diving apparatus (2023), the shapes of four xenon compounds (2025), and a match that pairs xenon with 'most reactive in group 18' beside nitrogen, fluorine and oxygen (Re-NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchpb-halogens",
      name: "Halogen trends and the hydrogen halides",
      intuition:
        "Fluorine, chlorine, bromine and iodine are each one electron short of a noble gas, so they grab electrons readily and are strong oxidising agents. Fluorine, the smallest and most electronegative, is the strongest of all. Its small size also explains its two odd results: the F-F bond is weak because the lone pairs on the two close atoms repel, and chlorine, not fluorine, has the most negative electron gain enthalpy. In the hydrogen halides the H-X bond weakens down the group, so the acid gets stronger: HF is the weakest acid of the four.",
      definition:
        "- **Colour:** \\(\\text{F}_2\\) yellow, \\(\\text{Cl}_2\\) greenish yellow, \\(\\text{Br}_2\\) red, \\(\\text{I}_2\\) violet. F and Cl are gases, Br a liquid, I a solid.\n" +
        "- **Oxidation states:** fluorine shows only −1, being the most electronegative element with no d orbitals. Cl, Br and I also show +1, +3, +5 and +7, with oxygen and fluorine.\n" +
        "- **Oxidising power:** \\(\\text{F}_2 > \\text{Cl}_2 > \\text{Br}_2 > \\text{I}_2\\). Fluorine is the strongest oxidising agent.\n" +
        "- **Bond dissociation enthalpy:** \\(\\text{Cl}_2 > \\text{Br}_2 > \\text{F}_2 > \\text{I}_2\\). The F-F bond is weak because of repulsion between the lone pairs of the small fluorine atoms.\n" +
        "- **Electron gain enthalpy** is most negative for chlorine; fluorine's is less negative because its small 2p shell is crowded.\n" +
        "- **Hydrogen halides:** acid strength \\(\\text{HF} < \\text{HCl} < \\text{HBr} < \\text{HI}\\), because the H-X bond enthalpy falls down the group. Thermal stability runs the other way, HF > HCl > HBr > HI. HF has the highest boiling point (hydrogen bonding): HCl < HBr < HI < HF.",
      table: {
        columns: ["Halogen", "Colour and state", "X-X bond enthalpy (kJ/mol)", "Oxidation states"],
        rows: [
          { cells: ["\\(\\text{F}_2\\)", "Yellow gas", "158.8", "−1 only"] },
          { cells: ["\\(\\text{Cl}_2\\)", "Greenish yellow gas", "242.6", "−1, +1, +3, +5, +7"] },
          { cells: ["\\(\\text{Br}_2\\)", "Red liquid", "192.8", "−1, +1, +3, +5, +7"] },
          { cells: ["\\(\\text{I}_2\\)", "Violet solid", "151.1", "−1, +1, +3, +5, +7"] },
        ],
        caption: "Bond enthalpy peaks at chlorine: F-F is weaker than Cl-Cl and Br-Br.",
      },
      pyqExampleId: "6c8ec5c8-87db-433c-9b18-4771a045646e",
      selfCheckExample: {
        prompt: "Fluorine is more electronegative than chlorine. Why is chlorine's electron gain enthalpy more negative?",
        steps: [
          "Fluorine's outer 2p shell is very small, so its electrons are packed close together.",
          "An incoming electron is repelled strongly by them, so less energy is released than when chlorine, with its larger 3p shell, takes one.",
        ],
        answer: "Fluorine's small size: strong repulsion in its compact 2p shell",
      },
      practiceSet: [
        { prompt: "Which hydrogen halide has the highest boiling point?", answer: "HF, because of hydrogen bonding" },
        { prompt: "Which halogen is a liquid at room temperature?", answer: "Bromine" },
        { prompt: "What is the colour of chlorine gas?", answer: "Greenish yellow" },
        { prompt: "Arrange HF, HCl, HBr and HI by thermal stability, most stable first.", answer: "HF > HCl > HBr > HI" },
      ],
      traps: [
        {
          title: "HF is the weakest hydrogen halide acid",
          body: "Acid strength is \\(\\text{HF} < \\text{HCl} < \\text{HBr} < \\text{HI}\\). The strong H-F bond holds on to its proton, even though fluorine is the most electronegative halogen.",
        },
        {
          title: "The F-F bond is weaker than Cl-Cl",
          body: "Bond dissociation enthalpy does not fall steadily down the group: \\(\\text{F}_2\\) (158.8 kJ/mol) is weaker than \\(\\text{Cl}_2\\) and \\(\\text{Br}_2\\), because of lone pair repulsion.",
        },
        {
          title: "Chlorine, not fluorine, has the most negative electron gain enthalpy",
          body: "Fluorine is the most electronegative element and the strongest oxidising agent, but chlorine releases the most energy on gaining an electron.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-interhalogens",
      name: "Interhalogen compounds and making chlorine",
      intuition:
        "Two different halogens can bond together. The larger, less electronegative one sits in the centre and the smaller ones around it: ICl, ClF₃, BrF₅, IF₇. Count the electron pairs on the central atom as in VSEPR to get the shape. Because the bond between two unlike halogens is weaker than the bond in most halogen molecules, interhalogens are more reactive than the halogens themselves (fluorine apart).",
      definition:
        "- **Types:** XX', \\(\\text{XX'}_3\\), \\(\\text{XX'}_5\\) and \\(\\text{XX'}_7\\), where X is the larger, less electronegative halogen.\n" +
        "- They are covalent and diamagnetic, and more reactive than the halogens (except fluorine), because the X-X' bond is weaker than the X-X bond (except F-F). So ICl is more reactive than \\(\\text{I}_2\\).\n" +
        "- **\\(\\text{ClF}_3\\):** chlorine has 3 bond pairs and 2 lone pairs, \\(sp^3d\\); the lone pairs take equatorial positions and the molecule is bent T-shaped.\n" +
        "- **Making chlorine:** \\(\\text{MnO}_2 + 4\\text{HCl} \\rightarrow \\text{MnCl}_2 + \\text{Cl}_2 + 2\\text{H}_2\\text{O}\\), or heat common salt with \\(\\text{MnO}_2\\) and concentrated \\(\\text{H}_2\\text{SO}_4\\): \\(4\\text{NaCl} + \\text{MnO}_2 + 4\\text{H}_2\\text{SO}_4 \\rightarrow \\text{MnCl}_2 + 4\\text{NaHSO}_4 + 2\\text{H}_2\\text{O} + \\text{Cl}_2\\).\n" +
        "- In both, manganese goes from +4 in \\(\\text{MnO}_2\\) to +2: \\(\\text{MnO}_2\\) is reduced and the chloride is oxidised to chlorine.",
      table: {
        columns: ["Type", "Example", "Lone pairs on the central atom", "Shape"],
        rows: [
          { cells: ["XX'", "ClF, ICl", "No central atom: a two-atom molecule", "Linear"] },
          { cells: ["XX'₃", "ClF₃, BrF₃", "2 (3 bond pairs, sp³d)", "Bent T-shape"], pyqExampleId: "f6e0f526-5e96-4045-a48b-1a827c9dc310", noteAmber: "NEET 2026: ClF₃ is T-shaped with two lone pairs on chlorine." },
          { cells: ["XX'₅", "BrF₅, IF₅", "1 (5 bond pairs, sp³d²)", "Square pyramidal"] },
          { cells: ["XX'₇", "IF₇", "0 (7 bond pairs, sp³d³)", "Pentagonal bipyramidal"] },
        ],
      },
      pyqExampleId: "f6e0f526-5e96-4045-a48b-1a827c9dc310",
      selfCheckExample: {
        prompt: "How many lone pairs does bromine carry in BrF₅, and what is the shape of the molecule?",
        steps: [
          "Bromine has 7 outer electrons; 5 are used in the five Br-F bonds, leaving 2, one lone pair.",
          "Five bond pairs and one lone pair (sp³d²) give a square pyramid.",
        ],
        answer: "One lone pair; square pyramidal",
      },
      practiceSet: [
        { prompt: "What is the shape of IF₇?", answer: "Pentagonal bipyramidal" },
        { prompt: "Is ICl more or less reactive than I₂?", answer: "More reactive" },
        { prompt: "When MnO₂ is heated with HCl to make chlorine, what is the oxidation state of manganese in the manganese product?", answer: "+2 (in \\(\\text{MnCl}_2\\))" },
        { prompt: "In an interhalogen XX'₃, which halogen takes the central position?", answer: "The larger, less electronegative one" },
      ],
      traps: [
        {
          title: "ClF₃ is T-shaped, not trigonal",
          body: "Chlorine in \\(\\text{ClF}_3\\) has five electron pairs: three bond pairs and two lone pairs. The shape is a bent T, neither trigonal planar nor trigonal pyramidal.",
        },
        {
          title: "MnO₂ is reduced, not oxidised",
          body: "When a halide is heated with \\(\\text{MnO}_2\\) and concentrated \\(\\text{H}_2\\text{SO}_4\\), manganese falls from +4 to +2 and the halide ion is oxidised to the halogen.",
        },
        {
          title: "Interhalogens beat halogens in reactivity",
          body: "The X-X' bond is weaker than the X-X bond (F-F apart), so an interhalogen such as ICl reacts more readily than \\(\\text{I}_2\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-noble-gases",
      name: "Noble gases: properties and uses",
      intuition:
        "Helium, neon, argon, krypton, xenon and radon have full outer shells, so they hardly react. Their atoms attract each other only by weak dispersion forces, which is why they are gases with very low melting and boiling points. Their uses come from that inertness and from a few special features: helium is light and does not burn, and it dissolves very little in blood.",
      definition:
        "- **Configuration:** \\(ns^2 np^6\\) (helium \\(1s^2\\)). Radon is radioactive.\n" +
        "- **Properties:** monatomic, colourless, odourless and tasteless; sparingly soluble in water; very high ionisation enthalpies; large positive electron gain enthalpies.\n" +
        "- **Very low melting and boiling points,** because only weak dispersion forces hold the atoms together. Helium has the lowest boiling point of any substance (4.2 K).\n" +
        "- Ionisation enthalpy falls down the group. Xenon, with the lowest value among the non-radioactive members, is the most reactive and forms the most compounds.\n" +
        "- **Bartlett** made the first noble gas compound, \\(\\text{Xe}^+[\\text{PtF}_6]^-\\), after noticing that xenon's first ionisation enthalpy (1170 kJ/mol) is almost the same as that of dioxygen (1175 kJ/mol), which \\(\\text{PtF}_6\\) oxidises.",
      table: {
        columns: ["Noble gas", "Remember it for"],
        rows: [
          { cells: ["Helium", "Weather balloons (light, non-inflammable); diluting oxygen in diving apparatus, since it is very little soluble in blood; liquid helium as a coolant at 4.2 K"] },
          { cells: ["Neon", "Discharge tubes and fluorescent bulbs for advertisement displays"] },
          { cells: ["Argon", "An inert atmosphere in metallurgy, such as arc welding; filling electric bulbs"] },
          { cells: ["Krypton and xenon", "Light bulbs for special purposes; xenon forms the most compounds"] },
          { cells: ["Radon", "Radioactive; formed in the decay of radium"] },
        ],
      },
      pyqExampleId: "3055f31a-1218-456d-9f10-64f720de4c75",
      selfCheckExample: {
        prompt: "Why is helium used to dilute the oxygen breathed in modern diving apparatus?",
        steps: [
          "The gas mixed with the oxygen should not dissolve in the diver's blood.",
          "Helium is very little soluble in blood, and it is light and unreactive.",
        ],
        answer: "Helium has a very low solubility in blood",
      },
      practiceSet: [
        { prompt: "Which noble gas is radioactive?", answer: "Radon" },
        { prompt: "Which noble gas is used in discharge tubes for advertisement displays?", answer: "Neon" },
        { prompt: "Which noble gas provides an inert atmosphere for arc welding?", answer: "Argon" },
        { prompt: "Which noble gas is the most reactive of the non-radioactive ones?", answer: "Xenon" },
      ],
      traps: [
        {
          title: "Noble gases boil at very low temperatures",
          body: "Only weak dispersion forces hold noble gas atoms together, so their melting and boiling points are very low. A statement that they are very high is false.",
        },
        {
          title: "Helium is used for its LOW solubility in blood",
          body: "Helium dilutes oxygen in diving apparatus because it hardly dissolves in blood. High solubility would be the reason to avoid it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchpb-xenon",
      name: "Xenon compounds: preparation, hybridisation and shape",
      visualizationSlug: "neet-xenon-shapes",
      intuition:
        "Xenon has eight outer electrons. In a xenon compound some pair up with fluorine or oxygen, and the rest stay as lone pairs. Count the σ bond pairs and the lone pairs on xenon; their total gives the hybridisation (5 pairs sp³d, 6 pairs sp³d², 7 pairs sp³d³), and the bond pairs alone give the shape, exactly as in VSEPR.",
      definition:
        "- **Fluorides** form by direct reaction, with more fluorine giving more F atoms: \\(\\text{Xe} + \\text{F}_2 \\rightarrow \\text{XeF}_2\\) (xenon in excess, 673 K, 1 bar); \\(\\text{Xe} + 2\\text{F}_2 \\rightarrow \\text{XeF}_4\\) (1 : 5 ratio, 873 K, 7 bar); \\(\\text{Xe} + 3\\text{F}_2 \\rightarrow \\text{XeF}_6\\) (1 : 20 ratio, 573 K, 60 to 70 bar).\n" +
        "- **Hydrolysis of XeF₆:** complete, \\(\\text{XeF}_6 + 3\\text{H}_2\\text{O} \\rightarrow \\text{XeO}_3 + 6\\text{HF}\\); partial, \\(\\text{XeF}_6 + \\text{H}_2\\text{O} \\rightarrow \\text{XeOF}_4 + 2\\text{HF}\\).\n" +
        "- \\(\\text{XeO}_3\\) is a colourless, explosive solid.\n" +
        "- A double bond to oxygen counts as one σ bond pair when you count pairs for the shape.",
      table: {
        columns: ["Compound", "Bond pairs + lone pairs on Xe", "Hybridisation", "Shape"],
        rows: [
          { cells: ["\\(\\text{XeF}_2\\)", "2 + 3", "sp³d", "Linear"] },
          { cells: ["\\(\\text{XeF}_4\\)", "4 + 2", "sp³d²", "Square planar"] },
          { cells: ["\\(\\text{XeF}_6\\)", "6 + 1", "sp³d³", "Distorted octahedral"] },
          { cells: ["\\(\\text{XeO}_3\\)", "3 + 1", "sp³", "Pyramidal"], pyqExampleId: "3c2ca804-8629-4648-b22f-d0babdf7de6d", noteAmber: "NEET 2025: XeO₃, XeF₂, XeOF₄ and XeF₆ were matched to these hybridisations and shapes." },
          { cells: ["\\(\\text{XeOF}_4\\)", "5 + 1", "sp³d²", "Square pyramidal"] },
        ],
      },
      pyqExampleId: "3c2ca804-8629-4648-b22f-d0babdf7de6d",
      selfCheckExample: {
        prompt: "How many lone pairs does xenon carry in XeF₄, and what is the shape of the molecule?",
        steps: [
          "Xenon has 8 outer electrons; 4 are used in the four Xe-F bonds, leaving 4, which is 2 lone pairs.",
          "4 bond pairs + 2 lone pairs = 6 pairs, sp³d². The lone pairs sit opposite each other, so the four F atoms lie in a square.",
        ],
        answer: "Two lone pairs; square planar",
      },
      practiceSet: [
        { prompt: "Which xenon fluoride forms when xenon and fluorine are heated in a 1 : 20 ratio at high pressure?", answer: "\\(\\text{XeF}_6\\)" },
        { prompt: "What are the products when XeF₆ is completely hydrolysed?", answer: "\\(\\text{XeO}_3\\) and HF" },
        { prompt: "What was the first noble gas compound made by Bartlett?", answer: "\\(\\text{Xe}^+[\\text{PtF}_6]^-\\)" },
        { prompt: "Is XeO₃ a stable solid or an explosive one?", answer: "Explosive" },
      ],
      traps: [
        {
          title: "XeF₄ is square planar, not tetrahedral",
          body: "Xenon in \\(\\text{XeF}_4\\) has four bond pairs and two lone pairs, six pairs in all (\\(sp^3d^2\\)). The two lone pairs sit above and below, leaving a flat square of fluorines.",
        },
        {
          title: "XeF₆ is a distorted octahedron",
          body: "Six bond pairs plus one lone pair make seven pairs, \\(sp^3d^3\\). The lone pair distorts the octahedron, so do not call it a regular octahedron.",
        },
      ],
    },
  ],
};
