/**
 * Web Audio API synthesizer for the Himno del SENA
 * Plays a noble ceremonial melody with rhythmic cadence and tempo control.
 */

// Musical notes frequencies (Hz) for the ceremonial anthem motif
const NOTES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94
};

interface AnthemNote {
  note: string;
  duration: number; // in seconds
  stanzaIndex: number;
  lineIndex: number;
}

// Melody sequence representing the iconic march rhythm of the Himno del SENA
const ANTHEM_SCORE: AnthemNote[] = [
  // Coro: "Estudiantes del SENA adelante"
  { note: 'C4', duration: 0.6, stanzaIndex: 0, lineIndex: 0 },
  { note: 'E4', duration: 0.6, stanzaIndex: 0, lineIndex: 0 },
  { note: 'G4', duration: 0.8, stanzaIndex: 0, lineIndex: 0 },
  { note: 'C5', duration: 1.2, stanzaIndex: 0, lineIndex: 0 },
  // "por Colombia luchad con amor"
  { note: 'B4', duration: 0.6, stanzaIndex: 0, lineIndex: 1 },
  { note: 'A4', duration: 0.6, stanzaIndex: 0, lineIndex: 1 },
  { note: 'G4', duration: 0.8, stanzaIndex: 0, lineIndex: 1 },
  { note: 'E4', duration: 1.2, stanzaIndex: 0, lineIndex: 1 },
  // "con el ánimo noble y radiante"
  { note: 'F4', duration: 0.6, stanzaIndex: 0, lineIndex: 2 },
  { note: 'A4', duration: 0.6, stanzaIndex: 0, lineIndex: 2 },
  { note: 'C5', duration: 0.8, stanzaIndex: 0, lineIndex: 2 },
  { note: 'A4', duration: 1.0, stanzaIndex: 0, lineIndex: 2 },
  // "transformémosle el mundo en flor."
  { note: 'G4', duration: 0.6, stanzaIndex: 0, lineIndex: 3 },
  { note: 'E4', duration: 0.6, stanzaIndex: 0, lineIndex: 3 },
  { note: 'D4', duration: 0.8, stanzaIndex: 0, lineIndex: 3 },
  { note: 'C4', duration: 1.4, stanzaIndex: 0, lineIndex: 3 },

  // Estrofa 1: "De la patria el futuro destino,"
  { note: 'G4', duration: 0.6, stanzaIndex: 1, lineIndex: 0 },
  { note: 'G4', duration: 0.6, stanzaIndex: 1, lineIndex: 0 },
  { note: 'A4', duration: 0.8, stanzaIndex: 1, lineIndex: 0 },
  { note: 'G4', duration: 1.0, stanzaIndex: 1, lineIndex: 0 },
  // "en las manos del joven está,"
  { note: 'E4', duration: 0.6, stanzaIndex: 1, lineIndex: 1 },
  { note: 'F4', duration: 0.6, stanzaIndex: 1, lineIndex: 1 },
  { note: 'G4', duration: 1.2, stanzaIndex: 1, lineIndex: 1 },
  // "el trabajo es seguro camino,"
  { note: 'A4', duration: 0.6, stanzaIndex: 1, lineIndex: 2 },
  { note: 'C5', duration: 0.6, stanzaIndex: 1, lineIndex: 2 },
  { note: 'B4', duration: 0.8, stanzaIndex: 1, lineIndex: 2 },
  { note: 'A4', duration: 1.0, stanzaIndex: 1, lineIndex: 2 },
  // "que la paz a Colombia dará."
  { note: 'G4', duration: 0.6, stanzaIndex: 1, lineIndex: 3 },
  { note: 'D4', duration: 0.6, stanzaIndex: 1, lineIndex: 3 },
  { note: 'C4', duration: 1.6, stanzaIndex: 1, lineIndex: 3 }
];

export class AnthemSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTimeout: any = null;
  private onProgressCallback?: (stanzaIdx: number, lineIdx: number) => void;
  private onEndCallback?: () => void;
  private currentIndex: number = 0;

  constructor(
    onProgress?: (stanzaIdx: number, lineIdx: number) => void,
    onEnd?: () => void
  ) {
    this.onProgressCallback = onProgress;
    this.onEndCallback = onEnd;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentIndex = 0;
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public stop() {
    this.pause();
    this.currentIndex = 0;
    if (this.onProgressCallback) {
      this.onProgressCallback(0, 0);
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Use triangle oscillator for warm brass/chime timbre
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope: gentle attack, sustained body, smooth decay
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.18, now + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio context handling
    }
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    if (this.currentIndex >= ANTHEM_SCORE.length) {
      this.isPlaying = false;
      this.currentIndex = 0;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
      return;
    }

    const current = ANTHEM_SCORE[this.currentIndex];
    const freq = NOTES[current.note] || 440;

    this.playTone(freq, current.duration);

    if (this.onProgressCallback) {
      this.onProgressCallback(current.stanzaIndex, current.lineIndex);
    }

    const delayMs = current.duration * 1000;
    this.currentIndex++;

    this.currentTimeout = setTimeout(() => {
      this.scheduleNextNote();
    }, delayMs);
  }

  public getStatus() {
    return this.isPlaying;
  }
}
