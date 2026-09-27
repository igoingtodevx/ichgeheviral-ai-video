import type { Metadata } from "next";
import { LegalPage, legalCardClass, legalTextClass } from "../../components/LegalPage";
import { LEGAL_CONTACT, LEGAL_SITE } from "../../lib/legal";

export const metadata: Metadata = {
  title: "Widerrufsrecht | IchGeheViral",
};

export default function WiderrufsrechtPage() {
  return (
    <LegalPage title="Widerrufsrecht" lead="Informationen zum gesetzlichen Widerrufsrecht bei Verbraucherverträgen.">
      <section className={legalCardClass}>
        <div className={legalTextClass}>
          <h2>Widerrufsbelehrung</h2>

          <h3>Widerrufsrecht</h3>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen einen geschlossenen Vertrag
            zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung, zum Beispiel
            per Brief oder E-Mail, über Ihren Entschluss informieren:
          </p>
          <p>
            {LEGAL_CONTACT.business}<br />
            {LEGAL_CONTACT.name}<br />
            {LEGAL_CONTACT.addressLines[0]}<br />
            {LEGAL_CONTACT.addressLines[1]}<br />
            {LEGAL_CONTACT.addressLines[2]}<br />
            E-Mail: <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a>
          </p>
          <p>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass die Mitteilung über die Ausübung des
            Widerrufsrechts vor Ablauf der Widerrufsfrist abgesendet wird.
          </p>

          <h3>Folgen des Widerrufs</h3>
          <p>
            Wenn Sie einen Vertrag wirksam widerrufen, erstatten wir die von Ihnen erhaltenen Zahlungen
            nach Maßgabe der gesetzlichen Vorschriften unverzüglich und spätestens binnen vierzehn Tagen
            ab Eingang Ihres Widerrufs. Für die Rückzahlung wird grundsätzlich dasselbe Zahlungsmittel
            verwendet, das bei der ursprünglichen Transaktion eingesetzt wurde, sofern nichts anderes
            vereinbart wurde.
          </p>

          <h3>Beginn der Dienstleistung vor Ablauf der Widerrufsfrist</h3>
          <p>
            Verlangen Sie ausdrücklich, dass die Dienstleistung bereits während der Widerrufsfrist beginnt,
            kann bei einem Widerruf Wertersatz für den bis dahin erbrachten Anteil der Leistung geschuldet
            sein. Bei einer entgeltlichen Dienstleistung kann das Widerrufsrecht nach vollständiger
            Erbringung unter den gesetzlichen Voraussetzungen erlöschen, wenn Sie dem vorzeitigen
            Leistungsbeginn ausdrücklich zugestimmt und Ihre Kenntnis vom möglichen Erlöschen bestätigt haben.
          </p>

          <h3>Digitale Inhalte</h3>
          <p>
            Soweit ein gebuchtes Zusatzangebot in der Bereitstellung digitaler Inhalte besteht, die nicht auf
            einem körperlichen Datenträger geliefert werden, gelten die besonderen gesetzlichen Voraussetzungen
            für den Beginn der Vertragserfüllung und ein mögliches Erlöschen des Widerrufsrechts. Ein vorzeitiges
            Erlöschen setzt insbesondere die gesetzlich erforderliche ausdrückliche Zustimmung, die Bestätigung
            Ihrer Kenntnis über die Folge dieser Zustimmung und die erforderliche Vertragsbestätigung voraus.
          </p>

          <h3>Muster-Widerrufsformular</h3>
          <p>Wenn Sie den Vertrag widerrufen wollen, können Sie folgende Erklärung verwenden:</p>
          <div className="rounded-2xl border border-[#e5e0da] bg-[#fffaf4] p-5">
            <p>
              An {LEGAL_CONTACT.business}, {LEGAL_CONTACT.name}, {LEGAL_CONTACT.addressLines.join(", ")},
              E-Mail: {LEGAL_CONTACT.email}
            </p>
            <p>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die
              Erbringung der Dienstleistung {LEGAL_SITE.product}.
            </p>
            <p>
              Bestellt am: ____________________<br />
              Name des/der Verbraucher(s): ____________________<br />
              Anschrift des/der Verbraucher(s): ____________________<br />
              Unterschrift (nur bei Mitteilung auf Papier): ____________________<br />
              Datum: ____________________
            </p>
            <p>(*) Unzutreffendes streichen.</p>
          </div>

          <p className="pt-4 text-sm text-[#858991]">Stand: September 2026</p>
        </div>
      </section>
    </LegalPage>
  );
}
