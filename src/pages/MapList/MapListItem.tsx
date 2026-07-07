import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Button from "@codegouvfr/react-dsfr/Button";
import Card from "@codegouvfr/react-dsfr/Card";
import { FC } from "react";
import { symToStr } from "tsafe/symToStr";

import { type MapItem } from "@/@types/app";
import { routes } from "@/router/router";

import { useImage } from "@/hooks/useImage";

type MapListItemProps = {
    map: MapItem;
};

const MapListItem: FC<MapListItemProps> = ({ map }) => {
    const imageUrl = useImage(map.img_url);

    return (
        <Card
            imageUrl={imageUrl}
            imageAlt={"illustration"}
            horizontal={true}
            title={map.title}
            // desc={map.description} // Pour l'instant on n'en mets pas car dur de faire le textwrap
            start={
                map.theme !== null &&
                <Tag as="span" >
                    {map.theme}
                </Tag >
            }
            footer={
                
                <Button
                    linkProps={routes.view_map({ mapId: map.view_id, }).link}
                    iconId="fr-icon-arrow-right-s-line"
                    iconPosition="right"
                >
                    Voir
                </Button>
            }
            size="small"
        />
    );
};

MapListItem.displayName = symToStr({ MapListItem });
export default MapListItem;
