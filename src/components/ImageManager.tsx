import React, { useState, useRef, useMemo } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Check,
  Sparkles,
  Layers,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

import type { CourseLang } from '../data/languageTemplates.ts';

interface ImageManagerProps {
  html: string;
  setHtml: (val: string) => void;
  currentLang: CourseLang;
}

type CardTarget = 'card2' | 'card3' | 'card4' | 'card1';

interface ImageSlot {
  slotKey: string;
  cardId: CardTarget;
  title: string;
  subtitle: string;
  src: string;
  isActiveTab?: boolean;
  index: number;
}

const SAMPLE_PRESETS = [
  {
    label: 'Calligrafia & Pennello',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Arte & Inchiostro',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Libri & Studio',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Giardino Zen',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Cultura & Musica',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80',
  },
  {
    label: 'Biblioteca Classica',
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=700&q=80',
  },
];

export const ImageManager: React.FC<ImageManagerProps> = ({
  html,
  setHtml,
}) => {
  const [selectedCard, setSelectedCard] = useState<CardTarget>('card2');
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  const [dragSlot, setDragSlot] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Estrae tutti gli slot immagine reali dal codice HTML corrente
  const slots = useMemo<ImageSlot[]>(() => {
    const result: ImageSlot[] = [];
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    const root = tpl.content;

    // CARD 1: Avatar miniatura
    const card1Img = root.querySelector('.crm-avatar img');
    if (card1Img) {
      result.push({
        slotKey: 'card1_0',
        cardId: 'card1',
        title: 'Miniatura Card 1',
        subtitle: 'Immagine quadrata accanto al nastro scorrevole',
        src: card1Img.getAttribute('src') || '',
        index: 0,
      });
    }

    // CARD 2: Pulsanti morphing (data-img) + immagine principale (#cmImage)
    const cmBtns = Array.from(root.querySelectorAll('.card-morphing .cm-cat-btn'));
    const cmMainImg = root.querySelector('#cmImage, .card-morphing .cm-photo img');
    if (cmBtns.length > 0) {
      cmBtns.forEach((btn, idx) => {
        const label = btn.textContent?.trim() || `Scheda ${idx + 1}`;
        const isActive = btn.classList.contains('active');
        const dataImg = btn.getAttribute('data-img') || (isActive || idx === 0 ? cmMainImg?.getAttribute('src') || '' : '');
        result.push({
          slotKey: `card2_${idx}`,
          cardId: 'card2',
          title: `Tab ${idx + 1}: ${label}`,
          subtitle: isActive
            ? 'Scheda attiva iniziale (aggiorna sia la tab che l\'immagine principale)'
            : 'Immagine mostrata quando si clicca su questa scheda',
          src: dataImg,
          isActiveTab: isActive,
          index: idx,
        });
      });
    } else if (cmMainImg) {
      result.push({
        slotKey: 'card2_0',
        cardId: 'card2',
        title: 'Immagine Principale Card 2',
        subtitle: 'Foto principale della Card 2',
        src: cmMainImg.getAttribute('src') || '',
        isActiveTab: true,
        index: 0,
      });
    }

    // CARD 3: Foto panoramica
    const ccrImg = root.querySelector('.card-chapter-reader .ccr-photo img');
    if (ccrImg) {
      const tag = root.querySelector('.card-chapter-reader .ccr-photo-tag')?.textContent?.trim();
      result.push({
        slotKey: 'card3_0',
        cardId: 'card3',
        title: 'Immagine Panoramica Card 3',
        subtitle: tag ? `Etichetta: "${tag}"` : 'Foto superiore dello slider capitoli',
        src: ccrImg.getAttribute('src') || '',
        index: 0,
      });
    }

    // CARD 4: Galleria slide fotografiche
    const cvsSlides = Array.from(root.querySelectorAll('.card-visual-story .cvs-slide'));
    cvsSlides.forEach((slide, idx) => {
      const img = slide.querySelector('img');
      if (!img) return;
      const caption = slide.querySelector('.cvs-caption')?.textContent?.trim();
      result.push({
        slotKey: `card4_${idx}`,
        cardId: 'card4',
        title: `Foto ${idx + 1} di ${cvsSlides.length}`,
        subtitle: caption || `Slide ${idx + 1} della galleria Card 4`,
        src: img.getAttribute('src') || '',
        index: idx,
      });
    });

    return result;
  }, [html]);

  // Aggiorna l'immagine nello slot specificato direttamente dentro l'HTML
  const updateSlotImage = (slot: ImageSlot, newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) {
      showFeedback('Inserisci un URL valido o carica un file immagine.', 'error');
      return;
    }

    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    const root = tpl.content;
    let updated = false;

    if (slot.cardId === 'card1') {
      const img = root.querySelector('.crm-avatar img');
      if (img) {
        img.setAttribute('src', trimmed);
        updated = true;
      }
    } else if (slot.cardId === 'card2') {
      const cmBtns = Array.from(root.querySelectorAll('.card-morphing .cm-cat-btn'));
      const cmMainImg = root.querySelector('#cmImage, .card-morphing .cm-photo img');
      if (cmBtns[slot.index]) {
        cmBtns[slot.index].setAttribute('data-img', trimmed);
        const hasAnyActive = cmBtns.some(b => b.classList.contains('active'));
        if (cmMainImg && (cmBtns[slot.index].classList.contains('active') || (!hasAnyActive && slot.index === 0))) {
          cmMainImg.setAttribute('src', trimmed);
        }
        updated = true;
      } else if (cmMainImg && slot.index === 0) {
        cmMainImg.setAttribute('src', trimmed);
        updated = true;
      }
    } else if (slot.cardId === 'card3') {
      const img = root.querySelector('.card-chapter-reader .ccr-photo img');
      if (img) {
        img.setAttribute('src', trimmed);
        updated = true;
      }
    } else if (slot.cardId === 'card4') {
      const imgs = Array.from(root.querySelectorAll('.card-visual-story .cvs-slide img'));
      if (imgs[slot.index]) {
        imgs[slot.index].setAttribute('src', trimmed);
        updated = true;
      }
    }

    if (updated) {
      setHtml(tpl.innerHTML);
      setUrlInputs(prev => ({ ...prev, [slot.slotKey]: '' }));
      showFeedback(`Immagine aggiornata per "${slot.title}"! L'anteprima si è già aggiornata.`);
    } else {
      showFeedback('Elemento immagine non trovato nel codice HTML corrente.', 'error');
    }
  };

  // Ottimizza immagini raster grandi per mantenere l'HTML fluido e leggero
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const isSvgOrGif = file.type === 'image/svg+xml' || file.type === 'image/gif' || file.name.toLowerCase().endsWith('.svg');
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Errore lettura file'));
      reader.onload = () => {
        const rawResult = reader.result as string;
        if (isSvgOrGif || file.size <= 180 * 1024) {
          resolve(rawResult);
          return;
        }
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 1200;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width >= height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawResult);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const compressed = canvas.toDataURL(mime, 0.85);
          resolve(compressed.length < rawResult.length ? compressed : rawResult);
        };
        img.onerror = () => resolve(rawResult);
        img.src = rawResult;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (slot: ImageSlot, file: File) => {
    if (!file.type.startsWith('image/') && !/\.(png|jpe?g|webp|gif|svg)$/i.test(file.name)) {
      showFeedback('Seleziona un file immagine valido (JPG, PNG, WebP, GIF o SVG).', 'error');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showFeedback('L\'immagine supera i 15MB. Usa un file più piccolo o un link URL.', 'error');
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      updateSlotImage(slot, dataUrl);
    } catch {
      showFeedback('Impossibile leggere l\'immagine dal dispositivo.', 'error');
    }
  };

  const cardTabs: { id: CardTarget; label: string; count: number; color: string }[] = [
    { id: 'card2', label: 'Card 2 (Morphing)', count: slots.filter(s => s.cardId === 'card2').length, color: 'emerald' },
    { id: 'card3', label: 'Card 3 (Capitoli)', count: slots.filter(s => s.cardId === 'card3').length, color: 'blue' },
    { id: 'card4', label: 'Card 4 (Galleria)', count: slots.filter(s => s.cardId === 'card4').length, color: 'rose' },
    { id: 'card1', label: 'Card 1 (Avatar)', count: slots.filter(s => s.cardId === 'card1').length, color: 'amber' },
  ];

  const activeSlots = slots.filter(s => s.cardId === selectedCard);

  return (
    <div className="flex flex-col h-full bg-[#181d28] text-slate-100 p-5 overflow-y-auto select-text">

      {/* BANNER INFORMATIVO */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-rose-950/70 border border-amber-600/40 rounded-2xl p-4 mb-5 text-xs text-slate-200 shadow-md">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-200 mb-1">
          <ImageIcon className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Gestore Immagini delle Card (2, 3, 4 e Avatar Card 1)</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Sostituisci facilmente le foto delle card senza dover cercare il codice HTML: puoi <strong>caricare immagini dal tuo computer</strong> (incorporate in Base64 nel file unico) oppure <strong>incollare un link URL</strong> (o percorso locale es. <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">img/foto.jpg</code>).
        </p>
      </div>

      {/* FEEDBACK */}
      {feedback && (
        <div className={`mb-4 p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
          feedback.type === 'error'
            ? 'bg-rose-500/20 border-rose-500 text-rose-200'
            : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
        }`}>
          {feedback.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* SELETTORE CARD */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {cardTabs.map(tab => {
          const active = selectedCard === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCard(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border transition-all ${
                active
                  ? tab.color === 'emerald'
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                    : tab.color === 'blue'
                    ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                    : tab.color === 'rose'
                    ? 'bg-rose-600 border-rose-400 text-white shadow-md'
                    : 'bg-amber-600 border-amber-400 text-white shadow-md'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                active ? 'bg-black/25 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* LISTA SLOT IMMAGINI DELLA CARD SELEZIONATA */}
      {activeSlots.length === 0 ? (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center text-slate-400 text-xs">
          Nessun elemento immagine trovato per questa card nel codice HTML attuale.
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 max-w-6xl">
          {activeSlots.map(slot => {
            const isBase64 = slot.src.startsWith('data:');
            const inputVal = urlInputs[slot.slotKey] ?? '';
            const isDraggingThis = dragSlot === slot.slotKey;

            return (
              <div
                key={slot.slotKey}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm"
              >
                {/* Intestazione Slot */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-white">{slot.title}</h3>
                      {slot.isActiveTab && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                          Attiva
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{slot.subtitle}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                    isBase64
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {isBase64 ? 'Locale (Base64)' : 'Link / Percorso'}
                  </span>
                </div>

                {/* Anteprima Corrente + Dropzone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragSlot(slot.slotKey); }}
                  onDragLeave={() => setDragSlot(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragSlot(null);
                    if (e.dataTransfer.files?.[0]) {
                      handleFileUpload(slot, e.dataTransfer.files[0]);
                    }
                  }}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all bg-slate-950 ${
                    isDraggingThis
                      ? 'border-emerald-400 ring-2 ring-emerald-500/40'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                    {slot.src ? (
                      <img
                        src={slot.src}
                        alt={slot.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-slate-500 text-xs flex flex-col items-center gap-1">
                        <ImageIcon className="w-6 h-6" />
                        <span>Nessuna immagine</span>
                      </div>
                    )}
                  </div>

                  {/* Bottone Sfoglia File sovrapposto */}
                  <div className="p-2.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 truncate font-mono flex-1" title={slot.src}>
                      {isBase64 ? `Immagine incorporata (${Math.round((slot.src.length * 0.75) / 1024)} KB)` : slot.src || '—'}
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[slot.slotKey]?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors shrink-0 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Carica dal PC</span>
                    </button>
                    <input
                      ref={(el) => { fileInputRefs.current[slot.slotKey] = el; }}
                      type="file"
                      accept="image/*,.png,.jpg,.jpeg,.webp,.gif,.svg"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(slot, f);
                        e.target.value = '';
                      }}
                    />
                  </div>
                </div>

                {/* Input URL / Percorso */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3 text-blue-400" />
                    <span>Oppure incolla un URL immagine o percorso relativo:</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setUrlInputs(prev => ({ ...prev, [slot.slotKey]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') updateSlotImage(slot, inputVal);
                      }}
                      placeholder="https://... oppure img/foto.jpg"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => updateSlotImage(slot, inputVal)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shrink-0"
                    >
                      Applica
                    </button>
                  </div>
                </div>

                {/* Preset rapidi */}
                <div className="pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Galleria rapida (1 clic):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_PRESETS.map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => updateSlotImage(slot, preset.url)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          slot.src === preset.url
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUGGERIMENTO PER LINK ESTERNI */}
      <div className="mt-6 max-w-6xl p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-3 flex-wrap">
        <span>
          💡 <strong>Suggerimento:</strong> Le immagini caricate dal PC vengono ridimensionate automaticamente (max 1200px) per mantenere il file HTML veloce e leggero da scaricare.
        </span>
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
        >
          <span>Cerca foto su Unsplash</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
