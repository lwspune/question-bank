import type { Metadata } from "next";
import Link from "next/link";
import { LegalH2, LegalList, LegalP, LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PYQ Vault collects, uses, and protects your information — for accounts, payments, emails, and public quizzes.",
  alternates: { canonical: "/privacy" },
};

const CONTACT = CONTACT_EMAIL;

function Mail() {
  return (
    <a href={`mailto:${CONTACT}`} className="text-brand-accent underline">
      {CONTACT}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="26 September 2026"
      intro={
        <>
          PYQ Vault is run by Vilas Shinde, in Pune. This policy explains what we collect and
          why. Browsing the question bank, guides and notes needs no account.
        </>
      }
    >
      <LegalH2>What we collect</LegalH2>
      <LegalList
        items={[
          <>
            <strong>Your account.</strong> When you sign up: your name and email (from Google,
            if you sign in with Google). If you choose to add them: your mobile number, target
            exam and exam date, class or stage, and study medium.
          </>,
          <>
            <strong>Your practice.</strong> Your mock-test answers and scores, questions you
            save, and what you practise, so we can show your progress and weak areas.
          </>,
          <>
            <strong>Payments.</strong> If you buy premium, we keep a record of the purchase:
            amount, date, plan, and the Razorpay order and payment IDs.
          </>,
          <>
            <strong>Public quizzes.</strong> When you take a public quiz and ask to see your
            score, we collect the <strong>name and mobile number</strong> you enter, your answers
            and your score. We also note which link brought you to the quiz.
          </>,
          <>
            <strong>Messages.</strong> What you send us through the contact form, a question
            report or a request for teacher access.
          </>,
        ]}
      />

      <LegalH2>Payments</LegalH2>
      <LegalP>
        Payments are processed by <strong>Razorpay</strong>. Your card, UPI or bank details go
        straight to Razorpay; we never see or store them. Razorpay handles them under its own
        privacy policy.
      </LegalP>

      <LegalH2>Why we collect it</LegalH2>
      <LegalList
        items={[
          "To run your account, grade your mocks and show your progress.",
          "To give you premium access after you pay, and to handle refunds.",
          "To email you about your account: mock reports, practice reminders and how-to guides. Every such email has an unsubscribe link.",
          <>
            To contact you about exam preparation, courses and offers, only if you agreed to it
            by ticking a consent box (at a quiz, or when adding your mobile number).
          </>,
          "To send a weekly WhatsApp report, only if you turned it on. You can turn it off on your account page.",
          "To improve our questions and practice material.",
        ]}
      />

      <LegalH2>Who can see it</LegalH2>
      <LegalP>
        Your information is stored securely and is accessible only to authorised PYQ Vault
        staff. We do <strong>not</strong> sell your data. We use a
        few trusted providers to run the site — hosting and database (Vercel, Supabase), email
        delivery (Resend) and payments (Razorpay) — and they process data only to provide that
        service. We keep your information only as long as it is needed for the purposes above.
      </LegalP>

      <LegalH2>Your choices</LegalH2>
      <LegalP>
        You can ask us to stop contacting you, to correct your information, or to delete your
        account and data, at any time. Email <Mail /> or use the{" "}
        <Link href="/contact" className="text-brand-accent underline">
          contact page
        </Link>{" "}
        and we will act on your request. We may keep payment records where the law requires it.
      </LegalP>

      <LegalH2>Cookies, local storage and analytics</LegalH2>
      <LegalP>
        Signed-in accounts use a session cookie. We remember your chosen exam in a cookie, and
        your quiz name and mobile in your browser&rsquo;s local storage so you don&rsquo;t have
        to retype them. If you are not signed in, local storage also keeps which answers you
        have opened, to count your free answer reveals. Once those are used up we may show
        Google&rsquo;s own sign-in prompt, which loads from Google; Google shares your name and
        email with us only if you choose to continue. We use Vercel Analytics to count page visits; it does not use
        advertising cookies. On the public and student pages we also use Microsoft Clarity,
        which sets its own cookies and records how a page is used (clicks, scrolling, and a
        replay of the screen with typed text masked) so we can see where a page confuses
        people. Clarity is never loaded on staff pages, and we do not send it your name,
        email or mobile number. You can clear cookies and local storage from your browser at
        any time.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        Questions about this policy? Email <Mail />.
      </LegalP>
    </LegalPage>
  );
}
