type CompanyLocationModel = {
    country: string | string;
    state: string | string;
    city: string | string;
    postal_code: string | string;
    line1: string | string;
    line2: string | string;
    latitude: string | string;
    longitude: string | string;
};

type CompanyTechnologyModel = {
    category: string | string;
    super_category: string | string;
    technology_name: string | string;
    technology_website: string | string;
};

type CompnayEmployeeModel = {
    range: string | null;
    count: number;
};

type CompanyMainLocationModel = {
    geo: string | null;
    city: string | null;
    continent: string | null;
    state: string | null;
    country: string | null;
    address: string | null;
    postal_code: string | null;
};

type CompanyGeoLocationModel = {
    google_maps_id: string | null;
    rating: number | null;
    reviews_count: number | null;
};

type CompanyIndustryModel = {
    level_1: string | null;
    level_2: string | null;
    naics_code: string | null;
    sic_code: string | null;
};

type CompanyFundingModel = {
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

type CompanySocialModel = {
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    youtube: string | null;
    instagram: string | null;
};

type CompanyConnectionsModel = {
    emails: string[];
    phones: string[];
};

export interface LocalBusinessModel {
    mng_id: string;
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
    locations: Array<CompanyLocationModel>;
    technologies: Array<CompanyTechnologyModel>;
    affiliated_pages: Array<string>;
    specialties: Array<string>;

    employees: CompnayEmployeeModel;
    main_location: CompanyMainLocationModel;
    geo_location: CompanyGeoLocationModel;
    industry_details: CompanyIndustryModel;
    funding: CompanyFundingModel;
    social: CompanySocialModel;
    connections: CompanyConnectionsModel;
}
