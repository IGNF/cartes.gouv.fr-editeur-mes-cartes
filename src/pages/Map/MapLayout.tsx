import ListMain from "@/components/Layout/ListMain";
import PageTitle from "@/components/Layout/PageTitle";
import { FC, PropsWithChildren, memo } from "react";
import { AppLayoutProps } from "@/components/Layout/AppLayout";
import { useTranslation } from "@/i18n";


const MapLayout: FC<PropsWithChildren<AppLayoutProps>> = ({ children }) => {
    const { t } = useTranslation("Map");

    return (
        <ListMain title={t("map-list")} >
            <PageTitle title={t("map-list")}>
            </PageTitle>
            {children}
        </ListMain>
    );
};

export default memo(MapLayout);