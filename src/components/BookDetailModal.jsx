import React from 'react';
import { X, Play, BookOpen, Layers, Clock, Sparkles, Edit, Calendar, Home, ChevronLeft, Eye } from 'lucide-react';
import { sfx } from '../utils/audio';
import { getActiveReaders } from '../utils/readsTracker';

export default function BookDetailModal({ book, isOpen, onClose, onGoHome, onRead, onEdit, readsCount }) {
  if (!isOpen || !book) return null;
  const actualReads = readsCount !== undefined ? readsCount : (book.views || 140);
  const activeReaders = getActiveReaders(book.id);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      backgroundColor: 'rgba(9, 10, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        backgroundColor: '#101322',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 92, 246, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)',
          gap: '0.65rem'
        }}>
          {/* Left: Voltar & Casinha & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => {
                sfx.playFlip();
                onClose();
              }}
              title="Voltar à tela anterior"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.75rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
              <span>Voltar</span>
            </button>

            <button
              onClick={() => {
                sfx.playChime();
                if (onGoHome) onGoHome();
                else onClose();
              }}
              title="Página Principal (Início)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem 0.6rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(245, 158, 11, 0.2))',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                color: '#fbbf24',
                cursor: 'pointer'
              }}
            >
              <Home size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginLeft: '0.35rem' }}>
              <BookOpen size={18} color="#f59e0b" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                Detalhes da Obra
              </span>
            </div>
          </div>

          {/* Right: Close X button */}
          <button
            onClick={onClose}
            title="Fechar"
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div 
          className="book-detail-grid"
          style={{
            padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.75rem)',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '2rem'
          }}
        >
          {/* Left Column: Cover & Quick Buttons */}
          <div className="book-detail-cover-col">
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.25rem'
            }}>
              <img
                src={book.coverUrl || './covers/reino_magico.jpg'}
                alt={book.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <button
              onClick={() => {
                sfx.playChime();
                onRead(book);
                onClose();
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#090a10',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Play size={18} fill="#090a10" />
              Apresentar Slides
            </button>
          </div>

          {/* Right Column: Title, Synopsis, Contracapa, Index */}
          <div>
            <div style={{
              display: 'inline-block',
              padding: '0.3rem 0.7rem',
              borderRadius: '999px',
              background: 'rgba(139, 92, 246, 0.2)',
              color: '#c4b5fd',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              {book.category}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '0.35rem'
            }}>
              {book.title}
            </h2>

            <p style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 600, marginBottom: '0.85rem' }}>
              Autor: {book.author}
            </p>

            {/* Painel de Leitores e Acessos */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Eye size={17} color="#38bdf8" />
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Total de Acessos
                  </div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff' }}>
                    {actualReads.toLocaleString('pt-BR')} leituras
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)', height: '26px' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#4ade80', textTransform: 'uppercase', fontWeight: 700 }}>
                    Ao Vivo Agora
                  </div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff' }}>
                    {activeReaders} lendo
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)', height: '26px' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Layers size={16} color="#c4b5fd" />
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Extensão
                  </div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#ffffff' }}>
                    {book.slides?.length || 0} slides
                  </div>
                </div>
              </div>
            </div>

            {/* Dedication box */}
            {book.dedication && (
              <div style={{
                background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                borderRadius: '12px',
                padding: '0.85rem 1.1rem',
                marginBottom: '1.25rem',
                color: '#fbcfe8',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <Sparkles size={16} color="#ec4899" />
                <span>{book.dedication}</span>
              </div>
            )}

            {/* Synopsis */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                Sinopse
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#e2e8f0' }}>
                {book.synopsis}
              </p>
            </div>

            {/* Contracapa (Back cover text) */}
            {book.backCoverText && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '1.2rem',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                  📜 Texto da Contracapa
                </h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: '#cbd5e1', whiteSpace: 'pre-line' }}>
                  {book.backCoverText}
                </p>
              </div>
            )}

            {/* Chapters / Slides list */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                Índice de Slides ({book.slides?.length || 0})
              </h4>
              <div style={{
                maxHeight: '180px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                paddingRight: '0.5rem'
              }}>
                {book.slides?.map((slide, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => {
                      sfx.playChime();
                      onRead(book, sIdx);
                      onClose();
                    }}
                    style={{
                      padding: '0.6rem 0.85rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#f1f5f9' }}>
                      {slide.title || `Slide ${sIdx + 1}`}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#a78bfa' }}>
                      Slide {sIdx + 1} →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
