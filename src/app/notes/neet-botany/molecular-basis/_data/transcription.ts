import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MB_TRANSCRIPTION_NOTE: SubtopicNote = {
  subtopicName: "Transcription",
  title: "Transcription",
  oneLineDefinition:
    "How one strand of DNA is copied into RNA: the transcription unit with its template and coding strands, promoter and terminator, exons and introns; transcription in bacteria with the sigma and rho factors; and the three RNA polymerases of eukaryotes with splicing, capping and tailing.",
  whyItMatters:
    "Fourteen NEET questions, the most of any page in this chapter, from seven of the eight papers (all but NEET 2022). Five asked which RNA polymerase makes which RNA, four involved the rho factor, and four asked about the transcription unit or wanted an RNA or coding strand written from a given DNA. Six are pick-the-correct-statements or match-the-columns, each built on exact NCERT lines.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomb-transcription-unit",
      name: "The transcription unit: template and coding strands, promoter and terminator",
      visualizationSlug: "imat-transcription",
      intuition:
        "Only one strand of a gene is read. RNA is built 5' to 3', so the strand that is read runs 3' to 5'; that is the template strand. The other strand is never read, but its sequence is the same as the RNA except that it has T where RNA has U, so it is called the coding strand. The promoter at the start and the terminator at the end mark where reading begins and stops.",
      definition:
        "What NCERT says:\n" +
        "- **Transcription** copies genetic information from **one strand** of DNA into RNA. Adenine pairs with **uracil** instead of thymine. Only a **segment** of DNA and only **one strand** is copied.\n" +
        "- Why not both strands: (i) they would code for two different RNAs, and so two different proteins from one segment; (ii) two complementary RNAs made together would pair into double-stranded RNA and could not be translated.\n" +
        "- A **transcription unit** has three regions: a **promoter**, the **structural gene** and a **terminator**.\n" +
        "- The strand with polarity **3' to 5'** is the **template strand**. The strand with polarity **5' to 3'**, with the same sequence as the RNA (T in place of U), is the **coding strand**; it codes for nothing and is displaced during transcription. All references to a transcription unit are made with the coding strand.\n" +
        "- The **promoter** lies towards the **5' end (upstream)** of the structural gene. It provides the **binding site for RNA polymerase**, and its presence **defines the template and coding strands**. The **terminator** lies towards the **3' end (downstream)** of the coding strand and usually defines the **end of transcription**.\n" +
        "- A **cistron** is a segment of DNA coding for a polypeptide. The structural gene is **monocistronic** (mostly eukaryotes) or **polycistronic** (mostly bacteria).\n" +
        "- Eukaryotic genes are **split genes**: **exons** (coding, expressed sequences that appear in the mature RNA) are interrupted by **introns** (intervening sequences that do not).",
      table: {
        columns: ["Part", "What it is"],
        rows: [
          { cells: ["Template strand", "The strand of polarity 3' to 5' that is copied into RNA"] },
          {
            cells: ["Coding strand", "The strand of polarity 5' to 3'; same sequence as the RNA, with T in place of U; not copied"],
            noteAmber: "NEET 2023: for the mRNA 5' AUCGAUCG... 3', the coding strand is 5' ATCGATCG... 3'.",
            pyqExampleId: "dbb72946-f8b3-47d8-884c-7812d8357598",
          },
          {
            cells: ["Promoter", "Upstream (5') of the structural gene; binding site for RNA polymerase; defines the template and coding strands"],
            noteAmber: "NEET 2024: the three regions of a transcription unit are the promoter, the structural gene and the terminator.",
            pyqExampleId: "dec72907-8780-4c86-b0e4-3711166903d9",
          },
          { cells: ["Terminator", "Downstream (3' end of the coding strand); marks the end of transcription"] },
          { cells: ["Monocistronic gene", "Codes for one polypeptide; mostly in eukaryotes"] },
          { cells: ["Polycistronic gene", "Codes for several polypeptides; mostly in bacteria"] },
          { cells: ["Exon", "Coding sequence that appears in the mature, processed RNA"] },
          { cells: ["Intron", "Intervening sequence that does not appear in the mature RNA"] },
        ],
      },
      pyqExampleId: "988bab57-b852-4ca8-9fb8-7b93fed2362e",
      selfCheckExample: {
        prompt: "The coding strand of a short stretch of DNA reads 5' ATGCGT 3'. Write the template strand and the RNA transcribed from it.",
        steps: [
          "The template is complementary and antiparallel to the coding strand: 3' TACGCA 5'.",
          "The RNA is complementary to the template, so it matches the coding strand with U in place of T.",
          "RNA: 5' AUGCGU 3'.",
        ],
        answer: "Template 3' TACGCA 5'; RNA 5' AUGCGU 3'.",
      },
      practiceSet: [
        { prompt: "Give the two reasons NCERT offers for why both strands of DNA are not copied during transcription.", answer: "They would code for two different RNAs (and proteins) from one segment; and two complementary RNAs would pair into double-stranded RNA that cannot be translated" },
        { prompt: "Is the structural gene in bacteria mostly monocistronic or polycistronic?", answer: "Polycistronic" },
        { prompt: "What is a cistron?", answer: "A segment of DNA coding for a polypeptide" },
        { prompt: "A template strand reads 3' TACG 5'. What RNA is transcribed from it?", answer: "5' AUGC 3'" },
        { prompt: "What are the intervening sequences of a split gene, which do not appear in the mature RNA, called?", answer: "Introns" },
      ],
      traps: [
        {
          title: "The coding strand is not copied",
          body: "RNA is copied from the **template strand** (3' to 5'). The **coding strand** is not copied; it only **matches** the RNA, with T in place of U. A statement saying the coding strand is copied into mRNA is false.",
        },
        {
          title: "RNA has U, DNA has T",
          body: "When you write an RNA from a template, every A on the template gives **U**, not T. An answer with T in it is a DNA strand, not an RNA.",
        },
        {
          title: "Split genes are eukaryotic",
          body: "**Split genes** (exons and introns) are typical of **eukaryotes**. Bacterial genes are mostly **polycistronic** and not split.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-prokaryotic-transcription",
      name: "Transcription in bacteria: one RNA polymerase with sigma and rho",
      intuition:
        "A bacterium has just one RNA polymerase, and by itself it can only lengthen an RNA. To start, it briefly holds a sigma factor; to stop, it briefly holds a rho factor. Because a bacterium has no nucleus, a ribosome can start reading the mRNA while it is still being made.",
      definition:
        "What NCERT says:\n" +
        "- Bacteria have three major RNAs: **mRNA**, **tRNA** and **rRNA**. A **single DNA-dependent RNA polymerase** transcribes all of them.\n" +
        "- **Initiation**: RNA polymerase binds the **promoter**. **Elongation**: it uses **nucleoside triphosphates** as substrate, polymerises by the complementarity rule and opens the helix as it goes; only a short stretch of RNA stays bound. **Termination**: at the terminator, the new RNA falls off, and so does the polymerase.\n" +
        "- RNA polymerase by itself catalyses **only elongation**. It associates **transiently** with the **initiation factor sigma (σ)** to start and the **termination factor rho (ρ)** to stop. These factors change its specificity.\n" +
        "- Bacterial mRNA needs **no processing**, and transcription and translation happen in the **same compartment**. So translation can begin before the mRNA is fully made: transcription and translation are **coupled** in bacteria.",
      table: {
        columns: ["Step", "What happens", "Helper"],
        rows: [
          { cells: ["Initiation", "RNA polymerase binds the promoter and starts transcription", "Sigma (σ) factor"] },
          {
            cells: ["Elongation", "Nucleotides are added following the template; the helix opens ahead", "RNA polymerase alone"],
            noteAmber: "NEET 2021: the one enzyme that catalyses initiation, elongation and termination in prokaryotes is DNA-dependent RNA polymerase.",
            pyqExampleId: "cd4af40d-8826-464a-be27-31734a89f18f",
          },
          {
            cells: ["Termination", "At the terminator the new RNA and the polymerase fall off", "Rho (ρ) factor"],
            noteAmber: "NEET 2025: the factor important for termination of transcription is rho.",
            pyqExampleId: "d26b1195-fec8-4539-8e42-ab96a8a4fadb",
          },
          { cells: ["Processing", "None: bacterial mRNA is active as made", "Not needed"] },
          { cells: ["Translation", "Can begin before transcription ends (coupled)", "Same compartment, no nucleus"] },
        ],
      },
      pyqExampleId: "347747f4-10e3-412d-bbc1-b5cfc9516287",
      selfCheckExample: {
        prompt: "In bacteria, a ribosome can begin translating an mRNA before its transcription is over. Give the two reasons NCERT offers.",
        steps: [
          "Bacterial mRNA needs no processing to become active.",
          "Bacteria have no nucleus, so transcription and translation take place in the same compartment.",
        ],
        answer: "No processing is needed, and both processes happen in the same compartment, so they are coupled.",
      },
      practiceSet: [
        { prompt: "What does the transient binding of the sigma and rho factors change in bacterial RNA polymerase?", answer: "Its specificity, so that it either initiates or terminates transcription" },
        { prompt: "What does RNA polymerase use as its substrate during transcription?", answer: "Nucleoside triphosphates" },
        { prompt: "How many RNA polymerases transcribe all types of RNA in bacteria?", answer: "One, a single DNA-dependent RNA polymerase" },
        { prompt: "What happens to the new RNA and the RNA polymerase when the polymerase reaches the terminator?", answer: "The new RNA falls off, and so does the RNA polymerase" },
        { prompt: "Name the three major types of RNA in bacteria.", answer: "mRNA, tRNA and rRNA" },
      ],
      traps: [
        {
          title: "Sigma starts, rho stops",
          body: "The **sigma (σ)** factor helps RNA polymerase **initiate**; the **rho (ρ)** factor helps it **terminate**. A statement linking rho with initiation is false.",
        },
        {
          title: "RNA polymerase alone only elongates",
          body: "By itself, bacterial RNA polymerase catalyses **only elongation**. It still counts as the one enzyme for all three steps, because it does them with σ and ρ bound to it **transiently**.",
        },
        {
          title: "DNA-dependent RNA polymerase, not DNA polymerase",
          body: "Transcription is done by **DNA-dependent RNA polymerase**. DNA-dependent **DNA** polymerase is the replication enzyme, and **DNA ligase** joins replication fragments.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-eukaryotic-transcription",
      name: "Transcription in eukaryotes: three RNA polymerases and processing",
      intuition:
        "Eukaryotes split the work among three RNA polymerases in the nucleus. The one that makes mRNA does not make it ready to use: its first product, hnRNA, still carries introns. The cell cuts out the introns, puts a cap on the 5' end and a tail of A's on the 3' end before sending the mRNA out of the nucleus.",
      definition:
        "What NCERT says:\n" +
        "- The nucleus has **at least three RNA polymerases**, in addition to the RNA polymerase in the organelles, with a clear division of labour.\n" +
        "- **RNA polymerase I**: rRNAs **28S, 18S and 5.8S**. **RNA polymerase II**: the **precursor of mRNA**, the **heterogeneous nuclear RNA (hnRNA)**. **RNA polymerase III**: **tRNA, 5S rRNA and snRNAs** (small nuclear RNAs).\n" +
        "- The primary transcript has both exons and introns and is **non-functional**. In **splicing**, introns are removed and exons are joined in a defined order.\n" +
        "- **Capping**: an unusual nucleotide, **methyl guanosine triphosphate**, is added to the **5' end** of hnRNA. **Tailing**: **200 to 300 adenylate residues** are added at the **3' end** in a **template-independent** manner.\n" +
        "- The fully processed hnRNA, now **mRNA**, is transported **out of the nucleus** for translation.\n" +
        "- Split genes are an ancient feature: introns reflect their antiquity, and splicing reflects the **dominance of the RNA world**.",
      table: {
        columns: ["Enzyme", "What it transcribes"],
        rows: [
          {
            cells: ["RNA polymerase I", "rRNAs: 28S, 18S and 5.8S"],
            noteAmber: "NEET 2023: RNA polymerase I transcribes the 28S, 18S and 5.8S rRNAs.",
            pyqExampleId: "6feec616-c8aa-4b28-875b-502cc7734c3f",
          },
          {
            cells: ["RNA polymerase II", "Precursor of mRNA (hnRNA)"],
            noteAmber: "Re-NEET 2026: the enzyme that synthesises precursor mRNA is RNA polymerase II.",
            pyqExampleId: "34b28324-bdee-4aef-b9e4-c672212cb0ff",
          },
          { cells: ["RNA polymerase III", "tRNA, 5S rRNA and snRNAs"] },
          {
            cells: ["RNA polymerase of organelles", "Separate from, and in addition to, the three nuclear enzymes"],
            noteAmber: "Re-NEET 2024: there are three RNA polymerases in the nucleus besides the one in organelles, each with a different role.",
            pyqExampleId: "17810de6-fcfa-4526-8dfc-71335c6a6d8e",
          },
        ],
      },
      pyqExampleId: "8881732b-58d1-4d0c-8b9a-0ff8120ba04b",
      selfCheckExample: {
        prompt: "An hnRNA has two exons separated by one intron. List the processing steps that turn it into a working mRNA, and say what each adds or removes and where.",
        steps: [
          "Splicing removes the intron and joins the two exons in order.",
          "Capping adds methyl guanosine triphosphate to the 5' end.",
          "Tailing adds 200 to 300 adenylate residues to the 3' end, without a template.",
          "The finished mRNA then leaves the nucleus for translation.",
        ],
        answer: "Splicing (intron out, exons joined), capping at the 5' end, tailing at the 3' end; then export to the cytoplasm.",
      },
      practiceSet: [
        { prompt: "What unusual nucleotide is added to the 5' end of hnRNA during capping?", answer: "Methyl guanosine triphosphate" },
        { prompt: "How many adenylate residues are added during tailing, at which end, and is a template used?", answer: "200 to 300, at the 3' end, without a template" },
        { prompt: "Which eukaryotic RNA polymerase transcribes the 5.8S rRNA?", answer: "RNA polymerase I" },
        { prompt: "What is the primary transcript that becomes mRNA in eukaryotes called?", answer: "Heterogeneous nuclear RNA (hnRNA)" },
        { prompt: "According to NCERT, what does the process of splicing reflect?", answer: "The dominance of the RNA world" },
      ],
      traps: [
        {
          title: "5S rRNA is made by polymerase III",
          body: "RNA polymerase **I** makes the **28S, 18S and 5.8S** rRNAs. The **5S** rRNA is made by RNA polymerase **III**, along with tRNA and snRNAs.",
        },
        {
          title: "Cap at 5', tail at 3'",
          body: "**Capping** adds methyl guanosine triphosphate at the **5' end**; **tailing** adds adenylate residues at the **3' end**. Swapping the ends is a common wrong option.",
        },
        {
          title: "Splice first, export later",
          body: "Splicing, capping and tailing happen **in the nucleus**. Only the fully processed mRNA is sent to the cytoplasm, so transport of pre-mRNA before splicing is not a post-transcriptional step.",
        },
      ],
    },
  ],
};
