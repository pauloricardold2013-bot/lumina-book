import React, { useState } from 'react';
import { Play, Sparkles, BookOpen, Clock, Layers, Flame, Info, Edit3 } from 'lucide-react';
import { sfx } from '../utils/audio';

export default function HeroBanner({ book, onRead, onOpenDetails, onEdit }) {
  if (!book) return null;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const readingTime = Math.ceil(
    book.slides.reduce((acc, s) => acc + (s.content ? s.content.split(/\s+/).length : 0), 0) / 180
  );

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-card">
        {/* Ambient backglow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        {/* Left Column: Details */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.2rem'
          }}>
            <Flame size={15} color="#f59e0b" />
            Livro em Destaque Especial
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '0.75rem',
            letterSpacing: '-0.5px'
          }}>
            {book.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '1rem',
              color: '#c4b5fd',
              fontWeight: 600
            }}>
              Por {book.author}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <span style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.06)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px'
            }}>
              {book.category}
            </span>
          </div>

          {/* Dedication Banner */}
          {book.dedication && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(236, 72, 153, 0.35)',
              color: '#fbcfe8',
              fontSize: '0.88rem',
              fontWeight: 600,
              fontStyle: 'italic',
              marginBottom: '1.4rem',
              boxShadow: '0 4px 15px rgba(236, 72, 153, 0.15)'
            }}>
              <Sparkles size={16} color="#ec4899" />
              <span>{book.dedication}</span>
            </div>
          )}

          <p style={{
            fontSize: '1.02rem',
            lineHeight: 1.65,
            color: '#cbd5e1',
            marginBottom: '1.8rem',
            fontFamily: 'var(--font-sans)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {book.synopsis}
          </p>

          {/* Quick Metrics */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#a78bfa" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                  {book.slides?.length || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Slides / Páginas</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                  ~{readingTime || 5} min
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tempo estimado</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#38bdf8" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                  Interativo
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Slides & Narração</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                sfx.playChime();
                onRead(book);
              }}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#090a10',
                padding: '0.85rem 1.8rem',
                borderRadius: '14px',
                fontSize: '1rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.45)',
                transform: 'translateY(0)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Play size={20} fill="#090a10" />
              Ler Livro em Slides
            </button>

            <button
              onClick={() => onOpenDetails(book)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                padding: '0.85rem 1.4rem',
                borderRadius: '14px',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              <Info size={18} />
              Sinopse & Capítulos
            </button>
          </div>
        </div>

        {/* Right Column: 3D Book Presentation */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0, y: 0 });
          }}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1200px'
          }}
        >
          <div style={{
            position: 'relative',
            width: 'clamp(210px, 50vw, 270px)',
            height: 'clamp(290px, 70vw, 380px)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: isHovered 
              ? '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(139, 92, 246, 0.5)'
              : '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(139, 92, 246, 0.25)',
            transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale(${isHovered ? 1.04 : 1})`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer'
          }}
          onClick={() => {
            sfx.playChime();
            onRead(book);
          }}
          >
            <img
              src={book.coverUrl || './covers/reino_magico.jpg'}
              alt={book.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Glowing spine illusion */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '14px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 100%)',
              borderRight: '1px solid rgba(0,0,0,0.3)'
            }} />

            {/* Hover overlay hint */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(9, 10, 16, 0.6)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              backdropFilter: 'blur(3px)'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px #f59e0b'
              }}>
                <Play size={24} fill="#090a10" color="#090a10" style={{ marginLeft: '3px' }} />
              </div>
              <span style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px'
              }}>
                Clique para Apresentar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
