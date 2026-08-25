import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Card from "@codegouvfr/react-dsfr/Card";
import { FC, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";

import { MapResearchItem } from "@/api/model";
import { useTranslation } from "@/i18n";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import { useImage } from "@/hooks/useImage";
import { Share } from "@/types/Share";

type MapItemProps = {
    map: MapResearchItem;
    footer: ReactNode;
};

const MapItem: FC<MapItemProps> = ({ map, footer }) => {
    // En réalité, correspond à une image
    const imageUrl = useImage(map.img_url);

    const { t } = useTranslation("Map");
    const { t: tOrganization } = useTranslation("Organization");

    let severity: AlertProps.Severity | "new" = "info";
    switch (map.share) {
        case "atlas":
            severity = "success";
            break;
        case "public":
            severity = "new";
            break;
        case "private":
            severity = "error";
            break;
        default:
            break;
    }

    const imageProps = map.organization_id
        ? {
              imageUrl: imageUrl,
              imageAlt: "Illustration de la carte",
              badge: map.share ? (
                  <Badge as="span" severity={severity} noIcon={true}>
                      {tOrganization("share", map.share as Share)}
                  </Badge>
              ) : undefined,
          }
        : {};

    return (
        <>
            <Card
                // On affiche l'image seulement dans la liste des cartes de l'équipe
                {...imageProps}
                horizontal={true}
                title={map.title}
                // TODO : Ajouter classe permettant d'afficher le texte tronqué ?
                desc={map.description}
                start={
                    <ul className="fr-tags-group fr-badges-group">
                        {map.theme !== null && (
                            <li>
                                <Tag as="span">{map.theme}</Tag>
                            </li>
                        )}
                    </ul>
                }
                footer={footer}
                // Avec icônes + nb de vues
                // detail={<><span className={fr.cx("fr-icon-eye-line", "fr-icon--sm", "fr-mr-0-5v")} aria-hidden="true"></span>{ map.nb_view}<span className={fr.cx("fr-icon-time-line", "fr-icon--sm", "fr-mx-1v")} aria-hidden="true"> </span>{map.organization_id ?
                //     t("updated-at-by", { date: map.updated_at, user: map.user }) : t("updated-at", { date: map.updated_at })}
                detail={map.organization_id ? t("updated-at-by", { date: map.updated_at, user: map.user }) : t("updated-at", { date: map.updated_at })}
                size="small"
            />
        </>
    );
};

MapItem.displayName = symToStr({ MapItem });
export default MapItem;
