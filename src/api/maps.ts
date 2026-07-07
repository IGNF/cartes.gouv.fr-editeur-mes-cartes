import type { MapResearch, MapView, MapsSearchParams } from "./types";
import { get } from "./client";

const getMaps = (params: MapsSearchParams = {}, signal?: AbortSignal): Promise<MapResearch> =>
    get<MapResearch>("/maps", { query: params, signal });

const getView = (viewId: string, signal?: AbortSignal): Promise<MapView> =>
    get<MapView>(`/maps/${encodeURIComponent(viewId)}`, { signal });

const maps = {
    getMaps,
    getView,
};

export default maps;
