import type { SubtopicNote } from "@/app/notes/_types";

const COLUMNS = ["Word", "Meaning", "Opposite", "Other options", "Sitting"];

export const CDSEN_ANT_WORTH_NOTE: SubtopicNote = {
  subtopicName: "Antonyms: Size, Worth and Law",
  title: "Antonyms: words for size, worth and law",
  oneLineDefinition:
    "Words for how big or costly something is, how important or special it is, and whether a person is blamed or cleared, with the opposites CDS has asked for.",
  whyItMatters:
    "Many of these words have no good-or-bad charge; they have a direction instead: big or small, rich or poor, required or optional, guilty or cleared. " +
    "Find the direction of the tested word, and the answer is the one option pointing the other way.",
  concepts: [
    // C1 — size, amount and cost
    {
      kind: "reference" as const,
      slug: "cdsenant-size",
      name: "Size, amount and cost",
      intuition:
        "Big against small, a lot against a little, fat against thin, rich against poor, dear against cheap, hard against easy. Each tested word points one way on one of these lines.",
      definition:
        "- **Big or a lot:** mammoth (huge), considerable, substantial, abundant, bonanza (a sudden large gain).\n" +
        "- **Small or a little:** tiny, trifling, pittance (a tiny sum of money), negligible.\n" +
        "- **Body:** emaciated (very thin) against hefty; paunchy (pot-bellied) against slim.\n" +
        "- **Money:** indigent and impecunious (very poor) against affluent; exorbitant (far too costly) against affordable.\n" +
        "- **Effort and fit:** arduous (very hard) against easy; commensurate (in proportion) against disproportionate.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["in commensurate with", "in proportion to", "disproportionate", "equal to, matched (synonyms), unparalleled", "2017 (II)"], pyqExampleId: "016539ba-fabe-4723-816a-00d330e7f4e3" },
          { cells: ["mammoth", "huge", "tiny", "large (synonym), negligible (about amount, not size), poor", "2017 (II)"], pyqExampleId: "a33c82f9-ad1a-49b0-9ee5-a466c4ac5357" },
          { cells: ["considerable", "large in amount", "trifling", "substantial, plentiful, abundant (synonyms)", "2023 (I)"], pyqExampleId: "8052f15a-d207-4bc0-9293-d5fe45ddc1a3" },
          { cells: ["pittance", "a very small amount of money", "bonanza", "petty amount, miniscule amount (synonyms), instalment", "2026 (I)"], pyqExampleId: "f63f538f-b79b-4d96-8cbf-b042c1e57358" },
          { cells: ["emaciated", "very thin from hunger or illness", "hefty", "thin (synonym), disillusioned, determined", "2017 (II)"], pyqExampleId: "175da438-1e9f-4a92-a691-df912fa02b44" },
          { cells: ["paunchy", "having a large belly", "slim", "stout, plump, fat (synonyms)", "2021 (II)"], pyqExampleId: "b8f52c6d-5bed-43bc-b3aa-04612a559537" },
          { cells: ["exorbitant", "far too high (of a price)", "affordable", "high, outrageous, ridiculous (synonyms)", "2026 (II)"], pyqExampleId: "b709733c-2516-4da8-9283-bf352f7be1ad" },
          { cells: ["indigent", "very poor", "affluent", "impecunious (synonym), ruined, pretentious", "2024 (I)"], pyqExampleId: "76f46d02-4498-4d0d-aaaf-4330c433fdae" },
          { cells: ["arduous", "hard, needing great effort", "easy and effortless", "strenuous and exacting, onerous and overbearing, difficult and exacerbating (synonyms)", "2026 (I)"], pyqExampleId: "e176aa49-7048-481c-8633-3c0dead4acfb" },
        ],
        caption: "Stay on the same line: an opposite of size is a size word, an opposite of cost is a cost word.",
      },
      pyqExampleId: "8052f15a-d207-4bc0-9293-d5fe45ddc1a3",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The rains brought a \\(\\underline{\\text{meagre}}\\) harvest. (a) scanty (b) sparse (c) bountiful (d) poor",
        steps: [
          "Meaning: 'meagre' means small in amount, not enough.",
          "Scanty, sparse and poor mean the same: strike them.",
          "Bountiful (large in amount) points the other way on the same line.",
        ],
        answer: "(c) bountiful",
      },
      practiceSet: [
        { prompt: "Opposite of 'pittance'?", answer: "bonanza" },
        { prompt: "Opposite of 'indigent' (very poor)?", answer: "affluent" },
        { prompt: "Opposite of 'exorbitant'?", answer: "affordable" },
        { prompt: "Opposite of 'emaciated'?", answer: "hefty" },
      ],
      traps: [
        {
          title: "Size and amount are different lines",
          body:
            "For 'mammoth' (huge), 'negligible' looks right because it means very little. But it describes an amount or importance, not size. 'Tiny' stays on the size line, so it is the better opposite of a mammoth gathering.",
        },
      ],
    },

    // C2 — importance and quality
    {
      kind: "reference" as const,
      slug: "cdsenant-worth",
      name: "Importance and quality",
      intuition:
        "How much something matters, how deep it goes, and whether it is special or ordinary. Important against trivial, deep against shallow, special against common, heavenly against earthly.",
      definition:
        "- **Matters a lot:** momentous (very important), requisite (required), vital, essential.\n" +
        "- **Matters little:** trivial, optional, inessential.\n" +
        "- **Depth and level:** profound (deep) against superficial (on the surface); rudimentary (basic) against advanced.\n" +
        "- **Special against ordinary:** distinctive and peculiar (marking something out) against common.\n" +
        "- **Other pairs:** beauty against inelegance; celestial (of heaven) against earthly.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["momentous", "very important, with great results", "trivial", "futile, vain, useless (about results, not importance)", "2017 (II)"], pyqExampleId: "92613d68-d073-4830-875b-2d4f35ea927e" },
          { cells: ["requisite", "required, necessary", "optional", "essential, obligatory, vital (synonyms)", "2026 (II)"], pyqExampleId: "e66bc047-8413-49a2-9eb1-cf3ec5f889a6" },
          { cells: ["rudimentary", "basic, at an early stage", "advanced", "fundamental, basic, elementary (synonyms)", "2026 (II)"], pyqExampleId: "62db9232-8570-427e-b660-179e7615f576" },
          { cells: ["profound", "deep in knowledge or insight", "superficial", "erudite, scholarly (near-synonyms), sincere", "2019 (I)"], pyqExampleId: "13b199af-4f0c-4d34-9e8e-e39e48a4b3a6" },
          { cells: ["distinctive", "marking something out from others", "common", "salient, unique (synonyms), great", "2018 (II)"], pyqExampleId: "88ed3b82-e55a-4bb6-a2f8-d38fed64cb56" },
          { cells: ["distinctive", "marking something out from others", "common", "unique, special (synonyms), unfamiliar", "2021 (I)"], pyqExampleId: "a72d20e2-e80b-4552-96d7-0ce0d57b7164" },
          { cells: ["peculiar", "special, belonging to one only", "common", "customary, natural, familiar", "2018 (I)"], noteAmber: "Here peculiar means 'its own, special', so the direct opposite is common: shared by many.", pyqExampleId: "66922864-6f1f-41d3-8bb4-cfd876d6e934" },
          { cells: ["beauty", "the quality of being pleasing to look at", "inelegance", "allure, charm (synonyms), ideal", "2019 (II)"], pyqExampleId: "6a21d296-e98a-47f6-ba78-37931108b01a" },
          { cells: ["celestial", "of the sky or heaven", "earthly", "transcendental (near-synonym), utopian, ritual", "2022 (I)"], pyqExampleId: "a446a668-893c-4082-bb33-8d8621d81db0" },
        ],
        caption: "Common was the opposite for distinctive (twice) and for peculiar.",
      },
      pyqExampleId: "e66bc047-8413-49a2-9eb1-cf3ec5f889a6",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The report missed several \\(\\underline{\\text{crucial}}\\) facts. (a) vital (b) critical (c) key (d) minor",
        steps: [
          "Meaning: 'crucial' means of the greatest importance.",
          "Vital, critical and key mean the same: strike them.",
          "Minor (of little importance) is the opposite.",
        ],
        answer: "(d) minor",
      },
      practiceSet: [
        { prompt: "Opposite of 'momentous'?", answer: "trivial" },
        { prompt: "Opposite of 'profound'?", answer: "superficial" },
        { prompt: "Opposite of 'rudimentary'?", answer: "advanced" },
        { prompt: "Opposite of 'celestial'?", answer: "earthly" },
      ],
      traps: [
        {
          title: "Useless is not the opposite of important",
          body:
            "For 'momentous' (very important), 'futile', 'vain' and 'useless' are offered. They describe an effort that fails, not how much an event matters. The opposite of important is 'trivial'.",
        },
        {
          title: "A synonym of the plain meaning is still a synonym",
          body:
            "'Rudimentary' means basic. 'Fundamental', 'basic' and 'elementary' all mean basic too, even though 'fundamental' can sound grand. Strike all three and take 'advanced'.",
        },
      ],
    },

    // C3 — guilt, release and giving
    {
      kind: "reference" as const,
      slug: "cdsenant-law",
      name: "Guilt, release and giving",
      intuition:
        "Words from the courtroom and from rules: blamed or cleared, held or freed, rule broken or rule kept, an honour given or taken back.",
      definition:
        "- **Blamed:** accused, indicted (formally charged), convicted (found guilty), incriminated, arraigned.\n" +
        "- **Cleared:** exonerated, vindicated, absolved, pardoned.\n" +
        "- **Held against freed:** detained, confined against released.\n" +
        "- **Rules:** infraction, breach, transgression (breaking a rule) against observance (keeping it). Expunged (struck off the record) against accepted.\n" +
        "- **Honours:** bestowed and conferred (given) against withdrawn.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["vindicates", "clears of blame", "indicts", "reprieves, absolves (synonyms), summons", "2017 (II)"], pyqExampleId: "6f0c4e1a-1884-40fb-9572-306a8fefe0df" },
          { cells: ["exonerated", "cleared of blame", "convicted", "pardoned (synonym), honoured, felicitated", "2021 (I)"], pyqExampleId: "eeee8e81-71d0-491d-a476-ffcbd98f0840" },
          { cells: ["accused", "blamed, charged with a wrong", "vindicated", "incriminated, indicted, arraigned (synonyms)", "2021 (II)"], pyqExampleId: "5fa8aa9a-cd82-40b7-99e1-8c4ffbd84138" },
          { cells: ["detained", "held back, kept in custody", "released", "impeded, confined, held (synonyms)", "2021 (II)"], pyqExampleId: "51a73d4e-73f8-4d46-88c9-ef2fcd850a1e" },
          { cells: ["expunged", "struck off the record, erased", "accepted", "got rid of (synonym), rejected, part of", "2020 (II)"], pyqExampleId: "7e9922d2-edfa-4b48-9a74-c76675efcfd1" },
          { cells: ["infraction", "the breaking of a rule", "observance", "transgression, breach (synonyms), acceptance", "2023 (II)"], pyqExampleId: "83f4f44b-57de-483d-9f09-289044d15ea1" },
          { cells: ["bestowed", "given as an honour", "withdrawn", "conferred, imparted (synonyms), imbibed", "2020 (I)"], pyqExampleId: "9de42f56-5954-4408-b88a-ff15345f94d1" },
        ],
        caption: "Vindicate works both ways: it was once the word tested and once the answer.",
      },
      pyqExampleId: "eeee8e81-71d0-491d-a476-ffcbd98f0840",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The prisoner was \\(\\underline{\\text{acquitted}}\\) by the high court. (a) freed (b) discharged (c) condemned (d) cleared",
        steps: [
          "Meaning: 'acquitted' means declared not guilty.",
          "Freed, discharged and cleared mean the same: strike them.",
          "Condemned (declared guilty and sentenced) is the opposite.",
        ],
        answer: "(c) condemned",
      },
      practiceSet: [
        { prompt: "Opposite of 'vindicates'?", answer: "indicts" },
        { prompt: "Opposite of 'detained'?", answer: "released" },
        { prompt: "Opposite of 'infraction' (of a rule)?", answer: "observance" },
        { prompt: "Opposite of 'bestowed' (an award)?", answer: "withdrawn" },
      ],
      traps: [
        {
          title: "Pardoned is on the same side as cleared",
          body:
            "A word that means 'cleared of blame' has 'pardoned', 'absolved' or 'reprieved' as synonyms, all on the cleared side. The answer is on the blamed side: convicted, indicted.",
        },
      ],
    },
  ],
};
