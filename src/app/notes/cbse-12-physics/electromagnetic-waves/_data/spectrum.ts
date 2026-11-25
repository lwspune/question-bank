import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EW_SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Spectrum",
  title: "Electromagnetic Spectrum",
  oneLineDefinition:
    "The seven bands of electromagnetic waves in order of wavelength, their wavelength ranges, how to place a wave from its wavelength or frequency, how each band is produced and detected, and what each is used for.",
  whyItMatters:
    "47 questions. Forty-four were set in board papers from 2022 to 2026, more than in any other part of the chapter: name the waves used for a given job and write their wavelength or frequency range (every year), which rays purify water (2022, 2023, 2024, 2026) and which rays welders' goggles stop (2024, 2026), why infrared is called heat waves (2023, 2024, 2026), how X-rays are produced (2023, 2025, 2026), and the order of the bands by wavelength or frequency (2022 to 2025). The textbook adds what is the same for X-rays, red light and radio waves, the wavelength band of a radio, and the photon energy of each part of the spectrum.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpew-spectrum-order",
      name: "The order of the bands and their wavelength ranges",
      intuition:
        "Radio waves and gamma rays are the same kind of wave: changing electric and magnetic fields travelling at c. The only real difference between the bands is the wavelength, and so the frequency. Line them up from longest to shortest wavelength: radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays. Frequency rises in the same order. Pin visible light at 700 nm to 400 nm and the neighbours fall into place on either side.",
      definition:
        "- All bands travel in vacuum at the same speed c, so \\(\\nu = c/\\lambda\\): as the wavelength falls, the frequency rises.\n" +
        "- Increasing wavelength: gamma rays, X-rays, ultraviolet, visible, infrared, microwaves, radio waves. Increasing frequency is the reverse.\n" +
        "- There is no sharp division between one band and the next; the ranges overlap (X-rays and gamma rays do). The names come roughly from how the waves are produced or detected.\n" +
        "- Because the bands differ in wavelength, they differ greatly in how they interact with matter: radio passes through walls, visible light is seen, X-rays pass through flesh.\n" +
        "- Write the wavelength ranges below in an answer that asks for the range.",
      table: {
        columns: ["Band", "Wavelength range", "Frequency, roughly"],
        rows: [
          { cells: ["Radio waves", "more than 0.1 m", "below \\(3 \\times 10^{9}\\) Hz"] },
          { cells: ["Microwaves", "0.1 m to 1 mm", "\\(3 \\times 10^{9}\\) Hz to \\(3 \\times 10^{11}\\) Hz"] },
          { cells: ["Infrared", "1 mm to 700 nm", "\\(3 \\times 10^{11}\\) Hz to \\(4 \\times 10^{14}\\) Hz"] },
          { cells: ["Visible light", "700 nm to 400 nm", "\\(4 \\times 10^{14}\\) Hz to \\(7.5 \\times 10^{14}\\) Hz"] },
          { cells: ["Ultraviolet", "400 nm to 1 nm", "\\(7.5 \\times 10^{14}\\) Hz to \\(3 \\times 10^{17}\\) Hz"] },
          {
            cells: ["X-rays", "1 nm to \\(10^{-3}\\) nm", "\\(3 \\times 10^{17}\\) Hz to \\(3 \\times 10^{20}\\) Hz"],
            pyqExampleId: "fabb87c7-aed6-4d55-bc96-d76a31268e9c",
            noteAmber: "Board 2026 asked the wavelength range of the waves used as a diagnostic tool in medicine.",
          },
          { cells: ["Gamma rays", "less than \\(10^{-3}\\) nm", "above \\(3 \\times 10^{20}\\) Hz"] },
        ],
        caption: "The frequency column is c divided by the wavelength at each edge of the range. 1 nm = \\(10^{-9}\\) m.",
      },
      selfCheckExample: {
        prompt: "Arrange in increasing order of wavelength: ultraviolet, microwaves, gamma rays, infrared.",
        steps: ["Shortest first: gamma rays, then ultraviolet, then infrared, then microwaves."],
        answer: "Gamma rays < ultraviolet < infrared < microwaves",
      },
      practiceSet: [
        { prompt: "Which band lies next to the low-frequency (red) end of the visible spectrum?", answer: "Infrared" },
        { prompt: "Which band has the shortest wavelength?", answer: "Gamma rays" },
        { prompt: "What is the same for radio waves and X-rays travelling in vacuum?", answer: "Their speed, \\(c = 3 \\times 10^{8}\\) m/s" },
        { prompt: "Are the wavelengths of microwaves longer or shorter than those of visible light?", answer: "Longer" },
      ],
      pyqExampleId: "8c048f24-b4b0-4560-81bf-091df588d02d",
      traps: [
        {
          title: "Turning the order round for frequency",
          body: "The order of increasing frequency is the reverse of increasing wavelength: radio lowest, gamma highest. Read which one the question asks before writing the list.",
        },
        {
          title: "Infrared beyond red, ultraviolet beyond violet",
          body: "Infrared has a longer wavelength than red light; ultraviolet has a shorter wavelength than violet. Writing infrared at 300 nm puts it on the wrong side of the visible band.",
        },
        {
          title: "Giving every band a different speed",
          body: "Going from microwaves to X-rays the wavelength falls and the frequency rises, but the speed in vacuum stays c.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpew-band-from-wavelength",
      name: "Placing a wave in the spectrum from its wavelength or frequency",
      intuition:
        "Given a frequency, turn it into a wavelength with \\(\\lambda = c/\\nu\\) and see which range it falls in. The energy of each photon rises as the wavelength falls, \\(E = hc/\\lambda\\), which is why the short-wave end of the spectrum is the dangerous end. And each band's photon energy matches the process that makes it: tiny for currents in an aerial, bigger for vibrating molecules, a few electronvolts for electrons jumping in atoms, far more for inner electrons and for the nucleus.",
      definition:
        "- \\(\\lambda = \\dfrac{c}{\\nu}\\). Convert to metres (1 nm = \\(10^{-9}\\) m), then compare with the wavelength table.\n" +
        "- Photon energy \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\). With \\(hc = 1.24 \\times 10^{-6}\\) eV m: \\(E\\ (\\text{eV}) = \\dfrac{1.24 \\times 10^{-6}}{\\lambda\\ (\\text{m})}\\).\n" +
        "- Typical photon energies: radio at 1 m, about \\(10^{-6}\\) eV; visible at 500 nm, about 2.5 eV; X-rays at \\(10^{-10}\\) m, about \\(10^{4}\\) eV; gamma rays, about \\(10^{6}\\) eV and more. The scale matches the source: the energy gaps of the system that emits the radiation.\n" +
        "- Shorter wavelength means higher frequency and more energy per photon. That is why X-rays are more harmful than ultraviolet.\n" +
        "- When a wave passes from one medium into another, its frequency stays the same, because it is set by the source; its speed changes, so its wavelength changes.\n" +
        "- A longer wavelength bends more round obstacles (diffracts more), so radio waves diffract more than infrared.",
      formula: {
        label: "Wavelength and photon energy",
        latex: "\\lambda = \\frac{c}{\\nu}, \\qquad E = h\\nu = \\frac{hc}{\\lambda}",
      },
      authoredExample: {
        prompt:
          "An electromagnetic wave has a frequency of \\(5 \\times 10^{13}\\) Hz. Find its wavelength, name the band it belongs to, and find the energy of each photon in eV. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J)",
        steps: [
          "Given: \\(\\nu = 5 \\times 10^{13}\\) Hz, \\(c = 3 \\times 10^{8}\\) m/s.",
          "\\(\\lambda = \\dfrac{c}{\\nu} = \\dfrac{3 \\times 10^{8}}{5 \\times 10^{13}} = 6 \\times 10^{-6}\\) m, that is 6000 nm.",
          "6000 nm lies between 700 nm and 1 mm, so the wave is infrared.",
          "\\(E = h\\nu = (6.63 \\times 10^{-34})(5 \\times 10^{13}) = 3.32 \\times 10^{-20}\\) J.",
          "\\(E = \\dfrac{3.32 \\times 10^{-20}}{1.6 \\times 10^{-19}} = 0.21\\) eV.",
        ],
        answer: "\\(6 \\times 10^{-6}\\) m; infrared; about 0.21 eV",
      },
      selfCheckExample: {
        prompt: "A wave has a wavelength of 3 cm. Find its frequency and name its band.",
        steps: [
          "\\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3 \\times 10^{8}}{0.03} = 10^{10}\\) Hz.",
          "0.03 m lies between 0.1 m and 1 mm.",
        ],
        answer: "\\(10^{10}\\) Hz; microwaves",
      },
      practiceSet: [
        { prompt: "To which band does a wavelength of 500 nm belong?", answer: "Visible light" },
        { prompt: "Why are X-rays more harmful to the body than ultraviolet rays?", answer: "Their wavelength is shorter, so their frequency and the energy of each photon are higher" },
        { prompt: "Light passes from air into glass. Which of its frequency, wavelength and speed stays the same?", answer: "Its frequency" },
      ],
      pyqExampleId: "0f60fdc0-16db-40b2-bc5f-7c929be1e35e",
      traps: [
        {
          title: "Comparing without converting units",
          body: "Put the wavelength in metres or in nanometres before you compare it with a range. A wavelength of 10 nm is ultraviolet; it only looks like an X-ray if the units are mixed.",
        },
        {
          title: "Higher frequency is not higher speed",
          body: "A higher frequency means a shorter wavelength and more energetic photons. The speed in vacuum is c for every band.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpew-production",
      name: "How each band is produced and detected, and why infrared is called heat waves",
      intuition:
        "Each band comes from a process on its own scale. Electrons surging along an aerial give radio waves; special valves give microwaves; vibrating molecules in warm bodies give infrared; electrons dropping between levels in atoms give light and ultraviolet; fast electrons crashing into a metal give X-rays; and decaying nuclei give gamma rays. Learn the source with the band.",
      definition:
        "- **Infrared is called heat waves** because water molecules, present in most materials, readily absorb it (so do others such as CO₂ and NH₃). After absorbing it their thermal motion increases: they heat up and heat their surroundings.\n" +
        "- Ultraviolet comes from special lamps and very hot bodies; the sun is an important source. Most of the sun's ultraviolet is absorbed by the ozone layer, about 40 km to 50 km up.\n" +
        "- X-rays are made by bombarding a metal target with **high energy** electrons.\n" +
        "- Gamma rays come from nuclear reactions and are also emitted by radioactive nuclei.\n" +
        "- The wavelength is often linked to the size of the system that radiates: gamma rays of \\(10^{-14}\\) m to \\(10^{-15}\\) m come from the nucleus, X-rays from heavy atoms, radio waves from electrons accelerating in a circuit, and an antenna radiates best a wavelength about its own size. Board 2024 asked for two examples.\n" +
        "- The same 2024 question asked why long-distance radio uses short-wave bands and why X-ray astronomy needs satellites. The present NCERT book does not cover these, so give them little time: short waves are reflected back to earth by the ionosphere, and the atmosphere absorbs X-rays, so they never reach the ground.",
      table: {
        columns: ["Band", "Produced by", "Detected by"],
        rows: [
          { cells: ["Radio waves", "Rapid acceleration and deceleration of electrons in aerials", "Receivers' aerials"] },
          { cells: ["Microwaves", "Klystron valve, magnetron valve, Gunn diode", "Point contact diodes"] },
          {
            cells: ["Infrared", "Hot bodies: vibration of atoms and molecules", "Thermopiles, bolometers, infrared photographic film"],
            pyqExampleId: "7f438934-09bb-4186-8e31-648c5206e8fa",
            noteAmber: "Board 2024 asked one way each to produce and to detect infrared and ultraviolet.",
          },
          { cells: ["Visible light", "Electrons in atoms moving from one energy level to a lower one", "The eye, photocells, photographic film"] },
          { cells: ["Ultraviolet", "Special lamps, very hot bodies and the sun (inner shell electrons moving to a lower level)", "Photocells, photographic film"] },
          {
            cells: ["X-rays", "X-ray tubes: high energy electrons striking a metal target (inner shell electrons)", "Photographic film, Geiger tubes, ionisation chamber"],
            pyqExampleId: "ebb06c6d-36b9-4773-8ab5-93ca6fd64597",
            noteAmber: "Board 2023 asked how X-rays are produced.",
          },
          { cells: ["Gamma rays", "Radioactive decay of the nucleus; nuclear reactions", "Photographic film, Geiger tubes, ionisation chamber"] },
        ],
      },
      selfCheckExample: {
        prompt: "Name the band produced by a magnetron valve, and one detector for it.",
        steps: ["Klystron and magnetron valves make microwaves.", "Microwaves are detected by point contact diodes."],
        answer: "Microwaves; a point contact diode",
      },
      practiceSet: [
        { prompt: "Why are infrared waves called heat waves?", answer: "Water molecules in most materials readily absorb them; their thermal motion increases, so the material heats up" },
        { prompt: "Which waves are produced when high energy electrons strike a metal target?", answer: "X-rays" },
        { prompt: "Which waves are emitted in the radioactive decay of a nucleus?", answer: "Gamma rays" },
        { prompt: "Name one detector for gamma rays.", answer: "A Geiger tube (or an ionisation chamber, or photographic film)" },
      ],
      pyqExampleId: "7f438934-09bb-4186-8e31-648c5206e8fa",
      traps: [
        {
          title: "Slow electrons do not give X-rays",
          body: "X-rays need high energy (fast) electrons striking the target. An assertion with 'slow moving electrons' is false.",
        },
        {
          title: "Inner electrons give X-rays, the nucleus gives gamma rays",
          body: "Both bands are very short, but X-rays come from electrons in atoms and gamma rays from the nucleus. Swapping the two sources is a common lost mark.",
        },
        {
          title: "Heat waves: give the reason, not just the name",
          body: "'Why are they called heat waves?' needs the reason: they are readily absorbed by water molecules, whose thermal motion then increases.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpew-uses",
      name: "Uses of each band",
      intuition:
        "Each use follows from what the band does. Long radio waves carry signals. Microwaves have short enough wavelengths for a narrow radar beam and match the water molecule, so they cook. Infrared is absorbed as heat. Ultraviolet kills germs and can be focused into very fine beams. X-rays pass through flesh but not bone. Gamma rays carry enough energy to destroy cancer cells.",
      definition:
        "- Many board questions ask the name **and** the wavelength range: write both.\n" +
        "- Radio bands: AM 530 kHz to 1710 kHz; short wave up to 54 MHz; TV 54 MHz to 890 MHz; FM 88 MHz to 108 MHz. Mobile phones use the UHF band.\n" +
        "- Infrared keeps the earth warm through the **greenhouse effect**: the earth absorbs visible light and re-radiates infrared, which carbon dioxide and water vapour trap.\n" +
        "- Ultraviolet is absorbed by ordinary glass, so you cannot get sunburnt through a glass window, and welders' glass goggles or face masks protect their eyes from the large amount of ultraviolet that welding arcs produce.\n" +
        "- X-rays damage or destroy living tissue, so unnecessary exposure must be avoided.",
      table: {
        columns: ["Band", "Uses", "Point to remember"],
        rows: [
          { cells: ["Radio waves", "Radio and television communication; mobile phones", "FM radio is 88 MHz to 108 MHz"] },
          {
            cells: ["Microwaves", "Radar for aircraft navigation; speed guns; microwave ovens", "The oven's frequency matches the resonant frequency of water molecules, so food must contain water"],
            pyqExampleId: "53e15700-f828-44ae-9091-afb0fe7eb0e8",
            noteAmber: "Board 2024 asked why food heated in a microwave oven must contain water.",
          },
          { cells: ["Infrared", "Physical therapy lamps; remote switches of TV sets; detectors in Earth satellites; keeping the earth warm", "Remote switches use infrared from LEDs"] },
          { cells: ["Visible light", "Seeing the world around us", "The eye is sensitive to 400 nm to 700 nm"] },
          {
            cells: ["Ultraviolet", "Killing germs in water purifiers; LASIK eye surgery", "Short wavelength lets it be focused into very narrow beams; glass absorbs it"],
            pyqExampleId: "ae04c790-a3fa-47fe-9ff0-62c779170622",
            noteAmber: "Board 2024 and 2026 asked which rays welders' goggles protect against.",
          },
          { cells: ["X-rays", "Diagnostic tool in medicine, such as finding bone fractures; treating certain forms of cancer", "They damage living tissue"] },
          { cells: ["Gamma rays", "Destroying cancer cells", "They come from nuclei and have the shortest wavelength"] },
        ],
      },
      selfCheckExample: {
        prompt: "Name the waves used (a) in LASIK eye surgery, (b) in physiotherapy lamps, (c) in speed guns.",
        steps: ["(a) Ultraviolet focuses into very narrow beams.", "(b) Infrared is absorbed as heat.", "(c) Speed guns work on radar, which uses microwaves."],
        answer: "(a) Ultraviolet; (b) infrared; (c) microwaves",
      },
      practiceSet: [
        { prompt: "Which radiation keeps the earth warm through the greenhouse effect?", answer: "Infrared" },
        { prompt: "Why can you not get sunburnt through a glass window?", answer: "Ordinary glass absorbs ultraviolet" },
        { prompt: "Which waves are used to destroy cancer cells?", answer: "Gamma rays" },
        { prompt: "Which waves are used in radar systems?", answer: "Microwaves" },
      ],
      pyqExampleId: "960972eb-c25d-4186-bd0d-89cc283114b1",
      traps: [
        {
          title: "A use without its range",
          body: "'Name the waves and write their wavelength range' gives a mark for each part. 'X-rays' alone earns half; write 'X-rays, 1 nm to \\(10^{-3}\\) nm'.",
        },
        {
          title: "Ultrasonic is not electromagnetic",
          body: "Ultrasound is a sound wave and needs a medium. When an option offers 'ultrasonic rays' for purifying water, the electromagnetic answer is ultraviolet.",
        },
        {
          title: "Radar is microwaves, eye surgery is ultraviolet",
          body: "Radar uses microwaves, not radio waves. LASIK eye surgery uses ultraviolet, not X-rays.",
        },
      ],
    },
  ],
};
