import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_DN_PHOTOCELL_NOTE: SubtopicNote = {
  subtopicName: "Photo Cell",
  title: "The Photo Cell",
  oneLineDefinition:
    "The photo cell, a device that uses the photoelectric effect to turn light energy into electrical energy: its parts, how it works, where it is used, and how its cathode material is chosen.",
  whyItMatters:
    "2 questions. One was set in a board paper: draw a neat schematic diagram of a photo cell and find a threshold wavelength (2026). The textbook asks which cathode material a street light photo cell must have.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpdn-photocell",
      name: "Construction, working and uses of a photo cell",
      intuition:
        "A photo cell is the photoelectric experiment made into a working device. Light falls on a curved metal cathode, electrons fly to a wire anode, and a current flows. Block the light and the current stops. That on and off behaviour is what switches street lights, counts people at a door and sets off burglar alarms.",
      definition:
        "- A **photo cell** is a device that makes use of the photoelectric effect and converts light energy into electrical energy.\n" +
        "- **Working:** when light of suitable wavelength falls on the cathode, photoelectrons are emitted. They are attracted to the anode by the applied electric field, and the photocurrent is read on the microammeter.\n" +
        "- If a beam falling on the cathode is interrupted (a person passing a doorway), the photocurrent stops; this event can work a counter or an alarm.\n" +
        "- Draw the diagram with every part labelled: bulb, cathode E, anode C, battery B, microammeter A, and the incident light.",
      table: {
        columns: ["Part or use", "Details"],
        rows: [
          {
            cells: ["Bulb", "An evacuated glass or quartz bulb holding the two electrodes"],
            pyqExampleId: "251704eb-bd68-43db-915d-e6fca9b54504",
            noteAmber: "Board 2026 asked for a neat schematic diagram of a photo cell, together with a threshold wavelength calculation.",
          },
          { cells: ["Cathode E", "A semi-cylindrical photosensitive metal plate; or the photosensitive material pasted as a thin film on the inner wall of the bulb"] },
          { cells: ["Anode C", "A wire loop that collects the photoelectrons"] },
          { cells: ["External circuit", "A high tension battery B and a microammeter A joined to the electrodes"] },
          { cells: ["Use: light meters", "Light meters in photographic cameras measure the intensity of light with a photo cell"] },
          { cells: ["Use: street lights", "A photo cell switches street lights on or off"] },
          { cells: ["Use: counters and alarms", "A person crossing the light beam stops the current, which works a counter or a burglar alarm, or catches traffic law defaulters"] },
          { cells: ["Use: control systems", "A photo cell is used to operate control systems and light measuring devices"] },
        ],
      },
      practiceSet: [
        { prompt: "What energy conversion takes place in a photo cell?", answer: "Light energy into electrical energy" },
        { prompt: "What is the shape of the cathode of a photo cell?", answer: "A semi-cylindrical photosensitive metal plate" },
        { prompt: "A person walks through a beam falling on a photo cell. What happens to the photocurrent?", answer: "It stops while the beam is blocked" },
      ],
      traps: [
        {
          title: "An unlabelled diagram",
          body: "The board asks for a NEAT schematic diagram. Label the cathode, the anode, the evacuated bulb, the battery and the microammeter, and show the incoming light.",
        },
        {
          title: "Calling a solar cell a photo cell",
          body: "A photo cell works by the photo-emissive effect: electrons leave a metal. A solar cell works by the photo-voltaic effect, a potential difference produced in a semiconductor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-photocell-cathode",
      name: "Choosing the cathode material",
      intuition:
        "A photo cell that must work in daylight has to respond to visible light. So its cathode needs a work function small enough that a visible photon can free an electron, which means a threshold wavelength inside the visible range. Alkali metals have such small work functions; zinc, aluminium and nickel need ultraviolet.",
      definition:
        "- Threshold wavelength: \\(\\lambda_0 = \\dfrac{hc}{\\phi_0}\\). The cathode responds only to light of wavelength shorter than \\(\\lambda_0\\).\n" +
        "- For visible light (roughly 4000 Å to 7000 Å), \\(\\lambda_0\\) must lie in the visible range or beyond it.\n" +
        "- Alkali metals (such as potassium, 2.3 eV, and sodium, 2.4 eV) work with visible light; metals like zinc, cadmium and magnesium need ultraviolet.",
      formula: {
        label: "Threshold wavelength of the cathode",
        latex: "\\lambda_0 = \\frac{hc}{\\phi_0}",
      },
      authoredExample: {
        prompt:
          "A photo cell has a sodium cathode (work function 2.4 eV). Find its threshold wavelength. Will it respond to yellow light of 5800 Å and to green light of 5000 Å? (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\phi_0 = 2.4\\) eV \\(= 2.4 \\times 1.6 \\times 10^{-19} = 3.84 \\times 10^{-19}\\) J.",
          "Formula: \\(\\lambda_0 = \\dfrac{hc}{\\phi_0}\\).",
          "\\(\\lambda_0 = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{3.84 \\times 10^{-19}} = 5.18 \\times 10^{-7}\\) m \\(= 5180\\) Å.",
          "Yellow, 5800 Å, is longer than 5180 Å: no current. Green, 5000 Å, is shorter: the cell responds.",
        ],
        answer: "\\(\\lambda_0 = 5180\\) Å; no response to 5800 Å, response to 5000 Å",
      },
      selfCheckExample: {
        prompt: "A photo cell must respond to red light of wavelength 6500 Å. What is the largest work function its cathode can have, in eV?",
        steps: [
          "The photon energy must be at least \\(\\phi_0\\): \\(\\phi_0 = \\dfrac{hc}{\\lambda} = \\dfrac{1.989 \\times 10^{-25}}{6.5 \\times 10^{-7}} = 3.06 \\times 10^{-19}\\) J.",
          "\\(\\dfrac{3.06 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 1.91\\) eV.",
        ],
        answer: "About 1.91 eV",
      },
      practiceSet: [
        { prompt: "Find the threshold wavelength of gold, work function 5.1 eV.", answer: "About 2437 Å, in the ultraviolet" },
        { prompt: "A photo cell cathode has a work function of 2.0 eV. Find the longest wavelength it responds to.", answer: "About 6216 Å" },
        { prompt: "Would making the light brighter let a nickel cathode respond to visible light?", answer: "No. Each visible photon still carries less than its work function" },
      ],
      pyqExampleId: "5915ece1-0177-4b08-8ba7-9386b39a5612",
      traps: [
        {
          title: "Choosing the metal with the largest work function",
          body: "A large work function means a short threshold wavelength, out in the ultraviolet. For a daylight photo cell you need a SMALL work function.",
        },
      ],
    },
  ],
};
