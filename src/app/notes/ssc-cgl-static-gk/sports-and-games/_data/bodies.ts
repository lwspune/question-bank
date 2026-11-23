import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_BODIES_NOTE: SubtopicNote = {
  subtopicName: "Indian Sports Bodies, Trophies and Awards",
  title: "Indian Sports Bodies, Trophies and Awards",
  oneLineDefinition:
    "When India's sports bodies were set up and where they sit, which domestic trophy belongs to which sport, the sporting traditions of the states, and the national sports awards.",
  whyItMatters:
    "Twenty-five questions in the bank, eight of them the year a sports body was founded, with four close years as the options. Learn the bodies as one timeline, so that 1925, 1927 and 1928 stay apart.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsspbd-bodies",
      name: "Sports bodies in the order they were set up",
      intuition:
        "Read the bodies as a timeline: hockey and the Olympic association before Independence, athletics just before it, the coaching institute in 1961, SAI after the 1982 Asian Games, the anti-doping agency in 2005 and the sports university in 2018.",
      definition:
        "The timeline:\n" +
        "- **1925**: the **Indian Hockey Federation**.\n" +
        "- **1927**: the **Indian Olympic Association (IOA)**, with **Sir Dorabji Tata** as its first president and **A. G. Noehren** as secretary.\n" +
        "- **1928**: the **BCCI**, headquartered in **Mumbai** (at the Wankhede Stadium).\n" +
        "- **1946**: the **Amateur Athletics Federation of India**, now the Athletics Federation of India.\n" +
        "- **1961**: the **National Institute of Sports** at **Patiala**, in a former palace of the Maharaja of Patiala. Renamed the **Netaji Subhas National Institute of Sports** on **23 January 1973**, Netaji's birth anniversary.\n" +
        "- **1984**: the **Sports Authority of India (SAI)**, built on the facilities made for the **1982** Asian Games.\n" +
        "- **2005**: the **National Anti-Doping Agency (NADA)**, registered as a society; it began working fully in 2009.\n" +
        "- **2018**: the **National Sports University**, at **Imphal, Manipur**, set up by an Act of that year.",
      table: {
        columns: ["Body", "Set up", "Remember"],
        rows: [
          { cells: ["Indian Hockey Federation", "1925", "Before India's first Olympic hockey"] },
          { cells: ["Indian Olympic Association", "1927", "First president Sir Dorabji Tata"] },
          { cells: ["BCCI", "1928", "Headquarters in Mumbai"] },
          { cells: ["Amateur Athletics Federation of India", "1946", "Now the Athletics Federation of India"] },
          { cells: ["National Institute of Sports", "1961", "Patiala; Netaji's name added in 1973"] },
          { cells: ["Sports Authority of India", "1984", "Followed the 1982 Asian Games"] },
          { cells: ["National Anti-Doping Agency", "2005", "Fully working from 2009"] },
          { cells: ["National Sports University", "2018", "Imphal, Manipur"] },
        ],
      },
      pyqExampleId: "6e4c7f35-1070-4aa4-9993-1ecd0bfd2b71",
      selfCheckExample: {
        prompt: "Put these in the order they were set up: the National Anti-Doping Agency, the Indian Hockey Federation, the Amateur Athletics Federation of India.",
        steps: [
          "The Indian Hockey Federation came first, in 1925.",
          "The Amateur Athletics Federation of India followed in 1946.",
          "NADA came last, in 2005.",
        ],
        answer: "Hockey Federation (1925), Athletics Federation (1946), NADA (2005).",
      },
      practiceSet: [
        { prompt: "In which city is the BCCI headquartered?", answer: "Mumbai" },
        { prompt: "In which state is the National Sports University?", answer: "Manipur (Imphal)" },
        { prompt: "In which year was the Sports Authority of India set up?", answer: "1984" },
        { prompt: "In which city is the Netaji Subhas National Institute of Sports?", answer: "Patiala" },
      ],
      traps: [
        {
          title: "SAI is 1984, the Asian Games 1982",
          body: "The **Sports Authority of India** was set up in **1984**. **1982** is the year of the Delhi **Asian Games** whose facilities it took over.",
        },
        {
          title: "NADA was formed in 2005, not 2009",
          body: "**NADA** was registered in **2005**. **2009** is when it began working fully, the trap option.",
        },
        {
          title: "The sports institute is in Patiala, not Pune",
          body: "The **National Institute of Sports** is at **Patiala**, Punjab.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspbd-trophies",
      name: "Football and cricket trophies",
      intuition:
        "Most domestic trophies are football or cricket. The cricket ones are named after cricketers (Ranji, Duleep, Deodhar); the old football cups are named after British officials, a maharaja or an air marshal.",
      definition:
        "**Football**:\n" +
        "- **Durand Cup**: started in **1888** at **Shimla**, named after **Sir Mortimer Durand**; Asia's oldest football tournament.\n" +
        "- **Rovers Cup**: started in **1891** in **Mumbai**.\n" +
        "- **Santosh Trophy**: the national championship for states, from **1941**, named after **Maharaja Sir Manmatha Nath Roy Chowdhury of Santosh**.\n" +
        "- **Subroto Cup**: the **inter-school** tournament, held in **New Delhi** every year and named after **Air Marshal Subroto Mukerjee**, the first Indian chief of the Air Force.\n\n" +
        "**Cricket**:\n" +
        "- **Ranji Trophy** (after K. S. Ranjitsinhji), **Duleep Trophy** (after K. S. Duleepsinhji) and **Deodhar Trophy** (after D. B. Deodhar) are domestic cricket competitions.",
      table: {
        columns: ["Trophy", "Sport", "Remember"],
        rows: [
          { cells: ["Durand Cup", "Football", "1888, Shimla; Sir Mortimer Durand"] },
          { cells: ["Rovers Cup", "Football", "1891, Mumbai"] },
          { cells: ["Santosh Trophy", "Football", "1941; national championship for states"] },
          { cells: ["Subroto Cup", "Football", "Inter-school, New Delhi"] },
          { cells: ["Ranji Trophy", "Cricket", "Named after K. S. Ranjitsinhji"] },
          { cells: ["Duleep Trophy", "Cricket", "Named after K. S. Duleepsinhji"] },
          { cells: ["Deodhar Trophy", "Cricket", "Named after D. B. Deodhar"] },
        ],
      },
      pyqExampleId: "708d6df9-1064-4eab-9218-4fc52f890817",
      selfCheckExample: {
        prompt: "Which of these is not a cricket trophy: Ranji Trophy, Rovers Cup, Deodhar Trophy?",
        steps: [
          "Ranji and Deodhar are named after cricketers and are domestic cricket competitions.",
          "The Rovers Cup is a Mumbai football tournament.",
        ],
        answer: "The Rovers Cup.",
      },
      practiceSet: [
        { prompt: "In which hill town was the Durand Cup started?", answer: "Shimla" },
        { prompt: "Which football tournament is played between schools in New Delhi every year?", answer: "The Subroto Cup" },
        { prompt: "In which city was the Rovers Cup played?", answer: "Mumbai" },
        { prompt: "After which cricketer is the Duleep Trophy named?", answer: "K. S. Duleepsinhji" },
      ],
      traps: [
        {
          title: "Durand is football, not cricket",
          body: "The **Durand Cup** is a **football** tournament. In a list with the Ranji, Duleep and Deodhar Trophies, it is the odd one out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspbd-events",
      name: "The National Games and the states' sporting traditions",
      intuition:
        "These questions name an event and ask the state. Go region first: a snake-boat race belongs to the Kerala backwaters, an archery contest in the Khasi hills to Meghalaya, and a colonial-era club to an old British city.",
      definition:
        "The facts:\n" +
        "- **National Games**: the **35th** were held in **Kerala in 2015**; the 36th in Gujarat (2022), the 37th in Goa (2023), the 38th in Uttarakhand (2025). The best state wins the **Raja Bhalindra Singh Trophy**.\n" +
        "- **Nehru Trophy Boat Race**: a **snake boat** race every August on **Punnamada Lake near Alappuzha, Kerala**, named after Jawaharlal Nehru, who watched it in 1952.\n" +
        "- **Teer**: the traditional **archery** contest of **Meghalaya**, held mainly in **Shillong**.\n" +
        "- **Royal Calcutta Golf Club**: founded in **1829** in **Kolkata**, India's first golf club.\n" +
        "- **Mumbai Marathon**: held every January since **2004**; Asia's largest marathon by number of runners.",
      table: {
        columns: ["Event or club", "Place", "Remember"],
        rows: [
          { cells: ["35th National Games", "Kerala", "2015"] },
          { cells: ["Raja Bhalindra Singh Trophy", "National Games", "Goes to the best state"] },
          { cells: ["Nehru Trophy Boat Race", "Alappuzha, Kerala", "Snake boats, Punnamada Lake"] },
          { cells: ["Teer", "Meghalaya", "Archery, mainly in Shillong"] },
          { cells: ["Royal Calcutta Golf Club", "Kolkata", "1829, India's first golf club"] },
          { cells: ["Mumbai Marathon", "Mumbai", "Asia's largest marathon"] },
        ],
      },
      pyqExampleId: "433877a4-d833-4e3a-b07d-ed1134fae7e8",
      selfCheckExample: {
        prompt: "In which state is the Nehru Trophy Boat Race rowed, and on which lake?",
        steps: [
          "A snake-boat race points to the backwaters of Kerala.",
          "It is rowed on Punnamada Lake near Alappuzha.",
        ],
        answer: "Kerala, on Punnamada Lake near Alappuzha.",
      },
      practiceSet: [
        { prompt: "Which trophy goes to the best state at the National Games?", answer: "The Raja Bhalindra Singh Trophy" },
        { prompt: "In which city was India's first golf club founded?", answer: "Kolkata" },
        { prompt: "Which state hosted the 35th National Games in 2015?", answer: "Kerala" },
        { prompt: "Which Indian marathon is the largest in Asia?", answer: "The Mumbai Marathon" },
      ],
      traps: [
        {
          title: "The Bhalindra Singh Trophy is not a Khelo India prize",
          body: "The **Raja Bhalindra Singh Trophy** belongs to the **National Games**, not to any Khelo India Games.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspbd-awards",
      name: "National sports awards",
      intuition:
        "Three awards cover most questions: the Khel Ratna for the year's best sportsperson, the Arjuna Award for outstanding sportspersons, and the Dronacharya Award for coaches.",
      definition:
        "The facts:\n" +
        "- **Major Dhyan Chand Khel Ratna**: India's highest sports honour, first given in **1991-92** (to Viswanathan Anand). Until **6 August 2021** it was the Rajiv Gandhi Khel Ratna.\n" +
        "- **Arjuna Award**: for outstanding sportspersons, given since **1961**.\n" +
        "- **Dronacharya Award**: for **coaches**, started in **1985**; it carries a **bronze statuette** of Dronacharya. Athletics coach **O. M. Nambiar**, P. T. Usha's coach, was among its first winners.\n" +
        "- **National Sports Day** is **29 August**, Dhyan Chand's birthday.",
      table: {
        columns: ["Award", "For", "Started"],
        rows: [
          { cells: ["Major Dhyan Chand Khel Ratna", "Best sportsperson, highest honour", "1991-92"] },
          { cells: ["Arjuna Award", "Outstanding sportspersons", "1961"] },
          { cells: ["Dronacharya Award", "Coaches", "1985"] },
        ],
      },
      pyqExampleId: "e0c16c88-8dd2-423a-95ba-7dc91d75a574",
      selfCheckExample: {
        prompt: "Which national award goes to coaches, and in which year was it started?",
        steps: ["The coaches' award is named after Dronacharya, the teacher of the Pandavas.", "It was started in 1985."],
        answer: "The Dronacharya Award, 1985.",
      },
      practiceSet: [
        { prompt: "On whose birthday is National Sports Day observed?", answer: "Dhyan Chand's (29 August)" },
        { prompt: "In which year was the Arjuna Award started?", answer: "1961" },
        { prompt: "Who was the first winner of the Khel Ratna?", answer: "Viswanathan Anand" },
        { prompt: "Which coach of P. T. Usha was among the first Dronacharya Award winners?", answer: "O. M. Nambiar" },
      ],
      traps: [
        {
          title: "The Dronacharya statuette is bronze",
          body: "The **Dronacharya Award** carries a **bronze** statuette of Dronacharya, not a gold one.",
        },
      ],
    },
  ],
};
