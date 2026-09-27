import type { Metadata } from "next";
import { LegalPage, legalCardClass, legalTextClass } from "../../components/LegalPage";
import { LEGAL_CONTACT } from "../../lib/legal";

export const metadata: Metadata = {
  title: "Datenschutz | IchGeheViral",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz" lead="Informationen zur Verarbeitung personenbezogener Daten bei IchGeheViral.">
      <section className={legalCardClass}>
        <div className={legalTextClass}>
          <h2>Verantwortlicher</h2>
          <p>
            {LEGAL_CONTACT.name}<br />
            {LEGAL_CONTACT.business}<br />
            {LEGAL_CONTACT.addressLines[0]}<br />
            {LEGAL_CONTACT.addressLines[1]}<br />
            {LEGAL_CONTACT.addressLines[2]}<br />
            E-Mail: <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a><br />
            Telefon: {LEGAL_CONTACT.phone}
          </p>

          <h3>Bereitstellung der Website</h3>
          <p>
            Beim Aufruf der Website werden technisch erforderliche Verbindungs- und Zugriffsdaten verarbeitet,
            insbesondere IP-Adresse, Zeitpunkt, angeforderte Ressource, Browser- und Geräteinformationen sowie
            technische Statusdaten. Die Verarbeitung dient der sicheren und stabilen Bereitstellung der Website
            und erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Die öffentliche Website wird über Vercel bereitgestellt. Für Backend-Funktionen, Datenbank- und
            Speicherleistungen wird Railway eingesetzt. Die eingesetzten Hosting- und Infrastruktur-Anbieter
            können technische Protokolldaten zur Auslieferung, Sicherheit und Fehleranalyse verarbeiten.
          </p>

          <h3>Studio und Pool-Auswahl</h3>
          <p>
            Solange lediglich Inhalte auf der Website angesehen oder Werte im Reichweiten-Rechner verändert
            werden, werden die dort eingegebenen Rechnerwerte nach aktuellem Stand nur im Browser verarbeitet
            und nicht an unser Backend übertragen.
          </p>
          <p>
            Wenn der kostenpflichtige Checkout aktiviert ist und Sie im Studio eine Bestellung starten, werden
            die von Ihnen ausgewählte Pool-Variante und die gewählte Paketvariante an unser Backend übertragen.
            Das Backend speichert hierzu einen Bestellentwurf mit einer technischen Anfrage-ID, der ausgewählten Variante,
            der Paketwahl, Bearbeitungsstatus sowie technischen Shopify-Warenkorb- beziehungsweise Bestell-IDs.
            Diese Verarbeitung ist zur Durchführung des gewünschten Bestell- und Produktionsprozesses
            erforderlich und beruht auf Art. 6 Abs. 1 lit. b DSGVO.
          </p>

          <h3>Shopify und Zahlungsabwicklung</h3>
          <p>
            Der Checkout wird über Shopify bereitgestellt. Im eigentlichen Bezahlvorgang verarbeitet Shopify
            die für Bestellung und Zahlung erforderlichen Daten, etwa Kontakt-, Rechnungs- und Zahlungsdaten,
            nach den dort geltenden Bedingungen und Datenschutzhinweisen. Unser Backend übermittelt das
            ausgewählte Pool-Konzept nicht an Shopify, sondern verwendet dort eine technische Anfrage-ID zur
            Zuordnung der Bestellung.
          </p>

          <h3>KI-Produktion mit Runware</h3>
          <p>
            Für die eigentliche KI-gestützte Erstellung des Videos wird Runware eingesetzt. Hierfür werden die
            für die Generierung erforderlichen, aus der ausgewählten Pool-Variante abgeleiteten Prompts sowie im
            Produktionsprozess benötigte Bild- und Videodaten an den Dienst übermittelt. Die Verarbeitung dient
            der Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO.
          </p>

          <h3>Datenbank und Mediendateien</h3>
          <p>
            Bestell- und Produktionsmetadaten werden in einer nicht öffentlich zugänglichen PostgreSQL-Datenbank
            innerhalb der Backend-Infrastruktur gespeichert. Generierte Produktionsartefakte, darunter
            Konzeptdateien, Zwischenbilder, Clips, technische Manifeste und das fertige Video, können in einem
            S3-kompatiblen Objektspeicher der Railway-Infrastruktur gespeichert werden. Download-Links können
            technisch zeitlich begrenzt bereitgestellt werden.
          </p>

          <h3>Social-Proof-Bereich</h3>
          <p>
            Auf der Website können vom Betreiber veröffentlichte Bilder oder kurze Videos als Social Proof
            angezeigt werden. Die Veröffentlichung erfolgt nur für Inhalte, für deren Nutzung die erforderliche
            Berechtigung vorliegt. Die zugehörigen Mediendateien und Metadaten werden über die oben beschriebene
            Backend- und Speicherinfrastruktur bereitgestellt.
          </p>

          <h3>Kontaktaufnahme</h3>
          <p>
            Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen übermittelten
            Angaben zur Bearbeitung Ihrer Anfrage. Je nach Inhalt erfolgt die Verarbeitung auf Grundlage von
            Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h3>Cookies, lokale Speicherung und Analyse</h3>
          <p>
            Diese Website setzt nach aktuellem Stand keine eigenen Analyse- oder Marketing-Cookies ein und nutzt
            kein eigenes Besucher-Tracking. Der passwortgeschützte interne Adminbereich speichert einen
            Sitzungsschlüssel ausschließlich im Session Storage des jeweiligen Admin-Browsers; dies betrifft
            normale Besucher der Website nicht. Beim späteren Wechsel zu Shopify können dort technisch
            erforderliche Speicher- und Cookie-Mechanismen nach den Bedingungen von Shopify eingesetzt werden.
          </p>

          <h3>Empfänger und Drittlandübermittlungen</h3>
          <p>
            Personenbezogene Daten werden nur an Dienstleister oder sonstige Empfänger weitergegeben, soweit dies
            für Hosting, Checkout, Zahlung, Produktion, Sicherheit oder die von Ihnen angeforderte Leistung
            erforderlich ist oder eine gesetzliche Grundlage besteht. Soweit Anbieter Daten außerhalb der
            EU beziehungsweise des EWR verarbeiten, erfolgt eine Übermittlung nur nach Maßgabe der gesetzlichen
            Voraussetzungen für Drittlandübermittlungen.
          </p>

          <h3>Speicherdauer</h3>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist.
            Bestell- und Zahlungsnachweise können darüber hinaus entsprechend gesetzlicher handels- und
            steuerrechtlicher Aufbewahrungspflichten gespeichert werden. Technische Protokolldaten werden nur so
            lange aufbewahrt, wie sie für Betrieb, Sicherheit und Fehleranalyse erforderlich sind.
          </p>

          <h3>Ihre Rechte</h3>
          <p>
            Sie haben nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Erteilte Einwilligungen können
            mit Wirkung für die Zukunft widerrufen werden. Außerdem besteht ein Beschwerderecht bei einer
            Datenschutzaufsichtsbehörde.
          </p>
          <p>
            Datenschutzanfragen können Sie an <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a> richten.
          </p>

          <p className="pt-4 text-sm text-[#858991]">Stand: September 2026</p>
        </div>
      </section>
    </LegalPage>
  );
}
