// Synthesized Web Audio API sound effects for page flipping and ambient clicks

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playFlip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      // Realistic paper rustle synthesis
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.14);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Audio not permitted yet
    }
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25); // A5

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {
      // Audio not permitted yet
    }
  }
}

export const sfx = new SoundEffects();

// High Quality Locutor Masculino & Studio Neural Voice Engine
class SpeechNarrator {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.queue = [];
    this.currentChunkIndex = 0;
    this.selectedVoice = null;
    this.rate = 0.96; // Cadência ideal de audiolivro
    this.pitch = 1.0; // Frequência natural humana (evita efeito robótico)
    this.onStateChange = null;
    this.onSentenceChange = null;
    this.onSlideEnd = null;
    this.heartbeatTimer = null;
    this.isSamplePlaying = false;

    // Carregar preferências salvas do usuário
    this.loadSavedPreferences();

    if (typeof window !== 'undefined' && this.synth) {
      this.loadVoices();
      if (this.synth.addEventListener) {
        this.synth.addEventListener('voiceschanged', () => this.loadVoices());
      } else if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadSavedPreferences() {
    try {
      if (typeof window === 'undefined') return;
      const saved = localStorage.getItem('lumina_narrator_settings_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.rate) this.rate = parsed.rate;
        if (parsed.pitch) this.pitch = parsed.pitch;
        this.savedVoiceName = parsed.voiceName || null;
      }
    } catch {
      // Ignorar erro de leitura do localStorage
    }
  }

  savePreferences() {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem('lumina_narrator_settings_v3', JSON.stringify({
        voiceName: this.selectedVoice?.name || '',
        rate: this.rate,
        pitch: this.pitch
      }));
    } catch {
      // Ignorar erro de escrita do localStorage
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    const ptVoices = all.filter(v => v.lang && (v.lang.startsWith('pt') || v.lang.includes('BR') || v.lang.includes('PT')));

    // Se o usuário já tinha uma voz salva no navegador, priorizá-la
    if (this.savedVoiceName) {
      const savedMatch = ptVoices.find(v => v.name === this.savedVoiceName);
      if (savedMatch) {
        this.selectedVoice = savedMatch;
        return ptVoices;
      }
    }

    // 1. Prioridade Máxima: Locutor Masculino Neural Ultra-Realista de Estúdio (Antonio Natural no Edge/Windows)
    const studioAntonio = ptVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('antonio') && (n.includes('natural') || n.includes('online'));
    });

