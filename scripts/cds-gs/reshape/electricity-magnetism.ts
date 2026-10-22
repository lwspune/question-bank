/**
 * Reshape plan: CDS GK Physics "Electricity and Magnetism" (44 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 44 stems AND solutions (2026-10-23). Four teaching pages, in the NCERT order:
 * charge and current first (static charge, potential difference, cells and the ammeter), then
 * resistance and circuits (Ohm's law, resistivity, series and parallel), then electric power and
 * the home supply (power, the kilowatt-hour, fuses and wiring, bulbs), and last magnetism and
 * electromagnetic induction (magnets, the field of a current, the force on a moving charge,
 * induced current and the transformer).
 *
 * Single rows placed by prefix: the human-body conductor row (0c5ec59f) is about what conducts,
 * so it joins the charge page; the short-circuit row (df486baa) and the green-wire row (b6043468,
 * its key turns on the wire colours) join the home-supply page; the transformer-heating row
 * (be4bab87) joins induction.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  charge: "Charge and Current",
  circuits: "Resistance and Circuits",
  power: "Electric Power and Home Wiring",
  magnetism: "Magnetism and Induction",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Electricity and Magnetism",
  order: [T.charge, T.circuits, T.power, T.magnetism],
  whole: {
    "Electrostatics": T.charge,
    "Cells, EMF and Kirchhoff's Laws": T.charge,
    "Resistance and Resistivity": T.circuits,
    "Combination of Resistors": T.circuits,
    "Electric Current and Ohm's Law": T.power,
    "Electrical Power, Energy and Heating": T.power,
    "Electrical Devices": T.power,
    "Magnetism and Magnetic Effects of Current": T.magnetism,
    "Magnetic Force and Fleming's Rules": T.magnetism,
  },
  byPrefix: {
    // What conducts: the human body, plastic, wood, distilled water.
    // The ammeter that measures current.
    [T.charge]: ["0c5ec59f", "2cfef03d"],
    // The green wire is the earth wire (statement item on wiring colours).
    [T.power]: ["b6043468"],
    // Why big transformers heat up: copper loss and hysteresis.
    [T.magnetism]: ["be4bab87"],
  },
  expected: { [T.charge]: 7, [T.circuits]: 12, [T.power]: 12, [T.magnetism]: 13 },
  total: 44,
};

export default plan;
