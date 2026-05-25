#!/usr/bin/env python3
"""Add cinematic voice narration to the Ashanti Empire EP02 video."""

import subprocess, os, sys

OUT_DIR = "/home/user/wdd130"
VIDEO_IN  = f"{OUT_DIR}/ashanti_empire_ep02_final.mp4"
VIDEO_OUT = f"{OUT_DIR}/ashanti_empire_ep02_voiced.mp4"

HOOK = (
    "The British tried to conquer them four times. "
    "They failed four times. "
    "This is the story of a kingdom that refused to kneel."
)

VOICE_RAW = f"{OUT_DIR}/tmp_voice_raw.wav"
VOICE_PROC = f"{OUT_DIR}/tmp_voice_proc.wav"

def run(cmd, desc=""):
    print(f"\n[RUN] {desc or cmd[:80]}")
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"STDERR: {r.stderr[-600:]}")
        sys.exit(1)
    print("  OK")
    return r

def get_duration(path):
    r = subprocess.run(
        f'ffprobe -v quiet -show_entries format=duration -of csv=p=0 "{path}"',
        shell=True, capture_output=True, text=True
    )
    return float(r.stdout.strip())

# Step 1: Generate voice with espeak-ng (deep baritone, slow, dramatic)
run(
    f'espeak-ng -v en-gb -s 115 -p 18 -a 200 -g 6 -w "{VOICE_RAW}" "{HOOK}"',
    "Generating narration with espeak-ng"
)

voice_dur = get_duration(VOICE_RAW)
video_dur = get_duration(VIDEO_IN)
print(f"  Voice: {voice_dur:.2f}s  |  Video: {video_dur:.2f}s")

# Step 2: Process voice — add reverb, low-pass warmth, slight bass boost
# aecho: add subtle reverb for depth
# equalizer: boost 200Hz (warmth), cut 4kHz+ (remove hiss)
# loudnorm: normalize to broadcast level
run(
    f'ffmpeg -y -i "{VOICE_RAW}" '
    f'-af "aecho=0.8:0.7:60|80:0.3|0.2,'
    f'equalizer=f=200:t=o:w=200:g=3,'
    f'equalizer=f=5000:t=o:w=2000:g=-4,'
    f'loudnorm=I=-16:TP=-1.5:LRA=11" '
    f'"{VOICE_PROC}"',
    "Processing voice — reverb, EQ, normalize"
)

# Step 3: Build final mix
# - narration starts at 1.5s (give title card a moment of silence)
# - original scene audio at 15% (background ambience)
# - narration at 100%, fades out in last 2s
# - total audio length = video duration

lead_in = 1.5
fade_start = min(lead_in + voice_dur, video_dur - 2.0)

run(
    f'ffmpeg -y '
    f'-i "{VIDEO_IN}" '
    f'-i "{VOICE_PROC}" '
    f'-filter_complex "'
    # Delay voice by lead_in seconds
    f'[1:a]adelay={int(lead_in*1000)}|{int(lead_in*1000)}[voice_delayed];'
    # Fade voice out in last 2s
    f'[voice_delayed]afade=t=out:st={fade_start:.2f}:d=2.0[voice_faded];'
    # Reduce original audio to 15% and trim to video length
    f'[0:a]volume=0.15,atrim=0:{video_dur:.3f}[bg];'
    # Mix: background + narration
    f'[bg][voice_faded]amix=inputs=2:normalize=0[aout]'
    f'" '
    f'-map "0:v" -map "[aout]" '
    f'-c:v copy '
    f'-c:a aac -b:a 192k '
    f'-t {video_dur:.3f} '
    f'"{VIDEO_OUT}"',
    "Mixing narration into video"
)

# Clean up
for f in [VOICE_RAW, VOICE_PROC]:
    try: os.remove(f)
    except: pass

size_mb = os.path.getsize(VIDEO_OUT) // (1024 * 1024)
print(f"\n=== DONE ===")
print(f"Output: {VIDEO_OUT}")
print(f"Duration: {get_duration(VIDEO_OUT):.1f}s  |  Size: {size_mb}MB")
