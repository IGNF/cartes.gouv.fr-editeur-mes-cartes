
import client from "./client.ts";
import maps from "./maps.ts";
import medias from "./medias.ts";
import organizations from "./organizations.ts";
import themes from "./themes.ts";

const api = {
	client,
	maps,
	organizations,
	themes,
	medias,
};

export { client, maps, organizations, themes, medias };
export default api;
