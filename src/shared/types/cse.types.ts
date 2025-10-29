// ** shared
import { CompanyModel } from "../models";
import { BaseResponse } from "./base.types";

export interface CseServiceParams {
    name?: string;
    country?: string;
    state?: string;
    city?: string;
    followers_count_min?: number;
    followers_count_max?: number;
    industry?: string;
    employee_size?: string;
    founded_after_year?: number;
    founded_before_year?: number;
    funding_amount_max?: number;
    funding_amount_min?: number;
    products_services?: string[];
    is_school?: boolean;
    annual_revenue_min?: number;
    annual_revenue_max?: number;
    page?: number;
}


export interface CseServiceResponse
    extends BaseResponse<{ companies: CompanyModel[] }> {}
