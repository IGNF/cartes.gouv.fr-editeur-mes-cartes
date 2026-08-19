interface IUseFakePaginationResult {
    totalPages: number;
}

interface IUsePaginationResult<T> {
    paginatedItems: T[];
    totalPages: number;
}

export function usePagination<T>(data: T[], page = 1, limit = 20): IUsePaginationResult<T> {
    const totalPages = Math.ceil(data.length / limit);
    if (page > totalPages) {
        page = totalPages;
    } else if (page < 1) {
        page = 1;
    }
    console.log(page)
    return {
        paginatedItems: data?.slice((page - 1) * limit, page * limit),
        totalPages,
    };
}

/**
 * Permet de retourner un nombre de page à utiliser selon un nombre de cartes et de 
 * @param count Nombre total d'objet
 * @param page Page courante
 * @param limit Nombre d'objet par page
 */
export function useFakePagination(count: number,  limit = 10): IUseFakePaginationResult {
    return {
        totalPages: Math.ceil(count / limit),
    };
}