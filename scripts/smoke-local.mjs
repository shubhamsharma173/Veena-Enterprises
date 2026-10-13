import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:3000';
const paths = ['/', '/privacy/', '/terms/', '/robots.txt', '/sitemap.xml', '/og-image.jpg', '/favicon.ico', '/favicon.svg', '/icon-180.png', '/icon-192.png', '/icon-512.png', '/manifest.json'];
const results = [];
for (const path of paths) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const data = new Uint8Array(await response.arrayBuffer());
  assert.ok(data.length > 30, path + ' has content');
  results.push({ path, status: response.status, bytes: data.length, type: response.headers.get('content-type') });
}
const html = await (await fetch(base)).text();
assert.ok(html.includes('info@veenasolar.com'));
assert.ok(html.includes('tel:+918233261929'));
assert.ok(!html.includes('your-google-verification-code'));
const assets = [...new Set([...html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)].map(match => match[1]))];
for (const asset of assets) assert.equal((await fetch(base + asset)).status, 200, asset);
const missing = await fetch(base + '/not-a-real-page/');
assert.equal(missing.status, 404);
const response = await fetch(base + '/api/contact');
assert.equal(response.status, 405); assert.equal(response.headers.get('cache-control'), 'no-store');
const headers = (await fetch(base)).headers;
assert.equal(headers.get('x-content-type-options'), 'nosniff');
assert.equal(headers.get('x-frame-options'), 'DENY');
assert.ok(headers.get('content-security-policy')?.includes("frame-ancestors 'none'"));
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
assert.ok(!sitemap.includes('/services')); assert.ok(sitemap.includes('https://veenasolar.com/privacy/'));
console.log(JSON.stringify({ results, checkedAssetCount: assets.length, missingPage: 404, apiMethod: 405, headers: 'pass', sitemap: 'pass' }, null, 2));
