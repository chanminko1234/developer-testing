import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GET_PROPERTIES from "@/lib/queries/getProperties";
import Home from "@/app/page";

jest.mock('../components/Slider', () => ({
    __esModule: true,
    default: () => <div data-testid="slider-section"/>
}));

describe('Home component', () => {
    const mocks = [
        {
            request: {
                query: GET_PROPERTIES,
                variables: { after: null, first: 6, status: 'BUY' },
            },
            result: {
                data: {
                    properties: {
                        edges: [
                            {
                                node: {
                                    id: '1',
                                    project_name: 'Project 1',
                                    title: 'Property 1',
                                    price: 100000,
                                    bedroom_count: 2,
                                    bathroom_count: 2,
                                    area: 1200,
                                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                    status: 'BUY',
                                    images: [{ url: 'https://loremflickr.com/600/600/condos?lock=889965061865472' }]
                                }
                            },
                            {
                                node: {
                                    id: '2',
                                    project_name: 'Project 2',
                                    title: 'Property 2',
                                    price: 150000,
                                    bedroom_count: 3,
                                    bathroom_count: 2,
                                    area: 1500,
                                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                    status: 'BUY',
                                    images: [{ url: 'https://loremflickr.com/600/600/apartments?lock=2065189939707904' }]
                                }
                            }
                        ],
                        pageInfo: { endCursor: 'abc', hasNextPage: true },
                    },
                },
            },
        },
        {
            request: {
                query: GET_PROPERTIES,
                variables: { after: null, first: 6, status: 'RENT' },
            },
            result: {
                data: {
                    properties: {
                        edges: [],
                        pageInfo: { endCursor: null, hasNextPage: false },
                    },
                },
            },
        },
        {
            request: {
                query: GET_PROPERTIES,
                variables: { after: null, first: 6, status: 'SALE' },
            },
            result: {
                data: {
                    properties: {
                        edges: [],
                        pageInfo: { endCursor: null, hasNextPage: false },
                    },
                },
            },
        },
        // Add mocks for other query variables if needed
    ];

    it('renders the Home component properly', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home />
            </MockedProvider>
        );
    });
});
