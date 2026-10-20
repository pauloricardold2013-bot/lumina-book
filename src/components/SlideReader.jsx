import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  List, 
  X, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Type, 
  Moon, 
  Sun, 
  Palette, 
  RotateCcw, 
  Mic, 
  Settings2, 
  Headphones, 
  Radio 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx, narrator } from '../utils/audio';

export default function SlideReader({ book, onClose, onSaveProgress, initialSlide = 0 }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide);
  const [readingTheme, setReadingTheme] = useState('darknight'); // 'darknight' | 'parchment' | 'emerald'
  const [fontSize, setFontSize] = useState(1.1); // rem
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans'
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(8); // seconds
  const [isNarrating, setIsNarrating] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(true);
  const [turnDirection, setTurnDirection] = useState('next');
  const [isOpeningCinematic, setIsOpeningCinematic] = useState(true);

  // High Quality Narrator State
  const [activeSentence, setActiveSentence] = useState('');
  const [sentenceProgress, setSentenceProgress] = useState({ current: 0, total: 0 });
  const [isNarratorSettingsOpen, setIsNarratorSettingsOpen] = useState(false);
  const [autoStoryMode, setAutoStoryMode] = useState(true); // Automatically advance slide when narration ends
  const [narratorSpeed, setNarratorSpeed] = useState(narrator.rate || 0.96);
  const [narratorPitch, setNarratorPitch] = useState(narrator.pitch || 1.0);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState(narrator.selectedVoiceIdentifier || 'google_mobile');
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  // Obter voz atual e nomes amigáveis para botões e menus
  const currentVoiceObj = useMemo(() => {
    return availableVoices.find(v => v.id === selectedVoiceName || v.name === selectedVoiceName) || availableVoices[0] || null;
  }, [availableVoices, selectedVoiceName]);

  const shortVoiceName = useMemo(() => {
    return narrator.getShortVoiceName(currentVoiceObj);
  }, [currentVoiceObj]);

  const displayVoiceName = useMemo(() => {
    return narrator.getVoiceDisplayName(currentVoiceObj);
  }, [currentVoiceObj]);

  const containerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpeningCinematic(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const slides = book?.slides || [];
  const currentSlide = slides[currentSlideIndex] || {};
  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setTurnDirection('next');
      sfx.playFlip();
      if (isNarrating) narrator.stop();
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setTurnDirection('prev');
      sfx.playFlip();
      if (isNarrating) narrator.stop();
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect horizontal swipe above 40px threshold where horizontal dominates
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNext(); // swipe left -> advance
      } else {
        handlePrev(); // swipe right -> previous
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !isAutoPlay)) {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (isTocOpen) setIsTocOpen(false);
        else onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isTocOpen, isAutoPlay, slides.length, isFirst, isLast, onClose]);

  // Narrator state tracking & available voices loader
  useEffect(() => {
    narrator.onStateChange = (speaking) => {
      setIsNarrating(speaking);
      if (!speaking) {
        setActiveSentence('');
      }
    };

    narrator.onSentenceChange = (curr, total, text) => {
      setSentenceProgress({ current: curr + 1, total });
      setActiveSentence(text);
    };

    const loadVoicesList = () => {
      const v = narrator.getAvailableVoices();
      setAvailableVoices(v);
      if (narrator.selectedVoiceIdentifier) {
        setSelectedVoiceName(narrator.selectedVoiceIdentifier);
      }
    };

    loadVoicesList();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.addEventListener) {
        window.speechSynthesis.addEventListener('voiceschanged', loadVoicesList);
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoicesList;
      }
    }

    return () => {
      narrator.stop();
      if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.removeEventListener) {
        window.speechSynthesis.removeEventListener('voiceschanged', loadVoicesList);
      }
    };
  }, []);

  // AutoPlay effect
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev < slides.length - 1) {
            sfx.playFlip();
            return prev + 1;
          } else {
            setIsAutoPlay(false);
            return prev;
          }
        });
      }, autoPlayInterval * 1000);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, autoPlayInterval, slides.length]);

  // Save progress & trigger celebration at the end
  useEffect(() => {
    const pct = ((currentSlideIndex + 1) / Math.max(1, slides.length)) * 100;
    if (onSaveProgress) {
      onSaveProgress(book.id, pct, currentSlideIndex);
    }

    if (isLast && slides.length > 1) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      sfx.playChime();
    }
  }, [currentSlideIndex]);

  // Play narration for a specific slide
  const playCurrentSlideNarration = (slideIndex) => {
    const s = slides[slideIndex];
    if (!s) return;
    narrator.speakSlide(s.title, s.content, () => {
      // Called when current slide narration finishes
      if (autoStoryMode && slideIndex < slides.length - 1) {
        setTurnDirection('next');
        sfx.playFlip();
        setCurrentSlideIndex(prev => prev + 1);
      } else {
        setIsNarrating(false);
        setActiveSentence('');
      }
    });
  };

  // When slide index changes while narrating, automatically read the new slide seamlessly
  useEffect(() => {
    if (isNarrating) {
      const timer = setTimeout(() => {
        playCurrentSlideNarration(currentSlideIndex);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex]);

  const toggleNarration = () => {
    if (isNarrating) {
      narrator.stop();
      setIsNarrating(false);
      setActiveSentence('');
    } else {
      setIsNarrating(true);
      playCurrentSlideNarration(currentSlideIndex);
    }
  };

  const handleVoiceSelect = (voiceId) => {
    setSelectedVoiceName(voiceId);
    narrator.setVoice(voiceId);
    if (isNarrating) {
      playCurrentSlideNarration(currentSlideIndex);
    }
  };

  const handleSpeedChange = (speed) => {
    setNarratorSpeed(speed);
    narrator.setRate(speed);
    if (isNarrating) {
      playCurrentSlideNarration(currentSlideIndex);
    }
  };

  const handlePitchChange = (pitch) => {
    setNarratorPitch(pitch);
    narrator.setPitch(pitch);
    if (isNarrating) {
      playCurrentSlideNarration(currentSlideIndex);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleToggleTestVoice = () => {
    if (isTestingVoice) {
      narrator.stop();
      setIsTestingVoice(false);
    } else {
      if (isNarrating) {
        narrator.stop();
        setIsNarrating(false);
      }
      setIsTestingVoice(true);
      narrator.playSample(() => {
        setIsTestingVoice(false);
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="reader-fullscreen-container"
      style={{
        position: 'fixed',
        inset: 0,
        height: '100dvh',
        maxHeight: '100dvh',
        zIndex: 50,
        backgroundColor: readingTheme === 'parchment' 
          ? '#f4ece1' 
          : (readingTheme === 'emerald' ? '#061712' : '#07080d'),
        color: readingTheme === 'parchment' ? '#29221b' : '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflow: 'hidden',
        transition: 'background-color 0.4s ease, color 0.4s ease'
      }}
    >
      {/* Top Slide Control Bar */}
      <div 
        className="reader-top-bar touch-scroll-x"
        style={{
          padding: '0.75rem clamp(0.75rem, 2.5vw, 1.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: readingTheme === 'parchment' 
            ? '1px solid rgba(0,0,0,0.08)' 
            : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          background: readingTheme === 'parchment' 
            ? 'rgba(244, 236, 225, 0.9)' 
            : 'rgba(9, 10, 16, 0.85)',
          zIndex: 20
        }}
      >
        {/* Left: Book title & progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
          <button
            onClick={() => {
              narrator.stop();
              onClose();
            }}
            title="Voltar à Biblioteca"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem clamp(0.5rem, 1.5vw, 0.75rem)',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: 'inherit',
              flexShrink: 0
            }}
          >
            <ChevronLeft size={18} />
            <span className="reader-back-text">Voltar</span>
          </button>

          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', height: '18px', flexShrink: 0 }} />

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span 
              className="reader-book-title-header"
              style={{ 
                fontWeight: 700, 
                fontSize: 'clamp(0.82rem, 2.5vw, 0.94rem)',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                maxWidth: 'clamp(110px, 28vw, 240px)',
                verticalAlign: 'bottom'
              }}
            >
              {book.title}
            </span>
            <span style={{ 
              fontSize: '0.74rem', 
              color: 'var(--text-muted)', 
              marginLeft: '0.5rem',
              whiteSpace: 'nowrap'
            }}>
              {currentSlideIndex + 1}/{slides.length}
            </span>
          </div>
        </div>

        {/* Right: Reading controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.35rem, 1.2vw, 0.5rem)', position: 'relative' }}>
          {/* Locutor Primary Button com o nome da voz selecionada */}
          <button
            onClick={toggleNarration}
            title={isNarrating ? "Pausar Narração" : `Ouvir leitura com ${displayVoiceName}`}
            className="reader-voice-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem clamp(0.6rem, 1.8vw, 0.95rem)',
              borderRadius: '10px',
              fontSize: 'clamp(0.75rem, 1.6vw, 0.82rem)',
              fontWeight: 700,
              background: isNarrating 
                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
                : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#ffffff',
              boxShadow: isNarrating ? '0 0 20px rgba(239, 68, 68, 0.6)' : '0 2px 10px rgba(139, 92, 246, 0.4)',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.2)',
              whiteSpace: 'nowrap',
              maxWidth: 'clamp(130px, 32vw, 230px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {isNarrating ? (
              <>
                <VolumeX size={16} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Pausar ({shortVoiceName})
                </span>
              </>
            ) : (
              <>
                <Headphones size={16} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  🎙️ {shortVoiceName}
                </span>
              </>
            )}
          </button>

          {/* Narrator Settings Button */}
          <button
            onClick={() => setIsNarratorSettingsOpen(!isNarratorSettingsOpen)}
            title="Configurações da Narração e Escolha de Voz"
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              background: isNarratorSettingsOpen ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              color: isNarratorSettingsOpen ? '#fbbf24' : 'inherit',
              border: isNarratorSettingsOpen ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent'
            }}
          >
            <Settings2 size={16} />
          </button>



          {/* AutoPlay Slideshow */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            title="Apresentação Automática por Tempo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: isAutoPlay ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              boxShadow: isAutoPlay ? '0 0 15px rgba(139, 92, 246, 0.5)' : 'none'
            }}
          >
            {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
            <span>Timer ({autoPlayInterval}s)</span>
          </button>

          {/* Theme switcher */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '2px' }}>
            <button
              onClick={() => setReadingTheme('darknight')}
              title="Tema Noite Escura"
              style={{
                padding: '0.35rem 0.5rem',
                borderRadius: '6px',
                background: readingTheme === 'darknight' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'inherit'
              }}
            >
              <Moon size={15} />
            </button>
            <button
              onClick={() => setReadingTheme('parchment')}
              title="Tema Pergaminho / Papel"
              style={{
                padding: '0.35rem 0.5rem',
                borderRadius: '6px',
                background: readingTheme === 'parchment' ? 'rgba(0,0,0,0.15)' : 'transparent',
                color: 'inherit'
              }}
            >
              <Sun size={15} />
            </button>
            <button
              onClick={() => setReadingTheme('emerald')}
              title="Tema Esmeralda"
              style={{
                padding: '0.35rem 0.5rem',
                borderRadius: '6px',
                background: readingTheme === 'emerald' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                color: 'inherit'
              }}
            >
              <Palette size={15} />
            </button>
          </div>

          {/* Font Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '2px' }}>
            <button
              onClick={() => setFontSize(prev => Math.max(0.9, prev - 0.1))}
              title="Diminuir Fonte"
              style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', fontWeight: 700 }}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize(prev => Math.min(1.5, prev + 0.1))}
              title="Aumentar Fonte"
              style={{ padding: '0.35rem 0.5rem', fontSize: '0.9rem', fontWeight: 700 }}
            >
              A+
            </button>
            <button
              onClick={() => setFontFamily(prev => prev === 'serif' ? 'sans' : 'serif')}
              title="Alternar Tipografia (Serif / Sans)"
              style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', fontWeight: 600 }}
            >
              {fontFamily === 'serif' ? 'Serif' : 'Sans'}
            </button>
          </div>

          {/* Table of Contents Drawer Toggle */}
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            title="Sumário de Capítulos e Slides"
            style={{
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              background: isTocOpen ? '#f59e0b' : 'rgba(255, 255, 255, 0.08)',
              color: isTocOpen ? '#090a10' : '#ffffff'
            }}
          >
            <List size={17} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            title="Modo Tela Cheia"
            style={{
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'inherit'
            }}
          >
            {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div style={{
        width: '100%',
        height: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{
          width: `${((currentSlideIndex + 1) / slides.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #8b5cf6 0%, #f59e0b 100%)',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>

      {/* Main Slide Presentation Stage with Touch Swipe */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.75rem, 2.5vw, 1.5rem)',
          overflowY: 'auto'
        }}
      >
        {/* Floating Prev Nav Button */}
        <button
          className="reader-side-arrow"
          onClick={handlePrev}
          disabled={isFirst}
          style={{
            left: 'clamp(0.5rem, 2vw, 1.5rem)',
            background: readingTheme === 'parchment' ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.06)',
            border: readingTheme === 'parchment' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
            color: 'inherit',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            opacity: isFirst ? 0.2 : 0.8
          }}
          onMouseEnter={(e) => { if (!isFirst) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.opacity = '1'; } }}
          onMouseLeave={(e) => { if (!isFirst) { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.opacity = '0.8'; } }}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Floating Next Nav Button */}
        <button
          className="reader-side-arrow"
          onClick={handleNext}
          disabled={isLast}
          style={{
            right: 'clamp(0.5rem, 2vw, 1.5rem)',
            background: readingTheme === 'parchment' ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.06)',
            border: readingTheme === 'parchment' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
            color: 'inherit',
            cursor: isLast ? 'not-allowed' : 'pointer',
            opacity: isLast ? 0.2 : 0.8
          }}
          onMouseEnter={(e) => { if (!isLast) { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.opacity = '1'; } }}
          onMouseLeave={(e) => { if (!isLast) { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.opacity = '0.8'; } }}
        >
          <ChevronRight size={28} />
        </button>

        {/* Ambient Book Aura */}
        <div style={{
          position: 'absolute',
          width: '750px',
          height: '550px',
          borderRadius: '50%',
          background: readingTheme === 'parchment'
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* The Slide Card Container with 3D Page Turn */}
        <div 
          key={currentSlideIndex}
          className={`slide-reader-card ${isOpeningCinematic ? 'book-open-cinematic' : (turnDirection === 'next' ? 'page-turn-next' : 'page-turn-prev')} ${readingTheme === 'parchment' ? 'theme-parchment' : (readingTheme === 'emerald' ? 'theme-emerald' : '')}`}
          style={{
            maxWidth: '880px',
            width: '100%',
            minHeight: 'clamp(68vh, 74vh, 80vh)',
            maxHeight: 'clamp(76vh, 84vh, 90vh)',
            borderRadius: 'clamp(16px, 3vw, 24px)',
            background: readingTheme === 'parchment' 
              ? '#fffdf9' 
              : (readingTheme === 'emerald' ? 'rgba(8, 28, 22, 0.95)' : 'rgba(16, 18, 28, 0.95)'),
            border: readingTheme === 'parchment' 
              ? '1px solid #e7ded0' 
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: readingTheme === 'parchment'
              ? '0 25px 50px rgba(100, 80, 60, 0.15)'
              : '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 92, 246, 0.15)',
            padding: 'clamp(1.25rem, 3.5vw, 3rem)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: (currentSlide.type === 'cover' || currentSlide.type === 'dedication') ? 'center' : 'flex-start',
            alignItems: (currentSlide.type === 'cover' || currentSlide.type === 'dedication') ? 'center' : 'stretch',
            textAlign: (currentSlide.type === 'cover' || currentSlide.type === 'dedication') ? 'center' : 'left',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Slide Top Badge */}
          {currentSlide.badge && (
            <div style={{
              alignSelf: currentSlide.type === 'cover' ? 'center' : 'flex-start',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: '1.5rem'
            }}>
              {currentSlide.badge}
            </div>
          )}

          {/* Slide Title */}
          {currentSlide.title && (
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: currentSlide.type === 'cover' ? 'clamp(2rem, 4vw, 3rem)' : '1.85rem',
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: currentSlide.subtitle ? '0.5rem' : '1.8rem',
              color: readingTheme === 'parchment' ? '#3e2a14' : '#ffffff',
              letterSpacing: '0.5px'
            }}>
              {currentSlide.title}
            </h2>
          )}

          {/* Subtitle */}
          {currentSlide.subtitle && (
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: readingTheme === 'parchment' ? '#785b3a' : '#c4b5fd',
              marginBottom: '1.8rem',
              fontStyle: 'italic'
            }}>
              {currentSlide.subtitle}
            </h3>
          )}

          {/* Cover Illustrated Art (if cover or image provided) */}
          {currentSlide.imageUrl && (
            <div style={{
              margin: '0.5rem auto 1.8rem auto',
              maxWidth: currentSlide.type === 'cover' ? '320px' : '450px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              border: '2px solid rgba(245, 158, 11, 0.3)'
            }}>
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* Slide Text Content */}
          {currentSlide.type === 'dedication' ? (
            <div style={{
              background: readingTheme === 'parchment' ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.03)',
              border: readingTheme === 'parchment' ? '1px dashed #d97706' : '1px dashed rgba(245, 158, 11, 0.45)',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              maxWidth: '650px',
              margin: '1rem auto',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}>
              <Sparkles size={32} color="#f59e0b" style={{ margin: '0 auto 1.25rem auto' }} />
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: `${fontSize * 1.15}rem`,
                lineHeight: 2,
                fontStyle: 'italic',
                color: readingTheme === 'parchment' ? '#3e2a14' : '#f8fafc',
                whiteSpace: 'pre-line'
              }}>
                {currentSlide.content}
              </div>
            </div>
          ) : (
            <div style={{
              fontFamily: fontFamily === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
              fontSize: `${fontSize}rem`,
              lineHeight: 1.85,
              color: readingTheme === 'parchment' ? '#332921' : '#e2e8f0',
              whiteSpace: 'pre-line',
              flex: 1
            }}>
              {currentSlide.content?.split('\n\n').map((paragraph, pIdx) => {
                const isDialogue = paragraph.trim().startsWith('—') || paragraph.trim().startsWith('-');
                return (
                  <p 
                    key={pIdx} 
                    style={{
                      marginBottom: '1.25rem',
                      textIndent: isDialogue ? '0' : '1.8rem',
                      paddingLeft: isDialogue ? '0.75rem' : '0',
                      borderLeft: isDialogue ? '2px solid rgba(139, 92, 246, 0.3)' : 'none',
                      fontWeight: 400
                    }}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          )}

          {/* Real-time Narrator Story Follower Teleprompter */}
          {isNarrating && activeSentence && (
            <div style={{
              position: 'sticky',
              bottom: '10px',
              zIndex: 20,
              background: readingTheme === 'parchment'
                ? 'linear-gradient(90deg, #fefbf3, #fdf8eb)'
                : 'linear-gradient(90deg, rgba(22, 18, 45, 0.98), rgba(13, 16, 30, 0.98))',
              border: readingTheme === 'parchment'
                ? '1px solid #d97706'
                : '1px solid rgba(245, 158, 11, 0.5)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.25)',
              borderRadius: '16px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginTop: '1.5rem',
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#f59e0b',
                boxShadow: '0 0 12px #f59e0b',
                flexShrink: 0
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.72rem',
                  color: readingTheme === 'parchment' ? '#b45309' : '#fbbf24',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '2px'
                }}>
                  🎙️ Locutor Oficial • Trecho Atual ({sentenceProgress.current}/{sentenceProgress.total})
                </div>
                <div style={{
                  fontSize: '0.94rem',
                  color: readingTheme === 'parchment' ? '#2c2520' : '#ffffff',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  lineHeight: 1.4
                }}>
                  "{activeSentence}"
                </div>
              </div>
            </div>
          )}

          {/* Slide Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: readingTheme === 'parchment' ? '1px solid #e7ded0' : '1px solid rgba(255,255,255,0.06)',
            paddingTop: '1.25rem',
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span>Capítulo {currentSlideIndex} • {book.author}</span>
            <span>Página {currentSlideIndex + 1} de {slides.length}</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Dots Bar */}
      <div 
        className="reader-bottom-nav"
        style={{
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          background: readingTheme === 'parchment' ? 'rgba(244, 236, 225, 0.95)' : 'rgba(9, 10, 16, 0.9)',
          borderTop: readingTheme === 'parchment' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)',
          zIndex: 20
        }}
      >
        {/* Navigation Dot Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          maxWidth: '65vw',
          overflowX: 'auto',
          padding: '4px'
        }}>
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                sfx.playFlip();
                setCurrentSlideIndex(idx);
              }}
              title={`Slide ${idx + 1}: ${s.title || 'Sem título'}`}
              style={{
                width: currentSlideIndex === idx ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: currentSlideIndex === idx 
                  ? '#f59e0b' 
                  : (readingTheme === 'parchment' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)'),
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', minWidth: '80px', textAlign: 'right' }}>
          {Math.round(((currentSlideIndex + 1) / slides.length) * 100)}% lido
        </span>
      </div>

      {/* Table of Contents Drawer */}
      {isTocOpen && (
        <div 
          className="toc-drawer"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '360px',
            maxWidth: '85vw',
            background: 'rgba(13, 15, 25, 0.97)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.7)',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Drawer Header */}
          <div style={{
            padding: '1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                Sumário do Livro
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {slides.length} slides interativos
              </p>
            </div>
            <button
              onClick={() => setIsTocOpen(false)}
              style={{
                padding: '0.4rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--text-muted)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
            {slides.map((slide, sIdx) => {
              const isActive = currentSlideIndex === sIdx;
              return (
                <div
                  key={sIdx}
                  onClick={() => {
                    sfx.playFlip();
                    setCurrentSlideIndex(sIdx);
                    setIsTocOpen(false);
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    marginBottom: '0.4rem',
                    background: isActive ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.35), rgba(99, 102, 241, 0.2))' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: isActive ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#090a10' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 800
                  }}>
                    {sIdx + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.88rem',
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {slide.title || `Slide ${sIdx + 1}`}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {slide.content?.slice(0, 60)}...
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Narrator Settings Modal Dialog (Over the page) */}
      {isNarratorSettingsOpen && (
        <div
          onClick={() => setIsNarratorSettingsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 6, 12, 0.78)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '450px',
              background: 'rgba(15, 18, 30, 0.98)',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              borderRadius: '24px',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.25)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '0.9rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  padding: '0.45rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Radio size={20} color="#f59e0b" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                    Configurações do Locutor
                  </h3>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Personalize a voz, tom e cadência da narração
                  </span>
                </div>
              </div>

              {/* Botão X para fechar a caixa */}
              <button
                onClick={() => setIsNarratorSettingsOpen(false)}
                title="Fechar (X)"
                aria-label="Fechar"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.85)';
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Story Follow Toggle */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.86rem',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'background 0.2s ease'
            }}>
              <span style={{ fontWeight: 500, color: '#f8fafc' }}>
                Acompanhar história (virar página sozinho)
              </span>
              <input
                type="checkbox"
                checked={autoStoryMode}
                onChange={(e) => setAutoStoryMode(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#f59e0b', cursor: 'pointer' }}
              />
            </label>

            {/* Voice Choice */}
            {availableVoices.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Voz do Sistema (Windows & Celular):
                  </label>
                  <button
                    onClick={handleToggleTestVoice}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '8px',
                      background: isTestingVoice ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                      border: isTestingVoice ? '1px solid #ef4444' : '1px solid rgba(245, 158, 11, 0.35)',
                      color: isTestingVoice ? '#f87171' : '#fbbf24',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {isTestingVoice ? <Pause size={13} /> : <Play size={13} />}
                    <span>{isTestingVoice ? 'Parar Amostra' : 'Ouvir Teste'}</span>
                  </button>
                </div>
                <select
                  value={selectedVoiceName}
                  onChange={(e) => handleVoiceSelect(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121420',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.65rem 0.85rem',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {availableVoices.map(v => (
                    <option key={v.id || v.name} value={v.id || v.name}>
                      {narrator.getVoiceDisplayName(v)}
                    </option>
                  ))}
                </select>
                <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                  {selectedVoiceName === 'google_mobile'
                    ? '📱 A mesma locução suave do celular, reproduzida com máxima nitidez no Windows e celular.'
                    : (selectedVoiceName === 'male_studio'
                        ? '🎙️ Locutor Masculino em altíssima qualidade com voz aveludada e realista de audiolivro.'
                        : (selectedVoiceName.toLowerCase().includes('antonio') 
                            ? '⭐ Voz oficial da Microsoft Edge com inteligência artificial neural.' 
                            : '🎙️ Locução límpida do sistema.'))}
                </p>
              </div>
            )}

            {/* Narrator Pacing (Speed) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
                <span style={{ fontWeight: 600 }}>Cadência / Ritmo da Narração:</span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>{narratorSpeed}x</span>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {[0.85, 0.96, 1.05, 1.2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.35rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: narratorSpeed === speed ? 800 : 500,
                      background: narratorSpeed === speed ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.06)',
                      border: narratorSpeed === speed ? '1px solid #a78bfa' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {speed === 0.96 ? 'Ideal' : `${speed}x`}
                  </button>
                ))}
              </div>
            </div>

            {/* Timbre / Tone (Pitch) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
                <span style={{ fontWeight: 600 }}>Timbre de Voz (Entonação):</span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                  {narratorPitch >= 0.98 ? 'Voz Natural Humana' : (narratorPitch >= 0.9 ? 'Radialista' : 'Grave')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                {[
                  { label: '⭐ Natural (1.0)', val: 1.0 },
                  { label: '🎙️ Radialista (0.92)', val: 0.92 },
                  { label: '📻 Grave (0.85)', val: 0.85 }
                ].map(item => (
                  <button
                    key={item.val}
                    onClick={() => handlePitchChange(item.val)}
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.35rem',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      fontWeight: Math.abs(narratorPitch - item.val) < 0.04 ? 800 : 500,
                      background: Math.abs(narratorPitch - item.val) < 0.04 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255, 255, 255, 0.06)',
                      border: Math.abs(narratorPitch - item.val) < 0.04 ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: Math.abs(narratorPitch - item.val) < 0.04 ? '#090a10' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão de Fechar e Salvar */}
            <button
              onClick={() => setIsNarratorSettingsOpen(false)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#090a10',
                fontWeight: 800,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '0.4rem',
                boxShadow: '0 4px 18px rgba(245, 158, 11, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Concluir e Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
