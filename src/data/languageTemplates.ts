/**
 * TEMPLATE LINGUISTICI CON SISTEMA MODALI COMPLETO E 100% VISIBILE
 * - Modali overlay funzionanti in ogni browser e iframe
 * - Contenuti didattici completi per ciascuna card
 * - Pulsante "📖 Scheda Lezione (Modale)" visibile sia sulle card sia nell'intestazione
 */

export interface LanguageTemplate {
  id: 'orientali' | 'slave' | 'occidentali';
  name: string;
  flag: string;
  langTitle: string;
  langSubtitle: string;
  html: string;
  css: string;
  js: string;
}

// ==========================================================================
// 1. TEMPLATE ORIENTALI (GIAPPONESE)
// ==========================================================================
const ORIENTALI_HTML = `<!-- ====================================================
     PORTALE DI APPRENDIMENTO: LINGUE ORIENTALI (GIAPPONESE)
     ==================================================== -->
<div class="site-container">

  <!-- INTESTAZIONE PRINCIPALE CON PULSANTE MODALE DIRETTO -->
  <header class="main-header">
    <div class="header-top-row">
      <div class="header-badge">🇯🇵 Lingue Orientali</div>
      <button type="button" class="header-modal-btn" onclick="mostraScheda('indice')">
        📖 Apri Modale Lezioni
      </button>
    </div>
    <h1 class="header-title">Corso di Lingua Giapponese: Scrittura e Grammatica</h1>
    <p class="header-desc">Lezioni pratiche su Kanji, ordine dei tratti Shodō, Hiragana e particelle.</p>
  </header>

  <!-- STAGE PRINCIPALE -->
  <main class="portal-stage">

    <!-- COLONNA SINISTRA: CARD 1 & CARD 2 -->
    <div class="col-side">

      <!-- CARD 1: NASTRO A SCORRIMENTO REGOLE -->
      <div class="card-ribbon-marquee" id="ribbonCard">
        <div class="crm-top">
          <div class="crm-badge">Regole dei Tratti</div>
          <div class="crm-live">
            <span class="crm-live-dot"></span>
            <span>In tempo reale</span>
          </div>
        </div>

        <div class="crm-body">
          <div class="crm-avatar">
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" alt="Kanji" />
          </div>

          <div class="crm-marquee-track" id="marqueeTrack">
            <div class="crm-track-header">
              <span>Regole dei Tratti (Kakijun) · Clicca una regola per la scheda:</span>
              <button type="button" id="crmToggleBtn" class="crm-toggle-btn">Pausa</button>
            </div>

            <div class="crm-viewport">
              <div class="crm-text-slider" id="crmTextSlider">
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_1')">1. Card 1.1 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_2')">2. Card 1.2 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_3')">3. Card 1.3 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_4')">4. Card 1.4 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_1')">1. Card 1.1 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_2')">2. Card 1.2 📖</button>
                <span class="sep">✦</span>
              </div>
            </div>
          </div>
        </div>

        <!-- LISTA RAPIDA REGOLE CARD 1 -->
        <div class="crm-pills-row">
          <span class="crm-pills-label">Modali Card 1 (Clicca per aprire):</span>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_1')">Card 1.1</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_2')">Card 1.2</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_3')">Card 1.3</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_4')">Card 1.4</button>
        </div>

        <div class="crm-footer">
          <span>⏱ 2 min di lettura</span>
          <button type="button" class="crm-btn-link" onclick="mostraScheda('card_1')">📖 Modale Card 1 →</button>
        </div>
      </div>

      <!-- CARD 2: MORPHING SISTEMI DI SCRITTURA -->
      <div class="card-morphing" id="morphingCard">
        <div class="cm-dock">
          <div class="cm-dock-title">Seleziona Sistema:</div>
          <div class="cm-icons-rail">
            <button type="button" class="cm-cat-btn active" data-badge="Ideogrammi" data-title="Kanji (漢字): Caratteri di Senso" data-deck="Esprimono le radici concettuali. Si compongono di 214 radicali semantici combinati in proporzione armonica." data-img="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80">Kanji</button>
            <button type="button" class="cm-cat-btn" data-badge="Sillabario Morbido" data-title="Hiragana (ひらがな): La Grammatica" data-deck="46 caratteri dalle curve fluide usati per particelle, desinenze verbali e suffissi cortesi." data-img="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80">Hiragana</button>
            <button type="button" class="cm-cat-btn" data-badge="Sillabario Angolare" data-title="Katakana (カタカナ): Parole Straniere" data-deck="46 caratteri dai tratti diritti per trascrivere termini di origine estera e nomi propri occidentali." data-img="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80">Katakana</button>
          </div>
        </div>

        <div class="cm-photo">
          <img id="cmImage" src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80" alt="Scrittura" />
          <span class="cm-badge" id="cmBadge">Ideogrammi</span>
        </div>

        <div class="cm-content">
          <h3 id="cmTitle" class="cm-title">Kanji (漢字): Caratteri di Senso</h3>
          <p id="cmDeck" class="cm-deck">Esprimono le radici concettuali. Si compongono di 214 radicali semantici combinati in proporzione armonica.</p>
        </div>

        <div class="cm-footer">
          <span>⏱ 3 min di studio</span>
          <button type="button" class="cm-action-btn" onclick="mostraScheda('card_2')">Apri Modale Card 2 →</button>
        </div>
      </div>

    </div>

    <!-- COLONNA CENTRALE: IL VIDEO IN PRIMO PIANO -->
    <div class="col-center-video">
      <div class="video-main-card">
        <div class="video-card-header">
          <span class="video-badge-pill">Masterclass Video in Primo Piano</span>
          <h2 class="video-heading">Corso di Cinese Quotidiano: Mike a Shanghai</h2>
          <p class="video-desc">Guarda il video della lezione di conversazione quotidiana.</p>
        </div>

        <!-- LETTORE VIDEO -->
        <div class="video-box">
          <iframe
            id="videoPlayer"
            class="video-player"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="Video Lezione"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <!-- 3 PUNTI FONDAMENTALI SOTTO AL VIDEO -->
        <div class="video-rules-row">
          <div class="rule-box" onclick="mostraScheda('video_1')">
            <span class="rule-tag">HSK 1</span>
            <h4>Vocaboli essenziali</h4>
            <p>15 vocaboli quotidiani con minutaggio del video. Clicca per aprire.</p>
          </div>
          <div class="rule-box" onclick="mostraScheda('video_2')">
            <span class="rule-tag">HSK 3</span>
            <h4>Nuove parole</h4>
            <p>I 4 vocaboli non HSK 1 spiegati. Clicca per aprire.</p>
          </div>
          <div class="rule-box" onclick="mostraScheda('video_3')">
            <span class="rule-tag">Script</span>
            <h4>Trascrizione video</h4>
            <p>Trascrizione completa dei dialoghi del video. Clicca per aprire.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- COLONNA DESTRA: CARD 3 & CARD 4 -->
    <div class="col-side">

      <!-- CARD 3: SLIDER PARAGRAFI GRAMMATICA -->
      <div class="card-chapter-reader">
        <div class="ccr-top">
          <span class="ccr-badge">✦ Grammatica Essenziale</span>
          <div class="ccr-arrows">
            <button type="button" id="ccrPrev" class="ccr-arrow">‹</button>
            <span id="ccrIndex" class="ccr-index">01 / 03</span>
            <button type="button" id="ccrNext" class="ccr-arrow">›</button>
          </div>
        </div>

        <div class="ccr-photo">
          <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80" alt="Grammatica" />
          <div class="ccr-photo-tag">Particelle & Coniugazione</div>
        </div>

        <div class="ccr-slider-dock">
          <div class="ccr-tabs">
            <button type="button" class="ccr-tab active" data-step="0">01. WA (は)</button>
            <button type="button" class="ccr-tab" data-step="1">02. Verbi</button>
            <button type="button" class="ccr-tab" data-step="2">03. Forma TE</button>
          </div>

          <div class="ccr-prose-viewport">
            <div class="ccr-prose-track" id="ccrProseTrack">
              <div class="ccr-slide">
                <div class="eyebrow">La Particella di Tema</div>
                <h4>La Particella は (WA)</h4>
                <p>Indica ciò di cui si sta parlando ('per quanto riguarda...'). Si scrive con il carattere HA ma si legge WA.</p>
              </div>
              <div class="ccr-slide">
                <div class="eyebrow">I Due Gruppi Verbali</div>
                <h4>Verbi Ichidan e Godan</h4>
                <p>I verbi giapponesi si dividono in regolari (Godan e Ichidan) e solo due verbi irregolari: fare (suru) e venire (kuru).</p>
              </div>
              <div class="ccr-slide">
                <div class="eyebrow">Collegare Azioni</div>
                <h4>La Forma in て (TE)</h4>
                <p>Indispensabile per concatenare verbi in sequenza temporale e per richiedere cortesemente (-te kudasai).</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ccr-footer">
          <span>⏱ 4 min di studio</span>
          <button type="button" class="ccr-btn" onclick="mostraScheda('card_3')">Apri Modale Card 3 →</button>
        </div>
      </div>

      <!-- CARD 4: GALLERIA FOTOGRAFICA TRATTI -->
      <div class="card-visual-story" id="photoSliderCard">
        <div class="cvs-header">
          <span class="cvs-badge">🖌 Galleria Calligrafia</span>
          <span class="cvs-counter" id="cvsCounter">1 / 3</span>
        </div>

        <div class="cvs-slider-box">
          <div class="cvs-track" id="cvsTrack">
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80" alt="Tratto Orizzontale" />
              <div class="cvs-caption">1. Tratto Orizzontale (横 Ichimonji): attacco deciso e tenuta ferma</div>
            </div>
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80" alt="Tratto Verticale" />
              <div class="cvs-caption">2. Tratto Verticale (竖 Tate): discesa perpendicolare a goccia d'ambra</div>
            </div>
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80" alt="Il Gancio" />
              <div class="cvs-caption">3. Il Gancio (钩 Hane): pressione del polso e scatto elastico</div>
            </div>
          </div>

          <button type="button" class="cvs-nav-btn prev" id="cvsPrev">‹</button>
          <button type="button" class="cvs-nav-btn next" id="cvsNext">›</button>
        </div>

        <div class="cvs-dots">
          <button type="button" class="dot active" data-index="0"></button>
          <button type="button" class="dot" data-index="1"></button>
          <button type="button" class="dot" data-index="2"></button>
        </div>

        <div class="cvs-details">
          <h3 class="cvs-title">I Tre Movimenti dell'Inchiostro</h3>
          <div class="cvs-footer">
            <span>Sequenza visiva</span>
            <button type="button" class="cvs-link" onclick="mostraScheda('card_4')">Apri Modale Card 4 →</button>
          </div>
        </div>
      </div>

    </div>

  </main>

  <!-- ========================================================
       MODALE OVERLAY (100% VISIBILE, CENTRATO E INTERATTIVO)
       ======================================================== -->
  <div id="schedaModal" class="modal-overlay" onclick="gestisciClickBackdrop(event)">
    <div class="modal-window">
      <div class="modal-window-header">
        <div>
          <span class="modal-badge-tag" id="modalTag">Scheda Didattica</span>
          <h3 class="modal-window-title" id="modalTitle">Titolo Scheda</h3>
        </div>
        <button type="button" class="modal-close-x" onclick="chiudiScheda()" aria-label="Chiudi Modale">✕</button>
      </div>

      <div class="modal-window-body" id="modalBody">
        <!-- Contenuto dinamico della lezione -->
      </div>

      <div class="modal-window-footer">
        <span class="modal-footer-note">Premi ✕ o clicca all'esterno per chiudere.</span>
        <button type="button" class="modal-close-btn" onclick="chiudiScheda()">Chiudi Scheda</button>
      </div>
    </div>
  </div>

</div>`;

