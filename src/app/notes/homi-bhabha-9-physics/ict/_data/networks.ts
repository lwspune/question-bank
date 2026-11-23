import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_IC_NETWORKS_NOTE: SubtopicNote = {
  subtopicName: "Software, Networks and Satellites",
  title: "Software, Networks and Satellites",
  oneLineDefinition:
    "Unicode gives every character of every language a code, a spreadsheet formula always starts with =, networks grow from PAN to LAN, MAN and WAN, and India's satellites each have a job: INSAT and GSAT for communication, EDUSAT for education, IRS for natural resources.",
  whyItMatters:
    "Six questions in the bank, one EASY and five MODERATE. Two ask which data-entry step is wrong in a spreadsheet (the same question in 2017 and 2021: the = sign goes at the start), one asks what Unicode is, one asks for the smallest network, and two ask what India's satellites are for.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9icnw-software",
      name: "Unicode and spreadsheets",
      intuition:
        "A computer stores only numbers, so every letter must have a code number. Old codes covered only English letters. Unicode gives a code to every character of every script, so a Marathi or Hindi message looks the same on any phone. A spreadsheet is a big table that can do sums for you, but it needs a signal that you are typing a formula and not just text: that signal is the = sign at the very start.",
      definition:
        "- **Unicode** is a **multilingual text encoding system**: it gives every character of every language, such as Devanagari, its own code number, so text can be stored and shown on any computer.\n" +
        "- A **spreadsheet** (such as MS Excel or LibreOffice Calc) is a grid of **rows** (numbered 1, 2, 3) and **columns** (lettered A, B, C). Each box is a **cell**, named by column and row, such as **B3**.\n" +
        "- A **formula** must **begin with =**, for example =A1+A2 or =SUM(A1:A5).\n" +
        "- Good data entry: keep the data in **table form**, avoid **special characters** and **unwanted spaces**, and do the **formatting after** the data is entered.",
      table: {
        columns: ["Term", "What it means"],
        rows: [
          { cells: ["Unicode", "A code number for every character of every language"] },
          { cells: ["Cell", "The box where a row meets a column, named like B3"] },
          { cells: ["Formula", "A calculation typed into a cell, always starting with ="] },
          { cells: ["=SUM(A1:A5)", "Adds the numbers in cells A1 to A5"] },
          { cells: ["Formatting", "Changing how data looks (bold, colour, borders), done after entry"] },
        ],
        caption: "Unicode is not Aadhaar and not a plain 0 and 1 code: it is a code for letters of all languages.",
      },
      selfCheckExample: {
        prompt: "A student types SUM(B2:B6)= into a spreadsheet cell, hoping to get a total. What is wrong, and what should be typed?",
        steps: ["A spreadsheet treats an entry as a formula only if it begins with =.", "The = sign must come first, not last."],
        answer: "The = is at the end; type =SUM(B2:B6)",
      },
      practiceSet: [
        { prompt: "What is Unicode?", answer: "A multilingual text encoding system that gives every character of every language its own code number" },
        { prompt: "How are the columns of a spreadsheet named?", answer: "With letters: A, B, C and so on" },
        { prompt: "Write a spreadsheet formula that adds the numbers in cells A1 to A4.", answer: "=SUM(A1:A4), or =A1+A2+A3+A4" },
        { prompt: "What is the name of the cell in column C and row 7?", answer: "C7" },
      ],
      pyqExampleId: "25fce0a2-1848-4a61-a969-d0e74bfee51c",
      traps: [
        {
          title: "Putting the = sign at the end of a formula",
          body: "A spreadsheet formula must start with =. Typed at the end, the entry is treated as plain text and nothing is calculated.",
        },
        {
          title: "Calling Unicode a binary code or the Aadhaar number",
          body: "Unicode is a code for the letters of all languages. Every computer code is stored as 0s and 1s, and the Aadhaar (UID) number is something else entirely.",
        },
        {
          title: "Formatting before the data is in",
          body: "Enter the data first in a clean table, then format it. Formatting first is not the recommended step.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9icnw-networks",
      name: "Networks by size",
      intuition:
        "Link your phone to wireless earphones and you have made a tiny network around yourself. Join the computers in a school lab and the network fills a building. Join offices across a city and it spreads further, and the internet joins networks all over the world. The four names simply grow with the area covered.",
      definition:
        "- A **network** is two or more devices linked to share data.\n" +
        "- **PAN** (Personal Area Network): devices around **one person**, within a few metres, such as a phone and Bluetooth earphones. The **smallest**.\n" +
        "- **LAN** (Local Area Network): a **room, building or campus**, such as a school computer lab.\n" +
        "- **MAN** (Metropolitan Area Network): a **city**.\n" +
        "- **WAN** (Wide Area Network): **countries and the world**. The **internet** is the largest WAN.",
      table: {
        columns: ["Network", "Full form", "Area covered", "Example"],
        rows: [
          { cells: ["PAN", "Personal Area Network", "A few metres around one person", "Phone and Bluetooth earphones"] },
          { cells: ["LAN", "Local Area Network", "A room, building or campus", "A school computer lab"] },
          { cells: ["MAN", "Metropolitan Area Network", "A city", "Cable TV network of a city"] },
          { cells: ["WAN", "Wide Area Network", "Countries and the world", "The internet"] },
        ],
        caption: "Smallest to largest: PAN, LAN, MAN, WAN.",
      },
      selfCheckExample: {
        prompt: "The thirty computers in a school's computer lab are linked so they can share one printer. What kind of network is this?",
        steps: ["The network covers one room of one building."],
        answer: "A LAN (Local Area Network)",
      },
      practiceSet: [
        { prompt: "Which kind of network covers a whole city?", answer: "A MAN (Metropolitan Area Network)" },
        { prompt: "What kind of network is the internet?", answer: "A WAN, the largest one" },
        { prompt: "A phone is linked by Bluetooth to a smartwatch on the same person. What kind of network is this?", answer: "A PAN (Personal Area Network)" },
        { prompt: "What does LAN stand for?", answer: "Local Area Network" },
      ],
      pyqExampleId: "a8d819cd-030e-4084-9510-865dea89811f",
      traps: [
        {
          title: "Calling a LAN the smallest network",
          body: "A LAN covers a building. A PAN, around one person, is smaller still.",
        },
        {
          title: "Mixing up MAN and WAN",
          body: "M is for metropolitan, a city. W is for wide: countries and the whole world.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9icnw-satellites",
      name: "Indian satellites and their uses",
      intuition:
        "India sends up satellites for different jobs, and the name usually tells you the job. Communication satellites hang over one spot above the equator and relay phone calls, TV and weather pictures. Remote sensing satellites circle much lower and photograph the land, so we can watch forests, crops and water.",
      definition:
        "- **INSAT** (Indian National Satellite System) and **GSAT**: **communication** satellites in geostationary orbit, about 36000 km above the equator. They support **telecommunication**, **television and broadcasting**, **weather (meteorological) services** and **education**.\n" +
        "- **EDUSAT** (a GSAT satellite): built for **education**, distance learning in classrooms.\n" +
        "- **IRS** (Indian Remote Sensing) satellites: **monitoring and management of natural resources**: forests, water, crops, soil and mapping.\n" +
        "- **NavIC** gives **navigation**, finding positions, like GPS.\n" +
        "- A **geostationary** satellite goes round the Earth once in **24 hours**, the same time the Earth takes to turn, so it seems to stay over one place.",
      table: {
        columns: ["Satellite series", "Main job"],
        rows: [
          { cells: ["INSAT", "Telecommunication, TV broadcasting and weather services"] },
          { cells: ["GSAT", "Telecommunication, broadcasting and education"] },
          { cells: ["EDUSAT", "Education"] },
          { cells: ["IRS", "Remote sensing: monitoring and management of natural resources"] },
          { cells: ["NavIC", "Navigation"] },
        ],
        caption: "Natural resources belong to IRS; communication, TV, weather and education belong to INSAT and GSAT.",
      },
      selfCheckExample: {
        prompt: "The forest department wants pictures from space to see how much forest was lost in a year. Which Indian satellite series gives them?",
        steps: ["Watching forests is monitoring a natural resource.", "That is the work of remote sensing satellites."],
        answer: "The IRS (Indian Remote Sensing) series",
      },
      practiceSet: [
        { prompt: "What does IRS stand for?", answer: "Indian Remote Sensing" },
        { prompt: "For which service was EDUSAT launched?", answer: "Education" },
        { prompt: "How long does a geostationary satellite take to go once round the Earth?", answer: "24 hours" },
        { prompt: "Which Indian satellite system is used for navigation?", answer: "NavIC" },
      ],
      pyqExampleId: "16b92f79-1e52-41a3-9c5d-4acf5d90b7c0",
      traps: [
        {
          title: "Giving INSAT the job of watching natural resources",
          body: "INSAT and GSAT are communication satellites. Forests, water and crops are watched by the IRS remote sensing satellites.",
        },
        {
          title: "Thinking a geostationary satellite stands still",
          body: "It moves fast, but it goes round once in 24 hours, as the Earth turns, so it stays above the same place.",
        },
      ],
    },
  ],
};
