import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation";

import AppLayout from "@/components/Layout/AppLayout";
import { externalUrls } from "@/router/externalUrls";
import { routes } from "@/router/router";

function App() {
  const navItems: MainNavigationProps.Item[] = [
    {
      text: "Explorer les cartes",
      linkProps: { href: externalUrls.maps },
      isActive: true,
    },
    {
      text: "Rechercher une donnee",
      linkProps: { href: externalUrls.catalogue },
    },
    {
      text: "Publier une donnee",
      linkProps: routes.discover_publish().link,
    },
  ];

  return (
    <AppLayout>
      <main id="main" role="main" className="fr-container fr-py-8w">
        <h1 className="fr-mb-3w">Bienvenue sur Mes Cartes</h1>
        <p className="fr-text--lg fr-mb-6w">
          Creez, gerez et publiez vos cartes et vos donnees geographiques depuis un espace unique.
        </p>

        <div className="fr-grid-row fr-grid-row--gutters">
          <section className="fr-col-12 fr-col-md-4">
            <h2 className="fr-h4">Explorer</h2>
            <p>Consultez les cartes publiques disponibles.</p>
            <a className="fr-link" href={externalUrls.maps}>Acceder au visualiseur</a>
          </section>
          <section className="fr-col-12 fr-col-md-4">
            <h2 className="fr-h4">Rechercher</h2>
            <p>Trouvez une donnee selon vos besoins metiers.</p>
            <a className="fr-link" href={externalUrls.catalogue}>Ouvrir le catalogue</a>
          </section>
          <section className="fr-col-12 fr-col-md-4">
            <h2 className="fr-h4">Publier</h2>
            <p>Diffusez vos donnees et services en quelques etapes.</p>
            <a className="fr-link" href={routes.discover_publish().href}>Publier une donnee</a>
          </section>
        </div>
      </main>
    </AppLayout>
  )
}

export default App
