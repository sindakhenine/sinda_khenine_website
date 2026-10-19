import {useLocale, useMessages} from "next-intl";
import {createCopy, type CopyMessages} from "./copy";

export function useCopy() {
  const locale = useLocale();
  const messages = useMessages();
  return createCopy(messages.copy as CopyMessages, locale);
}
