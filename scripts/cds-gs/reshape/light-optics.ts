/**
 * Reshape plan: CDS GK Physics "Light and Optics" (42 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 42 stems AND solutions (2026-10-23). Four teaching pages in the order a student learns
 * them: light travelling in straight lines and reflecting from plane and curved mirrors; refraction,
 * total internal reflection and lenses; what happens to white light in the sky (the spectrum,
 * dispersion, the rainbow, scattering and twinkling); and the eye with its defects and the
 * microscope and telescope. The two straight-line rows (rectilinear travel 8af2b949, the sharpest
 * shadow 70997544) leave "Light Phenomena and Spectrum" for the mirrors page, where rays are taught.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  mirrors: "Reflection and Mirrors",
  lenses: "Refraction and Lenses",
  spectrum: "Dispersion, Scattering and the Spectrum",
  eye: "The Eye and Optical Instruments",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Light and Optics",
  order: [T.mirrors, T.lenses, T.spectrum, T.eye],
  whole: {
    "Refraction, Speed of Light and TIR": T.lenses,
    "Lenses and Lens Formula": T.lenses,
    "Light Phenomena and Spectrum": T.spectrum,
    "Human Eye and Optical Instruments": T.eye,
  },
  byPrefix: {
    [T.mirrors]: ["8af2b949", "70997544"],
  },
  expected: { [T.mirrors]: 9, [T.lenses]: 17, [T.spectrum]: 11, [T.eye]: 5 },
  total: 42,
};

export default plan;
