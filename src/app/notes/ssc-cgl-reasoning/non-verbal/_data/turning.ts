import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RNV_TURNING_NOTE: SubtopicNote = {
  subtopicName: "Turning and Flipping",
  title: "Turning and Flipping",
  oneLineDefinition:
    "Figure series and analogies where a figure turns by a fixed angle at each step, or is mirrored or turned upside down, sometimes as it is carried into the next figure.",
  whyItMatters:
    "Nineteen questions in the bank, 9 from the 2023 shifts and 10 from the 2024 shifts, with 7 EASY, 11 MODERATE and 1 HARD. The angle of the turn is the whole question, so knowing where 45, 90 and 180 degrees take a pointer, in both directions, gets the mark.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrnvtu-rotate",
      name: "Turning by a fixed angle",
      intuition:
        "Pick one feature that points somewhere, such as an arrow, a corner or a dot, and watch where it points in each figure. The change from one figure to the next is the angle of the turn, and it stays the same through the series.",
      definition:
        "- **Clockwise** is the way a clock's hands move: up, right, down, left. **Anticlockwise** is the other way: up, left, down, right.\n" +
        "- A 90 degree turn moves a pointer one of those four places. A 45 degree turn moves it halfway, to a slant (up-right, up-left and so on). A 180 degree turn sends it to the opposite side, whichever way it turns.\n" +
        "- Four turns of 90 degrees, or eight of 45 degrees, bring a figure back to where it began.\n" +
        "- Everything inside the figure turns with it: a letter or a small mark keeps its place on the shape and turns too.\n" +
        "- A part can turn on its own while the rest stays still, or two parts can turn by different angles. Watch each part.\n" +
        "- **Fast route:** find the angle from figures 1 and 2, check it on figures 2 and 3, then turn figure 4 once more in your head.",
      authoredExample: {
        prompt:
          "In a series, an arrow points up, then right, then down. Where does it point in the fourth and fifth figures?",
        steps: [
          "Up to right to down is a turn of 90 degrees clockwise each step.",
          "The fourth figure turns once more: down to left.",
          "The fifth figure: left to up.",
        ],
        answer: "Left in the fourth figure, up in the fifth",
      },
      selfCheckExample: {
        prompt:
          "An arrow points up and turns 135 degrees clockwise at each step. Where does it point in the fourth figure?",
        steps: [
          "Figure 2: 135 degrees clockwise from up is down-right.",
          "Figure 3: 135 more makes 270 degrees, which is left.",
          "Figure 4: 135 more makes 405 degrees, the same as 45 degrees, which is up-right.",
        ],
        answer: "Up-right",
      },
      practiceSet: [
        { prompt: "How many turns of 90 degrees bring a figure back to where it started?", answer: "4" },
        { prompt: "A shape turns 45 degrees clockwise at each step. After how many steps does it face the same way again?", answer: "8" },
        { prompt: "An arrow points left and turns 90 degrees anticlockwise. Where does it point now?", answer: "Down" },
        { prompt: "Does it matter whether a 180 degree turn is clockwise or anticlockwise?", answer: "No: both end in the same place." },
      ],
      pyqExampleId: "0c7aaf08-a09d-4d13-ad7d-8d6bcdcd8614",
      traps: [
        {
          title: "Turning the wrong way",
          body:
            "Up to left is anticlockwise, not clockwise. Say the direction aloud from figures 1 and 2 and keep it; the setter puts the mirror-image turn among the options.",
        },
        {
          title: "Forgetting that the inside turns too",
          body:
            "When a shape with a letter or a dot inside it turns, the letter and the dot turn with it. An option where the outline has turned but the inside has not is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrnvtu-flip",
      name: "Mirrored, turned over and carried parts",
      intuition:
        "A flip is not a turn. A mirror image swaps left and right; a water image swaps top and bottom. In an analogy, the second figure is the first after one such change, and you make the same change to the third. In some series, part of each figure is carried into the next one, flipped on the way.",
      definition:
        "- **Mirror image (left to right):** b becomes d, p becomes q. Top and bottom stay where they are.\n" +
        "- **Water image (upside down):** b becomes p, M becomes W. Left and right stay where they are.\n" +
        "- A shape that is the same on both sides (A, H, a circle) does not change in a left-to-right mirror, so look at the parts that are not symmetric.\n" +
        "- **Analogy:** name the change from figure 1 to figure 2 (turned upside down, mirrored, turned 90 degrees, shaded) and apply only that change to figure 3.\n" +
        "- **Carried parts:** in some series a new symbol appears in each figure, and the next figure shows it again in another place, often mirrored or turned over. Track the new symbol from each figure into the next.",
      authoredExample: {
        prompt:
          "In a figure analogy, figure 1 shows the letter b and figure 2 shows the letter d. Figure 3 shows the letter p. What does figure 4 show?",
        steps: [
          "b to d keeps top and bottom and swaps left and right: a mirror image.",
          "The mirror image of p is q.",
        ],
        answer: "q",
      },
      selfCheckExample: {
        prompt:
          "In a series, each figure's small letter is the previous figure's big letter turned upside down. The big letters of figures 1 and 2 are M and b. What is the small letter of figure 3?",
        steps: [
          "Figure 3's small letter comes from figure 2's big letter, b.",
          "b turned upside down is p.",
        ],
        answer: "p",
      },
      practiceSet: [
        { prompt: "Which letter is the mirror image, left to right, of b?", answer: "d" },
        { prompt: "Which letter is b turned upside down?", answer: "p" },
        { prompt: "Which of A, B, H and K look the same in a left-to-right mirror?", answer: "A and H" },
        { prompt: "In a figure analogy, figure 2 is figure 1 turned upside down. What must you do to figure 3?", answer: "Turn it upside down too, and change nothing else." },
      ],
      pyqExampleId: "16124b5c-1813-4f3e-a4ea-463b1caf88a2",
      traps: [
        {
          title: "Mixing up a mirror image and a water image",
          body:
            "A mirror swaps left and right; turning upside down swaps top and bottom. b mirrored is d, but b turned upside down is p. Decide which swap happened before you choose.",
        },
        {
          title: "Changing more than the analogy changes",
          body:
            "If figure 2 is only figure 1 turned upside down, the answer is figure 3 turned upside down and nothing else. An option that also shades or moves a part has made a second change.",
        },
      ],
    },
  ],
};
