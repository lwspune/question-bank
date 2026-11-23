import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_CE_METERS_NOTE: SubtopicNote = {
  subtopicName: "Galvanometer, Ammeter and Voltmeter",
  title: "Galvanometer into Ammeter and Voltmeter",
  oneLineDefinition:
    "How a moving coil galvanometer becomes an ammeter with a low resistance shunt in parallel, or a voltmeter with a high resistance in series, and how ideal and real meters differ.",
  whyItMatters:
    "17 questions, eleven of them from board papers from 2023 to 2026, six in 2024 alone. The board asks you to explain each conversion, calculate the shunt or series resistance, state the resistance of an ideal voltmeter (asked three times) and distinguish an ammeter from a voltmeter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpce-ammeter",
      name: "Converting a galvanometer into an ammeter",
      intuition:
        "A galvanometer reaches full scale with only a tiny current. To measure a large current, give most of it another path: a low resistance, the shunt, joined in parallel with the coil. The coil and the shunt share the same potential difference, so the current divides in the inverse ratio of their resistances, and only the full scale current goes through the coil.",
      definition:
        "- A **low resistance S (shunt) is connected in parallel** with the galvanometer.\n" +
        "- G is the galvanometer resistance, \\(I_g\\) its full scale current, I the range of the ammeter.\n" +
        "- Same potential difference across coil and shunt: \\(I_g G = (I - I_g)S\\), so \\(S = \\dfrac{I_g G}{I - I_g}\\).\n" +
        "- If the range is n times the full scale current (\\(I = nI_g\\)): \\(S = \\dfrac{G}{n - 1}\\).\n" +
        "- Resistance of the ammeter: \\(\\dfrac{GS}{G + S}\\), very small. It is joined in series in a circuit.",
      formula: {
        label: "Shunt",
        latex: "S = \\frac{I_g\\,G}{I - I_g}",
      },
      authoredExample: {
        prompt:
          "A galvanometer has a resistance of 50 Ω and gives full scale deflection for 5 mA. What resistance is needed, and how is it connected, to convert it into an ammeter of range 0 to 1 A?",
        steps: [
          "Given: \\(G = 50\\ \\Omega\\), \\(I_g = 5\\) mA \\(= 0.005\\) A, \\(I = 1\\) A.",
          "A shunt S is connected in parallel: \\(S = \\dfrac{I_g G}{I - I_g}\\).",
          "\\(S = \\dfrac{0.005 \\times 50}{1 - 0.005} = \\dfrac{0.25}{0.995} = 0.251\\ \\Omega\\).",
        ],
        answer: "A shunt of 0.251 Ω in parallel with the galvanometer",
      },
      selfCheckExample: {
        prompt: "A shunt lets 10% of the main current pass through a galvanometer of resistance 90 Ω. Find the shunt.",
        steps: ["\\(I_g = 0.1I\\), so \\(S = \\dfrac{0.1I \\times 90}{I - 0.1I} = \\dfrac{9}{0.9}\\)."],
        answer: "10 Ω",
      },
      practiceSet: [
        { prompt: "Is the shunt connected in series or in parallel with the galvanometer?", answer: "In parallel" },
        { prompt: "A galvanometer of resistance G is to read n times its full scale current. What shunt is needed?", answer: "\\(S = \\dfrac{G}{n - 1}\\)" },
        { prompt: "Why must an ammeter have a very low resistance?", answer: "It is joined in series, so it must not change the current it measures" },
      ],
      pyqExampleId: "2921ddcb-7707-4887-9299-57fc62efc6a8",
      traps: [
        {
          title: "Forgetting to say how the resistance is connected",
          body: "The question asks 'what resistance and how is it connected'. The value alone is half the answer: write 'in parallel (shunt)' for an ammeter.",
        },
        {
          title: "Leaving the current in milliamperes",
          body: "Convert \\(I_g\\) to amperes before substituting. 5 mA is 0.005 A; using 5 against a range of 1 A gives a nonsense shunt.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpce-voltmeter",
      name: "Converting a galvanometer into a voltmeter",
      intuition:
        "A voltmeter is joined across two points and should draw almost no current. So add a high resistance in series with the coil: the full range voltage across the pair then drives just the full scale current through the coil. The larger the range wanted, the larger the series resistance.",
      definition:
        "- A **high resistance X is connected in series** with the galvanometer.\n" +
        "- For a range V: \\(V = I_g(G + X)\\), so \\(X = \\dfrac{V}{I_g} - G\\).\n" +
        "- Resistance of the voltmeter: \\(G + X = \\dfrac{V}{I_g}\\), very large. It is joined in parallel across the points whose potential difference is measured.",
      formula: {
        label: "Series resistance",
        latex: "X = \\frac{V}{I_g} - G",
      },
      authoredExample: {
        prompt:
          "A galvanometer of resistance 20 Ω gives full scale deflection for 1 mA. What resistance should be added, and how, to make a voltmeter of range 0 to 5 V?",
        steps: [
          "Given: \\(G = 20\\ \\Omega\\), \\(I_g = 1\\) mA \\(= 10^{-3}\\) A, \\(V = 5\\) V.",
          "A resistance X is connected in series: \\(X = \\dfrac{V}{I_g} - G\\).",
          "\\(X = \\dfrac{5}{10^{-3}} - 20 = 5000 - 20 = 4980\\ \\Omega\\).",
        ],
        answer: "4980 Ω in series with the galvanometer",
      },
      selfCheckExample: {
        prompt: "To increase the range of a voltmeter made from a galvanometer, should the series resistance be increased or decreased?",
        steps: ["\\(X = V/I_g - G\\): a larger V needs a larger X."],
        answer: "Increased",
      },
      practiceSet: [
        { prompt: "Is the high resistance joined in series or in parallel with the galvanometer to make a voltmeter?", answer: "In series" },
        { prompt: "A voltmeter of range V is made from a galvanometer whose full scale current is \\(I_g\\). What is the voltmeter's resistance?", answer: "\\(V / I_g\\)" },
        { prompt: "A galvanometer of resistance 10 Ω needs 2 mA for full scale. Find the series resistance for a range of 0 to 2 V.", answer: "990 Ω" },
      ],
      pyqExampleId: "36a0ccf8-3fb2-4e53-b0a1-bfdcf1e34509",
      traps: [
        {
          title: "Forgetting to subtract G",
          body: "\\(V/I_g\\) is the whole voltmeter's resistance. The resistance to ADD is that minus the coil's own G.",
        },
        {
          title: "Shunt for a voltmeter",
          body: "A low resistance in parallel makes an ammeter; a high resistance in series makes a voltmeter. Mixing them up loses the whole question.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpce-ideal-meters",
      name: "Ammeter and voltmeter compared",
      intuition:
        "An ammeter sits in the path of the current, so the less it resists, the less it disturbs. A voltmeter sits beside the part being measured, so the more it resists, the less current it steals. The ideal ammeter has zero resistance and the ideal voltmeter infinite resistance.",
      definition:
        "- A real voltmeter of resistance \\(R_V\\) across a cell of e.m.f. \\(\\varepsilon\\) and internal resistance r reads \\(V = \\dfrac{\\varepsilon R_V}{R_V + r}\\), less than \\(\\varepsilon\\).\n" +
        "- The board asks 'distinguish between an ammeter and a voltmeter' for two marks: give matching points from both sides.",
      table: {
        columns: ["Point", "Ammeter", "Voltmeter"],
        rows: [
          {
            cells: ["Measures", "Current, in amperes", "Potential difference, in volts"],
            pyqExampleId: "61b85898-c2a5-4a57-bd12-ced781fe9a75",
            noteAmber: "Board 2024 asked you to distinguish the two, two points each.",
          },
          { cells: ["How it is joined", "In series", "In parallel, across the two points"] },
          { cells: ["Its resistance", "Very low; ideal is zero", "Very high; ideal is infinite"] },
          { cells: ["Made from a galvanometer by", "A low resistance shunt in parallel", "A high resistance in series"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the resistance of an ideal ammeter?", answer: "Zero" },
        { prompt: "A voltmeter of resistance 90 Ω is joined across a cell of e.m.f. 2 V and internal resistance 10 Ω. What does it read?", answer: "1.8 V" },
      ],
      traps: [
        {
          title: "Calling an ideal voltmeter's resistance zero",
          body: "An ideal voltmeter draws no current, so its resistance is infinite. Zero is the ideal ammeter.",
        },
      ],
    },
  ],
};
