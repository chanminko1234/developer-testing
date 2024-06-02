import { objectType } from 'nexus';
import { Property } from './Property';
import { PageInfo } from './PageInfo';

export const PropertyConnection = objectType({
    name: 'PropertyConnection',
    definition(t) {
        t.nonNull.list.nonNull.field('edges', {
            type: 'PropertyEdge',
        });
        t.nonNull.field('pageInfo', {
            type: PageInfo,
        });
    },
});

export const PropertyEdge = objectType({
    name: 'PropertyEdge',
    definition(t) {
        t.nonNull.string('cursor');
        t.nonNull.field('node', { type: Property });
    },
});
