import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_RDC_NEGATIVE_NOTE: SubtopicNote = {
  subtopicName: "Negative and Cause Questions",
  title: "Negative Stems, Causes and Half-Right Options",
  oneLineDefinition:
    "Some stems ask for the one option the text does not support, and some ask why something happens; both reward checking every part of every option.",
  whyItMatters:
    "The 2024 paper asked which statement CANNOT be inferred, and the 2025 paper which statement is NOT correct. The 2026 paper asked twice for the reason or main cause the author gives, with options that were right in one half and wrong in the other.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-rdc-negative",
      name: "Negative stems: CANNOT be inferred, NOT correct, EXCEPT",
      intuition:
        "A negative stem turns the task upside down: four options are supported, and the answer is the odd one out. Under time pressure, students forget the NOT halfway through and choose the first statement they find in the text. Labelling every option stops that.",
      definition:
        "- Negative stems: 'Which CANNOT be inferred', 'Which is NOT correct', 'All of the following are stated EXCEPT', 'Which is NOT consistent with the text'.\n" +
        "- **Method**: label each option **Y** (the text supports it) or **N** (the text contradicts it or does not support it). Exactly one should be N, and that is the answer.\n" +
        "- If you find **two Ns**, one of your Ys is wrong, or one of your Ns: reread both candidates against their lines.\n" +
        "- 'CANNOT be inferred' covers options the text **contradicts** and options it simply **does not support**.\n" +
        "- Before reading the options, say the task to yourself in plain words: 'find the one the text does not back up'.",
      authoredExample: {
        prompt:
          "Before the 1840s, surgery was performed on patients who were fully awake, so surgeons valued speed above all, and few operations went deeper than the limbs. In 1846, at a hospital in Boston, the dentist William Morton gave a patient ether vapour to breathe before a tumour was removed from his neck, and the patient later said he had felt no pain. News of the demonstration reached Europe within months. Chloroform, introduced a year later, was easier to use but proved more dangerous to the heart. Anaesthesia allowed longer and more careful operations, although without antiseptic methods many patients still died of infection afterwards.\n\n" +
          "Which of the following CANNOT be inferred from the text?\n" +
          "(A) Before ether was used, operations had to be fast.\n" +
          "(B) The 1846 demonstration was soon known outside America.\n" +
          "(C) Chloroform came into use in 1847.\n" +
          "(D) After 1846, deaths after surgery fell almost to zero.\n" +
          "(E) Anaesthesia made longer operations possible.",
        steps: [
          "Task in plain words: find the one the text does not back up. Label each option.",
          "A: 'surgeons valued speed above all' because patients were awake. Y.",
          "B: news 'reached Europe within months'. Y.",
          "C: chloroform was 'introduced a year later' than 1846, so 1847. Y (an inference by arithmetic).",
          "D: the last sentence says many patients 'still died of infection afterwards'. The text contradicts it. N.",
          "E: 'Anaesthesia allowed longer and more careful operations.' Y. One N: the answer is D.",
        ],
        answer: "(D) After 1846, deaths after surgery fell almost to zero.",
      },
      selfCheckExample: {
        prompt:
          "When Dmitri Mendeleev published his periodic table in 1869, he arranged the known elements mainly in order of atomic weight, placing elements with similar properties in the same column. Where the pattern seemed to require it, he left gaps, and he predicted the properties of elements that had not yet been discovered. Gallium, found in 1875, and germanium, found in 1886, matched his predictions closely. In a few places he also placed an element out of weight order because its properties fitted better elsewhere. Only in the twentieth century was it shown that atomic number, not atomic weight, is the true basis of the order.\n\n" +
          "Which of the following is NOT supported by the text?",
        options: [
          "Mendeleev knew that atomic number is the true basis of the periodic order.",
          "Mendeleev predicted the existence of elements that were unknown in 1869.",
          "Germanium was discovered after gallium.",
          "Mendeleev sometimes let chemical properties override the order of atomic weight.",
          "Elements in the same column of his table had similar properties.",
        ],
        steps: [
          "Label each option Y or N.",
          "A: the last sentence says the role of atomic number was shown 'only in the twentieth century', long after 1869. N.",
          "B: he 'predicted the properties of elements that had not yet been discovered'. Y. C: 1886 is after 1875. Y.",
          "D: he placed some elements 'out of weight order because its properties fitted better elsewhere'. Y. E: similar properties 'in the same column'. Y.",
          "One N. Choosing B, C, D or E means answering the opposite question.",
        ],
        answer: "(A) Mendeleev knew that atomic number is the true basis of the periodic order.",
      },
      practiceSet: [
        {
          prompt: "A stem says 'All of the following are stated in the text EXCEPT'. How many of the options are stated?",
          answer: "Four. The answer is the one that is not.",
        },
        {
          prompt: "You marked two options N on a 'which is NOT correct' question. What do you do?",
          answer: "Reread both against the text: one of them is actually supported.",
        },
        {
          prompt: "Does 'CANNOT be inferred' include an option that the text contradicts?",
          answer: "Yes: a statement the text contradicts certainly cannot be inferred from it.",
        },
      ],
      traps: [
        {
          title: "Forgetting the NOT halfway through",
          body: "In a negative question the four options you can find in the text are the wrong answers. A student who reads an option, finds it in the passage and chooses it has answered the opposite question. Write Y or N next to every option and choose the single N.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-cause",
      name: "Cause and reason questions: finding the author's own explanation",
      intuition:
        "A 'why' question asks for the reason the text gives, not a reason that merely sounds sensible. Texts mark causes with small words: because, since, so, led to, due to. Wrong options reverse cause and effect, give the cause of a different event in the passage, or turn one of several factors into the only one.",
      definition:
        "- Find the **signal words**: because, since, as, so, therefore, thus, led to, resulted in, due to, owing to, the reason is, this is why.\n" +
        "- Identify the **effect** the question asks about, then find the cause the text attaches to **that** effect.\n" +
        "- Wrong options: **reverse** cause and effect; give the cause of a **different** effect in the passage; give a second **effect** of the same cause; turn **one of several** factors into the only one; offer a cause the reader might believe but the text never states.\n" +
        "- 'Primarily', 'mainly' and 'above all' in a stem ask for the cause the text **ranks first**. Look for ranking words in the text: above all, mainly, chiefly, the main reason.",
      authoredExample: {
        prompt:
          "The dodo, a large flightless pigeon, lived only on the island of Mauritius. Having evolved without land predators, it nested on the ground and showed little fear of people. Dutch sailors began to visit the island in 1598 and hunted the birds for food, but historians now think that hunting alone did not finish them off. The sailors also brought rats, pigs and monkeys, which ate the dodo's eggs and chicks, and forests were cleared for settlement. The last widely accepted sighting dates from 1662. Because the dodo laid a single egg at a time, its numbers could not recover quickly from these losses.\n\n" +
          "According to the text, why were the dodo's losses hard to make up?\n" +
          "(A) Because sailors hunted the birds for food.\n" +
          "(B) Because each bird laid only one egg at a time.\n" +
          "(C) Because the dodo could not fly.\n" +
          "(D) Because the dodo lived only on Mauritius.\n" +
          "(E) Because forests were cleared for settlement.",
        steps: [
          "The effect asked about: the numbers could not recover. Find the cause attached to that effect.",
          "The last sentence: 'Because the dodo laid a single egg at a time, its numbers could not recover quickly.' That is the text's own 'because'. B.",
          "A and E are causes of a different effect: the losses themselves, not the slow recovery.",
          "C and D are facts from the passage, but the text never links them to the slow recovery.",
        ],
        answer: "(B) Because each bird laid only one egg at a time.",
      },
      selfCheckExample: {
        prompt:
          "Many animals that are active at night, such as cats and deer, have a reflective layer behind the retina called the tapetum lucidum. Light that passes through the retina without being absorbed is reflected back through it, so the light-sensitive cells get a second chance to catch it. This is why these animals see well in dim light, and why their eyes seem to glow when a torch or car headlight shines on them. The advantage has a cost: some of the reflected light scatters, so images are slightly less sharp. Humans lack this layer, which is one reason our night vision is poor.\n\n" +
          "According to the text, the eyes of a cat seem to glow in a car's headlights because:",
        options: [
          "the cat's eyes produce their own light when the animal is active at night.",
          "the images formed in the cat's eye are less sharp.",
          "the cat has more light-sensitive cells than a human.",
          "the cat sees well in dim light.",
          "light is reflected back by a layer behind the retina.",
        ],
        steps: [
          "Signal words: 'This is why ... their eyes seem to glow'. 'This' points back to the reflection of light by the layer behind the retina. E.",
          "A is a wrong mechanism: the text says the light is reflected, not produced.",
          "B is an effect of the scattering, not the cause of the glow. D is a second effect of the same cause: good night vision and the glow both come from the reflection, so one is not the cause of the other.",
          "C is not in the text.",
        ],
        answer: "(E) light is reflected back by a layer behind the retina.",
      },
      practiceSet: [
        {
          prompt: "Text: 'As fuel prices rose, more people took the train.' Which is the cause and which the effect?",
          answer: "Cause: rising fuel prices. Effect: more people taking the train.",
        },
        {
          prompt: "Text: 'Heavy rain, together with blocked drains, flooded the street.' Does 'The street flooded because of heavy rain' give the whole cause?",
          answer: "No: the text gives two causes acting together, and the option keeps only one.",
        },
        {
          prompt: "Name four words that often mark a cause in a text.",
          answer: "For example: because, since, due to, led to (also owing to, as a result of).",
        },
      ],
      traps: [
        {
          title: "Reversing cause and effect",
          body: "If a text says that a shortage of nurses led to longer waiting lists, an option saying that long waiting lists caused the shortage reverses it. Find which event the text puts first in the chain, and check that the option keeps the same order.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-half-right",
      name: "Options that are only half right",
      intuition:
        "Long options are often two claims joined by 'and', 'because', 'where' or 'both'. If one half is wrong, the whole option is wrong. A favourite design puts the correct idea at the start of several options and changes only the ending, so the student who stops reading halfway picks a wrong one.",
      definition:
        "- Split a long option at **and, because, so, where, which, both ... and, as well as**.\n" +
        "- Check **each part** against the text. One unsupported part makes the whole option wrong.\n" +
        "- When several options share the same opening, the difference is in the endings: compare only the endings.\n" +
        "- An option that adds a **second cause** ('both X and Y') is wrong if the text names only X, or says Y does something else.\n" +
        "- An extra **detail** the text never mentions (a place, a group, a date) is enough to rule an option out.",
      authoredExample: {
        prompt:
          "In 1816 the French physician René Laennec was examining a young woman with heart trouble. Placing an ear directly on the patient's chest was the usual method, but he found it improper in this case and, in any event, of little use because of her build. He rolled a sheet of paper into a tube, put one end to her chest and the other to his ear, and heard the heartbeat more clearly than ever before. He went on to build wooden tubes and spent three years linking the sounds he heard to the diseases he later found at autopsy. His book of 1819 made listening to the chest a standard part of examination.\n\n" +
          "According to the text, Laennec first used a paper tube because:\n" +
          "(A) direct listening seemed improper for this patient and would have helped little.\n" +
          "(B) direct listening seemed improper and he had already built wooden tubes.\n" +
          "(C) he wanted to link heart sounds with autopsy findings and to write a book.\n" +
          "(D) direct listening was the usual method and was forbidden by law.\n" +
          "(E) the patient asked him not to touch her and her heartbeat was very loud.",
        steps: [
          "Split each option into its two halves and check both.",
          "A: 'improper in this case' (yes) and 'of little use because of her build' (yes). Both halves supported.",
          "B: the first half is right, but the wooden tubes came after the paper tube ('He went on to build'). Wrong order, so wrong.",
          "C: both halves describe what he did later, not why he first rolled the paper.",
          "D: 'the usual method' is right; 'forbidden by law' is not in the text. E: neither half is in the text.",
        ],
        answer: "(A) direct listening seemed improper for this patient and would have helped little.",
      },
      selfCheckExample: {
        prompt:
          "The potato reached Europe from South America in the sixteenth century, but for a long time many Europeans grew it only as animal feed or as a curiosity. Its spread as a staple food in the eighteenth century had several causes. Wars and poor grain harvests made a crop that grew underground, out of reach of armies and less affected by bad weather, more attractive. Some rulers also promoted it: in Prussia, Frederick the Great ordered his subjects to plant it. Above all, a small field of potatoes fed far more people than the same field sown with wheat or rye.\n\n" +
          "According to the text, the potato became a staple food mainly because:",
        options: [
          "it was promoted by rulers and grew better than grain in cold climates.",
          "it reached Europe from South America and was seen as a curiosity.",
          "armies preferred to eat potatoes rather than grain.",
          "it fed many more people per field than wheat or rye did.",
          "it was used as animal feed and was protected from bad weather.",
        ],
        steps: [
          "'Mainly' asks for the cause the text ranks first. The ranking word in the text is 'Above all', which introduces the yield: a field of potatoes fed far more people. D.",
          "A: the first half is in the text (rulers promoted it); the second half, cold climates, is not. Half right means wrong.",
          "B and E: being a curiosity and animal feed is what the potato was before it became a staple, not why it became one. E's second half is right, its first half is not a cause.",
          "C: the text says the crop was out of reach of armies, not that armies preferred it.",
        ],
        answer: "(D) it fed many more people per field than wheat or rye did.",
      },
      practiceSet: [
        {
          prompt: "Text: 'The bridge was closed because of floods.' Option: 'The bridge was closed because of floods and repairs.' Supported?",
          answer: "No: the text gives one cause; the option adds a second.",
        },
        {
          prompt: "Three options begin with the same eight words. Where do you look?",
          answer: "At the endings: that is where they differ.",
        },
        {
          prompt: "Which small words often join two claims inside one option?",
          answer: "and, because, both ... and, where, which, as well as.",
        },
      ],
      traps: [
        {
          title: "One correct half does not make an option correct",
          body: "An option that starts with the text's exact idea and then adds something the text never says is wrong. Read every option to its last word; the error is often in the final few words.",
        },
      ],
    },
  ],
};
