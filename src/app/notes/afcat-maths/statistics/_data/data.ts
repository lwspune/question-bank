import type { SubtopicNote } from "@/app/notes/_types";

export const AF_ST_DATA_NOTE: SubtopicNote = {
  subtopicName: "Data, Classes and Pie Charts",
  title: "Data, Class Intervals and Pie Charts",
  oneLineDefinition:
    "Tell primary data from secondary, turn class limits into boundaries and widths, and turn values into the angles of a pie chart or the sides of a square diagram.",
  whyItMatters:
    "Every question on this page is EASY, and the marks are lost on a definition rather than on arithmetic: a boundary half a unit below the printed limit, or an angle taken out of 100 instead of 360. Each pie chart question is one fraction of the whole, so write that fraction down first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afst-class-intervals",
      name: "Data and class intervals",
      intuition:
        "Statistical data are numbers collected for a purpose, so that they can be compared. When there are many of them they are grouped into classes. Each class has two printed limits, and two boundaries that close the gap between one class and the next so that the classes touch.",
      definition:
        "- **Primary data** are collected first-hand by the investigator: a survey, door-to-door visits, telephone interviews. **Secondary data** are taken from records someone else collected, such as census reports or published tables.\n" +
        "- A list of names is not statistical data. Measurements or counts collected for comparison are.\n" +
        "- **Class limits** are the printed ends, such as 20-29. If one class ends at 29 and the next starts at 30, the gap is 1. Take half the gap off every lower limit and add it to every upper limit to get the **class boundaries**: 19.5 to 29.5.\n" +
        "- **Class width** is the upper boundary minus the lower boundary. With \\(k\\) classes of width \\(w\\) starting at the lower boundary \\(L\\), the last class ends at \\(L + kw\\).\n" +
        "- To make \\(k\\) equal classes from raw data, the **range** (highest minus lowest) divided by \\(k\\) gives the width. Start the first class at the lowest value.",
      formula: {
        label: "Class width from the range",
        latex: "w = \\dfrac{H - L}{k}, \\qquad \\text{last boundary} = L + kw",
      },
      authoredExample: {
        prompt:
          "The classes of a distribution are 5-9, 10-14, 15-19 and 20-24. Find the class boundaries of the third class and the class width.",
        steps: [
          "The gap between 9 and 10 is 1, so half of it is 0.5.",
          "The third class, 15-19, has boundaries \\(15 - 0.5 = 14.5\\) and \\(19 + 0.5 = 19.5\\).",
          "The width is \\(19.5 - 14.5 = 5\\).",
        ],
        answer: "14.5 to 19.5; width 5.",
      },
      selfCheckExample: {
        prompt:
          "Marks run from 32 to 92 and are to be grouped into 6 equal classes in ascending order, starting at the lowest mark. Find the third class.",
        steps: [
          "The range is \\(92 - 32 = 60\\), so the width is \\(60 \\div 6 = 10\\).",
          "The classes are 32-42, 42-52, 52-62 and so on.",
        ],
        answer: "52-62.",
      },
      practiceSet: [
        {
          prompt: "Twelve classes of width 1.5 start at a lower boundary of 4.2. Find the upper boundary of the last class.",
          answer: "\\(22.2\\)",
          method: "\\(4.2 + 12 \\times 1.5\\).",
        },
        { prompt: "Find the actual upper limit of the class 30-39 when the next class is 40-49.", answer: "\\(39.5\\)" },
        {
          prompt: "A survey team telephones 300 homes to ask about their water use. Are the answers primary or secondary data?",
          answer: "Primary data.",
        },
        { prompt: "The lowest value is 18 and the highest 63. Find the width of 5 equal classes.", answer: "\\(9\\)" },
      ],
      pyqExampleId: "fb7d2596-f35a-40e7-ae85-6cd2d600697b",
      traps: [
        {
          title: "Every limit moves by the same half-gap",
          body: "For the classes 15-24 and 25-34 the actual lower limits are 14.5 and 24.5. Moving only the first one, or moving the upper limits down, mixes limits with boundaries.",
        },
        {
          title: "Census figures are secondary",
          body: "Data copied from the census or a published report are secondary, even though someone once collected them first-hand. Primary means the investigator collected them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afst-pie-square",
      name: "Pie charts and square diagrams",
      intuition:
        "A pie chart shares the 360° of a circle among the items in proportion to their values, so each angle is a fraction of a full turn. A square diagram does the same with area: the square's area stands for the value, so its side grows only as the square root of the value.",
      definition:
        "- The angle of an item is \\(\\dfrac{v}{T} \\times 360^\\circ\\), where \\(v\\) is its value and \\(T\\) the total.\n" +
        "- Its share as a percentage is \\(\\dfrac{\\theta}{360^\\circ} \\times 100\\%\\).\n" +
        "- Back from an angle to a value: \\(\\dfrac{\\theta}{360^\\circ} \\times T\\). Two items differ by \\(\\dfrac{\\theta_1 - \\theta_2}{360^\\circ} \\times T\\).\n" +
        "- If one item's value is known, the others scale by their angles: an item with twice the angle has twice the value. The total is not needed.\n" +
        "- If the values are given as a ratio, the angle is that item's share of the ratio sum times 360°, whatever the total.\n" +
        "- **Square diagram**: the area is the value divided by the scale (the value one square centimetre stands for), and the side is the square root of that area.",
      formula: {
        label: "Angle of a sector",
        latex: "\\theta = \\dfrac{v}{T} \\times 360^\\circ, \\qquad \\text{side} = \\sqrt{\\dfrac{v}{s}}",
      },
      authoredExample: {
        prompt:
          "A family spends ₹12,000 a month: food ₹4,800, rent ₹3,600, travel ₹1,200 and savings ₹2,400. Find the angle for rent on a pie chart, and the share of travel as a percentage.",
        steps: [
          "The total is \\(4800 + 3600 + 1200 + 2400 = 12000\\).",
          "Rent: \\(\\dfrac{3600}{12000} \\times 360^\\circ = 0.3 \\times 360^\\circ = 108^\\circ\\).",
          "Travel: \\(\\dfrac{1200}{12000} = \\dfrac{1}{10}\\), which is 10%.",
        ],
        answer: "Rent 108°; travel 10%.",
      },
      selfCheckExample: {
        prompt:
          "On a pie chart of a farm's crops, rice has a sector of 120° and maize a sector of 45°. The rice weighs 2,400 kg. Find the weight of the maize and of the whole crop.",
        steps: [
          "Maize: \\(2400 \\times \\dfrac{45}{120} = 900\\) kg.",
          "The whole crop is 360°: \\(2400 \\times \\dfrac{360}{120} = 7200\\) kg.",
        ],
        answer: "900 kg; 7,200 kg.",
      },
      practiceSet: [
        { prompt: "Three items are in the ratio \\(2 : 3 : 7\\). Find the angle of the middle item on a pie chart.", answer: "\\(90^\\circ\\)", method: "\\(\\tfrac{3}{12} \\times 360^\\circ\\)." },
        { prompt: "A sector of a pie chart is 54°. What percentage of the total does it stand for?", answer: "15%" },
        {
          prompt: "A pie chart shows a budget of ₹72,000. Two of its sectors are 100° and 70°. How much more does the first stand for?",
          answer: "₹6,000",
          method: "\\(\\tfrac{30}{360} \\times 72000\\).",
        },
        {
          prompt: "A square diagram uses the scale 1 cm² for 16 units. Find the side of the square for 144 units.",
          answer: "3 cm",
          method: "The area is 9 cm².",
        },
      ],
      pyqExampleId: "3394f883-15c3-42da-9615-a0dc6f1d305b",
      traps: [
        {
          title: "Out of 360, not out of 100",
          body: "A sector of 90° is a quarter of the chart, which is 25%. Reading the angle as a percentage gives 90%.",
        },
        {
          title: "The side is a square root",
          body: "With 1 cm² for 10 units, 160 units is an area of 16 cm² and a side of 4 cm. Dividing 160 by 10 and calling 16 the side makes the side four times too long.",
        },
        {
          title: "A ratio needs no total",
          body: "When the items are given as a ratio, the angle depends on the ratio alone. A large total printed in the question can be ignored.",
        },
      ],
    },
  ],
};
