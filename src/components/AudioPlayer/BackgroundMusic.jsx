import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

/**
 * Procedural Music Box Synthesizer (Web Audio API)
 * Plays a gentle, nostalgic, crystalline music box baby birthday tune.
 * Works 100% offline with zero external network dependencies,
 * and automatically pauses when the mobile screen is locked or tab is closed.
 */
class MusicBoxSynth {
  constructor() {
    this.ctx = null;
    this.timer = null;
    this.isPlaying = false;
    this.noteIdx = 0;

    // Celebratory soothing baby melody notes (frequencies in Hz)
    // G4, G4, A4, G4, C5, B4 | G4, G4, A4, G4, D5, C5
    this.melody = [
      { note: 392.0, dur: 0.35, pause: 0.4 }, // G4
      { note: 392.0, dur: 0.35, pause: 0.4 }, // G4
      { note: 440.0, dur: 0.7, pause: 0.8 },  // A4
      { note: 392.0, dur: 0.7, pause: 0.8 },  // G4
      { note: 523.25, dur: 0.7, pause: 0.8 }, // C5
      { note: 493.88, dur: 1.2, pause: 1.4 }, // B4
      { note: 392.0, dur: 0.35, pause: 0.4 }, // G4
      { note: 392.0, dur: 0.35, pause: 0.4 }, // G4
      { note: 440.0, dur: 0.7, pause: 0.8 },  // A4
      { note: 392.0, dur: 0.7, pause: 0.8 },  // G4
      { note: 587.33, dur: 0.7, pause: 0.8 }, // D5
      { note: 523.25, dur: 1.4, pause: 1.6 }, // C5
      { note: 392.0, dur: 0.35, pause: 0.4 }, // G4
      { note: 392.0, dur: 0.35, pause: 0.4 }, // G4
      { note: 783.99, dur: 0.7, pause: 0.8 }, // G5
      { note: 659.25, dur: 0.7, pause: 0.8 }, // E5
      { note: 523.25, dur: 0.7, pause: 0.8 }, // C5
      { note: 493.88, dur: 0.7, pause: 0.8 }, // B4
      { note: 440.0, dur: 1.0, pause: 1.2 },  // A4
      { note: 698.46, dur: 0.4, pause: 0.45 }, // F5
      { note: 698.46, dur: 0.4, pause: 0.45 }, // F5
      { note: 659.25, dur: 0.7, pause: 0.8 },  // E5
      { note: 523.25, dur: 0.7, pause: 0.8 },  // C5
      { note: 587.33, dur: 0.7, pause: 0.8 },  // D5
      { note: 523.25, dur: 1.6, pause: 2.2 },  // C5
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(freq, duration) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Dual chime oscillators (fundamental + harmonic) for authentic music box sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, now); // subtle metallic overtone

    // Music box pluck envelope (instant attack, gentle exponential decay)
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.6);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, now);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(filter);
    filter.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.7);
    osc2.stop(now + duration + 0.7);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNext();
  }

  scheduleNext() {
    if (!this.isPlaying) return;
    const item = this.melody[this.noteIdx];
    this.playChime(item.note, item.dur);

    this.noteIdx = (this.noteIdx + 1) % this.melody.length;
    this.timer = setTimeout(() => {
      this.scheduleNext();
    }, item.pause * 1000);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  stop() {
    this.pause();
    this.noteIdx = 0;
  }
}

/**
 * BackgroundMusic Component
 *
 * Requirements:
 * - Plays gentle celebratory background music.
 * - Crucial: Automatically PAUSES whenever the user locks screen, minimizes browser,
 *   or switches tabs (`visibilitychange` with `document.hidden`), and closes on `pagehide`/unmount.
 * - Floating interactive toggle badge in bottom-right corner.
 */
export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const synthRef = useRef(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    synthRef.current = new MusicBoxSynth();

    // ── CRITICAL: Visibility & App Close listeners ──
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App / browser is minimized, screen is locked, or tab is hidden
        if (synthRef.current?.isPlaying) {
          wasPlayingRef.current = true;
          synthRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        // App / browser is reopened
        if (wasPlayingRef.current) {
          wasPlayingRef.current = false;
          synthRef.current.start();
          setIsPlaying(true);
        }
      }
    };

    const handlePageHide = () => {
      synthRef.current?.pause();
      setIsPlaying(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
      synthRef.current?.stop();
    };
  }, []);

  const toggleMusic = () => {
    setHasInteracted(true);
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      wasPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      synthRef.current.start();
      wasPlayingRef.current = false;
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 select-none">
      {/* Floating Prompt on first visit */}
      {!hasInteracted && !isPlaying && (
        <button
          type="button"
          onClick={toggleMusic}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-theme-navy text-xs font-display font-semibold shadow-lg border border-theme-rope/30 animate-bounce cursor-pointer hover:bg-white"
        >
          <Music size={13} className="text-theme-red fill-theme-red/20" />
          <span>Play Birthday Tune</span>
        </button>
      )}

      {/* Main Music Toggle Button */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl border-2 transition-all duration-300 cursor-pointer focus:outline-none ${
          isPlaying
            ? 'bg-theme-navy border-theme-sky text-theme-yellow hover:scale-105 ring-4 ring-theme-sky/30'
            : 'bg-white/95 border-theme-rope/30 text-theme-navy/70 hover:text-theme-navy hover:bg-white hover:scale-105'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 size={20} className="animate-pulse text-theme-yellow" />
            {/* Pulsing soundwave ring */}
            <span className="absolute -inset-1.5 rounded-full border border-theme-sky animate-ping pointer-events-none opacity-40" />
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
