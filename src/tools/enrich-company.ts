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
    let result = `🏢 ${company.name || '---'}`;

    if (company.website) {
        result += `\n🌐 Website: ${company.website}`;
    }

    if (company.domain) {
        result += `\n🔗 Domain: ${company.domain}`;
    }

    if (company.industry) {
        result += `\n🏭 Industry: ${company.industry}`;
    }

    if (company.employees?.range) {
        result += `\n👥 Employee Size: ${company.employees.range}`;
    }

    if (company.employees?.count) {
        result += `\n👥 Employee Count: ${company.employees.count}`;
    }

    if (company.annual_revenue) {
        result += `\n💰 Annual Revenue: ${company.annual_revenue}`;
    }

    if (company.founded_date) {
        result += `\n📅 Founded: ${company.founded_date}`;
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
        result += `\n📍 Location: ${loc}`;
    }

    if (company.main_location?.address) {
        result += `\n📮 Address: ${company.main_location.address}`;
    }

    if (company.followers) {
        result += `\n👤 Followers: ${company.followers.toLocaleString()}`;
    }

    if (company.social?.linkedin) {
        result += `\n🔗 LinkedIn: ${company.social.linkedin}`;
    }

    if (company.social?.twitter) {
        result += `\n🐦 Twitter: ${company.social.twitter}`;
    }

    if (company.social?.facebook) {
        result += `\n📘 Facebook: ${company.social.facebook}`;
    }

    if (company.overview) {
        result += `\n📝 Overview: ${company.overview}`;
    }

    if (company.specialties && company.specialties.length > 0) {
        result += `\n🎯 Specialties: ${company.specialties.join(', ')}`;
    }

    if (company.technologies && company.technologies.length > 0) {
        result += `\n💻 Technologies:`;
        company.technologies.slice(0, 10).forEach((tech) => {
            if (tech.technology_name) {
                result += `\n   • ${tech.technology_name}`;
                if (tech.category) {
                    result += ` (${tech.category})`;
                }
            }
        });
        if (company.technologies.length > 10) {
            result += `\n   ... and ${company.technologies.length - 10} more`;
        }
    }

    if (company.funding?.last_round_type) {
        result += `\n💵 Funding:`;
        result += `\n   • Last Round: ${company.funding.last_round_type}`;
        if (company.funding.last_round_money_raised_amount) {
            result += `\n   • Amount: ${company.funding.last_round_money_raised_amount}`;
        }
        if (company.funding.number_of_rounds) {
            result += `\n   • Total Rounds: ${company.funding.number_of_rounds}`;
        }
    }

    if (company.connections?.emails && company.connections.emails.length > 0) {
        result += `\n📧 Emails: ${company.connections.emails.join(', ')}`;
    }

    if (company.connections?.phones && company.connections.phones.length > 0) {
        result += `\n📞 Phones: ${company.connections.phones.join(', ')}`;
    }

    if (company.locations && company.locations.length > 0) {
        result += `\n📍 Additional Locations (${company.locations.length}):`;
        company.locations.slice(0, 5).forEach((loc, idx) => {
            const locStr = [loc.country, loc.state, loc.city]
                .filter(Boolean)
                .join(', ');
            if (locStr) {
                result += `\n   ${idx + 1}. ${locStr}`;
            }
        });
        if (company.locations.length > 5) {
            result += `\n   ... and ${company.locations.length - 5} more`;
        }
    }

    if (company.geo_location?.rating) {
        result += `\n⭐ Google Rating: ${company.geo_location.rating}`;
        if (company.geo_location.reviews_count) {
            result += ` (${company.geo_location.reviews_count} reviews)`;
        }
    }

    return result;
}

export const handleEnrichCompany = async (args: any) => {
    const result = await enrichCompany(args as EncServiceParams);
    const { query, credit_count, company } = result.data;

    let response = `🔍 ENC Company Enrichment Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: ${credit_count}\n\n`;
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
