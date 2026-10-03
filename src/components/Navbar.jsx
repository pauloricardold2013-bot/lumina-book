import React from 'react';
import { BookOpen, Compass, Heart } from 'lucide-react';
import { sfx } from '../utils/audio';

export default function Navbar({ onOpenDonate, booksCount = 0 }) {
  const handleScrollToTop = () => {
    sfx.playFlip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      padding: '0.75rem clamp(0.75rem, 3vw, 1.5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem'
    }}>
      {/* Brand */}
      <div 
        onClick={handleScrollToTop} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          cursor: 'pointer',
          userSelect: 'none',
          minWidth: 0
        }}
      >
        <div style={{
          width: 'clamp(36px, 9vw, 42px)',
          height: 'clamp(36px, 9vw, 42px)',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
          flexShrink: 0
        }}>
          <BookOpen size={20} color="#ffffff" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
            fontWeight: 800,
            letterSpacing: '0.8px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            whiteSpace: 'nowrap'
          }}>
            LUMINA <span style={{ color: '#f59e0b', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>BOOK</span>
          </div>
          <p 
            className="navbar-subtitle"
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
              letterSpacing: '0.4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Plataforma Literária
          </p>
        </div>
      </div>

      {/* Right Navigation & CTA Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 2vw, 0.75rem)' }}>
        {/* Nav Link */}
        <button
          onClick={handleScrollToTop}
          style={{
            padding: '0.5rem clamp(0.6rem, 2vw, 1rem)',
            borderRadius: '999px',
            fontSize: '0.84rem',
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
            fontSize: '0.7rem',
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
            padding: '0.55rem clamp(0.9rem, 2.5vw, 1.4rem)',
            borderRadius: '999px',
            fontSize: 'clamp(0.85rem, 2.5vw, 0.92rem)',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
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
          <Heart size={16} fill="#ffffff" color="#ffffff" />
          Doar
        </button>
      </div>
    </header>
  );
}
