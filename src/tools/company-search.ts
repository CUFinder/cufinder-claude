// ** shared
import { CseServiceParams, CseServiceResponse } from '../shared/types';

// ** utils
import apiClient from '../client';
import { CompanyModel } from '../shared/models';

const searchCompanies = async (
    params: CseServiceParams,
): Promise<CseServiceResponse> => {
    try {
        const response = await apiClient.post<CseServiceResponse>(
            '/cse',
            params,
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to search companies: ${error.message}`);
    }
};

function formatCompany(company: CompanyModel): string {
    let result = `🏢 ${company.name || '---'}`;

    if (company.type) {
        result += `\n Type: ${company.type}`;
    }

    if (company.industry) {
        result += `\n Industry: ${company.industry}`;
    }

    if (company.employees?.range) {
        result += `\n Employee Size: ${company.employees.range}`;
    }

    if (
        company.main_location?.country ||
        company.main_location?.state ||
        company.main_location?.city
    ) {
        const loc = [
            company.main_location.country,
            company.main_location.state,
            company.main_location.city,
        ]
            .filter(Boolean)
            .join(', ');
        result += `\n Location: ${loc}`;
    }

    if (company.website) {
        result += `\n Website: ${company.website}`;
    }

    if (company.domain) {
        result += `\n Domain: ${company.domain}`;
    }

    if (company.social?.linkedin) {
        result += `\n LinkedIn: ${company.social.linkedin}`;
    }

    if (company.overview) {
        result += `\n Overview: ${company.overview}`;
    }

    return result;
}

export const handleCompaniesSearch = async (args: any) => {
    const result = await searchCompanies(args as CseServiceParams);
    const { query, credit_count, companies } = result.data;

    let response = `🔍 CSE Search Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: ${credit_count}\n`;
    response += `Found ${companies.length} companies:\n\n`;

    companies.forEach((company, index) => {
        response += `${index + 1}. ${formatCompany(company)}\n\n`;
    });

    return {
        content: [
            {
                type: 'text',
                text: response,
            },
        ],
    };
};
