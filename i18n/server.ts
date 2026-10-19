import en from "./messages/en.json";
import de from "./messages/de.json";
import fr from "./messages/fr.json";
import {createCopy} from "./copy";

export function getCopyMessages(locale: string) { return locale === "de" ? de : locale === "fr" ? fr : en; }
export function getCopy(locale: string) { return createCopy(getCopyMessages(locale), locale); }
