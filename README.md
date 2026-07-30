# QR Social Link Hub

![QR Social Link Hub project cover](assets/recruiter/cover.png)

> **Portfolio lens:** A deliberately compact destination page where the visual assets and social paths do the work—ideal for a QR-led first impression.

This is a single-page link hub meant to sit behind a QR code. It combines a profile card, social destinations, a background video, and a small set of visual assets rather than sending visitors through a full website.

The profile content lives in the React source, while the video and image files are intentionally kept in the repository because the page references them at runtime.

## Run it

```bash
npm ci
npm run dev
```

Use `npm run build` for the production bundle and `npm run preview` to check that bundle before publishing. The project uses React, TypeScript, and Vite.
