/**
 * Reshape plan: CDS GK Biology "Ecology and Environment" (22 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 22 stems AND solutions (2026-10-23). Two teaching pages. The first is how an ecosystem
 * works: population, community and ecosystem, succession, food chains with biomagnification, and
 * the flow of energy (the ten per cent law). The second is what people do to the environment and
 * how it is protected: air pollution and global warming, water, waste and green remedies, and
 * conservation with its bodies and protected areas. The biocontrol row filed under ecosystems is a
 * remedy for pesticide pollution, so it joins the second page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ecosystems: "Ecosystems and Energy Flow",
  environment: "Pollution and Conservation",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Ecology and Environment",
  order: [T.ecosystems, T.environment],
  whole: {
    "Ecosystems, Biomes and Ecological Interactions": T.ecosystems,
    "Environment and Biodiversity": T.environment,
  },
  byPrefix: {
    [T.environment]: ["f5150bd5"],
  },
  expected: { [T.ecosystems]: 8, [T.environment]: 14 },
  total: 22,
};

export default plan;
