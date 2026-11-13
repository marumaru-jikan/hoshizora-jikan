// 星空時間：オフラインでも開けるようにするしくみ
// アプリを更新したら、下の VERSION の数字を1つ上げてください（古い保存を入れかえます）。
const VERSION = 'hoshizora-v43';
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/polaris-192.png", "icons/polaris-512.png", "icons/polaris-maskable-512.png", "icons/polaris-apple-180.png", "icons/polaris-64.png", "cards/a01.jpg", "cards/a02.jpg", "cards/a03.jpg", "cards/a04.jpg", "cards/a05.jpg", "cards/a06.jpg", "cards/a07.jpg", "cards/a08.jpg", "cards/z01.jpg", "cards/z02.jpg", "cards/z03.jpg", "cards/z04.jpg", "cards/z05.jpg", "cards/z06.jpg", "cards/z07.jpg", "cards/z08.jpg", "cards/z09.jpg", "cards/z10.jpg", "cards/z11.jpg", "cards/z12.jpg", "cards/z13.jpg", "cards/z14.jpg", "cards/z15.jpg", "cards/z16.jpg", "cards/z17.jpg", "cards/z18.jpg", "cards/z19.jpg", "cards/z20.jpg", "cards/z21.jpg", "cards/z22.jpg", "cards/z23.jpg", "cards/z24.jpg", "cards/z25.jpg", "cards/z26.jpg", "cards/z27.jpg", "cards/z28.jpg", "cards/z29.jpg", "cards/z30.jpg", "cards/z31.jpg", "cards/z32.jpg", "cards/z33.jpg", "cards/z34.jpg", "cards/z35.jpg", "cards/z36.jpg", "cards/z37.jpg", "cards/z38.jpg", "cards/z39.jpg", "cards/z40.jpg", "cards/z41.jpg", "cards/z42.jpg", "cards/z43.jpg", "cards/z44.jpg", "cards/z45.jpg", "cards/z46.jpg", "cards/z47.jpg", "cards/z48.jpg", "cards/z49.jpg", "cards/z50.jpg", "cards/z51.jpg", "cards/z52.jpg", "cards/z53.jpg", "cards/z54.jpg", "cards/z55.jpg", "cards/z56.jpg", "cards/z57.jpg", "cards/z58.jpg", "cards/z59.jpg", "cards/z60.jpg", "cards/z61.jpg", "cards/z62.jpg", "cards/z63.jpg", "cards/z64.jpg", "cards/z65.jpg", "cards/z66.jpg", "cards/z67.jpg", "cards/z68.jpg", "cards/z69.jpg", "cards/z70.jpg", "cards/z71.jpg", "cards/z72.jpg", "cards/z73.jpg", "cards/z74.jpg", "cards/z75.jpg", "cards/z76.jpg", "cards/z77.jpg", "cards/z78.jpg", "cards/z79.jpg", "cards/z80.jpg", "cards/z81.jpg", "cards/z82.jpg", "cards/z83.jpg", "cards/z84.jpg", "cards/z85.jpg", "cards/z86.jpg", "cards/z87.jpg", "cards/z88.jpg", "cards/w01.jpg", "cards/w02.jpg", "cards/w03.jpg", "cards/w04.jpg", "cards/w05.jpg", "cards/w06.jpg", "cards/w07.jpg", "cards/w08.jpg", "img/tdm2.png"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // ページ本体：ネットにつながれば最新、だめなら保存したものを使う
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return r; }).catch(() => caches.match('index.html')));
    return;
  }
  // 画像・フォント・PDF など：保存したものがあればそれを使い、なければ取りにいって保存
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return r;
  })));
});