    // 2. Prioridade Alta: Voz Google Português do Brasil (A mesma do celular/Android no Chrome)
    const googleMobile = ptVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('google') || n.includes('pt-br-x-') || (v.lang === 'pt-BR' && n.includes('brasil'));
    });

    // 3. Prioridade Média: Locutor Masculino do Windows (Daniel ou outros)
    const maleVoice = ptVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return (
        n.includes('daniel') ||
        n.includes('felipe') ||
        n.includes('fabio') ||
        n.includes('ricardo') ||
        n.includes('thiago') ||
        n.includes('male') ||
        n.includes('homem') ||
        (n.includes('neural') && !n.includes('francisca') && !n.includes('maria') && !n.includes('heloisa'))
      );
    });

    // 4. Qualquer voz pt-BR
    const ptBR = ptVoices.find(v => v.lang.includes('BR'));
    const fallback = ptVoices[0] || all[0];

    this.selectedVoice = studioAntonio || googleMobile || maleVoice || ptBR || fallback;
    return ptVoices;
  }

  getAvailableVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    const ptVoices = all.filter(v => v.lang && (v.lang.startsWith('pt') || v.lang.includes('BR') || v.lang.includes('PT')));

    // Classificação e ordenação para colocar as vozes mais realistas no topo
    const getScore = (v) => {
      const name = (v.name || '').toLowerCase();
      if (name.includes('antonio') && (name.includes('natural') || name.includes('online'))) return 100;
      if (name.includes('google') || name.includes('pt-br-x-')) return 90;
      if (name.includes('daniel')) return 80;
      if (name.includes('felipe') || name.includes('fabio') || name.includes('ricardo')) return 75;
      if (name.includes('francisca') && (name.includes('natural') || name.includes('online'))) return 70;
      if (v.lang === 'pt-BR') return 50;
      return 10;
    };

    ptVoices.sort((a, b) => getScore(b) - getScore(a));

    if (ptVoices.length > 0 && (!this.selectedVoice || !ptVoices.some(v => v.name === this.selectedVoice.name))) {
      this.loadVoices();
    }
    return ptVoices;
  }

  // Nome formatado elegante e amigável para a lista
  getVoiceDisplayName(voice) {
    if (!voice) return 'Locutor Padrão HD';
    const name = voice.name || '';
    const lower = name.toLowerCase();

    if (lower.includes('antonio') && (lower.includes('natural') || lower.includes('online'))) {
      return '⭐ Antonio Studio (Ultra Realista IA)';
    }
    if (lower.includes('google') || lower.includes('pt-br-x-')) {
      return '📱 Google Mobile (Voz do Celular)';
    }
    if (lower.includes('daniel')) {
      return '🎙️ Daniel (Locutor Clássico Windows)';
    }
    if (lower.includes('felipe')) {
      return '🎙️ Felipe (Locutor Jovem)';
    }
    if (lower.includes('francisca') && (lower.includes('natural') || lower.includes('online'))) {
      return '⭐ Francisca Studio (Natural IA)';
    }
    if (lower.includes('maria') || lower.includes('luciana') || lower.includes('heloisa')) {
      return `🎙️ ${name.split('-')[0].trim()} (Locutora)`;
    }
    return `🎙️ ${name.replace(/\(pt-[A-Z]+\)/i, '').replace(/Portuguese|Brazil/gi, '').trim()}`;
  }

  // Nome curto perfeito para caber no botão de leitura da tela
  getShortVoiceName(voice) {
    if (!voice) return 'Locutor HD';
    const lower = (voice.name || '').toLowerCase();

    if (lower.includes('antonio')) return 'Antonio Studio';
    if (lower.includes('google') || lower.includes('pt-br-x-')) return 'Google Mobile';
    if (lower.includes('daniel')) return 'Daniel';
    if (lower.includes('felipe')) return 'Felipe';
    if (lower.includes('fabio')) return 'Fábio';
    if (lower.includes('francisca')) return 'Francisca';
    if (lower.includes('maria')) return 'Maria';
    if (lower.includes('luciana')) return 'Luciana';

    const clean = (voice.name || '').split(/[-–()]/)[0].trim();
    return clean.slice(0, 14) || 'Locutor HD';
  }

  setVoice(voice) {
    this.selectedVoice = voice;
    this.savePreferences();
  }

  setRate(newRate) {
    this.rate = Math.max(0.7, Math.min(1.4, newRate));
    this.savePreferences();
  }

  setPitch(newPitch) {
    this.pitch = Math.max(0.7, Math.min(1.3, newPitch));
    this.savePreferences();
  }

  // Tocar uma prévia de 3 segundos para testar a voz selecionada
  playSample(onEnd) {
    if (!this.synth) return;
    this.stop();
    this.isSamplePlaying = true;

    const sampleText = 'Olá! Sou a sua voz de leitura do Lumina Book. Pronto para mergulhar nesta história?';
    const utterance = new SpeechSynthesisUtterance(sampleText);
    utterance.lang = 'pt-BR';
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      this.isSamplePlaying = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSamplePlaying = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  // Prepara e divide o texto em frases com pausas naturais de narração
  cleanAndChunkText(text) {
    if (!text) return [];

    const cleaned = text
      .replace(/[📖✨🛡️👻🌑🐇📚⭐]/g, '')
      .replace(/\*\*/g, '')
      .replace(/_{1,2}/g, '')
      .replace(/—\s*/g, '— ')
      .replace(/\s+/g, ' ')
      .trim();

    // Divide respeitando diálogos e pontuação (. ! ? \n)
    const rawChunks = cleaned.match(/[^.!?\n]+[.!?\n]*/g) || [cleaned];

    const chunks = [];
    rawChunks.forEach(chunk => {
      const trimmed = chunk.trim();
      if (trimmed.length > 0) {
        if (trimmed.length > 180) {
          const subparts = trimmed.split(/([,;:]+)/);
          let temp = '';
          subparts.forEach(sub => {
            if ((temp + sub).length > 130) {
              if (temp.trim()) chunks.push(temp.trim());
              temp = sub;
            } else {
              temp += sub;
            }
          });
          if (temp.trim()) chunks.push(temp.trim());
        } else {
          chunks.push(trimmed);
        }
      }
    });

    return chunks.length > 0 ? chunks : [cleaned];
  }

  speakSlide(title, content, onEnd) {
    if (!this.synth) return;
    this.stop();

    const fullText = `${title ? title + '. ' : ''}${content || ''}`;
    this.queue = this.cleanAndChunkText(fullText);
    this.currentChunkIndex = 0;
    this.onSlideEnd = onEnd;

    if (this.queue.length === 0) return;

    this.isSpeaking = true;
    this.isPaused = false;
    if (this.onStateChange) this.onStateChange(true);

    this.startHeartbeat();
    setTimeout(() => {
      if (this.isSpeaking && !this.isPaused) {
        this.speakNextChunk();
      }
    }, 60);
  }

  speakNextChunk() {
    if (!this.isSpeaking || this.isPaused || !this.synth) return;

    if (this.currentChunkIndex >= this.queue.length) {
      this.isSpeaking = false;
      this.stopHeartbeat();
      if (this.onStateChange) this.onStateChange(false);
      if (this.onSentenceChange) this.onSentenceChange(-1, this.queue.length, '');
      if (this.onSlideEnd) this.onSlideEnd();
      return;
    }

    if (!this.selectedVoice) {
      this.loadVoices();
    }

    const chunkText = this.queue[this.currentChunkIndex];
    if (this.onSentenceChange) {
      this.onSentenceChange(this.currentChunkIndex, this.queue.length, chunkText);
    }

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.lang = 'pt-BR';
    utterance.rate = this.rate;

    // Preserva a naturalidade da voz sem distorção artificial
    utterance.pitch = this.pitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      if (this.isSpeaking && !this.isPaused) {
        this.currentChunkIndex++;
        // Micro-pausa natural entre frases para respirar
        setTimeout(() => this.speakNextChunk(), 80);
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      console.warn('Speech chunk error, advancing:', e);
      if (this.isSpeaking && !this.isPaused) {
        this.currentChunkIndex++;
        this.speakNextChunk();
      }
    };

    if (this.synth.paused) {
      this.synth.resume();
    }
    this.synth.speak(utterance);
  }

  // Heartbeat watchdog prevents Chromium speech synthesis from freezing after 15s
  startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (this.synth && this.isSpeaking && !this.isPaused) {
        if (this.synth.paused) {
          this.synth.resume();
        }
      }
    }, 3000);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  stop() {
    this.isSpeaking = false;
    this.isPaused = false;
    this.queue = [];
    this.currentChunkIndex = 0;
    this.stopHeartbeat();
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.onStateChange) this.onStateChange(false);
    if (this.onSentenceChange) this.onSentenceChange(-1, 0, '');
  }

  pause() {
    if (this.synth && this.isSpeaking) {
      this.isPaused = true;
      this.synth.pause();
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.isPaused = false;
      this.synth.resume();
      if (this.onStateChange) this.onStateChange(true);
    }
  }
}

export const narrator = new SpeechNarrator();
