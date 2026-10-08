import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_GRIDS_NOTE: SubtopicNote = {
  subtopicName: "Directions, Grids and Seating",
  title: "Directions, Grid Paths, Seating Plans and Lengths",
  oneLineDefinition:
    "Track position and facing direction step by step, count grid routes by choosing moves, fix one person at a table before placing the rest, and count gaps rather than posts.",
  whyItMatters:
    "A 2025 ministry question placed four people around a table using left and right and asked what can be deduced. The Cambridge papers numbered squares on a board (2014) and houses on a street (2012), asked how few sensors cover a grid (2022), and measured lengths along a chain and around a box (2011, 2019).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-spa-directions",
      name: "Compass directions, turns and distance from the start",
      intuition:
        "Keep two things as you go: where you are and which way you face. A right turn moves your facing one step clockwise round the compass (north, east, south, west), a left turn one step back. At the end, the net distance east and north gives the straight-line distance by Pythagoras.",
      definition:
        "- Clockwise order: **north, east, south, west**. A right turn is 90° clockwise; a left turn is 90° anticlockwise; an about-turn is 180°.\n" +
        "- Record each walk as a change in east (\\(x\\)) and north (\\(y\\)); a walk west or south is negative.\n" +
        "- The straight-line distance from the start is \\(\\sqrt{x^2 + y^2}\\).\n" +
        "- Common right-angled triangles: 3, 4, 5 and 6, 8, 10 and 5, 12, 13.",
      formula: {
        label: "Distance from the start",
        latex: "d = \\sqrt{x^2 + y^2}",
        symbols: [
          { symbol: "\\(x\\)", meaning: "net distance east (negative for west)" },
          { symbol: "\\(y\\)", meaning: "net distance north (negative for south)" },
        ],
      },
      authoredExample: {
        prompt:
          "Starting out facing north, a hiker walks 4 km, turns right and walks 3 km, then turns right again and walks 8 km. How far is she from the start, and in which direction from it?",
        steps: [
          "4 km north: position \\((0, 4)\\). Turn right: facing east. 3 km: \\((3, 4)\\).",
          "Turn right: facing south. 8 km: \\((3, -4)\\).",
          "Distance: \\(\\sqrt{3^2 + 4^2} = 5\\) km. She is 3 km east and 4 km south of the start, so to the south-east.",
        ],
        answer: "5 km, to the south-east of the start",
      },
      selfCheckExample: {
        prompt:
          "Lea faces north. She turns right and walks 9 m, turns left and walks 8 m, then turns left again and walks 3 m. How far is she from her starting point, and which way is she facing?",
        options: ["20 m, facing west", "14 m, facing south", "12 m, facing west", "10 m, facing east", "10 m, facing west"],
        steps: [
          "Right from north: east, 9 m: \\((9, 0)\\). Left: north, 8 m: \\((9, 8)\\). Left: west, 3 m: \\((6, 8)\\).",
          "Distance \\(\\sqrt{6^2 + 8^2} = 10\\) m, and she is facing west.",
          "A adds the walks. C ignores the last walk west (\\(\\sqrt{9^2 + 8^2} \\approx 12\\)). D turns the wrong way at the end.",
        ],
        answer: "(E) 10 m, facing west",
      },
      practiceSet: [
        { prompt: "Facing north, you turn right, right again, then left. Which way do you face?", answer: "East" },
        { prompt: "Facing east, you turn 270° clockwise. Which way do you face?", answer: "North" },
        { prompt: "You walk 5 km north and then 12 km east. How far are you from the start?", answer: "13 km", method: "\\(\\sqrt{25 + 144}\\)" },
      ],
      traps: [
        {
          title: "Right and left depend on the way you face",
          body: "A right turn while facing south sends you west, not east. Update the facing direction after every turn before reading the next instruction; the wrong options usually come from treating right as always east.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-grid-paths",
      name: "Grids: counting shortest routes and reading numbered boards",
      intuition:
        "A shortest route across a street grid is just a list of moves, some east and some north. Every route uses the same number of each; routes differ only in the order. So counting routes means counting the ways to choose which moves are the north ones.",
      definition:
        "- A shortest route that goes \\(m\\) blocks east and \\(n\\) blocks north has \\(m + n\\) moves, and the number of such routes is \\(\\binom{m+n}{n}\\).\n" +
        "- \\(\\binom{a}{b} = \\dfrac{a!}{b!\\,(a-b)!}\\); for example \\(\\binom{5}{2} = 10\\).\n" +
        "- **Numbered boards**: find the row of a number by dividing by the row length. On a \"snake\" board the direction of counting reverses on every row.\n" +
        "- **Covering a grid**: if each piece covers \\(k\\) squares, you need at least the number of squares divided by \\(k\\), rounded up.",
      formula: {
        label: "Shortest grid routes",
        latex: "\\text{routes} = \\binom{m + n}{n} = \\frac{(m + n)!}{m!\\, n!}",
        symbols: [
          { symbol: "\\(m\\)", meaning: "blocks east (or right)" },
          { symbol: "\\(n\\)", meaning: "blocks north (or up)" },
        ],
      },
      authoredExample: {
        prompt: "How many shortest routes are there from one corner of a 2 by 2 block grid to the opposite corner?",
        steps: [
          "Each route has 2 east moves (E) and 2 north moves (N): 4 moves.",
          "Choose which 2 of the 4 moves are N: \\(\\binom{4}{2} = 6\\).",
          "Listed: EENN, ENEN, ENNE, NEEN, NENE, NNEE.",
        ],
        answer: "6",
      },
      selfCheckExample: {
        prompt:
          "In a town with a square grid of streets, the school is 3 blocks east and 2 blocks north of Marco's house. How many different shortest walking routes are there from the house to the school?",
        options: ["10", "6", "5", "20", "12"],
        steps: [
          "Every shortest route has 3 E moves and 2 N moves: 5 moves in total.",
          "Choose the 2 N moves among the 5: \\(\\binom{5}{2} = 10\\).",
          "B multiplies 3 by 2. C counts the moves, not the routes. D is \\(5 \\times 4\\), which counts the N moves in order as if they were different.",
        ],
        answer: "(A) 10",
      },
      practiceSet: [
        { prompt: "How many shortest routes cross a 4 by 4 block grid from corner to corner?", answer: "70", method: "\\(\\binom{8}{4}\\)" },
        { prompt: "A board of 36 squares has rows of 6. Row 1 runs 1 to 6 left to right, row 2 runs 7 to 12 right to left, and so on. Which number is directly above 8?", answer: "17", method: "8 is 5th from the left in row 2; row 3 runs 13 to 18 left to right" },
        { prompt: "Each sensor covers a 3 by 3 block of squares. What is the fewest sensors that can cover a 6 by 6 grid?", answer: "4", method: "36 divided by 9, and four 3 by 3 blocks tile the grid exactly" },
      ],
      traps: [
        {
          title: "Count orders of moves, not moves",
          body: "Every shortest route has the same number of moves, so the number of moves is never the number of routes. The routes differ only in the order of east and north steps, which is what \\(\\binom{m+n}{n}\\) counts.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-seating",
      name: "Seating around a table: left and right when facing the centre",
      intuition:
        "People round a table face the middle, so their left and right are not yours. Seen from above, a person's left-hand neighbour is the next seat clockwise, and their right-hand neighbour is the next seat anticlockwise. Fix one person first; with a round table, rotating everyone changes nothing.",
      definition:
        "For people seated round a table, all **facing the centre**, seen from above:\n" +
        "- The person **immediately to someone's left** is the next seat **clockwise**.\n" +
        "- The person **immediately to someone's right** is the next seat **anticlockwise**.\n" +
        "- With an even number of evenly spaced seats, the person **opposite** is half-way round.\n" +
        "- Number the seats clockwise from one fixed person, then place the others from the most definite clue.\n" +
        "- For people in a row facing you, their left is your right.",
      authoredExample: {
        prompt:
          "Lia, Max, Nora and Omar sit at a round table with four evenly spaced seats, all facing the centre. Lia sits opposite Max, and Nora sits immediately to Lia's right. Who sits immediately to Omar's left?",
        steps: [
          "Number the seats 0, 1, 2, 3 clockwise from above. Put Lia in seat 0, so Max is in seat 2.",
          "Lia's right is the next seat anticlockwise: seat 3. Nora is there, and Omar takes seat 1.",
          "Omar's left is the next seat clockwise from seat 1: seat 2, which is Max.",
        ],
        answer: "Max",
      },
      selfCheckExample: {
        prompt:
          "Paolo, Quirino, Rita, Sara, Tina and Ugo sit at a round table with six evenly spaced seats, all facing the centre. Paolo sits directly opposite Quirino. Rita sits immediately to Paolo's left. Sara does not sit next to Quirino. Ugo sits immediately to Quirino's right. Which statement is true?",
        options: [
          "Sara sits immediately to Paolo's left.",
          "Tina sits immediately to Quirino's right.",
          "Ugo sits directly opposite Sara.",
          "Rita sits next to Quirino.",
          "Sara sits directly opposite Rita.",
        ],
        steps: [
          "Seats 0 to 5 clockwise. Paolo 0, Quirino 3 (opposite). Rita is to Paolo's left: seat 1.",
          "Ugo is to Quirino's right, the seat anticlockwise from 3: seat 2.",
          "Seats 4 and 5 remain. Seat 4 is next to Quirino, so Sara takes 5 and Tina takes 4.",
          "Seats: Paolo 0, Rita 1, Ugo 2, Quirino 3, Tina 4, Sara 5. Ugo (2) and Sara (5) are opposite: C.",
          "A: Rita is to Paolo's left. B: Ugo is to Quirino's right. D: Rita sits at 1, not beside 3. E: Rita's opposite is Tina.",
        ],
        answer: "(C) Ugo sits directly opposite Sara.",
      },
      practiceSet: [
        { prompt: "Five people sit in a row facing you. Is the person at their far left on your left or your right?", answer: "On your right" },
        { prompt: "Seats at a round table are numbered 1 to 6 clockwise. Who is opposite seat 2?", answer: "Seat 5", method: "Half-way round: 3 seats on" },
        { prompt: "At a table, all facing the centre, B sits immediately to A's left. Whose immediate right is A?", answer: "B's", method: "If B is on A's left, A is on B's right" },
      ],
      traps: [
        {
          title: "Facing the centre flips left and right on the far side",
          body: "A person across the table from you has their left on your right. Seen from above with everyone facing in, \"to the left of\" always means the next seat clockwise; using your own left and right for everyone gives the mirror-image arrangement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-lengths",
      name: "Lengths along a line: fence posts and overlapping pieces",
      intuition:
        "Count gaps, not objects. Along a straight fence the posts outnumber the gaps by one, because both ends need a post. Around a closed loop the last gap returns to the first post, so posts and gaps are equal. When pieces overlap, each join loses one overlap from the total.",
      definition:
        "- A straight line of length \\(L\\) with a post every \\(g\\), including both ends: \\(L/g + 1\\) posts.\n" +
        "- A closed loop of length \\(L\\) with a post every \\(g\\): \\(L/g\\) posts.\n" +
        "- Cutting a pole into \\(k\\) pieces takes \\(k - 1\\) cuts.\n" +
        "- \\(n\\) pieces of length \\(\\ell\\) laid in a row, each overlapping the next by \\(o\\), cover \\(n\\ell - (n - 1)\\,o\\): there are \\(n - 1\\) joins.",
      formula: {
        label: "Overlapping pieces in a row",
        latex: "\\text{length} = n\\,\\ell - (n - 1)\\,o",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of pieces" },
          { symbol: "\\(\\ell\\)", meaning: "length of one piece" },
          { symbol: "\\(o\\)", meaning: "overlap at each join" },
        ],
      },
      authoredExample: {
        prompt:
          "A straight fence 45 m long has a post every 2.5 m, including one at each end. How many posts are there? How many flags are needed round a 400 m running track with a flag every 25 m?",
        steps: [
          "Fence: \\(45 / 2.5 = 18\\) gaps, so \\(18 + 1 = 19\\) posts.",
          "Track: it is a closed loop, so flags equal gaps: \\(400 / 25 = 16\\).",
        ],
        answer: "19 posts; 16 flags",
      },
      selfCheckExample: {
        prompt:
          "Wooden planks 2.0 m long are laid end to end along a path. Each plank overlaps the one before it by 0.25 m. How long is a row of 9 planks?",
        options: ["18.0 m", "16.0 m", "15.75 m", "14.0 m", "16.25 m"],
        steps: [
          "9 planks have 8 joins, so subtract 8 overlaps: \\(9 \\times 2.0 - 8 \\times 0.25 = 18 - 2 = 16.0\\) m.",
          "A ignores the overlaps. C subtracts 9 overlaps, one too many. E subtracts only 7.",
        ],
        answer: "(B) 16.0 m",
      },
      practiceSet: [
        { prompt: "Five strips of tape, each 30 cm long, overlap by 2 cm at every join. How long is the strip?", answer: "142 cm", method: "\\(150 - 4 \\times 2\\)" },
        { prompt: "Trees are planted every 4 m along both sides of a 40 m path, including both ends. How many trees?", answer: "22", method: "11 on each side" },
        { prompt: "How many cuts turn a 3 m pole into 6 equal pieces?", answer: "5" },
      ],
      traps: [
        {
          title: "Posts are one more than gaps on a line, equal on a loop",
          body: "Dividing the length by the spacing counts gaps. On an open line add one post for the far end; on a closed loop do not. Each version gives a wrong answer one away from the right one.",
        },
      ],
    },
  ],
};
