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
    let result = '';

    if (business.name) {
        result += `Name: ${business.name}`;
    }

    if (business?.overview) {
        result += `\nOverview: ${business.overview}`;
    }

    if (business.website) {
        result += `\nCompany: ${business.website}`;
    }

    if (business.industry) {
        result += `\nIndustry: ${business.industry}`;
    }

    if (business?.industry_details?.level_1) {
        result += `\nIndustry Category: ${business.industry_details.level_1}`;
    }

    if (business?.industry_details?.level_2) {
        result += `\nIndustry Top Category: ${business.industry_details.level_2}`;
    }

    if (business?.industry_details?.naics_code) {
        result += `\nIndustry NAICS Code: ${business.industry_details.naics_code}`;
    }

    if (business?.industry_details?.sic_code) {
        result += `\nIndustry SIC Code: ${business.industry_details.sic_code}`;
    }

    if (
        business.main_location?.country ||
        business.main_location?.state ||
        business.main_location?.city
    ) {
        const location = [
            business.main_location.country,
            business.main_location.state,
            business.main_location.city,
        ]
            .filter(Boolean)
            .join(', ');
        result += `\nMain Location: ${location}`;
    }

    if (business?.geo_location?.rating) {
        result += `\nGoogle Maps Rating: ${business.geo_location.rating}`;
    }

    if (business?.geo_location?.reviews_count) {
        result += `\nGoogle Maps Reviews Count: ${business.geo_location.reviews_count}`;
    }

    if (business?.social?.facebook) {
        result += `\nFacebook: ${business.social.facebook}`;
    }

    if (business?.social?.linkedin) {
        result += `\nLinkedIn: ${business.social.linkedin}`;
    }

    if (business?.social?.linkedin) {
        result += `\nX (twitter): ${business.social.twitter}`;
    }

    if (business?.social?.instagram) {
        result += `\nInstagram: ${business.social.instagram}`;
    }

    if (business?.social?.youtube) {
        result += `\nYoutube: ${business.social.youtube}`;
    }

    if (business?.connections?.emails?.length > 0) {
        result += `\nEmails: ${business.connections?.emails.join(', ')}`;
    }

    if (business?.connections?.phones?.length > 0) {
        result += `\nPhones: ${business.connections?.phones.join(', ')}`;
    }

    return result;
}

export const handleLocalBusinessSearch = async (args: any) => {
    const result = await searchLocalBusinesses(args as LbsServiceParams);
    const { query, companies } = result.data;

    let response = `🔍 Local Business Search Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: 5\n`;

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
