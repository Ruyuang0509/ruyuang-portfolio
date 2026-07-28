from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "media" / "portfolio"
SIZES = (420, 640, 1200)
ASPECT = (4, 5)
ITEMS = [
    ("mv-urban", "URBAN", "RHYTHM", ("#11100d", "#596b25", "#cbe86b", "#efe9dc"), 59),
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


if __name__ == "__main__":
    save_variants()
    print(f"Generated local portfolio media in {OUT}")
