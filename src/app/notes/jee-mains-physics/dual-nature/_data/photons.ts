import type { SubtopicNote } from "@/app/notes/_types";

export const PHOTONS_DUAL_NOTE: SubtopicNote = {
  subtopicName: "Photon Energy, Momentum and Threshold",
  title: "Photon Energy, Momentum and Threshold",
  oneLineDefinition:
    "Light comes in photons of energy hν = hc/λ and momentum h/λ; a source's power is the number of photons per second times that energy, and a photon frees an electron only if its energy beats the metal's work function.",
  whyItMatters:
    "Twenty PYQs, eighteen of them multiple choice, and two from 2026. Seven are about photon energy: five count the photons a source emits each second, one places a photon in the spectrum from its energy, and one finds the energy an atom keeps after absorbing one photon and emitting another. Five are about the momentum light carries. Eight compare a photon with the work function: a threshold wavelength or frequency, or which metal, colour or lamp can eject electrons at all.",
  concepts: [
    // C1 — photon energy and photon count
    {
      kind: "formula" as const,
      slug: "jpdual-photon-energy",
      name: "Photon energy and photons per second",
      intuition:
        "Light arrives in packets. Each packet, a photon, carries energy hν, so blue light carries more per photon than red. A lamp's power is just the number of photons it sends out each second times the energy of one. So at the same power, a red lamp must send out more photons than a blue one.",
      definition:
        "- \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\). In electron-volts, \\(E = \\dfrac{1240}{\\lambda\\,(\\text{nm})}\\) eV. Some papers give \\(hc = 1242\\) eV nm; use the value printed.\n" +
        "- \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J.\n" +
        "- Photons per second from a source of power P: \\(n = \\dfrac{P}{E} = \\dfrac{P\\lambda}{hc}\\). At equal power, \\(n \\propto \\lambda\\).\n" +
        "- A beam of intensity I through an area A: \\(n = \\dfrac{IA\\lambda}{hc}\\).\n" +
        "- Two sources: \\(\\dfrac{P_1}{P_2} = \\dfrac{n_1/\\lambda_1}{n_2/\\lambda_2}\\).\n" +
        "- An atom that absorbs \\(\\lambda_1\\) and emits \\(\\lambda_2\\) keeps \\(hc\\left(\\dfrac{1}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right)\\).\n" +
        "- Band from frequency: radio, microwave, infrared, visible (about \\(4\\)–\\(7.5 \\times 10^{14}\\) Hz), ultraviolet, X-rays, gamma rays, in rising order.",
      formula: {
        label: "Photon energy and photon count",
        latex: "E = h\\nu = \\frac{hc}{\\lambda}, \\qquad n = \\frac{P}{E} = \\frac{P\\lambda}{hc}",
        symbols: [
          { symbol: "n", meaning: "photons emitted per second" },
          { symbol: "P", meaning: "power of the source" },
        ],
      },
      authoredExample: {
        prompt:
          "A 4 mW laser emits light of wavelength 495 nm. How many photons does it emit each second? (h = 6.6 × 10⁻³⁴ J s, c = 3 × 10⁸ m/s)",
        steps: [
          "Energy of one photon: \\(E = \\dfrac{hc}{\\lambda} = \\dfrac{6.6 \\times 10^{-34} \\times 3 \\times 10^{8}}{495 \\times 10^{-9}} = \\dfrac{1.98 \\times 10^{-25}}{4.95 \\times 10^{-7}} = 4.0 \\times 10^{-19}\\) J.",
          "As a check in eV: \\(4.0 \\times 10^{-19}/1.6 \\times 10^{-19} = 2.5\\) eV, and \\(1240/495 \\approx 2.5\\) eV.",
          "Photons per second: \\(n = \\dfrac{P}{E} = \\dfrac{4 \\times 10^{-3}}{4.0 \\times 10^{-19}} = 1.0 \\times 10^{16}\\).",
        ],
        answer: "\\(1.0 \\times 10^{16}\\) photons per second",
      },
      selfCheckExample: {
        prompt:
          "A beam of wavelength 620 nm and intensity 50 W/m² falls normally on an area of 2 cm². How many photons cross this area each second? (hc = 1240 eV nm, 1 eV = 1.6 × 10⁻¹⁹ J)",
        steps: [
          "Power through the area: \\(P = IA = 50 \\times 2 \\times 10^{-4} = 1.0 \\times 10^{-2}\\) W.",
          "Energy of one photon: \\(1240/620 = 2.0\\) eV \\(= 3.2 \\times 10^{-19}\\) J.",
          "\\(n = \\dfrac{1.0 \\times 10^{-2}}{3.2 \\times 10^{-19}} \\approx 3.1 \\times 10^{16}\\).",
        ],
        answer: "About \\(3.1 \\times 10^{16}\\) photons per second",
      },
      practiceSet: [
        { prompt: "Energy of a photon of wavelength 310 nm, in eV? (hc = 1240 eV nm)", answer: "4.0 eV" },
        { prompt: "Two lamps have the same power. One emits at 400 nm, the other at 800 nm. Ratio of the photons they emit per second?", answer: "1 : 2", method: "At equal power, n ∝ λ." },
        { prompt: "An atom absorbs a 400 nm photon and emits a 500 nm photon. Energy it keeps, in eV? (hc = 1240 eV nm)", answer: "0.62 eV", method: "\\(1240\\left(\\frac{1}{400} - \\frac{1}{500}\\right) = \\frac{1240}{2000}\\)" },
        { prompt: "A 100 W source emits light of frequency \\(5 \\times 10^{14}\\) Hz. Photons per second? (h = 6.6 × 10⁻³⁴ J s)", answer: "About \\(3 \\times 10^{20}\\)" },
      ],
      pyqExampleId: "2d08b93c-e3a9-40b0-948d-45910d6b89ff", // 2026: 6 mW laser at 663 nm, photons per second
      traps: [
        {
          title: "At equal power, the longer wavelength sends more photons",
          body: "Each red photon carries less energy than a blue one, so a red lamp must send out more of them to deliver the same power. Photons per second go as λ, not as 1/λ.",
        },
        {
          title: "A power ratio is not a photon ratio",
          body: "Power is the photon count times the energy of one photon, P = nhc/λ. When both the count and the wavelength change, write P₁/P₂ = (n₁/λ₁)/(n₂/λ₂) and solve for the unknown.",
        },
        {
          title: "Use the hc the paper gives",
          body: "Both 1240 eV nm and 1242 eV nm appear in JEE papers. The options are sometimes close enough that the wrong constant picks the wrong one.",
        },
      ],
    },

    // C2 — photon momentum
    {
      kind: "formula" as const,
      slug: "jpdual-photon-momentum",
      name: "Photon momentum and the push of light",
      intuition:
        "A photon has no mass but it does carry momentum, p = h/λ = E/c. When light is absorbed, the surface takes that momentum. When light bounces straight back, the momentum reverses, so the surface takes twice as much. A free body that emits a photon recoils the other way.",
      definition:
        "- \\(p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}\\). A shorter wavelength means more momentum and more energy.\n" +
        "- Light of total energy E absorbed: momentum delivered \\(E/c\\). Reflected straight back: \\(2E/c\\).\n" +
        "- A steady beam of power P: force \\(P/c\\) if absorbed, \\(2P/c\\) if reflected.\n" +
        "- A pulse of power P lasting t carries \\(E = Pt\\).\n" +
        "- A mirror hanging on a thread: the pulse gives it momentum \\(mv = 2E/c\\); then it swings like a pendulum, and for a small angle \\(v = \\theta\\sqrt{gl}\\).\n" +
        "- A free body of mass M that emits a photon recoils with momentum \\(h\\nu/c\\), so it also gains kinetic energy \\(p^{2}/2M\\). Its internal energy falls by the photon's energy plus that recoil energy.",
      formula: {
        label: "Photon momentum and force of light",
        latex: "p = \\frac{h}{\\lambda} = \\frac{E}{c}, \\qquad F_{\\text{absorbed}} = \\frac{P}{c}, \\quad F_{\\text{reflected}} = \\frac{2P}{c}",
      },
      authoredExample: {
        prompt:
          "A light pulse of power 30 W lasts 2 ms and falls normally on a mirror that reflects all of it. Find the momentum given to the mirror and the force on it while the pulse lasts. (c = 3 × 10⁸ m/s)",
        steps: [
          "Energy in the pulse: \\(E = Pt = 30 \\times 2 \\times 10^{-3} = 0.06\\) J.",
          "Reflected, so the momentum delivered is doubled: \\(p = \\dfrac{2E}{c} = \\dfrac{0.12}{3 \\times 10^{8}} = 4 \\times 10^{-10}\\ \\text{kg m/s}\\).",
          "Force while the pulse lasts: \\(F = \\dfrac{2P}{c} = \\dfrac{60}{3 \\times 10^{8}} = 2 \\times 10^{-7}\\) N. Check: \\(F t = 2 \\times 10^{-7} \\times 2 \\times 10^{-3} = 4 \\times 10^{-10}\\).",
        ],
        answer: "\\(4 \\times 10^{-10}\\ \\text{kg m/s}\\); \\(2 \\times 10^{-7}\\) N",
      },
      selfCheckExample: {
        prompt:
          "A 10 g mirror hangs at rest. A laser pulse of energy 1.5 J is reflected straight back from it. How fast does the mirror move just after the pulse? (c = 3 × 10⁸ m/s)",
        steps: [
          "Momentum given: \\(\\dfrac{2E}{c} = \\dfrac{3}{3 \\times 10^{8}} = 1 \\times 10^{-8}\\ \\text{kg m/s}\\).",
          "\\(v = \\dfrac{1 \\times 10^{-8}}{0.01} = 1 \\times 10^{-6}\\) m/s.",
        ],
        answer: "\\(1 \\times 10^{-6}\\) m/s",
      },
      practiceSet: [
        { prompt: "Momentum of a photon of wavelength 330 nm? (h = 6.6 × 10⁻³⁴ J s)", answer: "\\(2 \\times 10^{-27}\\ \\text{kg m/s}\\)" },
        { prompt: "Photon A has half the wavelength of photon B. Ratio of their momenta, p_A : p_B?", answer: "2 : 1" },
        { prompt: "A 90 W beam is fully absorbed by a surface. Force on the surface? (c = 3 × 10⁸ m/s)", answer: "\\(3 \\times 10^{-7}\\) N" },
        { prompt: "A free atom of mass \\(2 \\times 10^{-26}\\) kg emits a photon of momentum \\(4 \\times 10^{-27}\\ \\text{kg m/s}\\). Recoil speed of the atom?", answer: "0.2 m/s" },
      ],
      pyqExampleId: "c0fae36b-cf17-4aa2-8b55-a054ce5af211", // 2023: absorbed pulse, 20 mW for 300 ns
      traps: [
        {
          title: "Reflection doubles the push",
          body: "Absorbed light delivers E/c; light reflected straight back delivers 2E/c, because its momentum reverses. Read the stem for absorbed or reflected before using either.",
        },
        {
          title: "Energy and momentum rise together",
          body: "Both E = hc/λ and p = h/λ grow as the wavelength falls. A statement that a shorter wavelength gives a photon less momentum or less energy is false.",
        },
        {
          title: "Recoil takes energy too",
          body: "A free body that emits a photon of energy hν loses more than hν of internal energy. The extra is the recoil kinetic energy p²/2M, with p = hν/c.",
        },
      ],
    },

    // C3 — threshold
    {
      kind: "formula" as const,
      slug: "jpdual-threshold",
      name: "Work function, threshold frequency and threshold wavelength",
      intuition:
        "An electron is held inside a metal. The least energy that frees one is the work function φ. A photon either has that much energy or it does not, and one photon acts on one electron. So there is a lowest frequency, and a longest wavelength, that can eject anything. Below it, no amount of brightness helps.",
      definition:
        "- \\(\\phi = h\\nu_0 = \\dfrac{hc}{\\lambda_0}\\). In handy units, \\(\\lambda_0\\,(\\text{nm}) = \\dfrac{1240}{\\phi\\,(\\text{eV})}\\).\n" +
        "- Emission happens only if \\(h\\nu > \\phi\\), that is \\(\\nu > \\nu_0\\) or \\(\\lambda < \\lambda_0\\).\n" +
        "- A source below threshold ejects nothing, whatever its power.\n" +
        "- If the stem gives the angular frequency ω, use \\(\\nu = \\omega/2\\pi\\).\n" +
        "- Visible light runs from about 400 nm (violet, 3.1 eV) to 700 nm (red, 1.8 eV). Infrared photons carry less than 1.8 eV.",
      formula: {
        label: "Threshold",
        latex: "\\phi = h\\nu_0 = \\frac{hc}{\\lambda_0}, \\qquad \\lambda_0\\,(\\text{nm}) = \\frac{1240}{\\phi\\,(\\text{eV})}",
      },
      authoredExample: {
        prompt:
          "Light of wavelength 500 nm falls on three metals with work functions 2.0 eV, 2.3 eV and 2.8 eV. Which of them emit electrons? Find the threshold wavelength of each. (hc = 1240 eV nm)",
        steps: [
          "Photon energy: \\(1240/500 = 2.48\\) eV.",
          "2.48 eV beats 2.0 eV and 2.3 eV but not 2.8 eV, so only the first two emit.",
          "Threshold wavelengths: \\(1240/2.0 = 620\\) nm, \\(1240/2.3 \\approx 539\\) nm, \\(1240/2.8 \\approx 443\\) nm.",
          "Check: 500 nm is shorter than 620 nm and 539 nm, but longer than 443 nm.",
        ],
        answer: "The 2.0 eV and 2.3 eV metals emit; thresholds 620 nm, 539 nm and 443 nm.",
      },
      selfCheckExample: {
        prompt:
          "A metal has work function 4.96 eV. Find its threshold wavelength and threshold frequency. (hc = 1240 eV nm, c = 3 × 10⁸ m/s)",
        steps: [
          "\\(\\lambda_0 = 1240/4.96 = 250\\) nm.",
          "\\(\\nu_0 = \\dfrac{c}{\\lambda_0} = \\dfrac{3 \\times 10^{8}}{250 \\times 10^{-9}} = 1.2 \\times 10^{15}\\) Hz.",
        ],
        answer: "250 nm; \\(1.2 \\times 10^{15}\\) Hz",
      },
      practiceSet: [
        { prompt: "Threshold wavelength of a metal with work function 2.48 eV? (hc = 1240 eV nm)", answer: "500 nm" },
        { prompt: "A metal's threshold wavelength is 310 nm. Its work function? (hc = 1240 eV nm)", answer: "4.0 eV" },
        { prompt: "Light of angular frequency ω just ejects electrons from a metal, with zero kinetic energy. Work function?", answer: "\\(\\phi = \\dfrac{h\\omega}{2\\pi}\\)" },
        { prompt: "A metal's threshold wavelength is 450 nm. Does a 1000 W infrared lamp eject electrons from it?", answer: "No", method: "Infrared wavelengths are longer than 700 nm, beyond the 450 nm threshold; power does not matter." },
      ],
      pyqExampleId: "4ef096ad-2085-4c75-a351-d22d3185f9ad", // 2023: 350 nm on metals of 4.8 eV and 2.2 eV
      traps: [
        {
          title: "Brightness does not lower the threshold",
          body: "A brighter lamp sends more photons of the same energy. If one photon cannot free an electron, a thousand of them cannot either, so a powerful lamp below threshold still ejects nothing.",
        },
        {
          title: "Angular frequency is 2πν",
          body: "When a stem gives ω in rad/s, the photon energy is hω/2π. Using hω makes the energy 6.28 times too large.",
        },
        {
          title: "Longest wavelength, lowest frequency",
          body: "The threshold is the LONGEST wavelength that ejects electrons and the LOWEST frequency that does. Shorter wavelengths and higher frequencies work; longer and lower do not.",
        },
      ],
    },
  ],
};
