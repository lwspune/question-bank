/**
 * Every scene an animated solution can name. Adding one: a scene module under
 * scenes/, an entry here, and a real bank question as its fixture in
 * tests/fixtures/visuals.ts (the registry test fails until it has one).
 */
import { circleArc } from "./scenes/circleArc";
import { coordGeometry } from "./scenes/coordGeometry";
import { functionGraph } from "./scenes/functionGraph";
import { quadraticFamily } from "./scenes/quadraticFamily";
import { rotation } from "./scenes/rotation";
import { lpRegion } from "./scenes/lpRegion";
import { slab } from "./scenes/slab";
import { space3d } from "./scenes/space3d";
import type { Scene } from "./types";

// Each scene owns its params type, so the registry holds them loosely.
export const SCENES: Record<string, Scene<any>> = {
  rotation,
  circleArc,
  quadraticFamily,
  slab,
  functionGraph,
  coordGeometry,
  space3d,
  lpRegion,
};

export function getScene(id: string): Scene<any> | undefined {
  return Object.prototype.hasOwnProperty.call(SCENES, id) ? SCENES[id] : undefined;
}
