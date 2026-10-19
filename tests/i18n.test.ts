import {describe, expect, it} from "vitest";
import {localizedPath} from "../i18n/routing";
import {copyKey, createCopy} from "../i18n/copy";
import {clientCopy} from "../i18n/client-messages";
import {getCopy, getCopyMessages} from "../i18n/server";
import {createPageMetadata} from "../lib/seo";
import sitemap from "../app/sitemap";
import en from "../i18n/messages/en.json";

describe("multilingual public website", () => {
  it("has complete German and French catalogues without translation markers", () => {
    for (const locale of ["de", "fr"]) {
      const messages = getCopyMessages(locale);
      expect(Object.keys(messages).sort()).toEqual(Object.keys(en).sort());
      for (const value of Object.values(messages)) {
        expect(value.trim()).not.toBe("");
        expect(value).not.toMatch(/ZXQ\d|QQQ\d/);
      }
    }
    for (const value of clientCopy) expect(en).toHaveProperty(copyKey(value));
    expect(new Set(Object.values(en).map(copyKey)).size).toBe(Object.keys(en).length);
  });
  it("keeps assets, APIs, external links and anchors intact", () => {
    expect(localizedPath("/about", "de")).toBe("/de/about");
    expect(localizedPath("/de/about?ref=book#story", "fr")).toBe("/fr/about?ref=book#story");
    expect(localizedPath("/fr", "en")).toBe("/");
    for (const href of ["/BingSiteAuth.xml", "/Sinda_Khenine_Resume.pdf", "/sitemap.xml", "/api/contact", "#demo", "https://skatalystai.com", "mailto:founder@skatalystai.com", "//example.com"]) expect(localizedPath(href, "fr")).toBe(href);
  });
  it("preserves inline spacing and non-text values", () => {
    const copy = createCopy({[copyKey("Hello")]: "Bonjour"}, "fr");
    expect(copy(" Hello ")).toBe(" Bonjour ");
    expect(copy(12)).toBe(12);
    expect(copy(undefined)).toBeUndefined();
    expect(copy("SKatalyst AI")).toBe("SKatalyst AI");
  });
  it("provides language-specific legal headings and identity", () => {
    expect(getCopy("en")("Website operator")).toBe("Website operator");
    expect(getCopy("de")("Legal notice")).toBe("Impressum");
    expect(getCopy("fr")("Legal notice")).toBe("Mentions légales");
    expect(getCopy("fr")("Founder, SKatalyst AI")).toBe("Fondatrice de SKatalyst AI");
  });
  it("gives every translated page its own canonical and reciprocal alternates", () => {
    const metadata = createPageMetadata("/imprint", {title:"Legal notice", description:"Website contact information for Sinda Khenine."}, "fr");
    expect(metadata.title).toEqual({absolute:"Mentions légales | Sinda Khenine"});
    expect(metadata.alternates).toEqual({canonical:"https://sindakhenine.com/fr/imprint",languages:{en:"https://sindakhenine.com/imprint",de:"https://sindakhenine.com/de/imprint",fr:"https://sindakhenine.com/fr/imprint","x-default":"https://sindakhenine.com/imprint"}});
    const entries = sitemap();
    expect(entries).toHaveLength(69);
    expect(new Set(entries.map(entry => entry.url)).size).toBe(69);
    for (const entry of entries) expect(Object.keys(entry.alternates!.languages!)).toEqual(["en", "de", "fr"]);
  });
});
