// ** shared
import { PseServiceParams, PseServiceResponse } from '../shared/types';
import { PeopleModel } from '../shared/models';

// ** utils
import apiClient from '../client';

const searchPeople = async (
    params: PseServiceParams,
): Promise<PseServiceResponse> => {
    try {
        const response = await apiClient.post<PseServiceResponse>(
            '/pse',
            params,
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to search people: ${error.message}`);
    }
};

function formatPerson(person: PeopleModel): string {
    let result = '';

    if (person?.full_name) {
        result += `\nJob Title: ${person.full_name}`;
    }

    if (person?.current_job?.title) {
        result += `\nJob Title: ${person.current_job.title}`;
    }

    if (
        person?.location?.country ||
        person?.location?.state ||
        person?.location?.city
    ) {
        const loc = [
            person.location.country,
            person.location.state,
            person.location.city,
        ]
            .filter(Boolean)
            .join(', ');
        result += `\nLocation: ${loc}`;
    }

    if (person?.social?.linkedin) {
        result += `\nLinkedIn: ${person.social.linkedin}`;
    }

    if (person?.company?.name) {
        result += `\nCompany: ${person.company.name}`;
    }

    if (person?.company?.website) {
        result += `\nCompany Website: ${person.company.website}`;
    }

    if (person?.company?.industry) {
        result += `\nCompany Industry: ${person.company.industry}`;
    }

    return result;
}

export const handlePeopleSearch = async (args: any) => {
    const result = await searchPeople(args as PseServiceParams);
    const { query, peoples } = result.data;

    let response = `🔍 Person Search Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: 5\n`;

    peoples.forEach((person, index) => {
        response += `${index + 1}. ${formatPerson(person)}\n\n`;
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
