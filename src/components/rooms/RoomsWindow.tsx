"use client";

/**
 * The exam rooms window (owner, 2026-11-25; mockup
 * https://claude.ai/artifact/2sYYprVehbTXjsuw69faX4). Full screen on a phone,
 * a panel at the LEFT from `sm` up, mirroring V's on the right. Three screens:
 * the student's rooms (joined first, then the other exams on their profile,
 * or their guessed exam while none is chosen; a circle not joined says when
 * today's question is up, 2026-11-27),
 * a room's Join screen with its rules, and the room itself.
 *
 * No live connection (phase 1): an open room asks for new messages while the
 * tab is visible, every 6 seconds while messages flow and every 20 once quiet
 * (lib/rooms/poll). Closing the window stops it.
 */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  Clock,
  EyeOff,
  Shuffle,
  Loader2,
  MessagesSquare,
  MoreVertical,
  Pin,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import {
  answerQuestion,
  askVInRoom,
  fetchPage,
  fetchRooms,
  reportMessage,
  joinRoom,
  leaveRoom,
  renameInRoom,
  sendMessage,
  type RoomsListResponse,
} from "@/lib/rooms/client";
import { isNearEnd, nextPollDelay } from "@/lib/rooms/poll";
import { linkOpensHere, splitLinks } from "@/lib/rooms/links";
import { plainPreview, roomBadge } from "@/lib/rooms/list";
import { ROOM_TEXT_MAX } from "@/lib/rooms/text";
import { NICK_MAX, suggestNickname } from "@/lib/rooms/nickname";
import { backAtLabel, hideUntilFor } from "@/lib/rooms/button";
import type { RoomMessageView, RoomQuestionView } from "@/lib/rooms/view";
import type { RoomListItem } from "@/lib/rooms/list";
import { groupRoomItems, systemLineText } from "@/lib/rooms/systemLines";
import type { RoomReportReason } from "@/lib/rooms/validate";

const WINDOW =
  "fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-background sm:inset-auto sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:left-4 sm:top-4 sm:h-auto sm:w-[28rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border sm:border-border sm:shadow-[0_28px_64px_-24px_rgb(15_29_74/0.55)] motion-safe:sm:animate-in motion-safe:sm:fade-in motion-safe:sm:slide-in-from-bottom-4 motion-safe:sm:duration-200";
const HEADER =
  "flex shrink-0 items-center gap-1 border-b border-border bg-card px-1 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-2";
const ICON_BUTTON =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const CHIP =
  "inline-flex h-8 items-center rounded-full border border-border bg-card px-3 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

type View =
  | { kind: "list" }
  | { kind: "join"; slug: string; name: string }
  | { kind: "room"; slug: string; name: string };

const REASONS: { value: RoomReportReason; label: string }[] = [
  { value: "spam", label: "Spam" },
  { value: "abuse", label: "Rude" },
  { value: "personal", label: "Personal details" },
  { value: "off_topic", label: "Off topic" },
];

const TIME = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});
const DAY = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});
const DAY_KEY = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

function dayLabel(iso: string): string {
  const key = DAY_KEY.format(new Date(iso));
  const today = DAY_KEY.format(new Date());
  const yesterday = DAY_KEY.format(new Date(Date.now() - 86_400_000));
  if (key === today) return "Today";
  if (key === yesterday) return "Yesterday";
  return DAY.format(new Date(iso));
}

function errorText(e: unknown): string {
  return e instanceof Error
    ? e.message
    : "Something went wrong. Please try again.";
}

function RoomAvatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const cls =
    size === "lg"
      ? "h-16 w-16 text-lg"
      : size === "sm"
        ? "h-9 w-9 text-[9px] leading-none"
        : "h-12 w-12 text-[11px] leading-none";
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand font-bold text-brand-foreground ${cls}`}
    >
      {roomBadge(name)}
    </span>
  );
}

export default function RoomsWindow({
  onClose,
  onCounts,
  onHide,
}: {
  onClose: () => void;
  /** Fresh badge numbers for the bubble (lib/rooms/store). */
  onCounts: (c: { unread: number; waiting: number }) => void;
  /** Hide the rooms button for focused study (lib/rooms/button). */
  onHide: (mode: "2h" | "off") => void;
}) {
  const [view, setView] = useState<View>({ kind: "list" });
  const [rooms, setRooms] = useState<RoomsListResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // The parent's callback through a ref: depending on it would re-run the
  // fetch on every parent render (a loop, tests/rooms-store.test.ts).
  const onCountsRef = useRef(onCounts);
  useEffect(() => {
    onCountsRef.current = onCounts;
  }, [onCounts]);

  const reload = useCallback(async () => {
    try {
      const r = await fetchRooms();
      setRooms(r);
      setLoadError(null);
      onCountsRef.current({ unread: r.unread, waiting: r.waiting });
    } catch (e) {
      setLoadError(errorText(e));
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section role="dialog" aria-label="Exam circles" className={WINDOW}>
      {view.kind === "list" && (
        <RoomList
          rooms={rooms}
          error={loadError}
          onClose={onClose}
          onHide={onHide}
          onOpen={(slug, name) => setView({ kind: "room", slug, name })}
          onJoin={(slug, name) => setView({ kind: "join", slug, name })}
        />
      )}
      {view.kind === "join" && (
        <JoinRoom
          name={view.name}
          slug={view.slug}
          onBack={() => setView({ kind: "list" })}
          onJoined={() => {
            void reload();
            setView({ kind: "room", slug: view.slug, name: view.name });
          }}
        />
      )}
      {view.kind === "room" && (
        <RoomChat
          key={view.slug}
          slug={view.slug}
          name={view.name}
          joined={rooms?.joined ?? []}
          onSwitch={(slug, name) => setView({ kind: "room", slug, name })}
          onBack={() => {
            void reload();
            setView({ kind: "list" });
          }}
          onClose={() => {
            void reload();
            onClose();
          }}
        />
      )}
    </section>
  );
}

/** A circle the student has not joined: its name, whether today's question is up, and Join. */
function NotJoinedRow({
  room,
  onJoin,
}: {
  room: RoomListItem;
  onJoin: (slug: string, name: string) => void;
}) {
  return (
    <>
      <RoomAvatar name={room.name} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{room.name}</span>
        {room.today ? (
          <span className="block text-sm font-semibold text-brand-accent">
            Today&apos;s question is up
          </span>
        ) : (
          <span className="block text-sm text-muted-foreground">
            Daily question, doubts on PYQs
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={() => onJoin(room.slug, room.name)}
        aria-label={
          room.today
            ? `Join the ${room.name} circle, today's question is up`
            : `Join the ${room.name} circle`
        }
        className="relative inline-flex h-9 shrink-0 items-center rounded-full border-[1.5px] border-brand px-4 text-sm font-semibold text-brand-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Join
        {room.today && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-background"
          />
        )}
      </button>
    </>
  );
}

