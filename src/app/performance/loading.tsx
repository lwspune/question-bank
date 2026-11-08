import AppHeader from "@/components/AppHeader";
import MeLoading from "@/components/me/MeLoading";

/** Shown the moment the tab is tapped, while the page is built (2026-11-08). */
export default function PerformanceLoading() {
  return (
    <>
      <AppHeader />
      <MeLoading active="performance" />
    </>
  );
}
