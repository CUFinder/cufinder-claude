export interface CompanyModel {
    name: string | null;
    website: string | null;
    domain: string | null;
    employees: {
        range: string | null;
    };
    industry: string | null;
    overview: string | null;
    type: string | null;
    main_location: {
        country: string | null;
        state: string | null;
        city: string | null;
        address: string | null;
    };
    social: {
        facebook: string | null;
        linkedin: string | null;
        twitter: string | null;
    };
}
