"use client";

/* eslint-disable @next/next/no-img-element */
import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { mayUnlockOnLeadStatus } from "@/app/lib/unlock";
import { useVideoUnlocked, unlockVideo, VIDEO_UNLOCK_KEY } from "@/app/lib/video-unlock";
import ProSection from "@/app/components/ProSection";

const proof = [
  ["1uygQbgn3DgTEegAXk8tAQOKhZOW9rVe1", "Duc Cars: faceless Auto-Content mit hoher Reichweite"],
  ["195iGvxwBH_pHAU136fm92g1lWI_eqxQC", "Teilnehmernachricht nach rund 45 Tagen im Programm"],
  ["1nqwSHH6kOfDSeTVJF38PoEs8WQrR3B1O", "Echtes Creator-Rewards-Ergebnis"],
  ["1K-eQlLfeqTMO32vNbgG1DedSMqyKMkB6", "Creator-Rewards-Ergebnis aus sieben Tagen"],
];

const reviews = [
  "1p6mjTWIKxkdncIY0SwESXX36zqsKyadu",
  "1a0ud1HHQCq2vR_BxQNm6oL0xkqhcmB6K",
  "19wBpRJ5XXL78cO29IBNR3gK8uSCUdNYi",
];

const drive = (id: string, width = 1200) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

type Step = {
  n: string;
  title: string;
  teaser: string;
  goal: string;
  focus: string[];
  mistake: string;
  result: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Nische",
    teaser: "Finde ein Thema mit echter Nachfrage, das sich in wiederholbaren Kurzvideo-Formaten umsetzen lässt.",
    goal: "Ein Thema finden, aus dem du immer wieder einfache und interessante Kurzvideos machen kannst.",
    focus: [
      "Versteht deine Zielgruppe sofort, worum es geht?",
      "Gibt es immer wieder neue Fragen, Probleme oder Themen dazu?",
      "Kannst du daraus viele ähnliche Videoformate machen?",
    ],
    mistake: "Zu breit starten oder eine Nische nur nach persönlichem Interesse auswählen, ohne zu prüfen, ob genügend konkrete Videoideen entstehen.",
    result: "Eine belastbare Themenrichtung mit genug Stoff für wiederkehrenden Content — statt jedes Video wieder bei null zu planen.",
  },
  {
    n: "02",
    title: "Hook & Skript",
    teaser: "Die Aufmerksamkeit in den ersten Sekunden gewinnen und aus jeder Idee ein kurzes, klares Skript machen.",
    goal: "Den Nutzen oder die Spannung direkt am Anfang zeigen, damit Zuschauer sofort wissen, warum sie weiterschauen sollten.",
    focus: [
      "Direkt auf den Punkt: Keine langen Begrüßungen oder unnötige Vorgeschichte.",
      "Eine klare Aussage: Pro Video steht eine Hauptidee im Mittelpunkt.",
      "Logischer Aufbau: Hook → Kernpunkt → Abschluss.",
    ],
    mistake: "Eine lange Einleitung, zu viele Nebeninformationen oder eine Hook, die etwas verspricht, das das Video anschließend nicht sauber einlöst.",
    result: "Ein einfacher Skript-Rahmen, der schneller produziert werden kann und dem Zuschauer einen klaren roten Faden gibt.",
  },
  {
    n: "03",
    title: "Faceless Production",
    teaser: "Videos schnell und professionell produzieren, ohne selbst vor der Kamera zu stehen.",
    goal: "Aus deinen Skripten einen einfachen Produktionsablauf machen, den du ohne dein Gesicht und immer wieder nutzen kannst.",
    focus: [
      "Alles passt zusammen: Bildmaterial, Text und Voiceover vermitteln dieselbe Aussage.",
      "Vorlagen nutzen: Wiederverwendbare Templates sparen Zeit und Arbeit.",
      "Einfach bleiben: Der Ablauf muss auch nach Wochen noch leicht durchzuhalten sein.",
    ],
    mistake: "Zu viele Tools, Effekte oder Einzelschritte einbauen und dadurch einen Produktionsprozess schaffen, der für regelmäßiges Posten zu aufwendig wird.",
    result: "Ein schlanker Workflow, mit dem Videos konsistenter produziert werden können, ohne dass jedes Mal ein komplett neuer Ablauf nötig ist.",
  },
  {
    n: "04",
    title: "7-Tage-Plan",
    teaser: "Veröffentlichen, Ergebnisse analysieren und jedes neue Video gezielt verbessern.",
    goal: "Planung, Produktion, Veröffentlichung und Auswertung in einen einfachen 7-Tage-Zyklus bringen, den du jede Woche wiederholen kannst.",
    focus: [
      "Daten statt Bauchgefühl: Nach jedem Video schauen, was funktioniert und was nicht.",
      "Was funktioniert, wiederholen: Erfolgreiche Muster gezielt weiter nutzen.",
      "Gezielt testen: Pro Runde nur wenige Dinge verändern, damit du erkennst, was wirklich einen Unterschied macht.",
    ],
    mistake: "Ohne festen Rhythmus posten, nach einzelnen Videos hektisch die Richtung wechseln oder aus zu wenigen Daten zu große Schlüsse ziehen.",
    result: "Ein einfacher Wochenrhythmus, der kontinuierliches Lernen ermöglicht und Verbesserungen nachvollziehbarer macht.",
  },
];

