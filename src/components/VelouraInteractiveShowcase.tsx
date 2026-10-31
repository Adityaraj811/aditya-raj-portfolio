import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Plus,
  Minus,
  Check,
  Coffee,
  Flame,
  ExternalLink,
  Maximize2,
  Gauge,
} from 'lucide-react';
import { velouraSoundEngine } from '../utils/velouraSoundEngine';
import { resolvePublicAsset } from '../data/portfolioConfig';
import {
  VELOURA_MENU_ITEMS,
  ALCHEMY_NOTES,
  updateTrayQuantity,
  calculateTrayTotals,
  filterVelouraMenuItems,
  stepAlchemyIndex,
  type MenuCategoryFilter,
  type VelouraMenuItem,
  type AlchemyNote,
} from '../utils/velouraShowcaseLogic';

interface VelouraInteractiveShowcaseProps {
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}

type ShowcaseTabId = 'sanctuary' | 'menu' | 'alchemy' | 'ritual';

const SHOWCASE_TABS: { id: ShowcaseTabId; index: string; label: string; shortLabel: string }[] = [
  { id: 'sanctuary', index: '01', label: 'Sanctuary & 9-Bar Brew', shortLabel: 'Sanctuary' },
  { id: 'menu', index: '02', label: 'Alchemy Menu', shortLabel: 'Menu' },
  { id: 'alchemy', index: '03', label: 'Coffee Alchemy Lab', shortLabel: 'Alchemy' },
  { id: 'ritual', index: '04', label: 'Courtyard Ritual', shortLabel: 'Courtyard' },
];

