import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_ENGINES_NOTE: SubtopicNote = {
  subtopicName: "Heat Engines",
  title: "Heat Engines and Their Efficiency",
  oneLineDefinition:
    "How a heat engine takes heat from a hot source, turns part of it into work and rejects the rest to a cold sink, and what limits its efficiency.",
  whyItMatters:
    "1 question, from the textbook: what sets the limits on the efficiency of a heat engine. No board paper in this bank asks about heat engines on their own, but the efficiency formula on this page is the one the board uses for the Carnot engine (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscptd-heat-engine",
      name: "Heat engine and its efficiency",
      intuition:
        "A heat engine runs in a cycle. In each round its working substance takes heat from a hot source, does some work, and dumps the rest into a cold sink. It can never turn all the heat into work, so its efficiency is always less than 1.",
      definition:
        "- **Parts:** a hot reservoir (the source) at \\(T_H\\), a working substance that goes through a cycle, and a cold reservoir (the sink) at \\(T_C\\).\n" +
        "- In one cycle the engine absorbs \\(Q_H\\) from the source, does work W and rejects \\(Q_C\\) to the sink. Over a cycle \\(\\Delta U = 0\\), so \\(W = |Q_H| - |Q_C|\\).\n" +
        "- **Efficiency:** \\(\\eta = \\dfrac{W}{Q_H} = 1 - \\dfrac{|Q_C|}{|Q_H|}\\).\n" +
        "- **What limits it:** some heat is always rejected, so \\(\\eta < 1\\). The second law forbids an engine of 100% efficiency. The largest possible value between \\(T_H\\) and \\(T_C\\) is the Carnot efficiency \\(1 - T_C/T_H\\), with temperatures in kelvin. Friction and other irreversible losses make a real engine less efficient still.\n" +
        "- So for a high efficiency, keep \\(T_H\\) as high and \\(T_C\\) as low as possible.",
      formula: {
        label: "Efficiency of a heat engine",
        latex: "\\eta = \\frac{W}{Q_H} = 1 - \\frac{|Q_C|}{|Q_H|}",
      },
      authoredExample: {
        prompt:
          "An engine takes 5000 J of heat from its source in each cycle and rejects 3500 J to its sink. Find the work done per cycle and the efficiency.",
        steps: [
          "Given: \\(Q_H = 5000\\) J, \\(Q_C = 3500\\) J.",
          "Work: \\(W = Q_H - Q_C = 5000 - 3500 = 1500\\) J.",
          "Efficiency: \\(\\eta = \\dfrac{W}{Q_H} = \\dfrac{1500}{5000} = 0.30\\).",
        ],
        answer: "W = 1500 J per cycle; η = 0.30, that is 30%",
      },
      selfCheckExample: {
        prompt:
          "An engine of efficiency 25% does 400 J of work in each cycle. How much heat does it take from the source, and how much does it reject?",
        steps: ["\\(Q_H = W/\\eta = 400/0.25 = 1600\\) J.", "\\(Q_C = Q_H - W = 1600 - 400 = 1200\\) J."],
        answer: "Takes 1600 J; rejects 1200 J",
      },
      practiceSet: [
        { prompt: "What are the three parts of every heat engine?", answer: "A hot reservoir (source), a working substance and a cold reservoir (sink)" },
        { prompt: "An engine absorbs 2000 J and does 500 J of work per cycle. How much heat does it reject?", answer: "1500 J" },
        { prompt: "What is the change in internal energy of the working substance over one full cycle?", answer: "Zero" },
      ],
      pyqExampleId: "3b5b0aab-4118-40e2-84cf-19b8564ae337",
      traps: [
        {
          title: "Dividing by the heat rejected",
          body: "Efficiency is the work divided by the heat TAKEN from the source, \\(W/Q_H\\), never \\(W/Q_C\\).",
        },
        {
          title: "An efficiency above 100%",
          body: "If your efficiency comes out above 1, you have swapped two of the heats. No engine can do more work than the heat it takes in.",
        },
      ],
    },
  ],
};
