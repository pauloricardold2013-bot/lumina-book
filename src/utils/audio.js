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
    this.selectedVoiceIdentifier = 'google_mobile'; // Padrão: Voz amada do celular
    this.selectedVoice = null;
    this.rate = 0.96; // Cadência ideal de audiolivro
    this.pitch = 1.0;
    this.onStateChange = null;
    this.onSentenceChange = null;
    this.onSlideEnd = null;
    this.heartbeatTimer = null;
    this.isSamplePlaying = false;

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
      const saved = localStorage.getItem('lumina_narrator_settings_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.rate) this.rate = parsed.rate;
        if (parsed.pitch) this.pitch = parsed.pitch;
        if (parsed.voiceIdentifier) this.selectedVoiceIdentifier = parsed.voiceIdentifier;
      }
    } catch {
      // Ignorar erro
    }
  }

  savePreferences() {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem('lumina_narrator_settings_v4', JSON.stringify({
        voiceIdentifier: this.selectedVoiceIdentifier || 'google_mobile',
        rate: this.rate,
        pitch: this.pitch
      }));
    } catch {
      // Ignorar erro
    }
  }

  getSystemPtVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    return all.filter(v => v.lang && (v.lang.startsWith('pt') || v.lang.includes('BR') || v.lang.includes('PT')));
  }

  getGoogleVoice() {
    const pt = this.getSystemPtVoices();
    return pt.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('google') || n.includes('pt-br-x-') || (v.lang === 'pt-BR' && n.includes('brasil'));
    }) || pt.find(v => v.lang.includes('BR')) || pt[0] || null;
  }

  getRealMaleVoice() {
    const pt = this.getSystemPtVoices();
    // Procura vozes genuinamente masculinas por nome ou identificador oficial (Windows, Android, iOS, Samsung)
    return pt.find(v => {
      const n = (v.name || '').toLowerCase();
      return (
        n.includes('antonio') ||
        n.includes('daniel') ||
        n.includes('felipe') ||
        n.includes('fabio') ||
        n.includes('fábio') ||
        n.includes('ricardo') ||
        n.includes('thiago') ||
        n.includes('david') ||
        n.includes('male') ||
        n.includes('homem') ||
        n.includes('masculin') ||
        n.includes('afp') || // Google Android Voz 2 (Masculina)
        n.includes('ptd') || // Google Android Voz 3 (Masculina)
        n.includes('smta')   // Samsung TTS Voz Masculina
      );
    }) || null;
  }

  getBestBaseVoice() {
    return this.getRealMaleVoice() || this.getGoogleVoice();
  }

  loadVoices() {
    const pt = this.getSystemPtVoices();
    if (this.selectedVoiceIdentifier && this.selectedVoiceIdentifier !== 'google_mobile' && this.selectedVoiceIdentifier !== 'male_studio') {
      const found = pt.find(v => v.name === this.selectedVoiceIdentifier);
      if (found) {
        this.selectedVoice = found;
        return pt;
      }
    }
    this.selectedVoice = this.getGoogleVoice();
    return pt;
  }

  getAvailableVoices() {
    const pt = this.getSystemPtVoices();
    const realMale = this.getRealMaleVoice();
    const maleLabel = realMale 
      ? `🎙️ Locutor Masculino (${realMale.name.split('-')[0].trim()})`
      : '🎙️ Locutor Masculino (Estúdio Barítono)';

    const list = [
      {
        id: 'google_mobile',
        name: 'google_mobile',
        displayName: '📱 Google Voz Natural (A mesma do Celular)',
        shortName: 'Google Celular'
      },
      {
        id: 'male_studio',
        name: 'male_studio',
        displayName: maleLabel,
        shortName: 'Locutor Masculino'
      }
    ];

    pt.forEach(v => {
      const lower = (v.name || '').toLowerCase();
      // Ignorar duplicata da Google já listada como primeira opção
      if (lower.includes('google') || lower.includes('pt-br-x-')) return;

      let display = `🎙️ ${v.name}`;
      let short = v.name.split('-')[0].trim().slice(0, 15);

      if (lower.includes('antonio')) {
        display = '⭐ Antonio Studio (Microsoft Edge IA)';
        short = 'Antonio Studio';
      } else if (lower.includes('daniel')) {
        display = '🎙️ Daniel (Locutor Clássico Windows)';
        short = 'Daniel';
      } else if (lower.includes('felipe')) {
        display = '🎙️ Felipe (Locutor)';
        short = 'Felipe';
      } else if (lower.includes('francisca')) {
        display = '⭐ Francisca Studio (Natural IA)';
        short = 'Francisca';
      } else if (lower.includes('maria') || lower.includes('luciana') || lower.includes('heloisa')) {
        display = `🎙️ ${v.name.split('-')[0].trim()} (Locutora)`;
        short = v.name.split('-')[0].trim();
      }

      list.push({
        id: v.name,
        name: v.name,
        displayName: display,
        shortName: short,
        rawVoice: v
      });
    });

    return list;
  }

  getVoiceDisplayName(item) {
    if (!item) return '📱 Google Voz Natural (A mesma do Celular)';
    if (typeof item === 'string') {
      if (item === 'google_mobile') return '📱 Google Voz Natural (A mesma do Celular)';
      if (item === 'male_studio') {
        const realMale = this.getRealMaleVoice();
        return realMale 
          ? `🎙️ Locutor Masculino (${realMale.name.split('-')[0].trim()})`
          : '🎙️ Locutor Masculino (Estúdio Barítono)';
      }
      return item;
    }
    if (item.displayName) return item.displayName;
    if (item.id === 'google_mobile') return '📱 Google Voz Natural (A mesma do Celular)';
    if (item.id === 'male_studio') {
      const realMale = this.getRealMaleVoice();
      return realMale 
        ? `🎙️ Locutor Masculino (${realMale.name.split('-')[0].trim()})`
        : '🎙️ Locutor Masculino (Estúdio Barítono)';
    }
    return item.name || 'Locutor HD';
  }

  getShortVoiceName(item) {
    if (!item) return 'Google Celular';
    if (typeof item === 'string') {
      if (item === 'google_mobile') return 'Google Celular';
      if (item === 'male_studio') return 'Locutor Masculino';
      return item.slice(0, 15);
    }
    if (item.shortName) return item.shortName;
    if (item.id === 'google_mobile') return 'Google Celular';
    if (item.id === 'male_studio') return 'Locutor Masculino';
    const lower = (item.name || '').toLowerCase();
    if (lower.includes('antonio')) return 'Antonio Studio';
    if (lower.includes('daniel')) return 'Daniel';
    if (lower.includes('felipe')) return 'Felipe';
    if (lower.includes('francisca')) return 'Francisca';
    if (lower.includes('maria')) return 'Maria';
    return item.name?.split(/[-–()]/)[0].trim().slice(0, 15) || 'Locutor';
  }

  setVoice(voiceOrId) {
    if (typeof voiceOrId === 'string') {
      this.selectedVoiceIdentifier = voiceOrId;
    } else if (voiceOrId?.id) {
      this.selectedVoiceIdentifier = voiceOrId.id;
      this.selectedVoice = voiceOrId.rawVoice || null;
    } else if (voiceOrId?.name) {
      this.selectedVoiceIdentifier = voiceOrId.name;
      this.selectedVoice = voiceOrId;
    }
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

  configureUtterance(utterance) {
    utterance.lang = 'pt-BR';

    // Perfil 1: Locutor Masculino
    if (this.selectedVoiceIdentifier === 'male_studio') {
      const realMale = this.getRealMaleVoice();
      if (realMale) {
        // Voz masculina genuína encontrada no dispositivo (Antonio, Daniel, Felipe, Google Voz 2/3, Samsung)
        utterance.voice = realMale;
        if (realMale.lang) utterance.lang = realMale.lang;
        const lower = (realMale.name || '').toLowerCase();
        if (lower.includes('online') || lower.includes('natural')) {
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
        } else {
          utterance.rate = 0.94;
          utterance.pitch = 1.0;
        }
        return;
      }

      // Se o dispositivo só possuir vozes femininas instaladas (padrão de fábrica de alguns celulares):
      // Frequência de 0.56 desloca a voz para a região grave masculina de barítono (110Hz-125Hz)
      const base = this.getGoogleVoice();
      if (base) {
        utterance.voice = base;
        if (base.lang) utterance.lang = base.lang;
      }
      utterance.pitch = 0.56; // Transforma a frequência na escala masculina
      utterance.rate = 0.88;  // Cadência mais pausada e encorpada de locutor
      return;
    }

    // Perfil 2: Google Celular (A voz que o usuário achou mais interessante no celular)
    if (this.selectedVoiceIdentifier === 'google_mobile' || !this.selectedVoiceIdentifier) {
      const google = this.getGoogleVoice();
      if (google) {
        utterance.voice = google;
        if (google.lang) utterance.lang = google.lang;
      }
      utterance.pitch = 1.0;
      utterance.rate = this.rate;
      return;
    }

    // Perfil 3: Voz real do sistema (Antonio, Daniel, Francisca, etc.)
    const pt = this.getSystemPtVoices();
    const voice = pt.find(v => v.name === this.selectedVoiceIdentifier) || this.selectedVoice || this.getGoogleVoice();
    if (voice) {
      utterance.voice = voice;
      if (voice.lang) utterance.lang = voice.lang;
      const lower = (voice.name || '').toLowerCase();
      // Vozes Online do Edge (como Antonio): taxa e tom DEVEM ser 1.0 para a API da Microsoft não falhar
      if (lower.includes('online') || lower.includes('natural')) {
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
      } else {
        utterance.rate = this.rate;
        utterance.pitch = this.pitch;
      }
    }
  }

  // Tocar uma prévia de 3 segundos para testar a voz selecionada
  playSample(onEnd) {
    if (!this.synth) return;
    this.stop();
    this.isSamplePlaying = true;

    const sampleText = this.selectedVoiceIdentifier === 'male_studio'
      ? 'Olá! Sou o seu locutor masculino do Lumina Book. Pronto para começar a história?'
      : 'Olá! Sou a voz de leitura oficial do Lumina Book. Pronto para navegar nesta história?';

    const utterance = new SpeechSynthesisUtterance(sampleText);
    this.configureUtterance(utterance);

    utterance.onend = () => {
      this.isSamplePlaying = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Sample error, fallback:', e);
      this.isSamplePlaying = false;
      if (onEnd) onEnd();
    };

    if (this.synth.paused) {
      this.synth.resume();
    }
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
    this.configureUtterance(utterance);

    utterance.onend = () => {
      if (this.isSpeaking && !this.isPaused) {
        this.currentChunkIndex++;
        // Micro-pausa natural entre frases para respirar
        setTimeout(() => this.speakNextChunk(), 80);
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      console.warn('Speech chunk error for voice:', utterance.voice?.name, e);
      // Se falhar (ex: Antonio online sem rede no Edge), faz fallback para o Google Celular imediatamente
      if (utterance.voice && (utterance.voice.name.includes('Online') || utterance.voice.name.includes('Natural'))) {
        this.selectedVoiceIdentifier = 'google_mobile';
        this.speakNextChunk();
        return;
      }
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
