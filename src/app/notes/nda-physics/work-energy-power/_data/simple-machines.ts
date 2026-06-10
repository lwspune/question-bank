import type { SubtopicNote } from "@/app/notes/_types";

export const SIMPLE_MACHINES_NOTE: SubtopicNote = {
  subtopicName: "Simple Machines",
  title: "Simple Machines — Levers and Mechanical Advantage",
  oneLineDefinition:
    "A simple machine multiplies force or changes its direction. The lever is the NDA favourite: classified into three orders by where the fulcrum, load, and effort sit — and the second-class lever (fulcrum at one end, load in the middle) is the recurring question.",
  whyItMatters:
    "A small but reliable scorer — 2 PYQs (2023, 2024), both on lever classification. " +
    "The whole subtopic comes down to one recall fact: the three orders of levers and where the fulcrum, load, and effort lie in each. Memorise the second-class lever and its examples and these are guaranteed marks.",
  concepts: [
    // Concept 1 — FOUNDATION: what a lever is + mechanical advantage
    {
      kind: "formula" as const,
      slug: "wep-lever-and-mechanical-advantage",
      name: "The lever and mechanical advantage",
      intuition:
        "A lever is a rigid bar that turns about a fixed point (the fulcrum). Push down on one side and the other side pushes up — and by placing the fulcrum cleverly you can lift a big load with a small effort. " +
        "How much the lever multiplies your effort is its mechanical advantage.",
      definition:
        "A **lever** is a rigid rod free to rotate about a fixed pivot, the **fulcrum**, with a **load** to be moved and an **effort** applied. " +
        "Its **mechanical advantage** is \\(MA = \\dfrac{\\text{load}}{\\text{effort}} = \\dfrac{\\text{effort arm}}{\\text{load arm}}\\) — the ratio of the distances from the fulcrum. " +
        "A long effort arm and a short load arm give a large mechanical advantage (a small effort lifts a big load).",
      formula: {
        label: "Mechanical advantage of a lever",
        latex: "MA = \\dfrac{\\text{load}}{\\text{effort}} = \\dfrac{\\text{effort arm}}{\\text{load arm}}",
        symbols: [
          { symbol: "MA", meaning: "mechanical advantage (no units)" },
          { symbol: "\\text{effort arm}", meaning: "distance from fulcrum to effort (m)" },
          { symbol: "\\text{load arm}", meaning: "distance from fulcrum to load (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "On a lever, the effort arm is 90 cm and the load arm is 30 cm. Find the mechanical advantage, and the effort needed to lift a 60 N load.",
        steps: [
          "Mechanical advantage \\(MA = \\dfrac{\\text{effort arm}}{\\text{load arm}} = \\dfrac{90}{30} = 3\\).",
          "Since \\(MA = \\text{load}/\\text{effort}\\), the effort \\(= \\text{load}/MA = 60/3\\).",
          "Effort = 20 N.",
        ],
        answer: "MA = 3; effort needed = 20 N.",
      },
      selfCheckExample: {
        prompt:
          "A lever balances a 100 N load with a 25 N effort. Find its mechanical advantage.",
        steps: [
          "\\(MA = \\dfrac{\\text{load}}{\\text{effort}} = \\dfrac{100}{25}\\).",
          "\\(MA = 4\\).",
        ],
        answer: "MA = 4.",
      },
      practiceSet: [
        { prompt: "Define the fulcrum of a lever.", answer: "The fixed point about which the lever rotates" },
        { prompt: "A lever has effort arm 60 cm, load arm 20 cm. Find its mechanical advantage.", answer: "3", method: "\\(MA = 60/20\\)" },
        { prompt: "A 40 N effort lifts a 120 N load on a lever. Mechanical advantage?", answer: "3", method: "\\(MA = \\text{load}/\\text{effort} = 120/40\\)" },
        { prompt: "To get a large mechanical advantage, should the effort arm be long or short compared with the load arm?", answer: "Long", method: "\\(MA = \\text{effort arm}/\\text{load arm}\\)" },
      ],
      traps: [
        {
          title: "Mechanical advantage multiplies FORCE, not work",
          body:
            "A lever lets a small effort move a big load, but it does not create energy: you move the effort end through a larger distance. The work in roughly equals the work out — only the force is multiplied.",
        },
      ],
    },

    // Concept 2 — three orders of levers (REFERENCE)
    {
      kind: "reference" as const,
      slug: "wep-orders-of-levers",
      name: "The three orders of levers",
      intuition:
        "Levers come in three classes, set apart by which of the three points — fulcrum, load, effort — sits in the MIDDLE. " +
        "The NDA test is almost always about the second-class lever, where the LOAD is in the middle (think wheelbarrow or bottle opener).",
      definition:
        "Levers are classified by the position of the **fulcrum (F)**, **load (L)**, and **effort (E)** along the bar:\n" +
        "- **First class:** fulcrum in the MIDDLE (E – F – L) — e.g. a seesaw, scissors, crowbar.\n" +
        "- **Second class:** load in the MIDDLE (F – L – E) — e.g. a wheelbarrow, bottle opener, nutcracker; always \\(MA > 1\\).\n" +
        "- **Third class:** effort in the MIDDLE (F – E – L) — e.g. forceps, tongs, the human forearm; always \\(MA < 1\\).",
      table: {
        columns: ["Order", "What is in the middle", "Examples"],
        rows: [
          { cells: ["First class", "Fulcrum in the middle (E–F–L)", "seesaw, scissors, crowbar, beam balance"] },
          {
            cells: ["**Second class**", "**Load in the middle (F–L–E)**", "wheelbarrow, bottle opener, nutcracker"],
            noteAmber: "The bank's favourite. Second class = load in the middle; example = bottle opener / wheelbarrow.",
          },
          { cells: ["Third class", "Effort in the middle (F–E–L)", "forceps, tongs, fishing rod, human forearm"] },
        ],
        caption:
          "Tell them apart by what sits in the middle: fulcrum (1st), load (2nd), effort (3rd). Second-class levers always have mechanical advantage greater than 1.",
      },
      selfCheckExample: {
        prompt:
          "Which sketch correctly describes a second-class lever: (a) load at one end, fulcrum in middle, effort at other; (b) fulcrum at one end, load in middle, effort at other end?",
        steps: [
          "A second-class lever has the LOAD in the middle.",
          "Sketch (a) puts the fulcrum in the middle — that is a FIRST-class lever.",
          "Sketch (b) puts the load in the middle, with fulcrum and effort at the ends — that is the second-class lever.",
        ],
        answer: "(b) — fulcrum at one end, load in the middle, effort at the other end.",
      },
      practiceSet: [
        { prompt: "In a second-class lever, which of fulcrum, load, effort is in the middle?", answer: "Load" },
        { prompt: "Give one example of a second-class lever.", answer: "Wheelbarrow (or bottle opener / nutcracker)" },
        { prompt: "Which class of lever has the fulcrum in the middle?", answer: "First class", method: "e.g. a seesaw or scissors" },
        { prompt: "A pair of forceps is which class of lever?", answer: "Third class", method: "effort in the middle, MA < 1" },
      ],
      pyqExampleId: "271a537b-ebe9-4c58-86ee-ab771f2f7bc0", // 2024 — second-class lever sketch (load in middle)
      traps: [
        {
          title: "Second class = LOAD in the middle (not fulcrum)",
          body:
            "Tell the orders apart by the MIDDLE element: fulcrum (first), load (second), effort (third). A second-class lever has the load between the fulcrum and the effort — a bottle opener or wheelbarrow, not a seesaw.",
        },
      ],
    },
  ],
};
