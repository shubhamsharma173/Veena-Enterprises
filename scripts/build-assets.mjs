import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const assets = [
  "solar-bg.jpg",
  "solar-bg-2.jpg",
  "solar-panel.png",
  "why-choose-us.png",
  "service-house.jpg",
  "service-solarfarm.png",
];
await mkdir("public/images", { recursive: true });
await Promise.all(
  assets.flatMap((file) =>
    [480, 960, 1600, 2200].map((width) =>
      sharp(`public/${file}`)
        .rotate()
        .resize({ width })
        .webp({ quality: 78 })
        .toFile(`public/images/${file.replace(/\.[^.]+$/, "")}-${width}.webp`),
    ),
  ),
);
for (const size of [32, 180, 192, 512]) {
  await sharp("public/favicon.svg")
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);
}
const png = await sharp("public/favicon.svg").resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png]));
const overlay = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#063455" opacity=".68"/><g fill="white" font-family="Arial,sans-serif"><text x="72" y="95" font-size="28" font-weight="bold">VEENA ENTERPRISES</text><text x="72" y="270" font-size="70" font-weight="bold">GO SOLAR, SAVE MONEY.</text><text x="72" y="355" font-size="70" font-weight="bold" fill="#ffdc18">SAVE THE PLANET.</text><text x="72" y="480" font-size="30">Solar installation &amp; services in Jaipur</text><text x="72" y="548" font-size="26">veenasolar.com · +91 82332 61929</text></g></svg>`,
);
await sharp("public/solar-bg.jpg")
  .resize(1200, 630, { fit: "cover" })
  .composite([{ input: overlay }])
  .jpeg({ quality: 85 })
  .toFile("public/og-image.jpg");
console.log("Responsive photos, social preview and icons generated.");
