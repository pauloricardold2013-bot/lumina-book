import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  FileText, 
  Sparkles, 
  Upload, 
  Download, 
  RefreshCw, 
  Layers, 
  BookOpen, 
  Check, 
  Copy, 
  Eye, 
  Image as ImageIcon,
  Wand2,
  Sliders,
  ChevronRight,
  Folder,
  FolderPlus,
  Compass
} from 'lucide-react';
import { sfx } from '../utils/audio';
import { GENRES } from '../data/defaultBooks';

export default function AdminPanel({ 
  books, 
  collections = [],
  onSaveBook, 
  onDeleteBook, 
  onSaveCollection,
  onDeleteCollection,
  onResetDefaults, 
  onImportBackup,
  onReadSlide
}) {
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'info' | 'bulk' | 'collections'
  const [toastMessage, setToastMessage] = useState('');

  // Bulk import state
  const [bulkText, setBulkText] = useState('');
  const [splitMethod, setSplitMethod] = useState('chapters'); // 'chapters' | 'paragraphs'

  // New collection modal / form state
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [newColGenre, setNewColGenre] = useState(GENRES[0]);
  const [newColCover, setNewColCover] = useState('/covers/reino_magico.jpg');

  const currentBook = books.find(b => b.id === selectedBookId) || books[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Compute stats
  const totalSlides = books.reduce((acc, b) => acc + (b.slides?.length || 0), 0);
  const totalWords = books.reduce((acc, b) => {
    return acc + (b.slides || []).reduce((sAcc, s) => sAcc + (s.content ? s.content.split(/\s+/).filter(Boolean).length : 0), 0);
  }, 0);

  // Update book metadata
  const handleUpdateBookInfo = (field, value) => {
    if (!currentBook) return;
    const updated = { ...currentBook, [field]: value };
    onSaveBook(updated);
  };

  // Image upload handler for cover
  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateBookInfo('coverUrl', reader.result);
        showToast('Capa do livro atualizada!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new slide
  const handleAddSlide = () => {
    if (!currentBook) return;
    const newSlide = {
      id: 'slide-' + Date.now(),
      type: 'chapter',
      title: `📖 Novo Capítulo ${(currentBook.slides?.length || 0) + 1}`,
      content: 'Escreva aqui o conteúdo do novo slide ou capítulo do seu livro...',
      badge: 'Capítulo'
    };
    const updatedSlides = [...(currentBook.slides || []), newSlide];
    onSaveBook({ ...currentBook, slides: updatedSlides });
    sfx.playChime();
    showToast('Novo slide adicionado com sucesso!');
  };

  // Update a single slide
  const handleUpdateSlide = (slideIndex, field, value) => {
    if (!currentBook) return;
    const updatedSlides = [...currentBook.slides];
    updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], [field]: value };
    onSaveBook({ ...currentBook, slides: updatedSlides });
  };

  // Move slide up or down
  const handleMoveSlide = (index, direction) => {
    if (!currentBook) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentBook.slides.length) return;

    const updatedSlides = [...currentBook.slides];
    const temp = updatedSlides[index];
    updatedSlides[index] = updatedSlides[newIndex];
    updatedSlides[newIndex] = temp;

    onSaveBook({ ...currentBook, slides: updatedSlides });
    sfx.playFlip();
  };

  // Duplicate slide
  const handleDuplicateSlide = (index) => {
    if (!currentBook) return;
    const target = currentBook.slides[index];
    const clone = {
      ...target,
      id: 'slide-' + Date.now(),
      title: `${target.title} (Cópia)`
    };
    const updatedSlides = [...currentBook.slides];
    updatedSlides.splice(index + 1, 0, clone);
    onSaveBook({ ...currentBook, slides: updatedSlides });
    sfx.playChime();
    showToast('Slide duplicado!');
  };

  // Delete slide
  const handleDeleteSlide = (index) => {
    if (!currentBook) return;
    if (currentBook.slides.length <= 1) {
      alert('O livro deve conter pelo menos um slide!');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este slide?')) {
      const updatedSlides = currentBook.slides.filter((_, i) => i !== index);
      onSaveBook({ ...currentBook, slides: updatedSlides });
      showToast('Slide removido.');
    }
  };

  // Smart Bulk Import / Text Splitter
  const handleBulkImport = () => {
    if (!bulkText.trim() || !currentBook) return;

    let generatedSlides = [];

    if (splitMethod === 'chapters') {
      const regex = /(?=(?:📖\s*)?(?:Capítulo|Capitulo|Epílogo|Texto para contracapa|Provação)[\s\d—–:])/i;
      const parts = bulkText.split(regex).filter(p => p.trim().length > 0);

      if (parts.length > 0) {
        generatedSlides = parts.map((part, idx) => {
          const lines = part.trim().split('\n');
          const firstLine = lines[0].trim();
          const rest = lines.slice(1).join('\n').trim();

          return {
            id: 'slide-import-' + Date.now() + '-' + idx,
            type: firstLine.toLowerCase().includes('contracapa') ? 'backcover' : 'chapter',
            title: firstLine.startsWith('📖') ? firstLine : `📖 ${firstLine}`,
            content: rest || firstLine,
            badge: `Slide ${idx + 1}`
          };
        });
      }
    } else {
      const paragraphs = bulkText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      for (let i = 0; i < paragraphs.length; i += 2) {
        const chunk = paragraphs.slice(i, i + 2).join('\n\n');
        generatedSlides.push({
          id: 'slide-import-' + Date.now() + '-' + i,
          type: 'chapter',
          title: `📖 Seção ${Math.floor(i / 2) + 1}`,
          content: chunk,
          badge: 'Leitura'
        });
      }
    }

    if (generatedSlides.length === 0) {
      alert('Não foi possível dividir o texto. Tente outro formato.');
      return;
    }

    const updatedSlides = [...(currentBook.slides || []), ...generatedSlides];
    onSaveBook({ ...currentBook, slides: updatedSlides });
    setBulkText('');
    setActiveTab('slides');
    sfx.playChime();
    showToast(`✨ ${generatedSlides.length} novos slides foram criados automaticamente!`);
  };

  // Create new collection
  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (!newColName.trim()) {
      alert('Digite o nome da coleção / pasta');
      return;
    }

    const newCol = {
      id: 'colecao-' + Date.now(),
      name: newColName.trim(),
      description: newColDesc.trim() || 'Nova pasta de coleção literária.',
      author: 'Paulo Ricardo Cordova',
      genre: newColGenre,
      coverUrl: newColCover || '/covers/reino_magico.jpg',
      themeColor: '#8b5cf6',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    onSaveCollection(newCol);
    setNewColName('');
    setNewColDesc('');
    sfx.playChime();
    showToast('Nova pasta de coleção criada!');
  };

  // Export JSON backup (both books and collections)
  const handleExportBackup = () => {
    const backupData = {
      books,
      collections,
      version: '2.0',
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lumina_colecoes_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup completo exportado com sucesso!');
  };

  // Import JSON backup
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && (parsed.books || Array.isArray(parsed))) {
            onImportBackup(parsed);
            showToast('Dados e coleções importados com sucesso!');
          } else {
            alert('Formato de arquivo JSON inválido.');
          }
        } catch (err) {
          alert('Erro ao processar o arquivo JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{
      maxWidth: '1240px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          padding: '0.85rem 1.4rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontWeight: 600,
          fontSize: '0.9rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <Check size={18} />
          {toastMessage}
        </div>
      )}

      {/* Top Banner & Platform Stats */}
      <div style={{
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(24, 20, 48, 0.8) 0%, rgba(13, 15, 27, 0.95) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        padding: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            borderRadius: '999px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '0.6rem'
          }}>
            <Sliders size={14} />
            Painel do Escritor & Administrador
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '0.35rem'
          }}>
            Gerenciador de Pastas, Obras & Slides
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Organize suas sagas em coleções, edite capítulos em slides e configure gêneros literários.
          </p>
        </div>

        {/* Global Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.85rem 1.25rem',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{collections.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pastas / Coleções</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.85rem 1.25rem',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8b5cf6' }}>{books.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Livros Totais</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.85rem 1.25rem',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>{totalSlides}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total de Slides</div>
          </div>
        </div>
      </div>

      {/* Book Selector Bar & Utilities */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Book Selector dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Livro Selecionado:
          </label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            style={{
              flex: 1,
              background: '#121420',
              color: '#ffffff',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              padding: '0.65rem 1rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            {books.map(b => {
              const col = collections.find(c => c.id === b.collectionId);
              return (
                <option key={b.id} value={b.id}>
                  {b.title} {col ? `[📁 ${col.name}]` : ''} ({b.slides?.length || 0} slides)
                </option>
              );
            })}
          </select>
        </div>

        {/* Action Tools: Export, Import, Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportBackup}
            title="Baixar backup dos livros e coleções em JSON"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.6rem 0.9rem',
              borderRadius: '10px',
              color: '#cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Download size={15} />
            Exportar Backup
          </button>

          <label
            title="Importar livros e coleções salvas em JSON"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.6rem 0.9rem',
              borderRadius: '10px',
              color: '#cbd5e1',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Upload size={15} />
            Importar Backup
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
          </label>

          <button
            onClick={() => {
              if (confirm('Deseja restaurar as coleções e obras padrão (incluindo "O Reino Mágico de Jhully" e "Crônicas do Cosmos")?')) {
                onResetDefaults();
                showToast('Coleções e obras restauradas com sucesso!');
              }
            }}
            title="Restaurar livros e coleções originais"
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '0.6rem 0.9rem',
              borderRadius: '10px',
              color: '#f59e0b',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RefreshCw size={15} />
            Restaurar Originais
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '1.75rem',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('slides')}
          style={{
            padding: '0.75rem 1.4rem',
            borderBottom: activeTab === 'slides' ? '3px solid #8b5cf6' : '3px solid transparent',
            color: activeTab === 'slides' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Layers size={18} color={activeTab === 'slides' ? '#8b5cf6' : 'currentColor'} />
          Slides do Livro ({currentBook?.slides?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('info')}
          style={{
            padding: '0.75rem 1.4rem',
            borderBottom: activeTab === 'info' ? '3px solid #8b5cf6' : '3px solid transparent',
            color: activeTab === 'info' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <BookOpen size={18} color={activeTab === 'info' ? '#8b5cf6' : 'currentColor'} />
          Dados da Obra, Pasta & Gênero
        </button>

        <button
          onClick={() => setActiveTab('collections')}
          style={{
            padding: '0.75rem 1.4rem',
            borderBottom: activeTab === 'collections' ? '3px solid #f59e0b' : '3px solid transparent',
            color: activeTab === 'collections' ? '#f59e0b' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Folder size={18} color={activeTab === 'collections' ? '#f59e0b' : 'currentColor'} />
          Gerenciar Pastas das Coleções ({collections.length})
        </button>

        <button
          onClick={() => setActiveTab('bulk')}
          style={{
            padding: '0.75rem 1.4rem',
            borderBottom: activeTab === 'bulk' ? '3px solid #06b6d4' : '3px solid transparent',
            color: activeTab === 'bulk' ? '#06b6d4' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Wand2 size={18} color={activeTab === 'bulk' ? '#06b6d4' : 'currentColor'} />
          Importador Automático (Texto Longo)
        </button>
      </div>

      {/* TAB: GERENCIAR PASTAS DAS COLEÇÕES */}
      {activeTab === 'collections' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Create New Collection Form */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(28, 22, 54, 0.85) 0%, rgba(18, 20, 32, 0.95) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <FolderPlus size={22} color="#f59e0b" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Criar Nova Pasta de Coleção
              </h3>
            </div>

            <form onSubmit={handleCreateCollection} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.4fr) minmax(200px, 1fr)', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                    Nome da Pasta / Coleção *
                  </label>
                  <input
                    type="text"
                    required
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    placeholder="Ex: Coleção As Crônicas dos Elementos..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '0.7rem 1rem',
                      color: '#ffffff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                    Gênero Literário Principal
                  </label>
                  <select
                    value={newColGenre}
                    onChange={(e) => setNewColGenre(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#121420',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '0.7rem 1rem',
                      color: '#ffffff',
                      fontSize: '0.95rem'
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
                  Descrição da Coleção
                </label>
                <textarea
                  rows={2}
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  placeholder="Resumo da saga ou universo que agrupa estas obras..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '0.7rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#090a10',
                    padding: '0.7rem 1.8rem',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  <Plus size={18} />
                  Criar Pasta da Coleção
                </button>
              </div>
            </form>
          </div>

          {/* Existing Collections List */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              Pastas de Coleções Existentes
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {collections.map((col) => {
                const booksInCol = books.filter(b => b.collectionId === col.id);
                return (
                  <div
                    key={col.id}
                    style={{
                      borderRadius: '16px',
                      background: 'rgba(18, 20, 32, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Folder size={20} color="#f59e0b" />
                        <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>{col.name}</h4>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Excluir a pasta "${col.name}"? Os livros nela passarão para avulsos.`)) {
                            onDeleteCollection(col.id);
                            showToast('Pasta de coleção excluída.');
                          }
                        }}
                        style={{
                          padding: '0.35rem',
                          borderRadius: '8px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#f87171'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      color: '#c4b5fd',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      alignSelf: 'flex-start'
                    }}>
                      Gênero: {col.genre}
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {col.description}
                    </p>

                    <div style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '0.75rem',
                      fontSize: '0.8rem',
                      color: '#a78bfa',
                      fontWeight: 600
                    }}>
                      {booksInCol.length} {booksInCol.length === 1 ? 'Livro / Volume associado' : 'Livros / Volumes associados'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: SLIDES LIST & EDITOR */}
      {activeTab === 'slides' && currentBook && (
        <div>
          {/* Header with Add Slide button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Edite o conteúdo de cada slide, reordene as páginas ou adicione novos capítulos.
            </p>

            <button
              onClick={handleAddSlide}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
              }}
            >
              <Plus size={18} />
              Adicionar Novo Slide
            </button>
          </div>

          {/* Slide items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {currentBook.slides?.map((slide, sIdx) => (
              <div
                key={slide.id || sIdx}
                style={{
                  borderRadius: '18px',
                  background: 'rgba(18, 20, 32, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'border-color 0.2s ease'
                }}
              >
                {/* Top Row: Index, Title input, and Reordering actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      {sIdx + 1}
                    </div>

                    <input
                      type="text"
                      value={slide.title || ''}
                      onChange={(e) => handleUpdateSlide(sIdx, 'title', e.target.value)}
                      placeholder="Título do Slide ou Capítulo..."
                      style={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '0.55rem 0.85rem',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => onReadSlide(currentBook, sIdx)}
                      title="Visualizar este slide no apresentador"
                      style={{
                        padding: '0.45rem 0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#fbbf24',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Eye size={15} />
                      Apresentar
                    </button>

                    <button
                      onClick={() => handleDuplicateSlide(sIdx)}
                      title="Duplicar Slide"
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      onClick={() => handleMoveSlide(sIdx, 'up')}
                      disabled={sIdx === 0}
                      title="Mover para cima"
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: sIdx === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text-muted)',
                        cursor: sIdx === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ArrowUp size={16} />
                    </button>

                    <button
                      onClick={() => handleMoveSlide(sIdx, 'down')}
                      disabled={sIdx === currentBook.slides.length - 1}
                      title="Mover para baixo"
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: sIdx === currentBook.slides.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--text-muted)',
                        cursor: sIdx === currentBook.slides.length - 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ArrowDown size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteSlide(sIdx)}
                      title="Excluir Slide"
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#f87171'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Middle Row: Content Textarea */}
                <div>
                  <textarea
                    rows={6}
                    value={slide.content || ''}
                    onChange={(e) => handleUpdateSlide(sIdx, 'content', e.target.value)}
                    placeholder="Conteúdo do texto do slide..."
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      color: '#e2e8f0',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      resize: 'vertical',
                      outline: 'none'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.35rem'
                  }}>
                    <span>{slide.content ? slide.content.split(/\s+/).filter(Boolean).length : 0} palavras</span>
                    <span>Dica: Use linhas em branco para separar parágrafos</span>
                  </div>
                </div>

                {/* Bottom Row: Optional Image URL & Subtitle */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                      Subtítulo ou Citação (opcional):
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle || ''}
                      onChange={(e) => handleUpdateSlide(sIdx, 'subtitle', e.target.value)}
                      placeholder="Ex: Por Paulo Ricardo Cordova"
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '0.45rem 0.75rem',
                        color: '#ffffff',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                      URL da Ilustração do Slide (opcional):
                    </label>
                    <input
                      type="text"
                      value={slide.imageUrl || ''}
                      onChange={(e) => handleUpdateSlide(sIdx, 'imageUrl', e.target.value)}
                      placeholder="Ex: https://... ou /covers/..."
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '0.45rem 0.75rem',
                        color: '#ffffff',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BOOK DETAILS, COVER, COLLECTION & GENRE */}
      {activeTab === 'info' && currentBook && (
        <div style={{
          borderRadius: '20px',
          background: 'rgba(18, 20, 32, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2.5rem'
        }}>
          {/* Left: Cover Preview & Upload */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'block' }}>
              Capa do Livro
            </label>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1rem',
              aspectRatio: '3/4',
              background: '#090a10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={currentBook.coverUrl || '/covers/reino_magico.jpg'}
                alt={currentBook.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              padding: '0.65rem',
              borderRadius: '10px',
              color: '#c4b5fd',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginBottom: '0.75rem'
            }}>
              <Upload size={16} />
              Enviar Imagem do PC
              <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} />
            </label>

            <input
              type="text"
              value={currentBook.coverUrl || ''}
              onChange={(e) => handleUpdateBookInfo('coverUrl', e.target.value)}
              placeholder="Ou cole a URL da imagem..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                color: '#ffffff',
                fontSize: '0.8rem'
              }}
            />
          </div>

          {/* Right: Form Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Title & Author */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Título do Livro
                </label>
                <input
                  type="text"
                  value={currentBook.title || ''}
                  onChange={(e) => handleUpdateBookInfo('title', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.9rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Nome do Autor
                </label>
                <input
                  type="text"
                  value={currentBook.author || ''}
                  onChange={(e) => handleUpdateBookInfo('author', e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.9rem',
                    color: '#ffffff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            {/* Collection Folder & Genre Dropdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Folder size={15} />
                  Pasta / Coleção
                </label>
                <select
                  value={currentBook.collectionId || ''}
                  onChange={(e) => handleUpdateBookInfo('collectionId', e.target.value)}
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
                  value={currentBook.category || GENRES[0]}
                  onChange={(e) => handleUpdateBookInfo('category', e.target.value)}
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
                Sinopse
              </label>
              <textarea
                rows={4}
                value={currentBook.synopsis || ''}
                onChange={(e) => handleUpdateBookInfo('synopsis', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  lineHeight: 1.6
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.4rem', display: 'block' }}>
                📜 Texto Completo para Contracapa
              </label>
              <textarea
                rows={5}
                value={currentBook.backCoverText || ''}
                onChange={(e) => handleUpdateBookInfo('backCoverText', e.target.value)}
                placeholder="Cole aqui o texto da contracapa do livro..."
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  color: '#cbd5e1',
                  fontSize: '0.9rem',
                  lineHeight: 1.6
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                onClick={() => showToast('Dados da obra salvos com sucesso!')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  padding: '0.75rem 1.8rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Save size={18} />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BULK IMPORT AUTOMATION */}
      {activeTab === 'bulk' && currentBook && (
        <div style={{
          borderRadius: '20px',
          background: 'rgba(18, 20, 32, 0.75)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b'
            }}>
              <Wand2 size={22} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Importador Inteligente de Capítulos
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Cole o texto completo de um livro ou PDF. O sistema detectará automaticamente capítulos e criará os slides!
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.25rem',
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="splitMethod"
                value="chapters"
                checked={splitMethod === 'chapters'}
                onChange={() => setSplitMethod('chapters')}
              />
              <span>Dividir por <b>"Capítulo X"</b> ou seções de título</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="splitMethod"
                value="paragraphs"
                checked={splitMethod === 'paragraphs'}
                onChange={() => setSplitMethod('paragraphs')}
              />
              <span>Dividir a cada 2 parágrafos em slides individuais</span>
            </label>
          </div>

          <textarea
            rows={10}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={`Cole aqui o texto do seu livro... Exemplo:\n\nCapítulo 1 – O Início\nEra uma vez...\n\nCapítulo 2 – A Jornada\nEles partiram para o desconhecido...`}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '1.25rem',
              color: '#ffffff',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              outline: 'none'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              onClick={() => setBulkText('')}
              style={{
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.06)',
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              Limpar
            </button>

            <button
              onClick={handleBulkImport}
              disabled={!bulkText.trim()}
              style={{
                background: bulkText.trim() ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255, 255, 255, 0.1)',
                color: bulkText.trim() ? '#090a10' : 'var(--text-muted)',
                padding: '0.75rem 1.8rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: bulkText.trim() ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none',
                cursor: bulkText.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              <Sparkles size={18} />
              Criar Slides Automaticamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
