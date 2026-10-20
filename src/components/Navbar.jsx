import React from 'react';
import { BookOpen, Compass, Heart, Home, ChevronLeft } from 'lucide-react';
import { sfx } from '../utils/audio';

export default function Navbar({ onOpenDonate, booksCount = 0, onGoBack, onGoHome, canGoBack = false }) {
  const handleScrollToTop = () => {
    sfx.playFlip();
    if (onGoHome) {
      onGoHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(9, 10, 16, 0.88)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.65rem clamp(0.6rem, 2.5vw, 1.25rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.65rem'
    }}>
      {/* Brand & Left Quick Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
        {/* Mobile / Tablet Voltar Button (se puder voltar de uma pasta/aba) */}
        {canGoBack && (
          <button
            onClick={() => {
              sfx.playFlip();
              if (onGoBack) onGoBack();
            }}
            title="Voltar à tela ou aba anterior"
            className="navbar-back-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.42rem clamp(0.5rem, 1.8vw, 0.8rem)',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontSize: 'clamp(0.78rem, 2vw, 0.84rem)',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <ChevronLeft size={17} />
            <span className="navbar-back-label">Voltar</span>
          </button>
        )}

        {/* Botão Casinha (Ir para a Página Principal) */}
        <button
          onClick={() => {
            sfx.playChime();
            if (onGoHome) onGoHome();
            else handleScrollToTop();
          }}
          title="Página Principal (Início)"
          className="navbar-home-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.42rem clamp(0.55rem, 1.8vw, 0.8rem)',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(245, 158, 11, 0.2))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
            fontSize: 'clamp(0.78rem, 2vw, 0.84rem)',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = '#f59e0b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
          }}
        >
          <Home size={17} />
          <span className="navbar-home-label">Início</span>
        </button>

        {/* Brand Logo & Name */}
        <div 
          onClick={handleScrollToTop} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            cursor: 'pointer',
            userSelect: 'none',
            minWidth: 0
          }}
        >
          <div style={{
            width: 'clamp(32px, 8vw, 38px)',
            height: 'clamp(32px, 8vw, 38px)',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',
            flexShrink: 0
          }}>
            <BookOpen size={18} color="#ffffff" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              fontWeight: 800,
              letterSpacing: '0.6px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              whiteSpace: 'nowrap'
            }}>
              LUMINA <span style={{ color: '#f59e0b', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)' }}>BOOK</span>
            </div>
            <p 
              className="navbar-subtitle"
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                letterSpacing: '0.3px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: 0
              }}
            >
              Plataforma Literária
            </p>
          </div>
        </div>
      </div>

      {/* Right Navigation & CTA Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.35rem, 1.5vw, 0.65rem)' }}>
        {/* Nav Link */}
        <button
          onClick={handleScrollToTop}
          style={{
            padding: '0.45rem clamp(0.55rem, 1.8vw, 0.85rem)',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          <Compass size={15} color="#c4b5fd" />
          <span className="navbar-btn-text">Biblioteca</span>
          <span style={{
            background: 'rgba(139, 92, 246, 0.3)',
            color: '#c4b5fd',
            padding: '0.1rem 0.45rem',
            borderRadius: '999px',
            fontSize: '0.68rem',
            fontWeight: 700
          }}>
            {booksCount}
          </span>
        </button>

        {/* Action CTA: DOAR */}
        <button
          onClick={onOpenDonate}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
            color: '#ffffff',
            padding: '0.5rem clamp(0.75rem, 2vw, 1.25rem)',
            borderRadius: '999px',
            fontSize: 'clamp(0.82rem, 2vw, 0.9rem)',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 18px rgba(245, 158, 11, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(245, 158, 11, 0.45)';
          }}
        >
          <Heart size={15} fill="#ffffff" color="#ffffff" />
          Doar
        </button>
      </div>
    </header>
  );
}
