import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_DN_DAVISSON_NOTE: SubtopicNote = {
  subtopicName: "Davisson-Germer Experiment and Duality of Matter",
  title: "The Davisson and Germer Experiment and Duality of Matter",
  oneLineDefinition:
    "How Davisson and Germer diffracted electrons from a nickel crystal and confirmed de Broglie's relation, why the wave nature of matter shows only for tiny particles, and how the electron microscope uses it.",
  whyItMatters:
    "One question, from the textbook: state the importance of the Davisson and Germer experiment. It has not appeared in the board papers in this bank, but it is the experiment that proves the de Broglie hypothesis, so learn its set-up, its result and why it matters.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpdn-davisson-germer",
      name: "The Davisson and Germer experiment",
      intuition:
        "If electrons really are waves, they should diffract, just as X-rays do from the regular rows of atoms in a crystal. An electron of a few tens of volts has a wavelength of a few ångström, about the spacing of atoms in a crystal, so a crystal is the right grating. Davisson and Germer fired electrons at a nickel crystal and found more electrons in some directions and fewer in others: a diffraction pattern.",
      definition:
        "- **Set-up:** an electron gun (a tungsten filament F heated by a battery) gives electrons, which are accelerated by a cylindrical anode and focused into a beam. The beam falls on a nickel crystal inside an evacuated chamber. A detector on a circular scale measures the intensity of scattered electrons at each scattering angle \\(\\theta\\).\n" +
        "- **Observation:** the scattered intensity was not uniform in all directions, as classical theory expected. It showed peaks (constructive interference) and troughs (destructive interference), like a diffraction pattern.\n" +
        "- Varying the accelerating potential from 44 V to 68 V, they found a peak at a scattering angle of 50° for 54 V.\n" +
        "- **Result:** de Broglie's relation gives \\(\\lambda = \\dfrac{1.228}{\\sqrt{54}} = 0.167\\) nm; the diffraction measurement gave 0.165 nm. The two agree closely.\n" +
        "- **Duality of matter:** material particles show a wave nature under certain conditions. It matters only for microscopic objects (sizes \\(\\leq 10^{-6}\\) m), because h is so small. Particle nature dominates when they interact with matter; wave nature dominates while they travel through a gap comparable to their wavelength.\n" +
        "- **Electron microscope:** an electron's wavelength is far smaller than that of visible light, so a microscope using an electron beam resolves far finer detail than an optical one.",
      table: {
        columns: ["Point", "What to write"],
        rows: [
          {
            cells: ["Importance 1", "It was the first experimental proof that electrons, material particles, behave as waves: they were diffracted by a crystal"],
            pyqExampleId: "ef9004c2-4313-46b1-a0e8-b4055addf5a4",
            noteAmber: "The textbook asks you to state the importance of this experiment.",
          },
          { cells: ["Importance 2", "The measured wavelength, 0.165 nm, agreed with de Broglie's 0.167 nm for 54 V electrons, so it verified the de Broglie relation"] },
          { cells: ["Importance 3", "It established wave-particle duality for matter, not only for radiation"] },
          { cells: ["Year and people", "Davisson and Germer in America in 1927; G. P. Thomson confirmed it in England in 1928"] },
          { cells: ["Target", "A nickel crystal, whose regularly spaced atoms act as a diffraction grating"] },
        ],
      },
      practiceSet: [
        { prompt: "In the Davisson and Germer experiment, at what accelerating potential and scattering angle was the peak observed?", answer: "54 V, at 50°" },
        { prompt: "Why was a crystal used to show electron diffraction?", answer: "The spacing of its atoms (a few Å) is about the same as the electron's wavelength" },
        { prompt: "A student of mass 45 kg runs at 8 km/h. Is the wave nature of the student ever noticed? Why?", answer: "No. The student's de Broglie wavelength, about \\(6.6 \\times 10^{-36}\\) m, is far too small to observe" },
        { prompt: "Why does an electron microscope resolve finer detail than an optical microscope?", answer: "The wavelength of the electrons is much smaller than that of visible light" },
      ],
      traps: [
        {
          title: "Listing the set-up instead of the importance",
          body: "'State the importance' wants what the experiment PROVED: the wave nature of electrons and the de Broglie relation, with the 0.167 nm against 0.165 nm agreement. A description of the apparatus alone does not answer it.",
        },
        {
          title: "Saying the electrons spread evenly",
          body: "The point of the experiment is that the scattered intensity was NOT uniform: it had peaks and troughs, a diffraction pattern, which only waves give.",
        },
      ],
    },
  ],
};
