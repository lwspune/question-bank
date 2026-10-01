import type { SubtopicNote } from "@/app/notes/_types";

export const DIPOLE_ES_NOTE: SubtopicNote = {
  subtopicName: "Electric Dipoles: Field, Torque and Energy",
  title: "Electric Dipoles: Field, Torque and Energy",
  oneLineDefinition:
    "A dipole is a pair of equal and opposite charges with moment p = q × separation, from − to +; its field falls as 1/r³, and in a uniform field it feels a torque p × E and has energy −p·E.",
  whyItMatters:
    "Twenty-one PYQs, fifteen of them multiple choice, and four from 2026. Nine ask for a dipole moment, field or potential, including two dipoles at right angles or along one line. Twelve put a dipole in an external field: the torque on it, the work to turn it, its small oscillations, and the force on it when the field is not uniform.",
  concepts: [
    // C1 — moment, field and potential
    {
      kind: "formula" as const,
      slug: "jpes-dipole-field",
      name: "Dipole moment, field and potential",
      intuition:
        "Far from a dipole, the two charges almost cancel. What remains depends on the moment p, and falls one power of r faster than a single charge: the field as 1/r³, the potential as 1/r². Along the axis the two charges' fields work together; on the equatorial line they nearly cancel, leaving half as much field, pointing opposite to p.",
      definition:
        "- \\(p = q \\times d\\), pointing from −q to +q. For a group of charges, \\(\\vec p = \\sum q_i\\vec r_i\\); this depends on the origin unless the net charge is zero.\n" +
        "- Short dipole, on the axis: \\(E = \\dfrac{2kp}{r^{3}}\\), along \\(\\vec p\\). On the equatorial line: \\(E = \\dfrac{kp}{r^{3}}\\), opposite to \\(\\vec p\\).\n" +
        "- At angle θ from the axis: \\(E = \\dfrac{kp}{r^{3}}\\sqrt{1 + 3\\cos^{2}\\theta}\\) and \\(V = \\dfrac{kp\\cos\\theta}{r^{2}}\\). V is zero on the equatorial line.\n" +
        "- Two dipoles: add their fields as vectors, or add their moments first when they sit at one point.",
      formula: {
        label: "Short dipole",
        latex: "E_{\\text{axial}} = \\frac{2kp}{r^{3}}, \\qquad E_{\\text{equatorial}} = \\frac{kp}{r^{3}}, \\qquad V = \\frac{kp\\cos\\theta}{r^{2}}",
      },
      authoredExample: {
        prompt:
          "A short dipole of moment \\(2 \\times 10^{-9}\\) C m sits at the origin, pointing along +x. Find the field and the potential at (0.1, 0) m and at (0, 0.1) m.",
        steps: [
          "\\(kp = 9 \\times 10^{9} \\times 2 \\times 10^{-9} = 18\\ \\text{V m}^{2}\\), and \\(r^{3} = 10^{-3}\\ \\text{m}^{3}\\).",
          "On the axis, (0.1, 0): \\(E = \\dfrac{2 \\times 18}{10^{-3}} = 3.6 \\times 10^{4}\\) N/C along +x; \\(V = \\dfrac{18}{0.01} = 1800\\) V.",
          "On the equatorial line, (0, 0.1): \\(E = 1.8 \\times 10^{4}\\) N/C along −x; \\(V = 0\\).",
        ],
        answer: "Axis: \\(3.6 \\times 10^{4}\\) N/C, 1800 V. Equatorial: \\(1.8 \\times 10^{4}\\) N/C opposite to p, 0 V.",
      },
      selfCheckExample: {
        prompt:
          "Charges +q at (a, 0), −q at (−a, 0), +2q at (0, a) and −2q at (0, −a). Find the dipole moment of the group.",
        steps: [
          "\\(\\vec p = \\sum q_i\\vec r_i = q(a\\hat i) + (-q)(-a\\hat i) + 2q(a\\hat j) + (-2q)(-a\\hat j)\\).",
          "\\(\\vec p = 2qa\\,\\hat i + 4qa\\,\\hat j\\). The net charge is zero, so the origin does not matter.",
        ],
        answer: "\\(2qa(\\hat i + 2\\hat j)\\)",
      },
      practiceSet: [
        { prompt: "A short dipole gives field E at distance r on its axis. Field at the same distance on the equatorial line?", answer: "E/2, opposite in direction" },
        { prompt: "The distance from a short dipole is doubled. By what factors do the field and the potential fall?", answer: "Field by 8, potential by 4" },
        { prompt: "A point lies on the axis of one short dipole and the equatorial line of another of equal moment, both at distance r. Resultant field?", answer: "\\(\\sqrt 5\\,kp/r^{3}\\)" },
        { prompt: "Potential on the equatorial line of a dipole?", answer: "Zero" },
      ],
      pyqExampleId: "1fb264ea-e402-4bb8-9a8e-7cbe1580a51a", // 2026: +2q, +3q, −4q at given points, p = 2qa(7î − 3ĵ)
      traps: [
        {
          title: "Axial is twice equatorial",
          body: "At the same distance, the axial field is 2kp/r³ and the equatorial field kp/r³. The equatorial field also points opposite to p.",
        },
        {
          title: "p points from − to +",
          body: "The dipole moment runs from the negative charge to the positive one, the reverse of the field lines between them.",
        },
        {
          title: "Net charge makes p depend on the origin",
          body: "When the charges do not add to zero, Σqr changes with the origin. Use the origin the question names.",
        },
      ],
    },

    // C2 — dipole in an external field
    {
      kind: "formula" as const,
      slug: "jpes-dipole-torque",
      name: "Dipole in an external field: torque, energy and work",
      intuition:
        "In a uniform field the two charges feel equal and opposite forces, so the net force is zero but the pair is twisted towards the field. The energy is lowest when p points along E and highest when it points against it. Turning the dipole needs work equal to the change in that energy. In a field that varies, the two forces no longer cancel and the dipole is also pulled.",
      definition:
        "- Uniform field: net force zero; torque \\(\\vec\\tau = \\vec p \\times \\vec E\\), of size \\(pE\\sin\\theta\\), largest (pE) at \\(90^{\\circ}\\).\n" +
        "- Energy \\(U = -\\vec p \\cdot \\vec E = -pE\\cos\\theta\\): stable at θ = 0 (−pE), unstable at \\(180^{\\circ}\\) (+pE).\n" +
        "- Work to turn from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = pE(\\cos\\theta_1 - \\cos\\theta_2)\\). From aligned: pE to \\(90^{\\circ}\\), 2pE to \\(180^{\\circ}\\).\n" +
        "- Small oscillations about the field: \\(\\omega = \\sqrt{\\dfrac{pE}{I}}\\), so the frequency goes as \\(\\sqrt E\\). A free dipole turns about its centre of mass.\n" +
        "- Non-uniform field: a net force appears. A dipole aligned with a field that grows in one direction is pulled that way.",
      formula: {
        label: "Torque, energy and work",
        latex: "\\vec\\tau = \\vec p \\times \\vec E, \\qquad U = -\\vec p \\cdot \\vec E, \\qquad W = pE(\\cos\\theta_1 - \\cos\\theta_2)",
      },
      authoredExample: {
        prompt:
          "Charges \\(-3\\ \\mu\\text{C}\\) at (0, 0, 0) m and \\(+3\\ \\mu\\text{C}\\) at (0, 2, 1) m sit in a uniform field \\(\\vec E = 50\\hat i\\) N/C. Find the torque and the potential energy.",
        steps: [
          "\\(\\vec p = 3 \\times 10^{-6}(0\\hat i + 2\\hat j + \\hat k) = (6\\hat j + 3\\hat k) \\times 10^{-6}\\) C m.",
          "\\(\\vec\\tau = \\vec p \\times \\vec E = 10^{-6}(6\\hat j + 3\\hat k) \\times 50\\hat i = 10^{-6}(-300\\hat k + 150\\hat j)\\) N m.",
          "\\(|\\vec\\tau| = 10^{-6}\\sqrt{300^{2} + 150^{2}} = 150\\sqrt 5 \\times 10^{-6} \\approx 3.35 \\times 10^{-4}\\) N m.",
          "\\(U = -\\vec p \\cdot \\vec E = 0\\), since p has no x-part: p is perpendicular to E.",
        ],
        answer: "\\(\\vec\\tau = (150\\hat j - 300\\hat k) \\times 10^{-6}\\) N m, about \\(3.35 \\times 10^{-4}\\) N m; U = 0.",
      },
      selfCheckExample: {
        prompt:
          "A dipole of moment \\(3 \\times 10^{-8}\\) C m is aligned with a uniform field of \\(6 \\times 10^{4}\\) N/C. Work needed to turn it through \\(90^{\\circ}\\), and through \\(180^{\\circ}\\)?",
        steps: [
          "\\(pE = 3 \\times 10^{-8} \\times 6 \\times 10^{4} = 1.8 \\times 10^{-3}\\) J.",
          "To \\(90^{\\circ}\\): \\(pE(1 - 0) = 1.8 \\times 10^{-3}\\) J. To \\(180^{\\circ}\\): \\(pE(1 + 1) = 3.6 \\times 10^{-3}\\) J.",
        ],
        answer: "1.8 mJ and 3.6 mJ.",
      },
      practiceSet: [
        { prompt: "Largest torque on a dipole of \\(2 \\times 10^{-9}\\) C m in a field of \\(3 \\times 10^{4}\\) N/C?", answer: "\\(6 \\times 10^{-5}\\) N m" },
        { prompt: "Potential energy of a dipole at \\(60^{\\circ}\\) to a uniform field?", answer: "−pE/2" },
        { prompt: "The field is made four times stronger. Frequency of a dipole's small oscillations?", answer: "Doubles" },
        { prompt: "Net force on a dipole in a uniform field?", answer: "Zero" },
      ],
      pyqExampleId: "89c3451b-710b-43a9-a960-ab97a6514fbb", // 2024: ±4 μC at given points in E = 0.20 î V/cm, τ = 8√2 × 10⁻⁵ N m
      traps: [
        {
          title: "Half a turn costs 2pE",
          body: "From aligned to reversed, the energy goes from −pE to +pE, so the work is 2pE. Writing pE counts only the quarter turn.",
        },
        {
          title: "The minimum energy is negative",
          body: "U = −pE cos θ is −pE when aligned. A dipole set along the field is in stable equilibrium, at its lowest energy, not zero.",
        },
        {
          title: "Unequal masses turn about the centre of mass",
          body: "In a uniform field the net force is zero, so the centre of mass stays put. Take the moment of inertia about it, not about the midpoint.",
        },
      ],
    },
  ],
};
