// Web Audio API Synthesizer for Ultra-Soft, Warm Felted Piano, Singing Bowl & Mellow Harp Notes
// Tuned to a warm, low-mid register (174 Hz – 440 Hz) with gentle 25–50ms fade-in attacks
// and low-pass filtering so every interaction in the Veloura showcase feels calm, velvety, and never sharp.
// Defaults to MUTED until the visitor explicitly enables sound.

class LuxurySoundEngine {
  private ctx: AudioContext | null = null;
  // Default to muted until visitor explicitly enables sound
  private enabled: boolean = false;
  private lastHoverTime: number = 0;
  private lastChimeTime: number = 0;
  private tickAlternator: boolean = false;
  private activeSources: Set<AudioScheduledSourceNode> = new Set();
  private activeGains: Set<GainNode> = new Set();
  private activePourSource: AudioScheduledSourceNode | null = null;

  constructor() {
    // Always start muted on fresh load to strictly respect browser autoplay policies
    // and visitor preference until explicitly toggled on.
    this.enabled = false;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
        } catch {
          return null;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public stopAllSounds(): void {
    const now = this.ctx?.currentTime ?? 0;
    this.activeGains.forEach((gainNode) => {
      try {
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(0.0001, now);
      } catch {
        // Ignore gain cleanup error
      }
    });
    this.activeSources.forEach((source) => {
      try {
        source.stop();
        source.disconnect();
      } catch {
        // Ignore already-stopped source
      }
    });
    this.activeSources.clear();
    this.activeGains.clear();
    this.activePourSource = null;
  }

  public setEnabled(val: boolean): void {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('veloura_sound_enabled', String(val));
      } catch {
        // Ignore storage errors
      }
    }
    if (!val) {
      this.stopAllSounds();
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend().catch(() => {});
      }
    } else {
      this.playChimeSound();
    }
  }

  public cleanup(): void {
    this.stopAllSounds();
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  private registerSource(source: AudioScheduledSourceNode, gain: GainNode): void {
    this.activeSources.add(source);
    this.activeGains.add(gain);
    source.onended = () => {
      this.activeSources.delete(source);
      this.activeGains.delete(gain);
      if (this.activePourSource === source) {
        this.activePourSource = null;
      }
    };
  }

  // Helper: plays a warm, low-pass filtered felted-piano / singing-bowl tone with zero harsh click
  private playSoftFeltedNote(
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number = 0.018,
    attackTime: number = 0.028
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const oscFundamental = ctx.createOscillator();
    const oscWarmHarmonic = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const masterGain = ctx.createGain();
    const harmonicGain = ctx.createGain();

    oscFundamental.type = 'sine';
    oscFundamental.frequency.setValueAtTime(freq, startTime);

    oscWarmHarmonic.type = 'sine';
    oscWarmHarmonic.frequency.setValueAtTime(freq * 2, startTime);
    harmonicGain.gain.setValueAtTime(0.12, startTime);

    // Warm low-pass filter removes any piercing high frequencies
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(580, startTime);
    filter.frequency.exponentialRampToValueAtTime(260, startTime + duration);

    // Velvety fade-in envelope (no instant click) and smooth natural release
    masterGain.gain.setValueAtTime(0.0001, startTime);
    masterGain.gain.linearRampToValueAtTime(peakGain, startTime + attackTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscFundamental.connect(filter);
    oscWarmHarmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    this.registerSource(oscFundamental, masterGain);
    this.registerSource(oscWarmHarmonic, masterGain);

    oscFundamental.start(startTime);
    oscWarmHarmonic.start(startTime);
    oscFundamental.stop(startTime + duration + 0.02);
    oscWarmHarmonic.stop(startTime + duration + 0.02);
  }

  // Soft Muted Wooden / Marimba Pendulum Pulse for Date & Time Slot Selection
  public playClockTickSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      this.tickAlternator = !this.tickAlternator;
      const pair = this.tickAlternator ? [293.66, 220.0] : [261.63, 196.0];
      pair.forEach((freq, idx) => {
        const start = now + idx * 0.085;
        this.playSoftFeltedNote(freq, start, 0.16, idx === 0 ? 0.02 : 0.012, 0.014);
      });
    } catch {
      // Ignore audio errors
    }
  }

  // Dreamy Warm Harp Swell for Party Size Selection
  public playPartySizeSound(guestCountIndex: number = 2): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [174.61, 220.0, 261.63, 329.63, 392.0];
      const count = Math.min(Math.max(2, guestCountIndex + 1), 5);
      for (let i = 0; i < count; i++) {
        const start = now + i * 0.065;
        this.playSoftFeltedNote(notes[i % notes.length], start, 0.55, 0.016, 0.032);
      }
    } catch {
      // Ignore
    }
  }

  // Whisper-quiet warm acoustic harmonic for card hover & slide
  public playCardHoverSound(index: number = 0): void {
    const nowMs = performance.now();
    if (nowMs - this.lastHoverTime < 120) return;
    this.lastHoverTime = nowMs;

    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const scale = [196.0, 220.0, 261.63, 293.66, 329.63, 349.23];
      const freq = scale[index % scale.length];
      this.playSoftFeltedNote(freq, now, 0.45, 0.013, 0.035);
    } catch {
      // Ignore
    }
  }

  // Smooth, velvety two-note harp glide when switching menu category tabs
  public playTabSlideSound(tabIndex: number = 0): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const baseNotes = [196.0, 220.0, 246.94, 261.63, 293.66];
      const root = baseNotes[tabIndex % baseNotes.length];
      const fifth = root * 1.498;

      [root, fifth].forEach((freq, i) => {
        const startTime = now + i * 0.07;
        this.playSoftFeltedNote(freq, startTime, 0.62, 0.018, 0.035);
      });
    } catch {
      // Ignore
    }
  }

  // Meditative Warm Rhodes / Singing Bowl Chord for Confirmations & Cart Additions
  public playChimeSound(): void {
    const nowMs = performance.now();
    if (nowMs - this.lastChimeTime < 90) return;
    this.lastChimeTime = nowMs;

    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Warm low-mid Fmaj9 chord (F3, A3, C4, E4)
      const chord = [174.61, 220.0, 261.63, 329.63];
      chord.forEach((freq, idx) => {
        const start = now + idx * 0.075;
        this.playSoftFeltedNote(freq, start, 1.15, 0.018 / (idx * 0.35 + 1), 0.045);
      });
    } catch {
      // Ignore
    }
  }

  // Soft, breathy two-note interval for theme / filter toggles
  public playToggleSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      this.playSoftFeltedNote(261.63, now, 0.32, 0.015, 0.025);
      this.playSoftFeltedNote(329.63, now + 0.055, 0.38, 0.013, 0.028);
    } catch {
      // Ignore
    }
  }

  // Gentle warm ambient pour & singing bowl chord for 9-Bar espresso extraction
  public playEspressoPourSound(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Prevent overlapping espresso pour noise sources
      if (this.activePourSource) {
        try {
          this.activePourSource.stop();
          this.activePourSource.disconnect();
        } catch {
          // Ignore
        }
        this.activePourSource = null;
      }

      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 1.5);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Deeply muffled warm low-pass filter so steam/pour feels soft and atmospheric
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(340, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);

      whiteNoise.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      this.activePourSource = whiteNoise;
      this.registerSource(whiteNoise, noiseGain);

      whiteNoise.start(now);
      whiteNoise.stop(now + 1.5);

      this.playChimeSound();
    } catch {
      // Ignore
    }
  }
}

export const velouraSoundEngine = new LuxurySoundEngine();