export const VelouraInteractiveShowcase: React.FC<VelouraInteractiveShowcaseProps> = ({
  variant = 'card',
  onExpandCaseStudy,
}) => {
  const isModal = variant === 'modal';
  const prefersReducedMotion = useReducedMotion();

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(() => velouraSoundEngine.isEnabled());
  const [eveningMode, setEveningMode] = useState<boolean>(true);

  // 01. Sanctuary 9-Bar Espresso Extraction State
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [extractionBar, setExtractionBar] = useState<number>(9.0);
  const [shotsPulled, setShotsPulled] = useState<number>(1);
  const pourTimerRef = useRef<number | null>(null);
  const barStepTimerRef = useRef<number | null>(null);

  // 02. Interactive Menu & Tasting Tray State
  const [menuCategory, setMenuCategory] = useState<MenuCategoryFilter>('all');
  const [trayItems, setTrayItems] = useState<Record<string, number>>({
    'saffron-latte': 1,
  });
  const [loyaltyPts, setLoyaltyPts] = useState<number>(140);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // 03. Coffee Alchemy State
  const [alchemyIndex, setAlchemyIndex] = useState<number>(0);
  const [claimedNotes, setClaimedNotes] = useState<string[]>([]);

  // 04. Courtyard Table & Art Ritual State
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedSlot, setSelectedSlot] = useState<string>('4:30 PM · Golden Hour');
  const [selectedZone] = useState<string>('Sunlit Arch & Easel Corner');
  const [ritualConfirmed, setRitualConfirmed] = useState<boolean>(false);

  // Pointer Events Swipe Handling (touch-action: pan-y so vertical scroll is never blocked)
  const pointerSwipeRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    isHorizontalSwipe: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    isHorizontalSwipe: false,
  });

  // Auto-cycle timer when enabled
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = window.setInterval(() => {
      setActiveTabIndex((prev) => (prev + 1) % SHOWCASE_TABS.length);
    }, 4600);
    return () => window.clearInterval(interval);
  }, [isAutoPlaying]);

  // Cleanup timers and release active Web Audio nodes on unmount
  useEffect(() => {
    return () => {
      if (pourTimerRef.current) window.clearTimeout(pourTimerRef.current);
      if (barStepTimerRef.current) window.clearTimeout(barStepTimerRef.current);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      velouraSoundEngine.cleanup();
    };
  }, []);

  const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            staggerChildren: 0.06,
            delayChildren: 0.02,
          },
    },
    exit: {
      opacity: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.14 },
    },
  };

  const staggerItemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0.01 }
        : {
            type: 'spring',
            stiffness: 360,
            damping: 28,
          },
    },
  };

  const showToast = (msg: string) => {
    setToastFeedback(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastFeedback((current) => (current === msg ? null : current));
    }, 2200);
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !soundOn;
    setSoundOn(next);
    velouraSoundEngine.setEnabled(next);
    showToast(next ? 'Veloura Acoustic Sound On' : 'Sound Muted');
  };

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEveningMode((prev) => !prev);
    velouraSoundEngine.playToggleSound();
  };

  const handleSelectTab = (index: number, e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setIsAutoPlaying(false);
    setActiveTabIndex(index);
    velouraSoundEngine.playTabSlideSound(index);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelectTab((activeTabIndex + 1) % SHOWCASE_TABS.length, e);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelectTab((activeTabIndex - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length, e);
    }
  };

  const handlePullEspressoShot = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPouring) return;
    setIsAutoPlaying(false);
    setIsPouring(true);
    setExtractionBar(2.4);
    velouraSoundEngine.playEspressoPourSound();

    if (barStepTimerRef.current) window.clearTimeout(barStepTimerRef.current);
    barStepTimerRef.current = window.setTimeout(() => setExtractionBar(9.0), 320);

    if (pourTimerRef.current) window.clearTimeout(pourTimerRef.current);
    pourTimerRef.current = window.setTimeout(() => {
      setIsPouring(false);
      setExtractionBar(9.0);
      setShotsPulled((prev) => prev + 1);
      setLoyaltyPts((prev) => prev + 15);
      showToast('9.0 BAR Shot Extracted · +15 Sanctuary Points');
    }, 1800);
  };

  const handleUpdateTray = (item: VelouraMenuItem, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    const currentQty = trayItems[item.id] || 0;
    if (delta < 0 && currentQty <= 0) return;

    setTrayItems((prev) => updateTrayQuantity(prev, item.id, delta));

    if (delta > 0) {
      velouraSoundEngine.playChimeSound();
      setLoyaltyPts((prev) => prev + item.points);
      showToast(`Added ${item.name.split(' ').slice(0, 3).join(' ')} · +${item.points} Pts`);
    } else {
      velouraSoundEngine.playToggleSound();
      showToast(`Removed 1 × ${item.name.split(' ').slice(0, 3).join(' ')}`);
    }
  };

  const handleStepAlchemyNote = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    const nextIdx = stepAlchemyIndex(alchemyIndex, direction, ALCHEMY_NOTES.length);
    setAlchemyIndex(nextIdx);
    velouraSoundEngine.playTabSlideSound(nextIdx);
  };

  const handleClaimAlchemyPoints = (note: AlchemyNote, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    if (claimedNotes.includes(note.id)) return;
    setClaimedNotes((prev) => [...prev, note.id]);
    setLoyaltyPts((prev) => prev + 15);
    velouraSoundEngine.playChimeSound();
    showToast('Alchemy Note Collected · +15 Sanctuary Points');
  };

  const handleSelectPartySize = (guests: number, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    setPartySize(guests);
    velouraSoundEngine.playPartySizeSound(idx);
  };

  const handleSelectTimeSlot = (slot: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    setSelectedSlot(slot);
    velouraSoundEngine.playClockTickSound();
  };

  const handlePreviewRitualPass = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    setRitualConfirmed(true);
    velouraSoundEngine.playChimeSound();
    showToast(`Courtyard Pass Ready: ${partySize} ${partySize === 1 ? 'Guest' : 'Guests'} · ${selectedSlot}`);
  };

  // Pointer Swipe Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerSwipeRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      isHorizontalSwipe: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = pointerSwipeRef.current;
    if (state.pointerId !== e.pointerId) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (!state.isHorizontalSwipe && Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      state.isHorizontalSwipe = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = pointerSwipeRef.current;
    if (state.pointerId !== e.pointerId) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      setIsAutoPlaying(false);
      if (dx < 0) {
        const next = (activeTabIndex + 1) % SHOWCASE_TABS.length;
        setActiveTabIndex(next);
        velouraSoundEngine.playTabSlideSound(next);
      } else {
        const prev = (activeTabIndex - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length;
        setActiveTabIndex(prev);
        velouraSoundEngine.playTabSlideSound(prev);
      }
    }

    pointerSwipeRef.current.pointerId = null;
    pointerSwipeRef.current.isHorizontalSwipe = false;
  };

  const { totalCount: totalTrayCount, totalPriceInr: totalTrayPrice } =
    calculateTrayTotals(trayItems);
  const filteredMenuItems = filterVelouraMenuItems(menuCategory);

  const activeTab = SHOWCASE_TABS[activeTabIndex];
  const currentAlchemyNote = ALCHEMY_NOTES[alchemyIndex];

  // Theme palette tokens (Evening Sanctuary vs Warm Daylight Parchment)
  const bgSurface = eveningMode ? 'bg-[#110E0C] text-[#F5EFE6]' : 'bg-[#F8F3EA] text-[#1C1613]';
  const cardBg = eveningMode
    ? 'bg-[#191411]/95 border-[#B47B44]/25'
    : 'bg-[#FFFDF9] border-[#B47B44]/30 shadow-xs';
  const subText = eveningMode ? 'text-[#C8B9A6]' : 'text-[#6E5D52]';
  const mutedText = eveningMode ? 'text-[#9E8C7A]' : 'text-[#8C7A6B]';

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
      className={`w-full h-full min-h-[430px] ${bgSurface} p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none transition-colors duration-300 cursor-default`}
    >
      {/* Ambient Radial Bronze Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: eveningMode
            ? 'radial-gradient(circle at 80% 15%, rgba(180, 123, 68, 0.22), transparent 55%), radial-gradient(circle at 15% 85%, rgba(140, 88, 44, 0.16), transparent 50%)'
            : 'radial-gradient(circle at 80% 15%, rgba(180, 123, 68, 0.15), transparent 55%), radial-gradient(circle at 15% 85%, rgba(180, 123, 68, 0.10), transparent 50%)',
        }}
      />

      {/* Top Interactive Controls Bar */}
      <div className="relative z-10 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#B47B44]/15 border border-[#B47B44]/40 text-[10px] font-mono text-[#D4A373] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
              VELOURA LIVE PREVIEW
            </span>

            <span
              data-testid="veloura-sanctuary-points"
              className="text-[10px] font-mono text-[#B47B44] bg-[#B47B44]/10 px-2 py-1 rounded-md border border-[#B47B44]/25"
            >
              ✦ {loyaltyPts} Sanctuary Pts
            </span>
          </div>

          {/* Interactive Sound, Theme & Auto-Play Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? 'Sound On - Click to Mute' : 'Muted - Click to Enable Sound'}
              title={soundOn ? 'Mute Veloura Sound' : 'Enable Veloura Sound'}
              className={`min-h-[34px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D4A373] ${
                soundOn
                  ? 'bg-[#B47B44] text-[#110E0C] border-[#D4A373] font-semibold shadow-xs'
                  : 'bg-transparent text-[#9E8C7A] border-[#B47B44]/30 hover:border-[#B47B44]/60'
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundOn ? 'Sound On' : 'Muted'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleTheme}
              aria-label={eveningMode ? 'Switch to Daylight mode' : 'Switch to Evening mode'}
              title="Toggle Daylight / Evening Sanctuary Mode"
              className="min-h-[34px] min-w-[34px] inline-flex items-center justify-center p-1.5 rounded-lg border border-[#B47B44]/30 hover:border-[#B47B44]/70 text-[#B47B44] transition-colors cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D4A373]"
            >
              {eveningMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoPlaying((prev) => !prev);
                velouraSoundEngine.playToggleSound();
              }}
              aria-pressed={isAutoPlaying}
              aria-label={isAutoPlaying ? 'Pause Auto-Play Tour' : 'Start Auto-Play Tour'}
              title={isAutoPlaying ? 'Pause Auto-Tour' : 'Auto-Cycle Screens'}
              className={`min-h-[34px] min-w-[34px] inline-flex items-center justify-center p-1.5 rounded-lg border transition-colors cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-[#D4A373] ${
                isAutoPlaying
                  ? 'bg-[#B47B44]/20 border-[#B47B44] text-[#D4A373]'
                  : 'border-[#B47B44]/30 text-[#9E8C7A] hover:text-[#D4A373]'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Interactive Screen Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Veloura Interactive Screens"
          onKeyDown={handleTabKeyDown}
          className={`grid grid-cols-4 gap-1 p-1 rounded-xl border ${
            eveningMode
              ? 'bg-[#191411] border-[#B47B44]/25'
              : 'bg-[#EFE7DA] border-[#B47B44]/30'
          }`}
        >
          {SHOWCASE_TABS.map((tab, idx) => {
            const isSelected = activeTabIndex === idx;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={(e) => handleSelectTab(idx, e)}
                onMouseEnter={() => velouraSoundEngine.playCardHoverSound(idx)}
                className={`min-h-[36px] px-1.5 sm:px-2 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer truncate focus-visible:outline-2 focus-visible:outline-[#D4A373] ${
                  isSelected
                    ? 'bg-[#B47B44] text-[#110E0C] font-semibold shadow-xs'
                    : `${mutedText} hover:text-[#B47B44]`
                }`}
              >
                <span className="opacity-70 mr-0.5 sm:mr-1">{tab.index}.</span>
                <span>{isModal ? tab.label : tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Toast Notification Pill */}
      <AnimatePresence>
        {toastFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-[#B47B44] text-[#110E0C] text-[10px] font-mono font-semibold shadow-lg whitespace-nowrap pointer-events-none"
          >
            ✦ {toastFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive Viewport Window */}
      <div className={`relative z-10 my-2.5 rounded-xl border overflow-hidden ${cardBg}`}>
        {/* Browser & Sanctuary Status Bar */}
        <div className="px-3 py-2 border-b border-[#B47B44]/20 flex items-center justify-between gap-2 bg-black/20">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#C97A63]/80 shrink-0" />
            <span className="w-2 h-2 rounded-full bg-[#D4A373]/80 shrink-0" />
            <span className="w-2 h-2 rounded-full bg-[#7A9A82]/80 shrink-0" />
            <span className="ml-1 text-[10px] font-mono text-[#D4A373] truncate">
              valoura-one.vercel.app/{activeTab.id}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => handleSelectTab(1, e)}
            data-testid="veloura-tray-summary"
            className="min-h-[28px] inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#B47B44]/15 border border-[#B47B44]/35 text-[10px] font-mono text-[#D4A373] hover:bg-[#B47B44]/25 transition-colors cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-2.5 h-2.5" />
            <span>
              Tray ({totalTrayCount}) · ₹{totalTrayPrice}
            </span>
          </button>
        </div>

        {/* Animated Screen Content */}
        <div className="p-3 sm:p-3.5 min-h-[275px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* TAB 01: SANCTUARY HERO & LIVE 9-BAR ESPRESSO EXTRACTION */}
            {activeTab.id === 'sanctuary' && (
              <motion.div
                key="tab-sanctuary"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2.5"
              >
                {/* Hero Sanctuary Visual with Animated Steam & Espresso Gauge */}
                <motion.div
                  variants={staggerItemVariants}
                  className="relative h-36 sm:h-40 rounded-lg overflow-hidden border border-[#B47B44]/30"
                >
                  <img
                    src={resolvePublicAsset('images/veloura-hero.jpg')}
                    alt="Veloura Specialty Coffee Sanctuary"
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                    style={{
                      transform: isPouring && !prefersReducedMotion ? 'scale(1.06)' : 'scale(1)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C] via-[#110E0C]/55 to-transparent" />

                  {/* Animated Rising Steam Particles */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none flex items-center justify-center gap-4"
                  >
                    {[0, 1, 2].map((wisp) => (
                      <motion.div
                        key={wisp}
                        initial={{ y: 20, opacity: 0.15, scale: 0.85 }}
                        animate={
                          prefersReducedMotion
                            ? { opacity: 0.3 }
                            : {
                                y: isPouring ? [-6, -46] : [0, -24],
                                opacity: isPouring ? [0.15, 0.7, 0] : [0.1, 0.32, 0],
                                scale: isPouring ? [0.85, 1.35] : [0.85, 1.1],
                              }
                        }
                        transition={{
                          duration: isPouring ? 1.3 : 2.6,
                          repeat: Infinity,
                          delay: wisp * 0.32,
                        }}
                        className="w-6 h-16 rounded-full bg-gradient-to-t from-[#D4A373]/45 to-transparent blur-md"
                      />
                    ))}
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#110E0C]/85 border border-[#B47B44]/40 text-[9px] font-mono tracking-widest uppercase text-[#D4A373]">
                      Velvet + Aura · Sanctuary
                    </span>
                    <span
                      data-testid="veloura-pressure-readout"
                      className="px-2 py-0.5 rounded-full bg-[#110E0C]/90 border border-[#B47B44]/50 text-[9px] font-mono text-[#F5EFE6]"
                    >
                      {isPouring
                        ? `EXTRACTING ${extractionBar.toFixed(1)} BAR · 93°C`
                        : `${extractionBar.toFixed(1)} BAR · 93°C`}
                    </span>
                  </div>

                  {/* Hero Title & Interactive Espresso Cup Preview */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-serif text-sm sm:text-base font-semibold text-[#F5EFE6] leading-tight">
                        Where Craft Meets Calm.
                      </p>
                      <p className="text-[10px] text-[#D6C7B2] mt-0.5 truncate">
                        Single-estate Indian Arabica · 93°C thermal precision
                      </p>
                    </div>

                    {/* Live Animated Espresso Crema Cup Gauge */}
                    <div className="flex items-center gap-2 bg-[#110E0C]/90 border border-[#B47B44]/45 rounded-lg p-1.5 shrink-0">
                      <div className="relative w-8 h-9 rounded-md overflow-hidden border border-[#B47B44]/40 bg-[#1C1613]">
                        <motion.div
                          animate={{
                            height: isPouring ? ['18%', '88%'] : '82%',
                          }}
                          transition={{ duration: isPouring ? 1.6 : 0.4, ease: 'easeInOut' }}
                          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#3B1F0E] via-[#7F4622] to-[#D4A373]"
                        />
                        {isPouring && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-[#D4A373]"
                          />
                        )}
                      </div>
                      <div className="text-left pr-1">
                        <p className="text-[9px] font-mono text-[#D4A373] font-semibold">
                          {isPouring ? 'POURING' : `SHOT #${shotsPulled}`}
                        </p>
                        <p className="text-[8px] font-mono text-[#9E8C7A]">18g → 36g · 93°C</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Animated 9.0 BAR Pressure Gauge Bar */}
                <motion.div
                  variants={staggerItemVariants}
                  className="px-2.5 py-1.5 rounded-lg border border-[#B47B44]/25 bg-black/15 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#D4A373] shrink-0">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>PRESSURE GAUGE: {extractionBar.toFixed(1)} BAR</span>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-black/40 border border-[#B47B44]/30 overflow-hidden">
                    <motion.div
                      animate={{ width: `${Math.min(100, (extractionBar / 9.0) * 100)}%` }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#8C582C] via-[#B47B44] to-[#D4A373]"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#C8B9A6] shrink-0">Temp: 93°C</span>
                </motion.div>

                {/* Interactive Action Buttons Row */}
                <motion.div
                  variants={staggerItemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  <button
                    type="button"
                    onClick={handlePullEspressoShot}
                    disabled={isPouring}
                    className={`min-h-[38px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer active:scale-98 ${
                      isPouring
                        ? 'bg-[#B47B44]/40 text-[#F5EFE6] border border-[#D4A373]'
                        : 'bg-[#B47B44] hover:bg-[#C68B53] text-[#110E0C] shadow-sm'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${isPouring ? 'animate-bounce' : ''}`} />
                    <span>
                      {isPouring ? 'Extracting 9.0 BAR Shot...' : 'Pull 9-Bar Espresso Shot'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSelectTab(1, e)}
                    className="min-h-[38px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#B47B44]/45 hover:bg-[#B47B44]/15 text-[11px] font-mono text-[#D4A373] transition-colors cursor-pointer active:scale-98"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Explore Alchemy Menu →</span>
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* TAB 02: INTERACTIVE ALCHEMY MENU & LIVE TRAY */}
            {activeTab.id === 'menu' && (
              <motion.div
                key="tab-menu"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2.5"
              >
                {/* Category Filter Buttons */}
                <motion.div
                  variants={staggerItemVariants}
                  className="flex items-center justify-between gap-1.5 flex-wrap"
                >
                  <div className="flex items-center gap-1 flex-wrap" role="group" aria-label="Menu Category Filters">
                    {(
                      [
                        { id: 'all', label: 'All' },
                        { id: 'brews', label: 'Alchemy Brews' },
                        { id: 'kitchen', label: 'Slow Kitchen' },
                        { id: 'bakes', label: 'Bakes' },
                      ] as { id: MenuCategoryFilter; label: string }[]
                    ).map((cat, idx) => (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={menuCategory === cat.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuCategory(cat.id);
                          velouraSoundEngine.playTabSlideSound(idx);
                        }}
                        className={`min-h-[32px] px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                          menuCategory === cat.id
                            ? 'bg-[#B47B44] text-[#110E0C] font-semibold'
                            : 'bg-[#B47B44]/10 text-[#C8B9A6] hover:bg-[#B47B44]/20'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-[#D4A373]">
                    Tray Total: ₹{totalTrayPrice} ({totalTrayCount} {totalTrayCount === 1 ? 'item' : 'items'})
                  </span>
                </motion.div>

                {/* Scrollable Interactive Menu Items */}
                <motion.div
                  variants={staggerItemVariants}
                  className="space-y-1.5 max-h-[195px] overflow-y-auto pr-1"
                >
                  {filteredMenuItems.map((item, idx) => {
                    const qty = trayItems[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => velouraSoundEngine.playCardHoverSound(idx)}
                        className={`p-2 rounded-lg border flex items-center justify-between gap-2 transition-colors ${
                          qty > 0
                            ? 'border-[#B47B44]/60 bg-[#B47B44]/10'
                            : 'border-[#B47B44]/20 bg-black/15 hover:border-[#B47B44]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={resolvePublicAsset(item.imagePath)}
                            alt={item.name}
                            className="w-11 h-11 rounded-md object-cover shrink-0 border border-[#B47B44]/30"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-medium truncate">{item.name}</p>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded bg-[#B47B44]/20 text-[8px] font-mono text-[#D4A373] shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className={`text-[10px] truncate ${subText}`}>{item.notes}</p>
                            <p className="text-[9px] font-mono text-[#B47B44] mt-0.5">
                              ₹{item.price} · +{item.points} Pts · {item.prep}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Add / Remove Counter Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={qty === 0}
                            onClick={(e) => handleUpdateTray(item, -1, e)}
                            aria-label={`Remove ${item.name}`}
                            className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all ${
                              qty > 0
                                ? 'border-[#B47B44]/50 text-[#D4A373] hover:bg-[#B47B44]/20 cursor-pointer active:scale-90'
                                : 'border-[#B47B44]/15 text-[#9E8C7A]/40 cursor-not-allowed'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span
                            data-testid={`menu-qty-${item.id}`}
                            className="w-5 text-center font-mono text-xs font-semibold text-[#D4A373]"
                          >
                            {qty}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleUpdateTray(item, 1, e)}
                            aria-label={`Add ${item.name}`}
                            className="h-7 px-2 rounded-md bg-[#B47B44] hover:bg-[#C68B53] text-[#110E0C] text-[10px] font-mono font-semibold inline-flex items-center gap-1 cursor-pointer active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* TAB 03: DAILY COFFEE ALCHEMY LAB */}
            {activeTab.id === 'alchemy' && (
              <motion.div
                key="tab-alchemy"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2.5"
              >
                <motion.div
                  variants={staggerItemVariants}
                  className="flex items-center justify-between gap-2 flex-wrap"
                >
                  <span className="px-2 py-0.5 rounded-md bg-[#B47B44]/15 border border-[#B47B44]/35 text-[10px] font-mono text-[#D4A373]">
                    {currentAlchemyNote.categoryLabel} ({alchemyIndex + 1}/{ALCHEMY_NOTES.length})
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleStepAlchemyNote('prev', e)}
                      aria-label="Previous Alchemy Note"
                      className="min-h-[32px] inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#B47B44]/40 hover:bg-[#B47B44]/15 text-[10px] font-mono text-[#D4A373] transition-colors cursor-pointer active:scale-95"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span>Previous</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleStepAlchemyNote('next', e)}
                      aria-label="Next Alchemy Note"
                      className="min-h-[32px] inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#B47B44]/40 hover:bg-[#B47B44]/15 text-[10px] font-mono text-[#D4A373] transition-colors cursor-pointer active:scale-95"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  key={currentAlchemyNote.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
                  className="p-3 rounded-lg border border-[#B47B44]/30 bg-black/20 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="space-y-1">
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#F5EFE6]">
                        {currentAlchemyNote.title}
                      </h4>
                      <p className="text-[10px] font-mono text-[#D4A373]">
                        {currentAlchemyNote.pairing}
                      </p>
                    </div>
                    <img
                      src={resolvePublicAsset('images/veloura-coffee.jpg')}
                      alt="Pour-Over Alchemy"
                      className="w-12 h-12 rounded-md object-cover border border-[#B47B44]/35 shrink-0"
                    />
                  </div>

                  <p className={`text-[11px] leading-relaxed ${subText}`}>
                    {currentAlchemyNote.fact}
                  </p>

                  <div className="p-2 rounded-md bg-[#B47B44]/10 border border-[#B47B44]/25 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[9px] font-mono text-[#D4A373]">
                      {currentAlchemyNote.metric}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleClaimAlchemyPoints(currentAlchemyNote, e)}
                      disabled={claimedNotes.includes(currentAlchemyNote.id)}
                      className={`min-h-[32px] inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                        claimedNotes.includes(currentAlchemyNote.id)
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#B47B44] hover:bg-[#C68B53] text-[#110E0C]'
                      }`}
                    >
                      {claimedNotes.includes(currentAlchemyNote.id) ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Claimed +15 Points</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          <span>Claim +15 Points</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* TAB 04: COURTYARD TABLE & ART CORNER RITUAL (UI SHOWCASE) */}
            {activeTab.id === 'ritual' && (
              <motion.div
                key="tab-ritual"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                <motion.div
                  variants={staggerItemVariants}
                  className="flex items-center gap-2.5 p-2 rounded-lg border border-[#B47B44]/25 bg-black/20"
                >
                  <img
                    src={resolvePublicAsset('images/veloura-art.jpg')}
                    alt="Veloura Art Corner"
                    className="w-12 h-12 rounded-md object-cover border border-[#B47B44]/35 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#D4A373]">
                      Frontend Ritual Preview · Harp &amp; Marimba Audio
                    </span>
                    <p className="font-serif text-xs sm:text-sm font-semibold truncate">
                      Canvas &amp; Courtyard Table Selector
                    </p>
                    <p className={`text-[10px] truncate ${subText}`}>
                      Selected: {partySize} {partySize === 1 ? 'Guest' : 'Guests'} · {selectedSlot}
                    </p>
                  </div>
                </motion.div>

                {/* Guest Count Selector (Plays Harp Swell) */}
                <motion.div variants={staggerItemVariants} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={subText}>PARTY SIZE (HARP SWELL)</span>
                    <span data-testid="veloura-selected-guests" className="text-[#D4A373] font-semibold">
                      {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 4, 6].map((g, idx) => (
                      <button
                        key={g}
                        type="button"
                        aria-pressed={partySize === g}
                        onClick={(e) => handleSelectPartySize(g, idx, e)}
                        className={`min-h-[34px] py-1 rounded-md text-[10px] font-mono border transition-all cursor-pointer active:scale-95 ${
                          partySize === g
                            ? 'bg-[#B47B44] text-[#110E0C] border-[#D4A373] font-semibold'
                            : 'border-[#B47B44]/30 text-[#C8B9A6] hover:border-[#B47B44]/60'
                        }`}
                      >
                        {g} {g === 1 ? 'Guest' : 'Guests'}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Time Slot Selector (Plays Marimba Clock Tick) */}
                <motion.div variants={staggerItemVariants} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={subText}>GOLDEN-HOUR SLOT (MARIMBA)</span>
                    <span data-testid="veloura-selected-slot" className="text-[#D4A373] truncate max-w-[160px]">
                      {selectedSlot}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      '11:00 AM · Morning',
                      '4:30 PM · Golden Hour',
                      '7:30 PM · Evening',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={selectedSlot === slot}
                        onClick={(e) => handleSelectTimeSlot(slot, e)}
                        className={`min-h-[34px] px-1.5 py-1 rounded-md text-[9px] font-mono border truncate transition-all cursor-pointer active:scale-95 ${
                          selectedSlot === slot
                            ? 'bg-[#B47B44]/25 text-[#D4A373] border-[#B47B44] font-semibold'
                            : 'border-[#B47B44]/25 text-[#9E8C7A] hover:border-[#B47B44]/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Real-time Ritual Pass Preview Action & Live Pass Card */}
                <motion.div variants={staggerItemVariants} className="space-y-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={handlePreviewRitualPass}
                    className="min-h-[36px] w-full py-1.5 px-3 rounded-lg bg-[#B47B44] hover:bg-[#C68B53] text-[#110E0C] text-[10px] font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Preview Courtyard Ritual Pass</span>
                  </button>

                  {ritualConfirmed && (
                    <div
                      data-testid="veloura-ritual-pass-preview"
                      className="p-2 rounded-lg border border-[#D4A373]/50 bg-[#B47B44]/15 flex items-center justify-between gap-2 text-[10px] font-mono"
                    >
                      <div className="min-w-0">
                        <p className="text-[#D4A373] font-semibold truncate">
                          ✦ RITUAL PASS PREVIEW · {partySize} {partySize === 1 ? 'GUEST' : 'GUESTS'}
                        </p>
                        <p className="text-[#F5EFE6] truncate">
                          {selectedSlot} · {selectedZone} (Canvas &amp; Pastels Included)
                        </p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#110E0C]/70 text-[#D4A373] text-[9px] shrink-0">
                        UI Demo
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation & Direct Live Demo / Case Study Expansion Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={(e) =>
              handleSelectTab(
                (activeTabIndex - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length,
                e
              )
            }
            aria-label="Previous Veloura screen"
            className="min-h-[34px] min-w-[34px] inline-flex items-center justify-center p-1.5 rounded-lg border border-[#B47B44]/30 hover:border-[#B47B44] text-[#D4A373] transition-colors cursor-pointer active:scale-95 shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => handleSelectTab((activeTabIndex + 1) % SHOWCASE_TABS.length, e)}
            aria-label="Next Veloura screen"
            className="min-h-[34px] min-w-[34px] inline-flex items-center justify-center p-1.5 rounded-lg border border-[#B47B44]/30 hover:border-[#B47B44] text-[#D4A373] transition-colors cursor-pointer active:scale-95 shrink-0"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <span className={`text-[10px] font-mono ${mutedText} ml-1 truncate`}>
            Swipe or tap tabs · Web Audio Synth
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isModal && onExpandCaseStudy && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpandCaseStudy();
              }}
              className="min-h-[34px] inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#B47B44]/20 hover:bg-[#B47B44]/35 border border-[#B47B44]/50 text-[10px] font-mono font-semibold text-[#D4A373] transition-all cursor-pointer active:scale-95"
            >
              <Maximize2 className="w-2.5 h-2.5" />
              <span>Expand Case Study</span>
            </button>
          )}

          <a
            href="https://valoura-one.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="min-h-[34px] inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-[#D4A373] hover:text-[#F5EFE6] underline underline-offset-4 shrink-0"
          >
            <span>Open Full App</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
