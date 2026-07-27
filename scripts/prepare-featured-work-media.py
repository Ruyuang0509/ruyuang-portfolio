from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

from PIL import Image


OUTPUT_WIDTHS = (400, 640, 1200)
TARGET_ASPECT = 16 / 10


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create responsive 16:10 AVIF/WebP derivatives from a supplied work image.",
    )
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--slug", required=True)
    parser.add_argument("--expected-sha256", required=True)
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "public" / "media" / "portfolio",
    )
    return parser.parse_args()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source_file:
        for chunk in iter(lambda: source_file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest().upper()


def center_crop_16_by_10(image: Image.Image) -> Image.Image:
    width, height = image.size
    current_aspect = width / height

    if current_aspect > TARGET_ASPECT:
        crop_width = int(height * TARGET_ASPECT)
        crop_width -= crop_width % 8
        left = (width - crop_width) // 2
        return image.crop((left, 0, left + crop_width, height))

    crop_height = int(width / TARGET_ASPECT)
    crop_height -= crop_height % 5
    top = (height - crop_height) // 2
    return image.crop((0, top, width, top + crop_height))


def main() -> None:
    args = parse_args()
    source = args.source.resolve()
    expected_sha256 = args.expected_sha256.upper()

    if not source.is_file():
        raise FileNotFoundError(f"Source image does not exist: {source}")

    actual_sha256 = sha256(source)
    if actual_sha256 != expected_sha256:
        raise ValueError(
            f"Source SHA-256 mismatch: expected {expected_sha256}, received {actual_sha256}",
        )

    args.output_dir.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened_image:
        cropped = center_crop_16_by_10(opened_image.convert("RGB"))
        for width in OUTPUT_WIDTHS:
            height = width * 10 // 16
            derivative = cropped.resize((width, height), Image.Resampling.LANCZOS)
            derivative.save(
                args.output_dir / f"{args.slug}-{width}.webp",
                "WEBP",
                quality=88,
                method=6,
                exif=b"",
            )
            derivative.save(
                args.output_dir / f"{args.slug}-{width}.avif",
                "AVIF",
                quality=62,
                speed=6,
                exif=b"",
            )

    print(
        f"Prepared {args.slug}: source {source.name}, SHA-256 {actual_sha256}, "
        f"{len(OUTPUT_WIDTHS) * 2} derivatives.",
    )


if __name__ == "__main__":
    main()
