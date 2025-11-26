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
    let result = '';

    if (company?.name) {
        result += `\nName: ${company.name}`;
    }

    if (company?.overview) {
        result += `\nOverview: ${company.overview}`;
    }

    if (company?.type) {
        result += `\nType: ${company.type}`;
    }

    if (company?.industry) {
        result += `\nIndustry: ${company.industry}`;
    }

    if (company?.employees?.range) {
        result += `\nEmployee Size: ${company.employees.range}`;
    }

    if (company?.website) {
        result += `\nWebsite: ${company.website}`;
    }

    if (company?.domain) {
        result += `\nDomain: ${company.domain}`;
    }

    if (company?.social?.facebook) {
        result += `\nFacebook: ${company.social.facebook}`;
    }

    if (company?.social?.linkedin) {
        result += `\nLinkedIn: ${company.social.linkedin}`;
    }

    if (company?.social?.twitter) {
        result += `\nX (twitter): ${company.social.twitter}`;
    }

    if (
        company?.main_location?.country ||
        company?.main_location?.state ||
        company?.main_location?.city
    ) {
        const loc = [
            company.main_location.country,
            company.main_location.state,
            company.main_location.city,
        ]
            .filter(Boolean)
            .join(', ');
        result += `\nLocation: ${loc}`;
    }

    if (company?.main_location?.address) {
        result += `\nAddress: ${company.main_location.address}`;
    }

    return result;
}

export const handleCompaniesSearch = async (args: any) => {
    const result = await searchCompanies(args as CseServiceParams);
    const { query, companies } = result.data;

    let response = `🔍 Company Search Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: 3\n`;

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
