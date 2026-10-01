import type { SubtopicNote } from "@/app/notes/_types";

export const DEBROGLIE_DUAL_NOTE: SubtopicNote = {
  subtopicName: "de Broglie Wavelength of a Particle",
  title: "de Broglie Wavelength of a Particle",
  oneLineDefinition:
    "Every moving particle has a wavelength λ = h/p = h/√(2mK); for a charge q accelerated from rest through V it is h/√(2mqV), so the wavelength falls as the speed, the energy or the voltage rises.",
  whyItMatters:
    "Twenty-four PYQs, twenty-two of them multiple choice, and five from 2026. Fifteen change one thing and ask how the wavelength follows: five an accelerating voltage, three a kinetic energy, two a speed, three a gas temperature, one a photoelectron's energy and one a Bohr orbit. Four put an electron in an electric or a magnetic field. Five ask about the evidence for matter waves: the Davisson–Germer experiment, the electron microscope and the uncertainty principle.",
  concepts: [
    // C1 — λ = h/p and its scalings
    {
      kind: "formula" as const,
      slug: "jpdual-lambda-scaling",
      name: "de Broglie wavelength and how it scales",
      intuition:
        "de Broglie's idea is that a particle has a wavelength set by its momentum alone: λ = h/p. Everything else is a way of writing the momentum. From the kinetic energy, p = √(2mK). From an accelerating voltage, K = qV. From a temperature, K = 3kT/2. So the wavelength falls as 1/v, but only as 1/√K or 1/√V.",
      definition:
        "- \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv} = \\dfrac{h}{\\sqrt{2mK}} = \\dfrac{h}{\\sqrt{2mqV}}\\).\n" +
        "- Electron accelerated from rest through V volts: \\(\\lambda = \\dfrac{1.227}{\\sqrt{V}}\\) nm (or \\(12.27/\\sqrt{V}\\) Å).\n" +
        "- So \\(\\lambda \\propto 1/v\\), \\(\\lambda \\propto 1/\\sqrt{K}\\) and \\(\\lambda \\propto 1/\\sqrt{V}\\). For one particle, \\(\\lambda^{2}K = h^{2}/2m\\) stays fixed.\n" +
        "- A gas molecule at temperature T, taking \\(K = \\tfrac{3}{2}kT\\): \\(\\lambda = \\dfrac{h}{\\sqrt{3mkT}}\\), so \\(\\lambda \\propto 1/\\sqrt{T}\\).\n" +
        "- A photoelectron: \\(\\lambda_e = \\dfrac{h}{\\sqrt{2mK_{\\max}}}\\), with \\(K_{\\max}\\) from Einstein's equation.\n" +
        "- An electron in the nth Bohr orbit of radius r fits n whole waves round it: \\(n\\lambda = 2\\pi r\\).",
      formula: {
        label: "de Broglie wavelength",
        latex: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2mqV}}, \\qquad \\lambda_{e} = \\frac{1.227}{\\sqrt{V}}\\ \\text{nm}",
      },
      authoredExample: {
        prompt:
          "An electron is accelerated from rest through 150 V. Find its de Broglie wavelength. Through what voltage must it be accelerated to make its wavelength one third of this?",
        steps: [
          "\\(\\lambda = \\dfrac{1.227}{\\sqrt{150}} = \\dfrac{1.227}{12.25} \\approx 0.100\\) nm.",
          "\\(\\lambda \\propto 1/\\sqrt{V}\\), so a third of the wavelength needs \\(3^{2} = 9\\) times the voltage.",
          "\\(9 \\times 150 = 1350\\) V.",
        ],
        answer: "About 0.100 nm; 1350 V",
      },
      selfCheckExample: {
        prompt:
          "Find the de Broglie wavelength of a helium atom (mass \\(6.6 \\times 10^{-27}\\) kg) in a gas at 400 K, taking its kinetic energy as \\(\\tfrac{3}{2}kT\\). (h = 6.63 × 10⁻³⁴ J s, k = 1.38 × 10⁻²³ J/K)",
        steps: [
          "\\(K = 1.5 \\times 1.38 \\times 10^{-23} \\times 400 = 8.28 \\times 10^{-21}\\) J.",
          "\\(p = \\sqrt{2mK} = \\sqrt{2 \\times 6.6 \\times 10^{-27} \\times 8.28 \\times 10^{-21}} = \\sqrt{1.09 \\times 10^{-46}} \\approx 1.05 \\times 10^{-23}\\ \\text{kg m/s}\\).",
          "\\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{1.05 \\times 10^{-23}} \\approx 6.3 \\times 10^{-11}\\) m.",
        ],
        answer: "About \\(6.3 \\times 10^{-11}\\) m, or 63 pm",
      },
      practiceSet: [
        { prompt: "An electron is accelerated from rest through 25 V. Its de Broglie wavelength? (λ = 1.227/√V nm)", answer: "About 0.245 nm" },
        { prompt: "A particle's speed is tripled. What happens to its de Broglie wavelength?", answer: "It becomes one third." },
        { prompt: "A particle's kinetic energy is multiplied by 9/4. What fraction of its old value is its new de Broglie wavelength?", answer: "2/3" },
        { prompt: "An electron is in the n = 3 Bohr orbit, of radius r. Its de Broglie wavelength?", answer: "2πr/3" },
      ],
      pyqExampleId: "bbbbc591-359f-4b8b-aca5-ec977d5de531", // 2021: λ cut to 75%, extra energy needed
      traps: [
        {
          title: "λ goes as 1/√K, not 1/K",
          body: "Momentum is √(2mK). Four times the kinetic energy halves the wavelength; it does not quarter it. The same holds for the accelerating voltage.",
        },
        {
          title: "Use the particle's own charge",
          body: "A charge q accelerated through V gains qV. An alpha particle has charge 2e, so through V it gains 2eV, not eV.",
        },
        {
          title: "Extra energy is the change, not the new total",
          body: "When a question asks how much energy must be ADDED, find the new kinetic energy and subtract the old one. The new total is a distractor.",
        },
      ],
    },

    // C2 — electron in a field
    {
      kind: "formula" as const,
      slug: "jpdual-in-fields",
      name: "de Broglie wavelength of an electron in an electric or magnetic field",
      intuition:
        "The wavelength follows the speed. So find how the field changes the speed, then use λ = h/mv. An electric field along the motion speeds the particle up or slows it down. One at right angles adds a sideways velocity, which also raises the speed. A magnetic force is always at right angles to the motion, so it turns the particle but never changes its speed.",
      definition:
        "- Find \\(\\vec v(t)\\), then \\(\\lambda(t) = \\dfrac{h}{m\\,|\\vec v(t)|}\\).\n" +
        "- An electron has charge −e, so the force on it is \\(\\vec F = -e\\vec E\\), opposite to the field.\n" +
        "- Field along the motion: \\(v = v_0 \\pm \\dfrac{eE}{m}t\\), with the sign from the direction of the force.\n" +
        "- Field at right angles: \\(|\\vec v| = \\sqrt{v_0^{2} + \\left(\\dfrac{eEt}{m}\\right)^{2}}\\), so λ falls.\n" +
        "- A magnetic force does no work. The speed, and so λ, stays the same.",
      formula: {
        label: "Wavelength in a field",
        latex: "\\lambda(t) = \\frac{h}{m\\,|\\vec v(t)|}, \\qquad \\vec F = -e\\vec E \\ \\text{(electron)}",
      },
      authoredExample: {
        prompt:
          "An electron of mass m starts with velocity \\(v_0\\hat i\\) and de Broglie wavelength \\(\\lambda_0\\). A uniform field \\(\\vec E = E_0\\hat i\\) (\\(E_0 > 0\\)) acts on it. Find its wavelength at time t, and the time at which the wavelength becomes \\(2\\lambda_0\\).",
        steps: [
          "Force on the electron: \\(\\vec F = -eE_0\\hat i\\), against its motion, so it slows down.",
          "\\(v = v_0 - \\dfrac{eE_0}{m}t\\).",
          "\\(\\lambda = \\dfrac{h}{mv} = \\dfrac{\\lambda_0}{1 - \\dfrac{eE_0t}{mv_0}}\\).",
          "\\(\\lambda = 2\\lambda_0\\) when the speed has halved: \\(\\dfrac{eE_0t}{m} = \\dfrac{v_0}{2}\\), so \\(t = \\dfrac{mv_0}{2eE_0}\\).",
        ],
        answer: "\\(\\lambda = \\dfrac{\\lambda_0}{1 - eE_0t/(mv_0)}\\); \\(t = \\dfrac{mv_0}{2eE_0}\\)",
      },
      selfCheckExample: {
        prompt:
          "An electron moving along x at \\(3 \\times 10^{6}\\) m/s enters an electric field along y. After some time its y-velocity is \\(4 \\times 10^{6}\\) m/s. Its starting de Broglie wavelength was \\(\\lambda_0\\). What is it now?",
        steps: [
          "The field along y does not change the x-velocity.",
          "Speed now: \\(\\sqrt{3^{2} + 4^{2}} \\times 10^{6} = 5 \\times 10^{6}\\) m/s.",
          "\\(\\lambda \\propto 1/v\\): \\(\\lambda = \\dfrac{3}{5}\\lambda_0\\).",
        ],
        answer: "\\(0.6\\lambda_0\\)",
      },
      practiceSet: [
        { prompt: "In which direction is the force on an electron in a field \\(\\vec E = E_0\\hat i\\)?", answer: "Along \\(-\\hat i\\), opposite to the field" },
        { prompt: "An electron starts from rest in a uniform field of size E. Its de Broglie wavelength after time t?", answer: "\\(\\lambda = \\dfrac{h}{eEt}\\)" },
        { prompt: "A proton moves with velocity \\(v_0\\hat i\\) in a field \\(E_0\\hat i\\). Its speed after time t?", answer: "\\(v_0 + \\dfrac{eE_0t}{m_p}\\)" },
        { prompt: "An electron's velocity changes from \\(5 \\times 10^{5}\\hat i\\) to \\((5\\hat i + 12\\hat j) \\times 10^{5}\\) m/s. By what factor does its de Broglie wavelength change?", answer: "5/13" },
      ],
      pyqExampleId: "5e648301-5b90-4f2d-a759-1d266cf4b01f", // 2022: electron along +x in E = −E₀ î
      traps: [
        {
          title: "The force on an electron is opposite to the field",
          body: "For an electron, F = −eE. A field pointing against the motion pushes the electron forward and shortens its wavelength; a field along the motion slows it and lengthens the wavelength.",
        },
        {
          title: "A sideways electric field still changes λ",
          body: "A field at right angles to the motion adds a sideways velocity. The speed grows as √(v₀² + (eEt/m)²), so the wavelength falls, even though the original velocity component is unchanged.",
        },
        {
          title: "A magnetic field never changes λ",
          body: "The magnetic force is always at right angles to the velocity, so it does no work and the speed stays the same. The wavelength is unchanged at every instant.",
        },
      ],
    },

    // C3 — evidence for matter waves
    {
      kind: "reference" as const,
      slug: "jpdual-wave-nature",
      name: "Evidence for matter waves",
      intuition:
        "Light behaves as a wave in interference and as particles in the photoelectric effect. de Broglie said matter does the same in reverse. Electrons sent through a crystal make a diffraction pattern, just as X-rays do, and the wavelength measured agrees with h/p. The short wavelength of fast electrons is what makes an electron microscope so sharp.",
      definition:
        "- Every moving particle has a wavelength λ = h/p. Light and matter both show wave and particle behaviour.\n" +
        "- Interference and diffraction are the signature of a wave; the photoelectric effect is the signature of particles.\n" +
        "- Matter waves are not electromagnetic waves; a neutral particle has one too.\n" +
        "- The finest detail a microscope can show scales with the wavelength it uses, so resolving power \\(\\propto 1/\\lambda\\).\n" +
        "- Heisenberg's uncertainty principle: \\(\\Delta x\\,\\Delta p \\ge \\dfrac{h}{4\\pi}\\).",
      table: {
        columns: ["Observation or device", "What it shows", "Key relation"],
        rows: [
          { cells: ["Davisson–Germer experiment", "Electrons scattered from a nickel crystal give a diffraction peak, so electrons behave as waves", "At 54 V the peak is at 50°; the measured λ ≈ 0.165 nm matches h/p"] },
          { cells: ["Electron diffraction and interference", "A beam of electrons spreads and makes fringes, like light", "Fringe spacing grows with λ = h/p"] },
          { cells: ["Electron microscope", "Resolves far finer detail than an optical microscope", "Electron λ is a fraction of a nanometre, against 400–700 nm for light"] },
          { cells: ["Heavier particle at the same speed", "Shorter wavelength, finer detail", "λ = h/mv, so at equal speed λ ∝ 1/m"] },
          { cells: ["Photoelectric effect", "Light arrives as particles, photons", "E = hν per photon"] },
          { cells: ["Heisenberg uncertainty principle", "Position and momentum cannot both be known exactly", "Δx Δp ≥ h/4π"] },
          { cells: ["Everyday objects", "No visible wave effects", "For a large mass, h/mv is far smaller than any gap or slit"] },
        ],
        caption: "Wave behaviour is shown by diffraction and interference; particle behaviour by one-at-a-time energy exchange.",
      },
      selfCheckExample: {
        prompt:
          "Find the de Broglie wavelength of a 0.15 kg cricket ball moving at 20 m/s, and say why it shows no diffraction. (h = 6.63 × 10⁻³⁴ J s)",
        steps: [
          "\\(p = 0.15 \\times 20 = 3\\ \\text{kg m/s}\\).",
          "\\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{3} = 2.21 \\times 10^{-34}\\) m.",
          "This is far smaller than any gap the ball could pass through, so no diffraction can be seen.",
        ],
        answer: "\\(2.2 \\times 10^{-34}\\) m; far too small to diffract",
      },
      practiceSet: [
        { prompt: "Which experiment first confirmed that electrons behave as waves?", answer: "The Davisson–Germer experiment" },
        { prompt: "Why does an electron microscope resolve finer detail than an optical microscope?", answer: "Its electrons have a de Broglie wavelength far shorter than visible light." },
        { prompt: "Does a neutron, which has no charge, have a de Broglie wavelength?", answer: "Yes; every moving particle does." },
        { prompt: "An electron's position is known to within \\(1 \\times 10^{-10}\\) m. Least uncertainty in its momentum? (h = 6.63 × 10⁻³⁴ J s)", answer: "About \\(5.3 \\times 10^{-25}\\ \\text{kg m/s}\\)", method: "\\(\\Delta p = h/(4\\pi\\Delta x)\\)" },
      ],
      pyqExampleId: "3bf2febd-429b-4e39-af81-ad725b367394", // 2021: electron microscope, assertion-reason
      traps: [
        {
          title: "Matter waves are not electromagnetic",
          body: "An electron's wave is not light and does not need a charge. A neutron or a whole atom has a de Broglie wavelength too.",
        },
        {
          title: "Diffraction means wave, photoelectric means particle",
          body: "Electron diffraction is evidence for the wave nature of matter. The photoelectric effect is evidence for the particle nature of light. Swapping the two is a common wrong statement.",
        },
      ],
    },
  ],
};
