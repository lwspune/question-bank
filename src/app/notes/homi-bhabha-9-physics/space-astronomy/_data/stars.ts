import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SA_STARS_NOTE: SubtopicNote = {
  subtopicName: "Stars and the Solar System",
  title: "Stars and the Solar System",
  oneLineDefinition:
    "The Sun is the nearest star and shines by fusing hydrogen into helium; a star's colour shows its temperature, its mass decides whether it ends as a white dwarf, a neutron star or a black hole, and every moon belongs to one planet.",
  whyItMatters:
    "Nine questions in the bank, two EASY, six MODERATE and one HARD. Three are about the Sun and the colour of stars (the hottest colour, the nearest star, how fusion makes helium in the Sun's core), three about how stars end and how dense they are (a red giant, a white dwarf, a neutron star), and three ask which planet a moon belongs to, the HARD one among them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sast-sun",
      name: "The Sun and the colour of stars",
      intuition:
        "Heat an iron rod in a fire: it glows red first, then orange, then white as it gets hotter. Stars are the same. A red star is a cool one, a yellow star like the Sun is in the middle, and a blue star is the hottest. The Sun is just an ordinary star that happens to be very close to us.",
      definition:
        "- The **Sun** is a star, and it is the **nearest star** to the Earth. Its light takes about 8 minutes to reach us.\n" +
        "- It looks far bigger and brighter than other stars only because it is so near. Many stars are much bigger.\n" +
        "- The Sun makes its energy by **nuclear fusion** in its **core**: **hydrogen** nuclei join to form **helium** nuclei, giving out huge energy. Fusion of hydrogen is the cause; the helium is the result.\n" +
        "- The nearest star **after** the Sun is **Proxima Centauri**. The **brightest** star in the night sky is **Sirius**.\n" +
        "- A star's **colour** shows its **surface temperature**: red (coolest), yellow, white, blue (hottest).",
      table: {
        columns: ["Colour of the star", "Surface temperature", "Example"],
        rows: [
          { cells: ["Red", "Lowest", "Betelgeuse, Antares"] },
          { cells: ["Yellow", "Medium", "The Sun"] },
          { cells: ["White", "Higher", "Sirius"] },
          { cells: ["Blue", "Highest", "Rigel"] },
        ],
        caption: "Colour runs red, yellow, white, blue as the temperature rises.",
      },
      selfCheckExample: {
        prompt: "Which star is the nearest to the Earth after the Sun?",
        steps: ["The Sun itself is the nearest star.", "The next nearest is in the Alpha Centauri group."],
        answer: "Proxima Centauri",
      },
      practiceSet: [
        { prompt: "Which is the brightest star in the night sky?", answer: "Sirius" },
        { prompt: "Which is hotter, a red star or a blue star?", answer: "A blue star" },
        { prompt: "What colour is a star of medium surface temperature, such as the Sun?", answer: "Yellow" },
        { prompt: "Why does the Sun look so much bigger than every other star?", answer: "Because it is far nearer to us than any other star, not because it is the biggest" },
      ],
      pyqExampleId: "55c6fddb-a582-4deb-8a8d-da68b41a638f",
      traps: [
        {
          title: "Thinking red stars are the hottest",
          body: "Red is the colour of the coolest stars. Blue stars are the hottest, as a metal glows red before it glows white.",
        },
        {
          title: "Turning cause and result round in the Sun",
          body: "Hydrogen nuclei fuse in the Sun's core, and that fusion forms helium. The fusion of hydrogen is the reason; the helium is what it makes.",
        },
        {
          title: "Thinking the Sun is a big star",
          body: "The Sun only looks biggest because it is nearest. Red giants and many other stars are much larger.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sast-life",
      name: "The life of a star and its density",
      intuition:
        "A star is born in a cloud of gas and dust and shines for millions of years by fusing hydrogen. When the hydrogen in its core runs low, it swells up into a huge red giant. How it ends depends on how heavy it was: the more mass, the tighter it is finally squeezed, from a white dwarf, to a neutron star, to a black hole.",
      definition:
        "- Stars form in a **nebula**, a cloud of gas and dust.\n" +
        "- When the hydrogen in the core runs low, a star swells into a **red giant**. Its matter is spread over a huge size, so its **density is very low**.\n" +
        "- A star of less than about **8 times the Sun's mass** ends as a **white dwarf**: about a Sun's mass packed into the size of the Earth. The Sun will become a red giant and then a white dwarf.\n" +
        "- A star of about **8 to 25 times the Sun's mass** explodes as a **supernova** and leaves a **neutron star**, about 20 km across and denser still.\n" +
        "- A star of more than about **25 times the Sun's mass** leaves a **black hole**, so dense that not even light can escape from it.\n" +
        "- A white dwarf cannot be heavier than about 1.4 times the Sun's mass: the **Chandrasekhar limit**, found by S. Chandrasekhar.\n" +
        "- Density, lowest to highest: **red giant, Sun, white dwarf, neutron star, black hole**.",
      table: {
        columns: ["Object", "Where it comes from", "Density"],
        rows: [
          { cells: ["Red giant", "A star swelling up as the hydrogen in its core runs low", "Lowest: its matter is spread very thin"] },
          { cells: ["The Sun", "An ordinary star shining by fusion", "Medium"] },
          { cells: ["White dwarf", "The end of a star of less than about 8 times the Sun's mass", "Very high: a Sun's mass in the size of the Earth"] },
          { cells: ["Neutron star", "Left by the supernova of a star of about 8 to 25 times the Sun's mass", "Higher still: a Sun's mass in a ball about 20 km across"] },
          { cells: ["Black hole", "Left by a star of more than about 25 times the Sun's mass", "Highest: not even light escapes"] },
        ],
        caption: "The heavier the star, the denser the object it leaves behind.",
      },
      selfCheckExample: {
        prompt: "A star has about 30 times the mass of the Sun. What will it most likely leave behind at the end of its life?",
        steps: ["Stars heavier than about 25 times the Sun's mass end as black holes."],
        answer: "A black hole",
      },
      practiceSet: [
        { prompt: "Arrange in increasing order of density: neutron star, red giant, white dwarf.", answer: "Red giant, white dwarf, neutron star" },
        { prompt: "What will the Sun finally become at the end of its life?", answer: "A white dwarf, after first swelling into a red giant" },
        { prompt: "What is the huge explosion called in which a heavy star ends its life?", answer: "A supernova" },
        { prompt: "Why can no light escape from a black hole?", answer: "It is so dense that its pull of gravity holds back even light" },
      ],
      pyqExampleId: "68f5a939-ed6c-4cac-acd4-30ff2ff562d0",
      traps: [
        {
          title: "Thinking a red giant is dense because it is big",
          body: "A red giant has spread its matter over a huge size, so its density is the lowest of all these objects.",
        },
        {
          title: "Mixing up a white dwarf and a neutron star",
          body: "A neutron star comes from a heavier star and is far smaller and denser than a white dwarf.",
        },
        {
          title: "Thinking every star ends as a black hole",
          body: "Only the heaviest stars, more than about 25 times the Sun's mass, become black holes. The Sun will end as a white dwarf.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sast-moons",
      name: "Moons of the planets",
      intuition:
        "Most planets have moons going round them, and Jupiter and Saturn have dozens. A paper only asks about the famous ones, so learn the short list for each planet. An odd-one-out question is then easy: write each moon's planet next to it and pick the one that differs.",
      definition:
        "- **Mercury** and **Venus** have **no** moons. The Earth has one, the Moon.\n" +
        "- **Jupiter**'s four big moons, **Io, Europa, Ganymede and Callisto**, were discovered by **Galileo**. **Ganymede** is the largest moon in the solar system.\n" +
        "- **Saturn**'s moons include **Titan** (its largest, with a thick atmosphere), **Iapetus**, **Pan**, **Enceladus**, **Rhea** and **Mimas**.\n" +
        "- A printed paper may show **Io** as \"Lo\" and **Iapetus** as \"Laptus\".",
      table: {
        columns: ["Planet", "Moons to know"],
        rows: [
          { cells: ["Earth", "The Moon"] },
          { cells: ["Mars", "Phobos, Deimos"] },
          { cells: ["Jupiter", "Io, Europa, Ganymede, Callisto"] },
          { cells: ["Saturn", "Titan, Iapetus, Pan, Enceladus, Rhea, Mimas"] },
          { cells: ["Uranus", "Miranda, Ariel, Titania, Oberon"] },
          { cells: ["Neptune", "Triton"] },
        ],
        caption: "Mercury and Venus have no moons.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: Phobos, Deimos, Triton.",
        steps: ["Phobos and Deimos are the moons of Mars.", "Triton is a moon of Neptune."],
        answer: "Triton",
      },
      practiceSet: [
        { prompt: "Which is the largest moon in the solar system?", answer: "Ganymede, a moon of Jupiter" },
        { prompt: "To which planet does the moon Triton belong?", answer: "Neptune" },
        { prompt: "Which two planets of the solar system have no moons?", answer: "Mercury and Venus" },
        { prompt: "Who discovered the four large moons of Jupiter?", answer: "Galileo" },
      ],
      pyqExampleId: "c298bf03-c6f3-449c-ae3c-5a67fdbcb17a",
      traps: [
        {
          title: "Giving Titan to Jupiter",
          body: "Titan is the largest moon of Saturn. Jupiter's big moons are Io, Europa, Ganymede and Callisto.",
        },
        {
          title: "Giving Callisto to Saturn",
          body: "Callisto is one of Jupiter's four Galilean moons. Saturn's moons include Titan, Iapetus and Pan.",
        },
        {
          title: "Not recognising a misprinted name",
          body: "\"Lo\" in a printed option is Io, a moon of Jupiter, and \"Laptus\" is Iapetus, a moon of Saturn.",
        },
      ],
    },
  ],
};