// ==========================================================================
// 2. TEMPLATE SLAVE (RUSSO)
// ==========================================================================
const SLAVE_HTML = `<!-- ====================================================
     PORTALE DI APPRENDIMENTO: LINGUE SLAVE (RUSSO)
     ==================================================== -->
<div class="site-container">

  <header class="main-header">
    <div class="header-top-row">
      <div class="header-badge">🇷🇺 Lingue Slave</div>
      <button type="button" class="header-modal-btn" onclick="mostraScheda('indice')">
        📖 Apri Modale Lezioni
      </button>
    </div>
    <h1 class="header-title">Corso di Lingua Russa: Alfabeto Cirillico e Grammatica</h1>
    <p class="header-desc">Lezioni pratiche sui 6 casi, verbi di moto, aspetto verbale e fonetica dell'accento.</p>
  </header>

  <main class="portal-stage">

    <!-- COLONNA SINISTRA -->
    <div class="col-side">

      <!-- CARD 1: NASTRO SCORREVOLE REGOLE -->
      <div class="card-ribbon-marquee" id="ribbonCard">
        <div class="crm-top">
          <div class="crm-badge">Regole Fonetiche</div>
          <div class="crm-live">
            <span class="crm-live-dot"></span>
            <span>In tempo reale</span>
          </div>
        </div>

        <div class="crm-body">
          <div class="crm-avatar">
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" alt="Cirillico" />
          </div>

          <div class="crm-marquee-track" id="marqueeTrack">
            <div class="crm-track-header">
              <span>Fonetica ed Eccezioni Cirilliche · Clicca una regola:</span>
              <button type="button" id="crmToggleBtn" class="crm-toggle-btn">Pausa</button>
            </div>

            <div class="crm-viewport">
              <div class="crm-text-slider" id="crmTextSlider">
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_1')">1. Card 1.1 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_2')">2. Card 1.2 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_3')">3. Card 1.3 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_4')">4. Card 1.4 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_1')">1. Card 1.1 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_2')">2. Card 1.2 📖</button>
                <span class="sep">✦</span>
              </div>
            </div>
          </div>
        </div>

        <!-- LISTA RAPIDA REGOLE CARD 1 RUSSO -->
        <div class="crm-pills-row">
          <span class="crm-pills-label">Modali Card 1 (Clicca per aprire):</span>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_1')">Card 1.1</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_2')">Card 1.2</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_3')">Card 1.3</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_4')">Card 1.4</button>
        </div>

        <div class="crm-footer">
          <span>⏱ 2 min di lettura</span>
          <button type="button" class="crm-btn-link" onclick="mostraScheda('card_1')">📖 Modale Card 1 →</button>
        </div>
      </div>

      <!-- CARD 2: MORPHING CASI -->
      <div class="card-morphing" id="morphingCard">
        <div class="cm-dock">
          <div class="cm-dock-title">I 6 Casi della Declinazione:</div>
          <div class="cm-icons-rail">
            <button type="button" class="cm-cat-btn active" data-badge="Caso 1" data-title="Il Caso Nominativo (Кто? Что?)" data-deck="Indica il soggetto o il predicato nominale. È la forma pura di dizionario (es. книга, стол)." data-img="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80">Nominativo</button>
            <button type="button" class="cm-cat-btn" data-badge="Caso 2" data-title="Il Caso Genitivo (Кого? Чеgo?)" data-deck="Indica possesso, quantità dopo i numeri 2-3-4, o assenza con нет ('нет книги')." data-img="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80">Genitivo</button>
            <button type="button" class="cm-cat-btn" data-badge="Caso 5" data-title="Il Caso Strumentale (Кем? Чем?)" data-deck="Indica lo strumento con cui si agisce ('con la penna') o la professione lavorativa." data-img="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80">Strumentale</button>
          </div>
        </div>

        <div class="cm-photo">
          <img id="cmImage" src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80" alt="Casi" />
          <span class="cm-badge" id="cmBadge">Caso 1</span>
        </div>

        <div class="cm-content">
          <h3 id="cmTitle" class="cm-title">Il Caso Nominativo (Кто? Что?)</h3>
          <p id="cmDeck" class="cm-deck">Indica il soggetto o il predicato nominale. È la forma pura di dizionario (es. книга, стол).</p>
        </div>

        <div class="cm-footer">
          <span>⏱ 3 min di studio</span>
          <button type="button" class="cm-action-btn" onclick="mostraScheda('card_2')">Apri Modale Card 2 →</button>
        </div>
      </div>

    </div>

    <!-- COLONNA CENTRALE: VIDEO IN PRIMO PIANO -->
    <div class="col-center-video">
      <div class="video-main-card">
        <div class="video-card-header">
          <span class="video-badge-pill">Masterclass Video in Primo Piano</span>
          <h2 class="video-heading">L'Alfabeto Cirillico: Scrittura Corsiva e Legature</h2>
          <p class="video-desc">Impara a tracciare le 33 lettere del cirillico in corsivo senza confondere i falsi amici visivi con l'alfabeto latino.</p>
        </div>

        <div class="video-box">
          <iframe
            id="videoPlayer"
            class="video-player"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="Video Lezione"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <!-- 3 PUNTI FONDAMENTALI SOTTO AL VIDEO -->
        <div class="video-rules-row">
          <div class="rule-box" onclick="mostraScheda('video_1')">
            <span class="rule-tag">Punto 1</span>
            <h4>Video 1.1</h4>
            <p>Contenuto segnaposto per Video 1.1. Clicca per aprire il modale.</p>
          </div>
          <div class="rule-box" onclick="mostraScheda('video_2')">
            <span class="rule-tag">Punto 2</span>
            <h4>Video 1.2</h4>
            <p>Contenuto segnaposto per Video 1.2. Clicca per aprire il modale.</p>
          </div>
          <div class="rule-box" onclick="mostraScheda('video_3')">
            <span class="rule-tag">Punto 3</span>
            <h4>Video 1.3</h4>
            <p>Contenuto segnaposto per Video 1.3. Clicca per aprire il modale.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- COLONNA DESTRA -->
    <div class="col-side">

      <!-- CARD 3: SLIDER VERBI DI MOTO -->
      <div class="card-chapter-reader">
        <div class="ccr-top">
          <span class="ccr-badge">✦ Verbi di Moto</span>
          <div class="ccr-arrows">
            <button type="button" id="ccrPrev" class="ccr-arrow">‹</button>
            <span id="ccrIndex" class="ccr-index">01 / 03</span>
            <button type="button" id="ccrNext" class="ccr-arrow">›</button>
          </div>
        </div>

        <div class="ccr-photo">
          <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80" alt="Verbi" />
          <div class="ccr-photo-tag">Monodirezionale vs Pluridirezionale</div>
        </div>

        <div class="ccr-slider-dock">
          <div class="ccr-tabs">
            <button type="button" class="ccr-tab active" data-step="0">01. A piedi</button>
            <button type="button" class="ccr-tab" data-step="1">02. Con mezzo</button>
            <button type="button" class="ccr-tab" data-step="2">03. Prefissi</button>
          </div>

          <div class="ccr-prose-viewport">
            <div class="ccr-prose-track" id="ccrProseTrack">
              <div class="ccr-slide">
                <div class="eyebrow">Movimento a Piedi</div>
                <h4>Идти vs Ходить</h4>
                <p>Идти indica un movimento in una sola direzione prefissata; ходить indica andata e ritorno o un'abitudine ripetuta.</p>
              </div>
              <div class="ccr-slide">
                <div class="eyebrow">Con Mezzo di Trasporto</div>
                <h4>Ехать vs Ездить</h4>
                <p>Si usano quando lo spostamento avviene in macchina, treno o aereo: 'я еду на работу' (sto andando al lavoro in auto).</p>
              </div>
              <div class="ccr-slide">
                <div class="eyebrow">I Prefissi di Spostamento</div>
                <h4>По-, При-, У-, Вы-</h4>
                <p>I prefissi modificano la direzione: прийти (arrivare), уйти (andarsene), выйти (uscire all'aperto).</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ccr-footer">
          <span>⏱ 5 min di studio</span>
          <button type="button" class="ccr-btn" onclick="mostraScheda('card_3')">Apri Modale Card 3 →</button>
        </div>
      </div>

      <!-- CARD 4: GALLERIA FOTO CORSIVO -->
      <div class="card-visual-story" id="photoSliderCard">
        <div class="cvs-header">
          <span class="cvs-badge">✍️ Scrittura Corsiva</span>
          <span class="cvs-counter" id="cvsCounter">1 / 3</span>
        </div>

        <div class="cvs-slider-box">
          <div class="cvs-track" id="cvsTrack">
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80" alt="Corsivo" />
              <div class="cvs-caption">1. La 'm' corsiva russa: si scrive visivamente identica alla 't' latina</div>
            </div>
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80" alt="Lettere" />
              <div class="cvs-caption">2. Legature fluide: collegamento continuo senza sollevare la penna</div>
            </div>
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80" alt="Manoscritto" />
              <div class="cvs-caption">3. Le aste inferiori delle lettere 'д', 'у', 'з': lunghezza equilibrata</div>
            </div>
          </div>

          <button type="button" class="cvs-nav-btn prev" id="cvsPrev">‹</button>
          <button type="button" class="cvs-nav-btn next" id="cvsNext">›</button>
        </div>

        <div class="cvs-dots">
          <button type="button" class="dot active" data-index="0"></button>
          <button type="button" class="dot" data-index="1"></button>
          <button type="button" class="dot" data-index="2"></button>
        </div>

        <div class="cvs-details">
          <h3 class="cvs-title">I Segreti del Corsivo Cirillico</h3>
          <div class="cvs-footer">
            <span>Guida visiva</span>
            <button type="button" class="cvs-link" onclick="mostraScheda('card_4')">Apri Modale Card 4 →</button>
          </div>
        </div>
      </div>

    </div>

  </main>

  <!-- MODALE OVERLAY -->
  <div id="schedaModal" class="modal-overlay" onclick="gestisciClickBackdrop(event)">
    <div class="modal-window">
      <div class="modal-window-header">
        <div>
          <span class="modal-badge-tag" id="modalTag">Scheda Didattica</span>
          <h3 class="modal-window-title" id="modalTitle">Titolo Scheda</h3>
        </div>
        <button type="button" class="modal-close-x" onclick="chiudiScheda()" aria-label="Chiudi Modale">✕</button>
      </div>

      <div class="modal-window-body" id="modalBody">
        <!-- Contenuto dinamico della lezione -->
      </div>

      <div class="modal-window-footer">
        <span class="modal-footer-note">Premi ✕ o clicca all'esterno per chiudere.</span>
        <button type="button" class="modal-close-btn" onclick="chiudiScheda()">Chiudi Scheda</button>
      </div>
    </div>
  </div>

</div>`;

