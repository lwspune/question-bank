import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_BOATS_NOTE: SubtopicNote = {
  subtopicName: "Boats and Streams",
  title: "Boats and Streams",
  oneLineDefinition:
    "The stream adds its speed to a boat going down and takes it away from a boat going up, so the boat's own speed is half the sum of the two and the stream's is half the difference.",
  whyItMatters:
    "Twenty-three questions in the bank, eleven EASY and twelve MODERATE, and none from the 2025 shifts. The MODERATE ones give two journeys and ask you to untangle two unknown speeds; taking 1 ÷ speed as the unknown turns them into simple straight-line equations.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdbt-speeds",
      name: "Downstream and upstream speeds",
      intuition:
        "In still water a boat moves at its own speed. Downstream the river carries it along, so the two speeds add; upstream the river pushes back, so the stream's speed is taken away. Know any two of the four speeds and you know the other two.",
      definition:
        "- **Downstream** \\(D = b + s\\) and **upstream** \\(U = b - s\\), where \\(b\\) is the boat's speed in still water and \\(s\\) the stream's.\n" +
        "- **Boat** \\(b = \\frac{D + U}{2}\\) and **stream** \\(s = \\frac{D - U}{2}\\).\n" +
        "- \"Speed in still water\", \"rowing speed\" and \"speed of the boat\" all mean \\(b\\). \"With the current\" or \"along the stream\" is downstream; \"against\" is upstream.\n" +
        "- **Round trip:** time \\(= \\frac{d}{b + s} + \\frac{d}{b - s}\\). With \\(b\\) and the total time known, try each option for \\(s\\): it is faster than solving.\n" +
        "- **A percentage on speed or time** is a ratio: a downstream speed that is 125% of the boat's speed means \\(D = \\frac{5}{4}b\\), so \\(s = \\frac{b}{4}\\).",
      formula: {
        label: "Boats and streams",
        latex: "D = b + s \\qquad U = b - s \\qquad b = \\frac{D + U}{2} \\qquad s = \\frac{D - U}{2}",
        symbols: [
          { symbol: "\\(D\\)", meaning: "downstream speed" },
          { symbol: "\\(U\\)", meaning: "upstream speed" },
          { symbol: "\\(b\\)", meaning: "speed of the boat in still water" },
          { symbol: "\\(s\\)", meaning: "speed of the stream" },
        ],
      },
      authoredExample: {
        prompt: "A boat goes 42 km downstream in 3 hours and the same 42 km upstream in 7 hours. Find the speed of the boat in still water and the speed of the stream.",
        steps: [
          "\\(D = \\frac{42}{3} = 14\\) km/h and \\(U = \\frac{42}{7} = 6\\) km/h.",
          "Boat \\(= \\frac{14 + 6}{2} = 10\\) km/h; stream \\(= \\frac{14 - 6}{2} = 4\\) km/h.",
        ],
        answer: "Boat 10 km/h, stream 4 km/h",
      },
      selfCheckExample: {
        prompt: "A boat's speed in still water is 10 km/h and the stream flows at 2 km/h. How long does the boat take to go 24 km downstream and come back?",
        steps: [
          "Downstream 12 km/h: 2 hours. Upstream 8 km/h: 3 hours.",
          "Total \\(= 5\\) hours.",
        ],
        answer: "5 hours",
      },
      practiceSet: [
        {
          prompt: "A man rows at 9 km/h in still water, and the river flows at 3 km/h. How long does he take to row 18 km upstream?",
          answer: "3 hours",
          method: "Upstream speed 6 km/h.",
        },
        {
          prompt: "A boat's downstream speed is 17 km/h and its upstream speed is 11 km/h. What is the speed of the stream?",
          answer: "3 km/h",
          method: "\\(\\frac{17 - 11}{2}\\).",
        },
        {
          prompt: "A boat moves at 8 km/h in still water and the current flows at 2 km/h. Going upstream takes 1 hour more than going downstream over the same distance. What is the distance?",
          answer: "15 km",
          method: "\\(\\frac{d}{6} - \\frac{d}{10} = 1\\) gives \\(\\frac{d}{15} = 1\\).",
        },
        {
          prompt: "A swimmer's speed in still water is 5 km/h and her downstream speed is 7 km/h. What is her upstream speed?",
          answer: "3 km/h",
          method: "The stream is 2 km/h.",
        },
      ],
      pyqExampleId: "ff6414c6-0ed5-432e-b40a-6993e618af2f",
      traps: [
        {
          title: "Forgetting to halve",
          body:
            "The stream's speed is HALF the difference of the downstream and upstream speeds, and the boat's is half the sum. The difference itself is twice the stream's speed.",
        },
        {
          title: "Giving the downstream speed as the boat's speed",
          body:
            "The speed of the boat means its speed in still water. The downstream speed already includes the stream, so it is always more than the boat's speed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdbt-ratio",
      name: "Boat and stream speeds from a ratio",
      intuition:
        "For the same distance, time is inversely as speed. So the ratio of upstream time to downstream time is the ratio of downstream speed to upstream speed, and half the sum and half the difference work just as well on the parts of a ratio.",
      definition:
        "- **Times over the same distance** \\(t_U : t_D\\) give the speeds \\(D : U = t_U : t_D\\).\n" +
        "- Then **boat : stream** \\(= (D + U) : (D - U)\\). Times of 8 hours and 5 hours give \\(13 : 3\\).\n" +
        "- **Boat : stream given** as \\(b : s\\): \\(D : U = (b + s) : (b - s)\\), and the times over one distance are in the inverse ratio.\n" +
        "- Distances covered in the same time are in the ratio \\(D : U\\) too.\n" +
        "- **Fast route:** keep the ratio parts as plain numbers and scale once at the end with the one real distance, time or speed given.",
      formula: {
        label: "Boat to stream from the two times",
        latex: "\\frac{b}{s} = \\frac{t_U + t_D}{t_U - t_D}",
        symbols: [
          { symbol: "\\(t_U\\)", meaning: "time upstream over a distance" },
          { symbol: "\\(t_D\\)", meaning: "time downstream over the same distance" },
        ],
      },
      authoredExample: {
        prompt: "A boat takes 9 hours to go upstream between two piers and 5 hours to come back down. Find the ratio of the boat's speed to the stream's speed.",
        steps: [
          "Same distance, so \\(D : U = 9 : 5\\).",
          "Boat : stream \\(= (9 + 5) : (9 - 5) = 14 : 4 = 7 : 2\\).",
        ],
        answer: "7 : 2",
      },
      selfCheckExample: {
        prompt: "The speed of a boat and the speed of the current are in the ratio 5 : 1. The boat takes 2 hours to go downstream between two jetties. How long does it take to come back?",
        steps: [
          "\\(D : U = (5 + 1) : (5 - 1) = 3 : 2\\).",
          "Times are in the inverse ratio, so the return takes \\(2 \\times \\frac{3}{2} = 3\\) hours.",
        ],
        answer: "3 hours",
      },
      practiceSet: [
        {
          prompt: "A boat goes 12 km downstream in the time it takes to go 8 km upstream. What is the ratio of the boat's speed to the stream's?",
          answer: "5 : 1",
          method: "\\(D : U = 3 : 2\\), so \\((3 + 2) : (3 - 2)\\).",
        },
        {
          prompt: "A boat's speed and the stream's speed are in the ratio 4 : 1. What is the ratio of the upstream time to the downstream time over the same distance?",
          answer: "5 : 3",
          method: "\\(D : U = 5 : 3\\), and the times are inverse.",
        },
        {
          prompt: "Upstream and downstream times over the same stretch are 3 hours and 2 hours. The stream flows at 2 km/h. What is the boat's speed?",
          answer: "10 km/h",
          method: "Boat : stream \\(= 5 : 1\\).",
        },
        {
          prompt: "A boat's speed is 3 times the stream's. It goes 24 km downstream in 2 hours. How long does it take to row 24 km upstream?",
          answer: "4 hours",
          method: "\\(D : U = 4 : 2\\), so \\(U = 6\\) km/h.",
        },
      ],
      pyqExampleId: "06c4b953-e5b8-4bc4-9266-cd7a748d29aa",
      traps: [
        {
          title: "Putting the time ratio straight in as the speed ratio",
          body:
            "Over the same distance the longer time belongs to the slower, upstream, speed. Upstream and downstream times of 8 and 5 hours mean upstream and downstream speeds in the ratio 5 : 8.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdbt-two",
      name: "Two journeys with two unknown speeds",
      intuition:
        "When two different trips each give a total time, you have two equations in the two speeds. Written with 1 ÷ speed as the unknowns they become straight-line equations, solved by making one coefficient match.",
      definition:
        "- Let \\(x = \\frac{1}{U}\\) and \\(y = \\frac{1}{D}\\). A trip of \\(a\\) km up and \\(c\\) km down in \\(T\\) hours is \\(ax + cy = T\\).\n" +
        "- Multiply one or both equations so that the up distances (or the down distances) match, then subtract to find the other unknown.\n" +
        "- Turn \\(x\\) and \\(y\\) back into speeds, then take half the sum and half the difference for the boat and the stream.\n" +
        "- **Up and back** in a total time \\(T\\) over \\(d\\) km gives \\(x + y = \\frac{T}{d}\\) at once.\n" +
        "- **Fast route:** speeds that divide the distances exactly are a strong hint. Try them, then check both trips before you choose.",
      authoredExample: {
        prompt: "A boat goes 30 km upstream and 28 km downstream in 7 hours, and 18 km upstream and 70 km downstream in 8 hours. Find the speeds of the boat in still water and of the stream.",
        steps: [
          "With \\(x = \\frac{1}{U}\\), \\(y = \\frac{1}{D}\\): \\(30x + 28y = 7\\) and \\(18x + 70y = 8\\).",
          "Multiply the first by 5 and the second by 2: \\(150x + 140y = 35\\) and \\(36x + 140y = 16\\). Subtract: \\(114x = 19\\), so \\(x = \\frac{1}{6}\\) and \\(U = 6\\).",
          "Then \\(28y = 7 - 5 = 2\\), so \\(y = \\frac{1}{14}\\) and \\(D = 14\\).",
          "Boat \\(= \\frac{14 + 6}{2} = 10\\) km/h; stream \\(= \\frac{14 - 6}{2} = 4\\) km/h. Check: \\(\\frac{18}{6} + \\frac{70}{14} = 3 + 5 = 8\\) hours.",
        ],
        answer: "Boat 10 km/h, stream 4 km/h",
      },
      selfCheckExample: {
        prompt: "A boat goes 48 km upstream and comes back in 16 hours in all. It goes 8 km upstream and 30 km downstream in 4 hours 30 minutes. What is the speed of the stream?",
        steps: [
          "Up and back: \\(48(x + y) = 16\\), so \\(x + y = \\frac{1}{3}\\) and \\(8x + 8y = \\frac{8}{3}\\).",
          "Second trip: \\(8x + 30y = 4.5\\). Subtract: \\(22y = 4.5 - \\frac{8}{3} = \\frac{11}{6}\\), so \\(y = \\frac{1}{12}\\) and \\(D = 12\\).",
          "\\(x = \\frac{1}{3} - \\frac{1}{12} = \\frac{1}{4}\\), so \\(U = 4\\). Stream \\(= \\frac{12 - 4}{2} = 4\\) km/h.",
        ],
        answer: "4 km/h",
      },
      practiceSet: [
        {
          prompt: "A boat goes 30 km upstream and 30 km back in 8 hours. Its downstream speed is 15 km/h. What is its upstream speed?",
          answer: "5 km/h",
          method: "Downstream takes 2 hours, so upstream takes 6.",
        },
        {
          prompt: "A boat's upstream speed is 4 km/h and its downstream speed is 12 km/h. What are the speeds of the boat in still water and of the stream?",
          answer: "Boat 8 km/h, stream 4 km/h",
        },
        {
          prompt: "With \\(x = \\frac{1}{U}\\) and \\(y = \\frac{1}{D}\\), a boat's trips give \\(10x + 20y = 4\\) and \\(10x + 30y = 5\\). What is the downstream speed?",
          answer: "10 km/h",
          method: "Subtract: \\(10y = 1\\).",
        },
        {
          prompt: "A boat goes 12 km upstream and 24 km downstream in 6 hours. Its upstream speed is 4 km/h. What is its downstream speed?",
          answer: "8 km/h",
          method: "3 hours upstream leaves 3 hours for 24 km.",
        },
      ],
      pyqExampleId: "e9a581c3-fe1e-447d-a6d0-51d39bb97369",
      traps: [
        {
          title: "Taking the speeds themselves as the unknowns",
          body:
            "An equation such as 36 ÷ U + 20 ÷ D = 8 is not a straight-line equation in U and D. Take 1 ÷ U and 1 ÷ D as the unknowns and it is.",
        },
        {
          title: "Stopping at the downstream and upstream speeds",
          body:
            "These questions usually ask for the boat's speed or the stream's speed. After finding D and U, one more step remains: half their sum or half their difference.",
        },
      ],
    },
  ],
};
