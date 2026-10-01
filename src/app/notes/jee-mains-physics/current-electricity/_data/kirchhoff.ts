import type { SubtopicNote } from "@/app/notes/_types";

export const KIRCHHOFF_CE_NOTE: SubtopicNote = {
  subtopicName: "Kirchhoff's Laws and the Wheatstone Bridge",
  title: "Kirchhoff's Laws and the Wheatstone Bridge",
  oneLineDefinition:
    "Current entering a junction equals current leaving it, and the potential changes around any closed loop add to zero; dividers and the balanced Wheatstone bridge are the shortcuts these two laws give.",
  whyItMatters:
    "Twenty-nine PYQs, sixteen of them multiple choice, and three from 2026; twenty-eight come with a figure. Ten are dividers: a current splitting between parallel branches, the voltage across one of several series resistors, and a bulb treated as a resistor. Nine are Wheatstone bridges: the unknown arm for balance, or the current once the middle arm drops out. Ten need Kirchhoff's laws in full: node potentials, circuits with two cells, and the current through a bridge that is not balanced.",
  concepts: [
    // C1 — dividers
    {
      kind: "formula" as const,
      slug: "jpce-divider",
      name: "Current and voltage dividers",
      intuition:
        "Two resistors in series carry the same current, so the voltage splits in proportion to resistance: the bigger resistor takes the bigger share. Two resistors in parallel have the same voltage, so the current splits the other way: the smaller resistor takes the bigger share. Anything else connected across part of a divider, a bulb or a meter, is just another resistor in parallel with that part.",
      definition:
        "- Series pair across V: \\(V_1 = V\\dfrac{R_1}{R_1 + R_2}\\).\n" +
        "- Parallel pair carrying I: \\(I_1 = I\\dfrac{R_2}{R_1 + R_2}\\) (the OTHER resistor on top).\n" +
        "- A bulb rated \\(V_0\\), \\(P_0\\) is a resistor \\(R = V_0^{2}/P_0\\). It does not have its rated voltage unless the circuit gives it that.\n" +
        "- A load across part of a divider: combine it in parallel with that part first, then divide.\n" +
        "- The potential difference between the midpoints of two dividers across the same supply is the difference of their two outputs.",
      formula: {
        label: "Dividers",
        latex: "V_1 = V\\frac{R_1}{R_1 + R_2}, \\qquad I_1 = I\\frac{R_2}{R_1 + R_2}",
      },
      authoredExample: {
        prompt:
          "A 12 V battery drives a 2 kΩ and a 4 kΩ resistor in series. Find the voltage across the 4 kΩ. Then a 4 kΩ load is connected across the 4 kΩ resistor; find the new voltage across it.",
        steps: [
          "Without the load: \\(12 \\times \\dfrac{4}{6} = 8\\) V.",
          "With the load: 4 kΩ in parallel with 4 kΩ is 2 kΩ.",
          "Now the divider is 2 kΩ and 2 kΩ: the loaded part gets \\(12 \\times \\dfrac{2}{4} = 6\\) V.",
        ],
        answer: "8 V without the load, 6 V with it",
      },
      selfCheckExample: {
        prompt:
          "A 24 V battery drives a 4 Ω resistor in series with a parallel pair of 6 Ω and 12 Ω. Find the current in the 12 Ω.",
        steps: [
          "\\(6 \\parallel 12 = \\dfrac{72}{18} = 4\\ \\Omega\\). Total \\(= 8\\ \\Omega\\), so \\(I = 3\\) A.",
          "The pair has \\(3 \\times 4 = 12\\) V across it.",
          "\\(I_{12} = 12/12 = 1\\) A. (Check with the divider: \\(3 \\times \\tfrac{6}{18} = 1\\) A.)",
        ],
        answer: "1 A",
      },
      practiceSet: [
        { prompt: "10 A splits between 2 Ω and 8 Ω in parallel. Current in the 8 Ω?", answer: "2 A" },
        { prompt: "A bulb is rated 100 V, 50 W. Its resistance?", answer: "200 Ω" },
        { prompt: "9 V across 1 kΩ and 2 kΩ in series. Voltage across the 2 kΩ?", answer: "6 V" },
        { prompt: "Two dividers sit across the same 12 V. In one, the 3 Ω is on top and the 1 Ω below; in the other, the 1 Ω is on top and the 3 Ω below. Potential difference between their midpoints?", answer: "6 V", method: "Midpoints at 3 V and 9 V above the negative terminal." },
      ],
      pyqExampleId: "44d7568e-d6e4-4350-a17a-a908e630aa24", // 2026: 200 Ω and 400 Ω on 100 V, a 200 V 100 W bulb across the 400 Ω
      traps: [
        {
          title: "Current divides inversely",
          body: "In parallel, the larger share of current goes through the SMALLER resistor. Putting a resistor's own value on top of the fraction gives the other branch's current.",
        },
        {
          title: "A rating is not the working voltage",
          body: "A 200 V bulb in a 100 V circuit does not have 200 V across it. Use the rating only to find R, then let the circuit decide the voltage.",
        },
        {
          title: "A load lowers the output",
          body: "Anything connected across part of a divider lowers that part's resistance and so its voltage. Using the unloaded value is the trap option.",
        },
      ],
    },

    // C2 — the Wheatstone bridge
    {
      kind: "formula" as const,
      slug: "jpce-wheatstone",
      name: "The balanced Wheatstone bridge",
      intuition:
        "A Wheatstone bridge is two dividers side by side with a resistor or galvanometer joining their middles. When both dividers split the voltage in the same ratio, their middles are at the same potential and nothing flows across. That middle arm can then be removed or replaced by a wire, and the network becomes two simple branches in parallel.",
      definition:
        "- Arms P and Q in one branch, R and S in the other, with the middle arm joining P–Q to R–S: the bridge is balanced when \\(\\dfrac{P}{Q} = \\dfrac{R}{S}\\).\n" +
        "- At balance the middle arm carries no current, whatever its resistance. Remove it: \\(R_{\\text{eq}} = (P + Q) \\parallel (R + S)\\).\n" +
        "- An arm can itself be a combination; reduce it to one value first.\n" +
        "- \"The potential at A equals the potential at B\" or \"no current through the galvanometer\" means balance: use the ratio to find the unknown.\n" +
        "- Check the ratio before using balance. A bridge that is not balanced needs Kirchhoff's laws.\n" +
        "- Heating one arm of a balanced bridge changes its resistance, so the bridge goes out of balance and a current flows in the middle arm.",
      formula: {
        label: "Balance condition",
        latex: "\\frac{P}{Q} = \\frac{R}{S} \\ \\Rightarrow\\ I_{\\text{middle}} = 0, \\qquad R_{\\text{eq}} = \\frac{(P + Q)(R + S)}{P + Q + R + S}",
      },
      authoredExample: {
        prompt:
          "A bridge has P = 3 Ω and Q = 6 Ω in one branch and R = 4 Ω and an unknown S in the other, with a 10 Ω resistor across the middle. It is balanced and driven by 12 V. Find S and the current from the battery.",
        steps: [
          "Balance: \\(\\dfrac{3}{6} = \\dfrac{4}{S}\\), so \\(S = 8\\ \\Omega\\).",
          "The 10 Ω carries nothing. Branches: \\(3 + 6 = 9\\ \\Omega\\) and \\(4 + 8 = 12\\ \\Omega\\).",
          "\\(R_{\\text{eq}} = \\dfrac{9 \\times 12}{21} = \\dfrac{36}{7}\\ \\Omega\\), so \\(I = 12 \\times \\dfrac{7}{36} = \\dfrac{7}{3}\\) A.",
        ],
        answer: "S = 8 Ω; 7/3 A ≈ 2.33 A",
      },
      selfCheckExample: {
        prompt:
          "A bridge has P = 2 Ω and Q = 4 Ω. The arm R is a 3 Ω and a 6 Ω in parallel. Find S for balance.",
        steps: [
          "\\(R = 3 \\parallel 6 = 2\\ \\Omega\\).",
          "\\(\\dfrac{2}{4} = \\dfrac{2}{S}\\), so \\(S = 4\\ \\Omega\\).",
        ],
        answer: "4 Ω",
      },
      practiceSet: [
        { prompt: "P = 5 Ω, Q = 10 Ω, R = 7 Ω. S for balance?", answer: "14 Ω" },
        { prompt: "P = 2 Ω, Q = 4 Ω, R = 3 Ω, S = 6 Ω, with 5 Ω in the middle arm. Equivalent resistance?", answer: "3.6 Ω" },
        { prompt: "Is the bridge P = 2 Ω, Q = 3 Ω, R = 4 Ω, S = 6 Ω balanced?", answer: "Yes: 2/3 = 4/6" },
        { prompt: "In a balanced bridge the galvanometer is replaced by a plain wire. Does the equivalent resistance change?", answer: "No" },
      ],
      pyqExampleId: "7fcc7cc2-af3e-451f-a4ab-cad2002e5a7b", // 2025: 10, 20, R, 40 Ω bridge, 30 Ω middle arm, 40 V; current when V_A = V_B
      traps: [
        {
          title: "Pair the arms correctly",
          body: "The ratio compares the two arms on the same side of the middle arm in each branch: P/Q = R/S, where P and R both touch the same input point. Cross-pairing gives a wrong unknown.",
        },
        {
          title: "The middle arm's value is irrelevant at balance",
          body: "At balance the middle arm carries nothing, so its resistance never enters the answer. A question that gives it is testing whether you notice.",
        },
        {
          title: "Check before assuming balance",
          body: "Five resistors in a diamond look like a bridge, but only equal ratios make it balanced. If the ratios differ, use Kirchhoff's laws.",
        },
      ],
    },

    // C3 — Kirchhoff's laws
    {
      kind: "formula" as const,
      slug: "jpce-kirchhoff",
      name: "Kirchhoff's laws and node potentials",
      intuition:
        "Charge does not pile up at a junction, so what flows in flows out: that is the junction law. Potential is like height: walk around any closed loop and you come back to where you started, so the rises and drops add to zero: that is the loop law. The quickest way to use both is to give each junction an unknown potential and write one junction equation for it.",
      definition:
        "- **Junction law**: \\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\).\n" +
        "- **Loop law**: \\(\\sum \\varepsilon = \\sum IR\\) around any closed loop.\n" +
        "- Walking from one point to another: across a resistor in the direction of its current, the potential drops by IR; against the current, it rises by IR. Across a cell from − to +, it rises by \\(\\varepsilon\\); from + to −, it drops by \\(\\varepsilon\\).\n" +
        "- **Node method**: fix one point at 0 V. Give each other junction an unknown potential. At each, write \\(\\sum \\dfrac{V_x - V_i}{R_i} = 0\\) over the branches leaving it. A cell in a branch shifts the far end's potential by its emf.\n" +
        "- A current that comes out negative is flowing the other way; the size is still right.",
      formula: {
        label: "Junction equation at a node x",
        latex: "\\sum_i \\frac{V_x - V_i}{R_i} = 0, \\qquad \\sum \\varepsilon = \\sum IR",
      },
      authoredExample: {
        prompt:
          "A junction X is joined to three points through 2 Ω, 3 Ω and 6 Ω. Those points are at 12 V, 6 V and 0 V. Find the potential of X and the current in each branch.",
        steps: [
          "\\(\\dfrac{V - 12}{2} + \\dfrac{V - 6}{3} + \\dfrac{V - 0}{6} = 0\\).",
          "Multiply by 6: \\(3V - 36 + 2V - 12 + V = 0\\), so \\(V = 8\\) V.",
          "Currents: \\((12 - 8)/2 = 2\\) A into X; \\((8 - 6)/3 = 2/3\\) A out to the 6 V point; \\(8/6 = 4/3\\) A out to 0 V. Check: \\(2 = 2/3 + 4/3\\).",
        ],
        answer: "\\(V_X = 8\\) V; 2 A in, 2/3 A and 4/3 A out",
      },
      selfCheckExample: {
        prompt:
          "Two cells share a common bottom rail at 0 V. Cell 1 (10 V) reaches the top node through 2 Ω; cell 2 (4 V) reaches it through 2 Ω; a 4 Ω joins the top node to the bottom rail. Both cells have their + terminal towards the top. Find the current in the 4 Ω and in each cell.",
        steps: [
          "Let the top node be at V: \\(\\dfrac{V - 10}{2} + \\dfrac{V - 4}{2} + \\dfrac{V}{4} = 0\\).",
          "Multiply by 4: \\(2V - 20 + 2V - 8 + V = 0\\), so \\(V = 5.6\\) V. The 4 Ω carries \\(5.6/4 = 1.4\\) A.",
          "Cell 1 delivers \\((10 - 5.6)/2 = 2.2\\) A. Cell 2: \\((4 - 5.6)/2 = -0.8\\) A, so 0.8 A flows INTO its + terminal: it is being charged.",
        ],
        answer: "1.4 A in the 4 Ω; cell 1 gives 2.2 A; 0.8 A flows into cell 2",
      },
      practiceSet: [
        { prompt: "From A you cross a 2 Ω resistor carrying 3 A in your direction, then a 5 V cell from − to +, reaching B. \\(V_B - V_A\\)?", answer: "−1 V" },
        { prompt: "5 A and 2 A enter a junction; 4 A leaves by one wire. Current in the only other wire?", answer: "3 A, leaving" },
        { prompt: "A single loop has a 12 V and a 4 V cell opposing each other and 4 Ω in total. Current?", answer: "2 A" },
        { prompt: "Point X is joined through 1 Ω each to points at 6 V, 3 V and 0 V. Potential of X?", answer: "3 V" },
      ],
      pyqExampleId: "2ee4deba-d61d-46da-93e8-5bb308a65cfb", // 2023: junction joined to 30 V, 12 V and 2 V through 10, 20 and 30 Ω
      traps: [
        {
          title: "The sign of a cell depends on the direction you cross it",
          body: "Crossing a cell from − to + is a rise of ε, from + to − a drop. The direction of the current through the cell does not matter for this sign; it matters only for the IR term.",
        },
        {
          title: "A negative current is not a mistake",
          body: "If a current comes out negative, it flows opposite to the arrow you drew. Keep the size; flip the direction.",
        },
        {
          title: "One equation per unknown node",
          body: "With node potentials you need as many junction equations as unknown potentials, no more. Writing loop equations on top of them only adds algebra.",
        },
      ],
    },
  ],
};
