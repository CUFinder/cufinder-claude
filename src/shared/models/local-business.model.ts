export interface LocalBusinessModel {
    name: string | null;
    website: string | null;
    industry: string | null;
    industry_details: {
        level_1: string | null;
        level_2: string | null;
        naics_code: string | null;
        sic_code: string | null;
    };
    main_location: {
        country: string | null;
        state: string | null;
        city: string | null;
        address: string | null;
    };
    geo_location: {
        google_maps_id: string | null;
        rating: number | null;
        reviews_count: number | null;
    };
    social: {
        linkedin: string | null;
        twitter: string | null;
        facebook: string | null;
        instagram: string | null;
        youtube: string | null;
    };
    connections: {
        phones: string[];
        emails: string[];
        phone_type: string | null;
    };
}
