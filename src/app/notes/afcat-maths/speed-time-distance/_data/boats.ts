import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_BOATS_NOTE: SubtopicNote = {
  subtopicName: "Boats and Streams",
  title: "Boats and Streams: Downstream, Upstream and Still Water",
  oneLineDefinition:
    "Downstream the stream adds to the boat's own speed and upstream it takes away, so the still-water speed and the stream's speed are half the sum and half the difference.",
  whyItMatters:
    "AFCAT asks this more than any other part of the chapter: eleven past-year questions, from 2015 to 2019. A fifth of the page is HARD, and the hard ones are equations in time: equal times, a round trip in a total time, or two trips giving two equations.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-down-up",
      name: "Downstream and upstream speeds",
      intuition:
        "The water carries the boat. Going with the stream, the two speeds add; going against it, the stream takes some of the boat's speed away.",
      definition:
        "- **Downstream speed** \\(= b + s\\); **upstream speed** \\(= b - s\\), where \\(b\\) is the boat's speed in still water and \\(s\\) the stream's.\n" +
        "- Time \\(=\\) distance \\(\\div\\) the speed for that direction.\n" +
        "- From one of them and \\(s\\): \\(b =\\) downstream \\(- s\\), or \\(b =\\) upstream \\(+ s\\).\n" +
        "- Downstream minus upstream is \\(2s\\).",
      formula: {
        label: "With and against the stream",
        latex: "v_{\\text{down}} = b + s, \\qquad v_{\\text{up}} = b - s",
      },
      authoredExample: {
        prompt: "A boat does 14 km/h in still water and the stream flows at 4 km/h. How long does it take to go 90 km downstream and come back?",
        steps: [
          "Downstream 18 km/h: \\(90 \\div 18 = 5\\) h.",
          "Upstream 10 km/h: \\(90 \\div 10 = 9\\) h.",
          "In all \\(5 + 9 = 14\\) h.",
        ],
        answer: "14 h.",
      },
      selfCheckExample: {
        prompt: "A boat goes 45 km downstream in 2.5 h. The stream flows at 2 km/h. Find its upstream speed.",
        steps: ["Downstream speed \\(= 45 \\div 2.5 = 18\\) km/h, so \\(b = 16\\).", "Upstream \\(= 16 - 2\\)."],
        answer: "14 km/h.",
      },
      practiceSet: [
        { prompt: "Still water 10 km/h, stream 2 km/h. How long to go 32 km upstream?", answer: "4 h" },
        { prompt: "A swimmer goes downstream at 7 km/h and the current is 1.5 km/h. Find his upstream speed.", answer: "4 km/h" },
        { prompt: "A boat goes 8 km upstream in 2 h and the stream flows at 1 km/h. Find the boat's speed in still water.", answer: "5 km/h" },
      ],
      pyqExampleId: "c646166a-0b4a-45b7-bbc1-75b4b176bdab",
      traps: [
        {
          title: "Still water is not downstream",
          body: "'Speed of the boat' in these questions means its speed in still water, \\(b\\). A boat that goes 20 km/h downstream on a 3 km/h stream has \\(b = 17\\), not 20.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-half-sum",
      name: "Still water and stream from the two speeds",
      intuition:
        "The downstream and upstream speeds sit the same distance \\(s\\) either side of the boat's own speed. So \\(b\\) is their average and \\(s\\) is half their difference.",
      definition:
        "- \\(b = \\dfrac{\\text{down} + \\text{up}}{2}\\) and \\(s = \\dfrac{\\text{down} - \\text{up}}{2}\\).\n" +
        "- Find each speed first: distance \\(\\div\\) time for that direction.\n" +
        "- Times in minutes: 10 km in 40 minutes is 15 km/h.\n" +
        "- 'The boat's speed is twice the stream's': \\(b = 2s\\), so downstream is \\(3s\\) and upstream is \\(s\\).",
      formula: {
        label: "Half the sum, half the difference",
        latex: "b = \\dfrac{d + u}{2}, \\qquad s = \\dfrac{d - u}{2}",
      },
      authoredExample: {
        prompt: "A boat goes 30 km downstream in 2 h and 28 km upstream in 4 h. Find its speed in still water and the stream's speed.",
        steps: [
          "Downstream \\(30 \\div 2 = 15\\) km/h; upstream \\(28 \\div 4 = 7\\) km/h.",
          "\\(b = \\tfrac{15 + 7}{2} = 11\\) and \\(s = \\tfrac{15 - 7}{2} = 4\\).",
        ],
        answer: "11 km/h and 4 km/h.",
      },
      selfCheckExample: {
        prompt: "A man rows 10 km downstream in 1 h 15 min and back in 2 h 30 min. Find the stream's speed.",
        steps: ["Downstream \\(10 \\div 1.25 = 8\\) km/h; upstream \\(10 \\div 2.5 = 4\\) km/h.", "\\(s = \\tfrac{8 - 4}{2}\\)."],
        answer: "2 km/h.",
      },
      practiceSet: [
        { prompt: "Downstream 20 km/h and upstream 14 km/h. Find the boat's and the stream's speeds.", answer: "17 km/h and 3 km/h" },
        { prompt: "A boat rows 24 km downstream and 12 km upstream, taking 2 h each way. Find its speed in still water.", answer: "9 km/h" },
        {
          prompt: "A boat goes 60 km downstream in 5 h, and its still-water speed is twice the stream's. How far does it go upstream in 3 h?",
          answer: "12 km",
          method: "\\(3s = 12\\), so \\(s = 4\\) and upstream is 4 km/h.",
        },
      ],
      pyqExampleId: "7efc7939-f414-48e2-b61d-31ef48df7539",
      traps: [
        {
          title: "Half the difference",
          body: "With 15 km/h down and 7 km/h up, the stream is 4 km/h, not 8. The difference 8 counts the stream twice, once added and once taken away.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-boat-ratios",
      name: "Equal times and ratios of time",
      intuition:
        "Equal times mean the distances are in the ratio of the speeds. 'Twice as long upstream as downstream' means the downstream speed is twice the upstream speed.",
      definition:
        "- Same time: \\(\\dfrac{d_1}{b + s} = \\dfrac{d_2}{b - s}\\), so the distances are in the ratio of the speeds.\n" +
        "- \\(k\\) times as long upstream as downstream over the same distance: \\(b + s = k(b - s)\\), so \\(b : s = (k + 1) : (k - 1)\\).\n" +
        "- '\\(p\\) km down in the time of \\(q\\) km up': down \\(:\\) up \\(= p : q\\).\n" +
        "- \\(b : s\\) given as \\(m : n\\): downstream is \\(m + n\\) parts and upstream \\(m - n\\) parts.",
      formula: {
        label: "Equal times",
        latex: "\\dfrac{d_1}{b + s} = \\dfrac{d_2}{b - s}",
      },
      authoredExample: {
        prompt: "A boat whose still-water speed is 12 km/h goes 32 km downstream in the time it takes to go 16 km upstream. Find the stream's speed.",
        steps: [
          "\\(\\dfrac{32}{12 + s} = \\dfrac{16}{12 - s}\\), so \\(384 - 32s = 192 + 16s\\).",
          "\\(48s = 192\\), so \\(s = 4\\).",
          "Check: 32 km at 16 km/h and 16 km at 8 km/h both take 2 h.",
        ],
        answer: "4 km/h.",
      },
      selfCheckExample: {
        prompt: "A man rows at 8 km/h in still water and takes three times as long to row up a stretch as to row down it. Find the stream's speed.",
        steps: ["Downstream speed is three times upstream: \\(8 + s = 3(8 - s)\\).", "\\(4s = 16\\), so \\(s = 4\\)."],
        answer: "4 km/h.",
      },
      practiceSet: [
        { prompt: "A boat takes twice as long upstream as downstream, and its still-water speed is 15 km/h. Find the stream's speed.", answer: "5 km/h" },
        { prompt: "The boat's and the stream's speeds are in the ratio \\(5 : 1\\), and the downstream speed is 18 km/h. Find the upstream speed.", answer: "12 km/h" },
        { prompt: "A boat goes 5 km downstream in the time it goes 3 km upstream, and the stream flows at 2 km/h. Find the boat's speed.", answer: "8 km/h" },
      ],
      pyqExampleId: "d3d079b2-4767-4adf-a01b-6514c24f9d7f",
      traps: [
        {
          title: "Twice the time is half the speed",
          body: "'Takes twice as long upstream' makes the downstream speed double the upstream speed. Writing \\(b - s = 2(b + s)\\) turns the stream backwards.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-boat-round-trip",
      name: "Out and back in a total time",
      intuition:
        "Out and back over the same distance, the two times add up to the total. With the boat's speed unknown, the same equation becomes a quadratic.",
      definition:
        "- \\(\\dfrac{d}{b + s} + \\dfrac{d}{b - s} = T\\). With \\(b\\) and \\(s\\) known, solve for \\(d\\).\n" +
        "- With \\(d\\), \\(s\\) and \\(T\\) known: \\(\\dfrac{2bd}{b^2 - s^2} = T\\), a quadratic in \\(b\\); keep the positive root above \\(s\\).\n" +
        "- A difference of times: \\(\\dfrac{d}{b - s} - \\dfrac{d}{b + s} = \\dfrac{2sd}{b^2 - s^2}\\).\n" +
        "- The average speed for the round trip is \\(\\dfrac{2(b + s)(b - s)}{2b} = \\dfrac{b^2 - s^2}{b}\\), the equal-distance average of the two speeds.",
      formula: {
        label: "A round trip on a river",
        latex: "\\dfrac{d}{b + s} + \\dfrac{d}{b - s} = T",
      },
      authoredExample: {
        prompt: "A boat rows at 10 km/h in still water on a stream of 2 km/h. It goes out and back in 5 h. How far does it go out?",
        steps: [
          "\\(\\dfrac{d}{12} + \\dfrac{d}{8} = \\dfrac{2d + 3d}{24} = \\dfrac{5d}{24}\\).",
          "\\(\\dfrac{5d}{24} = 5\\), so \\(d = 24\\).",
        ],
        answer: "24 km.",
      },
      selfCheckExample: {
        prompt: "A motorboat goes 32 km upstream and back in 6 h. The stream flows at 4 km/h. Find the motorboat's speed in still water.",
        steps: [
          "\\(\\dfrac{32}{b - 4} + \\dfrac{32}{b + 4} = 6\\) gives \\(64b = 6(b^2 - 16)\\), that is \\(3b^2 - 32b - 48 = 0\\).",
          "\\(b = \\dfrac{32 + \\sqrt{1024 + 576}}{6} = \\dfrac{32 + 40}{6} = 12\\).",
          "Check: 4 h up at 8 km/h and 2 h down at 16 km/h.",
        ],
        answer: "12 km/h.",
      },
      practiceSet: [
        { prompt: "Still water 6 km/h, stream 2 km/h. Find the average speed for a round trip.", answer: "\\(5\\tfrac13\\) km/h" },
        { prompt: "Still water 15 km/h, stream 3 km/h. How long does 36 km up and 36 km back take?", answer: "5 h" },
        {
          prompt: "A boat's still-water speed is 15 km/h. Going 40 km upstream takes 2 h more than going 40 km downstream. Find the stream's speed.",
          answer: "5 km/h",
          method: "\\(s^2 + 40s - 225 = 0\\).",
        },
      ],
      pyqExampleId: "4535b308-baad-4aba-b238-86e61c533b7c",
      traps: [
        {
          title: "The round trip average is below b",
          body: "At \\(b = 6\\) and \\(s = 2\\) the round trip averages \\(5\\tfrac13\\) km/h, not 6. The slow upstream leg lasts longer than the quick one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-two-trips",
      name: "Two trips, two equations",
      intuition:
        "Two trips with different distances give two equations. Treat \\(\\tfrac1u\\) and \\(\\tfrac1d\\), the reciprocals of the upstream and downstream speeds, as the unknowns; then the equations are linear.",
      definition:
        "- Let \\(x = \\tfrac1u\\) and \\(y = \\tfrac1d\\). The trips give \\(p_1 x + q_1 y = T_1\\) and \\(p_2 x + q_2 y = T_2\\).\n" +
        "- Scale the equations so one unknown has the same coefficient, then subtract.\n" +
        "- Then \\(u = \\tfrac1x\\), \\(d = \\tfrac1y\\), and \\(b\\), \\(s\\) are half their sum and half their difference.",
      formula: {
        label: "Two trips",
        latex: "p_1 x + q_1 y = T_1, \\quad p_2 x + q_2 y = T_2, \\quad x = \\tfrac1u,\\; y = \\tfrac1d",
      },
      authoredExample: {
        prompt: "A boat goes 12 km upstream and 36 km downstream in 6 h, and 20 km upstream and 24 km downstream in 7 h. Find the boat's and the stream's speeds.",
        steps: [
          "\\(12x + 36y = 6\\) and \\(20x + 24y = 7\\).",
          "Multiply the first by \\(\\tfrac53\\): \\(20x + 60y = 10\\). Subtract the second: \\(36y = 3\\), so \\(y = \\tfrac{1}{12}\\).",
          "Then \\(12x = 6 - 3 = 3\\), so \\(x = \\tfrac14\\). Upstream 4 km/h, downstream 12 km/h.",
          "\\(b = 8\\) and \\(s = 4\\).",
        ],
        answer: "8 km/h and 4 km/h.",
      },
      selfCheckExample: {
        prompt: "A man rows 20 km upstream and 30 km downstream in 6 h, and 15 km upstream and 45 km downstream in 6 h. Find the stream's speed.",
        steps: [
          "\\(20x + 30y = 6\\) and \\(15x + 45y = 6\\). Multiply by 3 and by 4: \\(60x + 90y = 18\\), \\(60x + 180y = 24\\).",
          "\\(90y = 6\\), so \\(y = \\tfrac{1}{15}\\); then \\(20x = 4\\), so \\(x = \\tfrac15\\).",
          "Upstream 5 km/h, downstream 15 km/h, so \\(s = 5\\).",
        ],
        answer: "5 km/h.",
      },
      practiceSet: [
        {
          prompt: "With \\(x = \\tfrac1u\\) and \\(y = \\tfrac1d\\), write the equation for a boat that goes 15 km upstream and 24 km downstream in 6 h.",
          answer: "\\(15x + 24y = 6\\)",
        },
        {
          prompt: "A boat goes 8 km upstream and 18 km downstream in 5 h, and 12 km upstream and 9 km downstream in 4.5 h. Find its upstream and downstream speeds.",
          answer: "4 km/h and 6 km/h",
        },
        {
          prompt: "A boat goes 8 km upstream and 20 km downstream in 4 h, and 12 km upstream and 10 km downstream in 4 h. Find its speed in still water.",
          answer: "7 km/h",
        },
      ],
      pyqExampleId: "c4095782-99c5-497f-8bdb-de99db1909f4",
      traps: [
        {
          title: "Solve for the reciprocals",
          body: "Taking \\(u\\) and \\(d\\) as the unknowns leaves \\(\\tfrac{12}{u} + \\tfrac{36}{d} = 6\\), which is not linear. With \\(x = \\tfrac1u\\) and \\(y = \\tfrac1d\\) it is.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-boats-meet",
      name: "Boats meeting, chasing and crossing the river",
      intuition:
        "Two boats heading towards each other on a river: one rides the stream and one fights it, so their closing speed is \\((b_1 + s) + (b_2 - s)\\), and the stream cancels out.",
      definition:
        "- Two boats from opposite ends: closing speed \\(= b_1 + b_2\\). For identical boats it is downstream plus upstream, \\(2b\\).\n" +
        "- One boat chasing another downstream: the stream carries both, so the gap closes at \\(b_1 - b_2\\).\n" +
        "- Rowing straight across: time \\(=\\) width \\(\\div\\) rowing speed, and the stream carries the boat downstream by \\(s \\times\\) that time.",
      formula: {
        label: "Two boats closing",
        latex: "v_{\\text{close}} = (b_1 + s) + (b_2 - s) = b_1 + b_2",
      },
      authoredExample: {
        prompt: "A boat goes 16 km/h downstream and 10 km/h upstream. Two such boats start from the two ends of a 78 km stretch towards each other. When do they meet?",
        steps: ["One goes 16 km/h and the other 10 km/h, closing at 26 km/h.", "\\(78 \\div 26 = 3\\) h."],
        answer: "After 3 h.",
      },
      selfCheckExample: {
        prompt: "A man swims at 3 km/h in still water straight across a river 600 m wide that flows at 4 km/h. How far downstream does he land?",
        steps: ["Crossing takes \\(0.6 \\div 3 = 0.2\\) h.", "The stream carries him \\(4 \\times 0.2 = 0.8\\) km."],
        answer: "800 m.",
      },
      practiceSet: [
        { prompt: "Boats with still-water speeds 9 km/h and 11 km/h start 100 km apart on a river and head towards each other; the stream flows at 3 km/h. When do they meet?", answer: "After 5 h" },
        { prompt: "Two boats start from opposite banks of a river 200 m apart and meet after 20 s; one is 50% faster than the other. Find the slower speed.", answer: "4 m/s" },
        {
          prompt: "A boat goes downstream at 15 km/h. A second boat leaves the same point 2 h later going downstream at 20 km/h. How long after the first boat's start does the second catch it?",
          answer: "8 h",
        },
      ],
      pyqExampleId: "d566975b-f29a-471e-8f53-7e60b58bba14",
      traps: [
        {
          title: "The stream cancels for boats that meet",
          body: "One boat gains the stream and the other loses it, so the meeting time depends only on the boats' own speeds. Adding the stream to both counts it twice.",
        },
      ],
    },
  ],
};
