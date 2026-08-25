import { declareComponentKeys } from "@/i18n/i18n";
import { Translations } from "@/i18n/types";

const { i18n } = declareComponentKeys<
    "home" | "dashboard" | "map_list" | "media_list" | "organization_list" | "organization_info" | "organization_maps" | "organization_members"
>()("Breadcrumb");
export type I18n = typeof i18n;

export const BreadcrumbFrTranslations: Translations<"fr">["Breadcrumb"] = {
    home: "Tableau de bord",
    dashboard: "Tableau de bord",
    map_list: "Mes cartes",
    media_list: "Mes images",
    organization_list: "Mes espaces de travail",
    organization_info: "Info",
    organization_maps: "Cartes",
    organization_members: "Membres",
};

export const BreadcrumbEnTranslations: Translations<"en">["Breadcrumb"] = {
    home: undefined,
    dashboard: undefined,
    map_list: undefined,
    media_list: undefined,
    organization_list: undefined,
    organization_info: undefined,
    organization_maps: undefined,
    organization_members: undefined,
};
