import AppHeader from "@/components/AppHeader";
import PlainLoading from "@/components/me/PlainLoading";

/** Its own loading screen, so /me's Home skeleton never shows here. */
export default function Loading() {
  return (
    <>
      <AppHeader />
      <PlainLoading />
    </>
  );
}
