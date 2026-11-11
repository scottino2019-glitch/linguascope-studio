import React, { useState } from 'react';
import { Type, Sparkles, Check, Globe, RefreshCw, Layers } from 'lucide-react';

interface FontManagerProps {
  css: string;
  setCss: (val: string) => void;
  currentLang: 'orientali' | 'slave' | 'occidentali';
}

interface FontOption {
  name: string;
  category: string;
  sample: string;
  isSerif?: boolean;
}

const PRESET_FONTS: Record<string, FontOption[]> = {
  orientali: [
    { name: 'Noto Sans JP', category: 'Sans-serif Moderno', sample: '日本語の美しい文字と書き順' },
    { name: 'Zen Kaku Gothic New', category: 'Geometric Sans', sample: '東京・漢字・ひらがな・カタカナ' },
    { name: 'Sawarabi Mincho', category: 'Serif Tradizionale', sample: '書道と筆の動き・永字八法', isSerif: true },
    { name: 'Noto Serif JP', category: 'Serif Editoriale', sample: '漢字の意味と部首の調和', isSerif: true },
    { name: 'M PLUS 1p', category: 'Arrotondato Moderno', sample: '分かりやすい文法と助詞' },
    { name: 'Yuji Boku', category: 'Pennello Calligrafico Shodo', sample: '墨の濃淡と筆圧の呼吸', isSerif: true }
  ],
  slave: [
    { name: 'Montserrat', category: 'Geometric Bold', sample: 'Русский язык и алфавит кириллица' },
    { name: 'Roboto', category: 'Sans-serif Neutro', sample: 'Грамматика 6 падежей и глаголы' },
    { name: 'Playfair Display', category: 'Serif Elegante', sample: 'Русская литература и поэзия', isSerif: true },
    { name: 'Cormorant Garamond', category: 'Serif Classico', sample: 'Церковнославянская вязь', isSerif: true },
    { name: 'Oswald', category: 'Condensato Impatto', sample: 'ФОНЕТИКА И ПРАВИЛА УДАРЕНИЯ' },
    { name: 'Noto Sans', category: 'Massima Compatibilità', sample: 'Все славянские языки и буквы' }
  ],
  occidentali: [
    { name: 'Plus Jakarta Sans', category: 'Sans Contemporaneo', sample: 'Lingua italiana: sintassi e congiuntivo' },
    { name: 'Inter', category: 'Interfaccia e UI Standard', sample: 'Il periodo ipotetico e la grammatica' },
    { name: 'Cinzel', category: 'Lapidario Romano', sample: 'CALLIGRAFIA E TRADIZIONE CLASSICA', isSerif: true },
    { name: 'Lora', category: 'Serif Letterario', sample: 'L\'armonia della prosa e delle subordinate', isSerif: true },
    { name: 'Space Grotesk', category: 'Moderno Tecnico', sample: 'Regole grammaticali ed eccezioni' },
    { name: 'Cinzel Decorative', category: 'Monumentale Storico', sample: 'ARS SCRIBENDI ET GRAMMATICA', isSerif: true }
  ],
  mondo: [
    { name: 'Amiri', category: 'Arabo / Naskh', sample: 'اللغة العربية والخط الجميل', isSerif: true },
    { name: 'Noto Sans Devanagari', category: 'Hindi / Sanscrito', sample: 'नमस्ते और व्याकरण के नियम' },
    { name: 'Noto Sans KR', category: 'Coreano / Hangul', sample: '한국어 문법과 한글 쓰기' },
    { name: 'Noto Sans SC', category: 'Cinese Semplificato', sample: '汉字笔顺与普通话语法' },
    { name: 'GFS Didot', category: 'Greco Classico', sample: 'Ελληνική γλώσσα και γραμματική', isSerif: true }
  ]
};

