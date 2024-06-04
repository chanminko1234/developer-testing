import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Property from "@/components/Property/Property";
import "@testing-library/jest-dom";
jest.mock('../../../components/Fav/useDB', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        addFav: jest.fn(),
    })),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: () => <div />
}));

describe('Property component', () => {
    const mockProperty = {
        id: 1,
        project_name: 'Test Project',
        title: 'Test Property',
        price: 1000000,
        bedroom_count: 3,
        bathroom_count: 2,
        area: 120,
        description: 'Test Description',
        status: 'SALE',
        images: [{ url: 'https://loremflickr.com/600/600/apartments?lock=2065189939707904' }],
    };

    it('renders Property component properly', () => {
        render(
            <Property property={mockProperty} formSearch={false} />
        );

        waitFor(() => {
            expect(screen.getByText('฿ 1,000,000')).toBeInTheDocument();
            expect(screen.getByText('Project Test')).toBeInTheDocument();
            expect(screen.getByText('Property Test')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText(Number(120).toFixed(2)+' SqM')).toBeInTheDocument();
            expect(screen.getByText('For Sale')).toBeInTheDocument();
            expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
        });

    });
});
