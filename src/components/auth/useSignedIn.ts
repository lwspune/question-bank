"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type SignedInState = { signedIn: boolean; loading: boolean };

/**
 * Client-side sign-in signal for the /notes practice gate + progress controls.
 * Reads the Supabase session from the browser (getSession = local, no network)
 * and tracks auth changes. Used INSTEAD of a server-side session read so notes
 * pages stay ISR-static (a server cookie read would make every chapter dynamic).
 * The session cookie is the source of truth; this is a soft gate over public
 * content, so a local read is sufficient (no getUser round-trip needed).
 */
export function useSignedIn(): SignedInState {
  const [state, setState] = useState<SignedInState>({
    signedIn: false,
    loading: true,
  });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setState({ signedIn: Boolean(data.session), loading: false });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setState({ signedIn: Boolean(session), loading: false });
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
