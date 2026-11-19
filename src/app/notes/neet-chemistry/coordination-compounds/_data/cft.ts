import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CC_CFT_NOTE: SubtopicNote = {
  subtopicName: "Crystal Field Theory and Metal Carbonyls",
  title: "Crystal Field Theory and Metal Carbonyls",
  oneLineDefinition:
    "How ligands split the five d orbitals into two sets, why strong-field ligands give low-spin complexes, how the size of the split sets the colour, and the synergic bonding and structures of metal carbonyls.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026. Re-NEET 2026 ordered CO, NH₃, H₂O and Cl⁻ by field strength. Two link the splitting to light: three nickel complexes with en ordered by the energy they absorb (2022), and four complexes ordered by the wavelength they absorb (2025, the only HARD question in the chapter). Re-NEET 2024 asked what [Mn₂(CO)₁₀] and [Co₂(CO)₈] have in common.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcc-splitting",
      name: "Crystal field splitting and the spectrochemical series",
      visualizationSlug: "jee-crystal-field-splitting",
      intuition:
        "Crystal field theory treats the ligands as negative charges (or the negative ends of dipoles) around the metal. In an octahedral complex the ligands come in along the x, y and z axes. The two d orbitals that point along the axes are pushed up in energy; the three that point between the axes are lower. The gap between the two sets is the crystal field splitting. A strong-field ligand makes a big gap, and then the d electrons would rather pair in the lower set than climb the gap.",
      definition:
        "- Octahedral: \\(t_{2g}\\) (\\(d_{xy}\\), \\(d_{yz}\\), \\(d_{xz}\\)) is lower, \\(e_g\\) (\\(d_{x^2-y^2}\\), \\(d_{z^2}\\)) is higher. The gap is \\(\\Delta_o\\).\n" +
        "- Tetrahedral: the order is reversed (two lower, three upper) and the gap is smaller, \\(\\Delta_t = \\tfrac{4}{9}\\Delta_o\\). It is too small to force pairing, so low-spin tetrahedral complexes are rarely seen.\n" +
        "- **Spectrochemical series** (weak to strong): \\(\\text{I}^- < \\text{Br}^- < \\text{SCN}^- < \\text{Cl}^- < \\text{S}^{2-} < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NCS}^- < \\text{edta}^{4-} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}\\).\n" +
        "- \\(\\Delta_o < P\\) (P = pairing energy): weak field, electrons go up to \\(e_g\\) before pairing, high spin.\n" +
        "- \\(\\Delta_o > P\\): strong field, electrons pair in \\(t_{2g}\\) first, low spin.",
      table: {
        columns: ["d electrons", "Weak-field ligand, Δo < P", "Strong-field ligand, Δo > P"],
        rows: [
          { cells: ["\\(d^4\\)", "\\(t_{2g}^3 e_g^1\\), 4 unpaired", "\\(t_{2g}^4 e_g^0\\), 2 unpaired"] },
          { cells: ["\\(d^5\\)", "\\(t_{2g}^3 e_g^2\\), 5 unpaired", "\\(t_{2g}^5 e_g^0\\), 1 unpaired"] },
          { cells: ["\\(d^6\\)", "\\(t_{2g}^4 e_g^2\\), 4 unpaired", "\\(t_{2g}^6 e_g^0\\), 0 unpaired"] },
          { cells: ["\\(d^7\\)", "\\(t_{2g}^5 e_g^2\\), 3 unpaired", "\\(t_{2g}^6 e_g^1\\), 1 unpaired"] },
        ],
      },
      pyqExampleId: "3c97a3c7-2a98-43ca-8213-a764c2666b62",
      selfCheckExample: {
        prompt: "Write the d-electron configuration of a \\(d^6\\) ion with a strong-field ligand in an octahedral complex, and say whether it is paramagnetic.",
        steps: [
          "Strong field: \\(\\Delta_o > P\\), so all six electrons pair in the lower \\(t_{2g}\\) set.",
          "\\(t_{2g}^6 e_g^0\\) has no unpaired electrons.",
        ],
        answer: "\\(t_{2g}^6 e_g^0\\); diamagnetic",
      },
      practiceSet: [
        { prompt: "Which d orbitals form the lower set in an octahedral crystal field?", answer: "\\(t_{2g}\\): \\(d_{xy}\\), \\(d_{yz}\\) and \\(d_{xz}\\)" },
        { prompt: "Why are low-spin tetrahedral complexes rarely seen?", answer: "\\(\\Delta_t\\) is only \\(\\tfrac{4}{9}\\Delta_o\\), too small to beat the pairing energy" },
        { prompt: "Is \\(\\text{F}^-\\) a weak-field or a strong-field ligand?", answer: "Weak-field" },
        { prompt: "For a \\(d^4\\) ion, what octahedral configuration results when \\(\\Delta_o\\) is less than the pairing energy?", answer: "\\(t_{2g}^3 e_g^1\\)" },
      ],
      traps: [
        {
          title: "NH₃ is a stronger ligand than H₂O",
          body: "In the spectrochemical series \\(\\text{NH}_3\\) comes after \\(\\text{H}_2\\text{O}\\): \\(\\text{H}_2\\text{O} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}\\). Swapping the first two is the usual slip.",
        },
        {
          title: "Tetrahedral splitting is smaller and upside down",
          body: "In a tetrahedral field two orbitals are lower and three higher, and \\(\\Delta_t = \\tfrac{4}{9}\\Delta_o\\), not \\(\\tfrac{9}{4}\\Delta_o\\).",
        },
        {
          title: "SCN⁻ and NCS⁻ sit far apart",
          body: "Thiocyanate bound through S is a weak ligand, next to \\(\\text{Cl}^-\\). Bound through N it is stronger, just above \\(\\text{H}_2\\text{O}\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcc-colour",
      name: "Colour of complexes and the light they absorb",
      intuition:
        "A complex is coloured because a d electron can jump from the lower set of orbitals to the upper set by absorbing visible light whose energy equals the splitting. The light that is left over reaches your eye, so you see the complementary colour. A stronger ligand makes a bigger gap, so the complex absorbs light of higher energy, which means a shorter wavelength.",
      definition:
        "- Energy absorbed = the crystal field splitting. Since energy is \\(\\dfrac{hc}{\\lambda}\\), a bigger splitting means a **shorter** wavelength absorbed.\n" +
        "- For the same metal, a stronger ligand (further along the spectrochemical series) means more energy absorbed and a shorter wavelength.\n" +
        "- The colour we see is the complementary colour of the light absorbed.\n" +
        "- No ligand, no splitting, no colour: anhydrous \\(\\text{CuSO}_4\\) is white, but \\(\\text{CuSO}_4\\cdot 5\\text{H}_2\\text{O}\\) is blue. Heating \\(\\text{[Ti(H}_2\\text{O)}_6\\text{]Cl}_3\\) to drive off the water leaves it colourless.",
      table: {
        columns: ["Complex", "Wavelength absorbed", "Colour seen"],
        rows: [
          { cells: ["\\(\\text{[Co(CN)}_6\\text{]}^{3-}\\)", "310 nm (ultraviolet)", "Pale yellow"], noteAmber: "NEET 2025 ordered these four complexes by the wavelength they absorb: [Co(CN)₆]³⁻ < [Co(NH₃)₆]³⁺ < [Ti(H₂O)₆]³⁺ < [Cu(H₂O)₄]²⁺." },
          { cells: ["\\(\\text{[Co(NH}_3\\text{)}_6\\text{]}^{3+}\\)", "475 nm (blue)", "Yellow orange"] },
          { cells: ["\\(\\text{[Ti(H}_2\\text{O)}_6\\text{]}^{3+}\\)", "498 nm (blue green)", "Violet"] },
          { cells: ["\\(\\text{[Cu(H}_2\\text{O)}_4\\text{]}^{2+}\\)", "600 nm (red)", "Blue"] },
        ],
      },
      pyqExampleId: "b1be16b7-58d3-4987-bb0a-e598c510fbf4",
      selfCheckExample: {
        prompt: "\\(\\text{[Ti(H}_2\\text{O)}_6\\text{]}^{3+}\\) has one d electron. What happens when it absorbs light, and what colour is the ion?",
        steps: [
          "\\(\\text{Ti}^{3+}\\) is \\(d^1\\): the electron sits in \\(t_{2g}\\), so the ion is \\(t_{2g}^1 e_g^0\\).",
          "Absorbing blue-green light (498 nm) lifts it to \\(e_g\\): \\(t_{2g}^0 e_g^1\\).",
          "The light left over looks violet.",
        ],
        answer: "A \\(t_{2g} \\rightarrow e_g\\) jump of the one electron; the ion is violet",
      },
      practiceSet: [
        { prompt: "One complex absorbs at a shorter wavelength than another. Which of the two has the larger crystal field splitting?", answer: "The one absorbing the shorter wavelength" },
        { prompt: "Why is anhydrous \\(\\text{CuSO}_4\\) white while \\(\\text{CuSO}_4\\cdot 5\\text{H}_2\\text{O}\\) is blue?", answer: "Without water ligands there is no crystal field splitting, so no d electron jump in the visible range" },
        { prompt: "Does a larger crystal field splitting mean higher or lower energy of light absorbed?", answer: "Higher energy" },
        { prompt: "Which colour of light does \\(\\text{[Cu(H}_2\\text{O)}_4\\text{]}^{2+}\\) absorb, and which colour do we see?", answer: "It absorbs red (about 600 nm) and looks blue" },
      ],
      traps: [
        {
          title: "Bigger splitting, shorter wavelength",
          body: "Energy and wavelength run opposite ways. The complex with the strongest ligand absorbs the MOST energy but the SHORTEST wavelength.",
        },
        {
          title: "The colour you see is not the colour absorbed",
          body: "\\(\\text{[Ti(H}_2\\text{O)}_6\\text{]}^{3+}\\) absorbs blue-green light and looks violet.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcc-carbonyls",
      name: "Bonding and structures of metal carbonyls",
      intuition:
        "In a metal carbonyl, carbon monoxide bonds to the metal in two ways at once. The carbon gives its lone pair to an empty metal orbital (a σ bond). The metal gives some of its d electrons back into an empty antibonding π orbital of CO (a π bond). Each bond makes the other stronger, so the metal-carbon bond is strong. This two-way give and take is called synergic bonding.",
      definition:
        "- Homoleptic carbonyls contain only CO ligands. CO is neutral, so in a neutral carbonyl the metal's oxidation state is 0.\n" +
        "- **σ bond**: lone pair on the carbon of CO into a vacant metal orbital.\n" +
        "- **π bond**: a filled metal d orbital into the vacant antibonding \\(\\pi^*\\) orbital of CO (back bonding).\n" +
        "- The two bonds strengthen each other (synergic effect).\n" +
        "- \\(\\text{[Ni(CO)}_4\\text{]}\\) is tetrahedral, \\(\\text{[Fe(CO)}_5\\text{]}\\) trigonal bipyramidal, \\(\\text{[Cr(CO)}_6\\text{]}\\) octahedral.\n" +
        "- \\(\\text{[Mn}_2\\text{(CO)}_{10}\\text{]}\\): two square pyramidal \\(\\text{Mn(CO)}_5\\) units joined by a Mn-Mn bond. \\(\\text{[Co}_2\\text{(CO)}_8\\text{]}\\): a Co-Co bond bridged by two CO groups.",
      table: {
        columns: ["Carbonyl", "Structure", "Metal-metal bond"],
        rows: [
          { cells: ["\\(\\text{[Ni(CO)}_4\\text{]}\\)", "Tetrahedral", "None (one metal atom)"] },
          { cells: ["\\(\\text{[Fe(CO)}_5\\text{]}\\)", "Trigonal bipyramidal", "None (one metal atom)"] },
          { cells: ["\\(\\text{[Cr(CO)}_6\\text{]}\\)", "Octahedral", "None (one metal atom)"] },
          { cells: ["\\(\\text{[Mn}_2\\text{(CO)}_{10}\\text{]}\\)", "Two square pyramidal Mn(CO)₅ units, all ten CO terminal", "Yes, Mn-Mn"], noteAmber: "Re-NEET 2024: both dimers have a metal-metal bond, terminal CO groups and the metal at 0; only [Co₂(CO)₈] has bridging CO." },
          { cells: ["\\(\\text{[Co}_2\\text{(CO)}_8\\text{]}\\)", "Two bridging CO and six terminal CO", "Yes, Co-Co"] },
        ],
      },
      pyqExampleId: "73370967-395d-4122-8b9b-f2998a0cf153",
      selfCheckExample: {
        prompt: "Why is the metal-carbon bond in a metal carbonyl stronger than a simple σ bond would be?",
        steps: [
          "CO gives its carbon lone pair to the metal: a σ bond.",
          "The metal gives d electrons back into the empty \\(\\pi^*\\) orbital of CO: a π bond.",
          "Each donation makes the other easier, so the two together strengthen the bond.",
        ],
        answer: "Synergic bonding: σ donation from CO and π back donation from the metal reinforce each other",
      },
      practiceSet: [
        { prompt: "What is the shape of \\(\\text{[Cr(CO)}_6\\text{]}\\)?", answer: "Octahedral" },
        { prompt: "What is the oxidation state of iron in \\(\\text{[Fe(CO)}_5\\text{]}\\)?", answer: "0" },
        { prompt: "Into which orbital of CO does the metal give its d electrons in back bonding?", answer: "The vacant antibonding \\(\\pi^*\\) orbital" },
        { prompt: "Which atom of CO gives its lone pair to the metal?", answer: "Carbon" },
      ],
      traps: [
        {
          title: "No bridging CO in Mn₂(CO)₁₀",
          body: "\\(\\text{[Mn}_2\\text{(CO)}_{10}\\text{]}\\) is held together by the Mn-Mn bond alone. It is \\(\\text{[Co}_2\\text{(CO)}_8\\text{]}\\) that has two bridging CO groups.",
        },
        {
          title: "Back bonding fills π*, not π",
          body: "The metal's d electrons go into the empty antibonding \\(\\pi^*\\) orbital of CO. The bonding π orbitals of CO are already full.",
        },
      ],
    },
  ],
};
