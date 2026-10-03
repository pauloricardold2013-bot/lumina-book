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

// High Quality Locutor Masculino Narration Engine (Anti-Freeze & Sentence-by-Sentence Queue)
class SpeechNarrator {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.queue = [];
    this.currentChunkIndex = 0;
    this.selectedVoice = null;
    this.rate = 0.95; // Calm storytelling pacing
    this.pitch = 0.85; // Deep masculine broadcaster tone
    this.onStateChange = null;
    this.onSentenceChange = null;
    this.onSlideEnd = null;
    this.heartbeatTimer = null;

    if (typeof window !== 'undefined' && this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    const ptVoices = all.filter(v => v.lang && (v.lang.startsWith('pt') || v.lang.includes('BR') || v.lang.includes('PT')));

    // Identify male voices
    const isMale = (v) => {
      const name = (v.name || '').toLowerCase();
      return (
        name.includes('antonio') ||
        name.includes('daniel') ||
        name.includes('fabio') ||
        name.includes('ricardo') ||
        name.includes('thiago') ||
        name.includes('felipe') ||
        name.includes('male') ||
        name.includes('homem') ||
        name.includes('neural') && !name.includes('francisca') && !name.includes('maria') && !name.includes('heloisa')
      );
    };

    // Priority 1: High Quality Natural/Online Male Voice (Edge Natural Antonio/Daniel)
    const naturalMale = ptVoices.find(v => isMale(v) && (v.name.includes('Natural') || v.name.includes('Online')));
    // Priority 2: Any male Portuguese voice
    const maleVoice = ptVoices.find(v => isMale(v));
    // Priority 3: Any pt-BR voice
    const ptBR = ptVoices.find(v => v.lang.includes('BR'));
    // Fallback
    const fallback = ptVoices[0] || all[0];

    this.selectedVoice = naturalMale || maleVoice || ptBR || fallback;
    return ptVoices;
  }

  getAvailableVoices() {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    return all.filter(v => v.lang && (v.lang.startsWith('pt') || v.lang.includes('BR') || v.lang.includes('PT')));
  }

  setVoice(voice) {
    this.selectedVoice = voice;
  }

  setRate(newRate) {
    this.rate = Math.max(0.7, Math.min(1.4, newRate));
  }

  setPitch(newPitch) {
    this.pitch = Math.max(0.6, Math.min(1.2, newPitch));
  }

  // Prepares and splits text into natural narrative sentences
  cleanAndChunkText(text) {
    if (!text) return [];

    // Clean symbols and markdown
    const cleaned = text
      .replace(/[📖✨🛡️👻🌑🐇📚]/g, '')
      .replace(/\*\*/g, '')
      .replace(/_{1,2}/g, '')
      .replace(/—/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();

    // Split by sentence boundaries (. ! ? \n)
    const rawChunks = cleaned.match(/[^.!?\n]+[.!?\n]*/g) || [cleaned];

    // Filter and normalize chunks
    const chunks = [];
    rawChunks.forEach(chunk => {
      const trimmed = chunk.trim();
      if (trimmed.length > 0) {
        // If a chunk is excessively long (over 180 chars), split by comma or clause to avoid any audio lag
        if (trimmed.length > 200) {
          const subparts = trimmed.split(/([,;:]+)/);
          let temp = '';
          subparts.forEach(sub => {
            if ((temp + sub).length > 150) {
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

    // Locutor Masculino pitch tuning:
    // If voice name contains female name, pitch down to 0.78 to give masculine timbre
    const voiceName = (this.selectedVoice?.name || '').toLowerCase();
    const isFemale = voiceName.includes('maria') || voiceName.includes('luciana') || voiceName.includes('heloisa') || voiceName.includes('francisca') || voiceName.includes('female');
    utterance.pitch = isFemale ? 0.76 : this.pitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      if (this.isSpeaking && !this.isPaused) {
        this.currentChunkIndex++;
        // Natural micro-pause between sentences
        setTimeout(() => this.speakNextChunk(), 90);
      }
    };

    utterance.onerror = (e) => {
      // If cancelled intentionally, ignore
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
