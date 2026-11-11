import React from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  RotateCw,
  Eye, 
  Code2, 
  Columns2,
  FileText,
  FolderOpen
} from 'lucide-react';

interface HeaderProps {
  currentLang: 'orientali' | 'slave' | 'occidentali';
  onChangeLang: (lang: 'orientali' | 'slave' | 'occidentali') => void;
  viewMode: 'preview' | 'code' | 'split';
  setViewMode: (mode: 'preview' | 'code' | 'split') => void;
  splitProportion: 'wide-preview' | 'balanced' | 'wide-code' | 'stacked';
  setSplitProportion: (prop: 'wide-preview' | 'balanced' | 'wide-code' | 'stacked') => void;
  onDownload: () => void;
  onCopyAll: () => void;
  onReload: () => void;
  onReset: () => void;
  onOpenPdfTab?: () => void;
  copied: boolean;
  resetNotice: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onChangeLang,
  viewMode,
  setViewMode,
  splitProportion,
  setSplitProportion,
  onDownload,
  onCopyAll,
  onReload,
  onReset,
  onOpenPdfTab,
  copied,
  resetNotice,
}) => {
  return (
    <header className="bg-white border-b border-slate-300 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-xs">
      
      {/* 1. SELETTORE LINGUA (SEPARATO E CHIARO) */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 hidden sm:inline">
          Corso:
        </span>
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 gap-1">
          <button
            type="button"
            onClick={() => onChangeLang('orientali')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              currentLang === 'orientali'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <span>🇯🇵</span>
            <span>Orientali</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeLang('slave')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              currentLang === 'slave'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <span>🇷🇺</span>
            <span>Slave</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeLang('occidentali')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
              currentLang === 'occidentali'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <span>🇮🇹</span>
            <span>Occidentali</span>
          </button>
        </div>
      </div>

      {/* 2. VISTA: ANTEPRIMA / CODICE / AFFIANCATI */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'preview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Anteprima</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'code'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Codice</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'split'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Affiancati</span>
          </button>
        </div>

        {/* PROPORZIONI SPLIT (SEMPRE VISIBILI IN AFFIANCATI) */}
        {viewMode === 'split' && (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 gap-1">
            <button
              type="button"
              onClick={() => setSplitProportion('wide-code')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                splitProportion === 'wide-code' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200 text-slate-700'
              }`}
              title="Dà il 65% dello spazio al codice"
            >
              Codice Ampio (65%)
            </button>
            <button
              type="button"
              onClick={() => setSplitProportion('balanced')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                splitProportion === 'balanced' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200 text-slate-700'
              }`}
              title="50% codice / 50% anteprima"
            >
              50/50
            </button>
            <button
              type="button"
              onClick={() => setSplitProportion('stacked')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                splitProportion === 'stacked' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200 text-slate-700'
              }`}
              title="Codice in alto a tutta larghezza (100%) e anteprima sotto"
            >
              Sopra / Sotto (100% largh.)
            </button>
          </div>
        )}
      </div>

      {/* 3. AZIONI SUL CODICE E ANTEPRIMA (PULITE E FUNZIONANTI) */}
      <div className="flex items-center gap-2">
        {/* RICARICA ANTEPRIMA */}
        <button
          type="button"
          onClick={onReload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-xs active:scale-95"
          title="Ricarica l'anteprima del sito"
        >
          <RotateCw className="w-3.5 h-3.5 text-slate-600" />
          <span>Ricarica</span>
        </button>

        {/* RIPRISTINA CODICE */}
        <button
          type="button"
          onClick={onReset}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
            resetNotice
              ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-black'
              : 'bg-slate-100 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 text-slate-800 border-slate-300'
          }`}
          title="Ripristina il codice originale del corso"
        >
          {resetNotice ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ripristinato!</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Ripristina</span>
            </>
          )}
        </button>

        {/* ALLEGA FILE MODALI (PDF / HTML) */}
        {onOpenPdfTab && (
          <button
            type="button"
            onClick={onOpenPdfTab}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-300 transition-colors shadow-xs active:scale-95"
            title="Gestisci o allega i tuoi file di lavoro (PDF e HTML) per i modali e le card (incorporati direttamente nel codice)"
          >
            <FolderOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Allega File (PDF/HTML)</span>
          </button>
        )}

        {/* COPIA TUTTO */}
        <button
          type="button"
          onClick={onCopyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-xs"
          title="Copia tutto il codice HTML negli appunti"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-black">Copiato!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-600" />
              <span>Copia</span>
            </>
          )}
        </button>

        {/* SCARICA FILE HTML (PROTAGONISTA) */}
        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95"
          title="Scarica il file unico standalone .html senza React"
        >
          <Download className="w-4 h-4 stroke-[3]" />
          <span>Scarica HTML</span>
        </button>
      </div>

    </header>
  );
};
