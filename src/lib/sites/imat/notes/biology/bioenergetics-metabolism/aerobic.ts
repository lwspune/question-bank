import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BEM_AEROBIC_NOTE: SubtopicNote = {
  subtopicName: "Krebs Cycle and Oxidative Phosphorylation",
  title: "The Krebs Cycle, the Respiratory Chain and the ATP Total",
  oneLineDefinition:
    "In the mitochondrion the Krebs cycle strips the acetyl group of its electrons, the respiratory chain passes them to oxygen, and the proton gradient this builds drives ATP synthase.",
  whyItMatters:
    "This is the most asked page of the chapter. The 2025 paper alone asked what one turn of the Krebs cycle produces, what oxidative phosphorylation is and which proteins it involves, what cytochromes are and how reduced coenzymes are reoxidised; 2023 asked about the complexes of the chain, and 2024 and 2026 asked where the Krebs cycle and respiration happen. An older paper asked for the efficiency of respiration.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bem-krebs-cycle",
      name: "The Krebs cycle: products per turn and per glucose",
      intuition:
        "The Krebs cycle finishes oxidising the acetyl group. The 2-carbon acetyl joins a 4-carbon acceptor to make a 6-carbon acid; two carbons then leave as \\(\\mathrm{CO_2}\\), and the 4-carbon acceptor is rebuilt so the cycle can turn again. The cycle makes little ATP itself: its real product is reduced carriers.",
      definition:
        "- Site: the **mitochondrial matrix**. The one exception is succinate dehydrogenase, which sits in the inner membrane. Other names: **citric acid cycle**, **tricarboxylic acid (TCA) cycle**.\n" +
        "- Acetyl CoA (2C) + **oxaloacetate** (4C) \\(\\rightarrow\\) **citrate** (6C).\n" +
        "- Two oxidative decarboxylations release **2 \\(\\mathrm{CO_2}\\)** per turn.\n" +
        "- Per turn: **3 NADH, 1 \\(\\mathrm{FADH_2}\\), 1 GTP (or ATP) and 2 \\(\\mathrm{CO_2}\\)**.\n" +
        "- One glucose gives two acetyl CoA, so the cycle turns **twice per glucose**: 6 NADH, 2 \\(\\mathrm{FADH_2}\\), 2 ATP, 4 \\(\\mathrm{CO_2}\\).\n" +
        "- No oxygen is used in the cycle, but it stops without oxygen, because \\(\\mathrm{NAD^+}\\) and FAD are regenerated only by the respiratory chain.",
      table: {
        columns: ["Step", "Carbon atoms", "Product made"],
        rows: [
          { cells: ["Acetyl CoA + oxaloacetate → citrate", "2 + 4 → 6", "Coenzyme A released"] },
          { cells: ["Citrate → isocitrate", "6 → 6", "Rearrangement only"] },
          { cells: ["Isocitrate → α-ketoglutarate", "6 → 5", "1 CO₂ and 1 NADH"] },
          { cells: ["α-ketoglutarate → succinyl CoA", "5 → 4", "1 CO₂ and 1 NADH"] },
          { cells: ["Succinyl CoA → succinate", "4 → 4", "1 GTP (or ATP), by substrate-level phosphorylation"] },
          { cells: ["Succinate → fumarate", "4 → 4", "1 FADH₂ (succinate dehydrogenase)"] },
          { cells: ["Fumarate → malate", "4 → 4", "Water added"] },
          { cells: ["Malate → oxaloacetate", "4 → 4", "1 NADH; the acceptor is ready again"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Counting only the Krebs cycle, how many reduced coenzyme molecules (NADH and \\(\\mathrm{FADH_2}\\) together) are produced from one molecule of glucose?",
        options: ["4", "8", "6", "10", "12"],
        steps: [
          "One turn gives 3 NADH and 1 \\(\\mathrm{FADH_2}\\): 4 reduced coenzymes.",
          "One glucose gives two acetyl CoA, so two turns: \\(2 \\times 4 = 8\\).",
          "A counts one turn only; C counts only the NADH; D and E add in the NADH from glycolysis and the link reaction, which the question excludes.",
        ],
        answer: "(B) 8",
      },
      practiceSet: [
        { prompt: "How many molecules of \\(\\mathrm{CO_2}\\) does the Krebs cycle release per glucose?", answer: "4", method: "2 per turn, 2 turns" },
        { prompt: "Which 4-carbon molecule accepts the acetyl group?", answer: "Oxaloacetate" },
        { prompt: "Which Krebs cycle enzyme is bound to the inner mitochondrial membrane?", answer: "Succinate dehydrogenase" },
        { prompt: "How many \\(\\mathrm{CO_2}\\) are released in total when one glucose is fully oxidised?", answer: "6", method: "2 in the link reaction + 4 in the Krebs cycle; none in glycolysis" },
      ],
      traps: [
        {
          title: "Per turn or per glucose?",
          body: "The cycle turns twice for each glucose. Per turn: 3 NADH, 1 \\(\\mathrm{FADH_2}\\), 1 GTP, 2 \\(\\mathrm{CO_2}\\). Per glucose, double everything. Read the question for which one it wants.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-electron-transport",
      name: "The respiratory chain: complexes, mobile carriers and oxygen",
      intuition:
        "NADH and \\(\\mathrm{FADH_2}\\) hand their electrons to a chain of carriers in the inner mitochondrial membrane. Each carrier holds electrons a little more tightly than the one before, so energy is released in small steps rather than in one burst. Oxygen, at the end, holds electrons most tightly of all: it is the final acceptor, and it becomes water.",
      definition:
        "- Site: the **inner mitochondrial membrane**, folded into **cristae** to give more area.\n" +
        "- Four complexes (I to IV) are **integral membrane proteins**. Two **mobile carriers** shuttle electrons between them: **ubiquinone** (coenzyme Q, a small lipid-soluble molecule moving within the membrane) and **cytochrome c** (a small peripheral protein on the outer face of the inner membrane).\n" +
        "- **Complex I** takes electrons from NADH; **complex II** (succinate dehydrogenase) takes them from \\(\\mathrm{FADH_2}\\). Both pass them to ubiquinone.\n" +
        "- **Complex III** passes them to cytochrome c, and **complex IV** (cytochrome c oxidase) passes them to **oxygen**, which takes up protons to form **water**.\n" +
        "- **Cytochromes** are proteins with a haem group whose iron switches between \\(\\mathrm{Fe^{3+}}\\) and \\(\\mathrm{Fe^{2+}}\\). They carry **electrons only**, not hydrogen atoms.\n" +
        "- The chain is how reduced coenzymes are **reoxidised** to \\(\\mathrm{NAD^+}\\) and FAD. Without oxygen it stops, the carriers stay reduced, and the Krebs cycle stops too. Cyanide kills by blocking complex IV.",
      table: {
        columns: ["Component", "Type", "Takes electrons from", "Passes them to", "Pumps protons?"],
        rows: [
          { cells: ["Complex I", "Integral membrane protein", "NADH", "Ubiquinone", "Yes"] },
          { cells: ["Complex II", "Integral membrane protein (also a Krebs enzyme)", "FADH₂ (from succinate)", "Ubiquinone", "No"] },
          { cells: ["Ubiquinone (coenzyme Q)", "Mobile, lipid-soluble", "Complexes I and II", "Complex III", "No"] },
          { cells: ["Complex III", "Integral membrane protein", "Ubiquinone", "Cytochrome c", "Yes"] },
          { cells: ["Cytochrome c", "Mobile peripheral protein", "Complex III", "Complex IV", "No"] },
          { cells: ["Complex IV", "Integral membrane protein", "Cytochrome c", "Oxygen, which forms water", "Yes"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which molecule is the final electron acceptor of the mitochondrial respiratory chain, and at which complex does it receive the electrons?",
        options: [
          "\\(\\mathrm{NAD^+}\\), at complex I",
          "Ubiquinone, at complex III",
          "Cytochrome c, at complex IV",
          "Oxygen, at complex IV",
          "Oxygen, at complex III",
        ],
        steps: [
          "Electrons run from NADH through complexes I, III and IV and end on oxygen, which forms water.",
          "Complex IV (cytochrome c oxidase) is the one that hands them to oxygen, so E names the wrong complex.",
          "\\(\\mathrm{NAD^+}\\), ubiquinone and cytochrome c are intermediate carriers, not the final acceptor.",
        ],
        answer: "(D) Oxygen, at complex IV",
      },
      practiceSet: [
        { prompt: "Name the two mobile electron carriers of the respiratory chain.", answer: "Ubiquinone (coenzyme Q) and cytochrome c" },
        { prompt: "What is formed when oxygen accepts electrons at the end of the chain?", answer: "Water" },
        { prompt: "Which complex receives electrons from \\(\\mathrm{FADH_2}\\)?", answer: "Complex II (succinate dehydrogenase)" },
        { prompt: "What does the iron in a cytochrome carry: electrons or hydrogen atoms?", answer: "Electrons only, switching between \\(\\mathrm{Fe^{3+}}\\) and \\(\\mathrm{Fe^{2+}}\\)" },
      ],
      traps: [
        {
          title: "Oxygen does not oxidise NADH directly",
          body: "Reduced coenzymes are reoxidised through the respiratory chain, step by step; oxygen meets the electrons only at complex IV, the very end. Options saying oxygen acts directly on NADH, at complex III, or inside the Krebs cycle are wrong.",
        },
        {
          title: "FADH₂ enters the chain later than NADH",
          body: "\\(\\mathrm{FADH_2}\\) passes its electrons to complex II, skipping complex I. Fewer protons are pumped for its electrons, so it yields less ATP than NADH (about 1.5 against 2.5).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bem-chemiosmosis",
      name: "Chemiosmosis: the proton gradient drives ATP synthase",
      intuition:
        "The energy released along the chain is used to pump protons out of the matrix into the narrow space between the two membranes. The protons then flow back through ATP synthase, like water through a turbine, and the turning enzyme joins ADP and phosphate. Peter Mitchell called this chemiosmosis, and it is how most ATP on Earth is made.",
      definition:
        "- Complexes I, III and IV pump **protons (\\(\\mathrm{H^+}\\)) from the matrix into the intermembrane space**.\n" +
        "- This builds an **electrochemical gradient** (the proton-motive force): more \\(\\mathrm{H^+}\\) (lower pH) and more positive charge in the intermembrane space than in the matrix.\n" +
        "- The inner membrane is impermeable to \\(\\mathrm{H^+}\\), so the only way back is through **ATP synthase**, an enzyme in the inner membrane.\n" +
        "- \\(\\mathrm{H^+}\\) flowing back through ATP synthase into the matrix drives \\(\\mathrm{ADP + P_i \\rightarrow ATP}\\).\n" +
        "- **Oxidative phosphorylation** = electron transport + chemiosmosis: the energy stored in reduced coenzymes is used to make ATP. It needs both membrane proteins (the complexes, ATP synthase) and mobile molecules (ubiquinone, cytochrome c, the ions themselves).\n" +
        "- **Uncouplers** let \\(\\mathrm{H^+}\\) leak back without passing through ATP synthase: oxygen is still used, but the energy becomes heat. Brown fat uses this on purpose to keep newborns warm.",
      table: {
        columns: ["Part of the mitochondrion", "Location", "Role"],
        rows: [
          { cells: ["Complexes I, III and IV", "Inner membrane", "Pump H⁺ from the matrix into the intermembrane space"] },
          { cells: ["Intermembrane space", "Between the outer and inner membranes", "Holds the high H⁺ concentration (low pH)"] },
          { cells: ["Inner membrane", "Folded into cristae", "Impermeable to H⁺, so the gradient is kept"] },
          { cells: ["ATP synthase", "Inner membrane, its head facing the matrix", "Lets H⁺ flow back and uses the flow to make ATP"] },
          { cells: ["Matrix", "Inside the inner membrane", "Low H⁺ concentration; ATP is made here, and the Krebs cycle runs here"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A poison makes the inner mitochondrial membrane leaky to protons. Which effect is expected in the poisoned cells?",
        options: [
          "Oxygen consumption stops at once",
          "More ATP is made, because protons cross the membrane faster",
          "Electron transport continues, but little ATP is made and more heat is released",
          "Glycolysis stops, because pyruvate can no longer be made",
          "The Krebs cycle starts to produce oxygen",
        ],
        steps: [
          "Electron transport does not depend on the gradient being kept, so electrons still flow to oxygen and oxygen is still used (A is wrong).",
          "The protons now return without passing through ATP synthase, so little ATP is made; the energy is released as heat. B has it backwards.",
          "Glycolysis is in the cytoplasm and unaffected (D), and no stage of respiration makes oxygen (E).",
        ],
        answer: "(C) Electron transport continues, but little ATP is made and more heat is released",
      },
      practiceSet: [
        { prompt: "Into which compartment are protons pumped during electron transport?", answer: "The intermembrane space" },
        { prompt: "What drives ATP synthase to make ATP?", answer: "Protons flowing back down their gradient into the matrix" },
        { prompt: "Which two processes together make up oxidative phosphorylation?", answer: "Electron transport and chemiosmosis" },
        { prompt: "Which scientist proposed chemiosmosis?", answer: "Peter Mitchell" },
      ],
      traps: [
        {
          title: "ATP synthase is driven by protons, not by electrons",
          body: "No electrons pass through ATP synthase. The electron carriers pump protons; ATP synthase uses the flow of those protons back into the matrix. An option saying ATP is made by electrons passing through ATP synthase is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bem-atp-yield",
      name: "Counting the ATP from one glucose, and the efficiency of respiration",
      intuition:
        "Most ATP comes from oxidative phosphorylation, so the total depends on how much ATP each reduced carrier is worth. Measurements give about 2.5 per NADH and 1.5 per \\(\\mathrm{FADH_2}\\), but these are averages, not exact whole numbers. So every ATP total is approximate: modern books give about 30 to 32 per glucose, older ones 36 to 38.",
      definition:
        "Per glucose in aerobic respiration:\n" +
        "- **Substrate-level**: 2 ATP (glycolysis) + 2 ATP or GTP (Krebs cycle) = 4.\n" +
        "- **Reduced carriers**: 10 NADH (2 glycolysis, 2 link reaction, 6 Krebs cycle) and 2 \\(\\mathrm{FADH_2}\\) (Krebs cycle).\n" +
        "- **Oxidative phosphorylation**: about \\(10 \\times 2.5 + 2 \\times 1.5 = 28\\) ATP, by far the largest share.\n" +
        "- **Total**: about 32, or about 30 when the NADH from glycolysis enters the mitochondrion by a shuttle worth only 1.5 each. With the older values of 3 and 2 per carrier the total is 36 to 38.\n" +
        "- **Efficiency** = energy captured in ATP divided by the energy released by complete oxidation. For glucose it is about 30 to 35%; the rest is lost as heat, which keeps birds and mammals warm.",
      formula: {
        label: "ATP yield and efficiency",
        latex:
          "\\text{ATP} \\approx 2.5\\,n_{\\text{NADH}} + 1.5\\,n_{\\text{FADH}_2} + n_{\\text{sub}} \\qquad \\text{efficiency} = \\frac{n_{\\text{ATP}} \\times E_{\\text{ATP}}}{E_{\\text{released}}} \\times 100\\%",
        symbols: [
          { symbol: "\\(n_{\\text{NADH}}, n_{\\text{FADH}_2}\\)", meaning: "number of reduced carriers sent to the respiratory chain" },
          { symbol: "\\(n_{\\text{sub}}\\)", meaning: "ATP (or GTP) made by substrate-level phosphorylation" },
          { symbol: "\\(E_{\\text{ATP}}\\)", meaning: "energy stored per mole of ATP, about 30.5 kJ/mol" },
          { symbol: "\\(E_{\\text{released}}\\)", meaning: "energy released by burning the same fuel completely" },
        ],
      },
      authoredExample: {
        prompt:
          "Using 2.5 ATP per NADH and 1.5 per \\(\\mathrm{FADH_2}\\), estimate the ATP made from one glucose in aerobic respiration. Then find the efficiency, given that 1 mol of glucose releases 2870 kJ when fully oxidised and 1 mol of ATP stores 30.5 kJ.",
        steps: [
          "Substrate-level ATP: 2 (glycolysis) + 2 (Krebs) = 4.",
          "Oxidative phosphorylation: \\(10 \\times 2.5 + 2 \\times 1.5 = 25 + 3 = 28\\).",
          "Total: \\(4 + 28 = 32\\) ATP per glucose (an estimate).",
          "Energy captured: \\(32 \\times 30.5 = 976\\ \\text{kJ}\\) per mol of glucose.",
          "Efficiency: \\(976 / 2870 \\approx 0.34\\), so about 34%. The other 66% is released as heat.",
        ],
        answer: "About 32 ATP; efficiency about 34%",
      },
      selfCheckExample: {
        prompt:
          "Taking 2.5 ATP per NADH and 1.5 ATP per \\(\\mathrm{FADH_2}\\), about how many ATP are made in total when one acetyl CoA molecule is oxidised through the Krebs cycle and the respiratory chain?",
        options: ["10", "12", "7.5", "4", "32"],
        steps: [
          "One turn of the Krebs cycle gives 3 NADH, 1 \\(\\mathrm{FADH_2}\\) and 1 GTP.",
          "\\(3 \\times 2.5 + 1 \\times 1.5 + 1 = 7.5 + 1.5 + 1 = 10\\).",
          "B uses the older values of 3 and 2, which the question does not allow; C counts only the NADH; E is the figure for a whole glucose.",
        ],
        answer: "(A) 10",
      },
      practiceSet: [
        { prompt: "A fuel releases 1500 kJ when burned. Respiring the same amount captures 450 kJ in ATP. What is the efficiency?", answer: "30%", method: "\\(450 / 1500\\)" },
        { prompt: "About how many ATP do 4 NADH give in the respiratory chain, at 2.5 each?", answer: "10" },
        { prompt: "Which stage of aerobic respiration makes the most ATP?", answer: "Oxidative phosphorylation (about 28 of roughly 32)" },
        { prompt: "With the older values of 3 ATP per NADH and 2 per \\(\\mathrm{FADH_2}\\), what is the total per glucose?", answer: "38", method: "\\(10 \\times 3 + 2 \\times 2 + 4\\)" },
      ],
      traps: [
        {
          title: "ATP totals are approximate",
          body: "Books quote 30, 32, 36 or 38 ATP per glucose, depending on the values used per carrier and on how glycolytic NADH enters the mitochondrion. All are estimates. Use the convention the options use; what never changes is that the respiratory chain gives most of the ATP and fermentation gives 2.",
        },
      ],
    },
  ],
};
