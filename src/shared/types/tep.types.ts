// ** shared
import { BaseResponse } from './base.types';

export interface JobTitleCategory {
    category: string;
    super_category: string;
}

export interface PeopleCurrentJob {
    title: string | null;
    role: string | null;
    level: string | null;
    categories: JobTitleCategory[];
}

export interface PeopleLocation {
    country: string | null;
    state: string | null;
    city: string | null;
}

export interface PeopleCompany {
    id: string | null;
    name: string | null;
    website: string | null;
    size: string | null;
    industry: string | null;
    main_location: {
        country: string | null;
        state: string | null;
        city: string | null;
    };
    social: {
        linkedin: string | null;
        twitter: string | null;
        facebook: string | null;
    };
}

export interface PeopleSocial {
    linkedin_username: string | null;
    linkedin_connections: number;
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    github: string | null;
}

export interface PeopleConnections {
    has_work_email: boolean;
    has_personal_email: boolean;
    has_phone: boolean;
    work_email: string | null;
    personal_email: string | null;
    phone: string | null;
    is_accept_all: boolean;
    is_accept_email: boolean;
}

export interface ExperienceCompany {
    name: string | null;
    size: string | null;
    id: string | null;
    founded: string | null;
    industry: string | null;
    location: string | null;
    linkedin_url: string | null;
    linkedin_id: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    website: string | null;
    job_company_id_mongo: string | null;
}

export interface PeopleExperience {
    company: ExperienceCompany;
    location_names: string[];
    end_date: string | null;
    start_date: string | null;
    title: {
        name: string | null;
        role: string | null;
        sub_role: string | null;
        levels: string[];
    };
    is_primary: boolean;
    summary: string | null;
}

export interface PeopleEducation {
    school: {
        name: string | null;
        type: string | null;
        id: string | null;
        location: {
            name: string | null;
            locality: string | null;
            region: string | null;
            country: string | null;
            continent: string | null;
        };
        linkedin_url: string | null;
        facebook_url: string | null;
        twitter_url: string | null;
        linkedin_id: string | null;
        website: string | null;
        domain: string | null;
        job_company_id_mongo: string | null;
        university_id_mongo: string | null;
    };
    end_date: string | null;
    start_date: string | null;
    gpa: string | null;
    degrees: string[];
    majors: string[];
    minors: string[];
    summary: string | null;
}

export interface PeopleCertification {
    organization: string | null;
    start_date: string | null;
    end_date: string | null;
    name: string | null;
}

export interface EnrichedPersonModel {
    mng_id: string | null;
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    logo: string | null;
    overview: string | null;
    experience: number;
    connections: PeopleConnections;
    interests: string[];
    skills: string[];
    educations: PeopleEducation[];
    experiences: PeopleExperience[];
    certifications: PeopleCertification[];
    company: PeopleCompany;
    location: PeopleLocation;
    current_job: PeopleCurrentJob;
    social: PeopleSocial;
}

export interface TepServiceParams {
    full_name: string;
    company: string;
}

export interface TepServiceResponse
    extends BaseResponse<{ person: EnrichedPersonModel }> {}
