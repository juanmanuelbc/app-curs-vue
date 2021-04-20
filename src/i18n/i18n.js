import { createI18n } from "vue-i18n";

import ca from "./locales/ca.json";

export function setupI18n(locale = "ca") {
  const i18n = createI18n({
    locale,
    fallbackLocale: "ca",
    messages: {
      ca,
    },
  });
  setI18nLanguage(i18n, locale);
  return i18n;
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")?.setAttribute("lang", locale);
}
