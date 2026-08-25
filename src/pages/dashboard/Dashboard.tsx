import Badge from "@codegouvfr/react-dsfr/Badge";
import { fr } from "@codegouvfr/react-dsfr";
import Tile from "@codegouvfr/react-dsfr/Tile";

import Main from "@/components/Layout/Main";
import { routes } from "@/router/router";
import mapSvgUrl from "@/img/pictograms/maps.svg?no-inline";
import gallerySvgUrl from "@/img/pictograms/gallery.svg?no-inline";
import teamUrl from "@/img/pictograms/team.svg?no-inline";
import { useTranslation } from "@/i18n";
import { useOidc } from "@/oidc";

export default function Dashboard() {
    const { t } = useTranslation("Common");
    const { t: tLayout } = useTranslation("Layout");
    const { t: tMap } = useTranslation("Map");
    const { t: tMedia } = useTranslation("Media");
    const { t: tOrganization } = useTranslation("Organization");
    const { decodedIdToken } = useOidc();

    return (
        <Main title={tLayout("board")}>
            <h1 className={fr.cx("fr-mt-4v")}>{tLayout("board")}</h1>
            <p className={fr.cx("fr-text--xl")}>{t("welcome", { username: decodedIdToken.preferred_username })}</p>

            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-3w")}>
                <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
                    <Tile
                        linkProps={routes.map_list().link}
                        imageUrl={mapSvgUrl}
                        title={tMap("map-list")}
                        desc={tMap("map-list__description")}
                        start={
                            <Badge className={fr.cx("fr-badge--yellow-tournesol")} noIcon={true} as="span" small={true}>
                                <span className={fr.cx("fr-icon--sm", "fr-icon-brush-fill", "fr-mr-1v")} />
                                {tMap("create-map-service")}
                            </Badge>
                        }
                        orientation="vertical"
                        classes={{
                            img: fr.cx("fr-mb-0"),
                        }}
                    />
                </div>
                <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
                    <Tile
                        linkProps={routes.media_list().link}
                        imageUrl={gallerySvgUrl}
                        title={tMedia("media-list")}
                        desc={tMedia("media-list__description")}
                        start={
                            <Badge className={fr.cx("fr-badge--yellow-tournesol")} noIcon={true} as="span" small={true}>
                                <span className={fr.cx("fr-icon--sm", "fr-icon-brush-fill", "fr-mr-1v")} />
                                {tMap("create-map-service")}
                            </Badge>
                        }
                        orientation="vertical"
                        classes={{
                            img: fr.cx("fr-mb-0"),
                        }}
                    />
                </div>
                <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
                    <Tile
                        linkProps={routes.organization_list().link}
                        imageUrl={teamUrl}
                        title={tOrganization("organization-list")}
                        desc={tOrganization("organization-list__description")}
                        start={
                            <Badge className={fr.cx("fr-badge--yellow-tournesol")} noIcon={true} as="span" small={true}>
                                <span className={fr.cx("fr-icon--sm", "fr-icon-brush-fill", "fr-mr-1v")} />
                                {tMap("create-map-service")}
                            </Badge>
                        }
                        orientation="vertical"
                        classes={{
                            img: fr.cx("fr-mb-0"),
                        }}
                    />
                </div>
            </div>
        </Main>
    );
}
