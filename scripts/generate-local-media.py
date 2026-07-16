from __future__ import annotations

import math
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "media" / "portfolio"
SIZES = (420, 640, 1200)
ASPECT = (4, 5)
FFMPEG_CANDIDATES = (
    Path(r"C:\Program Files\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"),
    Path(r"C:\Program Files\ffmpeg-8.1.2\bin\ffmpeg.exe"),
)


ITEMS = [
    ("gd-editorial", "EDITORIAL", "IDENTITY", ("#171511", "#b64f73", "#efe9dc", "#cbe86b"), 11),
    ("gd-kinetic", "KINETIC", "CAMPAIGN", ("#11100d", "#cbe86b", "#596b25", "#efe9dc"), 23),
    ("gd-analog", "ANALOG", "TYPE", ("#171511", "#88b8bf", "#d2b6d8", "#efe9dc"), 31),
    ("mv-soft", "SOFT", "TEASER", ("#14120f", "#d2b6d8", "#c7724a", "#efe9dc"), 43),
    ("mv-urban", "URBAN", "RHYTHM", ("#11100d", "#596b25", "#cbe86b", "#efe9dc"), 59),
    ("mv-fashion", "FASHION", "LOOP", ("#1a1115", "#b64f73", "#88b8bf", "#efe9dc"), 67),
    ("ph-after", "AFTER", "HOURS", ("#11100d", "#536789", "#c9975f", "#efe9dc"), 79),
    ("ph-geometry", "QUIET", "GEOMETRY", ("#d8cfbd", "#1a1711", "#596b25", "#cbe86b"), 83),
    ("ph-blue", "BLUE", "HOUR", ("#121b21", "#6f9db9", "#cbe86b", "#efe9dc"), 97),
]


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[index : index + 2], 16) for index in (0, 2, 4))


