"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Lock, Star } from "lucide-react";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { confetti, prefersReducedMotion, replay, sfx, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import {
  ANGLE_MAX,
  ANGLE_MIN,
  FIELD,
  G,
  LAUNCH_KEY,
  LAUNCH_LEVELS,
  MAX_REPORTED_SHOTS,
  SPEED_MAX,
  SPEED_MIN,
  addGhost,
  aimFromPull,
  aimHelpPath,
  isLaunchOpen,
  maxHeight,
  parseLaunchProgress,
  rangeOnFlat,
  recordLaunch,
  serializeLaunchProgress,
  simulateShot,
  starsFor,
  type LaunchLevel,
  type Shot,
} from "@/lib/play/launch";

/**
 * Launch (2026-11-18), the Physics game: set the angle and the speed, fire,
 * hit the target. The physics is lib/play/launch (g = 10); this draws the
 * field on a canvas and animates the shot's path.
 *
 * 2026-11-23 (5 of 7 players stopped in levels 1 to 5): earlier shots stay on
 * screen with where they landed, pull back on the field to aim (the sliders
 * stay), a dotted start of the arc on levels 1 to 5, shots never run out
 * (stars still reward fewer), and a cannon, smoke and a target that bursts.
 * A round is one go at a level: reported on the hit, or as a miss when the
 * player leaves the level without one.
 */

const C = { sky1: "#1f1850", sky2: "#3b1f55", ground: "#2b2266", grass: "#3ee6b0", wall: "#6b5bd6", cliff: "#4a3ca0", target: "#ff6b80", ink: "#f3f0ff", dim: "#b9b2e0", mango: "#ffb238", sky: "#5cc8ff" };

/** Left edge of the field (the cannon's spot), in pixels. */
const X0 = 30;

type Ghost = { path: Shot["path"]; landX: number; landY: number; outcome: Shot["outcome"] };
type Part = { x: number; y: number; vx: number; vy: number; g: number; life: number; fade: number; c: string; r?: number; grow?: number; drag?: number };
type Pull = { sx: number; sy: number; cx: number; cy: number };

const START_MSG = "Pull back on the field to aim, or use the sliders. g = 10 m/s².";

function feedback(L: LaunchLevel, shot: Shot, angle: number, speed: number, shotNo: number): string {
  const mid = L.target.x + L.target.w / 2;
  switch (shot.outcome) {
    case "hit": {
      const stars = "★".repeat(starsFor(shotNo)) + "☆".repeat(3 - starsFor(shotNo));
      if (L.launchHeight === 0 && L.target.y === 0 && L.walls.length === 0 && !L.hoop)
        return `Hit! ${stars} Range = u²·sin2θ / g = ${rangeOnFlat(angle, speed).toFixed(1)} m`;
      return `Hit! ${stars} Highest point ${(maxHeight(angle, speed) + L.launchHeight).toFixed(1)} m, ${shot.time.toFixed(1)} s in the air`;
    }
    case "wall":
      return `Hit the wall at ${shot.landY.toFixed(1)} m up. Aim higher.`;
    case "cliff":
      return "Hit the cliff face. Aim higher or harder.";
    case "hoop":
      return "On target, but you missed the hoop.";
    case "off":
      return "Flew off the field. Ease off.";
    default: {
      const off = Math.abs(mid - shot.landX).toFixed(1);
      return `Landed at ${shot.landX.toFixed(1)} m: ${off} m ${shot.outcome === "short" ? "short" : "long"}.`;
    }
  }
}

function dots(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], every: number, color: string, px: (x: number) => number, py: (y: number) => number) {
  ctx.fillStyle = color;
  pts.forEach((p, i) => {
    if (i % every) return;
    ctx.beginPath();
    ctx.arc(px(p.x), py(p.y), 2.2, 0, Math.PI * 2);
    ctx.fill();
  });
}

