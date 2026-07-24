import type { SubtopicNote } from "@/app/notes/_types";

export const EM_RADIATION_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Radiation and Wave Properties",
  title: "Electromagnetic Radiation and Wave Properties",
  oneLineDefinition:
    "Light is an electromagnetic wave described by its wavelength, frequency and wavenumber; all such waves travel at the speed of light (c = nu*lambda), carry energy in quantised photons (E = h*nu = hc/lambda), and line up in a fixed spectrum from low-energy radio waves to high-energy gamma rays.",
  whyItMatters:
    "This is one of the most reliable scoring blocks in MHT-CET Chemistry Structure of Atom — almost every PYQ is a one-step plug-in: find a frequency from a wavelength, a wavelength from a wavenumber, or a photon energy from Planck's relation. The rest test a single recalled fact: which colour or radiation has the highest or lowest energy. " +
    "Learn c = nu*lambda, E = hc/lambda and the spectrum order (radio to gamma) cold, keep every quantity in SI, and you can attempt every question here on sight.",
  concepts: [
    // Wave characteristics — lambda, nu, wavenumber, amplitude, velocity
    {
      kind: "formula" as const,
      slug: "cetsoa-em-wave-characteristics",
      name: "Wave characteristics — wavelength, frequency, wavenumber, amplitude",
      intuition:
        "A travelling wave is described by four numbers. Wavelength is the length of one full cycle, frequency is how many cycles pass a fixed point each second, wavenumber is simply how many wavelengths fit in one metre (or cm), and amplitude is the height of the crest. " +
        "The bank's favourite one-liner is 'the number of waves passing a point per second' — that is frequency, not wavelength.",
      definition:
        "The four wave parameters:\n" +
        "- **Wavelength** \\(\\lambda\\) — the distance of one complete wave (crest to crest); measured in metres, nm or angstrom.\n" +
        "- **Frequency** \\(\\nu\\) — the number of waves passing a given point per second; unit hertz (\\(\\text{Hz} = \\text{s}^{-1}\\)).\n" +
        "- **Wavenumber** \\(\\bar{\\nu}\\) — the number of waves per unit length, \\(\\bar{\\nu} = \\dfrac{1}{\\lambda}\\); unit \\(\\text{m}^{-1}\\) or \\(\\text{cm}^{-1}\\).\n" +
        "- **Amplitude** — the maximum displacement (height) of the wave; it sets the brightness/intensity, NOT the energy of a photon.\n" +
        "- The wave travels at velocity \\(c\\), linking these by \\(c = \\nu\\lambda\\).",
      formula: {
        label: "Wavenumber",
        latex: "\\bar{\\nu} = \\dfrac{1}{\\lambda}",
        symbols: [
          { symbol: "\\(\\bar{\\nu}\\)", meaning: "wavenumber (m^-1 or cm^-1)" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength (m or cm, matching the wavenumber unit)" },
        ],
      },
      pyqExampleId: "89435f38-94b9-42c1-b6b7-224d3cc56364", // wavenumber of 0.25 um -> 4.0 x 10^6 m^-1
      authoredExample: {
        prompt:
          "What is the wavenumber (in m^-1) of a radiation whose wavelength is 500 nm?",
        steps: [
          "Convert the wavelength to metres: \\(\\lambda = 500\\ \\text{nm} = 500 \\times 10^{-9}\\ \\text{m} = 5 \\times 10^{-7}\\ \\text{m}\\).",
          "Wavenumber is the reciprocal: \\(\\bar{\\nu} = \\dfrac{1}{\\lambda} = \\dfrac{1}{5 \\times 10^{-7}}\\).",
        ],
        answer: "\\(\\bar{\\nu} = 2 \\times 10^{6}\\ \\text{m}^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the wavelength (in nm) of a photon whose wavenumber is \\(\\dfrac{15}{16}\\ \\text{cm}^{-1}\\).",
        steps: [
          "Wavelength is the reciprocal of wavenumber: \\(\\lambda = \\dfrac{1}{\\bar{\\nu}} = \\dfrac{16}{15}\\ \\text{cm}\\).",
          "\\(\\lambda = 1.0667\\ \\text{cm} = 1.0667 \\times 10^{-2}\\ \\text{m}\\).",
          "In nm: \\(1.0667 \\times 10^{-2}\\ \\text{m} \\times 10^{9} = 1.07 \\times 10^{7}\\ \\text{nm}\\) — a very long-wave (radio) photon.",
        ],
        answer: "\\(\\lambda \\approx 1.07 \\times 10^{7}\\ \\text{nm}\\) (i.e. \\(\\tfrac{16}{15}\\ \\text{cm}\\)).",
      },
      practiceSet: [
        { prompt: "Which parameter is the number of waves passing a given point in one second?", answer: "Frequency" },
        { prompt: "Wavenumber of a radiation of wavelength \\(0.25\\ \\mu\\text{m}\\)?", answer: "\\(4.0 \\times 10^{6}\\ \\text{m}^{-1}\\)", method: "1/(0.25 x 10^-6)" },
        { prompt: "SI unit of frequency?", answer: "Hertz (Hz = s^-1)" },
        { prompt: "Which wave property decides the intensity (brightness) but not the photon energy?", answer: "Amplitude" },
      ],
      traps: [
        {
          title: "Frequency vs wavelength — read the wording",
          body:
            "'Number of waves passing a point per second' is **frequency** \\(\\nu\\). Wavelength is the length of ONE wave (a distance), and wavenumber \\(\\bar{\\nu} = 1/\\lambda\\) is waves per unit LENGTH — do not confuse the two 'number of waves' phrasings.",
        },
        {
          title: "Match the wavenumber unit to lambda",
          body:
            "\\(\\bar{\\nu} = 1/\\lambda\\) gives \\(\\text{cm}^{-1}\\) only if \\(\\lambda\\) is in cm, and \\(\\text{m}^{-1}\\) only if \\(\\lambda\\) is in metres. Convert \\(\\mu\\text{m}\\) or nm to the required base unit FIRST (\\(0.25\\ \\mu\\text{m} = 0.25 \\times 10^{-6}\\ \\text{m}\\)).",
        },
      ],
    },

    // c = nu*lambda — speed of light relation
    {
      kind: "formula" as const,
      slug: "cetsoa-em-speed-relation",
      name: "Speed of light relation, c = nu*lambda",
      intuition:
        "Every electromagnetic wave — radio, light, X-ray — travels through vacuum at the same speed \\(c = 3 \\times 10^{8}\\ \\text{m/s}\\). Because that speed is fixed, wavelength and frequency are locked in an inverse trade-off: a shorter wavelength must have a higher frequency. " +
        "This one relation answers almost every 'find the frequency from the wavelength' PYQ in a single step.",
      definition:
        "The velocity relation for electromagnetic radiation:\n" +
        "- \\(c = \\nu\\lambda\\), so \\(\\nu = \\dfrac{c}{\\lambda}\\) and \\(\\lambda = \\dfrac{c}{\\nu}\\).\n" +
        "- \\(c = 3 \\times 10^{8}\\ \\text{m/s}\\) is the same for ALL electromagnetic radiation in vacuum.\n" +
        "- At fixed \\(c\\), frequency and wavelength are **inversely proportional**: \\(\\nu \\propto \\dfrac{1}{\\lambda}\\).\n" +
        "- Keep \\(\\lambda\\) in metres so that \\(\\nu\\) comes out in Hz (convert nm by \\(\\times 10^{-9}\\)).",
      formula: {
        label: "Speed of light relation",
        latex: "c = \\nu\\lambda \\qquad \\Rightarrow \\qquad \\nu = \\dfrac{c}{\\lambda}",
        symbols: [
          { symbol: "c", meaning: "speed of light, 3 x 10^8 m/s (same for all EM radiation)" },
          { symbol: "\\(\\nu\\)", meaning: "frequency (Hz)" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength (m)" },
        ],
      },
      pyqExampleId: "8cfd1e17-6bd8-4f83-8c51-fe4c5a3922b4", // violet 400 nm -> 7.5 x 10^14 Hz
      authoredExample: {
        prompt:
          "Calculate the frequency of light of wavelength 600 nm. (c = 3 x 10^8 m/s)",
        steps: [
          "Convert to metres: \\(\\lambda = 600\\ \\text{nm} = 600 \\times 10^{-9}\\ \\text{m} = 6 \\times 10^{-7}\\ \\text{m}\\).",
          "Use \\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3 \\times 10^{8}}{6 \\times 10^{-7}}\\).",
        ],
        answer: "\\(\\nu = 5 \\times 10^{14}\\ \\text{Hz}\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the frequency of blue light having wavelength 440 nm. (c = 3 x 10^8 m/s)",
        steps: [
          "Convert: \\(\\lambda = 440\\ \\text{nm} = 440 \\times 10^{-9}\\ \\text{m}\\).",
          "\\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3.0 \\times 10^{8}}{440 \\times 10^{-9}}\\).",
        ],
        answer: "\\(\\nu = 6.82 \\times 10^{14}\\ \\text{Hz}\\).",
      },
      practiceSet: [
        { prompt: "Frequency of radiation of wavelength 750 nm?", answer: "\\(4 \\times 10^{14}\\ \\text{Hz}\\)", method: "3x10^8 / 750x10^-9" },
        { prompt: "Frequency of violet light of wavelength 400 nm?", answer: "\\(7.5 \\times 10^{14}\\ \\text{Hz}\\)" },
        { prompt: "What is the speed of X-rays in vacuum?", answer: "\\(3 \\times 10^{8}\\ \\text{m/s}\\) (same as all EM radiation)" },
        { prompt: "If wavelength doubles at fixed c, what happens to frequency?", answer: "It halves", method: "nu proportional to 1/lambda" },
      ],
      traps: [
        {
          title: "Convert nm to metres before dividing",
          body:
            "For \\(\\nu = c/\\lambda\\) in Hz, \\(\\lambda\\) must be in **metres**. Forgetting the \\(\\times 10^{-9}\\) on a nm wavelength shifts the answer by nine orders of magnitude. \\(400\\ \\text{nm} = 400 \\times 10^{-9}\\ \\text{m} = 4 \\times 10^{-7}\\ \\text{m}\\).",
        },
        {
          title: "c is the same for every EM radiation",
          body:
            "Radio waves, visible light and gamma rays all travel at \\(3 \\times 10^{8}\\ \\text{m/s}\\) in vacuum. What differs between them is \\(\\lambda\\) and \\(\\nu\\), never \\(c\\).",
        },
      ],
    },

    // E = h*nu = hc/lambda — Planck photon energy + quantum theory
    {
      kind: "formula" as const,
      slug: "cetsoa-em-photon-energy",
      name: "Planck's quantum theory and photon energy, E = h*nu = hc/lambda",
      intuition:
        "Planck showed that energy is not radiated continuously but in tiny discrete packets called quanta (a quantum of light is a photon). The energy of one photon is set purely by its frequency — higher frequency means a more energetic photon. " +
        "Rewriting frequency as \\(c/\\lambda\\) gives the form the bank loves: \\(E = hc/\\lambda\\), so a shorter-wavelength photon carries MORE energy.",
      definition:
        "Planck's quantum theory:\n" +
        "- Radiant energy is emitted or absorbed only in whole-number multiples of a quantum: \\(E = nh\\nu\\) (n = 1, 2, 3, ...).\n" +
        "- The energy of ONE photon is \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\).\n" +
        "- Energy is **directly proportional to frequency** and **inversely proportional to wavelength**: high \\(\\nu\\) / short \\(\\lambda\\) = high energy.\n" +
        "- Planck's constant \\(h = 6.626 \\times 10^{-34}\\ \\text{J s}\\).\n" +
        "- Energy **per mole** of photons \\(= E \\times N_A\\), where \\(N_A = 6.022 \\times 10^{23}\\).",
      formula: {
        label: "Photon energy (Planck)",
        latex: "E = h\\nu = \\dfrac{hc}{\\lambda} \\qquad (\\text{per mole: } E \\times N_A)",
        symbols: [
          { symbol: "E", meaning: "energy of one photon (J)" },
          { symbol: "h", meaning: "Planck's constant, 6.626 x 10^-34 J s" },
          { symbol: "\\(\\nu\\)", meaning: "frequency (Hz)" },
          { symbol: "c", meaning: "speed of light, 3 x 10^8 m/s" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength (m)" },
          { symbol: "N_A", meaning: "Avogadro number, 6.022 x 10^23 mol^-1" },
        ],
      },
      pyqExampleId: "47573bd4-5bfb-4312-99b6-f84cb18da9d0", // energy per mole, 700 nm -> 1.71 x 10^5 J
      authoredExample: {
        prompt:
          "Calculate the energy of one photon of light of wavelength 400 nm. (h = 6.626 x 10^-34 J s, c = 3 x 10^8 m/s)",
        steps: [
          "Convert: \\(\\lambda = 400\\ \\text{nm} = 400 \\times 10^{-9}\\ \\text{m}\\).",
          "Use \\(E = \\dfrac{hc}{\\lambda} = \\dfrac{(6.626 \\times 10^{-34})(3 \\times 10^{8})}{400 \\times 10^{-9}}\\).",
          "\\(E = \\dfrac{1.9878 \\times 10^{-25}}{4 \\times 10^{-7}}\\).",
        ],
        answer: "\\(E \\approx 4.97 \\times 10^{-19}\\ \\text{J}\\) per photon.",
      },
      selfCheckExample: {
        prompt:
          "Calculate the energy per mole of photons of radiation of wavelength 500 nm. (h = 6.626 x 10^-34 J s, c = 3 x 10^8 m/s, N_A = 6.022 x 10^23)",
        steps: [
          "Energy of one photon: \\(E = \\dfrac{hc}{\\lambda} = \\dfrac{(6.626 \\times 10^{-34})(3 \\times 10^{8})}{500 \\times 10^{-9}} = 3.976 \\times 10^{-19}\\ \\text{J}\\).",
          "Multiply by Avogadro's number for energy per mole: \\(E_{\\text{mole}} = 3.976 \\times 10^{-19} \\times 6.022 \\times 10^{23}\\).",
        ],
        answer: "\\(E_{\\text{mole}} \\approx 2.39 \\times 10^{5}\\ \\text{J}\\).",
      },
      practiceSet: [
        { prompt: "Write the two equivalent forms of a photon's energy.", answer: "\\(E = h\\nu\\) and \\(E = hc/\\lambda\\)" },
        { prompt: "Value of Planck's constant (with units)?", answer: "\\(6.626 \\times 10^{-34}\\ \\text{J s}\\)" },
        { prompt: "Photon energy is directly proportional to which quantity?", answer: "Frequency (and inversely to wavelength)" },
        { prompt: "How do you convert one photon's energy to energy per mole?", answer: "Multiply by \\(N_A = 6.022 \\times 10^{23}\\)" },
      ],
      traps: [
        {
          title: "Energy goes as 1/lambda, not lambda",
          body:
            "Because \\(E = hc/\\lambda\\), a **shorter** wavelength means a **larger** energy. Do not assume the longest-wavelength radiation is the most energetic — it is the least energetic.",
        },
        {
          title: "Per photon vs per mole",
          body:
            "\\(E = hc/\\lambda\\) gives the energy of a SINGLE photon (\\(\\sim 10^{-19}\\ \\text{J}\\)). If the question asks 'per mole', you must multiply by \\(N_A = 6.022 \\times 10^{23}\\) to reach the \\(\\sim 10^{5}\\ \\text{J}\\) range.",
        },
        {
          title: "Amplitude does not set energy",
          body:
            "A photon's energy depends only on frequency/wavelength, not on amplitude. Amplitude controls intensity (number of photons / brightness), which is a different quantity.",
        },
      ],
    },

    // EM spectrum ordering (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cetsoa-em-spectrum-order",
      name: "The electromagnetic spectrum — order by frequency and energy",
      intuition:
        "The electromagnetic spectrum lays out every kind of radiation in one line. Radio waves sit at the low-energy end (longest wavelength, lowest frequency) and gamma rays at the high-energy end (shortest wavelength, highest frequency), with visible light a thin band in the middle. " +
        "The bank rarely asks for numbers — it asks 'which has the highest/lowest energy', which is a pure recall of this order.",
      definition:
        "The spectrum in order of **increasing frequency and energy** (decreasing wavelength):\n" +
        "- **Radio waves** — longest \\(\\lambda\\), lowest \\(\\nu\\), **lowest energy**.\n" +
        "- **Microwaves** — next up.\n" +
        "- **Infrared (IR)** — felt as heat.\n" +
        "- **Visible light** — the only band we see; within it the order is VIBGYOR, red lowest energy, **violet highest energy**.\n" +
        "- **Ultraviolet (UV)** — higher energy than visible.\n" +
        "- **X-rays** — high energy, penetrating.\n" +
        "- **Gamma rays** — shortest \\(\\lambda\\), highest \\(\\nu\\), **highest energy**.",
      table: {
        columns: ["Radiation (low to high energy)", "Wavelength / frequency", "Energy"],
        rows: [
          {
            cells: ["Radio waves", "Longest wavelength, lowest frequency", "Lowest energy"],
            noteAmber: "MHT-CET — of radio waves, microwaves, IR and UV, radio waves have the LOWEST energy.",
          },
          { cells: ["Microwaves", "Long wavelength, low frequency", "Very low"] },
          { cells: ["Infrared (IR)", "Longer than visible", "Low (felt as heat)"] },
          {
            cells: ["Visible light (VIBGYOR)", "400–700 nm; red longest, violet shortest", "Red lowest, violet highest"],
            noteAmber: "Within visible light, VIOLET has the highest energy and RED the lowest (energy increases R->V).",
          },
          { cells: ["Ultraviolet (UV)", "Shorter than visible", "Higher than visible"] },
          { cells: ["X-rays", "Very short wavelength", "High, penetrating"] },
          { cells: ["Gamma rays", "Shortest wavelength, highest frequency", "Highest energy"] },
        ],
        caption:
          "Energy increases from radio waves to gamma rays: E proportional to frequency proportional to 1/wavelength.",
      },
      pyqExampleId: "775183db-fae5-4df1-9857-ee4f2d128a35", // highest energy colour -> violet
      selfCheckExample: {
        prompt:
          "Which of these electromagnetic radiations possesses the lowest energy: radio waves, microwaves, infrared, or ultraviolet?",
        steps: [
          "Energy increases along radio -> microwave -> IR -> visible -> UV -> X-ray -> gamma.",
          "Of the four listed, radio waves are furthest to the low-energy (longest wavelength) end.",
        ],
        answer: "Radio waves have the lowest energy.",
      },
      practiceSet: [
        { prompt: "Which coloured visible light has the highest energy?", answer: "Violet", method: "highest frequency in VIBGYOR" },
        { prompt: "Which visible colour has the lowest energy?", answer: "Red" },
        { prompt: "Which EM radiation has the highest energy overall?", answer: "Gamma rays" },
        { prompt: "Which has lower energy: microwaves or ultraviolet?", answer: "Microwaves" },
        { prompt: "Order red, blue and violet from lowest to highest energy.", answer: "Red < Blue < Violet" },
      ],
      traps: [
        {
          title: "Long wavelength = LOW energy",
          body:
            "Radio waves have the LONGEST wavelength, so by \\(E = hc/\\lambda\\) they carry the **least** energy — a common trap is to pick them as 'highest'. Highest energy always goes to the shortest-wavelength radiation (gamma rays; violet among the visible colours).",
        },
        {
          title: "VIBGYOR direction",
          body:
            "Reading VIBGYOR, violet is at the high-frequency (high-energy) end and red at the low-energy end. Energy rises from Red to Violet, so 'highest energy colour' is **violet**, not red.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Atomic structure — Bohr's model and hydrogen spectrum",
      href: "/notes/mht-cet-chemistry/structure-of-atom",
    },
  ],
};
