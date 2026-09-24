import type { SubtopicNote } from "@/app/notes/_types";

export const FIRST_LAW_NOTE: SubtopicNote = {
  subtopicName: "First Law of Thermodynamics, Internal Energy and Work",
  title: "First Law of Thermodynamics, Internal Energy and Work",
  oneLineDefinition:
    "Energy is conserved: ΔU = q + w, with heat absorbed and work done ON the system positive; pressure–volume work against a constant external pressure is −P_ext ΔV, and reversible isothermal work is −2.303 nRT log(V₂/V₁).",
  whyItMatters:
    "52 PYQs, 2 HARD — the biggest subtopic in the chapter and the one every paper draws from. Five shapes: add q and w with the right signs; compute −P_ext ΔV and convert dm³ bar or L atm to joules; combine the two; work for a gas reaction from Δn_g RT; and the reversible-isothermal logarithm. " +
    "Get the sign convention and the 100 J per dm³ bar right and every one of these is arithmetic.",
  concepts: [
    // 1 — sign convention
    {
      kind: "formula" as const,
      slug: "cetth-first-law-sign-convention",
      name: "ΔU = q + w and the Sign Convention",
      intuition:
        "Think from the system's point of view. Energy coming IN — heat absorbed, work done ON it — is positive; energy going OUT — heat released, work done BY it — is negative. Add the two and you have the change in internal energy, a state function that rises with temperature.",
      definition:
        "- \\(\\Delta U = q + w\\). Heat absorbed \\(q > 0\\); heat released \\(q < 0\\). Work done ON the system \\(w > 0\\); work done BY the system \\(w < 0\\).\n" +
        "- 40 J absorbed, 8 J done by the system: \\(\\Delta U = 40 - 8 = 32\\) J. 605 J absorbed, 380 J done by: +225 J.\n" +
        "- 300 J released, 150 J done by: \\(-300 - 150 = -450\\) J. 8 kJ released, 660 J done by: −8660 J. 15 kJ done by, 2 kJ lost: −17 kJ.\n" +
        "- 20 kJ done ON, 10 kJ released: \\(-10 + 20 = +10\\) kJ. x kJ released, y kJ done on: \\(y - x\\).\n" +
        "- At constant volume \\(w = 0\\) so \\(q_V = \\Delta U\\) — ΔU is the heat of reaction at constant volume. The first law says the energy of the UNIVERSE is constant, not of the system.",
      formula: {
        label: "First law",
        latex:
          "\\Delta U = q + w,\\qquad q_{\\text{absorbed}} > 0,\\quad w_{\\text{on system}} > 0",
      },
      authoredExample: {
        prompt: "A system does 250 J of work on the surroundings while absorbing 90 J of heat. Find ΔU. Then, for a different step, 400 J of work is done on the system and it loses 120 J of heat.",
        steps: [
          "\\(\\Delta U = 90 - 250 = -160\\) J.",
          "\\(\\Delta U = -120 + 400 = +280\\) J.",
        ],
        answer: "\\(-160\\) J; \\(+280\\) J",
      },
      selfCheckExample: {
        prompt: "A gas receives 1.2 kJ of heat and does 350 J of work. ΔU?",
        steps: [
          "\\(1200 - 350 = 850\\) J.",
        ],
        answer: "\\(+850\\) J",
      },
      practiceSet: [
        { prompt: "40 J supplied, 8 J done by the system: ΔU?", answer: "32 J" },
        { prompt: "300 J released, 150 J done by the system: ΔU?", answer: "−450 J" },
        { prompt: "25 kJ done by the system, 10 kJ absorbed: ΔU?", answer: "−15 kJ" },
        { prompt: "Symbol for the heat of reaction at constant volume?", answer: "\\(\\Delta U\\)" },
      ],
      pyqExampleId: "a79bdcf3-aacc-4a36-b199-0b01fbc38fe2",
      traps: [
        {
          title: "'Work done BY the system' entered as positive",
          body:
            "That is the old convention and it flips every answer's sign. In the current one, work done BY the system LEAVES it: w is negative. 'Work done ON the system' is the positive case.",
        },
      ],
    },

    // 2 — work at constant external pressure
    {
      kind: "formula" as const,
      slug: "cetth-work-constant-pressure",
      name: "Work Against a Constant External Pressure: w = −P_ext ΔV",
      intuition:
        "Push the piston out against a fixed opposing pressure and the system pays P_ext × ΔV of energy, so its work is negative. Compress it and w is positive. The product comes out in dm³ bar or L atm and must be converted: 1 dm³ bar = 100 J, 1 L atm = 101.3 J, 1 m³ Pa = 1 J.",
      definition:
        "- \\(w = -P_{\\text{ext}}(V_2 - V_1)\\). Expansion (V₂ > V₁): w negative. Compression: w positive. Free expansion (P_ext = 0): w = 0.\n" +
        "- 1.5 bar, 5 → 10 dm³: \\(-7.5\\) dm³ bar \\(= -750\\) J. 1 bar, 3 → 15 L: −1200 J. 1.9 bar, 0.3 → 2.5 dm³: −418 J.\n" +
        "- SI: \\(2 \\times 10^5\\) N m⁻², 200 cm³ \\(= 2 \\times 10^{-4}\\) m³: \\(-40\\) J. \\(2.02 \\times 10^5\\) Pa, 5 → 7 dm³: −404 J. 2 atm, 1.5 L: −303.9 J; 1 atm, 4.5 dm³: −456 J.\n" +
        "- Compression: 3 bar, 24 → 13 dm³: \\(+33\\) dm³ bar \\(= +3300\\) J; 4 bar, 25 → 13: +4800 J.\n" +
        "- Solve for the pressure: \\(P_{\\text{ext}} = -w/\\Delta V\\). 500 J = 5 dm³ bar over 2 L: 2.5 bar; −600 J over 5 dm³: 1.2 bar.",
      formula: {
        label: "PV work",
        latex:
          "w = -P_{\\text{ext}}\\,\\Delta V,\\qquad 1\\ \\text{dm}^3\\,\\text{bar} = 100\\ \\text{J},\\quad 1\\ \\text{L atm} = 101.3\\ \\text{J}",
      },
      authoredExample: {
        prompt: "A gas expands from 2 dm³ to 6.5 dm³ against 2.5 bar. Find the work in joules. What external pressure would make the same expansion cost 900 J?",
        steps: [
          "\\(w = -2.5 \\times 4.5 = -11.25\\) dm³ bar \\(= -1125\\) J.",
          "\\(P = 9\\ \\text{dm}^3\\,\\text{bar} / 4.5\\ \\text{dm}^3 = 2\\) bar.",
        ],
        answer: "\\(-1125\\) J; 2 bar",
      },
      selfCheckExample: {
        prompt: "2 moles of gas are compressed from 20 dm³ to 8 dm³ at 2 bar. Work?",
        steps: [
          "\\(w = -2(8 - 20) = +24\\) dm³ bar \\(= +2400\\) J.",
        ],
        answer: "\\(+2400\\) J",
      },
      practiceSet: [
        { prompt: "1.5 bar, 5 → 10 dm³: w?", answer: "−7.5 dm³ bar (−750 J)" },
        { prompt: "\\(2 \\times 10^5\\) Pa, expands 500 cm³: w?", answer: "−100 J" },
        { prompt: "2 atm, expands 1.5 L: w in J?", answer: "−303.9 J" },
        { prompt: "Which process has zero work: isobaric expansion or free expansion?", answer: "Free expansion" },
      ],
      pyqExampleId: "7ae65c17-ae2d-4de2-9b8d-b0a4748751af",
      traps: [
        {
          title: "Leaving the answer in dm³ bar when joules are asked",
          body:
            "−12 dm³ bar is −1200 J. Options are printed a factor of 100 apart. In SI, cm³ must become m³ (× 10⁻⁶) before multiplying by pascals.",
        },
      ],
    },

    // 3 — first law with PV work
    {
      kind: "formula" as const,
      slug: "cetth-first-law-with-pv-work",
      name: "ΔU From Heat Absorbed and an Expansion",
      intuition:
        "Combine the two: the gas takes in q and spends P_ext ΔV on pushing back the surroundings. ΔU = q − P_ext ΔV. When the work exceeds the heat, ΔU is negative even though heat was absorbed.",
      definition:
        "- \\(\\Delta U = q - P_{\\text{ext}}\\Delta V\\), the work converted to the same unit as q.\n" +
        "- 800 J absorbed, 1 bar, 10 → 20 dm³: \\(800 - 1000 = -200\\) J. 10 kJ absorbed, 2 bar, 5 → 8 L: \\(10000 - 600 = 9400\\) J.\n" +
        "- 200 J absorbed, \\(2 \\times 10^5\\) Pa, 500 cm³: \\(200 - 100 = +100\\) J. 150 J, 300 cm³: 90 J. 210 J, 10⁵ Pa, 3 → 6 L: \\(210 - 300 = -90\\) J.\n" +
        "- 302.6 J absorbed, 2 atm, 100 → 200 L: \\(302.6 - 20265 = -19962\\) J.",
      formula: {
        label: "First law with expansion work",
        latex:
          "\\Delta U = q - P_{\\text{ext}}\\,\\Delta V",
      },
      authoredExample: {
        prompt: "A gas absorbs 450 J and expands from 4 dm³ to 7 dm³ against 1.2 bar. Find ΔU.",
        steps: [
          "\\(w = -1.2 \\times 3 = -3.6\\) dm³ bar \\(= -360\\) J. \\(\\Delta U = 450 - 360 = +90\\) J.",
        ],
        answer: "\\(+90\\) J",
      },
      selfCheckExample: {
        prompt: "A gas absorbs 120 J and expands by 400 cm³ against \\(2.5 \\times 10^5\\) Pa. ΔU?",
        steps: [
          "\\(w = -2.5 \\times 10^5 \\times 4 \\times 10^{-4} = -100\\) J; \\(\\Delta U = 120 - 100 = 20\\) J.",
        ],
        answer: "\\(+20\\) J",
      },
      practiceSet: [
        { prompt: "800 J absorbed, 1 bar, 10 → 20 dm³: ΔU?", answer: "−200 J" },
        { prompt: "10 kJ absorbed, 2 bar, 5 → 8 L: ΔU?", answer: "9400 J" },
        { prompt: "150 J absorbed, \\(2 \\times 10^5\\) Pa, 300 cm³: ΔU?", answer: "90 J" },
        { prompt: "210 J absorbed, 10⁵ Pa, 3 → 6 L: ΔU?", answer: "−90 J" },
      ],
      pyqExampleId: "08e5d806-e7de-4906-9aa4-0e42923a9506",
      traps: [
        {
          title: "Adding the work instead of subtracting it",
          body:
            "An EXPANSION is work done by the system: it is subtracted from q. 800 + 1000 = 1800 J is not on offer, but 800 − 100 (a slipped conversion) is.",
        },
      ],
    },

    // 4 — work in gas reactions
    {
      kind: "formula" as const,
      slug: "cetth-work-in-gas-reactions",
      name: "Work in a Gas-Phase Reaction: w = −Δn_g RT",
      intuition:
        "A reaction that makes more moles of gas pushes the atmosphere back and does work (negative); one that consumes gas has work done on it (positive); equal moles either side means zero work. At constant temperature PΔV = Δn_g RT. With volumes given at fixed P, use −PΔV directly.",
      definition:
        "- \\(w = -\\Delta n_g RT\\), \\(\\Delta n_g\\) = gaseous product moles − gaseous reactant moles, R = 8.314, T in K.\n" +
        "- \\(4\\text{SO}_2 + 2\\text{O}_2 \\to 4\\text{SO}_3\\) at 300 K: \\(\\Delta n_g = -2\\), \\(w = +2 \\times 8.314 \\times 300 = +4988\\) J.\n" +
        "- Zero work: \\(\\text{H}_2 + \\text{Cl}_2 \\to 2\\text{HCl}\\), \\(\\text{CH}_4 + \\text{Cl}_2 \\to \\text{CH}_3\\text{Cl} + \\text{HCl}\\). Negative work (gas made): \\(2\\text{H}_2\\text{O}_2(l) \\to 2\\text{H}_2\\text{O}(l) + \\text{O}_2(g)\\). Positive: \\(\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3\\).\n" +
        "- Volumes at 1 bar: \\(\\text{C}_2\\text{H}_4\\) (200 mL) + HCl (150 mL) → \\(\\text{C}_2\\text{H}_5\\text{Cl}\\): 150 mL reacts with 150 mL to give 150 mL, \\(\\Delta V = -150\\) mL, \\(w = +0.15\\) dm³ bar \\(= +15\\) J.",
      formula: {
        label: "Reaction work",
        latex:
          "w = -\\Delta n_g\\,RT",
      },
      authoredExample: {
        prompt: "Find the work done at 27 °C when 2 mol of \\(\\text{N}_2\\text{O}_4(g)\\) decompose to \\(\\text{NO}_2(g)\\).",
        steps: [
          "\\(\\text{N}_2\\text{O}_4 \\to 2\\text{NO}_2\\); for 2 mol, \\(\\Delta n_g = 4 - 2 = +2\\). \\(w = -2 \\times 8.314 \\times 300 = -4988\\) J.",
        ],
        answer: "\\(-4.99\\) kJ (work done by the gas)",
      },
      selfCheckExample: {
        prompt: "Which of these does zero PV work: \\(2\\text{CO} + \\text{O}_2 \\to 2\\text{CO}_2\\); \\(\\text{PCl}_5 \\to \\text{PCl}_3 + \\text{Cl}_2\\); \\(\\text{H}_2 + \\text{Br}_2 \\to 2\\text{HBr}\\) (all gases)?",
        steps: [
          "Only the third has \\(\\Delta n_g = 0\\).",
        ],
        answer: "\\(\\text{H}_2 + \\text{Br}_2 \\to 2\\text{HBr}\\)",
      },
      practiceSet: [
        { prompt: "100 mL H₂ + 100 mL Cl₂ → HCl at 1 bar: work?", answer: "Zero" },
        { prompt: "4 mol SO₂ oxidised to SO₃ at 300 K: w?", answer: "+4988 J" },
        { prompt: "Sign of w for \\(2\\text{H}_2\\text{O}_2(l) \\to 2\\text{H}_2\\text{O}(l) + \\text{O}_2(g)\\)?", answer: "Negative" },
        { prompt: "150 mL + 150 mL → 150 mL at 1 bar: w?", answer: "+15 J" },
      ],
      pyqExampleId: "273a70e9-23d7-49af-afa5-219f808d446e",
      traps: [
        {
          title: "Counting liquids and solids in Δn",
          body:
            "Only GASES do PV work. In \\(\\text{C}_2\\text{H}_2 + \\tfrac{5}{2}\\text{O}_2 \\to 2\\text{CO}_2 + \\text{H}_2\\text{O}(l)\\) the water is liquid: \\(\\Delta n_g = 2 - 3.5\\), not \\(3 - 3.5\\).",
        },
      ],
    },

    // 5 — isothermal reversible work
    {
      kind: "formula" as const,
      slug: "cetth-isothermal-reversible-work",
      name: "Reversible Isothermal Work: −2.303 nRT log(V₂/V₁)",
      intuition:
        "Expanding in infinitesimal steps against a pressure always just below the gas's own extracts the maximum work, and the sum becomes a logarithm. For expansion the log is positive and w negative; for compression the same magnitude comes out positive. Pressures invert the ratio: V₂/V₁ = P₁/P₂.",
      definition:
        "- \\(w_{\\text{rev}} = -nRT\\ln\\dfrac{V_2}{V_1} = -2.303\\,nRT\\log_{10}\\dfrac{V_2}{V_1} = -2.303\\,nRT\\log_{10}\\dfrac{P_1}{P_2}\\).\n" +
        "- 2 mol, 300 K, 20 → 40 L: \\(-2.303 \\times 2 \\times 8.314 \\times 300 \\times 0.301 = -3458\\) J. Compression 40 → 20 L: +3.46 kJ.\n" +
        "- 1 mol, 300 K, 10 bar → 1 bar: \\(-5744\\) J. Compression x → 2x bar or 12 → 6 dm³: +1729 J.\n" +
        "- Equal MASSES of gases expanding by the same ratio: work ∝ n = m/M, so the LIGHTEST gas does the most work — H₂ among H₂, N₂, Cl₂, O₂; NH₃ among NH₃, N₂, Cl₂, H₂S.\n" +
        "- \\(2.303 \\times 8.314 \\times 300 = 5744\\) per mole per decade — worth remembering.",
      formula: {
        label: "Maximum (reversible) work",
        latex:
          "w_{\\text{rev}} = -2.303\\,nRT\\log_{10}\\frac{V_2}{V_1} = -2.303\\,nRT\\log_{10}\\frac{P_1}{P_2}",
      },
      authoredExample: {
        prompt: "3 mol of an ideal gas expand reversibly and isothermally at 400 K from 4 dm³ to 40 dm³. Find w.",
        steps: [
          "\\(\\log(40/4) = 1\\). \\(w = -2.303 \\times 3 \\times 8.314 \\times 400 = -22{,}967\\) J.",
        ],
        answer: "\\(\\approx -23.0\\) kJ",
      },
      selfCheckExample: {
        prompt: "1 mol of gas is compressed reversibly at 300 K from 1 bar to 4 bar. Work?",
        steps: [
          "\\(w = -5744 \\times \\log(1/4) = +5744 \\times 0.602 = +3458\\) J.",
        ],
        answer: "\\(+3.46\\) kJ",
      },
      practiceSet: [
        { prompt: "2 mol, 300 K, 20 → 40 L reversibly: w?", answer: "−3458 J" },
        { prompt: "1 mol, 300 K, 10 → 1 bar reversibly: w?", answer: "−5.74 kJ" },
        { prompt: "1 mol, 300 K, 12 → 6 dm³ reversibly: w?", answer: "+1.729 kJ" },
        { prompt: "Equal masses of H₂, N₂, Cl₂, O₂ expand reversibly by the same ratio — most work?", answer: "H₂" },
      ],
      pyqExampleId: "664250d7-cc0f-4e23-8b0e-b303c4ebddba",
      traps: [
        {
          title: "Using the pressure ratio the same way as the volume ratio",
          body:
            "\\(V_2/V_1 = P_1/P_2\\), inverted. For 10 bar → 1 bar the log argument is 10 (expansion, w negative), not 0.1. Options with the opposite sign are always there.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Enthalpy — ΔH = ΔU + Δn_g RT, the same Δn_g as the reaction work",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-enthalpy",
    },
    {
      label: "Systems and Processes — what each process fixes",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-systems-and-processes",
    },
  ],
};
