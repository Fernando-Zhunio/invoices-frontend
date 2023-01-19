export interface ResponseApi<T> {
    success: boolean,
    data: T
}

export interface ResponsePagination<T> {
    success: boolean,
    data: {
        currentPage: number,
        pageCount: number,
        pageSize: number,
        recordCount: number,
        results: T[]
        
    },
}