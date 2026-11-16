import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_DN_PHOTONS_NOTE: SubtopicNote = {
  subtopicName: "Photons",
  title: "Photons",
  oneLineDefinition:
    "Light as a stream of packets called photons: the energy hν and momentum h/λ of one photon, how many photons a source gives out each second, and which experiments show light as a wave or as particles.",
  whyItMatters:
    "Four NEET questions from 2021 to 2026. One counts the photons a 3.3 mW source gives out each second (2021), one asks how the shortest X-ray wavelength from electrons accelerated through V volts depends on V (2023), one asks which statements about a photon are true (2024), and one matches E = hν, interference, λ = h/p and the Compton effect to what each describes (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphdn-photon-energy",
      name: "Energy and momentum of a photon",
      intuition:
        "Light gives its energy to matter in fixed packets, not smoothly like a wave. Each packet is a photon. A photon of light of frequency \\(\\nu\\) always carries the same energy \\(h\\nu\\) and the same momentum, however bright the light is. Brighter light simply means more photons each second.",
      definition:
        "- Energy of one photon: \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\), with \\(h = 6.63 \\times 10^{-34}\\) J s.\n" +
        "- Electron volt: \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J. A quick rule: \\(E\\,(\\text{eV}) = \\dfrac{1240}{\\lambda\\,(\\text{nm})}\\).\n" +
        "- Momentum of one photon: \\(p = \\dfrac{h}{\\lambda} = \\dfrac{h\\nu}{c} = \\dfrac{E}{c}\\).\n" +
        "- **Properties of photons:** they travel at speed c in vacuum; all photons of one frequency have the same energy and momentum, whatever the intensity; they carry no charge, so electric and magnetic fields do not bend them.\n" +
        "- In a collision between a photon and an electron, the total energy and the total momentum are conserved. The number of photons need not be: a photon can be absorbed or a new one created.\n" +
        "- **Shortest X-ray wavelength:** an electron accelerated through V volts has energy eV. At most all of it becomes one photon, so \\(\\dfrac{hc}{\\lambda_{\\min}} = eV\\) and \\(\\lambda_{\\min} = \\dfrac{hc}{eV}\\), which goes as \\(\\dfrac{1}{V}\\).",
      formula: {
        label: "Photon energy and momentum",
        latex: "E = h\\nu = \\frac{hc}{\\lambda}, \\qquad p = \\frac{h}{\\lambda} = \\frac{E}{c}, \\qquad E\\,(\\text{eV}) = \\frac{1240}{\\lambda\\,(\\text{nm})}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "Planck's constant" },
          { symbol: "\\(\\nu\\)", meaning: "frequency of the light" },
          { symbol: "\\(p\\)", meaning: "momentum of one photon" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the energy in eV and the momentum of a photon of wavelength 500 nm. (\\(h = 6.63 \\times 10^{-34}\\) J s)",
        steps: [
          "Energy: \\(E = \\dfrac{1240}{500} = 2.48\\) eV.",
          "Momentum: \\(p = \\dfrac{h}{\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{5 \\times 10^{-7}} = 1.33 \\times 10^{-27}\\ \\text{kg m/s}\\).",
        ],
        answer: "2.48 eV and \\(1.33 \\times 10^{-27}\\ \\text{kg m/s}\\)",
      },
      selfCheckExample: {
        prompt: "A photon has an energy of 3.1 eV. What is its wavelength?",
        steps: [
          "\\(\\lambda\\,(\\text{nm}) = \\dfrac{1240}{E\\,(\\text{eV})} = \\dfrac{1240}{3.1}\\).",
          "\\(\\lambda = 400\\) nm, violet light.",
        ],
        answer: "400 nm",
      },
      practiceSet: [
        { prompt: "What is the energy, in eV, of a photon of wavelength 620 nm?", answer: "2.0 eV" },
        { prompt: "Light of one colour is made twice as bright. What happens to the energy of each photon?", answer: "Nothing; only the number of photons doubles" },
        { prompt: "Convert 2 eV into joules.", answer: "\\(3.2 \\times 10^{-19}\\) J" },
        { prompt: "Two photons have wavelengths 300 nm and 600 nm. What is the ratio of their momenta, first to second?", answer: "2 : 1" },
      ],
      pyqExampleId: "84d7e850-9b3b-4d94-9ad5-15a129b17173",
      traps: [
        {
          title: "Brighter light does not mean bigger photons",
          body: "The energy of one photon is set by the frequency alone. Turning up the intensity adds more photons each second; each photon carries the same \\(h\\nu\\) as before.",
        },
        {
          title: "The 1240 rule gives eV from nm",
          body: "\\(E = 1240/\\lambda\\) gives the energy in eV only when \\(\\lambda\\) is in nanometres. For joules, multiply the eV value by \\(1.6 \\times 10^{-19}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphdn-photon-flux",
      name: "Number of photons from a source",
      intuition:
        "A lamp's power is the energy it sends out each second. That energy leaves as photons, each carrying \\(hc/\\lambda\\). So dividing the power by the energy of one photon tells you how many photons leave each second. Red photons carry less energy than blue ones, so a red lamp needs more of them to give the same power.",
      definition:
        "- Power of a source: \\(P = \\dfrac{N}{t} \\times \\dfrac{hc}{\\lambda}\\), where \\(\\dfrac{N}{t}\\) is the number of photons per second.\n" +
        "- So \\(\\dfrac{N}{t} = \\dfrac{P}{h\\nu} = \\dfrac{P\\lambda}{hc}\\).\n" +
        "- For equal power, \\(\\dfrac{N}{t} \\propto \\lambda\\): the source with the longer wavelength gives out more photons.\n" +
        "- Light of intensity I (power per unit area) carries \\(\\dfrac{I}{h\\nu}\\) photons across each square metre every second.",
      formula: {
        label: "Photons per second",
        latex: "\\frac{N}{t} = \\frac{P}{h\\nu} = \\frac{P\\lambda}{hc}",
        symbols: [
          { symbol: "\\(P\\)", meaning: "power of the source" },
          { symbol: "\\(N/t\\)", meaning: "photons given out per second" },
        ],
      },
      authoredExample: {
        prompt:
          "A detector counts \\(2 \\times 10^{15}\\) photons of wavelength 660 nm every second. What power does it receive? (\\(h = 6.6 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Energy of one photon: \\(\\dfrac{hc}{\\lambda} = \\dfrac{6.6 \\times 10^{-34} \\times 3 \\times 10^{8}}{6.6 \\times 10^{-7}} = 3 \\times 10^{-19}\\) J.",
          "Power: \\(P = 2 \\times 10^{15} \\times 3 \\times 10^{-19} = 6 \\times 10^{-4}\\) W.",
        ],
        answer: "\\(6 \\times 10^{-4}\\) W (0.6 mW)",
      },
      selfCheckExample: {
        prompt:
          "A red lamp (700 nm) and a blue lamp (400 nm) each give out 10 W of light. Which gives out more photons per second, and how many times more?",
        steps: [
          "At equal power, \\(\\dfrac{N}{t} = \\dfrac{P\\lambda}{hc} \\propto \\lambda\\).",
          "\\(\\dfrac{N_{\\text{red}}}{N_{\\text{blue}}} = \\dfrac{700}{400} = 1.75\\).",
        ],
        answer: "The red lamp, 1.75 times as many",
      },
      practiceSet: [
        { prompt: "How much energy, in joules, do \\(10^{20}\\) photons of 2 eV each carry in total?", answer: "32 J" },
        { prompt: "Write the number of photons given out per second by a source of power P and wavelength λ.", answer: "\\(\\dfrac{P\\lambda}{hc}\\)" },
        { prompt: "Two sources have equal power; one gives out 300 nm light, the other 600 nm. What is the ratio of photons per second, first to second?", answer: "1 : 2" },
        { prompt: "Light of intensity 2 W/m² is made of photons of energy \\(4 \\times 10^{-19}\\) J each. How many photons cross each square metre per second?", answer: "\\(5 \\times 10^{18}\\)" },
      ],
      pyqExampleId: "22f9424d-c386-4eee-a9bb-5dc5ea1db885",
      traps: [
        {
          title: "Equal power, more red photons",
          body: "For the same power, a red source gives out more photons each second than a blue one, because each red photon carries less energy.",
        },
        {
          title: "Convert to SI before dividing",
          body: "Put the wavelength in metres and the power in watts: 600 nm is \\(6 \\times 10^{-7}\\) m and 3.3 mW is \\(3.3 \\times 10^{-3}\\) W. A missed power of ten moves the answer to a wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphdn-dual-nature",
      name: "Wave or particle: what each experiment shows",
      intuition:
        "Light behaves as a wave in some experiments and as a stream of particles in others. Interference and diffraction can only be explained by waves. The photoelectric effect and the scattering of X-rays by electrons can only be explained by photons. Matter has the same double nature: a moving particle also has a wavelength.",
      definition:
        "- Light shows a **wave nature** in interference and diffraction, and a **particle (photon) nature** when it gives energy to matter, as in the photoelectric effect.\n" +
        "- Wave picture: the intensity of light depends on the square of the amplitude of the wave.\n" +
        "- Photon picture: the intensity depends on the number of photons crossing unit area each second, each carrying \\(h\\nu\\).\n" +
        "- Matter also has a dual nature: a moving particle has a de Broglie wavelength \\(\\lambda = h/p\\).",
      table: {
        columns: ["Phenomenon", "Nature it shows", "Key idea"],
        rows: [
          { cells: ["Interference", "Wave nature of light", "two light waves add or cancel"] },
          { cells: ["Diffraction", "Wave nature of light", "light spreads round small obstacles and slits"] },
          { cells: ["Photoelectric effect", "Particle nature of light", "one photon gives its energy \\(h\\nu\\) to one electron at once"] },
          {
            cells: ["Compton effect", "Particle nature of light", "X-ray photons scattered by electrons carry energy and momentum like particles"],
            pyqExampleId: "f46ee61f-b573-40d2-8826-41af1a9cfb33",
            noteAmber: "NEET 2026: a match of E = hν, diffraction and interference, λ = h/p and the Compton effect with what each one describes.",
          },
          { cells: ["Matter waves", "Wave nature of matter", "a moving particle has wavelength \\(h/p\\)"] },
        ],
        caption: "Interference and diffraction show waves; the photoelectric and Compton effects show particles.",
      },
      selfCheckExample: {
        prompt:
          "Light of one colour is made twice as intense. In the wave picture, what changes about the wave? In the photon picture, what changes?",
        steps: [
          "Wave picture: intensity goes as the square of the amplitude, so the amplitude grows by \\(\\sqrt{2}\\).",
          "Photon picture: each photon still carries \\(h\\nu\\), so twice as many photons cross each unit area every second.",
        ],
        answer: "The amplitude grows \\(\\sqrt{2}\\) times; the number of photons per second doubles",
      },
      practiceSet: [
        { prompt: "Which nature of light does the photoelectric effect show?", answer: "Its particle (photon) nature" },
        { prompt: "In the wave picture of light, the intensity depends on which property of the wave?", answer: "The square of its amplitude" },
        { prompt: "Which of these cannot be explained by the wave picture of light: the double-slit pattern or the photoelectric effect?", answer: "The photoelectric effect" },
      ],
      pyqExampleId: "f46ee61f-b573-40d2-8826-41af1a9cfb33",
      traps: [
        {
          title: "Two experiments for each nature",
          body: "Interference and diffraction show that light is a wave; the photoelectric effect and the Compton effect show that it is made of photons. A match that pairs diffraction with particles is wrong.",
        },
      ],
    },
  ],
};
