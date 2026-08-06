
import { commonEnTranslations } from "../locales/Common.locale";
import { BreadcrumbEnTranslations } from "@/i18n/locales/Breadcrumb.locale";
import { MapListEnTranslations } from "@/i18n/locales/MapList.locale";
import { LayoutEnTranslations } from "@/i18n/locales/Layout.locale";
import { MediaListEnTranslations } from "../locales/MediaList.locale";
import type { Translations } from "../types";

export const translations: Translations<"en"> = {
    Common: commonEnTranslations,
    Breadcrumb: BreadcrumbEnTranslations,
    MapList: MapListEnTranslations,
    Layout: LayoutEnTranslations,
    MediaList: MediaListEnTranslations,
};
