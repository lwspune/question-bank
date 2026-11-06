import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { getPageIdentity } from "@/lib/auth";
import { sessionHasAnyScope } from "@/lib/entitlements/session";
import { sessionPaperFree } from "@/lib/export/freeDownloadSession";
import { downloadScopesFor } from "@/lib/billing/passScope";
import { readCountry } from "@/lib/acquisition/country";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isIntlHost } from "@/lib/sites/intl";
import renderBrowse from "./renderBrowse";

export const metadata: Metadata = {
  title: "Browse questions",
  description:
    "Filter previous year questions by exam, chapter, difficulty, and year, and preview them free. Download the Question Paper + Answer Key as PDF files with the Premium Pass.",
  alternates: { canonical: "/browse" },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * The live /browse page: every filtered view, every signed-in visitor, and any
 * bare visit middleware does not send to the cached landing (/browse-start).
 * This file resolves the request; renderBrowse.tsx renders it.
 */
export default async function BrowsePage(props: PageProps) {
  const searchParams = await props.searchParams;
  // ONE identity resolution: anon requests, the bulk of this route's traffic,
  // short-circuit on a cookie check and never touch Supabase auth.
  const identity = await getPageIdentity();
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  // The Premium Pass: a paid grant that unlocks the paper + key for an account
  // with no org. Each host asks for its own passes (0206).
  const passSite = isIntlHost(host) ? "intl" : "pyqvault";
  const hasDownloadPass =
    identity.isSignedIn && !identity.isStaff
      ? await sessionHasAnyScope(downloadScopesFor(passSite))
      : false;

  return renderBrowse({
    searchParams,
    identity,
    host,
    country: readCountry(requestHeaders),
    qbExam: (await cookies()).get("qb_exam")?.value,
    supabase: createSupabaseServerClient(),
    hasDownloadPass,
    paperFree: identity.isSignedIn ? sessionPaperFree : null,
  });
}
