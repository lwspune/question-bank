import type { ChapterNote } from "@/app/notes/_types";

export const SPI_ELECTRICITY_MAGNETISM_CHAPTER: ChapterNote = {
  chapterName: "Electricity and Magnetism",
  title: "Electricity and Magnetism: SPI Physics",
  intro:
    "Electricity and Magnetism has 22 questions in the SPI bank: fifteen EASY, six MODERATE and one HARD, all from sample papers and mock tests. " +
    "Ten are short calculations with V = IR, the series and parallel rules, P = VI or E = Pt, and most of the rest ask which rule or device does a job: where the fuse goes, the field inside a solenoid, what each finger shows. " +
    "Learn each formula with its units and each rule with the device it belongs to, and these are quick marks.",
  cardBlurb:
    "Current and Ohm's law, resistivity, series and parallel resistors, power and the kilowatt hour, house wiring and the fuse, magnetic fields, the motor and the generator.",
  subtopicOrder: ["spi-em-ohm", "spi-em-circuits", "spi-em-power", "spi-em-magnetic"],
};
