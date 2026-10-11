/**
 * Confetti pieces for the Congratulate burst (2026-10-11). Pure, so the shape
 * of a burst is tested; components/results/confettiBurst draws them. Our own
 * thirty lines rather than a package: a burst is a handful of falling
 * rectangles, which no dependency is needed for.
 */

export type ConfettiPiece = {
  x: number;
  y: number;
  /** Pixels per frame; negative vy flies up. */
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
};

export function makeConfettiPieces(
  count: number,
  origin: { x: number; y: number },
  colors: readonly string[],
  rand: () => number = Math.random
): ConfettiPiece[] {
  const pieces: ConfettiPiece[] = [];
  for (let i = 0; i < count; i++) {
    // A fan pointing up: -60 to +60 degrees either side of straight up.
    const angle = -Math.PI / 2 + (rand() - 0.5) * ((2 * Math.PI) / 3);
    const speed = 6 + rand() * 8;
    pieces.push({
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + rand() * 5,
      rotation: rand() * Math.PI,
      spin: (rand() - 0.5) * 0.4,
      color: colors[Math.floor(rand() * colors.length)] ?? colors[0],
    });
  }
  return pieces;
}
