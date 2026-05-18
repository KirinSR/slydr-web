import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const source = readFileSync(join(root, "slydr.html"), "utf8");

function between(input, start, end) {
  const a = input.indexOf(start);
  const b = input.indexOf(end, a + start.length);
  if (a === -1 || b === -1) throw new Error(`Could not find ${start}..${end}`);
  return input.slice(a + start.length, b);
}

function pageHtml(id, nextMarker) {
  const marker = `<div class="page${id === "home" ? " active" : ""}" id="page-${id}">`;
  const start = source.indexOf(marker);
  const end = source.indexOf(nextMarker, start);
  if (start === -1 || end === -1) throw new Error(`Could not extract ${id}`);
  return source
    .slice(start + marker.length, end)
    .trim()
    .replace(/\n<\/div>\s*(?:<!-- \/page-[a-z]+ -->)?$/, "");
}

function write(path, content) {
  const file = join(root, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const css = between(source, "<style>", "</style>")
  .replace(".page{display:none}\n.page.active{display:block}\n", "");

write(
  "styles/globals.css",
  `@import "tailwindcss";\n\n${css}\n\n.calendly-modal-box{max-width:min(1120px,94vw);height:min(820px,88vh)}\n.calendly-frame{width:100%;height:680px;min-height:520px;border:0;background:var(--surface)}\n@media(max-width:640px){.calendly-modal-box{height:92vh}.calendly-frame{height:620px}}\n`
);

const pages = {
  home: pageHtml("home", "<!-- ═══════════════════════════════════ -->\n<!--  PAGE: FEATURES"),
  features: pageHtml("features", "<!-- ═══════════════════════════════════ -->\n<!--  PAGE: PRICING"),
  pricing: pageHtml("pricing", "<!-- ═══════════════════════════════════ -->\n<!--  PAGE: ABOUT"),
  about: pageHtml("about", "<!-- ═══════════════════════════════════ -->\n<!--  PAGE: CONTACT"),
  contact: pageHtml("contact", "<!-- ═══════════════════════════════════ -->\n<!--  FOOTER"),
};

write(
  "lib/page-content.ts",
  `export type SlydrPage = "home" | "features" | "pricing" | "about" | "contact";\n\nexport const pageContent: Record<SlydrPage, string> = ${JSON.stringify(pages, null, 2)};\n`
);
