import type { SubtopicNote } from "@/app/notes/_types";

export const DIFFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Single Slit Diffraction and Resolving Power",
  title: "Single-Slit Diffraction and Resolving Power",
  oneLineDefinition:
    "Light through a single slit of width a spreads into a bright central band bounded by minima at a sin θ = ±λ, with fainter secondary maxima near a sin θ = (n + ½)λ; the same spreading limits how finely a microscope or an eye can resolve.",
  whyItMatters:
    "34 PYQs, seven HARD. Three shapes: the minima and the width of the central maximum (and what happens when the slit or the wavelength changes), " +
    "the secondary maxima — where they fall and when two wavelengths' maxima coincide — and the limit of resolution.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-single-slit-minima",
      name: "Minima and the Central Maximum",
      intuition:
        "Pair each point in the top half of the slit with one in the bottom half: when their path difference is λ/2 they cancel, and so does the whole slit. That happens at a sin θ = λ, the first minimum. A narrower slit or longer wavelength pushes it out, widening the central band.",
      definition:
        "- Minima: \\(a\\sin\\theta = n\\lambda\\); on a screen at distance D, \\(y_n = \\dfrac{n\\lambda D}{a}\\).\n" +
        "- Central maximum: linear width \\(\\dfrac{2\\lambda D}{a}\\), angular width \\(\\dfrac{2\\lambda}{a}\\), twice as wide as the other bands.\n" +
        "- Slit width halved and \\(\\lambda \\times 1.5\\): width \\(\\times 3\\). Width \\(\\propto \\lambda\\): 30% less angular width means 30% shorter \\(\\lambda\\).\n" +
        "- Doubling the slit: central intensity \\(\\times 4\\), angular width \\(\\times \\dfrac{1}{2}\\).\n" +
        "- The bands have unequal widths and unequal intensities.",
      formula: {
        label: "Single-slit minima",
        latex: "a\\sin\\theta = n\\lambda, \\qquad W_{\\text{central}} = \\frac{2\\lambda D}{a}",
      },
      authoredExample: {
        prompt: "\\(\\lambda = 500\\) nm, slit width 0.25 mm, screen 1.5 m away. Width of the central maximum?",
        steps: ["\\(W = \\dfrac{2 \\times 5 \\times 10^{-7} \\times 1.5}{2.5 \\times 10^{-4}} = 6 \\times 10^{-3}\\) m."],
        answer: "6 mm",
      },
      selfCheckExample: {
        prompt: "The slit is halved and the wavelength raised by 20%. The central maximum's width becomes?",
        steps: ["\\(\\dfrac{\\lambda}{a}\\): \\(1.2 \\times 2 = 2.4\\)."],
        answer: "2.4 times",
      },
      practiceSet: [
        { prompt: "For what screen distance D does the central maximum equal the slit width d?", answer: "\\(\\dfrac{d^2}{2\\lambda}\\)" },
        { prompt: "Red light replaced by blue in a diffraction pattern. The bands?", answer: "Narrower and closer together" },
        { prompt: "Are single-slit bands equal in width?", answer: "No — the central one is twice as wide" },
      ],
      pyqExampleId: "7865469b-df36-4c4e-a09c-fc9e616e8160",
      traps: [
        {
          title: "Half-width or full width",
          body:
            "\\(\\frac{\\lambda D}{a}\\) is the distance from the centre to the first minimum. 'Between the first minima on either side' is twice that, \\(\\frac{2\\lambda D}{a}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-secondary-maxima",
      name: "Secondary Maxima",
      intuition:
        "Between the minima the pattern rises to fainter maxima, roughly halfway along: the nth secondary maximum sits near a sin θ = (n + ½)λ. Two wavelengths' maxima coincide where those positions match.",
      definition:
        "- \\(n\\)th secondary maximum: \\(a\\sin\\theta = \\left(n + \\dfrac{1}{2}\\right)\\lambda\\), \\(y = \\dfrac{(2n + 1)\\lambda D}{2a}\\).\n" +
        "- First minimum at \\(30^\\circ\\) (\\(a = 2\\lambda\\)): first secondary maximum at \\(\\sin\\theta = \\dfrac{3}{4}\\).\n" +
        "- Coincidence: \\(n\\)th maximum of \\(\\lambda_1\\) with \\(m\\)th of \\(\\lambda_2\\): \\((2n + 1)\\lambda_1 = (2m + 1)\\lambda_2\\).\n" +
        "- Two close wavelengths: \\(\\Delta y = \\dfrac{3D}{2a}\\Delta\\lambda\\) for the first secondary maxima.",
      formula: {
        label: "Secondary maxima",
        latex: "a\\sin\\theta = \\left(n + \\tfrac{1}{2}\\right)\\lambda",
      },
      authoredExample: {
        prompt: "The 3rd secondary maximum of 500 nm light coincides with the 2nd secondary maximum of light of wavelength λ. Find λ.",
        steps: ["\\(7 \\times 500 = 5\\lambda\\)."],
        answer: "700 nm",
      },
      selfCheckExample: {
        prompt: "The first minimum is at \\(\\sin\\theta = 0.2\\). Where is the first secondary maximum?",
        steps: ["\\(a\\sin\\theta = 1.5\\lambda\\), and \\(\\dfrac{\\lambda}{a} = 0.2\\)."],
        answer: "\\(\\sin\\theta = 0.3\\)",
      },
      practiceSet: [
        { prompt: "4th secondary maximum of \\(\\lambda'\\) on the 3rd of \\(\\lambda\\). \\(\\lambda'\\)?", answer: "\\(\\dfrac{7\\lambda}{9}\\)" },
      ],
      pyqExampleId: "7ab5e450-5490-47af-9950-1eda17943246",
      traps: [
        {
          title: "Using nλ for a maximum",
          body:
            "In SINGLE-slit diffraction \\(a\\sin\\theta = n\\lambda\\) gives the MINIMA — the opposite of the double-slit rule. Secondary maxima need the extra half.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-resolving-power",
      name: "Resolving Power",
      intuition:
        "Every point of an object is imaged as a small diffraction disc; two points blur into one when their discs overlap too much. Shorter light makes smaller discs, and a denser medium between object and lens shortens the light — so both sharpen the image.",
      definition:
        "- Limit of resolution \\(\\propto \\lambda\\); resolving power \\(= \\dfrac{2\\mu\\sin\\theta}{1.22\\lambda}\\) for a microscope.\n" +
        "- Improve it: shorter wavelength, larger aperture, or a higher-index medium (oil immersion). A longer wavelength or smaller objective makes it worse.\n" +
        "- The eye: \\(\\Delta\\theta = \\dfrac{1.22\\lambda}{D_{\\text{pupil}}}\\); at viewing distance \\(L\\) the smallest separation is \\(L\\,\\Delta\\theta\\).",
      formula: {
        label: "Angular resolution",
        latex: "\\Delta\\theta = \\frac{1.22\\lambda}{D}",
      },
      authoredExample: {
        prompt: "A microscope just resolves 0.2 μm with 600 nm light. With 450 nm light?",
        steps: ["Limit \\(\\propto \\lambda\\): \\(0.2 \\times \\dfrac{450}{600}\\)."],
        answer: "0.15 μm",
      },
      selfCheckExample: {
        prompt: "Name one change to the medium that improves a microscope's resolving power.",
        steps: ["Resolving power \\(\\propto \\mu\\)."],
        answer: "Use a medium of higher refractive index (oil)",
      },
      practiceSet: [
        { prompt: "0.1 mm resolved with 6000 Å. Limit with 4800 Å?", answer: "0.08 mm" },
      ],
      pyqExampleId: "daa4dd90-28b5-4073-8097-f2c5a841484b",
      traps: [
        {
          title: "A longer wavelength sees finer detail",
          body:
            "Resolving power goes as \\(\\frac{1}{\\lambda}\\): longer waves blur more. 'Increase the wavelength' is the planted wrong way to improve a microscope.",
        },
      ],
    },
  ],
  related: [
    { label: "Young's Double Slit — fringe positions", href: "/notes/mht-cet-physics/wave-optics/cetp-ydse-fringes" },
    { label: "Polarisation", href: "/notes/mht-cet-physics/wave-optics/cetp-polarisation" },
  ],
};
