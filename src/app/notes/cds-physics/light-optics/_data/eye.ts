import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_LI_EYE_NOTE: SubtopicNote = {
  subtopicName: "The Eye and Optical Instruments",
  title: "The Eye and Optical Instruments",
  oneLineDefinition:
    "How the eye focuses, the common defects of vision and the lenses that correct them, and which lenses make up a microscope and a telescope.",
  whyItMatters:
    "Five CDS questions, all from 2023 (II) to 2025 (II), three of them in 2025. Three are about defects of vision (myopia twice, presbyopia once) and two about the lenses in a microscope or a telescope.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphli-defects",
      name: "Defects of vision and their correction",
      intuition:
        "The eye lens focuses light on the retina. The ciliary muscles change the lens's thickness so that both near and far objects come to focus: this is accommodation. If the eye-ball is the wrong length, or the lens bends light too much or too little, the image falls in front of or behind the retina and looks blurred. A spectacle lens of the right kind moves the image back onto the retina.",
      definition:
        "The normal eye and its defects:\n" +
        "- **Normal eye**: near point about **25 cm** (least distance of distinct vision), far point at **infinity**.\n" +
        "- **Myopia (near-sightedness)**: near objects clear, **distant objects blurred**. The image of a far object forms **in front of** the retina. Causes: **excessive curvature** of the eye lens (too short a focal length) or an **elongated eye-ball**. Corrected with a **concave** (diverging) lens.\n" +
        "- **Hypermetropia (far-sightedness)**: distant objects clear, near ones blurred. Image forms **behind** the retina. Causes: focal length of the eye lens **too long**, or an eye-ball **too short**. Corrected with a **convex** (converging) lens.\n" +
        "- **Presbyopia**: comes with **ageing**, as the ciliary muscles weaken and the lens stiffens, so near vision fails. Often both near and far vision need help, so **bifocal** (concave above, convex below) or progressive lenses are used.\n" +
        "- **Cataract**: the eye lens becomes cloudy; treated by surgery. **Colour blindness** is a separate, inherited defect.",
      table: {
        columns: ["Defect", "Cause and correction"],
        rows: [
          {
            cells: ["Myopia (near-sightedness)", "Lens too curved or eye-ball too long; concave lens"],
            noteAmber: "CDS 2025 (I): myopia is also called near-sightedness.",
            pyqExampleId: "227ca641-b644-4a71-8e97-37f1ba00ffa7",
          },
          { cells: ["Hypermetropia (far-sightedness)", "Focal length too long or eye-ball too short; convex lens"] },
          {
            cells: ["Presbyopia", "Ageing weakens accommodation; bifocal or progressive lenses"],
            noteAmber: "CDS 2024 (II): presbyopia comes with age and is corrected with bifocal or progressive lenses; it does not affect colour vision.",
            pyqExampleId: "a65efd68-eac0-4b62-98ce-11ccc4a29f19",
          },
          { cells: ["Cataract", "Cloudy eye lens; surgery"] },
        ],
      },
      pyqExampleId: "a370a32c-7f56-4e9a-be8a-71d2022becb4",
      selfCheckExample: {
        prompt: "A student can read a book easily but cannot read the number on a distant bus. Name the defect and the lens that corrects it.",
        steps: [
          "Near objects are clear and distant ones blurred, so this is myopia.",
          "The eye brings light to focus in front of the retina, so it bends light too much.",
          "A diverging lens spreads the light a little first, moving the image back onto the retina.",
        ],
        answer: "Myopia, corrected with a concave (diverging) lens.",
      },
      practiceSet: [
        { prompt: "Which lens corrects hypermetropia?", answer: "A convex (converging) lens" },
        { prompt: "What is the least distance of distinct vision for a normal eye?", answer: "About 25 cm" },
        { prompt: "What is the ability of the eye to focus on both near and far objects called?", answer: "Accommodation" },
        { prompt: "Which defect makes the eye lens cloudy?", answer: "Cataract" },
      ],
      traps: [
        {
          title: "Near-sighted means it is the far objects that blur",
          body: "A **near-sighted** (myopic) person sees **near** objects clearly and distant ones blurred. Far-sighted is the opposite. The name says what the person can still see.",
        },
        {
          title: "Myopia: lens too strong or eye-ball too long",
          body: "Myopia comes from **too much** bending (an over-curved lens, a short focal length) or an **elongated** eye-ball. A small eye-ball or a long focal length gives hypermetropia instead.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphli-instruments",
      name: "Microscopes and telescopes",
      intuition:
        "A magnifying glass is just one convex lens held close to an object, inside its focal length, so it shows a large upright image. A compound microscope and an astronomical telescope each use two convex lenses: the first, the objective, makes a real image, and the second, the eyepiece, magnifies that image the way a magnifying glass would.",
      definition:
        "The lenses in each instrument:\n" +
        "- **Simple microscope** (magnifying glass): **one convex lens**, object **inside** its focal length; image virtual, erect, enlarged.\n" +
        "- **Compound microscope**: two convex lenses. The **objective** has a **very short** focal length and faces the object; the eyepiece magnifies its image.\n" +
        "- **Astronomical telescope**: two convex lenses. The **objective** has a **long** focal length, the **eyepiece** a short one. Magnifying power is about \\(f_o / f_e\\). The final image is inverted, which does not matter for stars.\n" +
        "- **Galilean telescope**: convex objective with a **concave** eyepiece, giving an erect image.",
      table: {
        columns: ["Instrument", "Lenses used"],
        rows: [
          {
            cells: ["Simple microscope", "One converging (convex) lens"],
            noteAmber: "CDS 2025 (I): a simple microscope uses a converging lens.",
            pyqExampleId: "bacc0609-6237-439d-b56a-a0bba49e2b79",
          },
          { cells: ["Compound microscope", "Convex objective of very short focal length, convex eyepiece"] },
          { cells: ["Astronomical telescope", "Convex objective of long focal length, convex eyepiece of short focal length"] },
          { cells: ["Galilean telescope", "Convex objective, concave eyepiece"] },
        ],
      },
      pyqExampleId: "30f98457-1d9a-441d-908d-8b50f01b67bf",
      selfCheckExample: {
        prompt: "An astronomical telescope has an objective of focal length 100 cm and an eyepiece of focal length 5 cm. About what is its magnifying power?",
        steps: [
          "For a telescope, magnifying power is about \\(f_o / f_e\\).",
          "\\(100 / 5 = 20\\).",
        ],
        answer: "About 20.",
      },
      practiceSet: [
        { prompt: "Where must the object be placed for a convex lens to act as a magnifying glass?", answer: "Inside its focal length" },
        { prompt: "In a compound microscope, which lens has the shorter focal length?", answer: "The objective" },
        { prompt: "Which telescope uses a concave lens as its eyepiece?", answer: "The Galilean telescope" },
        { prompt: "Is the image seen in an astronomical telescope erect or inverted?", answer: "Inverted" },
      ],
      traps: [
        {
          title: "Telescope objective long, microscope objective short",
          body: "A **telescope** objective has a **long** focal length to gather light from far away. A **microscope** objective has a **very short** one to magnify a near object. Both instruments use convex lenses for both parts, except the Galilean telescope.",
        },
      ],
    },
  ],
};
