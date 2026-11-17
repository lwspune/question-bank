"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { closePaddleCheckout, initPaddle, verifyPaddleTransaction } from "@/components/billing/paddleCheckout";
import { invalidatePulse } from "@/lib/viewer/usePulse";

/**
 * A Paddle payment link (a checkout-recovery email, or a link made in Paddle's
 * dashboard) opens our default payment link, /pricing?_ptxn=<transaction>
 * (0271). Paddle.js opens that checkout by itself once initialised, so this
 * only initialises it when the parameter is there, then grants as a normal
 * checkout does. Renders nothing. Reads the address in an effect, not
 * through useSearchParams, so the page keeps its rendering mode.
 */
export default function PaddleLinkResume({ token }: { token: string }) {
  const router = useRouter();
  useEffect(() => {
    const txn = new URLSearchParams(window.location.search).get("_ptxn");
    if (!txn) return;
    let completed = false;
    initPaddle(token, (e) => {
      if (e.name !== "checkout.completed" || completed) return;
      completed = true;
      void verifyPaddleTransaction(e.data?.transaction_id ?? txn).then(({ result, error }) => {
        closePaddleCheckout();
        invalidatePulse();
        if (result === "paid") {
          toast.success("Payment successful. Access unlocked!");
          router.push("/account");
          router.refresh();
        } else {
          toast.info(error || "Payment received. Access will activate shortly.");
          router.push("/account");
        }
      });
    }).catch((err: unknown) => toast.error(err instanceof Error ? err.message : "Payment page didn't load."));
  }, [token, router]);
  return null;
}
