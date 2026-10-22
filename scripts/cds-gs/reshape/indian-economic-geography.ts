/**
 * Reshape plan: CDS GK Geography "Indian Geography — Economy, Resources and Transport" (86 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 86 stems AND solutions (2026-10-22). Eight teaching pages, foundations first:
 * resources and land use (what land is, how it is classed, how water and soil are kept); farming
 * and crops; minerals, power and industry; then people (population size and growth; tribes and
 * languages; migration and towns); then transport (roads, railways and airports; waterways and
 * ports). The catalogue's "Agriculture, Crops, Soils and Land Use" (24) is split: its six land-use,
 * irrigation and soil-conservation rows open the chapter, the rest is the farming page. Its
 * "Population, Census and Urbanisation" (25) splits into three pages by idea. The two resource-
 * classification rows filed under minerals join the land page. The two inland-waterway rows filed
 * under highways, and the coastal-zone (ICZM) row filed under schemes, join the ports page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  land: "Resources and Land Use",
  farming: "Farming and Crops",
  minerals: "Minerals, Power and Industry",
  population: "Population Size and Growth",
  tribes: "Tribes and Languages",
  urban: "Migration and Towns",
  roads: "Roads, Railways and Airports",
  ports: "Waterways and Ports",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Indian Geography — Economy, Resources and Transport",
  order: [T.land, T.farming, T.minerals, T.population, T.tribes, T.urban, T.roads, T.ports],
  whole: {
    "Agriculture, Crops, Soils and Land Use": T.farming,
    "Minerals and Mining": T.minerals,
    "Energy and Industries — Power, Petroleum, Iron and Steel": T.minerals,
    "Manufacturing Industries": T.minerals,
    "Economic Sectors and Government Schemes": T.minerals,
    "Population, Census and Urbanisation": T.population,
    "Highways, Railways and Transport Corridors": T.roads,
    "Ports and Maritime Infrastructure": T.ports,
  },
  byPrefix: {
    [T.land]: ["ed4df604", "5576c380", "26f88284", "c216f9c5", "839b02ac", "485557c8", "9d12ab4d", "e978a2b9"],
    [T.tribes]: ["5f5a9b83", "511c6ba5", "54881510", "5f8355ac", "dfb47efc", "3a8e67bf", "e3b305ef", "5b17e321"],
    [T.urban]: ["87a0b81d", "ae334e3a", "5512f0ca", "414963a5", "12145f4d", "35c03235"],
    [T.ports]: ["558dedd4", "d8af3f5f", "966fb65b"],
  },
  expected: {
    [T.land]: 8,
    [T.farming]: 18,
    [T.minerals]: 15,
    [T.population]: 11,
    [T.tribes]: 8,
    [T.urban]: 6,
    [T.roads]: 11,
    [T.ports]: 9,
  },
  total: 86,
};

export default plan;
