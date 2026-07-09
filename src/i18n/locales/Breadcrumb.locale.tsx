import { declareComponentKeys } from "@/i18n/i18n";
import { Translations } from "@/i18n/types";

const { i18n } = declareComponentKeys<
    | "dashboard"
    | "map_list"
    | "home"
>()("Breadcrumb");
export type I18n = typeof i18n;

export const BreadcrumbFrTranslations: Translations<"fr">["Breadcrumb"] = {
    dashboard: "Tableau de bord",
    map_list: "Mes cartes",
    home: "Mes cartes",
};

export const BreadcrumbEnTranslations: Translations<"en">["Breadcrumb"] = {
    dashboard: undefined,
    map_list: undefined,
    home: undefined,
};
