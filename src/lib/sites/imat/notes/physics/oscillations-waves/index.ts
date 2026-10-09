import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_OSW_SHM_NOTE } from "./shm";
import { IMAT_PHY_OSW_WAVES_SOUND_NOTE } from "./waves-sound";
import { IMAT_PHY_OSW_BEHAVIOUR_NOTE } from "./wave-behaviour";

export { IMAT_PHY_OSW_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Oscillations and Waves. Order matches `subtopicOrder`. */
export const IMAT_PHY_OSW_NOTES: Record<string, SubtopicNote> = {
  "imat-osw-shm": IMAT_PHY_OSW_SHM_NOTE,
  "imat-osw-waves-sound": IMAT_PHY_OSW_WAVES_SOUND_NOTE,
  "imat-osw-behaviour": IMAT_PHY_OSW_BEHAVIOUR_NOTE,
};

export const IMAT_PHY_OSW_SLUGS = Object.keys(IMAT_PHY_OSW_NOTES);
