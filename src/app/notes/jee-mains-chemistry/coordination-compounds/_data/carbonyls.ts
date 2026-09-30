import type { SubtopicNote } from "@/app/notes/_types";

export const CARBONYLS_COORD_NOTE: SubtopicNote = {
  subtopicName: "Metal Carbonyls, Stability and Applications",
  title: "Metal Carbonyls, Stability and Applications",
  oneLineDefinition:
    "Carbon monoxide binds metals by σ donation and π back-donation, which is why carbonyls hold metals in the zero oxidation state; stability constants measure how firmly a complex holds its ligands; and a short list of complexes matters in biology, medicine, industry and analysis.",
  whyItMatters:
    "Twenty-one PYQs, fifteen of them multiple choice, and two from 2026. Nine are about metal carbonyls: synergic bonding, structures and bridging CO groups; six use stability constants or the chelate effect; six are match-the-list questions on the uses of complexes and catalysts.",
  concepts: [
    // C1 — metal carbonyls
    {
      kind: "reference" as const,
      slug: "jccoord-carbonyls",
      name: "Synergic bonding and structures of metal carbonyls",
      intuition:
        "CO gives its carbon lone pair to an empty metal orbital (a σ bond). The metal, rich in electrons, gives electrons back from a filled d orbital into the empty π* orbital of CO (a π bond). Each half strengthens the other, so the bonding is called synergic. The metal–carbon bond gets stronger, and the C–O bond gets weaker because π* is antibonding.",
      definition:
        "- σ bond: lone pair on C → vacant metal orbital. π bond: filled metal d orbital → vacant π* of CO.\n" +
        "- Result: M–C bond strengthened; C–O bond weakened (its stretching frequency falls).\n" +
        "- Low oxidation states are stabilised by π-ACCEPTOR ligands such as CO, which take electron density off an electron-rich metal. CO is neutral, so the metal in \\(\\mathrm{Ni(CO)_4}\\) and \\(\\mathrm{Fe(CO)_5}\\) is in the zero oxidation state.\n" +
        "- Bridging CO links two metals through one carbon; terminal CO binds one metal.",
      table: {
        columns: ["Carbonyl", "Shape at each metal", "Bridging CO", "Metal–metal bonds"],
        rows: [
          { cells: ["\\(\\mathrm{Ni(CO)_4}\\)", "Tetrahedral", "0", "0"] },
          { cells: ["\\(\\mathrm{Fe(CO)_5}\\)", "Trigonal bipyramidal", "0", "0"] },
          { cells: ["\\(\\mathrm{Cr(CO)_6}\\), \\(\\mathrm{W(CO)_6}\\)", "Octahedral", "0", "0"] },
          { cells: ["\\(\\mathrm{Mn_2(CO)_{10}}\\)", "Octahedral (five CO and one Mn–Mn bond)", "0", "1 Mn–Mn"], noteAmber: "Decacarbonyldimanganese(0) has ten terminal CO groups and no bridge." },
          { cells: ["\\(\\mathrm{Co_2(CO)_8}\\)", "Two Co(CO)₃ units joined by two CO bridges", "2 (with 6 terminal)", "1 Co–Co"] },
        ],
        caption: "Only the dicobalt carbonyl here has bridging CO groups.",
      },
      selfCheckExample: {
        prompt: "How many terminal CO ligands and how many metal–metal bonds does \\(\\mathrm{Mn_2(CO)_{10}}\\) have?",
        steps: [
          "All ten CO groups are terminal: five on each manganese.",
          "The two \\(\\mathrm{Mn(CO)_5}\\) units are held together by a single Mn–Mn bond.",
        ],
        answer: "10 terminal CO; 1 Mn–Mn bond.",
      },
      practiceSet: [
        { prompt: "What is the shape of \\(\\mathrm{Fe(CO)_5}\\)?", answer: "Trigonal bipyramidal" },
        { prompt: "What is the oxidation state of chromium in \\(\\mathrm{Cr(CO)_6}\\)?", answer: "0" },
        { prompt: "Does synergic bonding make the C–O bond stronger or weaker?", answer: "Weaker" },
        { prompt: "How many bridging CO groups does \\(\\mathrm{Co_2(CO)_8}\\) have?", answer: "2" },
      ],
      pyqExampleId: "6ad9802b-f128-4190-ae6f-dbcc364ac5de", // 2026 — statements on synergic bonding in carbonyls
      traps: [
        {
          title: "Synergic bonding strengthens the metal–carbon bond",
          body: "Back-donation adds a π bond to the σ bond, so the M–C bond becomes STRONGER. It is the C–O bond that weakens, because electrons enter the antibonding π* orbital of CO.",
        },
        {
          title: "π-acceptors, not π-donors, stabilise low oxidation states",
          body: "A metal in the zero oxidation state is electron rich and needs ligands that take electrons away. A reason saying low oxidation states need π-DONOR ligands is false.",
        },
      ],
    },

    // C2 — stability of complexes
    {
      kind: "formula" as const,
      slug: "jccoord-stability",
      name: "Stability constants and the chelate effect",
      intuition:
        "A stability constant is the equilibrium constant for making the complex from the free metal ion and ligands. A huge value means almost no free metal ion is left once enough ligand is present. That is why a complexed metal can refuse to precipitate, and why a precipitate can dissolve in a ligand. Chelating ligands form more stable complexes than the same number of separate donor atoms.",
      definition:
        "- \\(\\mathrm{M + nL \\rightleftharpoons ML_n}\\): \\(\\beta_n = \\dfrac{[\\mathrm{ML}_n]}{[\\mathrm{M}][\\mathrm{L}]^n}\\); the overall constant is the product of the stepwise ones, \\(\\beta_n = K_1K_2\\cdots K_n\\).\n" +
        "- Overall dissociation (instability) constant = \\(1/\\beta_n\\).\n" +
        "- With excess ligand, \\([\\mathrm{M}] = \\dfrac{[\\mathrm{ML}_n]}{\\beta_n[\\mathrm{L}]^n}\\), where [L] is the FREE ligand left after complexation.\n" +
        "- Chelate effect: \\(\\mathrm{[Co(en)_3]^{2+} > [Co(en)_2(NH_3)_2]^{2+} > [Co(en)(NH_3)_4]^{2+} > [Co(NH_3)_6]^{2+}}\\).\n" +
        "- AgCl dissolves in ammonia as \\(\\mathrm{[Ag(NH_3)_2]Cl}\\). Cu²⁺ with excess CN⁻ gives \\(\\mathrm{[Cu(CN)_4]^{3-}}\\), and \\(\\mathrm{H_2S}\\) then precipitates no sulphide. Prussian blue, \\(\\mathrm{K_3[Co(NO_2)_6]}\\) and ammonium arsenomolybdate are insoluble; basic iron(III) acetate is soluble.",
      formula: {
        label: "Overall stability constant",
        latex: "\\beta_n = \\frac{[\\mathrm{ML}_n]}{[\\mathrm{M}][\\mathrm{L}]^n} = K_1K_2\\cdots K_n \\qquad K_{\\text{diss}} = \\frac{1}{\\beta_n}",
      },
      authoredExample: {
        prompt:
          "In a solution, 0.010 M zinc is present almost entirely as \\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\) and the free ammonia is 0.10 M. With \\(\\beta_4 = 1.0 \\times 10^{9}\\), find the concentration of free \\(\\mathrm{Zn^{2+}}\\).",
        steps: [
          "\\([\\mathrm{Zn^{2+}}] = \\dfrac{[\\mathrm{Zn(NH_3)_4^{2+}}]}{\\beta_4[\\mathrm{NH_3}]^4}\\).",
          "\\([\\mathrm{NH_3}]^4 = (0.10)^4 = 1.0 \\times 10^{-4}\\).",
          "\\([\\mathrm{Zn^{2+}}] = \\dfrac{0.010}{1.0 \\times 10^{9} \\times 1.0 \\times 10^{-4}} = 1.0 \\times 10^{-7}\\) M.",
        ],
        answer: "\\(1.0 \\times 10^{-7}\\) M",
      },
      selfCheckExample: {
        prompt:
          "The stepwise constants for \\(\\mathrm{[Ag(NH_3)_2]^+}\\) are \\(K_1 = 2.0 \\times 10^{3}\\) and \\(K_2 = 8.0 \\times 10^{3}\\). Find the overall stability constant and the overall dissociation constant.",
        steps: [
          "\\(\\beta_2 = K_1K_2 = 2.0 \\times 10^{3} \\times 8.0 \\times 10^{3} = 1.6 \\times 10^{7}\\).",
          "\\(K_{\\text{diss}} = 1/\\beta_2 = 6.25 \\times 10^{-8}\\).",
        ],
        answer: "\\(\\beta_2 = 1.6 \\times 10^{7}\\); \\(K_{\\text{diss}} = 6.25 \\times 10^{-8}\\).",
      },
      practiceSet: [
        { prompt: "A complex has \\(\\beta = 1.0 \\times 10^{10}\\). What is its overall dissociation constant?", answer: "\\(1.0 \\times 10^{-10}\\)" },
        { prompt: "Which is more stable, \\(\\mathrm{[Ni(NH_3)_6]^{2+}}\\) or \\(\\mathrm{[Ni(en)_3]^{2+}}\\)?", answer: "\\(\\mathrm{[Ni(en)_3]^{2+}}\\) (chelate effect)" },
        { prompt: "What complex forms when AgCl dissolves in aqueous ammonia?", answer: "\\(\\mathrm{[Ag(NH_3)_2]Cl}\\)" },
        { prompt: "Why does \\(\\mathrm{H_2S}\\) give no CuS from a solution of \\(\\mathrm{[Cu(CN)_4]^{3-}}\\)?", answer: "The free copper ion concentration is too low for the solubility product to be exceeded" },
      ],
      pyqExampleId: "f10fb9c9-dc87-4a7a-ab78-08e16797b5cb", // 2021 — ammonia needed to bring free Ag+ down to 5e-8 M
      traps: [
        {
          title: "Use the FREE ligand, not the total added",
          body: "The ligand bound in the complex is not free. If 1.0 mol of metal ion takes 2 mol of ligand into the complex, subtract those 2 mol from the total before putting [L] into \\(\\beta\\).",
        },
        {
          title: "Chelation raises stability at the same metal and charge",
          body: "Replacing two \\(\\mathrm{NH_3}\\) by one en keeps the donor atoms the same but adds a ring, and each step raises the stability: \\(\\mathrm{[Co(en)_3]^{2+}}\\) is the most stable of the ammine–en series.",
        },
      ],
    },

    // C3 — uses of complexes
    {
      kind: "reference" as const,
      slug: "jccoord-uses",
      name: "Complexes in biology, medicine, industry and analysis",
      intuition:
        "These questions are pure matching: a pigment, drug, catalyst or reagent with its metal or its use. The list is short, and the trap is always a swapped pair, such as chlorophyll with cobalt instead of magnesium.",
      definition:
        "- Biology: chlorophyll (Mg), haemoglobin (Fe), vitamin B₁₂, cyanocobalamin (Co).\n" +
        "- Medicine: cisplatin, cis-\\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\), inhibits tumour growth; EDTA removes lead in lead poisoning; D-penicillamine removes excess copper.\n" +
        "- Industry: Wilkinson's catalyst \\(\\mathrm{[RhCl(PPh_3)_3]}\\) hydrogenates alkenes; Ziegler–Natta catalyst (\\(\\mathrm{TiCl_4}\\) with \\(\\mathrm{Al(C_2H_5)_3}\\)) polymerises alkenes; Grubbs catalyst (Ru) for alkene metathesis.\n" +
        "- Analysis and processes: EDTA titration for water hardness (Ca²⁺, Mg²⁺); dmg for Ni²⁺; hypo dissolves unexposed AgBr in photography as \\(\\mathrm{[Ag(S_2O_3)_2]^{3-}}\\); cyanide leaches silver and gold as \\(\\mathrm{[Ag(CN)_2]^-}\\) and \\(\\mathrm{[Au(CN)_2]^-}\\).",
      table: {
        columns: ["Substance", "Metal", "Role"],
        rows: [
          { cells: ["Chlorophyll", "Mg", "Photosynthetic pigment"] },
          { cells: ["Haemoglobin", "Fe", "Oxygen carrier in blood"] },
          { cells: ["Vitamin B₁₂ (cyanocobalamin)", "Co", "Anti-pernicious-anaemia factor"] },
          { cells: ["Cisplatin", "Pt", "Anticancer drug"] },
          { cells: ["Wilkinson's catalyst", "Rh", "Hydrogenation of alkenes"] },
          { cells: ["Ziegler–Natta catalyst", "Ti (with Al)", "Polymerisation of alkenes"] },
          { cells: ["Grubbs catalyst", "Ru", "Alkene metathesis"] },
          { cells: ["\\(\\mathrm{[Ag(S_2O_3)_2]^{3-}}\\) (from hypo)", "Ag", "Fixing in black-and-white photography"], noteAmber: "Photography uses the thiosulphate complex, not \\(\\mathrm{[Ag(CN)_2]^-}\\)." },
          { cells: ["\\(\\mathrm{[Ag(CN)_2]^-}\\), \\(\\mathrm{[Au(CN)_2]^-}\\)", "Ag, Au", "Extraction by cyanide leaching; electroplating"] },
          { cells: ["EDTA", "Ca, Mg (and Pb)", "Water-hardness titration; treatment of lead poisoning"] },
          { cells: ["D-Penicillamine", "Cu", "Chelating drug for excess copper"] },
        ],
        caption: "Most match lists pair a biological or catalytic name with its metal.",
      },
      selfCheckExample: {
        prompt: "Which pair is mismatched: haemoglobin – Fe, Grubbs catalyst – Ru, vitamin B₁₂ – Mg, cisplatin – Pt?",
        steps: [
          "Haemoglobin carries iron, Grubbs catalyst is a ruthenium complex and cisplatin is a platinum complex.",
          "Vitamin B₁₂ contains cobalt; magnesium is the metal of chlorophyll.",
        ],
        answer: "Vitamin B₁₂ – Mg",
      },
      practiceSet: [
        { prompt: "Which metal is in Wilkinson's catalyst?", answer: "Rhodium" },
        { prompt: "Which complex is used to inhibit tumour growth?", answer: "Cisplatin, cis-\\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\)" },
        { prompt: "Which metal is in chlorophyll?", answer: "Magnesium" },
        { prompt: "Which ligand estimates the hardness of water?", answer: "EDTA" },
      ],
      pyqExampleId: "9f5b551f-1bce-4ed3-87d2-b69b4b248df3", // 2023 — mismatched pairs among chlorophyll, EDTA, photography, Wilkinson, penicillamine
      traps: [
        {
          title: "Chlorophyll is magnesium, vitamin B₁₂ is cobalt",
          body: "The two porphyrin-like biological complexes are easily swapped. Chlorophyll holds Mg²⁺; vitamin B₁₂ holds cobalt; haemoglobin holds iron.",
        },
        {
          title: "EDTA is not an anticancer drug",
          body: "EDTA and D-penicillamine are chelating agents that remove unwanted metals (lead, copper). Tumour growth is inhibited by platinum complexes such as cisplatin.",
        },
      ],
    },
  ],
};
