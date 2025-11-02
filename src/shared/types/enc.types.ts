// ** shared
import { BaseResponse } from './base.types';

export interface EnrichedCompanyModel {
    name: string | null;
    website: string | null;
    domain: string | null;
    logo: string | null;
    overview: string | null;
    founded_date: string | null;
    industry: string | null;
    annual_revenue: string | null;
    followers: number;
    is_school: boolean;
    is_investor: boolean;
    has_email: boolean;
    has_phone: boolean;
    suggesstions: string[];
    locations: {
        country: string | null;
        state: string | null;
        city: string | null;
        postal_code: string | null;
        line1: string | null;
        line2: string | null;
        latitude: number | null;
        longitude: number | null;
    }[];
    technologies: {
        category: string | null;
        super_category: string | null;
        technology_name: string | null;
        technology_website: string | null;
    }[];
    affiliated_pages: string[];
    specialties: string[];
    employees: {
        range: string | null;
        count: number;
    };
    main_location: {
        geo: string | null;
        city: string | null;
        continent: string | null;
        state: string | null;
        country: string | null;
        address: string | null;
        postal_code: string | null;
    };
    geo_location: {
        google_maps_id: string | null;
        rating: number | null;
        reviews_count: number | null;
    };
    industry_details: object;
    funding: {
        rounds: string | null;
        organization: string | null;
        number_of_rounds: number;
        number_of_other_investors: number;
        last_round_type: string | null;
        last_round_money_raised_amount_currency_code: string | null;
        last_round_money_raised_amount: string | null;
        last_round_investors: string | null;
        last_round_founding_url: string | null;
        updated_at: string | null;
    };
    social: {
        linkedin: string | null;
        twitter: string | null;
        facebook: string | null;
        youtube: string | null;
        instagram: string | null;
    };
    connections: {
        emails: string[];
        phones: string[];
    };
}

export interface EncServiceParams {
    query: string;
}

export interface EncServiceResponse
    extends BaseResponse<{ company: EnrichedCompanyModel }> {}
