import type { SubtopicNote } from "@/app/notes/_types";

export const LIGHT_PHENOMENA_AND_SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Light Phenomena and Spectrum",
  title: "Light Phenomena and the Electromagnetic Spectrum",
  oneLineDefinition:
    "Light is an electromagnetic wave that travels in straight lines at ~3 × 10⁸ m/s. The EM spectrum runs from radio (longest wavelength) to gamma (shortest); scattering explains the blue sky and red sunset; polarization proves light is transverse; and the primary colours of light are red, green, blue.",
  whyItMatters:
    "The biggest subtopic — 29 PYQs, overwhelmingly EASY recall, so the highest-yield block of marks in the chapter. The recurring tests are: the speed of light and the 8-minute Sun fact, the wavelength ordering of the EM spectrum (X-ray smallest, microwave/radio largest), scattering (blue sky, red sunset, Tyndall), the primary colours, and the wave facts — polarization, the eye responding to the electric field, and that sound is NOT an EM wave.",
  concepts: [
    // 1 — speed of light + rectilinear propagation
    {
      kind: "formula" as const,
      slug: "speed-and-propagation-of-light",
      name: "Speed of light and straight-line travel",
      intuition:
        "Light is the fastest thing there is — about 3 × 10⁸ m/s (3 lakh km/s) in vacuum, and it takes roughly 8 minutes to reach us from the Sun. In a uniform medium it travels in perfectly straight lines, which is why a sunbeam through dusty air looks like a straight ray. When light leaves a denser medium (water, glass) for air, it speeds back up.",
      definition:
        "Light is an electromagnetic wave travelling at **\\(c \\approx 3 \\times 10^8\\) m/s** (= 3 lakh km/s ≈ 300 million m/s) in vacuum/air.\n" +
        "- **Sun to Earth:** light takes about **8 minutes**.\n" +
        "- **Rectilinear propagation:** in a uniform medium light travels in straight lines (a dusty sunbeam is visible because dust **scatters** the straight-travelling light into our eyes).\n" +
        "- Light **speeds up** when it passes from a denser medium into a rarer one (e.g. water → air), and slows down going the other way; its speed in any material is less than in vacuum.",
      authoredExample: {
        prompt:
          "A statement claims 'light speeds down as it leaves a water surface and enters the air'. Is it correct?",
        steps: [
          "Air is rarer than water (lower refractive index), so light travels faster in air.",
          "Leaving water for air, light therefore SPEEDS UP, not down.",
          "The statement is incorrect.",
        ],
        answer: "No — light speeds UP when it leaves water and enters air.",
      },
      selfCheckExample: {
        prompt:
          "Roughly how long does light take to travel from the Sun to the Earth?",
        steps: [
          "The Sun is about 1.5 × 10⁸ km away; light travels at 3 × 10⁵ km/s.",
          "Time ≈ distance / speed ≈ 1.5 × 10⁸ / 3 × 10⁵ ≈ 500 s ≈ 8 minutes.",
        ],
        answer: "About 8 minutes.",
      },
      practiceSet: [
        { prompt: "Speed of light in vacuum (order of magnitude)?", answer: "≈ 3 × 10⁸ m/s" },
        { prompt: "Time for sunlight to reach Earth?", answer: "About 8 minutes" },
        { prompt: "Does light speed up or slow down going from glass to air?", answer: "Speeds up" },
        { prompt: "A dusty sunbeam is visible because dust does what to light?", answer: "Scatters it into our eyes" },
      ],
      pyqExampleId: "97b0a8e4-5e0e-4cb9-9513-062217f662ce", // 2021 — light speeds UP leaving water (false statement)
      traps: [
        {
          title: "Light speeds UP leaving a denser medium",
          body:
            "Going from water/glass into air, light enters a rarer medium and speeds up. The trap statement claims it 'speeds down' — wrong. Also note c is 3 lakh KILOmetres per second, not metres per second.",
        },
      ],
    },

    // 2 — EM spectrum (REFERENCE)
    {
      kind: "reference" as const,
      slug: "electromagnetic-spectrum",
      name: "The electromagnetic spectrum",
      intuition:
        "All electromagnetic waves are the same kind of thing — oscillating electric and magnetic fields travelling at the speed of light, able to move through vacuum. They differ only in wavelength (and so frequency and energy). Going from longest wavelength to shortest: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. Shorter wavelength means higher frequency and higher photon energy.",
      definition:
        "EM waves share these properties: they are **not elastic** (need no medium), they **travel in vacuum**, their **electric and magnetic fields are mutually perpendicular**, and they move at \\(c\\).\n" +
        "Ordering by **decreasing wavelength** (increasing energy): Radio → Microwave → Infrared → **Visible** → Ultraviolet → X-ray → Gamma.\n" +
        "- **X-rays:** wavelength ≈ 0.01–10 nm (≈ 1 Å = 0.1 nm); smallest wavelength among radio/UV/visible/X-ray.\n" +
        "- Energy: X-ray photon > UV photon > visible photon (shorter wavelength ⟹ more energy). Visible wavelength > X-ray wavelength.\n" +
        "Sound is NOT an electromagnetic wave — it is a mechanical wave needing a medium.",
      table: {
        columns: ["Wave / band", "Typical wavelength", "Use / note"],
        rows: [
          { cells: ["**Radio waves**", "> 1 m", "Longest wavelength; broadcasting, communication"] },
          { cells: ["**Microwaves**", "mm to cm", "Radar, microwave ovens; LONGER wavelength than light"] },
          { cells: ["**Infrared**", "~700 nm to 1 mm", "Heat waves; absorbed strongly by water"] },
          { cells: ["**Visible light**", "≈ 400–700 nm", "The only band the eye detects"] },
          {
            cells: ["**Ultraviolet (UV)**", "≈ 10–400 nm", "Detects forgery in currency notes; higher energy than visible"],
            pyqExampleId: "2d9ce33c-c0bf-422b-82e4-8951380fc46a",
          },
          {
            cells: ["**X-rays**", "≈ 0.01–10 nm (≈ 1 Å)", "Smallest wavelength of the common four; medical imaging"],
            noteAmber: "X-ray ≈ 1 nm ≈ 1 Å — the standard tested value. Smallest wavelength among radio/UV/visible/X-ray.",
          },
          { cells: ["**Gamma rays**", "< 0.01 nm", "Highest energy of all"] },
        ],
        caption:
          "Memorise the ORDER (radio longest → gamma shortest) and the X-ray value (≈ 1 nm ≈ 1 Å). Sound is not on this list — it is mechanical, not electromagnetic.",
      },
      selfCheckExample: {
        prompt:
          "Which of these does NOT belong with the other three: radio waves, X-rays, microwaves, sound waves?",
        steps: [
          "Radio, X-rays and microwaves are all electromagnetic waves — they travel in vacuum at c.",
          "Sound is a mechanical wave that needs a medium and travels far slower.",
          "So sound waves are the odd one out.",
        ],
        answer: "Sound waves (the only non-electromagnetic wave).",
      },
      practiceSet: [
        { prompt: "Which has the smallest wavelength: visible, UV, X-ray, microwave?", answer: "X-ray" },
        { prompt: "Wavelength of X-rays is of the order of?", answer: "≈ 1 Å (≈ 0.1–1 nm)" },
        { prompt: "Which radiation is used to detect forgery in currency notes?", answer: "Ultraviolet" },
        { prompt: "Which has the longer wavelength: microwave or visible light?", answer: "Microwave" },
        { prompt: "Is sound an electromagnetic wave?", answer: "No (it is mechanical)" },
        { prompt: "Rank photon energy: X-ray, UV, visible (highest first).", answer: "X-ray > UV > visible" },
      ],
      pyqExampleId: "1ca86623-0f9e-4049-a260-33496f190a6b", // 2022 — X-ray wavelength = 1 nm
      traps: [
        {
          title: "Shorter wavelength = higher energy; UV beats visible",
          body:
            "UV photons have MORE energy than visible photons (UV has the shorter wavelength). The trap statement 'UV energy is less than visible' is false. X-ray > UV > visible in energy.",
        },
        {
          title: "EM waves are NOT elastic and DO travel in vacuum",
          body:
            "EM waves need no medium (not elastic) and travel through vacuum. Their speed is 3 lakh KM/s. A statement saying they are elastic or move at '3 lakh metres per second' is wrong.",
        },
      ],
    },

    // 3 — scattering
    {
      kind: "formula" as const,
      slug: "scattering-of-light",
      name: "Scattering — blue sky and red sunset",
      intuition:
        "When sunlight hits tiny particles and air molecules, they re-radiate it in all directions — that's scattering. Short wavelengths (blue) scatter much more than long ones (red), so the daytime sky is blue. At sunrise and sunset the light travels through much more atmosphere, the blue is scattered away, and the Sun looks red. The Tyndall effect is the same scattering by larger colloidal particles.",
      definition:
        "**Scattering** is the redirection of light by particles/molecules in its path; shorter wavelengths scatter more strongly.\n" +
        "- **Blue sky:** blue (short wavelength) is scattered far more than red by air molecules.\n" +
        "- **Red Sun at sunrise/sunset:** sunlight passes through more atmosphere, blue is scattered away, leaving the red/orange to reach us.\n" +
        "- **Tyndall effect:** scattering of light by **colloidal** particles (visible beam through a colloid/fog).\n" +
        "- The visible dusty sunbeam is dust scattering light into the eye.\n" +
        "(Contrast: the **twinkling** of stars and the early sunrise are atmospheric **refraction**, not scattering.)",
      authoredExample: {
        prompt:
          "Why does the Sun appear reddish at sunrise and sunset but white overhead at noon?",
        steps: [
          "At sunrise/sunset, sunlight travels a long slanted path through the atmosphere.",
          "The short-wavelength blue light is scattered away over that long path (Rayleigh scattering).",
          "Mostly the longer-wavelength red/orange light survives to reach our eyes, so the Sun looks reddish.",
        ],
        answer: "Scattering removes the blue over the long atmospheric path, leaving red.",
      },
      selfCheckExample: {
        prompt:
          "The Tyndall effect is a phenomenon of what, and by which kind of particles?",
        steps: [
          "Tyndall effect makes a light beam visible as it passes through a medium.",
          "It is caused by scattering of light.",
          "The scatterers are colloidal-sized particles.",
        ],
        answer: "Scattering of light by colloidal particles.",
      },
      practiceSet: [
        { prompt: "Why is the daytime sky blue?", answer: "Blue light scatters more than red" },
        { prompt: "The reddish Sun at sunset is due to which phenomenon?", answer: "Scattering" },
        { prompt: "Tyndall effect is scattering by which particles?", answer: "Colloidal particles" },
        { prompt: "When sunlight passes through the atmosphere, which colour is scattered more?", answer: "Blue (more than red)" },
      ],
      pyqExampleId: "a19b1753-5dd9-4ba7-8c68-444fb8a4a887", // 2020 — reddish Sun = scattering
      traps: [
        {
          title: "Sky/sunset colour = scattering; twinkling/early-sunrise = refraction",
          body:
            "The blue sky and red sunset are SCATTERING. The twinkling of stars and seeing the Sun before it rises are atmospheric REFRACTION. NDA tests both in the same paper — keep them apart.",
        },
      ],
    },

    // 4 — colours of light (REFERENCE)
    {
      kind: "reference" as const,
      slug: "colours-of-light",
      name: "Colours of light and the spectrum",
      intuition:
        "White light is made of seven colours (VIBGYOR), as Newton first showed with a prism. But the eye builds all colours from just three primary colours of LIGHT — red, green and blue — which add to make white. Mixing red and green light gives yellow. (This is colour by addition of light, different from mixing paints.)",
      definition:
        "Key colour facts tested by NDA:",
      table: {
        columns: ["Fact", "Value"],
        rows: [
          {
            cells: ["Primary colours of **light**", "**Red, Green, Blue** (RGB)"],
            noteAmber: "These ADD to white. Distinct from the primary pigments (paints).",
          },
          { cells: ["Red + Green light gives", "**Yellow**"] },
          { cells: ["Blue + Green light gives", "Cyan"] },
          { cells: ["Red + Blue light gives", "Magenta"] },
          { cells: ["Red + Green + Blue gives", "White"] },
          {
            cells: ["First obtained sunlight's spectrum with a prism", "**Isaac Newton**"],
            pyqExampleId: "73dcbac1-974f-4d3f-97e7-1a1d6addf17c",
          },
          { cells: ["Order of colours in white light", "VIBGYOR (Violet → Red)"] },
        ],
        caption:
          "The three primary colours of light are Red, Green, Blue; red + green = yellow; Newton first dispersed sunlight with a prism.",
      },
      selfCheckExample: {
        prompt:
          "Which colour is obtained by combining green light and red light?",
        steps: [
          "Red and green are two of the three primary colours of light.",
          "Adding red and green light produces yellow.",
        ],
        answer: "Yellow.",
      },
      practiceSet: [
        { prompt: "The three primary colours of light?", answer: "Red, Green, Blue" },
        { prompt: "Red light + green light =", answer: "Yellow" },
        { prompt: "Who first used a prism to obtain the spectrum of sunlight?", answer: "Isaac Newton" },
        { prompt: "Red + green + blue light combined gives…", answer: "White" },
      ],
      pyqExampleId: "71e945f5-46dc-4ee1-8041-204dc9ffd35d", // 2021 — primary colours RGB
      traps: [
        {
          title: "Primary colours of LIGHT are R, G, B — not R, Y, B",
          body:
            "Red, Green, Blue are the primary colours of light (they add to white). Red-Yellow-Blue are pigment/paint primaries. The question almost always means light, so the answer is RGB.",
        },
      ],
    },

    // 5 — wave nature + devices
    {
      kind: "formula" as const,
      slug: "wave-nature-and-devices",
      name: "Wave nature of light and related devices",
      intuition:
        "Light shows wave behaviour — and one of those behaviours, polarization, can only happen for transverse waves, which proves light is transverse. The eye responds to the electric-field part of the wave. A few devices and one-liners round out the topic: a solar cell turns light into electricity, and infrared is the 'heat' part of the spectrum that water absorbs strongly.",
      definition:
        "- **Polarization** restricts a wave's vibrations to one plane — only possible for **transverse** waves. So polarization is the phenomenon that proves light is a transverse wave (refraction, diffraction and interference happen for longitudinal waves too).\n" +
        "- The human eye is sensitive to the **electric field** component of an EM wave (not the magnetic field, not infrared).\n" +
        "- **Solar cell:** converts **light energy into electrical energy**.\n" +
        "- **Infrared = heat waves**, and **water absorbs infrared strongly** (vibrational resonance) — so IR is the correct explanation for why water heats up under sunlight.\n" +
        "- For totally reflecting surfaces, radiation force \\(\\propto\\) area; halving the area halves the force.",
      authoredExample: {
        prompt:
          "Which optical phenomenon proves that light is a transverse wave: refraction, diffraction, interference, or polarization?",
        steps: [
          "Refraction, diffraction and interference occur for both transverse and longitudinal waves.",
          "Polarization confines vibrations to a single plane — only possible if the wave is transverse.",
          "So polarization is the one that demonstrates light's transverse nature.",
        ],
        answer: "Polarization.",
      },
      selfCheckExample: {
        prompt:
          "With respect to electromagnetic waves, to which component is the human eye sensitive?",
        steps: [
          "An EM wave has an oscillating electric field and a magnetic field, perpendicular to each other.",
          "The eye's response (and most light-matter interaction) is to the electric field.",
        ],
        answer: "The electric field only.",
      },
      practiceSet: [
        { prompt: "Which phenomenon shows light is transverse?", answer: "Polarization" },
        { prompt: "The eye responds to which component of an EM wave?", answer: "The electric field" },
        { prompt: "A solar cell converts light energy into…", answer: "Electrical energy" },
        { prompt: "Infrared waves are also called…", answer: "Heat waves" },
        { prompt: "Halving the area of a totally reflecting surface does what to the radiation force?", answer: "Halves it", method: "force ∝ area" },
      ],
      pyqExampleId: "35c9a76c-a00a-4f29-a587-879ef5bfd264", // 2023 — polarization proves transverse
      traps: [
        {
          title: "Only polarization proves transverse nature",
          body:
            "Refraction, diffraction and interference all happen for longitudinal waves (like sound) too, so they cannot prove light is transverse. Polarization is the unique discriminator.",
        },
        {
          title: "The eye responds to the ELECTRIC field",
          body:
            "Of an EM wave's two fields, it is the electric field that the eye (and detectors generally) respond to — not the magnetic field, and certainly not the infrared band.",
        },
      ],
    },
  ],
};
