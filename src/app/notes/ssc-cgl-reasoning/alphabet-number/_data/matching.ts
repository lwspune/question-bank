import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAL_MATCHING_NOTE: SubtopicNote = {
  subtopicName: "Address and Data Matching",
  title: "Address and Data Matching",
  oneLineDefinition:
    "An address or a list of entries is compared character by character, and the copy that matches the original exactly, or the entries that match each other, is chosen.",
  whyItMatters:
    "Forty-four questions in the bank, every one from the 2025 shifts and every one EASY. They test the eye rather than the brain: each wrong option hides one small change, so a fixed order of checking gets the mark in about fifteen seconds and leaves time for harder questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscralma-single",
      name: "Checking an address part by part",
      intuition:
        "An address is a few short parts: a number, a building, a locality, a city, a state and a PIN code. Each wrong option changes exactly one small thing in one part. Check the parts in a fixed order and the odd one shows itself.",
      definition:
        "1. Split the given address into its parts at the commas.\n" +
        "2. Check the parts across all four options in this order: PIN code and state, then the house number, then the spellings of the names.\n" +
        "3. Strike an option the moment one part differs.\n" +
        "- **What counts as a difference:** a digit swapped (19 and 91) or changed; 'No.' or '#' missing; a hyphen or slash added or dropped (Block C and Block-C, 3/5 and 3-5); singular and plural (Tower and Towers); one letter spelt differently (Meadows and Medows); a full stop or comma dropped from an abbreviation (S.G. and SG); a short form (Road and Rd., Sector and Sec); a different name for the same place (Gurgaon and Gurugram, Bangalore and Bengaluru).\n" +
        "- **What SSC's key does not count:** a missing space after a comma, when the given line and the options differ only in that way throughout.\n" +
        "- **Fast route:** the PIN code and state settle about half these questions at once, because SSC often changes only one of them.",
      authoredExample: {
        prompt:
          "Choose the address that is the same as: Flat 7C, Rose Garden, MG Road, Pune, Maharashtra 411001. (a) Flat 7C, Rose Gardens, MG Road, Pune, Maharashtra 411001 (b) Flat 7C, Rose Garden, M.G. Road, Pune, Maharashtra 411001 (c) Flat 7C, Rose Garden, MG Road, Pune, Maharashtra 411001 (d) Flat 7-C, Rose Garden, MG Road, Pune, Maharashtra 411010",
        steps: [
          "PIN and state: (d) has 411010, so strike it.",
          "Number: (a), (b) and (c) all have Flat 7C.",
          "Names: (a) has Gardens and (b) has M.G. in place of MG. Only (c) matches every part.",
        ],
        answer: "(c)",
      },
      selfCheckExample: {
        prompt:
          "Choose the address that is the same as: House No. 52, Lake Road, Civil Lines, Nagpur, Maharashtra 440001. (a) House No. 52, Lake Rd, Civil Lines, Nagpur, Maharashtra 440001 (b) House No. 52, Lake Road, Civil Lines, Nagpur, Maharashtra 440001 (c) House No. 25, Lake Road, Civil Lines, Nagpur, Maharashtra 440001 (d) House No. 52, Lake Road, Civil Line, Nagpur, Maharashtra 440001",
        steps: [
          "PIN and state agree in all four.",
          "Number: (c) has 25 in place of 52.",
          "Names: (a) shortens Road to Rd and (d) writes Civil Line. Only (b) matches.",
        ],
        answer: "(b)",
      },
      practiceSet: [
        { prompt: "In an address-matching question, is 'Sector-14' the same as 'Sector 14'?", answer: "No: the hyphen is a difference." },
        { prompt: "In an address-matching question, are the PIN codes 400076 and 400067 the same?", answer: "No: the last two digits are swapped." },
        { prompt: "In an address-matching question, is 'No. 12, Park View' the same as '12, Park View'?", answer: "No: 'No.' is missing." },
        { prompt: "In an address-matching question, is 'Bengaluru' the same as 'Bangalore'?", answer: "No: they name the same city but are spelt differently, and only an exact copy matches." },
      ],
      pyqExampleId: "e6f191ff-267f-4f84-89b8-157f740b3fbf",
      traps: [
        {
          title: "Reading for meaning",
          body:
            "Gurgaon and Gurugram are the same city, and Rd. means Road, but neither pair matches in these questions. The test is an exact copy, so compare characters, not meanings.",
        },
        {
          title: "Stopping after the first part that matches",
          body:
            "Two options can share the right PIN and state and still differ in a house number or one letter of a name. Strike options by a difference, and pick only the option left with none.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralma-lists",
      name: "Matching inside a numbered list",
      intuition:
        "Some questions print four numbered entries and ask which are identical to a given entry, or to each other. Label each entry with the one thing that is different about it; the entries left unlabelled are the answer.",
      definition:
        "1. Take the given entry, or entry 1 if no entry is given, as the reference.\n" +
        "2. For each numbered entry, write the first difference you find beside it: a name shortened, a digit changed, a hyphen, a missing full stop or comma.\n" +
        "3. 'Identical to the given address': the entries with no difference. 'Identical to each other': entries that share exactly the same text, which may both differ from entry 1.\n" +
        "4. For roll numbers or codes, compare only the part the question names, such as the first three digits.\n" +
        "- **Fast route:** the options name only a few pairs, so check those pairs alone. If an option's first entry already has a difference, the whole option goes.",
      authoredExample: {
        prompt:
          "Which of these addresses are identical to each other? 1. Anil Rao 22-B, Hill Park, Indore, 452001 2. Anil Rao 22B, Hill Park, Indore, 452001 3. Anil Rao 22-B, Hill Park, Indore, 452001 4. Anil Rao 22-B, Hill Parks, Indore, 452001",
        steps: [
          "Entry 2 writes 22B with no hyphen.",
          "Entry 4 writes Parks in place of Park.",
          "Entries 1 and 3 match character for character.",
        ],
        answer: "1 and 3",
      },
      selfCheckExample: {
        prompt:
          "Which roll numbers share a centre code, the first three digits? 471205, 417258, 471983, 714205",
        steps: [
          "The first three digits are 471, 417, 471 and 714.",
          "Only 471205 and 471983 start with 471.",
        ],
        answer: "471205 and 471983",
      },
      practiceSet: [
        { prompt: "Are 'Dr. Meera Iyer' and 'Dr Meera Iyer' identical in an address-matching list?", answer: "No: one has the full stop after Dr and the other does not." },
        { prompt: "Are 'Flat 3/5' and 'Flat 3-5' identical in an address-matching list?", answer: "No: a slash and a hyphen are different characters." },
        { prompt: "Two entries both differ from the given address in the same way and match each other exactly. Are they identical to each other?", answer: "Yes: 'identical to each other' compares the entries only with one another." },
      ],
      pyqExampleId: "2d83ea3b-0d81-43c9-a369-b6a437811c2e",
      traps: [
        {
          title: "Comparing every entry with entry 1 when asked 'to each other'",
          body:
            "When the question asks which entries match each other, the right pair can differ from entry 1. Group the entries that are the same, without assuming entry 1 is correct.",
        },
        {
          title: "Overlooking a dropped full stop",
          body:
            "In numbered lists SSC often makes the only change a missing full stop, such as Dr and Dr., or an initial written S and S. Read the punctuation after every short form as closely as the letters.",
        },
      ],
    },
  ],
};
