import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_RATES_NOTE: SubtopicNote = {
  subtopicName: "Interest, Work and Speed",
  title: "Percentages in Interest, Work and Speed",
  oneLineDefinition:
    "Interest as a percentage of the principal, work done as a percentage of a job, and speed changed by a percentage, plus the speed and distance basics these questions lean on.",
  whyItMatters:
    "About a quarter of this page is HARD. The percentage part is usually one factor; what costs marks is the inverse step, since time goes down when speed or efficiency goes up, and by a smaller percentage. The last group of questions is plain speed, distance and time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-interest",
      name: "Simple and compound interest",
      intuition:
        "Simple interest pays the same percentage of the principal every year. Compound interest pays it on the growing amount, the growth formula from the population page, so it pulls ahead a little more each year.",
      definition:
        "- **Simple interest:** \\(SI = \\dfrac{P \\times R \\times T}{100}\\); amount \\(= P + SI\\).\n" +
        "- A sum that doubles at simple interest has earned 100% of itself; one that becomes four times itself has earned 300%.\n" +
        "- **Compound interest:** amount \\(= P\\left(1 + \\tfrac{R}{100}\\right)^T\\); \\(CI = \\) amount \\(- P\\).\n" +
        "- For 2 years, \\(CI - SI = P\\left(\\tfrac{R}{100}\\right)^2\\): the interest earned on the first year's interest.",
      formula: {
        label: "Simple and compound interest",
        latex: "SI = \\dfrac{PRT}{100}, \\qquad A = P\\left(1 + \\dfrac{R}{100}\\right)^T",
      },
      authoredExample: {
        prompt: "Find the simple interest and the compound interest on ₹8,000 at 10% a year for 2 years.",
        steps: [
          "SI \\(= \\tfrac{8000 \\times 10 \\times 2}{100} = 1600\\).",
          "Amount at CI \\(= 8000 \\times 1.21 = 9680\\), so CI \\(= 1680\\).",
          "The difference, 80, is \\(8000 \\times 0.1^2\\).",
        ],
        answer: "SI ₹1,600; CI ₹1,680.",
      },
      selfCheckExample: {
        prompt: "A sum becomes four times itself in 15 years at simple interest. Find the rate.",
        steps: ["The interest is three times the principal, 300% of it, over 15 years.", "\\(300 \\div 15 = 20\\%\\) a year."],
        answer: "20% a year.",
      },
      practiceSet: [
        { prompt: "Find the simple interest on ₹6,000 at 8% a year for 3 years.", answer: "₹1,440" },
        { prompt: "Find the amount on ₹4,000 at 10% compound interest for 2 years.", answer: "₹4,840" },
        { prompt: "₹2,000 grows to ₹2,662 at 10% compound interest. For how many years?", answer: "3 years" },
        { prompt: "Find CI minus SI on ₹20,000 at 6% for 2 years.", answer: "₹72" },
      ],
      pyqExampleId: "04cc4a3b-e41e-48fa-99b7-36ecfba5430e",
      traps: [
        {
          title: "Amount is not interest",
          body: "₹4,000 at 10% compound for 2 years amounts to ₹4,840, but the interest is ₹840. Read whether the question asks for the amount or the interest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-work-percent",
      name: "Work done as a percentage of a job",
      intuition:
        "If A does 40% of a job in 10 days, A does 4% a day and needs 25 days for the whole job. Turn every percentage into a daily rate, then add or subtract rates.",
      definition:
        "- \\(p\\%\\) of a job in \\(d\\) days: the whole job takes \\(\\dfrac{100d}{p}\\) days; the daily rate is \\(\\dfrac{p}{d}\\%\\).\n" +
        "- Working together, **rates add**: \\(\\tfrac{1}{T} = \\tfrac{1}{a} + \\tfrac{1}{b}\\).\n" +
        "- 'A is 40% more efficient than B' means A's rate is 1.4 times B's, so A takes \\(\\tfrac{1}{1.4}\\) of B's time.\n" +
        "- Efficiency and time are inversely proportional: efficiency \\(\\times\\) time is the job. So is men \\(\\times\\) days.",
      formula: {
        label: "Rates add",
        latex: "\\dfrac{1}{T} = \\dfrac{1}{a} + \\dfrac{1}{b}",
      },
      authoredExample: {
        prompt: "A does 40% of a job in 6 days. A and B together finish the whole job in 10 days. How long would B take alone?",
        steps: [
          "A takes \\(6 \\div 0.4 = 15\\) days for the whole job.",
          "B's rate \\(= \\tfrac{1}{10} - \\tfrac{1}{15} = \\tfrac{3 - 2}{30} = \\tfrac{1}{30}\\).",
          "B alone takes 30 days.",
        ],
        answer: "30 days.",
      },
      selfCheckExample: {
        prompt: "A is 40% more efficient than B, and B takes 28 days to do a job. How long do they take together?",
        steps: ["A takes \\(28 \\div 1.4 = 20\\) days.", "Together: \\(\\tfrac{1}{20} + \\tfrac{1}{28} = \\tfrac{7 + 5}{140} = \\tfrac{12}{140}\\).", "Time \\(= \\tfrac{140}{12} = 11\\tfrac 23\\) days."],
        answer: "\\(11\\tfrac 23\\) days.",
      },
      practiceSet: [
        { prompt: "A worker does 30% of a job in 9 days. How long does the whole job take?", answer: "30 days" },
        { prompt: "A machine at 80% efficiency takes 15 hours for a task. How long at full efficiency?", answer: "12 hours" },
        { prompt: "36 men do 40% of a job in 10 days. How many men finish the rest in 12 days?", answer: "45", method: "The job is 900 man-days; 540 remain." },
      ],
      pyqExampleId: "6f74bac9-9af1-454a-9323-e5f9ad60086b",
      traps: [
        {
          title: "More efficient does not mean that much less time",
          body: "40% more efficient takes \\(\\tfrac{1}{1.4}\\) of the time, about 29% less, not 40% less. Rates and times are inverse.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-speed-change",
      name: "Speed changed by a percentage",
      intuition:
        "Over a fixed distance, time is distance over speed. Raise the speed by 20% and the time is divided by 1.2, so it falls by one sixth, not by 20%. It is the undo-a-change rule from the successive-change page.",
      definition:
        "- Same distance: new time \\(=\\) old time \\(\\div\\) speed factor.\n" +
        "- Speed up \\(r\\%\\): time falls by \\(\\dfrac{r}{100 + r} \\times 100\\%\\). Speed down \\(r\\%\\): time rises by \\(\\dfrac{r}{100 - r} \\times 100\\%\\).\n" +
        "- To finish in a set time, the speed factor is old time \\(\\div\\) new time.\n" +
        "- The same inverse rule holds for fuel: if the kilometres per litre fall, the litres needed rise.",
      formula: {
        label: "Time after a change in speed",
        latex: "t_{\\text{new}} = \\dfrac{t_{\\text{old}}}{1 + r/100}",
      },
      authoredExample: {
        prompt: "A car takes 6 hours for a journey. Its speed is raised by 20%. How long does the journey take now, and by what percent has the time fallen?",
        steps: ["New time \\(= 6 \\div 1.2 = 5\\) hours.", "It fell by 1 hour on 6: \\(16\\tfrac 23\\%\\)."],
        answer: "5 hours; \\(16\\tfrac 23\\%\\).",
      },
      selfCheckExample: {
        prompt: "A bus usually takes 4 hours for a trip. Its speed falls by 20%. How much longer does the trip take?",
        steps: ["New time \\(= 4 \\div 0.8 = 5\\) hours."],
        answer: "1 hour longer.",
      },
      practiceSet: [
        { prompt: "Speed falls by 10%. By what percent does the time for the same distance rise?", answer: "\\(11\\tfrac 19\\%\\)" },
        { prompt: "A trip takes 9 hours. By what percent must the speed rise to do it in 8 hours?", answer: "12.5%" },
        { prompt: "A car at 60 km/h raises its speed by 15%. Find the new speed.", answer: "69 km/h" },
      ],
      pyqExampleId: "18e33b1b-a667-426c-b637-db2792ba823a",
      traps: [
        {
          title: "Time does not fall by the same percentage",
          body: "20% faster saves \\(16\\tfrac 23\\%\\) of the time, not 20%. The time is divided by 1.2, not multiplied by 0.8.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-speed-basics",
      name: "Speed, distance and time: the basics used here",
      intuition:
        "Some questions filed with percentages are plain speed problems. Three facts carry them: distance is speed times time, speeds add or subtract when two things move, and an average speed is total distance over total time.",
      definition:
        "- \\(\\text{distance} = \\text{speed} \\times \\text{time}\\). To change km/h into m/s multiply by \\(\\tfrac{5}{18}\\).\n" +
        "- A train passing a pole covers its own length; passing a platform or bridge, its length plus the platform's.\n" +
        "- **Relative speed:** add the speeds when moving towards each other, subtract when moving the same way.\n" +
        "- A boat: downstream speed \\(= b + c\\), upstream \\(= b - c\\); still-water speed is the average of the two.\n" +
        "- **Average speed** is total distance over total time, never the average of the speeds.",
      formula: {
        label: "Speed, distance and time",
        latex: "d = s \\times t, \\qquad \\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}",
      },
      authoredExample: {
        prompt: "A train 120 m long crosses a 230 m platform in 14 seconds. Find its speed in km/h.",
        steps: ["It covers \\(120 + 230 = 350\\) m in 14 s: 25 m/s.", "\\(25 \\times \\tfrac{18}{5} = 90\\)."],
        answer: "90 km/h.",
      },
      selfCheckExample: {
        prompt: "A cyclist rides 30 km at 10 km/h and then 30 km at 15 km/h. Find the average speed.",
        steps: ["Times: 3 hours and 2 hours.", "\\(60 \\div 5 = 12\\)."],
        answer: "12 km/h.",
      },
      practiceSet: [
        { prompt: "Trains 200 m and 160 m long run towards each other at 70 km/h and 74 km/h. How long do they take to cross?", answer: "9 seconds" },
        { prompt: "A boat goes 12 km/h in still water and the current is 3 km/h. How long does 45 km downstream take?", answer: "3 hours" },
        { prompt: "Write 54 km/h in m/s.", answer: "15 m/s" },
      ],
      pyqExampleId: "0386c9df-2262-483f-b7cd-3c82df62fd23",
      traps: [
        {
          title: "Average speed is not the average of speeds",
          body: "30 km at 10 km/h and 30 km at 15 km/h average 12 km/h, not 12.5. More time is spent at the slower speed.",
        },
      ],
    },
  ],
};
