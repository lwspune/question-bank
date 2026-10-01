import type { SubtopicNote } from "@/app/notes/_types";

export const MOMENTUM_LOM_NOTE: SubtopicNote = {
  subtopicName: "Newton's Second Law, Impulse and Variable Mass",
  title: "Newton's Second Law, Impulse and Variable Mass",
  oneLineDefinition:
    "The net force on a body is the rate at which its momentum changes: ma when the mass is fixed, an impulse when the force acts briefly, and v dm/dt when mass is gained or thrown off.",
  whyItMatters:
    "Sixteen PYQs, all multiple choice, and none from 2026. Four apply F = ma directly: a sum of force vectors, a balloon that drops ballast, a monkey on a rope. Five are impulse questions: a catch, a bounce, a bullet that embeds, a mass dropped onto a moving body. Seven are variable-mass questions: a rocket, a machine gun, a conveyor belt, a water jet. Every one of them is F = dp/dt read a different way.",
  concepts: [
    // C1 — F = ma as a vector and along a rope
    {
      kind: "formula" as const,
      slug: "jplom-second-law",
      name: "Second law as a vector and along a rope",
      intuition:
        "Add every force on the body as a vector, then divide by its mass. For a body on a rope, pick up as positive: the rope must pull harder than the weight only when the acceleration points up. The direction of motion does not matter; the direction of the acceleration does.",
      definition:
        "- \\(\\vec F_{\\text{net}} = m\\vec a\\): add the forces component by component, then divide by m.\n" +
        "- If three forces balance and one is removed, the other two add to minus the removed one, so \\(a = F_{\\text{removed}}/m\\), pointing opposite to it.\n" +
        "- Body on a rope, up positive: \\(T - mg = ma\\). Accelerating up, \\(T = m(g + a)\\); accelerating down, \\(T = m(g - a)\\); steady speed, \\(T = mg\\).\n" +
        "- Balloon: the upthrust F does not change when ballast is dropped. \\(F - Mg = Ma\\), then \\(F - (M - x)g = (M - x)a'\\), so \\(x = \\dfrac{M(a' - a)}{g + a'}\\).",
      formula: {
        label: "Second law",
        latex: "\\vec F_{\\text{net}} = m\\vec a, \\qquad T = m(g \\pm a)",
      },
      authoredExample: {
        prompt:
          "A 40 kg boy climbs a rope that breaks above 600 N. Find the tension when (a) he climbs up with acceleration \\(3\\ \\text{m/s}^{2}\\) and (b) he slides down with acceleration \\(2\\ \\text{m/s}^{2}\\). What is the largest upward acceleration the rope allows? (g = 10 m/s²)",
        steps: [
          "(a) The acceleration is up: \\(T = m(g + a) = 40(10 + 3) = 520\\) N. This is below 600 N, so the rope holds.",
          "(b) The acceleration is down: \\(T = m(g - a) = 40(10 - 2) = 320\\) N.",
          "Largest upward acceleration: \\(600 = 40(10 + a)\\), so \\(a = 5\\ \\text{m/s}^{2}\\).",
        ],
        answer: "(a) 520 N; (b) 320 N; at most \\(5\\ \\text{m/s}^{2}\\) upward.",
      },
      selfCheckExample: {
        prompt:
          "Two forces \\(\\vec F_1 = (3\\hat i + 2\\hat j - \\hat k)\\) N and \\(\\vec F_2 = (\\hat i + 4\\hat j + 5\\hat k)\\) N act on a 2 kg body. Find its acceleration and the size of the acceleration.",
        steps: [
          "\\(\\vec F_{\\text{net}} = 4\\hat i + 6\\hat j + 4\\hat k\\) N.",
          "\\(\\vec a = \\vec F_{\\text{net}}/2 = 2\\hat i + 3\\hat j + 2\\hat k\\ \\text{m/s}^{2}\\).",
          "\\(|\\vec a| = \\sqrt{4 + 9 + 4} = \\sqrt{17}\\).",
        ],
        answer: "\\((2\\hat i + 3\\hat j + 2\\hat k)\\ \\text{m/s}^{2}\\); \\(\\sqrt{17} \\approx 4.1\\ \\text{m/s}^{2}\\).",
      },
      practiceSet: [
        { prompt: "Forces of 6 N, 8 N and 10 N keep a 4 kg body at rest. The 10 N force is removed. Acceleration?", answer: "\\(2.5\\ \\text{m/s}^{2}\\), opposite to the removed force" },
        { prompt: "A balloon of total mass 300 kg rises with acceleration \\(2\\ \\text{m/s}^{2}\\). How much ballast must be dropped to make it \\(5\\ \\text{m/s}^{2}\\)? (g = 10 m/s²)", answer: "60 kg" },
        { prompt: "A 60 kg load is lowered on a rope with a downward acceleration of \\(1\\ \\text{m/s}^{2}\\). Tension? (g = 10 m/s²)", answer: "540 N" },
        { prompt: "A 5 kg body moves up on a rope at a steady 2 m/s. Tension? (g = 10 m/s²)", answer: "50 N" },
      ],
      pyqExampleId: "3e488787-1c80-416a-b53b-ffcd54ae53f9", // 2022: monkey climbing down at 4 then up at 5 m/s²
      traps: [
        {
          title: "Steady climbing needs only mg",
          body: "A rope pulls harder than the weight only when the acceleration points up. Climbing at a steady speed, up or down, the tension is mg. It is the upward acceleration that adds ma.",
        },
        {
          title: "The upthrust stays the same when ballast is dropped",
          body: "A balloon's upthrust depends on its volume, not on its load. Keep F fixed and change only the mass. Scaling F with the mass gives one of the wrong options.",
        },
        {
          title: "A removed force leaves its opposite",
          body: "If three forces balance and one is taken away, the net force is that force reversed. With 10 N removed from a 5 kg body, a = 2 m/s². The other two forces' sizes do not enter.",
        },
      ],
    },

    // C2 — impulse and momentum conservation
    {
      kind: "formula" as const,
      slug: "jplom-impulse",
      name: "Impulse and change of momentum",
      intuition:
        "A brief force is measured by what it does to momentum: average force × contact time = change in momentum. Stopping a ball takes away mv. Sending it back at the same speed takes away mv and then gives mv the other way, so the change is 2mv. When no outside force acts along the motion, momentum is conserved instead.",
      definition:
        "- Impulse \\(\\vec J = \\vec F_{\\text{avg}}\\,\\Delta t = \\Delta \\vec p\\). It is a vector.\n" +
        "- Catch (the ball stops): \\(|\\Delta p| = mv\\).\n" +
        "- Rebound from speed v to speed v′ the other way: \\(|\\Delta p| = m(v + v')\\); same speed back gives 2mv.\n" +
        "- Third law: the ball pushes the hand, or the wall, with the same force the hand or wall pushes the ball.\n" +
        "- No outside horizontal force: momentum is conserved. Mass m dropped onto M moving at v: \\(v' = \\dfrac{Mv}{M + m}\\). A bullet that embeds: \\(v' = \\dfrac{mu}{m + M}\\).",
      formula: {
        label: "Impulse–momentum",
        latex: "F_{\\text{avg}}\\,\\Delta t = \\Delta p, \\qquad |\\Delta p|_{\\text{rebound}} = m(v + v')",
      },
      authoredExample: {
        prompt:
          "A 0.2 kg ball hits a wall at 15 m/s and comes back at 10 m/s. The contact lasts 0.04 s. Find the average force on the ball.",
        steps: [
          "The velocity reverses, so the speeds add: \\(|\\Delta p| = 0.2(15 + 10) = 5\\ \\text{kg m/s}\\).",
          "\\(F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{5}{0.04} = 125\\) N, away from the wall.",
          "By the third law the ball pushes the wall with 125 N too.",
        ],
        answer: "125 N",
      },
      selfCheckExample: {
        prompt:
          "A fielder catches a 0.4 kg ball moving at 5 m/s, stopping it in 0.05 s. What force does the ball exert on the hand?",
        steps: [
          "\\(\\Delta p = 0.4 \\times 5 = 2\\ \\text{kg m/s}\\).",
          "\\(F = 2/0.05 = 40\\) N; the ball pushes the hand with the same size of force.",
        ],
        answer: "40 N",
      },
      practiceSet: [
        { prompt: "A 1500 kg truck rolls at 4 m/s. A 500 kg load is dropped straight into it. New speed?", answer: "3 m/s" },
        { prompt: "A 2 kg body's velocity changes from \\(3\\hat i\\) m/s to \\(4\\hat j\\) m/s. Size of the impulse?", answer: "10 N s" },
        { prompt: "A 0.05 kg bullet at 300 m/s embeds in a 2.95 kg block on a floor with μ = 0.3. How far does the block slide? (g = 10 m/s²)", answer: "\\(25/6 \\approx 4.2\\) m" },
        { prompt: "A ball of mass m hits a wall at speed v and stops dead. Impulse on it?", answer: "mv, away from the wall" },
      ],
      pyqExampleId: "f4817275-4fbe-4f40-81b1-f962a0b2d410", // 2022: ball bounces back at the same speed, F = 100 N, contact time
      traps: [
        {
          title: "A rebound doubles the change",
          body: "Bouncing back at the same speed, Δp = 2mv. Using mv, the value for a catch, halves the force or doubles the time, and that wrong answer is always an option.",
        },
        {
          title: "Kinetic energy is not conserved when mass is added",
          body: "A load dropped onto a moving truck, or a bullet that embeds, keeps the momentum but loses kinetic energy. Use momentum for the new speed, then energy or kinematics for what follows.",
        },
      ],
    },

    // C3 — variable mass
    {
      kind: "formula" as const,
      slug: "jplom-variable-mass",
      name: "Variable mass: rockets, guns, belts and jets",
      intuition:
        "When mass is thrown off or picked up, the force is the momentum carried per second: speed × mass per second. A rocket pushes gas back and the gas pushes the rocket forward. A belt must bring each grain of sand up to its own speed, so it must keep pushing even at constant velocity.",
      definition:
        "- Thrust \\(F = v_{\\text{rel}}\\dfrac{dm}{dt}\\).\n" +
        "- Rocket at lift-off: \\(v_{\\text{rel}}\\dfrac{dm}{dt} - mg = ma\\).\n" +
        "- Machine gun firing n bullets of mass m a second at speed v: \\(F = nmv\\).\n" +
        "- Jet stopped by a wall: \\(\\dfrac{dm}{dt} = \\rho Av\\), so \\(F = \\rho Av^{2}\\).\n" +
        "- Conveyor belt at constant speed v: \\(F = v\\dfrac{dm}{dt}\\) and \\(P = Fv = v^{2}\\dfrac{dm}{dt}\\). Half of P becomes the sand's kinetic energy; half is lost as heat while it slips.\n" +
        "- If \\(\\dfrac{dm}{dt} \\propto v^{n}\\), then \\(F \\propto v^{n+1}\\) and \\(P \\propto v^{n+2}\\).",
      formula: {
        label: "Force from a mass flow",
        latex: "F = v_{\\text{rel}}\\frac{dm}{dt}, \\qquad P_{\\text{belt}} = v^{2}\\frac{dm}{dt}",
      },
      authoredExample: {
        prompt:
          "Sand falls at 2 kg/s onto a belt moving at 3 m/s. Find the extra force and power needed to keep the belt at 3 m/s, and the rate at which the sand gains kinetic energy.",
        steps: [
          "\\(F = v\\dfrac{dm}{dt} = 3 \\times 2 = 6\\) N.",
          "\\(P = Fv = 6 \\times 3 = 18\\) W.",
          "Kinetic energy gained per second: \\(\\tfrac{1}{2}\\dfrac{dm}{dt}v^{2} = \\tfrac{1}{2}(2)(9) = 9\\) W.",
          "The other 9 W is heat, from the sand slipping on the belt.",
        ],
        answer: "6 N and 18 W; the sand gains 9 W of kinetic energy.",
      },
      selfCheckExample: {
        prompt:
          "A rocket of mass 2000 kg ejects gas at 400 m/s relative to itself. At what rate must it burn fuel to rise with an initial acceleration of \\(10\\ \\text{m/s}^{2}\\)? (g = 10 m/s²)",
        steps: [
          "\\(400\\dfrac{dm}{dt} - 2000(10) = 2000(10)\\).",
          "\\(400\\dfrac{dm}{dt} = 40000\\), so \\(\\dfrac{dm}{dt} = 100\\ \\text{kg/s}\\).",
        ],
        answer: "100 kg/s",
      },
      practiceSet: [
        { prompt: "A gun fires 20 bullets a second, each 25 g, at 400 m/s. Force needed to hold it?", answer: "200 N" },
        { prompt: "A water jet of cross-section 5 cm² hits a wall at 10 m/s and stops. Force on the wall? (density 1000 kg/m³)", answer: "50 N" },
        { prompt: "Sand falls on a belt at a rate proportional to the belt's speed v. How does the power depend on v?", answer: "\\(P \\propto v^{3}\\)" },
        { prompt: "Gas leaves a 500 kg body at 200 m/s relative to it, at 5 kg/s, in deep space. Its acceleration?", answer: "\\(2\\ \\text{m/s}^{2}\\)" },
      ],
      pyqExampleId: "d6eb07a1-e078-43d1-b741-852dd35b45b6", // 2025: dm/dt ∝ √v on a belt, P² ∝ v⁵
      traps: [
        {
          title: "Belt power is v² dm/dt, not half of it",
          body: "The kinetic energy the sand gains each second is ½v² dm/dt, but the belt must supply twice that: the other half is lost as heat while the sand slips. The power asked for is Fv.",
        },
        {
          title: "A jet's force has v twice",
          body: "The mass arriving per second, ρAv, itself grows with speed, so F = ρAv². Doubling the jet speed quadruples the force.",
        },
        {
          title: "A rocket's thrust must also lift its weight",
          body: "At lift-off, v_rel dm/dt − mg = ma. Setting the thrust equal to ma alone gives a burn rate that is too small.",
        },
      ],
    },
  ],
};
