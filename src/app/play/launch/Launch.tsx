"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  SHOTS,
  SPEED_MAX,
  SPEED_MIN,
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
 * hit the target in 3 shots. The physics is lib/play/launch (g = 10); this
 * draws the field on a canvas and animates the shot's path.
 */

const C = { sky1: "#1f1850", sky2: "#3b1f55", ground: "#2b2266", grass: "#3ee6b0", wall: "#6b5bd6", cliff: "#4a3ca0", target: "#ff6b80", ink: "#f3f0ff", dim: "#b9b2e0", mango: "#ffb238", sky: "#5cc8ff" };

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
  const [msg, setMsg] = useState("Set the angle and the speed, then fire. g = 10 m/s².");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const ball = useRef<{ x: number; y: number } | null>(null);
  const parts = useRef<{ x: number; y: number; vx: number; vy: number; life: number; c: string }[]>([]);

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
    const x0 = 22;
    const sc = (W - x0 - 10) / FIELD;
    const gy = H - 24;
    const px = (x: number) => x0 + x * sc;
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
      ctx.fillRect(px(0) - 10, py(level.launchHeight), 20, level.launchHeight * sc);
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
    const t = level.target;
    const tx = px(t.x);
    const tw = t.w * sc;
    const ty = py(t.y);
    ctx.fillStyle = C.target;
    ctx.fillRect(tx, ty - 6, tw, 6);
    ctx.fillStyle = C.ink;
    ctx.fillRect(tx + tw * 0.3, ty - 6, tw * 0.4, 6);
    ctx.fillStyle = C.target;
    ctx.fillRect(tx + tw / 2 - 1, ty - 30, 2, 24);
    ctx.beginPath();
    ctx.moveTo(tx + tw / 2 + 1, ty - 30);
    ctx.lineTo(tx + tw / 2 + 14, ty - 25);
    ctx.lineTo(tx + tw / 2 + 1, ty - 20);
    ctx.fill();
    const a = (angle * Math.PI) / 180;
    const ox = px(0);
    const oy = py(level.launchHeight) - 4;
    const len = 18 + speed * 1.4;
    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = "#ffb23899";
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + Math.cos(a) * len * 1.8, oy - Math.sin(a) * len * 1.8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = C.mango;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + Math.cos(a) * 22, oy - Math.sin(a) * 22);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.arc(ox, oy, 9, 0, Math.PI * 2);
    ctx.fill();
    trail.current.forEach((p, i) => {
      ctx.fillStyle = `rgba(92,200,255,${0.25 + (0.6 * i) / Math.max(1, trail.current.length)})`;
      ctx.beginPath();
      ctx.arc(px(p.x), py(p.y), 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    if (ball.current) {
      ctx.fillStyle = C.mango;
      ctx.beginPath();
      ctx.arc(px(ball.current.x), py(ball.current.y), 6, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const p of parts.current) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, 4, 4);
    }
    ctx.globalAlpha = 1;
    // Where the launcher points, as the exam would say it.
    ctx.textAlign = "left";
    ctx.fillStyle = C.dim;
    ctx.font = "600 11px Inter, system-ui, sans-serif";
    ctx.fillText(`θ = ${angle}°   u = ${speed} m/s`, 8, 16);
  }, [level, angle, speed]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const choose = (L: LaunchLevel) => {
    setLevel(L);
    setShotNo(0);
    setWon(false);
    trail.current = [];
    ball.current = null;
    setMsg("Set the angle and the speed, then fire. g = 10 m/s².");
  };

  const fire = () => {
    if (!level || flying || won) return;
    if (shotNo >= SHOTS) {
      setShotNo(0);
      trail.current = [];
      ball.current = null;
      setMsg("Three more shots.");
      draw();
      return;
    }
    const shot = simulateShot(level, angle, speed);
    const n = shotNo + 1;
    setShotNo(n);
    setFlying(true);
    sfx.launch();
    trail.current = [];
    const path = shot.path;
    const reduced = prefersReducedMotion();
    const t0 = performance.now();
    const totalMs = Math.max(400, shot.time * 1000 * 0.75);
    const step = (now: number) => {
      const k = reduced ? 1 : Math.min(1, (now - t0) / totalMs);
      const idx = Math.min(path.length - 1, Math.floor(k * (path.length - 1)));
      ball.current = path[idx];
      trail.current = path.slice(0, idx + 1).filter((_, i) => i % 3 === 0);
      for (const p of parts.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.025;
      }
      parts.current = parts.current.filter((p) => p.life > 0);
      draw();
      // Keep going while the ball flies or the burst of sparks fades.
      if (k < 1 || parts.current.length) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    setTimeout(
      () => {
        setFlying(false);
        setMsg(feedback(level, shot, angle, speed, n));
        if (shot.outcome === "hit") {
          const stars = starsFor(n);
          writeLocal(LAUNCH_KEY, serializeLaunchProgress(recordLaunch(parseLaunchProgress(readLocal(LAUNCH_KEY)), level.id, stars)));
          setWon(true);
          sfx.win();
          vibrate(40);
          const cv = canvasRef.current;
          if (cv && !reduced) {
            const W = cv.clientWidth;
            const sc = (W - 32) / FIELD;
            const bx = 22 + shot.landX * sc;
            const by = cv.clientHeight - 24 - shot.landY * sc;
            const cols = ["#ffb238", "#3ee6b0", "#5cc8ff", "#ff6b80"];
            for (let i = 0; i < 40; i++) {
              const a = Math.random() * Math.PI * 2;
              const v = 1 + Math.random() * 4;
              parts.current.push({ x: bx, y: by, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, life: 1, c: cols[i % 4] });
            }
            requestAnimationFrame(step);
          }
          if (level.id === LAUNCH_LEVELS.length) confetti(stageRef.current, 70);
          reportRound(!!session, { kind: "play_round", game: "launch", level: level.id, hit: true, shots: n }, { level: level.id, hit: true });
        } else {
          sfx.miss();
          vibrate([50, 30, 50]);
          replay(stageRef.current, "pa-shake");
          if (n >= SHOTS) {
            setMsg((m) => `${m} Out of shots.`);
            reportRound(!!session, { kind: "play_round", game: "launch", level: level.id, hit: false, shots: n }, { level: level.id, hit: false });
          }
        }
      },
      reduced ? 50 : Math.max(400, shot.time * 1000 * 0.75) + 30
    );
  };

  if (!level) {
    const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
    return (
      <div className="pa-stage p-4">
        <p className="text-sm pa-dim">
          Set the angle and the speed, fire, hit the target. g = {G} m/s², as in the exam. {totalStars > 0 && `${totalStars} of ${LAUNCH_LEVELS.length * 3} stars.`}
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

  return (
    <div ref={stageRef} className="pa-stage flex flex-col">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <button type="button" className="text-sm font-semibold text-[var(--pa-sky)]" onClick={() => setLevel(null)}>
          Levels
        </button>
        <span className="pa-display truncate px-2 text-lg font-extrabold">
          {level.id}. {level.name}
        </span>
        <span className="flex gap-1" role="img" aria-label={`${SHOTS - shotNo} shots left`}>
          {Array.from({ length: SHOTS }, (_, i) => (
            <span key={i} className={`h-3 w-3 rounded-full ${i < SHOTS - shotNo ? "bg-[var(--pa-mango)]" : "bg-[var(--pa-night-3)]"}`} />
          ))}
        </span>
      </div>
      <div ref={wrapRef} className="relative h-[19rem] sm:h-[21rem]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label={`Launch field for level ${level.id}`} role="img" />
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
            next ? (
              <button type="button" className="pa-btn" onClick={() => choose(next)} autoFocus>
                Next level
              </button>
            ) : (
              <button type="button" className="pa-btn" onClick={() => setLevel(null)}>
                All levels won
              </button>
            )
          ) : (
            <button type="button" className="pa-btn !px-10" onClick={fire} disabled={flying}>
              {shotNo >= SHOTS ? "Try again" : "Fire"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
