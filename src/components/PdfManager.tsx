import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  FileText, 
  Check, 
  Trash2, 
  Download, 
  Link, 
  Info, 
  AlertCircle,
  Copy,
  PlusCircle,
  Code2,
  Sparkles
} from 'lucide-react';

interface PdfManagerProps {
  js: string;
  setJs: (val: string) => void;
}

const MODAL_TARGETS = [
  { id: 'card_1_1', name: 'Card 1.1 (Regola 1)' },
  { id: 'card_1_2', name: 'Card 1.2 (Regola 2)' },
  { id: 'card_1_3', name: 'Card 1.3 (Regola 3)' },
  { id: 'card_1_4', name: 'Card 1.4 (Regola 4)' },
  { id: 'card_2', name: 'Card 2 (Modale Principale)' },
  { id: 'card_3', name: 'Card 3 (Modale Principale)' },
  { id: 'card_4', name: 'Card 4 (Modale Principale)' },
  { id: 'video_1', name: 'Video 1 (Vocaboli Essenziali)' },
  { id: 'video_2', name: 'Video 2 (Nuove Parole)' },
  { id: 'video_3', name: 'Video 3 (Trascrizione / Script)' },
  { id: 'indice', name: 'Indice Lezioni (Testata)' },
];

export const PdfManager: React.FC<PdfManagerProps> = ({ js, setJs }) => {
  const [dragOver, setDragOver] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stato per il generatore di bottoni nei modali
  const [buttonLabel, setButtonLabel] = useState('📥 Scarica PDF di Lavoro');
  const [buttonUrl, setButtonUrl] = useState('https://tuosito.com/scheda-lavoro.pdf');
  const [buttonDesc, setButtonDesc] = useState('Foglio di esercizi e regole da stampare o compilare');
  const [buttonBoxStyle, setButtonBoxStyle] = useState<'box' | 'button'>('box');
  const [buttonColor, setButtonColor] = useState<'blue' | 'emerald' | 'amber' | 'outline'>('blue');
  const [selectedModal, setSelectedModal] = useState('card_1_1');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Estrai stato attuale del PDF dal JavaScript
  const pdfDataMatch = js.match(/var\s+PDF_DATA\s*=\s*(["'])([\s\S]*?)\1/);
  const pdfNameMatch = js.match(/var\s+PDF_NOME_FILE\s*=\s*(["'])([\s\S]*?)\1/);

  const currentPdfData = pdfDataMatch ? pdfDataMatch[2].trim() : '';
  const currentPdfName = pdfNameMatch ? pdfNameMatch[2].trim() : 'lezione-completa.pdf';

  const isBase64 = currentPdfData.startsWith('data:application/pdf');
  const isWebUrl = currentPdfData.startsWith('http://') || currentPdfData.startsWith('https://');
  const hasPdf = currentPdfData.length > 0 && currentPdfData !== 'lezione.pdf';

  // Calcola dimensione stimata se base64
  const estimatedSizeKb = isBase64 
    ? Math.round((currentPdfData.length * 0.75) / 1024) 
    : null;

  // Inietta o aggiorna le variabili nel codice JS
  const updatePdfInJs = (newData: string, newName: string) => {
    let updatedJs = js;

    if (!updatedJs.includes('var PDF_DATA')) {
      const headerCode = `// ========================================================\n// GESTIONE PDF DELLA LEZIONE (INCORPORATO NEL FILE UNICO)\n// ========================================================\nvar PDF_DATA = "${newData}";\nvar PDF_NOME_FILE = "${newName}";\n\n`;
      updatedJs = headerCode + updatedJs;
    } else {
      updatedJs = updatedJs.replace(
        /var\s+PDF_DATA\s*=\s*(["'])[\s\S]*?\1/,
        `var PDF_DATA = "${newData}"`
      );
      if (updatedJs.includes('var PDF_NOME_FILE')) {
        updatedJs = updatedJs.replace(
          /var\s+PDF_NOME_FILE\s*=\s*(["'])[\s\S]*?\1/,
          `var PDF_NOME_FILE = "${newName}"`
        );
      }
    }

    if (!updatedJs.includes('function scaricaPdfLezione')) {
      const funcCode = `\nfunction scaricaPdfLezione(e) {\n  if (e && e.preventDefault) e.preventDefault();\n  if (typeof PDF_DATA === "string" && PDF_DATA.trim().length > 0) {\n    var a = document.createElement("a");\n    a.href = PDF_DATA;\n    a.download = (typeof PDF_NOME_FILE === "string" && PDF_NOME_FILE.trim()) ? PDF_NOME_FILE : "lezione-completa.pdf";\n    if (PDF_DATA.indexOf("http") === 0) a.target = "_blank";\n    document.body.appendChild(a);\n    a.click();\n    document.body.removeChild(a);\n  } else {\n    stampaTrascrizione();\n  }\n}\nwindow.scaricaPdfLezione = scaricaPdfLezione;\n`;
      updatedJs += funcCode;
    }

    setJs(updatedJs);
  };

  const handleFileProcess = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setFeedback('Errore: Seleziona un file con estensione .pdf valido.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setFeedback('Attenzione: Il file PDF supera i 25MB. Per file molto grandi è consigliabile incollare un link Google Drive o Dropbox.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        updatePdfInJs(base64, file.name);
        setFeedback(`File "${file.name}" (${Math.round(file.size / 1024)} KB) incorporato con successo!`);
        setTimeout(() => setFeedback(null), 4000);
      }
    };
    reader.onerror = () => {
      setFeedback('Errore durante la lettura del file PDF.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    updatePdfInJs(trimmed, 'lezione-completa.pdf');
    setUrlInput('');
    setFeedback('Link PDF web collegato con successo!');
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleRemovePdf = () => {
    updatePdfInJs('', 'lezione-completa.pdf');
    setFeedback('PDF rimosso. Il pulsante userà la stampa/salvataggio predefinita.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleTestDownload = () => {
    if (!hasPdf) return;
    const a = document.createElement('a');
    a.href = currentPdfData;
    a.download = currentPdfName;
    if (isWebUrl) a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Costruisci snippet HTML per il bottone/box nel modale
  const colorClass = buttonColor === 'emerald' 
    ? 'modal-download-btn modal-download-btn-emerald' 
    : buttonColor === 'amber'
    ? 'modal-download-btn modal-download-btn-amber'
    : buttonColor === 'outline'
    ? 'modal-download-btn modal-download-btn-outline'
    : 'modal-download-btn';

  const generatedHtmlSnippet = buttonBoxStyle === 'box'
    ? `<div class="modal-download-box">\n  <div class="modal-download-info">\n    <span class="modal-download-title">${buttonLabel}</span>\n    <span class="modal-download-desc">${buttonDesc}</span>\n  </div>\n  <a href="${buttonUrl}" target="_blank" class="${colorClass}">\n    Scarica PDF\n  </a>\n</div>`
    : `<a href="${buttonUrl}" target="_blank" class="${colorClass}">\n  ${buttonLabel}\n</a>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(generatedHtmlSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  // Inserisci automaticamente il bottone HTML nel modale selezionato in CONTENUTI_SCHEDE
  const handleInsertIntoModal = () => {
    const regex = new RegExp(`(${selectedModal}:\\s*\\{[\\s\\S]*?html:\\s*)(["'\`])([\\s\\S]*?)\\2`);
    const match = js.match(regex);
    if (!match) {
      setFeedback(`Errore: Impossibile trovare la chiave ${selectedModal} nel JavaScript.`);
      return;
    }

    const currentHtml = match[3];
    // Aggiungi il nuovo bottone prima della chiusura se non è già presente
    const snippetToAdd = `\\n${generatedHtmlSnippet.replace(/\n/g, '\\n').replace(/"/g, '\\"')}`;
    const newHtml = currentHtml + snippetToAdd;

    const updatedJs = js.replace(regex, `$1$2${newHtml}$2`);
    setJs(updatedJs);

    setFeedback(`Pulsante inserito con successo nel modale "${selectedModal}"!`);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#181d28] text-slate-100 p-6 overflow-y-auto select-text">
      
      {/* BANNER INFORMATIVO E RISOLUTIVO */}
      <div className="bg-gradient-to-r from-emerald-950/70 to-blue-950/70 border border-emerald-700/60 rounded-2xl p-4 mb-6 text-xs text-emerald-200">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-100 mb-1">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Gestore PDF Standalone & Materiali di Lavoro nei Modali</span>
        </div>
        <p className="text-emerald-300 leading-relaxed">
          Puoi incorporare il tuo PDF principale direttamente nell&apos;HTML unico (senza bisogno di creare cartelle esterne sul computer), 
          oppure <strong>aggiungere pulsanti di download personalizzati all&apos;interno di qualsiasi modale</strong> per schede di lavoro, esercizi o link a Google Drive/Dropbox.
        </p>
      </div>

      {feedback && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* SEZIONE 1: PDF PRINCIPALE (INCORPORATO SENZA CARTELLE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mb-8">
        
        {/* CARICAMENTO FILE PDF DIRETTO */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-3">
              <FileUp className="w-4 h-4 text-emerald-400" />
              <span>1. PDF Principale della Lezione (Incorporato nel file HTML)</span>
            </div>

            {/* AREA DRAG & DROP */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                dragOver 
                  ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01]' 
                  : 'border-slate-700 bg-slate-950 hover:border-emerald-500 hover:bg-slate-950/70'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">
                  Trascina qui il tuo file PDF
                </p>
                <p className="text-xs text-slate-400">
                  oppure fai clic per sfogliare i file del tuo computer
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black transition-colors">
                📂 Scegli File PDF
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Oppure collega un link web per il PDF principale:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="es. https://drive.google.com/file/d/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleApplyUrl(); }}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Collega
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STATO ATTUALE DEL PDF & TEST */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Stato del PDF Principale</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                hasPdf 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {hasPdf ? '✓ PDF Incorporato' : 'Nessun PDF Personalizzato'}
              </span>
            </div>

            {hasPdf ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold">Nome File:</span>
                      <span className="text-white font-mono font-bold text-sm break-all">{currentPdfName}</span>
                    </div>
                    {isBase64 && estimatedSizeKb && (
                      <span className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 font-mono text-[10px]">
                        ~{estimatedSizeKb} KB
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-semibold">Tipo di Collegamento:</span>
                    <span className="text-emerald-400 font-medium">
                      {isBase64 ? '📦 Incorporato direttamente nel file HTML (Standalone, 100% Offline)' : '🌐 Link Web Esterno'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleTestDownload}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Verifica / Scarica PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemovePdf}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold transition-colors"
                    title="Rimuovi questo PDF e torna alla modalità predefinita"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Rimuovi</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Attualmente nessun file PDF personalizzato è allegato. 
                  Nel sito, il pulsante <strong>&quot;🖨️ Stampa Scena 1&quot;</strong> e <strong>&quot;📥 Scarica PDF Completo&quot;</strong> generano la scheda stampabile della trascrizione.
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-[11px] text-amber-300 text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    Non serve creare cartelle: quando carichi un file, viene memorizzato direttamente dentro l&apos;HTML scaricato.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SEZIONE 2: GENERATORE DI BOTTONI DOWNLOAD PER ALTRI PDF DI LAVORO NEI MODALI */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-5xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-base">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Come Inserire Pulsanti per Altri PDF di Lavoro nei Modali</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Vuoi aggiungere schede di esercizi, fogli di grammatica o PDF di approfondimento dentro le schede/modali del sito? 
              Configura qui sotto il bottone e inseriscilo direttamente con 1 clic nel modale desiderato!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CONFIGURAZIONE BOTTONE */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                1. Scegli in Quale Modale Inserire il Bottone:
              </label>
              <select
                value={selectedModal}
                onChange={(e) => setSelectedModal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold outline-none focus:border-amber-500"
              >
                {MODAL_TARGETS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                2. Testo / Titolo del Download:
              </label>
              <input
                type="text"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
                placeholder="es. 📥 Scarica Scheda Esercizi (PDF)"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                3. Link del tuo File PDF (Google Drive / Dropbox / Web):
              </label>
              <input
                type="text"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                placeholder="es. https://drive.google.com/... oppure https://tuosito.com/file.pdf"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                💡 Se usi Google Drive, assicurati che la condivisione sia impostata su &quot;Chiunque abbia il link&quot;.
              </span>
            </div>

            {buttonBoxStyle === 'box' && (
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Descrizione Aggiuntiva (Opzionale):
                </label>
                <input
                  type="text"
                  value={buttonDesc}
                  onChange={(e) => setButtonDesc(e.target.value)}
                  placeholder="es. Esercizi pratici per la lezione 1"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-500"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Formato:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setButtonBoxStyle('box')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      buttonBoxStyle === 'box' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Riquadro
                  </button>
                  <button
                    type="button"
                    onClick={() => setButtonBoxStyle('button')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-colors ${
                      buttonBoxStyle === 'button' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Solo Bottone
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Colore:</label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setButtonColor('blue')}
                    className={`w-7 h-7 rounded-lg bg-blue-600 border ${buttonColor === 'blue' ? 'border-white ring-2 ring-blue-400' : 'border-transparent'}`}
                    title="Blu"
                  />
                  <button
                    type="button"
                    onClick={() => setButtonColor('emerald')}
                    className={`w-7 h-7 rounded-lg bg-emerald-600 border ${buttonColor === 'emerald' ? 'border-white ring-2 ring-emerald-400' : 'border-transparent'}`}
                    title="Verde"
                  />
                  <button
                    type="button"
                    onClick={() => setButtonColor('amber')}
                    className={`w-7 h-7 rounded-lg bg-amber-600 border ${buttonColor === 'amber' ? 'border-white ring-2 ring-amber-400' : 'border-transparent'}`}
                    title="Ambra"
                  />
                  <button
                    type="button"
                    onClick={() => setButtonColor('outline')}
                    className={`w-7 h-7 rounded-lg bg-white border ${buttonColor === 'outline' ? 'border-blue-500 ring-2 ring-white' : 'border-slate-300'}`}
                    title="Outline"
                  />
                </div>
              </div>
            </div>

            {/* AZIONI RAPIDE */}
            <div className="flex items-center gap-2 pt-3">
              <button
                type="button"
                onClick={handleInsertIntoModal}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Inserisci nel Modale Selezionato</span>
              </button>

              <button
                type="button"
                onClick={handleCopySnippet}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                title="Copia il codice HTML per incollarlo dove vuoi"
              >
                {copiedSnippet ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSnippet ? 'Copiato!' : 'Copia HTML'}</span>
              </button>
            </div>
          </div>

          {/* ANTEPRIMA VISIVA E CODICE DA COPIARE */}
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                Anteprima del Pulsante nel Modale:
              </span>
              <div className="p-4 bg-white rounded-xl shadow-inner text-slate-900">
                {buttonBoxStyle === 'box' ? (
                  <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex-wrap">
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{buttonLabel}</div>
                      <div className="text-[11px] text-slate-500">{buttonDesc}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs ${
                      buttonColor === 'emerald' ? 'bg-emerald-600' :
                      buttonColor === 'amber' ? 'bg-amber-600' :
                      buttonColor === 'outline' ? 'bg-white text-blue-600 border border-blue-600' :
                      'bg-blue-600'
                    }`}>
                      Scarica PDF
                    </span>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm ${
                      buttonColor === 'emerald' ? 'bg-emerald-600' :
                      buttonColor === 'amber' ? 'bg-amber-600' :
                      buttonColor === 'outline' ? 'bg-white text-blue-600 border border-blue-600' :
                      'bg-blue-600'
                    }`}>
                      {buttonLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CODICE HTML GENERATO */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Codice HTML pronto (da incollare nel codice JS):</span>
                </span>
              </div>
              <pre className="p-3 bg-slate-900 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap break-all border border-slate-800">
                {generatedHtmlSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* GUIDA RAPIDA AL CODICE */}
        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="font-bold text-slate-300">
            📖 Come funziona nel codice sorgente:
          </div>
          <p className="leading-relaxed">
            I contenuti dei modali si trovano nella scheda <strong>&quot;3. JavaScript&quot;</strong> all&apos;interno dell&apos;oggetto 
            <code className="text-amber-400 mx-1">CONTENUTI_SCHEDE</code>.
            Ogni scheda (es. <code className="text-blue-300">card_1_1</code>, <code className="text-blue-300">card_2</code>, <code className="text-blue-300">video_1</code>) ha un campo <code className="text-emerald-400">html: &quot;...&quot;</code> in cui puoi incollare il tag sopra.
            Grazie alla classe CSS <code className="text-amber-300">modal-download-btn</code> già presente nel tuo foglio di stile, il pulsante sarà sempre perfettamente allineato, colorato e responsive.
          </p>
        </div>
      </div>

    </div>
  );
};
