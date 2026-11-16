import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EM_SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Spectrum",
  title: "Electromagnetic Spectrum",
  oneLineDefinition:
    "The seven bands of electromagnetic waves from γ-rays to radio waves in order of wavelength, how each band is produced and detected, and what each is used for.",
  whyItMatters:
    "Four NEET questions, all match-the-list or pick-one recall. Two ask for wavelengths (four bands matched to their wavelengths in 2022, the shortest wavelength in Re-NEET 2024) and two match bands to what they do (uses in Re-NEET 2026, how each is produced in NEET 2026). The two tables on this page cover all four.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphem-spectrum-order",
      name: "Order and wavelength ranges of the spectrum",
      intuition:
        "Every band is the same kind of wave, travelling at c in vacuum; only the wavelength differs. Line them up from the shortest wavelength to the longest and the frequency falls in the same order. Learn the seven names in order and the rough edges of each band, and most questions answer themselves.",
      definition:
        "- Increasing wavelength: γ-rays, X-rays, ultraviolet, visible light, infrared, microwaves, radio waves. Increasing frequency is the reverse order.\n" +
        "- Visible light runs from violet (about 400 nm) to red (about 700 nm), about \\(4 \\times 10^{14}\\) Hz to \\(7 \\times 10^{14}\\) Hz.\n" +
        "- From a frequency to a band: \\(\\lambda = \\dfrac{c}{f}\\).\n" +
        "- The edges are not sharp, and neighbouring bands overlap.",
      table: {
        columns: ["Band", "Wavelength range", "Detected by"],
        rows: [
          {
            cells: ["γ-rays", "shorter than 10⁻³ nm", "Photographic film, Geiger tubes, ionisation chambers"],
            noteAmber: "Re-NEET 2024: γ-rays have the smallest wavelength of all.",
            pyqExampleId: "18efeea8-8156-4ec5-b857-9976bcb9c74a",
          },
          { cells: ["X-rays", "1 nm to 10⁻³ nm", "Photographic film, Geiger tubes, ionisation chambers"] },
          { cells: ["Ultraviolet", "400 nm to 1 nm", "Photocells, photographic film"] },
          { cells: ["Visible light", "700 nm to 400 nm", "The eye, photocells, photographic film"] },
          { cells: ["Infrared", "1 mm to 700 nm", "Thermopiles, bolometers, infrared photographic film"] },
          { cells: ["Microwaves", "0.1 m to 1 mm", "Point-contact diodes"] },
          { cells: ["Radio waves", "longer than 0.1 m", "Receivers' aerials"] },
        ],
        caption: "Wavelength rises down the table; frequency falls.",
      },
      selfCheckExample: {
        prompt: "Arrange visible light, radio waves, X-rays and microwaves in increasing order of frequency.",
        steps: [
          "Increasing frequency means decreasing wavelength.",
          "Longest wavelength first: radio waves, then microwaves, then visible light, then X-rays.",
        ],
        answer: "Radio waves, microwaves, visible light, X-rays",
      },
      practiceSet: [
        { prompt: "Which band lies between visible light and microwaves?", answer: "Infrared" },
        { prompt: "Which has the higher frequency, infrared or ultraviolet?", answer: "Ultraviolet" },
        { prompt: "Find the wavelength of a 100 MHz FM radio wave.", answer: "3 m" },
        { prompt: "What is the wavelength range of visible light?", answer: "About 400 nm to 700 nm" },
      ],
      pyqExampleId: "6f01886c-84fc-44ce-8d19-376ae304ed07",
      traps: [
        {
          title: "γ-rays are shorter than X-rays",
          body: "γ-rays have the shortest wavelength of all, shorter than X-rays. Swapping the two is the commonest wrong option in an order question.",
        },
        {
          title: "Higher frequency means shorter wavelength",
          body: "Since \\(\\lambda = c/f\\), a band with a higher frequency has a shorter wavelength. Ultraviolet has a higher frequency and a shorter wavelength than infrared.",
        },
        {
          title: "Infrared sits next to red",
          body: "Infrared lies just beyond red light, on the long-wavelength side of the visible band. Ultraviolet lies beyond violet, on the short side.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphem-spectrum-uses",
      name: "Production and uses of each band",
      intuition:
        "Each band comes from a process whose energy matches it. Electrons swinging in an aerial give radio waves, vibrating atoms and molecules give infrared, electrons dropping between levels in an atom give light and ultraviolet, inner-shell electrons give X-rays, and the nucleus itself gives γ-rays. Learn the source with the band, and the uses follow.",
      definition:
        "- Radio waves: rapid acceleration and deceleration of electrons in aerials. AM radio uses 530 kHz to 1710 kHz; FM radio uses 88 MHz to 108 MHz.\n" +
        "- Microwaves: special vacuum tubes, the klystron, the magnetron and the Gunn diode. A microwave oven uses a frequency that matches the resonant frequency of water molecules, so the food's water heats up.\n" +
        "- Infrared: vibration of atoms and molecules; hot bodies give it out. It is sometimes called heat waves.\n" +
        "- Visible light and ultraviolet: electrons in atoms moving from a higher energy level to a lower one. The sun is a strong source of ultraviolet, and the ozone layer absorbs most of it.\n" +
        "- X-rays: X-ray tubes, or inner-shell electrons moving to a lower level, as when fast electrons strike a metal target.\n" +
        "- γ-rays: radioactive decay of the nucleus.",
      table: {
        columns: ["Band", "Produced by", "Main uses"],
        rows: [
          { cells: ["Radio waves", "Rapid acceleration and deceleration of electrons in aerials", "AM and FM radio, television, cellular phones"] },
          {
            cells: ["Microwaves", "Klystron valve, magnetron valve, Gunn diode", "Radar for aircraft navigation, microwave ovens for warming food"],
            noteAmber: "NEET 2026: klystron and magnetron valves produce microwaves.",
          },
          { cells: ["Infrared", "Vibration of atoms and molecules; hot bodies", "Physiotherapy, remote switches of TVs, keeping the earth warm (greenhouse effect)"] },
          { cells: ["Visible light", "Electrons in atoms moving from a higher to a lower energy level", "Seeing, photography"] },
          {
            cells: ["Ultraviolet", "Electrons in atoms moving between levels; the sun and very hot bodies", "Killing germs in water purifiers, LASIK eye surgery"],
            noteAmber: "Re-NEET 2026: UV purifies water, microwaves warm food, γ-rays treat cancer, radio waves carry AM and FM.",
            pyqExampleId: "479a854b-6c24-449a-a0d1-2abb43f56012",
          },
          { cells: ["X-rays", "X-ray tubes; inner-shell electrons", "Medical diagnosis, treatment of certain cancers"] },
          { cells: ["γ-rays", "Radioactive decay of the nucleus", "Destroying cancer cells"] },
        ],
        caption: "The deeper inside the atom the source, the shorter the wavelength.",
      },
      selfCheckExample: {
        prompt: "Name the band used in each: (a) radar that tracks an aircraft, (b) a TV remote control, (c) LASIK eye surgery.",
        steps: [
          "(a) Radar uses microwaves.",
          "(b) A remote control sends infrared.",
          "(c) LASIK eye surgery uses ultraviolet.",
        ],
        answer: "(a) Microwaves; (b) infrared; (c) ultraviolet",
      },
      practiceSet: [
        { prompt: "Which band is produced by rapid acceleration and deceleration of electrons in aerials?", answer: "Radio waves" },
        { prompt: "Which band does the ozone layer absorb?", answer: "Ultraviolet" },
        { prompt: "Which band is detected by thermopiles and bolometers?", answer: "Infrared" },
        { prompt: "What frequency range does FM radio use?", answer: "88 MHz to 108 MHz" },
      ],
      pyqExampleId: "750bf948-c5de-40d0-9986-5e47faa8c14a",
      traps: [
        {
          title: "Inner shells give X-rays, the nucleus gives γ-rays",
          body: "Both bands are very short, but X-rays come from electrons falling into inner shells of an atom, and γ-rays come from the decay of a nucleus.",
        },
        {
          title: "Radar uses microwaves",
          body: "Radar for aircraft navigation works with microwaves, not radio waves. Their short wavelength suits it.",
        },
        {
          title: "Ultraviolet purifies water",
          body: "Water purifiers kill germs with ultraviolet lamps. γ-rays are the band used to destroy cancer cells, and microwaves are the band used to warm food.",
        },
      ],
    },
  ],
};
