import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LO_EYE_NOTE: SubtopicNote = {
  subtopicName: "The Eye, Dispersion and Instruments",
  title: "The Eye, Dispersion and Instruments",
  oneLineDefinition:
    "Defects of the eye are corrected with the right lens, a prism splits white light into seven colours because each bends by a different amount, and the air's shifting layers make stars twinkle.",
  whyItMatters:
    "Six questions in the bank, five EASY and one MODERATE: the lens for astigmatism and for long sight, the name for a prism splitting white light, the colour glass bends least, why a twinkling star looks brighter, and the instrument for distant objects. All are recall, so the three tables on this page are the whole job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiloey-defects",
      name: "Defects of vision and the lens that corrects each",
      intuition:
        "A healthy eye changes the shape of its lens to bring any object from 25 cm to far away into focus on the retina. When the image lands in front of the retina or behind it, a lens in the spectacles moves it back.",
      definition:
        "- The eye lens forms a real, inverted image on the **retina**. The **ciliary muscles** change the lens's focal length to focus near or far (accommodation).\n" +
        "- A normal eye sees clearly from its **near point, 25 cm**, to its far point at infinity.\n" +
        "- Image **in front of** the retina: the eye needs a diverging (**concave**, negative power) lens. Image **behind** it: a converging (**convex**, positive power) lens.",
      table: {
        columns: ["Defect", "What goes wrong", "Corrected with"],
        rows: [
          { cells: ["Myopia (short sight)", "Far objects blur; the image forms in front of the retina", "Concave lens"] },
          { cells: ["Hypermetropia (long sight)", "Near objects blur; the image forms behind the retina", "Convex lens"] },
          { cells: ["Presbyopia", "Old age: the ciliary muscles weaken, so near and often far vision both suffer", "Bifocal lens"] },
          {
            cells: ["Astigmatism", "The cornea is curved unequally, so lines in one direction blur", "Cylindrical lens"],
            noteAmber: "Not convex or concave: a cylindrical lens.",
          },
          { cells: ["Cataract", "The eye lens turns cloudy", "Surgery to replace the lens"] },
        ],
        caption: "Short sight takes a concave lens, long sight a convex one: the opposite of what the names might suggest.",
      },
      selfCheckExample: {
        prompt: "A student can read a book clearly but cannot read the blackboard from the back of the class. Name the defect and the lens that corrects it.",
        steps: ["Near is clear and far is blurred: short sight.", "Short sight (myopia) is corrected with a concave lens."],
        answer: "Myopia, concave lens",
      },
      practiceSet: [
        { prompt: "What is the least distance of distinct vision for a normal eye?", answer: "25 cm" },
        { prompt: "Is the power of a lens that corrects myopia positive or negative?", answer: "Negative" },
        { prompt: "Which lens corrects presbyopia?", answer: "A bifocal lens" },
        { prompt: "Which part of the eye changes the focal length of the eye lens?", answer: "The ciliary muscles" },
      ],
      pyqExampleId: "61fbd440-a240-4dff-a415-d9c686b3e10c",
      traps: [
        {
          title: "Concave lens for long sight",
          body: "Long sight (hypermetropia) puts the image behind the retina and needs a converging, convex lens. The concave lens is for short sight.",
        },
        {
          title: "Bifocal for astigmatism",
          body: "A bifocal lens is for presbyopia. Astigmatism comes from an unevenly curved cornea and needs a cylindrical lens.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiloey-dispersion",
      name: "Dispersion, the spectrum and atmospheric refraction",
      intuition:
        "White light is a mix of colours. Glass slows each colour by a slightly different amount, so a prism bends them by different angles and they fan out. The moving air above us bends starlight in the same way, but by an amount that keeps changing.",
      definition:
        "- **Dispersion** is the splitting of white light into its colours. The band of colours is the **spectrum**: VIBGYOR (violet, indigo, blue, green, yellow, orange, red).\n" +
        "- **Red** has the longest wavelength, bends **least** and has the **lowest** refractive index in glass. **Violet** bends most.\n" +
        "- **Atmospheric refraction**: air's temperature and density keep changing, so starlight is bent by varying amounts. More light bent towards the eye makes the star look **brighter**, less makes it dimmer: it twinkles.",
      table: {
        columns: ["Event", "Cause"],
        rows: [
          { cells: ["A prism forms a spectrum", "Dispersion: each colour refracts by a different amount"] },
          { cells: ["A rainbow", "Dispersion and reflection inside raindrops; seen with the Sun behind you"] },
          { cells: ["Stars twinkle", "Atmospheric refraction that keeps changing"] },
          {
            cells: ["Planets do not twinkle", "They are close, so they look like discs, and the changes average out"],
          },
          { cells: ["The Sun is seen about 2 minutes before it rises", "Atmospheric refraction bends its light over the horizon"] },
          { cells: ["The sky is blue", "Air scatters blue light much more than red"] },
          { cells: ["Danger signals are red", "Red is scattered least, so it is seen from far away"] },
        ],
        caption: "Splitting is dispersion; bending is refraction; spreading by tiny particles is scattering.",
      },
      selfCheckExample: {
        prompt: "Which colour of white light is bent the most by a glass prism?",
        steps: ["Violet has the shortest wavelength and the highest refractive index in glass."],
        answer: "Violet",
      },
      practiceSet: [
        { prompt: "Write the colours of the spectrum in order.", answer: "Violet, indigo, blue, green, yellow, orange, red (VIBGYOR)" },
        { prompt: "Why do stars twinkle?", answer: "Atmospheric refraction of their light keeps changing" },
        { prompt: "Why is the clear sky blue?", answer: "The air scatters blue light the most" },
        { prompt: "Why are danger signals red?", answer: "Red light is scattered least, so it travels farthest through air" },
      ],
      pyqExampleId: "be62ba91-d7b9-4223-b123-3426f0167da5",
      traps: [
        {
          title: "Calling the splitting 'refraction'",
          body: "Each colour is refracted, but the splitting of white light into colours has its own name: dispersion.",
        },
        {
          title: "Violet bends least",
          body: "Red bends least and has the smallest refractive index in glass; violet bends most.",
        },
        {
          title: "Planets twinkle too",
          body: "Planets are near enough to look like small discs, so the changes from many points cancel and they shine steadily.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiloey-instruments",
      name: "Optical instruments and what each is for",
      intuition:
        "Each instrument stretches the eye in one direction: farther away, smaller, around a corner, or into the colours of light. Match the instrument to its job.",
      definition:
        "Two pairs are swapped most often:\n" +
        "- **Telescope** for things far away; **microscope** for tiny things close by.\n" +
        "- **Spectroscope** splits light into a spectrum; **periscope** looks over an obstacle.",
      table: {
        columns: ["Instrument", "Used for"],
        rows: [
          { cells: ["Telescope", "Distant objects such as stars and planets"] },
          { cells: ["Binoculars", "Distant objects, with both eyes"] },
          { cells: ["Microscope", "Very small objects close by, such as cells"] },
          { cells: ["Periscope", "Seeing over an obstacle, using two plane mirrors"] },
          { cells: ["Kaleidoscope", "Repeating patterns from plane mirrors"] },
          { cells: ["Spectroscope", "Splitting light into its spectrum to study it"] },
          {
            cells: ["Chronometer", "Measuring time very accurately"],
            noteAmber: "Not an optical instrument at all.",
          },
        ],
        caption: "The suffix tells the job: tele means far, micro means small, peri means around.",
      },
      selfCheckExample: {
        prompt: "Which instrument does a submarine use to see ships above the water?",
        steps: ["It must look over an obstacle (the sea's surface) from below.", "That is a periscope."],
        answer: "Periscope",
      },
      practiceSet: [
        { prompt: "Which instrument is used to see bacteria?", answer: "A microscope" },
        { prompt: "Which instrument uses two plane mirrors to see over a wall?", answer: "A periscope" },
        { prompt: "Which instrument splits light into a spectrum?", answer: "A spectroscope" },
      ],
      pyqExampleId: "d5f8f69d-2860-40f4-bc38-2ce9c71533b2",
      traps: [
        {
          title: "Telescope and microscope swapped",
          body: "A telescope is for far objects and a microscope for tiny near ones. 'Tele' means far, as in telephone.",
        },
      ],
    },
  ],
};
