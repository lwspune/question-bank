import type { SubtopicNote } from "@/app/notes/_types";

export const THERMOCHEMISTRY_NOTE: SubtopicNote = {
  subtopicName: "Thermochemistry, Hess's Law and Bond Enthalpy",
  title: "Thermochemistry, Hess's Law and Bond Enthalpy",
  oneLineDefinition:
    "The enthalpy of a reaction is products minus reactants in enthalpies of formation (elements count zero), is independent of the route (Hess's law), and can be estimated from bond enthalpies as bonds broken minus bonds formed.",
  whyItMatters:
    "21 PYQs, 1 HARD. Two thirds are ΔrH° = ΣΔfH°(products) − ΣΔfH°(reactants) for a combustion, or the per-mole scaling of a formation enthalpy (the equation makes 2 mol, the answer wants 1). The rest: bond enthalpies, Hess's law as a statement, and the enthalpy of solution as lattice plus hydration.",
  concepts: [
    // 1 — formation and reaction enthalpy
    {
      kind: "formula" as const,
      slug: "cetth-enthalpy-of-formation-and-reaction",
      name: "Enthalpy of Formation and the Reaction Enthalpy From It",
      intuition:
        "ΔfH° is the enthalpy change when ONE mole of a compound forms from its elements in their standard states; for an element it is zero by definition. Because enthalpy is a state function, any reaction's ΔH is the formation enthalpies of what it makes minus those of what it uses.",
      definition:
        "- \\(\\Delta_r H^\\circ = \\sum \\Delta_f H^\\circ(\\text{products}) - \\sum \\Delta_f H^\\circ(\\text{reactants})\\); \\(\\Delta_f H^\\circ(\\text{O}_2, \\text{H}_2, \\text{N}_2, \\text{C}) = 0\\).\n" +
        "- Methane combustion: \\([-394 + 2(-286)] - [-75] = -891\\) kJ (with CO₂ at −390: −887). Ethene: \\([2(-390) + 2(-286)] - (-52) = -1300\\). Ethyne: \\([2(-393) - 286] - 227 = -1299\\). Ethanol: \\([2(-390) + 3(-285)] + 280 = -1355\\).\n" +
        "- Per mole: \\(\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3\\), −92 kJ → \\(\\Delta_f H(\\text{NH}_3) = -46\\). \\(\\text{H}_2 + \\text{Cl}_2 \\to 2\\text{HCl}\\), −194 → −97. Decomposition of water per mole: \\(+573.2/2 = +286.6\\) kJ.\n" +
        "- Scaling by amount: 12 g C → 1 mol CH₄, ΔH = −75 kJ. 149.6 kJ released at −74.8 kJ mol⁻¹ → 2 mol = 32 g CH₄. 3 g ethane releasing 8.84 kJ → −88.4 kJ mol⁻¹.\n" +
        "- Exothermic: neutralisation (KOH + HNO₃), combustion. Endothermic: melting, dissolving NaCl, \\(\\text{N}_2 + 2\\text{O}_2 \\to 2\\text{NO}_2\\).",
      formula: {
        label: "Reaction enthalpy from formation enthalpies",
        latex:
          "\\Delta_r H^\\circ = \\sum \\nu_p\\,\\Delta_f H^\\circ_{\\text{products}} - \\sum \\nu_r\\,\\Delta_f H^\\circ_{\\text{reactants}}",
      },
      authoredExample: {
        prompt: "Find ΔrH° for \\(\\text{C}_3\\text{H}_8(g) + 5\\text{O}_2 \\to 3\\text{CO}_2 + 4\\text{H}_2\\text{O}(l)\\) given ΔfH°: propane −104, CO₂ −394, water −286 kJ mol⁻¹.",
        steps: [
          "\\([3(-394) + 4(-286)] - [-104] = (-1182 - 1144) + 104 = -2222\\) kJ.",
        ],
        answer: "\\(-2222\\) kJ",
      },
      selfCheckExample: {
        prompt: "\\(2\\text{SO}_2 + \\text{O}_2 \\to 2\\text{SO}_3\\) has ΔH = −198 kJ and ΔfH°(SO₂) = −297 kJ mol⁻¹. Find ΔfH°(SO₃).",
        steps: [
          "\\(-198 = 2x - 2(-297)\\) → \\(2x = -198 - 594 = -792\\), \\(x = -396\\) kJ mol⁻¹.",
        ],
        answer: "\\(-396\\) kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "ΔfH° of H₂(g)?", answer: "0" },
        { prompt: "\\(\\text{H}_2 + \\text{Cl}_2 \\to 2\\text{HCl}\\), −194 kJ: ΔfH°(HCl)?", answer: "−97 kJ mol⁻¹" },
        { prompt: "CH₄ combustion with −75, −394, −286: ΔrH°?", answer: "−891 kJ" },
        { prompt: "Mass of CH₄ formed when 149.6 kJ is released at −74.8 kJ mol⁻¹?", answer: "32 g" },
      ],
      pyqExampleId: "3f4070a0-748d-42c8-bee2-595c6fe3d25a",
      traps: [
        {
          title: "Reporting the equation's ΔH as the formation enthalpy",
          body:
            "\\(\\Delta_f H\\) is per MOLE of compound. An equation that makes 2 mol of NH₃ at −92 kJ gives −46 kJ mol⁻¹; −92 is the first option every time.",
        },
      ],
    },

    // 2 — Hess's law and enthalpy of solution
    {
      kind: "formula" as const,
      slug: "cetth-hess-law-and-enthalpy-of-solution",
      name: "Hess's Law and the Enthalpy of Solution",
      intuition:
        "Enthalpy is a state function, so the heat of a reaction does not depend on the number of steps — add the equations and add their ΔH values. Dissolving an ionic solid is two steps: pull the lattice apart (lattice enthalpy, endothermic) and hydrate the ions (exothermic); the sum is the enthalpy of solution.",
      definition:
        "- **Hess's law**: \\(\\Delta H\\) of a reaction is the same whether it occurs in one step or several. It DOES depend on physical states, temperature, and constant-P versus constant-V; it does NOT depend on the path.\n" +
        "- Adding equations: \\(\\text{C} + \\tfrac{1}{2}\\text{O}_2 \\to \\text{CO}\\) (−x) plus \\(\\text{CO} + \\tfrac{1}{2}\\text{O}_2 \\to \\text{CO}_2\\) (−y) gives \\(\\text{C} + \\text{O}_2 \\to \\text{CO}_2\\), \\(Q = -(x + y)\\).\n" +
        "- \\(\\Delta_{\\text{soln}}H = \\Delta_L H + \\Delta_{\\text{hyd}}H\\). KCl: \\(700 + (-680) = +20\\) kJ mol⁻¹ (endothermic — the solution cools).\n" +
        "- Reversing an equation reverses the sign; multiplying it multiplies ΔH.",
      formula: {
        label: "Hess's law; enthalpy of solution",
        latex:
          "\\Delta H_{\\text{overall}} = \\sum \\Delta H_{\\text{steps}},\\qquad \\Delta_{\\text{soln}}H = \\Delta_L H + \\Delta_{\\text{hyd}}H",
      },
      authoredExample: {
        prompt: "Given \\(\\text{S} + \\text{O}_2 \\to \\text{SO}_2\\) (−297 kJ) and \\(\\text{S} + \\tfrac{3}{2}\\text{O}_2 \\to \\text{SO}_3\\) (−396 kJ), find ΔH for \\(\\text{SO}_2 + \\tfrac{1}{2}\\text{O}_2 \\to \\text{SO}_3\\).",
        steps: [
          "Target = second − first: \\(-396 - (-297) = -99\\) kJ.",
        ],
        answer: "\\(-99\\) kJ",
      },
      selfCheckExample: {
        prompt: "NaCl has lattice enthalpy 788 kJ mol⁻¹ and hydration enthalpy −784 kJ mol⁻¹. Enthalpy of solution, and is dissolving endothermic?",
        steps: [
          "\\(788 - 784 = +4\\) kJ mol⁻¹; slightly endothermic.",
        ],
        answer: "\\(+4\\) kJ mol⁻¹; yes",
      },
      practiceSet: [
        { prompt: "Heat of reaction does NOT depend on?", answer: "The number of steps" },
        { prompt: "ΔLH = 700, ΔhydH = −680: enthalpy of solution?", answer: "+20 kJ mol⁻¹" },
        { prompt: "Reversing an equation does what to ΔH?", answer: "Changes its sign" },
        { prompt: "(ii) −x and (iii) −y add to (i): Q?", answer: "−(x + y)" },
      ],
      pyqExampleId: "8cb65049-a719-4e19-a5bf-6c49a8591438",
      traps: [
        {
          title: "Subtracting hydration from lattice enthalpy",
          body:
            "Hydration enthalpy is already NEGATIVE; the enthalpy of solution is the SUM. 700 − (−680) = 1380 is the planted option.",
        },
      ],
    },

    // 3 — bond enthalpy
    {
      kind: "formula" as const,
      slug: "cetth-bond-enthalpy",
      name: "Bond Enthalpy: Bonds Broken Minus Bonds Formed",
      intuition:
        "Breaking bonds costs energy, forming them releases it. Add the enthalpies of every bond in the reactants (broken) and subtract those of every bond in the products (formed). Bond dissociation energy is positive; the bond FORMATION energy is its negative. Per bond means divide by the count of that bond in the molecule.",
      definition:
        "- \\(\\Delta_r H = \\sum \\Delta H(\\text{bonds broken}) - \\sum \\Delta H(\\text{bonds formed})\\).\n" +
        "- \\(\\text{C}_2\\text{H}_4 + \\text{H}_2 \\to \\text{C}_2\\text{H}_6\\): broken 4 C–H + C=C + H–H = \\(4(414) + 615 + 435 = 2706\\); formed 6 C–H + C–C = \\(2484 + 347 = 2831\\); \\(\\Delta H = -125\\) kJ.\n" +
        "- \\(\\Delta_f H(\\text{NH}_3)\\) per mole: \\(\\tfrac{1}{2}(941) + \\tfrac{3}{2}(436) - 3(389) = -42.5\\) kJ mol⁻¹ — use HALF an N₂, not a whole one.\n" +
        "- Per bond: \\(\\text{C}(g) + 4\\text{H}(g) \\to \\text{CH}_4\\), −1665 kJ → C–H bond enthalpy \\(= 1665/4 \\approx 416\\) kJ mol⁻¹.\n" +
        "- Bond formation energy of H–H = −433: dissociation of 0.5 mol H₂ needs \\(+216.5\\) kJ.",
      formula: {
        label: "Reaction enthalpy from bond enthalpies",
        latex:
          "\\Delta_r H = \\sum \\Delta H_{\\text{broken}} - \\sum \\Delta H_{\\text{formed}}",
      },
      authoredExample: {
        prompt: "Estimate ΔH for \\(\\text{H}_2 + \\text{Cl}_2 \\to 2\\text{HCl}\\) with bond enthalpies H–H 436, Cl–Cl 243, H–Cl 431 kJ mol⁻¹.",
        steps: [
          "Broken: \\(436 + 243 = 679\\). Formed: \\(2 \\times 431 = 862\\). \\(\\Delta H = 679 - 862 = -183\\) kJ.",
        ],
        answer: "\\(-183\\) kJ",
      },
      selfCheckExample: {
        prompt: "\\(\\text{N}(g) + 3\\text{H}(g) \\to \\text{NH}_3(g)\\) has ΔH = −1173 kJ. Bond enthalpy of one N–H bond?",
        steps: [
          "Three N–H bonds form: \\(1173/3 = 391\\) kJ mol⁻¹.",
        ],
        answer: "\\(391\\) kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "H–H formation energy −433: dissociation energy of 0.5 mol H₂?", answer: "216.5 kJ" },
        { prompt: "\\(\\text{C}_2\\text{H}_4 + \\text{H}_2 \\to \\text{C}_2\\text{H}_6\\) with 414, 615, 435, 347: ΔH?", answer: "−125 kJ" },
        { prompt: "ΔfH(NH₃) from N≡N 941, H–H 436, N–H 389?", answer: "−42.5 kJ mol⁻¹" },
        { prompt: "C + 4H → CH₄, −1665 kJ: energy per C–H bond?", answer: "≈ 416 kJ mol⁻¹" },
      ],
      pyqExampleId: "cce8b1af-2f3f-4311-a5b6-8e3f6b7f3b25",
      traps: [
        {
          title: "Using a whole N₂ for the formation enthalpy of NH₃",
          body:
            "Formation enthalpy is per mole of product, so the equation is \\(\\tfrac{1}{2}\\text{N}_2 + \\tfrac{3}{2}\\text{H}_2 \\to \\text{NH}_3\\). The whole-equation answer, −85 kJ, is offered beside the right −42.5.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Enthalpy — ΔH_vap and the ΔH–ΔU relation",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-enthalpy",
    },
    {
      label: "Gibbs Energy — where ΔH goes next",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-gibbs-energy",
    },
  ],
};
