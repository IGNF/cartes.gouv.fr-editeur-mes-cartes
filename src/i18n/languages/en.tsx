
import { commonEnTranslations } from "../locales/Common.locale";
import { BreadcrumbEnTranslations } from "@/i18n/locales/Breadcrumb.locale";
import { MapEnTranslations } from "@/i18n/locales/Map.locale";
import { LayoutEnTranslations } from "@/i18n/locales/Layout.locale";
import { MediaEnTranslations } from "../locales/Media.locale";
import type { Translations } from "../types";
import { OrganizationEnTranslations } from "../locales/Organization.locale";

export const translations: Translations<"en"> = {
    Common: commonEnTranslations,
    Breadcrumb: BreadcrumbEnTranslations,
    Map: MapEnTranslations,
    Layout: LayoutEnTranslations,
    Media: MediaEnTranslations,
    Organization: OrganizationEnTranslations,
};
