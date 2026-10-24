import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_LI_SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Dispersion, Scattering and the Spectrum",
  title: "Dispersion, Scattering and the Spectrum",
  oneLineDefinition:
    "The electromagnetic spectrum in order of wavelength, how a prism and a raindrop split white light, and why the sky is blue, the rising Sun is red and stars twinkle.",
  whyItMatters:
    "Eleven CDS questions from 2017 (II) to 2025 (II). Six place a radiation on the electromagnetic spectrum, two ask how a rainbow forms, and three explain a sight in the sky: the red Sun at the horizon and, twice, the twinkling of stars.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphli-em-spectrum",
      name: "The electromagnetic spectrum",
      intuition:
        "Visible light is only a thin slice of a much wider family of waves, the electromagnetic waves. All of them are transverse, all travel at the speed of light, and none needs a medium. They differ only in wavelength. The shorter the wavelength, the more energy each photon carries, which is why ultraviolet can burn skin and radio waves cannot.",
      definition:
        "The family, from longest wavelength to shortest:\n" +
        "- **Radio waves** (including **microwaves**) → **infrared** → **visible light** → **ultraviolet** → **X-rays** → **gamma rays**.\n" +
        "- **Visible light** runs from about **700 nm (red)** to **400 nm (violet)**: the only part the eye can see.\n" +
        "- **Photon energy** \\(E = hc/\\lambda\\): shorter wavelength, **more** energy. So ultraviolet photons carry more energy than visible ones, and visible more than infrared.\n" +
        "- All are **transverse** electromagnetic waves and travel through a **vacuum** at about \\(3 \\times 10^{8}\\) m/s.\n" +
        "- **Uses**: radio and microwaves for broadcasting, mobile phones and **satellite communication**; infrared for remote controls and night vision; ultraviolet for sterilising; X-rays for imaging bones.",
      table: {
        columns: ["Radiation", "Wavelength and a use"],
        rows: [
          {
            cells: ["Radio waves and microwaves", "Longest, above about 1 mm; broadcasting and satellite communication"],
            noteAmber: "CDS 2020 (I): satellite communication uses radio waves.",
            pyqExampleId: "1690d753-b4c1-498e-9b0f-93f6b1a7a80a",
          },
          { cells: ["Infrared", "About 1 mm down to 700 nm; heat, remote controls"] },
          {
            cells: ["Visible light", "About 700 nm to 400 nm; the only part the eye sees"],
            noteAmber: "CDS 2018 (II): the visible portion of the electromagnetic spectrum is light.",
            pyqExampleId: "9c4224a7-6e2a-44ca-b6d4-95b1e83a5cf6",
          },
          {
            cells: ["Ultraviolet", "Below 400 nm; sterilising, causes sunburn"],
            noteAmber: "CDS 2020 (I): of radio, visible, infrared and ultraviolet, ultraviolet has the shortest wavelength.",
            pyqExampleId: "af033e2f-f40c-4aa2-9fb8-279176f5dcb0",
          },
          { cells: ["X-rays", "Much shorter; imaging bones"] },
          { cells: ["Gamma rays", "Shortest; from radioactive nuclei"] },
        ],
      },
      pyqExampleId: "6e6b3839-0ab4-4baf-9631-40e4b13f0540",
      selfCheckExample: {
        prompt: "Which carries more energy per photon, red light or violet light, and why?",
        steps: [
          "Photon energy is \\(E = hc/\\lambda\\), so it goes up as the wavelength goes down.",
          "Violet light (about 400 nm) has a shorter wavelength than red light (about 700 nm).",
        ],
        answer: "Violet light, because its wavelength is shorter.",
      },
      practiceSet: [
        { prompt: "Which has the longer wavelength: X-rays or radio waves?", answer: "Radio waves" },
        { prompt: "About what range of wavelengths can the human eye see?", answer: "About 400 nm to 700 nm" },
        { prompt: "Is ultraviolet light a longitudinal or a transverse wave?", answer: "Transverse: it is an electromagnetic wave" },
        { prompt: "Which radiation do television remote controls use?", answer: "Infrared" },
      ],
      traps: [
        {
          title: "Shorter wavelength means more energy, not less",
          body: "Energy per photon rises as the wavelength falls. Ultraviolet has a **shorter** wavelength than visible light and so **more** photon energy; infrared has a longer wavelength and less.",
        },
        {
          title: "Microwaves are part of the radio band",
          body: "Satellite links use microwave frequencies, which lie within the **radio-wave** region of the spectrum. Infrared, ultraviolet and visible light are not used for satellite communication.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphli-dispersion",
      name: "Dispersion by a prism and the rainbow",
      intuition:
        "White light is a mixture of colours. Glass slows each colour by a slightly different amount, so a prism bends each colour by a slightly different angle and they fan out into a band: the spectrum. Violet is bent the most and red the least. A raindrop does the same job as a prism, with one extra step: the light bounces once off the back of the drop before coming out.",
      definition:
        "Splitting white light:\n" +
        "- **Dispersion**: splitting white light into its colours, because the refractive index of glass is different for each colour.\n" +
        "- Order of colours: **VIBGYOR** (violet, indigo, blue, green, yellow, orange, red). **Violet deviates most**, **red least**.\n" +
        "- **Newton** first showed with two prisms that white light is a mixture of these colours.\n" +
        "- **Rainbow**: sunlight enters a raindrop and is **refracted and dispersed**, is **reflected once inside** the drop, and is refracted again as it leaves. So it needs **both refraction and internal reflection**.\n" +
        "- A rainbow is seen **opposite the Sun**, with the Sun behind the observer. A fainter **secondary** rainbow comes from **two** internal reflections and has its colours reversed.",
      table: {
        columns: ["Step inside a raindrop", "What happens to the light"],
        rows: [
          { cells: ["Light enters the drop", "Refraction and dispersion into colours"] },
          {
            cells: ["Light reaches the back of the drop", "One internal reflection (primary rainbow)"],
            noteAmber: "CDS 2024 (II): a rainbow needs both refraction and internal reflection of sunlight.",
            pyqExampleId: "b0f8e006-5645-485f-b70b-0965d625e870",
          },
          { cells: ["Light leaves the drop", "Refraction again, spreading the colours further"] },
          { cells: ["Secondary rainbow", "Two internal reflections; colours in reverse order"] },
        ],
      },
      pyqExampleId: "fcf5a6a4-6c13-4411-af14-cda61a646d9e",
      selfCheckExample: {
        prompt: "In the morning, with the Sun in the east, in which direction should you look to see a rainbow?",
        steps: [
          "A rainbow is seen with the Sun behind you, opposite the Sun.",
          "The Sun is in the east, so face west.",
        ],
        answer: "Towards the west.",
      },
      practiceSet: [
        { prompt: "Which colour is bent the most by a glass prism?", answer: "Violet" },
        { prompt: "What is the splitting of white light into its colours called?", answer: "Dispersion" },
        { prompt: "Who first showed that white light is a mixture of colours?", answer: "Isaac Newton" },
        { prompt: "Which colour lies at the outer edge of a primary rainbow?", answer: "Red" },
      ],
      traps: [
        {
          title: "A rainbow needs refraction and reflection together",
          body: "Refraction alone gives no rainbow, and nor does reflection alone. Light is refracted in, **reflected once inside**, and refracted out. An option naming only one of these is incomplete.",
        },
        {
          title: "Violet bends most, red least",
          body: "Glass has its **highest** refractive index for violet light, so violet is deviated the most. Red, with the longest wavelength, is deviated the least.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphli-scattering",
      name: "Scattering and atmospheric refraction",
      intuition:
        "Air molecules are tiny, and they scatter short-wavelength blue light far more strongly than long-wavelength red light. So blue light from the Sun is thrown about the whole sky, and the sky looks blue. Separately, the air is not uniform: layers of different temperature bend light by different amounts, and since they keep moving, a star's light keeps shifting. That is why stars twinkle.",
      definition:
        "Two effects of the atmosphere:\n" +
        "- **Scattering** by small particles is much stronger for **shorter wavelengths** (blue) than for longer ones (red).\n" +
        "- **Blue sky**: scattered blue light reaches the eye from every direction. In space, with no air, the sky looks **black**.\n" +
        "- **Red Sun at sunrise and sunset**: near the horizon sunlight crosses much more air, most of the blue is scattered out of the beam, and mainly red reaches us.\n" +
        "- **Danger signals are red** because red is scattered least and can be seen from far away.\n" +
        "- **Atmospheric refraction**: starlight bends through moving air layers of changing refractive index, so a star's apparent position and brightness flicker: **twinkling**. **Planets do not twinkle**, because they look like small discs, not points.\n" +
        "- The same bending lets us see the Sun about **2 minutes before** it actually rises and after it sets.",
      table: {
        columns: ["What you see", "Cause"],
        rows: [
          { cells: ["Blue sky", "Scattering of short-wavelength light by air molecules"] },
          { cells: ["Reddish Sun near the horizon", "Scattering removes blue over the long path through air"] },
          { cells: ["Red danger lights", "Red is scattered least"] },
          {
            cells: ["Twinkling of stars", "Atmospheric refraction"],
            noteAmber: "Asked twice: CDS 2022 (I) and 2025 (II). The answer is refraction, never reflection, interference or diffraction.",
            pyqExampleId: "e8740784-0053-49c3-b9da-c9c7f1cced57",
          },
          { cells: ["Sun seen 2 minutes before sunrise", "Atmospheric refraction"] },
        ],
      },
      pyqExampleId: "4098717e-1331-4339-9f33-14771b58dbda",
      selfCheckExample: {
        prompt: "An astronaut on the Moon looks up in the daytime. What colour is the sky, and why?",
        steps: [
          "The blue of the Earth's sky comes from sunlight scattered by air molecules.",
          "The Moon has no atmosphere, so nothing scatters the sunlight.",
        ],
        answer: "Black: with no air there is no scattering.",
      },
      practiceSet: [
        { prompt: "Why does the clear sky look blue?", answer: "Air molecules scatter blue light much more than red" },
        { prompt: "Why are danger signals red?", answer: "Red light is scattered least, so it is seen from far away" },
        { prompt: "Why do planets not twinkle?", answer: "They appear as small discs, so the flickers from different points cancel out" },
        { prompt: "Which effect lets us see the Sun a little before it actually rises?", answer: "Atmospheric refraction" },
      ],
      traps: [
        {
          title: "Twinkling is refraction; the red Sun is scattering",
          body: "Two sky questions, two different causes. Stars **twinkle** because of **atmospheric refraction**. The Sun looks **red** at the horizon because of **scattering**. Dispersion and reflection are distractors for both.",
        },
        {
          title: "Blue is scattered most, red least",
          body: "Scattering by air molecules grows sharply as the wavelength falls. That one rule gives the blue sky, the red sunset and the red danger light.",
        },
      ],
    },
  ],
};
