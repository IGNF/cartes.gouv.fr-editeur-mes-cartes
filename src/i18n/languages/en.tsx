
import { commonEnTranslations } from "../locales/Common.locale";
import { BreadcrumbEnTranslations } from "@/i18n/locales/Breadcrumb.locale";
import { DatasheetListEnTranslations } from "@/i18n/locales/MapList.locale";
import type { Translations } from "../types";

export const translations: Translations<"en"> = {
    Common: commonEnTranslations,
    Breadcrumb: BreadcrumbEnTranslations,
    MapList: DatasheetListEnTranslations,
};
