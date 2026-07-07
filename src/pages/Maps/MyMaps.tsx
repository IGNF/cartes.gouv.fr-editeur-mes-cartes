import { fr } from "@codegouvfr/react-dsfr";
import { FC } from "react";

import MapMain from "@/components/Layout/MapMain";

const MyMaps: FC = () => {
    return (
        <MapMain title="Mes cartes">
            <div className={fr.cx("fr-py-4v")}>
                <h2 className={fr.cx("fr-h3")}>Mes cartes</h2>
                <p className={fr.cx("fr-text--lg", "fr-text--regular")}>
                    Retrouvez ici toutes vos cartes créées sur cartes.gouv.fr.
                </p>
                <div className={fr.cx("fr-callout", "fr-mt-4v")}>
                    <p className={fr.cx("fr-callout__text")}>
                        La liste de vos cartes sera disponible prochainement.
                    </p>
                </div>
            </div>
        </MapMain>
    );
};

export default MyMaps;
