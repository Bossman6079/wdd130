#!/usr/bin/env python3
"""Build cinematic Ashanti Empire EP02 video from scene clips."""

import subprocess
import os
import sys

UPLOAD_DIR = "/root/.claude/uploads/056d8d1c-ae0d-4b62-92e5-5eee62441455"
OUT_DIR = "/home/user/wdd130"

# Chronological order based on filenames (timestamps in filename)
CLIPS = [
    f"{UPLOAD_DIR}/99d7f986-WhatsApp_Video_20260525_at_11.33.15_AM.mp4",   # 11:33:15
    f"{UPLOAD_DIR}/dddcfc15-WhatsApp_Video_20260525_at_11.33.16_AM.mp4",   # 11:33:16
    f"{UPLOAD_DIR}/f4af1478-WhatsApp_Video_20260525_at_11.33.37_AM.mp4",   # 11:33:37
    f"{UPLOAD_DIR}/4bd8ed58-WhatsApp_Video_20260525_at_11.33.38_AM.mp4",   # 11:33:38
]

FONT_BOLD   = "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/freefont/FreeSans.ttf"

W, H = 1920, 1080
FPS = 24
CLIP_DUR = 5.21
FADE_DUR = 0.7   # crossfade duration in seconds
TITLE_DUR = 5.0  # title card duration

# Colors (hex → ffmpeg drawtext format)
BG_COLOR   = "0x1A4D2E"   # deep forest green
GOLD_COLOR = "0xB8860B"
WHITE      = "white"

