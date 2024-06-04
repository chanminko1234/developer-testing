import React from 'react';
import { render } from '@testing-library/react';
import Property from "@/app/property/[id]/page";

jest.mock('../components/Property/PropertyDetail', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="property-detail" />)
}));

describe('Property component', () => {
    it('renders PropertyDetail component with the correct propertyId', () => {
        const propertyId = '1';
        const { getByTestId } = render(<Property params={{ id: propertyId }} />);
        const propertyDetail = getByTestId('property-detail');
        expect(propertyDetail).toBeInTheDocument();
    });
});
