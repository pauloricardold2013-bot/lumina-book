// Brazilian Pix EMVCo BR Code (Copia e Cola) Payload Generator
// Standard compliant with Banco Central do Brasil

export const PIX_CONFIG = {
  key: '07596156916',
  formattedKey: '075.961.569-16',
  keyType: 'CPF',
  recipientName: 'Paulo Ricardo Cordova',
  city: 'BRASIL',
  reference: 'LUMINABOOK'
};

export const DONATION_TIERS = [
  { 
    amount: 10, 
    label: 'R$ 10,00', 
    title: 'Apoiador Leitor',
    badge: 'Popular',
    desc: 'Contribua com um café e ajude na manutenção do Lumina Book.',
    icon: '☕'
  },
  { 
    amount: 50, 
    label: 'R$ 50,00', 
    title: 'Incentivador Cultural',
    badge: 'Destaque',
    desc: 'Apoie a escrita e a produção de novos capítulos e ilustrações.',
    icon: '✨'
  },
  { 
    amount: 100, 
    label: 'R$ 100,00', 
    title: 'Patrono das Histórias',
    badge: 'Mecenas',
    desc: 'Incentivo direto para produções épicas e estúdio de narração.',
    icon: '👑'
  },
  { amount: 200, label: 'R$ 200,00', title: 'Guardião Literário', desc: 'Apoio nobre às sagas.', icon: '🛡️' },
  { amount: 300, label: 'R$ 300,00', title: 'Mestre da Imaginação', desc: 'Apoio generoso ao autor.', icon: '🔮' },
  { amount: 400, label: 'R$ 400,00', title: 'Conselheiro Real', desc: 'Grande contribuição para a saga.', icon: '📜' },
  { amount: 500, label: 'R$ 500,00', title: 'Lorde do Reino', desc: 'O mais alto grau de apoio às obras.', icon: '💎' }
];

function crc16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function formatField(id, value) {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

export function generatePixCopiaECola(amount) {
  const cleanKey = PIX_CONFIG.key.replace(/\D/g, '');
  const gui = formatField('00', 'br.gov.bcb.pix');
  const pixKey = formatField('01', cleanKey);
  const merchantInfo = formatField('26', `${gui}${pixKey}`);

  const formattedAmount = Number(amount).toFixed(2);
  const cleanName = PIX_CONFIG.recipientName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .slice(0, 25)
    .toUpperCase();
  const cleanCity = PIX_CONFIG.city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .slice(0, 15)
    .toUpperCase();

  const payload = 
    formatField('00', '01') +
    formatField('01', '12') + // 12 = Dynamic/Static with specific amount
    merchantInfo +
    formatField('52', '0000') +
    formatField('53', '986') + // BRL
    formatField('54', formattedAmount) +
    formatField('58', 'BR') +
    formatField('59', cleanName) +
    formatField('60', cleanCity) +
    formatField('62', formatField('05', PIX_CONFIG.reference)) +
    '6304';

  return payload + crc16(payload);
}
