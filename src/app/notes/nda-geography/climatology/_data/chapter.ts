import type { ChapterNote } from "@/app/notes/_types";

export const CLIMATOLOGY_CHAPTER: ChapterNote = {
  chapterName: "Climatology, Atmosphere and Weather",
  title: "Climatology, Atmosphere and Weather — NDA Geography",
  intro:
    "This is one of the heavyweight chapters in NDA Geography — 57 PYQs across 2017–2026, and the densest-HARD recall strand, because the paper blends two demands: it asks you to TRACE A PROCESS (why does the Coriolis force vanish at the equator? how does a cold front spawn thunderstorms? why is the outer atmosphere hottest yet feels cold?) and to RECALL A NAMED FACT (which local wind is the Mistral? what does Koppen's 'Cfa' mean?). " +
    "So the chapter teaches in one long arc, from the air column outward and from cause to consequence: " +
    "(1) Atmospheric layers, composition and aurora — the five shells of the atmosphere, what each is made of, and the solar-wind light show; " +
    "(2) Insolation, temperature and solar geometry — how the Sun heats the Earth, the lapse rate, and temperature inversion; " +
    "(3) Atmospheric pressure and winds — pressure belts, the Coriolis force, geostrophic and planetary winds; " +
    "(4) Humidity, condensation, clouds and precipitation — water in the air, the cloud families, and how rain/snow/sleet/hail form; " +
    "(5) Cyclones, fronts and local winds — tropical vs temperate cyclones, warm/cold fronts, and the named local winds; " +
    "(6) Climate classification and zones — Koppen's letter codes and the world's climatic regions. " +
    "Around 25 concepts, every PYQ tagged. The mechanism concepts (Coriolis, fronts, lapse rate, cyclogenesis) carry most of the HARD marks; the named-fact tables (layers, local winds, Koppen codes, cloud types) are pure recall you must drill to reflex.",
  subtopicOrder: [
    "clim-layers",
    "clim-insolation",
    "clim-pressure-winds",
    "clim-humidity",
    "clim-cyclones",
    "clim-climate-zones",
  ],
};
