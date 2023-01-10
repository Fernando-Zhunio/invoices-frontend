export interface ResponseApi<T> {
    success: boolean,
    data: T
}

export interface ResponsePagination<T> {
    success: boolean,
    data: T,
}