import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ROR_PUZZLES_NOTE: SubtopicNote = {
  subtopicName: "Scheduling and Puzzles",
  title: "Scheduling and Puzzles",
  oneLineDefinition:
    "Putting people or events in order from clues: dates a few days apart, who lives on which floor, and puzzles that match each place in the order with a second detail such as a profession.",
  whyItMatters:
    "Twelve questions in the bank, all from the 2025 shifts: six EASY date and time-order questions, five floor puzzles (one of them HARD) and one HARD month-and-profession puzzle. The EASY ones take a line; the puzzles take a minute or more, so the method below is about not wasting that minute on a wrong first guess.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrorpz-dates",
      name: "Dates and order in time, counted from the one fixed day",
      intuition:
        "Date chains give one known date and a string of 'days after' and 'days before'. Put the known date on a number line and walk: after is a step forward, before a step back. Only the net walk matters.",
      definition:
        "- 'X was 3 days **after** Y' means X \\(=\\) Y \\(+ 3\\). 'X was 1 day **before** Y' means X \\(=\\) Y \\(- 1\\).\n" +
        "- Start from the date you know and follow the chain to the one asked. **Fast route:** add the moves first (\\(+3 - 1 = +2\\)), then apply the net move once.\n" +
        "- Days **strictly between** two dates leave out both end days: between the 4th and the 8th are the 5th, 6th and 7th.\n" +
        "- A printed list of dates is a lookup table: write it once in date order, then read off 'two days after X'.\n" +
        "- With three events on three dates, place first the event with the strongest limit ('after' something cannot be first; 'not on the 11th').\n" +
        "- A chronological-order question puts named periods on one time line, earliest first. The three early ages of human history run Stone Age, Bronze Age, Iron Age.",
      authoredExample: {
        prompt:
          "A fair in Agra was held 4 days after the fair in Mathura. The fair in Aligarh was held 2 days before the fair in Agra. If Mathura's fair was on 10th June, when was Aligarh's?",
        steps: [
          "Agra: \\(10 + 4 = 14\\)th June.",
          "Aligarh: \\(14 - 2 = 12\\)th June.",
          "Fast route: the net move from Mathura is \\(+4 - 2 = +2\\), so \\(10 + 2 = 12\\).",
        ],
        answer: "12th June",
      },
      selfCheckExample: {
        prompt:
          "Three talks, on History, Science and Art, are given on 3rd, 5th and 7th May, one a day. The Science talk is before the Art talk. The History talk is not on 3rd May. Which talk is on 3rd May?",
        steps: [
          "History is not on the 3rd, so the 3rd is Science or Art.",
          "Art comes after Science, so Art cannot be first.",
          "So the 3rd is Science.",
        ],
        answer: "Science",
      },
      practiceSet: [
        { prompt: "A meeting was on 20th July, and a second meeting was held 5 days before it. On which date was the second meeting?", answer: "15th July" },
        { prompt: "Event Q is 6 days after event P, and event R is 2 days after event Q. How many days after P is R?", answer: "8 days" },
        { prompt: "Put these in order, earliest first: Iron Age, Stone Age, Bronze Age.", answer: "Stone Age, Bronze Age, Iron Age" },
        {
          prompt: "Talks are held daily from 3rd to 9th March. How many talks fall strictly between the talk on 4th March and the talk on 8th March?",
          answer: "3",
          method: "The 5th, 6th and 7th.",
        },
      ],
      pyqExampleId: "a1db1225-3654-42fc-ac20-20f8e0e02986",
      traps: [
        {
          title: "Adding a 'before' instead of subtracting",
          body:
            "'X was 3 days before Y' means X is 3 days earlier. If you know Y, subtract to get X; if you know X, add to get Y. Writing the clue as an equation first stops the slip.",
        },
        {
          title: "Counting the end days as between",
          body:
            "Between the 4th and the 8th there are 3 days, not 4 or 5. 'Between' leaves out both of the dates it names.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrorpz-floors",
      name: "Floor puzzles: fix the certain floors, then test each case",
      intuition:
        "A floor puzzle is a column of numbered boxes. A few clues pin a person to one box; the rest only say how far apart two people are. Fill the pinned boxes first, then try each place an open pair could take and throw out the ones that break a clue.",
      definition:
        "1. Draw floors 1 (bottom) to the top as a column.\n" +
        "2. Place every absolute clue first: 'Khush lives on the 3rd floor', 'Dia lives on the lowermost floor'.\n" +
        "3. Then the clues tied to someone already placed: 'two floors between E and C' puts E three floors from C.\n" +
        "4. For a pair with no fixed floor ('Sudhir lives two floors above Dipak'), list every place the pair can go and test each against the clues left. Reject a case the moment one clue fails.\n" +
        "5. Words: **n people between** X and Y means they are \\(n + 1\\) floors apart; **just above** means one floor up; in a 7-floor building, more than four people between two people can only mean five, at floors 1 and 7.\n" +
        "6. If two cases survive and give different answers, the answer is 'Cannot be determined'.",
      formula: {
        label: "People between two floors",
        latex: "\\text{between} = |x - y| - 1",
        symbols: [{ symbol: "\\(x, y\\)", meaning: "the two floor numbers" }],
      },
      authoredExample: {
        prompt:
          "Five people P, Q, R, S and T live on floors 1 to 5 of a building, one on each floor, floor 1 at the bottom. R lives on floor 3. One person lives between R and T. P lives just below Q. Q lives above R. S does not live on the top floor. Who lives on floor 2?",
        steps: [
          "Absolute clue: R on 3. One person between R and T puts T on 1 or 5.",
          "Q is above R, so Q is on 4 or 5. Q on 4 would put P on 3, which is R's. So Q is on 5 and P on 4.",
          "Floor 5 is taken, so T is on 1.",
          "Floor 2 is left for S, and it is not the top floor, so the clue holds.",
        ],
        answer: "S",
      },
      selfCheckExample: {
        prompt:
          "Four people A, B, C and D live on floors 1 to 4, one on each floor, floor 1 at the bottom. A lives on floor 4. B and C live on adjacent floors. Who lives on floor 1?",
        steps: [
          "Floors 1, 2 and 3 are left. B and C can be on 1 and 2 (D on 3) or on 2 and 3 (D on 1).",
          "Within each case B and C can also swap. Floor 1 can hold B, C or D.",
        ],
        answer: "Cannot be determined",
      },
      practiceSet: [
        { prompt: "In an 8-floor building, X lives on floor 2 and Y on floor 7. How many floors are between them?", answer: "4" },
        {
          prompt: "In a 7-floor building, M lives on floor 6 and two people live between M and N. On which floor does N live?",
          answer: "Floor 3",
          method: "Three floors from 6 is 3 or 9, and there is no floor 9.",
        },
        {
          prompt: "In a 6-floor building, more than three people live between J and K. Which floors do J and K live on?",
          answer: "Floors 1 and 6",
        },
        { prompt: "P lives just above Q, and Q lives on floor 4. On which floor does P live?", answer: "Floor 5" },
      ],
      pyqExampleId: "c89dbddd-d6b5-4efc-b211-ba3dab0d80ab",
      traps: [
        {
          title: "Reading 'two floors between' as two apart",
          body:
            "If two floors lie between X and Y, they are three floors apart: floor 1 and floor 4, not floor 1 and floor 3.",
        },
        {
          title: "Stopping at the first case that fits",
          body:
            "Test every case an open pair allows. If two survive and give different answers to the question, the answer is 'Cannot be determined', and SSC prints that option for exactly this reason.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrorpz-grid",
      name: "Order puzzles with a second detail: one grid for both",
      intuition:
        "When each person also has a profession, a colour or a city, two puzzles are folded into one. Keep them on one table, a row for each place in the order, and every clue becomes a tick in a cell or a link between two rows.",
      definition:
        "1. Draw a grid: one row for each position in the order (a month, a day, a floor), with columns for the person and the second detail.\n" +
        "2. Number only the positions given, in order. If the months are January, March, April and May, March is position 2 and April is 'just after' March.\n" +
        "3. Place facts with a fixed position first ('the boxer is in March'), then chains joined to them ('the dentist is just before the boxer').\n" +
        "4. Use the 'not' clues last, to choose between the cases that remain.\n" +
        "5. Read every answer off the finished grid; one grid answers the whole set.\n" +
        "6. A month fact SSC uses: April, June, September and November have 30 days; February has 28 or 29; the other seven months have 31.",
      authoredExample: {
        prompt:
          "Four people K, L, M and N have meetings on Monday, Tuesday, Wednesday and Thursday of one week, one a day. Each is a teacher, doctor, pilot or chef, one each. The doctor meets on Tuesday. The chef meets just after the doctor. K meets on Monday and is not the pilot. N is the pilot. L meets after M. Who is the teacher, and on which day does L meet?",
        steps: [
          "Fixed: doctor on Tuesday, so the chef is on Wednesday. K is on Monday.",
          "Monday and Thursday hold the teacher and the pilot. K is not the pilot, so K is the teacher and the pilot, N, is on Thursday.",
          "L and M take Tuesday and Wednesday. L meets after M, so M is the doctor on Tuesday and L the chef on Wednesday.",
        ],
        answer: "K is the teacher; L meets on Wednesday.",
      },
      selfCheckExample: {
        prompt:
          "Three runners P, Q and R finish first, second and third, and each wears red, blue or green, one colour each. The runner in blue finishes just before the runner in green. P finishes last. Q wears red. Who wears green?",
        steps: [
          "Blue and green are in places 1 and 2, or 2 and 3.",
          "If they are in 1 and 2, red is third, but P is third and Q wears red. So blue is second and green third.",
          "P finishes third, so P wears green.",
        ],
        answer: "P",
      },
      practiceSet: [
        { prompt: "Which of these months have 30 days: April, May, June, July?", answer: "April and June" },
        {
          prompt: "Seminars are held only in January, March, April and May. In this list, which month comes just after March?",
          answer: "April",
        },
        {
          prompt: "Six events run on days 1 to 6. The singer is on day 4, and two days lie between the singer and the dancer. On which day is the dancer?",
          answer: "Day 1",
          method: "Three days from day 4 is day 1 or day 7, and there is no day 7.",
        },
      ],
      pyqExampleId: "7136199c-bc85-41e4-8204-96f4cb0c8731",
      traps: [
        {
          title: "Numbering the calendar instead of the list",
          body:
            "When only some months are used, 'just after March' means the next month in the list. If the list skips April, the month just after March may be May.",
        },
        {
          title: "Dropping a 'not' clue",
          body:
            "Clues such as 'Q and S are not police officers' are often the only way to choose between two cases. Tick each clue as you use it, and check every unticked one before you answer.",
        },
      ],
    },
  ],
};
