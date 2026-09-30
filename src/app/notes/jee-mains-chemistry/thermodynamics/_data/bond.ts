import type { SubtopicNote } from "@/app/notes/_types";

export const BOND_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Bond Enthalpy and Atomisation Cycles",
  title: "Bond Enthalpy and Atomisation Cycles",
  oneLineDefinition:
    "Estimating a reaction enthalpy as bonds broken minus bonds formed, and reaching bond enthalpies through gaseous atoms and ions.",
  whyItMatters:
    "Ten PYQs, seven of them numerical, and two from 2026. Five count the bonds broken and formed, one of them turning a bond energy into the wavelength of light that breaks it. Five go through gaseous atoms or ions: average bond enthalpies, formation from atoms, and ion cycles.",
  concepts: [
    // C1 — bonds broken minus bonds formed
    {
      kind: "formula" as const,
      slug: "jcthermo-bond-counting",
      name: "Reaction enthalpy from bond enthalpies",
      intuition:
        "Breaking a bond always costs energy; forming one always releases it. The enthalpy of a gas-phase reaction is roughly what you pay to break the reactants' bonds minus what you get back from forming the products' bonds. Bonds that survive unchanged cancel, so count only the ones that change.",
      definition:
        "- \\(\\Delta_r H = \\sum BE(\\text{bonds broken}) - \\sum BE(\\text{bonds formed})\\), all species gaseous.\n" +
        "- Count every bond: \\(\\mathrm{C_2H_6}\\) has 6 C–H and 1 C–C; \\(\\mathrm{C_2H_4}\\) has 4 C–H and 1 C=C; \\(\\mathrm{C_2H_2}\\) has 2 C–H and 1 C≡C.\n" +
        "- Bond enthalpies are averages, so the answer is an estimate.\n" +
        "- Atomising methane breaks 4 C–H; atomising ethane breaks 6 C–H and 1 C–C.\n" +
        "- One bond: \\(E = \\frac{BE \\times 10^3}{N_A}\\) J (BE in kJ mol⁻¹). The longest wavelength that breaks it is \\(\\lambda = \\frac{hc}{E} = \\frac{N_A hc}{BE \\times 10^3}\\).",
      formula: {
        label: "Reaction enthalpy from bond enthalpies",
        latex: "\\Delta_r H = \\sum BE_{\\mathrm{broken}} - \\sum BE_{\\mathrm{formed}}",
      },
      authoredExample: {
        prompt:
          "Estimate \\(\\Delta H\\) for \\(\\mathrm{C_2H_2(g) + 2H_2(g) \\to C_2H_6(g)}\\). Bond enthalpies (kJ mol⁻¹): C≡C 839, C–C 348, C–H 413, H–H 436.",
        steps: [
          "The 2 C–H bonds of ethyne survive. Broken: C≡C and 2 H–H, \\(839 + 2(436) = 1711\\) kJ.",
          "Formed: C–C and 4 new C–H, \\(348 + 4(413) = 2000\\) kJ.",
          "\\(\\Delta H = 1711 - 2000 = -289\\) kJ.",
        ],
        answer: "\\(-289\\) kJ.",
      },
      selfCheckExample: {
        prompt:
          "Estimate \\(\\Delta H\\) for \\(\\mathrm{CH_4(g) + Cl_2(g) \\to CH_3Cl(g) + HCl(g)}\\). Bond enthalpies (kJ mol⁻¹): C–H 413, Cl–Cl 243, C–Cl 330, H–Cl 432.",
        steps: [
          "Broken: one C–H and one Cl–Cl, \\(413 + 243 = 656\\) kJ.",
          "Formed: one C–Cl and one H–Cl, \\(330 + 432 = 762\\) kJ.",
          "\\(\\Delta H = 656 - 762 = -106\\) kJ.",
        ],
        answer: "\\(-106\\) kJ.",
      },
      practiceSet: [
        {
          prompt: "Bond enthalpies: H–H 436, Br–Br 193, H–Br 366 kJ mol⁻¹. Estimate \\(\\Delta H\\) for \\(\\mathrm{H_2 + Br_2 \\to 2HBr}\\).",
          answer: "\\(-103\\) kJ",
        },
        { prompt: "Which bonds break when ethane is atomised?", answer: "6 C–H and 1 C–C" },
        { prompt: "The atomisation enthalpy of \\(\\mathrm{NH_3}\\) is 1170 kJ mol⁻¹. Find the N–H bond enthalpy.", answer: "\\(390\\) kJ mol⁻¹" },
        { prompt: "Is breaking a bond endothermic or exothermic?", answer: "Endothermic" },
      ],
      pyqExampleId: "f6b76169-6930-4b8c-93ed-56dd56f4e109", // 4 Apr 2024 — ethene + hydrogen to ethane from bond energies
      traps: [
        {
          title: "Formed minus broken",
          body:
            "The order is broken minus formed. Reversing it gives the right size with the wrong sign, and that value is offered beside the right one.",
        },
        {
          title: "Bond enthalpies are for gases",
          body:
            "The broken-minus-formed rule applies only when every species is a gas. A liquid or solid needs its vaporisation or sublimation enthalpy added first.",
        },
      ],
    },

    // C2 — atomisation and ion cycles
    {
      kind: "formula" as const,
      slug: "jcthermo-atomisation-cycle",
      name: "Average bond enthalpy and atomisation cycles",
      intuition:
        "When bond data are not given, build the change through gaseous atoms. Turning each reactant into atoms costs its atomisation enthalpy; assembling the product from atoms gives back its bond enthalpies. Ions work the same way: split the molecule, add electrons, then hydrate.",
      definition:
        "- Atomisation enthalpy of a molecule = the sum of all its bond enthalpies. Average bond enthalpy = atomisation enthalpy ÷ number of bonds.\n" +
        "- From formation enthalpies: \\(\\Delta_a H(\\mathrm{AB}_n) = \\Delta_f H(\\mathrm{A},g) + n\\,\\Delta_f H(\\mathrm{B},g) - \\Delta_f H(\\mathrm{AB}_n,g)\\).\n" +
        "- \\(\\Delta_f H\\) of a gaseous atom such as H(g) is half the dissociation enthalpy of \\(\\mathrm{H_2}\\).\n" +
        "- Formation of \\(\\mathrm{CH_4}\\) through atoms: \\(\\Delta_f H = \\Delta_{\\mathrm{sub}}H(\\mathrm{C}) + 2\\,BE(\\mathrm{H{-}H}) - 4\\,BE(\\mathrm{C{-}H})\\).\n" +
        "- Ion in water: \\(\\tfrac{1}{2}\\mathrm{X_2(g) \\to X(g) \\to X^-(g) \\to X^-(aq)}\\), so \\(\\Delta H = \\tfrac{1}{2}\\Delta_{\\mathrm{dis}}H + \\Delta_{\\mathrm{eg}}H + \\Delta_{\\mathrm{hyd}}H\\).\n" +
        "- Heat of solution of a salt = lattice dissociation enthalpy (positive) + the hydration enthalpies of both ions.",
      formula: {
        label: "Average bond enthalpy from formation enthalpies",
        latex:
          "\\overline{BE} = \\frac{\\Delta_f H(\\mathrm{A},g) + n\\,\\Delta_f H(\\mathrm{B},g) - \\Delta_f H(\\mathrm{AB}_n,g)}{n}",
      },
      authoredExample: {
        prompt:
          "\\(\\Delta_f H\\) (kJ mol⁻¹): \\(\\mathrm{NH_3}(g)\\) −46, N(g) +473, H(g) +218. Find the average N–H bond enthalpy.",
        steps: [
          "Atomisation: \\(\\mathrm{NH_3(g) \\to N(g) + 3H(g)}\\).",
          "\\(\\Delta_a H = 473 + 3(218) - (-46) = 473 + 654 + 46 = 1173\\) kJ mol⁻¹.",
          "Three N–H bonds break: \\(1173/3 = 391\\) kJ mol⁻¹.",
        ],
        answer: "\\(391\\) kJ mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "Find \\(\\Delta H\\) for \\(\\tfrac{1}{2}\\mathrm{F_2(g) \\to F^-(aq)}\\), given \\(\\Delta_{\\mathrm{dis}}H(\\mathrm{F_2}) = 158\\), \\(\\Delta_{\\mathrm{eg}}H(\\mathrm{F}) = -333\\) and \\(\\Delta_{\\mathrm{hyd}}H(\\mathrm{F^-}) = -506\\) kJ mol⁻¹.",
        steps: [
          "Half a mole of \\(\\mathrm{F_2}\\) to atoms: \\(\\tfrac{1}{2}(158) = +79\\) kJ.",
          "Electron gain −333 kJ, then hydration −506 kJ.",
          "\\(\\Delta H = 79 - 333 - 506 = -760\\) kJ mol⁻¹.",
        ],
        answer: "\\(-760\\) kJ mol⁻¹.",
      },
      practiceSet: [
        {
          prompt: "\\(\\Delta_f H(\\mathrm{CH_4}) = -75\\), sublimation of carbon 717 and H–H 436 kJ mol⁻¹. Find the C–H bond enthalpy.",
          answer: "\\(416\\) kJ mol⁻¹",
        },
        {
          prompt: "A salt has lattice dissociation enthalpy 780 kJ mol⁻¹; its ions have hydration enthalpies −400 and −370 kJ mol⁻¹. Find its heat of solution.",
          answer: "\\(+10\\) kJ mol⁻¹",
        },
        { prompt: "\\(\\mathrm{H_2(g) \\to 2H(g)}\\) needs 436 kJ. What is \\(\\Delta_f H\\) of H(g)?", answer: "\\(218\\) kJ mol⁻¹" },
        { prompt: "Atomising \\(\\mathrm{H_2O(g)}\\) needs 926 kJ mol⁻¹. Find the average O–H bond enthalpy.", answer: "\\(463\\) kJ mol⁻¹" },
      ],
      pyqExampleId: "91599f5c-09a1-4ce6-b492-e47eee3ac393", // 2021 Paper 26 — average S–F bond energy of SF6
      traps: [
        {
          title: "The sign on a lattice enthalpy",
          body:
            "If lattice enthalpy is quoted as forming the lattice (−z), breaking it costs +z. With hydration enthalpies −x and −y, the heat of solution is \\(z - (x + y)\\).",
        },
        {
          title: "Per mole of compound",
          body:
            "\\(\\Delta_f H\\) is per mole of the compound. For \\(\\mathrm{A_2 + B_2 \\to 2AB}\\), the equation's \\(\\Delta H\\) is twice \\(\\Delta_f H\\)(AB); set up the bond balance with that doubled value.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Hess's law — formation and combustion enthalpies",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-hess",
    },
  ],
};
