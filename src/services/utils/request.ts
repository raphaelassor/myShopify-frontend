import { BaseQueryRequest, Filters, SortRequest } from "../productService";
export const DEFAULT_SKIP = 25;
type GetRequestParams = <T extends { activeFilters?: Filters, page?: number, sort?: SortRequest }>(params: T, skip?: number) => BaseQueryRequest

export const getBaseRequestParams: GetRequestParams = ({ sort = {}, activeFilters = {}, page = 1 }, skip = DEFAULT_SKIP) => ({
    skipStart: page * skip,
    skipEnd: page * skip + skip,
    filters: activeFilters,
    sortId: sort.sortId,
    sortOrder: sort.sortOrder

})