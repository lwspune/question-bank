import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_INDIA_NOTE: SubtopicNote = {
  subtopicName: "Indian Sportspersons and Medal Firsts",
  title: "Indian Sportspersons and Medal Firsts",
  oneLineDefinition:
    "India's eight Olympic hockey golds, its individual Olympic firsts from 1900 to London 2012, and the players SSC names with their sports and their Asian, Commonwealth and world firsts.",
  whyItMatters:
    "The largest page of the chapter: 34 questions, 28 of them from the 2024 and 2025 shifts. The later papers ask more than a player's sport: the Games, the event, even how the medal was won. So learn each medal with its Games, its sport and its event.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsspin-hockey",
      name: "Hockey's eight Olympic golds",
      intuition:
        "India's hockey team won gold at its very first Olympics and kept winning for decades. SSC asks the first gold, the last gold, the captain and the famous goal tally of 1932.",
      definition:
        "The facts:\n" +
        "- India first played Olympic hockey at **Amsterdam 1928** and won **gold**, its first Olympic gold in any sport. **Jaipal Singh Munda** was captain and **Dhyan Chand** the top scorer.\n" +
        "- At **Los Angeles 1932** India beat the **USA 24-1**: **Roop Singh** scored 10 goals and his brother Dhyan Chand 8.\n" +
        "- **Eight golds** in all: 1928, 1932, 1936, 1948, 1952, 1956, 1964 and **1980 (Moscow)**, the last.\n" +
        "- After 1980 India won no hockey medal until the **bronze at Tokyo 2020**; it won bronze again at Paris 2024.",
      table: {
        columns: ["Olympics", "Hockey result for India"],
        rows: [
          { cells: ["1928 Amsterdam", "Gold, first Olympic gold; captain Jaipal Singh Munda"] },
          { cells: ["1932 Los Angeles", "Gold; beat the USA 24-1, Roop Singh 10 goals"] },
          { cells: ["1936 Berlin", "Gold, Dhyan Chand captain"] },
          { cells: ["1948, 1952, 1956", "Gold at London, Helsinki, Melbourne"] },
          { cells: ["1964 Tokyo", "Gold"] },
          { cells: ["1980 Moscow", "Gold, the eighth and last"] },
          { cells: ["2020 Tokyo, 2024 Paris", "Bronze"] },
        ],
      },
      pyqExampleId: "3697349f-4dcc-4974-a8a4-e4ab7b44ec52",
      selfCheckExample: {
        prompt: "India won the 1932 Olympic hockey final against the USA 24-1. Who scored ten of those goals?",
        steps: [
          "The two brothers in that team were Dhyan Chand and Roop Singh.",
          "Roop Singh scored 10 and Dhyan Chand 8.",
        ],
        answer: "Roop Singh.",
      },
      practiceSet: [
        { prompt: "How many Olympic gold medals has India won in men's hockey?", answer: "Eight" },
        { prompt: "At which Olympics did India win its last hockey gold?", answer: "Moscow 1980" },
        { prompt: "Who captained India's hockey team at its first Olympics?", answer: "Jaipal Singh Munda" },
        { prompt: "Which Olympics ended India's 41-year wait for a hockey medal, with a bronze?", answer: "Tokyo 2020" },
      ],
      traps: [
        {
          title: "No hockey gold after 1980",
          body: "India's eighth and last hockey gold was **Moscow 1980**. It won **no** hockey medal in 1984, 1988 or 1992.",
        },
        {
          title: "Dhyan Chand did not score the ten",
          body: "In the **24-1** win over the USA in 1932, **Roop Singh** scored 10 goals; Dhyan Chand scored 8.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspin-early",
      name: "Individual Olympic firsts up to 2004",
      intuition:
        "Before 2008 India's individual medals were few, so each is a first. Learn them as a timeline: one name, one Games, one sport.",
      definition:
        "The timeline:\n" +
        "- **1900 Paris**: **Norman Pritchard** won two **silvers**, in the 200 m sprint and the 200 m hurdles: India's first Olympic medals.\n" +
        "- **1952 Helsinki**: **K. D. Jadhav** won **bronze in wrestling**: the first individual medal of independent India.\n" +
        "- **1984 Los Angeles**: **P. T. Usha** came fourth in the **400 m hurdles**, missing bronze by **one-hundredth of a second**.\n" +
        "- **1996 Atlanta**: **Leander Paes** won **bronze in tennis** singles, India's first tennis medal. His first Olympics was Barcelona 1992.\n" +
        "- **2000 Sydney**: **Karnam Malleswari** won **bronze in weightlifting**: the first Olympic medal by an Indian woman. It was India's only medal of those Games.\n" +
        "- **2004 Athens**: **Rajyavardhan Singh Rathore** won **silver in double trap** shooting: India's first Olympic shooting medal.",
      table: {
        columns: ["Games", "Athlete", "Medal and sport"],
        rows: [
          { cells: ["1900 Paris", "Norman Pritchard", "Two silvers, 200 m and 200 m hurdles"] },
          { cells: ["1952 Helsinki", "K. D. Jadhav", "Bronze, wrestling"] },
          { cells: ["1984 Los Angeles", "P. T. Usha", "Fourth, 400 m hurdles, by 0.01 s"] },
          { cells: ["1996 Atlanta", "Leander Paes", "Bronze, tennis singles"] },
          { cells: ["2000 Sydney", "Karnam Malleswari", "Bronze, weightlifting"] },
          { cells: ["2004 Athens", "Rajyavardhan Singh Rathore", "Silver, double trap shooting"] },
        ],
      },
      pyqExampleId: "8bd72ad3-a9c4-40d0-a713-0bd902117705",
      selfCheckExample: {
        prompt: "Put these medals in order and give each one's sport: Rathore's silver, Jadhav's bronze, Malleswari's bronze.",
        steps: [
          "K. D. Jadhav won wrestling bronze at Helsinki 1952.",
          "Karnam Malleswari won weightlifting bronze at Sydney 2000.",
          "Rajyavardhan Singh Rathore won double trap silver at Athens 2004.",
        ],
        answer: "Jadhav (wrestling, 1952), Malleswari (weightlifting, 2000), Rathore (shooting, 2004).",
      },
      practiceSet: [
        { prompt: "In which sport did K. D. Jadhav win his Olympic bronze?", answer: "Wrestling" },
        { prompt: "Who won India's first Olympic medals, at Paris in 1900?", answer: "Norman Pritchard" },
        { prompt: "In which event did P. T. Usha finish fourth at the 1984 Olympics?", answer: "The 400 m hurdles" },
        { prompt: "In which shooting event did Rajyavardhan Singh Rathore win silver?", answer: "Double trap" },
      ],
      traps: [
        {
          title: "Two different firsts: 1900 and 1952",
          body: "**Norman Pritchard** (1900) won India's first Olympic medals; **K. D. Jadhav** (1952) won independent India's first **individual** medal.",
        },
        {
          title: "Usha's near miss was 1984, not 1980",
          body: "P. T. Usha missed the 400 m hurdles bronze by 0.01 s at **Los Angeles 1984**, not Moscow 1980.",
        },
        {
          title: "Sydney 2000 had no boxing medal",
          body: "India's only medal at **Sydney 2000** was Malleswari's **weightlifting** bronze. India's first Olympic boxing medal came in 2008.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspin-beijing",
      name: "Beijing 2008 and London 2012",
      intuition:
        "Beijing 2008 gave India its first individual gold and its first boxing medal; London 2012 brought six medals. SSC asks who won what, in which event, and the story behind a medal.",
      definition:
        "**Beijing 2008** (three medals):\n" +
        "- **Abhinav Bindra**: **gold**, 10 m air rifle, India's **first individual Olympic gold**.\n" +
        "- **Vijender Singh**: **bronze**, boxing (middleweight), India's **first Olympic boxing medal**. He beat **Carlos Góngora** of Ecuador in the quarter-final. He boxed at three Olympics: 2004, 2008 and 2012.\n" +
        "- **Sushil Kumar**: **bronze**, wrestling. He lost his first bout, then won **three repechage bouts**: India's first wrestling medal since 1952.\n\n" +
        "**London 2012** (six medals), among them:\n" +
        "- **Vijay Kumar**: **silver**, 25 m rapid fire pistol.\n" +
        "- **Gagan Narang**: **bronze**, 10 m air rifle.\n" +
        "- Sushil Kumar silver (wrestling), Saina Nehwal bronze (badminton), Mary Kom bronze (boxing).\n" +
        "- **Geeta Phogat** became the first Indian woman wrestler to compete at an Olympics.",
      table: {
        columns: ["Athlete", "Games", "Medal and event"],
        rows: [
          { cells: ["Abhinav Bindra", "Beijing 2008", "Gold, 10 m air rifle"] },
          { cells: ["Vijender Singh", "Beijing 2008", "Bronze, boxing"] },
          { cells: ["Sushil Kumar", "Beijing 2008", "Bronze, wrestling, through repechage"] },
          { cells: ["Vijay Kumar", "London 2012", "Silver, 25 m rapid fire pistol"] },
          { cells: ["Gagan Narang", "London 2012", "Bronze, 10 m air rifle"] },
          { cells: ["Geeta Phogat", "London 2012", "First Indian woman wrestler at an Olympics"] },
        ],
      },
      pyqExampleId: "a51f0899-8ce6-4a32-973a-1d0552635050",
      selfCheckExample: {
        prompt: "Name India's two shooting medals at London 2012, with each medal's colour and event.",
        steps: [
          "Vijay Kumar won silver in the 25 m rapid fire pistol.",
          "Gagan Narang won bronze in the 10 m air rifle.",
        ],
        answer: "Vijay Kumar, silver, 25 m rapid fire pistol; Gagan Narang, bronze, 10 m air rifle.",
      },
      practiceSet: [
        { prompt: "Who was the first Indian woman wrestler to compete at an Olympics?", answer: "Geeta Phogat" },
        { prompt: "At how many Olympics did Vijender Singh box?", answer: "Three" },
        { prompt: "In which event did Abhinav Bindra win his Olympic gold?", answer: "The 10 m air rifle" },
        { prompt: "Through which round did Sushil Kumar reach his first Olympic bronze after losing his opening bout?", answer: "The repechage" },
      ],
      traps: [
        {
          title: "Bindra and Narang shot the same event",
          body: "Both shot the **10 m air rifle**: **Bindra** won **gold in 2008**, **Narang** **bronze in 2012**. Do not swap their Games.",
        },
        {
          title: "Correa beat Vijender, Góngora lost to him",
          body: "Vijender beat **Carlos Góngora** in the quarter-final to make sure of bronze, then lost the semi-final to **Emilio Correa** of Cuba.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspin-players",
      name: "Players, their sports and their firsts",
      intuition:
        "Most of these questions give a name and ask the sport. The speed move: strike out every option whose famous names you already know. If Pankaj Advani is billiards and Manika Batra is table tennis, the unknown name takes what is left.",
      definition:
        "Learn each name with its sport. For the famous firsts, also learn the event and the year:\n" +
        "- **Milkha Singh**: gold in the 440 yards at the **1958 Cardiff Commonwealth Games**, India's first individual Commonwealth gold.\n" +
        "- **Sachin Nag**: gold in the 100 m freestyle at the **1951 Asian Games** in New Delhi. India also won its first athletics golds at those Games.\n" +
        "- **Anju Bobby George**: long jump bronze at the **2003 World Championships** in Paris, India's first medal at the World Athletics Championships.\n" +
        "- **Mirabai Chanu**: weightlifting **silver at Glasgow 2014**, then gold at the 2018 and 2022 Commonwealth Games, and silver at the Tokyo 2020 Olympics.\n" +
        "- **Shiva Keshavan** brought **luge** to India and competed at six Winter Olympics, 1998 to 2018. **Arif Khan** was the first Indian to qualify for two alpine skiing events at one Winter Olympics, Beijing 2022.",
      table: {
        columns: ["Player", "Sport", "Remember"],
        rows: [
          { cells: ["Neeraj Chopra", "Javelin throw", "Olympic gold, Tokyo 2020"] },
          { cells: ["Pankaj Advani", "Billiards and snooker", "Many world titles"] },
          { cells: ["Manika Batra", "Table tennis", "India's leading woman player"] },
          { cells: ["Dipika Pallikal", "Squash", "First Indian woman in the world top 10"] },
          { cells: ["Nirupama Sanjeev", "Tennis", "Grand Slam main-draw win, 1998"] },
          { cells: ["Rudrankksh Patil", "Shooting", "10 m air rifle world champion, 2022"] },
          { cells: ["Singhraj Adhana", "Para shooting (pistol)", "Two medals at the Tokyo 2020 Paralympics"] },
          { cells: ["Manish Narwal", "Para shooting", "Pistol shooter"] },
          { cells: ["K. Srikanth", "Badminton", "Men's singles player"] },
          { cells: ["Saurabh Chaudhary", "Shooting", "Pistol shooter"] },
        ],
      },
      pyqExampleId: "930cbb89-ef6c-4975-99ea-6355b2429782",
      selfCheckExample: {
        prompt: "Give the sport of each: Pankaj Advani, Manika Batra, Rudrankksh Patil.",
        steps: [
          "Pankaj Advani plays billiards and snooker.",
          "Manika Batra plays table tennis.",
          "Rudrankksh Patil is a rifle shooter.",
        ],
        answer: "Billiards and snooker; table tennis; shooting.",
      },
      practiceSet: [
        { prompt: "Which sport does Dipika Pallikal play?", answer: "Squash" },
        { prompt: "Which winter sport did Shiva Keshavan bring to India?", answer: "Luge" },
        { prompt: "At which Commonwealth Games did Milkha Singh win India's first individual Commonwealth gold?", answer: "Cardiff 1958" },
        { prompt: "Who won India's first medal at the World Athletics Championships, a long jump bronze in 2003?", answer: "Anju Bobby George" },
      ],
      traps: [
        {
          title: "Mirabai's first Commonwealth medal was silver",
          body: "At **Glasgow 2014** Mirabai Chanu won **silver**. Her Commonwealth **golds** came in **2018** and **2022**.",
        },
        {
          title: "Nirupama Sanjeev is tennis, not badminton",
          body: "**Nirupama Sanjeev** (Vaidyanathan) is a **tennis** player. Do not confuse her with badminton names.",
        },
      ],
    },
  ],
};
