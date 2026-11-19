// Adds [en, de, fr] strings to the message catalogues under their stable hash keys.
// Usage: node scripts/add-copy.mjs path/to/strings.json
import {readFileSync, writeFileSync} from "node:fs";

function copyKey(value) {
  let hash = 2166136261;
  for (const char of value.replace(/\s+/g, " ").trim()) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `s${(hash >>> 0).toString(16)}`;
}
const rows = JSON.parse(readFileSync(process.argv[2], "utf8"));
for (const [index, locale] of ["en", "de", "fr"].entries()) {
  const file = new URL(`../i18n/messages/${locale}.json`, import.meta.url);
  const messages = JSON.parse(readFileSync(file, "utf8"));
  for (const row of rows) messages[copyKey(row[0])] = row[index].replace(/\s+/g, " ").trim();
  writeFileSync(file, `${JSON.stringify(messages, null, 2)}\n`);
}
console.log(`${rows.length} strings written`);
