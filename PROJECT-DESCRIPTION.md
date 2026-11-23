# Field Journal — Project Description

**Course:** Development of Progressive Mobile Applications L1 (WTI.SIE.IN.7014)
**Technologies:** HTML, CSS, JavaScript (pure — no frameworks or libraries)

## Idea

**Field Journal** is an installable Progressive Web App for keeping a personal journal
while out "in the field". Each entry combines a short written note with **a photo from the
device camera** and **the location where it was written (geolocation)**. All entries are
stored on the device, so the journal — and the app itself — works fully **offline**.

## How it meets the project criteria

- **Installable** — a hand-written Web App Manifest with name, icons, theme colour and
  `start_url` enables "Add to Home Screen".
- **Native device features (2)** — the **camera** (attach a photo to an entry) and
  **geolocation** (tag where each entry was made). Both are central to the app's purpose,
  not decorative.
- **Works offline** — a hand-written Service Worker + Cache API store the app shell; user
  entries are stored on-device (IndexedDB). The app shows a clear offline indicator.
- **Three views, consistent flow** — Journal (list), New Entry (create), About — linked by
  a fixed bottom navigation bar.
- **Hosted on HTTPS** — deployed to GitHub Pages.
- **Responsive & performant** — mobile-first, hand-written CSS; verified with Lighthouse.
- **Pure JavaScript** — everything PWA-related (manifest, service worker, caching, device
  APIs) is written by hand, with no libraries or frameworks.

## Weekly plan (progress visible each week)

- **Week 1:** project foundation — installable shell, icons, responsive 3-view UI, offline
  app-shell service worker, offline indicator, documentation.
- **Week 2:** create & save text entries on-device (IndexedDB); list them.
- **Week 3:** camera — take and attach a photo.
- **Week 4:** geolocation — tag and display entry location.
- **Week 5:** polish, accessibility, Lighthouse performance pass, HTTPS deployment.

**Repository:** https://github.com/NuraiymYerzhanova/field-journal
**Live app:** _added in a later week (GitHub Pages — HTTPS)_
