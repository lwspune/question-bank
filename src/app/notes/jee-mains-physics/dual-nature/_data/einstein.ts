import type { SubtopicNote } from "@/app/notes/_types";

export const EINSTEIN_DUAL_NOTE: SubtopicNote = {
  subtopicName: "Einstein's Equation and Stopping Potential",
  title: "Einstein's Equation and Stopping Potential",
  oneLineDefinition:
    "Each photon's energy pays the work function and the rest becomes the fastest electron's kinetic energy: hν = φ + K_max with K_max = eV₀; two readings on one metal let the work function be eliminated.",
  whyItMatters:
    "Thirty-two PYQs, twenty-nine of them multiple choice, and five from 2026. Twelve shine one light on one metal: six go straight from the photon energy to the work function or the stopping potential, two give the light as an electric field, three send the fastest electron into a magnetic field, and one makes the photon from a hydrogen atom capturing an electron. Fourteen use two lights on the same metal and remove the work function by subtracting. Six compare the fastest electrons' speeds.",
  concepts: [
    // C1 — one light, one metal
    {
      kind: "formula" as const,
      slug: "jpdual-one-source",
      name: "Einstein's photoelectric equation for one light",
      intuition:
        "A photon gives all its energy to one electron. Part of it pays the work function to get the electron out; what is left is the kinetic energy of the fastest electron. The stopping potential is that kinetic energy measured in volts: an electron with 3 eV to spare is stopped by 3 V. Working in electron-volts keeps every step to one line.",
      definition:
        "- \\(h\\nu = \\dfrac{hc}{\\lambda} = \\phi + K_{\\max}\\), and \\(K_{\\max} = eV_0\\). In eV, \\(V_0\\) in volts equals \\(K_{\\max}\\) in eV.\n" +
        "- Light given as \\(E = E_0[\\sin\\omega_1 t + \\sin\\omega_2 t]\\) holds two frequencies. The fastest electrons come from the larger ω, with \\(\\nu = \\omega/2\\pi\\).\n" +
        "- An electron moving at right angles to a magnetic field B goes round a circle of radius \\(r = \\dfrac{mv}{eB} = \\dfrac{\\sqrt{2mK}}{eB}\\), so \\(K = \\dfrac{(eBr)^{2}}{2m}\\). A half circle brings it back to the plate a diameter, 2r, from where it left.\n" +
        "- The photon may come from hydrogen: a jump from \\(n_2\\) to \\(n_1\\) gives \\(13.6\\left(\\dfrac{1}{n_1^{2}} - \\dfrac{1}{n_2^{2}}\\right)\\) eV. An electron of kinetic energy K captured into level n gives \\(K + \\dfrac{13.6}{n^{2}}\\) eV.",
      formula: {
        label: "Einstein's photoelectric equation",
        latex: "h\\nu = \\frac{hc}{\\lambda} = \\phi + K_{\\max}, \\qquad K_{\\max} = eV_0",
      },
      authoredExample: {
        prompt:
          "Light of wavelength 248 nm falls on a metal of work function 2.3 eV. Find the stopping potential and the maximum speed of the electrons. (hc = 1240 eV nm, m = 9.1 × 10⁻³¹ kg, 1 eV = 1.6 × 10⁻¹⁹ J)",
        steps: [
          "Photon energy: \\(1240/248 = 5.0\\) eV.",
          "\\(K_{\\max} = 5.0 - 2.3 = 2.7\\) eV, so \\(V_0 = 2.7\\) V.",
          "\\(v = \\sqrt{\\dfrac{2K}{m}} = \\sqrt{\\dfrac{2 \\times 2.7 \\times 1.6 \\times 10^{-19}}{9.1 \\times 10^{-31}}} = \\sqrt{9.5 \\times 10^{11}} \\approx 9.7 \\times 10^{5}\\) m/s.",
        ],
        answer: "2.7 V; about \\(9.7 \\times 10^{5}\\) m/s",
      },
      selfCheckExample: {
        prompt:
          "Light whose electric field is \\(E = E_0[\\sin(2\\pi \\times 6 \\times 10^{14}\\,t) + \\sin(2\\pi \\times 1.2 \\times 10^{15}\\,t)]\\) falls on a metal of work function 2.5 eV. Find the maximum kinetic energy of the photoelectrons. (h = 4.14 × 10⁻¹⁵ eV s)",
        steps: [
          "The two frequencies are \\(6 \\times 10^{14}\\) Hz and \\(1.2 \\times 10^{15}\\) Hz; the fastest electrons come from the higher one.",
          "\\(h\\nu = 4.14 \\times 10^{-15} \\times 1.2 \\times 10^{15} \\approx 4.97\\) eV.",
          "\\(K_{\\max} = 4.97 - 2.5 \\approx 2.47\\) eV.",
        ],
        answer: "About 2.47 eV",
      },
      practiceSet: [
        { prompt: "Photons of 4.5 eV give a stopping potential of 1.8 V. Work function?", answer: "2.7 eV" },
        { prompt: "A metal has work function 2.0 eV. Light of 400 nm falls on it. Stopping potential? (hc = 1240 eV nm)", answer: "1.1 V" },
        { prompt: "Photoelectrons of kinetic energy K move in a circle of radius r at right angles to a magnetic field B. Write K in terms of e, B, r and m.", answer: "\\(K = \\dfrac{(eBr)^{2}}{2m}\\)" },
        { prompt: "An electron of kinetic energy 1.0 eV is captured into the n = 2 level of hydrogen. Energy of the photon given out?", answer: "4.4 eV", method: "1.0 + 13.6/4" },
      ],
      pyqExampleId: "f7e760e7-f8ba-45ae-be2e-9e4bd234df5f", // 2025: φ = 2.14 eV, V₀ = 2 V, find λ
      traps: [
        {
          title: "Divide ω by 2π",
          body: "A light wave written as sin(ωt) gives the angular frequency. The photon energy is hω/2π. Using hω makes it 6.28 times too large.",
        },
        {
          title: "Two frequencies, use the higher",
          body: "When the field holds two sine terms, the maximum kinetic energy comes from the higher frequency. The lower one gives slower electrons and is never the answer to a maximum.",
        },
        {
          title: "Volts and electron-volts are the same number",
          body: "A stopping potential of 2 V means the fastest electron had 2 eV. Working in eV needs no factor of e; converting to joules and back is where 1.6 × 10⁻¹⁹ errors come from.",
        },
      ],
    },

    // C2 — two lights on the same metal
    {
      kind: "formula" as const,
      slug: "jpdual-two-sources",
      name: "Two wavelengths on the same metal",
      intuition:
        "When the work function is not given, the question gives two readings instead. Write Einstein's equation for each light. The work function is the same in both, so subtracting the two equations removes it. Then put the result back into either equation to find φ or the threshold.",
      definition:
        "- \\(\\dfrac{hc}{\\lambda_1} = \\phi + eV_1\\) and \\(\\dfrac{hc}{\\lambda_2} = \\phi + eV_2\\).\n" +
        "- Subtract: \\(e(V_1 - V_2) = hc\\left(\\dfrac{1}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right)\\). φ is gone.\n" +
        "- When the wavelengths are λ and nλ, call \\(a = hc/\\lambda\\). Then \\(a = \\phi + eV_1\\) and \\(a/n = \\phi + eV_2\\).\n" +
        "- The threshold follows from \\(\\phi = hc/\\lambda_0\\).\n" +
        "- A longer wavelength always gives the smaller stopping potential. Check this before solving a stem.\n" +
        "- To double the kinetic energy, the new photon must carry \\(\\phi + 2K\\), not twice the old photon energy.",
      formula: {
        label: "Eliminating the work function",
        latex: "e(V_1 - V_2) = hc\\left(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right)",
      },
      authoredExample: {
        prompt:
          "The stopping potential for a metal is 6 V with light of wavelength λ and 1 V with light of wavelength 2λ. Find the threshold wavelength in terms of λ.",
        steps: [
          "Let \\(a = hc/\\lambda\\) in eV. Then \\(a = \\phi + 6\\) and \\(a/2 = \\phi + 1\\).",
          "Subtract: \\(a/2 = 5\\), so \\(a = 10\\) eV and \\(\\phi = 4\\) eV.",
          "\\(\\lambda_0 = \\dfrac{hc}{\\phi} = \\dfrac{a\\lambda}{\\phi} = \\dfrac{10\\lambda}{4} = 2.5\\lambda\\).",
          "Check: 2λ is shorter than 2.5λ, so the second light does eject electrons.",
        ],
        answer: "\\(2.5\\lambda\\)",
      },
      selfCheckExample: {
        prompt:
          "Light of 500 nm gives a stopping potential of 0.68 V on a metal. What stopping potential does light of 310 nm give on the same metal? (hc = 1240 eV nm)",
        steps: [
          "Difference in photon energy: \\(1240\\left(\\dfrac{1}{310} - \\dfrac{1}{500}\\right) = 4.00 - 2.48 = 1.52\\) eV.",
          "The stopping potential rises by the same amount: \\(0.68 + 1.52 = 2.20\\) V.",
          "The work function, if needed, is \\(2.48 - 0.68 = 1.80\\) eV.",
        ],
        answer: "2.2 V",
      },
      practiceSet: [
        { prompt: "On one metal, the maximum kinetic energy is 1 eV with light of wavelength λ and 4 eV with light of wavelength λ/2. Work function?", answer: "2 eV" },
        { prompt: "Two lights differ in photon energy by 1.5 eV. By how much do their stopping potentials differ on the same metal?", answer: "1.5 V" },
        { prompt: "A metal gives stopping potential V₀ with light of wavelength λ and V₀/3 with light of wavelength 2λ. Threshold wavelength?", answer: "4λ" },
        { prompt: "On a metal of work function 1 eV, a 2 eV photon ejects electrons of kinetic energy K. What photon energy gives 2K?", answer: "3 eV" },
      ],
      pyqExampleId: "f5bb8118-d85f-47c2-8ef3-c90ccef96bad", // 2024: 8 V at λ, 2 V at 3λ, threshold 9λ
      traps: [
        {
          title: "Subtract, do not divide",
          body: "Dividing the two Einstein equations leaves the work function in both numerator and denominator. Subtracting them removes it in one step.",
        },
        {
          title: "A longer wavelength cannot give a larger stopping potential",
          body: "Longer wavelength means less energy per photon, so less left over after the work function. A stem that gives the longer wavelength the larger stopping potential describes something impossible.",
        },
        {
          title: "Doubling K is not halving λ",
          body: "To double the kinetic energy the photon must carry φ + 2K. Halving the wavelength doubles the photon energy to 2φ + 2K, which gives more than 2K.",
        },
      ],
    },

    // C3 — speed ratios
    {
      kind: "formula" as const,
      slug: "jpdual-speed-ratio",
      name: "Comparing the maximum speeds of photoelectrons",
      intuition:
        "Speed comes from kinetic energy, and kinetic energy is what is left after the work function. So find the leftover energy in each case first, then take the square root of their ratio. Comparing the photon energies directly, or forgetting the square root, gives one of the wrong options.",
      definition:
        "- \\(\\tfrac{1}{2}mv_{\\max}^{2} = h\\nu - \\phi = h(\\nu - \\nu_0)\\).\n" +
        "- Photon energy \\(k\\phi\\): \\(K = (k - 1)\\phi\\), so \\(v \\propto \\sqrt{k - 1}\\).\n" +
        "- Frequency \\(k\\nu_0\\): \\(K = (k - 1)h\\nu_0\\), so again \\(v \\propto \\sqrt{k - 1}\\).\n" +
        "- Two frequencies on identical cathodes: subtract the equations, \\(\\tfrac{1}{2}m(v_1^{2} - v_2^{2}) = h(\\nu_1 - \\nu_2)\\); φ cancels.",
      formula: {
        label: "Speed of the fastest photoelectron",
        latex: "\\tfrac{1}{2}mv_{\\max}^{2} = h(\\nu - \\nu_0), \\qquad \\frac{v_1}{v_2} = \\sqrt{\\frac{\\nu_1 - \\nu_0}{\\nu_2 - \\nu_0}}",
      },
      authoredExample: {
        prompt:
          "Photons of 6.0 eV and then 2.0 eV fall on a metal of work function 1.5 eV. Find the ratio of the maximum speeds of the electrons in the two cases.",
        steps: [
          "Kinetic energies: \\(6.0 - 1.5 = 4.5\\) eV and \\(2.0 - 1.5 = 0.5\\) eV.",
          "Ratio of kinetic energies: \\(4.5/0.5 = 9\\).",
          "\\(v \\propto \\sqrt{K}\\), so \\(v_1/v_2 = \\sqrt{9} = 3\\).",
        ],
        answer: "3 : 1",
      },
      selfCheckExample: {
        prompt:
          "A metal has threshold frequency ν₀. Light of frequency 3ν₀ gives photoelectrons of maximum speed v. What frequency gives a maximum speed of 2v?",
        steps: [
          "At 3ν₀: \\(\\tfrac{1}{2}mv^{2} = 2h\\nu_0\\).",
          "Doubling the speed multiplies the kinetic energy by 4: \\(8h\\nu_0\\).",
          "\\(h\\nu - h\\nu_0 = 8h\\nu_0\\), so \\(\\nu = 9\\nu_0\\).",
        ],
        answer: "9ν₀",
      },
      practiceSet: [
        { prompt: "Photons of energy 4φ and 2φ fall on a metal of work function φ. Ratio of the maximum speeds?", answer: "√3 : 1" },
        { prompt: "Light of frequency 2ν₀ (ν₀ = threshold) gives a maximum speed v. Maximum speed at 17ν₀?", answer: "4v" },
        { prompt: "The frequency of the light on a cathode rises by Δν. By how much does \\(v_{\\max}^{2}\\) rise?", answer: "\\(\\dfrac{2h\\,\\Delta\\nu}{m}\\)" },
        { prompt: "The maximum speed of the photoelectrons doubles. By what factor has their maximum kinetic energy changed?", answer: "4" },
      ],
      pyqExampleId: "afafddcb-6e80-493b-8d73-329f063da5f3", // 2023: 2f₀ and 5f₀, v₁ : v₂
      traps: [
        {
          title: "Subtract the work function before the square root",
          body: "Speed goes as the square root of the leftover energy, k − 1 times φ, not of the photon energy kφ. Photons of 2φ and 8φ give speeds in the ratio 1 : √7, not 1 : 2.",
        },
        {
          title: "A speed ratio is not an energy ratio",
          body: "Kinetic energy goes as v². If the energies are in the ratio 1 : 4, the speeds are 1 : 2. Stopping at the energy ratio picks a wrong option.",
        },
      ],
    },
  ],
};
