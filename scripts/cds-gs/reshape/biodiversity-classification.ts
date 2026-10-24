/**
 * Reshape plan: CDS GK Biology "Biodiversity and Classification" (21 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 21 stems AND solutions (2026-10-23). Two teaching pages. The first is how living things
 * are sorted: the ranks from kingdom to species, the five kingdoms, the plant groups (algae to
 * flowering plants) and the fungi (hyphae, yeast, saprophytes). The second is the animal kingdom,
 * phylum by phylum up to the vertebrate classes. The one hierarchy question filed under the animals
 * (Phylum, Class, Order, ...) joins the first page, where the ranks are taught.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  groups: "Classification, Plants and Fungi",
  animals: "Animal Phyla and Classes",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Biodiversity and Classification",
  order: [T.groups, T.animals],
  whole: {
    "Plant Kingdom Classification": T.groups,
    "Kingdom Fungi": T.groups,
    "Animal Kingdom Classification": T.animals,
  },
  byPrefix: {
    [T.groups]: ["941ffa2e"],
  },
  expected: { [T.groups]: 10, [T.animals]: 11 },
  total: 21,
};

export default plan;
