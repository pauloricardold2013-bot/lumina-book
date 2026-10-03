import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Upload, Plus, Folder } from 'lucide-react';
import { sfx } from '../utils/audio';
import { GENRES } from '../data/defaultBooks';

const COVER_PRESETS = [
  { name: 'Fantasia Dourada', url: '/covers/reino_magico.jpg' },
  { name: 'Cosmos & Estrelas', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop' },
  { name: 'Floresta Ancestral', url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop' },
  { name: 'Mistério Noturno', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' }
];

export default function CreateBookModal({ isOpen, onClose, onCreateBook, collections = [] }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Paulo Ricardo Cordova');
  const [collectionId, setCollectionId] = useState(collections[0]?.id || '');
  const [category, setCategory] = useState(GENRES[0]);
  const [synopsis, setSynopsis] = useState('');
  const [coverUrl, setCoverUrl] = useState(COVER_PRESETS[0].url);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, digite o título do livro.');
      return;
    }

    const newBook = {
      id: 'livro-' + Date.now(),
      collectionId: collectionId || null,
      title: title.trim(),
      author: author.trim() || 'Paulo Ricardo Cordova',
      category: category,
      tags: [category],
      coverUrl: coverUrl || COVER_PRESETS[0].url,
      themeColor: '#8b5cf6',
      synopsis: synopsis.trim() || 'Um novo livro com apresentação interativa em slides.',
      backCoverText: synopsis.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      views: 1,
      slides: [
        {
          id: 'slide-1',
          type: 'cover',
          title: title.trim(),
          subtitle: `Por ${author.trim()}`,
          content: synopsis.trim() || 'Apresentação em slides interativos.',
          imageUrl: coverUrl,
          badge: 'Edição Digital'
        },
        {
          id: 'slide-2',
          type: 'chapter',
          title: '📖 Capítulo 1 – O Início',
          content: 'Escreva o primeiro capítulo da sua obra ou importe o texto completo através do painel inteligente.',
          badge: 'Capítulo 1'
        }
      ]
    };

    sfx.playChime();
    onCreateBook(newBook);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 70,
      backgroundColor: 'rgba(9, 10, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        backgroundColor: '#101322',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 92, 246, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Plus size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#fff', fontSize: '1.15rem' }}>
                Novo Livro em Slides
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Adicione à sua biblioteca ou a uma pasta de coleção
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '0.45rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              Título do Livro *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O Reino Mágico de Jhully – Volume 2..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Collection Folder & Genre */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Folder size={14} />
                Guardar na Pasta / Coleção:
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121420',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '10px',
                  padding: '0.65rem 0.9rem',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">Sem Pasta (Obra Avulsa)</option>
                {collections.map(col => (
                  <option key={col.id} value={col.id}>
                    📁 {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                Gênero Literário
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121420',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '0.65rem 0.9rem',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              >
                {GENRES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              Autor
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '0.65rem 0.9rem',
                color: '#ffffff',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              Sinopse do Livro
            </label>
            <textarea
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Descreva brevemente o enredo da sua história..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                color: '#ffffff',
                fontSize: '0.9rem',
                resize: 'none'
              }}
            />
          </div>

          {/* Cover Presets or Upload */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
              Arte da Capa
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {COVER_PRESETS.map((preset, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => setCoverUrl(preset.url)}
                  style={{
                    position: 'relative',
                    aspectRatio: '3/4',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: coverUrl === preset.url ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: coverUrl === preset.url ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none'
                  }}
                >
                  <img src={preset.url} alt={preset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.7)',
                    padding: '2px 4px',
                    fontSize: '0.65rem',
                    textAlign: 'center',
                    color: '#fff'
                  }}>
                    {preset.name}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <label style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.6rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: '#cbd5e1',
                cursor: 'pointer'
              }}>
                <Upload size={14} />
                Upload do Computador
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>

              <input
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="Ou link de imagem..."
                style={{
                  flex: 1.5,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: '#ffffff',
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.25rem',
            marginTop: '0.5rem'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                color: '#ffffff',
                padding: '0.7rem 1.8rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
              }}
            >
              <Sparkles size={18} />
              Criar Livro & Abrir Painel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
