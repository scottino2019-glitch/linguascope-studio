import React from 'react';
import { Type, Video, Sliders, Layers, Sparkles } from 'lucide-react';

interface QuickEditPanelProps {
  html: string;
  setHtml: (val: string) => void;
  css: string;
  setCss: (val: string) => void;
  js: string;
  setJs: (val: string) => void;
}

export const QuickEditPanel: React.FC<QuickEditPanelProps> = ({
  html,
  setHtml,
  js,
  setJs,
}) => {
  // Extract key fields from current HTML safely
  const getHeaderTitle = () => {
    const m = html.match(/<h1 class="header-title">([\s\S]*?)<\/h1>/);
    return m ? m[1].trim() : '';
  };

  const getVideoHeading = () => {
    const m = html.match(/<h2 class="video-heading">([\s\S]*?)<\/h2>/);
    return m ? m[1].trim() : '';
  };

  const getVideoDesc = () => {
    const m = html.match(/<p class="video-desc">([\s\S]*?)<\/p>/);
    return m ? m[1].trim() : '';
  };

  const getVideoUrl = () => {
    const iframeMatch = html.match(/<iframe[^>]*src="([^"]+)"/);
    if (iframeMatch && iframeMatch[1]) {
      const ytMatch = iframeMatch[1].match(/embed\/([\w-]{11})/);
      if (ytMatch) return `https://www.youtube.com/watch?v=${ytMatch[1]}`;
      return iframeMatch[1];
    }
    return '';
  };

  const handleUpdateVideoUrl = (rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) return;

    let embedUrl = trimmed;
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
    }

    setHtml(html.replace(/(<iframe[^>]*src=")[^"]+(")/, `$1${embedUrl}$2`));
  };

  const getMarqueeItems = () => {
    const m = html.match(/<div class="crm-text-slider" id="crmTextSlider">([\s\S]*?)<\/div>/);
    if (!m) return [];
    const spanMatches = Array.from(m[1].matchAll(/<span>([\s\S]*?)<\/span>/g));
    // Unique items
    const texts = spanMatches.map(sm => sm[1].trim());
    return Array.from(new Set(texts)).filter(t => t.length > 0);
  };

  const handleUpdateHeaderTitle = (newVal: string) => {
    setHtml(html.replace(/<h1 class="header-title">[\s\S]*?<\/h1>/, `<h1 class="header-title">${newVal}</h1>`));
  };

  const handleUpdateVideoHeading = (newVal: string) => {
    setHtml(html.replace(/<h2 class="video-heading">[\s\S]*?<\/h2>/, `<h2 class="video-heading">${newVal}</h2>`));
  };

  const handleUpdateVideoDesc = (newVal: string) => {
    setHtml(html.replace(/<p class="video-desc">[\s\S]*?<\/p>/, `<p class="video-desc">${newVal}</p>`));
  };

  const handleUpdateMarqueeItem = (idx: number, newVal: string) => {
    const items = getMarqueeItems();
    if (idx < items.length) {
      items[idx] = newVal;
      const joined = items.map(it => `<span>${it}</span>`).join('\n                <span class="sep">✦</span>\n                ');
      const duplicated = joined + '\n                <span class="sep">✦</span>\n                ' + joined;
      setHtml(html.replace(
        /<div class="crm-text-slider" id="crmTextSlider">[\s\S]*?<\/div>/,
        `<div class="crm-text-slider" id="crmTextSlider">\n                ${duplicated}\n              </div>`
      ));
    }
  };

  const getPdfLink = () => {
    const m = js.match(/class=['"]script-pdf-btn['"][^>]*href=['"]([^'"]+)['"]/);
    if (m && m[1]) return m[1];
    const m2 = js.match(/href=['"]([^'"]+)['"][^>]*class=['"]script-pdf-btn['"]/);
    if (m2 && m2[1]) return m2[1];
    return 'lezione.pdf';
  };

  const handleUpdatePdfLink = (newVal: string) => {
    const trimmed = newVal.trim() || 'lezione.pdf';
    setJs(
      js.replace(/(href=['"])[^'"]+(['"][^>]*class=['"]script-pdf-btn['"])/, `$1${trimmed}$2`)
        .replace(/(class=['"]script-pdf-btn['"][^>]*href=['"])[^'"]+(['"])/, `$1${trimmed}$2`)
    );
  };

  const marqueeItems = getMarqueeItems();

  return (
    <div className="flex flex-col h-full bg-[#181d28] text-slate-100 p-5 overflow-y-auto">
      <div className="bg-blue-950/60 border border-blue-800/80 rounded-2xl p-4 mb-5 text-xs text-blue-200">
        <div className="flex items-center gap-2 font-bold text-sm text-blue-100 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Modifica Semplificata (Nessun rischio di rompere il codice!)</span>
        </div>
        <p className="text-blue-300">
          Modifica questi campi con i tuoi testi: aggiornano l'HTML e l'anteprima in tempo reale senza dover toccare tag o virgole delicate.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl text-xs">
        {/* TITOLO DEL PORTALE */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-3">
            <Type className="w-4 h-4 text-blue-400" />
            <span>Titolo del Portale Didattico</span>
          </div>
          <input
            type="text"
            value={getHeaderTitle()}
            onChange={(e) => handleUpdateHeaderTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* TITOLO E DESCRIZIONE VIDEO */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-3">
            <Video className="w-4 h-4 text-emerald-400" />
            <span>Video in Primo Piano</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">
                Link Video YouTube:
              </label>
              <input
                type="text"
                placeholder="es. https://www.youtube.com/watch?v=... o https://youtu.be/..."
                defaultValue={getVideoUrl()}
                onBlur={(e) => handleUpdateVideoUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdateVideoUrl((e.target as HTMLInputElement).value);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono outline-none focus:border-emerald-500 text-xs"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                💡 Incolla il normale link del video di YouTube e premi <strong>Invio</strong>.
              </p>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">Titolo Video:</label>
              <input
                type="text"
                value={getVideoHeading()}
                onChange={(e) => handleUpdateVideoHeading(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">Descrizione:</label>
              <textarea
                rows={2}
                value={getVideoDesc()}
                onChange={(e) => handleUpdateVideoDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* REGOLE CARD A NASTRO SCORREVOLE */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-3">
            <Sliders className="w-4 h-4 text-rose-400" />
            <span>Card 1: Testi del Nastro a Scorrimento</span>
          </div>
          <div className="space-y-2.5">
            {marqueeItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateMarqueeItem(idx, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-rose-500 text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PERSONALIZZAZIONE MODALI (MODULARI CARD 1.1, CARD 1.2, VIDEO 1.1, ECC.) */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>📖 Modali Modulari (Card 1.1, Card 1.2, Video 1.1, Card 2, ecc.)</span>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            I modali sono organizzati in modo rigoroso e neutrale senza divisioni per lingua. Inserisci qui i titoli o modificali nel codice JavaScript in <code className="text-amber-400">CONTENUTI_SCHEDE</code>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">Modale Video 1 (HSK 1)</label>
              <input
                type="text"
                placeholder="Titolo Video 1"
                defaultValue="Vocaboli essenziali"
                onChange={(e) => {
                  setJs(js.replace(/(video_1:\s*\{[\s\S]*?titolo:\s*)"[^"]+"/, `$1"${e.target.value}"`));
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-amber-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">Modale Video 2 (HSK 3)</label>
              <input
                type="text"
                placeholder="Titolo Video 2"
                defaultValue="Nuove parole"
                onChange={(e) => {
                  setJs(js.replace(/(video_2:\s*\{[\s\S]*?titolo:\s*)"[^"]+"/, `$1"${e.target.value}"`));
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-amber-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">Modale Card 1.1</label>
              <input
                type="text"
                placeholder="Titolo Card 1.1"
                defaultValue="Modale Card 1.1"
                onChange={(e) => {
                  setJs(js.replace(/(card_1_1:\s*\{[\s\S]*?titolo:\s*)"[^"]+"/, `$1"${e.target.value}"`));
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-amber-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold text-xs">Modale Card 1.2</label>
              <input
                type="text"
                placeholder="Titolo Card 1.2"
                defaultValue="Modale Card 1.2"
                onChange={(e) => {
                  setJs(js.replace(/(card_1_2:\s*\{[\s\S]*?titolo:\s*)"[^"]+"/, `$1"${e.target.value}"`));
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-amber-500 text-xs"
              />
            </div>
            <div className="col-span-full bg-slate-950 p-3 rounded-xl border border-slate-800 mt-2">
              <label className="block text-slate-300 mb-1 font-bold text-xs">
                📄 File o Link del tuo PDF Completo (per il tasto &quot;Scarica PDF Completo&quot;):
              </label>
              <input
                type="text"
                placeholder="es. lezione.pdf oppure https://drive.google.com/..."
                defaultValue={getPdfLink()}
                onChange={(e) => handleUpdatePdfLink(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono outline-none focus:border-amber-500 text-xs"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                💡 Inserisci il nome del file (es. <code className="text-amber-400">lezione.pdf</code> salvato accanto al file HTML) oppure incolla il link di Google Drive o Dropbox per consentire il download del tuo PDF completo!
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs space-y-2">
          <div>
            💡 <strong>Mappa Reale dei Modali (1 a 1 con i pulsanti presenti sul sito):</strong>
            <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Testata in alto:</strong> <code className="text-amber-300">indice</code> (Pulsante &quot;📖 Apri Modale Lezioni&quot;)</li>
              <li><strong>Card 1 (Nastro regole):</strong> <code className="text-amber-300">card_1_1</code>, <code className="text-amber-300">card_1_2</code>, <code className="text-amber-300">card_1_3</code>, <code className="text-amber-300">card_1_4</code> (e link <code className="text-amber-300">card_1</code> in basso)</li>
              <li><strong>Video Centrale:</strong> <code className="text-amber-300">video_1</code>, <code className="text-amber-300">video_2</code>, <code className="text-amber-300">video_3</code> (I 3 riquadri didattici sotto al video)</li>
              <li><strong>Card 2:</strong> <code className="text-amber-300">card_2</code> (Il pulsante in fondo alla Card 2)</li>
              <li><strong>Card 3:</strong> <code className="text-amber-300">card_3</code> (Il pulsante in fondo alla Card 3)</li>
              <li><strong>Card 4:</strong> <code className="text-amber-300">card_4</code> (Il pulsante in fondo alla Card 4)</li>
            </ul>
          </div>
          <div className="border-t border-slate-800 pt-2 text-emerald-400">
            🔤 <strong>Controllo Totale Google Fonts:</strong> Usa la scheda <strong>&quot;🔤 Google Fonts&quot;</strong> in alto o il pulsante nella testata per caricare e applicare qualsiasi carattere tipografico per qualsiasi lingua del mondo!
          </div>
        </div>
      </div>
    </div>
  );
};
