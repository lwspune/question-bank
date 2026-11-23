import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_FIRSTLAW_NOTE: SubtopicNote = {
  subtopicName: "First Law of Thermodynamics",
  title: "The First Law of Thermodynamics",
  oneLineDefinition:
    "The first law as energy bookkeeping, Q = ΔU + W, the sign of each term, and how to read Q, W and ΔU from a real situation.",
  whyItMatters:
    "13 questions, four of them from board papers. The board asks which quantity the first law conserves (2022, 2023), the form of the law for an isochoric process (2026) and the change in internal energy when work is done on a gas that gives out heat (2023). The textbook adds water boiling into steam, a gas lifting a lid, a gas expanding against 1 atm, a resistor in running water and fuel burned in a closed chamber.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscptd-first-law",
      name: "Statement of the first law",
      intuition:
        "Energy cannot be made or destroyed, only moved around. Heat put into a gas has two places to go: it can stay inside as internal energy, or leave as work done on the surroundings. The first law simply says the books balance.",
      definition:
        "- **Statement:** the heat Q supplied to a system is used partly to increase its internal energy and partly to do work on its surroundings: \\(Q = \\Delta U + W\\), or \\(\\Delta U = Q - W\\).\n" +
        "- It is the **law of conservation of energy** applied to a thermodynamic system, with heat counted as a form of energy.\n" +
        "- **Sign convention:** Q is positive when heat is supplied to the system and negative when the system gives out heat. W is positive when the system does work (expands) and negative when work is done on it (is compressed).\n" +
        "- All three terms are energies, measured in joule.\n" +
        "- The first law does not say in which direction heat flows. That is the job of the second law.",
      formula: {
        label: "First law",
        latex: "Q = \\Delta U + W \\quad \\text{or} \\quad \\Delta U = Q - W",
      },
      authoredExample: {
        prompt:
          "A gas absorbs 500 J of heat and expands, doing 200 J of work on its surroundings. Find the change in its internal energy.",
        steps: [
          "Given: heat absorbed, so \\(Q = +500\\) J; work done by the gas, so \\(W = +200\\) J.",
          "Formula: \\(\\Delta U = Q - W\\).",
          "Substitution: \\(\\Delta U = 500 - 200 = 300\\) J.",
          "Positive, so the internal energy increases.",
        ],
        answer: "\\(\\Delta U = +300\\) J (internal energy increases by 300 J)",
      },
      selfCheckExample: {
        prompt: "A gas does 150 J of work while its internal energy falls by 150 J. How much heat did it take in?",
        steps: ["\\(Q = \\Delta U + W = (-150) + 150 = 0\\)."],
        answer: "None: Q = 0, so the change is adiabatic",
      },
      practiceSet: [
        { prompt: "In \\(Q = \\Delta U + W\\), is W the work done by the system or on it?", answer: "By the system" },
        { prompt: "A system gives out heat. Is Q positive or negative?", answer: "Negative" },
        { prompt: "Can the first law tell you whether heat will flow from a cold body to a hot one?", answer: "No. It only balances the energy; the second law gives the direction" },
      ],
      pyqExampleId: "b56926be-348f-49ab-b213-3c431b9be64f",
      traps: [
        {
          title: "Mixing two sign conventions",
          body: "This textbook writes \\(\\Delta U = Q - W\\) with W the work done BY the system. Some books write \\(\\Delta U = Q + W\\) with W done ON it. Use the textbook's form and keep to it in every step.",
        },
        {
          title: "Stating the law without its symbols",
          body: "Writing \\(Q = \\Delta U + W\\) alone is half the statement. Say what Q, ΔU and W stand for and when each is positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-first-law-calc",
      name: "Finding ΔU, Q or W with the right signs",
      intuition:
        "Most first-law sums are about signs, not arithmetic. Before you put in any numbers, ask two questions: did heat go in or come out, and did the gas expand or get squashed? Write each value with its sign, then use ΔU = Q − W once.",
      definition:
        "- Step 1: write Q with its sign: + if heat is absorbed, − if it is released.\n" +
        "- Step 2: write W with its sign: + if work is done by the system, − if work is done on it. If W is not given, find it from \\(W = p\\,\\Delta V\\) at constant pressure.\n" +
        "- Step 3: \\(\\Delta U = Q - W\\). A negative answer means the internal energy falls.\n" +
        "- Put every term in the same unit (J or kJ) before you subtract.\n" +
        "- Boiling: when water turns into steam at constant pressure, \\(Q = mL\\), \\(W = p\\,(V_{steam} - V_{water})\\) and \\(\\Delta U = Q - W\\).",
      formula: {
        label: "Change in internal energy",
        latex: "\\Delta U = Q - W, \\qquad W = p\\,\\Delta V \\ (\\text{constant } p)",
      },
      authoredExample: {
        prompt:
          "A gas in a cylinder with a frictionless piston absorbs 300 J of heat and expands from 2 litres to 4 litres against a constant pressure of \\(1.0 \\times 10^{5}\\) Pa. Find the change in its internal energy.",
        steps: [
          "Given: \\(Q = +300\\) J, \\(p = 1.0 \\times 10^{5}\\) Pa, \\(\\Delta V = 4 - 2 = 2\\) litres \\(= 2 \\times 10^{-3}\\) m\\(^3\\).",
          "Work done by the gas: \\(W = p\\,\\Delta V = 1.0 \\times 10^{5} \\times 2 \\times 10^{-3} = 200\\) J.",
          "Formula: \\(\\Delta U = Q - W\\).",
          "Substitution: \\(\\Delta U = 300 - 200 = 100\\) J.",
        ],
        answer: "\\(\\Delta U = +100\\) J (internal energy increases)",
      },
      selfCheckExample: {
        prompt:
          "A system absorbs 80 kJ of heat and its internal energy rises by 50 kJ. How much work is done, and is it done by the system or on it?",
        steps: ["\\(W = Q - \\Delta U = 80 - 50 = 30\\) kJ.", "W is positive, so the system does the work."],
        answer: "30 kJ, done by the system",
      },
      practiceSet: [
        { prompt: "A gas absorbs 400 J of heat and its internal energy rises by 400 J. How much work does it do?", answer: "None (W = 0)" },
        { prompt: "A gas does 120 J of work on its surroundings while it absorbs 50 J of heat. Find ΔU.", answer: "\\(-70\\) J (it decreases by 70 J)" },
        { prompt: "A gas expands by \\(1 \\times 10^{-3}\\) m\\(^3\\) at a constant pressure of \\(2 \\times 10^{5}\\) Pa with no heat exchanged. Find ΔU.", answer: "\\(W = 200\\) J, so \\(\\Delta U = -200\\) J" },
      ],
      pyqExampleId: "7b2d0e73-b94c-476f-936c-7443fdce7dcc",
      traps: [
        {
          title: "Making W positive when work is done on the gas",
          body: "Work done ON the system goes into \\(\\Delta U = Q - W\\) with a minus sign. Forgetting it turns a fall in internal energy into a rise.",
        },
        {
          title: "Mixing J and kJ",
          body: "Bring every term to the same unit before you subtract. Heat in kJ and work in J cannot be combined as printed.",
        },
        {
          title: "Losing the sign in the answer",
          body: "The change in internal energy is a signed answer. Giving only its size when the internal energy falls is marked wrong: write the minus sign or say 'decreases by'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscptd-first-law-cases",
      name: "Reading Q, W and ΔU from a situation",
      intuition:
        "Many textbook questions describe a real set-up and ask what the first law says about it. Look at the walls first. A rigid wall means no change in volume, so no work. An insulated wall means no heat. Whatever is left tells you ΔU.",
      definition:
        "- Rigid container: \\(\\Delta V = 0\\), so \\(W = 0\\) and \\(Q = \\Delta U\\) (an isochoric process).\n" +
        "- Insulated container: \\(Q = 0\\), so \\(\\Delta U = -W\\) (an adiabatic process).\n" +
        "- Rigid and insulated: \\(Q = 0\\) and \\(W = 0\\), so \\(\\Delta U = 0\\). Energy can only change its form inside the system.\n" +
        "- A system whose state does not change has \\(\\Delta U = 0\\), so \\(Q = W\\).",
      table: {
        columns: ["Situation", "Q", "W", "ΔU"],
        rows: [
          {
            cells: ["Gas heated in a rigid closed container", "Positive", "Zero", "Equal to Q, positive"],
            pyqExampleId: "37f34d1f-f4ac-44cd-a2ef-51ecc484a754",
            noteAmber: "Board 2026 asked the form of the first law for an isochoric process: \\(Q = \\Delta U\\).",
          },
          { cells: ["Fuel burned in a rigid chamber standing in a water bath", "Negative (heat warms the water)", "Zero", "Negative"] },
          { cells: ["Hydrogen and oxygen exploded by a spark in a rigid insulated cylinder", "Zero", "Zero", "Zero (chemical energy becomes energy of molecular motion)"] },
          { cells: ["Resistor carrying a steady current in running water", "Negative (heat goes to the water)", "Negative (electrical work is done on it)", "Zero, so Q = W"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "500 J of electrical work is done on a resistor, and its temperature and state stay the same. How much heat does it give to its surroundings?",
        steps: ["State unchanged, so \\(\\Delta U = 0\\) and \\(Q = W\\).", "\\(W = -500\\) J (done on it), so \\(Q = -500\\) J."],
        answer: "500 J of heat is given out",
      },
      practiceSet: [
        { prompt: "A gas inside a perfectly insulated cylinder is compressed. Which term of the first law is zero?", answer: "Q, the heat" },
        { prompt: "After a reaction inside a rigid insulated cylinder, the temperature and pressure of the gas rise sharply. What is ΔU?", answer: "Zero" },
        { prompt: "A gas expands inside an insulated cylinder. Does its internal energy rise or fall?", answer: "It falls, since \\(\\Delta U = -W\\) and W is positive" },
      ],
      pyqExampleId: "37f34d1f-f4ac-44cd-a2ef-51ecc484a754",
      traps: [
        {
          title: "Taking 'the temperature rose' to mean heat was added",
          body: "In a rigid insulated cylinder the temperature can rise with \\(Q = 0\\). A rise in temperature means energy changed form or work was done on the gas; it does not prove that heat came in.",
        },
        {
          title: "Saying no heat flows from a resistor in water",
          body: "Electrical work is done on the resistor and it passes the same energy to the water as heat. Both Q and W are negative, and \\(\\Delta U = 0\\).",
        },
      ],
    },
  ],
};
