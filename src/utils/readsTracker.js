// Utilitários para contagem e formatação de leitores e acessos por livro

export const INITIAL_READS_MAP = {
  'reino-magico-jhully': 1420,
  'reino-magico-jhully-vol2': 890,
  'cronicas-do-cosmos': 640,
  'cronicas-do-cosmos-vol2': 480,
  'pai-de-dois': 1680
};

// Formata números de acessos de forma elegante (ex: 1.4k ou 850)
export function formatReads(num) {
  if (!num || isNaN(num)) return '120';
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return num.toString();
}

// Calcula estimativa dinâmica realista de leitores ativos simultâneos no momento
export function getActiveReaders(bookId) {
  const hash = (bookId || 'livro').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const now = new Date();
  const minuteBlock = Math.floor(now.getMinutes() / 5);
  // Flutua suavemente entre 4 e 19 pessoas lendo no momento
  const count = 4 + ((hash + now.getHours() * 3 + minuteBlock) % 16);
  return count;
}
