"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";
import { MapPin } from "lucide-react";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { confetti, sfx, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { INDIA_FRAME, INDIA_PATH } from "@/lib/play/data/indiaOutline.generated";
import { LANDMARKS, PLACE_PACKS } from "@/lib/play/data/places";
import {
  BULLSEYE_KM,
  PIN_KEY,
  PLACES_PER_ROUND,
  lccForward,
  lccInverse,
  parsePinProgress,
  pinGuess,
  pinNext,
  pinTotal,
  recordPin,
  serializePinProgress,
  startPin,
  type PinState,
  type PlacePack,
} from "@/lib/play/pin";

/**
 * Pin It (2026-11-18), the Geography game: tap where a place is on the map of
 * India. The outline is Survey of India's official one (owner, 2026-11-17),
 * drawn in its own projection; a tap goes back to latitude and longitude
 * through the same projection (lib/play/pin) and scores by real distance.
 */

const W = INDIA_FRAME.widthKm;
const H = INDIA_FRAME.heightKm;

/** Latitude/longitude to the map's kilometre frame. */
function toMap(lat: number, lon: number): { x: number; y: number } {
  const p = lccForward(lat, lon);
  return { x: (p.x - INDIA_FRAME.minX) / 1000, y: (INDIA_FRAME.maxY - p.y) / 1000 };
}

export default function PinIt() {
  const raw = useLocalStore(PIN_KEY);
  const progress = useMemo(() => parsePinProgress(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [pack, setPack] = useState<PlacePack | null>(null);
  const [state, setState] = useState<PinState | null>(null);
  const [newBest, setNewBest] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const begin = (p: PlacePack) => {
    setPack(p);
    setState(startPin(p, Math.random));
    setNewBest(false);
    sfx.tick();
  };

  const guessed = state ? state.results.length > state.i : false;
  const result = state && guessed ? state.results[state.i] : null;

  const onTap = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || !state || state.over || guessed) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    const { lat, lon } = lccInverse(INDIA_FRAME.minX + p.x * 1000, INDIA_FRAME.maxY - p.y * 1000);
    const g = pinGuess(state, lat, lon);
    if (!g.result) return;
    setState(g.state);
    if (g.result.km <= BULLSEYE_KM) {
      sfx.win();
      vibrate(40);
    } else if (g.result.points >= 500) {
      sfx.hit(3);
      vibrate(15);
    } else {
      sfx.miss();
      vibrate([40, 30, 40]);
    }
  };

  const next = () => {
    if (!state || !pack) return;
    const n = pinNext(state);
    setState(n);
    if (n.over) {
      const total = pinTotal(n);
      const before = parsePinProgress(readLocal(PIN_KEY));
      const best = total > (before.best[pack.id] ?? 0);
      writeLocal(PIN_KEY, serializePinProgress(recordPin(before, pack.id, total)));
      setNewBest(best);
      if (best || total >= 3500) setTimeout(() => confetti(stageRef.current, 60), 150);
      reportRound(!!session, { kind: "play_round", game: "pin_it", pack: pack.id, score: total }, { pack: pack.id, score: total });
    }
  };

  if (!pack || !state) {
    return (
      <div className="space-y-3">
        <div className="pa-stage px-5 py-5 text-center">
          <p className="pa-display text-3xl font-extrabold text-[var(--pa-lime)]">Pin It</p>
          <p className="mx-auto mt-1 max-w-xs text-sm pa-dim">
            Tap where each place is on the map. Up to 1,000 points a place, {PLACES_PER_ROUND} places a round.
          </p>
        </div>
        <ul className="space-y-2.5" aria-label="Packs">
          {PLACE_PACKS.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => begin(p)} className="flex w-full items-center gap-3 rounded-2xl bg-[var(--pa-night-2)] p-3 text-left">
                <MapPin className="h-6 w-6 shrink-0 text-[var(--pa-lime)]" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="pa-display block text-lg font-extrabold leading-tight">{p.name}</span>
                  <span className="block text-sm pa-dim">
                    {p.places.length} places{progress.best[p.id] ? ` · best ${progress.best[p.id].toLocaleString("en-IN")}` : ""}
                  </span>
                </span>
                <span className="pa-btn shrink-0 !px-4 !py-1.5 !text-base">Play</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const place = state.over ? null : state.places[state.i];
  const total = pinTotal(state);
  const truth = result ? toMap(result.place.lat, result.place.lon) : null;
  const guess = result ? toMap(result.guess.lat, result.guess.lon) : null;

  return (
    <div ref={stageRef} className="pa-stage pb-3">
      <div className="flex items-center justify-between px-4 pb-1 pt-3">
        <span className="text-sm font-semibold">
          Place {Math.min(state.i + 1, PLACES_PER_ROUND)} of {PLACES_PER_ROUND}
        </span>
        <span className="pa-display text-3xl font-extrabold tabular-nums text-[var(--pa-mango)]">{total.toLocaleString("en-IN")}</span>
      </div>
      {place && (
        <div className="mx-3 rounded-2xl bg-black/25 p-3 text-center" aria-live="polite">
          <p className="text-xs pa-dim">{result ? result.place.state : "Where is"}</p>
          <p className="pa-display text-2xl font-extrabold leading-tight">{place.name}</p>
        </div>
      )}
      <div className="mx-2 mt-2 overflow-hidden rounded-2xl bg-[#17305a]">
        <svg
          ref={svgRef}
          viewBox={`-40 -40 ${W + 80} ${H + 80}`}
          className={`block h-auto w-full touch-manipulation ${guessed || state.over ? "" : "cursor-crosshair"}`}
          onClick={onTap}
          role="img"
          aria-label={place ? `Map of India. Tap where ${place.name} is.` : "Map of India"}
        >
          <path d={INDIA_PATH} fill="#2b4a7a" stroke="#9fc4ff" strokeWidth={1.25} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {LANDMARKS.map((l) => {
            const p = toMap(l.lat, l.lon);
            return (
              <g key={l.name} aria-hidden>
                <circle cx={p.x} cy={p.y} r={14} fill="#f3f0ff" />
                <text x={p.x + 26} y={p.y + 14} fontSize={46} fontWeight={600} fill="#f3f0ff" fontFamily="Inter, system-ui, sans-serif">
                  {l.name}
                </text>
              </g>
            );
          })}
          {truth && guess && (
            <g aria-hidden>
              <line x1={guess.x} y1={guess.y} x2={truth.x} y2={truth.y} stroke="#ffb238" strokeWidth={8} strokeDasharray="22 16" />
              <circle cx={guess.x} cy={guess.y} r={26} fill="#5cc8ff" stroke="#03243a" strokeWidth={6} />
              <circle cx={truth.x} cy={truth.y} r={30} fill="#3ee6b0" stroke="#05271c" strokeWidth={6} className="pa-pop" />
            </g>
          )}
        </svg>
      </div>
      <p className="mt-1 text-center text-[0.65rem] pa-dim">Outline: Survey of India</p>
      {result && !state.over && (
        <div className="mt-2 space-y-2 text-center" aria-live="polite">
          <p>
            {result.km <= BULLSEYE_KM && <b className="text-[var(--pa-mint)]">Bullseye! </b>}
            <b>{Math.round(result.km).toLocaleString("en-IN")} km</b> away · +{result.points} points
          </p>
          <button type="button" className="pa-btn" onClick={next} autoFocus>
            {state.i + 1 < PLACES_PER_ROUND ? "Next place" : "See score"}
          </button>
        </div>
      )}
      {!result && !state.over && <p className="mt-2 text-center text-sm pa-dim">Tap the map. The white dots are big cities.</p>}

      {state.over && (
        <div className="pa-overlay" role="dialog" aria-label="Round over">
          <p className="pa-display text-3xl font-extrabold text-[var(--pa-mango)]">Round done!</p>
          <p className="pa-display text-6xl font-extrabold tabular-nums">{total.toLocaleString("en-IN")}</p>
          <p className="text-sm">
            out of {(PLACES_PER_ROUND * 1000).toLocaleString("en-IN")}
            {newBest ? <b className="text-[var(--pa-mango)]"> · New best!</b> : ""}
          </p>
          <ul className="w-full max-w-xs space-y-1 text-left text-sm">
            {state.results.map((r) => (
              <li key={r.place.name} className="flex justify-between gap-2 rounded-lg bg-black/20 px-2 py-1">
                <span className="truncate">{r.place.name}</span>
                <span className="shrink-0 tabular-nums pa-dim">{Math.round(r.km)} km</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="pa-btn" onClick={() => begin(pack)} autoFocus>
              Play again
            </button>
            <button type="button" className="pa-btn-ghost" onClick={() => setPack(null)}>
              Packs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
