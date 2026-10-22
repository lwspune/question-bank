import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_SP_SOLAR_NOTE: SubtopicNote = {
  subtopicName: "The Solar System",
  title: "The Solar System",
  oneLineDefinition:
    "Who proposed which theory of how the Earth formed, the two families of planets, the planet facts CDS asks, and what syzygy, perihelion and aphelion mean.",
  whyItMatters:
    "Ten CDS questions from 2016 to 2026: 2 EASY, 6 MODERATE, 2 HARD. Five are single planet facts, and both 2026 questions ask who proposed a theory of origin.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgesp-origin",
      name: "Theories of the origin of the Earth",
      intuition:
        "Nobody saw the Earth form, so scientists proposed theories and named them after their central idea: a cloud of gas, a passing star, a twin star, or small solid bodies sticking together. CDS asks you to match each theory to the person who gave it, so learn them as pairs.",
      definition:
        "The theories and their authors:\n" +
        "- **Gaseous (nebular) hypothesis**: **Immanuel Kant** (1755). The planets formed from a slowly rotating cloud of gas around the young Sun. **Laplace** revised it in 1796.\n" +
        "- **Planetesimal hypothesis**: **Chamberlin** and **Moulton**. A passing star pulled matter out of the Sun; it cooled into small solid bodies (planetesimals) that came together as planets.\n" +
        "- **Tidal hypothesis**: **James Jeans** and **Harold Jeffreys**. A passing star raised a tide of matter from the Sun.\n" +
        "- **Binary star hypothesis**: **H. N. Russell**. The Sun once had a companion star whose matter formed the planets.\n" +
        "- **Big Bang**: the universe began from one tiny point that expanded. In 1920 **Edwin Hubble** gave evidence that the universe is still expanding.\n" +
        "Two theories about the **continents and oceans** sit beside these:\n" +
        "- **Tetrahedral hypothesis**: **Lowthian Green**. A cooling, shrinking Earth took a four-cornered (tetrahedral) shape, with continents at the corners and oceans on the faces.\n" +
        "- **Continental drift**: **Alfred Wegener** (1912), with **F. B. Taylor** an earlier supporter. **W. M. Davis** gave the cycle of erosion, not an origin theory.",
      table: {
        columns: ["Theory", "Proposed by"],
        rows: [
          { cells: ["Gaseous (nebular) hypothesis", "Immanuel Kant; revised by Laplace"] },
          { cells: ["Planetesimal hypothesis", "Chamberlin and Moulton"] },
          { cells: ["Tidal hypothesis", "James Jeans and Harold Jeffreys"] },
          {
            cells: ["Binary star hypothesis", "H. N. Russell"],
            noteAmber: "CDS 2026 (I): Kant gaseous, Russell binary star, Chamberlin planetesimal are all correctly matched.",
            pyqExampleId: "71d5f7df-40bf-452a-9ff9-490ab1298b50",
          },
          { cells: ["Expanding universe (Big Bang)", "Edwin Hubble showed the expansion"] },
          {
            cells: ["Tetrahedral hypothesis of continents and oceans", "Lowthian Green"],
            noteAmber: "CDS 2026 (II): Lowthian Green, not Taylor, Wegener or Davis.",
            pyqExampleId: "d68d3783-f938-48bd-b964-28c9343a57e1",
          },
          { cells: ["Continental drift", "Alfred Wegener"] },
        ],
      },
      pyqExampleId: "71d5f7df-40bf-452a-9ff9-490ab1298b50",
      selfCheckExample: {
        prompt: "Lowthian Green and Alfred Wegener both tried to explain where the continents are. How did their ideas differ?",
        steps: [
          "Green said the cooling Earth shrank into a tetrahedral shape, with continents fixed at its corners.",
          "Wegener said the continents were once joined and have since drifted apart.",
        ],
        answer: "Green's continents stay put on a shrinking, four-cornered Earth; Wegener's continents move.",
      },
      practiceSet: [
        { prompt: "Who revised Kant's gaseous hypothesis in 1796?", answer: "Laplace" },
        { prompt: "Who gave the tidal hypothesis of the origin of the Earth?", answer: "James Jeans, later with Harold Jeffreys" },
        { prompt: "Who proposed the theory of continental drift?", answer: "Alfred Wegener" },
        { prompt: "What did W. M. Davis give to geography?", answer: "The cycle of erosion" },
      ],
      traps: [
        {
          title: "Davis and Taylor are distractors for origin theories",
          body: "**W. M. Davis** gave the **cycle of erosion** and **F. B. Taylor** argued for moving continents. Neither proposed the tetrahedral hypothesis, which is **Lowthian Green's**.",
        },
        {
          title: "Planetesimal is Chamberlin, tidal is Jeans",
          body: "Both theories use a passing star. The one about **small solid bodies** (planetesimals) is **Chamberlin and Moulton's**; the one about a **tide** of matter is **Jeans and Jeffreys'**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgesp-families",
      name: "The two families of planets",
      intuition:
        "Near the young Sun it was too hot for light gases and ices to stay, so only rock and metal came together: those planets are small, dense and rocky. Far out it was cold, and huge planets grew out of gas and ice. A belt of asteroids lies between the two families.",
      definition:
        "Eight planets in two families:\n" +
        "- **Inner or terrestrial planets** (Earth-like): **Mercury, Venus, Earth, Mars**. Small, dense, made of rock and metal, with solid surfaces.\n" +
        "- **Outer, giant or gas planets** (Jovian): **Jupiter, Saturn, Uranus, Neptune**. Huge, made mostly of hydrogen, helium and ices, with **no solid surface**.\n" +
        "- The **asteroid belt** lies between **Mars and Jupiter**.\n" +
        "- **Pluto** has been a **dwarf planet** since 2006.",
      table: {
        columns: ["Family", "Planets", "Made of"],
        rows: [
          {
            cells: ["Terrestrial (inner)", "Mercury, Venus, Earth, Mars", "Rock and metal; solid surface"],
            noteAmber: "CDS 2020 (II): the four planets closest to the Sun are the terrestrial planets.",
            pyqExampleId: "92b72333-a01b-4d3c-aaac-98c0251d7695",
          },
          {
            cells: ["Giant or gas (outer)", "Jupiter, Saturn, Uranus, Neptune", "Hydrogen, helium and ices; no solid surface"],
            noteAmber: "CDS 2023 (I): Mars is rocky, so any group of gas planets that includes Mars is wrong.",
            pyqExampleId: "91592746-d459-498e-94d8-bd377bfd013c",
          },
          { cells: ["Dwarf planet", "Pluto (since 2006)", "Rock and ice; too small to clear its orbit"] },
          { cells: ["Asteroid belt", "Between Mars and Jupiter", "Rocky and metal fragments"] },
        ],
      },
      pyqExampleId: "91592746-d459-498e-94d8-bd377bfd013c",
      selfCheckExample: {
        prompt: "Why are the planets near the Sun rocky while the far ones are mostly gas?",
        steps: [
          "Close to the young Sun it was very hot, so light gases and ices could not stay; only rock and metal could gather.",
          "Far from the Sun it was cold, so ices and gases stayed and huge planets grew from them.",
        ],
        answer: "Heat near the Sun left only rock and metal; cold far out let gas and ice build giant planets.",
      },
      practiceSet: [
        { prompt: "Between which two planets is the asteroid belt?", answer: "Mars and Jupiter" },
        { prompt: "Since 2006, what is Pluto classed as?", answer: "A dwarf planet" },
        { prompt: "Which is the largest planet of the solar system?", answer: "Jupiter" },
        { prompt: "Why are the inner planets called terrestrial?", answer: "They are rocky and Earth-like" },
      ],
      traps: [
        {
          title: "Mars is the last rocky planet",
          body: "Mars is red and far out, but it is a **terrestrial** planet. The gas planets begin after the asteroid belt, with **Jupiter**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgesp-planet-facts",
      name: "Planet facts CDS asks",
      intuition:
        "Most planet questions test one striking fact per planet: the smallest, the hottest, the one with acid clouds, the one with rings. Learn one or two such facts for each planet and the statement questions become a quick check.",
      definition:
        "The facts to hold:\n" +
        "- **Mercury**: nearest the Sun, smallest and **least massive** planet; almost **no atmosphere**; no moon.\n" +
        "- **Venus**: the **hottest** planet; a carbon dioxide atmosphere (about **96%**) under thick yellowish clouds of **sulphuric acid**; **no moon**; spins from east to west.\n" +
        "- **Mars**: the red planet (iron oxide dust); carbon dioxide about **95%** of its thin air; two small moons, **Phobos and Deimos**.\n" +
        "- **Jupiter**: the largest planet; a gas giant with **no land** to stand on.\n" +
        "- **Saturn**: its **rings** are made of lumps of **ice and rocky dust**; it has the most known moons today.\n" +
        "- **Uranus** spins on its side; **Neptune** is the farthest planet from the Sun.",
      table: {
        columns: ["Planet", "Fact to remember"],
        rows: [
          {
            cells: ["Mercury", "Smallest and least massive; almost no atmosphere"],
            noteAmber: "CDS 2019 (I): Mercury has the least mass, less than Mars.",
            pyqExampleId: "e8d538af-1087-4e69-b7ee-d22c7290414d",
          },
          {
            cells: ["Venus", "Hottest; thick clouds of sulphuric acid; no moon"],
            noteAmber: "CDS 2022 (II): the yellowish clouds of Venus are sulphuric acid.",
            pyqExampleId: "1852151c-c7e6-4d01-aeb0-be5bb2a4a31e",
          },
          {
            cells: ["Mars", "Red from iron oxide; two moons, Phobos and Deimos"],
            noteAmber: "CDS 2023 (II): carbon dioxide is about 95 to 97% of the air of both Venus and Mars.",
            pyqExampleId: "33d1200a-2bb9-4e27-954b-d3ca4dcae13b",
          },
          { cells: ["Jupiter", "Largest planet; a gas giant with no solid surface"] },
          {
            cells: ["Saturn", "Rings of ice and rocky dust; most known moons"],
            noteAmber: "CDS 2023 (II): Mercury has no atmosphere, Jupiter no land, Saturn's rings are ice and dust; Venus has no moons.",
            pyqExampleId: "2fab85e7-b0dd-431c-80cd-caedf961d063",
          },
          { cells: ["Uranus", "Spins on its side"] },
          { cells: ["Neptune", "Farthest planet from the Sun"] },
        ],
      },
      pyqExampleId: "2fab85e7-b0dd-431c-80cd-caedf961d063",
      selfCheckExample: {
        prompt: "Mercury is nearer the Sun than Venus, yet Venus is the hotter planet. Why?",
        steps: [
          "Venus has a very thick atmosphere, almost all carbon dioxide, which traps heat like a greenhouse.",
          "Mercury has almost no atmosphere, so the heat it receives escapes, especially on its night side.",
        ],
        answer: "Venus's thick carbon dioxide atmosphere traps heat; Mercury has almost no air to hold it.",
      },
      practiceSet: [
        { prompt: "Name the two moons of Mars.", answer: "Phobos and Deimos" },
        { prompt: "Why does Mars look red?", answer: "Its surface dust is rich in iron oxide (rust)" },
        { prompt: "Which planet is the hottest, though it is not the nearest to the Sun?", answer: "Venus" },
        { prompt: "Which is the farthest planet from the Sun?", answer: "Neptune" },
      ],
      traps: [
        {
          title: "Nearest is not hottest",
          body: "**Mercury** is nearest the Sun, but **Venus** is the hottest planet, because its thick carbon dioxide air traps heat.",
        },
        {
          title: "Moon counts change",
          body: "Older books say **Jupiter** has the most moons. New moons of Saturn were confirmed in 2019 and again later, and **Saturn** now has the most known moons. Read moon-count options with the date of the paper in mind.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgesp-syzygy",
      name: "Syzygy, perihelion and aphelion",
      intuition:
        "Syzygy is just a hard word for three bodies in a straight line: the Sun, the Earth and the Moon. It happens at every new moon and every full moon. Perihelion and aphelion are a different idea: the Earth's nearest and farthest points from the Sun in its yearly orbit.",
      definition:
        "Positions in space:\n" +
        "- **Syzygy**: the Sun, Earth and Moon in a straight line (an angle of 180°). It happens at **every new moon and full moon**, about twice a month.\n" +
        "- **Conjunction**: the Moon between the Sun and the Earth (new moon). A **solar eclipse** can happen.\n" +
        "- **Opposition**: the Earth between the Sun and the Moon (full moon). A **lunar eclipse** can happen.\n" +
        "- There is no eclipse at every syzygy because the Moon's orbit is tilted about **5°** to the Earth's, so the Moon usually passes just above or below the line.\n" +
        "- **Perihelion**: the Earth **nearest** the Sun, about **3 January** (about 147 million km).\n" +
        "- **Aphelion**: the Earth **farthest** from the Sun, about **4 July** (about 152 million km).\n" +
        "- **Perigee** and **apogee** are the Moon's nearest and farthest points from the Earth.",
      table: {
        columns: ["Term", "Meaning", "When"],
        rows: [
          {
            cells: ["Syzygy", "Sun, Earth and Moon in a straight line", "Every new moon and full moon"],
            noteAmber: "CDS 2016 (II): 'syzygy conjunction occurs at the time of perihelion only' is the wrong statement.",
            pyqExampleId: "41590c5a-faf3-44f4-a77e-8e6860e5d417",
          },
          { cells: ["Conjunction", "Moon between the Sun and Earth", "New moon"] },
          { cells: ["Opposition", "Earth between the Sun and Moon", "Full moon"] },
          { cells: ["Perihelion", "Earth nearest the Sun", "About 3 January"] },
          { cells: ["Aphelion", "Earth farthest from the Sun", "About 4 July"] },
        ],
      },
      pyqExampleId: "41590c5a-faf3-44f4-a77e-8e6860e5d417",
      selfCheckExample: {
        prompt: "The Sun, Earth and Moon line up every month, so why do we not get a solar eclipse every month?",
        steps: [
          "The Moon's orbit is tilted about 5° to the plane of the Earth's orbit.",
          "So at most new moons the Moon passes a little above or below the Sun as seen from the Earth, and its shadow misses the Earth.",
        ],
        answer: "The tilt of the Moon's orbit means its shadow usually misses the Earth.",
      },
      practiceSet: [
        { prompt: "On about which date is the Earth farthest from the Sun?", answer: "About 4 July (aphelion)" },
        { prompt: "What is the point of the Moon's orbit nearest the Earth called?", answer: "Perigee" },
        { prompt: "About how far is the Earth from the Sun at perihelion?", answer: "About 147 million km" },
        { prompt: "Is the Earth nearer the Sun in the northern summer or the northern winter?", answer: "The northern winter (perihelion, about 3 January)" },
      ],
      traps: [
        {
          title: "The Earth is nearest the Sun in January",
          body: "**Perihelion** comes about **3 January**, in the northern winter. Seasons come from the **tilt of the axis**, not from the distance to the Sun.",
        },
      ],
    },
  ],
};
