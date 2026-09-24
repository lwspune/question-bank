"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Puts the classroom script on the clipboard as plain text — what a teacher
 * pastes into the batch's WhatsApp group, which is where LWS batches actually
 * live. The text is passed in from the server component so this island holds
 * no copy of it (one source: lib/education/classroomScript.ts).
 *
 * `navigator.clipboard` needs a secure context and a user gesture; both hold
 * here (HTTPS, a click). The failure path is a toast, never a silent no-op.
 */
export default function CopyScriptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Script copied — paste it into the batch group.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Select the text above and copy it by hand.");
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onCopy}
      aria-label="Copy the classroom script to the clipboard"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {copied ? "Copied" : "Copy for WhatsApp"}
    </Button>
  );
}
