import type { SubtopicNote } from "@/app/notes/_types";

export const SPLITTING_COORD_NOTE: SubtopicNote = {
  subtopicName: "Crystal Field Theory and d-Orbital Splitting",
  title: "Crystal Field Splitting, the Spectrochemical Series and Colour",
  oneLineDefinition:
    "Ligands split the five d orbitals into two sets, t₂g below eg in an octahedron and e below t₂ in a tetrahedron; the gap grows along the spectrochemical series and with the metal's charge, and the light a complex absorbs to cross it sets its colour.",
  whyItMatters:
    "Twenty-eight PYQs, twenty-four of them multiple choice, and seven from 2026. Five test the splitting pattern itself, octahedral or tetrahedral; eight order ligands or complexes by field strength; fifteen turn the splitting into the wavelength, energy or colour of the light absorbed.",
  concepts: [
    // C1 — splitting pattern
    {
      kind: "formula" as const,
      slug: "jccoord-splitting",
      name: "Octahedral and tetrahedral splitting of the d orbitals",
      intuition:
        "In a free ion the five d orbitals have the same energy. Bring six ligands in along the x, y and z axes and the two orbitals that point at them, \\(d_{x^2-y^2}\\) and \\(d_{z^2}\\) (the eg set), are pushed up; the three that point between the axes, \\(d_{xy}\\), \\(d_{xz}\\), \\(d_{yz}\\) (the t₂g set), drop. In a tetrahedron the ligands come in between the axes, so the pattern turns upside down and the gap is smaller.",
      definition:
        "- Octahedral: eg rises by \\(+0.6\\Delta_o\\), t₂g falls by \\(-0.4\\Delta_o\\). The average energy (barycentre) is unchanged: \\(2(+0.6) + 3(-0.4) = 0\\).\n" +
        "- Tetrahedral: e (\\(d_{x^2-y^2}\\), \\(d_{z^2}\\)) lies LOWER at \\(-0.6\\Delta_t\\); t₂ (\\(d_{xy}\\), \\(d_{xz}\\), \\(d_{yz}\\)) lies higher at \\(+0.4\\Delta_t\\).\n" +
        "- For the same metal, ligands and distance, \\(\\Delta_t = \\tfrac{4}{9}\\Delta_o\\). So \\(\\Delta_t\\) is almost always smaller than the pairing energy, and tetrahedral complexes are high spin.\n" +
        "- Crystal field theory treats ligands as point charges. It explains colour and magnetism but not the ORDER of the spectrochemical series, and it ignores covalent bonding.",
      formula: {
        label: "Crystal field splitting",
        latex:
          "E(e_g) = +0.6\\Delta_o,\\; E(t_{2g}) = -0.4\\Delta_o \\qquad E(t_2) = +0.4\\Delta_t,\\; E(e) = -0.6\\Delta_t \\qquad \\Delta_t = \\tfrac{4}{9}\\Delta_o",
      },
      authoredExample: {
        prompt:
          "For an octahedral complex \\(\\Delta_o = 18\\,000\\) cm\\(^{-1}\\). Find the energies of the eg and t₂g sets relative to the barycentre, and \\(\\Delta_t\\) for a tetrahedral complex of the same metal and ligand.",
        steps: [
          "eg: \\(+0.6 \\times 18\\,000 = +10\\,800\\) cm\\(^{-1}\\).",
          "t₂g: \\(-0.4 \\times 18\\,000 = -7200\\) cm\\(^{-1}\\). Check: \\(10\\,800 - (-7200) = 18\\,000\\).",
          "\\(\\Delta_t = \\tfrac{4}{9} \\times 18\\,000 = 8000\\) cm\\(^{-1}\\).",
        ],
        answer: "eg at +10 800 cm⁻¹, t₂g at −7200 cm⁻¹; Δt = 8000 cm⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "An octahedral complex has \\(\\Delta_o = 13\\,500\\) cm\\(^{-1}\\). Find \\(\\Delta_t\\) for the tetrahedral complex of the same metal and ligand, and the energy of its t₂ set relative to the barycentre.",
        steps: [
          "\\(\\Delta_t = \\tfrac{4}{9} \\times 13\\,500 = 6000\\) cm\\(^{-1}\\).",
          "In a tetrahedron t₂ is the UPPER set: \\(+0.4 \\times 6000 = +2400\\) cm\\(^{-1}\\).",
        ],
        answer: "Δt = 6000 cm⁻¹; t₂ lies at +2400 cm⁻¹.",
      },
      practiceSet: [
        { prompt: "Which set of d orbitals lies lower in a tetrahedral field?", answer: "e (\\(d_{x^2-y^2}\\) and \\(d_{z^2}\\))" },
        { prompt: "What is \\(\\Delta_t/\\Delta_o\\) for the same metal, ligands and distance?", answer: "4/9" },
        { prompt: "By how much does one electron in an eg orbital raise the energy of an octahedral complex?", answer: "\\(+0.6\\Delta_o\\)" },
        { prompt: "Which orbitals form the t₂g set?", answer: "\\(d_{xy}\\), \\(d_{xz}\\), \\(d_{yz}\\)" },
      ],
      pyqExampleId: "eb045336-788b-4e27-a051-659200d62030", // 2026 — energies of d orbitals in a tetrahedral field
      traps: [
        {
          title: "The tetrahedral pattern is upside down",
          body: "In a tetrahedron \\(d_{xy}\\), \\(d_{xz}\\), \\(d_{yz}\\) lie ABOVE \\(d_{x^2-y^2}\\) and \\(d_{z^2}\\). Writing the octahedral order for a tetrahedral complex such as \\(\\mathrm{[NiCl_4]^{2-}}\\) reverses every comparison.",
        },
        {
          title: "Convert Δt to Δo with 9/4",
          body: "If a tetrahedral complex absorbs light of energy \\(\\Delta_t\\), the octahedral splitting for the same metal and ligand is \\(\\tfrac{9}{4}\\Delta_t\\), not \\(\\Delta_t\\). Forgetting the factor gives an answer 4/9 of the right one.",
        },
      ],
    },

    // C2 — spectrochemical series
    {
      kind: "reference" as const,
      slug: "jccoord-spectrochemical",
      name: "Spectrochemical series and the size of the splitting",
      intuition:
        "The same metal ion splits its d orbitals by different amounts with different ligands. Listing ligands by the splitting they cause gives the spectrochemical series: halides at the weak end, water in the middle, ammonia and en above it, cyanide and CO at the strong end. The metal matters too: a higher charge and a heavier metal both widen the gap.",
      definition:
        "- NCERT series, weak to strong: \\(\\mathrm{I^- < Br^- < SCN^- < Cl^- < S^{2-} < F^- < OH^- < C_2O_4^{2-} < H_2O < NCS^- < EDTA^{4-} < NH_3 < en < CN^- < CO}\\).\n" +
        "- \\(\\mathrm{SCN^-}\\) (S-bonded) is weak; \\(\\mathrm{NCS^-}\\) (N-bonded) is above water.\n" +
        "- Same ligand, higher metal charge: larger \\(\\Delta_o\\) (\\(\\mathrm{M^{3+} > M^{2+}}\\)).\n" +
        "- Same ligand and charge, down a group: 3d < 4d < 5d, so \\(\\mathrm{[Os(H_2O)_6]^{3+}}\\) has a larger \\(\\Delta_o\\) than \\(\\mathrm{[Fe(H_2O)_6]^{3+}}\\).\n" +
        "- Measured \\(\\Delta_o\\) for chromium(III): \\(\\mathrm{[CrF_6]^{3-}}\\) 15 060, \\(\\mathrm{[Cr(H_2O)_6]^{3+}}\\) 17 400, \\(\\mathrm{[Cr(en)_3]^{3+}}\\) 22 300, \\(\\mathrm{[Cr(CN)_6]^{3-}}\\) 26 600 cm\\(^{-1}\\).",
      table: {
        columns: ["Ligand", "Donor atom", "Place in the series", "Field"],
        rows: [
          { cells: ["\\(\\mathrm{I^-}\\), \\(\\mathrm{Br^-}\\)", "I, Br", "Weakest", "Weak"] },
          { cells: ["\\(\\mathrm{SCN^-}\\)", "S", "Between Br⁻ and Cl⁻", "Weak"] },
          { cells: ["\\(\\mathrm{Cl^-}\\), \\(\\mathrm{S^{2-}}\\), \\(\\mathrm{F^-}\\)", "Cl, S, F", "Below OH⁻", "Weak"] },
          { cells: ["\\(\\mathrm{OH^-}\\), \\(\\mathrm{C_2O_4^{2-}}\\)", "O", "Just below water", "Weak"] },
          { cells: ["\\(\\mathrm{H_2O}\\)", "O", "Middle of the series", "Weak for most M²⁺; strong enough to pair Co³⁺"] },
          { cells: ["\\(\\mathrm{NCS^-}\\), \\(\\mathrm{EDTA^{4-}}\\)", "N; N and O", "Just above water", "Intermediate"] },
          { cells: ["\\(\\mathrm{NH_3}\\), en", "N", "Above EDTA⁴⁻; en above NH₃", "Strong for M³⁺"] },
          { cells: ["\\(\\mathrm{CN^-}\\), CO", "C", "Strongest", "Strong"], noteAmber: "CO is neutral yet the strongest ligand: its π back-bonding, not its charge, widens the gap." },
        ],
        caption: "Weak to strong: I⁻ < Br⁻ < SCN⁻ < Cl⁻ < S²⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < CN⁻ < CO.",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{[Rh(H_2O)_6]^{3+}}\\), \\(\\mathrm{[Co(H_2O)_6]^{3+}}\\) and \\(\\mathrm{[Ir(H_2O)_6]^{3+}}\\) in increasing order of \\(\\Delta_o\\).",
        steps: [
          "Same ligand and same charge, so only the metal changes.",
          "Co, Rh and Ir are in the same group: 3d, 4d and 5d. The splitting grows down the group.",
        ],
        answer: "\\(\\mathrm{[Co(H_2O)_6]^{3+} < [Rh(H_2O)_6]^{3+} < [Ir(H_2O)_6]^{3+}}\\)",
      },
      practiceSet: [
        { prompt: "Which is the stronger field ligand, \\(\\mathrm{F^-}\\) or \\(\\mathrm{OH^-}\\)?", answer: "\\(\\mathrm{OH^-}\\)" },
        { prompt: "Which is the stronger field ligand, en or \\(\\mathrm{NH_3}\\)?", answer: "en" },
        { prompt: "Which has the larger \\(\\Delta_o\\): \\(\\mathrm{[Fe(H_2O)_6]^{2+}}\\) or \\(\\mathrm{[Fe(H_2O)_6]^{3+}}\\)?", answer: "\\(\\mathrm{[Fe(H_2O)_6]^{3+}}\\)" },
        { prompt: "Arrange \\(\\mathrm{I^-}\\), \\(\\mathrm{NH_3}\\), \\(\\mathrm{OH^-}\\) and CO by increasing field strength.", answer: "\\(\\mathrm{I^- < OH^- < NH_3 < CO}\\)" },
      ],
      pyqExampleId: "804b60e2-f870-4b61-8253-a398062d4874", // 2024 — ligands in increasing field strength
      traps: [
        {
          title: "S-bonded thiocyanate is weak, N-bonded is not",
          body: "\\(\\mathrm{SCN^-}\\) bonded through sulphur sits between Br⁻ and Cl⁻. Bonded through nitrogen, \\(\\mathrm{NCS^-}\\) sits above water. Read which atom the question binds.",
        },
        {
          title: "Splitting energy and CFSE are different quantities",
          body: "\\(\\Delta_o\\) is the gap; the CFSE is that gap times a factor set by the d count. Among the hexaaqua ions of Ti³⁺, Cr³⁺, Mn³⁺ and Fe³⁺, a 2023 key picked Cr³⁺ for the 'highest \\(\\Delta_o\\)'. That is true of the CFSE in \\(\\Delta_o\\) units (\\(-1.2\\Delta_o\\) for d³), not of the measured gap.",
        },
      ],
    },

    // C3 — colour and absorbed wavelength
    {
      kind: "formula" as const,
      slug: "jccoord-colour",
      name: "Colour, absorbed wavelength and the splitting energy",
      intuition:
        "A d–d transition lifts an electron across the gap, so the complex absorbs light whose energy equals the splitting. A bigger gap means higher energy, so a SHORTER wavelength. What you see is the colour left behind, the complement of the colour absorbed. No d electrons (d⁰) or a full set (d¹⁰) means no d–d transition and usually no colour.",
      definition:
        "- \\(\\Delta = h\\nu = \\dfrac{hc}{\\lambda}\\) per ion; multiply by \\(N_A\\) for kJ mol\\(^{-1}\\). Wavenumber \\(\\bar{\\nu} = 1/\\lambda\\) rises with \\(\\Delta\\).\n" +
        "- Stronger ligand → larger \\(\\Delta\\) → shorter \\(\\lambda\\) absorbed. For cobalt(III): \\(\\mathrm{[Co(CN)_6]^{3-}}\\) 310 nm < \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) 475 nm < \\(\\mathrm{[CoCl(NH_3)_5]^{2+}}\\) 535 nm.\n" +
        "- Adding en to \\(\\mathrm{[Ni(H_2O)_6]^{2+}}\\) (green) gives pale blue, then blue, then violet \\(\\mathrm{[Ni(en)_3]^{2+}}\\) as the gap widens.\n" +
        "- \\(\\mathrm{[Co(H_2O)_6]^{2+}}\\) is pink; with concentrated HCl it becomes blue tetrahedral \\(\\mathrm{[CoCl_4]^{2-}}\\).\n" +
        "- Named colours: \\(\\mathrm{K_4[Fe(CN)_6]}\\) and \\(\\mathrm{K_3[Co(NO_2)_6]}\\) yellow; \\(\\mathrm{K_3[Fe(CN)_6]}\\) red; Prussian blue \\(\\mathrm{Fe_4[Fe(CN)_6]_3}\\); \\(\\mathrm{[Fe(SCN)]^{2+}}\\) blood red; \\(\\mathrm{[Fe(CN)_5NOS]^{4-}}\\) violet (the sulphide test).",
      formula: {
        label: "Energy of the light absorbed",
        latex: "\\Delta = \\frac{hc}{\\lambda} \\qquad \\Delta_{\\text{molar}} = \\frac{N_A\\,hc}{\\lambda}",
      },
      authoredExample: {
        prompt:
          "An octahedral complex absorbs most strongly at 550 nm. Find \\(\\Delta_o\\) in kJ mol\\(^{-1}\\). Take \\(h = 6.6 \\times 10^{-34}\\) J s, \\(c = 3.0 \\times 10^{8}\\) m s\\(^{-1}\\), \\(N_A = 6.0 \\times 10^{23}\\) mol\\(^{-1}\\).",
        steps: [
          "Per ion: \\(\\Delta = \\dfrac{6.6 \\times 10^{-34} \\times 3.0 \\times 10^{8}}{550 \\times 10^{-9}} = 3.6 \\times 10^{-19}\\) J.",
          "Per mole: \\(3.6 \\times 10^{-19} \\times 6.0 \\times 10^{23} = 2.16 \\times 10^{5}\\) J mol\\(^{-1}\\).",
        ],
        answer: "\\(\\Delta_o = 216\\) kJ mol\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{[CrCl_6]^{3-}}\\), \\(\\mathrm{[Cr(H_2O)_6]^{3+}}\\) and \\(\\mathrm{[Cr(NH_3)_6]^{3+}}\\) in decreasing order of the wavelength they absorb.",
        steps: [
          "Same metal ion, Cr³⁺, so the ligand decides: \\(\\mathrm{Cl^- < H_2O < NH_3}\\) in field strength.",
          "The weakest field gives the smallest gap and so the longest wavelength.",
        ],
        answer: "\\(\\mathrm{[CrCl_6]^{3-} > [Cr(H_2O)_6]^{3+} > [Cr(NH_3)_6]^{3+}}\\)",
      },
      practiceSet: [
        { prompt: "Which absorbs at the shorter wavelength, \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) or \\(\\mathrm{[Co(CN)_6]^{3-}}\\)?", answer: "\\(\\mathrm{[Co(CN)_6]^{3-}}\\)" },
        { prompt: "What colour is \\(\\mathrm{[CoCl_4]^{2-}}\\)?", answer: "Blue" },
        { prompt: "A complex absorbs 400 nm light. What is the energy per ion? (\\(hc = 2.0 \\times 10^{-25}\\) J m)", answer: "\\(5.0 \\times 10^{-19}\\) J" },
        { prompt: "Why is \\(\\mathrm{[Zn(H_2O)_6]^{2+}}\\) colourless?", answer: "Zn²⁺ is d¹⁰, so no d–d transition is possible" },
      ],
      pyqExampleId: "e6c1c44a-8b1c-4377-97ae-3331b65b0278", // 2025 — order of wavelength absorbed by four cobalt(III) complexes
      traps: [
        {
          title: "A stronger field absorbs a SHORTER wavelength",
          body: "Energy and wavelength are inverse. \\(\\mathrm{[CoCl(NH_3)_5]^{2+}}\\), with the weaker Cl⁻, absorbs at a LONGER wavelength than \\(\\mathrm{[Co(NH_3)_5(H_2O)]^{3+}}\\). Wavenumber, by contrast, rises with field strength.",
        },
        {
          title: "Absorbed colour is not the colour seen",
          body: "A complex that absorbs orange-red light looks blue-green. Match the ORDER of absorbed wavelengths to field strength first; convert to a seen colour only if the question asks for it.",
        },
        {
          title: "Energy absorbed is not intensity",
          body: "A 2021 key ranked 'intensity of colour' of \\(\\mathrm{[Ni(CN)_4]^{2-}}\\), \\(\\mathrm{[Ni(H_2O)_4]^{2+}}\\) and \\(\\mathrm{[NiCl_4]^{2-}}\\) by field strength. That orders the ENERGY absorbed; tetrahedral complexes actually absorb more intensely. Another key calls \\(\\mathrm{[Ni(CN)_4]^{2-}}\\) colourless, though its solutions are pale yellow.",
        },
      ],
    },
  ],
};
