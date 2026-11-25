import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EW_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Waves and their Properties",
  title: "Electromagnetic Waves and their Properties",
  oneLineDefinition:
    "How an accelerated charge radiates electromagnetic waves and who first made them, how the electric and magnetic fields of a plane wave are arranged, reading a wave's equation for its amplitude, wavelength, frequency and speed, and the energy the two fields carry.",
  whyItMatters:
    "40 questions. Thirty were set in board papers from 2022 to 2026: the directions and phase of the electric and magnetic fields, asked every year; how electromagnetic waves are produced (2023, 2024, 2025) and who first made them (Hertz in 2023, Bose in 2024); the ratio of the field amplitudes (2023, 2025, 2026); reading a wave's equation for its wavelength, frequency or speed (2024, 2026); the speed in a medium (2024, 2025, 2026); and the energy the fields carry (2023, 2025). The textbook adds finding B from E, writing the expressions for both fields, and showing that the two fields carry equal energy.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpew-sources",
      name: "How electromagnetic waves are produced, and who first made them",
      intuition:
        "A charge at rest has only a steady electric field. A charge moving at constant velocity is a steady current, with a steady magnetic field. Neither field changes, so nothing travels away. Shake the charge, though, and its electric field changes, which makes a changing magnetic field, which makes a changing electric field, and so on. The two keep regenerating each other and move off as a wave.",
      definition:
        "- **Neither stationary charges nor charges in uniform motion** radiate. A stationary charge gives only an electrostatic field; a steady current gives a magnetic field that does not change with time.\n" +
        "- **Accelerated charges radiate electromagnetic waves.** An oscillating charge is an accelerating charge.\n" +
        "- An oscillating charge produces an oscillating electric field, which produces an oscillating magnetic field, which in turn produces an oscillating electric field. The two regenerate each other as the wave travels through space.\n" +
        "- The frequency of the wave equals the frequency of oscillation of the charge. The energy of the wave comes from the source, the accelerated charge.\n" +
        "- Visible light could not be the first test: yellow light is about \\(6 \\times 10^{14}\\) Hz, while circuits reach hardly about \\(10^{11}\\) Hz. So the first waves made were radio waves.",
      table: {
        columns: ["Scientist", "What he did", "Detail to remember"],
        rows: [
          { cells: ["J. C. Maxwell", "Predicted electromagnetic waves from his equations", "Their speed came out equal to the speed of light, so light is an electromagnetic wave"] },
          {
            cells: ["H. R. Hertz", "First produced and detected electromagnetic waves in the laboratory (1887)", "Wavelength of the order of a few metres"],
            pyqExampleId: "881f2eed-5ffe-4980-a164-48cb4d16997c",
            noteAmber: "Board 2023 asked who first produced and detected waves a few metres long.",
          },
          {
            cells: ["J. C. Bose", "Produced and observed much shorter waves, seven years after Hertz, working in Calcutta", "Wavelength 25 mm to 5 mm, in the laboratory"],
            pyqExampleId: "bdf97a55-2d17-43ab-95a8-ad26675b58f8",
            noteAmber: "Board 2024 asked who first produced waves of 25 mm to 5 mm.",
          },
          { cells: ["G. Marconi", "Transmitted electromagnetic waves over many kilometres", "The beginning of communication by electromagnetic waves"] },
        ],
      },
      selfCheckExample: {
        prompt: "A charge moves round a circle at constant speed. Does it radiate electromagnetic waves? Give a reason.",
        steps: [
          "Its speed is constant but its direction keeps changing, so its velocity changes.",
          "A changing velocity is an acceleration, and an accelerated charge radiates.",
        ],
        answer: "Yes. It is accelerated (towards the centre), so it radiates",
      },
      practiceSet: [
        { prompt: "A charge oscillates about its mean position \\(2 \\times 10^{8}\\) times a second. What is the frequency of the waves it radiates?", answer: "\\(2 \\times 10^{8}\\) Hz" },
        { prompt: "Why was the first laboratory test of Maxwell's theory not made with visible light?", answer: "Circuits cannot oscillate at about \\(6 \\times 10^{14}\\) Hz; they reach only about \\(10^{11}\\) Hz, so radio waves were made" },
        { prompt: "Who first transmitted electromagnetic waves over many kilometres?", answer: "Marconi" },
      ],
      pyqExampleId: "881f2eed-5ffe-4980-a164-48cb4d16997c",
      traps: [
        {
          title: "Motion alone does not radiate",
          body: "A charge moving with constant velocity gives only steady fields and no wave. Write 'an accelerated (or oscillating) charge', not 'a moving charge'.",
        },
        {
          title: "Mixing up Maxwell, Hertz and Bose",
          body: "Maxwell only predicted the waves. Hertz first produced and detected them, a few metres long. Bose produced much shorter ones, 25 mm to 5 mm. The wavelength in the question tells you which name is wanted.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpew-transverse",
      name: "The fields in a plane electromagnetic wave",
      intuition:
        "Picture the wave moving along one axis. The electric field swings up and down along a second axis, and the magnetic field swings along the third, so the two fields and the direction of travel are all at right angles. The two fields rise and fall together: when one is at its peak so is the other, and both are zero at the same places. The right-hand rule for \\(\\vec{E} \\times \\vec{B}\\) gives the direction of travel.",
      definition:
        "- For a wave travelling along z (the NCERT picture): \\(E_x = E_0 \\sin(kz - \\omega t)\\) and \\(B_y = B_0 \\sin(kz - \\omega t)\\). E is along x, B along y.\n" +
        "- \\(\\vec{E}\\), \\(\\vec{B}\\) and the direction of travel are mutually perpendicular, so the wave is **transverse**.\n" +
        "- Both fields have the same argument \\((kz - \\omega t)\\), so they are **in phase**: the phase difference is zero. At right angles in space, in step in time.\n" +
        "- The wave travels along \\(\\vec{E} \\times \\vec{B}\\). Use \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), \\(\\hat{j} \\times \\hat{k} = \\hat{i}\\), \\(\\hat{k} \\times \\hat{i} = \\hat{j}\\).\n" +
        "- **To depict the wave:** draw the direction of travel as one axis, the E sine curve in one plane and the B sine curve in the plane at right angles, with their peaks at the same points. Label E, B, the direction of travel and one wavelength.\n" +
        "- **Characteristics to write:** they are transverse; they need no material medium; in vacuum they all travel at \\(c = 1/\\sqrt{\\mu_0\\varepsilon_0} = 3 \\times 10^{8}\\) m/s, whatever the wavelength; \\(E_0/B_0 = c\\); they carry energy.",
      formula: {
        label: "Plane wave along z",
        latex: "E_x = E_0 \\sin(kz - \\omega t), \\qquad B_y = B_0 \\sin(kz - \\omega t), \\qquad \\text{travel along } \\vec{E}\\times\\vec{B}",
      },
      authoredExample: {
        prompt:
          "A plane electromagnetic wave travels in the \\(-y\\) direction. At an instant its electric field at a point is along \\(+z\\). Find the direction of its magnetic field there, and say how the two fields are related in time.",
        steps: [
          "Rule: \\(\\vec{E} \\times \\vec{B}\\) points along the direction of travel, here \\(-\\hat{j}\\). So \\(\\hat{k} \\times \\hat{B} = -\\hat{j}\\).",
          "Try \\(\\hat{B} = -\\hat{i}\\): \\(\\hat{k} \\times (-\\hat{i}) = -(\\hat{k} \\times \\hat{i}) = -\\hat{j}\\). This works.",
          "B is perpendicular to both E and the direction of travel, as it must be.",
          "The fields are in phase, so B is at its peak whenever E is.",
        ],
        answer: "B is along \\(-x\\), in phase with E",
      },
      selfCheckExample: {
        prompt:
          "A plane wave travels along \\(+z\\). At an instant its magnetic field points along \\(+x\\). Along which direction does its electric field point?",
        steps: [
          "Need \\(\\hat{E} \\times \\hat{i} = \\hat{k}\\).",
          "\\(\\hat{j} \\times \\hat{i} = -\\hat{k}\\), so \\((-\\hat{j}) \\times \\hat{i} = \\hat{k}\\).",
        ],
        answer: "Along \\(-y\\)",
      },
      practiceSet: [
        { prompt: "Is an electromagnetic wave transverse or longitudinal? Give the reason.", answer: "Transverse, because E and B are both perpendicular to the direction of travel" },
        { prompt: "Do electromagnetic waves need a material medium to travel?", answer: "No. They travel through vacuum" },
        { prompt: "A wave's electric field is along \\(+x\\) and its magnetic field along \\(+y\\). In which direction does it travel?", answer: "Along \\(+z\\), since \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\)" },
      ],
      pyqExampleId: "94a67746-c7cf-40e5-962f-d06ed2907aed",
      traps: [
        {
          title: "Taking B × E for the direction",
          body: "The order is \\(\\vec{E} \\times \\vec{B}\\). \\(\\vec{B} \\times \\vec{E}\\) points the opposite way and is always one of the wrong options.",
        },
        {
          title: "At right angles is not out of phase",
          body: "E and B are perpendicular in space, but their phase difference in time is zero. Answering \\(\\pi/2\\) mixes the two ideas.",
        },
        {
          title: "Assertion-reason: true but not the explanation",
          body: "The codes: both true and R explains A; both true but R does not explain A; A true but R false; A false and R true (in some papers, both false). 'EM waves need no medium' and 'EM waves are transverse' are both true, but being transverse is not why no medium is needed: waves on a string are transverse and need the string.",
        },
        {
          title: "A sketch without labels",
          body: "A 'depict' question gives marks for the drawing: label the axes, E, B and the direction of travel, and draw the two peaks at the same points.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpew-wave-equation",
      name: "Reading a wave's equation: amplitudes, wavelength, frequency and speed",
      intuition:
        "Everything about a wave can be read off its equation. The number in front is the amplitude. The number multiplying x is the wave number k, and the number multiplying t is the angular frequency ω. Their ratio ω/k is the speed. In vacuum that speed must be c, and the two amplitudes are tied by the same c. In a medium the wave slows down, its wavelength shrinks, but its frequency stays what the source gave it.",
      definition:
        "- In \\(E = E_0 \\sin(kx - \\omega t)\\): amplitude \\(E_0\\); wave number \\(k = \\dfrac{2\\pi}{\\lambda}\\); angular frequency \\(\\omega = 2\\pi\\nu\\).\n" +
        "- Speed \\(v = \\dfrac{\\omega}{k} = \\nu\\lambda\\). In vacuum \\(\\omega = ck\\), with \\(c = \\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}}\\).\n" +
        "- \\(c = 3 \\times 10^{8}\\) m/s: with \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m A⁻¹ and \\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) N m² C⁻², \\(\\mu_0\\varepsilon_0 = \\dfrac{10^{-7}}{9 \\times 10^{9}} = \\dfrac{1}{9 \\times 10^{16}}\\), so \\(\\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3 \\times 10^{8}\\) m/s, the speed of light.\n" +
        "- **Amplitudes:** \\(B_0 = \\dfrac{E_0}{c}\\). The ratio \\(E/B = c\\) holds at every instant, since the fields are in phase.\n" +
        "- \\((kx - \\omega t)\\) travels along \\(+x\\); \\((kx + \\omega t)\\) travels along \\(-x\\). An expression with no t, such as \\(B_0 \\sin kz\\), is not a wave.\n" +
        "- **In a medium** of permittivity \\(\\varepsilon\\) and permeability \\(\\mu\\): \\(v = \\dfrac{1}{\\sqrt{\\mu\\varepsilon}}\\), so the speed depends on these two properties of the medium. The refractive index is \\(n = \\dfrac{c}{v} = \\sqrt{\\varepsilon_r\\mu_r}\\).\n" +
        "- Entering a medium, the frequency stays the same (it is set by the source), the speed becomes \\(c/n\\) and the wavelength becomes \\(\\lambda/n\\). There \\(E_0/B_0 = v\\), not c.\n" +
        "- Since \\(\\dfrac{1}{\\mu\\varepsilon} = v^2\\), the dimensions of \\((\\mu\\varepsilon)^{-1}\\) are \\([\\text{M}^0\\text{L}^2\\text{T}^{-2}]\\).",
      formula: {
        label: "Reading a plane wave",
        latex:
          "k = \\frac{2\\pi}{\\lambda},\\quad \\omega = 2\\pi\\nu,\\quad v = \\frac{\\omega}{k},\\quad B_0 = \\frac{E_0}{c},\\quad c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}},\\quad v = \\frac{1}{\\sqrt{\\mu\\varepsilon}}",
      },
      authoredExample: {
        prompt:
          "The magnetic field of a plane electromagnetic wave in vacuum is \\(B_z = (3 \\times 10^{-8}\\ \\text{T}) \\sin(2.0x - 6.0 \\times 10^{8} t)\\), with x in metres and t in seconds. Find (a) the wavelength and frequency, (b) the amplitude of the electric field, and (c) write an expression for the electric field.",
        steps: [
          "Given: \\(B_0 = 3 \\times 10^{-8}\\) T, \\(k = 2.0\\ \\text{rad m}^{-1}\\), \\(\\omega = 6.0 \\times 10^{8}\\ \\text{rad s}^{-1}\\).",
          "(a) \\(\\lambda = \\dfrac{2\\pi}{k} = \\dfrac{2\\pi}{2.0} = 3.14\\) m; \\(\\nu = \\dfrac{\\omega}{2\\pi} = \\dfrac{6.0 \\times 10^{8}}{2\\pi} = 9.55 \\times 10^{7}\\) Hz.",
          "Check: \\(v = \\omega/k = 3 \\times 10^{8}\\) m/s, as it must be in vacuum.",
          "(b) \\(E_0 = cB_0 = (3 \\times 10^{8})(3 \\times 10^{-8}) = 9\\) V/m.",
          "(c) The wave travels along \\(+x\\) and B is along z, so E must satisfy \\(\\hat{E} \\times \\hat{k} = \\hat{i}\\): \\(\\hat{j} \\times \\hat{k} = \\hat{i}\\), so E is along y.",
          "\\(E_y = (9\\ \\text{V/m}) \\sin(2.0x - 6.0 \\times 10^{8} t)\\).",
        ],
        answer: "λ = 3.14 m, ν = 9.55 × 10⁷ Hz; E₀ = 9 V/m; \\(E_y = 9 \\sin(2.0x - 6.0 \\times 10^{8} t)\\) V/m",
      },
      selfCheckExample: {
        prompt:
          "Light of frequency \\(6 \\times 10^{14}\\) Hz passes from vacuum into a medium with \\(\\varepsilon_r = 4\\) and \\(\\mu_r = 1\\). Find its speed, frequency and wavelength in the medium.",
        steps: [
          "\\(n = \\sqrt{\\varepsilon_r\\mu_r} = \\sqrt{4} = 2\\), so \\(v = \\dfrac{3 \\times 10^{8}}{2} = 1.5 \\times 10^{8}\\) m/s.",
          "The frequency stays \\(6 \\times 10^{14}\\) Hz.",
          "\\(\\lambda = \\dfrac{v}{\\nu} = \\dfrac{1.5 \\times 10^{8}}{6 \\times 10^{14}} = 2.5 \\times 10^{-7}\\) m, half its vacuum value of 500 nm.",
        ],
        answer: "\\(1.5 \\times 10^{8}\\) m/s; \\(6 \\times 10^{14}\\) Hz; 250 nm",
      },
      practiceSet: [
        { prompt: "The magnetic field amplitude of a wave in vacuum is \\(2 \\times 10^{-8}\\) T. Find its electric field amplitude.", answer: "6 V/m" },
        { prompt: "A wave is written \\(E = E_0 \\sin(4x - 1.2 \\times 10^{9} t)\\). Find its speed.", answer: "\\(v = \\omega/k = 3 \\times 10^{8}\\) m/s" },
        { prompt: "On which two properties of a medium does the speed of an electromagnetic wave in it depend?", answer: "Its permittivity \\(\\varepsilon\\) and its permeability \\(\\mu\\)" },
        { prompt: "Write the dimensions of \\(1/(\\mu_0\\varepsilon_0)\\).", answer: "\\([\\text{M}^0\\text{L}^2\\text{T}^{-2}]\\), those of a speed squared" },
      ],
      pyqExampleId: "3b5b4a5e-fefb-479e-9d03-99b75de94c4b",
      traps: [
        {
          title: "Dividing the wrong way",
          body: "\\(E_0 = cB_0\\), so the electric amplitude is the larger number by a factor of \\(3 \\times 10^{8}\\). An answer with E smaller than B has the ratio upside down.",
        },
        {
          title: "Using c inside a medium",
          body: "In glass or any medium, \\(v = c/n\\) and \\(E_0/B_0 = v\\). Writing c there is the slip a 'wave in glass' question is set to catch.",
        },
        {
          title: "Letting the frequency change at a boundary",
          body: "Frequency is fixed by the source and does not change when the wave enters a new medium. Only the speed and the wavelength change, both by the factor n.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpew-energy-density",
      name: "Energy carried by the electric and magnetic fields",
      intuition:
        "An electromagnetic wave carries energy: that is how sunlight reaches the earth and how a radio signal reaches a set. The energy sits in its two fields. B looks tiny next to E because \\(B_0 = E_0/c\\), but the magnetic energy density has \\(\\mu_0\\) underneath, and the two effects cancel exactly. Each field carries half the energy.",
      definition:
        "- Energy density of the electric field: \\(u_E = \\dfrac{1}{2}\\varepsilon_0 E^2\\). Of the magnetic field: \\(u_B = \\dfrac{B^2}{2\\mu_0}\\).\n" +
        "- With \\(B = E/c\\) and \\(c^2 = \\dfrac{1}{\\mu_0\\varepsilon_0}\\): \\(u_B = \\dfrac{E^2}{2\\mu_0 c^2} = \\dfrac{\\mu_0\\varepsilon_0 E^2}{2\\mu_0} = \\dfrac{1}{2}\\varepsilon_0 E^2 = u_E\\). So \\(u_E : u_B = 1 : 1\\).\n" +
        "- Total energy density \\(u = u_E + u_B = \\varepsilon_0 E^2\\).\n" +
        "- Averaged over a cycle, \\(\\sin^2\\) averages to \\(\\tfrac{1}{2}\\): \\(\\langle u_E \\rangle = \\dfrac{1}{4}\\varepsilon_0 E_0^2 = \\langle u_B \\rangle = \\dfrac{B_0^2}{4\\mu_0}\\).\n" +
        "- Energy goes as the square of the field, so the intensity of a wave goes as the square of its amplitude: n times the amplitude gives \\(n^2\\) times the intensity.\n" +
        "- **Radiation pressure is not in the present NCERT book.** Board 2025 asked which of a black, a yellow and a white surface feels the most pressure from white light. In short: light carries momentum; a white surface reflects it, so the change of momentum, and the pressure, is greatest; a black surface absorbs it, so the pressure is least. Give this little time.",
      formula: {
        label: "Energy densities in an electromagnetic wave",
        latex: "u_E = \\frac{1}{2}\\varepsilon_0 E^2 = u_B = \\frac{B^2}{2\\mu_0}, \\qquad u = \\varepsilon_0 E^2",
      },
      authoredExample: {
        prompt:
          "An electromagnetic wave in vacuum has an electric field amplitude of 30 V/m. Find the amplitude of its magnetic field, and show that the average energy densities of the two fields are equal. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\text{N}^{-1}\\text{m}^{-2}\\), \\(\\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T m A}^{-1}\\))",
        steps: [
          "Given: \\(E_0 = 30\\) V/m. \\(B_0 = \\dfrac{E_0}{c} = \\dfrac{30}{3 \\times 10^{8}} = 1 \\times 10^{-7}\\) T.",
          "\\(\\langle u_E \\rangle = \\dfrac{1}{4}\\varepsilon_0 E_0^2 = \\dfrac{1}{4}(8.85 \\times 10^{-12})(900) = 1.99 \\times 10^{-9}\\ \\text{J m}^{-3}\\).",
          "\\(\\langle u_B \\rangle = \\dfrac{B_0^2}{4\\mu_0} = \\dfrac{10^{-14}}{4 \\times 4\\pi \\times 10^{-7}} = \\dfrac{10^{-14}}{5.03 \\times 10^{-6}} = 1.99 \\times 10^{-9}\\ \\text{J m}^{-3}\\).",
          "The two are equal.",
        ],
        answer: "\\(B_0 = 1 \\times 10^{-7}\\) T; each average energy density is \\(1.99 \\times 10^{-9}\\ \\text{J m}^{-3}\\)",
      },
      selfCheckExample: {
        prompt:
          "At a point in an electromagnetic wave in vacuum, the electric field at an instant is 600 V/m. Find the magnetic field there and the total energy density at that instant. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\text{N}^{-1}\\text{m}^{-2}\\))",
        steps: [
          "\\(B = \\dfrac{E}{c} = \\dfrac{600}{3 \\times 10^{8}} = 2 \\times 10^{-6}\\) T.",
          "\\(u = \\varepsilon_0 E^2 = (8.85 \\times 10^{-12})(3.6 \\times 10^{5}) = 3.19 \\times 10^{-6}\\ \\text{J m}^{-3}\\).",
        ],
        answer: "\\(2 \\times 10^{-6}\\) T; \\(3.19 \\times 10^{-6}\\ \\text{J m}^{-3}\\)",
      },
      practiceSet: [
        { prompt: "What fraction of the energy of an electromagnetic wave is carried by its magnetic field?", answer: "Half" },
        { prompt: "The electric field amplitude of a wave is tripled. By what factor does its average energy density change?", answer: "Nine times" },
      ],
      pyqExampleId: "6770640b-f504-49aa-b904-f141adcc169f",
      traps: [
        {
          title: "Thinking the magnetic field carries less energy",
          body: "\\(B_0\\) is smaller than \\(E_0\\) by the factor c, but its energy density has \\(\\mu_0\\) underneath. The two energy densities are equal.",
        },
        {
          title: "Mixing the average and the instant",
          body: "At an instant \\(u_E = \\tfrac{1}{2}\\varepsilon_0 E^2\\). Averaged over a cycle it is \\(\\tfrac{1}{4}\\varepsilon_0 E_0^2\\), because \\(\\sin^2\\) averages to one half.",
        },
      ],
    },
  ],
};
