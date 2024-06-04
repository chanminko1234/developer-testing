import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import GET_PROPERTIES from "@/lib/queries/getProperties";
import Search from "@/app/search/page";

const mocks = [
    {
        request: {
            query: GET_PROPERTIES,
            variables: {
                after: null,
                first: 12,
                status: "SALE",
                keyword: "apartment",
                minPrice: 100000,
                maxPrice: 500000,
                areaMax: 1000,
                roomsMin: 2,
                bathsMin: 2,
            },
        },
        result: {
            data: {
                properties: {
                    edges: [
                        {
                            cursor: "cursor1",
                            node: {
                                id: "1",
                                project_name: "Example Project",
                                title: "Luxury Apartment",
                                price: 300000,
                                bedroom_count: 3,
                                bathroom_count: 2,
                                area: 800,
                                description: "Lorem ipsum dolor sit amet...",
                                status: "SALE",
                                images: [
                                    {
                                        url: "https://loremflickr.com/600/600/condos?lock=7050897808949248",
                                    },
                                    {
                                        url: "https://loremflickr.com/600/600/condos?lock=889965061865472",
                                    },
                                ],
                            },
                        },
                    ],
                    pageInfo: {
                        endCursor: "cursor1",
                        hasNextPage: true,
                    },
                },
            },
        },
    },
];

jest.mock('../components/Search/SearchFilters', () => ({
    SearchFilters: () => <div data-testid="search-filters"/>
}));

jest.mock('../components/PropertySection', () => ({
    __esModule: true,
    default: () => <div data-testid="property-section"/>
}));


describe('Search component', () => {
    it('renders the Search component properly', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Search
                    searchParams={{
                        keyword: "apartment",
                        purpose: "SALE",
                        minPrice: "100000",
                        maxPrice: "500000",
                        areaMax: "1000",
                        roomsMin: "2",
                        bathsMin: "2",
                    }}
                />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText(/Loading/i)).toBeNull();
        });

        expect(screen.getByText(/Search Property by filters/i)).toBeInTheDocument();

        userEvent.click(screen.getByText(/Search Property by filters/i));
    });
});
