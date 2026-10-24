import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMI_LETTERS_NOTE: SubtopicNote = {
  subtopicName: "Letters and Numbers in a Mirror",
  title: "Letters and Numbers in a Mirror",
  oneLineDefinition:
    "A string of letters, numbers and symbols seen in a mirror beside it (the order reverses and each character flips) or in a mirror below it, a water image (the order stays and each character turns upside down).",
  whyItMatters:
    "Sixty-five questions in the bank, 23 from the 2023 shifts and 42 from the 2024 shifts, with 50 EASY and 15 MODERATE. The options differ in one or two characters, so knowing which characters change in a mirror and which do not finds the answer in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmile-chars",
      name: "Which characters change in a mirror",
      intuition:
        "A character that is the same on its left and right halves looks unchanged in a mirror beside it. A character that is the same on its top and bottom halves looks unchanged in a mirror below it. Every other character comes out reversed, and that is where the options differ.",
      definition:
        "- **Unchanged in a mirror beside it (left to right):** the capitals A, H, I, M, O, T, U, V, W, X, Y; the small letters i, l, o, v, w, x; the digits 0 and 8.\n" +
        "- **Unchanged in a mirror below it (top to bottom):** the capitals B, C, D, E, H, I, K, O, X; the digits 0, 3 and 8.\n" +
        "- **Pairs that swap:** in a mirror beside, b and d swap, and p and q swap. In a mirror below, b and p swap, and d and q swap.\n" +
        "- Any other character (R, F, N, 2, 4, 7 and so on) comes out reversed, and it does not turn into another character.\n" +
        "- **Fast route:** look only at the characters that change. The options are built to differ there.",
      authoredExample: {
        prompt: "Which characters of the string R8HL2 look exactly the same in a mirror placed beside it?",
        steps: [
          "8 and H are the same on their left and right halves, so they look unchanged.",
          "R, L and 2 are not, so each comes out reversed.",
        ],
        answer: "8 and H",
      },
      selfCheckExample: {
        prompt: "Which of the letters B, E, F and K look the same in a mirror placed below them?",
        steps: ["B, E and K are the same on their top and bottom halves.", "F has its arms at the top only, so it turns upside down."],
        answer: "B, E and K",
      },
      practiceSet: [
        { prompt: "What does the small letter b become in a mirror placed beside it?", answer: "d" },
        { prompt: "What does the small letter b become in a mirror placed below it?", answer: "p" },
        { prompt: "Which of the digits 2, 4, 7 and 8 looks the same in a mirror beside it?", answer: "8" },
        { prompt: "Does the capital letter T look the same in a mirror beside it?", answer: "Yes: its left and right halves match." },
      ],
      traps: [
        {
          title: "Calling a character unchanged when only its outline is close",
          body:
            "N and S look nearly balanced, but in a mirror beside them they come out reversed. Check that the left half truly matches the right half before you call a character unchanged.",
        },
        {
          title: "Using the wrong list for the mirror",
          body:
            "B looks the same in a mirror below it but reversed in a mirror beside it; A is the other way round. Pick the list that matches where the mirror stands.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmile-mirror",
      name: "A mirror beside the string",
      intuition:
        "A mirror on the right (or the left) of a string does two things at once. The character nearest the mirror comes first, so the order reverses. And every character is seen from behind, so each one flips left to right.",
      definition:
        "1. Write the characters in reverse order: the last one comes first.\n" +
        "2. Flip each character left to right. Characters that are the same on both sides stay as they are.\n" +
        "3. Top and bottom never change in a mirror beside the string: nothing turns upside down.\n" +
        "- A mirror on the left gives the same image as a mirror on the right.\n" +
        "- **Fast route:** first strike any option that is not in reverse order. Then look at the first and last characters of each option that is left, and at any character that is not the same on both sides.",
      authoredExample: {
        prompt: "A mirror stands on the right of the string FAN32. How does the image read from left to right?",
        steps: [
          "Reverse the order: 2, 3, N, A, F.",
          "Flip each character: 2, 3, N and F come out reversed; A is the same on both sides and stays.",
        ],
        answer: "A reversed 2, a reversed 3, a reversed N, A, then a reversed F",
      },
      selfCheckExample: {
        prompt: "A mirror stands on the right of the word TOY. How does the image read, and which letters look changed?",
        steps: ["Reverse the order: Y, O, T.", "Y, O and T are all the same on their left and right halves, so none looks changed."],
        answer: "YOT, with no letter looking changed",
      },
      practiceSet: [
        { prompt: "A mirror stands on the right of the string pq. How does the image read?", answer: "pq", method: "The order reverses to q, p, and then q flips to p and p flips to q." },
        { prompt: "In a mirror beside a string, which character of the string comes first in the image?", answer: "The last one" },
        { prompt: "Does a mirror beside a string turn any character upside down?", answer: "No" },
        { prompt: "A mirror stands on the left of a string instead of the right. Does the image change?", answer: "No: it is the same image." },
      ],
      pyqExampleId: "4f7c6ecb-981b-40f3-87c7-e67d207c0081",
      traps: [
        {
          title: "Reversing the order but not the characters",
          body:
            "An option with the right order and a 2, 3 or R printed the normal way is wrong. Each character that is not the same on both sides must come out reversed.",
        },
        {
          title: "Flipping the characters but keeping the order",
          body:
            "An option that keeps the original order and reverses every character is neither a mirror image nor a water image. In a mirror beside the string the order must reverse as well.",
        },
        {
          title: "Turning a character upside down",
          body:
            "A mirror beside the string never swaps top and bottom. An option where u has become n, or A stands on its point, is a water image, not a mirror image.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmile-water",
      name: "A mirror below: the water image",
      intuition:
        "A mirror lying below a string, like the surface of water, shows it upside down. The characters keep their order from left to right, and each one flips top to bottom.",
      definition:
        "1. Keep the order of the characters.\n" +
        "2. Turn each one upside down by flipping it top to bottom. Characters that are the same at top and bottom (B, C, D, E, H, I, K, O, X, 0, 3, 8) stay as they are.\n" +
        "- A flip is not a turn: 6 flipped top to bottom is not 9. A 9 is a 6 turned round half a circle, which a mirror never does.\n" +
        "- **Fast route:** check the characters that are not the same at top and bottom first, and strike any option that has turned one round instead of flipping it.",
      authoredExample: {
        prompt: "A mirror lies below the string CODE5. What does the water image show?",
        steps: [
          "The order stays: C, O, D, E, 5.",
          "C, O, D and E are the same at top and bottom, so they stay. 5 is not, so it appears flipped upside down.",
        ],
        answer: "C, O, D, E, then a 5 flipped top to bottom",
      },
      selfCheckExample: {
        prompt: "A mirror lies below the string b4H. What does each character become?",
        steps: ["b flipped top to bottom is p.", "4 appears upside down.", "H is the same at top and bottom, so it stays."],
        answer: "p, an upside-down 4, H",
      },
      practiceSet: [
        { prompt: "What does the small letter d become in a water image?", answer: "q" },
        { prompt: "Does a water image change the order of the characters?", answer: "No" },
        { prompt: "Which of the letters B, F, K and R look the same in a water image?", answer: "B and K" },
        { prompt: "Is a 6 in a water image the same as a 9?", answer: "No: a 9 is a 6 turned round, not flipped." },
      ],
      pyqExampleId: "225f9946-53fb-4ba9-a852-fec99e0822e9",
      traps: [
        {
          title: "Turning instead of flipping",
          body:
            "Turning a 6 half a circle gives a 9, and turning b gives q. A water image flips each character top to bottom, so 6 becomes a shape with its loop at the top and b becomes p.",
        },
        {
          title: "Reversing the order in a water image",
          body:
            "Only a mirror beside the string reverses the order. A mirror below it keeps the left-to-right order exactly as printed.",
        },
      ],
    },
  ],
};
