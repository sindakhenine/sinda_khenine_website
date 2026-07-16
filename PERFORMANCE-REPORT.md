# Performance Report

The production build generated 32 pages/routes successfully. Content routes are statically rendered; only the mock form endpoint is dynamic.

Images use Next Image with responsive `sizes` on high-value placements. Optimized cover and portrait derivatives are available while originals remain preserved. The 9.1 MB book video and 19.3 MB presentation video use `preload="metadata"`; neither blocks the HTML render. Both support HTTP byte ranges. The homepage hero is static. Its presentation video sits in a dedicated 16:9 feature below the hero, preserves its full frame and requires deliberate playback.

Core Web Vitals risks: the presentation video is the largest homepage asset; real-device data-use measurement remains required. A future production pass may create a lower-bitrate 720p delivery encode after author visual approval. No autoplay media, remote font, analytics or third-party embed is present.

Browser Lighthouse could not run because the configured browser runtime failed to initialize. Do not treat the build result as a Lighthouse score.
