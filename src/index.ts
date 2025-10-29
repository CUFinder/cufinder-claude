// ** tools
import { handlePeopleSearch } from './tools/peoples-search';
import { handleCompaniesSearch } from './tools/company-search';

// ** third parties
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { handleLocalBusinessSearch } from './tools/local-business-search';

const server = new Server(
    {
        name: 'cufinder-mcp',
        version: '0.0.1',
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

// Tool definitions
const tools = [
    {
        name: 'people_search',
        description:
            'Search for people using CUFinder PSE API with various filters',
        inputSchema: {
            type: 'object',
            properties: {
                full_name: {
                    type: 'string',
                    description: 'Full name to search for',
                },
                country: {
                    type: 'string',
                    description: 'Country to filter by',
                },
                state: {
                    type: 'string',
                    description: 'State/Province to filter by',
                },
                city: {
                    type: 'string',
                    description: 'City to filter by',
                },
                job_title_role: {
                    type: 'string',
                    description: 'Job title role to filter by',
                },
                job_title_level: {
                    type: 'string',
                    description: 'Job title level to filter by',
                },
                company_name: {
                    type: 'string',
                    description: 'Company name to filter by',
                },
                company_industry: {
                    type: 'string',
                    description: 'Company industry to filter by',
                },
                page: {
                    type: 'number',
                    description: 'Page number for pagination',
                },
            },
        },
    },
    {
        name: 'companies_search',
        description:
            'Search for companies using CUFinder CSE API with various filters',
        inputSchema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Company name to filter by',
                },
                country: {
                    type: 'string',
                    description: 'Country to filter by',
                },
                state: {
                    type: 'string',
                    description: 'State/Province to filter by',
                },
                city: {
                    type: 'string',
                    description: 'City to filter by',
                },
                industry: {
                    type: 'string',
                    description: 'Industry to filter by',
                },
                employee_size: {
                    type: 'string',
                    description: 'Employee size to filter by',
                },
                page: {
                    type: 'number',
                    description: 'Page number for pagination',
                },
            },
        },
    },
    {
        name: 'local_business_search',
        description:
            'Search for local businesses using CUFinder LBS API with various filters',
        inputSchema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Business name to filter by',
                },
                country: {
                    type: 'string',
                    description: 'Country to filter by',
                },
                state: {
                    type: 'string',
                    description: 'State/Province to filter by',
                },
                city: {
                    type: 'string',
                    description: 'City to filter by',
                },
                industry: {
                    type: 'string',
                    description: 'Industry to filter by',
                },
                page: {
                    type: 'number',
                    description: 'Page number for pagination',
                },
            },
        },
    },
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case 'people_search':
                return await handlePeopleSearch(args);
            case 'companies_search':
                return await handleCompaniesSearch(args);
            case 'local_business_search':
                return await handleLocalBusinessSearch(args);
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error: any) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});

async function bootstrap() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('CUFinder MCP Server running on stdio');
}

bootstrap().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
