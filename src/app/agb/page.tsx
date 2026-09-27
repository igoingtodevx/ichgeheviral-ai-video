import type { Metadata } from "next";
import { LegalPage, legalCardClass, legalTextClass } from "../../components/LegalPage";
import { LEGAL_CONTACT } from "../../lib/legal";

export const metadata: Metadata = {
  title: "AGB | IchGeheViral",
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" lead="Bedingungen für kostenpflichtige Bestellungen über IchGeheViral.">
      <section className={legalCardClass}>
        <div className={legalTextClass}>
          <h2>Allgemeine Geschäftsbedingungen</h2>

          <h3>§ 1 Anbieter und Geltungsbereich</h3>
          <p>
            Diese AGB gelten für kostenpflichtige Bestellungen über IchGeheViral bei {LEGAL_CONTACT.business},
            Inhaber {LEGAL_CONTACT.name}. Abweichende Bedingungen des Kunden gelten nur, wenn ihnen ausdrücklich
            zugestimmt wurde.
          </p>

          <h3>§ 2 Vertragsgegenstand</h3>
          <p>
            Gegenstand der Hauptleistung ist die Erstellung eines KI-gestützten, vertikalen
            Poolbau-Transformations-Videos auf Grundlage einer vom Kunden ausgewählten, freigegebenen
            Pool-Variante. Der aktuell dargestellte Leistungsumfang umfasst insbesondere ein zusammenhängendes
            9:16-Video mit einer Laufzeit von 60+ Sekunden und mehreren aufeinander aufbauenden Bauphasen.
          </p>
          <p>
            Soweit ein Paket zusätzlich einen Marketing-Kurs enthält, gehört dieser nur dann zum Vertragsumfang,
            wenn das entsprechende Paket ausdrücklich ausgewählt und bestellt wurde.
          </p>

          <h3>§ 3 Vertragsschluss und Zahlung</h3>
          <p>
            Die Darstellung der Leistungen auf der Website ist noch kein bindendes Vertragsangebot. Der Kunde
            wählt eine freigegebene Pool-Variante und sein Paket und wird zum sicheren Checkout
            weitergeleitet. Der Vertrag kommt im Rahmen des dortigen Bestellvorgangs nach Maßgabe der angezeigten
            Bestell- und Zahlungsbestätigung zustande.
          </p>
          <p>
            Die jeweils gültigen Gesamtpreise werden vor Abgabe der kostenpflichtigen Bestellung im Checkout
            angezeigt. Die Zahlungsabwicklung erfolgt über Shopify beziehungsweise die dort eingebundenen
            Zahlungsdienstleister.
          </p>

          <h3>§ 4 Leistungserbringung</h3>
          <p>
            Die Produktion beginnt nach bestätigter kostenpflichtiger Bestellung und vollständiger Übermittlung
            der für die Erstellung erforderlichen Angaben. Das fertige Video wird nach Abschluss der Produktion
            digital bereitgestellt. Technisch bedingte Verzögerungen bei externen KI-, Hosting- oder
            Verarbeitungsdiensten können die Bereitstellung verzögern.
          </p>

          <h3>§ 5 Mitwirkungspflichten und zulässige Inhalte</h3>
          <p>
            Der Kunde ist für die von ihm übermittelten Inhalte und Vorgaben verantwortlich. Es dürfen keine
            rechtswidrigen Inhalte, keine Inhalte unter Verletzung von Rechten Dritter und keine Vorgaben
            übermittelt werden, deren Verarbeitung oder Veröffentlichung unzulässig wäre.
          </p>

          <h3>§ 6 KI-Erstellung, Ergebnisabweichungen und Viralität</h3>
          <p>
            Die Leistung wird mithilfe generativer KI erstellt. Trotz eines auf Konsistenz und
            Transformationsfortschritt ausgelegten Prozesses können gestalterische Abweichungen auftreten.
            Eine bestimmte Reichweite, View-Zahl, Klickrate, Conversion, Umsatzentwicklung oder Viralität wird
            nicht geschuldet und nicht garantiert. Auf der Website gezeigte Rechner und Beispiele sind reine
            Szenarien beziehungsweise Beispielrechnungen.
          </p>

          <h3>§ 7 Nutzbarkeit des Ergebnisses</h3>
          <p>
            Soweit dem Anbieter an dem ausgelieferten Ergebnis einräumbare Nutzungsrechte zustehen, erhält der
            Kunde das Recht, das ausgelieferte Video für eigene Social-Media- und Marketingzwecke zu nutzen und
            zu veröffentlichen. Rechte Dritter, die Lizenzbedingungen der bei der KI-Erstellung eingesetzten
            Modelle sowie die Nutzungsbedingungen der jeweiligen Plattformen bleiben unberührt.
          </p>

          <h3>§ 8 Widerruf</h3>
          <p>
            Für Verbraucher gilt die gesonderte Widerrufsbelehrung. Wird ausdrücklich verlangt, dass die
            Dienstleistung bereits während der Widerrufsfrist beginnt, können die gesetzlich vorgesehenen Folgen
            eintreten. Einzelheiten ergeben sich aus der Seite „Widerrufsrecht“.
          </p>

          <h3>§ 9 Haftung</h3>
          <p>
            Es gelten die gesetzlichen Haftungsvorschriften. Für die eigenständige Veröffentlichung, Bewerbung
            und wirtschaftliche Nutzung des Videos sowie für Entscheidungen auf Grundlage von
            Reichweiten- oder Umsatzprognosen bleibt der Kunde verantwortlich.
          </p>

          <h3>§ 10 Verbraucherstreitbeilegung</h3>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes teilzunehmen.
          </p>

          <h3>§ 11 Schlussbestimmungen</h3>
          <p>
            Es gilt deutsches Recht unter Beachtung zwingender Verbraucherschutzvorschriften. Für Verbraucher
            gelten die gesetzlichen Gerichtsstände.
          </p>

          <p className="pt-4 text-sm text-[#858991]">Stand: September 2026</p>
        </div>
      </section>
    </LegalPage>
  );
}