// ==========================================================================
// 3. TEMPLATE OCCIDENTALI (ITALIANO)
// ==========================================================================
const OCCIDENTALI_HTML = `<!-- ====================================================
     PORTALE DI APPRENDIMENTO: LINGUE OCCIDENTALI (ITALIANO)
     ==================================================== -->
<div class="site-container">

  <header class="main-header">
    <div class="header-top-row">
      <div class="header-badge">🇮🇹 Lingue Occidentali</div>
      <button type="button" class="header-modal-btn" onclick="mostraScheda('indice')">
        📖 Apri Modale Lezioni
      </button>
    </div>
    <h1 class="header-title">Corso di Lingua Italiana: Sintassi e Modi Verbali</h1>
    <p class="header-desc">Lezioni pratiche sul congiuntivo, periodo ipotetico, concordanza dei tempi e calligrafia italica.</p>
  </header>

  <main class="portal-stage">

    <!-- COLONNA SINISTRA -->
    <div class="col-side">

      <!-- CARD 1: NASTRO SCORREVOLE REGOLE -->
      <div class="card-ribbon-marquee" id="ribbonCard">
        <div class="crm-top">
          <div class="crm-badge">Regole di Sintassi</div>
          <div class="crm-live">
            <span class="crm-live-dot"></span>
            <span>In tempo reale</span>
          </div>
        </div>

        <div class="crm-body">
          <div class="crm-avatar">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80" alt="Libro" />
          </div>

          <div class="crm-marquee-track" id="marqueeTrack">
            <div class="crm-track-header">
              <span>Sintassi e Regole d'Oro · Clicca una regola:</span>
              <button type="button" id="crmToggleBtn" class="crm-toggle-btn">Pausa</button>
            </div>

            <div class="crm-viewport">
              <div class="crm-text-slider" id="crmTextSlider">
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_1')">1. Card 1.1 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_2')">2. Card 1.2 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_3')">3. Card 1.3 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_4')">4. Card 1.4 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_1')">1. Card 1.1 📖</button>
                <span class="sep">✦</span>
                <button type="button" class="crm-rule-chip" onclick="mostraScheda('card_1_2')">2. Card 1.2 📖</button>
                <span class="sep">✦</span>
              </div>
            </div>
          </div>
        </div>

        <!-- LISTA RAPIDA REGOLE CARD 1 ITALIANO -->
        <div class="crm-pills-row">
          <span class="crm-pills-label">Modali Card 1 (Clicca per aprire):</span>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_1')">Card 1.1</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_2')">Card 1.2</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_3')">Card 1.3</button>
          <button type="button" class="crm-mini-pill" onclick="mostraScheda('card_1_4')">Card 1.4</button>
        </div>

        <div class="crm-footer">
          <span>⏱ 2 min di lettura</span>
          <button type="button" class="crm-btn-link" onclick="mostraScheda('card_1')">📖 Modale Card 1 →</button>
        </div>
      </div>

      <!-- CARD 2: MORPHING MODI VERBALI -->
      <div class="card-morphing" id="morphingCard">
        <div class="cm-dock">
          <div class="cm-dock-title">I Tempi del Congiuntivo:</div>
          <div class="cm-icons-rail">
            <button type="button" class="cm-cat-btn active" data-badge="Tempo Presente" data-title="Il Congiuntivo Presente" data-deck="Esprime opinione o timore rispetto a un fatto attuale: 'Credo che tu abbia ragione', 'Spero che arrivi presto'." data-img="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80">Presente</button>
            <button type="button" class="cm-cat-btn" data-badge="Tempo Passato" data-title="Il Congiuntivo Imperfetto" data-deck="Tipico del periodo ipotetico della possibilità: 'Se potessi, partirei subito', 'Vorrei che tu fossi qui'." data-img="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80">Imperfetto</button>
            <button type="button" class="cm-cat-btn" data-badge="Modo Condizionale" data-title="Il Condizionale Presente" data-deck="Indica un'azione subordinata a una condizione: 'Verrei volentieri se non avessi un impegno'." data-img="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80">Condizionale</button>
          </div>
        </div>

        <div class="cm-photo">
          <img id="cmImage" src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80" alt="Modi" />
          <span class="cm-badge" id="cmBadge">Tempo Presente</span>
        </div>

        <div class="cm-content">
          <h3 id="cmTitle" class="cm-title">Il Congiuntivo Presente</h3>
          <p id="cmDeck" class="cm-deck">Esprime opinione o timore rispetto a un fatto attuale: 'Credo che tu abbia ragione', 'Spero che arrivi presto'.</p>
        </div>

        <div class="cm-footer">
          <span>⏱ 3 min di studio</span>
          <button type="button" class="cm-action-btn" onclick="mostraScheda('card_2')">Apri Modale Card 2 →</button>
        </div>
      </div>

    </div>

    <!-- COLONNA CENTRALE: VIDEO IN PRIMO PIANO -->
    <div class="col-center-video">
      <div class="video-main-card">
        <div class="video-card-header">
          <span class="video-badge-pill">Masterclass Video in Primo Piano</span>
          <h2 class="video-heading">Il Periodo Ipotetico: Realtà, Possibilità e Irrealtà</h2>
          <p class="video-desc">Come combinare congiuntivo e condizionale senza cadere nel tipico errore 'se avrei'. Regole ferree ed esempi commentati.</p>
        </div>

        <div class="video-box">
          <iframe
            id="videoPlayer"
            class="video-player"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="Video Lezione"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <!-- 3 PUNTI FONDAMENTALI SOTTO AL VIDEO -->
        <div class="video-rules-row">
          <div class="rule-box" onclick="mostraScheda('video_1')">
            <span class="rule-tag">Punto 1</span>
            <h4>Video 1.1</h4>
            <p>Contenuto segnaposto per Video 1.1. Clicca per aprire il modale.</p>
          </div>
          <div class="rule-box" onclick="mostraScheda('video_2')">
            <span class="rule-tag">Punto 2</span>
            <h4>Video 1.2</h4>
            <p>Contenuto segnaposto per Video 1.2. Clicca per aprire il modale.</p>
          </div>
          <div class="rule-box" onclick="mostraScheda('video_3')">
            <span class="rule-tag">Punto 3</span>
            <h4>Video 1.3</h4>
            <p>Contenuto segnaposto per Video 1.3. Clicca per aprire il modale.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- COLONNA DESTRA -->
    <div class="col-side">

      <!-- CARD 3: SLIDER SUBORDINATE -->
      <div class="card-chapter-reader">
        <div class="ccr-top">
          <span class="ccr-badge">✦ Congiunzioni & Subordinate</span>
          <div class="ccr-arrows">
            <button type="button" id="ccrPrev" class="ccr-arrow">‹</button>
            <span id="ccrIndex" class="ccr-index">01 / 03</span>
            <button type="button" id="ccrNext" class="ccr-arrow">›</button>
          </div>
        </div>

        <div class="ccr-photo">
          <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80" alt="Subordinate" />
          <div class="ccr-photo-tag">Concessive, Finali e Dubitative</div>
        </div>

        <div class="ccr-slider-dock">
          <div class="ccr-tabs">
            <button type="button" class="ccr-tab active" data-step="0">01. Concessive</button>
            <button type="button" class="ccr-tab" data-step="1">02. Finali</button>
            <button type="button" class="ccr-tab" data-step="2">03. Dubitative</button>
          </div>

          <div class="ccr-prose-viewport">
            <div class="ccr-prose-track" id="ccrProseTrack">
              <div class="ccr-slide">
                <div class="eyebrow">Benché, sebbene, malgrado</div>
                <h4>Le Subordinate Concessive</h4>
                <p>Reggono sempre il congiuntivo: 'Sebbene sia tardi, continuiamo a studiare con passione'.</p>
              </div>
              <div class="ccr-slide">
                <div class="eyebrow">Affinché, perché</div>
                <h4>Le Subordinate Finali</h4>
                <p>Esprimono lo scopo dell'azione principale: 'Ti spiego la regola affinché tu la comprenda a fondo'.</p>
              </div>
              <div class="ccr-slide">
                <div class="eyebrow">Che, se</div>
                <h4>Verbi di Opinione e Dubbio</h4>
                <p>'Dubito che sia vero', 'Non so se sia già arrivato'. La soggettività richiede il congiuntivo.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ccr-footer">
          <span>⏱ 4 min di studio</span>
          <button type="button" class="ccr-btn" onclick="mostraScheda('card_3')">Apri Modale Card 3 →</button>
        </div>
      </div>

      <!-- CARD 4: GALLERIA FOTO CALLIGRAFIA ITALICA -->
      <div class="card-visual-story" id="photoSliderCard">
        <div class="cvs-header">
          <span class="cvs-badge">🖋 Calligrafia Italica</span>
          <span class="cvs-counter" id="cvsCounter">1 / 3</span>
        </div>

        <div class="cvs-slider-box">
          <div class="cvs-track" id="cvsTrack">
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80" alt="Cancelleresca" />
              <div class="cvs-caption">1. La cancelleresca rinascimentale: inclinazione a 10 gradi e punte quadrate</div>
            </div>
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80" alt="Manoscritto" />
              <div class="cvs-caption">2. Tratteggio ascendente leggero e discendente marcato a pennino</div>
            </div>
            <div class="cvs-slide">
              <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80" alt="Archivio" />
              <div class="cvs-caption">3. L'armonia tra occhiello e asta superiore delle lettere b, d, h</div>
            </div>
          </div>

          <button type="button" class="cvs-nav-btn prev" id="cvsPrev">‹</button>
          <button type="button" class="cvs-nav-btn next" id="cvsNext">›</button>
        </div>

        <div class="cvs-dots">
          <button type="button" class="dot active" data-index="0"></button>
          <button type="button" class="dot" data-index="1"></button>
          <button type="button" class="dot" data-index="2"></button>
        </div>

        <div class="cvs-details">
          <h3 class="cvs-title">La Bellezza del Corsivo Italico</h3>
          <div class="cvs-footer">
            <span>3 stili storici</span>
            <button type="button" class="cvs-link" onclick="mostraScheda('card_4')">Apri Modale Card 4 →</button>
          </div>
        </div>
      </div>

    </div>

  </main>

  <!-- MODALE OVERLAY -->
  <div id="schedaModal" class="modal-overlay" onclick="gestisciClickBackdrop(event)">
    <div class="modal-window">
      <div class="modal-window-header">
        <div>
          <span class="modal-badge-tag" id="modalTag">Scheda Didattica</span>
          <h3 class="modal-window-title" id="modalTitle">Titolo Scheda</h3>
        </div>
        <button type="button" class="modal-close-x" onclick="chiudiScheda()" aria-label="Chiudi Modale">✕</button>
      </div>

      <div class="modal-window-body" id="modalBody">
        <!-- Contenuto dinamico della lezione -->
      </div>

      <div class="modal-window-footer">
        <span class="modal-footer-note">Premi ✕ o clicca all'esterno per chiudere.</span>
        <button type="button" class="modal-close-btn" onclick="chiudiScheda()">Chiudi Scheda</button>
      </div>
    </div>
  </div>

</div>`;

