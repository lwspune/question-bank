import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_BONDING_NOTE: SubtopicNote = {
  subtopicName: "Bonding in Coordination Compounds",
  title: "Bonding in Complexes: Valence Bond Theory, Magnetism, Crystal Field Theory and Colour",
  oneLineDefinition:
    "Valence bond theory (hybridisation, shape, inner and outer orbital complexes), the spin-only magnetic moment, crystal field splitting in octahedral and tetrahedral fields with Δo against the pairing energy P, the spectrochemical series, and why complexes are coloured.",
  whyItMatters:
    "87 questions, sixty-eight of them from board papers, in every year from 2022 to 2026: by far the most-asked page of the chapter. Every year the board asks the hybridisation, shape and magnetic behaviour of a complex by valence bond theory, and the t₂g and eg configuration of a d⁴ or d⁵ ion when Δo is more or less than P. It also asks inner against outer orbital complexes such as [Co(NH₃)₆]³⁺ and [Ni(NH₃)₆]²⁺ (2022, 2023, 2025), why low spin tetrahedral complexes are rare (2023, 2025), Δt = (4/9)Δo (2023, 2024), which d orbitals are raised (2026), the spin-only magnetic moment (2022, 2023) and the colour of [Ti(H₂O)₆]³⁺ and what heating does to it (2024, 2025, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbccc-vbt",
      name: "Valence bond theory: hybridisation, shape, inner and outer orbital complexes",
      intuition:
        "The metal ion makes empty orbitals ready for the ligands' lone pairs by mixing them into equivalent hybrid orbitals. For six ligands it needs two d orbitals. If a strong ligand pushes the 3d electrons into pairs, two inner 3d orbitals fall empty and are used: d²sp³, an inner orbital complex with few unpaired electrons. If the electrons stay spread out, the metal must reach out to the 4d orbitals: sp³d², an outer orbital complex with many unpaired electrons.",
      definition:
        "- The metal atom or ion uses its \\((n-1)d, ns, np\\) or \\(ns, np, nd\\) orbitals for hybridisation, giving equivalent orbitals of a definite geometry. Each hybrid orbital accepts an electron pair from a ligand.\n" +
        "- **Method:** find the oxidation state and the d-electron count; decide whether the ligand pairs the electrons; see which orbitals are left empty; name the hybridisation, shape and magnetic behaviour.\n" +
        "- **\\(d^2sp^3\\)**, octahedral: two inner \\(3d\\) orbitals are used. An **inner orbital, low spin** or spin paired complex, as \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\) (diamagnetic).\n" +
        "- **\\(sp^3d^2\\)**, octahedral: two outer \\(4d\\) orbitals are used. An **outer orbital, high spin** or spin free complex, as \\([\\text{CoF}_6]^{3-}\\) (paramagnetic, four unpaired electrons).\n" +
        "- **\\(sp^3\\)**, tetrahedral: \\([\\text{NiCl}_4]^{2-}\\) (\\(\\text{Ni}^{2+}\\), \\(3d^8\\), two unpaired, paramagnetic) and \\([\\text{Ni}(\\text{CO})_4]\\) (nickel in the zero oxidation state, no unpaired electron, diamagnetic).\n" +
        "- **\\(dsp^2\\)**, square planar: \\([\\text{Ni}(\\text{CN})_4]^{2-}\\); the electrons pair and one \\(3d\\) orbital is used; diamagnetic.\n" +
        "- Ions with up to three d electrons (\\(\\text{Ti}^{3+}\\), \\(\\text{V}^{3+}\\), \\(\\text{Cr}^{3+}\\)) always have two empty 3d orbitals, so they give \\(d^2sp^3\\) whatever the ligand. For \\(d^4\\), \\(d^5\\), \\(d^6\\) two 3d orbitals fall empty only if the electrons pair.\n" +
        "- **Limitations of VBT:** it involves a number of assumptions; gives no quantitative interpretation of magnetic data; does not explain colour; gives no quantitative interpretation of thermodynamic or kinetic stability; makes no exact prediction between tetrahedral and square planar for 4-coordinate complexes; does not distinguish weak and strong ligands.",
      table: {
        columns: ["Complex", "Metal ion", "Hybridisation and shape", "Orbitals used", "Unpaired electrons"],
        rows: [
          { cells: ["[Co(NH₃)₆]³⁺", "Co³⁺, 3d⁶", "d²sp³, octahedral", "Inner (3d), low spin", "0, diamagnetic"] },
          { cells: ["[CoF₆]³⁻", "Co³⁺, 3d⁶", "sp³d², octahedral", "Outer (4d), high spin", "4, paramagnetic"] },
          { cells: ["[Fe(CN)₆]³⁻", "Fe³⁺, 3d⁵", "d²sp³, octahedral", "Inner (3d), low spin", "1, weakly paramagnetic"] },
          { cells: ["[FeF₆]³⁻", "Fe³⁺, 3d⁵", "sp³d², octahedral", "Outer (4d), high spin", "5, strongly paramagnetic"] },
          { cells: ["[Ni(NH₃)₆]²⁺", "Ni²⁺, 3d⁸", "sp³d², octahedral", "Outer (4d): only one 3d can be freed", "2, paramagnetic"] },
          { cells: ["[Cr(NH₃)₆]³⁺", "Cr³⁺, 3d³", "d²sp³, octahedral", "Inner (3d)", "3, paramagnetic"] },
          { cells: ["[NiCl₄]²⁻", "Ni²⁺, 3d⁸", "sp³, tetrahedral", "4s and 4p only", "2, paramagnetic"] },
          { cells: ["[Ni(CO)₄]", "Ni(0), 3d⁸4s² becomes 3d¹⁰", "sp³, tetrahedral", "4s and 4p only", "0, diamagnetic"] },
          { cells: ["[Ni(CN)₄]²⁻", "Ni²⁺, 3d⁸", "dsp², square planar", "One inner 3d", "0, diamagnetic"] },
        ],
      },
      selfCheckExample: {
        prompt: "\\([\\text{Mn}(\\text{CN})_6]^{3-}\\) has the magnetic moment of two unpaired electrons. Give its hybridisation and say whether it is an inner or outer orbital complex. (Atomic number of Mn = 25)",
        steps: [
          "Six \\(\\text{CN}^{-}\\) give \\(-6\\) against \\(-3\\), so manganese is +3: \\(\\text{Mn}^{3+}\\) is \\(3d^4\\).",
          "Two unpaired electrons means the four 3d electrons have paired into three orbitals, leaving two 3d orbitals empty.",
          "Those two 3d, one 4s and three 4p orbitals give \\(d^2sp^3\\): octahedral, inner orbital, paramagnetic.",
        ],
        answer: "\\(d^2sp^3\\), octahedral; an inner orbital (low spin) complex",
      },
      practiceSet: [
        { prompt: "Give the hybridisation and magnetic behaviour of \\([\\text{Co}(\\text{C}_2\\text{O}_4)_3]^{3-}\\). (Co = 27)", answer: "\\(d^2sp^3\\), inner orbital; diamagnetic, since all six \\(3d\\) electrons of \\(\\text{Co}^{3+}\\) are paired" },
        { prompt: "Give the hybridisation and shape of \\([\\text{MnCl}_6]^{3-}\\), which has four unpaired electrons. (Mn = 25)", answer: "\\(sp^3d^2\\), octahedral; an outer orbital (high spin) complex" },
        { prompt: "Name two limitations of valence bond theory.", answer: "Any two: it does not explain colour; it gives no quantitative interpretation of magnetic data; it does not distinguish weak and strong ligands; it cannot predict tetrahedral or square planar for 4-coordinate complexes" },
      ],
      pyqExampleId: "f573e370-a6e5-40ad-b12a-c7817eff12aa",
      traps: [
        {
          title: "Giving nickel +2 in Ni(CO)₄",
          body: "CO is neutral and the complex is neutral, so nickel is in the zero oxidation state, \\(3d^8 4s^2\\). Its 4s electrons are pushed into 3d, giving \\(3d^{10}\\): no unpaired electron, \\(sp^3\\), diamagnetic.",
        },
        {
          title: "Expecting Ni²⁺ to give d²sp³",
          body: "\\(\\text{Ni}^{2+}\\) is \\(3d^8\\). Even with every electron paired, eight electrons fill four 3d orbitals and only one is left, so an octahedral nickel(II) complex is always \\(sp^3d^2\\), outer orbital.",
        },
        {
          title: "Hybridisation alone for a three-part answer",
          body: "\"Hybridisation and magnetic behaviour\" carries a mark for each. Write the oxidation state and d count, the orbital picture in words, the hybridisation with its shape, and para or diamagnetic with the number of unpaired electrons.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbccc-magnetic",
      name: "Unpaired electrons and the spin-only magnetic moment",
      intuition:
        "Each unpaired electron is a tiny magnet; paired electrons cancel. So the magnetism of a complex tells you how many electrons are unpaired, and that tells you whether the ligand paired them up. More unpaired electrons, larger moment. None at all, and the complex is diamagnetic.",
      definition:
        "- The magnetic moment of a complex is measured by magnetic susceptibility experiments and tells the number of unpaired electrons, and hence the structure.\n" +
        "- **Spin-only formula** (from the d- and f-block chapter): \\(\\mu = \\sqrt{n(n+2)}\\) BM, where \\(n\\) is the number of unpaired electrons.\n" +
        "- **Steps:** oxidation state of the metal, then its d-electron count, then decide whether the ligand pairs the electrons (strong field) or not (weak field), then count \\(n\\), then put \\(n\\) in the formula.\n" +
        "- Values: \\(n = 1\\): 1.73 BM; \\(n = 2\\): 2.83 BM; \\(n = 3\\): 3.87 BM; \\(n = 4\\): 4.90 BM; \\(n = 5\\): 5.92 BM.\n" +
        "- \\(n > 0\\): **paramagnetic**. \\(n = 0\\): **diamagnetic**. Fewer unpaired electrons (one, as in \\([\\text{Fe}(\\text{CN})_6]^{3-}\\)) means weakly paramagnetic; five (as in \\([\\text{Fe}(\\text{H}_2\\text{O})_6]^{3+}\\)) means strongly paramagnetic.\n" +
        "- The moment can fix the shape: \\([\\text{MnBr}_4]^{2-}\\) has 5.9 BM, so five unpaired electrons, so it is tetrahedral (\\(sp^3\\)), not square planar (\\(dsp^2\\)).",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "spin-only magnetic moment in Bohr magnetons (BM)" },
          { symbol: "\\(n\\)", meaning: "number of unpaired electrons" },
        ],
      },
      authoredExample: {
        prompt: "Calculate the spin-only magnetic moment of \\([\\text{MnCl}_6]^{3-}\\). Chloride is a weak field ligand. (Atomic number of Mn = 25)",
        steps: [
          "Given: six \\(\\text{Cl}^{-}\\) give \\(-6\\) against \\(-3\\), so Mn is +3. Mn is \\([\\text{Ar}]3d^5 4s^2\\), so \\(\\text{Mn}^{3+}\\) is \\(3d^4\\).",
          "Weak field: no pairing, \\(t_{2g}^{3}e_g^{1}\\), so \\(n = 4\\).",
          "Formula: \\(\\mu = \\sqrt{n(n+2)}\\).",
          "Substitution: \\(\\mu = \\sqrt{4 \\times 6} = \\sqrt{24} = 4.90\\) BM.",
        ],
        answer: "μ = 4.90 BM; the complex is paramagnetic",
      },
      selfCheckExample: {
        prompt: "Find the spin-only magnetic moment of \\([\\text{Mn}(\\text{H}_2\\text{O})_6]^{2+}\\), with water as a weak field ligand. (Mn = 25)",
        steps: ["\\(\\text{Mn}^{2+}\\) is \\(3d^5\\); weak field, so \\(t_{2g}^{3}e_g^{2}\\) and \\(n = 5\\).", "\\(\\mu = \\sqrt{5 \\times 7} = \\sqrt{35} = 5.92\\) BM."],
        answer: "5.92 BM",
      },
      practiceSet: [
        { prompt: "What is the magnetic moment of \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\)? (Co = 27)", answer: "0 BM: \\(\\text{Co}^{3+}\\) is \\(3d^6\\), all paired as \\(t_{2g}^{6}\\), so it is diamagnetic" },
        { prompt: "A complex has a magnetic moment of 3.87 BM. How many unpaired electrons does it have?", answer: "Three, since \\(\\sqrt{3 \\times 5} = 3.87\\)" },
        { prompt: "Find the spin-only magnetic moment of \\([\\text{Fe}(\\text{CN})_6]^{3-}\\). (Fe = 26)", answer: "\\(\\text{Fe}^{3+}\\) is \\(3d^5\\); cyanide pairs them to \\(t_{2g}^{5}\\), \\(n = 1\\), so \\(\\mu = \\sqrt{3} = 1.73\\) BM" },
      ],
      pyqExampleId: "589d8ef0-b0f9-47aa-8d53-b1005f7fa6b8",
      traps: [
        {
          title: "Putting the d-electron count in the formula",
          body: "\\(n\\) is the number of UNPAIRED electrons. \\(\\text{Co}^{3+}\\) has six d electrons but, with ammonia, none unpaired, so its moment is zero.",
        },
        {
          title: "Leaving out the unit",
          body: "A magnetic moment is in Bohr magnetons. Write BM after the number, and show \\(\\sqrt{n(n+2)}\\) with your \\(n\\) put in, since the formula and the substitution each carry marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbccc-cft",
      name: "Crystal field splitting, Δo against P, and the spectrochemical series",
      intuition:
        "Treat the ligands as negative point charges. In an octahedron they come in along the x, y and z axes, so the two d orbitals that point along the axes are pushed up and the three that point between the axes drop. Now each extra electron has a choice: pay the splitting energy Δo to go up, or pay the pairing energy P to pair below. It takes the cheaper road.",
      definition:
        "- CFT is an electrostatic model: ligands are point charges (anions) or point dipoles (neutral molecules). In a free ion the five d orbitals are **degenerate**; an asymmetric field of ligands lifts this degeneracy. The energy gap is the **crystal field splitting energy**.\n" +
        "- **Octahedral:** \\(d_{x^2-y^2}\\) and \\(d_{z^2}\\) point along the axes, towards the ligands, and are raised: the \\(e_g\\) set, up by \\(\\tfrac{3}{5}\\Delta_o\\). \\(d_{xy}, d_{yz}, d_{xz}\\) point between the axes and are lowered: the \\(t_{2g}\\) set, down by \\(\\tfrac{2}{5}\\Delta_o\\).\n" +
        "- \\(\\Delta_o\\) depends on the field produced by the ligand and on the charge on the metal ion.\n" +
        "- **Spectrochemical series** (increasing field strength, found from the absorption of light): \\(\\text{I}^- < \\text{Br}^- < \\text{SCN}^- < \\text{Cl}^- < \\text{S}^{2-} < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NCS}^- < \\text{edta}^{4-} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}\\).\n" +
        "- \\(d^1\\) to \\(d^3\\): electrons go singly into \\(t_{2g}\\) (Hund's rule). From \\(d^4\\): if \\(\\Delta_o < P\\), the next electron goes up to \\(e_g\\) (**weak field ligand, high spin**): \\(d^4\\) is \\(t_{2g}^{3}e_g^{1}\\). If \\(\\Delta_o > P\\), it pairs in \\(t_{2g}\\) (**strong field ligand, low spin**): \\(d^4\\) is \\(t_{2g}^{4}e_g^{0}\\).\n" +
        "- **Tetrahedral:** the splitting is **inverted** (the \\(t_2\\) set of \\(d_{xy}, d_{yz}, d_{xz}\\) is higher, the \\(e\\) set lower) and smaller: \\(\\Delta_t = \\tfrac{4}{9}\\Delta_o\\). It is not large enough to force pairing, so **low spin tetrahedral complexes are rarely observed**. No g subscript is used, since a tetrahedron has no centre of symmetry.\n" +
        "- **Limitation of CFT:** treating ligands as point charges says anionic ligands should split most, yet they are at the low end of the series; and CFT ignores the covalent character of the metal-ligand bond.",
      formula: {
        label: "Which road the electron takes, and the tetrahedral splitting",
        latex: "\\Delta_o < P:\\ \\text{high spin (weak field)} \\qquad \\Delta_o > P:\\ \\text{low spin (strong field)} \\qquad \\Delta_t = \\tfrac{4}{9}\\,\\Delta_o",
        symbols: [
          { symbol: "\\(\\Delta_o\\)", meaning: "crystal field splitting energy in an octahedral field" },
          { symbol: "\\(P\\)", meaning: "pairing energy, the energy needed to pair two electrons in one orbital" },
          { symbol: "\\(\\Delta_t\\)", meaning: "crystal field splitting energy in a tetrahedral field" },
        ],
      },
      authoredExample: {
        prompt: "Write the d-orbital configuration of the \\(d^6\\) ion \\(\\text{Fe}^{2+}\\) in \\([\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}\\) and in \\([\\text{Fe}(\\text{CN})_6]^{4-}\\), and say which is high spin.",
        steps: [
          "Water is low in the spectrochemical series: \\(\\Delta_o < P\\). Electrons spread out before pairing: \\(t_{2g}^{4}e_g^{2}\\), four unpaired.",
          "Cyanide is near the top of the series: \\(\\Delta_o > P\\). All six pair in the lower set: \\(t_{2g}^{6}e_g^{0}\\), none unpaired.",
          "More unpaired electrons means high spin.",
        ],
        answer: "Aqua complex \\(t_{2g}^{4}e_g^{2}\\) (high spin); cyanido complex \\(t_{2g}^{6}e_g^{0}\\) (low spin)",
      },
      selfCheckExample: {
        prompt: "Write the configuration of a \\(d^7\\) ion in an octahedral field with \\(\\Delta_o < P\\), and give its number of unpaired electrons.",
        steps: ["Weak field: five electrons go singly into all five orbitals, then the next two pair in \\(t_{2g}\\).", "\\(t_{2g}^{5}e_g^{2}\\): two paired orbitals and three single electrons."],
        answer: "\\(t_{2g}^{5}e_g^{2}\\), three unpaired electrons",
      },
      practiceSet: [
        { prompt: "Write the configuration of a \\(d^5\\) ion when \\(\\Delta_o > P\\).", answer: "\\(t_{2g}^{5}e_g^{0}\\), one unpaired electron (low spin)" },
        { prompt: "For a metal and ligand with \\(\\Delta_o = 18000\\ \\text{cm}^{-1}\\), what is \\(\\Delta_t\\) for the same metal, ligands and distances?", answer: "\\(\\Delta_t = \\tfrac{4}{9} \\times 18000 = 8000\\ \\text{cm}^{-1}\\)" },
        { prompt: "Using \\(\\Delta_o\\) and P, how do a strong field and a weak field ligand differ?", answer: "A strong field ligand gives \\(\\Delta_o > P\\) and a low spin complex; a weak field ligand gives \\(\\Delta_o < P\\) and a high spin complex" },
      ],
      pyqExampleId: "6ead122e-08de-48c4-83c7-0c9b59439088",
      traps: [
        {
          title: "Swapping the two configurations",
          body: "\\(\\Delta_o < P\\) means pairing costs more, so the electrons go UP: a \\(d^5\\) ion becomes \\(t_{2g}^{3}e_g^{2}\\). \\(\\Delta_o > P\\) means they pair BELOW: \\(t_{2g}^{5}e_g^{0}\\). Decide by which energy is smaller each time.",
        },
        {
          title: "Using the octahedral pattern for a tetrahedron",
          body: "In a tetrahedral field \\(d_{xy}, d_{yz}, d_{xz}\\) are the ones raised, and the splitting is only four-ninths as large. A 2026 MCQ asked exactly which set is repelled more in each case.",
        },
        {
          title: "A reason for rare low spin tetrahedral complexes without the comparison",
          body: "Say that \\(\\Delta_t\\) is small (four-ninths of \\(\\Delta_o\\)) and so is less than the pairing energy, so the electrons do not pair. The 2023 assertion-reason item on this was code (A).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-colour",
      name: "Colour of complexes: d-d transitions",
      intuition:
        "White light falls on the complex. An electron in the lower d set soaks up just the light whose energy equals the gap and jumps to the upper set. That colour is removed, and your eye sees what is left: the complementary colour. No gap, or no electron to jump, or no space to jump into, and nothing is absorbed: the compound is colourless.",
      definition:
        "- The colour of a complex is **complementary** to the colour of light it absorbs. If green light is absorbed, the complex appears red.\n" +
        "- CFT explains it by a **d-d transition**. In \\([\\text{Ti}(\\text{H}_2\\text{O})_6]^{3+}\\), \\(\\text{Ti}^{3+}\\) is \\(3d^1\\); the electron is in \\(t_{2g}\\). It absorbs light of the **blue-green** region (498 nm) and is excited to \\(e_g\\): \\(t_{2g}^{1}e_g^{0} \\rightarrow t_{2g}^{0}e_g^{1}\\). So the complex appears **violet**.\n" +
        "- **In the absence of ligands** there is no crystal field splitting, and the substance is colourless. Heating \\([\\text{Ti}(\\text{H}_2\\text{O})_6]\\text{Cl}_3\\) removes the water and makes it colourless; anhydrous \\(\\text{CuSO}_4\\) is white but \\(\\text{CuSO}_4\\cdot 5\\text{H}_2\\text{O}\\) is blue.\n" +
        "- A d-d transition needs an electron in the lower set and room in the upper set. \\(d^0\\) (\\(\\text{Sc}^{3+}\\)) and \\(d^{10}\\) (\\(\\text{Zn}^{2+}\\)) complexes are colourless.\n" +
        "- The ligand changes the colour: adding en to green \\([\\text{Ni}(\\text{H}_2\\text{O})_6]^{2+}\\) step by step gives pale blue, then blue or purple, then violet \\([\\text{Ni}(\\text{en})_3]^{2+}\\).\n" +
        "- A stronger field ligand gives a larger \\(\\Delta_o\\), so the complex absorbs light of higher energy, that is shorter wavelength (\\(E = hc/\\lambda\\)).\n" +
        "- Gem stones: ruby is \\(\\text{Al}_2\\text{O}_3\\) with 0.5 to 1% \\(\\text{Cr}^{3+}\\); d-d transitions of the octahedral \\(\\text{Cr}^{3+}\\) give its colour.",
      table: {
        columns: ["Coordination entity", "Wavelength absorbed (nm)", "Colour absorbed", "Colour seen"],
        rows: [
          { cells: ["[CoCl(NH₃)₅]²⁺", "535", "Yellow", "Violet"] },
          { cells: ["[Co(NH₃)₅(H₂O)]³⁺", "500", "Blue green", "Red"] },
          { cells: ["[Co(NH₃)₆]³⁺", "475", "Blue", "Yellow orange"] },
          { cells: ["[Co(CN)₆]³⁻", "310", "Ultraviolet, not in the visible region", "Pale yellow"] },
          { cells: ["[Cu(H₂O)₄]²⁺", "600", "Red", "Blue"] },
          { cells: ["[Ti(H₂O)₆]³⁺", "498", "Blue green", "Violet"] },
        ],
      },
      selfCheckExample: {
        prompt: "Anhydrous copper sulphate is white, but \\(\\text{CuSO}_4\\cdot 5\\text{H}_2\\text{O}\\) is blue. Explain.",
        steps: [
          "In the hydrate, water ligands split the d orbitals of \\(\\text{Cu}^{2+}\\), so a d-d transition absorbs visible light and the complementary colour, blue, is seen.",
          "With no water ligands there is no crystal field splitting, no d-d transition, and so no colour.",
        ],
        answer: "The water ligands cause the splitting needed for the d-d transition; without them the salt is white",
      },
      practiceSet: [
        { prompt: "Why is \\([\\text{Sc}(\\text{H}_2\\text{O})_6]^{3+}\\) colourless? (Sc = 21)", answer: "\\(\\text{Sc}^{3+}\\) is \\(3d^0\\): there is no d electron to undergo a d-d transition" },
        { prompt: "Which absorbs light of shorter wavelength, \\([\\text{Co}(\\text{NH}_3)_6]^{3+}\\) or \\([\\text{Co}(\\text{CN})_6]^{3-}\\)? Why?", answer: "\\([\\text{Co}(\\text{CN})_6]^{3-}\\) (310 nm against 475 nm): \\(\\text{CN}^{-}\\) is a stronger field ligand, so \\(\\Delta_o\\) is larger" },
        { prompt: "What happens to the colour of \\([\\text{Ti}(\\text{H}_2\\text{O})_6]\\text{Cl}_3\\) on heating, and why?", answer: "It becomes colourless: the water ligands are removed, so there is no splitting and no d-d transition" },
      ],
      pyqExampleId: "cb114e17-dcf6-43ce-bd4c-d49822f2ddeb",
      traps: [
        {
          title: "Naming the absorbed colour as the colour seen",
          body: "\\([\\text{Ti}(\\text{H}_2\\text{O})_6]^{3+}\\) absorbs blue-green light and looks violet. Write both: what is absorbed and that the complementary colour is seen.",
        },
        {
          title: "Saying heating changes the metal",
          body: "On heating, titanium stays \\(\\text{Ti}^{3+}\\). The colour goes because the ligands are lost, and without ligands there is no crystal field splitting.",
        },
      ],
    },
  ],
};
