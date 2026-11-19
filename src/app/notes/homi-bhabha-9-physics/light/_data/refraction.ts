import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LI_REFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Refraction and Optical Instruments",
  title: "Refraction and Optical Instruments",
  oneLineDefinition:
    "Light bends when it passes from one medium into another; different colours bend by different amounts, which splits white light into a rainbow, total internal reflection carries light along an optical fibre, and lenses form the real or virtual images of the eye, camera and microscope.",
  whyItMatters:
    "Five questions in the bank, two EASY, two MODERATE and one HARD. Three ask which effect of light lies behind something we see: the colours of a rainbow, the optical fibre and the mirage. One asks which instruments form a virtual image, and one counts how many times a ray changes its path through mirrors, a lens and the eye.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9lirf-refraction",
      name: "Refraction, dispersion and total internal reflection",
      intuition:
        "Light slows down in water or glass, and when it enters at a slant it changes direction, just as a cart turns when one wheel runs onto sand first. Each colour slows down by a slightly different amount, so each bends by a different amount, and white light fans out into its colours.",
      definition:
        "- **Refraction**: the bending of light as it passes **from one medium into another**, because its **speed** changes. Going into a denser medium (air to glass), it bends **towards** the normal; going into a rarer one, **away** from it.\n" +
        "- **Refractive index** tells how much a medium bends light. It is **different for each colour (wavelength)**: violet bends most, red least.\n" +
        "- **Dispersion**: white light splitting into its seven colours (violet, indigo, blue, green, yellow, orange, red) because each colour has a **different wavelength** and so meets a **different refractive index**. A prism and a **rainbow** (sunlight in raindrops) both show it.\n" +
        "- **Total internal reflection**: light going from a denser to a rarer medium at an angle **greater than the critical angle** is reflected back completely. It carries light along an **optical fibre** and makes diamonds sparkle.\n" +
        "- **Mirage**: near hot ground, air layers grow rarer towards the road. Light from the sky **refracts** through them, bending more and more, and is finally **totally internally reflected** upward, so the sky looks like water on the road.",
      table: {
        columns: ["What we see", "Effect of light behind it"],
        rows: [
          { cells: ["Rainbow", "Dispersion (with refraction and reflection) of sunlight in raindrops"] },
          { cells: ["A pencil looks bent in water", "Refraction"] },
          { cells: ["A pool looks shallower than it is", "Refraction"] },
          { cells: ["Light carried along an optical fibre", "Total internal reflection"] },
          { cells: ["Mirage on a hot road", "Refraction and total internal reflection"] },
          { cells: ["Sparkle of a diamond", "Total internal reflection"] },
        ],
        caption: "When an option pairs two effects, check that both really take part.",
      },
      selfCheckExample: {
        prompt: "White light passes through a glass prism and comes out as a band of colours. Which colour is bent the most, and why do the colours separate at all?",
        steps: [
          "Each colour has a different wavelength, so the glass has a different refractive index for it.",
          "Violet meets the largest refractive index and bends the most; red bends the least.",
        ],
        answer: "Violet is bent the most; the colours separate because each has a different wavelength and refractive index.",
      },
      practiceSet: [
        { prompt: "Why does a straight pencil look bent where it enters water?", answer: "Light from the part under water is refracted as it passes from water into air" },
        { prompt: "Which colour of white light bends the least in a prism?", answer: "Red" },
        { prompt: "When does total internal reflection take place?", answer: "When light goes from a denser to a rarer medium at an angle greater than the critical angle" },
        { prompt: "What is the splitting of white light into its colours called?", answer: "Dispersion" },
      ],
      pyqExampleId: "84b5e134-4ee6-4795-a840-c745e79ff3f9",
      traps: [
        {
          title: "Giving every colour the same refractive index",
          body: "If every colour bent equally, white light would stay white. The colours separate because each wavelength has a different refractive index.",
        },
        {
          title: "Explaining an optical fibre by ordinary refraction",
          body: "Light stays inside an optical fibre because it strikes the wall at more than the critical angle and is totally reflected back again and again.",
        },
        {
          title: "Calling a mirage plain reflection",
          body: "A mirage needs refraction through layers of hot air and then total internal reflection. There is no water or mirror on the road.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lirf-instruments",
      name: "Lenses in the eye, camera and microscope",
      intuition:
        "An image you catch on a screen (the film of a camera, the retina of your eye) must be real. An image you look into, as through a magnifying glass, is virtual. So ask of each instrument: does it put the picture on something, or do I look through it?",
      definition:
        "- The **human eye** has a convex **eye lens** that forms a **real, inverted, smaller** image on the **retina**. Light bends on entering and on leaving the lens.\n" +
        "- A **camera** forms a **real, inverted, smaller** image on its film or sensor.\n" +
        "- A **simple microscope** (magnifying glass) is one convex lens with the object **inside its focus**: a **virtual, erect, enlarged** image.\n" +
        "- A **compound microscope** uses two convex lenses; the image you finally see is **virtual and enlarged**.\n" +
        "- A ray **changes its path** at every reflection from a mirror and on **entering** and on **leaving** each lens (each is a refraction).",
      table: {
        columns: ["Instrument", "Lens or mirror used", "Image formed"],
        rows: [
          { cells: ["Human eye", "Convex eye lens", "Real, inverted, smaller, on the retina"] },
          { cells: ["Camera", "Convex lens", "Real, inverted, smaller, on the film or sensor"] },
          { cells: ["Simple microscope", "One convex lens", "Virtual, erect, enlarged"] },
          { cells: ["Compound microscope", "Two convex lenses", "Virtual, enlarged (final image)"] },
          { cells: ["Film projector", "Convex lens", "Real, inverted, enlarged, on the screen"] },
          { cells: ["Periscope", "Two plane mirrors", "Virtual, erect, same size"] },
        ],
        caption: "Real images fall on something (retina, film, screen); virtual images are looked into.",
      },
      selfCheckExample: {
        prompt: "Does a film projector form a real or a virtual image, and how can you tell?",
        steps: ["Its picture is caught on a screen.", "Only a real image can be caught on a screen."],
        answer: "A real image",
      },
      practiceSet: [
        { prompt: "What kind of image does the eye lens form on the retina?", answer: "Real, inverted and smaller" },
        { prompt: "Where must an object be placed for a convex lens to act as a magnifying glass?", answer: "Inside its focus, between the lens and the focus" },
        { prompt: "What kind of image does a camera form on its sensor?", answer: "Real and inverted" },
        { prompt: "A ray of light passes once through a glass lens. How many times does it change its path?", answer: "Twice: once on entering the lens and once on leaving it" },
      ],
      pyqExampleId: "af1530bb-157e-42d5-a090-43ec5553c8aa",
      traps: [
        {
          title: "Thinking the eye forms a virtual image",
          body: "The eye lens forms a real image on the retina, upside down; the brain turns it the right way up. A virtual image could not fall on the retina.",
        },
        {
          title: "Counting one bend for a lens",
          body: "Light changes direction twice in a lens: once as it enters the glass and again as it leaves it.",
        },
      ],
    },
  ],
};
