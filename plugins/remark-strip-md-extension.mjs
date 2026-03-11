/**
 * Remark plugin that strips .md extensions from internal links at build time.
 *
 * Authors write GitHub-friendly links:
 *   [Quickstart](getting-started/quickstart.md)
 *   [Concepts](../concepts/canisters.md#lifecycle)
 *
 * The plugin rewrites them for Astro/Starlight:
 *   [Quickstart](getting-started/quickstart)
 *   [Concepts](../concepts/canisters#lifecycle)
 *
 * Only relative links are affected — external URLs (http/https) are untouched.
 */
import { visit } from "unist-util-visit";

export default function remarkStripMdExtension() {
  return (tree) => {
    visit(tree, "link", (node) => {
      if (!node.url) return;

      // Skip external links and protocol links
      if (/^[a-z][a-z0-9+.-]*:/i.test(node.url)) return;

      // Strip .md extension, preserving anchors and query strings
      node.url = node.url.replace(/\.md(#|$|\?)/, "$1");
    });
  };
}
