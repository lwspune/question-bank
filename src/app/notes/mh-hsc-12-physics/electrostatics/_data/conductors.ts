import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_CONDUCTORS_NOTE: SubtopicNote = {
  subtopicName: "Conductors, Insulators and Dielectrics",
  title: "Conductors, Dielectrics and the Van de Graaff Generator",
  oneLineDefinition:
    "How a conductor behaves in an electrostatic field and why it shields its inside, polar and non-polar dielectrics and their polarisation, and the Van de Graaff generator.",
  whyItMatters:
    "6 questions. Four were set in board papers: polar and non-polar dielectrics (2022) and polar and non-polar molecules (2026), a labelled diagram of the Van de Graaff generator (2024), and four uses of the Van de Graaff generator (2025). The textbook adds why a car is safe in lightning and what a metal plate does between the plates of a capacitor.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpes-conductors",
      name: "Conductors in electrostatics and electrostatic shielding",
      intuition:
        "A metal is full of free electrons. Put it in a field and they rush about until their own field cancels the outside field everywhere inside the metal. Once they settle, the inside of the conductor has no field and no charge, and all the excess charge sits on the outer surface. That is why a hollow metal box keeps whatever is inside it free of outside fields.",
      definition:
        "- **Free charges:** in a metal the outermost electrons are loosely bound and move freely; they drift opposite to an applied field. **Bound charges:** the nuclei and inner electrons, held in place. An insulator has no free charges, so its charges are all bound.\n" +
        "- **Electrostatic shielding:** a delicate instrument placed inside a hollow conductor is protected from outside fields, because E = 0 there. A car does this for its passengers in a thunderstorm; MRI rooms are shielded the same way.\n" +
        "- A metal plate of thickness t placed between capacitor plates a distance d apart has no field inside it, so the capacitance rises to \\(C = \\dfrac{\\varepsilon_0 A}{d - t}\\). The dielectric constant of a conductor is infinite.",
      table: {
        columns: ["Property of a conductor", "What it means"],
        rows: [
          { cells: ["Field inside", "The net electrostatic field in the interior is zero"] },
          { cells: ["Potential", "The potential is the same throughout the conductor and on its surface"] },
          { cells: ["Charge inside", "The interior carries no charge; any excess charge sits on the outer surface"] },
          { cells: ["Field at the surface", "Just outside, the field is perpendicular to the surface at every point"] },
          { cells: ["Surface charge density", "It can be different at different points of the surface"] },
          {
            cells: ["Shielding", "The cavity of a hollow conductor has no field, so a closed metal body such as a car protects what is inside"],
            pyqExampleId: "5a5a176e-19ea-45af-8026-6354959117d2",
            noteAmber: "The textbook exercise asks you to justify why a car is the safest place in lightning: use this property.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "An air capacitor has plates 4 mm apart and a capacitance of 6 pF. A metal plate 2 mm thick, of the same area, is slid in between the plates without touching them. Find the new capacitance.",
        steps: [
          "The field inside the metal is zero, so only the air gap \\(d - t = 4 - 2 = 2\\) mm counts.",
          "\\(C' = C \\times \\dfrac{d}{d - t} = 6 \\times \\dfrac{4}{2} = 12\\) pF.",
        ],
        answer: "12 pF",
      },
      practiceSet: [
        { prompt: "Where does the charge given to a hollow conductor reside?", answer: "On its outer surface" },
        { prompt: "What is the dielectric constant of a conductor?", answer: "Infinite" },
        { prompt: "What name is given to placing an instrument inside a hollow conductor to protect it from outside fields?", answer: "Electrostatic shielding" },
      ],
      traps: [
        {
          title: "Saying the potential inside is zero",
          body: "Inside a charged conductor the FIELD is zero, but the potential is not zero: it is constant, equal to the potential of the surface.",
        },
        {
          title: "Treating a metal plate like a dielectric",
          body: "A metal slab of thickness t gives \\(\\varepsilon_0 A/(d - t)\\). A dielectric slab gives \\(\\varepsilon_0 A/(d - t + t/k)\\). The metal is the case \\(k \\to \\infty\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpes-polar",
      name: "Polar and non-polar dielectrics",
      intuition:
        "A dielectric is an insulator whose molecules can be stretched or turned into small dipoles by a field. Some molecules are already lopsided dipoles (polar); others are balanced and only become dipoles when a field pulls their charges apart (non-polar). Either way, the lined-up dipoles make a field of their own that opposes the applied field, so the field inside the dielectric is weaker.",
      definition:
        "- **Dielectric:** an insulating material that can be polarised by small displacements of its charges, for example glass, wax, water, wood, mica, rubber and plastic.\n" +
        "- **Polarisation P:** the dipole moment per unit volume. For a linear isotropic dielectric \\(\\vec{P} = \\chi_e \\vec{E}\\), where \\(\\chi_e\\), the electric susceptibility, is zero for vacuum.\n" +
        "- The induced charges set up a polarisation field \\(E_p\\) opposite to the applied field \\(E_0\\), so the net field is \\(E = E_0 - E_p\\), and \\(k = \\dfrac{E_0}{E}\\) is the dielectric constant.\n" +
        "- **Dielectric strength:** the field at which the dielectric breaks down and starts to conduct.\n" +
        "- The board asks this as 'what are polar and non-polar dielectrics (or molecules)?': give the charge-centre definition, the dipole moment, and an example of each.",
      table: {
        columns: ["Point", "Polar", "Non-polar"],
        rows: [
          {
            cells: ["Centres of positive and negative charge", "Do not coincide (unsymmetrical shape)", "Coincide (symmetrical shape)"],
            pyqExampleId: "1a19ffab-38c7-4dd9-ba27-341d3b106211",
            noteAmber: "Board 2022 asked for polar and non-polar dielectrics, and Board 2026 for polar and non-polar molecules: the same answer.",
          },
          { cells: ["Dipole moment with no field", "Permanent dipole moment in each molecule", "Zero"] },
          { cells: ["Whole sample with no field", "Zero net moment, as the molecular dipoles point at random", "Zero net moment"] },
          { cells: ["In an external field", "The permanent dipoles tend to line up with the field", "The charge centres are pulled apart, giving an induced dipole moment"] },
          { cells: ["Examples", "HCl, H₂O", "H₂, N₂, O₂, CO₂, benzene, methane"] },
        ],
      },
      selfCheckExample: {
        prompt: "Of water and methane, which has a permanent dipole moment, and why?",
        steps: [
          "Water is bent, so its centres of positive and negative charge do not coincide.",
          "Methane is symmetrical, so its two centres coincide and it has no permanent dipole moment.",
        ],
        answer: "Water, because it is a polar molecule",
      },
      practiceSet: [
        { prompt: "Is a CO₂ molecule polar or non-polar?", answer: "Non-polar" },
        { prompt: "What is the dipole moment per unit volume of a dielectric called?", answer: "Polarisation" },
        { prompt: "What happens to an induced dipole moment when the external field is removed?", answer: "It disappears" },
      ],
      traps: [
        {
          title: "A polar dielectric has no net moment on its own",
          body: "Each polar molecule is a dipole, but with no field they point every which way, so a piece of polar dielectric has zero net dipole moment until a field lines them up.",
        },
        {
          title: "Definition without an example",
          body: "A 'what are polar and non-polar' answer needs both sides, the charge-centre reason, and one example each. Describing only one kind earns half the marks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpes-van-de-graaff",
      name: "The Van de Graaff generator",
      intuition:
        "Sharp points spray charge onto a moving belt, the belt carries it up into a large hollow metal dome, and the dome passes all of it to its outer surface. Because the inside of the dome stays uncharged, fresh charge can always be added, so the dome climbs to millions of volts.",
      definition:
        "- **Purpose:** to build up very high potentials, of the order of \\(10^{7}\\) V, and use them to accelerate charged particles. Designed by Van de Graaff in 1931.\n" +
        "- **Principle:** (i) corona discharge, the action of sharp points; (ii) charge given to a hollow conductor moves to its outer surface and spreads evenly; (iii) if charge is supplied continuously to an insulated conductor, its potential keeps rising.\n" +
        "- **Working:** the motor runs the belt; brush A sprays positive charge on it; brush C collects it and passes it to the dome D, whose potential rises very high, and so does the electrode I. Positive ions (protons or deuterons) let into the tube E are repelled by I and accelerated down the tube to a target.\n" +
        "- **Uses (textbook):** it produces charged particles of energy about 10 MeV, used to disintegrate nuclei, to produce radioactive isotopes, to study nuclear structure, to study nuclear reactions, and (as accelerated electrons) to sterilise food and process materials.",
      table: {
        columns: ["Part", "Label", "Its job"],
        rows: [
          { cells: ["Pulleys", "P₁, P₂", "Carry the belt; a motor drives the lower pulley P₁"] },
          { cells: ["Conveyor belt", "BB", "Endless insulating belt (reinforced rubber or silk) that carries charge upward"] },
          { cells: ["Spray brush", "A", "Pointed wires joined to the positive terminal of a high-voltage DC supply P; sprays charge onto the belt"] },
          { cells: ["Collector brush", "C", "Collects the charge from the belt and passes it to the dome"] },
          { cells: ["Dome", "D", "Large hollow metal conductor on insulating pillars; the charge spreads over its outer surface"] },
          { cells: ["Accelerating tube", "E", "Evacuated tube with an electrode I at its top, joined to the dome; ions are accelerated down it"] },
          { cells: ["Steel vessel", "S", "Encloses the machine, filled with nitrogen (a little freon added) at high pressure to stop charge leaking; earthed"] },
          { cells: ["Metal plate", "M", "Held opposite brush A on the other side of the belt; joined to the earthed vessel S"] },
        ],
      },
      practiceSet: [
        { prompt: "Of what order are the potentials a Van de Graaff generator builds up?", answer: "About \\(10^{7}\\) V" },
        { prompt: "Why is the dome of a Van de Graaff generator hollow?", answer: "Charge given to it moves to the outer surface, so the inside stays free to receive more charge" },
        { prompt: "What gas fills the steel vessel around the generator, and why?", answer: "Nitrogen at high pressure, to stop the charge leaking away" },
      ],
      pyqExampleId: "e7cd81c0-a0a2-4d41-ad21-65f5de21d6f9",
      traps: [
        {
          title: "A diagram without labels",
          body: "The board asks for a 'neat and labelled diagram'. Label at least the pulleys, belt, both brushes, the dome, the accelerating tube and the steel vessel. An unlabelled sketch earns little.",
        },
        {
          title: "Giving the working when uses are asked",
          body: "For 'state four uses', write four uses from the textbook list. Explaining how the machine works answers a different question.",
        },
      ],
    },
  ],
};
