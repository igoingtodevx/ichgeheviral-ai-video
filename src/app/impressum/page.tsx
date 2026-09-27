import type { Metadata } from "next";
import { LegalPage, legalCardClass, legalTextClass } from "../../components/LegalPage";
import { LEGAL_CONTACT } from "../../lib/legal";

export const metadata: Metadata = {
  title: "Impressum | IchGeheViral",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" lead="Anbieterkennzeichnung für IchGeheViral.">
      <section className={legalCardClass}>
        <div className={legalTextClass}>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            {LEGAL_CONTACT.business}<br />
            Inhaber: {LEGAL_CONTACT.name}<br />
            {LEGAL_CONTACT.addressLines[0]}<br />
            {LEGAL_CONTACT.addressLines[1]}<br />
            {LEGAL_CONTACT.addressLines[2]}
          </p>
          <p><strong>Hinweis zur Postanschrift:</strong> Keine Pakete oder Päckchen; deren Annahme kann verweigert werden.</p>

          <h3>Kontakt</h3>
          <p>
            Telefon: <a href={`tel:${LEGAL_CONTACT.phone.replace(/\s/g, "")}`}>{LEGAL_CONTACT.phone}</a><br />
            E-Mail: <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a><br />
            Alternative E-Mail: <a href={`mailto:${LEGAL_CONTACT.alternateEmail}`}>{LEGAL_CONTACT.alternateEmail}</a>
          </p>

          <h3>Steuernummer</h3>
          <p>{LEGAL_CONTACT.taxNumber}</p>

          <h3>Inhaltlich verantwortlich</h3>
          <p>{LEGAL_CONTACT.name}, Anschrift wie oben.</p>

          <h3>Verbraucherstreitbeilegung</h3>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes teilzunehmen.
          </p>
        </div>
      </section>
    </LegalPage>
  );
}
