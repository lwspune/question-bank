/**
 * The reviewed lesson-to-topic rows of every Learn course beyond the three Maths courses (whose
 * rows live in ../vLinks.ts), one file per course (2026-11-27). `{ chapter: { lesson: topics } }`;
 * an empty list = read and no bank topic fits. Written by scripts/learn/topics-commit.ts from a
 * reviewed draft, never by hand-editing a draft into place. Server-side only (V and the stuck
 * offer read it). Spec: tests/learn-lesson-topic-files.test.ts; live: tests/learn-v-links-live.test.ts.
 */
import cbse11Chemistry from "./cbse-11-chemistry.json";
import cbse11Maths from "./cbse-11-maths.json";
import cbse11Physics from "./cbse-11-physics.json";
import cbse12Chemistry from "./cbse-12-chemistry.json";
import cbse12Physics from "./cbse-12-physics.json";
import jeeMainsChemistry from "./jee-mains-chemistry.json";
import jeeMainsMaths from "./jee-mains-maths.json";
import jeeMainsPhysics from "./jee-mains-physics.json";
import mhHsc12Biology from "./mh-hsc-12-biology.json";
import mhHsc12Chemistry from "./mh-hsc-12-chemistry.json";
import mhHsc12Physics from "./mh-hsc-12-physics.json";
import mhSb11Biology from "./mh-sb-11-biology.json";
import mhSb11Chemistry from "./mh-sb-11-chemistry.json";
import mhSb11Maths from "./mh-sb-11-maths.json";
import mhSb11Physics from "./mh-sb-11-physics.json";
import mhSb9Maths from "./mh-sb-9-maths.json";
import mhSsc10Maths from "./mh-ssc-10-maths.json";
import mhtCetChemistry from "./mht-cet-chemistry.json";
import mhtCetMaths from "./mht-cet-maths.json";
import mhtCetPhysics from "./mht-cet-physics.json";
import ndaChemistry from "./nda-chemistry.json";
import ndaPhysics from "./nda-physics.json";
import neetChemistry from "./neet-chemistry.json";
import neetPhysics from "./neet-physics.json";

export type LessonTopicFile = Readonly<Record<string, Readonly<Record<string, readonly string[]>>>>;

export const LESSON_TOPIC_FILES: Readonly<Record<string, LessonTopicFile>> = {
  "cbse-11-chemistry": cbse11Chemistry,
  "cbse-11-maths": cbse11Maths,
  "cbse-11-physics": cbse11Physics,
  "cbse-12-chemistry": cbse12Chemistry,
  "cbse-12-physics": cbse12Physics,
  "jee-mains-chemistry": jeeMainsChemistry,
  "jee-mains-maths": jeeMainsMaths,
  "jee-mains-physics": jeeMainsPhysics,
  "mh-hsc-12-biology": mhHsc12Biology,
  "mh-hsc-12-chemistry": mhHsc12Chemistry,
  "mh-hsc-12-physics": mhHsc12Physics,
  "mh-sb-11-biology": mhSb11Biology,
  "mh-sb-11-chemistry": mhSb11Chemistry,
  "mh-sb-11-maths": mhSb11Maths,
  "mh-sb-11-physics": mhSb11Physics,
  "mh-sb-9-maths": mhSb9Maths,
  "mh-ssc-10-maths": mhSsc10Maths,
  "mht-cet-chemistry": mhtCetChemistry,
  "mht-cet-maths": mhtCetMaths,
  "mht-cet-physics": mhtCetPhysics,
  "nda-chemistry": ndaChemistry,
  "nda-physics": ndaPhysics,
  "neet-chemistry": neetChemistry,
  "neet-physics": neetPhysics,
};
