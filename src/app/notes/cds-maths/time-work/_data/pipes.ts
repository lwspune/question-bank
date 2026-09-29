import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TW_PIPES_NOTE: SubtopicNote = {
  subtopicName: "Pipes and Cisterns",
  title: "Pipes and Cisterns",
  oneLineDefinition:
    "Pipes are workers whose job is filling a tank; an outlet is a worker with a negative rate.",
  whyItMatters:
    "Six PYQs, one of them HARD. Treat each inlet as a positive rate and each outlet or leak as a negative one, add them, and use stages when a pipe is opened late or closed early — the same equation as work in stages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstw-pipes",
      name: "Inlets, outlets and leaks",
      intuition:
        "A tap that fills a tank in \\(n\\) hours adds \\(\\tfrac1n\\) of it an hour; a drain that empties it in \\(m\\) hours removes \\(\\tfrac1m\\). The net rate is the sum with signs.",
      definition:
        "- Inlet: \\(+\\dfrac1n\\). Outlet or leak: \\(-\\dfrac1m\\).\n" +
        "- Net rate \\(=\\) inlets \\(-\\) outlets; time \\(= \\dfrac1{\\text{net rate}}\\).\n" +
        "- Pipes opened or closed part-way: stages that add to \\(1\\) tank.\n" +
        "- Capacity from litres per minute: capacity \\(=\\) net litres per minute \\(\\times\\) minutes.",
      formula: {
        label: "Net rate",
        latex: "\\dfrac1T = \\dfrac1{n} - \\dfrac1{m}",
      },
      authoredExample: {
        prompt: "A tap fills a tank in \\(4\\) hours; a leak empties it in \\(12\\). How long does the tap take with the leak open?",
        steps: ["\\(\\tfrac14 - \\tfrac1{12} = \\tfrac2{12}\\)."],
        answer: "\\(6\\) hours.",
      },
      selfCheckExample: {
        prompt: "Tap \\(P\\) fills a tank in \\(3\\) hours and \\(Q\\) in \\(6\\). \\(P\\) is opened at noon and \\(Q\\) at \\(1\\) p.m. When is the tank full?",
        steps: ["By \\(1\\) p.m. \\(P\\) has filled \\(\\tfrac13\\).", "Then \\(\\tfrac12\\) an hour; \\(\\tfrac23\\) left takes \\(\\tfrac43\\) hours."],
        answer: "At \\(2{:}20\\) p.m.",
      },
      practiceSet: [
        { prompt: "Two outlets: both \\(12\\) min, one \\(20\\) min. The other?", answer: "\\(30\\) min" },
        { prompt: "Fill \\(6\\) h, empty \\(9\\) h, both open. Time?", answer: "\\(18\\) h" },
        { prompt: "\\(10 + 8 - 3\\) L/min for \\(60\\) min. Capacity?", answer: "\\(900\\) L" },
        { prompt: "Three taps \\(6\\) h together; one alone \\(12\\) h. The other two?", answer: "\\(12\\) h" },
      ],
      pyqExampleId: "5d2e8842-e7f9-4a1c-ae2b-579f974f8539", // 2017 (II) — tap fills in 10 h; an outlet open for the first 5 h
      traps: [
        {
          title: "Subtract the outlet",
          body:
            "An outlet works AGAINST the tap. A tap of \\(4\\) hours and a leak of \\(12\\) hours together take \\(6\\) hours, not the \\(3\\) hours that adding the rates would give.",
        },
      ],
    },
  ],
};
