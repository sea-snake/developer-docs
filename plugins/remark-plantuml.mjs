import { visit } from "unist-util-visit";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SVG_DIR = "src/diagrams";

function svgFilename(source) {
  const hash = createHash("sha256").update(source).digest("hex").slice(0, 12);
  return `plantuml-${hash}.svg`;
}

export default function remarkPlantUML() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "plantuml") return;
      const filename = svgFilename(node.value);
      const svgPath = join(SVG_DIR, filename);
      if (!existsSync(svgPath)) {
        throw new Error(
          `PlantUML SVG not pre-generated: ${svgPath}\nRun: npm run fetch:plantuml`
        );
      }
      const svg = readFileSync(svgPath, "utf-8");
      parent.children[index] = { type: "html", value: svg };
    });
  };
}
