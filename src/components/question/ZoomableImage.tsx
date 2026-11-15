"use client";

import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";

/**
 * A question, option or solution picture that opens full size on a tap.
 * Shared by the /browse card and the notes and guide past-question card
 * (WorkedExampleCard), so a figure looks and zooms the same on both.
 */
export default function ZoomableImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block cursor-zoom-in rounded transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Zoom: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className={className} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none" hideCloseButton>
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="mx-auto max-h-[85vh] w-auto rounded-lg bg-background" />
          <DialogClose
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md ring-1 ring-border transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close image"
          >
            <X className="h-5 w-5" aria-hidden />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
