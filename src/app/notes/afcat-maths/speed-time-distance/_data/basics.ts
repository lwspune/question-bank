import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Speed, Distance, Units and Journeys in Parts",
  title: "The Basic Formula, Units and Journeys in Parts",
  oneLineDefinition:
    "Speed as distance over time, changing km/h into m/s, and journeys split into parts: going and coming back, two speeds on one trip, and rests on the way.",
  whyItMatters:
    "Every question asks for one of speed, distance and time from the other two, usually after a change of units. Marks go on minutes written as decimals and on km/h divided into metres. AFCAT set one question here in 2015 and one in 2019.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-formula-units",
      name: "Speed, distance, time and their units",
      intuition:
        "Speed is distance covered per unit of time. Know any two of speed, distance and time and the third follows. Most slips are in the units: a train's speed is given in km/h while its length is in metres.",
      definition:
        "- \\(\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}}\\), so \\(\\text{distance} = \\text{speed} \\times \\text{time}\\) and \\(\\text{time} = \\dfrac{\\text{distance}}{\\text{speed}}\\).\n" +
        "- **km/h to m/s:** multiply by \\(\\tfrac{5}{18}\\), because 1 km/h is 1,000 m in 3,600 s. **m/s to km/h:** multiply by \\(\\tfrac{18}{5}\\).\n" +
        "- Minutes to hours: divide by 60. So 2 h 15 min is 2.25 h.\n" +
        "- Two people walking off at right angles: the distance between them is the hypotenuse, \\(\\sqrt{a^2 + b^2}\\), of the distances each has gone.",
      formula: {
        label: "Speed and the unit change",
        latex: "\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}}, \\qquad 1 \\text{ km/h} = \\tfrac{5}{18} \\text{ m/s}",
      },
      authoredExample: {
        prompt: "A cyclist rides at 18 km/h for 2 h 40 min. How far does he go, and what is his speed in m/s?",
        steps: [
          "2 h 40 min is \\(2\\tfrac{40}{60} = \\tfrac{8}{3}\\) h.",
          "Distance \\(= 18 \\times \\tfrac{8}{3} = 48\\) km.",
          "In m/s: \\(18 \\times \\tfrac{5}{18} = 5\\) m/s.",
        ],
        answer: "48 km; 5 m/s.",
      },
      selfCheckExample: {
        prompt: "A car covers 210 km at 42 km/h. A bus covers the same road at 35 km/h. How much longer does the bus take?",
        steps: [
          "The car takes \\(210 \\div 42 = 5\\) h.",
          "The bus takes \\(210 \\div 35 = 6\\) h.",
        ],
        answer: "1 hour longer.",
      },
      practiceSet: [
        { prompt: "Write 72 km/h in m/s.", answer: "20 m/s" },
        { prompt: "Write 15 m/s in km/h.", answer: "54 km/h" },
        { prompt: "A man walks 9 km in 1 h 30 min. Find his speed.", answer: "6 km/h" },
        {
          prompt: "Two cars leave a crossing at right angles at 60 m/s and 80 m/s. How far apart are they after 5 s?",
          answer: "500 m",
          method: "\\(\\sqrt{300^2 + 400^2}\\).",
        },
      ],
      pyqExampleId: "5f256474-e2df-4786-a91f-080223a6869f",
      traps: [
        {
          title: "Change the units before you divide",
          body: "A 150 m train at 54 km/h: \\(150 \\div 54\\) means nothing. Write 54 km/h as 15 m/s first, and the train passes a pole in 10 s.",
        },
        {
          title: "Minutes are not decimal places",
          body: "2 h 45 min is 2.75 h, not 2.45 h. Divide the minutes by 60.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-round-trip-distance",
      name: "Going and coming back at two speeds",
      intuition:
        "The road is the same length both ways. Call it \\(d\\), add the time out to the time back, and set the sum equal to the total time given.",
      definition:
        "- Out at \\(a\\) and back at \\(b\\) in a total time \\(T\\): \\(\\dfrac{d}{a} + \\dfrac{d}{b} = T\\), so \\(d = \\dfrac{abT}{a + b}\\).\n" +
        "- Change the total time to hours first: 3 h 45 min is 3.75 h.\n" +
        "- The same equation covers riding out and walking back, or going up a hill and coming down.",
      formula: {
        label: "Distance from a round trip",
        latex: "\\dfrac{d}{a} + \\dfrac{d}{b} = T \\;\\Rightarrow\\; d = \\dfrac{abT}{a + b}",
      },
      authoredExample: {
        prompt: "A man rides to a town at 15 km/h and walks back at 5 km/h. The round trip takes 8 h. How far away is the town?",
        steps: [
          "\\(\\dfrac{d}{15} + \\dfrac{d}{5} = 8\\), and \\(\\dfrac{d}{15} + \\dfrac{3d}{15} = \\dfrac{4d}{15}\\).",
          "\\(\\dfrac{4d}{15} = 8\\), so \\(d = 30\\).",
          "Check with the formula: \\(\\dfrac{15 \\times 5 \\times 8}{20} = 30\\).",
        ],
        answer: "30 km.",
      },
      selfCheckExample: {
        prompt: "A bus goes from P to Q at 50 km/h and comes back at 75 km/h, taking 6 h in all. Find the distance PQ.",
        steps: [
          "\\(\\dfrac{d}{50} + \\dfrac{d}{75} = \\dfrac{3d + 2d}{150} = \\dfrac{d}{30}\\).",
          "\\(\\dfrac{d}{30} = 6\\), so \\(d = 180\\).",
        ],
        answer: "180 km.",
      },
      practiceSet: [
        { prompt: "Out at 6 km/h and back at 3 km/h, taking 3 h in all. How far is it one way?", answer: "6 km" },
        { prompt: "Out at 40 km/h and back at 60 km/h, taking 2 h 30 min in all. How far is it one way?", answer: "60 km" },
        { prompt: "Out at 12 km/h and back at 8 km/h, taking 7.5 h in all. How far is it one way?", answer: "36 km" },
      ],
      pyqExampleId: "286930ed-fd99-41fb-996a-9df67ae52e93",
      traps: [
        {
          title: "The total time covers both legs",
          body: "If the round trip takes 8 h, the 8 h is the ride out and the walk back together. Solving \\(\\tfrac{d}{15} = 8\\) uses the whole time on one leg.",
        },
        {
          title: "Turn the minutes into hours",
          body: "3 h 36 min is 3.6 h, not 3.36 h. Put the wrong figure into \\(\\tfrac{d}{a} + \\tfrac{d}{b} = T\\) and every option is missed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-journey-parts",
      name: "One journey at two speeds, and rests on the way",
      intuition:
        "When one journey is split between two speeds, call the distance on one part \\(x\\). The other part is what is left of the whole, and the two times add up to the total.",
      definition:
        "- Distance \\(D\\) in time \\(T\\), part at \\(a\\) and the rest at \\(b\\): \\(\\dfrac{x}{a} + \\dfrac{D - x}{b} = T\\). This is a linear equation in \\(x\\).\n" +
        "- Two equal halves: the time is \\(\\dfrac{D/2}{a} + \\dfrac{D/2}{b}\\).\n" +
        "- Rests add time but no distance. A rest after every kilometre of a 5 km walk means 4 rests, because there is none after the last kilometre.\n" +
        "- Walking one way and riding back takes \\(T_1\\); walking both ways takes \\(T_2\\). One walk is \\(\\tfrac{T_2}{2}\\), so one ride is \\(T_1 - \\tfrac{T_2}{2}\\).",
      formula: {
        label: "A journey in two parts",
        latex: "\\dfrac{x}{a} + \\dfrac{D - x}{b} = T",
      },
      authoredExample: {
        prompt: "A man travels 60 km in 4 h, partly on foot at 5 km/h and partly by bus at 25 km/h. How far does he walk?",
        steps: [
          "\\(\\dfrac{x}{5} + \\dfrac{60 - x}{25} = 4\\). Multiply by 25: \\(5x + 60 - x = 100\\).",
          "\\(4x = 40\\), so \\(x = 10\\).",
          "Check: 10 km on foot is 2 h and 50 km by bus is 2 h, 4 h in all.",
        ],
        answer: "10 km.",
      },
      selfCheckExample: {
        prompt: "A man walks at 3 km/h and rests for 10 minutes after every kilometre. How long does he take to cover 5 km?",
        steps: [
          "Walking 5 km at 3 km/h takes \\(\\tfrac{5}{3}\\) h, that is 100 minutes.",
          "He rests after each of the first 4 km: 40 minutes.",
          "\\(100 + 40 = 140\\) minutes.",
        ],
        answer: "2 h 20 min.",
      },
      practiceSet: [
        {
          prompt: "A car goes 210 km in 3 h, partly at 90 km/h and partly at 60 km/h. How far does it go at 90 km/h?",
          answer: "90 km",
        },
        { prompt: "On a 100 km trip the first half is at 25 km/h and the second half at 50 km/h. Find the total time.", answer: "3 h" },
        {
          prompt: "Walking one way and riding back takes 6 h; walking both ways takes 10 h. How long does riding both ways take?",
          answer: "2 h",
          method: "One walk is 5 h, so one ride is 1 h.",
        },
        { prompt: "45 km is covered in 5 h, partly walking at 5 km/h and partly cycling at 15 km/h. How far is walked?", answer: "15 km" },
      ],
      pyqExampleId: "8f275773-3bb7-4345-b458-6970bd851258",
      traps: [
        {
          title: "The two parts are x and what is left",
          body: "Writing \\(\\tfrac{x}{a} + \\tfrac{x}{b} = T\\) makes both parts the same length. The second part is \\(D - x\\).",
        },
        {
          title: "No rest after the last stretch",
          body: "A 5 km walk with a rest after every kilometre has 4 rests, not 5. The walker has arrived after the fifth.",
        },
      ],
    },
  ],
};
