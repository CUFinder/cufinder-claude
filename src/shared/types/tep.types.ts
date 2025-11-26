// ** shared
import { BaseResponse } from './base.types';

export interface EnrichedPersonModel {
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    linkedin_url: string | null;
    summary: string | null;
    followers_count: number | null;
    facebook: string | null;
    twitter: string | null;
    avatar: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    job_title: string | null;
    job_title_categories: string[];
    email: string | null;
    phone: string | null;
    company_name: string | null;
    company_linkedin: string | null;
    company_website: string | null;
    company_size: string | null;
    company_industry: string | null;
    company_facebook: string | null;
    company_twitter: string | null;
    company_country: string | null;
    company_state: string | null;
    company_city: string | null;
}

export interface TepServiceParams {
    full_name: string;
    company: string;
}

export interface TepServiceResponse
    extends BaseResponse<{ person: EnrichedPersonModel }> {}
