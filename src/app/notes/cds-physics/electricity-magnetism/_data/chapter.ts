import type { ChapterNote } from "@/app/notes/_types";

export const CDS_PH_ELECTRICITY_CHAPTER: ChapterNote = {
  chapterName: "Electricity and Magnetism",
  title: "Electricity and Magnetism: CDS Physics",
  intro:
    "Electricity and Magnetism has 44 past-year questions in CDS General Knowledge, from 2016 (II) to 2026 (II): 13 EASY, 30 MODERATE and 1 HARD. " +
    "Most ask a single fact or a one-line sum on power, resistance or units of energy, so the marks go to students who know the formulas cold and keep their units straight. " +
    "Six questions turn on one idea: resistivity belongs to the material, not to the wire. " +
    "Three more only ask you to name the right hand rule, so learn what each rule is for, and learn the colour of each house wire.",
  cardBlurb:
    "Static charge and potential difference, cells and emf, Ohm's law and resistivity, series and parallel, electric power and the kilowatt-hour, fuses and house wiring, magnets, the field of a current, the magnetic force and induction.",
  subtopicOrder: ["cdsph-em-charge", "cdsph-em-circuits", "cdsph-em-power", "cdsph-em-magnetism"],
};
