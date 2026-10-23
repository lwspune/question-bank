export type VAvatar = "idle" | "laugh" | "think" | "talk";

// Plain <img>, deliberately not next/image — this codebase keeps image
// optimization off Vercel's bill on purpose (see the Decisions log); these
// are already pre-sized+optimized static assets in /public/chat.
/** V's face beside a message. Shared by the chat window and /dashboard/chat. */
export default function VFace({ avatar, className }: { avatar: VAvatar; className?: string }) {
  return (
    <img
      src={`/chat/v-${avatar}.png`}
      alt=""
      aria-hidden
      className={className}
      loading="lazy"
    />
  );
}
