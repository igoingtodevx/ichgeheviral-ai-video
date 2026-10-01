"use client";
import { LegalPage, legalCardClass, legalTextClass } from "./LegalPage";
import { useBusinessConfig } from "./BusinessConfigProvider";
import type { BusinessConfig } from "../lib/business-config";

export function ConfiguredLegal({ title, field }: { title: string; field: "imprint_text" | "privacy_text" | "terms_text" }) {
  const { config } = useBusinessConfig();
  const text = config.content[field];
  return <LegalPage title={title} lead="Freigegebene rechtliche Informationen des Betreibers.">
    <section className={legalCardClass}><div className={legalTextClass}>
      {config.content.legal_entity && <h2>{config.content.legal_entity}</h2>}
      {text ? <p className="whitespace-pre-wrap break-words">{text}</p> : <p role="status">Diese Angaben sind noch nicht freigegeben. Checkout und Zahlung bleiben bis zur vollständigen Freigabe deaktiviert.</p>}
    </div></section>
  </LegalPage>;
}

export function ConfiguredContact() {
  const { config } = useBusinessConfig();
  const content: BusinessConfig["content"] = config.content;
  return <LegalPage title="Kontakt" lead="Kontaktinformationen des Betreibers."><section className={legalCardClass}><div className={legalTextClass}>
    {content.legal_entity && <h2>{content.legal_entity}</h2>}
    {content.support_email ? <p>E-Mail: <a href={`mailto:${content.support_email}`}>{content.support_email}</a></p> : <p role="status">Die Kontaktinformationen sind noch nicht freigegeben.</p>}
  </div></section></LegalPage>;
}
