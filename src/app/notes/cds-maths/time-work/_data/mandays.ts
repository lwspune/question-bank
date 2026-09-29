import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TW_MANDAYS_NOTE: SubtopicNote = {
  subtopicName: "Man-Days and Man-Hours",
  title: "Man-Days and Man-Hours",
  oneLineDefinition:
    "A fixed job needs a fixed number of man-days (or man-hours), so men × days × hours stays constant for the same work.",
  whyItMatters:
    "Seventeen PYQs, none HARD. Extra men to finish on time, men who leave half-way, a bigger wall, 20 persons and 20 floors: measure the job in man-days once, then share out what is left. Five more hide the same idea inside algebra, 'work of (x + 2) men in (x − 3) days'.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstw-mandays",
      name: "Men × days × hours",
      intuition:
        "Twice the men finish in half the days; twice the work needs twice the man-days. So \\(\\dfrac{M_1D_1H_1}{W_1} = \\dfrac{M_2D_2H_2}{W_2}\\) for any two gangs of equal workers.",
      definition:
        "- \\(\\dfrac{M_1 D_1 H_1}{W_1} = \\dfrac{M_2 D_2 H_2}{W_2}\\).\n" +
        "- Part done, part left: total man-days \\(=\\) man-days used \\(\\div\\) fraction done; the rest is shared over the days left.\n" +
        "- Men leaving in batches: add the man-days block by block until the job is covered.\n" +
        "- Work measured by size (a wall's volume, rooms, hectares): the work is proportional to it.",
      formula: {
        label: "Constant work",
        latex: "\\dfrac{M_1 D_1 H_1}{W_1} = \\dfrac{M_2 D_2 H_2}{W_2}",
      },
      authoredExample: {
        prompt: "\\(16\\) men working \\(6\\) hours a day finish a job in \\(15\\) days. How many days do \\(12\\) men working \\(8\\) hours a day need?",
        steps: ["\\(16 \\times 15 \\times 6 = 1440\\) man-hours.", "\\(12 \\times 8 = 96\\) man-hours a day."],
        answer: "\\(15\\) days.",
      },
      selfCheckExample: {
        prompt: "\\(40\\) men are to finish a job in \\(30\\) days. After \\(10\\) days only a fifth is done. How many more men are needed?",
        steps: ["A fifth took \\(400\\) man-days, so the job is \\(2000\\).", "\\(1600\\) man-days in \\(20\\) days needs \\(80\\) men."],
        answer: "\\(40\\) more.",
      },
      practiceSet: [
        { prompt: "\\(6\\) men, \\(10\\) days. \\(15\\) men?", answer: "\\(4\\) days" },
        { prompt: "\\(10\\) men do \\(10\\) units in \\(10\\) days. \\(5\\) men, \\(5\\) units?", answer: "\\(10\\) days" },
        { prompt: "\\(x(x + 2) = (x + 6)(x - 2)\\). \\(x\\)?", answer: "\\(6\\)" },
        { prompt: "Wall twice as long and three times as thick. Work ratio?", answer: "\\(6 : 1\\)" },
      ],
      pyqExampleId: "cdb14316-08ea-424c-9b9a-eaa65039579a", // 2018 (II) — 12 men, 8 hours, 10 days; 8 men in 8 days
      traps: [
        {
          title: "Count the whole job, not the part",
          body:
            "If a quarter took \\(10{,}000\\) man-days, the job is \\(40{,}000\\) and the part LEFT is \\(30{,}000\\). Sharing \\(40{,}000\\) over the days left overstates the men needed.",
        },
        {
          title: "Additional men, or men in all?",
          body:
            "The calculation gives the number of men who must be working. Subtract the men already there when the question asks for ADDITIONAL men.",
        },
      ],
    },
  ],
};
