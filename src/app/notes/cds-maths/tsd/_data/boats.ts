import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_BOATS_NOTE: SubtopicNote = {
  subtopicName: "Boats and Streams",
  title: "Boats and Streams",
  oneLineDefinition:
    "Downstream speed is boat + stream, upstream is boat − stream; the boat's speed is their average and the stream's is half their difference.",
  whyItMatters:
    "Seven PYQs, all EASY or MODERATE. Find the downstream and upstream speeds first; everything else is an average or half a difference. Round trips and 'equal times' questions become one equation in the stream's speed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-boats",
      name: "Downstream and upstream",
      intuition:
        "The current adds to the boat's speed going down and subtracts going up. So the two speeds sit symmetrically around the boat's own speed, the stream's speed away on each side.",
      definition:
        "- Downstream \\(d = b + s\\), upstream \\(u = b - s\\).\n" +
        "- \\(b = \\dfrac{d + u}{2}\\), \\(s = \\dfrac{d - u}{2}\\), and \\(b : s = (d + u) : (d - u)\\).\n" +
        "- Round trip of distance \\(D\\) each way in total time \\(T\\): \\(\\dfrac{D}{b + s} + \\dfrac{D}{b - s} = T\\), so \\(D = \\dfrac{T(b^2 - s^2)}{2b}\\).\n" +
        "- Equal times for distances \\(p\\) down and \\(q\\) up: \\(\\dfrac{b + s}{b - s} = \\dfrac pq\\).",
      formula: {
        label: "Boat and stream",
        latex: "b = \\dfrac{d + u}{2}, \\qquad s = \\dfrac{d - u}{2}",
      },
      authoredExample: {
        prompt: "A boat goes \\(24\\) km downstream in \\(2\\) hours and \\(16\\) km upstream in \\(4\\) hours. Find the speeds of the boat and the stream.",
        steps: ["\\(d = 12\\), \\(u = 4\\) km/hr.", "\\(b = 8\\), \\(s = 4\\)."],
        answer: "Boat \\(8\\) km/hr, stream \\(4\\) km/hr.",
      },
      selfCheckExample: {
        prompt: "A boat at \\(10\\) km/hr in still water goes \\(21\\) km down and back in \\(5\\) hours. Find the stream's speed.",
        steps: ["\\(\\dfrac{21}{10 + s} + \\dfrac{21}{10 - s} = 5\\) gives \\(\\dfrac{420}{100 - s^2} = 5\\).", "\\(100 - s^2 = 84\\)."],
        answer: "\\(4\\) km/hr.",
      },
      practiceSet: [
        { prompt: "Down \\(15\\), up \\(9\\) km/hr. Stream?", answer: "\\(3\\) km/hr" },
        { prompt: "Down \\(15\\), up \\(9\\) km/hr. Boat?", answer: "\\(12\\) km/hr" },
        { prompt: "Down \\(x\\), up \\(y\\). Boat : stream?", answer: "\\((x + y) : (x - y)\\)" },
        { prompt: "\\(5\\) km down in the time of \\(3\\) km up. \\((b + s) : (b - s)\\)?", answer: "\\(5 : 3\\)" },
      ],
      pyqExampleId: "0e2a8d0b-e234-4268-9802-cf253ea90833", // 2021 (II) — boat 30 km/hr, 60 km down and back in 4.5 h
      traps: [
        {
          title: "Half the difference, not the difference",
          body:
            "Downstream \\(10\\) and upstream \\(2\\) km/hr give a stream of \\(4\\) km/hr, not \\(8\\). The difference \\(d - u\\) is TWICE the stream's speed.",
        },
      ],
    },
  ],
};
