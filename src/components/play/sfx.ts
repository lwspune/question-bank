"use client";
import { readLocal, writeLocal } from "./useLocalStore";

/**
 * The /play games' sounds (2026-11-18), made in the browser with Web Audio:
 * no files to load and no package. The browser only allows sound after a tap,
 * and every game starts from one. Off is remembered per device; a phone that
 * buzzes (Android) also vibrates. Everything here fails silently: a game
 * never stops because sound or vibration is unavailable.
 */

export const SOUND_KEY = "pyqv-play-sound";

export const isMuted = () => readLocal(SOUND_KEY) === "off";
export const setMuted = (off: boolean) => writeLocal(SOUND_KEY, off ? "off" : "on");

let ctx: AudioContext | null = null;

function tone(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.15, slide?: number) {
  if (typeof window === "undefined" || isMuted()) return;
  try {
    const w: typeof globalThis & { webkitAudioContext?: typeof AudioContext } = window;
    const AC = w.AudioContext ?? w.webkitAudioContext;
    if (!AC) return;
    const ac = (ctx = ctx ?? new AC());
    const t = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {
    /* no audio: play on in silence */
  }
}

const seq = (notes: number[], gap: number, dur: number, type: OscillatorType = "triangle", vol = 0.15) =>
  notes.forEach((f, i) => setTimeout(() => tone(f, dur, type, vol), i * gap));

export const sfx = {
  /** A right answer; pitch climbs with the combo multiplier. */
  hit: (combo = 1) => tone(500 + combo * 90, 0.12, "triangle", 0.18, 900 + combo * 120),
  miss: () => tone(220, 0.25, "sawtooth", 0.12, 90),
  bad: () => tone(160, 0.12, "square", 0.08),
  power: () => seq([660, 880, 1320], 70, 0.12),
  tick: () => tone(900, 0.03, "square", 0.04),
  flip: (i: number) => tone(300 + i * 60, 0.08, "triangle", 0.1),
  launch: () => tone(140, 0.3, "sawtooth", 0.1, 60),
  win: () => seq([523, 659, 784, 1047], 110, 0.18),
  lose: () => seq([392, 330, 262], 160, 0.25, "sine", 0.14),
};

export function vibrate(pattern: number | number[]) {
  try {
    if (!isMuted()) navigator.vibrate?.(pattern);
  } catch {
    /* no vibration */
  }
}

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Re-run a CSS animation class on an element (shake, pop, bounce). */
export function replay(el: Element | null | undefined, cls: string) {
  if (!el || prefersReducedMotion()) return;
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}

const CONFETTI = ["#ffb238", "#3ee6b0", "#5cc8ff", "#ff6b80", "#b48cff"];

/** A burst of confetti inside `host` (which must be position: relative). */
export function confetti(host: HTMLElement | null, n = 50) {
  if (!host || prefersReducedMotion()) return;
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span");
    c.className = "pa-confetti";
    c.style.left = `${Math.random() * 100}%`;
    c.style.top = `${-10 - Math.random() * 60}px`;
    c.style.background = CONFETTI[i % CONFETTI.length];
    c.style.animationDelay = `${Math.random() * 0.4}s`;
    c.style.animationDuration = `${1 + Math.random() * 0.8}s`;
    host.appendChild(c);
    setTimeout(() => c.remove(), 2400);
  }
}

/** Sparks from a point inside `host`. */
export function sparks(host: HTMLElement | null, x: number, y: number, color: string, n = 12) {
  if (!host || prefersReducedMotion()) return;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "pa-spark";
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.background = color;
    const a = Math.random() * Math.PI * 2;
    const d = 30 + Math.random() * 40;
    s.style.setProperty("--dx", `${Math.cos(a) * d}px`);
    s.style.setProperty("--dy", `${Math.sin(a) * d}px`);
    host.appendChild(s);
    setTimeout(() => s.remove(), 520);
  }
}

/** A short-lived text inside `host`: "+30", "Faster!", "One away!". */
export function floatText(host: HTMLElement | null, text: string, cls: "pa-float" | "pa-banner" | "pa-toast", x?: number, y?: number, color?: string) {
  if (!host) return;
  const el = document.createElement("div");
  el.className = cls;
  el.textContent = text;
  if (x !== undefined) el.style.left = `${x}px`;
  if (y !== undefined) el.style.top = `${y}px`;
  if (color) el.style.color = color;
  el.setAttribute("aria-hidden", "true");
  host.appendChild(el);
  setTimeout(() => el.remove(), cls === "pa-toast" ? 2300 : 1000);
}