export const FontManager: React.FC<FontManagerProps> = ({
  css,
  setCss,
  currentLang
}) => {
  // Extract currently configured font variables from CSS
  const getBodyFont = () => {
    const m = css.match(/--font-body:\s*'([^']+)'/);
    return m ? m[1] : (currentLang === 'orientali' ? 'Noto Sans JP' : currentLang === 'slave' ? 'Montserrat' : 'Plus Jakarta Sans');
  };

  const getHeadingFont = () => {
    const m = css.match(/--font-heading:\s*'([^']+)'/);
    return m ? m[1] : (currentLang === 'orientali' ? 'Noto Serif JP' : currentLang === 'slave' ? 'Playfair Display' : 'Cinzel');
  };

  const getBaseFontSize = () => {
    const m = css.match(/--base-font-size:\s*(\d+)px/);
    return m ? parseInt(m[1], 10) : 15;
  };

  const [bodyFont, setBodyFontState] = useState<string>(getBodyFont());
  const [headingFont, setHeadingFontState] = useState<string>(getHeadingFont());
  const [fontSize, setFontSizeState] = useState<number>(getBaseFontSize());
  const [customFontInput, setCustomFontInput] = useState<string>('');
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // Apply the selected fonts to the CSS code
  const applyFontsToCss = (newBody: string, newHeading: string, newSize: number) => {
    let updatedCss = css;

    // 1. Ensure Google Fonts @import includes both fonts
    const encodedBody = newBody.replace(/ /g, '+');
    const encodedHeading = newHeading.replace(/ /g, '+');
    const newImportLine = `@import url('https://fonts.googleapis.com/css2?family=${encodedBody}:wght@400;500;600;700;800;900&family=${encodedHeading}:wght@400;600;700;800;900&display=swap');`;

    if (updatedCss.includes("@import url('https://fonts.googleapis.com")) {
      updatedCss = updatedCss.replace(/@import url\('https:\/\/fonts\.googleapis\.com[^']+'\);/, newImportLine);
    } else {
      updatedCss = `${newImportLine}\n\n${updatedCss}`;
    }

    // 2. Update CSS variables in :root
    if (updatedCss.includes('--font-body:')) {
      updatedCss = updatedCss.replace(/--font-body:\s*[^;]+;/, `--font-body: '${newBody}', sans-serif;`);
    } else {
      updatedCss = `:root {\n  --font-body: '${newBody}', sans-serif;\n  --font-heading: '${newHeading}', serif;\n  --base-font-size: ${newSize}px;\n}\n\n` + updatedCss;
    }

    if (updatedCss.includes('--font-heading:')) {
      updatedCss = updatedCss.replace(/--font-heading:\s*[^;]+;/, `--font-heading: '${newHeading}', serif;`);
    }

    if (updatedCss.includes('--base-font-size:')) {
      updatedCss = updatedCss.replace(/--base-font-size:\s*[^;]+;/, `--base-font-size: ${newSize}px;`);
    }

    // 3. Make sure body and headings use the variables
    if (!updatedCss.includes('font-family: var(--font-body)')) {
      updatedCss = updatedCss.replace(
        /body\s*\{[\s\S]*?font-family:[^;]+;/,
        (match) => match.replace(/font-family:[^;]+;/, 'font-family: var(--font-body);')
      );
    }

    setCss(updatedCss);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 2500);
  };

  const handleSelectPreset = (fontName: string, isHeading: boolean) => {
    if (isHeading) {
      setHeadingFontState(fontName);
      applyFontsToCss(bodyFont, fontName, fontSize);
    } else {
      setBodyFontState(fontName);
      applyFontsToCss(fontName, headingFont, fontSize);
    }
  };

  const handleApplyCustomFont = (isHeading: boolean) => {
    if (!customFontInput.trim()) return;
    const cleanName = customFontInput.trim().replace(/^['"]|['"]$/g, '');
    if (isHeading) {
      setHeadingFontState(cleanName);
      applyFontsToCss(bodyFont, cleanName, fontSize);
    } else {
      setBodyFontState(cleanName);
      applyFontsToCss(cleanName, headingFont, fontSize);
    }
    setCustomFontInput('');
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSizeState(newSize);
    applyFontsToCss(bodyFont, headingFont, newSize);
  };

  const activePresets = PRESET_FONTS[currentLang] || PRESET_FONTS.orientali;
  const worldPresets = PRESET_FONTS.mondo;

  return (
    <div className="flex flex-col h-full bg-[#181d28] text-slate-100 p-5 overflow-y-auto">
      
      {/* BANNER INFORMATIVO */}
      <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-700/60 rounded-2xl p-4 mb-6 text-xs text-blue-200">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 font-bold text-sm text-blue-100">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Gestore Universale Tipografia & Google Fonts</span>
          </div>
          {appliedNotice && (
            <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-slate-950 font-black rounded-lg text-xs animate-bounce shadow-md">
              <Check className="w-3.5 h-3.5" />
              <span>Applicato al CSS e all&apos;Anteprima!</span>
            </span>
          )}
        </div>
        <p className="text-blue-300">
          Hai il pieno controllo sui caratteri tipografici: puoi selezionare font nativi per scritture orientali (Giapponese, Cinese), slave (Russo, Cirillico), occidentali (Latino) o digitare <strong>qualsiasi nome di Google Font esistente al mondo</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">

        {/* COLONNA SINISTRA: FONT ATTUALI E INPUT PERSONALIZZATO */}
        <div className="space-y-6">
          
          {/* STATO FONT ATTUALI */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-3">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Font Attualmente Configurati nel CSS</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block font-semibold">Font Testo & Paragrafi (--font-body):</span>
                  <span className="text-white font-black text-sm">{bodyFont}</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-blue-900/60 text-blue-300 font-bold text-[11px]">
                  Corpo
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block font-semibold">Font Titoli & H1/H2/H3 (--font-heading):</span>
                  <span className="text-white font-black text-sm">{headingFont}</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-purple-900/60 text-purple-300 font-bold text-[11px]">
                  Titoli
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-400 font-semibold">Dimensione Font Base del Sito:</span>
                  <span className="text-emerald-400 font-black">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={20}
                  step={1}
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* INPUT LIBERO: CARICA QUALSIASI GOOGLE FONT */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Inserisci Qualsiasi Google Font Libero</span>
            </div>
            <p className="text-slate-400 text-xs mb-3">
              Scrivi il nome esatto del font da <a href="https://fonts.google.com" target="_blank" rel="noreferrer" className="text-blue-400 underline font-bold">fonts.google.com</a> (es. <em>Caveat, Amiri, Bebas Neue, Outfit, Syne, Fira Sans</em>):
            </p>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Es. Caveat, Amiri, Syne, Outfit, Cinzel..."
                value={customFontInput}
                onChange={(e) => setCustomFontInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyCustomFont(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-emerald-500 text-xs"
              />

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleApplyCustomFont(false)}
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Imposta come Testo (Body)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyCustomFont(true)}
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Imposta come Titoli (Headings)
                </button>
              </div>
            </div>
          </div>

          {/* ANTEPRIMA VISIVA SPECIMEN */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Campione Tipografico in Tempo Reale
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block mb-1">
                  Titoli (Font: {headingFont})
                </span>
                <div style={{ fontFamily: `'${headingFont}', serif`, fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                  L&apos;Armonia della Scrittura e della Grammatica
                </div>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">
                  Corpo del Testo (Font: {bodyFont}, {fontSize}px)
                </span>
                <div style={{ fontFamily: `'${bodyFont}', sans-serif`, fontSize: `${fontSize}px`, color: '#cbd5e1', lineHeight: 1.6 }}>
                  Le regole grammaticali e la sequenza corretta dei tratti permettono di comprendere il ritmo e la profondità espressiva della lingua.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COLONNA DESTRA: PRESET OTTIMIZZATI PER LA LINGUA SELEZIONATA */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                <Layers className="w-4 h-4 text-rose-400" />
                <span>Font Raccomandati per {currentLang === 'orientali' ? 'Giapponese / CJK' : currentLang === 'slave' ? 'Russo / Cirillico' : 'Italiano / Latino'}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">1 Clic per Assegnare</span>
            </div>

            <div className="space-y-2.5">
              {activePresets.map((font) => {
                const isBodyActive = bodyFont.toLowerCase() === font.name.toLowerCase();
                const isHeadActive = headingFont.toLowerCase() === font.name.toLowerCase();

                return (
                  <div
                    key={font.name}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white">{font.name}</span>
                        <span className="text-slate-400 text-xs ml-2">({font.category})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSelectPreset(font.name, false)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                            isBodyActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {isBodyActive ? '✓ Testo' : '+ Testo'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectPreset(font.name, true)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                            isHeadActive
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {isHeadActive ? '✓ Titoli' : '+ Titoli'}
                        </button>
                      </div>
                    </div>

                    <div className="text-slate-400 text-xs italic opacity-90 truncate">
                      {font.sample}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FONT MONDIALI PER ALTRE LINGUE */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Supporto per Tutte le Altre Lingue del Mondo</span>
            </div>
            <p className="text-slate-400 text-xs mb-3">
              Font specializzati per sistemi di scrittura arabi, devanagari, coreani, cinesi e greci:
            </p>

            <div className="space-y-2">
              {worldPresets.map((font) => (
                <div
                  key={font.name}
                  className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white">{font.name}</span>
                    <span className="text-slate-400 ml-1.5">({font.category})</span>
                    <span className="text-slate-500 block text-[11px]">{font.sample}</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSelectPreset(font.name, false)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-[10px] font-bold"
                    >
                      Corpo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset(font.name, true)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 text-[10px] font-bold"
                    >
                      Titolo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
