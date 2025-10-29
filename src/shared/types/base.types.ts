export interface BaseResponse<T = any> {
    status: 1 | -1;
    data: {
        query: string;
        credit_count: number;
        confidence_level: number;
    } & T;
}
