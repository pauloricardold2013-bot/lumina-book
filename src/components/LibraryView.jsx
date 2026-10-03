import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Folder, 
  Layers, 
  ChevronLeft,
  Flame,
  Compass,
  ArrowRight
} from 'lucide-react';
import BookCard from './BookCard';
import CollectionCard from './CollectionCard';
import { GENRES } from '../data/defaultBooks';
import { sfx } from '../utils/audio';

export default function LibraryView({ 
  books, 
  collections = [],
  onReadBook, 
  onOpenDetails, 
  readingProgress = {} 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [activeFolder, setActiveFolder] = useState(null); // active collection object or null
  const [openingBookId, setOpeningBookId] = useState(null);

  // List of all genres + "Todos"
  const allGenres = ['Todos', ...GENRES];

  // Filter books based on search, selected genre and active folder
  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchSearch = 
        b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.synopsis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const col = collections.find(c => c.id === b.collectionId);
      const matchGenre = selectedGenre === 'Todos' || 
                         b.category === selectedGenre || 
                         col?.genre === selectedGenre ||
                         (b.tags && b.tags.includes(selectedGenre));

      const matchFolder = !activeFolder || b.collectionId === activeFolder.id;

      return matchSearch && matchGenre && matchFolder;
    });
  }, [books, collections, searchTerm, selectedGenre, activeFolder]);

  // Filter collections based on search and genre
  const filteredCollections = useMemo(() => {
    return collections.filter(c => {
      const matchSearch = 
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.genre?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const colBooks = books.filter(b => b.collectionId === c.id);
      const hasBookWithGenre = colBooks.some(b => b.category === selectedGenre || (b.tags && b.tags.includes(selectedGenre)));
      const matchGenre = selectedGenre === 'Todos' || c.genre === selectedGenre || hasBookWithGenre;

      return matchSearch && matchGenre;
    });
  }, [collections, books, searchTerm, selectedGenre]);

  // Handle clicking a book with a cinematic opening effect
  const handleCinematicOpen = (book, slideIdx = 0) => {
    setOpeningBookId(book.id);
    sfx.playChime();
    setTimeout(() => {
      onReadBook(book, slideIdx);
      setOpeningBookId(null);
    }, 450);
  };

  return (
    <div style={{ minHeight: '80vh', position: 'relative' }}>
      {/* Fullscreen Cinematic Opening Flash / Curtain when a book is clicked */}
      {openingBookId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(9, 10, 16, 0.95) 70%)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          animation: 'bookOpenCinematic 0.5s ease-out forwards'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px #f59e0b'
          }}>
            <BookOpen size={40} color="#090a10" />
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '1px'
          }}>
            Abrindo Livro em Modo Cinemático...
          </div>
        </div>
      )}

      {/* Main Container */}
      <section style={{
        maxWidth: '1240px',
        margin: '1.5rem auto 5rem auto',
        padding: '0 clamp(0.85rem, 3vw, 1.5rem)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* If INSIDE a folder: Folder Banner & Navigation */}
        {activeFolder ? (
          <div 
            className="folder-banner-responsive"
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(28, 22, 54, 0.85) 0%, rgba(13, 16, 30, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 35px rgba(139, 92, 246, 0.15)',
              padding: 'clamp(1.25rem, 3vw, 2.5rem)',
              marginBottom: '2rem'
            }}
          >
            {/* Back button */}
            <button
              onClick={() => {
                sfx.playFlip();
                setActiveFolder(null);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#cbd5e1'; }}
            >
              <ChevronLeft size={18} />
              Voltar para Todas as Pastas das Coleções
            </button>

            <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2.5rem)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                width: 'clamp(100px, 25vw, 140px)',
                height: 'clamp(140px, 35vw, 190px)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 0 25px rgba(245, 158, 11, 0.25)',
                border: '2px solid rgba(245, 158, 11, 0.4)',
                flexShrink: 0
              }}>
                <img
                  src={activeFolder.coverUrl || './covers/reino_magico_oficial_jhully.jpg'}
                  alt={activeFolder.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 'min(100%, 260px)' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '999px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.65rem'
                }}>
                  <Folder size={14} />
                  Pasta da Coleção • {activeFolder.genre}
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  lineHeight: 1.2
                }}>
                  {activeFolder.name}
                </h1>

                <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '800px' }}>
                  {activeFolder.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.88rem', color: '#c4b5fd', fontWeight: 600 }}>
                    Autor: {activeFolder.author || 'Paulo Ricardo Cordova'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <b>{filteredBooks.length}</b> {filteredBooks.length === 1 ? 'Volume disponível' : 'Volumes disponíveis'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Top Header for Collections View */
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1.5rem'
          }}>
            <div style={{ minWidth: 0, flex: '1 1 300px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#c4b5fd',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '0.75rem'
              }}>
                <Folder size={14} color="#a78bfa" />
                Biblioteca Literária em Pastas
              </div>

              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '0.4rem',
                letterSpacing: '-0.5px'
              }}>
                Pastas das Coleções
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Clique em uma pasta para abrir e ler seus livros com apresentação em slides cinemáticos.
              </p>
            </div>

            {/* Search Input */}
            <div style={{
              position: 'relative',
              minWidth: 'clamp(200px, 45vw, 340px)',
              maxWidth: '380px',
              flex: '1 1 auto'
            }}>
              <Search 
                size={18} 
                color="var(--text-muted)" 
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por coleção, obra, autor..."
                style={{
                  width: '100%',
                  background: 'rgba(18, 20, 32, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
          </div>
        )}

        {/* GENRE FILTER BAR (Always available for instant filtering) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Filter size={13} />
            Filtrar por Gênero Literário:
          </div>

          <div 
            className="touch-scroll-x"
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.6rem'
            }}
          >
            {allGenres.map((genre) => {
              const isSelected = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => {
                    sfx.playFlip();
                    setSelectedGenre(genre);
                    setActiveFolder(null);
                  }}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 800 : 500,
                    background: isSelected 
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#090a10' : 'var(--text-muted)',
                    border: isSelected 
                      ? '1px solid rgba(245, 158, 11, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(245, 158, 11, 0.35)' : 'none'
                  }}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT DISPLAY */}
        {/* CASE 1: INSIDE A FOLDER -> Show books of this collection */}
        {activeFolder ? (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <BookOpen size={20} color="#f59e0b" />
                Obras Desta Coleção
              </h2>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Clique em <b>"Ler Slides"</b> para abrir a apresentação
              </span>
            </div>

            {filteredBooks.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1.25rem, 2.5vw, 2.5rem)'
              }}>
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    progress={readingProgress[book.id]?.pct || 0}
                    onRead={(b) => handleCinematicOpen(b, 0)}
                    onDetails={onOpenDetails}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(18, 20, 32, 0.5)',
                borderRadius: '20px',
                border: '1px dashed rgba(255, 255, 255, 0.1)'
              }}>
                <BookOpen size={48} color="#64748b" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  Nenhum livro encontrado nesta pasta
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Novos volumes desta coleção serão adicionados em breve pelo autor.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* CASE 2: MAIN HOME VIEW -> Show Collection Folders AND Books for the selected genre */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {/* Section 1: Pastas das Coleções */}
            {filteredCollections.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}>
                    <Folder size={22} color="#a78bfa" />
                    Pastas das Coleções {selectedGenre !== 'Todos' ? `• ${selectedGenre}` : ''}
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <b>{filteredCollections.length}</b> {filteredCollections.length === 1 ? 'pasta disponível' : 'pastas disponíveis'}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(1.25rem, 2.5vw, 2.5rem)'
                }}>
                  {filteredCollections.map((col) => {
                    const colBooks = books.filter(b => b.collectionId === col.id);
                    return (
                      <CollectionCard
                        key={col.id}
                        collection={col}
                        books={colBooks}
                        onOpenFolder={(c) => {
                          sfx.playChime();
                          setActiveFolder(c);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section 2: Todos os Livros do Gênero */}
            {filteredBooks.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.75rem',
                  borderTop: filteredCollections.length > 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  paddingTop: filteredCollections.length > 0 ? '2.5rem' : '0',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}>
                      <BookOpen size={22} color="#f59e0b" />
                      {selectedGenre !== 'Todos' ? `Livros em ${selectedGenre}` : 'Todos os Livros da Biblioteca'}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Clique em <b>"Ler Slides"</b> para abrir e iniciar a leitura diretamente.
                    </p>
                  </div>

                  <span style={{ fontSize: '0.85rem', color: '#c4b5fd', fontWeight: 600 }}>
                    <b>{filteredBooks.length}</b> {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: 'clamp(1.25rem, 2.5vw, 2.5rem)'
                }}>
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      progress={readingProgress[book.id]?.pct || 0}
                      onRead={(b) => handleCinematicOpen(b, 0)}
                      onDetails={onOpenDetails}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State when neither collections nor books match */}
            {filteredCollections.length === 0 && filteredBooks.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(18, 20, 32, 0.5)',
                borderRadius: '20px',
                border: '1px dashed rgba(255, 255, 255, 0.1)'
              }}>
                <Folder size={48} color="#64748b" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  Nenhuma pasta ou livro encontrado em "{selectedGenre}"
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Tente selecionar outro gênero literário acima para ver os livros e coleções disponíveis.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