type OptinProps = {
  dark?: boolean;
};

function Optin({ dark = false }: OptinProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setStatus("Einen Moment …");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json().catch(() => null)) as {
        status?: string;
      } | null;

      if (response.ok && data?.status === "confirmation_sent") {
        // No unlock here: the masterclass stays locked until the visitor
        // clicks the DOI link and /danke records ENRICHA_DOI=confirmed.
        setStatus("Fast geschafft! Prüfe dein Postfach und bestätige deine E-Mail-Adresse.");
      } else if (response.ok && data?.status === "already_confirmed") {
        setStatus("Du bist bereits angemeldet — Zugang freigeschaltet.");
        if (mayUnlockOnLeadStatus(data.status)) {
          window.localStorage.setItem(VIDEO_UNLOCK_KEY, "1");
          unlockVideo();
        }
      } else if (response.status === 400) {
        setStatus("Bitte gib eine gültige E-Mail-Adresse ein.");
      } else if (response.status === 429) {
        setStatus("Zu viele Versuche. Bitte warte einen Moment und versuche es erneut.");
      } else {
        setStatus("Das hat gerade nicht geklappt. Bitte versuche es gleich noch einmal.");
      }
    } catch {
      setStatus("Das hat gerade nicht geklappt. Bitte versuche es gleich noch einmal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`optin-shell${dark ? " optin-dark" : ""}`}>
      <form className="optin" onSubmit={submit}>
        <label className="sr-only" htmlFor={dark ? "email-final" : "email-hero"}>E-Mail-Adresse</label>
        <input
          id={dark ? "email-final" : "email-hero"}
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? "Wird gesendet …" : "Masterclass kostenlos freischalten"} <span>→</span>
        </button>
      </form>
      <p className="form-note" aria-live="polite">{status || "Kostenlos · Kein Abo · Jederzeit abmeldbar"}</p>
    </div>
  );
}

function Calculator() {
  const [views, setViews] = useState(100000);
  const monthlyUploads = 30;
  const monthlyViews = views * monthlyUploads;
  const estimate = useMemo(() => Math.round((monthlyViews * 0.0015) / 25) * 25, [monthlyViews]);

  return (
    <div className="calculator calculator-single">
      <div className="calc-grid">
        <label>
          <span>Ø Aufrufe pro Video <b>{views.toLocaleString("de-DE")} Views</b></span>
          <input
            type="range"
            min="5000"
            max="500000"
            step="5000"
            value={views}
            onChange={(e) => setViews(+e.target.value)}
          />
        </label>
      </div>
      <div className="calc-result" aria-live="polite">
        <span>Beispiel bei 30 Videos / Monat</span>
        <strong>{monthlyViews.toLocaleString("de-DE")}</strong>
        <small>Views / Monat</small>
      </div>
      <div className="calc-money" aria-live="polite">
        <span>Unverbindliche Beispielrechnung*</span>
        <strong>≈ {estimate.toLocaleString("de-DE")} € <i>/ Monat</i></strong>
      </div>
      <p>*Orientierung bei 30 Videos/Monat und 1,50 € RPM (pro 1.000 Views). Keine Garantie; Vergütung, qualifizierte Views, Region und Plattformregeln variieren.</p>
    </div>
  );
}

