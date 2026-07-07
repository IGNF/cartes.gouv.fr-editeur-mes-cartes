import type { MediasSearchParams, MediaList } from "./types";
import { get } from "./client";

const list = (params: MediasSearchParams = {}, signal?: AbortSignal): Promise<MediaList[]> =>
  get<MediaList[]>("/medias", { query: params, signal });


const getFolders = (organizationId?: string, signal?: AbortSignal): Promise<string[]> =>
  get<string[]>("/medias/folders", {
    query: organizationId ? { organization_id: organizationId } : undefined,
    signal,
  });

const getImage = (fileName?: string, signal?: AbortSignal): Promise<string> =>
  get<string>(`/image/${encodeURIComponent(fileName ?? "")}`, { signal });

const medias = {
  list,
  getFolders,
  getImage
};

export default medias;
