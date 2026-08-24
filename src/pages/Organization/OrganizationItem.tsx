import Card from "@codegouvfr/react-dsfr/Card";
import { FC, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";

import { useImage } from "@/hooks/useImage";
import { GetOrganizationsMe200Item } from "@/api/model";
import { useTranslation } from "@/i18n";
import { UserRole } from "@/types/UserRole";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";

type OrganizationItemProps = {
    organization: GetOrganizationsMe200Item,
    footer: ReactNode
};

const OrganizationItem: FC<OrganizationItemProps> = ({ organization, footer }) => {
    const { t } = useTranslation("Organization");
    // En réalité, correspond à une image
    const imageUrl = useImage(organization.profile_picture);

    const getBadgeColor = (role: UserRole): string => {
        switch (role) {
            case UserRole.OWNER:
                return fr.cx("fr-badge--green-bourgeon");
            case UserRole.MEMBER:
                return fr.cx("fr-badge--green-emeraude");
            case UserRole.EDITOR:
                return fr.cx("fr-badge--blue-cumulus");
            default:
                return "";
        }
    }

    return (
        <>
            <Card
                imageUrl={imageUrl}
                imageAlt={"illustration"}
                horizontal={true}
                title={organization.name}
                // desc={map.description} // Pour l'instant on n'en mets pas car dur de faire le textwrap
                start={
                    <>
                        {organization !== undefined && (

                            <ul className={fr.cx("fr-badge-group")}>
                                {organization.active === false && (
                                    <Badge as="span" severity="warning">
                                        {t("inactive")}
                                    </Badge>
                                )}

                                {organization.user_role !== undefined && (
                                    <Badge as="span" className={getBadgeColor(organization.user_role as UserRole)}>
                                        {t("user-role", organization.user_role as UserRole)}
                                    </Badge >
                                )}

                            </ul>
                        )}
                    </>
                }
                footer={footer}
                size="small"
            />
        </>
    );
};

OrganizationItem.displayName = symToStr({ OrganizationItem });
export default OrganizationItem;
