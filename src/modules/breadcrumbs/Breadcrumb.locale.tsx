import { declareComponentKeys } from "../../i18n/i18n";
import { Translations } from "../../i18n/types";

const { i18n } = declareComponentKeys<
    | "dashboard"
>()("Breadcrumb");
export type I18n = typeof i18n;

export const BreadcrumbFrTranslations: Translations<"fr">["Breadcrumb"] = {
    dashboard: "Tableau de bord",
};

export const BreadcrumbEnTranslations: Translations<"en">["Breadcrumb"] = {
    dashboard: "Dashboard",
};
