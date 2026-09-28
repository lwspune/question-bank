import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/current-electricity";

export const GALVANOMETER_NOTE: SubtopicNote = {
  subtopicName: "Galvanometer, Ammeter, and Voltmeter Conversion",
  title: "Converting a Galvanometer into an Ammeter or a Voltmeter",
  oneLineDefinition:
    "A galvanometer of resistance G gives full-scale deflection at a small current I_g; a small shunt S in parallel lets it measure a larger current I as an ammeter, with I_g G = (I − I_g)S, and a large resistance in series lets it read a voltage V as a voltmeter, with V = I_g(G + R).",
  whyItMatters:
    "24 PYQs, 4 of them HARD — the largest page in the chapter. Twelve are the ammeter: the shunt that passes a given fraction of the current, the resistance of the finished ammeter, a second shunt compared with the first, and the series resistance that keeps the main current unchanged. " +
    "Twelve are the voltmeter: the series resistance for a new range, extending an existing voltmeter, and the resistance of the galvanometer from two ranges. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ce-ammeter-shunt",
      name: "The Shunt: Galvanometer to Ammeter",
      intuition:
        "The shunt and the galvanometer are in parallel, so they share one voltage: I_g G = (I − I_g)S. If a fraction f of the current passes through the galvanometer, S = fG/(1 − f); 1% gives G/99, 5% gives G/19, 10% gives G/9. The ammeter's own resistance is G and S in parallel, which works out to fG — small, as an ammeter's must be. The current-multiplying factor is n = I/I_g = (G + S)/S, so G = S(n − 1), and a second shunt S′ gives n′ = (G + S′)/S′.",
      definition:
        "- \\(I_g G = (I - I_g)S\\), so \\(S = \\dfrac{I_g G}{I - I_g}\\).\n" +
        "- Fraction f through the galvanometer: \\(S = \\dfrac{fG}{1 - f}\\) (4% ⇒ G/24; S = 5 Ω ⇒ G = 120 Ω).\n" +
        "- **Ammeter resistance**: \\(\\dfrac{GS}{G + S} = fG\\) (0.25% ⇒ G/400).\n" +
        "- **Multiplying factor**: \\(n = \\dfrac{G + S}{S}\\), so \\(n' = \\dfrac{S(n - 1) + S'}{S'}\\).\n" +
        "- To keep the **main current unchanged** after shunting, add in series \\(G - \\dfrac{GS}{G + S} = \\dfrac{G^2}{G + S}\\).\n" +
        "- Shunt S = G/10 ⇒ \\(\\dfrac{1}{11}\\) of the current through G.",
      formula: {
        label: "Shunt",
        latex: "S = \\frac{I_g\\,G}{I - I_g}",
      },
      authoredExample: {
        prompt: "A galvanometer of 50 Ω deflects fully at 2 mA. Shunt to read 1 A?",
        steps: ["S = 0.002 × 50/(1 − 0.002).", "S = 0.1/0.998 ≈ 0.1 Ω."],
        answer: "≈ 0.1 Ω in parallel",
      },
      selfCheckExample: {
        prompt: "Only 2% of the current may pass through a galvanometer of resistance G. Shunt?",
        steps: ["S = 0.02G/0.98."],
        answer: "G/49",
      },
      practiceSet: [
        { prompt: "G = 90 Ω; 10% of the current through it. Shunt?", answer: "10 Ω" },
        { prompt: "To use a galvanometer as an ammeter, connect?", answer: "A low resistance in parallel" },
      ],
      pyqExampleId: "20255562-1082-4626-b500-fa640d8a82a1",
      traps: [
        {
          title: "Using the fraction through the shunt instead of the galvanometer",
          body:
            "S = fG/(1 − f) with f the share through the GALVANOMETER. 5% through G is G/19; reading 5% as the shunt's share gives 19G, a resistance no ammeter could have.",
        },
        {
          title: "Quoting the shunt as the ammeter's resistance",
          body:
            "The ammeter is G and S in parallel, fG — slightly less than S. The question asks for the ammeter, not the shunt, when it says 'resistance of the ammeter'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ce-voltmeter-series",
      name: "The Series Resistance: Galvanometer to Voltmeter",
      intuition:
        "At full scale the galvanometer carries I_g, so the whole voltmeter, G plus the series resistance R, reads V = I_g(G + R), giving R = V/I_g − G = G(V/V_g − 1), with V_g = I_gG the galvanometer's own range. A series resistance n times G makes the range n + 1 times. Extending an existing voltmeter of resistance R_V from V to nV needs (n − 1)R_V more in series. Two ranges with two series resistances fix G: if R₁ gives V and R₂ gives kV, then k(G + R₁) = G + R₂. A higher range needs a higher resistance, so a voltmeter has a larger resistance than a millivoltmeter made from the same galvanometer.",
      definition:
        "- \\(R = \\dfrac{V}{I_g} - G = G\\left(\\dfrac{V}{V_g} - 1\\right)\\).\n" +
        "- Full scale from a scale: \\(I_g\\) = (current per division) × (divisions).\n" +
        "- **Extend** a voltmeter R_V from V to nV: add \\((n - 1)R_V\\) (10 V on 50 Ω to 15 V ⇒ 25 Ω).\n" +
        "- **Two ranges**: \\(k(G + R_1) = G + R_2\\) (100 Ω for V, 1000 Ω for 2V ⇒ G = 800 Ω).\n" +
        "- Series resistance nG ⇒ range × (n + 1).\n" +
        "- Largest device resistance: the voltmeter of the highest range.",
      formula: {
        label: "Series resistance",
        latex: "R = \\frac{V}{I_g} - G",
      },
      authoredExample: {
        prompt: "A 40 Ω galvanometer deflects fully at 5 mA. Series resistance to read 10 V?",
        steps: ["V/I_g = 10/0.005 = 2000 Ω.", "R = 2000 − 40 = 1960 Ω."],
        answer: "1960 Ω in series",
      },
      selfCheckExample: {
        prompt: "A 25 Ω galvanometer deflects fully at 4 mA. Series resistance for 20 V?",
        steps: ["20/0.004 = 5000 Ω; subtract G."],
        answer: "4975 Ω in series",
      },
      practiceSet: [
        { prompt: "Series resistance equals n times G. The range is now how many times the galvanometer's?", answer: "n + 1" },
        { prompt: "200 Ω in series gives range V; 2000 Ω in its place gives 3V. G?", answer: "700 Ω" },
      ],
      pyqExampleId: "71c5499c-9aef-4891-b46b-deddfabc6dfc",
      traps: [
        {
          title: "Forgetting to subtract G",
          body:
            "V/I_g is the WHOLE voltmeter's resistance. The resistance to add is V/I_g − G.",
        },
        {
          title: "Reading 'replaced by' as 'added to'",
          body:
            "'A resistance of 1000 Ω is connected in series' to double the range usually REPLACES the 100 Ω: 2(G + 100) = G + 1000 gives G = 800 Ω. Where the question says 'in series with X', add it: G + X + 1500 = 2(G + X).",
        },
      ],
    },
  ],
  related: [
    { label: "Kirchhoff's Laws — the shunt is a two-branch junction", href: `${BASE}/cetp-ce-kirchhoff` },
    { label: "Magnetic Fields — how the moving-coil galvanometer works", href: "/notes/mht-cet-physics/magnetic-fields-due-to-electric-current/cetp-mag-moment" },
  ],
};
