import {readdir, readFile} from "node:fs/promises";
import path from "node:path";
import {JSDOM} from "jsdom";

// Check the generated HTML, including translations and Next.js metadata merging.
// Bing's URL Inspection accepts descriptions between 25 and 160 characters.
const root = path.resolve(".next/server/app");
const files = (await readdir(root, {recursive: true}))
  .filter(file => /^(en|de|fr)(?:\/.*)?\.html$/.test(file))
  .sort();
if (!files.length) throw new Error("No public HTML pages found. Run next build first.");

const errors = [];
const lengths = [];
for (const file of files) {
  const dom = new JSDOM(await readFile(path.join(root, file), "utf8"));
  const document = dom.window.document;
  const descriptions = document.head.querySelectorAll('meta[name="description"]');
  if (descriptions.length !== 1) {
    errors.push(`${file}: expected one meta description, found ${descriptions.length}`);
  } else {
    const description = descriptions[0].getAttribute("content") ?? "";
    const length = [...description].length;
    lengths.push(length);
    if (description !== description.trim() || length < 25 || length > 160) {
      errors.push(`${file}: description is ${length} characters; expected 25–160 without surrounding whitespace`);
    }
    for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      if (document.head.querySelector(selector)?.getAttribute("content") !== description) {
        errors.push(`${file}: ${selector} does not match the page description`);
      }
    }
  }
  dom.window.close();
}

if (errors.length) {
  console.error(`Meta description validation failed:\n${errors.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Validated meta descriptions for ${files.length} public pages (${Math.min(...lengths)}–${Math.max(...lengths)} characters), including Open Graph and Twitter.`);
}
