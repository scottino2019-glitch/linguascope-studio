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
  Sparkles,
  FileCode2,
  FileCheck2,
  FolderOpen
} from 'lucide-react';

interface PdfManagerProps {
  js: string;
  setJs: (val: string) => void;
}

const MODAL_TARGETS = [
  { id: 'card_1', name: 'Card 1 (Generale)' },
  { id: 'card_1_1', name: 'Card 1.1 (Regola 1)' },
  { id: 'card_1_2', name: 'Card 1.2 (Regola 2)' },
  { id: 'card_1_3', name: 'Card 1.3 (Regola 3)' },
  { id: 'card_1_4', name: 'Card 1.4 (Regola 4)' },
  { id: 'card_2', name: 'Card 2 (Approfondimento)' },
  { id: 'card_3', name: 'Card 3 (Lettura & Sintassi)' },
  { id: 'card_4', name: 'Card 4 (Calligrafia & Visual)' },
  { id: 'video_3', name: 'Video 3 (Trascrizione / PDF Lezione)' },
  { id: 'video_1', name: 'Video 1 (Vocaboli Essenziali)' },
  { id: 'video_2', name: 'Video 2 (Nuove Parole)' },
  { id: 'indice', name: 'Indice Generale Lezioni' },
];

export const PdfManager: React.FC<PdfManagerProps> = ({ js, setJs }) => {
  const [selectedTarget, setSelectedTarget] = useState('card_1');
  const [dragOver, setDragOver] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stato per il generatore di bottoni nei modali
  const [buttonMode, setButtonMode] = useState<'manager' | 'direct'>('manager');
  const [customDirectPath, setCustomDirectPath] = useState('pdf/scheda_1.pdf');
  const [buttonLabel, setButtonLabel] = useState('📥 Scarica Scheda di Lavoro');
  const [buttonDesc, setButtonDesc] = useState('File di esercizi pronto da scaricare e consultare');
  const [buttonBoxStyle, setButtonBoxStyle] = useState<'box' | 'button'>('box');
  const [buttonColor, setButtonColor] = useState<'blue' | 'emerald' | 'amber' | 'outline'>('blue');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Estrai FILE_MODALI dal codice JavaScript
  const extractFileModali = (): Record<string, { nome: string; data: string; tipo?: string }> => {
    const m = js.match(/var\s+FILE_MODALI\s*=\s*(\{[\s\S]*?\});/);
    if (!m) return {};
    try {
      // Valutazione sicura della mappa di oggetti
      const fn = new Function(`return ${m[1]};`);
      return fn() || {};
    } catch {
      return {};
    }
  };

  const fileModaliMap = extractFileModali();

  // Estrai anche PDF_DATA per video_3
  const legacyPdfMatch = js.match(/var\s+PDF_DATA\s*=\s*(["'])([\s\S]*?)\1/);
  const legacyPdfNameMatch = js.match(/var\s+PDF_NOME_FILE\s*=\s*(["'])([\s\S]*?)\1/);
  const legacyPdfData = legacyPdfMatch ? legacyPdfMatch[2].trim() : '';
  const legacyPdfName = legacyPdfNameMatch ? legacyPdfNameMatch[2].trim() : 'lezione-completa.pdf';

  // Se video_3 non è in FILE_MODALI ma c'è in PDF_DATA, mostralo
  if (legacyPdfData && legacyPdfData !== 'lezione.pdf' && !fileModaliMap['video_3']) {
    fileModaliMap['video_3'] = {
      nome: legacyPdfName,
      data: legacyPdfData,
      tipo: 'pdf'
    };
  }

  // Aggiorna la mappa FILE_MODALI nel codice JavaScript
  const updateFileModaliInJs = (newMap: Record<string, { nome: string; data: string; tipo?: string }>) => {
    let updatedJs = js;

    const serialized = JSON.stringify(newMap, null, 2);

    if (updatedJs.includes('var FILE_MODALI =')) {
      updatedJs = updatedJs.replace(
        /var\s+FILE_MODALI\s*=\s*\{[\s\S]*?\};/,
        `var FILE_MODALI = ${serialized};`
      );
    } else {
      const headerCode = `// ========================================================\n// ARCHIVIO FILE E MATERIALI DEI MODALI (PDF & HTML)\n// ========================================================\nvar FILE_MODALI = ${serialized};\n\n`;
      updatedJs = headerCode + updatedJs;
    }

    // Se stiamo aggiornando video_3, sincronizza anche PDF_DATA
    if (newMap['video_3']) {
      if (updatedJs.includes('var PDF_DATA =')) {
        updatedJs = updatedJs.replace(
          /var\s+PDF_DATA\s*=\s*(["'])[\s\S]*?\1/,
          `var PDF_DATA = "${newMap['video_3'].data}"`
        );
        updatedJs = updatedJs.replace(
          /var\s+PDF_NOME_FILE\s*=\s*(["'])[\s\S]*?\1/,
          `var PDF_NOME_FILE = "${newMap['video_3'].nome}"`
        );
      }
    }

    // Assicurati che esista la funzione scaricaFileModale
    if (!updatedJs.includes('function scaricaFileModale')) {
      const funcCode = `\nfunction scaricaFileModale(chiave, nomeDefault) {\n  if (typeof FILE_MODALI === "object" && FILE_MODALI && FILE_MODALI[chiave] && FILE_MODALI[chiave].data) {\n    var f = FILE_MODALI[chiave];\n    var a = document.createElement("a");\n    a.href = f.data;\n    a.download = f.nome || nomeDefault || "materiale.html";\n    if (f.data.indexOf("http") === 0) a.target = "_blank";\n    document.body.appendChild(a);\n    a.click();\n    document.body.removeChild(a);\n    return;\n  }\n  stampaTrascrizione();\n}\nwindow.scaricaFileModale = scaricaFileModale;\n`;
      updatedJs += funcCode;
    }

    setJs(updatedJs);
  };

  // Caricamento file (PDF o HTML o altro)
  const handleFileProcess = (file: File) => {
    const isHtml = file.name.toLowerCase().endsWith('.html') || file.name.toLowerCase().endsWith('.htm') || file.type.includes('html');
    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type.includes('pdf');

    if (!isHtml && !isPdf) {
      setFeedback(`Attenzione: È consigliabile caricare file con estensione .pdf o .html.`);
    }

    if (file.size > 25 * 1024 * 1024) {
      setFeedback('Attenzione: Il file supera i 25MB. Per file molto grandi incolla un link Google Drive o Dropbox.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        const currentMap = extractFileModali();
        currentMap[selectedTarget] = {
          nome: file.name,
          data: base64,
          tipo: isHtml ? 'html' : isPdf ? 'pdf' : 'doc'
        };
        updateFileModaliInJs(currentMap);

        const targetLabel = MODAL_TARGETS.find(m => m.id === selectedTarget)?.name || selectedTarget;
        setFeedback(`File "${file.name}" (${Math.round(file.size / 1024)} KB) incorporato con successo in ${targetLabel}!`);
        setTimeout(() => setFeedback(null), 4500);
      }
    };
    reader.onerror = () => {
      setFeedback('Errore durante la lettura del file dal computer.');
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

  // Aggiungi percorso cartella GitHub (es. pdf/scheda.pdf) o link web
  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    const isHtml = trimmed.toLowerCase().includes('.html') || trimmed.toLowerCase().includes('.htm');
    const isPdf = trimmed.toLowerCase().includes('.pdf');
    
    // Estrai il nome del file (es. da "pdf/lezione_1.pdf" ricava "lezione_1.pdf")
    const cleanPath = trimmed.split('?')[0].split('#')[0];
    const segments = cleanPath.split('/');
    const lastSeg = segments[segments.length - 1];
    const fileName = (lastSeg && (lastSeg.includes('.pdf') || lastSeg.includes('.htm')))
      ? lastSeg
      : (isHtml ? 'scheda-lavoro.html' : isPdf ? 'documento-studio.pdf' : 'materiale-studio.pdf');

    const currentMap = extractFileModali();
    currentMap[selectedTarget] = {
      nome: fileName,
      data: trimmed,
      tipo: isHtml ? 'html' : isPdf ? 'pdf' : 'link'
    };
    updateFileModaliInJs(currentMap);
    setUrlInput('');
    setFeedback(`Collegato "${fileName}" (${trimmed.startsWith('http') ? 'Link Web' : 'Cartella: ' + trimmed}) al modale selezionato!`);
    setTimeout(() => setFeedback(null), 4000);
  };

  // Rimuovi file da un modale specifico
  const handleRemoveFile = (modalId: string) => {
    const currentMap = extractFileModali();
    delete currentMap[modalId];
    updateFileModaliInJs(currentMap);
    setFeedback(`File rimosso da "${modalId}".`);
    setTimeout(() => setFeedback(null), 3000);
  };

  // Test download diretto da memoria
  const handleTestDownloadDirect = (data: string, name: string) => {
    if (!data) return;
    const a = document.createElement('a');
    a.href = data;
    a.download = name || 'file-scaricato';
    if (data.startsWith('http')) a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Snippet per generatore manuale
  const colorClass = buttonColor === 'emerald' 
    ? 'modal-download-btn modal-download-btn-emerald' 
    : buttonColor === 'amber'
    ? 'modal-download-btn modal-download-btn-amber'
    : buttonColor === 'outline'
    ? 'modal-download-btn modal-download-btn-outline'
    : 'modal-download-btn';

  const directPathToUse = customDirectPath.trim() || `pdf/scheda_${selectedTarget}.pdf`;

  const generatedHtmlSnippet = buttonMode === 'direct'
    ? (buttonBoxStyle === 'box'
        ? `<div class="modal-download-box">\n  <div class="modal-download-info">\n    <span class="modal-download-title">${buttonLabel}</span>\n    <span class="modal-download-desc">${buttonDesc}</span>\n  </div>\n  <a href="${directPathToUse}" download class="${colorClass}">\n    Scarica File\n  </a>\n</div>`
        : `<a href="${directPathToUse}" download class="${colorClass}">\n  ${buttonLabel}\n</a>`)
    : (buttonBoxStyle === 'box'
        ? `<div class="modal-download-box">\n  <div class="modal-download-info">\n    <span class="modal-download-title">${buttonLabel}</span>\n    <span class="modal-download-desc">${buttonDesc}</span>\n  </div>\n  <button type="button" onclick="scaricaFileModale('${selectedTarget}', 'materiale.html')" class="${colorClass}">\n    Scarica File\n  </button>\n</div>`
        : `<button type="button" onclick="scaricaFileModale('${selectedTarget}', 'materiale.html')" class="${colorClass}">\n  ${buttonLabel}\n</button>`);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(generatedHtmlSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  // Inserisci o aggiorna direttamente il pulsante nel modale selezionato dentro JavaScript
  const handleInsertIntoModal = () => {
    const singleLineSnippet = buttonMode === 'direct'
      ? (buttonBoxStyle === 'box'
          ? `<div class='modal-download-box'><div class='modal-download-info'><span class='modal-download-title'>${buttonLabel.replace(/'/g, "\\'")}</span><span class='modal-download-desc'>${buttonDesc.replace(/'/g, "\\'")}</span></div><a href='${directPathToUse}' download class='${colorClass}'>Scarica File</a></div>`
          : `<a href='${directPathToUse}' download class='${colorClass}'>${buttonLabel.replace(/'/g, "\\'")}</a>`)
      : (buttonBoxStyle === 'box'
          ? `<div class='modal-download-box'><div class='modal-download-info'><span class='modal-download-title'>${buttonLabel.replace(/'/g, "\\'")}</span><span class='modal-download-desc'>${buttonDesc.replace(/'/g, "\\'")}</span></div><button type='button' onclick=\\"scaricaFileModale('${selectedTarget}', 'materiale.html')\\" class='${colorClass}'>Scarica File</button></div>`
          : `<button type='button' onclick=\\"scaricaFileModale('${selectedTarget}', 'materiale.html')\\" class='${colorClass}'>${buttonLabel.replace(/'/g, "\\'")}</button>`);

    let updatedJs = js;
    const regex = new RegExp(`(${selectedTarget}\\s*:\\s*\\{[\\s\\S]*?html\\s*:\\s*)(["'\`])([\\s\\S]*?)\\2`, 'i');
    const match = updatedJs.match(regex);
    if (match) {
      let currentHtml = match[3];
      if (currentHtml.includes('modal-download-box') || currentHtml.includes('scaricaFileModale')) {
        currentHtml = currentHtml.replace(/<div class=['"]modal-download-box['"][\s\S]*?<\/div>\s*<\/div>/, singleLineSnippet);
        if (!currentHtml.includes('modal-download-box') && !currentHtml.includes('scaricaFileModale')) {
          currentHtml += singleLineSnippet;
        }
      } else {
        currentHtml += singleLineSnippet;
      }
      const quote = match[2];
      updatedJs = updatedJs.replace(regex, `$1${quote}${currentHtml}${quote}`);
      setJs(updatedJs);
      const targetLabel = MODAL_TARGETS.find(m => m.id === selectedTarget)?.name || selectedTarget;
      setFeedback(`Pulsante inserito/aggiornato con successo nel modale "${targetLabel}"!`);
      setTimeout(() => setFeedback(null), 4000);
    } else {
      navigator.clipboard.writeText(generatedHtmlSnippet);
      setFeedback(`Copiato negli appunti! Incollalo nel tuo modale.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const attachedEntries = Object.entries(fileModaliMap);

  return (
    <div className="flex flex-col h-full bg-[#181d28] text-slate-100 p-6 overflow-y-auto select-text">
      
      {/* BANNER INFORMATIVO: LIMITI GITHUB E LE DUE MODALITÀ (INCORPORATO vs CARTELLA PDF) */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-700/60 rounded-2xl p-4 mb-6 text-xs text-slate-200 shadow-md">
        <div className="flex items-center gap-2 font-bold text-sm text-blue-200 mb-2">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Dimensioni del File, Limiti GitHub &amp; Cartella &ldquo;pdf/&rdquo;</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs leading-relaxed">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-emerald-500/30">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
              <span>📦 Opzione A: File Incorporato (Base64 Standalone)</span>
            </div>
            <p className="text-slate-300">
              Il file (PDF o HTML) viene salvato <strong>direttamente dentro l&apos;HTML unico</strong>.
              <br />
              • <strong>Peso:</strong> La conversione aumenta la dimensione di circa il 33% (un PDF da 1MB diventa ~1.3MB).
              <br />
              • <strong>GitHub:</strong> GitHub accetta file fino a <strong>100 MB</strong> (consigliato &lt; 50 MB). Con normali schede ed esercizi (da 2 a 15 MB) il file resta <strong>ampiamente dentro i limiti</strong> e non serve creare nessuna cartella esterna.
            </p>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-1.5 font-bold text-blue-400 mb-1">
              <span>📁 Opzione B: Cartella &ldquo;pdf/&rdquo; su GitHub (Percorso Relativo)</span>
            </div>
            <p className="text-slate-300">
              Se hai PDF grandi o vuoi tenere l&apos;HTML leggerissimo:
              <br />
              • Invece di caricare il file dal computer, inserisci il percorso relativo (es. <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">pdf/lezione_1.pdf</code>).
              <br />
              • <strong>Vantaggio:</strong> Il file HTML creato peserà solo <strong>pochi KB</strong>! Su GitHub ti basterà creare la cartella <code className="text-amber-300">pdf/</code> accanto all&apos;HTML e caricare lì i file.
            </p>
          </div>
        </div>
      </div>

      {feedback && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* SEZIONE 1: CARICA FILE (PDF O HTML) PER UN MODALE SPECIFICO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mb-8">
        
        {/* CARICAMENTO FILE */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                <FileUp className="w-4 h-4 text-emerald-400" />
                <span>1. Seleziona il Modale e Carica il File (PDF o HTML)</span>
              </div>
            </div>

            {/* SELETTORE DEL MODALE DI DESTINAZIONE */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Destinazione: A quale Card o Modale vuoi associare il file?
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-none focus:border-emerald-500 text-xs"
              >
                {MODAL_TARGETS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
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
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FileCode2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">
                  Trascina qui il tuo file (PDF o HTML)
                </p>
                <p className="text-xs text-slate-400">
                  oppure fai clic per selezionare dal tuo computer
                </p>
              </div>
              <span className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-colors shadow-sm">
                📂 Sfoglia File (PDF / HTML)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.html,.htm,text/html,application/pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>

            {/* OPZIONE PERCORSO CARTELLA GITHUB O LINK WEB */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Oppure collega un percorso cartella (es. <code className="text-amber-300 font-mono">pdf/lezione.pdf</code> per GitHub) o link web:
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="es. pdf/scheda_1.pdf oppure https://tuosito.com/scheda.html"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleApplyUrl(); }}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Collega
                </button>
              </div>

              {/* CHIP RAPIDI PER ESEMPI DI PERCORSO */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500">Esempi:</span>
                <button
                  type="button"
                  onClick={() => setUrlInput(`pdf/lezione_${selectedTarget}.pdf`)}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 font-mono text-[10px] transition-colors border border-slate-700"
                >
                  pdf/lezione_{selectedTarget}.pdf
                </button>
                <button
                  type="button"
                  onClick={() => setUrlInput(`pdf/scheda_${selectedTarget}.html`)}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-[10px] transition-colors border border-slate-700"
                >
                  pdf/scheda_{selectedTarget}.html
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LISTA DEI FILE ATTUALMENTE ALLEGATI AI MODALI */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                <FolderOpen className="w-4 h-4 text-amber-400" />
                <span>File Collegati ai Modali ({attachedEntries.length})</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                Standalone o Cartella
              </span>
            </div>

            {attachedEntries.length > 0 ? (
              <div className="space-y-2.5 overflow-y-auto max-h-[360px] pr-1">
                {attachedEntries.map(([modalId, fileObj]) => {
                  const targetInfo = MODAL_TARGETS.find(m => m.id === modalId);
                  const isHtml = fileObj.nome?.toLowerCase().endsWith('.html') || fileObj.tipo === 'html';
                  const isBase64 = fileObj.data?.startsWith('data:');
                  const isWebUrl = fileObj.data?.startsWith('http://') || fileObj.data?.startsWith('https://');
                  const isRelativePath = !isBase64 && !isWebUrl;
                  const sizeKb = isBase64 ? Math.round((fileObj.data.length * 0.75) / 1024) : null;

                  return (
                    <div
                      key={modalId}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-black text-[10px] ${
                          isHtml 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {isHtml ? 'HTML' : 'PDF'}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-white truncate">{targetInfo?.name || modalId}:</span>
                            {isBase64 ? (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                📦 Base64 ({sizeKb} KB)
                              </span>
                            ) : isRelativePath ? (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                📁 Cartella: {fileObj.data}
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                🌐 Link Web
                              </span>
                            )}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px] truncate">
                            {fileObj.nome}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleTestDownloadDirect(fileObj.data, fileObj.nome)}
                          className="p-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-300 transition-colors"
                          title="Scarica per testare che il file sia valido"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(modalId)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-lg text-slate-300 transition-colors"
                          title="Rimuovi file da questo modale"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <FileCheck2 className="w-10 h-10 text-slate-600 mb-2 stroke-[1.5]" />
                <p className="text-xs font-semibold mb-1">Nessun file personalizzato ancora incorporato</p>
                <p className="text-[11px] text-slate-500 max-w-xs">
                  Carica un file a sinistra: sarà convertito ed inserito istantaneamente nel codice, pronto per essere scaricato dal relativo modale.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SEZIONE 2: GENERATORE DI BOTTONI PER I MODALI */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-5xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Generatore Pulsanti Download per Modali (PDF & HTML)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ogni modale delle Card ha già il pulsante di download collegato a <code className="text-amber-300">scaricaFileModale</code>. 
            Se vuoi aggiungere altri pulsanti supplementari o personalizzare il testo, usa questo generatore:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Destinazione Modale:
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold outline-none focus:border-amber-500"
              >
                {MODAL_TARGETS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* TIPO DI COLLEGAMENTO: GESTORE (MEMORY) O CARTELLA GITHUB */}
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Tipo di Collegamento:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setButtonMode('manager')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] transition-colors ${
                    buttonMode === 'manager' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="Usa scaricaFileModale(): compatibile con Base64 e con percorsi cartella"
                >
                  ⚙️ Gestore File (Auto)
                </button>
                <button
                  type="button"
                  onClick={() => setButtonMode('direct')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] transition-colors ${
                    buttonMode === 'direct' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="Genera tag HTML standard <a href='pdf/...'> per chi usa cartelle su GitHub"
                >
                  📁 Cartella GitHub (Tag &lt;a&gt;)
                </button>
              </div>
            </div>

            {buttonMode === 'direct' && (
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Percorso File per GitHub:
                </label>
                <input
                  type="text"
                  value={customDirectPath}
                  onChange={(e) => setCustomDirectPath(e.target.value)}
                  placeholder="es. pdf/scheda_1.pdf oppure materiali/lezione.html"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-500 font-mono text-xs"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Testo del Download:
              </label>
              <input
                type="text"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
                placeholder="es. 📥 Scarica Scheda di Lavoro (HTML / PDF)"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-500 font-medium"
              />
            </div>

            {buttonBoxStyle === 'box' && (
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Descrizione Sottotitolo:
                </label>
                <input
                  type="text"
                  value={buttonDesc}
                  onChange={(e) => setButtonDesc(e.target.value)}
                  placeholder="es. File pronto per lo studio e la compilazione"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-500"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Stile:</label>
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
                    Pulsante
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

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleInsertIntoModal}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all active:scale-95"
                title="Inserisce o aggiorna direttamente il pulsante nel modale selezionato"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Inserisci nel Modale</span>
              </button>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
                title="Copia il codice HTML per incollarlo dove vuoi"
              >
                {copiedSnippet ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSnippet ? 'Copiato!' : 'Copia Codice'}</span>
              </button>
            </div>
          </div>

          {/* ANTEPRIMA */}
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                Anteprima nel Modale:
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
                      Scarica File
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

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mb-1">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Codice generato:</span>
              </div>
              <pre className="p-2.5 bg-slate-900 rounded text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap break-all border border-slate-800">
                {generatedHtmlSnippet}
              </pre>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
