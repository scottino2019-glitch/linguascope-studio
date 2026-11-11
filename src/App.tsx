import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { CodeEditor, EditorTab } from './components/CodeEditor.tsx';
import { LivePreview } from './components/LivePreview.tsx';
import { LANGUAGE_TEMPLATES, buildSingleFileHtml } from './data/languageTemplates.ts';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'orientali' | 'slave' | 'occidentali'>('orientali');
  
  const currentTemplate = LANGUAGE_TEMPLATES[currentLang];
  
  const [html, setHtml] = useState<string>(currentTemplate.html);
  const [css, setCss] = useState<string>(currentTemplate.css);
  const [js, setJs] = useState<string>(currentTemplate.js);

  // Default a 'split' affiancati con codice spazioso
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('split');
  const [splitProportion, setSplitProportion] = useState<'wide-preview' | 'balanced' | 'wide-code' | 'stacked'>('wide-code');
  const [splitWidth, setSplitWidth] = useState<number>(65); // 65% per il codice di default
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Tab attiva nell'editor: default 'html'
  const [activeTab, setActiveTab] = useState<EditorTab>('html');
  const [copied, setCopied] = useState<boolean>(false);
  const [resetNotice, setResetNotice] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  // Allinea splitWidth quando l'utente sceglie un preset dal menu
  useEffect(() => {
    if (splitProportion === 'wide-code') setSplitWidth(65);
    else if (splitProportion === 'balanced') setSplitWidth(50);
    else if (splitProportion === 'wide-preview') setSplitWidth(35);
  }, [splitProportion]);

  // Gestione trascinamento resizer manuale
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const pct = (e.clientX / window.innerWidth) * 100;
      if (pct >= 25 && pct <= 85) {
        setSplitWidth(Math.round(pct));
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Cambio lingua pulito: aggiorna tutto il template senza mischiare le lingue
  const handleChangeLang = (newLang: 'orientali' | 'slave' | 'occidentali') => {
    setCurrentLang(newLang);
    const tmpl = LANGUAGE_TEMPLATES[newLang];
    setHtml(tmpl.html);
    setCss(tmpl.css);
    setJs(tmpl.js);
    setReloadKey(k => k + 1);
  };

  // Codice unificato combinato per il download e l'anteprima
  const fullCode = useMemo(() => {
    return buildSingleFileHtml(html, css, js);
  }, [html, css, js]);

  // Scarica il file HTML unico standalone
  const handleDownload = () => {
    const blob = new Blob([fullCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sito_lezioni_${currentLang}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copia tutto negli appunti
  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Ricarica forzata dell'anteprima (100% funzionante)
  const handleReload = () => {
    setReloadKey(k => k + 1);
  };

  // Ripristina template della lingua corrente (funziona istantaneamente senza dialoghi bloccati)
  const handleReset = () => {
    const tmpl = LANGUAGE_TEMPLATES[currentLang];
    setHtml(tmpl.html);
    setCss(tmpl.css);
    setJs(tmpl.js);
    setReloadKey(k => k + 1);
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2000);
  };

  const handleOpenPdfTab = () => {
    setActiveTab('pdf');
    if (viewMode === 'preview') {
      setViewMode('split');
    }
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans ${isDragging ? 'cursor-col-resize select-none' : ''}`}>
      
      {/* HEADER: SELETTORE LINGUA + MODALITÀ VISTA + RICARICA/RIPRISTINA/SCARICA */}
      <Header
        currentLang={currentLang}
        onChangeLang={handleChangeLang}
        viewMode={viewMode}
        setViewMode={setViewMode}
        splitProportion={splitProportion}
        setSplitProportion={setSplitProportion}
        onDownload={handleDownload}
        onCopyAll={handleCopyAll}
        onReload={handleReload}
        onReset={handleReset}
        onOpenPdfTab={handleOpenPdfTab}
        copied={copied}
        resetNotice={resetNotice}
      />

      {/* AREA PRINCIPALE: ANTEPRIMA / CODICE / AFFIANCATI */}
      <div className="flex-1 flex w-full h-full overflow-hidden">
        
        {/* VISTA 1: SOLO ANTEPRIMA */}
        {viewMode === 'preview' && (
          <div className="w-full h-full flex flex-col">
            <LivePreview
              fullCode={fullCode}
              reloadKey={reloadKey}
            />
          </div>
        )}

        {/* VISTA 2: SOLO CODICE (100% LARGHEZZA) */}
        {viewMode === 'code' && (
          <div className="w-full h-full flex flex-col">
            <CodeEditor
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              html={html}
              setHtml={setHtml}
              css={css}
              setCss={setCss}
              js={js}
              setJs={setJs}
              fullCode={fullCode}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* VISTA 3: AFFIANCATI */}
        {viewMode === 'split' && (
          splitProportion === 'stacked' ? (
            /* VISTA SOPRA / SOTTO: 100% DI LARGHEZZA ORIZZONTALE */
            <div className="flex flex-col w-full h-full overflow-hidden">
              <div className="w-full h-1/2 border-b-2 border-slate-300 flex flex-col overflow-hidden">
                <CodeEditor
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  html={html}
                  setHtml={setHtml}
                  css={css}
                  setCss={setCss}
                  js={js}
                  setJs={setJs}
                  fullCode={fullCode}
                  currentLang={currentLang}
                />
              </div>
              <div className="w-full h-1/2 flex flex-col overflow-hidden">
                <LivePreview
                  fullCode={fullCode}
                  reloadKey={reloadKey}
                />
              </div>
            </div>
          ) : (
            /* VISTA AFFIANCATI CON DIVISORE TRASCINABILE (DRAGGABLE SPLIT) */
            <div className="flex flex-row w-full h-full overflow-hidden">
              {/* PANNELLO CODICE AD AMPIEZZA REGOLABILE */}
              <div style={{ width: `${splitWidth}%` }} className="h-full flex flex-col overflow-hidden shrink-0">
                <CodeEditor
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  html={html}
                  setHtml={setHtml}
                  css={css}
                  setCss={setCss}
                  js={js}
                  setJs={setJs}
                  fullCode={fullCode}
                  currentLang={currentLang}
                />
              </div>

              {/* DIVISORE TRASCINABILE */}
              <div
                onMouseDown={handleMouseDown}
                className="w-2.5 hover:w-3.5 bg-slate-300 hover:bg-blue-600 cursor-col-resize flex items-center justify-center transition-all shrink-0 z-30 group shadow-xs select-none"
                title="Trascina verso destra o sinistra per allargare il codice o l'anteprima"
              >
                <div className="w-1 h-10 rounded-full bg-slate-400 group-hover:bg-white transition-colors"></div>
              </div>

              {/* PANNELLO ANTEPRIMA */}
              <div
                style={{ width: `${100 - splitWidth}%` }}
                className={`h-full flex flex-col overflow-hidden flex-1 ${isDragging ? 'pointer-events-none' : ''}`}
              >
                <LivePreview
                  fullCode={fullCode}
                  reloadKey={reloadKey}
                />
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}
