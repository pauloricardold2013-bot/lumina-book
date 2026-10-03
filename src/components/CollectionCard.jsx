import React, { useState } from 'react';
import { Folder, FolderOpen, Layers, BookOpen, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { sfx } from '../utils/audio';

export default function CollectionCard({ collection, books = [], onOpenFolder }) {
  const [isHovered, setIsHovered] = useState(false);
  const count = books.length;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        sfx.playChime();
        onOpenFolder(collection);
      }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Folder Back Tab */}
      <div style={{
        position: 'relative',
        width: '140px',
        height: '24px',
        background: isHovered 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(99, 102, 241, 0.8))'
          : 'linear-gradient(135deg, rgba(30, 35, 55, 0.95), rgba(20, 24, 40, 0.95))',
        borderTopLeftRadius: '14px',
        borderTopRightRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderBottom: 'none',
        marginLeft: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0 0.8rem',
        fontSize: '0.72rem',
        fontWeight: 700,
        color: isHovered ? '#ffffff' : '#a78bfa',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease'
      }}>
        {isHovered ? <FolderOpen size={14} /> : <Folder size={14} />}
        <span>Pasta</span>
      </div>

      {/* Main Folder Body */}
      <div style={{
        position: 'relative',
        borderRadius: '22px',
        background: 'linear-gradient(135deg, rgba(20, 24, 42, 0.9) 0%, rgba(13, 16, 30, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        border: isHovered 
          ? '1px solid rgba(139, 92, 246, 0.5)' 
          : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered
          ? '0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.3)'
          : '0 12px 30px rgba(0, 0, 0, 0.5)',
        padding: '1.75rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {/* Glow Accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${collection.themeColor || '#8b5cf6'}25 0%, transparent 70%)`,
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }} />

        {/* Top Details & Previews */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          {/* Stacked Book Covers Preview */}
          <div style={{
            position: 'relative',
            width: '90px',
            height: '120px',
            flexShrink: 0
          }}>
            {/* Secondary back card */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '10px',
              width: '80px',
              height: '110px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              transform: isHovered ? 'rotate(8deg)' : 'rotate(4deg)',
              transition: 'transform 0.3s ease',
              border: '1px solid rgba(255,255,255,0.1)'
            }} />

            {/* Main Cover */}
            <div style={{
              position: 'relative',
              width: '85px',
              height: '118px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              <img
                src={collection.coverUrl || './covers/reino_magico.jpg'}
                alt={collection.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Collection Metadata */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Genre Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: '0.45rem'
            }}>
              <Sparkles size={12} />
              {collection.genre || 'Coleção'}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.3,
              marginBottom: '0.3rem'
            }}>
              {collection.name}
            </h3>

            <p style={{ fontSize: '0.82rem', color: '#c4b5fd', fontWeight: 600, marginBottom: '0.45rem' }}>
              Por {collection.author || 'Paulo Ricardo Cordova'}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}>
              <Layers size={14} color="#a78bfa" />
              <span><b>{count}</b> {count === 1 ? 'Volume / Livro' : 'Volumes / Livros'}</span>
            </div>
          </div>
        </div>

        {/* Description snippet */}
        <p style={{
          fontSize: '0.85rem',
          lineHeight: 1.55,
          color: '#94a3b8',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {collection.description}
        </p>

        {/* Footer Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          paddingTop: '0.85rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: isHovered ? '#f59e0b' : '#a78bfa',
          transition: 'color 0.2s ease'
        }}>
          <span>Explorar Obras da Pasta</span>
          <ChevronRight size={16} style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s ease' }} />
        </div>
      </div>
    </div>
  );
}
