import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_BM_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Proteins and Enzymes",
  title: "Proteins and Enzymes",
  oneLineDefinition:
    "Amino acids and why they behave like salts, the peptide bond that joins them into chains, the four levels of protein structure and what denaturation destroys, and enzymes as protein catalysts.",
  whyItMatters:
    "Three NEET questions, from 2022 to Re-NEET 2026. One asks for the wrong statement about enzymes: they are proteins, not polysaccharides (2022). One asks which statement about protein structure is right: the chains of a β-pleated sheet are held by intermolecular hydrogen bonds (Re-NEET 2026). One asks which amino acid shows sulphur in its sodium fusion extract: methionine (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchbm-protein-structure",
      name: "Amino acids, peptides and protein structure",
      visualizationSlug: "biochem-protein-structure-levels",
      intuition:
        "A protein is a long chain of α-amino acids joined by peptide bonds. The order of amino acids in the chain is its primary structure. The chain then coils or folds, held mainly by hydrogen bonds, and some proteins pack several chains together. Heat or a change in pH breaks those weak bonds but not the peptide bonds, so the shape is lost and the sequence stays.",
      definition:
        "- **α-Amino acids** carry an amino group and a carboxyl group on the same carbon and differ only in the side chain R. In glycine R is H.\n" +
        "- **Essential** amino acids cannot be made by the body and must come from the diet. NCERT marks ten: valine, leucine, isoleucine, arginine, lysine, threonine, methionine, phenylalanine, tryptophan and histidine. The ones the body can make are **non-essential**.\n" +
        "- Two amino acids contain sulphur: cysteine, \\(\\text{-CH}_2\\text{SH}\\), and methionine, \\(\\text{-CH}_2\\text{CH}_2\\text{SCH}_3\\).\n" +
        "- In Lassaigne's test, sulphur in the sodium fusion extract gives a **violet** colour with sodium nitroprusside. When nitrogen and sulphur are both present, sodium thiocyanate forms and gives a **blood red** colour with \\(\\text{Fe}^{3+}\\).\n" +
        "- **Zwitterion:** in water the COOH gives its proton to the \\(\\text{NH}_2\\), giving \\(\\text{H}_3\\text{N}^+\\text{-CH(R)-COO}^-\\). So amino acids are colourless, crystalline, water-soluble, high-melting solids that behave like salts, and they are amphoteric.\n" +
        "- Except glycine, all naturally occurring α-amino acids are optically active, and most have the L configuration.\n" +
        "- A **peptide bond** is the amide link \\(\\text{-CO-NH-}\\) formed between the COOH of one amino acid and the \\(\\text{NH}_2\\) of the next, with loss of water. A chain of \\(n\\) amino acids has \\(n-1\\) peptide bonds.\n" +
        "- A polypeptide with more than a hundred amino acids and a molecular mass above 10 000 u is a **protein**.\n" +
        "- **Fibrous** proteins have parallel chains and are insoluble in water: keratin (hair, wool, silk), myosin (muscles). **Globular** proteins coil into a sphere and are soluble in water: insulin, albumins.\n" +
        "- **Denaturation:** heat or a change in pH disturbs the hydrogen bonds. Globules unfold, helices uncoil and the protein loses its biological activity. The secondary and tertiary structures are destroyed; the **primary structure stays**. Examples: egg white coagulating on boiling, and milk curdling as bacteria make lactic acid in it.",
      table: {
        columns: ["Level", "What it describes", "Key fact"],
        rows: [
          { cells: ["Primary", "The sequence of amino acids in each chain", "Held by peptide bonds; a change in the sequence gives a different protein; it survives denaturation"] },
          { cells: ["Secondary: α-helix", "The chain twisted into a right-handed screw", "Intramolecular hydrogen bonds: the N-H of each residue to the C=O of the next turn"] },
          { cells: ["Secondary: β-pleated sheet", "Chains stretched out almost fully and laid side by side", "Intermolecular hydrogen bonds between the neighbouring chains"], pyqExampleId: "5336d74a-cfdc-43ab-89bc-ddeda06ec42d", noteAmber: "Re-NEET 2026: the β-pleated sheet is held by intermolecular hydrogen bonds; the α-helix is right-handed, and two or more subunits make a quaternary structure, not a tertiary one." },
          { cells: ["Tertiary", "Further folding of the chain, which gives the fibrous or globular shape", "Hydrogen bonds, disulphide links, van der Waals and electrostatic forces"] },
          { cells: ["Quaternary", "The arrangement of two or more polypeptide chains (subunits) with respect to each other", "Only proteins made of two or more chains have it"] },
        ],
        caption: "Only the primary structure is held by peptide bonds, and only it survives denaturation.",
      },
      pyqExampleId: "5336d74a-cfdc-43ab-89bc-ddeda06ec42d",
      selfCheckExample: {
        prompt: "A tetrapeptide is made from four amino acids. How many peptide bonds does it have, and how many molecules of water are lost in making it?",
        steps: [
          "A chain of \\(n\\) amino acids has \\(n-1\\) peptide bonds: \\(4-1 = 3\\).",
          "Each peptide bond forms with the loss of one water molecule, so 3 molecules of water are lost.",
        ],
        answer: "3 peptide bonds; 3 molecules of water",
      },
      practiceSet: [
        { prompt: "Which naturally occurring α-amino acid is not optically active?", answer: "Glycine" },
        { prompt: "Why do amino acids have high melting points and dissolve in water?", answer: "They exist as zwitterions (dipolar ions), so they behave like salts" },
        { prompt: "Egg white is boiled. Which level of structure of its protein survives?", answer: "The primary structure" },
        { prompt: "Name one fibrous protein and one globular protein.", answer: "Keratin (or myosin) is fibrous; insulin (or albumin) is globular" },
      ],
      traps: [
        {
          title: "Tertiary is one chain, quaternary is several",
          body: "The tertiary structure is the folding of a single chain. Only when a protein has two or more chains (subunits) does it have a quaternary structure.",
        },
        {
          title: "The α-helix is right-handed",
          body: "In the α-helix the chain twists into a right-handed screw, held by hydrogen bonds within the same chain. A left-handed helix is wrong.",
        },
        {
          title: "Sodium nitroprusside gives violet, not blood red",
          body: "Sulphur in a sodium fusion extract gives a violet colour with sodium nitroprusside. The blood red colour comes from sodium thiocyanate with \\(\\text{Fe}^{3+}\\), when nitrogen and sulphur are both present. Methionine has both, and so does cysteine.",
        },
        {
          title: "Denaturation keeps the peptide bonds",
          body: "Heat or a change in pH destroys the secondary and tertiary structures but breaks no peptide bond, so the sequence of amino acids stays.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchbm-enzymes",
      name: "Enzymes",
      intuition:
        "Enzymes are the catalysts of living cells. Like any catalyst they lower the activation energy of a reaction, but each one is very choosy: it works on one substrate and one reaction. Almost all of them are globular proteins.",
      definition:
        "- Enzymes are **biocatalysts**: they catalyse the reactions of living systems.\n" +
        "- Almost all enzymes are **globular proteins**.\n" +
        "- They are very **specific**, for a particular reaction and a particular substrate.\n" +
        "- They are usually named after the compound they act on: the enzyme that hydrolyses maltose into glucose is **maltase**.\n" +
        "- Some are named after the reaction: enzymes that catalyse the oxidation of one substrate with the reduction of another are **oxidoreductases**.\n" +
        "- Like chemical catalysts, enzymes lower the activation energy of the reaction they catalyse.",
      table: {
        columns: ["Property", "Fact"],
        rows: [
          { cells: ["Chemical nature", "Almost all are globular proteins"], pyqExampleId: "e34ff5b0-dc1f-4097-afad-34a440c8dc66", noteAmber: "NEET 2022: the incorrect statement was that enzymes are polysaccharides." },
          { cells: ["Role", "Biocatalysts for the reactions of living systems"] },
          { cells: ["Specificity", "One particular reaction and one particular substrate"] },
          { cells: ["Named after the substrate", "Maltase hydrolyses maltose into glucose"] },
          { cells: ["Named after the reaction", "Oxidoreductases oxidise one substrate while reducing another"] },
          { cells: ["Activation energy", "Lowered, as by any catalyst"] },
        ],
      },
      pyqExampleId: "e34ff5b0-dc1f-4097-afad-34a440c8dc66",
      selfCheckExample: {
        prompt: "Following the usual naming rule, what would you call the enzyme that hydrolyses sucrose, and would you expect it to hydrolyse maltose as well?",
        steps: [
          "Enzymes are usually named after their substrate, so the enzyme for sucrose is sucrase.",
          "Enzymes are specific to one substrate, so sucrase does not act on maltose; maltose has its own enzyme, maltase.",
        ],
        answer: "Sucrase; no, it is specific to sucrose",
      },
      practiceSet: [
        { prompt: "What reaction does maltase catalyse?", answer: "The hydrolysis of maltose into glucose" },
        { prompt: "What kind of reaction do oxidoreductases catalyse?", answer: "The oxidation of one substrate with the reduction of another" },
        { prompt: "Are most enzymes fibrous proteins or globular proteins?", answer: "Globular proteins" },
      ],
      traps: [
        {
          title: "Enzymes are proteins, not carbohydrates",
          body: "Almost all enzymes are globular proteins. A statement calling them polysaccharides is false.",
        },
        {
          title: "Maltase hydrolyses; oxidoreductases oxidise",
          body: "Maltase is named after its substrate and hydrolyses maltose to glucose. Oxidoreductases are named after their reaction: oxidation of one substrate with reduction of another.",
        },
      ],
    },
  ],
};
