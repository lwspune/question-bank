import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SO_HEARING_NOTE: SubtopicNote = {
  subtopicName: "Hearing, Speech and Uses of Sound",
  title: "Hearing, Speech and Uses of Sound",
  oneLineDefinition:
    "We speak when our vocal cords vibrate and hear when the ear passes vibrations from the eardrum through three tiny bones to the inner ear; reflected sound and ultrasound are put to work in halls, hospitals and ships.",
  whyItMatters:
    "Four questions in the bank, all EASY: what vibrates in the voice box, what the three bones of the middle ear do, why a curved soundboard stands behind a stage, and which waves echocardiography uses. Each is a single fact, and the two tables below hold all of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spisohe-ear",
      name: "How we speak and how we hear",
      intuition:
        "Speaking and hearing are both about vibrations. In the throat, stretched cords vibrate to make sound; in the ear, a thin skin vibrates when sound arrives, and a chain of tiny bones passes those vibrations inwards, making them stronger on the way.",
      definition:
        "- Our voice comes from the **vocal cords**, two stretched folds in the **voice box (larynx)**, which vibrate as air from the lungs passes.\n" +
        "- In the ear, the **eardrum** vibrates first. The three bones of the **middle ear** (hammer, anvil, stirrup) **amplify** the vibrations; they do not change the pitch or frequency.\n" +
        "- The **cochlea** in the inner ear turns vibrations into electrical signals, which the **auditory nerve** carries to the brain.",
      table: {
        columns: ["Part", "Its job"],
        rows: [
          { cells: ["Vocal cords (in the larynx)", "Vibrate to make the voice"] },
          { cells: ["Pinna (outer ear)", "Collects sound and sends it down the ear canal"] },
          { cells: ["Eardrum", "A thin membrane that vibrates when sound reaches it"] },
          {
            cells: ["Hammer, anvil and stirrup (middle ear)", "Amplify the vibrations and pass them to the inner ear"],
            noteAmber: "The stirrup is the smallest bone in the body.",
          },
          { cells: ["Cochlea (inner ear)", "Turns vibrations into electrical signals"] },
          { cells: ["Auditory nerve", "Carries the signals to the brain"] },
        ],
        caption: "Outer ear collects, middle ear amplifies, inner ear converts.",
      },
      selfCheckExample: {
        prompt: "Which part of the ear turns vibrations into electrical signals for the brain?",
        steps: ["The vibrations are passed to the inner ear.", "There the cochlea turns them into electrical signals."],
        answer: "The cochlea",
      },
      practiceSet: [
        { prompt: "In which organ are the vocal cords found?", answer: "The larynx (voice box)" },
        { prompt: "Which part of the ear vibrates first when sound arrives?", answer: "The eardrum" },
        { prompt: "Which nerve carries sound signals to the brain?", answer: "The auditory nerve" },
        { prompt: "Name the three bones of the middle ear.", answer: "Hammer, anvil and stirrup" },
      ],
      pyqExampleId: "fad4384b-6895-4bac-8749-6b732b6fb3de",
      traps: [
        {
          title: "The middle ear bones raise the pitch",
          body: "The three bones only make the vibrations stronger. The frequency, and so the pitch, stays the same.",
        },
        {
          title: "The eardrum makes the voice",
          body: "The eardrum vibrates when we HEAR. When we speak, it is the vocal cords in the larynx that vibrate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spisohe-uses",
      name: "Uses of reflected sound and ultrasound",
      intuition:
        "Sound bounces off hard surfaces just as light does off a mirror, so curved boards and ceilings can steer it round a hall. Ultrasound, too high for us to hear, bounces back from things we cannot see, so its echoes can draw a picture of a heart or the sea bed.",
      definition:
        "- A **curved soundboard** stands behind the stage with the speaker near its focus. It **reflects** the sound so it spreads **evenly across the hall**.\n" +
        "- An **echo** is a reflected sound heard separately. The ear keeps a sound for about 0.1 s, so in air the wall must be at least about **17 m** away.\n" +
        "- **Ultrasound** (above 20 kHz) gives images and measures distances from its echoes.",
      table: {
        columns: ["Use", "How sound is used"],
        rows: [
          { cells: ["Curved soundboard, curved ceiling", "Reflect sound evenly to every part of a hall"] },
          { cells: ["Megaphone, horn", "Reflections send the sound forward in one direction"] },
          { cells: ["Stethoscope", "The heartbeat's sound is reflected along the tube to the ear"] },
          {
            cells: ["Echocardiography", "Ultrasound echoes give an image of the heart"],
            noteAmber: "Ultrasound, not X-rays.",
          },
          { cells: ["Ultrasonography", "Ultrasound images of organs and of a baby in the womb"] },
          { cells: ["SONAR", "Ultrasound echoes find the depth of the sea and locate submarines"] },
          { cells: ["Bats", "Find their way and their prey by ultrasound echoes"] },
        ],
        caption: "Reflected sound is used in halls; ultrasound echoes are used in hospitals and at sea.",
      },
      selfCheckExample: {
        prompt: "Why is the ceiling of a concert hall often made curved?",
        steps: ["A curved surface reflects sound.", "Its shape sends the reflected sound to every part of the hall."],
        answer: "So that reflected sound reaches all parts of the hall evenly",
      },
      practiceSet: [
        { prompt: "What kind of sound does SONAR use?", answer: "Ultrasound" },
        { prompt: "About how far away must a wall be for an echo to be heard in air?", answer: "At least about 17 m" },
        { prompt: "How do bats find their way in the dark?", answer: "By the echoes of the ultrasound they send out" },
        { prompt: "Which waves give the image of a baby in its mother's womb?", answer: "Ultrasound waves" },
      ],
      pyqExampleId: "304f0fcf-2b02-4c15-87a4-1263e5539531",
      traps: [
        {
          title: "A soundboard absorbs sound",
          body: "A soundboard reflects sound, and its curve spreads it across the whole width of the hall, not to one spot.",
        },
        {
          title: "Heart scans use X-rays",
          body: "Echocardiography uses ultrasound echoes. Infrasound cannot form an image, and no X-rays are used.",
        },
        {
          title: "Expecting an echo from a near wall",
          body: "A wall closer than about 17 m sends the sound back within 0.1 s, so it merges with the original sound and no separate echo is heard.",
        },
      ],
    },
  ],
};