// ==========================================================================
// CSS FLUIDO CON MODALE OVERLAY AD ALTA VISIBILITÀ
// ==========================================================================
const ROBUST_CSS = `/* ========================================================
   GOOGLE FONTS IMPORT UNIVERSALE & TIPOGRAFIA
   (Supporto nativo per Orientali CJK, Slave Cirillico, Occidentali Latino e tutte le altre lingue)
   ======================================================== */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Montserrat:wght@400;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@600;700;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Roboto:wght@400;500;700;900&family=Sawarabi+Mincho&family=Zen+Kaku+Gothic+New:wght@400;700;900&display=swap');

:root {
  --font-body: 'Plus Jakarta Sans', 'Noto Sans JP', 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-heading: 'Cinzel', 'Noto Serif JP', 'Montserrat', serif;
  --base-font-size: 15px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f1f5f9;
  color: #0f172a;
  font-family: var(--font-body);
  line-height: 1.5;
  font-size: var(--base-font-size);
}

h1, h2, h3, .header-title, .video-heading, .modal-window-title {
  font-family: var(--font-heading);
}

.site-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 18px 14px 60px;
}

/* HEADER DEL SITO */
.main-header {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  padding: 16px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.header-badge {
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 9999px;
}

.header-modal-btn {
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
  transition: transform 0.2s, background 0.2s;
}

.header-modal-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.header-title {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.header-desc {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

/* ========================================================
   LAYOUT FLUIDO: SI ADATTA A TUTTE LE LARGHEZZE
   ======================================================== */
.portal-stage {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
}

.col-side {
  flex: 1 1 300px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.col-center-video {
  flex: 2 1 450px;
  max-width: 660px;
  min-width: 300px;
}

/* VIDEO CENTRALE */
.video-main-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 28px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.video-card-header {
  margin-bottom: 14px;
}

.video-badge-pill {
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  font-size: 12px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 9999px;
  margin-bottom: 6px;
}

.video-heading {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
}

.video-desc {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

.video-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: #000000;
  box-shadow: 0 8px 20px rgba(0,0,0,0.18);
}

.video-player,
.video-box iframe,
.video-box video {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.video-rules-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.rule-box {
  flex: 1 1 140px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.rule-box:hover {
  transform: translateY(-2px);
  border-color: #2563eb;
}

.rule-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  color: #2563eb;
  background: #dbeafe;
  padding: 1px 6px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.rule-box h4 {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 700;
}

.rule-box p {
  margin: 0;
  font-size: 11px;
  color: #64748b;
  line-height: 1.4;
}

/* ========================================================
   CARD 1: NASTRO A SCORRIMENTO (MARQUEE)
   ======================================================== */
.card-ribbon-marquee {
  width: 100%;
  border-radius: 28px;
  padding: 18px;
  background: linear-gradient(135deg, #FF5E62 0%, #FF7E5F 50%, #FEB47B 100%);
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(255, 94, 98, 0.3);
}

.crm-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.crm-badge {
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.25);
  font-size: 12px;
  font-weight: 700;
}

.crm-live {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.25);
  font-size: 11px;
  font-weight: 700;
}

.crm-live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6ee7b7;
  animation: crmPulse 1.5s infinite;
}

.crm-body {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 18px;
  margin-bottom: 12px;
}

.crm-avatar {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.crm-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.crm-marquee-track {
  flex: 1;
  overflow: hidden;
}

.crm-track-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 800;
  margin-bottom: 3px;
}

.crm-toggle-btn {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  text-decoration: underline;
}

.crm-viewport {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
}

.crm-text-slider {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  font-weight: 700;
  animation: crmMarquee 26s linear infinite;
}

.crm-text-slider:hover {
  animation-play-state: paused;
}

.crm-rule-chip {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.crm-rule-chip:hover {
  background: #ffffff;
  color: #e11d48;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.crm-text-slider .sep {
  opacity: 0.7;
}

.crm-pills-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
}

.crm-pills-label {
  font-size: 10px;
  font-weight: 800;
  width: 100%;
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.crm-mini-pill {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.crm-mini-pill:hover {
  background: #ffffff;
  color: #be123c;
  transform: translateY(-1px);
}

.crm-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;
}

.crm-btn-link {
  padding: 6px 14px;
  border-radius: 9999px;
  background: #ffffff;
  color: #e11d48;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.crm-btn-link:hover {
  transform: scale(1.04);
}

@keyframes crmMarquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes crmPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.2); }
}

/* ========================================================
   CARD 2: MORPHING DOCK
   ======================================================== */
.card-morphing {
  width: 100%;
  border-radius: 28px;
  padding: 18px;
  background: linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%);
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.3);
}

.cm-dock {
  background: rgba(0, 0, 0, 0.25);
  padding: 8px 10px;
  border-radius: 14px;
  margin-bottom: 12px;
}

.cm-dock-title {
  font-size: 10px;
  font-weight: 800;
  margin-bottom: 4px;
}

.cm-icons-rail {
  display: flex;
  gap: 5px;
  overflow-x: auto;
}

.cm-cat-btn {
  padding: 4px 9px;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  border: none;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.cm-cat-btn.active {
  background: #ffffff;
  color: #065f46;
}

.cm-photo {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 12px;
}

.cm-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cm-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 9px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.65);
  font-size: 11px;
  font-weight: 700;
}

.cm-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 800;
}

.cm-deck {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.95);
}

.cm-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 12px;
}

.cm-action-btn {
  padding: 6px 14px;
  border-radius: 9999px;
  background: #ffffff;
  color: #065f46;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.cm-action-btn:hover {
  transform: scale(1.04);
}

/* ========================================================
   CARD 3: SLIDER PARAGRAFI
   ======================================================== */
.card-chapter-reader {
  width: 100%;
  border-radius: 28px;
  padding: 18px;
  background: linear-gradient(135deg, #0284c7 0%, #0072ff 50%, #0044b0 100%);
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(0, 114, 255, 0.3);
}

.ccr-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.ccr-badge {
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.25);
  font-size: 12px;
  font-weight: 700;
}

.ccr-arrows {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.25);
  padding: 2px 7px;
  border-radius: 9999px;
  font-size: 11px;
}

.ccr-arrow {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.ccr-photo {
  position: relative;
  height: 110px;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 12px;
}

.ccr-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ccr-photo-tag {
  position: absolute;
  bottom: 6px;
  left: 8px;
  font-size: 11px;
  font-weight: 700;
}

.ccr-slider-dock {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 14px;
  margin-bottom: 12px;
}

.ccr-tabs {
  display: flex;
  gap: 3px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 5px;
  margin-bottom: 7px;
}

.ccr-tab {
  flex: 1;
  padding: 4px 2px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.ccr-tab.active {
  background: #ffffff;
  color: #0044b0;
}

.ccr-prose-viewport {
  overflow: hidden;
}

.ccr-prose-track {
  display: flex;
  transition: transform 0.3s ease-out;
}

.ccr-slide {
  width: 100%;
  flex-shrink: 0;
  padding-right: 4px;
}

.ccr-slide .eyebrow {
  font-size: 10px;
  font-weight: 800;
  color: #bae6fd;
}

.ccr-slide h4 {
  margin: 1px 0 3px;
  font-size: 14px;
  font-weight: 800;
}

.ccr-slide p {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.ccr-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.ccr-btn {
  padding: 6px 14px;
  border-radius: 9999px;
  background: #ffffff;
  color: #0072ff;
  font-weight: 800;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.ccr-btn:hover {
  transform: scale(1.04);
}

/* ========================================================
   CARD 4: VISUAL STORY
   ======================================================== */
.card-visual-story {
  width: 100%;
  border-radius: 28px;
  padding: 18px;
  background: linear-gradient(180deg, #8A2387 0%, #E94057 50%, #F27121 100%);
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(233, 64, 87, 0.3);
}

.cvs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cvs-badge {
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.25);
  font-size: 12px;
  font-weight: 700;
}

.cvs-counter {
  padding: 2px 7px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.25);
  font-size: 11px;
}

.cvs-slider-box {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
}

.cvs-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
}

.cvs-slide {
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.cvs-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cvs-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 8px 6px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  font-size: 11px;
  line-height: 1.35;
}

.cvs-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  border: none;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cvs-nav-btn.prev { left: 6px; }
.cvs-nav-btn.next { right: 6px; }

.cvs-dots {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 10px 0 6px;
}

.cvs-dots .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
}

.cvs-dots .dot.active {
  width: 20px;
  border-radius: 9999px;
  background: #ffffff;
}

.cvs-title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 800;
}

.cvs-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 12px;
}

.cvs-link {
  background: transparent;
  border: none;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

/* ========================================================
   MODALE OVERLAY (100% VISIBILE, CENTRATO E ROBUSTO)
   ======================================================== */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-overlay.open {
  display: flex !important;
}

.modal-window {
  background: #ffffff;
  color: #0f172a;
  width: 100%;
  max-width: 580px;
  max-height: 85vh;
  border-radius: 24px;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 2px solid #cbd5e1;
  padding: 24px;
}

.modal-window-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-badge-tag {
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 9999px;
  margin-bottom: 4px;
}

.modal-window-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
}

.modal-close-x {
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: #475569;
}

.modal-close-x:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.modal-window-body {
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
}

.modal-window-body strong {
  color: #0f172a;
}

.modal-window-body ul {
  padding-left: 20px;
  margin: 8px 0;
}

.modal-window-body li {
  margin-bottom: 4px;
}

.modal-window-body pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: 13.5px;
  line-height: 1.65;
  background: #f8fafc;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin: 10px 0;
  color: #1e293b;
}

/* STILI DIALOGO & TRASCRIZIONE SCRIPT (MODALE VIDEO 3) */
.script-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.script-scene-badge {
  display: inline-block;
  background: #dbeafe;
  color: #1e40af;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 9999px;
  margin-bottom: 3px;
}

.script-scene-title {
  font-weight: 800;
  font-size: 15px;
  color: #0f172a;
}

.script-btn-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.script-pdf-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #2563eb;
  color: #ffffff !important;
  text-decoration: none !important;
  font-size: 12px;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;
}

.script-pdf-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.script-print-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  color: #334155 !important;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.script-print-btn:hover {
  background: #e2e8f0;
  color: #0f172a !important;
}

.dialogue-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dialogue-turn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.dialogue-turn.speaker-auntie {
  border-left: 4px solid #f59e0b;
}

.dialogue-turn.speaker-mike {
  border-left: 4px solid #3b82f6;
}

.speaker-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: #64748b;
}

.speaker-name-auntie { color: #d97706; }
.speaker-name-mike { color: #2563eb; }

.pinyin-ruby-row {
  font-size: 19px;
  line-height: 2.1;
  color: #0f172a;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

ruby {
  ruby-align: center;
  margin: 0 2px;
}

rt {
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  font-family: var(--font-body);
}

.english-trans {
  font-size: 13px;
  color: #475569;
  font-style: italic;
  line-height: 1.4;
  margin: 2px 0;
}

.vocab-note {
  margin-top: 8px;
  padding: 6px 12px;
  background: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: 8px;
  font-size: 12px;
  color: #92400e;
  font-weight: 600;
}

.pdf-footer-note {
  margin-top: 16px;
  padding: 10px 14px;
  background: #f1f5f9;
  border-radius: 10px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

.modal-window-footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer-note {
  font-size: 12px;
  color: #64748b;
}

.modal-close-btn {
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 9px 20px;
  border-radius: 9999px;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.modal-close-btn:hover {
  background: #2563eb;
}

/* ========================================================
   STILI DI STAMPA E SALVATAGGIO PDF (100% VISIBILE, MAI BIANCO)
   ======================================================== */
@media print {
  html, body {
    background: #ffffff !important;
    color: #0f172a !important;
    padding: 0 !important;
    margin: 0 !important;
    height: auto !important;
  }

  .site-container {
    display: block !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
  }

  /* Nascondi solo l'interfaccia principale, card di sfondo e pulsanti */
  .main-header,
  .portal-stage,
  .header-top-row,
  .header-modal-btn,
  .modal-close-x,
  .modal-close-cross,
  .modal-close-btn,
  .modal-window-footer,
  .script-pdf-btn,
  .video-rules-row,
  .crm-controls {
    display: none !important;
  }

  #schedaModal {
    position: static !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    background: #ffffff !important;
    padding: 10px 0 !important;
    margin: 0 !important;
    width: 100% !important;
    height: auto !important;
    box-shadow: none !important;
  }

  .modal-window {
    position: static !important;
    display: block !important;
    transform: none !important;
    box-shadow: none !important;
    border: none !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #ffffff !important;
  }

  .modal-window-header {
    border-bottom: 2px solid #2563eb !important;
    padding-bottom: 12px !important;
    margin-bottom: 20px !important;
  }

  .dialogue-turn {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    border: 1px solid #cbd5e1 !important;
    margin-bottom: 12px !important;
    background: #ffffff !important;
  }

  .pinyin-ruby-row {
    font-size: 21px !important;
    line-height: 2.2 !important;
    color: #0f172a !important;
  }
}
`;

