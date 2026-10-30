import PyqVaultFooter from "@/components/PyqVaultFooter";
import IntlFooter from "@/components/footer/IntlFooter";
import FooterSwitch from "@/components/footer/FooterSwitch";

/**
 * Site-wide footer. Both versions render on the server; FooterSwitch shows the
 * intl one on intl.pyqvault.com (2026-10-30) and PYQ Vault's everywhere else,
 * so this stays a server component and every page stays cacheable.
 */
export default function Footer() {
  return <FooterSwitch www={<PyqVaultFooter />} intl={<IntlFooter />} />;
}
