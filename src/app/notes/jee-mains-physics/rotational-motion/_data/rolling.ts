import type { SubtopicNote } from "@/app/notes/_types";

export const ROLLING_ROT_NOTE: SubtopicNote = {
  subtopicName: "Rolling: Velocities and Kinetic Energy",
  title: "Rolling: Velocities and Kinetic Energy",
  oneLineDefinition:
    "A body rolls without slipping when v = ωR: its contact point is momentarily at rest, its top moves at 2v, and its kinetic energy is ½mv²(1 + k²/R²), split between translation and rotation in a ratio fixed by its shape.",
  whyItMatters:
    "Thirteen PYQs, six of them asking for a number, and one from 2026. Five use the rolling condition v = ωR: the speed of a point on the rim, or the moment a slipping body starts to roll. Eight split a rolling body's kinetic energy between translation and rotation, or find its speed from that energy.",
  concepts: [
    // C1 — the rolling condition
    {
      kind: "formula" as const,
      slug: "jprot-roll-condition",
      name: "The rolling condition and the speeds of points on a rolling body",
      intuition:
        "Rolling is a translation of the centre plus a spin about it. Without slipping, the two cancel exactly at the ground: the contact point is at rest for an instant. So the whole body is turning about the contact point at that instant, and every point's speed is ω times its distance from the contact point.",
      definition:
        "- Rolling without slipping: \\(v_{cm} = \\omega R\\).\n" +
        "- Speed of any point \\(= \\omega \\times\\) its distance from the contact point. Contact point 0; centre v; top 2v; a rim point level with the centre \\(\\sqrt{2}\\,v\\).\n" +
        "- The top point after half a turn: it has moved \\(\\pi R\\) forward and \\(2R\\) down, a displacement of \\(R\\sqrt{\\pi^{2} + 4}\\).\n" +
        "- Slipping to rolling on a rough floor: kinetic friction \\(\\mu mg\\) slows the centre, \\(v = v_0 - \\mu gt\\), and changes the spin, \\(\\alpha = \\mu mgR/I\\). Rolling begins when \\(v = \\omega R\\); friction then stops acting.\n" +
        "- A disc launched sliding with no spin: \\(v_0 - \\mu gt = 2\\mu gt\\), so \\(t = \\dfrac{v_0}{3\\mu g}\\) and it rolls on at \\(\\tfrac{2}{3}v_0\\). A ring rolls on at \\(\\tfrac{1}{2}v_0\\).",
      formula: {
        label: "Rolling without slipping",
        latex: "v_{cm} = \\omega R \\qquad v_P = \\omega\\, r_P \\quad (r_P = \\text{distance of P from the contact point})",
      },
      authoredExample: {
        prompt:
          "A wheel of radius 0.4 m rolls without slipping with its centre moving at 6 m/s. Find its angular speed and the speeds of the top point, the contact point, and a rim point level with the centre.",
        steps: [
          "\\(\\omega = v/R = 6/0.4 = 15\\) rad/s.",
          "Top point: \\(2R\\) from the contact point, so \\(15 \\times 0.8 = 12\\) m/s.",
          "Contact point: 0.",
          "Rim point level with the centre: \\(\\sqrt{2}R\\) from the contact point, so \\(15 \\times 0.4\\sqrt{2} = 6\\sqrt{2} \\approx 8.49\\) m/s.",
        ],
        answer: "15 rad/s; 12 m/s, 0, \\(6\\sqrt{2}\\) m/s",
      },
      selfCheckExample: {
        prompt:
          "A ring slides onto a rough floor at 6 m/s with no spin. The coefficient of kinetic friction is 0.2 (g = 10 m/s²). When does it start to roll, and at what speed?",
        steps: [
          "Centre: \\(v = 6 - \\mu gt = 6 - 2t\\).",
          "Spin: \\(\\alpha = \\dfrac{\\mu mgR}{mR^{2}} = \\dfrac{\\mu g}{R}\\), so \\(\\omega R = \\mu gt = 2t\\).",
          "Rolling when \\(6 - 2t = 2t\\): \\(t = 1.5\\) s, and \\(v = 3\\) m/s.",
        ],
        answer: "After 1.5 s, at 3 m/s",
      },
      practiceSet: [
        { prompt: "The top point of a rolling wheel moves at 10 m/s. Speed of the centre?", answer: "5 m/s" },
        { prompt: "A disc rolls with its centre at speed v. Speed of a rim point level with the centre?", answer: "\\(\\sqrt{2}\\,v\\)" },
        { prompt: "A disc slides onto a rough floor at \\(v_0\\) with no spin. Its speed once it rolls?", answer: "\\(\\tfrac{2}{3}v_0\\)" },
        { prompt: "Displacement of the top point of a rolling wheel of radius R after half a turn?", answer: "\\(R\\sqrt{\\pi^{2} + 4}\\)" },
      ],
      pyqExampleId: "7499106e-bd1e-472b-9050-c652e1df8976", // 2026: slipping cylinder with some initial spin, time to start rolling
      traps: [
        {
          title: "The top of a rolling wheel moves at 2v",
          body: "The centre moves at v and the top also turns forward at ωR = v about the centre, so the top moves at 2v. Only the centre moves at v.",
        },
        {
          title: "Friction acts only while the body slips",
          body: "Kinetic friction μmg acts until v = ωR. After that the body rolls on a level floor with no friction and no further change in speed.",
        },
      ],
    },

    // C2 — kinetic energy of a rolling body
    {
      kind: "reference" as const,
      slug: "jprot-roll-ke",
      name: "Kinetic energy of rolling bodies",
      intuition:
        "A rolling body has two kinetic energies: ½mv² for moving and ½Iω² for spinning. With v = ωR the total is ½mv²(1 + k²/R²). The number k²/R² depends only on the shape, so each shape splits its energy in a fixed ratio, whatever its mass, radius or speed.",
      definition:
        "- \\(K = \\tfrac{1}{2}mv^{2} + \\tfrac{1}{2}I\\omega^{2} = \\tfrac{1}{2}mv^{2}\\left(1 + \\dfrac{k^{2}}{R^{2}}\\right)\\).\n" +
        "- Rotational share \\(= \\dfrac{k^{2}/R^{2}}{1 + k^{2}/R^{2}}\\); translational : rotational \\(= 1 : k^{2}/R^{2}\\).\n" +
        "- Given the total kinetic energy, \\(v^{2} = \\dfrac{2K}{m(1 + k^{2}/R^{2})}\\).\n" +
        "- Angular momentum of a rolling body about a point on the ground below its path: \\(mvR + I\\omega\\). For a thin spherical shell, \\(mR^{2}\\omega + \\tfrac{2}{3}mR^{2}\\omega = \\tfrac{5}{3}mR^{2}\\omega\\).",
      table: {
        columns: ["Body", "k²/R²", "Total kinetic energy", "Rotational share", "Translational : rotational"],
        rows: [
          { cells: ["Ring or thin hollow cylinder", "1", "\\(mv^{2}\\)", "\\(\\tfrac{1}{2}\\)", "1 : 1"] },
          { cells: ["Disc or solid cylinder", "\\(\\tfrac{1}{2}\\)", "\\(\\tfrac{3}{4}mv^{2}\\)", "\\(\\tfrac{1}{3}\\)", "2 : 1"] },
          { cells: ["Solid sphere", "\\(\\tfrac{2}{5}\\)", "\\(\\tfrac{7}{10}mv^{2}\\)", "\\(\\tfrac{2}{7}\\)", "5 : 2"] },
          { cells: ["Thin hollow sphere (shell)", "\\(\\tfrac{2}{3}\\)", "\\(\\tfrac{5}{6}mv^{2}\\)", "\\(\\tfrac{2}{5}\\)", "3 : 2"], noteAmber: "The shell's rotational share, 2/5, is the same number as the solid sphere's k²/R². Keep the two apart." },
        ],
        caption: "Every row follows from ½mv²(1 + k²/R²); only k²/R² changes from shape to shape.",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg solid cylinder rolls without slipping at 3 m/s. Find its total kinetic energy and the rotational part of it.",
        steps: [
          "\\(K = \\tfrac{1}{2}(2)(3)^{2}\\left(1 + \\tfrac{1}{2}\\right) = 9 \\times 1.5 = 13.5\\) J.",
          "Rotational share \\(\\tfrac{1}{3}\\): \\(4.5\\) J.",
        ],
        answer: "13.5 J; 4.5 J",
      },
      practiceSet: [
        { prompt: "A rolling solid sphere has 14 J of kinetic energy in all. How much is rotational?", answer: "4 J" },
        { prompt: "A 1 kg ring rolls with 4 J of kinetic energy. Its speed?", answer: "2 m/s" },
        { prompt: "For a rolling spherical shell, rotational kinetic energy over total kinetic energy?", answer: "\\(\\tfrac{2}{5}\\)" },
        { prompt: "Angular momentum of a rolling disc (m, R, ω) about its point of contact?", answer: "\\(\\tfrac{3}{2}mR^{2}\\omega\\)" },
      ],
      pyqExampleId: "336ba3aa-8090-4803-9af1-9d8bed7cfdee", // 2025: rolling solid sphere, translational over rotational KE
      traps: [
        {
          title: "½mv² alone for a rolling body",
          body: "A body rolling at speed v has more than ½mv²: the spin adds ½Iω². Finding v from K = ½mv² overestimates the speed of every rolling body.",
        },
        {
          title: "Share of the total, or ratio of the parts",
          body: "For a solid sphere, rotational over total is 2/7, but rotational over translational is 2/5. Read whether the question divides by the total or by the other part.",
        },
      ],
    },
  ],
};
