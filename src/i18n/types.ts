import type { GenericTranslations } from "i18nifty";

// déclaration des langues
/** liste des langues supportées */
export const languages = ["fr", "en"] as const;

/** langue de fallback */
export const fallbackLanguage = "fr";

/** nom d'affichage des langues */
export const languagesDisplayNames: Record<Language, string> = {
    fr: "Français",
    en: "English",
};

// types
export type Language = (typeof languages)[number];
export type ComponentKey =
    | import("./locales/Common.locale").I18n
    | import("./locales/Breadcrumb.locale").I18n
    | import("./locales/Map.locale").I18n
    | import("./locales/Layout.locale").I18n
    | import("./locales/Media.locale").I18n
    | import("./locales/Organization.locale").I18n;

export type Translations<L extends Language> = GenericTranslations<ComponentKey, Language, typeof fallbackLanguage, L>;
