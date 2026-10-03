import React, { useState } from 'react';
import { Play, BookOpen, Layers, Edit2, Trash2, Info, Eye } from 'lucide-react';
import { sfx } from '../utils/audio';

export default function BookCard({ book, onRead, onEdit, onDelete, onDetails, progress = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        background: 'rgba(18, 20, 32, 0.75)',
        backdropFilter: 'blur(12px)',
        border: isHovered ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered 
          ? '0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(139, 92, 246, 0.25)' 
          : '0 8px 25px rgba(0, 0, 0, 0.4)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Cover Visual */}
      <div 
        style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          backgroundColor: '#121420',
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
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop';
          }}
        />

        {/* Gradient shadow over image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(18, 20, 32, 1) 0%, rgba(18, 20, 32, 0.2) 60%, transparent 100%)'
        }} />

        {/* Category Pill */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(9, 10, 16, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '0.3rem 0.65rem',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#fbbf24',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {book.category || 'Geral'}
        </div>

        {/* Slide Count Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(139, 92, 246, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.3rem 0.65rem',
          borderRadius: '999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <Layers size={13} />
          {book.slides?.length || 0} slides
        </div>

        {/* Hover Read Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(9, 10, 16, 0.45)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.7)'
          }}>
            <Play size={22} fill="#090a10" color="#090a10" style={{ marginLeft: '3px' }} />
          </div>
        </div>
      </div>

      {/* Book Content */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <h3 
          onClick={() => onDetails(book)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.35rem',
            lineHeight: 1.3,
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#f59e0b'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
        >
          {book.title}
        </h3>

        <p style={{
          fontSize: '0.85rem',
          color: '#a78bfa',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          {book.author}
        </p>

        <p style={{
          fontSize: '0.85rem',
          lineHeight: 1.5,
          color: 'var(--text-muted)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '1rem',
          flex: 1
        }}>
          {book.synopsis}
        </p>

        {/* Progress Bar (if reading) */}
        {progress > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              marginBottom: '0.25rem'
            }}>
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8b5cf6, #f59e0b)',
                borderRadius: '999px'
              }} />
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '0.85rem'
        }}>
          <button
            onClick={() => {
              sfx.playChime();
              onRead(book);
            }}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 100%)',
              color: '#d8b4fe',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              padding: '0.55rem 0.8rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 100%)';
              e.currentTarget.style.color = '#d8b4fe';
            }}
          >
            <Play size={14} fill="currentColor" />
            Ler Slides
          </button>

          <button
            onClick={() => onDetails(book)}
            title="Sinopse e Informações"
            style={{
              padding: '0.55rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Info size={16} />
          </button>

          {onEdit && (
            <button
              onClick={() => onEdit(book)}
              title="Editar livro e slides no painel"
              style={{
                padding: '0.55rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f59e0b'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Edit2 size={16} />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              title="Excluir livro"
              style={{
                padding: '0.55rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(244, 63, 94, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f43f5e'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244, 63, 94, 0.7)'}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
