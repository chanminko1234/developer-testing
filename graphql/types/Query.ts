import {arg, intArg, nonNull, queryType, stringArg, list} from 'nexus';
import {Status} from './Status';

export const Query = queryType({
    definition: function (t) {
        t.field('properties', {
            type: 'PropertyConnection',
            args: {
                after: stringArg(),
                first: nonNull(intArg({default: 10})),
                status: arg({type: Status}),
                keyword: stringArg(),
                minPrice: intArg(),
                maxPrice: intArg(),
                areaMax: intArg(),
                roomsMin: intArg(),
                bathsMin: intArg(),
            },
            resolve: async (_parent, {
                after,
                first,
                status,
                keyword,
                minPrice,
                maxPrice,
                areaMax,
                roomsMin,
                bathsMin
            }, ctx) => {
                const take = first;
                const cursor = after ? {id: parseInt(after, 10)} : undefined;
                const filters = [
                    status && {status},
                    keyword && {
                        OR: [
                            {project_name: {contains: keyword}},
                            {title: {contains: keyword}},
                        ],
                    },
                    minPrice && {price: {gte: minPrice}},
                    maxPrice && {price: {lte: maxPrice}},
                    areaMax && {area: {lte: areaMax}},
                    roomsMin && {bedroom_count: {gte: roomsMin}},
                    bathsMin && {bathroom_count: {gte: bathsMin}},
                ].filter(Boolean);

                const where: any = filters.length > 0 ? {AND: filters} : {};

                const properties = await ctx.prisma.property.findMany({
                    where,
                    take,
                    skip: cursor ? 1 : 0,
                    cursor,
                    orderBy: {id: 'desc'},
                    include: {images: true},
                });

                const lastProperty = properties[properties.length - 1];
                const hasNextPage = properties.length === take;

                return {
                    edges: properties.map(property => ({
                        cursor: property.id.toString(),
                        node: property,
                    })),
                    pageInfo: {
                        endCursor: lastProperty ? lastProperty.id.toString() : null,
                        hasNextPage,
                    },
                };
            },
        });

        t.field('property', {
            type: 'Property',
            args: {
                id: nonNull(intArg()),
            },
            resolve: async (_parent, {id}, ctx) => {
                return ctx.prisma.property.findUnique({
                    where: {id},
                    include: {images: true},
                });
            },
        });

        t.list.field('autocompleteProperties', {
            type: 'AutocompleteSuggestion',
            args: {
                keyword: nonNull(stringArg()),
            },
            resolve: async (_parent, { keyword }, ctx) => {
                try {
                    const properties = await ctx.prisma.property.findMany({
                        where: {
                            OR: [
                                { project_name: { contains: keyword } },
                                { title: { contains: keyword } },
                            ],
                        },
                        select: { project_name: true, title: true },
                        take: 5, // Limit to 5 suggestions
                    });

                    return properties;
                } catch (error) {
                    console.error('Error fetching autocomplete suggestions:', error);
                    throw new Error('Failed to fetch autocomplete suggestions');
                }
            },
        });
    }
});
