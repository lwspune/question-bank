import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/laws-of-motion";

export const NEWTON_NOTE: SubtopicNote = {
  subtopicName: "Newton's Laws — Force, Tension, Lift, and Connected Blocks",
  title: "Newton's Laws: Lifts, Pulleys, Circles and Power",
  oneLineDefinition:
    "The net force on a body equals its mass times its acceleration, measured in a frame that is not itself accelerating; applied body by body it gives the reading in a lift, the push between blocks, the tension in a pulley string, and — with v²/r as the acceleration — the forces in circular motion.",
  whyItMatters:
    "25 PYQs, 3 of them HARD. Twelve apply F = ma to lifts, blocks in contact, pulleys and ropes, and ask which frames are inertial. " +
    "Nine combine force with work, power or circular motion — power from a time-varying force, a conical pendulum, the string's tension at the bottom of a swing. Four are braking and penetration problems. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-lm-newton-applications",
      name: "Lifts, Blocks in Contact and Pulleys",
      intuition:
        "Draw each body and add the forces along its motion. A person in a lift feels the floor's push N = m(g + a) going up with acceleration a, m(g − a) going down; a spring balance reads the same way. Blocks pushed together share one acceleration F/(total mass), and the push on the far block is its own mass times that acceleration. In an Atwood machine, the net pull is the difference of the weights and the mass to accelerate is the total. Only frames moving at constant velocity are inertial: an accelerating train, a merry-go-round and a plane taking off are not. Gravity acts without contact; friction, normal reaction and viscosity need it.",
      definition:
        "- \\(\\sum F = ma\\). Lift: \\(N = m(g \\pm a)\\) (+ accelerating up).\n" +
        "- Down at g/3 reads 20 N ⇒ up at g/3 reads 40 N; stationary : down = 4 : 3 ⇒ a = g/4.\n" +
        "- Blocks in contact: \\(a = \\dfrac{F}{m_1 + m_2}\\), force on the far block \\(m_2a\\) (5 N on 6 + 4 kg ⇒ 2 N).\n" +
        "- Atwood with a rider m on one of two masses M: \\(a = \\dfrac{mg}{2M + m}\\).\n" +
        "- Cable of a lift accelerating up: \\(T = m(g + a)\\). Same force on two masses: \\(a = \\dfrac{A_1A_2}{A_1 + A_2}\\).",
      formula: {
        label: "Second law",
        latex: "\\sum \\vec{F} = m\\vec{a}, \\qquad N_{\\text{lift}} = m(g \\pm a)",
      },
      authoredExample: {
        prompt: "Masses of 3 kg and 5 kg hang over a smooth pulley. Acceleration and string tension? (g = 10 m/s²)",
        steps: ["a = (5 − 3)g/8 = 2.5 m/s².", "T = 3(g + a) = 37.5 N."],
        answer: "2.5 m/s²; 37.5 N",
      },
      selfCheckExample: {
        prompt: "A 60 kg man stands in a lift accelerating upward at 2 m/s². Reading of the weighing machine? (g = 10 m/s²)",
        steps: ["60 × (10 + 2)."],
        answer: "720 N",
      },
      practiceSet: [
        { prompt: "Which is in an inertial frame: a driver in a bus at constant velocity, or a child on a merry-go-round?", answer: "The bus driver" },
        { prompt: "Which is NOT a contact force: friction, normal reaction, gravity, viscous force?", answer: "Gravity" },
      ],
      pyqExampleId: "42ec956f-c7c7-4003-b434-f1d387f6ebbe",
      traps: [
        {
          title: "Subtracting a for a lift accelerating up",
          body:
            "Accelerating UPWARD (starting up, or slowing on the way down) the floor must push harder: N = m(g + a). The reading falls only when the acceleration points down.",
        },
        {
          title: "Using the applied force for the far block",
          body:
            "The push on the far block is only what accelerates it: m₂F/(m₁ + m₂). 5 N on a 6 kg and a 4 kg block gives 2 N on the 4 kg block.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-lm-force-work-power",
      name: "Force, Work, Power and Circular Dynamics",
      intuition:
        "With a vector force, work is F·r and power F·v; a time-varying force gives v by integrating F/m, then P = F·v at the instant asked. A constant force from rest gives a = F/m and v = at. In circular motion the net inward force is mv²/r: for a car on a flat road friction supplies it, so v_max = √(μrg); for a conical pendulum it is mg tan θ = mgr/√(L² − r²); for a bob released from horizontal, v² = 2gL at the bottom and T = mg + mv²/L = 3mg. A gun firing n bullets a second pushes back with n m v.",
      definition:
        "- \\(W = \\vec{F}\\cdot\\vec{r}\\), \\(P = \\vec{F}\\cdot\\vec{v}\\) (F = tî + 2t²ĵ, 1 kg, t = 3 s ⇒ 337.5 W).\n" +
        "- Flat curve: \\(v_{\\max} = \\sqrt{\\mu rg}\\) (half the speed ⇒ μ/4).\n" +
        "- Conical pendulum: \\(F_c = \\dfrac{mgr}{\\sqrt{L^2 - r^2}}\\).\n" +
        "- Released from horizontal: \\(T_{\\text{bottom}} = 3mg\\). Vertical circle: \\(T_{\\max} - T_{\\min} = 6mg\\).\n" +
        "- Gun recoil: \\(F = n\\,mv\\) (30 g at 1000 m/s, 300 N ⇒ 10 per second).",
      formula: {
        label: "Work and power",
        latex: "W = \\vec{F}\\cdot\\vec{r}, \\qquad P = \\vec{F}\\cdot\\vec{v}, \\qquad F_c = \\frac{mv^2}{r}",
      },
      authoredExample: {
        prompt: "A 2 kg body starts from rest under a force (4î + 2ĵ) N. Its speed after 5 s, and the power then?",
        steps: ["a = (2î + ĵ) m/s²; v = (10î + 5ĵ) m/s, speed 5√5 m/s.", "P = F·v = 40 + 10 = 50 W."],
        answer: "5√5 m/s; 50 W",
      },
      selfCheckExample: {
        prompt: "A force (2î + 3ĵ) N moves a body through (4î − ĵ) m. Work done?",
        steps: ["8 − 3."],
        answer: "5 J",
      },
      practiceSet: [
        { prompt: "A 1 kg body reaches 10 m/s from rest in 2 s. Power at t = 1 s?", answer: "25 W" },
      ],
      pyqExampleId: "6d6cec89-a9de-4c1f-b752-906726ae3336",
      traps: [
        {
          title: "Taking tension at the bottom as mg",
          body:
            "At the bottom the string must also supply the centripetal force: T = mg + mv²/L. Released from horizontal, that is 3mg.",
        },
        {
          title: "Using average power for power at an instant",
          body:
            "Power at an instant is F·v, and it grows as the body speeds up. A 1 kg body pushed from rest to 10 m/s in 2 s receives 25 W at t = 1 s but 50 W at t = 2 s.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-lm-retardation",
      name: "Braking, Penetration and Avoiding Collision",
      intuition:
        "A constant retarding force gives a constant deceleration, so v² = u² − 2as works. A bullet that halves its speed in 30 cm has lost three quarters of its kinetic energy there; the remaining quarter needs a third as much distance, 10 cm more. A faster car braking behind a slower one avoids collision if their relative speed reaches zero within the gap: s ≥ (v_A − v_B)²/2a. On a velocity–time graph the distance in any interval is the area under it.",
      definition:
        "- \\(v^2 = u^2 - 2as\\); penetration: V → V/2 in 30 cm ⇒ 10 cm more to stop.\n" +
        "- No collision: \\(s \\geq \\dfrac{(v_A - v_B)^2}{2a}\\).\n" +
        "- Distance from a v–t graph = area (last 2 s of a trapezium profile ⇒ 1/4 of the total).",
      formula: {
        label: "Uniform retardation",
        latex: "v^2 = u^2 - 2as, \\qquad s_{\\text{safe}} = \\frac{(v_A - v_B)^2}{2a}",
      },
      authoredExample: {
        prompt: "A bullet at 200 m/s slows to 100 m/s after 6 cm of wood. How much further does it go?",
        steps: ["Loses 3/4 of its KE in 6 cm; 1/4 remains.", "Further distance = 6/3 = 2 cm."],
        answer: "2 cm",
      },
      selfCheckExample: {
        prompt: "A car at 30 m/s stops in 90 m. Its deceleration?",
        steps: ["a = u²/2s = 900/180."],
        answer: "5 m/s²",
      },
      practiceSet: [
        { prompt: "Car A at v_A behind car B at v_B brakes with retardation a. No collision when?", answer: "s ≤ (v_A − v_B)²/2a" },
      ],
      pyqExampleId: "f5b563ca-3154-481e-ae75-bf21c2bb6bc7",
      traps: [
        {
          title: "Assuming speed falls linearly with distance",
          body:
            "Speed squared falls linearly with distance. Half the speed in 30 cm leaves only a quarter of the energy, which lasts 10 cm — not another 30 cm.",
        },
        {
          title: "Using each car's own stopping distance",
          body:
            "Whether two cars collide depends on their RELATIVE motion: the gap must cover (v_A − v_B)²/2a, not v_A²/2a.",
        },
      ],
    },
  ],
  related: [
    { label: "Momentum and Collisions", href: `${BASE}/cetp-lm-momentum` },
  ],
};
