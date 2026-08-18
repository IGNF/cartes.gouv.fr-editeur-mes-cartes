import { commonFrTranslations } from "@/i18n/locales/Common.locale";
import { BreadcrumbFrTranslations } from "@/i18n/locales/Breadcrumb.locale";
import { MapFrTranslations } from "@/i18n/locales/Map.locale";
import { LayoutFrTranslations } from "@/i18n/locales/Layout.locale";
import { MediaFrTranslations } from "../locales/Media.locale";
import type { Translations } from "../types";
import { OrganizationFrTranslations } from "../locales/Organization.locale";

export const translations: Translations<"fr"> = {
    Common: commonFrTranslations,
    Breadcrumb: BreadcrumbFrTranslations,
    Map: MapFrTranslations,
    Layout: LayoutFrTranslations,
    Media: MediaFrTranslations,
    Organization: OrganizationFrTranslations,
};
