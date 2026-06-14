import type { ChapterNote } from "@/app/notes/_types";

export const EARTH_IN_SPACE_CHAPTER: ChapterNote = {
  chapterName: "Earth in Space, Maps and Coordinates",
  title: "Earth in Space, Maps and Coordinates — NDA Geography",
  intro:
    "This chapter is the 'how the Earth sits in space and how we pin a point on it' chapter — 22 PYQs across 2017–2026, spatial and conceptual rather than recall-heavy. " +
    "Almost every question rewards a clear mental picture: a spinning, tilted, slightly-squashed ball going round the Sun, wrapped in a grid of latitude and longitude, sliced into 24 time zones. " +
    "Get those pictures right and the marks follow without memorising long lists. " +
    "The chapter teaches in a logical arc, from the planet's own motions outward to the wider Solar System: " +
    "(1) Earth's shape, rotation and motion — oblate spheroid, day/night from rotation, seasons from revolution + tilt, linear velocity fastest at the Equator; " +
    "(2) latitude, longitude and the geographical grid — parallels vs meridians, the Equator as the longest parallel, great circles; " +
    "(3) time zones and the International Date Line — the 15-degrees-per-hour rule and the date change at 180 degrees; " +
    "(4) maps and GPS — what you need to locate a place and what GPS actually does; " +
    "(5) planets and the Solar System — order, terrestrial vs giant planets, density ranking (Earth densest). " +
    "5 subtopics, ~21 concepts, every PYQ tagged. The 'Shape, Rotation and Motion' subtopic is the largest and carries the trickiest reasoning questions.",
  subtopicOrder: [
    "eis-shape-rotation-motion",
    "eis-latitude-longitude-grid",
    "eis-time-zones-idl",
    "eis-maps-gps",
    "eis-planets-solar-system",
  ],
};
