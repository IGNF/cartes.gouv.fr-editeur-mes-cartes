import { declareComponentKeys } from "@/i18n/i18n";
import { Translations } from "@/i18n/types";

const { i18n } = declareComponentKeys<
    | "home"
    | "dashboard"
    | "map_list"
    | "media_list"
>()("Breadcrumb");
export type I18n = typeof i18n;

export const BreadcrumbFrTranslations: Translations<"fr">["Breadcrumb"] = {
    "home": "Tableau de bord",
    "dashboard": "Tableau de bord",
    "map_list": "Mes cartes",
    "media_list": "Mes images",
};

export const BreadcrumbEnTranslations: Translations<"en">["Breadcrumb"] = {
    "home": undefined,
    "dashboard": undefined,
    "map_list": undefined,
    "media_list": undefined,
};
