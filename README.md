# QR Social Link Hub

![QR Social Link Hub project cover](assets/recruiter/cover.png)

A compact, mobile-first destination page designed to sit behind a printed or digital QR code. It presents one business profile, social destinations, direct contact actions, a Google review link, and branded media without requiring visitors to navigate a full website.

## Implemented experience

- Profile name and tagline with branded imagery
- Background video with safe autoplay fallback behaviour
- Facebook, Instagram, TikTok, YouTube, email, telephone, website, and review actions
- External-link handling with `noopener`/`noreferrer`
- Keyboard-visible focus states and descriptive link labels
- Decorative media hidden appropriately from assistive technology
- Reduced-motion support that pauses decorative animation and avoids forcing the typing effect
- Responsive layout for QR-led mobile visits

All existing destinations are retained in a central configuration file rather than being repeated throughout the page component.

## Editing business content

Update the profile details and media paths in `constants.tsx`:

- `PROFILE.name`
- `PROFILE.tagline`
- `PROFILE.logoPath`
- `PROFILE.backgroundVideoPath`
- `PROFILE.googleReviewUrl`
- `socialLinks`

This keeps routine content changes separate from presentation and animation logic. The current social, contact, website, and review URLs are business-specific and should be checked before reusing the project for another profile.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle and preview it with:

```bash
npm run typecheck
npm run build
npm run preview
```

The project uses React, TypeScript, and Vite. It has no application backend or account system; the page sends visitors to the configured external destinations.

## Validation

GitHub Actions runs the TypeScript compiler and Vite production build on pull requests. The active cleanup branch has also passed its Netlify deploy preview.

Before publishing changed content, manually verify:

- every social and contact destination;
- the review URL;
- video playback and fallback behaviour on mobile browsers;
- keyboard navigation;
- the layout with reduced motion enabled;
- the printed QR code against the final deployed URL.

## Project structure

```text
qr-social-link-hub/
├── App.tsx
├── constants.tsx
├── components/
│   └── SocialLinkButton.tsx
├── public/
│   └── media assets
├── package.json
└── .github/workflows/quality.yml
```

## Current boundaries

- The repository does not generate or manage the physical QR code itself.
- Link availability, third-party tracking, and destination privacy policies are controlled by the external services.
- The background media is shipped with the site and should be optimised if its size becomes a loading concern.
- No automated end-to-end link checker is currently included.