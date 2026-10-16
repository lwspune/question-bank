import { Users } from "lucide-react";
import { TOGETHER_ANCHOR, nameList } from "@/lib/practiceTests/together";
import type { TogetherState } from "@/lib/practiceTests/togetherService";

/**
 * Practise together (step 2, 2026-10-16): on a practice test's result page,
 * what the student and the friends who sat the same test missed. No scores
 * and no counts of right answers, so there is nothing to rank by. Each
 * question links to its card in the review below (ReviewFilterShell shows a
 * question the filter hides).
 */
export default function TogetherCard({ state }: { state: TogetherState }) {
  return (
    <section id={TOGETHER_ANCHOR} className="mt-4 scroll-mt-20 rounded-xl border bg-card p-5">
      <div className="flex items-start gap-3">
        <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold">Practise together</h2>
          {state.state === "waiting" ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Your friend hasn&apos;t finished this test yet. When they do, you&apos;ll see here what you both missed.
            </p>
          ) : (
            <Ready card={state.card} />
          )}
        </div>
      </div>
    </section>
  );
}

function Ready({ card }: { card: Extract<TogetherState, { state: "ready" }>["card"] }) {
  const one = card.friendNames.length === 1;
  const friend = one ? (card.friendNames[0] ?? "your friend") : "a friend";
  const Friend = one ? (card.friendNames[0] ?? "Your friend") : "A friend";
  const nothing = card.allMissed.length + card.theyGot.length + card.youGot.length === 0;

  return (
    <>
      <p className="mt-1 text-sm text-muted-foreground">{nameList(card.friendNames)} also took this test.</p>
      {nothing && <p className="mt-3 text-sm">You all got every question right.</p>}
      {card.allMissed.length > 0 && (
        <Block
          title={one ? "Missed by both of you" : "Missed by all of you"}
          hint="Go through these together."
          items={card.allMissed.map((position) => ({ position, names: [] }))}
          showNames={false}
        />
      )}
      {card.theyGot.length > 0 && (
        <Block
          title={`${Friend} got these, you didn't`}
          hint={one ? `Ask ${friend} how they did them.` : "Ask them how they did them."}
          items={card.theyGot}
          showNames={!one}
        />
      )}
      {card.youGot.length > 0 && (
        <Block
          title={`You got these, ${friend} didn't`}
          hint={one ? `Explain them to ${friend}.` : "Explain them to your friends."}
          items={card.youGot}
          showNames={!one}
        />
      )}
    </>
  );
}

function Block({
  title,
  hint,
  items,
  showNames,
}: {
  title: string;
  hint: string;
  items: { position: number; names: (string | null)[] }[];
  showNames: boolean;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{hint}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.position}>
            <a
              href={`#q${i.position}`}
              aria-label={`Question ${i.position}${showNames ? `, ${nameList(i.names)}` : ""}`}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="font-medium tabular-nums">Q{i.position}</span>
              {showNames && <span className="text-muted-foreground">{nameList(i.names)}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
