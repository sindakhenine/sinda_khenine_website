# Test Results

Run date: 16 July 2026.

| Check | Result |
|---|---|
| Asset existence and MIME | Pass; all five supplied assets present and correct |
| Cover and portrait render | Pass; visual inspection and dimensions confirmed |
| Resume PDF | Pass; opens, two pages, unencrypted, no JavaScript, HTTP `application/pdf` |
| Video decode/open | Pass; Quick Look produced valid frames for both MP4s |
| Video HTTP playback support | Pass; `video/mp4`, HTTP 206, byte ranges accepted |
| ESLint | Pass; zero warnings/errors |
| TypeScript strict check | Pass |
| Unit tests | Pass; 8/8 |
| Production build | Pass; 32 generated pages/routes |
| Route-source validation | Pass; 19/19 |
| Internal-link source scan | Pass; 29 sources, 17 static links |
| HTTP pages/assets | Pass; all requested pages and five public assets return 200; one initial test typo returned the expected 404 and the correct route then returned 200 |
| Sitemap, robots and icon | Pass; correct MIME and HTTP 200 |
| Public project confidentiality scan | Pass; no Electrolux, private Gmail or localhost string in application/content sources |
| Reduced-motion implementation | Pass by code review; no homepage autoplay and all motion transitions are disabled under reduced motion |
| Public-copy audit | Pass; no em dash, Electrolux reference or outdated public contact in rendered application/content sources |
| Conference-status audit | Pass; ML Con Munich 2026 is Completed and ML Con Berlin 2026 is Upcoming |
| Refinement route audit | Pass; Home, Projects, Writing, Book, Resume, Speaking and Contact return HTTP 200 |
| Homepage presentation | Pass; referenced once, full 16:9 contain layout, metadata preload and HTTP range delivery |
| Resume containment | Pass by CSS/source audit; intrinsic sizing, wrapping and 820px single-column breakpoint present |
| 375 / 768 / 1440 browser screenshots | Not completed; in-app browser runtime failed to initialize |
| Automated browser accessibility scan | Not completed; same runtime limitation |

No deployment, production form, analytics or third-party media embed was connected.
