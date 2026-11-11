import React, { useState, useRef } from 'react';
import { FileUp, FileText, Check, Trash2, ExternalLink, Download, Link, Info, AlertCircle } from 'lucide-react';

interface PdfManagerProps {
  js: string;
  setJs: (val: string) => void;
}

export const PdfManager: React.FC<PdfManagerProps> = ({ js, setJs }) => {
  const [dragOver, setDragOver] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Se le variabili non esistono nel JS, inseriscile in cima
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

    // Assicurati che esista la funzione scaricaPdfLezione
    if (!updatedJs.includes('function scaricaPdfLezione')) {
      const funcCode = `\nfunction scaricaPdfLezione(e) {\n  if (e && e.preventDefault) e.preventDefault();\n  if (typeof PDF_DATA === "string" && PDF_DATA.trim().length > 0) {\n    var a = document.createElement("a");\n    a.href = PDF_DATA;\n    a.download = (typeof PDF_NOME_FILE === "string" && PDF_NOME_FILE.trim()) ? PDF_NOME_FILE : "lezione-completa.pdf";\n    if (PDF_DATA.indexOf("http") === 0) a.target = "_blank";\n    document.body.appendChild(a);\n    a.click();\n    document.body.removeChild(a);\n  } else {\n    stampaTrascrizione();\n  }\n}\nwindow.scaricaPdfLezione = scaricaPdfLezione;\n`;
      updatedJs += funcCode;
    }

    setJs(updatedJs);
  };

  // Gestione caricamento file PDF dal computer
  const handleFileProcess = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setFeedback('Errore: Seleziona un file con estensione .pdf valido.');
      return;
    }

    // Limite ragionevole per incorporamento in file singolo
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

  // Gestione link esterno (es. Google Drive / Dropbox)
  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    updatePdfInJs(trimmed, 'lezione-completa.pdf');
    setUrlInput('');
    setFeedback('Link PDF web collegato con successo!');
    setTimeout(() => setFeedback(null), 4000);
  };

  // Rimozione del PDF
  const handleRemovePdf = () => {
    updatePdfInJs('', 'lezione-completa.pdf');
    setFeedback('PDF rimosso. Il pulsante userà la stampa/salvataggio predefinita.');
    setTimeout(() => setFeedback(null), 3000);
  };

  // Test download
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

  return (
    <div className="flex flex-col h-full bg-[#181d28] text-slate-100 p-6 overflow-y-auto select-text">
      
      {/* BANNER INFORMATIVO E RISOLUTIVO */}
      <div className="bg-gradient-to-r from-emerald-950/70 to-blue-950/70 border border-emerald-700/60 rounded-2xl p-4 mb-6 text-xs text-emerald-200">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-100 mb-1">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Gestore PDF Standalone (Nessuna cartella richiesta!)</span>
        </div>
        <p className="text-emerald-300 leading-relaxed">
          Non serve creare nessuna cartella esterna (&quot;pagina studio&quot;) o spostare file manualmente. 
          Quando carichi il tuo PDF qui sotto, viene <strong>incorporato direttamente all&apos;interno del file HTML unico</strong>. 
          Funzionerà ovunque: sul tuo computer, inviato via email, su chiavetta USB o caricato su qualsiasi hosting web.
        </p>
      </div>

      {feedback && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        
        {/* COLONNA 1: CARICAMENTO FILE PDF DIRETTO */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-3">
              <FileUp className="w-4 h-4 text-emerald-400" />
              <span>1. Carica il tuo File PDF dal Computer</span>
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
          </div>

          {/* OPZIONE 2: LINK ESTERNO (GOOGLE DRIVE / DROPBOX) */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-2">
              <Link className="w-4 h-4 text-blue-400" />
              <span>2. Oppure Incolla un Link Web (Google Drive / Dropbox)</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Se hai già caricato il PDF su Google Drive, Dropbox o sul tuo server, incolla qui il link di condivisione:
            </p>
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
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                Collega Link
              </button>
            </div>
          </div>
        </div>

        {/* COLONNA 2: STATO ATTUALE DEL PDF & TEST */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Stato del PDF nel Progetto</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                hasPdf 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {hasPdf ? '✓ PDF Riconosciuto' : 'Nessun PDF Personalizzato'}
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
              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Attualmente nessun file PDF personalizzato è allegato. 
                  Nel sito, il pulsante <strong>&quot;🖨️ Stampa Scena 1&quot;</strong> e <strong>&quot;📥 Scarica PDF Completo&quot;</strong> genereranno direttamente la scheda impaginata della trascrizione con la funzione di stampa/salvataggio del browser.
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-[11px] text-amber-300 text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    Carica il tuo file PDF a sinistra: verrà riconosciuto all&apos;istante e inserito direttamente nel codice del sito senza dover creare nessuna cartella.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* VANTAGGI E CHIARIMENTI */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2.5">
            <div className="font-bold text-slate-300">
              💡 Come funziona il PDF nel tuo sito esportato:
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
              <li><strong>Zero cartelle o dipendenze:</strong> Il PDF vive dentro il file HTML, nessun rischio che vada perso.</li>
              <li><strong>Tasto &quot;📥 Scarica PDF Completo&quot;:</strong> Quando uno studente ci clicca, si apre o scarica subito il tuo documento originale.</li>
              <li><strong>Tasto &quot;🖨️ Stampa Scena 1&quot;:</strong> Genera un foglio A4 pronto da stampare con vocaboli e dialoghi.</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