// ==========================================================================
// JAVASCRIPT CON GESTIONE MODALE COMPLETA
// ==========================================================================
const ROBUST_JS = `// ========================================================
// LOGICA COMPLETA CON GESTIONE MODALI E SINTESI AUDIO
// ========================================================

// 1. GESTIONE CARD A NASTRO (CARD 1)
(function() {
  const slider = document.getElementById("crmTextSlider");
  const track = document.getElementById("marqueeTrack");
  const btn = document.getElementById("crmToggleBtn");
  if (!slider) return;

  let isPaused = false;
  function setPause(p) {
    isPaused = p;
    slider.style.animationPlayState = isPaused ? "paused" : "running";
    if (btn) btn.textContent = isPaused ? "Riavvia" : "Pausa";
  }

  if (track) {
    track.addEventListener("mouseenter", () => setPause(true));
    track.addEventListener("mouseleave", () => setPause(false));
  }
  if (btn) {
    btn.addEventListener("click", () => setPause(!isPaused));
  }
})();

// 2. GESTIONE CARD MORPHING (CARD 2)
(function() {
  const buttons = document.querySelectorAll(".cm-cat-btn");
  const img = document.getElementById("cmImage");
  const badge = document.getElementById("cmBadge");
  const title = document.getElementById("cmTitle");
  const deck = document.getElementById("cmDeck");

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      buttons.forEach(b => b.classList.remove("active"));
      const target = e.currentTarget;
      target.classList.add("active");

      if (badge && target.dataset.badge) badge.textContent = target.dataset.badge;
      if (title && target.dataset.title) title.textContent = target.dataset.title;
      if (deck && target.dataset.deck) deck.textContent = target.dataset.deck;
      if (img && target.dataset.img) img.src = target.dataset.img;
    });
  });
})();

// 3. GESTIONE CARD CAPITOLI SLIDER (CARD 3)
(function() {
  const track = document.getElementById("ccrProseTrack");
  const indexEl = document.getElementById("ccrIndex");
  const tabs = document.querySelectorAll(".ccr-tab");
  const slides = document.querySelectorAll(".ccr-slide");
  const total = slides.length || 3;
  let current = 0;

  function vaiAStep(step) {
    current = step;
    if (track) track.style.transform = "translateX(-" + (current * 100) + "%)";
    if (indexEl) indexEl.textContent = "0" + (current + 1) + " / 0" + total;
    tabs.forEach((t, i) => t.classList.toggle("active", i === current));
  }

  const prev = document.getElementById("ccrPrev");
  const next = document.getElementById("ccrNext");
  if (prev) prev.addEventListener("click", () => vaiAStep(current === 0 ? total - 1 : current - 1));
  if (next) next.addEventListener("click", () => vaiAStep(current === total - 1 ? 0 : current + 1));

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      vaiAStep(parseInt(e.currentTarget.getAttribute("data-step") || "0"));
    });
  });
})();

// 4. GESTIONE CARD VISUAL STORY SLIDER FOTO (CARD 4)
(function() {
  const track = document.getElementById("cvsTrack");
  const counter = document.getElementById("cvsCounter");
  const dots = document.querySelectorAll("#cvsDots .dot");
  const slides = document.querySelectorAll(".cvs-slide");
  const total = slides.length || 3;
  let current = 0;

  function vaiASlide(idx) {
    current = idx;
    if (track) track.style.transform = "translateX(-" + (current * 100) + "%)";
    if (counter) counter.textContent = (current + 1) + " / " + total;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  const prev = document.getElementById("cvsPrev");
  const next = document.getElementById("cvsNext");
  if (prev) prev.addEventListener("click", () => vaiASlide(current === 0 ? total - 1 : current - 1));
  if (next) next.addEventListener("click", () => vaiASlide(current === total - 1 ? 0 : current + 1));

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      vaiASlide(parseInt(e.currentTarget.getAttribute("data-index") || "0"));
    });
  });
})();

// ========================================================
// 5. GESTIONE MODALE SCHEDA LEZIONE (100% VISIBILE E FUNZIONANTE)
// ========================================================
const CONTENUTI_SCHEDE = {
  // 1. INTESTAZIONE IN ALTO (Pulsante 'Apri Modale Lezioni')
  indice: {
    tag: "Indice Generale",
    titolo: "Indice Completo delle Lezioni",
    html: "<p>Contenuto segnaposto per l'indice generale. Inserisci qui l'elenco delle tue lezioni.</p>"
  },

  // 2. CARD 1 (I 4 pulsanti delle regole sul nastro + link in basso)
  card_1: {
    tag: "Card 1 · Generale",
    titolo: "Modale Generale Card 1",
    html: "<p>Contenuto segnaposto generale per la Card 1. Inserisci qui il tuo testo.</p>"
  },
  card_1_1: {
    tag: "Card 1 · Regola 1",
    titolo: "Modale Card 1.1",
    html: "<p>Contenuto segnaposto per la Regola 1.1. Inserisci qui il tuo testo.</p>"
  },
  card_1_2: {
    tag: "Card 1 · Regola 2",
    titolo: "Modale Card 1.2",
    html: "<p>Contenuto segnaposto per la Regola 1.2. Inserisci qui il tuo testo.</p>"
  },
  card_1_3: {
    tag: "Card 1 · Regola 3",
    titolo: "Modale Card 1.3",
    html: "<p>Contenuto segnaposto per la Regola 1.3. Inserisci qui il tuo testo.</p>"
  },
  card_1_4: {
    tag: "Card 1 · Regola 4",
    titolo: "Modale Card 1.4",
    html: "<p>Contenuto segnaposto per la Regola 1.4. Inserisci qui il tuo testo.</p>"
  },

  // 3. MASTERCLASS VIDEO (I 3 box cliccabili sotto al video)
  video_1: {
    tag: "HSK 1",
    titolo: "Vocaboli essenziali",
    html: "<pre>0:00 1. 早餐摊 zǎocān tān · The breakfast stall\\n1:32 2. 超市 chāoshì · At the supermarket\\n2:54 3. 水果店 shuǐguǒ diàn · At the fruit shop\\n3:57 4. 出租车上 zài chūzūchē shang · In the taxi\\n5:17 5. 问路 wèn lù · Asking the way\\n6:32 6. 书店 shūdiàn · At the bookstore\\n8:07 7. 饺子店 jiǎozi diàn · At the dumpling restaurant\\n9:21 8. 别人问路 biérén wèn lù · Someone asks Mike the way\\n10:16 9. 奶茶店 nǎichá diàn · At the milk tea shop\\n11:16 10. 衣服店 yīfu diàn · At the clothing shop\\n12:41 11. 地铁上 dìtiě shang · On the subway\\n13:46 12. 小区门口 xiǎoqū ménkǒu · At the gate\\n14:27 13. 小狗 xiǎo gǒu · The little dog\\n15:18 14. 外卖到了 wàimài dào le · The delivery is here\\n15:49 15. 楼下 lóu xià · Downstairs</pre>"
  },
  video_2: {
    tag: "HSK 3",
    titolo: "Nuove parole",
    html: "<pre>New words that aren\\'t HSK 1 (only 4):\\n豆浆 dòujiāng – soy milk\\n阿姨 āyí – auntie (a friendly way to call an older woman)\\n师傅 shīfu – what you call a taxi driver\\n奶茶 nǎichá – milk tea</pre>"
  },
  video_3: {
    tag: "Script",
    titolo: "Trascrizione video",
    html: "<div class='script-header-bar'><div><span class='script-scene-badge'>Scena 1 · Dialogo</span><div class='script-scene-title'>1 早餐摊 zǎocān tān · The breakfast stall</div></div><div class='script-btn-group'><a href='lezione.pdf' target='_blank' download='lezione-completa.pdf' class='script-pdf-btn' title='Scarica o apri il tuo file PDF completo'>📥 Scarica PDF Completo</a><button type='button' onclick='stampaTrascrizione()' class='script-print-btn' title='Stampa o salva in PDF l&rsquo;anteprima della Scena 1'>🖨️ Stampa Scena 1</button></div></div><div class='dialogue-list'><div class='dialogue-turn speaker-auntie'><div class='speaker-meta'><span class='speaker-name speaker-name-auntie'>阿姨 · Auntie</span><span class='turn-num'>#001</span></div><div class='pinyin-ruby-row'><ruby>早<rt>zǎo</rt></ruby><ruby>上<rt>shang</rt></ruby><ruby>好<rt>hǎo！</rt></ruby> <ruby>你<rt>nǐ</rt></ruby><ruby>要<rt>yào</rt></ruby><ruby>吃<rt>chī</rt></ruby><ruby>什<rt>shén</rt></ruby><ruby>么<rt>me？</rt></ruby></div><div class='english-trans'>&ldquo;Good morning! What would you like?&rdquo;</div></div><div class='dialogue-turn speaker-mike'><div class='speaker-meta'><span class='speaker-name speaker-name-mike'>Mike</span><span class='turn-num'>#002</span></div><div class='pinyin-ruby-row'><ruby>阿<rt>ā</rt></ruby><ruby>姨<rt>yí，</rt></ruby> <ruby>早<rt>zǎo</rt></ruby><ruby>上<rt>shang</rt></ruby><ruby>好<rt>hǎo！</rt></ruby> <ruby>这<rt>zhè</rt></ruby><ruby>是<rt>shì</rt></ruby><ruby>什<rt>shén</rt></ruby><ruby>么<rt>me？</rt></ruby></div><div class='english-trans'>&ldquo;Good morning! What&rsquo;s this?&rdquo;</div><div class='vocab-note'>💡 <strong>Glossario:</strong> 阿姨 āyí = auntie (termine affettuoso e cortese per una donna più anziana)</div></div><div class='dialogue-turn speaker-auntie'><div class='speaker-meta'><span class='speaker-name speaker-name-auntie'>阿姨 · Auntie</span><span class='turn-num'>#003</span></div><div class='pinyin-ruby-row'><ruby>这<rt>zhè</rt></ruby><ruby>是<rt>shì</rt></ruby><ruby>包<rt>bāo</rt></ruby><ruby>子<rt>zi，</rt></ruby> <ruby>很<rt>hěn</rt></ruby><ruby>好<rt>hǎo</rt></ruby><ruby>吃<rt>chī！</rt></ruby></div><div class='english-trans'>&ldquo;These are baozi. They&rsquo;re delicious!&rdquo;</div></div><div class='dialogue-turn speaker-mike'><div class='speaker-meta'><span class='speaker-name speaker-name-mike'>Mike</span><span class='turn-num'>#004</span></div><div class='pinyin-ruby-row'><ruby>包<rt>bāo</rt></ruby><ruby>子<rt>zi</rt></ruby> <ruby>多<rt>duō</rt></ruby><ruby>少<rt>shao</rt></ruby><ruby>钱<rt>qián</rt></ruby> <ruby>一<rt>yí</rt></ruby><ruby>个<rt>ge？</rt></ruby></div><div class='english-trans'>&ldquo;How much is one baozi?&rdquo;</div></div><div class='dialogue-turn speaker-auntie'><div class='speaker-meta'><span class='speaker-name speaker-name-auntie'>阿姨 · Auntie</span><span class='turn-num'>#005</span></div><div class='pinyin-ruby-row'><ruby>两<rt>liǎng</rt></ruby><ruby>块<rt>kuài</rt></ruby><ruby>钱<rt>qián</rt></ruby> <ruby>一<rt>yí</rt></ruby><ruby>个<rt>ge。</rt></ruby></div><div class='english-trans'>&ldquo;Two kuai each.&rdquo;</div></div></div><div class='pdf-footer-note'><span>💡 <strong>Come usare il tuo file PDF originale:</strong> Rinominalo in <code>lezione.pdf</code> e mettilo nella stessa cartella di questo file HTML (oppure inserisci il link da Google Drive o Dropbox): il pulsante in alto scaricher&agrave; direttamente l&rsquo;intero copione originale!</span></div>"
  },

  // 4. CARD 2 (Unico pulsante in fondo alla Card 2)
  card_2: {
    tag: "Card 2",
    titolo: "Modale Card 2",
    html: "<p>Contenuto segnaposto per la Card 2. Inserisci qui il tuo testo.</p>"
  },

  // 5. CARD 3 (Unico pulsante in fondo alla Card 3)
  card_3: {
    tag: "Card 3",
    titolo: "Modale Card 3",
    html: "<p>Contenuto segnaposto per la Card 3. Inserisci qui il tuo testo.</p>"
  },

  // 6. CARD 4 (Unico pulsante in fondo alla Card 4)
  card_4: {
    tag: "Card 4",
    titolo: "Modale Card 4",
    html: "<p>Contenuto segnaposto per la Card 4. Inserisci qui il tuo testo.</p>"
  }
};

function mostraScheda(chiave) {
  chiave = chiave || "indice";
  var raw = String(chiave).trim().toLowerCase();

  // Normalizzazione: trasforma spazi, punti, trattini in underscore
  var norm = raw.replace(/[\.\s\-]+/g, "_");

  // Risoluzione alias video (compresi HSK 1, HKS 1, HSK 3, Script, Vocaboli, Nuove Parole)
  if (norm === "video1" || norm === "video_1" || norm === "video_1_1" || 
      norm === "hsk_1" || norm === "hks_1" || norm === "hsk1" || norm === "hks1" || 
      norm.indexOf("vocaboli") !== -1 || norm.indexOf("essenziali") !== -1) {
    norm = "video_1";
  }
  if (norm === "video2" || norm === "video_2" || norm === "video_1_2" || 
      norm === "hsk_3" || norm === "hks_3" || norm === "hsk3" || norm === "hks3" || 
      norm.indexOf("nuove") !== -1 || norm.indexOf("parole") !== -1) {
    norm = "video_2";
  }
  if (norm === "video3" || norm === "video_3" || norm === "video_1_3" || 
      norm.indexOf("script") !== -1 || norm.indexOf("trascrizione") !== -1) {
    norm = "video_3";
  }

  // Risoluzione alias card generiche
  if (norm === "card1") norm = "card_1";
  if (norm === "card2" || norm === "card_2_1" || norm === "card_2_2" || norm === "card_2_3" || norm === "sistemi" || norm === "casi" || norm === "modi") norm = "card_2";
  if (norm === "card3" || norm === "card_3_1" || norm === "card_3_2" || norm === "card_3_3" || norm === "grammatica" || norm === "verbi" || norm === "subordinate") norm = "card_3";
  if (norm === "card4" || norm === "card_4_1" || norm === "card_4_2" || norm === "card_4_3" || norm === "calligrafia" || norm === "corsivo" || norm === "calligrafia_ita") norm = "card_4";
  if (norm === "regola1" || norm === "regola_1") norm = "video_1";
  if (norm === "regola2" || norm === "regola_2") norm = "video_2";
  if (norm === "regola3" || norm === "regola_3") norm = "video_3";
  if (norm === "regole") norm = "card_1";

  // Ricerca diretta o normalizzata
  var data = CONTENUTI_SCHEDE[norm] || CONTENUTI_SCHEDE[raw] || CONTENUTI_SCHEDE[chiave];

  // Ricerca intelligente per corrispondenza di tag o titolo
  if (!data) {
    for (var k in CONTENUTI_SCHEDE) {
      if (CONTENUTI_SCHEDE.hasOwnProperty(k) && CONTENUTI_SCHEDE[k]) {
        var modTag = String(CONTENUTI_SCHEDE[k].tag || "").toLowerCase().trim();
        var modTit = String(CONTENUTI_SCHEDE[k].titolo || "").toLowerCase().trim();
        if (modTag === raw || modTit === raw || 
            modTag.replace(/[\.\s\-]+/g, "_") === norm || 
            modTit.replace(/[\.\s\-]+/g, "_") === norm) {
          data = CONTENUTI_SCHEDE[k];
          break;
        }
      }
    }
  }

  // Fallback universale se la chiave non esiste
  if (!data) {
    data = {
      tag: "Segnaposto",
      titolo: "Modale " + chiave,
      html: "<p>Contenuto segnaposto per " + chiave + ". Inserisci qui il tuo testo.</p>"
    };
  }

  var modal = document.getElementById("schedaModal");
  var tag = document.getElementById("modalTag");
  var title = document.getElementById("modalTitle");
  var body = document.getElementById("modalBody");
  if (!modal) return;

  if (tag) tag.textContent = data.tag;
  if (title) title.textContent = data.titolo;
  if (body) body.innerHTML = data.html;

  modal.classList.add("open");
}

function chiudiScheda() {
  const modal = document.getElementById("schedaModal");
  if (modal) modal.classList.remove("open");
}

function gestisciClickBackdrop(e) {
  if (e.target && e.target.id === "schedaModal") {
    chiudiScheda();
  }
}

// 6. FUNZIONE DI STAMPA E SALVATAGGIO PDF (100% VISIBILE E IMPAGINATA)
function stampaTrascrizione() {
  var modalBody = document.getElementById("modalBody");
  var modalTitle = document.getElementById("modalTitle");
  var modalTag = document.getElementById("modalTag");

  var title = modalTitle ? modalTitle.textContent.trim() : "Trascrizione Video";
  var tag = modalTag ? modalTag.textContent.trim() : "Scheda Didattica";
  var htmlContent = modalBody ? modalBody.innerHTML : "";

  // 1. Prova ad aprire una finestra di stampa pulita (formato A4 senza interferenze con card o iframes)
  try {
    var printWin = window.open("", "_blank", "width=850,height=950");
    if (printWin) {
      printWin.document.open();
      printWin.document.write("<!DOCTYPE html><html><head><meta charset='utf-8'><title>" + title + " - PDF</title><style>" +
        "@page { size: A4 portrait; margin: 15mm; }" +
        "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif; color: #0f172a; margin: 0; padding: 24px; line-height: 1.6; background: #ffffff; }" +
        ".print-header { border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }" +
        ".print-badge { font-size: 12px; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; }" +
        ".print-title { font-size: 24px; font-weight: 800; margin: 4px 0 0; color: #0f172a; }" +
        ".print-date { font-size: 11px; color: #64748b; }" +
        ".script-pdf-btn, .modal-close-btn, .modal-close-x, .modal-close-cross { display: none !important; }" +
        ".script-header-bar { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; }" +
        ".script-scene-badge { font-size: 11px; font-weight: bold; color: #1e40af; background: #dbeafe; padding: 3px 8px; border-radius: 4px; }" +
        ".script-scene-title { font-size: 16px; font-weight: bold; margin-top: 4px; color: #0f172a; }" +
        ".dialogue-list { display: flex; flex-direction: column; gap: 12px; }" +
        ".dialogue-turn { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; page-break-inside: avoid; break-inside: avoid; }" +
        ".dialogue-turn.speaker-auntie { border-left: 5px solid #d97706; }" +
        ".dialogue-turn.speaker-mike { border-left: 5px solid #2563eb; }" +
        ".speaker-meta { display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 6px; }" +
        ".speaker-name-auntie { color: #d97706; font-size: 12px; }" +
        ".speaker-name-mike { color: #2563eb; font-size: 12px; }" +
        ".pinyin-ruby-row { font-size: 22px; line-height: 2.3; color: #0f172a; margin-bottom: 6px; letter-spacing: 0.04em; }" +
        "ruby { ruby-align: center; margin: 0 2px; }" +
        "rt { font-size: 11px; font-weight: 600; color: #475569; }" +
        ".english-trans { font-size: 14px; color: #475569; font-style: italic; margin-top: 2px; }" +
        ".vocab-note { margin-top: 8px; padding: 8px 12px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; font-size: 12px; color: #92400e; }" +
        ".pdf-footer-note { margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 11px; color: #64748b; text-align: center; }" +
        "</style></head><body>" +
        "<div class='print-header'><div><span class='print-badge'>" + tag + "</span><h1 class='print-title'>" + title + "</h1></div><div class='print-date'>Documento di Studio</div></div>" +
        "<div class='print-content'>" + htmlContent + "</div>" +
        "</body></html>");
      printWin.document.close();
      printWin.focus();
      setTimeout(function() {
        printWin.print();
      }, 350);
      return;
    }
  } catch (err) {
    console.warn("Finestra popup non consentita, avvio print sulla pagina:", err);
  }

  // 2. Fallback diretto se popup è disattivato: la regola @media print sulla pagina è immune al foglio bianco
  window.print();
}

// Esporta globalmente su window per chiamata diretta da pulsanti o da LivePreview
window.mostraScheda = mostraScheda;
window.chiudiScheda = chiudiScheda;
window.stampaTrascrizione = stampaTrascrizione;

// Ascolta messaggi dall'esterno dell'iframe
window.addEventListener("message", (e) => {
  if (e.data && e.data.action === "openModal") {
    mostraScheda(e.data.key);
  } else if (e.data && e.data.action === "closeModal") {
    chiudiScheda();
  }
});

// Chiusura con tasto Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    chiudiScheda();
  }
});
`;

