import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MB_REPLICATION_NOTE: SubtopicNote = {
  subtopicName: "Genetic Material and Replication",
  title: "Genetic Material and Replication",
  oneLineDefinition:
    "The experiments of Griffith, Avery, MacLeod and McCarty, and Hershey and Chase that showed DNA is the genetic material, why DNA is a better store than RNA and the RNA world, the central dogma, and semiconservative replication with the Meselson and Stahl experiment and the replication enzymes.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2025. Hershey and Chase came up twice (NEET 2023 and NEET 2025), and NEET 2024 matched four scientists with their discoveries. NEET 2022 set the hardest question of the chapter: counting the E. coli cells free of heavy nitrogen after 60 minutes. Learn who did which experiment, on what, and what it proved. NEET 2023 also asked whether RNA mutates faster than DNA.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomb-transformation",
      name: "The search for the genetic material",
      intuition:
        "Griffith saw that something from dead bacteria could change living ones, but he did not know what it was. Avery and his team found that the something was DNA, yet not everyone believed them. Hershey and Chase settled it by labelling a virus's DNA and its protein differently and watching which one went into the bacterium. Only the DNA did.",
      definition:
        "What NCERT says:\n" +
        "- **Frederick Griffith (1928)** worked with *Streptococcus pneumoniae* in mice. The **S strain** forms smooth shiny colonies, has a polysaccharide coat and kills mice (pneumonia). The **R strain** forms rough colonies, has no coat and is harmless.\n" +
        "- Live S kills mice; live R does not; **heat-killed S** does not. But **heat-killed S plus live R** kills mice, and living S bacteria are recovered from them. The R strain had been **transformed** by a **transforming principle**. Its chemical nature was not found.\n" +
        "- **Oswald Avery, Colin MacLeod and Maclyn McCarty (1933 to 1944)** purified proteins, DNA, RNA and other substances from heat-killed S cells. **DNA alone** transformed R bacteria. **Proteases and RNases did not** stop transformation; **DNase did**. They concluded DNA is the hereditary material, though not all biologists were convinced.\n" +
        "- **Alfred Hershey and Martha Chase (1952)** gave the **unequivocal proof**. They grew bacteriophages on a medium with **radioactive phosphorus** (labels DNA, which contains phosphorus) or **radioactive sulfur** (labels protein, as DNA has no sulfur). Steps: **infection, blending, centrifugation**.\n" +
        "- Bacteria infected by phages with **radioactive DNA** became radioactive; those infected by phages with **radioactive protein** did not. So DNA, not protein, passes from virus to bacterium.",
      table: {
        columns: ["Scientists", "Year", "What they showed"],
        rows: [
          {
            cells: ["Frederick Griffith", "1928", "Transformation in Streptococcus pneumoniae: heat-killed S bacteria changed live R bacteria into S"],
            noteAmber: "NEET 2025: matched Hershey and Chase with confirming DNA as the genetic material, and Griffith with Streptococcus pneumoniae.",
            pyqExampleId: "98e6039c-8202-4c77-9a8a-01ff54f21ff7",
          },
          { cells: ["Avery, MacLeod and McCarty", "1933 to 1944", "The transforming principle is DNA: DNase stopped transformation"] },
          { cells: ["Hershey and Chase", "1952", "Unequivocal proof that DNA is the genetic material, using labelled bacteriophages"] },
          { cells: ["Watson and Crick", "1953", "The double helix, and the semiconservative scheme of replication"] },
          {
            cells: ["Meselson and Stahl", "1958", "Semiconservative replication of DNA in E. coli, using heavy nitrogen"],
            noteAmber: "NEET 2024: matched Griffith with transformation, Jacob and Monod with the lac operon, Khorana with the genetic code and Meselson and Stahl with semiconservative replication.",
            pyqExampleId: "ced83468-eec2-4e41-ac7d-38db0124d7d8",
          },
          { cells: ["Taylor and colleagues", "1958", "Chromosomes of Vicia faba also replicate semiconservatively, using radioactive thymidine"] },
        ],
      },
      pyqExampleId: "f529938a-efb0-4c4e-a63c-388ed342991e",
      selfCheckExample: {
        prompt: "In the Hershey and Chase experiment, bacteria infected by phages grown on radioactive phosphorus turned radioactive, while bacteria infected by phages grown on radioactive sulfur did not. What did each label mark, and what does the result show?",
        steps: [
          "Phosphorus is in DNA but not in protein, so radioactive phosphorus marked the phage DNA.",
          "Sulfur is in protein but not in DNA, so radioactive sulfur marked the phage protein.",
          "Only the DNA label entered the bacteria, so DNA is what passes from the virus into the bacterium.",
        ],
        answer: "Phosphorus marked DNA and sulfur marked protein; DNA, not protein, is the genetic material.",
      },
      practiceSet: [
        { prompt: "Which bacterium did Griffith use in his transformation experiments?", answer: "*Streptococcus pneumoniae*" },
        { prompt: "Which strain of Streptococcus pneumoniae has a polysaccharide coat and kills mice?", answer: "The S strain (smooth, shiny colonies)" },
        { prompt: "In the work of Avery, MacLeod and McCarty, which enzyme stopped transformation when added to the S-strain extract?", answer: "DNase" },
        { prompt: "Name the three steps of the Hershey and Chase experiment in order.", answer: "Infection, blending, centrifugation" },
        { prompt: "On which plant did Taylor and colleagues show that chromosomes replicate semiconservatively?", answer: "*Vicia faba* (faba beans)" },
      ],
      traps: [
        {
          title: "Griffith never named DNA",
          body: "Griffith showed **transformation**, but the biochemical nature of the transforming principle was **not** found by him. **Avery, MacLeod and McCarty** identified it as DNA.",
        },
        {
          title: "Unequivocal proof came from Hershey and Chase",
          body: "Avery's group concluded DNA was the hereditary material, but **unequivocal proof** came from **Hershey and Chase (1952)**. **Wilkins and Franklin** gave X-ray data on DNA structure, not proof that DNA is the genetic material.",
        },
        {
          title: "Phosphorus for DNA, sulfur for protein",
          body: "Radioactive **phosphorus** labels **DNA**; radioactive **sulfur** labels **protein**. Swapping them reverses the whole argument.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-rna-world",
      name: "DNA against RNA, the RNA world and the central dogma",
      intuition:
        "A genetic material must copy itself, stay stable, change slowly and show itself as traits. Both DNA and RNA can copy themselves, but RNA is more reactive, so it breaks and mutates easily. That makes DNA the better long-term store, and RNA the better messenger. RNA probably came first; DNA evolved from it as a steadier store.",
      definition:
        "What NCERT says:\n" +
        "- A genetic material must (i) be able to **make its replica**, (ii) be **chemically and structurally stable**, (iii) allow **slow changes (mutation)** needed for evolution, and (iv) be able to **express itself as Mendelian characters**.\n" +
        "- RNA has a **2'-OH** on every nucleotide, which makes it **labile** and easily degraded. RNA is also **catalytic**, hence reactive. DNA is less reactive and more stable; **thymine** in place of uracil adds to its stability.\n" +
        "- RNA, being unstable, **mutates faster**; viruses with an RNA genome and a short life span mutate and evolve faster. Some viruses, such as **Tobacco Mosaic Virus** and **QB bacteriophage**, have RNA as their genetic material.\n" +
        "- RNA can code directly for protein; DNA depends on RNA to make protein. So **DNA is better for storing** genetic information and **RNA for transmitting** it.\n" +
        "- **RNA world**: RNA was the **first genetic material**. Metabolism, translation and splicing evolved around RNA. RNA acted both as genetic material and as a **catalyst**, but being reactive it was unstable. **DNA evolved from RNA** with chemical changes that made it more stable; being double stranded with a complementary strand, it also resists change by evolving a process of **repair**.\n" +
        "- **Central dogma** (Francis Crick): genetic information flows **DNA to RNA to protein**. DNA copies itself by **replication**, makes RNA by **transcription**, and RNA makes protein by **translation**. In some viruses the flow is reversed, **from RNA to DNA**.",
      table: {
        columns: ["Point", "DNA", "RNA"],
        rows: [
          { cells: ["Sugar", "Deoxyribose, no 2'-OH", "Ribose with a 2'-OH, which makes it labile"] },
          { cells: ["Base not shared", "Thymine, which adds stability", "Uracil"] },
          { cells: ["Reactivity", "Less reactive, more stable", "Reactive and catalytic, so unstable"] },
          { cells: ["Rate of mutation", "Slower", "Faster; RNA viruses evolve faster"] },
          { cells: ["Making protein", "Depends on RNA", "Can code for protein directly"] },
          { cells: ["Best suited for", "Storing genetic information", "Transmitting genetic information"] },
          {
            cells: ["Step of the central dogma that makes it", "Replication (DNA from DNA)", "Transcription (RNA from DNA)"],
            noteAmber: "NEET 2021: the central dogma flow chart is replication, transcription, translation, protein. Transduction is not a step.",
            pyqExampleId: "7a0cbdb3-5360-44fd-885e-9651b56b27fe",
          },
        ],
      },
      pyqExampleId: "fac98fb1-8820-4a13-8b25-67e791e0598f",
      selfCheckExample: {
        prompt: "Give the two chemical differences NCERT names that make DNA more stable than RNA.",
        steps: [
          "RNA carries a hydroxyl group at the 2' position of every ribose; this makes RNA labile and easily degraded. DNA lacks it.",
          "DNA has thymine in place of uracil, which gives it extra stability.",
        ],
        answer: "No 2'-OH group in DNA, and thymine in place of uracil.",
      },
      practiceSet: [
        { prompt: "Name the four criteria a molecule must meet to act as genetic material.", answer: "Make its replica; be chemically and structurally stable; allow slow changes (mutation); express itself as Mendelian characters" },
        { prompt: "Who proposed the central dogma of molecular biology?", answer: "Francis Crick" },
        { prompt: "In some viruses, which way does genetic information flow, against the central dogma?", answer: "From RNA to DNA" },
        { prompt: "Which molecule is better for storing genetic information, and which for transmitting it?", answer: "DNA for storing; RNA for transmitting" },
        { prompt: "Name a virus whose genetic material is RNA.", answer: "Tobacco Mosaic Virus (or QB bacteriophage)" },
        { prompt: "Which process converts the information in mRNA into protein?", answer: "Translation" },
      ],
      traps: [
        {
          title: "The 2'-OH makes RNA unstable",
          body: "The extra **2'-OH** on ribose makes RNA **labile** and easily degraded. It is a reason RNA is a poorer store, not a reason it is stable.",
        },
        {
          title: "RNA came first",
          body: "In the RNA world, **RNA** was the first genetic material and **DNA evolved from RNA**. DNA is the later, more stable store, not the older one.",
        },
        {
          title: "Transduction is not in the central dogma",
          body: "The central dogma is **replication**, **transcription** and **translation**. Transduction is gene transfer between bacteria by a virus and is never one of its arrows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbomb-replication",
      name: "Semiconservative replication and the Meselson and Stahl experiment",
      intuition:
        "When DNA copies itself, the two strands separate and each builds a new partner. So every new DNA keeps one old strand. Meselson and Stahl made the old strands heavy with heavy nitrogen and then let the cells grow on light nitrogen. The two heavy strands of each starting DNA never break, so they end up in two hybrid molecules however many times the cell divides. Everything else becomes light.",
      definition:
        "What NCERT says:\n" +
        "- **Watson and Crick** proposed that the two strands separate and each acts as a template; each new double helix has **one parental and one new strand**. This is **semiconservative** replication.\n" +
        "- **Meselson and Stahl (1958)** grew *E. coli* for many generations on \\(^{15}\\text{NH}_4\\text{Cl}\\) as the only nitrogen source, so \\(^{15}\\text{N}\\) entered its DNA. \\(^{15}\\text{N}\\) is a **heavy isotope**, not a radioactive one. Heavy and normal DNA are separated by centrifugation in a **caesium chloride (CsCl) density gradient**.\n" +
        "- The cells were moved to \\(^{14}\\text{NH}_4\\text{Cl}\\). *E. coli* divides in **20 minutes**. After one generation (20 min) the DNA was all **hybrid** (intermediate density); after two generations (40 min) it was **equal amounts of hybrid and light** DNA.\n" +
        "- The main enzyme is **DNA-dependent DNA polymerase**. *E. coli*, with \\(4.6 \\times 10^{6}\\) bp, completes replication within **18 minutes**, about **2000 bp per second**. **Deoxyribonucleoside triphosphates** act both as substrates and as the source of energy.\n" +
        "- The strands open only in a small region, the **replication fork**. DNA polymerase adds nucleotides **only in the 5' to 3' direction**, so replication is **continuous** on the template of polarity **3' to 5'** and **discontinuous** on the template of polarity **5' to 3'**. The discontinuous fragments are joined by **DNA ligase**.\n" +
        "- DNA polymerase **cannot start** replication on its own. Replication begins at a definite **origin of replication**. In eukaryotes DNA replicates in the **S phase**; if the cell then fails to divide, the result is **polyploidy**.",
      formula: {
        label: "Heavy-nitrogen DNA after n generations in light nitrogen",
        latex: "1 \\text{ heavy DNA} \\rightarrow 2^{n} \\text{ DNA}: \\quad 2 \\text{ hybrid} + (2^{n}-2) \\text{ light}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of generations in light nitrogen; one every 20 minutes for E. coli" },
          { symbol: "hybrid", meaning: "DNA with one heavy (old) strand and one light (new) strand" },
          { symbol: "light", meaning: "DNA with both strands made from light nitrogen" },
        ],
      },
      authoredExample: {
        prompt: "E. coli with all its DNA in heavy nitrogen is moved to a light-nitrogen medium and grown for 80 minutes. What are the proportions of hybrid and light DNA?",
        steps: [
          "E. coli divides every 20 minutes, so 80 minutes is \\(n = 4\\) generations.",
          "One starting DNA becomes \\(2^{4} = 16\\) DNA molecules.",
          "Its two heavy strands survive in 2 molecules, which are hybrid.",
          "The other \\(16-2=14\\) molecules are light.",
        ],
        answer: "Hybrid to light is 2 : 14, that is 1 : 7.",
      },
      pyqExampleId: "441734c4-f6fd-4092-ae9b-71c4456620ca",
      selfCheckExample: {
        prompt: "In the Meselson and Stahl experiment, what kinds of DNA did the CsCl gradient show 40 minutes after the move to light nitrogen, and in what proportion?",
        steps: [
          "40 minutes is two generations of E. coli.",
          "After the first generation every DNA is hybrid.",
          "In the second, each hybrid gives one hybrid and one light DNA.",
        ],
        answer: "Hybrid and light DNA in equal amounts.",
      },
      practiceSet: [
        { prompt: "What was the only nitrogen source on which Meselson and Stahl first grew E. coli?", answer: "\\(^{15}\\text{NH}_4\\text{Cl}\\) (heavy nitrogen)" },
        { prompt: "By what method did Meselson and Stahl separate heavy DNA from light DNA?", answer: "Centrifugation in a caesium chloride (CsCl) density gradient" },
        { prompt: "Which enzyme joins the discontinuously synthesised fragments of DNA?", answer: "DNA ligase" },
        { prompt: "On which template strand is replication continuous?", answer: "The template with polarity 3' to 5'" },
        { prompt: "How long does E. coli take to replicate its \\(4.6 \\times 10^{6}\\) bp, and at about what rate?", answer: "Within 18 minutes, at about 2000 bp per second" },
        { prompt: "What two jobs do deoxyribonucleoside triphosphates do in replication?", answer: "They are the substrates and they provide the energy for polymerisation" },
      ],
      traps: [
        {
          title: "Polymerase works 5' to 3' only",
          body: "DNA-dependent DNA polymerase adds nucleotides **only in the 5' to 3' direction**, never 3' to 5' and never both ways. That is why one strand is made continuously and the other in pieces.",
        },
        {
          title: "The two hybrid molecules never go away",
          body: "However many generations pass, one heavy DNA leaves exactly **2 hybrid** molecules; only the number of light molecules grows. Count hybrid cells as 2 for each starting DNA.",
        },
        {
          title: "Heavy, not radioactive",
          body: "\\(^{15}\\text{N}\\) is a **heavy isotope**, not radioactive; it is detected by **density** in a CsCl gradient. **Radioactive thymidine** was used by **Taylor** on *Vicia faba*.",
        },
        {
          title: "Ligase joins, polymerase builds",
          body: "**DNA ligase** joins the discontinuous fragments. DNA polymerase builds the new strand but **cannot start** replication by itself and does not join fragments.",
        },
      ],
    },
  ],
};
