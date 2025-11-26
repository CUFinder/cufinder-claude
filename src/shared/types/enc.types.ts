// ** shared
import { BaseResponse } from './base.types';

export interface EnrichedCompanyModel {
    name: string | null;
    website: string | null;
    employee_count: string | null;
    size: string | null;
    industry: string | null;
    description: string | null;
    linkedin_url: string | null;
    type: string | null;
    domain: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    address: string | null;
    founded_year: string | null;
    logo_url: string | null;
    followers_count: number | null;
}

export interface EncServiceParams {
    query: string;
}

export interface EncServiceResponse
    extends BaseResponse<{ company: EnrichedCompanyModel }> {}
