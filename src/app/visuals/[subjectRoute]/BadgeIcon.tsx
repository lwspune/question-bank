import { Box, Image as ImageIcon, SlidersHorizontal } from "lucide-react";
import type { GalleryBadge } from "@/lib/gallery/gallery";

/** A gallery tile's kind: Try it (a slider or a drag), 3D, or a picture. */
const ICON: Record<GalleryBadge, typeof Box> = { try: SlidersHorizontal, "3d": Box, picture: ImageIcon };

export default function BadgeIcon({ badge, className }: { badge: GalleryBadge; className?: string }) {
  const Icon = ICON[badge];
  return <Icon className={className} aria-hidden />;
}
