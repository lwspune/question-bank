import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_WO_POLARIZATION_NOTE: SubtopicNote = {
  subtopicName: "Polarization and Brewster's Law",
  title: "Polarization, Malus' Law and Brewster's Law",
  oneLineDefinition:
    "What polarized light is, why a polarizer halves unpolarized light, Malus' law for two polarizers, Brewster's law for polarization by reflection, and the other ways light gets polarized.",
  whyItMatters:
    "15 questions, eight of them from board papers. The board asks you to state Brewster's law and derive the formula for the Brewster angle (2019, 2024, 2025), to find a polarising angle or a refractive index from it (2016, 2018, 2026), how much a polarizer cuts unpolarized light (2025), and one method of polarization (2024). The textbook adds Malus' law and its derivation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpwo-malus",
      name: "Polarizers and Malus' law",
      intuition:
        "In ordinary light the electric field points every which way in the plane across the beam. A polarizer passes only the part of each field that lies along its axis. Averaged over all directions, exactly half the intensity gets through, whichever way the axis points. The light that comes out is plane polarized, so a second polarizer passes only the part along its own axis, \\(E\\cos\\theta\\), and the intensity goes as the square.",
      definition:
        "- **Unpolarized light:** the electric field can point in any direction in the plane perpendicular to the direction of propagation.\n" +
        "- **Plane polarized light:** the electric field is restricted to one direction. A **polarizer** (for example a polaroid sheet) passes only waves whose electric field is along its **polarizing axis**.\n" +
        "- The plane containing the electric field vectors of plane polarized light is the **plane of vibration**; the plane perpendicular to it is the **plane of polarization**.\n" +
        "- Through the first polarizer: the component \\(E_0 \\cos\\phi\\) passes; the average of \\(\\cos^2\\phi\\) over 0 to 180° is 1/2, so \\(I_1 = I_0/2\\).\n" +
        "- **Malus' law (derivation):** the polarized field of amplitude \\(E_{10}\\) meets a second polarizer whose axis is at angle \\(\\theta\\) to the first. Only \\(E_{20} = E_{10}\\cos\\theta\\) passes. Since \\(I \\propto E^2\\), \\(I_2 = I_1 \\cos^2\\theta\\).\n" +
        "- \\(\\theta\\) is the angle between the axes of the two polarizers. \\(\\theta = 0\\) (parallel setting): no change. \\(\\theta = 90^\\circ\\) (cross setting): no light.",
      formula: {
        label: "Malus' law",
        latex: "I_1 = \\frac{I_0}{2}, \\qquad I_2 = I_1 \\cos^2\\theta",
        symbols: [
          { symbol: "\\(I_0\\)", meaning: "intensity of the unpolarized light" },
          { symbol: "\\(I_1\\)", meaning: "intensity after the first polarizer" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the axes of the two polarizers" },
        ],
      },
      authoredExample: {
        prompt:
          "Unpolarized light of intensity 80 W/m² passes through two polaroids whose axes are at 60° to each other. Find the intensity after each polaroid.",
        steps: [
          "Given: \\(I_0 = 80\\) W/m², \\(\\theta = 60^\\circ\\).",
          "First polaroid: \\(I_1 = \\dfrac{I_0}{2} = \\dfrac{80}{2} = 40\\) W/m².",
          "Second polaroid, by Malus' law: \\(I_2 = I_1 \\cos^2\\theta = 40 \\times (0.5)^2 = 10\\) W/m².",
        ],
        answer: "40 W/m² after the first; 10 W/m² after the second",
      },
      selfCheckExample: {
        prompt:
          "Plane polarized light of intensity I falls on a polaroid whose axis makes 30° with the plane of vibration of the light. What intensity comes through?",
        steps: ["The light is already polarized, so use Malus' law directly, with no halving.", "\\(I' = I\\cos^2 30^\\circ = I \\times 0.75\\)."],
        answer: "0.75 I",
      },
      practiceSet: [
        { prompt: "Two polaroids are in the cross setting. What intensity comes out of the second one?", answer: "Zero" },
        { prompt: "At what angle between the axes of two polaroids is the light leaving the second one a quarter of the light leaving the first?", answer: "60°, since \\(\\cos^2 60^\\circ = 1/4\\)" },
        { prompt: "Name the law that gives the intensity of linearly polarized light after it passes through a polarizer.", answer: "Malus' law" },
      ],
      pyqExampleId: "5f1968df-c2d0-4d52-96d3-5f2af2b68601",
      traps: [
        {
          title: "Using Malus' law on unpolarized light",
          body: "\\(\\cos^2\\theta\\) applies only to light that is already polarized. Unpolarized light is simply halved at the first polarizer, whatever the angle of its axis.",
        },
        {
          title: "Taking the angle from the wrong line",
          body: "\\(\\theta\\) is the angle BETWEEN the two polarizing axes. If one axis is given from the vertical and the other is horizontal, work out the angle between them first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-brewster",
      name: "Brewster's law",
      intuition:
        "Light reflected from glass or water is partly polarized. Brewster found one angle of incidence at which the reflected light is completely polarized. At that angle the reflected ray and the refracted ray happen to be at right angles. Put that one fact into Snell's law and the formula drops out.",
      definition:
        "- In general the reflected and refracted light are only partially polarized. At one angle of incidence, the **Brewster angle** (polarizing angle) \\(\\theta_B\\), the reflected light is **completely plane polarized**, with its electric field perpendicular to the plane of incidence; the refracted light is partially polarized.\n" +
        "- **Brewster's law:** \\(\\tan\\theta_B = \\dfrac{n_2}{n_1}\\). For light from air, \\(\\tan\\theta_B = n\\).\n" +
        "- **Derivation:** at the Brewster angle the reflected and refracted rays are perpendicular, so \\(\\theta_B + \\theta_r = 90^\\circ\\), giving \\(\\theta_r = 90^\\circ - \\theta_B\\).\n" +
        "- Snell's law: \\(n_1 \\sin\\theta_B = n_2 \\sin\\theta_r = n_2 \\sin(90^\\circ - \\theta_B) = n_2 \\cos\\theta_B\\).\n" +
        "- Hence \\(\\tan\\theta_B = \\dfrac{n_2}{n_1}\\), that is \\(\\theta_B = \\tan^{-1}(n_2/n_1)\\).",
      formula: {
        label: "Brewster's law",
        latex: "\\tan\\theta_B = \\frac{n_2}{n_1}, \\qquad \\theta_B + \\theta_r = 90^\\circ",
        symbols: [
          { symbol: "\\(\\theta_B\\)", meaning: "Brewster angle (polarizing angle)" },
          { symbol: "\\(\\theta_r\\)", meaning: "angle of refraction at the Brewster angle" },
        ],
      },
      authoredExample: {
        prompt:
          "Light in air falls on glass of refractive index 1.6. Find the polarizing angle and the angle of refraction at that angle of incidence.",
        steps: [
          "Given: \\(n_1 = 1\\), \\(n_2 = 1.6\\).",
          "Formula: \\(\\tan\\theta_B = \\dfrac{n_2}{n_1}\\).",
          "Substitution: \\(\\tan\\theta_B = 1.6\\), so \\(\\theta_B = \\tan^{-1}(1.6) = 58.0^\\circ\\).",
          "\\(\\theta_r = 90^\\circ - 58.0^\\circ = 32.0^\\circ\\).",
        ],
        answer: "Polarizing angle 58.0°; angle of refraction 32.0°",
      },
      selfCheckExample: {
        prompt:
          "Light is reflected from a liquid at its polarizing angle, and the refracted ray makes 37° with the normal. Find the polarizing angle and the refractive index of the liquid.",
        steps: ["\\(\\theta_B = 90^\\circ - 37^\\circ = 53^\\circ\\).", "\\(n = \\tan 53^\\circ = 1.33\\)."],
        answer: "53°; 1.33",
      },
      practiceSet: [
        { prompt: "Light travels in water (n = 1.33) and is reflected from glass (n = 1.5). Find the Brewster angle.", answer: "\\(\\tan^{-1}(1.5/1.33) = 48.4^\\circ\\)" },
        { prompt: "At the Brewster angle, what is the angle between the reflected and the refracted rays?", answer: "90°" },
        { prompt: "The polarizing angle of a transparent medium is 57°. Find its refractive index.", answer: "\\(\\tan 57^\\circ = 1.54\\)" },
      ],
      pyqExampleId: "b5618e18-dd9a-4839-a0cb-59039c2ef5c5",
      traps: [
        {
          title: "Writing sine for tangent",
          body: "Brewster's law is \\(\\tan\\theta_B = n\\), not \\(\\sin\\theta_B = n\\). The sine form would need n below 1 for every real angle.",
        },
        {
          title: "Starting the derivation from nothing",
          body: "The derivation rests on one fact you must state first: at the Brewster angle the reflected and refracted rays are perpendicular. Without it, \\(\\theta_r = 90^\\circ - \\theta_B\\) has no reason.",
        },
        {
          title: "Saying both beams are completely polarized",
          body: "At the Brewster angle only the reflected light is completely polarized. The refracted light stays partially polarized.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpwo-polarization-methods",
      name: "Ways of polarizing light and its uses",
      intuition:
        "Polarization is the one effect that sorts transverse waves from longitudinal ones. A sound wave vibrates along its direction of travel, so there is nothing to restrict; light vibrates across its direction of travel, so a polarizer can pick out one direction. That is why polarization, not interference or diffraction, proves light is transverse.",
      definition:
        "- Only **transverse** waves can be polarized. Longitudinal waves such as sound cannot. So polarization shows that light is a transverse wave.\n" +
        "- The board asks 'state any one method of polarization' for one mark: name the method and give its condition in one line.",
      table: {
        columns: ["Topic", "What the textbook says"],
        rows: [
          {
            cells: ["Polarization by reflection", "At the Brewster angle the reflected light is completely plane polarized; this works only for non-metallic surfaces"],
            pyqExampleId: "fcbf0de8-6cce-43c4-b58b-154132904623",
            noteAmber: "Board 2024 asked for any one method of polarization.",
          },
          { cells: ["Polarization by scattering", "Sunlight scattered by air molecules and dust becomes partially polarized; the degree depends on the angle of scattering"] },
          { cells: ["Polaroid", "A synthetic plastic sheet that passes only waves whose electric field lies along its polarizing axis"] },
          { cells: ["Polaroid sunglasses", "Cut glare by reducing the partially or fully polarized light reflected from surfaces"] },
          {
            cells: ["Proof that light is transverse", "Light can be polarized; reflection, interference and diffraction happen for longitudinal waves too, so they prove nothing about it"],
            pyqExampleId: "0ee14fdb-cd1b-45e6-b1dc-be7be6fb4d97",
          },
        ],
      },
      practiceSet: [
        { prompt: "Can sound waves in air be polarized? Give the reason.", answer: "No. Sound is a longitudinal wave, so its vibration is along the direction of travel and cannot be restricted" },
        { prompt: "Why do polaroid sunglasses reduce the glare from a wet road?", answer: "Light reflected from the road is partly polarized, and the polaroid blocks most of it" },
        { prompt: "Does polarization by reflection work on a polished metal surface?", answer: "No. It works only for non-metallic surfaces" },
      ],
      traps: [
        {
          title: "Naming the method without its condition",
          body: "'Reflection' alone is thin. Write 'reflection at the polarizing (Brewster) angle, where the reflected light is completely plane polarized'.",
        },
      ],
    },
  ],
};