export const LANGUAGE_TEMPLATES: Record<string, LanguageTemplate> = {
  orientali: {
    id: 'orientali',
    name: 'Lingue Orientali (Giapponese)',
    flag: '🇯🇵',
    langTitle: 'Giapponese · Scrittura Kanji & Calligrafia',
    langSubtitle: 'Ordine dei tratti (Kakijun), radicali e particelle fondamentali',
    html: ORIENTALI_HTML,
    css: ROBUST_CSS,
    js: ROBUST_JS,
  },
  slave: {
    id: 'slave',
    name: 'Lingue Slave (Russo)',
    flag: '🇷🇺',
    langTitle: 'Russo · Alfabeto Cirillico & Declinazioni',
    langSubtitle: 'I 6 casi, verbi di moto e fonetica vocalica',
    html: SLAVE_HTML,
    css: ROBUST_CSS,
    js: ROBUST_JS,
  },
  occidentali: {
    id: 'occidentali',
    name: 'Lingue Occidentali (Italiano)',
    flag: '🇮🇹',
    langTitle: 'Italiano · Sintassi & Congiuntivo',
    langSubtitle: 'Modi verbali, periodo ipotetico e subordinazione',
    html: OCCIDENTALI_HTML,
    css: ROBUST_CSS,
    js: ROBUST_JS,
  },
};

/**
 * Auto-sanitizzazione intelligente del codice JavaScript:
 * Converte automaticamente stringhe html multiriga tra virgolette normali (" o ')
 * in template literals validi con backticks, evitando errori di sintassi JS che bloccano l'esecuzione.
 */
export function sanitizeJsStringLiterals(rawJs: string): string {
  if (!rawJs) return "";
  return rawJs.replace(/(html:\s*)(["'])([\s\S]*?)\2(?=\s*[,}\n\r])/g, (match, prefix, _quote, inner) => {
    if (inner.includes('\n')) {
      return `${prefix}\`${inner.replace(/`/g, '\\`')}\``;
    }
    return match;
  });
}

/**
 * Funzione per generare il file unico HTML pronto per il download
 */
export function buildSingleFileHtml(html: string, css: string, js: string): string {
  const safeJs = sanitizeJsStringLiterals(js);
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portale di Apprendimento Linguistico</title>
  <!-- GOOGLE FONTS PRECONNECT & COMPATIBILITÀ OFFLINE/ONLINE -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
${css}
  </style>
</head>
<body>

${html}

<script>
${safeJs}
</script>
</body>
</html>`;
}
