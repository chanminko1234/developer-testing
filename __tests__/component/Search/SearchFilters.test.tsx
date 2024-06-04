import React from 'react';
import {render} from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {SearchFilters} from "@/components/Search/SearchFilters";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe('SearchFilters component', () => {
    it('renders the SearchFilters component properly', () => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            replace: jest.fn(),
            pathname: '/search',
            query: {},
            asPath: '/search',
        });
        (usePathname as jest.Mock).mockReturnValue('/search');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));

        render(<SearchFilters />);
    });
});
