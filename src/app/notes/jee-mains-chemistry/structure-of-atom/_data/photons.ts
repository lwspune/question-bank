import type { SubtopicNote } from "@/app/notes/_types";

export const PHOTONS_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Photons, Planck's Quantum and the Photoelectric Effect",
  title: "Photons, Planck's Quantum and the Photoelectric Effect",
  oneLineDefinition:
    "Light comes in packets of energy hν. This page turns wavelength, frequency and wavenumber into photon energy, per photon or per mole, and uses it to eject electrons from a metal.",
  whyItMatters:
    "Nineteen PYQs, twelve of them numerical-answer, and five from 2026. Eleven convert between wavelength, frequency, wavenumber and photon energy, count photons, or test black-body facts; eight use the photoelectric equation with a work function or threshold frequency. Two ideas cover the page.",
  concepts: [
    // C1 — photon energy from lambda, nu or wavenumber
    {
      kind: "formula" as const,
      slug: "jcatom-photon-energy",
      name: "Photon energy from wavelength, frequency or wavenumber",
      intuition:
        "A photon's energy is fixed by its frequency: \\(E=h\\nu\\). Wavelength and wavenumber are two other ways of stating the same frequency, through \\(c=\\nu\\lambda\\) and \\(\\bar\\nu=1/\\lambda\\). So shorter wavelength means more energy. To compare photons given in different forms, turn them all into frequency first.",
      definition:
        "- \\(c=\\nu\\lambda\\), \\(\\bar\\nu=\\dfrac{1}{\\lambda}\\).\n" +
        "- \\(E=h\\nu=\\dfrac{hc}{\\lambda}=hc\\bar\\nu\\), with \\(h=6.626\\times10^{-34}\\ \\mathrm{J\\,s}\\).\n" +
        "- With \\(\\bar\\nu\\) in \\(\\mathrm{cm^{-1}}\\), use \\(c=3\\times10^{10}\\ \\mathrm{cm\\,s^{-1}}\\).\n" +
        "- Per mole of photons: multiply by \\(N_A=6.022\\times10^{23}\\ \\mathrm{mol^{-1}}\\).\n" +
        "- Number of photons from a source of power \\(P\\) in time \\(t\\): \\(n=\\dfrac{Pt}{hc/\\lambda}\\).\n" +
        "- A **black body** absorbs and emits all frequencies. Its spectrum depends only on temperature. As \\(T\\) rises, the peak moves to shorter wavelength (\\(\\lambda_{max}T\\) is constant). Planck explained it by quantising energy in units of \\(h\\nu\\).",
      formula: {
        label: "Photon energy",
        latex: "E=h\\nu=\\frac{hc}{\\lambda}=hc\\bar\\nu",
      },
      authoredExample: {
        prompt:
          "Photon P has wavelength 250 nm, photon Q has frequency \\(2\\times10^{15}\\ \\mathrm{s^{-1}}\\), and photon R has wavenumber \\(3\\times10^{4}\\ \\mathrm{cm^{-1}}\\). Arrange them by energy.",
        steps: [
          "Energy goes with frequency, so find each frequency.",
          "P: \\(\\nu=\\dfrac{c}{\\lambda}=\\dfrac{3\\times10^{8}}{250\\times10^{-9}}=1.2\\times10^{15}\\ \\mathrm{s^{-1}}\\).",
          "Q: \\(\\nu=2\\times10^{15}\\ \\mathrm{s^{-1}}\\).",
          "R: \\(\\nu=c\\bar\\nu=(3\\times10^{10}\\ \\mathrm{cm\\,s^{-1}})(3\\times10^{4}\\ \\mathrm{cm^{-1}})=9\\times10^{14}\\ \\mathrm{s^{-1}}\\).",
        ],
        answer: "\\(Q>P>R\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the energy of one mole of photons of wavelength 600 nm, in \\(\\mathrm{kJ\\,mol^{-1}}\\).",
        steps: [
          "One photon: \\(E=\\dfrac{hc}{\\lambda}=\\dfrac{6.626\\times10^{-34}\\times3\\times10^{8}}{600\\times10^{-9}}=3.313\\times10^{-19}\\ \\mathrm{J}\\).",
          "One mole: \\(3.313\\times10^{-19}\\times6.022\\times10^{23}=1.995\\times10^{5}\\ \\mathrm{J\\,mol^{-1}}\\).",
        ],
        answer: "About \\(199.5\\ \\mathrm{kJ\\,mol^{-1}}\\).",
      },
      practiceSet: [
        {
          prompt: "Wavenumber of 500 nm light, in \\(\\mathrm{cm^{-1}}\\)?",
          answer: "\\(2\\times10^{4}\\ \\mathrm{cm^{-1}}\\)",
          method: "\\(500\\ \\mathrm{nm}=5\\times10^{-5}\\ \\mathrm{cm}\\)",
        },
        {
          prompt: "Energy ratio \\(E_1:E_2\\) for wavelengths 300 nm and 900 nm?",
          answer: "\\(3:1\\)",
          method: "\\(E\\propto1/\\lambda\\)",
        },
        {
          prompt: "Frequency of light of wavelength \\(3\\times10^{-7}\\ \\mathrm{m}\\)?",
          answer: "\\(1\\times10^{15}\\ \\mathrm{s^{-1}}\\)",
        },
        {
          prompt:
            "Photons emitted per second by a 2 mW lamp at 500 nm (\\(hc=1.99\\times10^{-25}\\ \\mathrm{J\\,m}\\))?",
          answer: "About \\(5.0\\times10^{15}\\)",
          method: "\\(n=\\dfrac{2\\times10^{-3}}{3.98\\times10^{-19}}\\)",
        },
      ],
      pyqExampleId: "0c20aa46-642a-43b2-8043-c16b061f1d60", // 2026 — order photons given by lambda, nu and wavenumber
      traps: [
        {
          title: "Wavenumber in cm⁻¹ needs c in cm s⁻¹",
          body: "\\(E=hc\\bar\\nu\\) only works if the units match. With \\(\\bar\\nu\\) in \\(\\mathrm{cm^{-1}}\\), take \\(c=3\\times10^{10}\\ \\mathrm{cm\\,s^{-1}}\\). Using \\(3\\times10^{8}\\) makes the energy 100 times too small.",
        },
        {
          title: "Energy ratio is the inverse wavelength ratio",
          body: "\\(\\dfrac{E_1}{E_2}=\\dfrac{\\lambda_2}{\\lambda_1}\\). A 900 nm photon has one third the energy of a 300 nm photon, not three times.",
        },
      ],
    },

    // C2 — photoelectric effect
    {
      kind: "formula" as const,
      slug: "jcatom-photoelectric",
      name: "Photoelectric effect and work function",
      intuition:
        "One photon hits one electron. Part of its energy, the work function \\(W_0\\), pulls the electron out of the metal. The rest becomes the electron's kinetic energy. If the photon has less energy than \\(W_0\\), nothing comes out, however bright the light. Brighter light means more photons, so more electrons, but each electron gets the same energy.",
      definition:
        "- \\(h\\nu=W_0+\\tfrac12mv^2\\), with \\(W_0=h\\nu_0\\).\n" +
        "- **Threshold wavelength**: \\(\\lambda_0=\\dfrac{hc}{W_0}\\), the longest wavelength that ejects electrons.\n" +
        "- Below \\(\\nu_0\\): no emission at any intensity. Above \\(\\nu_0\\): emission is instant.\n" +
        "- Current \\(\\propto\\) intensity. Kinetic energy \\(\\propto(\\nu-\\nu_0)\\), and does not depend on intensity.\n" +
        "- \\(1\\ \\mathrm{eV}=1.602\\times10^{-19}\\ \\mathrm{J}\\). Shortcut: \\(E\\,(\\mathrm{eV})=\\dfrac{1240}{\\lambda\\,(\\mathrm{nm})}\\).",
      formula: {
        label: "Einstein's photoelectric equation",
        latex: "h\\nu=h\\nu_0+\\tfrac{1}{2}mv^2",
      },
      authoredExample: {
        prompt:
          "A metal has work function 2.0 eV. Light of wavelength 310 nm falls on it. Find the maximum kinetic energy of the electrons and the threshold wavelength.",
        steps: [
          "Photon energy: \\(E=\\dfrac{1240}{310}=4.0\\ \\mathrm{eV}\\).",
          "Kinetic energy: \\(4.0-2.0=2.0\\ \\mathrm{eV}\\).",
          "Threshold: \\(\\lambda_0=\\dfrac{1240}{2.0}=620\\ \\mathrm{nm}\\).",
        ],
        answer: "\\(2.0\\ \\mathrm{eV}\\), and \\(\\lambda_0=620\\ \\mathrm{nm}\\).",
      },
      selfCheckExample: {
        prompt:
          "A metal has threshold frequency \\(5.0\\times10^{14}\\ \\mathrm{s^{-1}}\\). Light of frequency \\(8.0\\times10^{14}\\ \\mathrm{s^{-1}}\\) falls on it. Find the maximum kinetic energy of the ejected electrons.",
        steps: [
          "\\(KE=h(\\nu-\\nu_0)=6.626\\times10^{-34}\\times3.0\\times10^{14}\\).",
          "\\(KE=1.99\\times10^{-19}\\ \\mathrm{J}\\), which is \\(\\dfrac{1.99\\times10^{-19}}{1.602\\times10^{-19}}=1.24\\ \\mathrm{eV}\\).",
        ],
        answer: "\\(1.99\\times10^{-19}\\ \\mathrm{J}\\) (about 1.24 eV).",
      },
      practiceSet: [
        {
          prompt: "Work function 3.1 eV. Longest wavelength that ejects electrons?",
          answer: "\\(400\\ \\mathrm{nm}\\)",
          method: "\\(1240/3.1\\)",
        },
        {
          prompt: "Intensity doubled, frequency unchanged: what happens to the kinetic energy?",
          answer: "No change. The current doubles.",
        },
        {
          prompt: "Very bright light below the threshold frequency: are electrons ejected?",
          answer: "No",
        },
        {
          prompt:
            "Threshold frequency \\(1.0\\times10^{15}\\ \\mathrm{s^{-1}}\\), \\(h=6.6\\times10^{-34}\\ \\mathrm{J\\,s}\\). Minimum photon energy?",
          answer: "\\(6.6\\times10^{-19}\\ \\mathrm{J}\\)",
        },
      ],
      pyqExampleId: "6eb4ac6a-e697-4ef3-8de2-1aeac4765186", // 2026 — work functions in 1:2 from the KE ratio at 6 eV
      traps: [
        {
          title: "Intensity changes the current, not the energy",
          body: "Brighter light gives more electrons per second. It does not give faster electrons. Only a higher frequency raises the kinetic energy.",
        },
        {
          title: "Put eV and J on the same footing",
          body: "Work functions are usually in eV and \\(h\\nu\\) comes out in J. Convert with \\(1\\ \\mathrm{eV}=1.602\\times10^{-19}\\ \\mathrm{J}\\) before you subtract.",
        },
      ],
    },
  ],
};
