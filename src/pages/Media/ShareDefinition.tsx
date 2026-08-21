import { fr } from "@codegouvfr/react-dsfr";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import { FC, Fragment } from "react";

import { getTranslation } from "@/i18n/i18n";
import { shareTypes } from "@/types/Share";

const ShareDefinition: FC = () => {
    const { t } = getTranslation("Organization");
    return (
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
            <div
                className={fr.cx("fr-col-12", "fr-text--xs")}
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <strong className={fr.cx("fr-mr-2v")}>{t("share__label")}</strong>

                {shareTypes.map((type) => (
                    <Fragment key={type}>
                        <Tooltip kind="click" title={t("share__explain", type)} />
                        <span className={fr.cx("fr-mx-1v")}> {t("share", type)}</span>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export { ShareDefinition };
