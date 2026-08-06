import { commonFrTranslations } from "@/i18n/locales/Common.locale";
import { BreadcrumbFrTranslations } from "@/i18n/locales/Breadcrumb.locale";
import { MapListFrTranslations } from "@/i18n/locales/MapList.locale";
import { LayoutFrTranslations } from "@/i18n/locales/Layout.locale";
import { MediaListFrTranslations } from "../locales/MediaList.locale";
import type { Translations } from "../types";

export const translations: Translations<"fr"> = {
    Common: commonFrTranslations,
    Breadcrumb: BreadcrumbFrTranslations,
    MapList: MapListFrTranslations,
    Layout: LayoutFrTranslations,
    MediaList: MediaListFrTranslations,
};
