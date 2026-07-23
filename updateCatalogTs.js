import fs from "fs";

const catalogPath = "src/data/catalog.ts";
let content = fs.readFileSync(catalogPath, "utf-8");

// Change type definitions
content = content.replace(
  `export type VariantGroup = {
  name: string; // ej "Material", "Medida"
  options: string[];
};`,
  `export type VariantOption = {
  value: string;
  price?: number;
};

export type VariantGroup = {
  name: string;
  options: VariantOption[];
};`
);

// We need to replace all instances of options: ["...", "..."]
// with options: [{value: "..."}, {value: "..."}]
// The regex finds options: [...] arrays and replaces the string elements
content = content.replace(/options:\s*\[(.*?)\]/g, (match, p1) => {
  // p1 contains strings like "Bronce", "Aluminio"
  // split them if they are comma separated strings
  const strings = p1.match(/"[^"]+"|'[^']+'/g);
  if (!strings) return match;
  const newOptions = strings.map((s) => `{ value: ${s} }`).join(", ");
  return `options: [${newOptions}]`;
});

fs.writeFileSync(catalogPath, content);
console.log("Updated catalog.ts types and mock data.");
