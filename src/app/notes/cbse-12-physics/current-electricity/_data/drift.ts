import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_CE_DRIFT_NOTE: SubtopicNote = {
  subtopicName: "Drift of Electrons and Resistivity",
  title: "Drift of Electrons, Mobility and Resistivity",
  oneLineDefinition:
    "How free electrons drift through a metal under an electric field, the relations I = neAvd and μ = eτ/m, and the resistivity ρ = m/(ne²τ) that follows from them.",
  whyItMatters:
    "55 questions, fifty-two of them from board papers from 2023 to 2026, the most of any page in this chapter. The board asks you to derive the relation between current and drift velocity (2023, 2026) and the resistivity in terms of n and τ (2023, 2024, 2025, 2026), define drift velocity, relaxation time and mobility, explain why a bulb glows the moment it is switched on (2024, 2025, 2026), compare drift speeds in wires joined in series and in parallel (2023, 2025, 2026), and find a resistivity, a conductivity or a field from measured values. The textbook adds the drift speed in copper and the time an electron takes to drift along a wire.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpce-drift",
      name: "Drift velocity, relaxation time and I = neAvd",
      intuition:
        "Free electrons in a metal already rush about at high speed, but in random directions, so on average they go nowhere. Switch on a field and each electron is pushed a little opposite to the field between collisions. Every collision scrambles its direction again, so the push never builds up: the electrons settle into a slow, steady average drift of about a millimetre per second. The bulb still lights at once, because the field is set up through the whole circuit almost instantly and every electron starts drifting together.",
      definition:
        "- With no field, the random velocities average to zero, so there is no current.\n" +
        "- A field \\(\\vec{E}\\) gives each electron an acceleration \\(\\vec{a} = -\\dfrac{e\\vec{E}}{m}\\).\n" +
        "- After its last collision, electron i has velocity \\(\\vec{V}_i = \\vec{v}_i - \\dfrac{e\\vec{E}}{m}t_i\\).\n" +
        "- Average over all electrons: the \\(\\vec{v}_i\\) average to zero and the \\(t_i\\) average to \\(\\tau\\), the **relaxation time** (average time between successive collisions).\n" +
        "- So the **drift velocity** is \\(\\vec{v}_d = -\\dfrac{e\\vec{E}}{m}\\tau\\): constant in time, and opposite to \\(\\vec{E}\\) for electrons.\n" +
        "- **Current:** in time \\(\\Delta t\\), the electrons within a distance \\(v_d\\Delta t\\) of an area A cross it. That is \\(nAv_d\\Delta t\\) electrons, carrying charge \\(neAv_d\\Delta t\\).\n" +
        "- So \\(I\\Delta t = neAv_d\\Delta t\\), which gives \\(I = neAv_d\\), and the current density is \\(j = nev_d\\).\n" +
        "- **Mobility:** \\(\\mu = \\dfrac{|v_d|}{E} = \\dfrac{e\\tau}{m}\\). SI unit \\(\\text{m}^2\\,\\text{V}^{-1}\\,\\text{s}^{-1}\\). It depends on the material and its temperature, not on the field or the size of the wire.\n" +
        "- The drift velocity is superposed on large random velocities, so the free electrons are not all moving the same way.",
      formula: {
        label: "Drift velocity, current and mobility",
        latex: "v_d = \\frac{eE\\tau}{m}, \\qquad I = neAv_d, \\qquad \\mu = \\frac{v_d}{E} = \\frac{e\\tau}{m}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of free electrons per unit volume" },
          { symbol: "\\(\\tau\\)", meaning: "relaxation time, the average time between collisions" },
          { symbol: "\\(m\\)", meaning: "mass of an electron" },
          { symbol: "\\(A\\)", meaning: "area of cross-section of the conductor" },
        ],
      },
      authoredExample: {
        prompt:
          "A copper wire of cross-sectional area 1.0 × 10⁻⁶ m² carries a current of 1.7 A. The number density of free electrons in copper is 8.5 × 10²⁸ m⁻³. Find the drift speed of the electrons.",
        steps: [
          "Given: \\(I = 1.7\\) A, \\(A = 1.0 \\times 10^{-6}\\ \\text{m}^2\\), \\(n = 8.5 \\times 10^{28}\\ \\text{m}^{-3}\\), \\(e = 1.6 \\times 10^{-19}\\) C.",
          "Formula: \\(v_d = \\dfrac{I}{neA}\\).",
          "Substitution: \\(v_d = \\dfrac{1.7}{(8.5 \\times 10^{28})(1.6 \\times 10^{-19})(1.0 \\times 10^{-6})} = \\dfrac{1.7}{1.36 \\times 10^{4}}\\).",
          "Answer: \\(v_d = 1.25 \\times 10^{-4}\\ \\text{m s}^{-1}\\), about a tenth of a millimetre per second.",
        ],
        answer: "1.25 × 10⁻⁴ m/s",
      },
      selfCheckExample: {
        prompt: "Electrons in a wire drift at 2.0 × 10⁻⁴ m/s when the field inside the wire is 0.50 V/m. Find their mobility.",
        steps: ["\\(\\mu = \\dfrac{v_d}{E} = \\dfrac{2.0 \\times 10^{-4}}{0.50}\\)."],
        answer: "4.0 × 10⁻⁴ m² V⁻¹ s⁻¹",
      },
      practiceSet: [
        {
          prompt: "Does the mobility of the electrons in a wire change when the potential difference across it is doubled?",
          answer: "No. \\(\\mu = e\\tau/m\\) has no field in it; doubling V doubles both \\(v_d\\) and E",
        },
        {
          prompt: "Conduction electrons in a wire drift along the +x direction. In which directions do the current density and the electric field point?",
          answer: "Both along the \\(-x\\) direction",
        },
        {
          prompt: "Which velocity of the free electrons decides the current in a wire: the thermal velocity or the drift velocity?",
          answer: "The drift velocity only. The random thermal velocities average to zero",
        },
        { prompt: "Write the SI unit of mobility.", answer: "\\(\\text{m}^2\\,\\text{V}^{-1}\\,\\text{s}^{-1}\\)" },
      ],
      pyqExampleId: "1d9d1ab9-dabf-45b5-844f-d107b8277b69",
      traps: [
        {
          title: "Saying the electrons travel fast",
          body: "The current starts at once because the electric field is set up through the circuit almost instantly (close to the speed of light) and every electron starts drifting where it is. The electrons themselves crawl at about a millimetre per second.",
        },
        {
          title: "Mixing thermal speed with drift speed",
          body: "The random thermal speed is large, but it averages to zero over all the electrons. The drift velocity is the small average velocity caused by the field, and only it carries the current.",
        },
        {
          title: "A derivation with no definitions",
          body: "The board gives marks for naming each symbol (n, e, A, \\(v_d\\), \\(\\tau\\)) and for the step where the electrons within \\(v_d\\Delta t\\) cross the area. Writing only \\(I = neAv_d\\) at the end earns the last mark alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-drift-change",
      name: "How drift speed, field and current density change",
      intuition:
        "Two questions settle almost every comparison. Is the current the same (series, or one wire of changing thickness)? Then a thinner section needs faster drift, \\(v_d = I/(neA)\\). Is the potential difference the same (parallel)? Then use the field, \\(E = V/l\\), and \\(v_d\\) follows E. The current density and the field always change together with the drift speed, because \\(j = nev_d\\) and \\(E = \\rho j\\).",
      definition:
        "- **Same current** (wires in series, or a wire of changing cross-section): \\(v_d = \\dfrac{I}{neA}\\), so \\(v_d \\propto \\dfrac{1}{A}\\) for one material. The narrower part has the larger \\(v_d\\), the larger \\(j = I/A\\) and the larger field \\(E = \\rho j\\).\n" +
        "- **Same potential difference** (wires in parallel): \\(v_d = \\dfrac{e\\tau}{m}\\cdot\\dfrac{V}{l}\\). For one material it depends only on the length, not on the area.\n" +
        "- V doubled, length fixed: E, \\(v_d\\) and \\(j\\) all double.\n" +
        "- Length doubled with the same V across it (a second identical wire added in series, or the wire stretched to twice its length): E, \\(v_d\\) and \\(j\\) all halve.\n" +
        "- Mobility does not change in any of these, because \\(\\mu = e\\tau/m\\).",
      formula: {
        label: "Two forms of drift velocity",
        latex: "v_d = \\frac{I}{neA} = \\frac{e\\tau}{m}\\cdot\\frac{V}{l}",
      },
      authoredExample: {
        prompt:
          "Two copper wires with radii in the ratio 1 : 2 are joined in series across a battery. Find the ratio of (i) the drift speeds and (ii) the electric fields in the two wires.",
        steps: [
          "Given: same metal, so n and \\(\\tau\\) are the same; in series, so the current I is the same.",
          "Formula: \\(v_d = \\dfrac{I}{neA} = \\dfrac{I}{ne\\pi r^2}\\), so \\(v_d \\propto \\dfrac{1}{r^2}\\).",
          "(i) \\(\\dfrac{v_{d1}}{v_{d2}} = \\left(\\dfrac{r_2}{r_1}\\right)^2 = \\left(\\dfrac{2}{1}\\right)^2 = 4\\).",
          "(ii) \\(E = \\dfrac{m v_d}{e\\tau}\\), so E is proportional to \\(v_d\\): \\(\\dfrac{E_1}{E_2} = 4\\).",
        ],
        answer: "Drift speeds 4 : 1, fields 4 : 1, both larger in the thinner wire",
      },
      selfCheckExample: {
        prompt: "Two wires of the same metal, 1 m and 3 m long, are joined in parallel across a cell. Find the ratio of the drift speeds in the shorter and the longer wire.",
        steps: ["Same V in parallel, so \\(v_d \\propto \\dfrac{1}{l}\\): \\(\\dfrac{v_1}{v_2} = \\dfrac{3}{1}\\)."],
        answer: "3 : 1",
      },
      practiceSet: [
        {
          prompt: "A steady current flows in a wire that is thick at one end and thin at the other. At which end is the drift speed larger?",
          answer: "At the thin end, since \\(v_d \\propto 1/A\\) when I is the same",
        },
        {
          prompt: "The potential difference across a wire is halved. What happens to the drift speed and the current density?",
          answer: "Both are halved",
        },
        {
          prompt: "Two wires of the same metal and the same length, with areas A and 2A, are joined in parallel across a cell. Compare the drift speeds in them.",
          answer: "Equal. The same V acts across the same length, so the fields are equal",
        },
      ],
      pyqExampleId: "f34e39ce-654e-4f69-a5c7-23dcfaebe9a3",
      traps: [
        {
          title: "Using the area in a parallel question",
          body: "In parallel the potential difference is common, not the current. For wires of equal length the drift speeds are equal whatever their areas. The area matters only when the current is common.",
        },
        {
          title: "Thinking the field is the same all along a wire",
          body: "In a wire whose cross-section changes, the current is the same everywhere but the field is not: E is larger where the wire is narrower, together with \\(v_d\\) and \\(j\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-resistivity",
      name: "Resistivity from relaxation time: ρ = m/(ne²τ)",
      intuition:
        "Put the drift velocity into I = neAvd and you get Ohm's law straight out of the electron picture. The resistivity then depends on just two things in the metal: how many free electrons there are, and how long each one travels between collisions. More electrons, or longer free runs, means less resistance.",
      definition:
        "- **Resistivity** \\(\\rho\\): the resistance of a conductor of unit length and unit area of cross-section, \\(\\rho = \\dfrac{RA}{l}\\). Unit: Ω m.\n" +
        "- **Conductivity** \\(\\sigma = \\dfrac{1}{\\rho}\\). Unit: \\(\\Omega^{-1}\\,\\text{m}^{-1}\\) (S/m).\n" +
        "- **Current density** \\(j = I/A\\) is a **vector**, directed along \\(\\vec{E}\\).\n" +
        "- **Derivation:** \\(v_d = \\dfrac{eE\\tau}{m}\\) and \\(I = neAv_d\\).\n" +
        "- So \\(I = \\dfrac{ne^2A\\tau}{m}E\\), and \\(j = \\dfrac{I}{A} = \\dfrac{ne^2\\tau}{m}E\\).\n" +
        "- Compare with \\(j = \\sigma E\\): \\(\\sigma = \\dfrac{ne^2\\tau}{m}\\), so \\(\\rho = \\dfrac{m}{ne^2\\tau}\\).\n" +
        "- With \\(E = V/l\\): \\(I = \\dfrac{ne^2A\\tau V}{ml}\\), so \\(R = \\dfrac{V}{I} = \\dfrac{ml}{ne^2\\tau A}\\).",
      formula: {
        label: "Conductivity and resistivity",
        latex: "\\sigma = \\frac{ne^2\\tau}{m}, \\qquad \\rho = \\frac{m}{ne^2\\tau}, \\qquad R = \\frac{ml}{ne^2\\tau A}",
      },
      authoredExample: {
        prompt:
          "Copper has resistivity 1.7 × 10⁻⁸ Ω m and 8.5 × 10²⁸ free electrons per cubic metre. Find the relaxation time of its electrons. Take \\(m = 9.1 \\times 10^{-31}\\) kg and \\(e = 1.6 \\times 10^{-19}\\) C.",
        steps: [
          "Given: \\(\\rho = 1.7 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\), \\(n = 8.5 \\times 10^{28}\\ \\text{m}^{-3}\\).",
          "Formula: \\(\\rho = \\dfrac{m}{ne^2\\tau}\\), so \\(\\tau = \\dfrac{m}{ne^2\\rho}\\).",
          "Substitution: \\(ne^2\\rho = (8.5 \\times 10^{28})(1.6 \\times 10^{-19})^2(1.7 \\times 10^{-8}) = 3.70 \\times 10^{-17}\\).",
          "\\(\\tau = \\dfrac{9.1 \\times 10^{-31}}{3.70 \\times 10^{-17}} = 2.5 \\times 10^{-14}\\) s.",
        ],
        answer: "τ ≈ 2.5 × 10⁻¹⁴ s",
      },
      selfCheckExample: {
        prompt: "When a metal is heated, the relaxation time of its electrons halves and n stays the same. By what factor does its resistivity change?",
        steps: ["\\(\\rho \\propto \\dfrac{1}{\\tau}\\), so halving \\(\\tau\\) doubles \\(\\rho\\)."],
        answer: "It doubles",
      },
      practiceSet: [
        { prompt: "The number of free electrons per unit volume in a conductor is doubled while τ stays the same. What happens to its resistivity?", answer: "It is halved, since \\(\\rho \\propto 1/n\\)" },
        { prompt: "Write the SI unit of conductivity.", answer: "\\(\\Omega^{-1}\\,\\text{m}^{-1}\\), also written S/m" },
        { prompt: "Is current density a scalar or a vector?", answer: "A vector, directed along the electric field" },
      ],
      pyqExampleId: "34ef03e8-7230-4371-8e52-ca849519937a",
      traps: [
        {
          title: "Writing e instead of e² in ρ",
          body: "One e comes from the charge each electron carries and one from the force \\(eE\\) that drives the drift. Dropping either gives a wrong formula and loses the derivation marks.",
        },
        {
          title: "Confusing resistance with resistivity",
          body: "Resistance depends on the length and area of the specimen; resistivity does not. \\(\\rho = m/(ne^2\\tau)\\) contains only properties of the material.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpce-wire-resistance",
      name: "Resistivity, conductivity and field from measured values",
      intuition:
        "Most numericals on this page are R = ρl/A used in one of three ways: find ρ or σ from a measured V, I, length and area; find the field from E = ρI/A; or compare two wires by how their length and radius differ. The commonest slip is the area: a square millimetre is a millionth of a square metre.",
      definition:
        "- Resistance from readings: \\(R = \\dfrac{V}{I}\\). Then \\(\\rho = \\dfrac{RA}{l}\\) and \\(\\sigma = \\dfrac{l}{RA}\\).\n" +
        "- Field inside a wire: \\(E = \\dfrac{V}{l}\\), or \\(E = \\rho j = \\dfrac{\\rho I}{A}\\).\n" +
        "- Comparing wires: \\(R = \\dfrac{\\rho l}{\\pi r^2}\\), so R is proportional to \\(\\rho\\) and l and to \\(1/r^2\\): the radius counts twice.\n" +
        "- Wires in series carry the same current, so the potential drops across them are in the ratio of their resistances, \\(\\dfrac{V_1}{V_2} = \\dfrac{R_1}{R_2}\\).\n" +
        "- Stretching: \\(R \\propto l^2\\). For a small stretch, a 1% increase in length raises R by about 2%.\n" +
        "- Units: \\(1\\ \\text{mm}^2 = 10^{-6}\\ \\text{m}^2\\).",
      formula: {
        label: "From readings to resistivity",
        latex: "\\rho = \\frac{RA}{l}, \\qquad \\sigma = \\frac{1}{\\rho}, \\qquad E = \\frac{\\rho I}{A}",
      },
      authoredExample: {
        prompt:
          "A wire 3.0 m long with an area of cross-section of 0.40 mm² carries 2.5 A when 1.5 V is applied across it. Find (i) the resistivity and (ii) the conductivity of its material.",
        steps: [
          "Given: \\(l = 3.0\\) m, \\(A = 0.40\\ \\text{mm}^2 = 0.40 \\times 10^{-6}\\ \\text{m}^2\\), \\(V = 1.5\\) V, \\(I = 2.5\\) A.",
          "Resistance: \\(R = \\dfrac{V}{I} = \\dfrac{1.5}{2.5} = 0.60\\ \\Omega\\).",
          "(i) \\(\\rho = \\dfrac{RA}{l} = \\dfrac{0.60 \\times 0.40 \\times 10^{-6}}{3.0} = 8.0 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\).",
          "(ii) \\(\\sigma = \\dfrac{1}{\\rho} = \\dfrac{1}{8.0 \\times 10^{-8}} = 1.25 \\times 10^{7}\\ \\Omega^{-1}\\,\\text{m}^{-1}\\).",
        ],
        answer: "ρ = 8.0 × 10⁻⁸ Ω m; σ = 1.25 × 10⁷ Ω⁻¹ m⁻¹",
      },
      selfCheckExample: {
        prompt: "A wire is stretched so that its length increases by 3%. By about what percentage does its resistance increase?",
        steps: ["\\(R \\propto l^2\\), so \\(\\dfrac{\\Delta R}{R} \\approx 2\\,\\dfrac{\\Delta l}{l} = 2 \\times 3\\%\\)."],
        answer: "About 6%",
      },
      practiceSet: [
        { prompt: "Express 0.25 mm² in square metres.", answer: "\\(2.5 \\times 10^{-7}\\ \\text{m}^2\\)" },
        {
          prompt: "Find the conductivity of a material whose resistivity is 2.5 × 10⁻⁸ Ω m.",
          answer: "\\(\\sigma = \\dfrac{1}{2.5 \\times 10^{-8}} = 4.0 \\times 10^{7}\\ \\Omega^{-1}\\,\\text{m}^{-1}\\)",
        },
        {
          prompt: "A copper wire of cross-section 1.0 × 10⁻⁶ m² carries 2.0 A. Copper's resistivity is 1.7 × 10⁻⁸ Ω m. Find the field inside the wire.",
          answer: "\\(E = \\dfrac{\\rho I}{A} = 0.034\\ \\text{V/m}\\)",
        },
      ],
      pyqExampleId: "f612b922-19ae-404a-8087-bf8ffadfc09d",
      traps: [
        {
          title: "Converting mm² with 10⁻³",
          body: "A millimetre is \\(10^{-3}\\) m, so a square millimetre is \\(10^{-6}\\ \\text{m}^2\\). Using \\(10^{-3}\\) makes the resistivity a thousand times too large.",
        },
        {
          title: "Increase or new value?",
          body: "A wire stretched to twice its length has four times its resistance: that is an increase of 300%, not 400%. Read whether the question asks for the new value or the increase.",
        },
      ],
    },
  ],
};
