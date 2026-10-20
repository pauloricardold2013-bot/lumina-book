import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LibraryView from './components/LibraryView';
import SlideReader from './components/SlideReader';
import BookDetailModal from './components/BookDetailModal';
import DonationModal from './components/DonationModal';
import ParticleBackground from './components/ParticleBackground';
import { DEFAULT_BOOKS, DEFAULT_COLLECTIONS } from './data/defaultBooks';
import { Heart } from 'lucide-react';

const BOOKS_STORAGE_KEY = 'lumina_books_db_v8';
const COLLECTIONS_STORAGE_KEY = 'lumina_collections_db_v8';
const PROGRESS_STORAGE_KEY = 'lumina_reading_progress_v7';

export default function App() {
  // Collections state
  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem(COLLECTIONS_STORAGE_KEY) || localStorage.getItem('lumina_collections_db_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading collections:', e);
    }
    return DEFAULT_COLLECTIONS;
  });

  // Books state persisted in localStorage
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKS_STORAGE_KEY) || localStorage.getItem('lumina_books_db_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const loaded = parsed.map(b => {
            let bookObj = { ...b };
            // Remove dedication if related to Pisa
            if (bookObj.dedication && /pisa/i.test(bookObj.dedication)) {
              delete bookObj.dedication;
            }
            if (Array.isArray(bookObj.slides)) {
              bookObj.slides = bookObj.slides.filter(s => s.type !== 'dedication' && (!s.content || !/pisa/i.test(s.content)));
            }

            if (bookObj.id === 'reino-magico-jhully-vol2' || bookObj.id === 'cronicas-do-cosmos-vol2') {
              return {
                ...bookObj,
                category: bookObj.id === 'cronicas-do-cosmos-vol2' ? 'Ficção Científica' : bookObj.category,
                title: bookObj.title.replace(/Livro 2/gi, 'Prólogo'),
                slides: (bookObj.slides || []).map(s => ({
                  ...s,
                  subtitle: s.subtitle ? s.subtitle.replace(/Volume 2|Livro 2/gi, 'Prólogo') : s.subtitle,
                  badge: s.badge === 'Volume 2' ? 'Prólogo' : s.badge
                }))
              };
            }
            return bookObj;
          });

          // Ensure any newly added books from DEFAULT_BOOKS exist in the list
          DEFAULT_BOOKS.forEach(defBook => {
            if (!loaded.some(b => b.id === defBook.id)) {
              loaded.push(defBook);
            }
          });

          return loaded;
        }
      }
    } catch (e) {
      console.error('Error loading saved books:', e);
    }
    return DEFAULT_BOOKS;
  });

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return {};
  });

  // Navigation & Modals state
  const [readingBook, setReadingBook] = useState(null);
  const [startSlideIndex, setStartSlideIndex] = useState(0);
  const [detailsBook, setDetailsBook] = useState(null);
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    } catch (e) {
      console.error('Error saving books:', e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
    } catch (e) {
      console.error('Error saving collections:', e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(readingProgress));
    } catch (e) {
      console.error('Error saving reading progress:', e);
    }
  }, [readingProgress]);

  const handleSaveProgress = (bookId, pct, slideIdx) => {
    setReadingProgress(prev => ({
      ...prev,
      [bookId]: { pct, slideIdx, lastRead: new Date().toISOString() }
    }));
  };

  const handleOpenReader = (book, slideIdx = 0) => {
    setReadingBook(book);
    setStartSlideIndex(slideIdx);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Background Animated Stardust */}
      <ParticleBackground intensity="subtle" />

      {/* Top Main Navigation */}
      <Navbar
        onOpenDonate={() => setIsDonationOpen(true)}
        booksCount={books.length}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        <LibraryView
          books={books}
          collections={collections}
          readingProgress={readingProgress}
          onReadBook={(book, slideIdx = 0) => handleOpenReader(book, slideIdx)}
          onOpenDetails={(book) => setDetailsBook(book)}
        />
      </main>

      {/* Modals & Overlays */}
      {/* 1. Slide Presentation Reader */}
      {readingBook && (
        <SlideReader
          book={readingBook}
          initialSlide={startSlideIndex}
          onClose={() => setReadingBook(null)}
          onSaveProgress={handleSaveProgress}
        />
      )}

      {/* 2. Book Detail Synopsis Modal */}
      <BookDetailModal
        book={detailsBook}
        isOpen={Boolean(detailsBook)}
        onClose={() => setDetailsBook(null)}
        onRead={(book, slideIdx = 0) => handleOpenReader(book, slideIdx)}
      />

      {/* 3. Donation Pix Modal */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(9, 10, 16, 0.95)',
        padding: '2.5rem 1.5rem',
        marginTop: 'auto',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.4rem'
          }}>
            LUMINA <span style={{ color: '#f59e0b' }}>BOOK</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Plataforma interativa para leitura e apresentação de livros em slides com organização por pastas de coleções.
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <button
              onClick={() => setIsDonationOpen(true)}
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(236, 72, 153, 0.2))',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b, #ec4899)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(236, 72, 153, 0.2))';
                e.currentTarget.style.color = '#fbbf24';
              }}
            >
              <Heart size={15} fill="currentColor" />
              Apoiar o Autor via Pix
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Coleções oficiais: <b style={{ color: '#c4b5fd' }}>O Reino Mágico de Jhully</b> e <b style={{ color: '#93c5fd' }}>Crônicas do Cosmos e o Relógio Estelar</b> por Paulo Ricardo Cordova
          </div>
        </div>
      </footer>
    </div>
  );
}
