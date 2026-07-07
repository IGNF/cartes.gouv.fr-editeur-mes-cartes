import type { Theme } from "./types";
import { get } from "./client";

const list = (signal?: AbortSignal): Promise<Theme[]> =>
    get<Theme[]>("/themes", { signal });

const themes = {
    list,
};

export default themes;
