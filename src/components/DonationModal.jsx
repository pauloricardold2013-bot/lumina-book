import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  X, 
  Copy, 
  Check, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Coffee,
  Crown,
  Layers,
  ChevronRight
} from 'lucide-react';
import { DONATION_TIERS, PIX_CONFIG, generatePixCopiaECola } from '../utils/pix';
import { sfx } from '../utils/audio';

export default function DonationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedAmount, setSelectedAmount] = useState(50);
  const [showQrCode, setShowQrCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // The 3 main highlighted options requested by the user
  const featuredTiers = useMemo(() => DONATION_TIERS.slice(0, 3), []);
  // All other values
  const otherTiers = useMemo(() => DONATION_TIERS.slice(3), []);

  const currentTier = useMemo(() => {
    return DONATION_TIERS.find(t => t.amount === selectedAmount) || {
      amount: selectedAmount,
      label: `R$ ${selectedAmount},00`,
      title: 'Doação Personalizada'
    };
  }, [selectedAmount]);

  // Generate dynamic Pix Copia e Cola string with exact amount and CRC16
  const pixPayload = useMemo(() => {
    return generatePixCopiaECola(selectedAmount);
  }, [selectedAmount]);

  // QR Code URL based on the standard Pix string
  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(pixPayload)}`;
  }, [pixPayload]);

  const handleSelectAmount = (amount) => {
    sfx.playFlip();
    setSelectedAmount(amount);
    setCopiedCode(false);
    setCopiedKey(false);
  };

  const handleTriggerDonate = () => {
    sfx.playChime();
    setShowQrCode(true);
  };

  const handleCopyPixPayload = async () => {
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopiedCode(true);
      sfx.playChime();
      setTimeout(() => setCopiedCode(false), 3000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = pixPayload;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  const handleCopyRawKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CONFIG.key);
      setCopiedKey(true);
      sfx.playChime();
      setTimeout(() => setCopiedKey(false), 3000);
    } catch {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 3000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(5, 7, 13, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0.6rem, 2.5vw, 1.25rem)',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div 
        className="donation-modal-body"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '28px',
          background: 'linear-gradient(145deg, rgba(24, 20, 48, 0.96) 0%, rgba(12, 14, 26, 0.98) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(245, 158, 11, 0.2)',
          color: '#ffffff',
          position: 'relative',
          padding: 'clamp(1.25rem, 3.5vw, 2.5rem)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#cbd5e1',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#cbd5e1'; }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#fbbf24',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '0.85rem'
          }}>
            <Heart size={15} fill="#f59e0b" color="#f59e0b" />
            Apoio Direto ao Autor
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '0.6rem',
            letterSpacing: '-0.5px'
          }}>
            Faça uma Doação ao <span style={{ color: '#fbbf24' }}>Lumina Book</span>
          </h2>

          <p style={{
            color: '#cbd5e1',
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            lineHeight: 1.6,
            maxWidth: '540px',
            margin: '0 auto'
          }}>
            Sua doação incentiva a criação de novas sagas, capítulos e ilustrações mágicas. Escolha um valor abaixo para contribuir via <b>Pix</b> instantâneo:
          </p>
        </div>

        {/* 3 HIGHLIGHTED FEATURED OPTIONS */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#a78bfa',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Sparkles size={14} color="#f59e0b" />
            Opções em Destaque:
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(130px, 28vw, 180px), 1fr))',
            gap: '0.85rem'
          }}>
            {featuredTiers.map((tier) => {
              const isSelected = selectedAmount === tier.amount;
              return (
                <div
                  key={tier.amount}
                  onClick={() => handleSelectAmount(tier.amount)}
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    padding: '1.4rem 1.2rem',
                    background: isSelected
                      ? 'linear-gradient(145deg, rgba(245, 158, 11, 0.22) 0%, rgba(139, 92, 246, 0.25) 100%)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected
                      ? '2px solid #f59e0b'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isSelected
                      ? '0 10px 25px rgba(245, 158, 11, 0.25), inset 0 0 15px rgba(245, 158, 11, 0.15)'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#090a10',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.5)'
                    }}>
                      {tier.badge}
                    </div>
                  )}

                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>
                    {tier.icon}
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    color: isSelected ? '#fbbf24' : '#ffffff',
                    marginBottom: '0.25rem'
                  }}>
                    {tier.label}
                  </div>

                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#c4b5fd',
                    marginBottom: '0.45rem'
                  }}>
                    {tier.title}
                  </div>

                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    margin: 0
                  }}>
                    {tier.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ALL OTHER VALUES (200, 300, 400, 500) */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '0.65rem'
          }}>
            Outros Valores de Doação:
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem'
          }}>
            {otherTiers.map((tier) => {
              const isSelected = selectedAmount === tier.amount;
              return (
                <button
                  key={tier.amount}
                  onClick={() => handleSelectAmount(tier.amount)}
                  style={{
                    flex: '1 1 calc(25% - 0.6rem)',
                    minWidth: '110px',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: isSelected ? 800 : 600,
                    background: isSelected 
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#090a10' : '#e2e8f0',
                    border: isSelected 
                      ? '1px solid #f59e0b' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>{tier.icon}</span>
                  <span>{tier.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOAR BUTTON */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <button
            onClick={handleTriggerDonate}
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '1.1rem 2rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
              color: '#ffffff',
              fontSize: '1.15rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.45), 0 0 25px rgba(236, 72, 153, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.55), 0 0 35px rgba(236, 72, 153, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.45), 0 0 25px rgba(236, 72, 153, 0.3)';
            }}
          >
            <Heart size={22} fill="#ffffff" color="#ffffff" />
            DOAR {currentTier.label} VIA PIX
            <ArrowRight size={20} />
          </button>
        </div>

        {/* QR CODE & PIX DETAILS (Appears when clicking DOAR or can be active directly) */}
        {showQrCode && (
          <div style={{
            borderRadius: '24px',
            background: 'rgba(9, 10, 16, 0.9)',
            border: '2px solid rgba(245, 158, 11, 0.5)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(245, 158, 11, 0.2)',
            padding: '2rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              color: '#fbbf24',
              fontSize: '0.9rem',
              fontWeight: 800
            }}>
              <QrCode size={20} />
              PAGAMENTO PIX • VALOR EXATO: <span style={{ fontSize: '1.1rem', color: '#fff' }}>{currentTier.label}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              alignItems: 'center'
            }}>
              {/* QR Code Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  padding: '10px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={qrCodeUrl}
                    alt={`QR Code Pix ${currentTier.label}`}
                    style={{
                      width: 'clamp(160px, 45vw, 210px)',
                      height: 'clamp(160px, 45vw, 210px)',
                      display: 'block'
                    }}
                  />
                </div>
                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.85rem',
                  textAlign: 'center'
                }}>
                  Abra o aplicativo do seu banco e aponte a câmera para ler o QR Code
                </p>
              </div>

              {/* Pix Info & Copy Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Beneficiary Details */}
                <div style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                    Favorecido / Autor:
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                    {PIX_CONFIG.recipientName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a78bfa', marginTop: '0.2rem', wordBreak: 'break-all' }}>
                    Chave CPF: <b>{PIX_CONFIG.formattedKey}</b>
                  </div>
                </div>

                {/* Pix Copia e Cola with EXACT amount */}
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#fbbf24',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.45rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <Copy size={13} />
                    Código Pix Copia e Cola ({currentTier.label}):
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <input
                      type="text"
                      readOnly
                      value={pixPayload}
                      style={{
                        flex: '1 1 200px',
                        minWidth: 0,
                        background: 'rgba(18, 20, 32, 0.95)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                        borderRadius: '12px',
                        padding: '0.75rem 0.9rem',
                        color: '#cbd5e1',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        outline: 'none'
                      }}
                    />

                    <button
                      onClick={handleCopyPixPayload}
                      style={{
                        padding: '0.75rem 1.1rem',
                        borderRadius: '12px',
                        background: copiedCode ? '#10b981' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: copiedCode ? '#ffffff' : '#090a10',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                        boxShadow: copiedCode ? '0 0 15px #10b981' : '0 4px 14px rgba(245, 158, 11, 0.35)'
                      }}
                    >
                      {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                      {copiedCode ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>

                {/* Direct CPF Key Copy */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)'
                }}>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                    Chave CPF: <b style={{ color: '#fff' }}>{PIX_CONFIG.key}</b>
                  </div>
                  <button
                    onClick={handleCopyRawKey}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: copiedKey ? '#10b981' : '#c4b5fd',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    {copiedKey ? <Check size={14} /> : <Copy size={14} />}
                    {copiedKey ? 'CPF Copiado!' : 'Copiar Chave'}
                  </button>
                </div>

                {/* Instructions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  color: '#94a3b8'
                }}>
                  <ShieldCheck size={16} color="#10b981" />
                  <span>Pagamento seguro direto para o autor pelo Banco Central</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
