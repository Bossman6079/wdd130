#!/usr/bin/env python3
"""
Synthesize a cinematic West African-style soundtrack for the Ashanti video.
Layers: bass drone, kora-like melody, talking-drum rhythm, orchestral swell.
"""

import numpy as np
import wave, struct, os

SR = 44100          # sample rate
DURATION = 24.0     # match video length (slightly over 23.1s)
N = int(SR * DURATION)
OUT = "/home/user/wdd130/tmp_music.wav"

t = np.linspace(0, DURATION, N, endpoint=False)

def sine(freq, amp=1.0, phase=0.0):
    return amp * np.sin(2 * np.pi * freq * t + phase)

def adsr(attack, decay, sustain_level, release, note_start, note_dur):
    """Return an envelope array for one note."""
    env = np.zeros(N)
    s = int(note_start * SR)
    nd = int(note_dur * SR)
    a = int(attack * SR)
    d = int(decay * SR)
    r = int(release * SR)
    sustain_dur = nd - a - d - r
    if sustain_dur < 0:
        sustain_dur = 0
    for i in range(min(a, N - s)):
        env[s + i] = i / max(a, 1)
    for i in range(min(d, N - s - a)):
        env[s + a + i] = 1.0 - (1.0 - sustain_level) * i / max(d, 1)
    for i in range(min(sustain_dur, N - s - a - d)):
        env[s + a + d + i] = sustain_level
    for i in range(min(r, N - s - a - d - sustain_dur)):
        env[s + a + d + sustain_dur + i] = sustain_level * (1.0 - i / max(r, 1))
    return env

# ── LAYER 1: LOW BASS DRONE ────────────────────────────────────────────────
# Slow-attack bass at 55Hz (A1) — builds over first 3 seconds
bass_env = np.zeros(N)
attack_frames = int(3.0 * SR)
sustain_frames = int(18.0 * SR)
release_frames = int(3.0 * SR)
for i in range(attack_frames):
    bass_env[i] = i / attack_frames
for i in range(sustain_frames):
    bass_env[attack_frames + i] = 1.0
for i in range(release_frames):
    idx = attack_frames + sustain_frames + i
    if idx < N:
        bass_env[idx] = 1.0 - i / release_frames

bass = (sine(55.0) + 0.4 * sine(110.0) + 0.2 * sine(165.0)) * bass_env * 0.35

# ── LAYER 2: KORA-LIKE MELODY ──────────────────────────────────────────────
# Kora is a 21-string West African harp. Pentatonic scale: A C D E G
# Notes in Hz (A minor pentatonic, higher octave)
notes = {
    'A3': 220.0, 'C4': 261.6, 'D4': 293.7, 'E4': 329.6,
    'G4': 392.0, 'A4': 440.0, 'C5': 523.2, 'D5': 587.3,
    'E5': 659.3, 'G5': 784.0
}

# Melodic phrase — sparse, meditative, documentary feel
melody_pattern = [
    # (note, start_sec, duration_sec)
    ('A4', 2.0,  0.8), ('E4', 3.2,  0.6), ('G4', 4.2,  0.9),
    ('A4', 5.5,  0.5), ('C5', 6.5,  0.7), ('A4', 7.5,  0.9),
    ('G4', 9.0,  0.6), ('E4', 10.0, 0.8), ('D4', 11.2, 0.9),
    ('A3', 12.5, 1.2), ('E4', 14.5, 0.6), ('G4', 15.5, 0.8),
    ('A4', 16.8, 0.5), ('D5', 17.8, 0.7), ('C5', 19.0, 0.9),
    ('A4', 20.5, 1.5),
]

kora = np.zeros(N)
for note_name, start, dur in melody_pattern:
    freq = notes[note_name]
    env = adsr(0.01, 0.05, 0.6, min(0.3, dur * 0.4), start, dur)
    # Kora timbre: fundamental + 2nd harmonic + slight inharmonicity
    kora += (sine(freq) + 0.5 * sine(freq * 2.01) + 0.2 * sine(freq * 3.0)) * env

kora *= 0.28

