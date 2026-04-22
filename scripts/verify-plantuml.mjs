#!/usr/bin/env node
// Post-build check: ensures every page with a plantuml block has inlined SVGs in the build output.
// Exits non-zero if any diagram is missing, so the CI workflow fails rather than deploying a blank page.
import { readFileSync, existsSync } from "node:fs";
import { globSync } from "glob";

const DIST = "dist";
let failed = 0;

for (const srcFile of globSync("docs/**/*.md")) {
  const source = readFileSync(srcFile, "utf-8");
  const diagramCount = [...source.matchAll(/^```plantuml\b/gm)].length;
  if (diagramCount === 0) continue;

  // Derive the built HTML path from the source path.
  // docs/foo/bar.md -> dist/foo/bar/index.html
  // docs/foo/index.md -> dist/foo/index.html
  const rel = srcFile
    .replace(/^docs\//, "")
    .replace(/\.md$/, "");
  const htmlPath = rel.endsWith("/index") || rel === "index"
    ? `${DIST}/${rel}.html`
    : `${DIST}/${rel}/index.html`;

  if (!existsSync(htmlPath)) {
    console.error(`MISSING page: ${htmlPath} (source: ${srcFile})`);
    failed++;
    continue;
  }

  const html = readFileSync(htmlPath, "utf-8");
  // plantuml.com SVGs carry a data-diagram-type attribute — use it as a reliable marker.
  const svgCount = (html.match(/data-diagram-type/g) ?? []).length;

  if (svgCount < diagramCount) {
    console.error(
      `INCOMPLETE: ${srcFile} has ${diagramCount} plantuml block(s) but built page has ${svgCount} rendered SVG(s).`
    );
    console.error(`  Built file: ${htmlPath}`);
    failed++;
  } else {
    console.log(`OK: ${srcFile} (${svgCount} diagram(s))`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} page(s) have unrendered PlantUML diagrams. Aborting deployment.`);
  process.exit(1);
}
