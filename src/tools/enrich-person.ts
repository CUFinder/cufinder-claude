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
    let result = `👤 ${person.full_name || '---'}`;

    if (person.current_job?.title) {
        result += `\n💼 Job Title: ${person.current_job.title}`;
    }

    if (person.current_job?.role) {
        result += `\n📋 Role: ${person.current_job.role}`;
    }

    if (person.current_job?.level) {
        result += `\n📊 Level: ${person.current_job.level}`;
    }

    if (person.company?.name) {
        result += `\n🏢 Company: ${person.company.name}`;
    }

    if (person.company?.website) {
        result += `\n🌐 Company Website: ${person.company.website}`;
    }

    if (person.company?.industry) {
        result += `\n🏭 Company Industry: ${person.company.industry}`;
    }

    if (person.company?.size) {
        result += `\n👥 Company Size: ${person.company.size}`;
    }

    if (
        person.location?.country ||
        person.location?.state ||
        person.location?.city
    ) {
        const loc = [
            person.location.country,
            person.location.state,
            person.location.city,
        ]
            .filter(Boolean)
            .join(', ');
        result += `\n📍 Location: ${loc}`;
    }

    if (person.experience) {
        result += `\n⏳ Years of Experience: ${person.experience}`;
    }

    if (person.social?.linkedin) {
        result += `\n🔗 LinkedIn: ${person.social.linkedin}`;
    }

    if (person.social?.linkedin_connections) {
        result += `\n👥 LinkedIn Connections: ${person.social.linkedin_connections.toLocaleString()}`;
    }

    if (person.social?.twitter) {
        result += `\n🐦 Twitter: ${person.social.twitter}`;
    }

    if (person.social?.facebook) {
        result += `\n📘 Facebook: ${person.social.facebook}`;
    }

    if (person.social?.github) {
        result += `\n💻 GitHub: ${person.social.github}`;
    }

    if (person.connections?.work_email) {
        result += `\n📧 Work Email: ${person.connections.work_email}`;
    }

    if (person.connections?.personal_email) {
        result += `\n📧 Personal Email: ${person.connections.personal_email}`;
    }

    if (person.connections?.phone) {
        result += `\n📞 Phone: ${person.connections.phone}`;
    }

    if (person.overview) {
        result += `\n📝 Overview: ${person.overview}`;
    }

    if (person.skills && person.skills.length > 0) {
        result += `\n🎯 Skills: ${person.skills.slice(0, 10).join(', ')}`;
        if (person.skills.length > 10) {
            result += ` ... and ${person.skills.length - 10} more`;
        }
    }

    if (person.interests && person.interests.length > 0) {
        result += `\n❤️ Interests: ${person.interests.slice(0, 5).join(', ')}`;
        if (person.interests.length > 5) {
            result += ` ... and ${person.interests.length - 5} more`;
        }
    }

    if (person.experiences && person.experiences.length > 0) {
        result += `\n\n💼 Work Experience (${person.experiences.length}):`;
        person.experiences.slice(0, 5).forEach((exp, idx) => {
            result += `\n   ${idx + 1}. ${exp.title?.name || 'Unknown Title'}`;
            if (exp.company?.name) {
                result += ` at ${exp.company.name}`;
            }
            if (exp.start_date || exp.end_date) {
                const dates = [exp.start_date, exp.end_date || 'Present']
                    .filter(Boolean)
                    .join(' - ');
                result += ` (${dates})`;
            }
        });
        if (person.experiences.length > 5) {
            result += `\n   ... and ${person.experiences.length - 5} more`;
        }
    }

    if (person.educations && person.educations.length > 0) {
        result += `\n\n🎓 Education (${person.educations.length}):`;
        person.educations.slice(0, 3).forEach((edu, idx) => {
            result += `\n   ${idx + 1}. ${edu.school?.name || 'Unknown School'}`;
            if (edu.degrees && edu.degrees.length > 0) {
                result += ` - ${edu.degrees.join(', ')}`;
            }
            if (edu.majors && edu.majors.length > 0) {
                result += ` in ${edu.majors.join(', ')}`;
            }
        });
        if (person.educations.length > 3) {
            result += `\n   ... and ${person.educations.length - 3} more`;
        }
    }

    if (person.certifications && person.certifications.length > 0) {
        result += `\n\n📜 Certifications (${person.certifications.length}):`;
        person.certifications.slice(0, 5).forEach((cert, idx) => {
            result += `\n   ${idx + 1}. ${cert.name || 'Unknown'}`;
            if (cert.organization) {
                result += ` by ${cert.organization}`;
            }
        });
        if (person.certifications.length > 5) {
            result += `\n   ... and ${person.certifications.length - 5} more`;
        }
    }

    return result;
}

export const handleEnrichPerson = async (args: any) => {
    const result = await enrichPerson(args as TepServiceParams);
    const { query, credit_count, person } = result.data;

    let response = `🔍 TEP Person Enrichment Results\n`;
    response += `Query: ${query}\n`;
    response += `Credits Used: ${credit_count}\n\n`;
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
