"use client";

/**
 * A notes drill link (2026-11-15, owner): "Drill N more on <concept>" under a
 * concept card, "Drill all N questions" at the foot of a topic. It opened /browse
 * as a new page, so a student lost the concept they were reading; it now opens
 * the questions in a panel on the page (NotesDrillPanel), loaded on the first
 * tap only. Each step is recorded for signed-in students (lib/notes/drillPanel):
 * opened, Show more, closed (back on the notes) or left for /browse.
 */
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Target } from "lucide-react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { sendActivity } from "@/lib/activity/clientBeacon";
import type { NotesDrillLink } from "@/lib/activity/clientEvents";
import type { DrillSource } from "@/lib/notes/drillPanel";
import { cn } from "@/lib/utils";

// Loaded on the first tap only: the panel carries /browse's question card,
// which a notes page would otherwise download for a link most never open.
const NotesDrillPanel = dynamic(() => import("./NotesDrillPanel"), { ssr: false });

const STYLES: Record<NotesDrillLink, string> = {
  concept: "rounded-md px-3 py-1.5 text-brand-accent hover:bg-brand/10",
  topic: "rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground",
};

export default function NotesDrillButton({
  link,
  label,
  title,
  description,
  source,
  fullHref,
  subtopicSlug,
}: {
  link: NotesDrillLink;
  label: string;
  /** The panel's heading. */
  title: string;
  /** The line under it. */
  description: string;
  source: DrillSource;
  /** The same questions on /browse ("Open in the bank"). */
  fullHref: string;
  /** The notes topic, for the record. */
  subtopicSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { signedIn } = useSignedIn();

  const track = (action: "open" | "more" | "close" | "full_page") => {
    if (signedIn) sendActivity({ kind: "surface_viewed", surface: "notes_drill", action, link, subtopic: subtopicSlug });
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          track("open");
          setMounted(true);
          setOpen(true);
        }}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          STYLES[link]
        )}
      >
        {link === "concept" && <Target className="h-3.5 w-3.5" aria-hidden />}
        <span>{label}</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </button>
      {mounted && (
        <NotesDrillPanel
          open={open}
          onOpenChange={(next) => {
            if (!next) track("close");
            setOpen(next);
          }}
          title={title}
          description={description}
          source={source}
          fullHref={fullHref}
          onFullPage={() => track("full_page")}
          onMore={() => track("more")}
          returnFocusTo={buttonRef}
        />
      )}
    </>
  );
}
