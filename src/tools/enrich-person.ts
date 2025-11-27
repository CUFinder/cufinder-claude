// ** shared
import {
    TepServiceParams,
    TepServiceResponse,
    EnrichedPersonModel,
} from '../shared/types';

// ** utils
import apiClient from '../client';

const enrichPerson = async (
    params: TepServiceParams,
): Promise<TepServiceResponse> => {
    try {
        const response = await apiClient.post<TepServiceResponse>(
            '/tep',
            params,
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to enrich person: ${error.message}`);
    }
};

function formatEnrichedPerson(person: EnrichedPersonModel): string {
    let result = '';

    if (person?.full_name) {
        result += `\nFull Name: ${person?.full_name}`;
    }

    if (person?.summary) {
        result += `\nSummary: ${person.summary}`;
    }

    if (person?.job_title) {
        result += `\nJob Title: ${person.job_title}`;
    }

    if (person?.job_title_categories?.length > 0) {
        result += `\nJob Title Categories: ${person.job_title_categories.join(', ')}`;
    }

    if (person?.followers_count) {
        result += `\nFollowers Count: ${person.followers_count}`;
    }

    if (person?.phone) {
        result += `\nPhone: ${person.phone}`;
    }

    if (person?.email) {
        result += `\nEmail: ${person.email}`;
    }

    if (person?.facebook) {
        result += `\nFacebook: ${person.facebook}`;
    }

    if (person?.linkedin_url) {
        result += `\nLinkedIn: ${person.linkedin_url}`;
    }

    if (person?.twitter) {
        result += `\nX (twitter): ${person.twitter}`;
    }

    if (person?.country || person?.state || person?.city) {
        const location = [person.country, person.state, person.city]
            .filter(Boolean)
            .join(', ');
        result += `\nLocation: ${location}`;
    }

    if (person?.company_name) {
        result += `\nCompany Name: ${person.company_name}`;
    }

    if (person?.company_size) {
        result += `\nCompany Size: ${person.company_size}`;
    }

    if (person?.company_industry) {
        result += `\nCompany Industry: ${person.company_industry}`;
    }

    if (person?.company_facebook) {
        result += `\nCompany Facebook: ${person.company_facebook}`;
    }

    if (person?.company_linkedin) {
        result += `\nCompany LinkedIn: ${person.company_linkedin}`;
    }

    if (person?.company_twitter) {
        result += `\nCompany X (twitter): ${person.company_twitter}`;
    }

    if (
        person?.company_country ||
        person?.company_state ||
        person?.company_city
    ) {
        const location = [
            person.company_country,
            person.company_state,
            person.company_city,
        ]
            .filter(Boolean)
            .join(', ');

        result += `\nCompany Location: ${location}`;
    }

    return result;
}

export const handleEnrichPerson = async (args: any) => {
    const result = await enrichPerson(args as TepServiceParams);
    const { query, person } = result.data;

    let response = `🔍 Person Enrichment Result\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: 10\n\n`;
    response += formatEnrichedPerson(person);

    return {
        content: [
            {
                type: 'text',
                text: response,
            },
        ],
    };
};
