import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_SE_JUNCTION_NOTE: SubtopicNote = {
  subtopicName: "p-n Junction and the Semiconductor Diode",
  title: "p-n Junction and the Semiconductor Diode",
  oneLineDefinition:
    "How diffusion and drift build the depletion region and the barrier potential of a p-n junction, what forward and reverse bias do to the barrier and the current, the V-I characteristic of a diode and its dynamic resistance, and simple diode circuits.",
  whyItMatters:
    "59 questions, the biggest page of the chapter. Fifty-five were set in board papers, and every year from 2022 to 2026 the board asked how diffusion and drift form the depletion layer and the barrier potential. It also asks every year what forward and reverse bias do to the barrier height and the depletion width, usually as an MCQ or an assertion-reason item, and every year it asks for the circuits and the V-I characteristic of a diode in forward and reverse bias (2022 to 2026), often with the terms minority carrier injection and breakdown voltage (2023, 2026). Numericals are short: a dynamic resistance from a change in voltage and current (2026), and a diode at its threshold in series with a resistor (2025). The textbook adds why two slabs cannot be pressed into a junction, a resistance read from a V-I graph, and two exercise MCQs.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpse-junction-formation",
      name: "Formation of a p-n junction: diffusion and drift",
      intuition:
        "Join p-type and n-type material in one crystal and the holes and electrons spread out, just as a scent spreads across a room: that is diffusion. Each carrier that leaves uncovers a fixed ion behind it, and these ions set up an electric field across the junction. The field pushes minority carriers back the other way: that is drift. The junction settles when the two currents are equal.",
      definition:
        "How a p-n junction forms, one step a line:\n" +
        "- The p-side has many holes and the n-side many electrons, so there is a concentration gradient across the junction.\n" +
        "- Holes diffuse from p to n and electrons from n to p. This is the **diffusion current**.\n" +
        "- An electron leaving the n-side leaves an immobile **positive donor ion**; a hole leaving the p-side leaves an immobile **negative acceptor ion**. A layer of positive charge builds on the n-side and of negative charge on the p-side.\n" +
        "- This space-charge region, emptied of free carriers, is the **depletion region**. Its thickness is of the order of one tenth of a micrometre.\n" +
        "- The charges set up an electric field from the n-side to the p-side. It moves an electron on the p-side to the n-side and a hole on the n-side to the p-side. This is **drift**, and the **drift current** is opposite to the diffusion current.\n" +
        "- At first the diffusion current is large and the drift current small. As the space-charge regions extend, the field and the drift current grow, until the drift current equals the diffusion current. The junction is then formed, with **no net current**.\n" +
        "- The n-side, having lost electrons, is positive relative to the p-side. This potential difference opposes further flow of electrons from n to p, so it is called the **barrier potential**.\n" +
        "- **The diagram in words:** a bar with the p-region on the left and the n-region on the right; in the middle a narrow depletion region with minus signs on its p-side and plus signs on its n-side; arrows for hole and electron diffusion across the junction and for drift the other way; the field E marked from n to p.",
      table: {
        columns: ["Feature", "Diffusion current", "Drift current"],
        rows: [
          {
            cells: ["Cause", "Concentration gradient across the junction", "Electric field of the depletion region"],
            pyqExampleId: "ec796579-2dc4-4907-b2b1-5234c7122659",
            noteAmber: "Board 2024 asked the difference between diffusion and drift current and their roles in forming the junction.",
          },
          { cells: ["Carriers that move", "Majority carriers: holes p to n, electrons n to p", "Minority carriers: electrons p to n, holes n to p"] },
          {
            cells: ["At the start of formation", "Large", "Small"],
            pyqExampleId: "b0a7455e-eed9-4ed1-8ab5-d99e9454ba71",
            noteAmber: "Board 2024 asked which current is large at the start.",
          },
          {
            cells: ["At equilibrium", "Equal to the drift current", "Equal and opposite to the diffusion current, so the net current is zero"],
            pyqExampleId: "092aa199-046c-4b0c-a698-b27031eaaa2d",
            noteAmber: "Board 2026 asked what is true of the two currents in an unbiased junction at equilibrium.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Can a p-n junction be made by pressing a slab of p-type material firmly against a slab of n-type material? Give the reason.",
        steps: [
          "Any slab, however flat, has roughness much larger than the spacing between atoms (about 2 to 3 Å).",
          "So the two slabs never touch continuously at the atomic level, and the join acts as a break for the carriers.",
        ],
        answer: "No. The surfaces cannot make continuous contact at the atomic level, so no junction forms",
      },
      practiceSet: [
        { prompt: "On which side of a p-n junction is the layer of positive immobile ions?", answer: "On the n-side (ionised donors)" },
        { prompt: "What is the order of thickness of the depletion region?", answer: "About one tenth of a micrometre" },
        { prompt: "Why do the dopant ions in the depletion region not move?", answer: "They are bonded to the surrounding atoms of the crystal lattice" },
      ],
      pyqExampleId: "770316c6-a320-4ec8-8165-23b7a10f7124",
      traps: [
        {
          title: "Saying the dopant atoms move",
          body: "Only electrons and holes diffuse. The donor and acceptor ions are fixed in the lattice, and it is these fixed ions that form the depletion region.",
        },
        {
          title: "Putting the charges on the wrong sides",
          body: "The n-side of the depletion region is POSITIVE (donors that lost electrons) and the p-side NEGATIVE. So the field points from n to p.",
        },
        {
          title: "Leaving drift out of the answer",
          body: "'Explain the two processes' needs both: diffusion from the concentration gradient, and drift of minority carriers due to the field, balancing at equilibrium. Diffusion alone is half the answer.",
        },
        {
          title: "Assertion-reason codes",
          body: "CBSE's codes are: (A) both true and R explains A; (B) both true, R does not explain A; (C) A true, R false; (D) both false. Check each statement on its own first. In 2025 the reason swapped the carriers of p-type and n-type, so it was false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-biasing",
      name: "Forward bias and reverse bias",
      intuition:
        "Bias is the battery you connect across the diode. Connect it one way and it fights the barrier, so the barrier falls and carriers pour across: a large current. Connect it the other way and it adds to the barrier, so majority carriers are held back and only a trickle of minority carriers gets through. That one-way behaviour is what makes a diode useful.",
      definition:
        "- **Forward bias:** p-side to the positive terminal, n-side to the negative. The applied voltage V is opposite to the built-in potential \\(V_0\\), so the barrier falls to \\(V_0 - V\\) and the depletion layer gets narrower.\n" +
        "- Electrons from the n-side cross into the p-side and holes from the p-side into the n-side, where each is a minority carrier. This is **minority carrier injection**. The injected carriers diffuse away from the junction, and this gives the forward current, of the order of mA.\n" +
        "- **Reverse bias:** n-side to the positive terminal, p-side to the negative. The applied voltage is in the same direction as the barrier potential, so the barrier rises to \\(V_0 + V\\) and the depletion region widens. Diffusion almost stops.\n" +
        "- The reverse current is a drift of minority carriers swept across the junction. It is of the order of μA and hardly depends on the applied voltage, because it is limited by the number of minority carriers, not by the voltage.\n" +
        "- In both cases the applied voltage drops mostly across the depletion region, because its resistance is very high compared with that of the p-side and the n-side.\n" +
        "- **Diode symbol:** an arrow with a bar. The arrow points in the direction of conventional current in forward bias, from the p-side to the n-side.\n" +
        "- A strong current heats the junction; above the rated value the diode is destroyed by overheating.",
      table: {
        columns: ["Feature", "Forward bias", "Reverse bias"],
        rows: [
          { cells: ["Connection", "p-side to +, n-side to −", "p-side to −, n-side to +"] },
          {
            cells: ["Barrier height", "Falls to \\(V_0 - V\\)", "Rises to \\(V_0 + V\\)"],
            pyqExampleId: "3dd4b3aa-d252-4298-a1d8-056f518aafeb",
            noteAmber: "Board 2024 asked what reverse bias does: the barrier rises and the depletion region widens.",
          },
          { cells: ["Depletion width", "Decreases", "Increases"] },
          {
            cells: ["Current and carriers", "Large (mA), from injected carriers diffusing", "Tiny (μA), drift of minority carriers"],
            pyqExampleId: "9f42bc9a-5bcd-4fa7-a5c2-1e7aa3fbe5fd",
            noteAmber: "Board 2026 asked when minority carrier injection happens: in forward bias.",
          },
          {
            cells: ["Resistance shown by a multimeter", "Low", "High"],
            pyqExampleId: "fd67b613-970c-4f84-824a-041aa85b629d",
            noteAmber: "Board 2026 asked what a good diode shows on a multimeter.",
          },
          {
            cells: ["Where the applied voltage drops", "Mostly across the depletion region", "Mostly across the depletion region"],
            pyqExampleId: "a41944e7-033d-45ac-aebb-617869790547",
            noteAmber: "Board 2025 and 2026 asked where the voltage drops in a reverse-biased junction.",
          },
          { cells: ["Meter used to read the current", "Milliammeter", "Microammeter"] },
        ],
      },
      selfCheckExample: {
        prompt: "A diode has its p-side at +2 V and its n-side at +5 V. Is it forward or reverse biased?",
        steps: ["Forward bias needs the p-side at the higher potential.", "Here the n-side is higher, by 3 V."],
        answer: "Reverse biased",
      },
      practiceSet: [
        { prompt: "Which carriers carry the current in a reverse-biased diode?", answer: "Minority carriers, drifting across the junction" },
        { prompt: "What does the arrow in a diode symbol show?", answer: "The direction of conventional current when the diode is forward biased" },
        { prompt: "Why is the reverse current of a diode almost independent of the reverse voltage?", answer: "It is limited by the number of minority carriers, and even a small voltage sweeps all of them across" },
      ],
      pyqExampleId: "a8c0ef01-442e-43ce-b215-f22366b89756",
      traps: [
        {
          title: "Saying forward bias widens the depletion layer",
          body: "Forward bias NARROWS the depletion layer and lowers the barrier. Widening and a higher barrier belong to reverse bias. The board asks this as a 'which is not correct' MCQ.",
        },
        {
          title: "Saying forward voltage is along the barrier",
          body: "In forward bias the applied voltage is OPPOSITE to the built-in potential. Board 2026 set an assertion-reason where both statements said the reverse, and both were false.",
        },
        {
          title: "Circuits without the right meter or labels",
          body: "Draw the p and n ends, the battery's + and −, and a milliammeter for forward bias but a microammeter for reverse bias. A missing label or the wrong meter costs the diagram mark.",
        },
        {
          title: "Calling the reverse current a majority current",
          body: "The tiny reverse current is carried by MINORITY carriers. Majority carriers are held back by the raised barrier.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpse-vi-curve",
      name: "V-I characteristic and dynamic resistance",
      intuition:
        "Plot the diode current against the voltage across it. In forward bias almost nothing flows until the voltage nearly cancels the barrier; after that the current shoots up. In reverse bias a tiny, nearly constant current flows until breakdown. Because the curve is not a straight line, the diode's resistance changes from point to point, so we use the slope instead: the dynamic resistance.",
      definition:
        "- **Circuit:** a battery connected to the diode through a potentiometer (or rheostat) so the voltage can be changed, a voltmeter across the diode, and a milliammeter (forward bias) or a microammeter (reverse bias) in series.\n" +
        "- **Forward bias:** the current rises very slowly at first. After the **threshold** (cut-in) voltage, about 0.7 V for silicon and about 0.2 V for germanium (many books give 0.3 V for germanium), it rises sharply (exponentially) for a very small increase in voltage.\n" +
        "- **Reverse bias:** the current is very small (μA) and almost constant: the **reverse saturation current**. At a critical reverse voltage, the **breakdown voltage** \\(V_{br}\\), the current increases suddenly.\n" +
        "- **Drawing it:** V along the horizontal axis, I along the vertical. Forward branch in the first quadrant on a mA scale, flat near the axis then sharply up after the knee at the threshold voltage. Reverse branch in the third quadrant on a μA scale, almost flat, then turning sharply down at \\(V_{br}\\). Mark the different scales.\n" +
        "- **Threshold against breakdown:** threshold is the forward voltage after which the current rises sharply; breakdown is the reverse voltage at which the reverse current rises suddenly.\n" +
        "- The diode conducts mainly in one direction: its forward resistance is low and its reverse resistance high. This is the property used to rectify ac.\n" +
        "- **Dynamic resistance:** the ratio of a small change in voltage to the small change in current it causes.",
      formula: {
        label: "Dynamic resistance of a diode",
        latex: "r_d = \\frac{\\Delta V}{\\Delta I}",
        symbols: [
          { symbol: "\\(\\Delta V\\)", meaning: "small change in the voltage across the diode" },
          { symbol: "\\(\\Delta I\\)", meaning: "the change in current it causes" },
        ],
      },
      authoredExample: {
        prompt:
          "From the V-I graph of a silicon diode: at 0.65 V the current is 5 mA, and at 0.75 V it is 25 mA. At a reverse voltage of 15 V the current is 3 μA. Find the forward dynamic resistance and the reverse resistance.",
        steps: [
          "Given: \\(\\Delta V = 0.75 - 0.65 = 0.10\\) V, \\(\\Delta I = 25 - 5 = 20\\) mA \\(= 0.020\\) A.",
          "Formula: \\(r_d = \\dfrac{\\Delta V}{\\Delta I}\\).",
          "\\(r_{fb} = \\dfrac{0.10}{0.020} = 5\\ \\Omega\\).",
          "Reverse: \\(r_{rb} = \\dfrac{15}{3 \\times 10^{-6}} = 5 \\times 10^{6}\\ \\Omega\\).",
        ],
        answer: "Forward: \\(5\\ \\Omega\\); reverse: \\(5 \\times 10^{6}\\ \\Omega\\)",
      },
      selfCheckExample: {
        prompt: "The current through a diode rises from 12 mA to 32 mA when the forward voltage rises from 0.70 V to 0.78 V. Find its dynamic resistance.",
        steps: ["\\(\\Delta V = 0.08\\) V and \\(\\Delta I = 20\\) mA \\(= 0.020\\) A.", "\\(r_d = \\dfrac{0.08}{0.020} = 4\\ \\Omega\\)."],
        answer: "\\(4\\ \\Omega\\)",
      },
      practiceSet: [
        { prompt: "A diode passes 0.5 μA at a reverse voltage of 5 V. What is its reverse resistance?", answer: "\\(1 \\times 10^{7}\\ \\Omega\\)" },
        { prompt: "What is the threshold voltage of a silicon diode?", answer: "About 0.7 V" },
        { prompt: "Name the reverse voltage at which the reverse current of a diode rises suddenly.", answer: "The breakdown voltage" },
      ],
      pyqExampleId: "5db1f4eb-e48c-4f0d-a8b3-cc721862df2d",
      traps: [
        {
          title: "Using V ÷ I instead of the change",
          body: "Dynamic resistance is \\(\\Delta V / \\Delta I\\), the change in voltage over the change in current. Dividing one voltage by one current gives a different, wrong value on a curved graph.",
        },
        {
          title: "Forgetting to change mA and μA into amperes",
          body: "Write the current change in amperes before dividing: 20 mA is 0.020 A and 3 μA is \\(3 \\times 10^{-6}\\) A. Otherwise the answer is off by a thousand or a million.",
        },
        {
          title: "One current scale for both quadrants",
          body: "The forward current is in mA and the reverse current in μA. Drawn on one scale the reverse branch vanishes. Mark the two scales and the knee and breakdown voltages: the graph carries marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpse-diode-circuits",
      name: "A diode in a circuit",
      intuition:
        "In a circuit, first decide whether the diode is forward biased: is its p-side (the arrow's tail) at the higher potential? If not, it blocks and no current flows. If it is, a real silicon diode takes about 0.7 V for itself and the rest of the battery voltage drives current through the resistor. An ideal diode takes nothing at all.",
      definition:
        "- **Forward or reverse:** a diode is forward biased when its p-side (anode, the triangle's flat end) is at a higher potential than its n-side (cathode, the bar).\n" +
        "- **Below threshold:** even in forward bias, if the voltage across the diode is less than the threshold voltage, the current is almost zero.\n" +
        "- **Real diode in a loop:** with the diode conducting at its threshold \\(V_0\\), the loop rule gives \\(V = V_0 + IR\\).\n" +
        "- **Ideal diode:** zero resistance (a plain wire) in forward bias and an open switch in reverse bias. Redraw the circuit with each conducting diode as a wire and each blocking diode removed, then solve it with Ohm's law.",
      formula: {
        label: "Battery, diode and resistor in series",
        latex: "V = V_0 + IR \\qquad I = \\frac{V - V_0}{R}",
        symbols: [
          { symbol: "\\(V\\)", meaning: "battery voltage" },
          { symbol: "\\(V_0\\)", meaning: "voltage across the conducting diode (about 0.7 V for silicon; zero for an ideal diode)" },
          { symbol: "\\(R\\)", meaning: "series resistance" },
        ],
      },
      authoredExample: {
        prompt: "A diode that keeps 0.6 V across it while conducting is forward biased by a 5.4 V battery through a 480 Ω resistor. Find the current.",
        steps: [
          "Given: \\(V = 5.4\\) V, \\(V_0 = 0.6\\) V, \\(R = 480\\ \\Omega\\).",
          "Formula: \\(I = \\dfrac{V - V_0}{R}\\).",
          "\\(I = \\dfrac{5.4 - 0.6}{480} = \\dfrac{4.8}{480} = 0.01\\) A.",
        ],
        answer: "10 mA",
      },
      selfCheckExample: {
        prompt: "A diode that keeps 0.6 V across it while conducting and a 300 Ω resistor are in series with a 2.1 V battery, the diode forward biased. Find the current.",
        steps: ["\\(I = \\dfrac{2.1 - 0.6}{300} = \\dfrac{1.5}{300}\\).", "\\(I = 0.005\\) A."],
        answer: "5 mA",
      },
      practiceSet: [
        { prompt: "A diode with a threshold of 0.6 V is forward biased by a 0.4 V cell through a resistor. About how much current flows?", answer: "Almost zero, because 0.4 V is below the threshold" },
        { prompt: "An ideal diode, forward biased, is in series with a 2 kΩ resistor across a 6 V battery. Find the current.", answer: "3 mA" },
        { prompt: "A diode's anode is at −3 V and its cathode at −4 V. Is it forward or reverse biased?", answer: "Forward biased: the anode is 1 V higher" },
      ],
      pyqExampleId: "255a18b9-df0b-4f55-80f8-abe55cd37089",
      traps: [
        {
          title: "Judging bias by the sign of one terminal",
          body: "A diode with both ends negative can still be forward biased. Compare the two ends: forward bias needs the anode HIGHER than the cathode, whatever the signs.",
        },
        {
          title: "Forgetting the diode's own drop",
          body: "A conducting silicon diode keeps its threshold voltage across itself. Only the rest of the battery voltage appears across the resistor, unless the question says the diode is ideal.",
        },
      ],
    },
  ],
};
