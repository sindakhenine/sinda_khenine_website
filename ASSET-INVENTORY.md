# Asset Inventory

Inventory date: 16 July 2026. Original files remain unchanged under `images/`. Identically named deployment copies under `public/assets/` are intentional because Next.js serves static public files only from `public/`; the mapping is one-to-one and checksum-identical.

| Original | MIME | Bytes | Technical validation | SHA-256 | Public use |
|---|---:|---:|---|---|---|
| `images/book_cover.jpg` | `image/jpeg` | 210,797 | 1600×2560, RGB JPEG; visually inspected | `7afd117561f21b87f0ed54e51eb6f92a9b2a713445da351eb00eccee19c3a0ed` | `/assets/book_cover.jpg`; homepage and Book page |
| `images/book_teaser.mp4` | `video/mp4` | 9,506,819 | Quick Look decoded a valid video frame | `d86bf51ba62ea2250e5760d337fc793d3cce0808e2bd7c7cc330eabaef809999` | `/assets/book_teaser.mp4`; Book page, controls, `playsInline`, metadata preload |
| `images/sinda_cv.pdf` | `application/pdf` | 37,791 | Opens; two US-letter pages; unencrypted; no JavaScript; visually inspected | `79017e7cec0320f5cdd4425c9a4293880d22a163f6c0892b6a1181382be1d5f5` | `/assets/sinda_cv.pdf`; Resume download, PDF · 37 KB |
| `images/sinda_picture.jpeg` | `image/jpeg` | 230,252 | 1024×1024, RGB JPEG; visually inspected | `057c721739a6be339620c463229de63a403b47dfe3cd8af5b23532fd9486251f` | About, Resume, Speaking and homepage portrait |
| `images/sinda_presentation.mp4` | `video/mp4` | 20,184,545 | Quick Look decoded a valid 16:9 video frame | `f6a6fa67e07854711114d690ede87074656979f836c2a00225c1ca9ffd026604` | Hero muted autoplay/loop and Speaking controls |

## Derived assets

- `book_cover-1200.jpg` and `book_cover-720.jpg`: responsive derivatives; aspect ratio preserved.
- `sinda_picture-960.jpg` and `sinda_picture-640.jpg`: quality-controlled responsive portrait derivatives; original preserved.
- `book-teaser-poster.jpg`: cover-derived static poster and fallback.
- `sinda-presentation-poster.jpg`: portrait-derived poster and reduced-motion fallback.

No supplied asset was renamed. The original-to-public mapping preserves each name. Existing legacy `public/images/book-cover.jpg` and `book-square.jpg` have different checksums and are no longer referenced by the application. No alternate CV is linked or exposed.

Checksum duplicate review found only intentional source-to-public delivery copies and generated/build records; no supplied asset was accidentally imported twice under competing public names.
