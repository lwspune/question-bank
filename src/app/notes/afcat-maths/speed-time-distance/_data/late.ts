import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_LATE_NOTE: SubtopicNote = {
  subtopicName: "Late, Early and Changed Speed",
  title: "Late or Early: Finding the Usual Time and the Distance",
  oneLineDefinition:
    "A slower or faster speed turns the usual time into a known number of minutes late or early, and two different speeds with their delays fix the distance.",
  whyItMatters:
    "No AFCAT paper has set one of these here, but the bank leans on them and most are MODERATE: each is one equation. The minutes late or early are a fraction of the usual time. Marks go on taking the fraction of the wrong time, or on comparing two speeds without adding the minutes late to the minutes early.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-slower-late",
      name: "Slower than usual: the delay gives the usual time",
      intuition:
        "At \\(\\tfrac pq\\) of the usual speed the trip takes \\(\\tfrac qp\\) of the usual time. The part over and above the usual time is the delay, so the delay is a known fraction of the usual time.",
      definition:
        "- Usual time \\(t\\), speed times \\(\\tfrac pq\\) with \\(p < q\\): the new time is \\(\\tfrac qp\\,t\\) and the delay is \\(\\tfrac{q - p}{p}\\,t\\).\n" +
        "- 'Reduces his speed by 20%' means \\(\\tfrac45\\) of the speed, so the delay is \\(\\tfrac t4\\).\n" +
        "- If only part of the journey is slow, only that part's time stretches.\n" +
        "- The usual time comes out in the unit of the delay: minutes in, minutes out.",
      formula: {
        label: "The delay at a slower speed",
        latex: "\\text{delay} = \\left(\\dfrac qp - 1\\right) t",
      },
      authoredExample: {
        prompt: "Walking at \\(\\tfrac45\\) of his usual speed, a man is 12 minutes late. Find his usual time.",
        steps: [
          "At \\(\\tfrac45\\) of the speed the time is \\(\\tfrac54 t\\).",
          "The delay is \\(\\tfrac54 t - t = \\tfrac t4 = 12\\).",
          "\\(t = 48\\) minutes.",
        ],
        answer: "48 minutes.",
      },
      selfCheckExample: {
        prompt: "A train running at \\(\\tfrac57\\) of its usual speed arrives 30 minutes late. Find its usual time.",
        steps: ["The time is \\(\\tfrac75 t\\), so the delay is \\(\\tfrac25 t = 30\\).", "\\(t = 75\\) minutes."],
        answer: "75 minutes.",
      },
      practiceSet: [
        { prompt: "At \\(\\tfrac{9}{10}\\) of the usual speed a car takes 8 minutes more. Find its usual time.", answer: "72 minutes" },
        { prompt: "A bus cuts its speed by a third and arrives 25 minutes late. Find its usual time.", answer: "50 minutes" },
        { prompt: "Slowing down by 40% makes a trip 30 minutes longer. Find the usual time.", answer: "45 minutes" },
        {
          prompt: "Half of a journey is done at half the usual speed and the rest at the usual speed. It takes 18 minutes more than usual. Find the usual time.",
          answer: "36 minutes",
          method: "The slow half takes \\(t\\) instead of \\(\\tfrac t2\\).",
        },
      ],
      pyqExampleId: "3233475b-8d7b-4f6b-994a-69ebd5bd66ba",
      traps: [
        {
          title: "The fraction is of the usual time",
          body: "At \\(\\tfrac45\\) of the speed the delay is a quarter of the usual time, not a fifth. The fifth is the drop in speed; the time grows by \\(\\tfrac54\\), which is a quarter more.",
        },
        {
          title: "Answer what is asked",
          body: "Some questions want the slower trip's time, not the usual time. With a usual time of 48 minutes and a 12 minute delay, the slow trip takes 60 minutes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-faster-early",
      name: "Faster than usual: the time saved, and a late start",
      intuition:
        "At \\(\\tfrac ab\\) of the usual speed with \\(a > b\\), the trip takes \\(\\tfrac ba\\) of the usual time, so a fraction \\(\\tfrac{a - b}{a}\\) of it is saved. Leaving late but arriving on time means the saving equals the late start.",
      definition:
        "- Speed times \\(\\tfrac ab\\), \\(a > b\\): saving \\(= \\left(1 - \\tfrac ba\\right) t\\).\n" +
        "- 'Started 10 minutes late and still arrived on time': the saving is 10 minutes.\n" +
        "- Late at one speed, asked how early at another: find \\(t\\) from the first, then use it in the second.\n" +
        "- Doubling the speed saves half the usual time.",
      formula: {
        label: "The saving at a faster speed",
        latex: "\\text{saving} = \\left(1 - \\dfrac ba\\right) t",
      },
      authoredExample: {
        prompt: "Walking at \\(\\tfrac65\\) of his usual speed, a man saves 9 minutes. Find his usual time.",
        steps: [
          "The time becomes \\(\\tfrac56 t\\), so the saving is \\(\\tfrac t6 = 9\\).",
          "\\(t = 54\\) minutes.",
        ],
        answer: "54 minutes.",
      },
      selfCheckExample: {
        prompt: "At \\(\\tfrac23\\) of his usual speed a man is 24 minutes late. How early is he at \\(\\tfrac32\\) of his usual speed?",
        steps: [
          "Slow: the time is \\(\\tfrac32 t\\), the delay \\(\\tfrac t2 = 24\\), so \\(t = 48\\).",
          "Fast: the time is \\(\\tfrac23 \\times 48 = 32\\) minutes.",
          "\\(48 - 32 = 16\\).",
        ],
        answer: "16 minutes early.",
      },
      practiceSet: [
        { prompt: "Raising the speed by a third saves 12 minutes. Find the usual time.", answer: "48 minutes" },
        { prompt: "A man starts 20 minutes late and walks 50% faster to arrive on time. Find his usual time.", answer: "60 minutes" },
        { prompt: "Going from 40 km/h to 48 km/h saves 12 minutes. Find the usual time.", answer: "72 minutes" },
        { prompt: "Doubling the usual speed saves 25 minutes. Find the usual time.", answer: "50 minutes" },
      ],
      pyqExampleId: "7ca29ba5-a892-4935-af83-87536d53f3a3",
      traps: [
        {
          title: "The saving is a fraction of the usual time",
          body: "At \\(\\tfrac65\\) of the speed the saving is a sixth of the usual time, not a fifth. The time becomes \\(\\tfrac56\\) of usual.",
        },
        {
          title: "A late start is a saving",
          body: "'Started 20 minutes late but arrived on time' tells you the faster speed saved 20 minutes. It is not a delay to add.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-two-speeds-gap",
      name: "Two speeds and the gap between their times",
      intuition:
        "The distance is fixed and so is the right time. At the slower speed he is late and at the faster he is early, so the two travel times differ by the minutes late plus the minutes early. That gap fixes the distance.",
      definition:
        "- Late by \\(L\\) at speed \\(a\\), early by \\(E\\) at speed \\(b\\) (\\(a < b\\)): \\(\\dfrac da - \\dfrac db = L + E\\), in hours.\n" +
        "- Late both times, by \\(L_1\\) and \\(L_2\\): the gap is \\(L_1 - L_2\\).\n" +
        "- \\(\\dfrac da - \\dfrac db = \\dfrac{d(b - a)}{ab}\\). Then the right time is \\(\\tfrac da - L\\).\n" +
        "- Speed unknown, with 'k km/h faster would take m hours less': \\(\\dfrac dv - \\dfrac{d}{v + k} = m\\), which leads to \\(v(v + k) = \\dfrac{dk}{m}\\).",
      formula: {
        label: "The gap between two travel times",
        latex: "\\dfrac da - \\dfrac db = \\text{gap in hours}",
      },
      authoredExample: {
        prompt: "At 3 km/h a boy reaches school 8 minutes late; at 5 km/h he is 8 minutes early. Find the distance.",
        steps: [
          "The gap is \\(8 + 8 = 16\\) minutes \\(= \\tfrac{4}{15}\\) h.",
          "\\(\\dfrac d3 - \\dfrac d5 = \\dfrac{2d}{15} = \\dfrac{4}{15}\\), so \\(d = 2\\).",
          "Check: 40 minutes at 3 km/h and 24 minutes at 5 km/h; the right time is 32 minutes.",
        ],
        answer: "2 km.",
      },
      selfCheckExample: {
        prompt: "A train at 60 km/h arrives 12 minutes late; at 75 km/h it arrives 4 minutes late. Find the distance and the right time.",
        steps: [
          "Both late, so the gap is \\(12 - 4 = 8\\) minutes \\(= \\tfrac{2}{15}\\) h.",
          "\\(\\dfrac{d}{60} - \\dfrac{d}{75} = \\dfrac{d}{300} = \\dfrac{2}{15}\\), so \\(d = 40\\) km.",
          "At 60 km/h it takes 40 minutes, 12 late, so the right time is 28 minutes.",
        ],
        answer: "40 km; 28 minutes.",
      },
      practiceSet: [
        { prompt: "At 3 km/h a man is 9 minutes late; at 4 km/h he is 6 minutes early. Find the distance.", answer: "3 km" },
        { prompt: "A and B cover the same road at 30 km/h and 36 km/h; A takes 15 minutes longer. Find the length of the road.", answer: "45 km" },
        {
          prompt: "A car covers 300 km. If it went 25 km/h faster it would take 1 h less. Find its speed.",
          answer: "75 km/h",
          method: "\\(v(v + 25) = 7500\\).",
        },
      ],
      pyqExampleId: "2957d0b6-cd4f-41d5-8684-9044db7f6ea5",
      traps: [
        {
          title: "Late and early add",
          body: "8 minutes late at one speed and 8 minutes early at the other is a gap of 16 minutes, not 0. Subtract only when both are late or both early.",
        },
        {
          title: "Minutes into hours before solving",
          body: "With speeds in km/h, the gap must be in hours. Writing \\(\\tfrac d3 - \\tfrac d5 = 16\\) gives 120 km instead of 2 km.",
        },
      ],
    },
  ],
};
