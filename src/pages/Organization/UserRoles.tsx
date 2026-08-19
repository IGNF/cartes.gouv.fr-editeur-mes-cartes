import { fr } from "@codegouvfr/react-dsfr";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import { FC, Fragment } from "react";

import { getTranslation } from "@/i18n/i18n";
import { roleTypes } from "@/types/UserRole";

const UserRoles: FC = () => {
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
                <strong className={fr.cx("fr-mr-2v")}>Droits</strong>

                {roleTypes.map((type) => (
                    <Fragment key={type}>
                        <Tooltip kind="click" title={t("user-role__explain", type)} />
                        <span className={fr.cx("fr-mr-2v")}> {t("user-role", type)}</span>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export { UserRoles };
