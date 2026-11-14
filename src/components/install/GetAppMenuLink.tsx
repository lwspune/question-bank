"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { currentPlatform } from "@/lib/install/client";
import { shouldOfferApp } from "@/lib/install/platform";

/**
 * "Get the app" in the account menu (2026-11-14): on a phone or tablet that is
 * not already running PYQ Vault from its home-screen icon. Hidden on a computer
 * and inside the installed app, where it would offer what they already have.
 */
export default function GetAppMenuLink({ className }: { className: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(shouldOfferApp(currentPlatform())), []);
  if (!show) return null;
  return (
    <Link href="/app" className={className}>
      <Smartphone className="h-4 w-4" aria-hidden />
      Get the app
    </Link>
  );
}
