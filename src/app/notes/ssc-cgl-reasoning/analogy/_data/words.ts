import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAN_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Analogy",
  title: "Word Analogy",
  oneLineDefinition:
    "A word analogy gives two words joined by a link. Put the link into a short sentence, then find the option that makes the same sentence true for the new word.",
  whyItMatters:
    "Eighty-four questions in the bank, seventy-one EASY and thirteen MODERATE, thirteen of them from the 2025 shifts. They are the quickest marks in the Reasoning part once the habit is set: say the link aloud in a sentence before you read a single option.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscranwd-meaning",
      name: "Meaning pairs: same, opposite or stronger",
      intuition:
        "Most word pairs are linked by meaning. Either the two words mean the same thing, or they mean opposite things, or the second is a stronger form of the first. Decide which one before you look at the options.",
      definition:
        "- Make a sentence from the given pair: 'Vacant means the same as empty.'\n" +
        "- Three links cover nearly every meaning pair: **same meaning** (synonyms), **opposite meaning** (antonyms) and **stronger form** (warm and hot: hot is very warm).\n" +
        "- Put the third word into the same sentence and look for the option that completes it.\n" +
        "- Keep the same kind of word: a verb pairs with a verb, an adjective with an adjective.\n" +
        "- **Fast route:** when the link is 'opposite', first strike out every option that means the same as the third word. SSC usually prints two or three near synonyms as traps, so one or two options are left.",
      authoredExample: {
        prompt: "Brave : Fearless :: Weary : ?  Options: Fresh, Tired, Eager, Strong.",
        steps: [
          "Sentence for the pair: fearless means the same as brave. The link is same meaning.",
          "Same meaning as weary: tired.",
          "Check the others: fresh is the opposite of weary, and eager and strong are unrelated.",
        ],
        answer: "Tired",
      },
      selfCheckExample: {
        prompt: "Generous : Mean :: Humble : ?  Options: Modest, Proud, Simple, Polite.",
        steps: [
          "A mean person is the opposite of a generous one. The link is opposite meaning.",
          "Strike out the near synonyms of humble: modest and simple.",
          "Polite is unrelated. The opposite of humble is proud.",
        ],
        answer: "Proud",
      },
      practiceSet: [
        { prompt: "Rapid : Swift :: Ancient : ?", answer: "Old", method: "Same meaning." },
        { prompt: "Expand : Shrink :: Victory : ?", answer: "Defeat", method: "Opposite meaning." },
        { prompt: "Warm : Hot :: Cool : ?", answer: "Cold", method: "The second word is the stronger form of the first." },
        { prompt: "Begin : Start :: End : ?", answer: "Finish", method: "Same meaning." },
      ],
      pyqExampleId: "eb3f6a45-f1f3-4ebf-ab31-f590feb1573f",
      traps: [
        {
          title: "Picking the near synonym when the pair is opposite",
          body:
            "In 'Fast : Slow :: Loud : ?', the option Noisy is there because it sits close to loud. The pair is a pair of opposites, so the answer is Quiet.",
        },
        {
          title: "Stopping at 'they are related'",
          body:
            "Two words can be related in more than one way. Name the exact link (same, opposite or stronger) so that an option which fits only a looser link is ruled out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranwd-work",
      name: "Who uses what, and where",
      intuition:
        "Many pairs join a person or a tool with the job it does, the place where it works or the thing it measures. One short sentence with a verb in it names the link: 'a pilot works in a cockpit'.",
      definition:
        "- **Tool and use**: a saw cuts, a spade digs.\n" +
        "- **Worker and workplace**: a teacher works in a school.\n" +
        "- **Worker and what he makes**: an author writes a book.\n" +
        "- **Instrument and what it measures**: a barometer measures air pressure.\n" +
        "- **Specialist and what he treats**: a dentist treats teeth.\n" +
        "- **Thing and where it is worn or kept**: a ring is worn on a finger.\n" +
        "- Keep the order. If the first word is the tool, the third word is a tool too, and the answer is its use. In 'select the word pair' questions a reversed pair (use first, tool second) is a common wrong option.",
      authoredExample: {
        prompt: "Select the pair that has the same link as Pen : Write. Options: (a) Paint : Brush (b) Knife : Cut (c) Book : Read (d) Ink : Pen.",
        steps: [
          "Sentence: a pen is the tool used to write. The link is tool and its use, in that order.",
          "Knife : Cut: a knife is the tool used to cut. It fits.",
          "Paint : Brush puts the material before the tool, a book is not a tool, and Ink : Pen is a material and the thing that holds it.",
        ],
        answer: "(b) Knife : Cut",
      },
      selfCheckExample: {
        prompt: "Pilot : Cockpit :: Chef : ?  Options: Food, Kitchen, Menu, Waiter.",
        steps: [
          "A pilot works in a cockpit: worker and workplace.",
          "A chef works in a kitchen. Food is what a chef makes, which is a different link.",
        ],
        answer: "Kitchen",
      },
      practiceSet: [
        { prompt: "Barometer : Air pressure :: Odometer : ?", answer: "Distance travelled", method: "Instrument and what it measures." },
        { prompt: "Dentist : Teeth :: Neurologist : ?", answer: "Nerves (the nervous system)", method: "Specialist and what he treats." },
        { prompt: "Ring : Finger :: Earring : ?", answer: "Ear", method: "Thing and where it is worn." },
        { prompt: "Author : Book :: Composer : ?", answer: "Music", method: "Worker and what he makes." },
      ],
      pyqExampleId: "0eab30a2-04e6-43fd-86d6-f22cb7cf09fa",
      traps: [
        {
          title: "The right words in the wrong order",
          body:
            "If the given pair is Saw : Cut, the option Cut : Saw has the same two kinds of word but the wrong order. The answer pair must also put the tool first and the use second.",
        },
        {
          title: "Workplace or product?",
          body:
            "Teacher : School is a worker and a workplace; Teacher : Lesson is a worker and what he gives. Fix which link the given pair uses before you choose, because SSC often prints both kinds among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranwd-kind",
      name: "Kinds, young ones and what things come from",
      intuition:
        "Another family of pairs links a thing with its group, an animal with its young, a source with what it gives, or a cause with what it causes. The sentence is 'a rose is a kind of flower' or 'a cub is a young lion'.",
      definition:
        "- **Member and class**: a sparrow is a kind of bird.\n" +
        "- **Adult and young**: a lion has a cub, a goat a kid, a frog a tadpole.\n" +
        "- **Male and female**: a lion and a lioness, a bull and a cow.\n" +
        "- **Source and product**: a bee gives honey, wheat gives flour.\n" +
        "- **Organ and sense**: the eye is the organ of sight, the tongue of taste.\n" +
        "- **Lack and disease**: a lack of vitamin C causes scurvy, a lack of iodine causes goitre.\n" +
        "- Say which way the pair points: from the bigger group to the member, or from the member to the group. The answer must point the same way.",
      authoredExample: {
        prompt: "Lion : Cub :: Frog : ?  Options: Pond, Tadpole, Toad, Larva.",
        steps: [
          "A cub is the young of a lion: adult and young.",
          "The young of a frog is a tadpole.",
          "A pond is where a frog lives, a toad is a different animal, and larva is the young of an insect.",
        ],
        answer: "Tadpole",
      },
      selfCheckExample: {
        prompt: "Vitamin C : Scurvy :: Vitamin D : ?  Options: Night blindness, Rickets, Beriberi, Goitre.",
        steps: [
          "A lack of vitamin C causes scurvy: the link is lack and the disease it causes.",
          "A lack of vitamin D causes rickets. Night blindness comes from a lack of vitamin A, beriberi from a lack of vitamin B1 and goitre from a lack of iodine.",
        ],
        answer: "Rickets",
      },
      practiceSet: [
        { prompt: "Rose : Flower :: Mango : ?", answer: "Fruit", method: "Member and class." },
        { prompt: "Goat : Kid :: Dog : ?", answer: "Puppy", method: "Adult and young." },
        { prompt: "Ear : Hearing :: Tongue : ?", answer: "Taste", method: "Organ and sense." },
        { prompt: "Cat : Kitten :: Cow : ?", answer: "Calf", method: "Adult and young." },
      ],
      pyqExampleId: "c7ce5f15-228f-42d3-825b-9a7ac78b5af5",
      traps: [
        {
          title: "The young of a different animal",
          body:
            "A pup is the young of a dog, a foal of a horse, a calf of a cow. SSC puts the young of another animal among the options, so match the animal the question names, not any young one.",
        },
        {
          title: "Kind of, or part of?",
          body:
            "A rose is a kind of flower; a petal is a part of a flower. The two links look alike, so check which one the given pair uses before you pick.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscranwd-facts",
      name: "General-knowledge pairs SSC has asked",
      intuition:
        "Some analogies test a fact rather than a link of meaning: a unit, a capital, a river, a national symbol. Name the link first. Then you either know the matching fact, or you can strike out options by facts you do know.",
      definition:
        "- The link is still the first step: 'the joule is the SI unit of energy' tells you the answer is an SI unit.\n" +
        "- Strike out options that break the link outright: a city that is not a capital, a unit of another quantity, a river in another country.\n" +
        "- The table lists links and facts from the bank's own questions.",
      table: {
        columns: ["Link", "Word", "Its pair"],
        rows: [
          { cells: ["SI unit", "Energy", "Joule"] },
          { cells: ["SI unit", "Frequency", "Hertz"] },
          { cells: ["SI unit", "Electric current", "Ampere"] },
          { cells: ["SI unit", "Illuminance", "Lux"] },
          { cells: ["SI unit", "Force", "Newton"] },
          { cells: ["Capital", "Portugal", "Lisbon"] },
          { cells: ["Capital", "New Zealand", "Wellington"] },
          { cells: ["Capital", "Ethiopia", "Addis Ababa"] },
          { cells: ["Capital", "Australia", "Canberra"] },
          { cells: ["Capital", "Turkey", "Ankara"] },
          { cells: ["National animal", "India", "Royal Bengal tiger"] },
          { cells: ["National bird", "India", "Peacock"] },
          { cells: ["National bird", "Australia", "Emu"] },
          { cells: ["Chief river", "Egypt", "Nile"] },
          { cells: ["Chief river", "Myanmar", "Irrawaddy"] },
          { cells: ["Known for", "Kaziranga National Park", "One-horned rhinoceros"] },
          { cells: ["Known for", "Gir National Park", "Asiatic lion"] },
          { cells: ["Known for", "Periyar (Kerala)", "Elephants"] },
          { cells: ["Tournament", "Duleep Trophy", "Cricket"] },
          { cells: ["Tournament", "Durand Cup", "Football"] },
          { cells: ["Tournament", "Aga Khan Cup", "Hockey"] },
          { cells: ["Study of", "Botany", "Plants"] },
          { cells: ["Study of", "Conchology", "Shells"] },
          { cells: ["Study of", "Dermatology", "Skin"] },
          { cells: ["Study of", "Ophthalmology", "Eyes"] },
        ],
      },
      selfCheckExample: {
        prompt: "New Zealand : Wellington :: Ethiopia : ?",
        steps: [
          "Wellington is the capital of New Zealand: country and capital.",
          "The capital of Ethiopia is Addis Ababa.",
        ],
        answer: "Addis Ababa",
      },
      practiceSet: [
        { prompt: "Lux is the SI unit of which quantity?", answer: "Illuminance" },
        { prompt: "Durand Cup : Football :: Duleep Trophy : ?", answer: "Cricket" },
        { prompt: "Gir National Park is best known for which animal?", answer: "The Asiatic lion" },
        { prompt: "Conchology is the study of what?", answer: "Shells" },
      ],
      pyqExampleId: "6c5850a5-3662-49fc-926a-c4ee010b0590",
      traps: [
        {
          title: "The biggest city is not always the capital",
          body:
            "Istanbul is Turkey's biggest city but its capital is Ankara; Sydney is Australia's biggest city but its capital is Canberra. SSC prints the famous city as a trap.",
        },
        {
          title: "A unit of the wrong quantity",
          body:
            "The newton is the unit of force and the joule the unit of energy. An option that pairs a quantity with another quantity's unit looks right at a glance, so read both halves of every pair.",
        },
      ],
    },
  ],
};
