import type { SubtopicNote } from "@/app/notes/_types";

export const LOS_COMM_NOTE: SubtopicNote = {
  subtopicName: "Line-of-Sight Range of a Tower",
  title: "Line-of-Sight Range of a Tower",
  oneLineDefinition:
    "A space wave travels in a straight line, so the earth's curve limits its range: a tower of height h reaches d = √(2Rh), and two antennas add their ranges.",
  whyItMatters:
    "Fourteen PYQs, four of them asking for a number: five from 2021, four from 2022 and five from 2023. Seven use one antenna, finding a range, a height, an area covered or the change in range when the height changes. Seven add the ranges of a transmitting and a receiving antenna. All fourteen come from one formula, so the marks are lost on units and on adding the wrong things.",
  concepts: [
    // C1 — one tower
    {
      kind: "formula" as const,
      slug: "jpcomm-one-tower",
      name: "Range of one antenna on a round earth",
      intuition:
        "From the top of a tower you can see only as far as the horizon, where your line of sight just touches the earth. The radius to that point is at right angles to the line of sight, so Pythagoras gives the distance. The tower is tiny next to the earth, so one small term can be dropped.",
      definition:
        "- Line of sight touching the earth: \\(d^{2} = (R + h)^{2} - R^{2} = 2Rh + h^{2} \\approx 2Rh\\), since \\(h \\ll R\\).\n" +
        "- So \\(d = \\sqrt{2Rh}\\) and \\(h = \\dfrac{d^{2}}{2R}\\). The same formula gives the height a receiver needs when the transmitter is at ground level.\n" +
        "- Area covered: \\(A = \\pi d^{2} = 2\\pi R h\\). Population covered = density × area.\n" +
        "- Scaling: \\(d \\propto \\sqrt{h}\\). To double the range, the height must become 4 times as large; to triple it, 9 times.\n" +
        "- Work in metres inside the root: \\(R = 6.4 \\times 10^{6}\\) m, and \\(\\sqrt{2R} \\approx 3578\\ \\text{m}^{1/2}\\).",
      formula: {
        label: "Line-of-sight range of one antenna",
        latex: "d = \\sqrt{2Rh}, \\qquad A = \\pi d^{2} = 2\\pi R h",
      },
      authoredExample: {
        prompt:
          "A TV tower is 20 m high. Take \\(R = 6400\\) km. Find its range, the area it covers, and the number of people it reaches if 500 people live on each square kilometre.",
        steps: [
          "\\(d = \\sqrt{2 \\times 6.4 \\times 10^{6} \\times 20} = \\sqrt{2.56 \\times 10^{8}} = 1.6 \\times 10^{4}\\) m \\(= 16\\) km.",
          "Area: \\(A = \\pi d^{2} = \\pi (16)^{2} = 256\\pi \\approx 804\\ \\text{km}^{2}\\).",
          "People reached: \\(500 \\times 804 \\approx 4.0 \\times 10^{5}\\), about 4 lakh.",
        ],
        answer: "16 km; about 804 km²; about 4 lakh people.",
      },
      selfCheckExample: {
        prompt:
          "A transmitting antenna stands at ground level. How high must a receiving antenna be to pick up its signal in line of sight 24 km away? Take \\(R = 6400\\) km.",
        steps: [
          "The transmitter adds no height, so only the receiver's range counts: \\(d = \\sqrt{2Rh}\\).",
          "\\(h = \\dfrac{d^{2}}{2R} = \\dfrac{(24)^{2}}{2 \\times 6400}\\) km \\(= \\dfrac{576}{12800}\\) km \\(= 0.045\\) km.",
        ],
        answer: "45 m",
      },
      practiceSet: [
        { prompt: "The height of a tower is increased by 44%. By what percentage does its range increase?", answer: "20%" },
        { prompt: "To make a tower's range three times as large, its height must be multiplied by what?", answer: "9" },
        { prompt: "Range of a 5 m mast? (R = 6400 km)", answer: "8 km" },
        { prompt: "Area covered by a tower of height 125 m? (R = 6400 km)", answer: "\\(1600\\pi \\approx 5027\\ \\text{km}^{2}\\)" },
      ],
      pyqExampleId: "38192678-7e09-4915-a8cf-eda58fbce14c", // 2023: height up by 21%, range up by 10%
      traps: [
        {
          title: "Increased by, or increased to",
          body: "To double a range the height becomes 4h, so it is increased BY 3h. Questions ask both ways, and both values are among the options.",
        },
        {
          title: "Keep one unit inside the root",
          body: "Put R and h in metres, or both in kilometres, before multiplying. A tower height in metres with R in kilometres gives a range off by a factor of about 30.",
        },
        {
          title: "The range grows as the square root",
          body: "A height 4 times as large gives a range only twice as large, because \\(\\sqrt{4} = 2\\). Scaling the range by the same factor or percentage as the height is the usual wrong option.",
        },
      ],
    },

    // C2 — two antennas
    {
      kind: "formula" as const,
      slug: "jpcomm-two-towers",
      name: "Range between a transmitting and a receiving antenna",
      intuition:
        "Each antenna sees to its own horizon. The signal can get through as long as the two horizons meet, so the largest distance between the antennas is the sum of their two ranges. Add the ranges, never the heights.",
      definition:
        "- Maximum line-of-sight distance: \\(d_M = \\sqrt{2Rh_T} + \\sqrt{2Rh_R} = \\sqrt{2R}\\left(\\sqrt{h_T} + \\sqrt{h_R}\\right)\\).\n" +
        "- Two identical antennas: \\(d_M = 2\\sqrt{2Rh}\\), so \\(h = \\dfrac{d_M^{2}}{8R}\\).\n" +
        "- If \\(h_T + h_R\\) is fixed, \\(\\sqrt{h_T} + \\sqrt{h_R}\\) is largest when the two heights are equal. So the range is greatest for equal heights.\n" +
        "- Heights that are 5 × a perfect square give whole-number ranges with \\(R = 6400\\) km: 5 m → 8 km, 20 m → 16 km, 45 m → 24 km.",
      formula: {
        label: "Line-of-sight range of two antennas",
        latex: "d_M = \\sqrt{2Rh_T} + \\sqrt{2Rh_R}",
      },
      authoredExample: {
        prompt:
          "A transmitting antenna is 405 m high and a receiving antenna is 5 m high. Take \\(R = 6400\\) km. How far apart can they be? What answer does the mistake of adding the heights first give?",
        steps: [
          "Transmitter: \\(\\sqrt{2 \\times 6.4 \\times 10^{6} \\times 405} = \\sqrt{5.184 \\times 10^{9}} = 72000\\) m \\(= 72\\) km.",
          "Receiver: \\(\\sqrt{2 \\times 6.4 \\times 10^{6} \\times 5} = \\sqrt{6.4 \\times 10^{7}} = 8000\\) m \\(= 8\\) km.",
          "\\(d_M = 72 + 8 = 80\\) km.",
          "Adding the heights first: \\(\\sqrt{2 \\times 6.4 \\times 10^{6} \\times 410} \\approx 72.4\\) km, which is wrong.",
        ],
        answer: "80 km (adding the heights would wrongly give about 72.4 km).",
      },
      selfCheckExample: {
        prompt:
          "Two identical antennas on identical towers can communicate in line of sight up to 160 km apart. How high is each antenna? Take \\(R = 6400\\) km.",
        steps: [
          "Each antenna covers half the distance: \\(\\sqrt{2Rh} = 80\\) km.",
          "\\(h = \\dfrac{(80)^{2}}{2 \\times 6400}\\) km \\(= \\dfrac{6400}{12800}\\) km \\(= 0.5\\) km.",
        ],
        answer: "500 m",
      },
      practiceSet: [
        { prompt: "Two antennas are each 20 m high. Largest line-of-sight distance between them? (R = 6400 km)", answer: "32 km" },
        { prompt: "The heights of two antennas must add to 90 m. Largest possible range? (R = 6400 km)", answer: "48 km, with both at 45 m" },
        { prompt: "Antennas of height 5 m and 20 m. Largest distance between them? (R = 6400 km)", answer: "24 km" },
        { prompt: "Value of \\(\\sqrt{2R}\\) in \\(\\text{m}^{1/2}\\) for \\(R = 6.4 \\times 10^{6}\\) m?", answer: "\\(1600\\sqrt{5} \\approx 3578\\)" },
      ],
      pyqExampleId: "7df19ee5-ea7f-43a6-90fb-38cd0e2e1d09", // 2023: antennas of 180 m and 245 m, 48 + 56 km
      traps: [
        {
          title: "Add the ranges, not the heights",
          body: "\\(\\sqrt{h_T} + \\sqrt{h_R}\\) is not \\(\\sqrt{h_T + h_R}\\). Taking one root of the summed heights gives a range that is too short.",
        },
        {
          title: "Do not forget the second antenna",
          body: "When both antennas have a height, both add range. Using only the transmitter's \\(\\sqrt{2Rh_T}\\) gives an answer that is always one of the options.",
        },
        {
          title: "Identical towers divide by 8R",
          body: "For two equal heights, \\(d = 2\\sqrt{2Rh}\\), so \\(h = d^{2}/8R\\). Using \\(d^{2}/2R\\) treats the whole distance as one antenna's range and gives a height 4 times too large.",
        },
      ],
    },
  ],
};