# ── LAYER 3: TALKING DRUM RHYTHM ──────────────────────────────────────────
# African talking drum: short sharp noise burst filtered to ~200–600Hz
# Rhythm: traditional 4/4 with syncopation (120 BPM)
BPM = 112
beat = 60.0 / BPM          # seconds per beat = 0.536s

drum_hits = []
bar = 0.0
while bar + 4 * beat < DURATION - 1:
    # Beat 1: strong hit (kick-like, lower pitch burst)
    drum_hits.append((bar, 'low', 0.9))
    # Beat 2: softer
    drum_hits.append((bar + beat, 'mid', 0.45))
    # Beat 3: medium
    drum_hits.append((bar + 2 * beat, 'low', 0.7))
    # Beat 4: soft
    drum_hits.append((bar + 3 * beat, 'mid', 0.4))
    # Syncopation: off-beat hits
    drum_hits.append((bar + beat * 0.5, 'high', 0.3))
    drum_hits.append((bar + beat * 2.5, 'high', 0.25))
    drum_hits.append((bar + beat * 3.5, 'high', 0.2))
    bar += 4 * beat

rng = np.random.default_rng(42)
drums = np.zeros(N)
hit_dur = int(0.06 * SR)
for hit_time, pitch, vel in drum_hits:
    si = int(hit_time * SR)
    if si + hit_dur >= N:
        continue
    noise_burst = rng.standard_normal(hit_dur)
    # Decay envelope
    decay_env = np.exp(-np.linspace(0, 10, hit_dur))
    noise_burst *= decay_env
    # Pitch shaping via frequency selection
    if pitch == 'low':
        freq_center, q = 150, 0.7
    elif pitch == 'mid':
        freq_center, q = 350, 0.8
    else:
        freq_center, q = 700, 0.9
    # Simple one-pole filter approximation
    alpha = freq_center / SR
    filtered = np.zeros(hit_dur)
    prev = 0.0
    for i, s in enumerate(noise_burst):
        filtered[i] = prev + alpha * (s - prev)
        prev = filtered[i]
    drums[si:si + hit_dur] += filtered * vel

drums *= 0.55

# Slow fade-in for drums (start at 1.5s to match voice lead-in)
drum_fadein = int(1.5 * SR)
drums[:drum_fadein] *= np.linspace(0, 1, drum_fadein)

# ── LAYER 4: ORCHESTRAL SWELL ─────────────────────────────────────────────
# String pad: stacked fifths (A2 + E3 + A3) with slow attack
swell = (
    sine(110.0) * 0.4 +          # A2
    sine(165.0) * 0.3 +          # E3
    sine(220.0) * 0.25 +         # A3
    sine(330.0) * 0.15           # E4
)
swell_env = np.zeros(N)
# Swell starts at 8s, peaks at 14s, holds through 20s, fades
swell_start = int(8.0 * SR)
swell_peak  = int(14.0 * SR)
swell_hold  = int(20.0 * SR)
swell_end   = int(23.0 * SR)
for i in range(swell_peak - swell_start):
    swell_env[swell_start + i] = i / (swell_peak - swell_start)
for i in range(swell_hold - swell_peak):
    swell_env[swell_peak + i] = 1.0
for i in range(swell_end - swell_hold):
    if swell_hold + i < N:
        swell_env[swell_hold + i] = 1.0 - i / (swell_end - swell_hold)
swell = swell * swell_env * 0.18

# ── MIX ALL LAYERS ────────────────────────────────────────────────────────
mix = bass + kora + drums + swell

# Master fade in/out
master_env = np.ones(N)
fade_in_frames  = int(0.5 * SR)
fade_out_frames = int(2.0 * SR)
master_env[:fade_in_frames] = np.linspace(0, 1, fade_in_frames)
master_env[-fade_out_frames:] = np.linspace(1, 0, fade_out_frames)
mix *= master_env

# Normalize to -3 dBFS
peak = np.max(np.abs(mix))
mix = mix / peak * 0.707

# Write WAV
mix_int16 = (mix * 32767).astype(np.int16)
with wave.open(OUT, 'w') as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes(mix_int16.tobytes())

print(f"Music track written: {OUT}  ({DURATION}s, mono, {SR}Hz)")
