export interface IQueryResult<T> {
    data: data2<T>
}

interface data2<T> {
    [x: string]: T
}