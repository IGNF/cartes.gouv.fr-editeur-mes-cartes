import { MapItem } from "@/@types/app";

interface IUseThemeResult {
  name: string;
  id: number;
  count: number;
}

// Permet récupèrer les thèmes des cartes (avec le nombre)
export function useTheme(data: MapItem[]): IUseThemeResult[] {
  const themes = {};
  data.forEach((map) => {
    const { theme, theme_id: themeId } = map;
    if (theme && !(theme in themes)) {
      themes[theme] = {
        name: theme,
        id: themeId,
        count: 1
      }
    } else if (theme) {
      themes[theme].count++;
    }
  })

  return Object.values(themes);
}
