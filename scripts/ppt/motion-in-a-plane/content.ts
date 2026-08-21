/**
 * Teaching decks for MH State Board Std XI Physics, Ch.3 "Motion in a Plane".
 *
 * SOURCE OF TRUTH is the printed chapter (`03. Motion in a Plane.pdf`, printed
 * pp.30-46). Every equation here was read off a RENDERED page, never the text
 * layer: that layer emits U+F072 for a vector arrow and U+F024 for a unit-vector
 * hat and scrambles equation order with control characters, so a displacement
 * equation extracts as "s x x x 2 1". Numbers in parentheses are the book's own
 * equation numbers, kept so a teacher can point at the page.
 *
 * SCOPE. The chapter runs 3.1 Introduction, 3.2 Rectilinear Motion, 3.3 Motion
 * in Two Dimensions (3.3.1-3.3.5) and 3.4 Uniform Circular Motion (3.4.1-3.4.2).
 * Rectilinear motion living INSIDE a chapter called "Motion in a Plane" is the
 * book's own choice, and the exam data agrees with it: 1-D equations-and-graphs
 * is the single largest bucket for both MHT-CET and NDA.
 *
 * Deliberately ABSENT, verified by searching the chapter text: banking of roads,
 * angular acceleration, non-uniform circular motion, vertical circular motion.
 * Those arrive in Ch.4 Laws of Motion / Std XII Rotational Dynamics, which is
 * why deck C ends with a forward pointer rather than a silent gap.
 */
import type { TeachingLine } from "@/lib/export/pptxBuilder";

export type AuthoredSlide =
  | { kind: "section"; title: string }
  | {
      kind: "teaching";
      title: string;
      badge?: string;
      lines: TeachingLine[];
      /** "warn" sets the title in dark red — a slide that is all traps. */
      tone?: "warn";
      /** Filename under ./figures, cropped from the printed page. */
      image?: string;
    }
  | { kind: "anchor"; id: string };

const b = (text: string): TeachingLine => ({ text, bullet: true });
const d = (text: string): TeachingLine => ({ text, display: true });
const n = (text: string): TeachingLine => ({ text, note: true });
const s = (text: string): TeachingLine => ({ text, strong: true, bullet: true });
/** A caution the student loses marks to. Dark red, and worded as a warning. */
const w = (text: string): TeachingLine => ({ text, warn: true, bullet: true });

// ————————————————————————————————————————————————————————————————
// DECK A — Rectilinear Motion (3.1-3.2) · taught before Unit Test 1
// ————————————————————————————————————————————————————————————————