export default function Launch() {
  const raw = useLocalStore(LAUNCH_KEY);
  const progress = useMemo(() => parseLaunchProgress(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [level, setLevel] = useState<LaunchLevel | null>(null);
  const [angle, setAngle] = useState(45);
  const [speed, setSpeed] = useState(25);
  const [shotNo, setShotNo] = useState(0);
  const [flying, setFlying] = useState(false);
  const [won, setWon] = useState(false);
  const [msg, setMsg] = useState(START_MSG);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const ball = useRef<{ x: number; y: number } | null>(null);
  const parts = useRef<Part[]>([]);
  const ghosts = useRef<Ghost[]>([]);
  const lastShot = useRef<Ghost | null>(null);
  const pull = useRef<Pull | null>(null);
  /** True while a frame loop is drawing the shot, smoke or sparks. */
  const looping = useRef(false);
  /** A go at a level with misses and no hit yet: reported as a miss if the player leaves it. */
  const pending = useRef<{ level: number; shots: number } | null>(null);
  const signedIn = useRef(false);
  useEffect(() => {
    signedIn.current = !!session;
  }, [session]);

  const flushMiss = useCallback(() => {
    const p = pending.current;
    pending.current = null;
    if (!p) return;
    const shots = Math.min(p.shots, MAX_REPORTED_SHOTS);
    reportRound(signedIn.current, { kind: "play_round", game: "launch", level: p.level, hit: false, shots }, { level: p.level, hit: false });
  }, []);

  // Leaving the page with misses on a level still counts as a round.
  useEffect(() => {
    window.addEventListener("pagehide", flushMiss);
    return () => {
      window.removeEventListener("pagehide", flushMiss);
      flushMiss();
    };
  }, [flushMiss]);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap || !level) return;
    const d = window.devicePixelRatio || 1;
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    if (cv.width !== Math.round(W * d) || cv.height !== Math.round(H * d)) {
      cv.width = Math.round(W * d);
      cv.height = Math.round(H * d);
    }
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const sc = (W - X0 - 10) / FIELD;
    const gy = H - 24;
    const px = (x: number) => X0 + x * sc;
    const py = (y: number) => gy - y * sc;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, C.sky1);
    g.addColorStop(1, C.sky2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.font = "600 10px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (let m = 10; m <= FIELD; m += 10) {
      ctx.strokeStyle = "#ffffff12";
      ctx.beginPath();
      ctx.moveTo(px(m), 0);
      ctx.lineTo(px(m), gy);
      ctx.stroke();
      if (m % 20 === 0) {
        ctx.fillStyle = C.dim;
        ctx.fillText(`${m} m`, px(m), gy + 15);
      }
    }
    ctx.fillStyle = C.ground;
    ctx.fillRect(0, gy, W, H - gy);
    ctx.fillStyle = C.grass;
    ctx.fillRect(0, gy, W, 2);
    if (level.launchHeight > 0) {
      ctx.fillStyle = C.cliff;
      ctx.fillRect(px(0) - 12, py(level.launchHeight), 24, level.launchHeight * sc);
      ctx.fillStyle = C.grass;
      ctx.fillRect(px(0) - 12, py(level.launchHeight), 24, 2);
    }
    for (const w of level.walls) {
      ctx.fillStyle = C.wall;
      ctx.fillRect(px(w.x), py(w.h), w.w * sc, w.h * sc);
    }
    for (const c of level.cliffs) {
      ctx.fillStyle = C.cliff;
      ctx.fillRect(px(c.x), py(c.h), c.w * sc, c.h * sc);
      ctx.fillStyle = C.grass;
      ctx.fillRect(px(c.x), py(c.h), c.w * sc, 2);
    }
    if (level.hoop) {
      ctx.strokeStyle = C.sky;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(px(level.hoop.x), py(level.hoop.y), Math.max(3, level.hoop.r * sc * 0.35), level.hoop.r * sc, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    // The target: a pad, and a bullseye on a post until it is hit.
    const t = level.target;
    const tx = px(t.x);
    const tw = t.w * sc;
    const ty = py(t.y);
    const tmid = tx + tw / 2;
    ctx.fillStyle = "#ff6b8066";
    ctx.fillRect(tx, ty - 4, tw, 4);
    if (!won) {
      const r = Math.max(9, tw / 2);
      ctx.fillStyle = "#8a7bd8";
      ctx.fillRect(tmid - 1.5, ty - 26, 3, 26);
      for (const [rr, c] of [[r, C.target], [r * 0.66, C.ink], [r * 0.33, C.target]] as const) {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(tmid, ty - 26 - r * 0.2, rr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Earlier shots, faint, each with where it landed.
    ghosts.current.forEach((gh, i) => {
      const k = 0.18 + 0.14 * i;
      dots(ctx, gh.path, 3, `rgba(185,178,224,${k})`, px, py);
      const lx = px(gh.landX);
      const ly = py(gh.landY);
      ctx.strokeStyle = `rgba(255,178,56,${0.5 + 0.2 * i})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lx - 4, ly - 4);
      ctx.lineTo(lx + 4, ly + 4);
      ctx.moveTo(lx + 4, ly - 4);
      ctx.lineTo(lx - 4, ly + 4);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = `rgba(255,178,56,${0.6 + 0.2 * i})`;
      ctx.font = "700 10px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(gh.outcome === "wall" || gh.outcome === "cliff" ? gh.outcome : `${gh.landX.toFixed(0)} m`, lx, ly - 9);
    });

    // Where the shot will start: the arc's first part on levels 1 to 5, a dashed line after.
    const a = (angle * Math.PI) / 180;
    const ox = px(0);
    const oy = py(level.launchHeight) - 4;
    const help = !flying && !won ? aimHelpPath(level, angle, speed) : [];
    if (help.length) dots(ctx, help, 6, "#ffb238cc", px, py);
    else if (!flying && !won) {
      const len = (18 + speed * 1.4) * 1.8;
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = "#ffb23866";
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + Math.cos(a) * len, oy - Math.sin(a) * len);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // The cannon.
    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(-a);
    ctx.fillStyle = "#3a3160";
    ctx.fillRect(-6, -7, 34, 14);
    ctx.fillStyle = "#5a4fa0";
    ctx.fillRect(-6, -7, 34, 4);
    ctx.fillStyle = "#2a2348";
    ctx.fillRect(24, -8.5, 6, 17);
    ctx.restore();
    ctx.fillStyle = "#6b4a2a";
    ctx.beginPath();
    ctx.arc(ox - 2, oy + 2, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#b9875a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ox - 2, oy + 2, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1;

    trail.current.forEach((p, i) => {
      ctx.fillStyle = `rgba(92,200,255,${0.25 + (0.6 * i) / Math.max(1, trail.current.length)})`;
      ctx.beginPath();
      ctx.arc(px(p.x), py(p.y), 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    if (ball.current) {
      const bx = px(ball.current.x);
      const by = py(ball.current.y);
      ctx.fillStyle = "#1a1530";
      ctx.beginPath();
      ctx.arc(bx, by, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = C.mango;
      ctx.stroke();
      ctx.fillStyle = "#ffffff55";
      ctx.beginPath();
      ctx.arc(bx - 2, by - 2, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const p of parts.current) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.c;
      if (p.r) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else ctx.fillRect(p.x, p.y, 4, 4);
    }
    ctx.globalAlpha = 1;

    // The pull: from where the finger went down to where it is now.
    const pl = pull.current;
    if (pl) {
      ctx.strokeStyle = "#f3f0ff88";
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(pl.sx, pl.sy);
      ctx.lineTo(pl.cx, pl.cy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.fillStyle = C.ink;
      ctx.beginPath();
      ctx.arc(pl.cx, pl.cy, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = "left";
    ctx.fillStyle = C.dim;
    ctx.font = "600 11px Inter, system-ui, sans-serif";
    ctx.fillText(`θ = ${angle}°   u = ${speed} m/s`, 8, 16);
    if (shotNo === 0 && !flying && !pl) {
      ctx.textAlign = "right";
      ctx.fillStyle = "#f3f0ffaa";
      ctx.fillText("Touch, pull back, let go", W - 8, 16);
    }
  }, [level, angle, speed, flying, won, shotNo]);

  // The frame loop draws through this, so it always draws the latest angle and speed.
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const choose = (L: LaunchLevel | null) => {
    flushMiss();
    setLevel(L);
    setShotNo(0);
    setWon(false);
    trail.current = [];
    ball.current = null;
    parts.current = [];
    ghosts.current = [];
    lastShot.current = null;
    setMsg(START_MSG);
  };

  const fire = (a: number = angle, u: number = speed) => {
    if (!level || flying || won) return;
    if (lastShot.current) ghosts.current = addGhost(ghosts.current, lastShot.current);
    const shot = simulateShot(level, a, u);
    const n = shotNo + 1;
    setShotNo(n);
    setFlying(true);
    sfx.launch();
    trail.current = [];
    const reduced = prefersReducedMotion();
    const cv = canvasRef.current;
    if (cv && !reduced) {
      // A puff of smoke at the cannon's mouth.
      const sc = (cv.clientWidth - X0 - 10) / FIELD;
      const r = (a * Math.PI) / 180;
      const mx = X0 + Math.cos(r) * 30;
      const my = cv.clientHeight - 24 - level.launchHeight * sc - 4 - Math.sin(r) * 30;
      for (let i = 0; i < 12; i++) {
        parts.current.push({
          x: mx,
          y: my,
          vx: Math.cos(r) * (0.5 + Math.random() * 1.5) + (Math.random() - 0.5),
          vy: -Math.sin(r) * (0.5 + Math.random()) + (Math.random() - 0.5),
          g: -0.01,
          drag: 0.96,
          life: 0.8,
          fade: 0.018,
          r: 3 + Math.random() * 3,
          grow: 0.15,
          c: "#d8d2f0",
        });
      }
    }
    const path = shot.path;
    const t0 = performance.now();
    const totalMs = Math.max(400, shot.time * 1000 * 0.75);
    const step = (now: number) => {
      const k = reduced ? 1 : Math.min(1, (now - t0) / totalMs);
      const idx = Math.min(path.length - 1, Math.floor(k * (path.length - 1)));
      ball.current = k < 1 || shot.outcome !== "hit" ? path[idx] : null;
      trail.current = path.slice(0, idx + 1).filter((_, i) => i % 3 === 0);
      for (const p of parts.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        if (p.drag) p.vx *= p.drag;
        if (p.grow && p.r) p.r += p.grow;
        p.life -= p.fade;
      }
      parts.current = parts.current.filter((p) => p.life > 0);
      drawRef.current();
      // Keep going while the ball flies or the smoke and sparks fade.
      if (k < 1 || parts.current.length) requestAnimationFrame(step);
      else looping.current = false;
    };
    looping.current = true;
    requestAnimationFrame(step);
    setTimeout(
      () => {
        setFlying(false);
        lastShot.current = { path: shot.path, landX: shot.landX, landY: shot.landY, outcome: shot.outcome };
        setMsg(feedback(level, shot, a, u, n));
        if (shot.outcome === "hit") {
          pending.current = null;
          const stars = starsFor(n);
          writeLocal(LAUNCH_KEY, serializeLaunchProgress(recordLaunch(parseLaunchProgress(readLocal(LAUNCH_KEY)), level.id, stars)));
          setWon(true);
          sfx.win();
          vibrate(40);
          if (cv && !reduced) {
            // The target bursts.
            const sc = (cv.clientWidth - X0 - 10) / FIELD;
            const bx = X0 + (level.target.x + level.target.w / 2) * sc;
            const by = cv.clientHeight - 24 - level.target.y * sc - 30;
            const cols = ["#ff6b80", "#f3f0ff", "#ff6b80", "#ffb238"];
            for (let i = 0; i < 60; i++) {
              const ang = Math.random() * Math.PI * 2;
              const v = 1 + Math.random() * 5;
              parts.current.push({ x: bx, y: by, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 2, g: 0.15, life: 1, fade: 0.022, c: cols[i % 4] });
            }
            if (!looping.current) {
              looping.current = true;
              requestAnimationFrame(step);
            }
          }
          if (level.id === LAUNCH_LEVELS.length) confetti(stageRef.current, 70);
          reportRound(!!session, { kind: "play_round", game: "launch", level: level.id, hit: true, shots: Math.min(n, MAX_REPORTED_SHOTS) }, { level: level.id, hit: true });
        } else {
          pending.current = { level: level.id, shots: n };
          sfx.miss();
          vibrate([50, 30, 50]);
          replay(stageRef.current, "pa-shake");
        }
      },
      reduced ? 50 : totalMs + 30
    );
  };

  // Pull back to aim: touch anywhere on the field, pull back, let go.
  const pointAt = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const pullMax = () => {
    const w = wrapRef.current;
    return w ? Math.min(w.clientWidth, w.clientHeight) * 0.6 : 180;
  };
  const aimOf = (p: Pull) => aimFromPull(p.sx - p.cx, p.cy - p.sy, pullMax());
  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!level || flying || won) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pointAt(e);
    pull.current = { sx: p.x, sy: p.y, cx: p.x, cy: p.y };
    draw();
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const pl = pull.current;
    if (!pl) return;
    const p = pointAt(e);
    pl.cx = p.x;
    pl.cy = p.y;
    const aim = aimOf(pl);
    if (aim) {
      setAngle(aim.angle);
      setSpeed(aim.speed);
    }
    draw();
  };
  const onPointerUp = () => {
    const pl = pull.current;
    pull.current = null;
    if (!pl) return;
    const aim = aimOf(pl);
    if (aim) fire(aim.angle, aim.speed);
    else draw();
  };
  const onPointerCancel = () => {
    pull.current = null;
    draw();
  };

  if (!level) {
    const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
    return (
      <div className="pa-stage p-4">
        <p className="text-sm pa-dim">
          Aim the cannon, fire, hit the target. g = {G} m/s², as in the exam. {totalStars > 0 && `${totalStars} of ${LAUNCH_LEVELS.length * 3} stars.`}
        </p>
        <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Levels">
          {LAUNCH_LEVELS.map((L) => {
            const open = raw !== undefined && isLaunchOpen(progress, L.id);
            const stars = progress.stars[L.id] ?? 0;
            return (
              <li key={L.id}>
                <button
                  type="button"
                  disabled={!open}
                  onClick={() => choose(L)}
                  className={`flex h-14 w-full flex-col items-center justify-center rounded-xl ${open ? "bg-[var(--pa-night-3)]" : "bg-[var(--pa-night-3)]/40 opacity-60"}`}
                  aria-label={`Level ${L.id}, ${L.name}${open ? (stars ? `, ${stars} stars` : "") : ", locked"}`}
                >
                  {open ? <span className="pa-display text-lg font-extrabold leading-none">{L.id}</span> : <Lock className="h-4 w-4" aria-hidden />}
                  <span className="mt-0.5 flex">
                    {[1, 2, 3].map((s) => (
                      <Star key={s} className={`h-2.5 w-2.5 ${s <= stars ? "fill-[var(--pa-mango)] text-[var(--pa-mango)]" : "text-[var(--pa-night)]"}`} aria-hidden />
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const next = LAUNCH_LEVELS.find((l) => l.id === level.id + 1);
  const shown = won ? starsFor(shotNo) : starsFor(shotNo + 1);

  return (
    <div ref={stageRef} className="pa-stage flex flex-col">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <button type="button" className="text-sm font-semibold text-[var(--pa-sky)]" onClick={() => choose(null)}>
          Levels
        </button>
        <span className="pa-display truncate px-2 text-lg font-extrabold">
          {level.id}. {level.name}
        </span>
        <span
          className="flex shrink-0 items-center gap-1 text-xs font-semibold pa-dim"
          role="img"
          aria-label={won ? `${shown} stars` : `Shot ${shotNo + 1}: a hit now earns ${shown} ${shown === 1 ? "star" : "stars"}`}
        >
          {!won && <span aria-hidden>Shot {shotNo + 1}</span>}
          <span className="flex" aria-hidden>
            {[1, 2, 3].map((s) => (
              <Star key={s} className={`h-3.5 w-3.5 ${s <= shown ? "fill-[var(--pa-mango)] text-[var(--pa-mango)]" : "text-[var(--pa-night-3)]"}`} />
            ))}
          </span>
        </span>
      </div>
      <div ref={wrapRef} className="relative h-[19rem] sm:h-[21rem]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab touch-none"
          aria-label={`Launch field for level ${level.id}. Pull back on it to aim, or use the sliders below.`}
          role="img"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        />
      </div>
      <div className="space-y-2 bg-black/10 px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <label htmlFor="ln-angle" className="pa-display w-28 shrink-0 text-base font-bold">
            Angle <span className="text-[var(--pa-mango)]">{angle}°</span>
          </label>
          <input id="ln-angle" type="range" min={ANGLE_MIN} max={ANGLE_MAX} value={angle} disabled={flying} onChange={(e) => setAngle(Number(e.target.value))} className="h-8 min-w-0 flex-1 accent-[var(--pa-mango)]" />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="ln-speed" className="pa-display w-28 shrink-0 text-base font-bold">
            Speed <span className="text-[var(--pa-mango)]">{speed} m/s</span>
          </label>
          <input id="ln-speed" type="range" min={SPEED_MIN} max={SPEED_MAX} value={speed} disabled={flying} onChange={(e) => setSpeed(Number(e.target.value))} className="h-8 min-w-0 flex-1 accent-[var(--pa-mango)]" />
        </div>
        <p className="min-h-[2.5rem] text-center text-sm pa-dim" aria-live="polite">
          {msg}
        </p>
        <div className="flex justify-center gap-2">
          {won ? (
            <>
              <button type="button" className="pa-btn-ghost" onClick={() => choose(level)}>
                Play again
              </button>
              {next ? (
                <button type="button" className="pa-btn" onClick={() => choose(next)} autoFocus>
                  Next level
                </button>
              ) : (
                <button type="button" className="pa-btn" onClick={() => choose(null)}>
                  All levels won
                </button>
              )}
            </>
          ) : (
            <button type="button" className="pa-btn !px-10" onClick={() => fire()} disabled={flying}>
              Fire
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
