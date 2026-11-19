import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_OLYMPICS_NOTE: SubtopicNote = {
  subtopicName: "Olympic, Paralympic and Asian Games",
  title: "Olympic, Paralympic and Asian Games",
  oneLineDefinition:
    "When the Olympic movement began, how often the Games come round, where they and the Paralympics were held, and which countries have hosted the Asian Games.",
  whyItMatters:
    "Thirteen questions in the bank, nine of them from the 2023 shifts. Ten of them ask a single year, city or country, so a short list of founding years and hosts answers most of the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsspol-origins",
      name: "How the modern Olympics began",
      intuition:
        "The modern Olympics are a French idea revived in Greece. A committee came first, the first Games two years later, and the Winter Games almost thirty years after that. SSC asks these years and the flag.",
      definition:
        "The facts:\n" +
        "- **Pierre de Coubertin** founded the **International Olympic Committee (IOC)** in **Paris in 1894**.\n" +
        "- The first modern Games were held in **Athens in 1896**; the second in **Paris in 1900**.\n" +
        "- The first **Winter Olympics** were held at **Chamonix, France, in 1924**.\n" +
        "- The Games come round **every four years**; the four-year span is called an **Olympiad**.\n" +
        "- The **Olympic flag** has **five interlocking rings** (blue, yellow, black, green, red) on white, for the five inhabited continents.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["IOC founded", "1894, Paris, by Pierre de Coubertin"] },
          { cells: ["First modern Summer Games", "1896, Athens"] },
          { cells: ["Second Summer Games", "1900, Paris"] },
          { cells: ["First Winter Games", "1924, Chamonix (France)"] },
          { cells: ["Gap between Games", "Four years (an Olympiad)"] },
          { cells: ["Rings on the flag", "Five, for five continents"] },
        ],
      },
      pyqExampleId: "4cdd2c23-3af1-4fc8-9da2-9d507fa41c7d",
      selfCheckExample: {
        prompt: "Put these in order: the first Winter Olympics, the first modern Summer Olympics, the second Summer Olympics.",
        steps: [
          "The first modern Summer Games were at Athens in 1896.",
          "The second Summer Games were at Paris in 1900.",
          "The first Winter Games came much later, at Chamonix in 1924.",
        ],
        answer: "Athens 1896, Paris 1900, Chamonix 1924.",
      },
      practiceSet: [
        { prompt: "In which city were the first modern Olympic Games held?", answer: "Athens" },
        { prompt: "Where were the first Winter Olympics held?", answer: "Chamonix, France" },
        { prompt: "What is the four-year span between two Olympic Games called?", answer: "An Olympiad" },
        { prompt: "Who founded the International Olympic Committee?", answer: "Pierre de Coubertin" },
      ],
      traps: [
        {
          title: "1894 is the committee, 1896 the Games",
          body: "The **IOC** was founded in **1894**; the first modern **Games** followed in **1896**. An option of 1894 for the first Games, or 1896 for the IOC, swaps them.",
        },
        {
          title: "The Winter Games did not start with the Summer Games",
          body: "The Winter Olympics began only in **1924**, at Chamonix, not in 1896.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspol-hosts",
      name: "Host cities, the Paralympics and sports that came back",
      intuition:
        "Most host questions ask one city for one year. Learn the Summer Games from 1992 on as a list, the first two Paralympics, and the fact that India has hosted neither the Olympics nor the Paralympics.",
      definition:
        "**Summer Olympic hosts**: Barcelona 1992, Atlanta 1996, Sydney 2000, Athens 2004, Beijing 2008, London 2012, Rio de Janeiro 2016, **Tokyo 2020** (held in 2021 because of the pandemic), Paris 2024, Los Angeles 2028.\n\n" +
        "**Paralympics**:\n" +
        "- The first Paralympic Games were held in **Rome in 1960**, just after the Rome Olympics; the second in Tokyo in 1964.\n" +
        "- **India has never hosted** the Olympics or the Paralympics. Israel (1968), Japan and South Korea have hosted the Paralympics.\n\n" +
        "**Sports on and off the programme**:\n" +
        "- **Kho-kho**, with kabaddi and mallakhamb, was shown as a **demonstration** at the **1936 Berlin** Olympics by a team from Maharashtra.\n" +
        "- **Golf** came back at **Rio 2016** after more than a century (last held in 1904); India entered golf for the first time there.",
      table: {
        columns: ["Games", "Host city"],
        rows: [
          { cells: ["2000 Summer", "Sydney"] },
          { cells: ["2004 Summer", "Athens"] },
          { cells: ["2008 Summer", "Beijing"] },
          { cells: ["2012 Summer", "London"] },
          { cells: ["2016 Summer", "Rio de Janeiro"] },
          { cells: ["2020 Summer (held 2021)", "Tokyo"] },
          { cells: ["2024 Summer", "Paris"] },
          { cells: ["First Paralympics, 1960", "Rome"] },
          { cells: ["Second Paralympics, 1964", "Tokyo"] },
        ],
      },
      pyqExampleId: "948d3a72-2ea6-43f1-b4f2-d92745c8fa63",
      selfCheckExample: {
        prompt: "Which Olympics was held a year late, and why?",
        steps: [
          "The Games planned for 2020 went to Tokyo.",
          "The pandemic pushed them to July and August 2021, but they kept the name Tokyo 2020.",
        ],
        answer: "Tokyo 2020, held in 2021 because of the pandemic.",
      },
      practiceSet: [
        { prompt: "In which year were the first Paralympic Games held?", answer: "1960" },
        { prompt: "Which city hosted the 2012 Summer Olympics?", answer: "London" },
        { prompt: "At which Olympics was kho-kho shown as a demonstration sport?", answer: "1936 Berlin" },
        { prompt: "Which city hosted the Summer Olympics in 2008?", answer: "Beijing" },
      ],
      traps: [
        {
          title: "Tokyo hosted the second Paralympics, not the first",
          body: "The first Paralympics were in **Rome (1960)**. Tokyo hosted the **second**, in 1964, and again in 2020.",
        },
        {
          title: "India has hosted the Asian Games, not the Olympics",
          body: "India hosted the **Asian Games** twice but has never hosted the **Olympics or the Paralympics**. In a \"never hosted\" question, India is the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspol-asian",
      name: "Asian Games hosts",
      intuition:
        "The Asian Games began in New Delhi, and India hosted them a second time in 1982, the Games that left Delhi its big stadiums. Most other questions ask which country hosted most often.",
      definition:
        "The facts:\n" +
        "- The **first Asian Games** were held in **New Delhi in 1951**; India hosted again in **1982** (the ninth Games), also in New Delhi.\n" +
        "- **South Korea** has hosted **three** times: Seoul 1986, Busan 2002, Incheon 2014.\n" +
        "- **Thailand** has hosted four times, all in Bangkok (1966, 1970, 1978, 1998).\n" +
        "- Manila hosted the second Games, in 1954.",
      table: {
        columns: ["Country", "Asian Games hosted"],
        rows: [
          { cells: ["India", "1951 and 1982, both New Delhi"] },
          { cells: ["South Korea", "1986 Seoul, 2002 Busan, 2014 Incheon"] },
          { cells: ["Thailand", "1966, 1970, 1978, 1998, all Bangkok"] },
          { cells: ["Philippines", "1954 Manila"] },
        ],
      },
      pyqExampleId: "fb76b20f-ac01-4334-8e4f-f9488acd45de",
      selfCheckExample: {
        prompt: "Name the three South Korean cities that have hosted the Asian Games.",
        steps: ["Seoul hosted in 1986.", "Busan followed in 2002 and Incheon in 2014."],
        answer: "Seoul, Busan and Incheon.",
      },
      practiceSet: [
        { prompt: "How many times has Thailand hosted the Asian Games?", answer: "Four" },
        { prompt: "Which country has hosted the Asian Games three times, in Seoul, Busan and Incheon?", answer: "South Korea" },
        { prompt: "In which city were all of Thailand's Asian Games held?", answer: "Bangkok" },
        { prompt: "Which city hosted the second Asian Games, in 1954?", answer: "Manila" },
      ],
      traps: [
        {
          title: "1982 is the Asian Games year, not 1986",
          body: "India's second Asian Games were in **1982**. **1986** was Seoul. An option pairing 1951 with 1986 mixes India with South Korea.",
        },
      ],
    },
  ],
};
