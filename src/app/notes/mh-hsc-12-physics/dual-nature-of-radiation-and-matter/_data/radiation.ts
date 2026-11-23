import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_DN_RADIATION_NOTE: SubtopicNote = {
  subtopicName: "Wave-Particle Duality of Radiation",
  title: "Wave-Particle Duality of Radiation",
  oneLineDefinition:
    "Why radiation needs both a wave picture and a particle picture, the momentum of a photon (p = E/c = h/λ), the properties of photons, and how many photons a source sends out each second.",
  whyItMatters:
    "6 questions. Two were set in board papers: the momentum of a photon (2018) and the number of photons from a 0.1 W source of 4000 Å light (2025), both as multiple choice. The textbook adds the same photon count worked in full (Solved Ex. 14.3), where E = pc is valid, red against blue photons from sources of equal power, and what wave-particle duality means and where it applies.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpdn-photon-momentum",
      name: "Momentum of a photon and its properties",
      intuition:
        "Compton's experiment on X-rays scattered by electrons showed that a photon behaves like a billiard ball: it carries momentum as well as energy and can bounce off an electron. A photon has no rest mass and always moves at the speed of light, so its momentum cannot be written as mass times velocity. Instead it comes from its energy: p = E/c.",
      definition:
        "- For a massless particle moving with speed c (special theory of relativity): \\(p = \\dfrac{E}{c}\\).\n" +
        "- With \\(E = h\\nu\\): \\(p = \\dfrac{h\\nu}{c} = \\dfrac{h}{\\lambda}\\).\n" +
        "- \\(E = pc\\) holds for a photon, not for an electron or a proton, which have rest mass.\n" +
        "- **Properties of photons:** all photons of one frequency have the same energy and momentum; they are electrically neutral and are not deflected by electric or magnetic fields; they always move with the speed of light and are never at rest; their rest mass is zero.\n" +
        "- In a photon and particle collision, energy and momentum are conserved, but the number of photons is not: photons can be absorbed or created.",
      formula: {
        label: "Momentum of a photon",
        latex: "p = \\frac{E}{c} = \\frac{h\\nu}{c} = \\frac{h}{\\lambda}",
      },
      authoredExample: {
        prompt:
          "Find the momentum and the energy of a photon of wavelength 6630 Å. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\lambda = 6630\\) Å \\(= 6.63 \\times 10^{-7}\\) m.",
          "Formula: \\(p = \\dfrac{h}{\\lambda}\\), \\(E = pc\\).",
          "\\(p = \\dfrac{6.63 \\times 10^{-34}}{6.63 \\times 10^{-7}} = 1 \\times 10^{-27}\\) kg m/s.",
          "\\(E = pc = 1 \\times 10^{-27} \\times 3 \\times 10^{8} = 3 \\times 10^{-19}\\) J \\(= 1.875\\) eV.",
        ],
        answer: "\\(p = 1 \\times 10^{-27}\\) kg m/s; \\(E = 3 \\times 10^{-19}\\) J = 1.875 eV",
      },
      selfCheckExample: {
        prompt: "A photon has energy \\(3.3 \\times 10^{-19}\\) J. Find its momentum. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: ["\\(p = \\dfrac{E}{c} = \\dfrac{3.3 \\times 10^{-19}}{3 \\times 10^{8}}\\)."],
        answer: "\\(1.1 \\times 10^{-27}\\) kg m/s",
      },
      practiceSet: [
        { prompt: "What is the rest mass of a photon?", answer: "Zero" },
        { prompt: "Is a photon deflected by a magnetic field?", answer: "No. It is electrically neutral" },
        { prompt: "The wavelength of a photon is halved. What happens to its momentum?", answer: "It doubles" },
        { prompt: "Which experiment showed that a photon carries momentum?", answer: "Compton's scattering of X-rays by electrons" },
      ],
      pyqExampleId: "b1c24c87-0216-4d39-bef4-6e96d214811f",
      traps: [
        {
          title: "Using mass times velocity for a photon",
          body: "A photon has zero rest mass, so \\(p = mv\\) does not apply. Use \\(p = E/c = h/\\lambda\\).",
        },
        {
          title: "Using E = pc for an electron",
          body: "\\(E = pc\\) is for a massless particle moving at the speed of light. For an electron, use \\(p = mv\\) or \\(p = \\sqrt{2mK}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-photon-count",
      name: "Number of photons from a source",
      intuition:
        "A source of power P gives out P joule each second, in packets of hν each. So the number of photons each second is P divided by the energy of one photon. Each photon is so small a packet of energy that even a weak lamp sends out an enormous number, which is why we never notice single photons and light seems continuous. For the same power, longer wavelength light needs more photons, since each one carries less.",
      definition:
        "- Photons emitted each second: \\(N = \\dfrac{P}{h\\nu} = \\dfrac{P\\lambda}{hc}\\).\n" +
        "- The energy of light can change only in steps of \\(h\\nu\\); these steps are so small that the change looks continuous.\n" +
        "- For two sources of equal power, \\(N \\propto \\lambda\\): a red source sends more photons each second than a blue one.",
      formula: {
        label: "Photons per second",
        latex: "N = \\frac{P}{h\\nu} = \\frac{P\\lambda}{hc}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of photons emitted per second" },
          { symbol: "\\(P\\)", meaning: "power of the source, in watt" },
        ],
      },
      authoredExample: {
        prompt:
          "A source emits \\(2 \\times 10^{18}\\) photons each second, all of wavelength 4420 Å. Find the power of the source. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(N = 2 \\times 10^{18}\\) per second, \\(\\lambda = 4420\\) Å \\(= 4.42 \\times 10^{-7}\\) m.",
          "Formula: \\(E = \\dfrac{hc}{\\lambda}\\), \\(P = NE\\).",
          "\\(E = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{4.42 \\times 10^{-7}} = 4.5 \\times 10^{-19}\\) J.",
          "\\(P = 2 \\times 10^{18} \\times 4.5 \\times 10^{-19} = 0.9\\) W.",
        ],
        answer: "0.9 W",
      },
      selfCheckExample: {
        prompt: "Two sources of equal power emit light of wavelengths 4000 Å and 6000 Å. Find the ratio of the numbers of photons they emit each second.",
        steps: ["\\(N \\propto \\lambda\\) at equal power.", "\\(N_1 : N_2 = 4000 : 6000\\)."],
        answer: "2 : 3",
      },
      practiceSet: [
        { prompt: "A source of power 2 W emits \\(5 \\times 10^{18}\\) photons each second. Find the energy of each photon.", answer: "\\(4 \\times 10^{-19}\\) J" },
        { prompt: "Why do we not notice individual photons from a lamp?", answer: "The number of photons each second is enormous and each carries a very small energy, so the energy seems continuous" },
        { prompt: "Two sources of equal power emit red and blue light. Which emits more photons each second?", answer: "The red source" },
      ],
      pyqExampleId: "7fee57cb-e819-44b0-81ba-337ae50011c7",
      traps: [
        {
          title: "Multiplying instead of dividing",
          body: "The number of photons is power DIVIDED by the energy of one photon. Multiplying gives a tiny number with the wrong unit.",
        },
        {
          title: "Thinking equal power means equal photons",
          body: "Equal power means equal energy each second. A red photon carries less energy than a blue one, so the red source must send more of them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpdn-duality-radiation",
      name: "Wave-particle duality of radiation",
      intuition:
        "Some experiments can be explained only if light is a wave, others only if it is a stream of photons, and some by both. Neither picture alone is enough, so we keep both: one dominates in some situations and the other in the rest. This is true not only for light but for the whole electromagnetic spectrum.",
      definition:
        "- **Wave-particle duality of radiation:** electromagnetic radiation shows a wave character in some phenomena and a particle (photon) character in others, so both models are needed.\n" +
        "- It applies to the whole electromagnetic spectrum, and, as de Broglie later proposed, to matter as well.\n" +
        "- The wave nature shows clearly when slit widths or slit separations are comparable to or smaller than the wavelength.\n" +
        "- The particle nature dominates when radiation interacts with matter; the wave nature dominates while it travels through space.",
      table: {
        columns: ["Phenomenon", "Explained by", "Why"],
        rows: [
          {
            cells: ["Interference and diffraction", "Wave picture", "Waves from two paths add up or cancel"],
            pyqExampleId: "b9f1501a-1bbc-41ba-b0f8-1f5c9969a63f",
            noteAmber: "The textbook asks what wave-particle duality means and where it applies.",
          },
          { cells: ["Polarization", "Wave picture", "It needs the oscillating fields of a transverse wave"] },
          { cells: ["Photoelectric effect", "Particle (photon) picture", "One photon gives energy hν to one electron"] },
          { cells: ["Black body radiation", "Particle (photon) picture", "Energy is emitted in packets of hν"] },
          { cells: ["Compton scattering of X-rays", "Particle (photon) picture", "A photon carries momentum h/λ and collides with an electron"] },
        ],
      },
      practiceSet: [
        { prompt: "Name one phenomenon that can be explained only by the photon picture of light.", answer: "The photoelectric effect (also accept black body radiation or Compton scattering)" },
        { prompt: "Name one phenomenon that shows the wave nature of light.", answer: "Interference (also accept diffraction or polarization)" },
        { prompt: "Which character of radiation dominates when it interacts with matter?", answer: "The particle (photon) character" },
      ],
      traps: [
        {
          title: "Saying light is either a wave or a particle",
          body: "Duality means BOTH models are needed. An answer that picks one has missed the point of the term.",
        },
        {
          title: "Stopping at visible light",
          body: "Duality holds for the whole electromagnetic spectrum, and matter shows it too. Say where it applies, as the question asks.",
        },
      ],
    },
  ],
};
