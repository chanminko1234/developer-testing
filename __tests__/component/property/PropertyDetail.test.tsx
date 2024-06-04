import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GET_PROPERTY from '@/lib/queries/getProperty';
import Property from "@/components/Property/PropertyDetail";

jest.mock('../../../components/Gallery/index', () => ({
    __esModule: true,
    default: () => <div data-testid="property-section"/>
}));

describe('Property component', () => {
    const propertyId = '123';
    const mocks = [
        {
            request: {
                query: GET_PROPERTY,
                variables: { id: parseInt(propertyId, 10) },
            },
            result: {
                data: {
                    property: {
                        id: propertyId,
                        project_name: 'Project Test',
                        title: 'Property Test',
                        price: 1000000,
                        bedroom_count: 3,
                        bathroom_count: 2,
                        area: 120,
                        status: 'SALE',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        images: [{ url: 'https://loremflickr.com/600/600/apartments?lock=2031769404571648' }],
                    },
                },
            },
        },
    ];

    it('renders Property component properly', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Property propertyId={propertyId} />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('฿ 1,000,000')).toBeInTheDocument();
        });

        expect(screen.getByText('Project Test')).toBeInTheDocument();
        expect(screen.getByText('Property Test')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText(Number(120).toFixed(2)+' SqM')).toBeInTheDocument();
        expect(screen.getByText('For Sale')).toBeInTheDocument();
        expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();

    });
});
