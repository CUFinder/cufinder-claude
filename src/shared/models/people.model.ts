export interface PeopleModel {
    full_name: string | null;
    current_job: {
        title: string | null;
    };
    company: {
        name: string | null;
        linkedin: string | null;
        website: string | null;
        industry: string | null;
        main_location: {
            country: string | null;
            state: string | null;
            city: string | null;
        };
        social: {
            linkedin: string | null;
            facebook: string | null;
            twitter: string | null;
        };
    };
    location: {
        country: string | null;
        state: string | null;
        city: string | null;
    };
    social: {
        linkedin: string | null;
        facebook: string | null;
        twitter: string | null;
    };
}
