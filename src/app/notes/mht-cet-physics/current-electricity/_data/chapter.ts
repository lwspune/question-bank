import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_CURRENT_CHAPTER: ChapterNote = {
  chapterName: "Current Electricity",
  title: "Current Electricity — MHT-CET Physics",
  intro:
    "Current Electricity has 82 past-year questions in the MHT-CET bank, about one in four HARD, and almost a third of them come with a circuit diagram. " +
    "It is Kirchhoff's two laws applied to four instruments: the Wheatstone bridge and the metre bridge, which compare resistances at balance; the potentiometer, which measures e.m.f. without drawing current; and the galvanometer, turned into an ammeter by a shunt or a voltmeter by a series resistance. " +
    "Every PYQ about current electricity is tagged.",
  cardBlurb:
    "E.m.f., internal resistance and cells together, Kirchhoff's current and voltage laws, the Wheatstone and metre bridges, the potentiometer, and converting a galvanometer into an ammeter or a voltmeter — every MHT-CET past-year question on current electricity tagged.",
  subtopicOrder: [
    "cetp-ce-cells",
    "cetp-ce-kirchhoff",
    "cetp-ce-bridges",
    "cetp-ce-potentiometer",
    "cetp-ce-galvanometer",
  ],
};
