import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SO_ECHO_NOTE: SubtopicNote = {
  subtopicName: "Echo, Ultrasound and Infrasound",
  title: "Echo, Ultrasound and Infrasound",
  oneLineDefinition:
    "An echo is a reflected sound heard separately, which needs the reflector at least about 17 m away; sound below 20 Hz is infrasound and above 20 kHz is ultrasound, which SONAR and medical scans use.",
  whyItMatters:
    "Eight questions in the bank, three EASY and five MODERATE. Three are echo sums or conditions (a SONAR depth, a boy clapping between two walls, the 0.1 s and 17.2 m rule) and one asks how sound moves inside a stethoscope. The other four sort animals by the sounds they hear or name the uses of ultrasound.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9soec-echo",
      name: "Echo and repeated reflection of sound",
      intuition:
        "Sound bounces off a hard surface like a ball off a wall. If the wall is far enough, the bounced sound comes back after your ear has finished hearing the first one, and you hear it again: an echo. The sound travels to the wall and back, so the distance it covers is twice the distance to the wall.",
      definition:
        "- An **echo** is a reflected sound heard separately from the original.\n" +
        "- The ear keeps the impression of a sound for about **0.1 s**, so the echo must arrive **after more than 0.1 s**.\n" +
        "- At 22 °C sound travels about 344 m/s, so in 0.1 s it goes 34.4 m there and back: the reflector must be at least **17.2 m** away.\n" +
        "- Time for an echo: \\(t = \\frac{2d}{v}\\). Depth found by **SONAR**: \\(d = \\frac{vt}{2}\\).\n" +
        "- **Repeated (multiple) reflection** carries sound along a tube: the **stethoscope**, megaphone and the curved soundboard behind a stage use it. Many reflections that merge into one long sound make **reverberation**.",
      formula: {
        label: "Echo",
        latex: "t = \\frac{2d}{v} \\qquad d = \\frac{vt}{2} \\qquad d_{min} = \\frac{v \\times 0.1}{2}",
        symbols: [
          { symbol: "t", meaning: "time between making the sound and hearing its echo, in seconds" },
          { symbol: "d", meaning: "distance to the reflecting surface, in metres" },
          { symbol: "v", meaning: "speed of sound in the medium, in m/s" },
        ],
      },
      authoredExample: {
        prompt: "A ship sends an ultrasonic pulse straight down and receives its echo from the sea bed 3 s later. Sound travels at 1500 m/s in sea water. How deep is the sea there?",
        steps: [
          "In 3 s the pulse travels \\(1500 \\times 3 = 4500\\) m, down and back up.",
          "The depth is half of that: \\(d = \\frac{4500}{2} = 2250\\) m.",
        ],
        answer: "2250 m",
      },
      selfCheckExample: {
        prompt: "A girl stands 102 m from a cliff and claps once. Sound travels at 340 m/s. After how long does she hear the echo?",
        steps: ["The sound goes \\(2 \\times 102 = 204\\) m.", "\\(t = \\frac{204}{340} = 0.6\\) s."],
        answer: "0.6 s",
      },
      practiceSet: [
        { prompt: "Sound travels at 330 m/s. What is the least distance from a wall at which a clap can be heard as a separate echo?", answer: "\\(\\frac{330 \\times 0.1}{2} = 16.5\\) m" },
        { prompt: "Can you hear a separate echo from a wall 10 m away if sound travels at 344 m/s?", answer: "No: the echo returns after \\(\\frac{20}{344} \\approx 0.06\\) s, less than 0.1 s" },
        { prompt: "How does the sound of a heartbeat reach the doctor's ears through a stethoscope?", answer: "By repeated reflection off the inner walls of the tube" },
        { prompt: "A boy stands between two walls, 85 m from one and 170 m from the other. Sound travels at 340 m/s. How far apart in time are the two echoes of his clap?", answer: "0.5 s and 1 s, so 0.5 s apart" },
      ],
      pyqExampleId: "651830c2-91fb-49b3-80be-fe56c7b11afe",
      traps: [
        {
          title: "Forgetting the return journey",
          body: "The sound goes to the reflector and comes back, so use 2d. A wall 170 m away at 340 m/s gives an echo after 1 s, not 0.5 s.",
        },
        {
          title: "Using 34.4 m as the least distance",
          body: "34.4 m is the distance there and back in 0.1 s. The reflector itself need only be half of that, 17.2 m, away.",
        },
        {
          title: "Thinking a stethoscope sends sound straight down the tube",
          body: "The sound bounces again and again off the inner walls of the tube. That repeated reflection keeps it from spreading out and fading.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9soec-ranges",
      name: "Infrasound, audible sound and ultrasound",
      intuition:
        "Our ears only pick up vibrations from about 20 to 20 000 times a second. Slower vibrations (infrasound) and faster ones (ultrasound) are all around us, and some animals hear them: elephants call each other with infrasound, and bats find their way with ultrasound.",
      definition:
        "- **Infrasound**: below **20 Hz**. Elephants, whales and rhinoceroses use or hear it; earthquakes give it out before the main shock.\n" +
        "- **Audible sound**: **20 Hz to 20 kHz** (20 000 Hz), the range of the human ear.\n" +
        "- **Ultrasound**: above **20 kHz**. Bats, dolphins, dogs and rats hear it. Bats and dolphins find objects by its echo (echolocation).\n" +
        "- **SONAR** (Sound Navigation And Ranging) is a **technique** that uses ultrasound to find the depth of the sea and objects under water.\n" +
        "- Ultrasound is also used in **sonography** (images inside the body), **echocardiography** (images of the heart), finding **cracks in metal**, cleaning, **welding plastic** and killing **microbes in milk**.",
      table: {
        columns: ["Kind of sound", "Frequency", "Who hears it or uses it"],
        rows: [
          { cells: ["Infrasound", "Below 20 Hz", "Elephants, whales, rhinoceroses; given out by earthquakes"] },
          { cells: ["Audible sound", "20 Hz to 20 kHz", "Humans (and most animals)"] },
          { cells: ["Ultrasound", "Above 20 kHz", "Bats, dolphins, dogs, rats; SONAR, sonography, echocardiography, industry"] },
        ],
        caption: "Ultrasound is not louder than ordinary sound: it simply vibrates too fast for us to hear.",
      },
      selfCheckExample: {
        prompt: "A trainer blows a whistle that people cannot hear, yet the dog comes running. What kind of sound does the whistle make?",
        steps: ["People hear up to about 20 kHz; dogs hear higher frequencies too."],
        answer: "Ultrasound (above 20 kHz)",
      },
      practiceSet: [
        { prompt: "What is the full form of SONAR?", answer: "Sound Navigation And Ranging" },
        { prompt: "Which kind of sound do elephants use to call each other over long distances?", answer: "Infrasound (below 20 Hz)" },
        { prompt: "What does echocardiography form an image of, using ultrasound?", answer: "The heart" },
        { prompt: "What is the highest frequency that a human ear can normally hear?", answer: "About 20 kHz (20 000 Hz)" },
      ],
      pyqExampleId: "2751b522-4e2e-4026-858c-aee696dafbe9",
      traps: [
        {
          title: "Calling SONAR a kind of sound",
          body: "SONAR is a technique that uses ultrasound. When an option offers both 'ultrasound' and 'SONAR' for the uses of a sound, the sound is ultrasound.",
        },
        {
          title: "Giving elephants ultrasound",
          body: "Elephants use infrasound, below 20 Hz. Bats and dolphins are the ones that use ultrasound.",
        },
        {
          title: "Thinking ultrasound means a loud sound",
          body: "Ultrasound is about frequency, not loudness: it is any sound above 20 kHz, however soft.",
        },
      ],
    },
  ],
};
