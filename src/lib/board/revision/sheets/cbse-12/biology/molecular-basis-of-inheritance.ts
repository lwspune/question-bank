import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 5 Molecular Basis of Inheritance. Structures,
 * experiments and processes checked against the NCERT text (the book's own
 * wording, trimmed); most-asked years and marks from the CBSE board
 * past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Molecular Basis of Inheritance",
  chapterSlug: "molecular-basis-of-inheritance",
  source: "NCERT Biology (CBSE Class 12), Chapter 5",
  keyPoints: [
    {
      term: "Polynucleotide chain",
      text: "A nitrogenous base joins the OH of 1' C of a pentose by an **N-glycosidic linkage** (nucleoside); a phosphate joins the OH of 5' C by a **phosphoester linkage** (nucleotide). Nucleotides join by **3'-5' phosphodiester linkages**. The backbone is sugar and phosphate. RNA has an extra **2'-OH** on ribose and uracil in place of thymine.",
    },
    {
      term: "Double helix (Watson and Crick, 1953)",
      text: "Based on X-ray data of **Wilkins and Franklin** and **Chargaff's** rule (A/T and G/C ratios equal one). Two chains with **anti-parallel** polarity; A pairs with T by **two** H-bonds, G with C by **three**, so a purine faces a pyrimidine. **Right-handed** coil, pitch **3.4 nm**, about **10 bp per turn**, 0.34 nm between base pairs.",
    },
    {
      term: "Packaging of DNA",
      text: "Prokaryotes: DNA held by positive proteins in the **nucleoid**. Eukaryotes: positively charged **histones** (rich in lysine and arginine) form a **histone octamer**; negatively charged DNA wraps round it to form a **nucleosome** (about **200 bp**). Chromatin looks like **beads-on-string** under the EM. Higher packing needs **NHC proteins**. Euchromatin (light, active); heterochromatin (dark, inactive).",
    },
    {
      term: "Properties of genetic material: DNA versus RNA",
      text: "Must replicate, be chemically and structurally **stable**, allow slow changes (mutation) and express as Mendelian characters. The reactive **2'-OH** makes RNA labile; RNA is also catalytic; thymine adds stability. So **DNA is better for storage**, **RNA for transmission** (it codes proteins directly). RNA mutates faster, so RNA viruses evolve faster.",
    },
    {
      term: "Central dogma and RNA world",
      text: "**Crick**: genetic information flows DNA to RNA to protein; in some viruses it flows from RNA to DNA. **RNA was the first genetic material**: metabolism, translation and splicing evolved around RNA, which acted as genetic material and catalyst. Being reactive, it was unstable, so DNA evolved from RNA.",
    },
    {
      term: "Replication machinery",
      text: "Main enzyme: **DNA-dependent DNA polymerase**, polymerising only **5' to 3'**. **Deoxyribonucleoside triphosphates** are both substrates and the energy source. Replication occurs in a small opening, the **replication fork**, since separating the whole length needs too much energy. Starts at an **origin of replication**; in eukaryotes in the **S-phase**.",
    },
    {
      term: "Transcription unit",
      text: "**Promoter**, **structural gene**, **terminator**. The strand with **3' to 5'** polarity is the **template strand**; the other (5' to 3'), with the same sequence as RNA (T for U), is the **coding strand**. The promoter, the binding site for RNA polymerase, is at the 5' end (**upstream**) of the coding strand; the terminator at its 3' end (downstream).",
    },
    {
      term: "Why only one strand is transcribed",
      text: "If both strands were templates, they would code RNAs of different sequence, so one DNA segment would code two different proteins. And the two RNAs, being complementary, would form a **double-stranded RNA**, which could not be translated.",
    },
    {
      term: "Gene, cistron, exons and introns",
      text: "A **cistron** is a segment of DNA coding for a polypeptide: structural genes are **monocistronic** (mostly eukaryotes) or **polycistronic** (mostly bacteria). Eukaryotic genes are **split**: **exons** appear in mature RNA; **introns** (intervening sequences) do not. Splicing represents the dominance of the RNA world.",
    },
    {
      term: "RNA polymerases",
      text: "Bacteria: **one** RNA polymerase for all RNAs; it associates with **sigma** (initiation) and **rho** (termination) factors. Eukaryotes: **RNA polymerase I**: rRNAs (28S, 18S, 5.8S). **II**: hnRNA, the precursor of mRNA. **III**: tRNA, 5S rRNA and snRNAs.",
    },
    {
      term: "Genetic code",
      text: "Triplet code (Gamow); Khorana made RNAs of defined sequence; Nirenberg's cell-free system deciphered it. **61** codons code amino acids, **3 are stop** (UAA, UAG, UGA). **Degenerate**; read contiguously, **no punctuations**; **nearly universal** (exceptions: mitochondria, some protozoans). **AUG** codes methionine and is the **initiator codon**.",
    },
    {
      term: "Mutations and the code",
      text: "**Point mutation**: one base pair changes (beta globin, glutamate to valine: sickle cell anaemia). Inserting or deleting **one or two** bases changes the **reading frame** from that point: **frameshift** mutation. Inserting or deleting **three** bases adds or removes whole codons; the reading frame is unaltered.",
    },
    {
      term: "tRNA and the translational unit",
      text: "**tRNA** (adapter molecule, Crick) has an **anticodon loop** and an **amino acid acceptor end**; clover-leaf in secondary structure, **inverted L** in reality; no tRNA for stop codons. A translational unit runs from start codon (AUG) to stop codon; **UTRs** at the 5' end (before AUG) and 3' end (after stop). **23S rRNA** is the bacterial **ribozyme** for the peptide bond.",
    },
    {
      term: "Human Genome Project",
      text: "1990 to 2003. Goals: identify the **20,000-25,000 genes**, sequence the **3 billion bp**, store data, address **ELSI**. Methods: **ESTs** and **sequence annotation**; **BAC and YAC** vectors. Features: 3164.7 million bp; average gene 3000 bases, dystrophin 2.4 million; **less than 2 per cent** codes proteins; chromosome 1 most genes (2968), Y fewest (231); 1.4 million **SNPs**.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Griffith's experiment (1928) and the transforming principle",
      steps: [
        "**Streptococcus pneumoniae**: S strain (smooth, mucous polysaccharide coat, virulent) and R strain (rough, no coat).",
        "Live S into mice: mice die. Live R: mice live. Heat-killed S: mice live.",
        "Heat-killed S + live R: **mice die**, and living S bacteria are recovered from them.",
        "Conclusion: a **transforming principle** from heat-killed S transformed R into S; it must be the genetic material.",
        "Avery, MacLeod and McCarty: only **DNA** transformed R cells; proteases and RNases did not stop it, **DNase** did.",
      ],
    },
    {
      title: "Hershey and Chase experiment (1952): DNA is the genetic material",
      steps: [
        "Phages grown with **radioactive phosphorus** (\\(^{32}\\mathrm{P}\\)) get radioactive DNA; with **radioactive sulphur** (\\(^{35}\\mathrm{S}\\)), radioactive protein, since only protein has sulphur.",
        "The phages infect **E. coli**.",
        "**Blending** removes the viral coats from the bacteria; **centrifugation** separates virus particles from bacteria.",
        "Bacteria infected with \\(^{32}\\mathrm{P}\\) phages are radioactive; with \\(^{35}\\mathrm{S}\\) phages they are not. So **DNA**, not protein, enters the bacteria.",
      ],
    },
    {
      title: "Meselson and Stahl's experiment (1958): replication is semiconservative",
      steps: [
        "E. coli grown for many generations in \\(^{15}\\mathrm{NH_4Cl}\\): DNA becomes **heavy** (\\(^{15}\\mathrm{N}\\) is not radioactive).",
        "Cells moved to \\(^{14}\\mathrm{NH_4Cl}\\); DNA sampled as they divide (every 20 minutes) and separated in a **CsCl density gradient**.",
        "After one generation (20 min): all **hybrid** DNA.",
        "After two generations (40 min): equal **hybrid and light** DNA. Taylor and colleagues showed the same in **Vicia faba** with radioactive thymidine.",
      ],
    },
    {
      title: "Transcription in bacteria, and how it differs in eukaryotes",
      steps: [
        "**Initiation**: RNA polymerase with the **sigma factor** binds the promoter.",
        "**Elongation**: it uses nucleoside triphosphates, follows complementarity, opens the helix; only a short stretch of RNA stays bound.",
        "**Termination**: at the terminator, with the **rho factor**, the RNA and the polymerase fall off.",
        "Bacterial mRNA needs no processing, so transcription and translation are **coupled** in the same compartment.",
        "Eukaryotes: three RNA polymerases in the nucleus, and a primary transcript (**hnRNA**) that must be processed before leaving the nucleus.",
      ],
    },
    {
      title: "Processing of hnRNA into functional mRNA",
      steps: [
        "RNA polymerase II makes **hnRNA**, which has both exons and introns and is non-functional.",
        "**Splicing**: introns are removed and exons joined in a defined order.",
        "**Capping**: methyl guanosine triphosphate is added at the **5' end**.",
        "**Tailing**: 200-300 adenylate residues are added at the **3' end**, template independently. The mRNA then leaves the nucleus.",
      ],
    },
    {
      title: "Translation: charging of tRNA, initiation, elongation, termination",
      steps: [
        "**Charging (aminoacylation)**: amino acids are activated with **ATP** and linked to their cognate tRNA.",
        "**Initiation**: the small ribosomal subunit meets the mRNA; the ribosome binds the **start codon AUG**, read only by the initiator tRNA.",
        "**Elongation**: charged tRNAs bind codons by anticodon pairing; the ribosome (23S rRNA ribozyme) forms peptide bonds and moves codon to codon.",
        "**Termination**: a **release factor** binds the stop codon and the polypeptide is released.",
      ],
    },
    {
      title: "Working of the lac operon, with and without lactose",
      steps: [
        "Parts: regulator **i gene** (repressor), promoter, operator, structural genes **z** (beta-galactosidase), **y** (permease), **a** (transacetylase).",
        "**No lactose**: the repressor, made constitutively, binds the **operator** and stops RNA polymerase transcribing.",
        "**Lactose (inducer) present**: it enters by permease and **inactivates the repressor**.",
        "RNA polymerase reaches the promoter; z, y, a are transcribed as one polycistronic mRNA; lactose is broken into glucose and galactose.",
        "Control by the repressor is **negative regulation**; Jacob and Monod first described this transcriptionally regulated system.",
      ],
    },
    {
      title: "Steps of DNA fingerprinting (Alec Jeffreys)",
      steps: [
        "Uses **VNTRs** (a mini-satellite), whose copy number varies, so the VNTR size varies from 0.1 to 20 kb between individuals.",
        "1. **Isolation** of DNA. 2. **Digestion** by restriction endonucleases.",
        "3. **Electrophoresis** separates the fragments. 4. **Blotting** onto nitrocellulose or nylon membranes.",
        "5. **Hybridisation** with a labelled VNTR probe. 6. **Autoradiography** detects the bands.",
        "The band pattern is unique to a person (except identical twins): used in **forensics** and **paternity** disputes.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Nucleosome (Figure 5.4a)",
      labels: ["histone octamer", "DNA wrapped round it", "H1 histone", "linker DNA", "core of histone molecules"],
    },
    {
      title: "Double stranded polynucleotide chain (Figure 5.2)",
      labels: ["5' and 3' ends of each strand", "sugar-phosphate backbone", "phosphodiester bond", "A and T (two H-bonds)", "G and C (three H-bonds)"],
    },
    {
      title: "Replicating fork (Figure 5.8)",
      labels: ["template strands with polarity", "leading strand: continuous", "lagging strand: discontinuous", "DNA polymerase", "DNA ligase joining fragments"],
    },
    {
      title: "Schematic structure of a transcription unit (Figure 5.9)",
      labels: ["promoter (upstream)", "structural gene", "terminator (downstream)", "template strand 3' to 5'", "coding strand 5' to 3'"],
    },
    {
      title: "Process of transcription in eukaryotes (Figure 5.11)",
      labels: ["exons and introns", "hnRNA", "splicing", "cap at 5' end", "poly A tail at 3' end", "mRNA to cytoplasm"],
    },
    {
      title: "The lac operon (Figure 5.14)",
      labels: ["i gene and repressor", "promoter (p) and operator (o)", "structural genes z, y, a", "RNA polymerase", "inducer bound to repressor", "polycistronic mRNA"],
    },
  ],
  mostAsked: [
    {
      topic: "Transcription: transcription unit, template and coding strands, RNA from a given sequence, RNA polymerases, processing of hnRNA",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "DNA structure and packaging: polynucleotide bonds, double helix features, base-pair numericals, nucleosome, euchromatin and heterochromatin",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Genetic code, tRNA and translation: features of the code, charging of tRNA, reading an mRNA, effect of mutations, central dogma",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Human Genome Project: goals, methodologies, salient features, sequenced organisms",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Lac operon: parts, working with and without inducer, why it is negative and transcriptional regulation",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Replication: Meselson and Stahl's experiment, replicating fork, enzymes, continuous and discontinuous synthesis",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Search for genetic material: Griffith, Hershey and Chase, why DNA is more stable than RNA",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "DNA fingerprinting: satellite DNA, VNTRs, steps, reading DNA profiles",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Base-pair numericals: counting pairs as bases",
      body: "A = T and G = C, so purines = pyrimidines = half the bases. 160 bp is **320 bases**: with 30 per cent G, A is 20 per cent, so **64**. With 20 per cent T, G is 30 per cent. 20 nucleosomes hold about \\(20 \\times 200 = 4000\\) bp.",
    },
    {
      title: "Writing the mRNA from the template strand wrongly",
      body: "The mRNA has the **same sequence as the coding strand**, with U for T, and its polarity (5' to 3'). It is complementary to the template (3' to 5'). The promoter is towards the 5' end of the coding strand.",
    },
    {
      title: "Wrong band ratios in Meselson and Stahl",
      body: "One generation every 20 minutes. Generation I: all hybrid. II: 1 hybrid : 1 light. III: **1 hybrid : 3 light**. IV: 1 hybrid : 7 light. Go by the generation the question names (a 2025 paper said '80 minutes (till III generation)' and wanted 0 : 1 : 3). \\(^{15}\\mathrm{N}\\) is heavy, **not radioactive**; bands separate by density in CsCl.",
    },
    {
      title: "Mixing up leading and lagging strands",
      body: "DNA polymerase adds only in the **5' to 3'** direction and cannot start on its own. On the template with polarity **3' to 5'** synthesis is **continuous**; on the 5' to 3' template it is **discontinuous**, and **DNA ligase** joins the fragments.",
    },
    {
      title: "Wrong facts about the lac operon",
      body: "**i** stands for **inhibitor**, not inducer. The repressor is made all the time. **Lactose or allolactose** is the inducer; glucose and galactose cannot induce. A low level of permease must always be present, or lactose cannot enter the cell.",
    },
    {
      title: "Stop codons and frameshifts",
      body: "A codon mutated to a stop codon ends the chain there: UAU to UAA at codon 25 gives **24 amino acids**. One or two bases inserted or deleted shift the reading frame; three do not.",
    },
  ],
};

export default sheet;