def run(cmd, desc=""):
    print(f"\n[RUN] {desc or cmd[:80]}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"STDERR: {result.stderr[-800:]}")
        sys.exit(1)
    print("  OK")
    return result

def step1_title_card():
    """Create a 5s title card on dark green with gold/white text."""
    out = f"{OUT_DIR}/tmp_title.mp4"
    # Escape colons in drawtext
    title_text = "THE ASHANTI EMPIRE"
    sub_text   = "The Kingdom That Refused to Kneel"
    # Fade in over 1s, hold, fade out over 1s
    fade_in  = f"fade=t=in:st=0:d=1"
    fade_out = f"fade=t=out:st={TITLE_DUR-1}:d=1"

    vf = (
        f"drawtext=text='{title_text}'"
        f":fontfile={FONT_BOLD}:fontsize=90:fontcolor={GOLD_COLOR}"
        f":x=(w-text_w)/2:y=(h-text_h)/2-70:enable='gte(t,0.5)',"
        f"drawtext=text='EP 02 — Kingdom Chronicles'"
        f":fontfile={FONT_REGULAR}:fontsize=32:fontcolor=0xCCCCCC"
        f":x=(w-text_w)/2:y=80:enable='gte(t,0.5)',"
        f"drawtext=text='{sub_text}'"
        f":fontfile={FONT_REGULAR}:fontsize=44:fontcolor={WHITE}"
        f":x=(w-text_w)/2:y=(h-text_h)/2+30:enable='gte(t,1.0)',"
        f"{fade_in},{fade_out}"
    )

    cmd = (
        f'ffmpeg -y -f lavfi -i color=c={BG_COLOR}:size={W}x{H}:rate={FPS}:duration={TITLE_DUR} '
        f'-f lavfi -i anullsrc=r=44100:cl=stereo '
        f'-vf "{vf}" '
        f'-t {TITLE_DUR} '
        f'-c:v libx264 -preset fast -crf 18 '
        f'-c:a aac -b:a 128k '
        f'"{out}"'
    )
    run(cmd, "Creating title card")
    return out

def step2_normalize_clips():
    """Scale portrait clips to 1920x1080 (centered, black bars), add color grade."""
    outputs = []
    for i, clip in enumerate(CLIPS, 1):
        out = f"{OUT_DIR}/tmp_clip_{i}.mp4"
        vf = (
            f"scale={W}:{H}:force_original_aspect_ratio=decrease,"
            f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:black,"
            # Warm cinematic color grade: boost reds/golds, slight vignette
            f"eq=brightness=0.02:saturation=1.15:contrast=1.05,"
            f"vignette=PI/4"
        )
        cmd = (
            f'ffmpeg -y -i "{clip}" '
            f'-vf "{vf}" '
            f'-r {FPS} '
            f'-c:v libx264 -preset fast -crf 18 '
            f'-c:a aac -b:a 128k -ar 44100 -ac 2 '
            f'"{out}"'
        )
        run(cmd, f"Normalizing clip {i}")
        outputs.append(out)
    return outputs

def step3_combine(title, clips):
    """Concatenate title + clips with crossfade transitions."""
    all_clips = [title] + clips
    n = len(all_clips)

    # Build inputs
    inputs = " ".join(f'-i "{c}"' for c in all_clips)

    # xfade chain: video
    # Each clip duration: title=5s, clips=5.21s
    durations = [TITLE_DUR] + [CLIP_DUR] * len(clips)

    vchain = "[0:v]"
    achain = "[0:a]"
    v_label = "[0:v]"
    a_label = "[0:a]"

    filter_parts = []
    offset = 0.0
    for i in range(1, n):
        offset += durations[i - 1] - FADE_DUR
        out_v = f"[v{i}]"
        out_a = f"[a{i}]"
        filter_parts.append(
            f"{v_label}[{i}:v]xfade=transition=fade:duration={FADE_DUR}:offset={offset:.3f}{out_v}"
        )
        filter_parts.append(
            f"{a_label}[{i}:a]acrossfade=d={FADE_DUR}{out_a}"
        )
        v_label = out_v
        a_label = out_a

    final_v = v_label
    final_a = a_label

    filter_complex = ";".join(filter_parts)

    out = f"{OUT_DIR}/ashanti_empire_ep02_cinematic.mp4"
    cmd = (
        f'ffmpeg -y {inputs} '
        f'-filter_complex "{filter_complex}" '
        f'-map "{final_v}" -map "{final_a}" '
        f'-c:v libx264 -preset fast -crf 18 '
        f'-c:a aac -b:a 128k '
        f'"{out}"'
    )
    run(cmd, "Combining all clips with crossfades")
    return out

def step4_add_outro(combined):
    """Add a fade-to-black at the end and burn in a subtle episode label."""
    out = f"{OUT_DIR}/ashanti_empire_ep02_final.mp4"
    # Get total duration of combined video
    probe = subprocess.run(
        f'ffprobe -v quiet -show_entries format=duration -of csv=p=0 "{combined}"',
        shell=True, capture_output=True, text=True
    )
    total_dur = float(probe.stdout.strip())
    fade_start = total_dur - 1.5

    vf = (
        f"fade=t=out:st={fade_start:.3f}:d=1.5,"
        f"drawtext=text='Kingdom Chronicles • EP 02'"
        f":fontfile={FONT_REGULAR}:fontsize=24:fontcolor=white@0.5"
        f":x=w-text_w-30:y=h-text_h-30:enable='between(t,2,{total_dur-2})'"
    )
    af = f"afade=t=out:st={fade_start:.3f}:d=1.5"

    cmd = (
        f'ffmpeg -y -i "{combined}" '
        f'-vf "{vf}" '
        f'-af "{af}" '
        f'-c:v libx264 -preset fast -crf 18 '
        f'-c:a aac -b:a 128k '
        f'"{out}"'
    )
    run(cmd, "Adding fade-out and watermark")
    return out

def cleanup(files):
    for f in files:
        try:
            os.remove(f)
        except Exception:
            pass

if __name__ == "__main__":
    print("=== Building Ashanti Empire EP02 Cinematic Video ===\n")

    title    = step1_title_card()
    clips    = step2_normalize_clips()
    combined = step3_combine(title, clips)
    final    = step4_add_outro(combined)

    # Clean up temp files
    cleanup([title, combined] + clips)

    # Report
    size = os.path.getsize(final) // (1024 * 1024)
    probe = subprocess.run(
        f'ffprobe -v quiet -show_entries format=duration -of csv=p=0 "{final}"',
        shell=True, capture_output=True, text=True
    )
    dur = float(probe.stdout.strip())
    print(f"\n=== DONE ===")
    print(f"Output: {final}")
    print(f"Duration: {dur:.1f}s  |  Size: {size}MB")
