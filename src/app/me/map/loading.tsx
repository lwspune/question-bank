import { headers } from "next/headers";
import AppHeader from "@/components/AppHeader";
import MeLoading from "@/components/me/MeLoading";
import PlainLoading from "@/components/me/PlainLoading";
import { isIntlHost } from "@/lib/sites/intl";

/**
 * Shown the moment the Map tab is tapped, with Map already selected
 * (2026-11-23). intl.pyqvault.com has no Home, Review or Progress, so its
 * map keeps the plain loader and never flashes tabs it does not have.
 */
export default async function MapLoading() {
  const intl = isIntlHost((await headers()).get("host"));
  return (
    <>
      <AppHeader />
      {intl ? <PlainLoading /> : <MeLoading active="map" />}
    </>
  );
}
