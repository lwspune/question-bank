import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_SO_HEARING_NOTE: SubtopicNote = {
  subtopicName: "Pitch, Echo and Uses of Sound",
  title: "Pitch, Echo and Uses of Sound",
  oneLineDefinition:
    "What decides pitch and loudness, how the ear responds, the octave, how to find a distance from an echo, and how ultrasound is made and used.",
  whyItMatters:
    "Eight CDS questions from 2016 (II) to 2023 (I). Four are about pitch and hearing, two are the same echo sum (340 m/s and 5 s, asked in 2019 (II) and 2023 (I)), and two ask how ultrasound is made or what a microphone and a speaker do.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphso-pitch",
      name: "Pitch, loudness and the human ear",
      intuition:
        "Two sounds can differ in three ways. One can be shriller than the other: that is pitch, and it comes from the frequency. One can be louder: that is loudness, and it comes from the amplitude, how far the particles swing. And a flute and a violin playing the same note still sound different: that is quality, which comes from the shape of the wave. The ear does not hear every frequency equally well, and it judges loudness on a stretched, logarithmic scale.",
      definition:
        "Three characteristics of a sound:\n" +
        "- **Pitch** depends on **frequency**: higher frequency, shriller sound. A woman's voice usually has a higher pitch than a man's.\n" +
        "- **Loudness** depends on **amplitude** (and so on intensity). Loudness level is measured in **decibels (dB)**.\n" +
        "- **Quality (timbre)** depends on the **waveform**, the mix of overtones.\n" +
        "- **Octave**: a note one octave higher has **twice the frequency**.\n" +
        "- **Audible range**: about **20 Hz to 20 kHz** for humans. Below 20 Hz is **infrasound**, above 20 kHz is **ultrasound**.\n" +
        "- **The ear** is most sensitive at about 2 to 5 kHz and much less sensitive at very low and very high frequencies. Its response to rising intensity is roughly **logarithmic**, which is why the decibel scale is used.",
      table: {
        columns: ["Characteristic of sound", "Depends on"],
        rows: [
          {
            cells: ["Pitch", "Frequency"],
            noteAmber: "Asked twice: CDS 2020 (I) and 2022 (II). The answer is frequency, never amplitude or speed.",
            pyqExampleId: "a5fcdcd0-12b8-4d21-b4a6-01120dbce823",
          },
          { cells: ["Loudness", "Amplitude"] },
          { cells: ["Quality (timbre)", "Waveform"] },
          {
            cells: ["One octave higher", "Double the frequency"],
            noteAmber: "CDS 2019 (II): the note an octave above 500 Hz is 1000 Hz.",
            pyqExampleId: "890cd502-f076-44a4-98ea-b406dbf58abb",
          },
          {
            cells: ["Sensitivity of the ear", "Varies with frequency; best near 2 to 5 kHz"],
            noteAmber: "CDS 2016 (II): the statement that the ear's sensitivity does not vary with frequency is the false one.",
            pyqExampleId: "b24155fc-bd76-411b-84a7-ee28ffcbd4d4",
          },
        ],
      },
      pyqExampleId: "a5fcdcd0-12b8-4d21-b4a6-01120dbce823",
      selfCheckExample: {
        prompt: "A guitar string is plucked harder without changing its tension or length. Which characteristic of the sound changes, and which stays the same?",
        steps: [
          "Plucking harder makes the string swing further, so the amplitude grows: the sound is louder.",
          "The tension and length decide how fast the string vibrates, and they have not changed, so the frequency and the pitch stay the same.",
        ],
        answer: "The loudness increases; the pitch stays the same.",
      },
      practiceSet: [
        { prompt: "Which property of a sound wave decides its loudness?", answer: "Amplitude" },
        { prompt: "What is the frequency of a note one octave above 440 Hz?", answer: "880 Hz" },
        { prompt: "What is the range of frequencies a human ear can hear?", answer: "About 20 Hz to 20 kHz" },
        { prompt: "In which unit is the loudness level of a sound measured?", answer: "Decibel (dB)" },
      ],
      traps: [
        {
          title: "Pitch is frequency; loudness is amplitude",
          body: "A high-pitched sound is not a loud sound. **Pitch** goes with **frequency**, **loudness** with **amplitude**. Speed, wavelength and intensity are distractors in a pitch question.",
        },
        {
          title: "An octave doubles the frequency; it does not add to it",
          body: "One octave up means \\(2f\\), two octaves up means \\(4f\\). Adding half (500 to 750 Hz) or quadrupling for one octave are the usual wrong options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphso-echo",
      name: "Echo: finding a distance from the time",
      intuition:
        "An echo is a sound that bounces off a far surface, like a cliff or a large building, and comes back to you. The time you measure is for the trip there and back. So the distance to the cliff is only half of speed × time. This one halving is what every echo question tests.",
      definition:
        "Echo facts:\n" +
        "- The sound goes to the reflector **and comes back**, a path of \\(2d\\).\n" +
        "- So \\(2d = v\\,t\\), which gives \\(d = \\dfrac{v\\,t}{2}\\).\n" +
        "- The ear keeps a sound for about **0.1 s**, so an echo is heard separately only if it returns after at least 0.1 s. At 344 m/s that needs the reflector to be at least about **17.2 m** away.\n" +
        "- **Reverberation**: many reflections in a large hall that keep the sound going. Curtains, carpets and soft boards absorb sound and reduce it.\n" +
        "- The same halving gives the depth of the sea from a SONAR pulse.",
      formula: {
        label: "Distance from an echo",
        latex: "d = \\frac{v\\,t}{2}",
        symbols: [
          { symbol: "d", meaning: "distance to the reflecting surface" },
          { symbol: "v", meaning: "speed of sound" },
          { symbol: "t", meaning: "time from the sound to the echo (there and back)" },
        ],
      },
      authoredExample: {
        prompt: "A boy shouts in front of a tall building and hears the echo 3 s later. Sound travels at 330 m/s. How far away is the building?",
        steps: [
          "In 3 s the sound covers \\(330 \\times 3 = 990\\) m.",
          "That path is to the building and back, twice the distance.",
          "So \\(d = 990/2 = 495\\) m.",
        ],
        answer: "495 m.",
      },
      selfCheckExample: {
        prompt: "A ship sends an ultrasound pulse to the sea bed and receives the echo 1.2 s later. Sound travels at 1500 m/s in sea water. How deep is the sea?",
        steps: [
          "Total path: \\(1500 \\times 1.2 = 1800\\) m.",
          "Half of it is the depth: \\(1800/2 = 900\\) m.",
        ],
        answer: "900 m.",
      },
      pyqExampleId: "2b5e94d6-8af8-48a2-9fe4-37e91244f06b",
      practiceSet: [
        { prompt: "An echo returns 2 s after a clap. If sound travels at 340 m/s, how far is the wall?", answer: "340 m", method: "\\(340 \\times 2 / 2\\)" },
        { prompt: "A cliff is 660 m away and sound travels at 330 m/s. After how long is the echo heard?", answer: "4 s", method: "\\(2 \\times 660 / 330\\)" },
        { prompt: "For how long does the human ear keep the sensation of a sound?", answer: "About 0.1 s" },
        { prompt: "What is reverberation?", answer: "The persistence of sound in a hall because of repeated reflections" },
      ],
      traps: [
        {
          title: "Halve speed × time",
          body: "The echo time covers the trip **there and back**. Speed × time gives twice the distance. For 330 m/s and 4 s the full product, 1320 m, is the wrong option set beside the right one, 660 m.",
        },
        {
          title: "Watch the units in the options",
          body: "660 m is 0.66 km, not 6.6 km or 0.066 km. Convert the answer before matching it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphso-ultrasound",
      name: "Ultrasound, SONAR and transducers",
      intuition:
        "Ultrasound is sound pitched too high for us to hear. It can be aimed in a narrow beam and it bounces back from objects, so it is used to find the depth of the sea, to look inside the body and to clean small parts. It is made by a crystal that vibrates when a voltage is put across it. A device that turns one kind of signal into another, like a microphone, is called a transducer.",
      definition:
        "Making and using ultrasound:\n" +
        "- **Ultrasound**: frequency above **20 kHz**. Bats, dolphins and porpoises use it.\n" +
        "- **Production**: a **piezoelectric** crystal (such as quartz) vibrates at ultrasonic frequency when an alternating voltage is applied.\n" +
        "- **Uses**: SONAR (depth of the sea, finding submarines), ultrasound scanning of the body, cleaning small parts, detecting cracks in metal.\n" +
        "- **SONAR** stands for **Sound Navigation And Ranging**.\n" +
        "- **Transducers**: a **microphone** turns sound into an **electrical** signal; a **loudspeaker** turns an electrical signal back into sound.",
      table: {
        columns: ["Device or term", "What it does"],
        rows: [
          {
            cells: ["Piezoelectric crystal", "Produces ultrasound when an alternating voltage is applied"],
            noteAmber: "CDS 2017 (II): ultrasonic waves are produced using piezoelectric material.",
            pyqExampleId: "8599af1c-ac99-4ee8-a7b3-15000cdbc2c9",
          },
          { cells: ["SONAR", "Measures distance under water from the echo of ultrasound"] },
          { cells: ["Ultrasound scanner", "Forms images of organs inside the body"] },
          { cells: ["Microphone", "Sound to electrical signal"] },
          { cells: ["Loudspeaker", "Electrical signal to sound"] },
        ],
      },
      pyqExampleId: "a017d0d4-cf47-4545-92f5-01a7991dbe69",
      selfCheckExample: {
        prompt: "Why is ultrasound, rather than ordinary audible sound, used to scan an unborn baby?",
        steps: [
          "Ultrasound has a very short wavelength, so it can be sent as a narrow beam and reflects from small details inside the body.",
          "It is safe for the tissue at the levels used, unlike X-rays.",
          "The echoes from different tissues are turned into an image.",
        ],
        answer: "Its short wavelength gives a fine, directed beam whose echoes map the inside of the body safely.",
      },
      practiceSet: [
        { prompt: "Above what frequency is a sound called ultrasound?", answer: "20 kHz" },
        { prompt: "What does SONAR stand for?", answer: "Sound Navigation And Ranging" },
        { prompt: "Which crystal effect is used to produce ultrasound?", answer: "The piezoelectric effect" },
        { prompt: "Name an animal that finds its way using ultrasound.", answer: "The bat (also the dolphin)" },
      ],
      traps: [
        {
          title: "Piezoelectric, not pyroelectric or ferromagnetic",
          body: "Ultrasound generators use **piezoelectric** crystals, which vibrate under a voltage. Pyroelectric materials respond to heat, and ferromagnetic rods (magnetostriction) work only at much lower frequencies.",
        },
        {
          title: "Microphone and speaker both deal in electrical signals",
          body: "A microphone gives an **electrical** output, not a mechanical one, and a speaker takes an **electrical** input. The vibrating diaphragm inside is only a step on the way.",
        },
      ],
    },
  ],
};