function RoomList({
  rooms,
  error,
  onClose,
  onHide,
  onOpen,
  onJoin,
}: {
  rooms: RoomsListResponse | null;
  error: string | null;
  onClose: () => void;
  onHide: (mode: "2h" | "off") => void;
  onOpen: (slug: string, name: string) => void;
  onJoin: (slug: string, name: string) => void;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <>
      {sheetOpen && (
        <HideSheet onPick={onHide} onCancel={() => setSheetOpen(false)} />
      )}
      <header className={HEADER}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close exam circles"
          className={ICON_BUTTON}
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold leading-tight">Exam circles</h2>
          <p className="text-xs text-muted-foreground">
            Circles for the exams you study
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-label="Circles options"
          aria-haspopup="dialog"
          className={ICON_BUTTON}
        >
          <MoreVertical className="h-5 w-5" aria-hidden />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto py-2">
        {error && (
          <p className="px-4 py-6 text-sm text-muted-foreground">{error}</p>
        )}
        {!rooms && !error && (
          <p className="flex items-center gap-2 px-4 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading
            circles
          </p>
        )}
        {rooms && rooms.joined.length === 0 && rooms.others.length === 0 && rooms.guessed.length === 0 && (
          <div className="px-4 py-8 text-sm text-muted-foreground">
            <p>Choose your exams to see their circles.</p>
            <a
              href="/account"
              className="mt-2 inline-block font-semibold text-brand-accent underline-offset-4 hover:underline"
            >
              Choose exams
            </a>
          </div>
        )}
        {rooms && rooms.joined.length > 0 && (
          <>
            <h3 className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Joined
            </h3>
            <ul>
              {rooms.joined.map((r) => (
                <li key={r.slug}>
                  <button
                    type="button"
                    onClick={() => onOpen(r.slug, r.name)}
                    aria-label={`Open the ${r.name} circle${r.unread > 0 ? `, ${r.unread} unread` : ""}`}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  >
                    <RoomAvatar name={r.name} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold">{r.name}</span>
                        {r.last && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {TIME.format(new Date(r.last.at))}
                          </span>
                        )}
                      </span>
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm text-muted-foreground">
                          {r.last
                            ? `${r.last.name}: ${plainPreview(r.last.body)}`
                            : "No messages yet"}
                        </span>
                        {r.unread > 0 && (
                          <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-brand-foreground">
                            <span className="sr-only">Unread: </span>
                            {r.unread > 99 ? "99+" : r.unread}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {rooms && rooms.others.length > 0 && (
          <>
            <h3 className="px-4 pb-1 pt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Also for your exams
            </h3>
            <ul>
              {rooms.others.map((r) => (
                <li
                  key={r.slug}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <NotJoinedRow room={r} onJoin={onJoin} />
                </li>
              ))}
            </ul>
          </>
        )}
        {rooms && rooms.guessed.length > 0 && (
          <>
            <h3 className="px-4 pb-1 pt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Our guess for your exam
            </h3>
            <ul>
              {rooms.guessed.map((r) => (
                <li key={r.slug} className="flex items-center gap-3 px-4 py-2.5">
                  <NotJoinedRow room={r} onJoin={onJoin} />
                </li>
              ))}
            </ul>
            <p className="mx-4 mt-3 text-xs leading-relaxed text-muted-foreground">
              Joining adds {rooms.guessed[0].name} to your exams.{" "}
              <a
                href="/account"
                className="font-semibold text-brand-accent underline-offset-4 hover:underline"
              >
                Choose a different exam
              </a>
            </p>
          </>
        )}
        {rooms && (rooms.joined.length > 0 || rooms.others.length > 0) && rooms.guessed.length === 0 && (
          <p className="mx-4 mt-6 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
            You see circles only for the exams on your profile.{" "}
            <a
              href="/account"
              className="font-semibold text-brand-accent underline-offset-4 hover:underline"
            >
              Change your exams
            </a>{" "}
            to see other circles.
          </p>
        )}
      </div>
    </>
  );
}

/** The rooms list's options (mockup H1): hide the button for 2 hours or until turned back on. */
function HideSheet({
  onPick,
  onCancel,
}: {
  onPick: (mode: "2h" | "off") => void;
  onCancel: () => void;
}) {
  const OPTION =
    "flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div
      className="absolute inset-0 z-10 flex items-end bg-[rgb(15_29_74/0.35)]"
      onClick={onCancel}
    >
      <section
        role="dialog"
        aria-label="Hide the circles button"
        onClick={(e) => e.stopPropagation()}
        className="w-full space-y-2 rounded-t-2xl bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_-12px_rgb(15_29_74/0.35)]"
      >
        <h3 className="text-lg font-bold">Hide the circles button</h3>
        <p className="pb-2 text-sm text-muted-foreground">
          For focused study. You can still open Exam circles from your account
          menu.
        </p>
        <button type="button" onClick={() => onPick("2h")} className={OPTION}>
          <span className="icon-tile inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Clock className="h-4 w-4" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold">For 2 hours</span>
            <span className="block text-sm text-muted-foreground">
              {backAtLabel(hideUntilFor("2h", Date.now()) ?? "")}, by itself
            </span>
          </span>
        </button>
        <button type="button" onClick={() => onPick("off")} className={OPTION}>
          <span className="icon-tile inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <EyeOff className="h-4 w-4" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold">Until I turn it back on</span>
            <span className="block text-sm text-muted-foreground">
              From the account menu or Account
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Cancel
        </button>
      </section>
    </div>
  );
}

/** A room nickname field with a random suggestion and "Try another" (migration 0290). */
function NicknameField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <input
        id={id}
        value={value}
        maxLength={NICK_MAX}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background px-3 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <button
        type="button"
        onClick={() => onChange(suggestNickname())}
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Shuffle className="h-4 w-4" aria-hidden />
        Try another
      </button>
    </div>
  );
}

function JoinRoom({
  slug,
  name,
  onBack,
  onJoined,
}: {
  slug: string;
  name: string;
  onBack: () => void;
  onJoined: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [nickname, setNickname] = useState(() => suggestNickname());
  async function join() {
    setBusy(true);
    try {
      const r = await joinRoom(slug, nickname);
      toast.success(
        r.promoted
          ? `You joined the ${name} circle as ${nickname.trim()}. ${name} is now one of your exams.`
          : `You joined the ${name} circle as ${nickname.trim()}.`
      );
      onJoined();
    } catch (e) {
      toast.error(errorText(e));
      setBusy(false);
    }
  }
  return (
    <>
      <header className={HEADER}>
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to circles"
          className={ICON_BUTTON}
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <h2 className="text-base font-bold">{name} circle</h2>
      </header>
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <RoomAvatar name={name} size="lg" />
          <p className="text-lg font-bold">{name} circle</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            For students preparing for {name}. Ask doubts on past questions and
            solve the daily question together.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="icon-tile inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <Pin className="h-4 w-4" aria-hidden />
            </span>
            <span>
              <strong className="font-semibold">A daily question</strong>
              <br />
              <span className="text-muted-foreground">
                A past {name} question, pinned every morning.
              </span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="icon-tile inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-extrabold">
              V
            </span>
            <span>
              <strong className="font-semibold">V answers doubts too</strong>
              <br />
              <span className="text-muted-foreground">
                Tap Ask V on a doubt and V replies in the circle.
              </span>
            </span>
          </li>
        </ul>
        <div className="space-y-2">
          <label
            htmlFor={`join-nick-${slug}`}
            className="block text-sm font-semibold"
          >
            Your name in this circle
          </label>
          <NicknameField
            id={`join-nick-${slug}`}
            value={nickname}
            onChange={setNickname}
          />
          <p className="text-xs text-muted-foreground">
            Other students see this name, never your real one. You can change it
            later.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Circle rules
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Be kind. Every question is a fair question.</li>
            <li>Stay on {name} preparation.</li>
            <li>No phone numbers, emails, links or social media handles.</li>
            <li>Don&apos;t share your full name, school or city.</li>
            <li>Break these and you are muted.</li>
          </ul>
        </div>
      </div>
      <div className="shrink-0 space-y-1 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={join}
          disabled={busy || !nickname.trim()}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-base font-semibold text-brand-foreground hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Join {name} circle
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Not now
        </button>
      </div>
    </>
  );
}

function mergeById(
  a: RoomMessageView[],
  b: RoomMessageView[],
): RoomMessageView[] {
  const map = new Map<number, RoomMessageView>();
  for (const m of a) map.set(m.id, m);
  for (const m of b) map.set(m.id, m);
  return [...map.values()].sort((x, y) => x.id - y.id);
}

function RoomChat({
  slug,
  name,
  joined,
  onSwitch,
  onBack,
  onClose,
}: {
  slug: string;
  name: string;
  joined: { slug: string; name: string }[];
  onSwitch: (slug: string, name: string) => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<RoomMessageView[] | null>(null);
  const [pinned, setPinned] = useState<RoomMessageView | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [reporting, setReporting] = useState<number | null>(null);
  const [asking, setAsking] = useState<number | null>(null);
  const [replyTo, setReplyTo] = useState<RoomMessageView | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  // The room menu (0290): Change my name, Leave circle.
  const [panel, setPanel] = useState<null | "menu" | "rename" | "leave">(null);
  const [nickname, setNickname] = useState("");
  const [draft, setDraft] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastIdRef = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  // Open at the newest message and stay there while the chat grows: the first
  // page drawing in, question cards, maths and pictures finishing a moment
  // later. A jump timed to one frame landed before all of that (students had
  // to scroll down on every open). Scrolling up to read stops the pinning.
  useEffect(() => {
    const list = listRef.current;
    const content = contentRef.current;
    if (!list || !content || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      if (atBottomRef.current) list.scrollTop = list.scrollHeight;
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  const absorb = useCallback(
    (incoming: RoomMessageView[]) => {
      if (incoming.length === 0) return;
      setMessages((prev) => mergeById(prev ?? [], incoming));
      lastIdRef.current = Math.max(
        lastIdRef.current,
        ...incoming.map((m) => m.id),
      );
      if (atBottomRef.current) scrollToEnd();
    },
    [scrollToEnd],
  );

  // First page, then polling while the room is open and the tab is visible.
  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastNewAt = Date.now();

    async function tick() {
      if (stopped) return;
      if (document.visibilityState === "visible" && lastIdRef.current > 0) {
        try {
          const page = await fetchPage(slug, { after: lastIdRef.current });
          if (page.messages.length) lastNewAt = Date.now();
          absorb(page.messages);
          setPinned(page.pinned);
        } catch {
          // A missed poll is retried on the next one.
        }
      }
      if (!stopped)
        timer = setTimeout(tick, nextPollDelay(Date.now() - lastNewAt));
    }

    fetchPage(slug)
      .then((page) => {
        if (stopped) return;
        setMessages(page.messages);
        setNickname(page.nickname);
        setPinned(page.pinned);
        setHasMore(page.hasMore);
        lastIdRef.current = page.messages.length
          ? page.messages[page.messages.length - 1].id
          : 1;
        scrollToEnd();
        timer = setTimeout(tick, nextPollDelay(0));
      })
      .catch((e) => setError(errorText(e)));

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [slug, absorb, scrollToEnd]);

  async function loadEarlier() {
    if (!messages?.length) return;
    try {
      const page = await fetchPage(slug, { before: messages[0].id });
      setMessages((prev) => mergeById(page.messages, prev ?? []));
      setHasMore(page.hasMore);
    } catch (e) {
      toast.error(errorText(e));
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const r = await sendMessage(slug, text, replyTo?.id ?? null);
      setText("");
      setReplyTo(null);
      atBottomRef.current = true;
      absorb([r.message]);
    } catch (err) {
      toast.error(errorText(err));
    } finally {
      setSending(false);
    }
  }

  async function askV(m: RoomMessageView) {
    setAsking(m.id);
    setSelected(null);
    try {
      const r = await askVInRoom(slug, m.id);
      if (r.message) {
        atBottomRef.current = true;
        absorb([r.message]);
        setMessages((prev) =>
          (prev ?? []).map((x) =>
            x.id === m.id ? { ...x, canAskV: false } : x,
          ),
        );
      } else if (r.skipped) {
        toast(r.error ?? "V answers study doubts only.");
      }
    } catch (err) {
      toast.error(errorText(err));
    } finally {
      setAsking(null);
    }
  }

  async function report(m: RoomMessageView, reason: RoomReportReason) {
    try {
      await reportMessage(slug, m.id, reason);
      toast.success("Reported. Thanks for keeping the circle useful.");
    } catch (err) {
      toast.error(errorText(err));
    } finally {
      setReporting(null);
      setSelected(null);
    }
  }

  async function leave() {
    try {
      await leaveRoom(slug);
      toast.success(`You left the ${name} circle.`);
      onBack();
    } catch (err) {
      toast.error(errorText(err));
    }
  }

  async function rename(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim() || renaming) return;
    setRenaming(true);
    try {
      const r = await renameInRoom(slug, draft);
      setNickname(r.nickname);
      setPanel(null);
      toast.success(
        `Your name in this circle is now ${r.nickname}. Earlier messages keep the old name.`,
      );
    } catch (err) {
      toast.error(errorText(err));
    } finally {
      setRenaming(false);
    }
  }

  function onAnswered(messageId: number, question: RoomQuestionView) {
    const patch = (m: RoomMessageView) =>
      m.id === messageId ? { ...m, question } : m;
    setMessages((prev) => (prev ?? []).map(patch));
    setPinned((p) => (p ? patch(p) : p));
  }

  // The pinned bar jumps to the question in the chat when it is loaded; only a
  // pin further back than the loaded page opens in place (no second copy).
  function openPinned() {
    if (!pinned) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `#room-msg-${pinned.id}`,
    );
    if (el) {
      setShowPinned(false);
      el.scrollIntoView({ block: "start", behavior: "smooth" });
    } else {
      setShowPinned((s) => !s);
    }
  }

  let lastDay = "";

  return (
    <>
      <header className={HEADER}>
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to circles"
          className={ICON_BUTTON}
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <RoomAvatar name={name} size="sm" />
        <div className="min-w-0 flex-1 pl-1">
          <h2 className="truncate text-base font-bold leading-tight">
            {name} circle
          </h2>
          <p className="truncate text-xs text-muted-foreground">
            Doubts, PYQs and the daily question
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPanel((p) => (p ? null : "menu"))}
          aria-label="Circle options"
          aria-expanded={panel !== null}
          className={ICON_BUTTON}
        >
          <MoreVertical className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close exam circles"
          className={`${ICON_BUTTON} hidden sm:inline-flex`}
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </header>

      {panel === "menu" && (
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-muted px-4 py-2 text-sm">
          <span className="basis-full text-muted-foreground">
            You are <strong className="text-foreground">{nickname}</strong> here
          </span>
          <button
            type="button"
            onClick={() => {
              setDraft(nickname);
              setPanel("rename");
            }}
            className={CHIP}
          >
            Change my name
          </button>
          <button
            type="button"
            onClick={() => setPanel("leave")}
            className={CHIP}
          >
            Leave circle
          </button>
        </div>
      )}
      {panel === "rename" && (
        <form
          onSubmit={rename}
          className="shrink-0 space-y-2 border-b border-border bg-muted px-4 py-3 text-sm"
        >
          <label htmlFor={`rename-${slug}`} className="block font-semibold">
            Your name in this circle
          </label>
          <NicknameField
            id={`rename-${slug}`}
            value={draft}
            onChange={setDraft}
          />
          <p className="text-xs text-muted-foreground">
            New messages use the new name. Earlier ones keep the old one.
          </p>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={renaming || !draft.trim()}
              className={CHIP}
            >
              {renaming && (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" aria-hidden />
              )}
              Save
            </button>
            <button
              type="button"
              onClick={() => setPanel(null)}
              className={CHIP}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {panel === "leave" && (
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2 text-sm">
          <span>Leave the {name} circle?</span>
          <span className="flex gap-2">
            <button type="button" onClick={leave} className={CHIP}>
              Leave
            </button>
            <button
              type="button"
              onClick={() => setPanel(null)}
              className={CHIP}
            >
              Cancel
            </button>
          </span>
        </div>
      )}

      {joined.length > 1 && (
        <div
          role="tablist"
          aria-label="Your circles"
          className="hidden shrink-0 gap-2 overflow-x-auto border-b border-border px-4 py-2 sm:flex"
        >
          {joined.map((r) => (
            <button
              key={r.slug}
              type="button"
              role="tab"
              aria-selected={r.slug === slug}
              onClick={() => r.slug !== slug && onSwitch(r.slug, r.name)}
              className={`h-8 shrink-0 rounded-full px-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                r.slug === slug
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      )}

      {pinned && (
        <div className="shrink-0 border-b border-border bg-card">
          <button
            type="button"
            onClick={openPinned}
            aria-expanded={showPinned}
            className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
          >
            <span
              aria-hidden
              className="w-[3px] self-stretch rounded bg-brand"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-brand-accent">
                Pinned · Today&apos;s question
              </span>
              <span className="block truncate text-sm text-muted-foreground">
                {plainPreview(
                  pinned.question ? pinned.question.text : pinned.body,
                )}
              </span>
            </span>
            <Pin
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
          </button>
          {showPinned && pinned.question && (
            <div className="max-h-[50vh] overflow-y-auto px-3 pb-3">
              <QuestionCard
                slug={slug}
                messageId={pinned.id}
                question={pinned.question}
                onAnswered={onAnswered}
              />
            </div>
          )}
        </div>
      )}

      <div
        ref={listRef}
        onScroll={(e) => {
          atBottomRef.current = isNearEnd(e.currentTarget);
        }}
        className="flex-1 overflow-y-auto bg-muted/60 px-3 py-3"
        aria-live="polite"
      >
        <div ref={contentRef} className="space-y-2.5">
        {error && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {error}
          </p>
        )}
        {!messages && !error && (
          <p className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading
            messages
          </p>
        )}
        {hasMore && (
          <div className="text-center">
            <button type="button" onClick={loadEarlier} className={CHIP}>
              Show earlier messages
            </button>
          </div>
        )}
        {messages && messages.every((m) => m.kind === "system") && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No messages yet. Ask the first doubt.
          </p>
        )}
        {messages &&
          groupRoomItems(messages, dayLabel).map((item) => {
          const at = item.type === "system" ? item.at : item.message.at;
          const day = dayLabel(at);
          const showDay = day !== lastDay;
          lastDay = day;
          const dayChip = showDay && (
            <p className="mx-auto w-fit rounded-full bg-card px-3 py-0.5 text-xs text-muted-foreground">
              {day}
            </p>
          );
          if (item.type === "system") {
            return (
              <div key={`line-${item.key}`} className="space-y-2.5">
                {dayChip}
                <p className="mx-auto w-fit max-w-[90%] text-center text-xs text-muted-foreground">
                  {systemLineText(item)}
                </p>
              </div>
            );
          }
          const m = item.message;
          return (
            <div
              key={m.id}
              id={`room-msg-${m.id}`}
              className="scroll-mt-2 space-y-2.5"
            >
              {dayChip}
              <MessageBubble
                m={m}
                slug={slug}
                selected={selected === m.id}
                onSelect={() => {
                  setSelected((s) => (s === m.id ? null : m.id));
                  setReporting(null);
                }}
                reporting={reporting === m.id}
                asking={asking === m.id}
                onReply={() => {
                  setReplyTo(m);
                  setSelected(null);
                }}
                onAskV={() => askV(m)}
                onReportOpen={() => setReporting(m.id)}
                onReport={(reason) => report(m, reason)}
                onAnswered={onAnswered}
              />
            </div>
          );
        })}
        </div>
      </div>

      <form
        onSubmit={submit}
        className="shrink-0 border-t border-border bg-card p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        {replyTo && (
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs">
            <span className="min-w-0 flex-1 truncate">
              Replying to <strong>{replyTo.name}</strong>:{" "}
              {plainPreview(replyTo.body)}
            </span>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              aria-label="Cancel reply"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-card"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <label htmlFor={`room-input-${slug}`} className="sr-only">
            Message the {name} circle
          </label>
          <textarea
            id={`room-input-${slug}`}
            rows={1}
            value={text}
            maxLength={ROOM_TEXT_MAX}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={`Message ${name} circle`}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-3xl border border-input bg-background px-4 py-2.5 text-[15px] leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            aria-label="Send"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Send className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
        {text.length > ROOM_TEXT_MAX - 100 && (
          <p className="mt-1 px-2 text-right text-xs text-muted-foreground">
            {text.length} / {ROOM_TEXT_MAX}
          </p>
        )}
      </form>
    </>
  );
}

/**
 * A team message's text with its web links tappable (students cannot post
 * links). Pieces become React nodes, never HTML. Our own pages open here,
 * any other site in a new tab.
 */
function LinkedText({ body }: { body: string }) {
  return (
    <>
      {splitLinks(body).map((p, i) =>
        p.kind === "text" ? (
          <span key={i}>{p.text}</span>
        ) : (
          <a
            key={i}
            href={p.href}
            {...(linkOpensHere(p.href)
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            className="break-all font-medium text-brand-accent underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {p.text}
          </a>
        ),
      )}
    </>
  );
}

function MessageBubble({
  m,
  slug,
  selected,
  reporting,
  asking,
  onSelect,
  onReply,
  onAskV,
  onReportOpen,
  onReport,
  onAnswered,
}: {
  m: RoomMessageView;
  slug: string;
  selected: boolean;
  reporting: boolean;
  asking: boolean;
  onSelect: () => void;
  onReply: () => void;
  onAskV: () => void;
  onReportOpen: () => void;
  onReport: (reason: RoomReportReason) => void;
  onAnswered: (messageId: number, question: RoomQuestionView) => void;
}) {
  const time = TIME.format(new Date(m.at));
  if (m.own) {
    return (
      <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-brand px-3 py-2 text-brand-foreground">
        {m.replyTo && (
          <p className="mb-1 border-l-2 border-white/60 pl-2 text-xs opacity-90">
            {m.replyTo.name}: {m.replyTo.snippet}
          </p>
        )}
        <p className="whitespace-pre-wrap break-words text-sm">{m.body}</p>
        <p className="mt-0.5 text-right text-[11px] opacity-90">{time}</p>
      </div>
    );
  }

  const avatar =
    m.kind === "v" ? (
      <span
        aria-hidden
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand bg-card text-sm font-extrabold text-brand-accent"
      >
        V
      </span>
    ) : m.kind === "team" ? (
      <span
        aria-hidden
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground"
      >
        PV
      </span>
    ) : (
      <span
        aria-hidden
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card text-xs font-bold text-foreground ring-1 ring-border"
      >
        {m.name.charAt(0)}
      </span>
    );

  return (
    <div className="max-w-[92%] space-y-1.5">
      <div className="flex items-end gap-2">
        {avatar}
        <div className="min-w-0 rounded-2xl rounded-bl-md bg-card px-3 py-2 shadow-sm">
          <p className="flex items-center gap-1 text-xs font-semibold text-brand-accent">
            {m.kind === "v" ? "V · tutor" : m.name}
            {m.kind === "team" && (
              <Check className="h-3.5 w-3.5" aria-label="PYQ Vault team" />
            )}
          </p>
          {m.replyTo && (
            <p className="my-1 border-l-2 border-border pl-2 text-xs text-muted-foreground">
              {m.replyTo.name}: {m.replyTo.snippet}
            </p>
          )}
          {m.kind === "v" ? (
            <KatexRenderer
              text={m.body}
              className="block whitespace-pre-wrap break-words text-sm"
            />
          ) : m.kind === "team" ? (
            <p className="whitespace-pre-wrap break-words text-sm">
              <LinkedText body={m.body} />
            </p>
          ) : (
            <p className="whitespace-pre-wrap break-words text-sm">{m.body}</p>
          )}
          {m.image && (
            <a
              href={m.image.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the picture full size: ${m.image.alt}`}
              className="mt-2 block overflow-hidden rounded-xl ring-1 ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- a public bucket picture; next/image is not used on this site */}
              <img
                src={m.image.url}
                alt={m.image.alt}
                loading="lazy"
                className="block h-auto w-full max-w-sm"
              />
            </a>
          )}
          {m.question && (
            <QuestionCard
              slug={slug}
              messageId={m.id}
              question={m.question}
              onAnswered={onAnswered}
            />
          )}
          <div className="mt-0.5 flex items-center justify-end gap-2">
            <span className="text-[11px] text-muted-foreground">{time}</span>
            {m.kind !== "team" && (
              <button
                type="button"
                onClick={onSelect}
                aria-expanded={selected}
                aria-label={`Options for ${m.kind === "v" ? "V's" : `${m.name}'s`} message`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MoreVertical className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>
      </div>
      {(selected || asking) && !reporting && (
        <div className="ml-10 flex flex-wrap gap-1.5">
          <button type="button" onClick={onReply} className={CHIP}>
            Reply
          </button>
          {m.canAskV && (
            <button
              type="button"
              onClick={onAskV}
              disabled={asking}
              className={`${CHIP} border-brand bg-brand/10 text-brand-accent`}
            >
              {asking && (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" aria-hidden />
              )}
              Ask V
            </button>
          )}
          <button type="button" onClick={onReportOpen} className={CHIP}>
            Report
          </button>
        </div>
      )}
      {reporting && (
        <div
          className="ml-10 flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Why are you reporting this?"
        >
          <span className="text-xs text-muted-foreground">Why?</span>
          {REASONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => onReport(r.value)}
              className={CHIP}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  slug,
  messageId,
  question,
  onAnswered,
}: {
  slug: string;
  messageId: number;
  question: RoomQuestionView;
  onAnswered: (messageId: number, question: RoomQuestionView) => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const answered = question.answered;

  async function pick(optionId: string) {
    if (answered || busy) return;
    setBusy(optionId);
    try {
      const r = await answerQuestion(slug, messageId, optionId);
      onAnswered(messageId, r.question);
    } catch (e) {
      toast.error(errorText(e));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-2 space-y-2 rounded-xl border border-border bg-background p-3">
      {question.label && (
        <p className="text-xs font-medium text-muted-foreground">
          {question.label}
        </p>
      )}
      {question.context && (
        <BlockText text={question.context} className="font-serif text-sm" />
      )}
      <BlockText
        text={question.text}
        className="font-serif text-[15px] leading-relaxed"
      />
      <div className="grid gap-1.5">
        {question.options.map((o) => {
          const chosen = answered?.optionId === o.id;
          const right = answered?.correctOptionId === o.id;
          const tone = !answered
            ? "border-border bg-card hover:bg-muted"
            : right
              ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
              : chosen
                ? "border-red-600 bg-red-50 dark:bg-red-950/40"
                : "border-border bg-card opacity-80";
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => pick(o.id)}
              disabled={!!answered || !!busy}
              aria-pressed={chosen}
              className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-1.5 text-left font-serif text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default ${tone}`}
            >
              <span className="font-sans text-xs font-semibold">
                ({o.label.toLowerCase()})
              </span>
              <KatexRenderer text={o.text} />
              {busy === o.id && (
                <Loader2
                  className="ml-auto h-3.5 w-3.5 animate-spin"
                  aria-hidden
                />
              )}
              {answered && right && (
                <span className="ml-auto font-sans text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Right answer
                </span>
              )}
              {answered && chosen && !right && (
                <span className="ml-auto font-sans text-xs font-semibold text-red-700 dark:text-red-400">
                  Your answer
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!answered && (
        <p className="text-xs text-muted-foreground">
          The answer shows once you pick.
        </p>
      )}
      {answered?.solution && (
        <div className="rounded-lg bg-muted p-2.5">
          <p className="mb-1 flex items-center gap-1 text-xs font-semibold">
            <MessagesSquare className="h-3.5 w-3.5" aria-hidden /> Solution
          </p>
          <BlockText
            text={answered.solution}
            solution
            className="font-serif text-sm"
          />
        </div>
      )}
    </div>
  );
}
