import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_RACKET_NOTE: SubtopicNote = {
  subtopicName: "Racket Sports and Chess",
  title: "Racket Sports and Chess",
  oneLineDefinition:
    "Badminton's court, strokes and team cups; the tennis Grand Slams and table tennis service rules; how each chess piece moves, the special moves, and India's chess firsts.",
  whyItMatters:
    "Twenty questions in the bank, eleven of them on chess alone. Chess questions ask how a piece moves or what a special move allows, so one table of moves and three special rules settle most of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscssprk-badminton",
      name: "Badminton court, strokes and the Thomas Cup",
      intuition:
        "A badminton court has one length for everyone and two widths. Strokes are named by where on the court they are played. The Thomas Cup is the men's team event.",
      definition:
        "**Court**: **13.40 m long** for both singles and doubles. Only the width changes: **6.10 m for doubles**, **5.18 m for singles**. A game goes to **21** points.\n\n" +
        "**Strokes by court area**:\n" +
        "- **Forecourt** (near the net): net shots and **net kills**.\n" +
        "- **Midcourt**: **drives** and blocks.\n" +
        "- **Rear court** (at the back): **clears**, drops and smashes.\n\n" +
        "**Team cups**: the **Thomas Cup** is the **men's** world team championship and the **Uber Cup** the **women's**. The Thomas Cup has been held **every two years** (biennial) since 1984. India won the Thomas Cup in 2022.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Court length, singles and doubles", "13.40 m"] },
          { cells: ["Court width, doubles", "6.10 m"] },
          { cells: ["Points in a game", "21"] },
          { cells: ["Net kill", "Forecourt stroke"] },
          { cells: ["Drive", "Midcourt stroke"] },
          { cells: ["Clear", "Rear-court stroke"] },
          { cells: ["Thomas Cup", "Men's team event, every two years"] },
          { cells: ["Uber Cup", "Women's team event"] },
        ],
      },
      pyqExampleId: "c95c0b38-70ce-46c3-8fa2-a0f3c117a0cd",
      selfCheckExample: {
        prompt: "From which part of the badminton court is a clear played, and from which a net kill?",
        steps: ["A clear sends the shuttle high to the back, played from the rear court.", "A net kill is a fast downward hit close to the net, in the forecourt."],
        answer: "A clear from the rear court; a net kill from the forecourt.",
      },
      practiceSet: [
        { prompt: "How long is a badminton court for singles?", answer: "13.40 m (the same as for doubles)" },
        { prompt: "How often is the Thomas Cup held?", answer: "Every two years" },
        { prompt: "Which cup is the women's world team championship in badminton?", answer: "The Uber Cup" },
        { prompt: "To how many points is a game of badminton played?", answer: "21" },
      ],
      traps: [
        {
          title: "Singles and doubles share one length",
          body: "Both courts are **13.40 m** long. Only the **width** differs, so an option of a different length for singles is wrong.",
        },
        {
          title: "Thomas is men, Uber is women",
          body: "The **Thomas Cup** is the **men's** team championship; the **Uber Cup** is the **women's**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssprk-tennis",
      name: "Tennis and table tennis",
      intuition:
        "Tennis questions ask the Grand Slams and the scoring words. Table tennis questions ask the ball and the service order, where the rule changes at 10-10.",
      definition:
        "**Tennis**:\n" +
        "- The four **Grand Slams**: the **Australian Open**, **French Open**, **Wimbledon** and **US Open**. Golf also uses the term, but it is best known in tennis.\n" +
        "- **Deuce** is the score of **40-40**.\n" +
        "- Since **2022** all four Grand Slams play a **10-point tiebreak** when the final set reaches **6-6**.\n\n" +
        "**Table tennis**:\n" +
        "- A game goes to **11** points. The ball is **40 mm** across and weighs 2.7 g; it replaced the 38 mm ball in **2000**.\n" +
        "- Service changes **every two points**, but from **10-10** it changes **after every point**.\n" +
        "- In the last possible game of a **doubles** match, the receiving pair changes its order when one side reaches **5** points.\n" +
        "- The **19th World Table Tennis Championships** were held in **Bombay** in **1952**.",
      table: {
        columns: ["Sport", "Fact", "Answer"],
        rows: [
          { cells: ["Tennis", "The four Grand Slams", "Australian Open, French Open, Wimbledon, US Open"] },
          { cells: ["Tennis", "Score of 40-40", "Deuce"] },
          { cells: ["Tennis", "Final-set tiebreak at a Grand Slam, since 2022", "At 6-6"] },
          { cells: ["Table tennis", "Points in a game", "11"] },
          { cells: ["Table tennis", "Service from 10-10", "Changes after every point"] },
          { cells: ["Table tennis", "World Championships in India", "19th, Bombay, 1952"] },
        ],
      },
      pyqExampleId: "d07a3335-e8db-400b-aec6-228aeeba09a0",
      selfCheckExample: {
        prompt: "Name the four Grand Slam tennis tournaments.",
        steps: ["Two are played on hard courts: the Australian Open and the US Open.", "The French Open is on clay and Wimbledon on grass."],
        answer: "Australian Open, French Open, Wimbledon and US Open.",
      },
      practiceSet: [
        { prompt: "What is a score of 40-40 in tennis called?", answer: "Deuce" },
        { prompt: "From which score does table tennis service change after every point?", answer: "10-10" },
        { prompt: "In which city were the 1952 World Table Tennis Championships held?", answer: "Bombay (Mumbai)" },
        { prompt: "Since 2022, at what score in the final set does a Grand Slam match go to a tiebreak?", answer: "6-6" },
      ],
      traps: [
        {
          title: "Table tennis service changes faster at 10-10",
          body: "Service normally changes **every two points**; from **10-10** it changes after **every** point.",
        },
        {
          title: "The 38 mm ball is the old one",
          body: "Table tennis has used a **40 mm** ball since **2000**. **38 mm** was the old size.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssprk-chessrules",
      name: "Chess pieces, moves and special rules",
      intuition:
        "Every chess question here is one piece's move or one special rule. Learn the six pieces in a table, then the three special moves: castling, en passant and promotion.",
      definition:
        "**Board and pieces**: **64** squares in alternate light and dark colours, called **white and black**. Each side starts with **16 pieces**: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights and **8 pawns**.\n\n" +
        "**Special moves**:\n" +
        "- **Castling**: the king moves **two squares** towards a rook, and the rook jumps to the square the king crossed.\n" +
        "- **En passant**: when a pawn moves two squares and lands beside an enemy pawn, that pawn may capture it as if it had moved one; this must be done **on the very next move** or the right is lost.\n" +
        "- **Promotion**: a pawn reaching the last rank becomes a **queen, rook, bishop or knight** of its own colour, never a king or pawn, whatever pieces have been captured.\n\n" +
        "**Zugzwang**: a position where any move makes things worse, but the player must move.",
      table: {
        columns: ["Piece", "Number per side", "How it moves"],
        rows: [
          { cells: ["King", "1", "One square in any direction"] },
          { cells: ["Queen", "1", "Any number of squares along a row, column or diagonal"] },
          { cells: ["Rook", "2", "Any number of squares along a row or column"] },
          { cells: ["Bishop", "2", "Diagonally only"] },
          { cells: ["Knight", "2", "In an L shape; it can jump over pieces"] },
          { cells: ["Pawn", "8", "Forward one square (two on its first move), never backward; captures diagonally"] },
        ],
      },
      pyqExampleId: "5bb6fb89-a60c-44f9-8693-c933bfbd450f",
      selfCheckExample: {
        prompt: "A pawn reaches the last rank while its side still has its queen. Can it become a second queen?",
        steps: ["Promotion does not depend on which pieces have been captured.", "The pawn may become any queen, rook, bishop or knight of its own colour."],
        answer: "Yes, it can become a second queen.",
      },
      practiceSet: [
        { prompt: "Which chess piece moves in an L shape and can jump over others?", answer: "The knight" },
        { prompt: "How many pawns does each side start with in chess?", answer: "8" },
        { prompt: "What is the special move in which the king moves two squares towards a rook called?", answer: "Castling" },
        { prompt: "What is the chess term for a position in which any move makes things worse but the player must move?", answer: "Zugzwang" },
      ],
      traps: [
        {
          title: "En passant cannot wait",
          body: "An **en passant** capture must be made on the **very next move**. A turn later the right is gone.",
        },
        {
          title: "The pawn is the piece that never goes back",
          body: "Only the **pawn** cannot move backward. The queen, rook and bishop move back along their lines as freely as forward.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssprk-chessfirsts",
      name: "India's chess Grandmasters",
      intuition:
        "Two titles are easily confused: Grandmaster (GM), open to everyone, and Woman Grandmaster (WGM), a separate women's title. India's first woman to hold each is a different player.",
      definition:
        "The facts:\n" +
        "- **Viswanathan Anand** became India's **first Grandmaster** in **1988**.\n" +
        "- **Dibyendu Barua** became the **second**, in **1991**, and Pravin Thipsay the third, in 1997.\n" +
        "- **S. Vijayalakshmi** became India's **first Woman Grandmaster (WGM)**, in **2001**.\n" +
        "- **Koneru Humpy** became the first Indian woman to earn the full **Grandmaster** title, in **2002**.\n" +
        "- **Bhakti Kulkarni** of Goa is a Woman Grandmaster and a former national women's champion.",
      table: {
        columns: ["Player", "First", "Year"],
        rows: [
          { cells: ["Viswanathan Anand", "India's first Grandmaster", "1988"] },
          { cells: ["Dibyendu Barua", "India's second Grandmaster", "1991"] },
          { cells: ["S. Vijayalakshmi", "India's first Woman Grandmaster (WGM)", "2001"] },
          { cells: ["Koneru Humpy", "First Indian woman with the full GM title", "2002"] },
        ],
      },
      pyqExampleId: "e52d1d9c-046d-4315-bb8a-20d7d977433d",
      selfCheckExample: {
        prompt: "Who was India's first Woman Grandmaster, and who was the first Indian woman to earn the full Grandmaster title?",
        steps: ["The WGM title is a separate women's title: S. Vijayalakshmi earned it first, in 2001.", "The open GM title came to Koneru Humpy in 2002."],
        answer: "S. Vijayalakshmi (WGM); Koneru Humpy (GM).",
      },
      practiceSet: [
        { prompt: "Who was India's first chess Grandmaster?", answer: "Viswanathan Anand" },
        { prompt: "Who became India's second chess Grandmaster, in 1991?", answer: "Dibyendu Barua" },
        { prompt: "Who was the first Indian woman to earn the full Grandmaster title?", answer: "Koneru Humpy" },
        { prompt: "Who became India's third chess Grandmaster, in 1997?", answer: "Pravin Thipsay" },
      ],
      traps: [
        {
          title: "WGM and GM are different titles",
          body: "**S. Vijayalakshmi** was India's first **Woman Grandmaster**; **Koneru Humpy** was the first Indian woman to earn the open **Grandmaster** title. Read which title the question asks.",
        },
      ],
    },
  ],
};
