// ** shared
import {
    EncServiceParams,
    EncServiceResponse,
    EnrichedCompanyModel,
} from '../shared/types';

// ** utils
import apiClient from '../client';

const enrichCompany = async (
    params: EncServiceParams,
): Promise<EncServiceResponse> => {
    try {
        const response = await apiClient.post<EncServiceResponse>(
            '/enc',
            params,
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to enrich company: ${error.message}`);
    }
};

function formatEnrichedCompany(company: EnrichedCompanyModel): string {
    let result = `${company.name || '---'}`;

    if (company.description) {
        result += `\nOverview: ${company.description}`;
    }

    if (company.domain) {
        result += `\nDomain: ${company.domain}`;
    }

    if (company.website) {
        result += `\nWebsite: ${company.website}`;
    }

    if (company.industry) {
        result += `\nIndustry: ${company.industry}`;
    }

    if (company.size) {
        result += `\nEmployee Size: ${company.size} (${company.employee_count} employees)`;
    }

    if (company.followers_count) {
        result += `\nFollowers Count: ${company.followers_count}`;
    }

    if (company.founded_year) {
        result += `\nFounded Year: ${company.founded_year}`;
    }

    if (company.type) {
        result += `\nType: ${company.type}`;
    }

    if (company.linkedin_url) {
        result += `\nLinkedIn: ${company.linkedin_url}`;
    }

    if (company.country || company.state || company.city) {
        const location = [company.country, company.state, company.city]
            .filter(Boolean)
            .join(', ');
        result += `\nLocation: ${location}`;
    }

    if (company?.address) {
        result += `\nAddress: ${company.address}`;
    }

    return result;
}

export const handleEnrichCompany = async (args: any) => {
    const result = await enrichCompany(args as EncServiceParams);
    const { query, company } = result.data;

    let response = `🔍 Company Enrichment Result\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: 3\n\n`;
    response += formatEnrichedCompany(company);

    return {
        content: [
            {
                type: 'text',
                text: response,
            },
        ],
    };
};
