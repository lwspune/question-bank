import type { SubtopicNote } from "@/app/notes/_types";

export const SUPERPOSITION_WO_NOTE: SubtopicNote = {
  subtopicName: "Coherent Sources and Resultant Intensity",
  title: "Coherent Sources and Resultant Intensity",
  oneLineDefinition:
    "Coherent waves add as amplitudes, so the intensity carries a cross term 2√(I₁I₂) cos φ; incoherent waves just add their intensities.",
  whyItMatters:
    "Twenty-three PYQs, fifteen of them multiple choice, and none yet from 2026. Six ask for the resultant of two beams at a given phase difference, coherent or not. Thirteen ask for the ratio of the brightest to the darkest fringe, five of them from slit widths rather than intensities. Four turn a layer of a medium, a column of air or a thin film into an extra optical path. Every one of them starts from amplitudes, not intensities.",
  concepts: [
    // C1 — resultant of two beams
    {
      kind: "formula" as const,
      slug: "jpwo-resultant",
      name: "Resultant intensity of two beams",
      intuition:
        "Two coherent waves keep a fixed phase difference, so their amplitudes add like two arrows at that angle. Squaring the resultant arrow gives the intensity, and the cross term 2√(I₁I₂) cos φ is the interference. For incoherent waves the phase difference jumps about so fast that the cross term averages to zero, and only the intensities add.",
      definition:
        "- Coherent sources keep a constant phase difference (in practice, both come from one source).\n" +
        "- Amplitudes add as phasors: \\(A^{2} = A_{1}^{2} + A_{2}^{2} + 2A_{1}A_{2}\\cos\\phi\\).\n" +
        "- Since \\(I \\propto A^{2}\\): coherent, \\(I = I_{1} + I_{2} + 2\\sqrt{I_{1}I_{2}}\\cos\\phi\\); incoherent, \\(I = I_{1} + I_{2}\\).\n" +
        "- Two equal beams \\(I_{0}\\) each: \\(I = 2I_{0}(1 + \\cos\\phi) = 4I_{0}\\cos^{2}\\dfrac{\\phi}{2}\\).\n" +
        "- Beyond \\(90^{\\circ}\\) the cosine is negative, so the coherent sum is less than the incoherent one.",
      formula: {
        label: "Two coherent beams",
        latex: "I = I_{1} + I_{2} + 2\\sqrt{I_{1}I_{2}}\\cos\\phi, \\qquad A^{2} = A_{1}^{2} + A_{2}^{2} + 2A_{1}A_{2}\\cos\\phi",
      },
      authoredExample: {
        prompt:
          "Two coherent beams of intensities 3I and 12I meet with a phase difference of \\(120^{\\circ}\\). Find the resultant intensity, and compare it with the intensity if the beams were incoherent.",
        steps: [
          "Cross term: \\(2\\sqrt{3I \\times 12I} = 2 \\times 6I = 12I\\).",
          "Coherent: \\(I_{R} = 3I + 12I + 12I\\cos 120^{\\circ} = 15I - 6I = 9I\\).",
          "Incoherent: \\(I_{R} = 3I + 12I = 15I\\).",
        ],
        answer: "9I when coherent, 15I when incoherent.",
      },
      selfCheckExample: {
        prompt:
          "Two waves \\(E_{1} = 3\\sin\\omega t\\) and \\(E_{2} = 4\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\) (in V/m) meet at a point. Find the amplitude of the resultant.",
        steps: [
          "The phase difference is \\(\\pi/2\\), so the cross term vanishes.",
          "\\(A = \\sqrt{3^{2} + 4^{2}} = 5\\) V/m.",
        ],
        answer: "5 V/m",
      },
      practiceSet: [
        { prompt: "Two equal coherent beams \\(I_{0}\\) each meet in phase. Resultant?", answer: "\\(4I_{0}\\)" },
        { prompt: "Two equal coherent beams \\(I_{0}\\) each meet with phase difference \\(\\pi/2\\). Resultant?", answer: "\\(2I_{0}\\)" },
        { prompt: "Incoherent beams of I and 3I meet. Resultant?", answer: "4I" },
        { prompt: "Two waves of amplitude A each meet with phase difference \\(2\\pi/3\\). Resultant amplitude?", answer: "A" },
      ],
      pyqExampleId: "7d11220c-192e-4bfc-994a-ffd683a259a3", // 2024: 1 : 9 beams, incoherent 10I, coherent at 60° 13I
      traps: [
        {
          title: "Incoherent means no cross term",
          body: "For incoherent beams the intensities simply add. Putting in 2√(I₁I₂) cos φ for them double-counts interference that averages away.",
        },
        {
          title: "Add amplitudes, not intensities",
          body: "The cross term uses √(I₁I₂), the product of the amplitudes. Writing 2I₁I₂ cos φ is dimensionally wrong and always among the options.",
        },
        {
          title: "Watch the sign of cos φ",
          body: "Past 90° the cosine is negative. At 120° the cross term subtracts, so the coherent sum is smaller than the incoherent one.",
        },
      ],
    },

    // C2 — maxima and minima
    {
      kind: "formula" as const,
      slug: "jpwo-max-min",
      name: "Brightest and darkest fringes",
      intuition:
        "The brightest fringe is where the two amplitudes add straight on; the darkest is where they subtract. So everything comes from the amplitude ratio, the square root of the intensity ratio. Equal beams cancel completely and give perfectly dark fringes; unequal beams never quite cancel.",
      definition:
        "- \\(I_{\\max} = (\\sqrt{I_{1}} + \\sqrt{I_{2}})^{2}\\), \\(I_{\\min} = (\\sqrt{I_{1}} - \\sqrt{I_{2}})^{2}\\).\n" +
        "- With the amplitude ratio \\(r = A_{1}/A_{2} = \\sqrt{I_{1}/I_{2}}\\): \\(\\dfrac{I_{\\max}}{I_{\\min}} = \\left(\\dfrac{r + 1}{r - 1}\\right)^{2}\\).\n" +
        "- \\(I_{\\max} - I_{\\min} = 4\\sqrt{I_{1}I_{2}}\\) and \\(I_{\\max} + I_{\\min} = 2(I_{1} + I_{2})\\), so \\(\\dfrac{I_{\\max} + I_{\\min}}{I_{\\max} - I_{\\min}} = \\dfrac{r^{2} + 1}{2r}\\).\n" +
        "- Equal beams \\(I_{0}\\): \\(I_{\\max} = 4I_{0}\\), \\(I_{\\min} = 0\\).\n" +
        "- Slit widths: by default the intensity through a slit is proportional to its width, so widths \\(w_{1} : w_{2}\\) give \\(r = \\sqrt{w_{1}/w_{2}}\\). If the question says the amplitude is proportional to the width, use the width ratio as r directly.",
      formula: {
        label: "Fringe contrast",
        latex: "\\frac{I_{\\max}}{I_{\\min}} = \\left(\\frac{\\sqrt{I_{1}} + \\sqrt{I_{2}}}{\\sqrt{I_{1}} - \\sqrt{I_{2}}}\\right)^{2} = \\left(\\frac{r + 1}{r - 1}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "Two coherent beams have intensities in the ratio 16 : 1. Find \\(I_{\\max} : I_{\\min}\\) and \\(\\dfrac{I_{\\max} + I_{\\min}}{I_{\\max} - I_{\\min}}\\).",
        steps: [
          "Amplitude ratio \\(r = \\sqrt{16} = 4\\).",
          "\\(\\dfrac{I_{\\max}}{I_{\\min}} = \\left(\\dfrac{5}{3}\\right)^{2} = \\dfrac{25}{9}\\).",
          "\\(\\dfrac{I_{\\max} + I_{\\min}}{I_{\\max} - I_{\\min}} = \\dfrac{25 + 9}{25 - 9} = \\dfrac{34}{16} = \\dfrac{17}{8}\\). Check: \\(\\dfrac{r^{2} + 1}{2r} = \\dfrac{17}{8}\\).",
        ],
        answer: "25 : 9, and 17/8.",
      },
      selfCheckExample: {
        prompt:
          "The two slits of a double-slit set-up have widths in the ratio 4 : 9, and the intensity through each slit is proportional to its width. Find \\(I_{\\max} : I_{\\min}\\).",
        steps: [
          "Intensities 4 : 9, so amplitudes 2 : 3.",
          "\\(\\dfrac{I_{\\max}}{I_{\\min}} = \\dfrac{(3 + 2)^{2}}{(3 - 2)^{2}} = 25\\).",
        ],
        answer: "25 : 1",
      },
      practiceSet: [
        { prompt: "Amplitudes in the ratio 3 : 1. \\(I_{\\max} : I_{\\min}\\)?", answer: "4 : 1" },
        { prompt: "Coherent beams 2I and 8I. \\(I_{\\max} - I_{\\min}\\)?", answer: "16I" },
        { prompt: "\\(I_{\\max}/I_{\\min} = 9\\). Ratio of the two intensities?", answer: "4 : 1 (amplitudes 2 : 1)" },
        { prompt: "Two equal beams \\(I_{0}\\). \\(I_{\\max}\\) and \\(I_{\\min}\\)?", answer: "\\(4I_{0}\\) and 0" },
      ],
      pyqExampleId: "2093d489-e147-4234-bcb4-7e519b65da41", // 2025: intensities 1 : 9, Imax : Imin = 4 : 1
      traps: [
        {
          title: "Take the square root first",
          body: "An intensity ratio of 1 : 9 is an amplitude ratio of 1 : 3. Putting 1 and 9 into (r + 1)/(r − 1) squares the ratio twice.",
        },
        {
          title: "Width ratio: intensity or amplitude?",
          body: "By default intensity is proportional to slit width. If the stem says amplitude is proportional to width, the widths are the amplitude ratio. Read which one the question states before you start.",
        },
        {
          title: "Only equal beams give true darkness",
          body: "I_min = 0 needs equal amplitudes. With unequal beams the dark fringes still carry (√I₁ − √I₂)².",
        },
      ],
    },

    // C3 — optical path and thin films
    {
      kind: "formula" as const,
      slug: "jpwo-optical-path",
      name: "Optical path and thin films",
      intuition:
        "Inside glass the wavelength is shorter, so more waves fit into the same thickness. A thickness t of index μ holds as many waves as a thickness μt of vacuum: that is its optical path. In a thin film, two reflected beams travel different optical paths, and a reflection off a denser medium adds half a wave more. Counting those half-waves is most of the work.",
      definition:
        "- Optical path of thickness t in index μ: \\(\\mu t\\). Extra over the same thickness of vacuum (or air): \\((\\mu - 1)t\\).\n" +
        "- Phase difference from it: \\(\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}(\\mu - 1)t\\); extra number of waves \\(\\dfrac{(\\mu - 1)t}{\\lambda}\\).\n" +
        "- Equal thicknesses of two media: path difference \\((\\mu_{2} - \\mu_{1})t\\), because the wavelengths differ.\n" +
        "- Reflection off a denser medium reverses the phase (\\(\\pi\\), half a wave); off a rarer medium it does not.\n" +
        "- Thin film at normal incidence, path difference \\(2\\mu t\\). **One** reversal: reflected dark at \\(2\\mu t = n\\lambda\\), bright at \\(2\\mu t = (n - \\tfrac{1}{2})\\lambda\\). **None or two**: the other way round.\n" +
        "- Transmitted light is brightest where reflected light is darkest. As a film thins, the pattern repeats every \\(\\Delta t = \\dfrac{\\lambda}{2\\mu}\\).",
      formula: {
        label: "Optical path and films",
        latex: "\\Delta = (\\mu - 1)t, \\qquad \\Delta\\phi = \\frac{2\\pi}{\\lambda}(\\mu - 1)t, \\qquad 2\\mu t = n\\lambda \\ \\text{or}\\ \\left(n - \\tfrac{1}{2}\\right)\\lambda",
      },
      authoredExample: {
        prompt:
          "A film of oil (μ = 1.25) floats on water (μ = 1.33). Light of wavelength 600 nm falls on it normally. Find the least thickness of oil that gives a reflected minimum.",
        steps: [
          "Air to oil: into a denser medium, one reversal. Oil to water: again into a denser medium, a second reversal.",
          "Two reversals cancel, so the reflected beams are out of step only by the path: dark when \\(2\\mu t = (n - \\tfrac{1}{2})\\lambda\\).",
          "Least thickness (n = 1): \\(t = \\dfrac{\\lambda}{4\\mu} = \\dfrac{600}{4 \\times 1.25} = 120\\) nm.",
        ],
        answer: "120 nm",
      },
      selfCheckExample: {
        prompt:
          "A soap film (μ = 1.25) stands in air and is lit normally with light of wavelength 500 nm. What is the least thickness that makes the reflected light bright?",
        steps: [
          "Only the top surface reverses the phase (air to soap); the bottom surface (soap to air) does not. One reversal.",
          "With one reversal, bright when \\(2\\mu t = (n - \\tfrac{1}{2})\\lambda\\); least t at n = 1: \\(t = \\dfrac{\\lambda}{4\\mu} = \\dfrac{500}{5} = 100\\) nm.",
        ],
        answer: "100 nm",
      },
      practiceSet: [
        { prompt: "Glass 2 μm thick, μ = 1.5, light of 500 nm. How many more waves than in the same thickness of vacuum?", answer: "2" },
        { prompt: "The same plate: extra phase difference?", answer: "\\(4\\pi\\)" },
        { prompt: "A film of μ = 1.5 in air, light of 600 nm. Thinnest non-zero film giving a reflected minimum?", answer: "200 nm" },
        { prompt: "A film of μ = 1.25 in air thins slowly in light of 600 nm. Change in thickness between successive transmission minima?", answer: "240 nm" },
      ],
      pyqExampleId: "845c071b-50cb-4653-94d5-7caf5eca1d66", // 2025: μ = 2.0 film on glass 1.45, 550 nm, 137.5 nm
      traps: [
        {
          title: "Count the reversals first",
          body: "Mark each surface: into a denser medium reverses, into a rarer one does not. One reversal and two reversals give opposite conditions for the same thickness.",
        },
        {
          title: "Transmission is the opposite of reflection",
          body: "A question about maximum transmission is a question about minimum reflection. Solve for the reflected minimum.",
        },
        {
          title: "The extra path is (μ − 1)t",
          body: "Compared with air, the plate adds (μ − 1)t, not μt. Using μt forgets that the same thickness of air already had a path t.",
        },
      ],
    },
  ],
};
