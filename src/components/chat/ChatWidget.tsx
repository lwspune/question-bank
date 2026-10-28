"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Check, ListChecks, Reply, RotateCcw, SendHorizontal, ThumbsDown, ThumbsUp, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { useVFeatures } from "@/lib/chat/useVExplain";
import { CHAT_MESSAGE_MAX } from "@/lib/chat/validate";
import { vPlacement } from "@/lib/chat/placement";
import { launcherHiddenAfterScroll } from "@/lib/chat/launcherScroll";
import { panelBox, type PanelBox } from "@/lib/chat/panelBox";
import { NOT_UNDERSTOOD } from "@/lib/chat/understood";
import { figureSrc } from "@/lib/chat/solutionFigure";
import { SESSION_IDLE_MS, quoteSnippet, type HistoryTurn } from "@/lib/chat/conversation";
import {
  LOCAL_CHAT_KEY,
  newConversationId,
  parseStoredChat,
  preferNewer,
  readStoredChat,
  writeStoredChat,
} from "@/lib/chat/localChat";
import { celebrate } from "@/components/celebrate/celebrate";
import { fetchViewerSession, hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { usePulse } from "@/lib/viewer/usePulse";
import { anonAskedFromCookieHeader } from "@/lib/chat/anonLimit";
import { Button } from "@/components/ui/button";

/** How often a signed-in visitor's page loads may ask for a late answer (0160). */
const ACCOUNT_CHECK_EVERY_MS = 30 * 60 * 1000;
const ACCOUNT_CHECKED_KEY = "v-chat-account-checked";

function accountCheckDue(): boolean {
  try {
    const last = Number(localStorage.getItem(ACCOUNT_CHECKED_KEY) ?? 0);
    return !(Date.now() - last < ACCOUNT_CHECK_EVERY_MS);
  } catch {
    return true;
  }
}

/** The student has the late answer in front of them: mark it read (0160). */
function markSeen(conversationId: string): void {
  void fetch("/api/chat/seen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId }),
  }).catch(() => {});
}

function noteAccountChecked(): void {
  try {
    localStorage.setItem(ACCOUNT_CHECKED_KEY, String(Date.now()));
  } catch {
    // Storage blocked: the next page load just checks again.
  }
}
import { useCart } from "@/lib/cart/CartProvider";
import VSays from "./VSays";
import MathText from "./MathText";
import VQuestionCard from "./VQuestionCard";
import VAskedCard from "./VAskedCard";
import VFace, { type VAvatar } from "./VFace";
import ReplyText from "./VReplyText";
import VRevealReply from "./VRevealReply";
import VPlanCard from "./VPlanCard";
import VPassOffer from "./VPassOffer";
import { parseVPassOffer, type VPassOffer as PassOffer } from "@/lib/chat/passOffer";
import { liftDailyLimit } from "@/components/reveal/useRevealMeter";
import VProgressCard from "./VProgressCard";
import {
  ASK_V_EVENT,
  askedCardOf,
  askVMessage,
  isAskVDetail,
  parseAskedCard,
  questionForRequest,
  type AskVDetail,
} from "@/lib/chat/askVEvent";
import { MESSAGE_IN, USER_BUBBLE, V_BUBBLE } from "./chatStyles";
import PracticeBuilder, { PENDING_BUILD_KEY, logBuilderStep } from "./PracticeBuilder";
import type { BuilderAnswers } from "@/lib/practiceTests/builder";

// The animated-solution player loads only when a reply carries a visual.
const VAnimatedSolution = dynamic(() => import("@/components/visuals/AnimatedSolution"));

/**
 * One message in the window. An assistant turn may carry `links` (the paths
 * the server allows as links, lib/chat/replyLinks) and, for an AI reply, its
 * row `id`, `source` and the student's `feedback`. `transient` turns (errors)
 * are shown but never kept.
 */
type ChatTurn = HistoryTurn & {
  avatar?: VAvatar;
  transient?: boolean;
  /** A question card under V's reply (2026-10-19): a similar one to try, or a pasted one to confirm. */
  card?: { id: string; kind: "try" | "confirm" };
  /** The week plan under V's reply (2026-10-19): it made or read the student's plan. */
  plan?: boolean;
  /** The "How's my progress" card (2026-10-27): the student's own numbers, read when shown. */
  progress?: boolean;
  /** A fresh reply, shown a line at a time (2026-10-23). Never kept: a reply from history shows whole. */
  reveal?: boolean;
  /**
   * The pass offer under V's reply when the day's free answers stopped an explanation (2026-10-28).
   * Never kept: tomorrow, or once paid, an old offer would be wrong.
   */
  offer?: PassOffer;
};

