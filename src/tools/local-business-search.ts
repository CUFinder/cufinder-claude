// ** shared
import { LbsServiceParams, LbsServiceResponse } from '../shared/types';
import { LocalBusinessModel } from '../shared/models';

// ** utils
import apiClient from '../client';

const searchLocalBusinesses = async (
    params: LbsServiceParams,
): Promise<LbsServiceResponse> => {
    try {
        const response = await apiClient.post<LbsServiceResponse>(
            '/pse',
            params,
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to search people: ${error.message}`);
    }
};

function formatLocalBusiness(business: LocalBusinessModel): string {
    let result = ` ${business.name || '---'}`;

    if (business.social?.linkedin) {
        result += `\n LinkedIn: ${business.social.linkedin}`;
    }

    if (business.name) {
        result += `\n Company: ${business.name}`;
    }

    return result;
}

export const handleLocalBusinessSearch = async (args: any) => {
    const result = await searchLocalBusinesses(args as LbsServiceParams);
    const { query, credit_count, companies } = result.data;

    let response = `🔍 PSE Search Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: ${credit_count}\n`;
    response += `Found ${companies.length} companies:\n\n`;

    companies.forEach((company, index) => {
        response += `${index + 1}. ${formatLocalBusiness(company)}\n\n`;
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
