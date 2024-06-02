'use client';

import { ApolloProvider as Provider } from '@apollo/client';
import client from '@/lib/apolloClient';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider client={client}>{children}</Provider>;
};
