import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SO_NATURE_NOTE: SubtopicNote = {
  subtopicName: "Nature of Sound and the Voice",
  title: "Nature of Sound and the Voice",
  oneLineDefinition:
    "Sound is a longitudinal mechanical wave made by something vibrating: it needs a medium, and it carries energy, not matter, from place to place.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE: which wave is longitudinal, what a sound wave carries, what stays the same in the medium as the wave passes, why men, women and children sound different, and which instrument is the odd one out. Each is answered by knowing what vibrates and what the wave passes on.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sona-wave",
      name: "Sound as a mechanical, longitudinal wave",
      intuition:
        "Hit a drum and its skin moves in and out. Each push squeezes the air next to it, that air squeezes the next layer, and the squeeze travels outwards to your ear. The air itself only shakes back and forth about its place. What travels is the energy of the vibration.",
      definition:
        "- Sound is a **mechanical wave**: it needs a **medium** (a solid, liquid or gas) and cannot travel through a vacuum.\n" +
        "- It is **longitudinal**: the particles vibrate **along** the direction the wave travels, making **compressions** (squeezed regions) and **rarefactions** (stretched regions).\n" +
        "- As the wave passes, the **pressure** and **density** of the medium rise and fall from place to place, and **energy** passes from particle to particle.\n" +
        "- The particles do **not** travel with the wave and their **mass does not change**: a sound wave carries **energy**, not matter.",
      table: {
        columns: ["Wave", "Needs a medium?", "Type"],
        rows: [
          { cells: ["Sound", "Yes: a solid, liquid or gas", "Longitudinal: particles move along the wave"] },
          { cells: ["Light", "No: it crosses empty space from the Sun", "Transverse (electromagnetic)"] },
          { cells: ["Radio wave", "No", "Transverse (electromagnetic)"] },
          {
            cells: ["Wave along a stretched string", "Yes: the string", "Transverse: the string moves across the wave"],
            noteAmber: "A wave can need a medium and still be transverse.",
          },
        ],
        caption: "Of the waves in this table, only sound is longitudinal.",
      },
      selfCheckExample: {
        prompt: "An electric bell keeps ringing inside a glass jar while the air is pumped out of the jar. What happens to the sound you hear, and why?",
        steps: [
          "Sound needs a medium to travel from the bell to the glass and then to your ear.",
          "As the air is removed, there are fewer particles to pass the vibration on.",
        ],
        answer: "The sound grows fainter and almost stops, because sound cannot travel through a vacuum.",
      },
      practiceSet: [
        { prompt: "In which direction do the particles of air vibrate when a sound wave passes through it?", answer: "Back and forth along the direction in which the wave travels" },
        { prompt: "What is a region of squeezed air in a sound wave called?", answer: "A compression" },
        { prompt: "Can astronauts on the Moon talk to each other directly through the space between them?", answer: "No: there is no air on the Moon, so sound cannot travel. They use radio." },
        { prompt: "Does the mass of the air particles change while a sound wave passes through air?", answer: "No: only their pressure, density and energy change from place to place" },
      ],
      pyqExampleId: "065b8e2b-1860-4cb0-a42f-d799983ac459",
      traps: [
        {
          title: "Calling sound a transverse wave",
          body: "In sound the particles move back and forth along the path of the wave, so sound is longitudinal. Light, radio waves and a wave on a string are transverse.",
        },
        {
          title: "Thinking the air travels to your ear",
          body: "Each particle only vibrates about its place. The energy of the vibration is what reaches you, not the air near the source.",
        },
        {
          title: "Thinking light needs a medium",
          body: "Light and radio waves are electromagnetic waves and cross empty space. Only mechanical waves, such as sound, need a medium.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sona-sources",
      name: "How the voice and musical instruments make sound",
      intuition:
        "Every sound starts with something vibrating. In your throat it is the vocal cords; in a sitar it is a string; in a flute it is the air inside the tube; in a tabla it is the skin you strike. Longer, thicker or looser things vibrate more slowly and give a lower note.",
      definition:
        "- The human voice comes from **two vocal cords** stretched across the **larynx** (voice box). Air from the lungs makes them vibrate.\n" +
        "- Everyone has the same **number** of vocal cords. Their **length** differs: about **20 mm in men**, about **15 mm in women**, and shorter in children.\n" +
        "- Longer vocal cords vibrate more slowly, so a man's voice has a **lower pitch** and a child's voice the **highest**.\n" +
        "- Musical instruments are grouped by **what vibrates**: a string, a column of air, or a struck skin or body.",
      table: {
        columns: ["Family", "What vibrates", "Examples"],
        rows: [
          { cells: ["String instruments", "A stretched string", "Sitar, violin, guitar, veena"] },
          { cells: ["Wind instruments", "A column of air inside a tube", "Flute, trumpet, clarinet, shehnai"] },
          { cells: ["Percussion instruments", "A stretched skin, or a metal or wooden body that is struck", "Tabla, drum, tambourine, cymbals"] },
          { cells: ["The human voice", "Two vocal cords in the larynx", "Speech and singing"] },
        ],
        caption: "An odd-one-out question usually hides one instrument from a different family.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: sitar, violin, shehnai, veena.",
        steps: ["Sitar, violin and veena are string instruments.", "The shehnai is played by blowing: a column of air vibrates."],
        answer: "Shehnai",
      },
      practiceSet: [
        { prompt: "In which part of the throat are the vocal cords found?", answer: "In the larynx (voice box)" },
        { prompt: "Why is a child's voice higher in pitch than a man's voice?", answer: "A child's vocal cords are shorter, so they vibrate faster" },
        { prompt: "What vibrates when a flute is played?", answer: "The column of air inside the flute" },
        { prompt: "To which family of instruments do the tabla and the drum belong?", answer: "Percussion instruments" },
      ],
      pyqExampleId: "8f81fb76-0717-4b78-bc68-42658583d7ce",
      traps: [
        {
          title: "Different numbers of vocal cords",
          body: "Men, women and children all have two vocal cords. It is the length of the cords that differs, and so the pitch of the voice.",
        },
        {
          title: "Longer cords give a higher voice",
          body: "It is the reverse: longer, heavier vocal cords vibrate more slowly and give a lower pitch, which is why men's voices are deepest.",
        },
        {
          title: "Calling every instrument with a skin a string instrument",
          body: "A tambourine and a tabla are struck, so they are percussion instruments, even though both have a stretched skin.",
        },
      ],
    },
  ],
};
