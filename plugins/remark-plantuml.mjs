import { visit } from "unist-util-visit";
import { deflateRawSync } from "node:zlib";

const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
const SERVER = "https://www.plantuml.com/plantuml/svg";
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

export default function remarkPlantUML() {
  return async (tree) => {
    const nodes = [];
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "plantuml") nodes.push({ node, index, parent });
    });

    for (const { node, index, parent } of nodes) {
      const url = toUrl(node.value);
      const svg = await fetchSvg(url);
      parent.children[index] = { type: "html", value: svg };
    }
  };
}
