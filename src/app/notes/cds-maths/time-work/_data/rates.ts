import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TW_RATES_NOTE: SubtopicNote = {
  subtopicName: "Work Rates",
  title: "Work Rates",
  oneLineDefinition:
    "Someone who finishes a job in n days does 1/n of it each day; rates add when people work together.",
  whyItMatters:
    "Fourteen PYQs, two of them HARD. Every one is solved on RATES, never on days: find each person's fraction per day, add or subtract the fractions, and turn the total back into days at the end. Pay goes the same way — in the ratio of the rates.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstw-rates",
      name: "Adding and subtracting rates",
      intuition:
        "Days do not add, but daily fractions of the job do. Two people who take \\(6\\) and \\(10\\) hours do \\(\\tfrac16 + \\tfrac1{10}\\) of the job each hour together; the time is the reciprocal of that sum.",
      definition:
        "- Alone in \\(n\\) days: rate \\(\\dfrac1n\\). Together: add the rates; time \\(= \\dfrac{1}{\\text{total rate}}\\).\n" +
        "- Two people together: \\(\\dfrac{ab}{a + b}\\) days.\n" +
        "- One partner's rate \\(=\\) joint rate \\(-\\) the other's.\n" +
        "- Three pairs given: adding them gives \\(2(A + B + C)\\).\n" +
        "- '\\(k\\) times as efficient': rate \\(k\\) times, time \\(\\dfrac1k\\) times.\n" +
        "- Wages for a joint job: in the ratio of the rates.",
      formula: {
        label: "Together",
        latex: "\\dfrac{1}{T} = \\dfrac1a + \\dfrac1b",
      },
      authoredExample: {
        prompt: "\\(P\\) and \\(Q\\) together finish a job in \\(8\\) days, and \\(Q\\) alone in \\(24\\). How long does \\(P\\) take alone?",
        steps: ["\\(\\dfrac18 - \\dfrac1{24} = \\dfrac2{24}\\)."],
        answer: "\\(12\\) days.",
      },
      selfCheckExample: {
        prompt: "\\(A\\) works twice as fast as \\(B\\), and together they finish in \\(10\\) days. How long does \\(B\\) take alone?",
        steps: ["Rates \\(2b\\) and \\(b\\): \\(3b = \\dfrac1{10}\\)."],
        answer: "\\(30\\) days.",
      },
      practiceSet: [
        { prompt: "\\(4\\) and \\(12\\) hours. Together?", answer: "\\(3\\) hours" },
        { prompt: "Pairs \\(10, 15, 30\\) days. All three?", answer: "\\(10\\) days" },
        { prompt: "Times \\(x, 2x, 3x\\). Wage ratio?", answer: "\\(6 : 3 : 2\\)" },
        { prompt: "\\(A\\) thrice as fast as \\(B\\), \\(20\\) days sooner. \\(B\\)?", answer: "\\(30\\) days" },
      ],
      pyqExampleId: "d63204cc-175c-421f-a771-417b7fa6981f", // 2017 (I) — A and B in 12 days, B alone in 30
      traps: [
        {
          title: "Times do not add",
          body:
            "Workers taking \\(6\\) and \\(10\\) hours do not finish together in \\(8\\) or \\(16\\). Add the rates: \\(\\tfrac16 + \\tfrac1{10} = \\tfrac4{15}\\), so \\(3\\tfrac34\\) hours.",
        },
        {
          title: "Pay by rate, not by time",
          body:
            "The faster worker earns MORE for a joint job. Times \\(x\\), \\(1.5x\\), \\(2x\\) give pay \\(6 : 4 : 3\\), the reverse of \\(2 : 3 : 4\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdstw-stages",
      name: "Joining, leaving and taking turns",
      intuition:
        "Split the job into stages. Each stage does (rate \\(\\times\\) time) of the work, and the stages add up to the whole job, \\(1\\).",
      definition:
        "- Stages: \\(r_1t_1 + r_2t_2 + \\cdots = 1\\).\n" +
        "- Someone leaves after \\(n\\) days: \\(n\\,(\\text{joint rate}) + (\\text{remaining time})(\\text{remaining rate}) = 1\\).\n" +
        "- Taking turns: add one full cycle, count whole cycles, then finish the last part at the next person's rate.\n" +
        "- 'One person per hour, nobody twice running': alternate the two fastest.",
      formula: {
        label: "Stages",
        latex: "r_1 t_1 + r_2 t_2 = 1",
      },
      authoredExample: {
        prompt: "\\(A\\) can do a job in \\(20\\) days and \\(B\\) in \\(30\\). They start together; \\(A\\) leaves after \\(6\\) days. How long does \\(B\\) take to finish?",
        steps: ["Together \\(6\\left(\\tfrac1{20} + \\tfrac1{30}\\right) = \\tfrac12\\).", "\\(B\\) does the other half at \\(\\tfrac1{30}\\) a day."],
        answer: "\\(15\\) more days.",
      },
      selfCheckExample: {
        prompt: "\\(X\\) takes \\(3\\) days and \\(Y\\) takes \\(6\\). They work on alternate days, \\(X\\) first. On which day is the job finished?",
        steps: ["Two days do \\(\\tfrac13 + \\tfrac16 = \\tfrac12\\). Four days do the whole job."],
        answer: "At the end of the fourth day.",
      },
      practiceSet: [
        { prompt: "Rate \\(\\tfrac1{12}\\) for \\(4\\) days. Fraction left?", answer: "\\(\\tfrac23\\)" },
        { prompt: "Together \\(\\tfrac1{10}\\) for \\(5\\) days, then one alone at \\(\\tfrac1{20}\\). Days more?", answer: "\\(10\\)" },
        { prompt: "Alternate days, rates \\(\\tfrac14\\) and \\(\\tfrac14\\). Days?", answer: "\\(4\\)" },
        { prompt: "\\(B\\) works \\(12\\) of its \\(30\\) days alone. Fraction done?", answer: "\\(\\tfrac25\\)" },
      ],
      pyqExampleId: "32f489d6-e89a-4983-b96d-514f45a0ce3e", // 2022 (II) — X leaves after n days, Y finishes in 23
      traps: [
        {
          title: "The last turn may be partial",
          body:
            "Taking turns, the job often ends part-way through a day. Count the fraction left after the whole cycles and give that to the NEXT person, not to whoever would suit the answer.",
        },
      ],
    },
  ],
};