def get_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path(r"C:\Windows\Fonts\arialbd.ttf") if bold else Path(r"C:\Windows\Fonts\arial.ttf"),
        Path(r"C:\Windows\Fonts\segoeuib.ttf") if bold else Path(r"C:\Windows\Fonts\segoeui.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def gradient(width: int, height: int, start: str, end: str) -> Image.Image:
    start_rgb = hex_to_rgb(start)
    end_rgb = hex_to_rgb(end)
    image = Image.new("RGB", (width, height), start_rgb)
    pixels = image.load()
    for y in range(height):
        for x in range(width):
            diagonal = (x / max(width - 1, 1) * 0.48) + (y / max(height - 1, 1) * 0.52)
            wave = (math.sin((x + y) * 0.009) + 1) * 0.04
            t = min(1, max(0, diagonal + wave))
            pixels[x, y] = tuple(round(start_rgb[i] * (1 - t) + end_rgb[i] * t) for i in range(3))
    return image


def make_artwork(slug: str, title_a: str, title_b: str, palette: tuple[str, str, str, str], seed: int, width: int) -> Image.Image:
    height = int(width * ASPECT[1] / ASPECT[0])
    image = gradient(width, height, palette[0], palette[1]).convert("RGBA")
    draw = ImageDraw.Draw(image, "RGBA")

    accent = hex_to_rgb(palette[2])
    highlight = hex_to_rgb(palette[3])
    dark = hex_to_rgb(palette[0])

    for index in range(16):
        phase = seed * (index + 1)
        x = int((math.sin(phase) * 0.5 + 0.5) * width)
        y = int((math.cos(phase * 0.77) * 0.5 + 0.5) * height)
        radius = int(width * (0.08 + (index % 4) * 0.025))
        color = accent if index % 2 else highlight
        alpha = 34 + (index % 5) * 16
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(*color, alpha))

    for index in range(9):
        y = int(height * (0.14 + index * 0.086))
        skew = int(math.sin(seed + index) * width * 0.09)
        color = highlight if index % 3 == 0 else accent
        draw.rounded_rectangle(
            (int(width * -0.1) + skew, y, int(width * 0.86) + skew, y + int(width * 0.075)),
            radius=int(width * 0.018),
            fill=(*color, 62),
        )

    title_font = get_font(int(width * 0.155), bold=True)
    small_font = get_font(int(width * 0.04), bold=True)
    text_color = hex_to_rgb("#efe9dc" if sum(dark) < 360 else "#1a1711")
    draw.text((int(width * 0.07), int(height * 0.58)), title_a, font=title_font, fill=(*text_color, 245))
    draw.text((int(width * 0.07), int(height * 0.705)), title_b, font=title_font, fill=(*text_color, 225))
    draw.text((int(width * 0.075), int(height * 0.08)), f"{slug.upper()} / PROJECT OWNED MEDIA", font=small_font, fill=(*text_color, 160))
    draw.line((int(width * 0.075), int(height * 0.15), int(width * 0.55), int(height * 0.15)), fill=(*text_color, 118), width=max(1, width // 180))

    noise = Image.effect_noise((width, height), 18).convert("L")
    noise_rgba = Image.new("RGBA", (width, height), (255, 255, 255, 0))
    noise_rgba.putalpha(noise.point(lambda value: int(value * 0.08)))
    image = Image.alpha_composite(image, noise_rgba).filter(ImageFilter.UnsharpMask(radius=1.1, percent=120, threshold=4))
    return image.convert("RGB")


def save_variants() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, title_a, title_b, palette, seed in ITEMS:
        for width in SIZES:
            image = make_artwork(slug, title_a, title_b, palette, seed, width)
            image.save(OUT / f"{slug}-{width}.webp", "WEBP", quality=82, method=6)
            image.save(OUT / f"{slug}-{width}.avif", "AVIF", quality=54, speed=6)


def find_ffmpeg() -> str | None:
    for candidate in FFMPEG_CANDIDATES:
        if candidate.exists():
            return str(candidate)
    return shutil.which("ffmpeg")


def make_video_previews() -> None:
    ffmpeg = find_ffmpeg()
    if not ffmpeg:
        print("ffmpeg not found; image assets were generated, video previews skipped.")
        return

    video_items = [item for item in ITEMS if item[0].startswith("mv-")]
    for slug, title_a, title_b, palette, seed in video_items:
        with tempfile.TemporaryDirectory() as tmp:
            frame_dir = Path(tmp)
            base = make_artwork(slug, title_a, title_b, palette, seed, 640)
            for frame in range(48):
                t = frame / 47
                zoom = 1 + 0.06 * math.sin(t * math.pi)
                crop_w = int(base.width / zoom)
                crop_h = int(base.height / zoom)
                offset_x = int((base.width - crop_w) * (0.5 + 0.28 * math.sin(t * math.tau + seed)))
                offset_y = int((base.height - crop_h) * (0.5 + 0.18 * math.cos(t * math.tau + seed)))
                current = base.crop((offset_x, offset_y, offset_x + crop_w, offset_y + crop_h)).resize(base.size, Image.Resampling.LANCZOS)
                overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
                draw = ImageDraw.Draw(overlay, "RGBA")
                draw.rectangle((0, int(base.height * (0.84 + 0.02 * math.sin(t * math.tau))), base.width, base.height), fill=(5, 5, 5, 92))
                current = Image.alpha_composite(current.convert("RGBA"), overlay).convert("RGB")
                current.save(frame_dir / f"frame-{frame:04d}.png", "PNG")

            subprocess.run(
                [
                    ffmpeg,
                    "-y",
                    "-framerate",
                    "24",
                    "-i",
                    str(frame_dir / "frame-%04d.png"),
                    "-an",
                    "-c:v",
                    "libx264",
                    "-pix_fmt",
                    "yuv420p",
                    "-crf",
                    "30",
                    "-movflags",
                    "+faststart",
                    str(OUT / f"{slug}-preview.mp4"),
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )


if __name__ == "__main__":
    save_variants()
    make_video_previews()
    print(f"Generated local portfolio media in {OUT}")
