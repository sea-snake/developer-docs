#!/usr/bin/env node
// Fetches PlantUML diagrams from plantuml.com and saves SVGs to src/diagrams/.
// Run this locally when adding or changing plantuml code blocks, then commit the output.
// Usage: npm run fetch:plantuml
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { deflateRawSync } from "node:zlib";
import { join } from "node:path";
import { globSync } from "glob";

const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
const SERVER = "https://www.plantuml.com/plantuml/svg";
const OUT_DIR = "src/diagrams";
const MAX_RETRIES = 3;

function encode(data) {
  let r = "";
  for (let i = 0; i < data.length; i += 3) {
    const b1 = data[i];
    const b2 = data[i + 1] ?? 0;
    const b3 = data[i + 2] ?? 0;
    r += ALPHABET[(b1 >> 2) & 0x3f];
    r += ALPHABET[((b1 & 0x3) << 4) | ((b2 >> 4) & 0xf)];
    r += ALPHABET[((b2 & 0xf) << 2) | ((b3 >> 6) & 0x3)];
    r += ALPHABET[b3 & 0x3f];
  }
  return r;
}

function toUrl(source) {
  const src = source.trimStart().startsWith("@startuml")
    ? source
    : `@startuml\n${source}\n@enduml`;
  const compressed = deflateRawSync(Buffer.from(src, "utf-8"), { level: 9 });
  return `${SERVER}/${encode(compressed)}`;
}

function svgFilename(source) {
  const hash = createHash("sha256").update(source).digest("hex").slice(0, 12);
  return `plantuml-${hash}.svg`;
}

async function fetchSvg(url) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url);
    if (response.ok) {
      const text = await response.text();
      if (!text.includes("<svg")) {
        throw new Error(`plantuml.com returned non-SVG content (HTTP ${response.status})`);
      }
      return text.replace(/<\?xml[^?]*\?>\s*/i, "");
    }
    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    } else {
      throw new Error(
        `plantuml.com returned HTTP ${response.status} after ${MAX_RETRIES} attempts`
      );
    }
  }
}

mkdirSync(OUT_DIR, { recursive: true });

const files = globSync("docs/**/*.md");
let fetched = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const content = readFileSync(file, "utf-8");
  const blocks = [...content.matchAll(/^```plantuml\n([\s\S]*?)^```/gm)];
  for (const [, source] of blocks) {
    const filename = svgFilename(source);
    const outPath = join(OUT_DIR, filename);
    if (existsSync(outPath)) {
      skipped++;
      continue;
    }
    try {
      console.log(`Fetching diagram from ${file}...`);
      const svg = await fetchSvg(toUrl(source));
      writeFileSync(outPath, svg, "utf-8");
      console.log(`  → ${outPath}`);
      fetched++;
    } catch (e) {
      console.error(`  ERROR in ${file}: ${e.message}`);
      errors++;
    }
  }
}

console.log(`\nDone: ${fetched} fetched, ${skipped} already cached.`);
if (errors > 0) {
  console.error(`${errors} diagram(s) failed — commit will break the build.`);
  process.exit(1);
}
