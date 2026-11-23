/* ===========================================================
   Field Journal — app.js
   Hand-written vanilla JavaScript. No frameworks, no libraries.

   Week 1 responsibilities:
     1. Register the service worker (enables offline + install).
     2. A tiny hash-based router that renders 3 views.
     3. Show an offline/online banner.

   Features such as the camera, geolocation and saving entries
   are added in the following weeks (see the README roadmap).
   =========================================================== */

'use strict';

/* ---------- 1. Service worker registration ---------- */
// The service worker is what lets the app work offline and be installed.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js')
      .then(function (reg) { console.log('Service worker registered:', reg.scope); })
      .catch(function (err) { console.warn('Service worker failed:', err); });
  });
}

/* ---------- 2. View templates ---------- */
// Each view is a function that returns an HTML string. Keeping them
// as small functions makes the flow between views easy to follow.
var views = {
  home: function () {
    return (
      '<h2>My Journal</h2>' +
      '<div class="empty card">' +
        '<span class="big">📓</span>' +
        '<p>No entries yet.</p>' +
        '<p>Soon you will be able to capture a note with a photo and your location.</p>' +
        '<a class="btn" href="#/new">Create your first entry</a>' +
      '</div>'
    );
  },

  new: function () {
    return (
      '<h2>New Entry</h2>' +
      '<div class="card">' +
        '<span class="badge">Coming in week 2–3</span>' +
        '<p class="lead">This screen will let you:</p>' +
        '<ul class="feature-list">' +
          '<li>Write a short note</li>' +
          '<li>📷 Take a photo with the device camera</li>' +
          '<li>📍 Tag the entry with your current location (geolocation)</li>' +
          '<li>Save it on the device so it is available offline</li>' +
        '</ul>' +
      '</div>'
    );
  },

  about: function () {
    return (
      '<h2>About</h2>' +
      '<div class="card">' +
        '<p class="lead">Field Journal is a Progressive Web App built with pure ' +
        'HTML, CSS and JavaScript — no frameworks or libraries.</p>' +
        '<p>It is installable, works offline, and uses native device features ' +
        '(camera and geolocation) to capture journal entries from the field.</p>' +
      '</div>' +
      '<div class="card">' +
        '<p class="lead">Native features used</p>' +
        '<ul class="feature-list">' +
          '<li><strong>Camera</strong> — attach a photo to each entry.</li>' +
          '<li><strong>Geolocation</strong> — record where the entry was made.</li>' +
        '</ul>' +
      '</div>'
    );
  }
};

/* ---------- 3. Router ---------- */
// Maps a URL hash to one of the views above.
var routes = {
  '#/': 'home',
  '#/new': 'new',
  '#/about': 'about'
};

function render() {
  var hash = window.location.hash || '#/';
  var name = routes[hash] || 'home';

  var viewEl = document.getElementById('view');
  viewEl.innerHTML = views[name]();
  viewEl.focus(); // move focus for accessibility on view change

  // Highlight the active tab in the bottom bar
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.toggle('active', tabs[i].getAttribute('data-tab') === name);
  }
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);

/* ---------- 4. Online / offline indicator ---------- */
function updateConnection() {
  var banner = document.getElementById('connection-banner');
  if (navigator.onLine) {
    banner.hidden = true;
  } else {
    banner.hidden = false;
  }
}
window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
window.addEventListener('load', updateConnection);