function VideoGate({ unlocked }: { unlocked: boolean }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const vslUrl = process.env.NEXT_PUBLIC_VSL_URL;

  // Lock body scrolling while the modal is open.
  useEffect(() => {
    if (!videoOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [videoOpen]);

  useEffect(() => {
    if (!videoOpen) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setVideoOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [videoOpen]);

  function handleVideoClick() {
    if (!unlocked) {
      document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setVideoFailed(false);
    setVideoOpen(true);
  }

  const isEmbed = vslUrl && /youtube\.com|youtu\.be|vimeo\.com/.test(vslUrl);

  return (
    <div className={`video-gate${unlocked ? " is-unlocked" : " is-locked"}`}>
      <button
        className="video-card"
        type="button"
        onClick={handleVideoClick}
        aria-label={unlocked ? "Masterclass abspielen" : "Masterclass nach E-Mail-Freischaltung öffnen"}
      >
        <img src="/images/timo-about.jpg" alt="Timo arbeitet am Laptop an der kostenlosen Masterclass" />
        <span className="video-shade" />
        <span className="play">{unlocked ? "▶" : "🔒"}</span>
        <span className="video-label">
          <b>{unlocked ? "Die kostenlose Masterclass" : "Nach E-Mail-Eingabe freischalten"}</b>
          <small>{unlocked ? "Nische · Hook · Produktion · Wachstum" : "Oben E-Mail eintragen → Zugang erhalten"}</small>
        </span>
      </button>

      {videoOpen && unlocked && createPortal(
        <div className="video-modal" role="dialog" aria-modal="true" aria-label="Masterclass Video">
          <button className="video-close" onClick={() => setVideoOpen(false)} aria-label="Video schließen">×</button>
          {vslUrl ? (
            isEmbed ? (
              <iframe src={vslUrl} title="Enricha Masterclass" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            ) : (
              videoFailed ? (
                <div className="video-placeholder">
                  <b>Video konnte auf deinem Gerät nicht geladen werden.</b>
                  <span>
                    Kein Problem — du kannst die Masterclass direkt öffnen:{" "}
                    <a href={vslUrl} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
                      Masterclass in neuem Tab abspielen
                    </a>
                  </span>
                </div>
              ) : (
                <video
                  src={vslUrl}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setVideoFailed(true)}
                />
              )
            )
          ) : (
            <div className="video-placeholder">
              <b>Die Masterclass wird gerade finalisiert.</b>
              <span>Dein Zugang ist freigeschaltet. Sobald die finale Masterclass online ist, kannst du sie hier direkt ansehen.</span>
            </div>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}

function StepDetails({ step, compact = false }: { step: Step; compact?: boolean }) {
  return (
    <div className={compact ? "step-value step-value-inline" : "step-value"}>
      <div className="step-value-block step-goal"><span>Ziel</span><p>{step.goal}</p></div>
      <div className="step-value-block step-focus"><span>Worauf es ankommt</span><ul>{step.focus.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <div className="step-value-block step-mistake"><span>Typischer Fehler</span><p>{step.mistake}</p></div>
      <div className="step-value-block step-result"><span>Ergebnis</span><p>{step.result}</p></div>
    </div>
  );
}

export default function Home() {
  const videoUnlocked = useVideoUnlocked();
  const [activeProof, setActiveProof] = useState(0);
  const [proofOpen, setProofOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(1);

  // When the DOI confirmation happens in another tab (/danke writes the
  // unlock key there), unlock this tab as well instead of making the visitor
  // figure out that they need to return to an old tab.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === VIDEO_UNLOCK_KEY && event.newValue === "1") {
        unlockVideo();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!proofOpen) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setProofOpen(false);
      if (event.key === "ArrowRight") setActiveProof((current) => (current + 1) % proof.length);
      if (event.key === "ArrowLeft") setActiveProof((current) => (current - 1 + proof.length) % proof.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [proofOpen]);

  function toggleStep(index: number) {
    setActiveStep((current) => (current === index ? null : index));
  }

  function handleStepKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = (index + direction + steps.length) % steps.length;
    setActiveStep(next);
    document.getElementById(`step-${next}`)?.focus();
  }

  return (
    <main className="site theme-blue">
      <div className="announcement">Kostenlose Masterclass · Faceless Shortform · Kompletter Einstieg</div>
      <header className="header wrap">
        <a className="logo" href="#top">enricha<span>.</span></a>
        <nav>
          <a href="#system">System</a>
          <a href="#rechner">Rechner</a>
          <a href="#proof">Ergebnisse</a>
          <a href="#timo">Über Timo</a>
        </nav>
        <a className="mini-cta" href="#start">Kostenlose Masterclass freischalten →</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-inner wrap">
          <div className="pill">Kostenlose Video-Masterclass</div>
          <h1>Ein profitables Faceless-Kurzvideo-Business aufbauen — <em>mit System statt Zufall.</em></h1>
          <p>Ich zeige dir, wie du auf TikTok ein klares Format entwickelst — ohne dein Gesicht zu zeigen und ohne planlos zu posten.</p>
          <div id="start"><Optin /></div>
        </div>
        <div className="video-wrap wrap" id="video"><VideoGate unlocked={videoUnlocked} /></div>
      </section>

      <ProSection />

      <section className="facts">
        <div className="wrap fact-grid">
          <div><b>0 €</b><span>Einstieg</span></div>
          <div><b>100%</b><span>Faceless möglich</span></div>
          <div><b>4</b><span>klare Schritte</span></div>
          <div><b>1</b><span>wiederholbares System</span></div>
        </div>
      </section>

      <section className="section alt" id="rechner">
        <div className="narrow center">
          <span className="kicker">SYSTEM STATT ZUFALL</span>
          <h2>Was kann dein faceless Kanal einbringen?</h2>
          <p>Teste verschiedene Umsatz-Ziele. Das Ergebnis ist eine transparente Beispielrechnung, kein Einkommensversprechen.</p>
        </div>
        <div className="wrap"><Calculator /></div>
      </section>

      <section className="section" id="system">
        <div className="narrow center">
          <span className="kicker">Der Unterschied</span>
          <h2>System &amp; Substanz statt <em>Hype &amp; Mythen.</em></h2>
          <p>Du lernst nicht den nächsten Trick. Du lernst einen Ablauf, den du wiederholen und verbessern kannst.</p>
        </div>
        <div className="wrap compare">
          <article className="myth">
            <span>×</span>
            <h3>Der typische „Guru“-Weg</h3>
            <ul>
              <li>Heute TikTok, morgen Dropshipping, übermorgen Trading</li>
              <li>Nach 10 Videos wieder zurück auf Anfang</li>
              <li>„In 30 Tagen 10.000 €“ statt realistischer Anleitung</li>
            </ul>
          </article>
          <article className="process">
            <span>✓</span>
            <h3>Der Enricha-Prozess</h3>
            <ul>
              <li>Nischen mit echtem Potenzial statt Trends hinterherzulaufen</li>
              <li>Ein einfaches System, das jeder mit 0 € umsetzen kann</li>
              <li>Posten, auswerten, verbessern, wiederholen, Geld verdienen</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section alt steps-section">
        <div className="narrow center">
          <span className="kicker">Die Masterclass</span>
          <h2>Vier Schritte. Kein Rätselraten.</h2>
          <p>Klicke auf einen Schritt, um praktische Tipps zu erhalten. Nochmal klicken, um ihn wieder zu schließen.</p>
        </div>

        <div className="wrap steps interactive-steps" role="tablist" aria-label="Masterclass Schritte">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                id={`step-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                aria-controls={`step-panel-${index}`}
                className={`step-card${isActive ? " active" : ""}`}
                key={step.n}
                onClick={() => toggleStep(index)}
                onKeyDown={(event) => handleStepKey(event, index)}
              >
                <b>{step.n}</b>
                <h3>{step.title}</h3>
                <p>{step.teaser}</p>
                <span className="step-more">{isActive ? "Weniger anzeigen ↑" : "Mehr anzeigen ↓"}</span>
                {isActive && (
                  <div id={`step-panel-${index}`} className="mobile-step-detail" role="tabpanel" aria-labelledby={`step-${index}`}>
                    <StepDetails step={step} compact />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {activeStep !== null && (
          <div className="wrap step-detail desktop-step-detail" role="tabpanel" aria-labelledby={`step-${activeStep}`}>
            <span>{steps[activeStep].n}</span>
            <div className="step-detail-content">
              <div className="step-detail-heading"><small>Praktische Orientierung</small><b>{steps[activeStep].title}</b></div>
              <StepDetails step={steps[activeStep]} />
            </div>
          </div>
        )}
        <a className="center-cta" href="#start">Masterclass kostenlos ansehen →</a>
      </section>

      <section className="section proof-section" id="proof">
        <div className="narrow center">
          <span className="kicker">Ergebnisse aus dem echten Material</span>
          <h2>Nicht behaupten. <em>Zeigen.</em></h2>
          <p>Unveränderte Screens aus der Enricha-Community. Einzelne Ergebnisse sind keine Garantie.</p>
        </div>
        <div className="wrap proof-layout">
          <button className="proof-main proof-main-button" type="button" onClick={() => setProofOpen(true)} aria-label="Aktuelles Ergebnis vergrößern">
            <img src={drive(proof[activeProof][0], 1200)} alt={proof[activeProof][1]} loading="lazy" decoding="async" />
            <span className="proof-expand">Vergrößern ↗</span>
          </button>
          <div className="proof-thumbs" aria-label="Weitere Ergebnisse">
            {proof.map(([id, alt], i) => (
              <button
                key={id}
                className={i === activeProof ? "active" : ""}
                onClick={() => setActiveProof(i)}
                aria-label={`Ergebnis ${i + 1} anzeigen`}
                aria-pressed={i === activeProof}
              >
                <img src={drive(id, 320)} alt={alt} loading="lazy" decoding="async" />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="wrap review-area">
          <h3>Was Teilnehmer schreiben.</h3>
          <div className="reviews">
            {reviews.map((id, i) => (
              <figure key={id}><img src={drive(id, 800)} alt={`Echte Teilnehmerbewertung ${i + 1}`} loading="lazy" decoding="async" /></figure>
            ))}
          </div>
        </div>
      </section>

      {proofOpen && (
        <div className="proof-modal" role="dialog" aria-modal="true" aria-label="Kundenergebnis vergrößert" onClick={() => setProofOpen(false)}>
          <button className="proof-modal-close" type="button" onClick={() => setProofOpen(false)} aria-label="Ansicht schließen">×</button>
          <button className="proof-modal-arrow proof-modal-prev" type="button" onClick={(event) => { event.stopPropagation(); setActiveProof((current) => (current - 1 + proof.length) % proof.length); }} aria-label="Vorheriges Ergebnis">←</button>
          <div className="proof-modal-image" onClick={(event) => event.stopPropagation()}>
            <img src={drive(proof[activeProof][0], 1800)} alt={proof[activeProof][1]} decoding="async" />
            <p>{proof[activeProof][1]}</p>
          </div>
          <button className="proof-modal-arrow proof-modal-next" type="button" onClick={(event) => { event.stopPropagation(); setActiveProof((current) => (current + 1) % proof.length); }} aria-label="Nächstes Ergebnis">→</button>
        </div>
      )}

      <section className="section about" id="timo">
        <div className="wrap about-card">
          <div className="about-image"><img src="/images/timo-about.jpg" alt="Timo arbeitet am Laptop" /></div>
          <div>
            <span className="kicker">Über mich</span>
            <h2>Hey, ich bin Timo.</h2>
            <p>Ich habe selbst lange ausprobiert, was bei Kurzvideos wirklich funktioniert – und was einfach nur Zeit kostet. In dieser kostenlosen Masterclass zeige ich dir den klaren Ablauf und das System, das ich heute selbst nutze.</p>
            <p><b>Keine Versprechen über Nacht. Kein unnötiger Hype.</b></p>
            <p>Sondern ein einfaches System, das du verstehen, umsetzen und langfristig nutzen kannst.</p>
            <div className="about-tags"><span>Faceless Shortform</span><span>TikTok</span><span>Klare Strategie</span></div>
          </div>
        </div>
      </section>

      <section className="section faq">
        <div className="wrap faq-grid">
          <div><span className="kicker">FAQ</span><h2>Alles, was du vorher wissen musst.</h2></div>
          <div>
            {[
              ["Ist die Masterclass wirklich kostenlos?", "Ja. Die Masterclass ist kostenlos und ohne Abo."],
              ["Muss ich mein Gesicht zeigen?", "Nein. Die Masterclass ist ausdrücklich auf faceless Kurzvideo-Formate ausgerichtet."],
              ["Brauche ich Erfahrung oder teure Tools?", "Nein. Du startest bei Nische, Format und Ablauf. Tools kommen erst dort ins Spiel, wo sie dir wirklich Arbeit abnehmen."],
              ["Wie viel Zeit sollte ich einplanen?", "Plane genug Zeit ein, um den Ablauf nicht nur anzuschauen, sondern direkt auf dein erstes Format zu übertragen."],
            ].map(([q, a], i) => (
              <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="narrow center">
          <span className="kicker">Dein erster Schritt</span>
          <h2>Bau dir ein System, das du wirklich durchziehst.</h2>
          <p>Hol dir jetzt die kostenlose Masterclass und starte mit einem klaren Plan.</p>
          <Optin dark />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <a className="logo" href="#top">enricha<span>.</span></a>
          <p>© {new Date().getFullYear()} Enricha. Ergebnisse sind individuell.</p>
          <nav><a href="/kontakt">Kontakt</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/widerrufsrecht">Widerrufsrecht</a></nav>
        </div>
      </footer>
    </main>
  );
}
