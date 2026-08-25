import ListMain from "@/components/Layout/ListMain";
import PageTitle from "@/components/Layout/PageTitle";
import { FC, PropsWithChildren, memo } from "react";
import { AppLayoutProps } from "@/components/Layout/AppLayout";
import { useTranslation } from "@/i18n";

const MediaLayout: FC<PropsWithChildren<AppLayoutProps>> = ({ children }) => {
    const { t } = useTranslation("Media");

    return (
        <ListMain title={t("media-list")}>
            <PageTitle title={t("media-list")}></PageTitle>
            {children}
        </ListMain>
    );
};

export default memo(MediaLayout);
