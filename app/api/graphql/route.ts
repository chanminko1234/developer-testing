import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { schema } from '@/graphql/schema';
import { createContext } from '@/graphql/context';

const apolloServer = new ApolloServer({
    schema,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
    context: createContext,
});

export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic';
