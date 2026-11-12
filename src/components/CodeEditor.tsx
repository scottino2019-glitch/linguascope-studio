import React, { useState, useMemo } from 'react';
import { 
  FileCode2, 
  Paintbrush2, 
  Binary, 
  Layers, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  WrapText,
  FileText,
  FolderOpen,
  Image as ImageIcon
} from 'lucide-react';
import { FontManager } from './FontManager.tsx';
import { PdfManager } from './PdfManager.tsx';
import { ImageManager } from './ImageManager.tsx';
import type { CourseLang } from '../data/languageTemplates.ts';

export type EditorTab = 'html' | 'css' | 'js' | 'full' | 'fonts' | 'images' | 'pdf';

interface CodeEditorProps {
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
  html: string;
  setHtml: (val: string) => void;
  css: string;
  setCss: (val: string) => void;
  js: string;
  setJs: (val: string) => void;
  fullCode: string;
  currentLang?: CourseLang;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  activeTab,
  setActiveTab,
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
  fullCode,
  currentLang = 'orientali'
}) => {
  const [fontSize, setFontSize] = useState<number>(13.5);
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const currentText = useMemo(() => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'js': return js;
      case 'full': return fullCode;
      default: return '';
    }
  }, [activeTab, html, css, js, fullCode]);

  const handleTextChange = (val: string) => {
    switch (activeTab) {
      case 'html': setHtml(val); break;
      case 'css': setCss(val); break;
      case 'js': setJs(val); break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentText.split('\n');

  return (
    <div className="flex flex-col w-full h-full bg-[#181d28] text-slate-100 select-none overflow-hidden">
      
      {/* BARRA TAB: CODICE PURO (HTML, CSS, JS, FILE UNICO) */}
      <div className="bg-[#10141f] border-b-2 border-slate-700 px-3 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {/* TAB 1: HTML */}
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'html'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>1. HTML</span>
          </button>

          {/* TAB 2: CSS */}
          <button
            type="button"
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'css'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Paintbrush2 className="w-4 h-4" />
            <span>2. CSS</span>
          </button>

          {/* TAB 3: JS */}
          <button
            type="button"
            onClick={() => setActiveTab('js')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'js'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>3. JavaScript</span>
          </button>

          {/* TAB 4: FILE SINGOLO .HTML */}
          <button
            type="button"
            onClick={() => setActiveTab('full')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'full'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4. File Unico .html</span>
          </button>

          {/* TAB 5: GOOGLE FONTS */}
          <button
            type="button"
            onClick={() => setActiveTab('fonts')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fonts'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🔤 Google Fonts</span>
          </button>

          {/* TAB 6: IMMAGINI CARD */}
          <button
            type="button"
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'images'
                ? 'bg-amber-600 text-white shadow-md font-bold'
                : 'text-amber-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>🖼️ Immagini Card</span>
          </button>

          {/* TAB 7: GESTIONE FILE MODALI (PDF & HTML) */}
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pdf'
                ? 'bg-rose-600 text-white shadow-md font-bold'
                : 'text-rose-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>📁 Allega File (PDF/HTML)</span>
          </button>
        </div>

        {/* CONTROLLI EDITING (DISPONIBILI NELLE SCHEDE DI CODICE) */}
        {activeTab !== 'fonts' && activeTab !== 'images' && activeTab !== 'pdf' && (
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-900 px-2 py-1 rounded-xl border border-slate-700 text-xs">
              <span className="text-[11px] font-bold text-slate-400 mr-1.5">Font:</span>
              <button
                type="button"
                onClick={() => setFontSize(s => Math.max(12, s - 1))}
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Riduci font"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono font-bold text-white px-2">{fontSize}px</span>
              <button
                type="button"
                onClick={() => setFontSize(s => Math.min(24, s + 1))}
                className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
                title="Aumenta font"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setWordWrap(!wordWrap)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold transition-colors ${
                wordWrap 
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300' 
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Attiva/disattiva il ritorno a capo automatico delle righe"
            >
              <WrapText className="w-3.5 h-3.5" />
              <span>{wordWrap ? 'A Capo: ATTIVO' : 'A Capo: NO'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiato!' : 'Copia Tab'}</span>
            </button>
          </div>
        )}
      </div>

      {/* CONTENUTO DELLA SCHEDA ATTIVA */}
      {activeTab === 'pdf' ? (
        <PdfManager
          js={js}
          setJs={setJs}
        />
      ) : activeTab === 'images' ? (
        <ImageManager
          html={html}
          setHtml={setHtml}
          currentLang={currentLang}
        />
      ) : activeTab === 'fonts' ? (
        <FontManager
          css={css}
          setCss={setCss}
          currentLang={currentLang}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden bg-[#181d28]">
          {/* NUMERI DI RIGA */}
          <div 
            className="w-12 bg-[#10141f] border-r border-slate-800 text-slate-500 text-right pr-2 select-none overflow-hidden shrink-0 font-mono"
            style={{ fontSize: `${fontSize}px`, paddingTop: '16px', lineHeight: '1.6' }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* AREA CODICE SCORRIBILE AD ALTA LEGGIBILITÀ */}
          <textarea
            value={currentText}
            onChange={(e) => handleTextChange(e.target.value)}
            readOnly={activeTab === 'full'}
            spellCheck={false}
            className={`flex-1 w-full h-full p-4 font-mono text-emerald-300 bg-[#181d28] resize-none outline-none selection:bg-blue-600/40 selection:text-white leading-relaxed ${
              wordWrap ? 'whitespace-pre-wrap break-words overflow-y-auto overflow-x-hidden' : 'whitespace-pre overflow-auto'
            }`}
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            placeholder="Modifica qui il codice..."
          />
        </div>
      )}

      {/* FOOTER DI STATO */}
      <div className="bg-[#10141f] border-t border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
          <span>Le modifiche aggiornano istantaneamente l'anteprima</span>
        </div>
        <div>
          {activeTab === 'pdf'
            ? 'Gestione File Modali (PDF & HTML Incorporati Senza Cartelle Esterne)'
            : activeTab === 'images'
            ? 'Gestione Immagini Card 1, 2, 3 e 4 (File Locali o Link URL)'
            : activeTab === 'fonts'
            ? 'Tipografia & Google Fonts'
            : `${lines.length} righe · Modifica libera`}
        </div>
      </div>

    </div>
  );
};

