import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_CRICKET_NOTE: SubtopicNote = {
  subtopicName: "Cricket Rules, Terms and World Cups",
  title: "Cricket Rules, Terms and World Cups",
  oneLineDefinition:
    "The pitch, the overs a bowler may bowl, the follow-on and the rarer ways out; the words that belong to cricket; and India's World Cups and firsts.",
  whyItMatters:
    "Nineteen questions in the bank, fourteen of them EASY. Most ask one number, one year or which sport a word belongs to, so this page is quick marks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsspcr-rules",
      name: "Pitch, overs, umpires and the follow-on",
      intuition:
        "Most rule questions are a number. The overs limit is one rule, not two facts: a bowler may bowl at most one-fifth of the innings, so work it out from the format instead of memorising it.",
      definition:
        "The rules:\n" +
        "- The **pitch** is **22 yards** (about 20.12 m) between the two sets of stumps. Each side has **11 players**.\n" +
        "- **Two umpires** stand on the field, one at the bowler's end and one at square leg; the third umpire watches on TV.\n" +
        "- **Overs per bowler**: at most **one-fifth** of the innings. An **ODI** has 50 overs a side, so **10**; a **T20** has 20, so **4**. A Test has no limit.\n" +
        "- The **follow-on** exists only in **two-innings** matches such as **Tests**: in a five-day Test the side batting first may make the other bat again if it leads by at least **200** runs.\n" +
        "- The **ball's weight and size** are fixed by the Laws for red, white and pink balls alike, because they change bounce and swing.\n\n" +
        "**Rarer ways out**:\n" +
        "- **Hit the ball twice**: out only when the second hit is **wilful** (not to protect the wicket).\n" +
        "- **Obstructing the field**: also needs a **wilful** act, so it cannot happen by accident.\n" +
        "- **Retired out**: a batter who retires for a reason other than illness or injury and does not come back.",
      table: {
        columns: ["Rule", "Answer"],
        rows: [
          { cells: ["Length of the pitch", "22 yards"] },
          { cells: ["Players a side", "11"] },
          { cells: ["Umpires on the field", "Two"] },
          { cells: ["Most overs for one bowler in an ODI", "10 (one-fifth of 50)"] },
          { cells: ["Most overs for one bowler in a T20", "4 (one-fifth of 20)"] },
          { cells: ["Follow-on", "Tests only; a lead of 200 in a five-day Test"] },
        ],
      },
      pyqExampleId: "f364ff95-6b17-415a-b491-d4ecc656a899",
      selfCheckExample: {
        prompt: "A one-day match has 40 overs a side and the usual one-fifth limit. How many overs may one bowler bowl?",
        steps: ["One-fifth of 40 is 8."],
        answer: "8 overs.",
      },
      practiceSet: [
        { prompt: "What is the length of a cricket pitch?", answer: "22 yards" },
        { prompt: "How many overs may one bowler bowl in a T20 match?", answer: "4" },
        { prompt: "In which format of cricket can a side be asked to follow on?", answer: "Test matches (two-innings matches)" },
        { prompt: "How many players does a cricket team field?", answer: "11" },
      ],
      traps: [
        {
          title: "No follow-on in one-day cricket",
          body: "One-day and T20 matches give each side **one innings**, so the **follow-on** belongs to **Tests** only.",
        },
        {
          title: "An accident is not obstruction",
          body: "**Obstructing the field** and **hit the ball twice** both need a **wilful** act. An accidental touch is not out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspcr-terms",
      name: "Cricket words",
      intuition:
        "A term question gives a word and four sports, or four words and asks which is not cricket. Know the cricket words below; a word from tennis or hockey stands out at once.",
      definition:
        "**Batting**: a **straight drive** goes back past the bowler with a straight bat; an **agricultural shot** is a crude cross-batted slog.\n\n" +
        "**Bowling and balls**: a **no ball** is an illegal delivery; a **wide** passes out of the batter's reach; a **yorker** lands at the batter's feet; a **maiden over** gives away no runs; a **hat-trick** is three wickets with three balls in a row.\n\n" +
        "**Fielding and dismissal**: the **wicketkeeper** stands behind the batter's stumps; **third man** is a fielding position behind the slips; **LBW** (leg before wicket) is a way of getting out.\n\n" +
        "**Not cricket**: **deuce** (40-40) is tennis, a **penalty corner** is hockey.",
      table: {
        columns: ["Term", "Meaning in cricket"],
        rows: [
          { cells: ["Straight drive", "A shot played back past the bowler"] },
          { cells: ["Agricultural shot", "A crude, cross-batted slog"] },
          { cells: ["Wicketkeeper", "Fielder behind the batter's stumps"] },
          { cells: ["Third man", "Fielding position behind the slips"] },
          { cells: ["Wide", "A ball out of the batter's reach"] },
          { cells: ["Yorker", "A ball that lands at the batter's feet"] },
          { cells: ["Maiden over", "An over with no runs scored"] },
          { cells: ["Hat-trick", "Three wickets with three balls in a row"] },
        ],
      },
      pyqExampleId: "870df55a-6d7b-43e3-bf65-be4779f9046e",
      selfCheckExample: {
        prompt: "Which of these is not a cricket term: yorker, deuce, maiden over?",
        steps: ["A yorker is a ball at the batter's feet and a maiden over gives no runs: both cricket.", "Deuce is the score of 40-40 in tennis."],
        answer: "Deuce.",
      },
      practiceSet: [
        { prompt: "What is an over in which the batting side scores no runs called?", answer: "A maiden over" },
        { prompt: "What is a ball that lands right at the batter's feet called?", answer: "A yorker" },
        { prompt: "Which fielder stands behind the batter's stumps?", answer: "The wicketkeeper" },
        { prompt: "In which sport is a straight drive played?", answer: "Cricket" },
      ],
      traps: [
        {
          title: "Goalkeepers are not wicketkeepers",
          body: "Hockey and football have a **goalkeeper**; only **cricket** has a **wicketkeeper**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspcr-worldcups",
      name: "World Cups and India's cricket firsts",
      intuition:
        "Learn India's cricket story as a short timeline: the first Test win, the women's first Test, the two ODI World Cups, the two T20 titles and the IPL.",
      definition:
        "The timeline:\n" +
        "- **1952**: India's **first Test win**, against England at **Madras (Chennai)**. It levelled the series 1-1.\n" +
        "- **1973**: the first **Women's World Cup**, in **England**, two years before the first men's World Cup.\n" +
        "- **1975**: the first **men's World Cup**, in England; the West Indies won.\n" +
        "- **1976**: India's women play their **first Test**, at home in **Bangalore**, against the West Indies.\n" +
        "- **1983**: India win their **first World Cup** under **Kapil Dev**, beating the West Indies at **Lord's**, in England.\n" +
        "- **2007**: India win the first **T20 World Cup** under **MS Dhoni**, the captain called **\"Captain Cool\"**.\n" +
        "- **2008**: the **IPL** begins; Rajasthan Royals win the first season.\n" +
        "- **2011**: India's **second ODI World Cup**, under Dhoni, beating Sri Lanka in the final in **Mumbai**.\n" +
        "- **2024**: India win their second T20 World Cup.\n\n" +
        "India has hosted or co-hosted the men's ODI World Cup in **1987, 1996, 2011 and 2023**.",
      table: {
        columns: ["Year", "Event", "Remember"],
        rows: [
          { cells: ["1952", "India's first Test win", "Against England at Madras"] },
          { cells: ["1973", "First Women's World Cup", "Held in England"] },
          { cells: ["1975", "First men's World Cup", "England; won by the West Indies"] },
          { cells: ["1983", "India's first World Cup", "Kapil Dev; final at Lord's"] },
          { cells: ["2007", "First T20 World Cup", "Won by India under Dhoni"] },
          { cells: ["2008", "IPL begins", "Rajasthan Royals win season one"] },
          { cells: ["2011", "India's second ODI World Cup", "Dhoni; final in Mumbai"] },
        ],
      },
      pyqExampleId: "05fb5c1f-6544-4678-92ab-9c9a130fe748",
      selfCheckExample: {
        prompt: "India have won two ODI World Cups. For each, give the captain and the team beaten in the final.",
        steps: ["In the first, Kapil Dev's team beat the West Indies at Lord's.", "In the second, MS Dhoni's team beat Sri Lanka in Mumbai."],
        answer: "Kapil Dev against the West Indies; MS Dhoni against Sri Lanka.",
      },
      practiceSet: [
        { prompt: "Which country hosted the first Women's Cricket World Cup?", answer: "England" },
        { prompt: "In which year did the Indian Premier League begin?", answer: "2008" },
        { prompt: "Which Indian captain is known as \"Captain Cool\"?", answer: "MS Dhoni" },
        { prompt: "In which city did India's women play their first Test, in 1976?", answer: "Bangalore" },
      ],
      traps: [
        {
          title: "The 1983 final was played in England",
          body: "India **won** the 1983 World Cup but did **not host** it: it was held in **England**. India's hosting years are 1987, 1996, 2011 and 2023.",
        },
        {
          title: "A first Test win is not a first series win",
          body: "India's first **Test win** came at **Madras in 1952**, but that series against England ended **1-1**.",
        },
        {
          title: "The women's World Cup came first",
          body: "The first **Women's** World Cup (**1973**) was held two years **before** the first men's (**1975**).",
        },
      ],
    },
  ],
};
