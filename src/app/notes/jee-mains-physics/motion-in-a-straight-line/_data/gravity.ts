import type { SubtopicNote } from "@/app/notes/_types";

export const GRAVITY_SL_NOTE: SubtopicNote = {
  subtopicName: "Motion Under Gravity",
  title: "Motion Under Gravity",
  oneLineDefinition:
    "Near the ground every freely moving body has the same downward acceleration g, so the equations of motion apply with a = −g once up is taken as positive, whether the body is dropped, thrown up or thrown down.",
  whyItMatters:
    "Twenty-five PYQs, nine of them asking for a number, and four from 2026. Nine drop a body from rest, nine throw one up or down, and seven follow two bodies or a stream of drops at once. Fix the sign convention before writing anything: most wrong options come from a lost minus sign or a lost initial velocity.",
  concepts: [
    // C1 — dropped from rest
    {
      kind: "formula" as const,
      slug: "jpsl-free-fall",
      name: "Free fall from rest",
      intuition:
        "A body dropped from rest has u = 0 and gains g in speed every second. The distance fallen grows as t², so it covers most of its fall near the end: the second half of the height takes much less time than the first. To locate a point on the way down, find the speed there with v² = 2gh.",
      definition:
        "- Taking down as positive: \\(h = \\tfrac{1}{2}gt^{2}\\), \\(v = gt\\), \\(v = \\sqrt{2gh}\\).\n" +
        "- Distance in the nth second: \\(\\dfrac{g}{2}(2n - 1)\\); with g = 10 that is 5, 15, 25, 35 m.\n" +
        "- First and second halves of the height: \\(t_2 = (\\sqrt{2} - 1)\\,t_1\\).\n" +
        "- The speed equals g in number after 1 s, that is after falling \\(g/2\\) metres.\n" +
        "- Two points a known distance apart, passed in a known time: \\(d = v_At + \\tfrac{1}{2}gt^{2}\\) gives the speed at the upper point, then \\(h_A = v_A^{2}/2g\\).\n" +
        "- A ball dropped from \\(h_1\\) that rebounds to \\(h_2\\): it lands at \\(\\sqrt{2gh_1}\\) down and leaves at \\(\\sqrt{2gh_2}\\) up, so \\(\\Delta v\\) is their SUM; average acceleration \\(= \\Delta v/\\Delta t\\).\n" +
        "- A body moving sideways that drops something: the object falls for \\(\\sqrt{2h/g}\\) while the body moves on.",
      formula: {
        label: "Falling from rest",
        latex: "h = \\tfrac{1}{2}gt^{2} \\qquad v = gt \\qquad v = \\sqrt{2gh}",
      },
      authoredExample: {
        prompt:
          "A stone is dropped from a cliff 180 m high \\((g = 10\\ \\text{m/s}^{2})\\). Find the time of fall, the speed at the bottom and the distance covered in the last second.",
        steps: [
          "\\(180 = 5t^{2}\\), so \\(t = 6\\ \\text{s}\\).",
          "\\(v = gt = 60\\ \\text{m/s}\\).",
          "Last (6th) second: \\(\\dfrac{10}{2}(2 \\times 6 - 1) = 55\\ \\text{m}\\). Check: \\(180 - 5 \\times 25 = 55\\ \\text{m}\\).",
        ],
        answer: "6 s, \\(60\\ \\text{m/s}\\), 55 m",
      },
      selfCheckExample: {
        prompt:
          "A falling body takes 1 s to pass between two marks 55 m apart on a tall tower. How far below its starting point is the upper mark? \\((g = 10\\ \\text{m/s}^{2})\\)",
        steps: [
          "\\(55 = v_A(1) + 5(1)^{2}\\), so \\(v_A = 50\\ \\text{m/s}\\).",
          "\\(h_A = \\dfrac{v_A^{2}}{2g} = \\dfrac{2500}{20} = 125\\ \\text{m}\\).",
        ],
        answer: "125 m",
      },
      practiceSet: [
        { prompt: "Dropped from 20 m \\((g = 10)\\): time and speed at the ground?", answer: "2 s and \\(20\\ \\text{m/s}\\)" },
        { prompt: "A ball takes time t to fall the first half of a height. Time for the second half?", answer: "\\((\\sqrt{2} - 1)\\,t\\)" },
        { prompt: "Dropped from 5 m, a ball rebounds to 1.25 m; contact lasts 0.1 s \\((g = 10)\\). Average acceleration during contact?", answer: "\\(150\\ \\text{m/s}^{2}\\), upwards", method: "Down at 10 m/s, up at 5 m/s: \\(\\Delta v = 15\\ \\text{m/s}\\)." },
        { prompt: "Distance fallen from rest in the 3rd second \\((g = 10)\\)?", answer: "25 m" },
      ],
      pyqExampleId: "66e8c7d2-3b63-4566-82c8-41fb0faf470b", // 27 Jan 2024: two points 80 m apart passed in 2 s
      traps: [
        {
          title: "A rebound changes the sign of the velocity",
          body: "Down at 10 m/s and up at 5 m/s is a change of 15 m/s, not 5 m/s. Speeds add when the direction reverses.",
        },
        {
          title: "Using 9.8 when the stem gives 10",
          body: "Use the g the question states. The options are usually built on it, and the other value lands near a wrong option.",
        },
      ],
    },

    // C2 — thrown up or down
    {
      kind: "formula" as const,
      slug: "jpsl-thrown-up",
      name: "Thrown up or down: one equation for the whole flight",
      intuition:
        "With up taken as positive, a = −g for the whole flight: rising, at the top and falling. So one equation, s = ut − ½gt², covers the trip from launch to landing, and a landing point below the start is simply a negative s. A stone released from a rising balloon is not dropped from rest: it starts with the balloon's upward velocity.",
      definition:
        "- Up positive: \\(s = ut - \\tfrac{1}{2}gt^{2}\\), \\(v = u - gt\\), \\(v^{2} = u^{2} - 2gs\\).\n" +
        "- Time to the top \\(u/g\\); greatest height \\(u^{2}/2g\\); it passes the launch level again at speed u, going down.\n" +
        "- At the top \\(v = 0\\), so momentum is zero, but the acceleration is still g, downward.\n" +
        "- From a tower: thrown up lands after \\(t_1\\), thrown down with the same speed after \\(t_2\\), dropped after \\(\\sqrt{t_1t_2}\\).\n" +
        "- The two times at one height are the roots of \\(h = ut - \\tfrac{1}{2}gt^{2}\\); their product is \\(2h/g\\).\n" +
        "- Released from a body moving at v: the object starts at v, then a = −g.\n" +
        "- With a constant air drag f on mass m: \\(a_{up} = g + f/m\\), \\(a_{down} = g - f/m\\), and \\(\\dfrac{t_{up}}{t_{down}} = \\sqrt{\\dfrac{g - f/m}{g + f/m}}\\). The ascent is quicker.",
      formula: {
        label: "Whole flight, up positive",
        latex: "s = ut - \\tfrac{1}{2}gt^{2} \\qquad H = \\frac{u^{2}}{2g} \\qquad t_{drop} = \\sqrt{t_1t_2}",
      },
      authoredExample: {
        prompt:
          "A ball is thrown up at \\(20\\ \\text{m/s}\\) from the top of a 60 m tower \\((g = 10\\ \\text{m/s}^{2})\\). When does it hit the ground, and how high above the ground does it rise?",
        steps: [
          "The ground is 60 m below the start: \\(-60 = 20t - 5t^{2}\\).",
          "\\(t^{2} - 4t - 12 = 0\\), so \\((t - 6)(t + 2) = 0\\) and \\(t = 6\\ \\text{s}\\).",
          "Rise above the tower: \\(\\dfrac{400}{20} = 20\\ \\text{m}\\); above the ground \\(60 + 20 = 80\\ \\text{m}\\).",
        ],
        answer: "6 s; 80 m above the ground",
      },
      selfCheckExample: {
        prompt:
          "From the top of a tower, a ball thrown up reaches the ground in 8 s, and one thrown down at the same speed reaches it in 2 s. How long does a ball dropped from rest take, and how tall is the tower? \\((g = 10)\\)",
        steps: [
          "\\(t = \\sqrt{t_1t_2} = \\sqrt{16} = 4\\ \\text{s}\\).",
          "\\(h = \\tfrac{1}{2}(10)(16) = 80\\ \\text{m}\\). (The launch speed works out to \\(30\\ \\text{m/s}\\).)",
        ],
        answer: "4 s; 80 m",
      },
      practiceSet: [
        { prompt: "Thrown up at \\(40\\ \\text{m/s}\\) \\((g = 10)\\): time to the top and greatest height?", answer: "4 s and 80 m" },
        { prompt: "At the highest point, which is zero: velocity, acceleration or force?", answer: "Velocity (and so momentum)" },
        { prompt: "A 2 kg ball thrown up meets a constant 5 N air drag \\((g = 10)\\). Ratio of time up to time down?", answer: "\\(\\sqrt{3} : \\sqrt{5}\\)", method: "\\(a_{up} = 12.5\\), \\(a_{down} = 7.5\\)." },
        { prompt: "A balloon rises at \\(5\\ \\text{m/s}\\) and releases a sandbag. The sandbag's velocity at release?", answer: "\\(5\\ \\text{m/s}\\) upward" },
      ],
      pyqExampleId: "24a57594-6598-43d7-84ae-9f9874b2ff32", // 8 Apr 2026 Shift 2: stone dropped from a rising balloon
      traps: [
        {
          title: "Dropped from a moving body is not dropped from rest",
          body: "A stone let go from a balloon rising at 8 m/s first rises at 8 m/s. Taking u = 0 gives a shorter fall and the wrong answer.",
        },
        {
          title: "Zero velocity is not zero acceleration",
          body: "At the top the body is momentarily at rest, but gravity still acts. If a were zero there, the body would stay at the top.",
        },
        {
          title: "Splitting the flight when one equation will do",
          body: "Going up, then down, as two stages is slower and invites sign errors. With a = −g throughout, s = ut − ½gt² handles the whole flight in one line.",
        },
      ],
    },

    // C3 — two bodies, drops at intervals
    {
      kind: "formula" as const,
      slug: "jpsl-two-bodies",
      name: "Two bodies, or drops falling at regular intervals",
      intuition:
        "Write one position equation for each body, using each body's OWN elapsed time, then set the positions equal for a meeting. For drops leaving a tap at equal intervals, count intervals, not drops: when the first lands as the nth leaves, there are n − 1 intervals in one fall time. Because both bodies have the same acceleration g, their relative velocity stays constant.",
      definition:
        "- Body started \\(\\tau\\) later: its elapsed time is \\(t - \\tau\\).\n" +
        "- Meeting: equal positions. Two balls thrown up at u, \\(\\tau\\) apart, meet at \\(t = \\dfrac{u}{g} + \\dfrac{\\tau}{2}\\).\n" +
        "- Drops: the first lands as the nth begins, so the fall time T splits into \\(n - 1\\) equal intervals; the kth drop has fallen for \\(T - (k - 1)\\dfrac{T}{n - 1}\\).\n" +
        "- Juggler throwing n balls a second, each when the last is at the top: time up \\(= 1/n\\), height \\(= \\dfrac{g}{2n^{2}}\\).\n" +
        "- Two bodies in free fall: relative acceleration zero, so their gap changes at a constant rate.",
      formula: {
        label: "Later body's position",
        latex: "y_2 = u_2(t - \\tau) - \\tfrac{1}{2}g(t - \\tau)^{2}",
      },
      authoredExample: {
        prompt:
          "Drops fall from a tap 20 m above the floor at equal intervals. When the first drop hits the floor, the fifth begins to fall. Where are the second and third drops then? \\((g = 10\\ \\text{m/s}^{2})\\)",
        steps: [
          "Fall time: \\(20 = 5T^{2}\\), \\(T = 2\\ \\text{s}\\). Five drops make 4 intervals of 0.5 s.",
          "Second drop has fallen 1.5 s: \\(5(1.5)^{2} = 11.25\\ \\text{m}\\), so it is 8.75 m above the floor.",
          "Third drop has fallen 1 s: 5 m, so it is 15 m above the floor.",
        ],
        answer: "8.75 m and 15 m above the floor",
      },
      selfCheckExample: {
        prompt:
          "Two balls are thrown straight up at \\(30\\ \\text{m/s}\\), the second 1 s after the first \\((g = 10)\\). When and at what height do they meet?",
        steps: [
          "\\(30t - 5t^{2} = 30(t - 1) - 5(t - 1)^{2}\\) gives \\(0 = -35 + 10t\\), so \\(t = 3.5\\ \\text{s}\\). (Check: \\(3 + 0.5\\).)",
          "Height \\(= 30(3.5) - 5(3.5)^{2} = 105 - 61.25 = 43.75\\ \\text{m}\\).",
        ],
        answer: "At \\(t = 3.5\\ \\text{s}\\), 43.75 m up",
      },
      practiceSet: [
        { prompt: "A juggler throws 2 balls a second, each as the last reaches the top \\((g = 10)\\). Height reached?", answer: "1.25 m" },
        { prompt: "Stone A is dropped from 45 m; stone B is thrown down 1 s later and both land together \\((g = 10)\\). B's launch speed?", answer: "\\(12.5\\ \\text{m/s}\\)" },
        { prompt: "Two balls are dropped from one point 1 s apart \\((g = 10)\\). Their separation 2 s after the second is dropped?", answer: "25 m" },
        { prompt: "Drops leave a tap at equal intervals; the first lands as the third leaves. Where is the second drop, as a fraction of the height fallen?", answer: "It has fallen \\(\\tfrac{1}{4}\\) of the height" },
      ],
      pyqExampleId: "9f33cc89-6506-4661-ba22-02fe751b11f9", // 29 Jun 2022: ball B thrown down 2 s after ball A
      traps: [
        {
          title: "Counting drops instead of intervals",
          body: "If the first drop lands as the sixth begins, five intervals fit in one fall time, not six.",
        },
        {
          title: "Giving both bodies the same clock",
          body: "A body launched later has been moving for t − τ, not t. Using t for both makes them meet at the wrong moment.",
        },
      ],
    },
  ],
};
