/**
 * Where V may appear, per route. Pure, so the rule is tested rather than
 * rediscovered: V is a fixed bottom-right element mounted in the root layout,
 * and every other fixed bottom element on the site is a collision candidate.
 */

// The timed runner is /mock/<slug>/attempt/<id>; the result page is
// /mock/attempt/<id>/result and keeps V.
const MOCK_RUNNER = /^\/mock\/[^/]+\/attempt\/[^/]+\/?$/;
const DRILL = /^\/drill(\/|$)/;

export type CartState = { hydrated: boolean; count: number };

export type VPlacement = {
  /** Focus surfaces: a timed exam, and /drill whose bottom bar V would cover. */
  hidden: boolean;
  /** /browse's CartPill owns the same corner; V sits above it while it shows. */
  aboveCart: boolean;
};

export function vPlacement(pathname: string, cart: CartState): VPlacement {
  const hidden = MOCK_RUNNER.test(pathname) || DRILL.test(pathname);
  // Mirrors CartPill's own render condition (`!cart.hydrated || count === 0`
  // renders nothing), and CartPill is only mounted on /browse.
  const aboveCart = pathname === "/browse" && cart.hydrated && cart.count > 0;
  return { hidden, aboveCart };
}
