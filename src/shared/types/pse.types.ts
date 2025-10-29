// ** shared
import { PeopleModel } from '../models';
import { BaseResponse } from './base.types';

export interface PseServiceParams {
    full_name?: string;
    country?: string;
    state?: string;
    city?: string;
    job_title_role?: string;
    job_title_level?: string;
    company_country?: string;
    company_state?: string;
    company_city?: string;
    company_name?: string;
    company_linkedin_url?: string;
    company_industry?: string;
    company_employee_size?: string;
    company_products_services?: string[];
    company_annual_revenue_min?: number;
    company_annual_revenue_max?: number;
    page?: number;
}

export interface PseServiceResponse
    extends BaseResponse<{ peoples: PeopleModel[] }> {}