/** What the device keeps of a turn: no face, no errors. */
function keepable(turns: readonly ChatTurn[]): HistoryTurn[] {
  return turns
    .filter((t) => !t.transient)
    .map((t) => {
      const { avatar: _avatar, transient: _transient, reveal: _reveal, offer: _offer, ...rest } = t;
      return rest as HistoryTurn;
    });
}

/** Builds a stored solution figure's link (lib/chat/solutionFigure.ts figureSrc). */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const GREETING: ChatTurn = {
  role: "assistant",
  avatar: "laugh",
  text: "Hi, I'm V. Ask me about any chapter or exam, or tap a button below.",
};

/**
 * Floating FAQ-chatbot launcher, visible to anon + authed visitors alike
 * (same audience as ThemeToggle).
 *
 * CONVERSATIONS (2026-10-15, migration 0159): the window keeps one conversation
 * id and its messages on the device (lib/chat/localChat: 30 messages) and sends
 * the id and the page with every request, so the server stores whole
 * conversations and V remembers the last exchanges. SESSIONS (owner,
 * 2026-10-21): an hour with no messages ends one, and the next open or message
 * starts a new conversation with the old messages, the tapped question and any
 * reply cleared; the old one stays stored. REPLY (migration 0174): a V reply
 * can be replied to, WhatsApp style, and V is told which one. On the
 * first open, a signed-in student's newer conversation from another device
 * replaces the device's copy. A reply that lands while the window is closed
 * raises a badge on the launcher and V says so in its bubble. AI replies take
 * a thumbs up or down; "Clear chat" starts a new conversation (the old one
 * stays stored).
 *
 * LATE ANSWERS (migration 0160): V answers questions it could not answer at
 * the time. A signed-in visitor's page load asks /api/chat/history (at most
 * every 30 minutes; signed-out visitors never ask, fetchViewerSession costs
 * them nothing). An unread late answer is adopted even over a newer chat on
 * this device, raises the badge and V's bubble, and is marked read when the
 * window opens.
 *
 * BUTTONS (2026-10-20, owner): "Build a practice test" and, since 2026-10-27,
 * "How's my progress" (a signed-in student who has answered something, while
 * the card is switched on, 0191). It replaced "Plan my week": 20 students
 * tapped that in a week, and 5 of the 63 chapter days their plans held were
 * done. Typed plan asks still get a plan. The six default questions the
 * buttons first sat beside were retired: V's AI answers them (lib/chat/faq.ts
 * keeps their labels).
 *
 * TYPING (2026-10-09). Since
 * 2026-10-15 POST /api/chat/typed answers typed questions with AI when
 * /dashboard/chat switches it on (the owner's fixed line otherwise), and a
 * reply's site paths come back as `links` the window renders as links.
 *
 * BUILDER (2026-10-15): "Build a practice test" turns the window into V's
 * step-by-step test builder (PracticeBuilder). A signed-out student's answers
 * wait in sessionStorage through sign-in, and V reopens on the builder when
 * they come back.
 *
 * SIZE (2026-10-16, owner): chat and builder share one window, full screen on
 * a phone and a larger panel from `sm` up. Until then only the builder grew;
 * the chat was a 22rem panel that already covered most of a phone screen.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "builder">("chat");
  const [resume, setResume] = useState<BuilderAnswers | undefined>(undefined);
  // The greeting is drawn before these and never stored.
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState("");
  // Signed out with the one typed question used (lib/chat/anonLimit.ts).
  const [signInNeeded, setSignInNeeded] = useState(false);
  // From the one session read below; "How's my progress" needs an account.
  const [signedIn, setSignedIn] = useState(false);
  const features = useVFeatures();
  // The header's shared read (no extra request): the button shows once there is something to show.
  const pulse = usePulse(signedIn && features.progress);
  const showProgress = !!pulse && ((pulse.totals?.answered ?? 0) > 0 || pulse.due > 0);
  // "Ask V about this question" (2026-10-19): the question this conversation is about, sent with each message.
  const [asked, setAsked] = useState<AskVDetail | null>(null);
  // "Reply" on one of V's replies (0174): the message the next typed message answers.
  const [replyingTo, setReplyingTo] = useState<{ id: string; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // A question card's Ask V reaches the window through a window event; the handler sees this render's state.
  const onAskRef = useRef<(d: AskVDetail) => void>(() => {});
  useEffect(() => {
    function onAsk(e: Event) {
      const d = (e as CustomEvent<unknown>).detail;
      if (isAskVDetail(d)) onAskRef.current(d);
    }
    window.addEventListener(ASK_V_EVENT, onAsk);
    return () => window.removeEventListener(ASK_V_EVENT, onAsk);
  }, []);
  // Phones only: tuck the launcher away while the student scrolls down a page
  // and bring it back on any scroll up (UX_ACTION_PLAN.md A7). It used to sit
  // over card content on every page. Never while the chat is open.
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    if (open) {
      setTucked(false);
      return;
    }
    const phone = window.matchMedia("(max-width: 639px)");
    let prevY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setTucked((hidden) => (phone.matches ? launcherHiddenAfterScroll({ prevY, y, hidden }) : false));
        prevY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  // Back from sign-in with a test half built: reopen V on the builder.
  useEffect(() => {
    let pending: BuilderAnswers | null = null;
    try {
      const raw = sessionStorage.getItem(PENDING_BUILD_KEY);
      if (raw) {
        sessionStorage.removeItem(PENDING_BUILD_KEY);
        pending = JSON.parse(raw) as BuilderAnswers;
      }
    } catch {
      pending = null;
    }
    if (pending) {
      setResume(pending);
      setMode("builder");
      setOpen(true);
    }
  }, []);

  // This device's conversation, read after mount (storage does not exist on the server).
  const storageReadyRef = useRef(false);
  const lastAtRef = useRef(0);
  useEffect(() => {
    const stored = readStoredChat();
    if (stored) {
      setConversationId(stored.conversationId);
      setTurns(stored.turns);
      setUnread(stored.unread);
      lastAtRef.current = stored.lastAt;
    } else {
      setConversationId(newConversationId());
      lastAtRef.current = Date.now();
    }
    storageReadyRef.current = true;
  }, []);
  useEffect(() => {
    if (!storageReadyRef.current || !conversationId) return;
    writeStoredChat({ v: 1, conversationId, lastAt: lastAtRef.current, unread, turns: keepable(turns) });
  }, [turns, unread, conversationId]);

  // Read by replies that land after an await: was the window open then?
  const openRef = useRef(open);
  // A late answer's conversation, to mark read once the window opens.
  const pendingSeenRef = useRef<string | null>(null);
  useEffect(() => {
    openRef.current = open;
    if (!open) return;
    setUnread(0);
    const seen = pendingSeenRef.current;
    if (seen) {
      pendingSeenRef.current = null;
      markSeen(seen);
    }
  }, [open]);

  // Current values for code that resumes after an await.
  const conversationIdRef = useRef<string | null>(null);
  const turnsRef = useRef<ChatTurn[]>([]);
  useEffect(() => {
    conversationIdRef.current = conversationId;
    turnsRef.current = turns;
  }, [conversationId, turns]);

  // Signed in: look for a late answer once this page load (throttled).
  // Signed out on a browser that has used its one question: show the sign-in button.
  useEffect(() => {
    let active = true;
    void fetchViewerSession().then((session) => {
      if (!active) return;
      setSignedIn(!!session);
      if (!session && anonAskedFromCookieHeader(document.cookie)) setSignInNeeded(true);
      if (session && accountCheckDue()) void loadAccountConversation();
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per mount, after storage is read
  }, []);

  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openRecordedRef = useRef(false);
  const accountCheckedRef = useRef(false);
  const pathname = usePathname() ?? "/";
  const cart = useCart();
  const placement = vPlacement(pathname, cart);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [turns]);

  // Phones: keep the panel on the visible area above the keyboard (lib/chat/panelBox).
  const [box, setBox] = useState<PanelBox | null>(null);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!open || !vv) return;
    const phone = window.matchMedia("(max-width: 639px)");
    const update = () => {
      setBox(panelBox(vv, phone.matches));
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      setBox(null);
    };
  }, [open]);

  // Email sign-in returns here without a page load, so V stays mounted: drop the sign-in button.
  useEffect(() => {
    if (signInNeeded && hasAuthCookie()) setSignInNeeded(false);
  }, [pathname, signInNeeded]);

  function close() {
    setOpen(false);
    setMode("chat");
    setResume(undefined);
    launcherRef.current?.focus();
  }

  function openBuilder() {
    logBuilderStep("open");
    setResume(undefined);
    setMode("builder");
  }

  const building = mode === "builder";

  /**
   * An hour with no messages ends a session (owner, 2026-10-21): start a new
   * conversation, clearing the old messages, the tapped question and any reply.
   * Returns the conversation id to send with, and whether it is new.
   */
  function currentSessionId(): { id: string | null; fresh: boolean } {
    if (turnsRef.current.length === 0 || Date.now() - lastAtRef.current <= SESSION_IDLE_MS) {
      return { id: conversationIdRef.current, fresh: false };
    }
    const id = newConversationId();
    conversationIdRef.current = id;
    turnsRef.current = [];
    lastAtRef.current = Date.now();
    setConversationId(id);
    setTurns([]);
    setUnread(0);
    setAsked(null);
    setReplyingTo(null);
    return { id, fresh: true };
  }

  function openChat() {
    const { id: sessionId } = currentSessionId();
    // Once per mount, so reopening the panel doesn't inflate /dashboard/chat's open count.
    if (!openRecordedRef.current) {
      openRecordedRef.current = true;
      trackFunnelOnce("chat_launcher_click", "session");
      void fetch("/api/chat/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: sessionId, pagePath: pathname }),
      }).catch(() => {});
    }
    void loadAccountConversation();
    setOpen(true);
  }

  /** Once per page load: a signed-in student's newer conversation from another device. */
  async function loadAccountConversation() {
    if (accountCheckedRef.current) return;
    accountCheckedRef.current = true;
    try {
      const res = await fetch("/api/chat/history");
      noteAccountChecked();
      const data = (await res.json().catch(() => ({}))) as { conversation?: unknown };
      if (!res.ok || !data.conversation) return;
      const account = parseStoredChat(JSON.stringify({ v: 1, unread: 0, ...(data.conversation as object) }));
      if (!account) return;
      // Refs, not state: this resolves after an await, possibly after the student typed.
      const currentId = conversationIdRef.current;
      const current = turnsRef.current;
      const device =
        currentId && current.length > 0
          ? { v: 1 as const, conversationId: currentId, lastAt: lastAtRef.current, unread: 0, turns: keepable(current) }
          : null;
      const lateAnswer = account.unread > 0;
      // An unread late answer is shown even over a newer chat here, or it would never be read.
      if (!lateAnswer && preferNewer(device, account) !== account) return;
      // Opening a late answer counts as a message, so the session does not end under the student.
      lastAtRef.current = lateAnswer ? Date.now() : Math.max(account.lastAt, lastAtRef.current);
      setConversationId(account.conversationId);
      setTurns(account.turns);
      if (!lateAnswer) return;
      if (openRef.current) {
        markSeen(account.conversationId);
      } else {
        pendingSeenRef.current = account.conversationId;
        setUnread(account.unread);
        setTucked(false);
        celebrate("Sorry for the wait! I've answered your earlier question. Tap me to read.", "talk");
      }
    } catch {
      // Signed out or offline: the device's copy stands.
    }
  }

  /** A fresh reply has shown its last line: what goes under it may show. */
  function endReveal(index: number) {
    setTurns((all) => all.map((t, i) => (i === index && t.role === "assistant" ? { ...t, reveal: false } : t)));
  }

  /** A message from the student or V. A reply that lands with the window shut is announced. */
  function addTurn(turn: ChatTurn) {
    if (!turn.transient) lastAtRef.current = Date.now();
    setTurns((t) => [...t, turn]);
    if (turn.role === "assistant" && !turn.transient && !openRef.current) {
      setUnread((u) => u + 1);
      setTucked(false); // a phone scrolled down had tucked the launcher away
      celebrate("I've replied. Tap me to read.", "talk");
    }
  }

  function clearChat() {
    try {
      localStorage.removeItem(LOCAL_CHAT_KEY);
    } catch {
      // Storage blocked: the fresh id below is enough.
    }
    lastAtRef.current = Date.now();
    setConversationId(newConversationId());
    setTurns([]);
    setUnread(0);
    setAsked(null);
    setReplyingTo(null);
    toast.success("Chat cleared");
  }

  async function giveFeedback(index: number, value: 1 | -1) {
    const turn = turns[index];
    if (!turn || turn.role !== "assistant" || !turn.id || !conversationId) return;
    const previous = turn.feedback === 1 || turn.feedback === -1 ? turn.feedback : null;
    const next = previous === value ? null : value;
    const setAt = (feedback: 1 | -1 | null) =>
      setTurns((all) => all.map((t, i) => (i === index && t.role === "assistant" ? { ...t, feedback } : t)));
    setAt(next);
    try {
      const res = await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: turn.id, conversationId, value: next }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(next === null ? "Feedback removed" : "Thanks, that helps V get better");
    } catch {
      setAt(previous);
      toast.error("Couldn't save that. Please try again.");
    }
  }

  /**
   * Yes or No to "Did you understand?" under an explanation (migration 0182).
   * A No also asks V, as the student, to explain it more simply.
   */
  async function answerUnderstood(index: number, value: boolean) {
    const turn = turns[index];
    if (!turn || turn.role !== "assistant" || !turn.id || !conversationId) return;
    const setAt = (understood: boolean | null) =>
      setTurns((all) => all.map((t, i) => (i === index && t.role === "assistant" ? { ...t, understood } : t)));
    setAt(value);
    try {
      const res = await fetch("/api/chat/understood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: turn.id, conversationId, value }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setAt(null);
      toast.error("Couldn't save that. Please try again.");
      return;
    }
    if (!value) void askTyped(NOT_UNDERSTOOD);
  }

  /**
   * "How's my progress" (2026-10-27): the card of the student's own numbers.
   * No AI call and nothing stored, so it costs no message and stays on this screen only.
   */
  function showProgressCard() {
    if (sending) return;
    trackFunnel("v_progress_tap", { action: "open" });
    addTurn({ role: "user", text: "How's my progress?", transient: true });
    addTurn({ role: "assistant", avatar: "idle", text: "Here's where you stand.", progress: true, transient: true });
  }

  /**
   * The pass was bought from the offer under reply `index`: the page's cards
   * open again, the offer goes, and the question that met the limit is asked
   * again, so the student gets their answer without leaving the chat.
   */
  function afterPassBought(index: number) {
    liftDailyLimit();
    setTurns((all) => all.map((t, i) => (i === index && t.role === "assistant" ? { ...t, offer: undefined } : t)));
    const asked = turnsRef.current[index - 1];
    if (asked?.role === "user") void askTyped(asked.text);
  }

  onAskRef.current = (d: AskVDetail) => {
    setMode("chat");
    openChat();
    setAsked(d);
    setReplyingTo(null);
    void askTyped(d.notes ? askVMessage(null) : askVMessage(d.chose, d), d);
  };

  function startReply(id: string, text: string) {
    setReplyingTo({ id, text });
    inputRef.current?.focus();
  }

  /** Send the draft, or `override` (an Ask V or a button). `about` is the question it is about. */
  async function askTyped(override?: string, about?: AskVDetail | null) {
    const text = (override ?? draft).trim();
    if (sending || !text) return;
    const { id: sessionId, fresh } = currentSessionId();
    // A new session drops the old tapped question and reply; a button send never carries a reply.
    const question = about ?? (fresh ? null : asked);
    const replyTo = override === undefined && !fresh ? replyingTo : null;
    // An Ask V tap shows its question above the message (owner, 2026-10-23).
    const askedCard = about ? askedCardOf(about, pathname) : null;
    addTurn({
      role: "user",
      text,
      ...(replyTo ? { quote: quoteSnippet(replyTo.text) } : {}),
      ...(askedCard ? { asked: askedCard } : {}),
    });
    if (override === undefined) setDraft("");
    setReplyingTo(null);
    setSending(true);
    try {
      const res = await fetch("/api/chat/typed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: sessionId,
          pagePath: pathname,
          ...(question ? { question: questionForRequest(question) } : {}),
          ...(replyTo ? { replyTo: replyTo.id } : {}),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        links?: string[];
        id?: string | null;
        source?: "ai" | "fallback";
        signInToContinue?: boolean;
        signInRequired?: boolean;
        similarQuestionId?: string;
        matchQuestionId?: string;
        planShown?: boolean;
        /** V explained something: "Did you understand?" goes under the reply (0182). */
        explained?: boolean;
        /** The explained question's stored solution figure, shown under the reply (2026-10-24). */
        solutionFigure?: string;
        /** The explained question's animated solution, played under the reply (2026-10-25). */
        solutionVisual?: unknown;
        /** The day's free answers stopped an explanation: the pass offer goes under the reply (2026-10-28). */
        passOffer?: unknown;
        /** Abuse after the calm line (lib/chat/abuse.ts): V says nothing. */
        silent?: boolean;
        error?: string;
      };
      if (res.ok && data.ok && data.silent) return;
      if (data.signInToContinue || data.signInRequired) setSignInNeeded(true);
      if (!res.ok || !data.ok || !data.reply) {
        const errorText = data.error || "V couldn't take that question. Please try again.";
        addTurn({ role: "assistant", avatar: "idle", text: errorText, transient: true });
        toast.error(errorText);
        return;
      }
      const links = Array.isArray(data.links) ? data.links.filter((l): l is string => typeof l === "string") : [];
      const card: ChatTurn["card"] = data.similarQuestionId
        ? { id: data.similarQuestionId, kind: "try" }
        : data.matchQuestionId
          ? { id: data.matchQuestionId, kind: "confirm" }
          : undefined;
      const plan = data.planShown === true ? true : undefined;
      const offer = parseVPassOffer(data.passOffer) ?? undefined;
      addTurn(
        data.source === "ai" && data.id
          ? {
              role: "assistant",
              avatar: "laugh",
              text: data.reply as string,
              links,
              id: data.id,
              source: "ai",
              feedback: null,
              card,
              plan,
              offer,
              reveal: true,
              explained: data.explained === true,
              understood: null,
              ...(typeof data.solutionFigure === "string" ? { figure: data.solutionFigure } : {}),
              ...(data.solutionVisual && typeof data.solutionVisual === "object" ? { visual: data.solutionVisual } : {}),
            }
          : { role: "assistant", avatar: "laugh", text: data.reply as string, links, card, plan, reveal: true }
      );
    } catch {
      const errorText = "V is unavailable right now. Please try again.";
      addTurn({ role: "assistant", avatar: "idle", text: errorText, transient: true });
      toast.error(errorText);
    } finally {
      setSending(false);
    }
  }

  if (placement.hidden) return null;

  // Vertical position lives in globals.css (.chat-launcher-offset): clear of
  // MobileTabBar below sm, and raised by --v-lift over /browse's cart pill.
  const lift = { "--v-lift": placement.aboveCart ? "3.5rem" : "0px" } as CSSProperties;

  return (
    <div className="chat-launcher-offset fixed right-4 z-50 print:hidden" style={lift}>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={building ? "Build a practice test with V" : "Chat with V"}
          style={box ?? undefined}
          className="fixed inset-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-background sm:static sm:mb-3 sm:h-[40rem] sm:max-h-[calc(100dvh-7rem)] sm:w-[30rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border sm:border-border sm:shadow-[0_28px_64px_-24px_rgb(15_29_74/0.55)] motion-safe:sm:animate-in motion-safe:sm:fade-in motion-safe:sm:slide-in-from-bottom-4 motion-safe:sm:duration-200"
          onKeyDown={(e) => {
            // The download box is a portal: its keys bubble here through React,
            // and its own Escape must not close V too.
            if (e.key === "Escape" && panelRef.current?.contains(e.target as Node)) close();
          }}
        >
          <div className="hero-brand flex shrink-0 items-center justify-between px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25">
                <VFace avatar="talk" className="h-8 w-8 object-contain" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-sans text-base font-semibold leading-tight">
                  {building ? "Build a practice test" : "Ask V"}
                </p>
                <p className="truncate text-xs text-white/85">
                  {building ? "V picks the questions for you" : "Your PYQ Vault study guide"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!building && turns.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={sending}
                  aria-label="Clear chat and start a new one"
                  title="Clear chat"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          {building ? (
            <PracticeBuilder initial={resume} onExit={() => setMode("chat")} onClose={close} />
          ) : (
          <>
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {[GREETING, ...turns].map((t, n) => {
              // n - 1 indexes `turns`; the greeting is never stored.
              const i = n - 1;
              if (t.role === "user") {
                // A turn may come from the device's saved chat, so its card is checked first.
                const asked = parseAskedCard(t.asked);
                return (
                  <div key={n} className={`flex flex-col ${MESSAGE_IN}`}>
                    {asked && <VAskedCard asked={asked} />}
                    <div className={USER_BUBBLE}>
                      {typeof t.quote === "string" && t.quote && (
                        <span className="mb-1 line-clamp-2 block border-l-2 border-white/70 pl-2 text-xs text-white/90">
                          <MathText text={t.quote} />
                        </span>
                      )}
                      {t.text}
                    </div>
                  </div>
                );
              }
              // What goes under the reply waits until its last line is out.
              const rateable = t.source === "ai" && !!t.id && !t.reveal;
              // The solution's figure, when the question V explained has one. A saved turn is checked first.
              const figure = t.reveal ? null : figureSrc(t.figure, SUPABASE_URL);
              return (
                <div key={n} className={`max-w-[90%] ${MESSAGE_IN}`}>
                  <div className="flex items-end gap-2">
                    <VFace avatar={t.reveal ? "talk" : (t.avatar ?? "idle")} className="h-7 w-7 shrink-0 object-contain" />
                    <div className={V_BUBBLE}>
                      {t.reveal ? (
                        <VRevealReply
                          text={t.text}
                          links={t.links}
                          onNavigate={close}
                          onGrow={() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight })}
                          onDone={() => endReveal(i)}
                        />
                      ) : (
                        <ReplyText text={t.text} links={t.links} onNavigate={close} />
                      )}
                    </div>
                  </div>
                  {figure && (
                    <a
                      href={figure}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open the solution's figure full size"
                      className="ml-9 mt-2 block w-fit max-w-[calc(100%-2.25rem)] rounded-lg border bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {/* A solution figure from our own storage, the same file the solution on the site shows. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={figure} alt="Figure from the solution" loading="lazy" className="max-h-72 max-w-full object-contain" />
                    </a>
                  )}
                  {/* The animated solution, when the question V explained has one. It plays on its own:
                      V's words are not the stored solution, so there are no steps to sync. */}
                  {t.role === "assistant" && !t.reveal && t.visual ? (
                    <div className="ml-9 mt-2 max-w-[calc(100%-2.25rem)] rounded-lg border bg-card p-2">
                      <VAnimatedSolution visual={t.visual} solution={null} />
                    </div>
                  ) : null}
                  {rateable && (
                    <div className="ml-9 mt-1 flex flex-wrap items-center gap-1">
                      {t.explained ? (
                        // "Did you understand?" replaces the thumbs under an explanation (owner, 2026-10-23).
                        t.understood === true ? (
                          <span className="inline-flex items-center gap-1 px-1 text-xs text-muted-foreground">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                            Great!
                          </span>
                        ) : t.understood === false ? (
                          <span className="px-1 text-xs text-muted-foreground">Let me explain it more simply.</span>
                        ) : (
                          <>
                            <span className="px-1 text-xs text-muted-foreground">Did you understand?</span>
                            {([true, false] as const).map((yes) => (
                              <button
                                key={String(yes)}
                                type="button"
                                disabled={sending}
                                onClick={() => void answerUnderstood(i, yes)}
                                className="inline-flex h-7 items-center rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                              >
                                {yes ? "Yes" : "No"}
                              </button>
                            ))}
                          </>
                        )
                      ) : (
                        <>
                      <button
                        type="button"
                        onClick={() => void giveFeedback(i, 1)}
                        aria-label="This reply was helpful"
                        aria-pressed={t.feedback === 1}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          t.feedback === 1 ? "text-brand-accent" : "text-muted-foreground"
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" aria-hidden fill={t.feedback === 1 ? "currentColor" : "none"} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void giveFeedback(i, -1)}
                        aria-label="This reply was not helpful"
                        aria-pressed={t.feedback === -1}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          t.feedback === -1 ? "text-brand-accent" : "text-muted-foreground"
                        }`}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" aria-hidden fill={t.feedback === -1 ? "currentColor" : "none"} />
                      </button>
                        </>
                      )}
                      {!signInNeeded && (
                        <button
                          type="button"
                          onClick={() => startReply(t.id!, t.text)}
                          aria-label="Reply to this message"
                          title="Reply"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Reply className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      )}
                    </div>
                  )}
                  {t.offer && !t.reveal && (
                    <div className="ml-9 max-w-[calc(100%-2.25rem)]">
                      <VPassOffer offer={t.offer} onPaid={() => afterPassBought(i)} onNavigate={close} />
                    </div>
                  )}
                  {t.card && !t.reveal && <VQuestionCard id={t.card.id} kind={t.card.kind} onNavigate={close} />}
                  {t.plan && !t.reveal && <VPlanCard onNavigate={close} />}
                  {t.progress && <VProgressCard onNavigate={close} />}
                </div>
              );
            })}
            {sending && (
              <div className={`flex max-w-[90%] items-end gap-2 ${MESSAGE_IN}`}>
                <VFace avatar="think" className="h-7 w-7 shrink-0 object-contain" />
                <div className={`${V_BUBBLE} flex items-center gap-1 py-3`} role="status">
                  <span className="sr-only">V is thinking</span>
                  <span aria-hidden className="v-typing-dot h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  <span aria-hidden className="v-typing-dot h-1.5 w-1.5 rounded-full bg-brand-accent" />
                  <span aria-hidden className="v-typing-dot h-1.5 w-1.5 rounded-full bg-brand-accent" />
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-border/70 bg-card shadow-[0_-12px_28px_-20px_rgb(15_29_74/0.35)]">
          <div className="relative">
            <div className="flex flex-wrap gap-2 px-3 pb-1 pt-3">
              <button
                type="button"
                onClick={openBuilder}
                disabled={sending}
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <ListChecks className="h-3.5 w-3.5" aria-hidden />
                Build a practice test
              </button>
              {showProgress && (
                <button
                  type="button"
                  onClick={showProgressCard}
                  disabled={sending}
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-brand-accent/25 bg-brand-accent/[0.06] px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-accent/45 hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                  How&apos;s my progress
                </button>
              )}
            </div>
          </div>

          {signInNeeded ? (
            <div className="space-y-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:pb-3">
              <p className="text-xs text-muted-foreground">Sign in to keep chatting with V. It&apos;s free.</p>
              <Button asChild variant="brand" className="w-full">
                <Link href={`/login?next=${encodeURIComponent(pathname)}`}>Sign in to keep chatting</Link>
              </Button>
            </div>
          ) : (
          <form
            className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:pb-3"
            onSubmit={(e) => {
              e.preventDefault();
              void askTyped();
            }}
          >
            {replyingTo && (
              <div className="mb-2 flex items-start gap-2 rounded-xl border-l-2 border-brand-accent bg-brand-accent/[0.06] py-1.5 pl-3 pr-1">
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-brand-accent">Replying to V</p>
                  <p className="line-clamp-1 text-xs text-foreground">
                    <MathText text={quoteSnippet(replyingTo.text)} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  aria-label="Cancel reply"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-full border border-input bg-background py-1 pl-4 pr-1 transition-shadow focus-within:border-brand-accent/60 focus-within:ring-2 focus-within:ring-ring">
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Escape cancels a reply first; the next one closes the window.
                  if (e.key === "Escape" && replyingTo) {
                    e.stopPropagation();
                    setReplyingTo(null);
                  }
                }}
                maxLength={CHAT_MESSAGE_MAX}
                placeholder={replyingTo ? "Type your reply" : "Type your question"}
                aria-label={replyingTo ? "Type your reply to V" : "Type your question for V"}
                className="h-9 min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={sending || !draft.trim()}
                aria-label="Send question"
                className="v-gradient inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-[opacity,transform] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
              >
                <SendHorizontal className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </form>
          )}
          </div>
          </>
          )}
        </div>
      )}

      {/* Celebrations, in V's voice (2026-10-04). Unmounted while the chat is
          open, so celebrate() falls back to the toast then. */}
      {!open && <VSays />}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : openChat())}
        aria-label={
          open
            ? "Close chat with V"
            : unread > 0
              ? `Chat with V, ${unread} new ${unread === 1 ? "reply" : "replies"}`
              : "Chat with V"
        }
        aria-expanded={open}
        title="Chat with V"
        tabIndex={tucked ? -1 : undefined}
        className={`relative ml-auto ${open ? "hidden sm:flex" : "flex"} h-11 w-11 items-center justify-center rounded-full bg-background shadow-lg transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:h-14 sm:w-14 ${
          tucked ? "pointer-events-none translate-y-[160%] opacity-0" : ""
        }`}
      >
        {open ? (
          <X className="h-5 w-5 text-foreground" aria-hidden />
        ) : (
          <VFace avatar="idle" className="h-9 w-9 object-contain sm:h-12 sm:w-12" />
        )}
        {!open && unread > 0 && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold leading-none text-brand-foreground ring-2 ring-background"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </div>
  );
}
