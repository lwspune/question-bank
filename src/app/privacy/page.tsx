import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PYQ Vault collects, uses, and protects your information — including details you share when taking a public quiz.",
  alternates: { canonical: "/privacy" },
};

const CONTACT = "connect.lwspune@gmail.com";

export default function PrivacyPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl space-y-6 px-6 py-10">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            PYQ Vault is run by LWS Pune. This policy explains what we collect and why.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-lg font-medium">What we collect</h2>
          <p className="text-sm text-muted-foreground">
            When you take a <strong>public quiz</strong> and ask to see your score, we collect the
            <strong> name and mobile number</strong> you enter, your quiz answers, and your score. We
            also note which link brought you to the quiz (e.g. a forum or campaign source). Browsing the
            question bank, guides, or notes does not require an account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium">Why we collect it</h2>
          <p className="text-sm text-muted-foreground">
            We use your name and mobile number to share your result and to contact you about NDA exam
            preparation, courses, and offers from LWS Pune. We rely on your <strong>consent</strong> —
            given by ticking the box at the quiz — as the basis for this contact. Your quiz answers and
            score help us improve our practice material.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium">How it is stored and shared</h2>
          <p className="text-sm text-muted-foreground">
            Your information is stored securely and is accessible only to authorised LWS Pune staff. We
            do <strong>not</strong> sell your data or share it with unrelated third parties. We retain it
            only as long as needed for the purposes above.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium">Your choices</h2>
          <p className="text-sm text-muted-foreground">
            You can ask us to stop contacting you, or to delete your information, at any time. Email{" "}
            <a href={`mailto:${CONTACT}`} className="text-brand-accent underline">
              {CONTACT}
            </a>{" "}
            and we will act on your request.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium">Cookies &amp; local storage</h2>
          <p className="text-sm text-muted-foreground">
            We store your name and mobile in your browser&rsquo;s local storage so you don&rsquo;t have
            to retype them on a return visit. Signed-in accounts use a session cookie. You can clear these
            from your browser at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-medium">Contact</h2>
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Email{" "}
            <a href={`mailto:${CONTACT}`} className="text-brand-accent underline">
              {CONTACT}
            </a>
            .
          </p>
        </section>
      </main>
    </>
  );
}
