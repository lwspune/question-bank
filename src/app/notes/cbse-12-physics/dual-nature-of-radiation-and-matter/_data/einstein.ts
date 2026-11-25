import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_DN_EINSTEIN_NOTE: SubtopicNote = {
  subtopicName: "Einstein's Photoelectric Equation and the Photon",
  title: "Einstein's Photoelectric Equation and the Photon",
  oneLineDefinition:
    "Light comes in photons of energy hν and momentum h/λ; one photon gives all its energy to one electron, which spends the work function to get out and keeps the rest as kinetic energy.",
  whyItMatters:
    "97 questions, eighty-seven of them from board papers, the most of any page in this chapter. Every year from 2022 to 2026 has numericals here: find the work function, the maximum kinetic energy, the stopping potential or the threshold wavelength, and the energy, momentum or number per second of photons. The board also asks you to read a stopping potential against frequency graph for its slope and intercepts (2023 to 2026), state Einstein's equation and how Millikan proved it (2024), and explain why the frequency and not the intensity decides the kinetic energy (2022 to 2025). A few questions bring in the hydrogen spectrum from the Atoms chapter (2023, 2025). The textbook adds its examples and exercises on photons from a laser, X-rays from 30 kV electrons and work functions from cut-off voltages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpdn-photon",
      name: "The photon: energy, momentum and number per second",
      intuition:
        "In Einstein's picture, light that meets matter behaves as a stream of packets called photons. Each photon has an energy and a momentum fixed by its frequency alone. A brighter beam of the same colour carries more photons each second, not bigger ones.",
      definition:
        "- In its interaction with matter, radiation behaves as if it is made of particles called **photons**.\n" +
        "- Each photon has energy \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\), momentum \\(p = \\dfrac{h\\nu}{c} = \\dfrac{h}{\\lambda}\\), and speed \\(c\\).\n" +
        "- All photons of one frequency have the same energy and momentum, whatever the intensity. A more intense beam only sends more photons per second across a given area.\n" +
        "- Photons are electrically neutral, so electric and magnetic fields do not deflect them.\n" +
        "- In a collision of a photon with a particle, total energy and total momentum are conserved, but the number of photons may not be: a photon may be absorbed or a new one created.\n" +
        "- A source of power \\(P\\) gives out \\(N = P/E\\) photons per second.\n" +
        "- A photon reflected straight back from a mirror goes from momentum \\(p\\) to \\(-p\\), so it gives the mirror momentum \\(2p\\). Board 2025 and 2026 asked this, as the push of a laser on a mirror: a beam of power \\(P\\) carries momentum \\(P/c\\) each second, so on a perfect mirror the force is \\(2P/c\\). The present NCERT book does not work this out; it follows from momentum conservation.\n" +
        "- Board 2026 also asked the 'equivalent mass' of a photon, from \\(E = mc^{2}\\): \\(m = \\dfrac{h}{\\lambda c}\\). The present NCERT book does not teach it, so give it little time.",
      formula: {
        label: "Energy, momentum and number of photons",
        latex: "E = h\\nu = \\frac{hc}{\\lambda}, \\qquad p = \\frac{h}{\\lambda} = \\frac{E}{c}, \\qquad N = \\frac{P}{E}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "Planck's constant, 6.63 × 10⁻³⁴ J s" },
          { symbol: "\\(\\nu, \\lambda\\)", meaning: "frequency and wavelength of the light" },
          { symbol: "\\(c\\)", meaning: "speed of light, 3 × 10⁸ m/s" },
          { symbol: "\\(P\\)", meaning: "power of the source, in watts" },
          { symbol: "\\(N\\)", meaning: "number of photons given out per second" },
        ],
      },
      authoredExample: {
        prompt:
          "A lamp gives out light of wavelength 450 nm with a power of 2.2 mW. Find the energy (in J and eV) and the momentum of each photon, and the number of photons given out per second.",
        steps: [
          "Given: \\(\\lambda = 450 \\times 10^{-9}\\) m, \\(P = 2.2 \\times 10^{-3}\\) W, \\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s.",
          "Formula: \\(E = \\dfrac{hc}{\\lambda}\\), \\(p = \\dfrac{h}{\\lambda}\\), \\(N = \\dfrac{P}{E}\\).",
          "\\(E = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{450 \\times 10^{-9}} = 4.42 \\times 10^{-19}\\) J \\(= \\dfrac{4.42 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.76\\) eV.",
          "\\(p = \\dfrac{6.63 \\times 10^{-34}}{450 \\times 10^{-9}} = 1.47 \\times 10^{-27}\\) kg m/s.",
          "\\(N = \\dfrac{2.2 \\times 10^{-3}}{4.42 \\times 10^{-19}} = 5.0 \\times 10^{15}\\) photons per second.",
        ],
        answer: "\\(E = 4.42 \\times 10^{-19}\\) J \\(= 2.76\\) eV; \\(p = 1.47 \\times 10^{-27}\\) kg m/s; \\(N = 5.0 \\times 10^{15}\\) per second",
      },
      selfCheckExample: {
        prompt: "A photon has a momentum of \\(1.1 \\times 10^{-27}\\) kg m/s. Find its wavelength and its energy in eV.",
        steps: [
          "\\(\\lambda = \\dfrac{h}{p} = \\dfrac{6.63 \\times 10^{-34}}{1.1 \\times 10^{-27}} = 6.03 \\times 10^{-7}\\) m \\(= 603\\) nm.",
          "\\(E = pc = 1.1 \\times 10^{-27} \\times 3 \\times 10^{8} = 3.3 \\times 10^{-19}\\) J \\(= 2.06\\) eV.",
        ],
        answer: "\\(\\lambda = 603\\) nm; \\(E = 2.06\\) eV",
      },
      practiceSet: [
        { prompt: "Which carries more energy per photon: red light or violet light?", answer: "Violet light, because it has the shorter wavelength" },
        { prompt: "Find the energy of a photon of frequency \\(8.0 \\times 10^{14}\\) Hz.", answer: "\\(5.3 \\times 10^{-19}\\) J" },
        { prompt: "A photon of momentum \\(p\\) is reflected straight back by a mirror. How much momentum does the mirror receive?", answer: "\\(2p\\)" },
        { prompt: "Is a beam of photons bent by a magnetic field?", answer: "No. Photons are electrically neutral" },
      ],
      pyqExampleId: "17e22c5b-0ecd-420e-b1ef-3d637a495158",
      traps: [
        {
          title: "Zero mass, so zero momentum",
          body: "A photon has no rest mass, yet it carries momentum \\(p = h/\\lambda = E/c\\). The form \\(p = mv\\) does not apply to it.",
        },
        {
          title: "A brighter beam has more energetic photons",
          body: "Intensity sets the NUMBER of photons per second. The energy of each photon depends on the frequency alone.",
        },
        {
          title: "Absorbed or reflected",
          body: "A photon absorbed by a surface gives it momentum \\(p\\); a photon reflected straight back gives it \\(2p\\). Read the word 'reflecting' before you substitute.",
        },
        {
          title: "Wavelength left in nm or cm",
          body: "Turn the wavelength into metres before putting it into \\(E = hc/\\lambda\\) or \\(p = h/\\lambda\\). A wavelength left in centimetres gives an answer \\(100\\) times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpdn-einstein-eq",
      name: "Einstein's photoelectric equation",
      intuition:
        "One photon gives all its energy to one electron, at once. The electron spends part of it, the work function, to get out of the metal; what is left is its kinetic energy. Electrons that start deeper lose some energy on the way out, so the equation gives the largest kinetic energy, not every electron's.",
      definition:
        "- **Einstein's photoelectric equation:** \\(K_{\\max} = h\\nu - \\phi_0\\). With \\(K_{\\max} = eV_0\\) and \\(\\phi_0 = h\\nu_0\\), it becomes \\(eV_0 = h\\nu - \\phi_0 = h(\\nu - \\nu_0)\\).\n" +
        "- More tightly bound electrons come out with less than \\(K_{\\max}\\), so the photoelectrons have a range of energies from zero up to \\(K_{\\max}\\).\n" +
        "- **How it explains the observations:**\n" +
        "- \\(K_{\\max}\\) depends linearly on \\(\\nu\\) and not on intensity, because one photon is absorbed by one electron; intensity is only the number of photons per unit area per unit time.\n" +
        "- \\(K_{\\max}\\) cannot be negative, so emission needs \\(h\\nu > \\phi_0\\): a threshold frequency must exist.\n" +
        "- More photons per second free more electrons, so the photocurrent is proportional to the intensity.\n" +
        "- Absorbing one photon is a single instant event, so emission starts at once however dim the light.",
      formula: {
        label: "Einstein's photoelectric equation",
        latex: "K_{\\max} = h\\nu - \\phi_0 = eV_0 = h(\\nu - \\nu_0)",
        symbols: [
          { symbol: "\\(h\\nu\\)", meaning: "energy of one incident photon" },
          { symbol: "\\(\\phi_0\\)", meaning: "work function of the metal" },
          { symbol: "\\(K_{\\max}\\)", meaning: "maximum kinetic energy of the photoelectrons" },
          { symbol: "\\(V_0\\)", meaning: "stopping potential" },
          { symbol: "\\(\\nu_0\\)", meaning: "threshold frequency of the metal" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of frequency \\(7.5 \\times 10^{14}\\) Hz falls on a metal of work function 2.0 eV. Find (a) the energy of a photon in eV, (b) the maximum kinetic energy of the photoelectrons, (c) the stopping potential.",
        steps: [
          "Given: \\(\\nu = 7.5 \\times 10^{14}\\) Hz, \\(\\phi_0 = 2.0\\) eV, \\(h = 6.63 \\times 10^{-34}\\) J s.",
          "(a) \\(E = h\\nu = 6.63 \\times 10^{-34} \\times 7.5 \\times 10^{14} = 4.97 \\times 10^{-19}\\) J \\(= \\dfrac{4.97 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 3.11\\) eV.",
          "(b) Formula: \\(K_{\\max} = h\\nu - \\phi_0 = 3.11 - 2.0 = 1.11\\) eV.",
          "(c) \\(eV_0 = K_{\\max}\\), so \\(V_0 = 1.11\\) V.",
        ],
        answer: "(a) 3.11 eV (b) 1.11 eV (c) 1.11 V",
      },
      selfCheckExample: {
        prompt:
          "Photons of energy 5.0 eV eject electrons from a surface, and the stopping potential is 2.1 V. Find the work function. What would the stopping potential be with photons of 6.0 eV?",
        steps: [
          "\\(\\phi_0 = h\\nu - eV_0 = 5.0 - 2.1 = 2.9\\) eV.",
          "The work function belongs to the surface, so it stays 2.9 eV.",
          "With 6.0 eV photons: \\(eV_0 = 6.0 - 2.9 = 3.1\\) eV, so \\(V_0 = 3.1\\) V.",
        ],
        answer: "\\(\\phi_0 = 2.9\\) eV; the new stopping potential is 3.1 V",
      },
      practiceSet: [
        { prompt: "Photons of energy 4.0 eV fall on a metal of work function 2.5 eV. Find the maximum kinetic energy of the photoelectrons.", answer: "1.5 eV" },
        {
          prompt: "Two lights on one metal give photoelectrons of maximum kinetic energy 1.0 eV and 4.0 eV. Find the ratio of their maximum speeds.",
          answer: "1 : 2, because the speed goes as the square root of the kinetic energy",
        },
        {
          prompt: "Why do the photoelectrons produced by light of one frequency have a range of speeds?",
          answer: "Electrons that start deeper in the metal are more tightly bound and lose energy on the way out, so only the surface electrons leave with the maximum",
        },
      ],
      pyqExampleId: "e6a2e12b-b630-4e7f-b3e9-1d22f2372bcc",
      traps: [
        {
          title: "Doubling the frequency doubles the kinetic energy",
          body: "\\(K = h\\nu - \\phi_0\\). At \\(2\\nu\\) it becomes \\(2h\\nu - \\phi_0 = 2K + \\phi_0\\), which is MORE than \\(2K\\), because the work function is taken away only once.",
        },
        {
          title: "Subtracting joules from electron volts",
          body: "Photon energies from \\(h\\nu\\) come out in joules; work functions are usually given in eV. Convert one of them before you subtract.",
        },
        {
          title: "A stopping potential written in eV",
          body: "A stopping potential is a potential, in volts. The maximum kinetic energy \\(eV_0\\) is an energy, in eV or joules. Write the unit that matches the quantity asked.",
        },
        {
          title: "Taking the ratio of photon energies",
          body: "To compare two maximum kinetic energies or speeds, subtract the work function from EACH photon energy first, then take the ratio. For speeds, take the square root of that ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpdn-threshold",
      name: "Threshold frequency, threshold wavelength and whether emission occurs",
      intuition:
        "A photon can free an electron only if its energy is at least the work function. The frequency at which it just manages is the threshold frequency, and the wavelength that goes with it is the longest wavelength that works. To decide whether a metal emits, compare one photon's energy with the work function; how bright the light is does not matter.",
      definition:
        "- At the threshold, the photon energy just equals the work function: \\(h\\nu_0 = \\phi_0\\), so \\(\\nu_0 = \\phi_0/h\\). The greater the work function, the higher the threshold frequency.\n" +
        "- **Threshold (cut-off) wavelength** \\(\\lambda_0 = \\dfrac{c}{\\nu_0} = \\dfrac{hc}{\\phi_0}\\): the LONGEST wavelength that can cause emission.\n" +
        "- Emission happens only if \\(\\nu > \\nu_0\\), that is if \\(\\lambda < \\lambda_0\\), that is if the photon energy is greater than \\(\\phi_0\\).\n" +
        "- To test several metals, find the photon energy in eV once and compare it with each work function.\n" +
        "- Brighter light, or a source brought closer, cannot start emission below the threshold. For a metal that already emits, it only gives more photoelectrons each second.",
      formula: {
        label: "Threshold frequency and threshold wavelength",
        latex: "\\nu_0 = \\frac{\\phi_0}{h}, \\qquad \\lambda_0 = \\frac{hc}{\\phi_0}",
        symbols: [
          { symbol: "\\(\\nu_0\\)", meaning: "threshold frequency" },
          { symbol: "\\(\\lambda_0\\)", meaning: "threshold wavelength, the longest wavelength that ejects electrons" },
          { symbol: "\\(\\phi_0\\)", meaning: "work function, in joules" },
        ],
      },
      authoredExample: {
        prompt:
          "The work function of a metal is 2.8 eV. Find its threshold frequency and threshold wavelength. Will light of wavelength 500 nm eject electrons from it?",
        steps: [
          "Given: \\(\\phi_0 = 2.8\\) eV \\(= 2.8 \\times 1.6 \\times 10^{-19} = 4.48 \\times 10^{-19}\\) J.",
          "Formula: \\(\\nu_0 = \\dfrac{\\phi_0}{h} = \\dfrac{4.48 \\times 10^{-19}}{6.63 \\times 10^{-34}} = 6.76 \\times 10^{14}\\) Hz.",
          "\\(\\lambda_0 = \\dfrac{c}{\\nu_0} = \\dfrac{3 \\times 10^{8}}{6.76 \\times 10^{14}} = 4.44 \\times 10^{-7}\\) m \\(= 444\\) nm.",
          "500 nm is longer than the threshold wavelength of 444 nm, so its photons carry less than the work function.",
        ],
        answer: "\\(\\nu_0 = 6.76 \\times 10^{14}\\) Hz, \\(\\lambda_0 = 444\\) nm; 500 nm light ejects no electrons, however bright",
      },
      selfCheckExample: {
        prompt:
          "Light of wavelength 400 nm falls on a metal whose threshold wavelength is 550 nm. Find the work function and the maximum kinetic energy of the photoelectrons, both in eV.",
        steps: [
          "\\(\\phi_0 = \\dfrac{hc}{\\lambda_0} = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{550 \\times 10^{-9}} = 3.62 \\times 10^{-19}\\) J \\(= 2.26\\) eV.",
          "\\(E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{400 \\times 10^{-9}} = 4.97 \\times 10^{-19}\\) J \\(= 3.11\\) eV.",
          "\\(K_{\\max} = 3.11 - 2.26 = 0.85\\) eV.",
        ],
        answer: "\\(\\phi_0 = 2.26\\) eV; \\(K_{\\max} = 0.85\\) eV",
      },
      practiceSet: [
        { prompt: "The threshold frequency of a metal is \\(4.0 \\times 10^{14}\\) Hz. Find its work function in eV.", answer: "1.66 eV" },
        { prompt: "Which is longer: the threshold wavelength of a metal, or a wavelength that ejects electrons from it?", answer: "The threshold wavelength" },
        { prompt: "Light just below the threshold frequency falls on a metal, and the lamp is brought much closer. Does emission start?", answer: "No. Only the number of photons rises, not the energy of each" },
      ],
      pyqExampleId: "a35864dc-17f4-447c-8305-cabcb1d750be",
      traps: [
        {
          title: "The threshold wavelength is the shortest one",
          body: "It is the LONGEST wavelength that can eject electrons. Shorter wavelengths carry more energy per photon and eject electrons; longer ones do not.",
        },
        {
          title: "Saying brighter light will work",
          body: "If the photon energy is below the work function, no electron is emitted, whatever the intensity or the distance of the source. Say so plainly with the reason: one photon acts on one electron.",
        },
        {
          title: "Comparing a photon energy in J with a work function in eV",
          body: "Put both in the same unit before deciding which is larger. The numbers 4.5 and \\(4.5 \\times 10^{-19}\\) are not comparable until one is converted.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpdn-einstein-graph",
      name: "The stopping potential against frequency graph",
      intuition:
        "Write Einstein's equation for the stopping potential and it becomes the equation of a straight line in frequency. Its slope is the same for every metal; only where it cuts the axes depends on the metal. Millikan used this line to measure Planck's constant, and that proved the equation.",
      definition:
        "- From \\(eV_0 = h\\nu - \\phi_0\\), dividing by \\(e\\): \\(V_0 = \\left(\\dfrac{h}{e}\\right)\\nu - \\dfrac{\\phi_0}{e}\\). This is a straight line, \\(y = mx + c\\), with \\(V_0\\) on the vertical axis.\n" +
        "- **Slope** \\(= h/e\\), the same for every metal, so the lines for different metals are parallel. Planck's constant is \\(h = e \\times\\) slope.\n" +
        "- **Intercept on the frequency axis** = the threshold frequency \\(\\nu_0\\); the work function is \\(\\phi_0 = h\\nu_0\\).\n" +
        "- **Intercept on the \\(V_0\\) axis** (the line extended) \\(= -\\phi_0/e\\), so \\(\\phi_0 = e \\times\\) the size of this intercept.\n" +
        "- The real line starts at \\(\\nu_0\\); below it there is no emission, so the extension is drawn dashed.\n" +
        "- A line lying farther to the right belongs to a metal with a larger threshold frequency and work function; at one frequency it gives the smaller \\(K_{\\max}\\).\n" +
        "- A graph of \\(K_{\\max}\\) against \\(\\nu\\) is a straight line of slope \\(h\\) that starts on the frequency axis at \\(\\nu_0\\).\n" +
        "- **Millikan (1906 to 1916)** measured the slope for sodium, found \\(h\\) close to \\(6.626 \\times 10^{-34}\\) J s, and so proved Einstein's equation, though he had set out to disprove it.",
      formula: {
        label: "Stopping potential as a straight line in frequency",
        latex: "V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\phi_0}{e}",
        symbols: [
          { symbol: "\\(h/e\\)", meaning: "slope of the line, the same for every metal" },
          { symbol: "\\(-\\phi_0/e\\)", meaning: "intercept on the stopping potential axis" },
          { symbol: "\\(\\nu_0\\)", meaning: "intercept on the frequency axis, the threshold frequency" },
        ],
      },
      authoredExample: {
        prompt:
          "The stopping potential against frequency graph for a metal is a straight line of slope \\(4.0 \\times 10^{-15}\\) V s that cuts the frequency axis at \\(5.0 \\times 10^{14}\\) Hz. Find Planck's constant and the work function of the metal in eV.",
        steps: [
          "Given: slope \\(= 4.0 \\times 10^{-15}\\) V s, \\(\\nu_0 = 5.0 \\times 10^{14}\\) Hz, \\(e = 1.6 \\times 10^{-19}\\) C.",
          "Slope \\(= h/e\\), so \\(h = e \\times\\) slope \\(= 1.6 \\times 10^{-19} \\times 4.0 \\times 10^{-15} = 6.4 \\times 10^{-34}\\) J s.",
          "\\(\\phi_0 = h\\nu_0 = 6.4 \\times 10^{-34} \\times 5.0 \\times 10^{14} = 3.2 \\times 10^{-19}\\) J \\(= 2.0\\) eV.",
          "So the line, extended, cuts the \\(V_0\\) axis at \\(-2.0\\) V.",
        ],
        answer: "\\(h = 6.4 \\times 10^{-34}\\) J s; \\(\\phi_0 = 2.0\\) eV",
      },
      selfCheckExample: {
        prompt:
          "For one metal the stopping potential is 0.6 V at a frequency of \\(6.0 \\times 10^{14}\\) Hz and 2.7 V at \\(1.1 \\times 10^{15}\\) Hz. Find the slope of the \\(V_0\\) against \\(\\nu\\) line, Planck's constant, and the threshold frequency.",
        steps: [
          "Slope \\(= \\dfrac{2.7 - 0.6}{(11 - 6.0) \\times 10^{14}} = \\dfrac{2.1}{5.0 \\times 10^{14}} = 4.2 \\times 10^{-15}\\) V s.",
          "\\(h = e \\times\\) slope \\(= 1.6 \\times 10^{-19} \\times 4.2 \\times 10^{-15} = 6.72 \\times 10^{-34}\\) J s.",
          "\\(V_0 = \\text{slope} \\times (\\nu - \\nu_0)\\): \\(0.6 = 4.2 \\times 10^{-15} (6.0 \\times 10^{14} - \\nu_0)\\), so \\(\\nu_0 = 4.57 \\times 10^{14}\\) Hz.",
        ],
        answer: "Slope \\(4.2 \\times 10^{-15}\\) V s; \\(h = 6.72 \\times 10^{-34}\\) J s; \\(\\nu_0 = 4.57 \\times 10^{14}\\) Hz",
      },
      practiceSet: [
        { prompt: "Two metals give straight lines on a stopping potential against frequency graph. Why are the lines parallel?", answer: "The slope is h/e, which does not depend on the metal" },
        { prompt: "What does the intercept on the frequency axis of this graph give?", answer: "The threshold frequency of the metal" },
        { prompt: "What is the slope of a graph of maximum kinetic energy against frequency?", answer: "Planck's constant, h" },
      ],
      pyqExampleId: "5da53e79-1428-4b1f-a659-7bde68420560",
      traps: [
        {
          title: "The slope depends on the metal",
          body: "Every metal gives the same slope \\(h/e\\). The metal changes only the intercepts, so a steeper line for 'the better metal' is a wrong graph.",
        },
        {
          title: "The wrong sign on the V₀ intercept",
          body: "Extended, the line cuts the stopping potential axis at \\(-\\phi_0/e\\), a NEGATIVE value. An option that gives \\(+h\\nu_0/e\\) for this intercept is wrong.",
        },
        {
          title: "Drawing the line through the origin",
          body: "The line meets the frequency axis at \\(\\nu_0\\), not at zero. A line through the origin would mean a work function of zero.",
        },
        {
          title: "Ordering the metals backwards",
          body: "The line farther to the RIGHT has the larger threshold frequency and work function. At one frequency its photoelectrons have the SMALLER kinetic energy.",
        },
      ],
    },
  ],
};
