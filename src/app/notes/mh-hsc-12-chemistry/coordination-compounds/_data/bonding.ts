import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_BONDING_NOTE: SubtopicNote = {
  subtopicName: "Theories of Bonding in Complexes",
  title: "Valence Bond Theory and Crystal Field Theory",
  oneLineDefinition:
    "Valence bond theory for octahedral, tetrahedral and square planar complexes with box diagrams, and crystal field theory for d orbital splitting, high and low spin complexes and the colour of complexes.",
  whyItMatters:
    "15 questions. Eight were set in board papers, and every one of them asked for valence bond theory: [CoF₆]³⁻ (2015, 2023, 2026), [Co(NH₃)₆]³⁺ (2018, 2024, and twice in 2025), [NiCl₄]²⁻ (2024, 2025) and [Ni(CN)₄]²⁻ (2024). Most of these papers added a short second part on naming, EAN, EDTA or an organic conversion. The textbook adds crystal field theory: high and low spin complexes, strong and weak field ligands, the d orbital splitting for [Fe(CN)₆]⁴⁻, the unpaired electrons in [CrF₆]³⁻, and why [Cr(en)₃]³⁺ is coloured, with box diagrams for [CoCl₄]²⁻ and [VCl₄]⁻.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscccc-vbt-octahedral",
      name: "Valence bond theory for octahedral complexes",
      intuition:
        "Six ligands need six empty metal orbitals to put their electron pairs into. If the ligand is strong enough to push the metal's d electrons together into pairs, two inner 3d orbitals become empty and the metal uses them: d²sp³, an inner orbital complex. If the ligand is weak, the d electrons stay spread out, no inner d orbital is free, and the metal has to reach out to the 4d orbitals: sp³d², an outer orbital complex with more unpaired electrons.",
      definition:
        "- VBT: the metal ion provides vacant orbitals; its vacant d orbitals hybridise with its s and p orbitals; the number of hybrid orbitals equals the coordination number; each overlaps a filled ligand orbital to form a coordinate bond; the hybridisation decides the shape.\n" +
        "- **Steps of a full answer:** (i) oxidation state of the metal; (ii) box diagram of the free metal ion; (iii) low spin or high spin; (iv) number of orbitals needed from the number of ligands; (v) orbitals used and the type of hybridisation; (vi) and (vii) box diagram after complex formation, with the ligand pairs in the hybrid orbitals; (viii) unpaired electrons and magnetic behaviour.\n" +
        "- **Low spin** (strong field ligand, e.g. \\(\\text{NH}_3\\), \\(\\text{CN}^-\\)): 3d electrons pair first; two empty \\((n-1)d\\) orbitals with 4s and three 4p give \\(d^2sp^3\\): **inner orbital** complex.\n" +
        "- **High spin** (weak field ligand, e.g. \\(\\text{F}^-\\)): no pairing; 4s, three 4p and two 4d give \\(sp^3d^2\\): **outer orbital** complex.\n" +
        "- Both give an **octahedral** complex. Unpaired electrons make it **paramagnetic**; all paired, **diamagnetic**. The spin only magnetic moment from the d and f block chapter is \\(\\mu = \\sqrt{n(n+2)}\\) BM, with \\(n\\) unpaired electrons.\n" +
        "- \\(\\text{[Co(NH}_3)_6]^{3+}\\): \\(\\text{Co}^{3+}\\), 3d⁶, low spin, \\(d^2sp^3\\), no unpaired electron, diamagnetic. \\(\\text{[CoF}_6]^{3-}\\): \\(\\text{Co}^{3+}\\), 3d⁶, high spin, \\(sp^3d^2\\), four unpaired electrons, paramagnetic.",
      formula: {
        label: "Spin only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
        symbols: [{ symbol: "\\(n\\)", meaning: "number of unpaired electrons" }],
      },
      authoredExample: {
        prompt: "Explain the bonding in \\(\\text{[Cr(NH}_3)_6]^{3+}\\) on the basis of valence bond theory: hybridisation, geometry, inner or outer orbital type, and magnetic behaviour (Z of Cr = 24).",
        steps: [
          "(i) Oxidation state: \\(\\text{NH}_3\\) is neutral, so \\(x + 6(0) = +3\\) and Cr is +3.",
          "(ii) Cr is \\(\\text{[Ar]}\\,3d^5 4s^1\\), so \\(\\text{Cr}^{3+}\\) is \\(3d^3\\). Free ion: 3d \\((\\uparrow)(\\uparrow)(\\uparrow)(\\ )(\\ )\\), 4s \\((\\ )\\), 4p \\((\\ )(\\ )(\\ )\\).",
          "(iii) and (iv) Six \\(\\text{NH}_3\\) ligands need six vacant orbitals. Two 3d orbitals are already empty, so no pairing is needed.",
          "(v) Two 3d, one 4s and three 4p orbitals hybridise: \\(d^2sp^3\\).",
          "(vi) After complex formation: 3d \\((\\uparrow)(\\uparrow)(\\uparrow)\\), \\(d^2sp^3\\) \\((\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)\\), the six pairs coming from the six \\(\\text{NH}_3\\).",
          "(viii) Three unpaired electrons: paramagnetic. \\(\\mu = \\sqrt{3(3+2)} = \\sqrt{15} = 3.87\\) BM.",
        ],
        answer: "d²sp³ hybridisation, octahedral, inner orbital complex, paramagnetic with 3 unpaired electrons (μ = 3.87 BM)",
      },
      selfCheckExample: {
        prompt: "Using VBT, give the hybridisation, the inner or outer orbital type and the number of unpaired electrons of the high spin complex \\(\\text{[Co(H}_2\\text{O)}_6]^{2+}\\) (Z of Co = 27).",
        steps: [
          "\\(\\text{Co}^{2+}\\) is \\(3d^7\\): 3d \\((\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow)(\\uparrow)(\\uparrow)\\). High spin, so no pairing and no empty 3d orbital.",
          "4s, three 4p and two 4d orbitals hybridise: \\(sp^3d^2\\), outer orbital, octahedral. Three unpaired electrons remain.",
        ],
        answer: "sp³d², outer orbital, 3 unpaired electrons (paramagnetic)",
      },
      practiceSet: [
        { prompt: "Which d orbitals does an inner orbital complex use for hybridisation, and which does an outer orbital complex use?", answer: "Inner: \\((n-1)d\\), here 3d. Outer: \\(nd\\), here 4d" },
        { prompt: "How many unpaired electrons does \\(\\text{[Co(NH}_3)_6]^{3+}\\) have, and is it paramagnetic or diamagnetic?", answer: "None; diamagnetic" },
        { prompt: "Find the spin only magnetic moment of a complex with two unpaired electrons.", answer: "\\(\\mu = \\sqrt{2 \\times 4} = \\sqrt{8} = 2.83\\) BM" },
      ],
      pyqExampleId: "b7c993b4-ed9b-4f18-9a6f-c7fe23a0426c",
      traps: [
        {
          title: "Pairing electrons with a weak field ligand",
          body: "Fluoride is a weak field ligand: the 3d electrons stay unpaired, no 3d orbital is freed, and 4d orbitals are used. Pairing them gives the wrong hybridisation and the wrong magnetic behaviour.",
        },
        {
          title: "Inner and outer swapped",
          body: "\\(d^2sp^3\\) uses inner 3d orbitals (inner orbital, low spin). \\(sp^3d^2\\) uses outer 4d orbitals (outer orbital, high spin). The order of the letters tells you which d is used.",
        },
        {
          title: "Only one box diagram",
          body: "A VBT answer needs the free ion diagram and the diagram after complex formation, with the ligand pairs shown in the hybrid orbitals. Then state the geometry and the magnetic behaviour in words.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscccc-vbt-four",
      name: "Tetrahedral and square planar complexes",
      intuition:
        "Four ligands need four empty orbitals. With a weak field ligand the 3d set is left alone and the metal uses 4s and three 4p, which point to the corners of a tetrahedron. With a strong field ligand and a d⁸ ion, the d electrons pair up, one 3d orbital is freed, and 3d with 4s and two 4p give four hybrids lying in one plane: square planar.",
      definition:
        "- **Tetrahedral, \\(sp^3\\):** \\(\\text{[NiCl}_4]^{2-}\\): \\(\\text{Ni}^{2+}\\) is \\(3d^8\\) with two unpaired electrons; four \\(\\text{Cl}^-\\) need four orbitals; one 4s and three 4p give \\(sp^3\\); two unpaired electrons remain, so it is paramagnetic.\n" +
        "- **Square planar, \\(dsp^2\\):** \\(\\text{[Ni(CN)}_4]^{2-}\\): \\(\\text{Ni}^{2+}\\) is \\(3d^8\\); the strong field \\(\\text{CN}^-\\) makes the 3d electrons pair first, freeing one 3d orbital; one 3d, one 4s and two 4p give \\(dsp^2\\); no unpaired electrons, so it is diamagnetic.\n" +
        "- Coordination number, shape and hybridisation: 2, linear, \\(sp\\); 4, tetrahedral, \\(sp^3\\); 4, square planar, \\(dsp^2\\); 6, octahedral, \\(d^2sp^3\\) or \\(sp^3d^2\\).",
      formula: {
        label: "Hybridisation and shape",
        latex: "sp^3 \\to \\text{tetrahedral}, \\qquad dsp^2 \\to \\text{square planar}, \\qquad d^2sp^3 \\text{ or } sp^3d^2 \\to \\text{octahedral}",
      },
      authoredExample: {
        prompt: "Give the valence bond description of \\(\\text{[ZnCl}_4]^{2-}\\): hybridisation, shape and magnetic behaviour (Z of Zn = 30).",
        steps: [
          "(i) Oxidation state: \\(x + 4(-1) = -2\\), so Zn is +2.",
          "(ii) Zn is \\(\\text{[Ar]}\\,3d^{10}4s^2\\), so \\(\\text{Zn}^{2+}\\) is \\(3d^{10}\\): 3d \\((\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)\\), 4s \\((\\ )\\), 4p \\((\\ )(\\ )(\\ )\\).",
          "(iv) Four \\(\\text{Cl}^-\\) ligands need four vacant orbitals. The 3d set is full, so one 4s and three 4p are used.",
          "(v) to (vii) \\(sp^3\\) hybridisation; after complex formation 4s and 4p hold the four pairs from the \\(\\text{Cl}^-\\) ions: \\(sp^3\\) \\((\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)(\\uparrow\\downarrow)\\).",
          "(viii) No unpaired electrons: diamagnetic.",
        ],
        answer: "sp³ hybridisation, tetrahedral, diamagnetic",
      },
      selfCheckExample: {
        prompt: "\\(\\text{[MnCl}_4]^{2-}\\) is tetrahedral. Give the hybridisation and the number of unpaired electrons (Z of Mn = 25).",
        steps: ["\\(\\text{Mn}^{2+}\\) is \\(3d^5\\): five unpaired electrons, untouched by the weak field \\(\\text{Cl}^-\\).", "4s and three 4p give \\(sp^3\\)."],
        answer: "sp³; 5 unpaired electrons",
      },
      practiceSet: [
        { prompt: "Which orbitals combine to give dsp² hybrid orbitals?", answer: "One 3d, one 4s and two 4p orbitals" },
        { prompt: "Why must the 3d electrons of Ni²⁺ pair up before a dsp² complex can form?", answer: "Pairing frees one 3d orbital, which is needed for the \\(dsp^2\\) set" },
        { prompt: "What is the shape of a complex whose metal uses sp³ hybrid orbitals?", answer: "Tetrahedral" },
      ],
      pyqExampleId: "c09bbec7-4d57-4577-a046-16682f2faa68",
      traps: [
        {
          title: "Assuming four ligands always means tetrahedral",
          body: "A d⁸ ion with a strong field ligand forms a square planar \\(dsp^2\\) complex. Decide the shape from the ligand and the hybridisation, not from the count of four alone.",
        },
        {
          title: "dsp² or sp²d",
          body: "In \\(dsp^2\\) the d orbital is the inner 3d, so it is written first. Write the hybridisation exactly in this form.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscccc-cft",
      name: "Crystal field splitting, strong and weak field ligands",
      intuition:
        "In a free ion the five d orbitals have the same energy. Bring six negative ligands in along the x, y and z axes, and the two d orbitals that point straight at them are pushed up in energy, while the three that point between them drop. The gap is Δo. A strong field ligand makes the gap so large that electrons would rather pair in the lower set than climb the gap: a low spin complex.",
      definition:
        "- CFT treats the ligands as **point charges**; the metal and ligand interaction is purely electrostatic.\n" +
        "- In an octahedral field the d orbitals split into \\(e_g\\) \\((d_{x^2-y^2}, d_{z^2})\\), raised by \\(0.6\\Delta_o\\), and \\(t_{2g}\\) \\((d_{xy}, d_{yz}, d_{zx})\\), lowered by \\(0.4\\Delta_o\\). The gap is the crystal field splitting parameter \\(\\Delta_o = 10\\) Dq.\n" +
        "- **Strong field ligands** have C, N or P donor atoms (\\(\\text{CN}^-\\), CO, \\(\\text{NH}_3\\), EDTA, en): large \\(\\Delta_o\\), pairing favoured, **low spin** complexes. **Weak field ligands** have halogen, O or S donor atoms (\\(\\text{F}^-\\), \\(\\text{Cl}^-\\), \\(\\text{Br}^-\\), \\(\\text{I}^-\\), \\(\\text{SCN}^-\\), \\(\\text{C}_2\\text{O}_4^{2-}\\)): \\(\\Delta_o\\) smaller than the pairing energy, **high spin** complexes.\n" +
        "- Spectrochemical series (increasing field strength): \\(\\text{I}^- < \\text{Br}^- < \\text{Cl}^- < \\text{S}^{2-} < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NCS}^- < \\text{EDTA} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}\\).\n" +
        "- \\(d^1\\) to \\(d^3\\): electrons fill \\(t_{2g}\\) singly (Hund's rule). High and low spin differ only for \\(d^4\\) to \\(d^7\\).\n" +
        "- \\(\\Delta_o\\) grows with ligand strength and with the metal's oxidation state (trivalent ions split more than divalent ones).\n" +
        "- Tetrahedral splitting is about 4/9 of the octahedral, with \\(t_2\\) above \\(e\\); pairing is not favoured, so low spin tetrahedral complexes are not found.\n" +
        "- CFT was needed because VBT cannot explain high and low spin (strong and weak field), cannot explain colour, and does not always predict the right structure.",
      formula: {
        label: "Octahedral splitting",
        latex: "E(e_g) = +0.6\\,\\Delta_o, \\qquad E(t_{2g}) = -0.4\\,\\Delta_o, \\qquad \\Delta_o = 10\\,\\text{Dq}",
      },
      authoredExample: {
        prompt: "Using crystal field theory, draw the d orbital filling for \\(\\text{[Mn(CN)}_6]^{3-}\\) and predict the number of unpaired electrons and its magnetic behaviour (Z of Mn = 25).",
        steps: [
          "Oxidation state: \\(x + 6(-1) = -3\\), so Mn is +3. Mn is \\(\\text{[Ar]}\\,3d^5 4s^2\\), so \\(\\text{Mn}^{3+}\\) is \\(d^4\\).",
          "\\(\\text{CN}^-\\) is a strong field ligand: \\(\\Delta_o\\) is larger than the pairing energy, so the complex is low spin.",
          "All four electrons go into \\(t_{2g}\\): \\(e_g\\) \\((\\ )(\\ )\\); \\(t_{2g}\\) \\((\\uparrow\\downarrow)(\\uparrow)(\\uparrow)\\), that is \\(t_{2g}^4 e_g^0\\).",
          "Two unpaired electrons: paramagnetic.",
        ],
        answer: "t₂g⁴ e_g⁰, low spin, 2 unpaired electrons, paramagnetic",
      },
      selfCheckExample: {
        prompt: "Predict the d orbital filling and the number of unpaired electrons in \\(\\text{[Fe(H}_2\\text{O)}_6]^{2+}\\) (Z of Fe = 26).",
        steps: [
          "\\(\\text{Fe}^{2+}\\) is \\(d^6\\); \\(\\text{H}_2\\text{O}\\) (O donor) is a weak field ligand, so high spin.",
          "\\(t_{2g}\\) \\((\\uparrow\\downarrow)(\\uparrow)(\\uparrow)\\), \\(e_g\\) \\((\\uparrow)(\\uparrow)\\): \\(t_{2g}^4 e_g^2\\).",
        ],
        answer: "t₂g⁴ e_g², 4 unpaired electrons, paramagnetic",
      },
      practiceSet: [
        { prompt: "Arrange Cl⁻, CN⁻, H₂O and NH₃ in order of increasing field strength.", answer: "\\(\\text{Cl}^- < \\text{H}_2\\text{O} < \\text{NH}_3 < \\text{CN}^-\\)" },
        { prompt: "Why are there no separate high spin and low spin forms for a d³ ion in an octahedral field?", answer: "Its three electrons go singly into the three \\(t_{2g}\\) orbitals whatever the size of \\(\\Delta_o\\)" },
        { prompt: "With the same ligand, which gives the larger \\(\\Delta_o\\): Co²⁺ or Co³⁺?", answer: "\\(\\text{Co}^{3+}\\), the higher oxidation state" },
        { prompt: "Which set of d orbitals is raised in an octahedral field, and by how much?", answer: "\\(e_g\\) (\\(d_{x^2-y^2}\\) and \\(d_{z^2}\\)), by \\(0.6\\Delta_o\\)" },
      ],
      pyqExampleId: "f7a168f9-80a6-4111-9486-61c6986c1ba4",
      traps: [
        {
          title: "The t2g and eg sets upside down",
          body: "In an octahedral field \\(e_g\\) is the upper set, because its lobes point at the ligands. In a tetrahedral field the order is reversed. Label the energy axis and both sets on the diagram.",
        },
        {
          title: "Low spin tetrahedral complexes",
          body: "The tetrahedral splitting is small, so electrons never pair to stay in the lower set. Low spin tetrahedral complexes are not found.",
        },
        {
          title: "A ligand classified without its donor atom",
          body: "Give the reason with the class: \\(\\text{CN}^-\\) is strong field because its donor atom is C; \\(\\text{F}^-\\) is weak field because it is a halogen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-colour",
      name: "Colour of octahedral complexes",
      intuition:
        "White light holds every colour. If a complex has a d electron in the lower set and room in the upper set, the electron can take in exactly the energy of the gap and jump up. That takes one colour out of the light; what reaches your eye is the rest, which we see as the complementary colour.",
      definition:
        "- Splitting of the d orbitals makes a gap \\(\\Delta_o\\) between \\(t_{2g}\\) and \\(e_g\\). It corresponds to a frequency of electromagnetic radiation, usually in the **visible** region.\n" +
        "- Absorbing that light promotes an electron from \\(t_{2g}\\) to \\(e_g\\): a **d-d transition**.\n" +
        "- The complex shows the colour **complementary** to the light absorbed.\n" +
        "- So a complex is coloured when it has d electrons in \\(t_{2g}\\) and a vacancy in \\(e_g\\). VBT cannot explain colour; CFT can.\n" +
        "- 'Explain with an energy level diagram' needs the diagram: the two sets labelled with their orbitals, \\(\\Delta_o\\) marked, and the electrons filled in.",
      table: {
        columns: ["Point", "What to write"],
        rows: [
          { cells: ["Cause of colour", "A d-d transition: an electron moves from \\(t_{2g}\\) to \\(e_g\\) by absorbing light of energy \\(\\Delta_o\\)"] },
          { cells: ["Light absorbed", "Usually in the visible region"] },
          { cells: ["Colour seen", "The colour complementary to the one absorbed"] },
          { cells: ["\\(\\text{[Ti(H}_2\\text{O)}_6]^{3+}\\), \\(3d^1\\)", "\\(\\Delta_o\\) = 20,300 cm⁻¹ (243 kJ/mol); the one \\(t_{2g}\\) electron is promoted to \\(e_g\\); the complex is violet"] },
          { cells: ["Theory needed", "CFT; VBT gives no explanation of colour"] },
        ],
      },
      selfCheckExample: {
        prompt: "\\(\\text{[Co(NH}_3)_6]^{3+}\\) is a low spin \\(d^6\\) complex. Can it show a d-d transition? Give a reason.",
        steps: ["Low spin \\(d^6\\): \\(t_{2g}^6 e_g^0\\).", "The \\(e_g\\) set is empty, so a \\(t_{2g}\\) electron can be promoted into it by absorbing light."],
        answer: "Yes: it has t₂g electrons and an empty e_g set, so it can absorb light and is coloured",
      },
      practiceSet: [
        { prompt: "Is the colour we see the colour of the light the complex absorbs?", answer: "No; we see the complementary colour" },
        { prompt: "Name the electron jump that gives an octahedral complex its colour.", answer: "A d-d transition, from \\(t_{2g}\\) to \\(e_g\\)" },
        { prompt: "Which theory, VBT or CFT, explains why complexes are coloured?", answer: "Crystal field theory" },
      ],
      pyqExampleId: "ddffeccf-073c-4f61-a334-16c390b7e863",
      traps: [
        {
          title: "Naming the absorbed colour as the colour seen",
          body: "[Ti(H₂O)₆]³⁺ looks violet because it absorbs other wavelengths. Say the complex shows the colour complementary to the light absorbed.",
        },
      ],
    },
  ],
};
