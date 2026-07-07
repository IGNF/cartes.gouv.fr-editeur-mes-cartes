
import { commonEnTranslations } from "../Common.locale";
import { BreadcrumbEnTranslations } from "@/modules/breadcrumbs/Breadcrumb.locale";
import { DatasheetListEnTranslations } from "@/pages/MapList/MapList.locale";
import type { Translations } from "../types";

export const translations: Translations<"en"> = {
    Common: commonEnTranslations,
    Breadcrumb: BreadcrumbEnTranslations,
    MapList: DatasheetListEnTranslations,
};
