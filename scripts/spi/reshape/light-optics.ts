/**
 * Reshape plan: SPI "Light and Optics" (16 q), for scripts/spi/reshape.ts.
 *
 * Read all 16 stems and solutions (2026-10-22). The ingest filed them under 13 one-off subtopics.
 * Cut here in NCERT order: what light is and how mirrors reflect it, then refraction (refractive
 * index, the glass slab, lenses and the 2f point), then the eye's defects, the prism's spectrum,
 * twinkling stars and the telescope (the eye page uses the lenses taught on page 2). Never featured:
 * d74e45be (the stem's "rate of change will be utmost" does not say what changes) and 15383365 (the
 * stem never says which experiment the pins belong to).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  reflection: "Light and Reflection",
  refraction: "Refraction and Lenses",
  eye: "The Eye, Dispersion and Instruments",
} as const;

const plan: ReshapePlan = {
  chapter: "Light and Optics",
  order: [T.reflection, T.refraction, T.eye],
  byPrefix: {
    [T.reflection]: ["d8f657b6", "69fb51c2", "ab798a7a", "38e87d24", "9ab36a8a", "5c61cc01"],
    [T.refraction]: ["d74e45be", "15383365", "b04ac38a", "4f7fa999"],
    [T.eye]: ["61fbd440", "aeb1596f", "d5f8f69d", "be62ba91", "66398a85", "85590ab8"],
  },
  expected: {
    [T.reflection]: 6,
    [T.refraction]: 4,
    [T.eye]: 6,
  },
  total: 16,
};

export default plan;