export const DECK_A: AuthoredSlide[] = [
  {
    kind: "teaching",
    title: "Motion in a Plane — Part 1: Rectilinear Motion",
    badge: "MH State Board Std XI Physics · Chapter 3, sections 3.1-3.2",
    lines: [
      b("What motion is, and how we describe it with numbers"),
      b("Distance and displacement; speed and velocity; acceleration"),
      b("Reading motion off a graph"),
      b("The three equations of motion — derived, not memorised"),
      b("Free fall, and relative velocity along a line"),
    ],
  },
  {
    kind: "teaching",
    title: "Where this chapter is going",
    lines: [
      b("3.1 Introduction — the three kinds of motion"),
      s("3.2 Rectilinear motion — motion along a straight line  ← Part 1"),
      b("3.3 Motion in two dimensions — velocity, acceleration, relative velocity, projectile"),
      b("3.4 Uniform circular motion — angular speed, centripetal acceleration"),
      n("Sections 3.3 and 3.4 are Part 2, taught before the First Term exam."),
    ],
  },
  {
    kind: "teaching",
    title: "Why this chapter earns your time",
    badge: "Past-year questions in our bank, this chapter only",
    lines: [
      {
        text:
          "| Topic | JEE Mains | MHT-CET | NDA |\n|---|---|---|---|\n" +
          "| Straight-line motion and graphs | 103 | 20 | 18 |\n" +
          "| Projectile | 58 | 8 | 7 |\n" +
          "| Circular motion | 52 | 12 | 9 |\n" +
          "| Relative motion | — | 7 | — |",
      },
      s("Straight-line motion is the LARGEST bucket for MHT-CET and NDA."),
      n("JEE files those 103 questions under a separate chapter, but the physics is identical — and it is what Part 1 teaches."),
    ],
  },
  {
    kind: "teaching",
    title: "3.1 Three kinds of motion",
    lines: [
      b("Motion is a change in the position of an object with time"),
      s("Along a straight line — rectilinear motion"),
      s("In two dimensions — motion in a plane"),
      s("In three dimensions — motion in space"),
      n("A toy car pushed along a line; a cricket ball hit for a six; an aeroplane between two cities."),
    ],
  },
  {
    kind: "teaching",
    title: "Before we start — can you recall?",
    lines: [
      b("What is meant by motion?"),
      b("What is rectilinear motion?"),
      b("What is the difference between displacement and distance travelled?"),
      b("What is the difference between uniform and non-uniform motion?"),
    ],
  },
  {
    kind: "teaching",
    title: "Distance and displacement are different quantities",
    lines: [
      b("Distance (path length) — the total ground covered. A scalar; never negative"),
      b("Displacement — the straight-line change in position, from start to finish. A vector"),
      s("Walk 4 m forward then 3 m back: distance 7 m, displacement 1 m"),
      n("Along a line, direction is carried by a + or a − sign; in a plane we will need full vectors."),
    ],
  },
  {
    kind: "teaching",
    title: "Average velocity",
    lines: [
      b("Displacement divided by the time interval over which it happened"),
      d("\\(\\vec{v}_{av} = \\dfrac{\\vec{x}_2 - \\vec{x}_1}{t_2 - t_1}\\)   … (3.2)"),
      b("A vector — it inherits the direction of the displacement"),
      b("Dimensions \\([L^1 M^0 T^{-1}]\\)"),
      n("Book's example: x = +2 m at t = 0 and x = +4 m at t = 1 min gives 2 m/min along +x."),
    ],
  },
  {
    kind: "teaching",
    title: "Average speed",
    lines: [
      b("Total path length divided by the time interval"),
      d("average speed \\(= \\dfrac{\\text{path length}}{\\text{time interval}}\\)"),
      s("A SCALAR — it has no direction"),
      b("Same dimensions as velocity, \\([L^1 M^0 T^{-1}]\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "The trap: average speed is not the size of average velocity",
    tone: "warn",
    lines: [
      s("Average speed \\(\\neq |\\,\\vec{v}_{av}|\\) in general"),
      b("They agree only when the motion never reverses direction"),
      b("Reverse direction and displacement shrinks while path length keeps growing — so average speed becomes the LARGER of the two"),
      s("Run one full circle: displacement is zero, so average velocity is zero — but average speed is not"),
      n("Book's Example 3.1: P to Q then back to the midpoint R. Path 1.5 km, displacement 0.5 km, 14 min — 6.42 km/hr against 2.142 km/hr."),
    ],
  },
  {
    kind: "teaching",
    title: "Instantaneous velocity",
    lines: [
      b("The velocity at one instant — the limit of average velocity as the interval shrinks to zero"),
      d("\\(\\vec{v} = \\lim_{\\Delta t \\to 0}\\left(\\dfrac{\\Delta \\vec{x}}{\\Delta t}\\right) = \\dfrac{d\\vec{x}}{dt}\\)   … (3.3)"),
      b("On an x-t graph it is the slope of the tangent at that instant"),
    ],
  },
  {
    kind: "teaching",
    title: "Instantaneous speed",
    lines: [
      b("The limiting value of average speed as the interval goes to zero"),
      s("In that limit path length equals the magnitude of displacement"),
      s("So instantaneous speed is ALWAYS equal to \\(|\\vec{v}|\\)"),
      n("This is the one place where the speed/velocity distinction collapses — and it is worth saying out loud, because it is why the averages differ but the instantaneous values do not."),
    ],
  },
  {
    kind: "teaching",
    title: "Always remember",
    lines: [
      s("Uniform rectilinear motion (constant velocity along a line)"),
      b("Average and instantaneous velocities are equal"),
      b("Average and instantaneous speeds are equal, and equal \\(|\\vec{v}|\\)"),
      s("Non-uniform rectilinear motion"),
      b("Average and instantaneous velocities differ"),
      b("Average and instantaneous speeds differ"),
      b("Average speed differs from the magnitude of average velocity"),
    ],
  },
  {
    kind: "teaching",
    title: "Acceleration",
    lines: [
      b("The rate of change of velocity with time. A vector"),
      d("\\(\\vec{a}_{av} = \\dfrac{\\vec{v}_2 - \\vec{v}_1}{t_2 - t_1}\\)   … (3.4)"),
      d("\\(\\vec{a} = \\lim_{\\Delta t \\to 0}\\left(\\dfrac{\\Delta \\vec{v}}{\\Delta t}\\right) = \\dfrac{d\\vec{v}}{dt}\\)   … (3.5)"),
      b("Dimensions \\([L^1 M^0 T^{-2}]\\)"),
      s("Velocity can change by changing its SIZE or its DIRECTION — either one is acceleration"),
    ],
  },
  {
    kind: "teaching",
    title: "Reading position-time graphs",
    badge: "Figure 3.1 (a)-(e)",
    lines: [
      s("Slope of an x-t graph = velocity"),
      b("(a) Horizontal line — object at rest, slope zero"),
      b("(b) Straight line, positive slope — uniform velocity along +x"),
      b("(c) Straight line, negative slope — uniform velocity along −x"),
      b("(d) Zig-zag — oscillatory motion, direction flipping at fixed intervals"),
      b("(e) Curve — non-uniform motion; the slope, and so the velocity, changes"),
    ],
    image: "fig3_1_set.png",
  },
  {
    kind: "teaching",
    title: "Reading velocity-time graphs",
    badge: "Figure 3.2 (a)-(d)",
    lines: [
      s("Slope of a v-t graph = acceleration"),
      b("(a) Horizontal line — constant velocity, zero acceleration"),
      b("(b) Rising straight line — constant positive acceleration"),
      b("(c) Falling straight line — constant negative acceleration; speed drops uniformly"),
      b("(d) Curve — non-uniform acceleration; use the tangent"),
    ],
    image: "fig3_2_set.png",
  },
  {
    kind: "teaching",
    title: "Area under a velocity-time graph",
    lines: [
      s("The area between \\(t_1\\) and \\(t_2\\) is the DISPLACEMENT over that interval"),
      d("\\(\\text{Area} = \\int_{t_1}^{t_2} v\\,dt = \\int_{t_1}^{t_2} \\dfrac{dx}{dt}\\,dt = x(t_2) - x(t_1)\\)   … (3.6)"),
      b("True whether the acceleration is uniform or not"),
      w("Caution: this only works if the velocity axis starts at zero"),
      n("The book states that caveat explicitly. A graph whose v-axis is cut off will give you the wrong area."),
    ],
  },
  {
    kind: "teaching",
    title: "Always remember — graphs",
    lines: [
      s("Uniform acceleration"),
      b("The v-t graph is a straight line"),
      b("Area under v-t between two instants = displacement"),
      b("Slope of v-t = acceleration"),
      s("Non-uniform acceleration"),
      b("The v-t graph is curved"),
      b("Area still gives displacement"),
      b("Instantaneous acceleration = slope of the TANGENT at that point"),
    ],
  },
  {
    kind: "teaching",
    title: "Deriving the equations of motion — the setup",
    badge: "Figure 3.3 · graphical derivation",
    lines: [
      b("Take \\(x = 0\\) at \\(t = 0\\); velocity \\(u\\) at \\(t=0\\) and \\(v\\) at time \\(t\\)"),
      b("Uniform acceleration, so the v-t graph is the straight line AB"),
      s("Acceleration is the slope of AB"),
      d("\\(a = \\dfrac{v - u}{t - 0} = \\dfrac{v-u}{t}\\)"),
      n("Everything that follows comes from this one line and from 'area = displacement'. Nothing is memorised."),
    ],
    image: "fig3_3.png",
  },
  {
    kind: "teaching",
    title: "First equation of motion",
    lines: [
      b("Rearranging the slope relation directly:"),
      d("\\(\\boxed{v = u + at}\\)   … (3.7)"),
      b("Velocity after time \\(t\\), for constant acceleration"),
      n("Vector notation is dropped here because the motion is along one line — a sign carries the direction."),
    ],
  },
  {
    kind: "teaching",
    title: "Second equation of motion",
    lines: [
      b("Displacement = area of quadrilateral OABD = triangle ABC + rectangle OACD"),
      d("\\(s = \\tfrac{1}{2}(v-u)t + ut\\)"),
      b("Substituting \\(v - u = at\\) from (3.7):"),
      d("\\(\\boxed{s = ut + \\tfrac{1}{2}at^{2}}\\)   … (3.8)"),
    ],
  },
  {
    kind: "teaching",
    title: "Third equation of motion",
    lines: [
      b("With constant acceleration the velocity rises linearly, so use the average:"),
      d("\\(s = v_{av}\\,t = \\left(\\dfrac{v+u}{2}\\right)t = \\dfrac{(v+u)(v-u)}{2a}\\)"),
      d("\\(\\boxed{v^{2} - u^{2} = 2as}\\)   … (3.9)"),
      s("Use this one whenever time is neither given nor asked for"),
    ],
  },
  {
    kind: "teaching",
    title: "The three equations — and when to reach for each",
    lines: [
      d("\\(v = u + at\\)   \\(\\quad\\) \\(s = ut + \\tfrac{1}{2}at^{2}\\)   \\(\\quad\\) \\(v^{2} - u^{2} = 2as\\)"),
      b("No displacement in the question — use the first"),
      b("No final velocity — use the second"),
      b("No time — use the third"),
      w("All three assume the acceleration is CONSTANT. If it is not, go back to calculus"),
    ],
  },
  {
    kind: "teaching",
    title: "Free fall",
    lines: [
      b("A body released from rest and falling only under gravity"),
      b("Air resistance is the only other force, and over a few metres it is small enough to neglect"),
      s("Acceleration is \\(g\\), vertical, and constant over distances small compared with the Earth's radius"),
      s("So free fall is uniform rectilinear motion with uniform acceleration — the same three equations apply"),
      n("Fix a sign convention before you start and hold it for the whole problem. Most sign errors in this topic are convention errors, not physics errors."),
    ],
  },
  {
    kind: "teaching",
    title: "Do you know? The 1 : 3 : 5 : 7 rule",
    lines: [
      b("Start from rest with uniform acceleration and take equal time intervals \\(t_0\\)"),
      b("With \\(A = \\tfrac{1}{2}g\\): first interval \\(d_1 = At_0^{2}\\)"),
      d("\\(d_2 = A(4t_0^{2} - t_0^{2}) = 3At_0^{2} = 3d_1\\)"),
      d("\\(d_3 = A(9t_0^{2} - 4t_0^{2}) = 5At_0^{2} = 5d_1\\)"),
      s("Distances in successive equal intervals are in the ratio 1 : 3 : 5 : 7 …"),
      n("True for ANY rectilinear motion starting from rest with positive uniform acceleration — not only for free fall."),
    ],
  },
  {
    kind: "teaching",
    title: "Worked example — a stone up and a ball down",
    badge: "Book Example 3.2",
    lines: [
      b("A stone is thrown up at 15 m/s; at the same instant a ball is dropped from 30 m directly above it. Where and when do they meet? Take \\(g = 10\\) m/s²"),
      d("\\(s_{\\text{stone}} = 15t_0 - \\tfrac{1}{2}gt_0^{2}\\)   \\(\\qquad\\) \\(s_{\\text{ball}} = \\tfrac{1}{2}gt_0^{2}\\)"),
      b("They meet when the two distances add to 30 m:"),
      d("\\(15t_0 - \\tfrac{1}{2}gt_0^{2} + \\tfrac{1}{2}gt_0^{2} = 30 \\;\\Rightarrow\\; t_0 = 2\\ \\text{s}\\)"),
      d("\\(s_{\\text{stone}} = 15(2) - \\tfrac{1}{2}(10)(2)^{2} = 10\\ \\text{m}\\)"),
      s("The \\(g\\) terms cancel — the meeting time never depended on gravity at all"),
    ],
  },
  {
    kind: "teaching",
    title: "Relative velocity along a line",
    lines: [
      b("The velocity of A as seen by an observer moving with B"),
      d("\\(v_{AB} = v_A - v_B\\)   … (3.10)   \\(\\qquad\\) \\(v_{BA} = v_B - v_A\\)   … (3.11)"),
      s("Equal in magnitude, opposite in direction"),
      b("Two trains on parallel tracks: same direction and the other seems slow; opposite directions and it flashes past"),
      n("The separation between two objects grows in proportion to their relative velocity — which is exactly what 'overtaking' means."),
    ],
  },
  {
    kind: "teaching",
    title: "Worked example — two aeroplanes",
    badge: "Book Example 3.3",
    lines: [
      b("A flies at 300 km/hr; B flies in the OPPOSITE direction at 350 km/hr. Find \\(v_{AB}\\)"),
      d("\\(v_{AB} = v_A - v_B = 300 - (-350) = 650\\ \\text{km/hr}\\)"),
      b("A third plane C flies parallel to A with \\(v_{CA} = 100\\) km/hr. Then"),
      d("\\(v_C = v_{CA} + v_A = 100 + 300 = 400\\ \\text{km/hr}\\)"),
      s("The whole method is one sign convention, applied consistently"),
    ],
  },
  { kind: "section", title: "Practice — past-year questions" },
  // Chosen to drill the slides just taught, in teaching order, and filtered to
  // questions answerable with THIS chapter alone.
  { kind: "anchor", id: "f6d82fdd-adf3-4c84-b1d0-d44d38f82d31" }, // 1:3:5:7 ratio
  { kind: "anchor", id: "269ba1aa-d608-407b-a212-cb29c237dc26" }, // v² − u² = 2as
  { kind: "anchor", id: "b62c11b7-7955-4ce6-8ddb-b782716a03c7" }, // average speed trap
  { kind: "anchor", id: "27b08077-0ae0-4ff1-bc25-9c62c3d3ddf6" }, // graph of v = u + at
  { kind: "anchor", id: "d041eedf-5aeb-4789-b6af-5cfd4e6db41c" }, // free fall, sign convention
  { kind: "anchor", id: "9ce41d9a-0fb3-492a-b3d5-50f4fd0d9a02" }, // relative velocity, 1-D
  { kind: "section", title: "Summary" },
  {
    kind: "teaching",
    title: "Part 1 in one slide",
    lines: [
      b("Distance is a scalar and a path; displacement is a vector between two points"),
      b("Average speed \\(\\neq |\\vec{v}_{av}|\\); instantaneous speed \\(= |\\vec{v}|\\) always"),
      b("Slope of x-t is velocity; slope of v-t is acceleration; area under v-t is displacement"),
      d("\\(v = u + at\\) \\(\\quad\\) \\(s = ut + \\tfrac{1}{2}at^{2}\\) \\(\\quad\\) \\(v^{2} - u^{2} = 2as\\)"),
      b("Free fall is this same motion with \\(a = g\\); successive-interval distances go 1 : 3 : 5 : 7"),
      b("Relative velocity along a line is a subtraction: \\(v_{AB} = v_A - v_B\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "Homework",
    badge: "From the chapter's own exercises",
    lines: [
      s("Theory"),
      b("2(ii) Define average and instantaneous velocity. When are they the same?"),
      b("2(iii) Define free fall"),
      b("2(iv) If \\(x = f(t)\\), write the formulae for instantaneous velocity and acceleration"),
      b("2(vi) Derive the equations of motion graphically for uniform acceleration"),
      s("Problems"),
      b("3(i) aeroplane, 500 m runway, 30 s from rest — find take-off velocity"),
      b("3(ii) car at 120 km/hr stopped in 100 m — find retardation and time"),
      b("3(iii) three-leg journey — find the average speed"),
      b("3(iv) read the v-t graph: initial speed, maximum speed, zero-acceleration part, constant-retardation part, distance in the first 6 s"),
      b("3(vii) metro train A-B-C — plot the v-t graph and find both distances"),
    ],
  },
];

// ————————————————————————————————————————————————————————————————
// DECK B — Motion in Two Dimensions (3.3) · Part 2a
// ————————————————————————————————————————————————————————————————

export const DECK_B: AuthoredSlide[] = [
  {
    kind: "teaching",
    title: "Motion in a Plane — Part 2: Motion in Two Dimensions",
    badge: "MH State Board Std XI Physics · Chapter 3, section 3.3",
    lines: [
      b("Position, velocity and acceleration when direction can change"),
      b("Equations of motion in a plane — and the idea that makes them easy"),
      b("Relative velocity in two dimensions"),
      b("Projectile motion: time of flight, range, maximum height, trajectory"),
    ],
  },
  {
    kind: "teaching",
    title: "What we borrow from Chapter 2",
    badge: "Vectors — revision only, one slide",
    lines: [
      b("A vector in the plane splits into components: \\(\\vec{A} = A_x\\hat{i} + A_y\\hat{j}\\)"),
      b("Magnitude \\(A = \\sqrt{A_x^{2} + A_y^{2}}\\), direction \\(\\tan\\theta = A_y/A_x\\)"),
      b("Addition is component-wise; \\(\\hat{i}\\) and \\(\\hat{j}\\) are unit vectors along the axes"),
      s("Every definition from section 3.2 stays valid — each quantity simply gains components"),
      n("If this is shaky, revisit Chapter 2 sections 2.2-2.4 before going on. JEE alone asks 42 questions on it."),
    ],
  },
  {
    kind: "teaching",
    title: "Position and displacement in a plane",
    badge: "Figure 3.4(a)",
    lines: [
      b("Position of a point needs BOTH coordinates, carried by a position vector"),
      d("\\(\\vec{r}_1 = x_1\\hat{i} + y_1\\hat{j}\\)   … (3.12)   \\(\\qquad\\) \\(\\vec{r}_2 = x_2\\hat{i} + y_2\\hat{j}\\)   … (3.13)"),
      d("\\(\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (x_2-x_1)\\hat{i} + (y_2-y_1)\\hat{j}\\)   … (3.14)"),
      s("Displacement is the vector PQ, not the length of the curve from P to Q"),
    ],
    image: "fig3_4a.png",
  },
  {
    kind: "teaching",
    title: "Average and instantaneous velocity in a plane",
    badge: "Figure 3.4(b)",
    lines: [
      d("\\(\\vec{v}_{av} = \\dfrac{\\Delta\\vec{r}}{\\Delta t} = (v_{av})_x\\hat{i} + (v_{av})_y\\hat{j}\\)   … (3.15)"),
      d("\\(v_{av} = \\sqrt{(v_{av})_x^{2} + (v_{av})_y^{2}}\\), \\(\\;\\tan\\theta = (v_{av})_y/(v_{av})_x\\)   … (3.17)"),
      d("\\(\\vec{v} = \\dfrac{d\\vec{r}}{dt} = \\dfrac{dx}{dt}\\hat{i} + \\dfrac{dy}{dt}\\hat{j}\\)   … (3.18)"),
      s("Instantaneous velocity is along the TANGENT to the path"),
      d("\\(\\tan\\theta = \\dfrac{dy/dt}{dx/dt} = \\dfrac{dy}{dx}\\)   … (3.20)"),
    ],
    image: "fig3_4b.png",
  },
  {
    kind: "teaching",
    title: "Acceleration in a plane",
    lines: [
      d("\\(\\vec{a}_{av} = \\left(\\dfrac{v_{2x}-v_{1x}}{t_2-t_1}\\right)\\hat{i} + \\left(\\dfrac{v_{2y}-v_{1y}}{t_2-t_1}\\right)\\hat{j}\\)   … (3.21)"),
      d("\\(\\vec{a} = \\dfrac{d\\vec{v}}{dt} = \\dfrac{d^{2}x}{dt^{2}}\\hat{i} + \\dfrac{d^{2}y}{dt^{2}}\\hat{j}\\)   … (3.25), (3.26)"),
      b("Components \\(a_x = d^{2}x/dt^{2}\\) and \\(a_y = d^{2}y/dt^{2}\\)   … (3.27)"),
      s("Unlike in 1-D, acceleration need not point along the velocity — and when it does not, the path bends"),
    ],
  },
  {
    kind: "teaching",
    title: "Deriving the equations of motion in a plane",
    lines: [
      b("Initial velocity \\(\\vec{u}\\) at \\(t=0\\), velocity \\(\\vec{v}\\) at time \\(t\\), constant \\(\\vec{a}\\)"),
      d("\\(\\vec{a} = \\dfrac{\\vec{v}-\\vec{u}}{t-0} \\;\\Rightarrow\\; \\boxed{\\vec{v} = \\vec{u} + \\vec{a}t}\\)   … (3.30)"),
      b("And with \\(\\vec{v}_{av} = \\tfrac{\\vec{u}+\\vec{v}}{2}\\):"),
      d("\\(\\vec{s} = \\left(\\dfrac{\\vec{u}+\\vec{u}+\\vec{a}t}{2}\\right)t \\;\\Rightarrow\\; \\boxed{\\vec{s} = \\vec{u}t + \\tfrac{1}{2}\\vec{a}t^{2}}\\)   … (3.31)"),
      s("Identical in form to (3.7) and (3.8) — only now they are vector equations"),
    ],
  },
  {
    kind: "teaching",
    title: "…and resolving them into components",
    lines: [
      d("\\(v_x = u_x + a_x t\\)   … (3.32)   \\(\\qquad\\) \\(v_y = u_y + a_y t\\)   … (3.33)"),
      d("\\(s_x = u_x t + \\tfrac{1}{2}a_x t^{2}\\)   … (3.34)   \\(\\qquad\\) \\(s_y = u_y t + \\tfrac{1}{2}a_y t^{2}\\)   … (3.35)"),
      b("(3.32) and (3.34) involve ONLY x-quantities; (3.33) and (3.35) only y-quantities"),
      s("So the two sets are independent and can be solved separately"),
    ],
  },
  {
    kind: "teaching",
    title: "The central idea of this chapter",
    lines: [
      s("Motion in two dimensions can be resolved into two INDEPENDENT motions in mutually perpendicular directions"),
      b("The x-motion is controlled entirely by \\(u_x\\) and \\(a_x\\); the y-motion entirely by \\(u_y\\) and \\(a_y\\)"),
      b("Neither knows anything about the other"),
      s("A two-dimensional problem becomes two one-dimensional problems — and you already solved those in Part 1"),
      n("Everything left in this chapter is an application of this one sentence."),
    ],
  },
  {
    kind: "teaching",
    title: "Relative velocity in a plane",
    lines: [
      d("\\(\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B\\)   … (3.36)   \\(\\qquad\\) \\(\\vec{v}_{BA} = \\vec{v}_B - \\vec{v}_A\\)   … (3.37)"),
      b("Same definition as along a line — but now it is a vector subtraction, so draw the triangle"),
      s("\\(|\\vec{v}_{AB}| = |\\vec{v}_{BA}|\\), and the directions are opposite"),
      s("Chain rule: \\(\\vec{v}_{AZ} = \\vec{v}_{AB} + \\vec{v}_{BC} + \\vec{v}_{CD} + \\dots + \\vec{v}_{YZ}\\)"),
      n("Note the order of subscripts: A→B→C→…→Z. Getting that order right is most of the marks."),
    ],
  },
  {
    kind: "teaching",
    title: "Worked example — aeroplane in a crosswind",
    badge: "Book Example 3.6",
    lines: [
      b("A plane flies north at 300 km/hr relative to the Earth; the wind blows from east to west at 100 km/hr. Find the plane's velocity relative to the wind"),
      d("\\(\\vec{v}_{AW} = \\vec{v}_{AE} - \\vec{v}_{WE} = 100\\hat{i} + 300\\hat{j}\\)"),
      d("\\(|\\vec{v}_{AW}| = \\sqrt{10000 + 90000} = 100\\sqrt{10}\\ \\text{km/hr}\\)"),
      d("\\(\\theta = \\tan^{-1}(300/100) = 71.6^{\\circ}\\) north of east"),
      n("Taking north along +y from the start is what keeps the signs straight."),
    ],
  },
  {
    kind: "teaching",
    title: "3.3.5 Projectile motion",
    badge: "JEE 58 · MHT-CET 8 · NDA 7 questions in our bank",
    lines: [
      b("Any object in flight after being thrown is a projectile"),
      s("Horizontally: no force, so \\(a_x = 0\\) and \\(v_x\\) never changes"),
      s("Vertically: \\(a_y = -g\\), constant and downward"),
      b("Air resistance is neglected unless a question says otherwise"),
      s("This is the independence idea doing all the work: constant-velocity motion in x, free fall in y"),
    ],
  },
  {
    kind: "teaching",
    title: "Components of a projectile",
    badge: "Figure 3.5",
    lines: [
      b("Launched at speed \\(u\\), angle \\(\\theta\\) to the horizontal, from the origin"),
      d("\\(v_x = u_x = u\\cos\\theta\\)   … (3.38)   \\(\\qquad\\) \\(v_y = u\\sin\\theta - gt\\)   … (3.39)"),
      d("\\(s_x = (u\\cos\\theta)t\\)   … (3.40)   \\(\\qquad\\) \\(s_y = (u\\sin\\theta)t - \\tfrac{1}{2}gt^{2}\\)   … (3.41)"),
      d("\\(\\tan\\alpha = v_y(t)/v_x(t)\\)   … (3.42)"),
      w("At the highest point \\(v_y = 0\\), but \\(v_x = u\\cos\\theta\\) still — the speed there is not zero"),
    ],
    image: "fig3_5.png",
  },
  {
    kind: "teaching",
    title: "Time of flight",
    lines: [
      b("At the top, \\(t = t_0\\) and \\(v_y = 0\\). From (3.39):"),
      d("\\(0 = u\\sin\\theta - gt_0 \\;\\Rightarrow\\; t_0 = \\dfrac{u\\sin\\theta}{g}\\)   … (3.43)"),
      b("The trajectory is symmetric, so going up takes as long as coming down"),
      d("\\(\\boxed{T = 2t_0 = \\dfrac{2u\\sin\\theta}{g}}\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "Horizontal range",
    lines: [
      b("The horizontal velocity is constant, so range is simply \\(u_x\\) times the whole flight time:"),
      d("\\(R = u_x T = u\\cos\\theta \\cdot \\dfrac{2u\\sin\\theta}{g} = \\dfrac{u^{2}(2\\sin\\theta\\cos\\theta)}{g}\\)"),
      d("\\(\\boxed{R = \\dfrac{u^{2}\\sin 2\\theta}{g}}\\)   … (3.44)"),
      b("Maximum when \\(\\sin 2\\theta = 1\\), i.e. \\(2\\theta = 90^{\\circ}\\), \\(\\theta = 45^{\\circ}\\)"),
      d("\\(R_{max} = \\dfrac{u^{2}}{g}\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "Maximum height",
    lines: [
      b("The vertical distance covered in time \\(t_0\\). From (3.41):"),
      d("\\(H = u\\sin\\theta\\left(\\dfrac{u\\sin\\theta}{g}\\right) - \\tfrac{1}{2}g\\left(\\dfrac{u\\sin\\theta}{g}\\right)^{2}\\)"),
      d("\\(\\boxed{H = \\dfrac{u^{2}\\sin^{2}\\theta}{2g} = \\dfrac{u_y^{2}}{2g}}\\)   … (3.45)"),
      s("H depends only on the VERTICAL component — a horizontally-thrown object has \\(H = 0\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "Deriving the trajectory",
    lines: [
      b("Eliminate \\(t\\) between (3.40) and (3.41). From (3.40), \\(t = \\dfrac{x}{u\\cos\\theta}\\)"),
      d("\\(y = (u\\sin\\theta)\\left(\\dfrac{x}{u\\cos\\theta}\\right) - \\tfrac{1}{2}g\\left(\\dfrac{x}{u\\cos\\theta}\\right)^{2}\\)"),
      d("\\(\\boxed{y = (\\tan\\theta)x - \\dfrac{1}{2}\\left(\\dfrac{g}{u^{2}\\cos^{2}\\theta}\\right)x^{2}}\\)   … (3.46)"),
    ],
  },
  {
    kind: "teaching",
    title: "…so the path is a parabola",
    lines: [
      b("For a given launch, \\(u\\) and \\(\\theta\\) are constants, so (3.46) has the form"),
      d("\\(y = Ax + Bx^{2}\\)   … (3.47)"),
      s("which is the equation of a parabola"),
      b("Read a trajectory in this form and you can recover the launch: \\(A = \\tan\\theta\\) gives the angle, then \\(B\\) gives \\(u\\)"),
      n("A parabola is the curve got by cutting a cone with a plane parallel to its side — the book's own aside."),
    ],
  },
  {
    kind: "teaching",
    title: "Projectile traps worth naming",
    tone: "warn",
    lines: [
      s("Acceleration at the top is NOT zero — it is \\(g\\), downward, the whole flight"),
      s("Speed at the top is NOT zero — it is \\(u\\cos\\theta\\)"),
      s("\\(\\theta\\) and \\((90^{\\circ}-\\theta)\\) give the SAME range, since \\(\\sin 2\\theta\\) is unchanged"),
      b("…but the two have different times of flight and different maximum heights"),
      s("R and H are not independent: \\(R = 4H\\cot\\theta\\), so \\(R = H\\) forces \\(\\tan\\theta = 4\\)"),
      b("Launching from a height breaks the up/down symmetry — go back to (3.41) rather than using \\(T = 2u\\sin\\theta/g\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "Do you know? What air resistance changes",
    lines: [
      b("Everything above assumes gravity is the only influence. In reality it never is"),
      s("Time of ascent and descent are no longer equal: \\(t_a > t_d\\)"),
      s("The best angle for maximum range is greater than \\(45^{\\circ}\\)"),
      s("And the range is much less than \\(u^{2}/g\\)"),
      n("Worth saying to a class once: the clean formulas are a model, and the model has named limits."),
    ],
  },
  {
    kind: "teaching",
    title: "Worked example — stone with given components",
    badge: "Book Example 3.7",
    lines: [
      b("\\(u_y = 20\\) m/s, \\(u_x = 15\\) m/s, \\(g = 10\\) m/s². Find position and velocity after 3 s, then \\(H\\) and \\(R\\)"),
      d("\\(v_x = 15\\), \\(\\;v_y = 20 - 10(3) = -10\\) m/s (downward)"),
      d("\\(v = \\sqrt{15^{2}+10^{2}} = \\sqrt{325} = 18.03\\ \\text{m/s}\\), \\(\\;\\alpha = \\tan^{-1}(2/3) = 33^{\\circ}41'\\)"),
      d("\\(s_x = 45\\ \\text{m}\\), \\(\\; s_y = 20(3) - 5(3)^{2} = 15\\ \\text{m}\\)"),
      d("\\(H = \\dfrac{20^{2}}{2(10)} = 20\\ \\text{m}\\), \\(\\quad R = \\dfrac{2u_xu_y}{g} = \\dfrac{2(15)(20)}{10} = 60\\ \\text{m}\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "Formula board — motion in a plane",
    lines: [
      d("\\(\\vec{v} = \\vec{u} + \\vec{a}t\\)   \\(\\qquad\\) \\(\\vec{s} = \\vec{u}t + \\tfrac{1}{2}\\vec{a}t^{2}\\)"),
      d("\\(\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B\\)"),
      d("\\(T = \\dfrac{2u\\sin\\theta}{g}\\) \\(\\quad\\) \\(R = \\dfrac{u^{2}\\sin 2\\theta}{g}\\) \\(\\quad\\) \\(H = \\dfrac{u^{2}\\sin^{2}\\theta}{2g}\\)"),
      d("\\(y = (\\tan\\theta)x - \\dfrac{g}{2u^{2}\\cos^{2}\\theta}x^{2}\\)"),
      b("\\(R_{max} = u^{2}/g\\) at \\(\\theta = 45^{\\circ}\\)"),
    ],
  },
  { kind: "section", title: "Practice — past-year questions" },
  { kind: "anchor", id: "8cc33a26-adae-4ee0-aa43-332bb4c5a87d" }, // 2-D motion from coordinates
  { kind: "anchor", id: "aa1de5a9-34e8-473b-a78c-7debbb8a7679" }, // relative velocity, river
  { kind: "anchor", id: "b04462ef-26ed-4d9f-84e2-0efaedfc7e0d" }, // read a trajectory equation
  { kind: "anchor", id: "37b2b9b7-ece9-44e5-9ca1-b7dd92761df5" }, // angle for R = H
  { kind: "anchor", id: "f62d6515-bbd3-442b-858b-2dc867013fbb" }, // H and R_max linked
  { kind: "anchor", id: "cfec546a-ad71-4be3-982b-968fd8fc8cd7" }, // horizontal projectile
  { kind: "section", title: "Summary" },
  {
    kind: "teaching",
    title: "Part 2a in one slide",
    lines: [
      b("Position, velocity and acceleration all gain components; every 1-D definition survives"),
      s("A plane motion is two independent perpendicular motions — this is the whole chapter"),
      b("Relative velocity is a vector subtraction; mind the subscript order in the chain rule"),
      b("A projectile is constant-velocity motion in x and free fall in y, nothing more"),
      b("\\(T\\), \\(R\\) and \\(H\\) all follow from that; the path is a parabola"),
      b("Complementary angles share a range but not a height or a flight time"),
    ],
  },
  {
    kind: "teaching",
    title: "Homework",
    badge: "From the chapter's own exercises",
    lines: [
      s("Theory"),
      b("2(v) Derive the equations of motion for a particle in a plane, and show the motion resolves into two independent perpendicular motions"),
      b("2(vii) Derive the range and maximum height of a projectile launched from the origin at angle \\(\\theta\\)"),
      b("2(viii) Show that the path of a projectile is a parabola"),
      s("Problems"),
      b("3(v) a man throws a ball a maximum horizontal distance of 80 m — find the maximum height he can throw it to"),
      b("3(vi) projectile at \\(v_0\\), angle \\(\\theta\\), onto a plane inclined at \\(\\alpha\\) — find the range along the incline"),
      b("3(viii) train 10 m/s east, waiter 1.2 m/s east, fly 2 m/s north across the tray — find the fly's velocity relative to the Earth"),
    ],
  },
];

// ————————————————————————————————————————————————————————————————
// DECK C — Uniform Circular Motion (3.4) · Part 2b
// ————————————————————————————————————————————————————————————————

export const DECK_C: AuthoredSlide[] = [
  {
    kind: "teaching",
    title: "Motion in a Plane — Part 2: Uniform Circular Motion",
    badge: "MH State Board Std XI Physics · Chapter 3, section 3.4",
    lines: [
      b("What makes circular motion uniform"),
      b("Period, angular speed, and how they relate to linear speed"),
      b("Centripetal acceleration — derived from the position vector"),
      b("Centripetal force, and the conical pendulum"),
    ],
  },
  {
    kind: "teaching",
    title: "3.4 What uniform circular motion is",
    badge: "JEE 52 · MHT-CET 12 · NDA 9 questions in our bank",
    lines: [
      b("An object moving with CONSTANT SPEED along a circular path"),
      s("Possible only if the velocity stays tangential and never changes in magnitude"),
      s("Two requirements: a tangential velocity, and a centripetal force of constant magnitude"),
      b("Example: the Moon around the Earth, held by a gravitational pull of fixed size"),
    ],
  },
  {
    kind: "teaching",
    title: "Why the acceleration must point at the centre",
    lines: [
      b("Changing direction requires an acceleration — so UCM is accelerated motion, despite the constant speed"),
      s("If the acceleration had any component ALONG the velocity, it would change the speed"),
      b("…and then the motion would no longer be uniform"),
      s("So the acceleration must be (i) perpendicular to the velocity, (ii) of constant magnitude, and (iii) always directed towards the centre"),
      s("Such an acceleration is called centripetal — 'centre-seeking'"),
    ],
  },
  {
    kind: "teaching",
    title: "Period, frequency and angular speed",
    lines: [
      b("Period \\(T\\) — the time for one full revolution, covering a distance \\(2\\pi r\\)"),
      d("\\(v = \\dfrac{\\text{distance}}{\\text{time}} = \\dfrac{2\\pi r}{T}\\)   … (3.48)"),
      b("The radius vector sweeps equal angles in equal times. Angular speed is the angle swept per unit time"),
      d("\\(\\omega = \\dfrac{\\text{angle}}{\\text{time}} = \\dfrac{2\\pi}{T} = \\dfrac{v}{r}\\)   … (3.49)"),
      s("So \\(v = \\omega r\\). The unit of \\(\\omega\\) is radian/second"),
    ],
  },
  {
    kind: "teaching",
    title: "Deriving centripetal acceleration — the setup",
    badge: "Figure 3.6",
    lines: [
      b("Particle P in UCM, anticlockwise, radius \\(r\\), angular speed \\(\\omega\\), starting on the +x axis"),
      b("At time \\(t\\) the radius vector makes angle \\(\\theta = \\omega t\\) with the x-axis, so \\(d\\theta/dt = \\omega\\)"),
      b("Its components are \\(r\\cos\\theta\\) and \\(r\\sin\\theta\\):"),
      d("\\(\\vec{r} = r\\cos(\\omega t)\\hat{i} + r\\sin(\\omega t)\\hat{j}\\)   … (3.50)"),
      n("Both \\(r\\) and \\(\\omega\\) are constants — only the angle changes with time. That is what makes the differentiation clean."),
    ],
    image: "fig3_6.png",
  },
  {
    kind: "teaching",
    title: "…differentiate once for velocity",
    lines: [
      d("\\(\\vec{v} = \\dfrac{d\\vec{r}}{dt} = r\\left(-\\omega\\sin(\\omega t)\\hat{i} + \\omega\\cos(\\omega t)\\hat{j}\\right)\\)"),
      d("\\(= r\\omega\\left(-\\sin(\\omega t)\\hat{i} + \\cos(\\omega t)\\hat{j}\\right)\\)   … (3.51)"),
      b("Its magnitude is \\(r\\omega\\), constant — as uniform circular motion requires"),
      n("Dot this with \\(\\vec{r}\\) and you get zero: the velocity really is perpendicular to the radius."),
    ],
  },
  {
    kind: "teaching",
    title: "…and again for acceleration",
    lines: [
      d("\\(\\vec{a} = \\dfrac{d\\vec{v}}{dt} = r\\omega\\left(-\\omega\\cos(\\omega t)\\hat{i} - \\omega\\sin(\\omega t)\\hat{j}\\right)\\)"),
      d("\\(= -\\omega^{2}\\left(r\\cos(\\omega t)\\hat{i} + r\\sin(\\omega t)\\hat{j}\\right) = \\boxed{-\\omega^{2}\\vec{r}}\\)   … (3.52)"),
      s("The minus sign is the physics: the acceleration is opposite to \\(\\vec{r}\\), i.e. towards the centre"),
      d("\\(\\boxed{a = \\omega^{2}r = \\dfrac{v^{2}}{r} = \\omega v}\\)   … (3.53)"),
    ],
  },
  {
    kind: "teaching",
    title: "Centripetal force",
    lines: [
      b("The force producing this acceleration must point the same way — towards the centre"),
      d("\\(\\vec{F} = m\\vec{a} = -m\\omega^{2}\\vec{r}\\)   … (3.54)"),
      d("\\(|\\vec{F}| = m\\omega^{2}r = \\dfrac{mv^{2}}{r} = m\\omega v\\)   … (3.55)"),
      s("Centripetal force is a ROLE, not a new kind of force — gravity, tension or friction fills it"),
    ],
  },
  {
    kind: "teaching",
    title: "Circular motion traps",
    tone: "warn",
    lines: [
      s("Constant speed does not mean constant velocity — the direction changes every instant"),
      s("So UCM is accelerated motion, and \\(\\vec{a}\\) is never zero"),
      b("Over one full revolution, displacement is zero — so average velocity is zero while the speed never was"),
      s("\\(\\Delta\\vec{v}\\) points towards the centre; it is not along the motion"),
      b("A quarter turn changes velocity by \\(\\sqrt{2}\\,v\\) in magnitude, not by zero"),
      n("The word 'centrifugal' has not appeared in this chapter, and it should not appear in your answers here."),
    ],
  },
  {
    kind: "teaching",
    title: "The conical pendulum",
    badge: "Figure 3.7",
    lines: [
      b("A bob on a string of length \\(l\\) revolving in a HORIZONTAL circle, the string sweeping a cone"),
      b("Only two forces act: gravity \\(mg\\) down, and tension \\(\\vec{T}\\) along the string"),
      s("Resolve the tension. Vertically there is no motion, so \\(T\\cos\\theta = mg\\)"),
      s("Horizontally, \\(T\\sin\\theta\\) is the whole centripetal force: \\(T\\sin\\theta = \\dfrac{mv^{2}}{r}\\)"),
      n("This is the chapter's one genuinely dynamical result — and it is examined, so it is in scope."),
    ],
    image: "fig3_7.png",
  },
  {
    kind: "teaching",
    title: "…deriving its period",
    lines: [
      b("Divide the two equations:"),
      d("\\(\\tan\\theta = \\dfrac{T\\sin\\theta}{T\\cos\\theta} = \\dfrac{mv^{2}/r}{mg} = \\dfrac{v^{2}}{rg}\\)"),
      b("Substitute \\(v = 2\\pi r/T\\):"),
      d("\\(\\tan\\theta = \\dfrac{4\\pi^{2}r^{2}}{T^{2}rg} \\;\\Rightarrow\\; T = 2\\pi\\sqrt{\\dfrac{r}{g\\tan\\theta}}\\)"),
      b("With \\(r = l\\sin\\theta\\), and then \\(h = l\\cos\\theta\\):"),
      d("\\(\\boxed{T = 2\\pi\\sqrt{\\dfrac{l\\cos\\theta}{g}} = 2\\pi\\sqrt{\\dfrac{h}{g}}}\\)   … (3.56)"),
    ],
  },
  {
    kind: "teaching",
    title: "Worked examples",
    badge: "Book Examples 3.8 and 3.9",
    lines: [
      b("3.8 — a 50 g object in UCM with \\(\\omega = 5\\) rad/s and \\(v = 25\\) m/s. Find \\(r\\) and the centripetal force"),
      d("\\(r = v/\\omega = 25/5 = 5\\ \\text{m}\\)"),
      d("\\(F = \\dfrac{mv^{2}}{r} = \\dfrac{0.05 \\times 25^{2}}{5} = 6.25\\ \\text{N}\\)"),
      s("Convert the mass to kilograms before the last line — 50 g is 0.05 kg"),
    ],
  },
  {
    kind: "teaching",
    title: "Formula board — uniform circular motion",
    lines: [
      d("\\(v = \\dfrac{2\\pi r}{T} = \\omega r\\)   \\(\\qquad\\) \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi f\\)"),
      d("\\(a = \\omega^{2}r = \\dfrac{v^{2}}{r} = \\omega v\\), directed towards the centre"),
      d("\\(F = m\\omega^{2}r = \\dfrac{mv^{2}}{r}\\)"),
      d("Conical pendulum: \\(T = 2\\pi\\sqrt{\\dfrac{l\\cos\\theta}{g}}\\)"),
    ],
  },
  {
    kind: "teaching",
    title: "What this chapter does NOT cover",
    lines: [
      b("Searching the chapter text finds no mention of any of these:"),
      s("Banking of roads"),
      s("Vertical circular motion, and the tension in the string"),
      s("Angular acceleration and non-uniform circular motion"),
      b("They need Newton's laws and a free-body diagram, which is Chapter 4 — and rotational dynamics in Std XII"),
      n("Said out loud because a JEE paper WILL ask them under the heading 'circular motion'. You are not missing anything; they simply come next."),
    ],
  },
  { kind: "section", title: "Practice — past-year questions" },
  { kind: "anchor", id: "2220737b-e9eb-49c2-a9a6-080b8bfb5fc3" }, // ω and v from frequency
  { kind: "anchor", id: "74c6a0dc-59f8-40a7-b0e3-a1465368b3a6" }, // comparing angular speeds
  { kind: "anchor", id: "45888d72-09c0-4273-8e92-562f63211906" }, // Δv over a quarter turn
  { kind: "anchor", id: "67e758f2-8830-42aa-b997-0d6275c41f15" }, // average acceleration
  { kind: "section", title: "Summary" },
  {
    kind: "teaching",
    title: "Part 2b in one slide",
    lines: [
      b("UCM = constant speed on a circle; needs a tangential velocity and a constant-magnitude centripetal force"),
      b("\\(\\omega = 2\\pi/T = v/r\\), so \\(v = \\omega r\\)"),
      s("Differentiating \\(\\vec{r}\\) twice gives \\(\\vec{a} = -\\omega^{2}\\vec{r}\\) — the minus sign IS the 'towards the centre'"),
      b("\\(a = v^{2}/r\\) and \\(F = mv^{2}/r\\); centripetal force is a role filled by a real force"),
      b("Conical pendulum: \\(T = 2\\pi\\sqrt{l\\cos\\theta/g}\\)"),
      b("Banking, vertical circles and angular acceleration belong to Chapter 4 and Std XII"),
    ],
  },
  {
    kind: "teaching",
    title: "Homework",
    badge: "From the chapter's own exercises",
    lines: [
      s("Theory"),
      b("2(ix) What is a conical pendulum? Show that its period is \\(2\\pi\\sqrt{l\\cos\\theta/g}\\)"),
      b("2(x) Define angular velocity. Show that the centripetal force on a particle in UCM is \\(-m\\omega^{2}\\vec{r}\\)"),
      s("Problems"),
      b("3(ix) a car moves in a circle at a constant 50 m/s, one revolution in 40 s — find the magnitude of its acceleration"),
      b("Revise the whole chapter against the Part 1 and Part 2a summaries before the First Term exam"),
    ],
  },
];
