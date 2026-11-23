import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_CYCLOTRON_NOTE: SubtopicNote = {
  subtopicName: "Cyclotron and Helical Motion",
  title: "Circular Motion, the Cyclotron and Helical Motion",
  oneLineDefinition:
    "Why a charge moving across a uniform magnetic field goes round a circle, the cyclotron formula, the cyclotron that uses it to accelerate ions, and the helix traced when the velocity is at an angle to the field.",
  whyItMatters:
    "11 questions. Six were set in board papers: draw a labelled diagram of a cyclotron (2016), find how often the electric field between the dees must be reversed (2018), find the radius and the oscillator frequency for 5 MeV protons (2019), and three one-mark MCQs on which particles a cyclotron accelerates (2024, 2026) and how the final energy depends on the exit radius (2025). The textbook adds the radius, frequency and energy of an electron, the mass of an alpha particle, and the energy of protons leaving a cyclotron.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-circular",
      name: "Circular and helical motion in a magnetic field",
      intuition:
        "When a charge moves straight across a uniform field, the magnetic force is always at right angles to its velocity and of the same size. That is exactly the push towards the centre that keeps a body on a circle, so the charge goes round at a steady speed. A faster charge goes round a bigger circle, and it takes the same time per round as a slower one. If the velocity has a part along the field as well, that part is untouched, so the circle is drawn out into a helix.",
      definition:
        "- For \\(\\vec{v} \\perp \\vec{B}\\), the magnetic force supplies the centripetal force: \\(qvB = \\dfrac{mv^2}{R}\\).\n" +
        "- So \\(mv = p = qBR\\) (the **cyclotron formula**) and the radius is \\(R = \\dfrac{mv}{qB}\\).\n" +
        "- Time for one revolution: \\(T = \\dfrac{2\\pi R}{v} = \\dfrac{2\\pi m}{qB}\\). Frequency of revolution (**cyclotron frequency**): \\(f_c = \\dfrac{qB}{2\\pi m}\\). Neither depends on the speed or the radius.\n" +
        "- **Helical motion:** if \\(\\vec{v}\\) has a component \\(v_{\\parallel}\\) along \\(\\vec{B}\\), the force on that component is zero, so it carries the particle along the field. The perpendicular component \\(v_{\\perp}\\) gives circular motion. Together the path is a **helix** about the field lines.",
      formula: {
        label: "Charge moving perpendicular to a uniform field",
        latex: "R = \\frac{mv}{qB}, \\qquad T = \\frac{2\\pi m}{qB}, \\qquad f_c = \\frac{qB}{2\\pi m}",
        symbols: [
          { symbol: "\\(R\\)", meaning: "radius of the circular path" },
          { symbol: "\\(m, q\\)", meaning: "mass and charge of the particle" },
          { symbol: "\\(T, f_c\\)", meaning: "period and frequency of revolution" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton moves on a circle of radius 0.5 m in a uniform magnetic field of 0.4 T. Find its speed and the time it takes for one revolution. (\\(m_p = 1.67 \\times 10^{-27}\\) kg, \\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: [
          "Given: \\(R = 0.5\\) m, \\(B = 0.4\\) T, \\(m = 1.67 \\times 10^{-27}\\) kg, \\(q = 1.6 \\times 10^{-19}\\) C.",
          "Speed: from \\(mv = qBR\\), \\(v = \\dfrac{qBR}{m} = \\dfrac{1.6 \\times 10^{-19} \\times 0.4 \\times 0.5}{1.67 \\times 10^{-27}} = 1.92 \\times 10^{7}\\) m/s.",
          "Period: \\(T = \\dfrac{2\\pi m}{qB} = \\dfrac{2 \\times 3.142 \\times 1.67 \\times 10^{-27}}{1.6 \\times 10^{-19} \\times 0.4} = 1.64 \\times 10^{-7}\\) s.",
        ],
        answer: "Speed \\(1.92 \\times 10^{7}\\) m/s; period \\(1.64 \\times 10^{-7}\\) s",
      },
      selfCheckExample: {
        prompt:
          "An electron and a proton move with equal momenta perpendicular to the same uniform magnetic field. Compare the radii of their paths.",
        steps: [
          "\\(R = \\dfrac{p}{qB}\\). Both have the same \\(p\\), the same size of charge \\(e\\), and the same \\(B\\).",
          "So the radii are equal (they curve in opposite senses, because the charges are opposite).",
        ],
        answer: "Equal radii, curving in opposite senses",
      },
      practiceSet: [
        { prompt: "The speed of a charged particle moving across a uniform magnetic field is doubled. What happens to its period of revolution?", answer: "It stays the same; \\(T = 2\\pi m/(qB)\\) does not depend on speed" },
        { prompt: "What is the path of a charged particle whose velocity makes an angle of 45° with a uniform magnetic field?", answer: "A helix about the field lines" },
        { prompt: "Write the cyclotron formula for the momentum of a charge moving on a circle of radius R in a field B.", answer: "\\(p = mv = qBR\\)" },
      ],
      pyqExampleId: "3ac791c0-8608-44ef-ba7a-1dbe3d2d4401",
      traps: [
        {
          title: "Thinking a faster particle goes round more often",
          body: "A faster particle goes round a bigger circle, so it takes exactly the same time per revolution. The period \\(2\\pi m/(qB)\\) has no \\(v\\) in it.",
        },
        {
          title: "Leaving kinetic energy in MeV or keV",
          body: "Convert to joules before using \\(\\tfrac{1}{2}mv^2\\): 1 eV \\(= 1.6 \\times 10^{-19}\\) J. Convert back at the end if the answer is asked in keV or MeV.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmg-cyclotron-working",
      name: "The cyclotron: construction and working",
      intuition:
        "A cyclotron uses the magnetic field to bring an ion back to the same gap again and again, and the electric field across that gap to give it a kick each time. Because the time for each half circle does not depend on the speed, an alternating voltage of one fixed frequency stays in step with the ion all the way out.",
      definition:
        "- **Working:** an ion from the source at the centre is accelerated across the gap into one dee. Inside the dee there is no electric field, so it moves on a semicircle and returns to the gap after time \\(T/2\\).\n" +
        "- By then the polarity of the dees has reversed, so the ion is accelerated again. Its kinetic energy rises by \\(qV\\) at every crossing (V = voltage across the gap), so the radius grows and the path is a spiral.\n" +
        "- **Resonance condition:** the frequency of the applied voltage equals the cyclotron frequency, \\(f_a = f_c = \\dfrac{qB}{2\\pi m}\\).\n" +
        "- At the largest radius the ions are deflected out through an exit slit as a high energy beam.\n" +
        "- A cyclotron accelerates only **charged** particles (protons, deuterons, α-particles). A neutron feels neither the electric nor the magnetic force.",
      table: {
        columns: ["Part", "What it does"],
        rows: [
          { cells: ["Two dees, \\(D_1\\) and \\(D_2\\)", "Hollow semicircular metal boxes with a narrow gap between their straight edges. Inside them the ion feels only the magnetic field"] },
          { cells: ["Uniform magnetic field", "Perpendicular to the plane of the dees; bends the ion into semicircles"] },
          { cells: ["High frequency oscillator", "Joined across the dees; reverses their polarity each time the ion reaches the gap"] },
          {
            cells: ["Ion source at the centre", "Supplies the positive ions to be accelerated"],
            pyqExampleId: "d8f20278-310b-487f-b233-82e78c2256ac",
            noteAmber: "Board 2024 and 2026 asked one-mark MCQs on what a cyclotron accelerates: charged particles only, never neutrons.",
          },
          { cells: ["Exit slit", "The ions are deflected out through it at the largest radius"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why does an ion in a cyclotron gain no energy while it is inside a dee?",
        steps: [
          "There is no electric field inside the hollow metal dee; the electric field acts only across the gap.",
          "The magnetic field does no work, so inside a dee the ion only changes direction.",
        ],
        answer: "No electric field acts inside a dee, and the magnetic force does no work",
      },
      practiceSet: [
        { prompt: "What is the shape of the path of an ion in a cyclotron?", answer: "A spiral made of semicircles of increasing radius" },
        { prompt: "By how much does the kinetic energy of an ion of charge q increase each time it crosses a gap with voltage V?", answer: "By \\(qV\\)" },
      ],
      traps: [
        {
          title: "A cyclotron diagram with parts missing",
          body: "The labelled diagram must show both dees with the gap, the oscillator joined across them, the ion source at the centre, the spiral path, the exit and the direction of \\(\\vec{B}\\). Each missing label costs part of the mark.",
        },
        {
          title: "Saying the magnetic field speeds the ion up",
          body: "Only the electric field across the gap increases the speed. The magnetic field just bends the ion back to the gap.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-cyclotron-energy",
      name: "Cyclotron frequency and the final energy",
      intuition:
        "The oscillator must flip the dees each time the ion finishes half a circle, so its frequency is fixed by the cyclotron frequency. The ion leaves at the rim, where its radius is largest, and since its speed is proportional to that radius, its energy grows with the square of the radius.",
      definition:
        "- Oscillator frequency: \\(f_a = f_c = \\dfrac{qB}{2\\pi m}\\). The ion crosses the gap twice per revolution, so the electric field between the dees must reverse once every **half period**, \\(T/2 = \\dfrac{\\pi m}{qB}\\).\n" +
        "- At the exit radius \\(R_{exit}\\): \\(v = \\dfrac{qBR_{exit}}{m}\\), so the final kinetic energy is \\(K = \\dfrac{1}{2}mv^2 = \\dfrac{q^2B^2R_{exit}^2}{2m}\\).\n" +
        "- So the final energy is proportional to the **square** of the exit radius.",
      formula: {
        label: "Cyclotron frequency and final kinetic energy",
        latex: "f_c = \\frac{qB}{2\\pi m}, \\qquad K = \\frac{q^2B^2R_{exit}^2}{2m}",
        symbols: [
          { symbol: "\\(f_c\\)", meaning: "cyclotron frequency, equal to the oscillator frequency" },
          { symbol: "\\(R_{exit}\\)", meaning: "radius of the outermost path, the radius of the dees" },
          { symbol: "\\(K\\)", meaning: "kinetic energy of the ions as they leave" },
        ],
      },
      authoredExample: {
        prompt:
          "A cyclotron with dees of radius 0.5 m uses a magnetic field of 0.8 T to accelerate protons. Find the frequency of the oscillator and the kinetic energy of the protons as they leave, in MeV. (\\(m_p = 1.67 \\times 10^{-27}\\) kg, \\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: [
          "Given: \\(R_{exit} = 0.5\\) m, \\(B = 0.8\\) T, \\(m = 1.67 \\times 10^{-27}\\) kg, \\(q = 1.6 \\times 10^{-19}\\) C.",
          "Frequency: \\(f = \\dfrac{qB}{2\\pi m} = \\dfrac{1.6 \\times 10^{-19} \\times 0.8}{2 \\times 3.142 \\times 1.67 \\times 10^{-27}} = 1.22 \\times 10^{7}\\) Hz \\(= 12.2\\) MHz.",
          "Energy: \\(K = \\dfrac{q^2B^2R^2}{2m} = \\dfrac{(1.6 \\times 10^{-19} \\times 0.8 \\times 0.5)^2}{2 \\times 1.67 \\times 10^{-27}} = 1.226 \\times 10^{-12}\\) J.",
          "In MeV: \\(\\dfrac{1.226 \\times 10^{-12}}{1.6 \\times 10^{-19}} = 7.66 \\times 10^{6}\\) eV \\(= 7.66\\) MeV.",
        ],
        answer: "12.2 MHz; 7.66 MeV",
      },
      selfCheckExample: {
        prompt:
          "The radius of the dees of a cyclotron is doubled while the magnetic field is kept the same. By what factor does the final kinetic energy of the protons change?",
        steps: ["\\(K \\propto R_{exit}^2\\).", "Doubling \\(R_{exit}\\) multiplies \\(K\\) by \\(2^2 = 4\\)."],
        answer: "It becomes 4 times as large",
      },
      practiceSet: [
        { prompt: "Does the cyclotron frequency depend on the speed of the ion?", answer: "No. \\(f_c = qB/(2\\pi m)\\)" },
        { prompt: "State the resonance condition of a cyclotron.", answer: "The frequency of the applied voltage equals the cyclotron frequency, \\(f_a = f_c\\)" },
        { prompt: "The magnetic field of a cyclotron is doubled. What happens to the cyclotron frequency?", answer: "It doubles" },
      ],
      pyqExampleId: "e2bf4831-4b9b-4c94-a672-c4e73f16ba9c",
      traps: [
        {
          title: "Reversing the field once per revolution",
          body: "The ion crosses the gap twice in each revolution, so the electric field must reverse every half period, \\(T/2\\). Giving \\(T\\) as the answer to 'how rapidly must the field be reversed' loses the mark.",
        },
        {
          title: "Using the speed when the frequency is asked",
          body: "The frequency \\(qB/(2\\pi m)\\) needs only the charge, mass and field. Bringing in the speed or the radius adds steps where an error can creep in.",
        },
      ],
    },
  ],
};
