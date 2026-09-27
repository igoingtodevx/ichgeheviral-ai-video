import type { Metadata } from "next";
import { LegalPage, legalCardClass, legalTextClass } from "../../components/LegalPage";
import { LEGAL_CONTACT } from "../../lib/legal";

export const metadata: Metadata = {
  title: "Kontakt | IchGeheViral",
};

export default function KontaktPage() {
  return (
    <LegalPage title="Kontakt" lead="So erreichst du den Betreiber von IchGeheViral.">
      <section className={legalCardClass}>
        <div className={legalTextClass}>
          <h2>Kontaktmöglichkeiten</h2>
          <p>
            E-Mail: <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a><br />
            Telefon: <a href={`tel:${LEGAL_CONTACT.phone.replace(/\s/g, "")}`}>{LEGAL_CONTACT.phone}</a>
          </p>

          <h3>Postanschrift</h3>
          <p>
            {LEGAL_CONTACT.business}<br />
            {LEGAL_CONTACT.name}<br />
            {LEGAL_CONTACT.addressLines[0]}<br />
            {LEGAL_CONTACT.addressLines[1]}<br />
            {LEGAL_CONTACT.addressLines[2]}
          </p>
          <p><strong>Hinweis:</strong> Keine Pakete oder Päckchen; deren Annahme kann verweigert werden.</p>
        </div>
      </section>
    </LegalPage>
  );
}
