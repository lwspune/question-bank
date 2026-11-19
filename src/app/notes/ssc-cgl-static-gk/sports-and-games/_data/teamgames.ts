import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_TEAMGAMES_NOTE: SubtopicNote = {
  subtopicName: "Hockey, Football, Kabaddi and Court Games",
  title: "Hockey, Football, Kabaddi and Court Games",
  oneLineDefinition:
    "How to tell which sport a term belongs to, then the rules, words and titles of hockey, football, kabaddi, basketball, volleyball, handball and water polo.",
  whyItMatters:
    "Twenty-nine questions in the bank, eleven of them from the 2025 shifts. Six of those eleven test a rule through four statements or a matching list (a basketball violation, a kabaddi card, a water polo position), so read the rules as well as the words.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscssptg-whichsport",
      name: "Which sport does the term belong to",
      intuition:
        "A term question gives a word and four sports. Picture where the word happens: a ball over a back line from inside a circle is hockey, a kick from a penalty spot is football, a line a raider must cross is kabaddi, a hoop is basketball. Then strike out the sports the other words belong to.",
      definition:
        "Steps:\n" +
        "1. Ask what the word describes: a place on the field, a move, a score or a foul.\n" +
        "2. Match it to the field it needs, using the lists below.\n" +
        "3. Strike out options whose sport you know does not have that field; pick what is left.\n" +
        "4. Watch for words shared by two sports: **screen** (volleyball and basketball), **deuce** (tennis, badminton, table tennis), **Grand Slam** (tennis and golf).\n\n" +
        "Words by sport:\n" +
        "- **Hockey**: penalty corner, long corner, free hit, the circle.\n" +
        "- **Football**: direct free kick, bicycle kick (an overhead kick backwards), own goal, brace, hat-trick, header.\n" +
        "- **Kabaddi**: raid, raider, baulk line, bonus line, golden raid.\n" +
        "- **Basketball**: screen (also called a pick), swish, layup, slam dunk, alley-oop, shot clock.\n" +
        "- **Ice hockey**: the **blue lines** that split the rink into three zones.",
      authoredExample: {
        prompt: "Which of the following terms is related to football? (a) Header (b) Deuce (c) Maiden over (d) Baulk line",
        steps: [
          "Deuce is a score of 40-40, so it needs a tennis court: strike it.",
          "A maiden over needs overs and a bowler: cricket. Strike it.",
          "A baulk line is a line a kabaddi raider crosses: strike it.",
          "A header is striking the ball with the head, a football move.",
        ],
        answer: "(a) Header",
      },
      pyqExampleId: "7a566f0a-a5ac-4b9f-85e7-4e273cb3fb8f",
      selfCheckExample: {
        prompt: "Apart from volleyball, in which sport do players use a screen?",
        steps: [
          "A screen is an attacker standing still in a defender's path to free a teammate.",
          "That move belongs to basketball, where it is also called a pick.",
        ],
        answer: "Basketball.",
      },
      practiceSet: [
        { prompt: "To which sport does the term \"penalty corner\" belong?", answer: "Hockey" },
        { prompt: "To which sport does the term \"bicycle kick\" belong?", answer: "Football" },
        { prompt: "To which sport does the term \"slam dunk\" belong?", answer: "Basketball" },
        { prompt: "To which sport does the term \"raid\" belong?", answer: "Kabaddi" },
      ],
      traps: [
        {
          title: "A word can belong to two sports",
          body: "A **screen** is used in **volleyball** (hiding the server) and in **basketball** (blocking a defender). When the question says \"apart from volleyball\", the answer is **basketball**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssptg-hockeyfootball",
      name: "Hockey and football: restarts, scoring words and titles",
      intuition:
        "In hockey the restart after the ball crosses the back line depends on who touched it last and whether it was on purpose. In football SSC asks the length of a match and the words for goals.",
      definition:
        "**Hockey**:\n" +
        "- Ball over the back line off a **defender, by accident**: a **long corner** to the attacking side.\n" +
        "- A **defender's offence inside the circle**, or a **deliberate** play over the back line: a **penalty corner**.\n" +
        "- Ball over the back line off an **attacker**: a **free hit** to the defence.\n" +
        "- India won the men's **Hockey World Cup** once, in **1975** at Kuala Lumpur, beating Pakistan 2-1 in the final.\n" +
        "- Two Asian titles are easily mixed up: the **Asia Cup**, first held in 1982 at Karachi, was won by **Pakistan**; the **Asian Champions Trophy**, first held in 2011, was won by **India**.\n\n" +
        "**Football**:\n" +
        "- A match is **two halves of 45 minutes**, plus added time; each side has **11 players**.\n" +
        "- An **own goal** is one a player puts into his own team's net; it counts for the opponents.\n" +
        "- A **brace** is **two** goals by one player in a match; a **hat-trick** is **three**.\n" +
        "- India won the **2018 Intercontinental Cup** in **Mumbai**, beating Kenya 2-0; **Sunil Chhetri** scored both goals.",
      table: {
        columns: ["Sport", "Situation or word", "Answer"],
        rows: [
          { cells: ["Hockey", "Defender sends the ball over the back line by accident", "Long corner"] },
          { cells: ["Hockey", "Defender's offence inside the circle", "Penalty corner"] },
          { cells: ["Hockey", "Attacker sends the ball over the back line", "Free hit to the defence"] },
          { cells: ["Football", "Length of a match", "Two halves of 45 minutes"] },
          { cells: ["Football", "Goal into one's own net", "Own goal"] },
          { cells: ["Football", "Three goals by one player in a match", "Hat-trick"] },
        ],
      },
      pyqExampleId: "b21f887d-1b52-4495-8899-ea688fd1f696",
      selfCheckExample: {
        prompt: "In a hockey match, an attacker hits the ball over the defending side's back line. How is play restarted?",
        steps: ["The attacker touched it last, so the attack loses the ball.", "The defence restarts with a free hit."],
        answer: "A free hit to the defending side.",
      },
      practiceSet: [
        { prompt: "How long is each half of a football match?", answer: "45 minutes" },
        { prompt: "In which year did India win the men's Hockey World Cup?", answer: "1975" },
        { prompt: "In which city did India win the 2018 Intercontinental Cup?", answer: "Mumbai" },
        { prompt: "What is the goal a player puts into his own team's net called?", answer: "An own goal" },
      ],
      traps: [
        {
          title: "Accident or offence decides the corner",
          body: "A defender's **accidental** touch over the back line gives a **long corner**. A **penalty corner** needs an **offence in the circle** or a **deliberate** play over the line.",
        },
        {
          title: "Asia Cup and Asian Champions Trophy are different events",
          body: "The first **Asia Cup** (1982) went to **Pakistan**; the first **Asian Champions Trophy** (2011) went to **India**. Read which title the question names.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssptg-kabaddi",
      name: "Kabaddi: court, players and tournaments",
      intuition:
        "Kabaddi is India's own team game, so SSC asks its rules and its firsts. The court is a set of named lines; the players and the cards are small numbers.",
      definition:
        "**Players**: **7** on court for each side, with **5** substitutes (a squad of 12).\n\n" +
        "**Court lines**: the **mid line**, the **baulk lines** (a raider must cross the baulk line in the opponents' half for the raid to count), the **bonus lines** (a bonus point when six or more defenders are on court), the **end lines** and the **lobbies**. An **attack line** belongs to **volleyball**, not kabaddi.\n\n" +
        "**Cards**: **green** is a warning, **yellow** a **2-minute** suspension, **red** a suspension for the match.\n\n" +
        "**Golden raid**: if a knockout match is still tied after five raids each, a **fresh toss** is held and its winner takes the golden raid. Each team gets one.\n\n" +
        "**Firsts**: the first **Asian Kabaddi Championship**, **1980**, Kolkata (India won); the first **Kabaddi World Cup**, **2004**, **Mumbai** (India beat Iran); the **Pro Kabaddi League** began in **2014**.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Players on court per side", "7 (squad of 12)"] },
          { cells: ["Line a raider must cross", "Baulk line"] },
          { cells: ["Line not on a kabaddi court", "Attack line (volleyball)"] },
          { cells: ["Yellow card", "2-minute suspension"] },
          { cells: ["First Asian Kabaddi Championship", "1980, Kolkata"] },
          { cells: ["First Kabaddi World Cup", "2004, Mumbai"] },
          { cells: ["Pro Kabaddi League begins", "2014"] },
        ],
      },
      pyqExampleId: "8c4bc117-e7af-4061-8cf7-e16a5502301d",
      selfCheckExample: {
        prompt: "A raider goes into the opponents' half but turns back before crossing one line, so his raid does not count. Which line?",
        steps: ["A raid counts only once the raider crosses the baulk line in the opponents' half."],
        answer: "The baulk line.",
      },
      practiceSet: [
        { prompt: "How many kabaddi players does each side have on court?", answer: "7" },
        { prompt: "In which year did the Pro Kabaddi League begin?", answer: "2014" },
        { prompt: "Which city hosted the first Kabaddi World Cup?", answer: "Mumbai (2004)" },
        { prompt: "In which year was the first Asian Kabaddi Championship held?", answer: "1980" },
      ],
      traps: [
        {
          title: "The attack line is volleyball's",
          body: "Kabaddi has mid, baulk, bonus and end lines. The **attack line** is on a **volleyball** court.",
        },
        {
          title: "A green card is only a warning",
          body: "In kabaddi a **green** card warns, a **yellow** card suspends for **2 minutes**, a **red** card for the match.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssptg-court",
      name: "Basketball, volleyball, handball and water polo",
      intuition:
        "These rule questions offer four statements with one changed number or word. Know the key numbers of basketball and volleyball, and the meaning of each named foul or position.",
      definition:
        "**Basketball** (FIBA rules):\n" +
        "- A team must shoot within **24 seconds** (the shot clock), may stay in the restricted area for **3 seconds** at most, and must bring the ball into the front court within **8 seconds**.\n" +
        "- A **personal foul** is illegal physical contact with an opponent while the ball is live; arguing or bench conduct is a **technical foul**. **Five** personal fouls send a player out; a **disqualifying foul** sends him off at once.\n" +
        "- A **swish** goes through the hoop without touching the rim or backboard. The **reverse (spin) dribble** is an attacking move to get past a defender.\n" +
        "- The backboard is **1.80 m wide and 1.05 m tall**; its lines are **white, 50 mm** wide. The ring's inside diameter is **450 to 459 mm**.\n\n" +
        "**Volleyball**: six players a side; sets **1 to 4** go to **25** points and the deciding **fifth** set to **15**, each with a two-point lead. **Beach volleyball** teams have **two** players and **no substitutes**.\n\n" +
        "**Handball**: players may catch, dribble and stop the ball with the body above the knee, but may not **pull or hit the ball out of an opponent's hands**.\n\n" +
        "**Water polo**: the **centre forward** is the main attacker in front of goal between the 2 m and 4 m lines; a **driver** swims into scoring position without the ball; the **centre back** guards the centre forward; **dead time** runs from a whistle to the restart.",
      table: {
        columns: ["Game", "Rule or word", "Answer"],
        rows: [
          { cells: ["Basketball", "Shot clock", "24 seconds"] },
          { cells: ["Basketball", "Most time in the restricted area", "3 seconds"] },
          { cells: ["Basketball", "Illegal contact with an opponent", "Personal foul"] },
          { cells: ["Basketball", "Backboard size", "1.80 m wide, 1.05 m tall"] },
          { cells: ["Volleyball", "Points in sets 1 to 4", "25"] },
          { cells: ["Volleyball", "Points in the fifth set", "15"] },
          { cells: ["Beach volleyball", "Players and substitutes", "Two players, no substitutes"] },
          { cells: ["Water polo", "Defender who guards the centre forward", "Centre back"] },
        ],
      },
      pyqExampleId: "32b7f0fd-fa2c-4e46-b359-bf0e7b5c39c6",
      selfCheckExample: {
        prompt: "A volleyball match is level at two sets each. To how many points is the deciding set played?",
        steps: ["Sets 1 to 4 go to 25 points.", "The fifth, deciding set is shorter: 15 points, with a two-point lead."],
        answer: "15 points.",
      },
      practiceSet: [
        { prompt: "How many seconds does a basketball team have to attempt a shot?", answer: "24 seconds" },
        { prompt: "How many substitutes may a beach volleyball team use?", answer: "None" },
        { prompt: "What is a basketball shot that goes through the hoop without touching the rim or backboard called?", answer: "A swish" },
        { prompt: "In water polo, which player is the main attacker in front of the goal?", answer: "The centre forward" },
      ],
      traps: [
        {
          title: "Five fouls are not a disqualifying foul",
          body: "**Five personal fouls** send a basketball player out of the game; a **disqualifying foul** is a single flagrant act that sends him off at once.",
        },
        {
          title: "The backboard is wider than it is tall",
          body: "A basketball backboard is **1.80 m wide** and **1.05 m tall**. An option giving 1.05 m wide and 1.80 m tall swaps them.",
        },
      ],
    },
  ],
};
