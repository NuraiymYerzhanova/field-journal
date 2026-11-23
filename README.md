# Field Journal — Progressive Web App

A personal **field journal** built as an installable Progressive Web App (PWA) using
**pure HTML, CSS and JavaScript — no frameworks or libraries**. Everything related to
the PWA (manifest, service worker, caching, native-feature access) is written by hand.

> **Course:** Development of Progressive Mobile Applications L1 — WTI.SIE.IN.7014
> **Status:** Week 1 — project foundation (installable shell + offline app shell)

**Live app:** _add your GitHub Pages link here after the first deploy_
**Repository:** _add your GitHub repository link here_

---

## The idea

Field Journal lets you capture short journal entries while you are out "in the field".
Each entry (coming in the next weeks) will combine a written note with **a photo taken
by the device camera** and **the location where it was written (geolocation)**. Entries
are stored on the device, so the whole journal — and the app itself — works with **no
internet connection**.

### Native device features (and why they are used)

| Feature | Real purpose in the app |
|---|---|
| **Camera** (`getUserMedia` / file capture) | Attach a photo to a journal entry — the visual record of the moment. |
| **Geolocation** (`navigator.geolocation`) | Tag each entry with the place it was created, so entries are tied to where they happened. |

### The three views (consistent flow)

1. **Journal** — the list of saved entries (home screen).
2. **New Entry** — write a note, take a photo, add location, and save.
3. **About** — what the app is and which native features it uses.

A fixed bottom tab bar keeps navigation between the three views simple and consistent.

---

## Offline & caching strategy

The service worker (`src/sw.js`) pre-caches the **app shell** (HTML, CSS, JS, icons and
manifest) on install, then serves requests with the strategy below. A short justification
per resource type:

| Resource type | Strategy | Why |
|---|---|---|
| App shell (HTML, CSS, JS, manifest, icons) | **Cache-first** (pre-cached on install) | These rarely change and must load instantly and work fully offline. |
| Navigation requests | Cache-first with **app-shell fallback** to `index.html` | Guarantees the UI always renders, even with no connection. |
| User data (photos, notes, locations) | **IndexedDB** on the device _(added in a later week)_ | User content must survive offline and never depend on the network. |

The app also shows an **offline banner** so the user is always told when there is no
connection and that saved content is still available.

---

## Technologies used

- **HTML5** — semantic structure and PWA metadata.
- **CSS3** — hand-written, mobile-first responsive layout (CSS variables, flexbox, media queries).
- **JavaScript (ES5/ES6, vanilla)** — hash router, service-worker registration, UI logic.
- **Web App Manifest** — makes the app installable.
- **Service Worker + Cache API** — offline support.
- *(Later weeks)* **MediaDevices / Geolocation APIs** and **IndexedDB**.

No build step, no dependencies.

---

## Running the project

A service worker needs to be served over `http://localhost` or HTTPS (not opened as a
`file://` path). From the project root:

```bash
# Option A — Python 3
cd src
python -m http.server 8080
# then open http://localhost:8080

# Option B — Node (if installed)
npx serve src
```

Then open the URL in Chrome, and use **DevTools → Application** to see the manifest,
service worker and cached files. To test offline, tick **Offline** in that panel and
reload.

---

## Weekly roadmap (visible progress)

- **Week 1 — foundation (this commit):** project structure, installable manifest, icons,
  responsive app shell with the 3 views, basic offline service worker, offline indicator, README.
- **Week 2 — data + New Entry:** write and save text entries with **IndexedDB**; list them on the home view.
- **Week 3 — camera:** take and attach a photo to an entry.
- **Week 4 — geolocation:** tag entries with location; show it on the entry.
- **Week 5 — polish:** responsiveness, accessibility, **Lighthouse** performance pass, deploy to HTTPS (GitHub Pages).

---

## Project structure

```
field-journal/
├── README.md
└── src/
    ├── index.html            # App shell + 3 views container
    ├── manifest.webmanifest  # Installability
    ├── sw.js                 # Service worker (offline + caching)
    ├── css/
    │   └── styles.css        # Responsive, hand-written styles
    ├── js/
    │   └── app.js            # Router, SW registration, offline indicator
    └── icons/                # PWA icons (192, 512, maskable, apple-touch)
```
