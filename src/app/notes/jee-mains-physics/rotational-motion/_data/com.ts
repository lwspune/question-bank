import type { SubtopicNote } from "@/app/notes/_types";

export const COM_ROT_NOTE: SubtopicNote = {
  subtopicName: "Centre of Mass and Its Motion",
  title: "Centre of Mass and Its Motion",
  oneLineDefinition:
    "The centre of mass is the mass-weighted average position of a system; it moves as if all the mass sat there and every external force acted there.",
  whyItMatters:
    "Twenty-two PYQs, seventeen of them multiple choice, and four from 2026. Eleven ask where the centre of mass is: point masses, a bent rod, a plate with a hole cut out, a rod or plate whose density varies. Eleven ask how it moves: the shape of its path, keeping it fixed while masses shift, explosions and recoil.",
  concepts: [
    // C1 — locating the centre of mass
    {
      kind: "formula" as const,
      slug: "jprot-com-locate",
      name: "Locating the centre of mass",
      intuition:
        "The centre of mass is an average position in which heavy parts count more. Find it one coordinate at a time. Look for symmetry first: a symmetric body has its centre of mass on the line of symmetry, which fixes one coordinate for free. A hole is easiest to handle as a piece of negative mass.",
      definition:
        "- Point masses: \\(x_{cm} = \\dfrac{\\sum m_i x_i}{\\sum m_i}\\), and the same for y and z.\n" +
        "- A continuous body: \\(x_{cm} = \\dfrac{\\int x\\,dm}{\\int dm}\\). For a rod with \\(\\lambda = \\lambda_0(1 - x^{2}/L^{2})\\), \\(\\int_0^L x\\lambda\\,dx = \\lambda_0L^{2}/4\\) and \\(\\int_0^L \\lambda\\,dx = 2\\lambda_0L/3\\), so \\(x_{cm} = 3L/8\\).\n" +
        "- A bent rod: treat each straight piece as a point mass at its own midpoint, with mass in proportion to its length.\n" +
        "- Standard results: semicircular ring \\(2R/\\pi\\) from the centre; semicircular disc \\(4R/3\\pi\\); both on the line of symmetry.\n" +
        "- A cut-out: full body minus the hole, \\(x_{cm} = \\dfrac{Mx_1 - mx_2}{M - m}\\). For a uniform plate, mass is in proportion to AREA, so a hole of half the radius has a quarter of the mass.",
      formula: {
        label: "Centre of mass",
        latex:
          "x_{cm} = \\frac{\\sum m_i x_i}{\\sum m_i} \\qquad x_{cm} = \\frac{\\int x\\,dm}{\\int dm} \\qquad x_{cm} = \\frac{Mx_1 - mx_2}{M - m}",
      },
      authoredExample: {
        prompt:
          "A uniform square plate of side 6 cm lies with one corner at the origin and its sides along the axes. A square of side 3 cm is cut from the far corner (the corner at (6, 6)). Find the centre of mass of the rest.",
        steps: [
          "Mass is in proportion to area. Full plate: 36 units at (3, 3). Cut piece: 9 units at (4.5, 4.5).",
          "Treat the cut piece as negative mass: \\(x_{cm} = \\dfrac{36 \\times 3 - 9 \\times 4.5}{36 - 9} = \\dfrac{108 - 40.5}{27} = 2.5\\) cm.",
          "By symmetry about the diagonal, \\(y_{cm} = 2.5\\) cm too.",
          "The centre of mass moves away from the cut corner, as it must.",
        ],
        answer: "\\((2.5, 2.5)\\) cm",
      },
      selfCheckExample: {
        prompt:
          "A uniform wire 60 cm long is bent at a right angle into arms of 20 cm and 40 cm. With the corner at the origin, the 20 cm arm along the x-axis and the 40 cm arm along the y-axis, find its centre of mass.",
        steps: [
          "The 20 cm arm has a third of the mass, at its midpoint (10, 0). The 40 cm arm has two thirds, at (0, 20).",
          "\\(x_{cm} = \\tfrac{1}{3}(10) + \\tfrac{2}{3}(0) = \\tfrac{10}{3}\\) cm.",
          "\\(y_{cm} = \\tfrac{1}{3}(0) + \\tfrac{2}{3}(20) = \\tfrac{40}{3}\\) cm.",
        ],
        answer: "\\(\\left(\\tfrac{10}{3}, \\tfrac{40}{3}\\right)\\) cm, about (3.3, 13.3) cm",
      },
      practiceSet: [
        { prompt: "A 2 kg mass is at x = 0 and a 3 kg mass at x = 5 m. Where is the centre of mass?", answer: "\\(x = 3\\) m" },
        { prompt: "Where is the centre of mass of a uniform semicircular ring of radius R?", answer: "On the line of symmetry, \\(2R/\\pi\\) from the centre" },
        { prompt: "A rod of length L has density \\(\\lambda = kx\\), x measured from one end. Where is its centre of mass?", answer: "\\(2L/3\\) from that end", method: "\\(\\dfrac{\\int_0^L kx^{2}dx}{\\int_0^L kx\\,dx} = \\dfrac{L^{3}/3}{L^{2}/2}\\)" },
        { prompt: "Where is the centre of mass of a uniform semicircular disc of radius R?", answer: "On the line of symmetry, \\(4R/3\\pi\\) from the centre" },
      ],
      pyqExampleId: "aa95225b-586b-4f74-8147-f6a18a481184", // 2025: disc of radius 20 cm, hole of 5 cm touching the rim
      traps: [
        {
          title: "Averaging positions without the masses",
          body: "The centre of mass of 1 kg at x = 0 and 3 kg at x = 4 m is at 3 m, not at the midpoint 2 m. Each position must be multiplied by its mass before dividing by the total mass.",
        },
        {
          title: "A hole's mass goes with its area",
          body: "A circular hole of half the disc's radius removes a quarter of the mass, not half. For a uniform solid, mass goes with volume, so half the radius removes an eighth.",
        },
        {
          title: "Semicircular ring and semicircular disc differ",
          body: "A ring has all its mass on the rim, so its centre of mass is further out: 2R/π ≈ 0.64R. A disc has mass spread inwards: 4R/3π ≈ 0.42R.",
        },
      ],
    },

    // C2 — motion of the centre of mass
    {
      kind: "formula" as const,
      slug: "jprot-com-motion",
      name: "Motion of the centre of mass, explosions and recoil",
      intuition:
        "Internal forces cancel in pairs, so only external forces move the centre of mass. With no external force it keeps its velocity: a body at rest that explodes leaves its centre of mass where it was. Its path is a straight line when its velocity and acceleration point the same way, and a parabola when they do not.",
      definition:
        "- \\(\\vec v_{cm} = \\dfrac{\\sum m_i\\vec v_i}{M}\\), \\(\\vec a_{cm} = \\dfrac{\\sum m_i\\vec a_i}{M}\\), and \\(M\\vec a_{cm} = \\vec F_{ext}\\).\n" +
        "- No external force: \\(\\vec v_{cm}\\) is constant. Path of the centre of mass: straight if \\(\\vec v_{cm} \\parallel \\vec a_{cm}\\) (or \\(\\vec v_{cm} = 0\\)); a parabola if a constant \\(\\vec a_{cm}\\) is at an angle to \\(\\vec v_{cm}\\).\n" +
        "- Keeping the centre of mass fixed: \\(m_1\\Delta x_1 + m_2\\Delta x_2 = 0\\).\n" +
        "- Atwood machine: the blocks move in opposite directions, so \\(a_{cm} = \\dfrac{m_1a - m_2a}{m_1 + m_2} = \\left(\\dfrac{m_1 - m_2}{m_1 + m_2}\\right)^{2}g\\), downward.\n" +
        "- Explosion from rest: the momenta are equal and opposite, so speeds go inversely as masses. With \\(K = p^{2}/2m\\), \\(K_A/K_B = m_B/m_A\\): the lighter piece carries more energy. With three pieces, the third balances the vector sum of the other two momenta.\n" +
        "- Recoil: a gun of mass M firing a bullet m at v recoils at \\(mv/M\\). A machine gun firing n bullets per second needs a force \\(nmv\\) to hold it.\n" +
        "- Kinetic energy of a system \\(= \\tfrac{1}{2}Mv_{cm}^{2}\\) + kinetic energy relative to the centre of mass.",
      formula: {
        label: "Velocity of the centre of mass, and Newton's second law for a system",
        latex: "\\vec v_{cm} = \\frac{\\sum m_i\\vec v_i}{\\sum m_i} \\qquad M\\vec a_{cm} = \\vec F_{ext}",
      },
      authoredExample: {
        prompt:
          "A 1 kg body moves with velocity \\(3\\hat i\\) m/s and no acceleration. A 2 kg body moves with velocity \\(3\\hat j\\) m/s and acceleration \\(2\\hat i\\) m/s². Find the velocity and acceleration of their centre of mass, and the shape of its path.",
        steps: [
          "\\(\\vec v_{cm} = \\dfrac{1(3\\hat i) + 2(3\\hat j)}{3} = \\hat i + 2\\hat j\\) m/s.",
          "\\(\\vec a_{cm} = \\dfrac{1(0) + 2(2\\hat i)}{3} = \\tfrac{4}{3}\\hat i\\) m/s².",
          "\\(\\vec a_{cm}\\) is constant but not along \\(\\vec v_{cm}\\), so the path bends, like a projectile's.",
        ],
        answer: "\\(\\vec v_{cm} = \\hat i + 2\\hat j\\), \\(\\vec a_{cm} = \\tfrac{4}{3}\\hat i\\); a parabola",
      },
      selfCheckExample: {
        prompt:
          "A shell at rest explodes into two pieces of 2 kg and 3 kg. The 2 kg piece flies off at 15 m/s. Find the speed of the 3 kg piece and the ratio of kinetic energies, 2 kg piece : 3 kg piece.",
        steps: [
          "Momentum stays zero: \\(2 \\times 15 = 3v\\), so \\(v = 10\\) m/s in the opposite direction.",
          "\\(K_2 = \\tfrac{1}{2}(2)(15)^{2} = 225\\) J; \\(K_3 = \\tfrac{1}{2}(3)(10)^{2} = 150\\) J.",
          "Ratio \\(225 : 150 = 3 : 2\\), the inverse of the mass ratio.",
        ],
        answer: "10 m/s; 3 : 2",
      },
      practiceSet: [
        { prompt: "Masses of 3 kg and 1 kg lie on a line. The 3 kg mass moves 1 cm towards the other. How must the 1 kg mass move to keep the centre of mass fixed?", answer: "3 cm towards the 3 kg mass" },
        { prompt: "A 4 kg gun fires a 20 g bullet at 400 m/s. The gun's recoil speed?", answer: "2 m/s" },
        { prompt: "Blocks of 3 kg and 1 kg hang over a light frictionless pulley (g = 10). The acceleration of their centre of mass?", answer: "2.5 m/s², downward", method: "\\(\\left(\\dfrac{3 - 1}{3 + 1}\\right)^{2} \\times 10\\)" },
        { prompt: "A machine gun fires 10 bullets a second, each of 50 g at 200 m/s. The force needed to hold it?", answer: "100 N" },
      ],
      pyqExampleId: "02f25619-62cd-442e-8093-e518cf7458ae", // 2026: v_cm parallel to a_cm, so the path is a straight line
      traps: [
        {
          title: "Equal momenta, not equal speeds",
          body: "After a body at rest explodes into two pieces, the pieces have equal and opposite MOMENTA. The lighter piece is faster and carries more kinetic energy, in the inverse ratio of the masses.",
        },
        {
          title: "Signs in an Atwood machine",
          body: "One block goes up while the other comes down, so their accelerations enter a_cm with opposite signs. Adding them as if both moved down gives a_cm = a, which is too large.",
        },
        {
          title: "An accelerating centre of mass need not curve",
          body: "A constant acceleration gives a straight path when the velocity of the centre of mass is along it, or zero. Only an acceleration at an angle to the velocity gives a parabola.",
        },
      ],
    },
  ],
};
