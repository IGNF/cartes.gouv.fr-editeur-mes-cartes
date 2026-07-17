import { commonFrTranslations } from "@/i18n/locales/Common.locale";
import { BreadcrumbFrTranslations } from "@/i18n/locales/Breadcrumb.locale";
import { DatasheetListFrTranslations } from "@/i18n/locales/MapList.locale";
import { LayoutFrTranslations } from "@/i18n/locales/Layout.locale";
import type { Translations } from "../types";

export const translations: Translations<"fr"> = {
    Common: commonFrTranslations,
    Breadcrumb: BreadcrumbFrTranslations,
    MapList: DatasheetListFrTranslations,
    Layout: LayoutFrTranslations,
};
